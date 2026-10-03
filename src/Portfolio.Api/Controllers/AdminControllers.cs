using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Portfolio.Application.DTOs;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [EnableRateLimiting("AuthLimiter")]
    [Route("api/v1/admin/auth")]
    public class AdminAuthController : ControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AdminAuthController(
            IApplicationDbContext context,
            IPasswordHasher passwordHasher,
            IJwtTokenGenerator jwtTokenGenerator)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResultDto>> Login([FromBody] AdminLoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            var admin = await _context.AdminUsers.FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());
            if (admin == null || !admin.IsActive)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            var isValid = _passwordHasher.VerifyPassword(request.Password, admin.PasswordHash);
            if (!isValid)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            admin.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var token = _jwtTokenGenerator.GenerateToken(admin);
            var expiresAt = DateTime.UtcNow.AddHours(24);

            return Ok(new AuthResultDto(token, admin.Email, admin.Username, expiresAt));
        }
    }

    [ApiController]
    [Authorize]
    [Route("api/v1/admin/profile")]
    public class AdminProfileController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public AdminProfileController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ProfileDto>> GetProfile()
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync();
            if (profile == null) return NotFound();

            return Ok(new ProfileDto(
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
            ));
        }

        [HttpPut]
        public async Task<ActionResult<ProfileDto>> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync();
            if (profile == null)
            {
                profile = new Profile();
                _context.Profiles.Add(profile);
            }

            profile.FullName = request.FullName;
            profile.Headline = request.Headline;
            profile.Summary = request.Summary;
            profile.Location = request.Location;
            profile.ProfileImageUrl = request.ProfileImageUrl;
            profile.ResumeUrl = request.ResumeUrl;
            profile.Email = request.Email;
            profile.LinkedInUrl = request.LinkedInUrl;
            profile.GitHubUrl = request.GitHubUrl;
            profile.AvailabilityStatus = request.AvailabilityStatus;
            profile.YearsExperience = request.YearsExperience;
            profile.ProjectsCompleted = request.ProjectsCompleted;
            profile.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new ProfileDto(
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
            ));
        }
    }

    [ApiController]
    [Authorize]
    [Route("api/v1/admin/skills")]
    public class AdminSkillsController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public AdminSkillsController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkillDto>>> GetAllSkills()
        {
            var skills = await _context.Skills.OrderBy(s => s.DisplayOrder).ToListAsync();
            return Ok(skills.Select(s => new SkillDto(s.Id, s.Name, s.Category, s.Icon, s.DisplayOrder, s.IsVisible, s.ProficiencyLevel)));
        }

        [HttpPost]
        public async Task<ActionResult<SkillDto>> CreateSkill([FromBody] CreateSkillRequest request)
        {
            var skill = new Skill
            {
                Name = request.Name,
                Category = request.Category,
                Icon = request.Icon,
                DisplayOrder = request.DisplayOrder,
                IsVisible = request.IsVisible,
                ProficiencyLevel = request.ProficiencyLevel
            };

            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllSkills), new SkillDto(skill.Id, skill.Name, skill.Category, skill.Icon, skill.DisplayOrder, skill.IsVisible, skill.ProficiencyLevel));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SkillDto>> UpdateSkill(Guid id, [FromBody] CreateSkillRequest request)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null) return NotFound();

            skill.Name = request.Name;
            skill.Category = request.Category;
            skill.Icon = request.Icon;
            skill.DisplayOrder = request.DisplayOrder;
            skill.IsVisible = request.IsVisible;
            skill.ProficiencyLevel = request.ProficiencyLevel;
            skill.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(new SkillDto(skill.Id, skill.Name, skill.Category, skill.Icon, skill.DisplayOrder, skill.IsVisible, skill.ProficiencyLevel));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSkill(Guid id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null) return NotFound();

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    [ApiController]
    [Authorize]
    [Route("api/v1/admin/projects")]
    public class AdminProjectsController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public AdminProjectsController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAllProjects()
        {
            var projects = await _context.Projects.OrderBy(p => p.DisplayOrder).ToListAsync();
            return Ok(projects.Select(p => new ProjectDto(
                p.Id, p.Title, p.Slug, p.ShortDescription, p.FullDescription, p.ThumbnailUrl, p.Category,
                p.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                p.GitHubUrl, p.LiveDemoUrl, p.ProjectStatus, p.IsFeatured, p.IsPublished, p.DisplayOrder,
                p.ProblemStatement, p.SolutionOverview, p.ArchitectureNotes, p.CreatedAt
            )));
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] CreateProjectRequest request)
        {
            var slug = request.Title.ToLower().Replace(" ", "-").Replace("/", "-");
            var existingSlug = await _context.Projects.AnyAsync(p => p.Slug == slug);
            if (existingSlug) slug = $"{slug}-{Guid.NewGuid().ToString().Substring(0, 5)}";

            var p = new Project
            {
                Title = request.Title,
                Slug = slug,
                ShortDescription = request.ShortDescription,
                FullDescription = request.FullDescription,
                ThumbnailUrl = request.ThumbnailUrl,
                Category = request.Category,
                Technologies = request.Technologies,
                GitHubUrl = request.GitHubUrl,
                LiveDemoUrl = request.LiveDemoUrl,
                ProjectStatus = request.ProjectStatus,
                IsFeatured = request.IsFeatured,
                IsPublished = request.IsPublished,
                DisplayOrder = request.DisplayOrder,
                ProblemStatement = request.ProblemStatement,
                SolutionOverview = request.SolutionOverview,
                ArchitectureNotes = request.ArchitectureNotes
            };

            _context.Projects.Add(p);
            await _context.SaveChangesAsync();

            return Ok(new ProjectDto(
                p.Id, p.Title, p.Slug, p.ShortDescription, p.FullDescription, p.ThumbnailUrl, p.Category,
                p.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                p.GitHubUrl, p.LiveDemoUrl, p.ProjectStatus, p.IsFeatured, p.IsPublished, p.DisplayOrder,
                p.ProblemStatement, p.SolutionOverview, p.ArchitectureNotes, p.CreatedAt
            ));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> UpdateProject(Guid id, [FromBody] CreateProjectRequest request)
        {
            var p = await _context.Projects.FindAsync(id);
            if (p == null) return NotFound();

            p.Title = request.Title;
            p.ShortDescription = request.ShortDescription;
            p.FullDescription = request.FullDescription;
            p.ThumbnailUrl = request.ThumbnailUrl;
            p.Category = request.Category;
            p.Technologies = request.Technologies;
            p.GitHubUrl = request.GitHubUrl;
            p.LiveDemoUrl = request.LiveDemoUrl;
            p.ProjectStatus = request.ProjectStatus;
            p.IsFeatured = request.IsFeatured;
            p.IsPublished = request.IsPublished;
            p.DisplayOrder = request.DisplayOrder;
            p.ProblemStatement = request.ProblemStatement;
            p.SolutionOverview = request.SolutionOverview;
            p.ArchitectureNotes = request.ArchitectureNotes;
            p.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new ProjectDto(
                p.Id, p.Title, p.Slug, p.ShortDescription, p.FullDescription, p.ThumbnailUrl, p.Category,
                p.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                p.GitHubUrl, p.LiveDemoUrl, p.ProjectStatus, p.IsFeatured, p.IsPublished, p.DisplayOrder,
                p.ProblemStatement, p.SolutionOverview, p.ArchitectureNotes, p.CreatedAt
            ));
        }

        [HttpPatch("{id}/publish")]
        public async Task<ActionResult> TogglePublish(Guid id)
        {
            var p = await _context.Projects.FindAsync(id);
            if (p == null) return NotFound();

            p.IsPublished = !p.IsPublished;
            await _context.SaveChangesAsync();
            return Ok(new { isPublished = p.IsPublished });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(Guid id)
        {
            var p = await _context.Projects.FindAsync(id);
            if (p == null) return NotFound();

            _context.Projects.Remove(p);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    [ApiController]
    [Authorize]
    [Route("api/v1/admin/messages")]
    public class AdminMessagesController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public AdminMessagesController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactMessageDto>>> GetMessages()
        {
            var messages = await _context.ContactMessages.OrderByDescending(m => m.CreatedAt).ToListAsync();
            return Ok(messages.Select(m => new ContactMessageDto(
                m.Id, m.FullName, m.Email, m.Subject, m.Message, m.Status, m.CreatedAt, m.ReadAt
            )));
        }

        [HttpGet("overview")]
        public async Task<ActionResult<DashboardOverviewDto>> GetDashboardOverview()
        {
            var totalProjects = await _context.Projects.CountAsync();
            var totalSkills = await _context.Skills.CountAsync();
            var totalCertifications = await _context.Certifications.CountAsync();
            var unreadMessages = await _context.ContactMessages.CountAsync(m => m.Status == "Unread");

            var recentMessages = await _context.ContactMessages
                .OrderByDescending(m => m.CreatedAt)
                .Take(5)
                .Select(m => new ContactMessageDto(m.Id, m.FullName, m.Email, m.Subject, m.Message, m.Status, m.CreatedAt, m.ReadAt))
                .ToListAsync();

            return Ok(new DashboardOverviewDto(totalProjects, totalSkills, totalCertifications, unreadMessages, recentMessages));
        }

        [HttpPatch("{id}/status")]
        public async Task<ActionResult> UpdateStatus(Guid id, [FromBody] string status)
        {
            var msg = await _context.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();

            msg.Status = status;
            if (status == "Read" && msg.ReadAt == null) msg.ReadAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { status = msg.Status });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(Guid id)
        {
            var msg = await _context.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();

            _context.ContactMessages.Remove(msg);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    [ApiController]
    [Authorize]
    [Route("api/v1/admin/files")]
    public class FileUploadController : ControllerBase
    {
        private readonly IFileStorageService _fileStorageService;

        public FileUploadController(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file selected." });
            }

            // Max file size: 10MB
            if (file.Length > 10 * 1024 * 1024)
            {
                return BadRequest(new { message = "File size exceeds 10MB limit." });
            }

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp", ".pdf", ".svg" };
            var allowedMimeTypes = new[] { "image/jpeg", "image/png", "image/webp", "application/pdf", "image/svg+xml" };
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(ext) || !allowedMimeTypes.Contains(file.ContentType.ToLowerInvariant()))
            {
                return BadRequest(new { message = $"File type or content format '{ext}' is not permitted." });
            }

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var fileBytes = memoryStream.ToArray();

            var relativeUrl = await _fileStorageService.SaveFileAsync(fileBytes, file.FileName, file.ContentType);
            return Ok(new { url = relativeUrl, fileName = file.FileName, size = file.Length });
        }
    }
}
