using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Portfolio.Api.Controllers;
using Portfolio.Application.DTOs;
using Portfolio.Domain.Entities;
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Services;
using Xunit;

namespace Portfolio.UnitTests
{
    public class ServicesAndControllersTests
    {
        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new ApplicationDbContext(options);
        }

        [Fact]
        public void PasswordHasher_ShouldHashAndVerifyPasswordCorrectly()
        {
            // Arrange
            var hasher = new PasswordHasher();
            var rawPassword = "SecurePassword123!";

            // Act
            var hash = hasher.HashPassword(rawPassword);
            var isMatch = hasher.VerifyPassword(rawPassword, hash);
            var isInvalidMatch = hasher.VerifyPassword("WrongPassword", hash);

            // Assert
            hash.Should().NotBeNullOrEmpty();
            hash.Should().NotBe(rawPassword);
            isMatch.Should().BeTrue();
            isInvalidMatch.Should().BeFalse();
        }

        [Fact]
        public void JwtTokenGenerator_ShouldGenerateValidTokenString()
        {
            // Arrange
            var inMemorySettings = new Dictionary<string, string?>
            {
                {"Jwt:SecretKey", "VERY_LONG_SECRET_KEY_FOR_UNIT_TESTING_12345!"},
                {"Jwt:Issuer", "TestIssuer"},
                {"Jwt:Audience", "TestAudience"},
                {"Jwt:ExpirationInHours", "12"}
            };

            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            var tokenGenerator = new JwtTokenGenerator(config);
            var adminUser = new AdminUser
            {
                Id = Guid.NewGuid(),
                Username = "testadmin",
                Email = "admin@test.com"
            };

            // Act
            var token = tokenGenerator.GenerateToken(adminUser);

            // Assert
            token.Should().NotBeNullOrEmpty();
            token.Split('.').Should().HaveCount(3); // Standard JWT header.payload.signature format
        }

        [Fact]
        public async Task ContactController_ShouldSaveValidMessage()
        {
            // Arrange
            using var db = GetInMemoryDbContext();
            var controller = new ContactController(db);
            var request = new CreateContactMessageRequest("John Doe", "john@example.com", "Inquiry", "Hello, I want to collaborate.");

            // Act
            var result = await controller.SubmitMessage(request);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var savedMessage = await db.ContactMessages.FirstOrDefaultAsync();
            savedMessage.Should().NotBeNull();
            savedMessage!.FullName.Should().Be("John Doe");
            savedMessage.Email.Should().Be("john@example.com");
            savedMessage.Status.Should().Be("Unread");
        }

        [Fact]
        public async Task ProjectsController_ShouldFilterByCategoryAndSearch()
        {
            // Arrange
            using var db = GetInMemoryDbContext();
            db.Projects.AddRange(
                new Project { Title = "React Portfolio", Slug = "react-portfolio", Category = "Frontend", ShortDescription = "A portfolio in React", Technologies = "React, TS", IsPublished = true },
                new Project { Title = "ASP.NET Core API", Slug = "aspnet-api", Category = "Backend", ShortDescription = "API in C#", Technologies = "C#, ASP.NET", IsPublished = true }
            );
            await db.SaveChangesAsync();

            var controller = new ProjectsController(db);

            // Act
            var frontendResult = await controller.GetProjects("Frontend", null, 1, 10);
            var searchResult = await controller.GetProjects(null, "C#", 1, 10);

            // Assert
            var pagedFrontend = (frontendResult.Result as OkObjectResult)?.Value as PagedResult<ProjectDto>;
            pagedFrontend.Should().NotBeNull();
            pagedFrontend!.Items.Should().HaveCount(1);
            pagedFrontend.Items[0].Title.Should().Be("React Portfolio");

            var pagedSearch = (searchResult.Result as OkObjectResult)?.Value as PagedResult<ProjectDto>;
            pagedSearch.Should().NotBeNull();
            pagedSearch!.Items.Should().HaveCount(1);
            pagedSearch.Items[0].Title.Should().Be("ASP.NET Core API");
        }
    }
}
