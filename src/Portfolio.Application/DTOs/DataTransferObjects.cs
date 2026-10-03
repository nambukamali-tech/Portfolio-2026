using System;
using System.Collections.Generic;

namespace Portfolio.Application.DTOs
{
    public record ProfileDto(
        Guid Id,
        string FullName,
        string Headline,
        string Summary,
        string Location,
        string ProfileImageUrl,
        string ResumeUrl,
        string Email,
        string LinkedInUrl,
        string GitHubUrl,
        string AvailabilityStatus,
        int YearsExperience,
        int ProjectsCompleted
    );

    public record UpdateProfileRequest(
        string FullName,
        string Headline,
        string Summary,
        string Location,
        string ProfileImageUrl,
        string ResumeUrl,
        string Email,
        string LinkedInUrl,
        string GitHubUrl,
        string AvailabilityStatus,
        int YearsExperience,
        int ProjectsCompleted
    );

    public record SkillDto(
        Guid Id,
        string Name,
        string Category,
        string Icon,
        int DisplayOrder,
        bool IsVisible,
        string? ProficiencyLevel
    );

    public record CreateSkillRequest(
        string Name,
        string Category,
        string Icon,
        int DisplayOrder,
        bool IsVisible,
        string? ProficiencyLevel
    );

    public record ExperienceDto(
        Guid Id,
        string JobTitle,
        string CompanyName,
        string EmploymentType,
        string Location,
        DateTime StartDate,
        DateTime? EndDate,
        bool IsCurrent,
        string Description,
        List<string> Technologies,
        int DisplayOrder
    );

    public record CreateExperienceRequest(
        string JobTitle,
        string CompanyName,
        string EmploymentType,
        string Location,
        DateTime StartDate,
        DateTime? EndDate,
        bool IsCurrent,
        string Description,
        string Technologies,
        int DisplayOrder
    );

    public record ProjectDto(
        Guid Id,
        string Title,
        string Slug,
        string ShortDescription,
        string FullDescription,
        string ThumbnailUrl,
        string Category,
        List<string> Technologies,
        string GitHubUrl,
        string LiveDemoUrl,
        string ProjectStatus,
        bool IsFeatured,
        bool IsPublished,
        int DisplayOrder,
        string ProblemStatement,
        string SolutionOverview,
        string ArchitectureNotes,
        DateTime CreatedAt
    );

    public record CreateProjectRequest(
        string Title,
        string ShortDescription,
        string FullDescription,
        string ThumbnailUrl,
        string Category,
        string Technologies,
        string GitHubUrl,
        string LiveDemoUrl,
        string ProjectStatus,
        bool IsFeatured,
        bool IsPublished,
        int DisplayOrder,
        string ProblemStatement,
        string SolutionOverview,
        string ArchitectureNotes
    );

    public record CertificationDto(
        Guid Id,
        string Name,
        string Issuer,
        DateTime IssueDate,
        string? CredentialId,
        string VerificationUrl,
        string CertificateUrl,
        string Description,
        int DisplayOrder
    );

    public record CreateCertificationRequest(
        string Name,
        string Issuer,
        DateTime IssueDate,
        string? CredentialId,
        string VerificationUrl,
        string CertificateUrl,
        string Description,
        int DisplayOrder
    );

    public record EducationDto(
        Guid Id,
        string Qualification,
        string Institution,
        DateTime StartDate,
        DateTime? EndDate,
        string Description,
        int DisplayOrder
    );

    public record CreateEducationRequest(
        string Qualification,
        string Institution,
        DateTime StartDate,
        DateTime? EndDate,
        string Description,
        int DisplayOrder
    );

    public record ServiceDto(
        Guid Id,
        string Title,
        string Description,
        string Icon,
        List<string> Technologies,
        bool IsActive,
        int DisplayOrder
    );

    public record CreateServiceRequest(
        string Title,
        string Description,
        string Icon,
        string Technologies,
        bool IsActive,
        int DisplayOrder
    );

    public record ContactMessageDto(
        Guid Id,
        string FullName,
        string Email,
        string Subject,
        string Message,
        string Status,
        DateTime CreatedAt,
        DateTime? ReadAt
    );

    public record CreateContactMessageRequest(
        string FullName,
        string Email,
        string Subject,
        string Message
    );

    public record AdminLoginRequest(
        string Email,
        string Password
    );

    public record AuthResultDto(
        string Token,
        string Email,
        string Username,
        DateTime ExpiresAt
    );

    public record DashboardOverviewDto(
        int TotalProjects,
        int TotalSkills,
        int TotalCertifications,
        int UnreadMessages,
        List<ContactMessageDto> RecentMessages
    );

    public record PagedResult<T>(
        List<T> Items,
        int TotalCount,
        int PageNumber,
        int PageSize,
        int TotalPages
    );
}
