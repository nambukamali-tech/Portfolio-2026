using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence
{
    public static class InitialDataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context, IPasswordHasher passwordHasher, IConfiguration configuration)
        {
            // Reset existing data if needed to populate clean resume details
            if (await context.Profiles.AnyAsync())
            {
                var existingProfile = await context.Profiles.FirstAsync();
                existingProfile.FullName = "Nambu Kamali N";
                existingProfile.Headline = "Full Stack .NET Developer | ASP.NET Core & React Specialist";
                existingProfile.Summary = "University 1st Rank Holder (Alagappa University, 2025) and Full Stack .NET Developer with hands-on experience across two software engineering roles. Proficient in ASP.NET Core, C#, Entity Framework Core, SQL Server, MySQL, Postgres, and React.js. Demonstrated ability to build secure backend REST APIs, implement role-based access control (RBAC), microservices with RabbitMQ, and deliver optimized database-driven applications with a strong foundation in clean architecture.";
                existingProfile.Location = "Coimbatore, Tamil Nadu, India";
                existingProfile.ProfileImageUrl = "/images/profile.jpg";
                existingProfile.ResumeUrl = "/resume.pdf";
                existingProfile.Email = "nambukamali@gmail.com";
                existingProfile.LinkedInUrl = "https://linkedin.com/in/nambu-kamali-531233265/";
                existingProfile.GitHubUrl = "https://github.com/nambukamali-tech";
                existingProfile.AvailabilityStatus = "Open to opportunities";
                existingProfile.YearsExperience = 1;
                existingProfile.ProjectsCompleted = 6;
            }
            else
            {
                context.Profiles.Add(new Profile
                {
                    FullName = "Nambu Kamali N",
                    Headline = "Full Stack .NET Developer | ASP.NET Core & React Specialist",
                    Summary = "University 1st Rank Holder (Alagappa University, 2025) and Full Stack .NET Developer with hands-on experience across two software engineering roles. Proficient in ASP.NET Core, C#, Entity Framework Core, SQL Server, MySQL, Postgres, and React.js. Demonstrated ability to build secure backend REST APIs, implement role-based access control (RBAC), microservices with RabbitMQ, and deliver optimized database-driven applications with a strong foundation in clean architecture.",
                    Location = "Coimbatore, Tamil Nadu, India",
                    ProfileImageUrl = "/images/profile.jpg",
                    ResumeUrl = "/resume.pdf",
                    Email = "nambukamali@gmail.com",
                    LinkedInUrl = "https://linkedin.com/in/nambu-kamali-531233265/",
                    GitHubUrl = "https://github.com/nambukamali-tech",
                    AvailabilityStatus = "Open to opportunities",
                    YearsExperience = 1,
                    ProjectsCompleted = 6
                });
            }

            // 2. Seed Admin User
            if (!await context.AdminUsers.AnyAsync())
            {
                var initialEmail = configuration["ADMIN_INITIAL_EMAIL"] ?? configuration["Admin:InitialEmail"];
                var initialPassword = configuration["ADMIN_INITIAL_PASSWORD"] ?? configuration["Admin:InitialPassword"];

                if (!string.IsNullOrWhiteSpace(initialEmail) && !string.IsNullOrWhiteSpace(initialPassword))
                {
                    context.AdminUsers.Add(new AdminUser
                    {
                        Username = "admin",
                        Email = initialEmail.Trim().ToLower(),
                        PasswordHash = passwordHasher.HashPassword(initialPassword),
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            // 3. Seed Skills from Resume
            context.Skills.RemoveRange(await context.Skills.ToListAsync());
            var skills = new List<Skill>
            {
                // Languages
                new Skill { Name = "C#", Category = "Backend", Icon = "Terminal", DisplayOrder = 1, IsVisible = true },
                new Skill { Name = "JavaScript", Category = "Frontend", Icon = "Code", DisplayOrder = 2, IsVisible = true },
                new Skill { Name = "HTML5", Category = "Frontend", Icon = "Layout", DisplayOrder = 3, IsVisible = true },
                new Skill { Name = "CSS3", Category = "Frontend", Icon = "Palette", DisplayOrder = 4, IsVisible = true },

                // Frameworks / Libraries
                new Skill { Name = "ASP.NET Core", Category = "Backend", Icon = "Server", DisplayOrder = 5, IsVisible = true },
                new Skill { Name = "ASP.NET Core Web API", Category = "Backend", Icon = "Network", DisplayOrder = 6, IsVisible = true },
                new Skill { Name = "Entity Framework Core", Category = "Backend", Icon = "Database", DisplayOrder = 7, IsVisible = true },
                new Skill { Name = "ASP.NET MVC", Category = "Backend", Icon = "Layers", DisplayOrder = 8, IsVisible = true },
                new Skill { Name = "LINQ", Category = "Backend", Icon = "Filter", DisplayOrder = 9, IsVisible = true },
                new Skill { Name = "React.js", Category = "Frontend", Icon = "Atom", DisplayOrder = 10, IsVisible = true },

                // Databases
                new Skill { Name = "SQL Server", Category = "Database", Icon = "Database", DisplayOrder = 11, IsVisible = true },
                new Skill { Name = "MySQL", Category = "Database", Icon = "Table", DisplayOrder = 12, IsVisible = true },
                new Skill { Name = "PostgreSQL", Category = "Database", Icon = "DatabaseBackup", DisplayOrder = 13, IsVisible = true },

                // Tools & Architecture
                new Skill { Name = "Visual Studio / VS Code", Category = "Tools & Platforms", Icon = "Laptop", DisplayOrder = 14, IsVisible = true },
                new Skill { Name = "Git & GitHub", Category = "Tools & Platforms", Icon = "GitBranch", DisplayOrder = 15, IsVisible = true },
                new Skill { Name = "RabbitMQ & Microservices", Category = "Architecture & Concepts", Icon = "Cpu", DisplayOrder = 16, IsVisible = true },
                new Skill { Name = "Clean Architecture & RBAC", Category = "Architecture & Concepts", Icon = "ShieldCheck", DisplayOrder = 17, IsVisible = true },
                new Skill { Name = "AI Tools", Category = "Tools & Platforms", Icon = "Sparkles", DisplayOrder = 18, IsVisible = true }
            };
            context.Skills.AddRange(skills);

            // 4. Seed Projects from Resume
            context.Projects.RemoveRange(await context.Projects.ToListAsync());
            var projects = new List<Project>
            {
                new Project
                {
                    Title = "Ackcio - IoT Monitoring System",
                    Slug = "ackcio-iot-monitoring-system",
                    ShortDescription = "Real-time IoT-based structural and asset monitoring platform handling continuous sensor data streams.",
                    FullDescription = "Building secure ASP.NET Core Web APIs to receive, process, and store continuous data streams from IoT devices. Developing microservices using microservice architecture and RabbitMQ for asynchronous communication and message processing. Designing and optimizing database schemas to handle large volumes of time-series sensor data with efficient querying and role-based access control (RBAC).",
                    ThumbnailUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
                    Category = "Backend",
                    Technologies = "C#, ASP.NET Core Web API, EF Core, MySQL, RabbitMQ, Microservices, React.js",
                    GitHubUrl = "https://github.com/nambukamali-tech/ackcio-iot-monitoring",
                    LiveDemoUrl = "https://github.com/nambukamali-tech",
                    ProjectStatus = "In Progress",
                    IsFeatured = true,
                    IsPublished = true,
                    DisplayOrder = 1,
                    ProblemStatement = "Handling high-volume continuous time-series data streams from IoT structural sensors requires low latency, asynchronous processing, and robust database schema optimization.",
                    SolutionOverview = "Implemented ASP.NET Core REST APIs with RabbitMQ message queues for asynchronous ingestion and optimized MySQL schema using EF Core Code-First migrations.",
                    ArchitectureNotes = "Microservices architecture utilizing RabbitMQ for decoupled message processing, RBAC for secure API endpoints, and clean code principles."
                },
                new Project
                {
                    Title = "Student Portal Web Application",
                    Slug = "student-portal-web-app",
                    ShortDescription = "Full-stack web application following Clean Architecture for managing student profiles, scholarships, papers, and attendance.",
                    FullDescription = "Built a full-stack web application using ASP.NET Core MVC, Entity Framework Core, and MySQL following clean architecture principles. Implemented role-based authentication (Admin & Staff) and developed CRUD modules for students, scholarships, research papers, and attendance records.",
                    ThumbnailUrl = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
                    Category = "Full-Stack",
                    Technologies = "C#, ASP.NET Core MVC, EF Core, MySQL, Bootstrap, LINQ",
                    GitHubUrl = "https://github.com/nambukamali-tech/student-portal",
                    LiveDemoUrl = "https://github.com/nambukamali-tech",
                    ProjectStatus = "Completed",
                    IsFeatured = true,
                    IsPublished = true,
                    DisplayOrder = 2,
                    ProblemStatement = "Educational institutions required a unified portal to manage multi-role administrative data (scholarships, attendance, papers) with strict access control.",
                    SolutionOverview = "Developed role-based authentication (Admin & Staff) with clean layer separation, dependency injection, and EF Core Code-First migrations.",
                    ArchitectureNotes = "Clean Architecture in ASP.NET Core MVC with custom middleware for request processing and dependency injection for decoupled services."
                },
                new Project
                {
                    Title = "Online Ticket Booking Web Application",
                    Slug = "online-ticket-booking-app",
                    ShortDescription = "Full-stack ticket booking platform built with React.js frontend and ASP.NET Core MVC backend.",
                    FullDescription = "Built a full-stack web application using React.js frontend and ASP.NET Core MVC backend with clean client-server architecture. Implemented secure login/signup system with role-based access for Admin and Users. Developed ticket booking features with real-time availability and an Admin Dashboard to monitor and manage daily bookings.",
                    ThumbnailUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
                    Category = "Full-Stack",
                    Technologies = "React.js, ASP.NET Core, C#, Web API, SQL Server, JavaScript",
                    GitHubUrl = "https://github.com/nambukamali-tech/online-ticket-booking",
                    LiveDemoUrl = "https://github.com/nambukamali-tech",
                    ProjectStatus = "Completed",
                    IsFeatured = true,
                    IsPublished = true,
                    DisplayOrder = 3,
                    ProblemStatement = "Users needed a responsive interface to check ticket availability and complete bookings while administrators needed a live dashboard.",
                    SolutionOverview = "Decoupled React.js frontend communicating with ASP.NET Core backend REST endpoints, featuring live seat availability updates and RBAC security.",
                    ArchitectureNotes = "Client-server architecture separating React SPA state management from ASP.NET Core business logic and SQL Server persistence."
                },
                new Project
                {
                    Title = "Rural Guider - College & Career Guidance Web App",
                    Slug = "rural-guider-career-app",
                    ShortDescription = "Career guidance platform helping rural students discover colleges and career opportunities.",
                    FullDescription = "Built a full-stack web app using ASP.NET Core MVC, Entity Framework Core, and MySQL to help rural students find colleges and career paths. Implemented role-based authentication for Admin, Student, and College roles with secure login and controlled access. Developed CRUD operations for college listings, course details, and student profiles via role-based dashboards.",
                    ThumbnailUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
                    Category = "Full-Stack",
                    Technologies = "ASP.NET Core MVC, EF Core, MySQL, Bootstrap, C#",
                    GitHubUrl = "https://github.com/nambukamali-tech/rural-guider",
                    LiveDemoUrl = "https://github.com/nambukamali-tech",
                    ProjectStatus = "Completed",
                    IsFeatured = true,
                    IsPublished = true,
                    DisplayOrder = 4,
                    ProblemStatement = "Rural students lacked structured digital guidance for exploring higher education colleges, degree programs, and career pathways.",
                    SolutionOverview = "Designed an intuitive, accessible Bootstrap interface tailored for low-bandwidth users, backed by ASP.NET Core MVC and MySQL.",
                    ArchitectureNotes = "Multi-role RBAC architecture (Admin, Student, College) with EF Core Code-First migrations and optimized database queries."
                }
            };
            context.Projects.AddRange(projects);

            // 5. Seed Experience from Resume
            context.Experiences.RemoveRange(await context.Experiences.ToListAsync());
            var experiences = new List<Experience>
            {
                new Experience
                {
                    JobTitle = "Junior Software Developer",
                    CompanyName = "PrimeMover Solutions",
                    EmploymentType = "Full-time",
                    Location = "Coimbatore, India",
                    StartDate = new DateTime(2026, 3, 1),
                    IsCurrent = true,
                    Description = "Promoted from Backend Developer Intern (Dec 2025 - Feb 2026) to Junior Software Developer. Currently developing backend APIs and managing the database for Ackcio, a real-time IoT-based monitoring system. Building and maintaining RESTful APIs using ASP.NET Core MVC and C# to handle real-time data ingestion from IoT devices. Designing and optimizing MySQL database schema using EF Core (Code-First Migrations). Implementing core business logic, role-based authentication (RBAC), and collaborating following clean architecture principles.",
                    Technologies = "C#, ASP.NET Core, EF Core, MySQL, RabbitMQ, Microservices, Git",
                    DisplayOrder = 1
                },
                new Experience
                {
                    JobTitle = "Web Developer Intern",
                    CompanyName = "Eminent Technology Solution",
                    EmploymentType = "Internship",
                    Location = "Madurai, India",
                    StartDate = new DateTime(2024, 5, 1),
                    EndDate = new DateTime(2024, 6, 30),
                    IsCurrent = false,
                    Description = "Developed a College & Career Guidance Web Application using ASP.NET Core MVC and MySQL for rural students. Implemented role-based authentication for Admin, Student, and College roles with secure access control. Managed institutions, courses, and content data using EF Core Code-First Migrations and designed a simple, responsive Bootstrap UI for users with limited digital exposure.",
                    Technologies = "ASP.NET Core MVC, EF Core, MySQL, C#, Bootstrap",
                    DisplayOrder = 2
                }
            };
            context.Experiences.AddRange(experiences);

            // 6. Seed Certifications & Achievements from Resume
            context.Certifications.RemoveRange(await context.Certifications.ToListAsync());
            var certs = new List<Certification>
            {
                new Certification
                {
                    Name = "Full Stack .NET Developer Course",
                    Issuer = "Appex Technologies, Coimbatore",
                    IssueDate = new DateTime(2025, 1, 1),
                    CredentialId = "APPEX-NET-2025",
                    VerificationUrl = "https://github.com/nambukamali-tech",
                    CertificateUrl = "/certificates/csharp-cert.pdf",
                    Description = "Completed 3-months hands-on training covering ASP.NET MVC, Entity Framework, SQL Server, React, and JavaScript.",
                    DisplayOrder = 1
                },
                new Certification
                {
                    Name = "University 1st Rank Holder (Gold Medalist)",
                    Issuer = "Alagappa University",
                    IssueDate = new DateTime(2025, 5, 1),
                    CredentialId = "ALAGAPPA-RANK-1",
                    VerificationUrl = "https://github.com/nambukamali-tech",
                    CertificateUrl = "/certificates/csharp-cert.pdf",
                    Description = "Awarded University 1st Rank for outstanding academic performance in Master of Science in Computer Science (CGPA: 8.93).",
                    DisplayOrder = 2
                },
                new Certification
                {
                    Name = "Best Outgoing Student Awardee",
                    Issuer = "Government Arts College for Women, Ramanathapuram",
                    IssueDate = new DateTime(2025, 4, 1),
                    CredentialId = "GACW-BEST-OUTGOING-2025",
                    VerificationUrl = "https://github.com/nambukamali-tech",
                    CertificateUrl = "/certificates/csharp-cert.pdf",
                    Description = "Honored with the Best Outgoing Student Award for academic excellence and leadership in Computer Science.",
                    DisplayOrder = 3
                },
                new Certification
                {
                    Name = "University 5th Rank Holder",
                    Issuer = "Alagappa University",
                    IssueDate = new DateTime(2023, 5, 1),
                    CredentialId = "ALAGAPPA-RANK-5",
                    VerificationUrl = "https://github.com/nambukamali-tech",
                    CertificateUrl = "/certificates/csharp-cert.pdf",
                    Description = "Ranked 5th across the entire university in Bachelor of Science in Computer Science (CGPA: 8.7).",
                    DisplayOrder = 4
                }
            };
            context.Certifications.AddRange(certs);

            // 7. Seed Education from Resume
            context.Educations.RemoveRange(await context.Educations.ToListAsync());
            var educationList = new List<Education>
            {
                new Education
                {
                    Qualification = "Master of Science (Computer Science) - CGPA: 8.93",
                    Institution = "Government Arts College for Women, Ramanathapuram",
                    StartDate = new DateTime(2023, 8, 1),
                    EndDate = new DateTime(2025, 5, 1),
                    Description = "University 1st Rank Holder (Gold Medalist). Specialized in Advanced Database Systems, Software Architecture, Web Application Development, and Data Science.",
                    DisplayOrder = 1
                },
                new Education
                {
                    Qualification = "Bachelor of Science (Computer Science) - CGPA: 8.7",
                    Institution = "Caussanel College of Arts and Science, Ramanathapuram",
                    StartDate = new DateTime(2020, 8, 1),
                    EndDate = new DateTime(2023, 5, 1),
                    Description = "University 5th Rank Holder. Core focus on Object-Oriented Programming (C#), Data Structures & Algorithms, Relational Database Management Systems, and Web Engineering.",
                    DisplayOrder = 2
                }
            };
            context.Educations.AddRange(educationList);

            await context.SaveChangesAsync();
        }
    }
}
