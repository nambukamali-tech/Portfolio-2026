using System;

namespace Portfolio.Domain.Entities
{
    public class Profile : BaseEntity
    {
        public string FullName { get; set; } = "Nambu Kamali";
        public string Headline { get; set; } = "Junior Software Developer | .NET & React";
        public string Summary { get; set; } = "Passionate Junior Full-Stack Developer specializing in building modern, scalable web applications with ASP.NET Core and React. Focused on clean architecture, solid engineering practices, and delivering high-impact user experiences.";
        public string Location { get; set; } = "India";
        public string ProfileImageUrl { get; set; } = "/images/profile.jpg";
        public string ResumeUrl { get; set; } = "/resume.pdf";
        public string Email { get; set; } = "nambukamali@example.com";
        public string LinkedInUrl { get; set; } = "https://linkedin.com/in/nambukamali";
        public string GitHubUrl { get; set; } = "https://github.com/nambukamali";
        public string AvailabilityStatus { get; set; } = "Open to opportunities";
        public int YearsExperience { get; set; } = 1;
        public int ProjectsCompleted { get; set; } = 10;
    }
}
