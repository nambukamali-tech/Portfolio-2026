using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Portfolio.Application.DTOs;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public ProfileController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ProfileDto>> GetProfile()
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync();
            if (profile == null)
            {
                return NotFound(new { message = "Profile information not configured yet." });
            }

            var dto = new ProfileDto(
                profile.Id,
                profile.FullName,
                profile.Headline,
                profile.Summary,
                profile.Location,
                profile.ProfileImageUrl,
                profile.ResumeUrl,
                profile.Email,
                profile.LinkedInUrl,
                profile.GitHubUrl,
                profile.AvailabilityStatus,
                profile.YearsExperience,
                profile.ProjectsCompleted
            );

            return Ok(dto);
        }
    }

    [ApiController]
    [Route("api/v1/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public SkillsController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkillDto>>> GetSkills([FromQuery] string? category)
        {
            var query = _context.Skills.Where(s => s.IsVisible);

            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(s => s.Category.ToLower() == category.ToLower());
            }

            var skills = await query.OrderBy(s => s.DisplayOrder).ThenBy(s => s.Name).ToListAsync();

            var dtos = skills.Select(s => new SkillDto(
                s.Id,
                s.Name,
                s.Category,
                s.Icon,
                s.DisplayOrder,
                s.IsVisible,
                s.ProficiencyLevel
            ));

            return Ok(dtos);
        }
    }

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ExperienceController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public ExperienceController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExperienceDto>>> GetExperiences()
        {
            var items = await _context.Experiences
                .OrderBy(e => e.DisplayOrder)
                .ThenByDescending(e => e.StartDate)
                .ToListAsync();

            var dtos = items.Select(e => new ExperienceDto(
                e.Id,
                e.JobTitle,
                e.CompanyName,
                e.EmploymentType,
                e.Location,
                e.StartDate,
                e.EndDate,
                e.IsCurrent,
                e.Description,
                e.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                e.DisplayOrder
            ));

            return Ok(dtos);
        }
    }

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public ProjectsController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ProjectDto>>> GetProjects(
            [FromQuery] string? category,
            [FromQuery] string? search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 6)
        {
            var query = _context.Projects.Where(p => p.IsPublished);

            if (!string.IsNullOrWhiteSpace(category) && category != "All")
            {
                query = query.Where(p => p.Category.ToLower() == category.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(p => p.Title.ToLower().Contains(searchLower) ||
                                         p.ShortDescription.ToLower().Contains(searchLower) ||
                                         p.Technologies.ToLower().Contains(searchLower));
            }

            var totalCount = await query.CountAsync();
            var pageNumber = Math.Max(1, page);
            var actualPageSize = Math.Clamp(pageSize, 1, 50);

            var items = await query
                .OrderBy(p => p.DisplayOrder)
                .ThenByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * actualPageSize)
                .Take(actualPageSize)
                .ToListAsync();

            var dtos = items.Select(p => new ProjectDto(
                p.Id,
                p.Title,
                p.Slug,
                p.ShortDescription,
                p.FullDescription,
                p.ThumbnailUrl,
                p.Category,
                p.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                p.GitHubUrl,
                p.LiveDemoUrl,
                p.ProjectStatus,
                p.IsFeatured,
                p.IsPublished,
                p.DisplayOrder,
                p.ProblemStatement,
                p.SolutionOverview,
                p.ArchitectureNotes,
                p.CreatedAt
            )).ToList();

            var totalPages = (int)Math.Ceiling(totalCount / (double)actualPageSize);

            return Ok(new PagedResult<ProjectDto>(dtos, totalCount, pageNumber, actualPageSize, totalPages));
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<ProjectDto>> GetProjectBySlug(string slug)
        {
            var p = await _context.Projects.FirstOrDefaultAsync(x => x.Slug.ToLower() == slug.ToLower() && x.IsPublished);
            if (p == null)
            {
                return NotFound(new { message = $"Project with slug '{slug}' not found." });
            }

            var dto = new ProjectDto(
                p.Id,
                p.Title,
                p.Slug,
                p.ShortDescription,
                p.FullDescription,
                p.ThumbnailUrl,
                p.Category,
                p.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                p.GitHubUrl,
                p.LiveDemoUrl,
                p.ProjectStatus,
                p.IsFeatured,
                p.IsPublished,
                p.DisplayOrder,
                p.ProblemStatement,
                p.SolutionOverview,
                p.ArchitectureNotes,
                p.CreatedAt
            );

            return Ok(dto);
        }
    }

    [ApiController]
    [Route("api/v1/[controller]")]
    public class CertificationsController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public CertificationsController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CertificationDto>>> GetCertifications()
        {
            var items = await _context.Certifications
                .OrderBy(c => c.DisplayOrder)
                .ThenByDescending(c => c.IssueDate)
                .ToListAsync();

            var dtos = items.Select(c => new CertificationDto(
                c.Id,
                c.Name,
                c.Issuer,
                c.IssueDate,
                c.CredentialId,
                c.VerificationUrl,
                c.CertificateUrl,
                c.Description,
                c.DisplayOrder
            ));

            return Ok(dtos);
        }
    }

    [ApiController]
    [Route("api/v1/[controller]")]
    public class EducationController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public EducationController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducationDto>>> GetEducation()
        {
            var items = await _context.Educations
                .OrderBy(e => e.DisplayOrder)
                .ThenByDescending(e => e.StartDate)
                .ToListAsync();

            var dtos = items.Select(e => new EducationDto(
                e.Id,
                e.Qualification,
                e.Institution,
                e.StartDate,
                e.EndDate,
                e.Description,
                e.DisplayOrder
            ));

            return Ok(dtos);
        }
    }

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public ServicesController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetServices()
        {
            var items = await _context.Services
                .Where(s => s.IsActive)
                .OrderBy(s => s.DisplayOrder)
                .ToListAsync();

            var dtos = items.Select(s => new ServiceDto(
                s.Id,
                s.Title,
                s.Description,
                s.Icon,
                s.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                s.IsActive,
                s.DisplayOrder
            ));

            return Ok(dtos);
        }
    }

    [ApiController]
    [EnableRateLimiting("ContactLimiter")]
    [Route("api/v1/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public ContactController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> SubmitMessage([FromBody] CreateContactMessageRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Subject) ||
                string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { message = "All contact fields are required." });
            }

            if (!request.Email.Contains('@') || !request.Email.Contains('.'))
            {
                return BadRequest(new { message = "Please provide a valid email address." });
            }

            var entity = new ContactMessage
            {
                FullName = request.FullName.Trim(),
                Email = request.Email.Trim(),
                Subject = request.Subject.Trim(),
                Message = request.Message.Trim(),
                Status = "Unread",
                CreatedAt = DateTime.UtcNow
            };

            _context.ContactMessages.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Thank you! Your message has been sent successfully. Nambu Kamali will get back to you shortly." });
        }
    }
}
