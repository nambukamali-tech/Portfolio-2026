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
            // 1. Seed Profile
            if (!await context.Profiles.AnyAsync())
            {
                context.Profiles.Add(new Profile
                {
                    FullName = "Nambu Kamali",
                    Headline = "Junior Software Developer | .NET & React Specialist",
                    Summary = "Driven Junior Full-Stack Developer with expertise in building resilient RESTful APIs using C# and ASP.NET Core, combined with responsive UI components built in React. Highly passionate about Clean Architecture, modern backend design, relational databases (PostgreSQL), and writing maintainable code.",
                    Location = "India",
                    ProfileImageUrl = "/images/profile.jpg",
                    ResumeUrl = "/resume.pdf",
                    Email = "nambukamali@example.com",
                    LinkedInUrl = "https://linkedin.com/in/nambukamali",
                    GitHubUrl = "https://github.com/nambukamali",
                    AvailabilityStatus = "Open to opportunities",
                    YearsExperience = 1,
                    ProjectsCompleted = 8
                });
            }

            // 2. Seed Admin User (Securely from Environment Variables ONLY)
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
                    Console.WriteLine($"[SECURITY]: Initial admin user '{initialEmail}' created from environment configuration.");
                }
                else
                {
                    Console.WriteLine("[SECURITY NOTE]: ADMIN_INITIAL_PASSWORD environment variable not set. Skipping default admin user creation.");
                }
            }

            // 3. Seed Skills
            if (!await context.Skills.AnyAsync())
            {
                var skills = new List<Skill>
                {
                    // Frontend
                    new Skill { Name = "React", Category = "Frontend", Icon = "Atom", DisplayOrder = 1, IsVisible = true },
                    new Skill { Name = "TypeScript", Category = "Frontend", Icon = "FileCode2", DisplayOrder = 2, IsVisible = true },
                    new Skill { Name = "JavaScript (ES6+)", Category = "Frontend", Icon = "Code", DisplayOrder = 3, IsVisible = true },
                    new Skill { Name = "Tailwind CSS", Category = "Frontend", Icon = "Palette", DisplayOrder = 4, IsVisible = true },
                    new Skill { Name = "HTML5 / CSS3", Category = "Frontend", Icon = "Layout", DisplayOrder = 5, IsVisible = true },

                    // Backend
                    new Skill { Name = "C#", Category = "Backend", Icon = "Terminal", DisplayOrder = 6, IsVisible = true },
                    new Skill { Name = "ASP.NET Core Web API", Category = "Backend", Icon = "Server", DisplayOrder = 7, IsVisible = true },
                    new Skill { Name = "Entity Framework Core", Category = "Backend", Icon = "Database", DisplayOrder = 8, IsVisible = true },
                    new Skill { Name = "LINQ", Category = "Backend", Icon = "Filter", DisplayOrder = 9, IsVisible = true },
                    new Skill { Name = "JWT Authentication", Category = "Backend", Icon = "KeyRound", DisplayOrder = 10, IsVisible = true },

                    // Database
                    new Skill { Name = "PostgreSQL", Category = "Database", Icon = "DatabaseBackup", DisplayOrder = 11, IsVisible = true },
                    new Skill { Name = "SQL & Schema Design", Category = "Database", Icon = "Table", DisplayOrder = 12, IsVisible = true },

                    // Tools & Platforms
                    new Skill { Name = "Git & GitHub", Category = "Tools & Platforms", Icon = "GitBranch", DisplayOrder = 13, IsVisible = true },
                    new Skill { Name = "Docker", Category = "Tools & Platforms", Icon = "Box", DisplayOrder = 14, IsVisible = true },
                    new Skill { Name = "Swagger / OpenAPI", Category = "Tools & Platforms", Icon = "FileText", DisplayOrder = 15, IsVisible = true },
                    new Skill { Name = "Visual Studio / VS Code", Category = "Tools & Platforms", Icon = "Laptop", DisplayOrder = 16, IsVisible = true },

                    // Architecture & Concepts
                    new Skill { Name = "Clean Architecture", Category = "Architecture & Concepts", Icon = "Cpu", DisplayOrder = 17, IsVisible = true },
                    new Skill { Name = "SOLID Principles", Category = "Architecture & Concepts", Icon = "CheckCircle2", DisplayOrder = 18, IsVisible = true },
                    new Skill { Name = "RESTful API Design", Category = "Architecture & Concepts", Icon = "Network", DisplayOrder = 19, IsVisible = true },
                    new Skill { Name = "API Security & Rate Limiting", Category = "Architecture & Concepts", Icon = "ShieldCheck", DisplayOrder = 20, IsVisible = true }
                };

                context.Skills.AddRange(skills);
            }

            // 4. Seed Projects
            if (!await context.Projects.AnyAsync())
            {
                var projects = new List<Project>
                {
                    new Project
                    {
                        Title = "Field Force Management (FFM)",
                        Slug = "field-force-management",
                        ShortDescription = "An enterprise mobile and web platform for tracking field agent operations, job allocations, real-time status reporting, and location tracking.",
                        FullDescription = "Field Force Management (FFM) empowers organizations to manage mobile teams effectively. Built with ASP.NET Core Clean Architecture on the backend and React on the frontend, featuring real-time synchronization, role-based access control, and analytical dashboards.",
                        ThumbnailUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                        Category = "Full-Stack",
                        Technologies = "C#, ASP.NET Core, React, TypeScript, PostgreSQL, Entity Framework Core, Tailwind CSS",
                        GitHubUrl = "https://github.com/nambukamali/ffm-system",
                        LiveDemoUrl = "https://ffm-demo.example.com",
                        ProjectStatus = "Completed",
                        IsFeatured = true,
                        IsPublished = true,
                        DisplayOrder = 1,
                        ProblemStatement = "Field service operations struggled with delayed manual status updates, untracked locations, and communication bottlenecks between central managers and field agents.",
                        SolutionOverview = "Developed a central management portal with REST APIs for real-time task updates, automated agent routing, and instant incident logging.",
                        ArchitectureNotes = "Designed following Clean Architecture principles separating Domain entities, Application use cases, EF Core PostgreSQL infrastructure, and JWT authenticated API endpoints."
                    },
                    new Project
                    {
                        Title = "Full-Stack Developer Portfolio Engine",
                        Slug = "developer-portfolio-engine",
                        ShortDescription = "A futuristic midnight-blue developer portfolio with dynamic REST API integrations, animated tech orbit visualizer, and a full admin management portal.",
                        FullDescription = "Custom portfolio web application built with React + Vite frontend and ASP.NET Core Web API backend. Features dynamic skill filtering, project showcases, contact message handling with rate limiting, and an admin dashboard for live content editing.",
                        ThumbnailUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
                        Category = "Full-Stack",
                        Technologies = "C#, ASP.NET Core, React, TypeScript, PostgreSQL, Framer Motion, Tailwind CSS, JWT",
                        GitHubUrl = "https://github.com/nambukamali/portfolio-engine",
                        LiveDemoUrl = "https://nambukamali.dev",
                        ProjectStatus = "Completed",
                        IsFeatured = true,
                        IsPublished = true,
                        DisplayOrder = 2,
                        ProblemStatement = "Static developer portfolios lack interactivity, real API integration, and require code edits for updating skills, projects, or contact settings.",
                        SolutionOverview = "Built a fully dynamic full-stack system with EF Core PostgreSQL persistence, JWT-secured admin control panel, client-side input validation, and fluid UI animations.",
                        ArchitectureNotes = "Modular Clean Architecture solution utilizing DTO mapping, FluentValidation, BCrypt authentication, rate limiting, and responsive design system."
                    },
                    new Project
                    {
                        Title = "Task & Workflow API Service",
                        Slug = "task-workflow-api",
                        ShortDescription = "High-performance REST API for enterprise task distribution, priority queuing, JWT authentication, and structured error reporting.",
                        FullDescription = "Robust backend Web API service designed to support team task allocation, status audit trails, priority queue management, and automated email notifications.",
                        ThumbnailUrl = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
                        Category = "Backend",
                        Technologies = "C#, ASP.NET Core, PostgreSQL, Swagger, Docker, Serilog",
                        GitHubUrl = "https://github.com/nambukamali/task-workflow-api",
                        LiveDemoUrl = "https://api-demo.example.com/swagger",
                        ProjectStatus = "Completed",
                        IsFeatured = true,
                        IsPublished = true,
                        DisplayOrder = 3,
                        ProblemStatement = "Legacy workflow microservice suffered from missing request validations and lack of structured logging during peak traffic periods.",
                        SolutionOverview = "Implemented standardized API responses, database indexes, centralized error middleware, and rate-limited endpoints.",
                        ArchitectureNotes = "Entity Framework Core with PostgreSQL migrations, Repository pattern abstractions, and Swagger OpenAPI documentation."
                    }
                };

                context.Projects.AddRange(projects);
            }

            // 5. Seed Experience
            if (!await context.Experiences.AnyAsync())
            {
                context.Experiences.Add(new Experience
                {
                    JobTitle = "Junior Full-Stack Developer",
                    CompanyName = "Software Solutions Ltd",
                    EmploymentType = "Full-time",
                    Location = "India",
                    StartDate = DateTime.UtcNow.AddMonths(-10),
                    IsCurrent = true,
                    Description = "Contributed to building full-stack web applications using ASP.NET Core Web API and React. Developed secure REST endpoints, optimized PostgreSQL database queries, built reusable frontend components, and implemented JWT security.",
                    Technologies = "C#, ASP.NET Core, React, TypeScript, PostgreSQL, EF Core, Git",
                    DisplayOrder = 1
                });
            }

            // 6. Seed Certifications
            if (!await context.Certifications.AnyAsync())
            {
                context.Certifications.Add(new Certification
                {
                    Name = "Foundational C# & ASP.NET Core Web Development",
                    Issuer = "Microsoft & FreeCodeCamp / Online Learning",
                    IssueDate = DateTime.UtcNow.AddMonths(-6),
                    CredentialId = "MSFT-CS-2026",
                    VerificationUrl = "https://learn.microsoft.com",
                    CertificateUrl = "/certificates/csharp-cert.pdf",
                    Description = "Comprehensive verification of core C# syntax, object-oriented principles, LINQ, and REST API development with ASP.NET Core.",
                    DisplayOrder = 1
                });
            }

            // 7. Seed Education
            if (!await context.Educations.AnyAsync())
            {
                context.Educations.Add(new Education
                {
                    Qualification = "Bachelor of Engineering / Technology in Computer Science",
                    Institution = "University Institute of Technology",
                    StartDate = new DateTime(2021, 8, 1),
                    EndDate = new DateTime(2025, 5, 1),
                    Description = "Focused on Data Structures, Algorithms, Database Management Systems, Software Engineering Principles, and Web Development.",
                    DisplayOrder = 1
                });
            }

            // 8. Seed Services
            if (!await context.Services.AnyAsync())
            {
                var services = new List<ServiceItem>
                {
                    new ServiceItem
                    {
                        Title = "ASP.NET Core Web API Development",
                        Description = "Building robust, scalable, and secure RESTful Web APIs using C#, ASP.NET Core, Clean Architecture, and Entity Framework Core.",
                        Icon = "Server",
                        Technologies = "C#, ASP.NET Core, Swagger, JWT, EF Core",
                        IsActive = true,
                        DisplayOrder = 1
                    },
                    new ServiceItem
                    {
                        Title = "React & TypeScript Frontend UI",
                        Description = "Crafting high-performance, modern, dynamic user interfaces using React, TypeScript, Tailwind CSS, and fluid animations.",
                        Icon = "Layout",
                        Technologies = "React, TypeScript, Tailwind CSS, Framer Motion",
                        IsActive = true,
                        DisplayOrder = 2
                    },
                    new ServiceItem
                    {
                        Title = "PostgreSQL Database Integration",
                        Description = "Designing normalized relational database schemas, creating EF Core migrations, writing efficient LINQ queries, and indexing for optimal query performance.",
                        Icon = "Database",
                        Technologies = "PostgreSQL, SQL, LINQ, EF Core",
                        IsActive = true,
                        DisplayOrder = 3
                    },
                    new ServiceItem
                    {
                        Title = "Full-Stack Web Application Engineering",
                        Description = "End-to-end web application development connecting frontend React interfaces to backend C# APIs with authentication, state management, and deployment readiness.",
                        Icon = "Layers",
                        Technologies = "React, C#, ASP.NET Core, PostgreSQL, Docker",
                        IsActive = true,
                        DisplayOrder = 4
                    }
                };

                context.Services.AddRange(services);
            }

            await context.SaveChangesAsync();
        }
    }
}
