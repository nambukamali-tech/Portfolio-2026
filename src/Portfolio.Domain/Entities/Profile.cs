using System;

namespace Portfolio.Domain.Entities
{
    public class Profile : BaseEntity
    {
        public string FullName { get; set; } = "Nambu Kamali N";
        public string Headline { get; set; } = "Full Stack .NET Developer | ASP.NET Core & React Specialist";
        public string Summary { get; set; } = "University 1st Rank Holder (Alagappa University, 2025) and Full Stack .NET Developer with hands-on experience across two software engineering roles. Proficient in ASP.NET Core, C#, Entity Framework Core, SQL Server, MySQL, Postgres, and React.js. Demonstrated ability to build secure backend REST APIs, implement role-based access control (RBAC), microservices with RabbitMQ, and deliver optimized database-driven applications with a strong foundation in clean architecture.";
        public string Location { get; set; } = "Coimbatore, Tamil Nadu, India";
        public string ProfileImageUrl { get; set; } = "/images/profile.jpg";
        public string ResumeUrl { get; set; } = "/resume.pdf";
        public string Email { get; set; } = "nambukamali@gmail.com";
        public string LinkedInUrl { get; set; } = "https://linkedin.com/in/nambu-kamali-531233265/";
        public string GitHubUrl { get; set; } = "https://github.com/nambukamali-tech";
        public string AvailabilityStatus { get; set; } = "Open to opportunities";
        public int YearsExperience { get; set; } = 1;
        public int ProjectsCompleted { get; set; } = 6;
    }
}
