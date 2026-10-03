using System;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using Portfolio.Api.Middleware;
using Portfolio.Application.Interfaces;
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add DB Context (PostgreSQL with automatic SQLite fallback for local dev)
var pgConnection = builder.Configuration.GetConnectionString("DefaultConnection");
var sqliteConnection = builder.Configuration.GetConnectionString("SqliteConnection");

bool canConnectPg = false;
if (!string.IsNullOrWhiteSpace(pgConnection) && !pgConnection.Contains("YOUR_POSTGRES_PASSWORD"))
{
    try
    {
        using var testConn = new NpgsqlConnection(pgConnection);
        testConn.Open();
        canConnectPg = true;
    }
    catch
    {
        canConnectPg = false;
    }
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    if (canConnectPg)
    {
        options.UseNpgsql(pgConnection);
    }
    else
    {
        options.UseSqlite(sqliteConnection);
    }
});

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<IFileStorageService, LocalFileStorageService>();

// 2. Add JWT Authentication & Security Configuration
var secretKey = builder.Configuration["Jwt:SecretKey"];
if (string.IsNullOrWhiteSpace(secretKey) || secretKey.Length < 32)
{
    if (builder.Environment.IsProduction())
    {
        throw new InvalidOperationException("FATAL: Production Jwt:SecretKey must be explicitly set and at least 32 characters long.");
    }
    secretKey = "DEV_ONLY_TEMPORARY_SECRET_KEY_PORTFOLIO_NET10_2026_DO_NOT_USE_IN_PROD!";
}

var key = Encoding.UTF8.GetBytes(secretKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = builder.Environment.IsProduction();
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "PortfolioApi",
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "PortfolioClient",
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// 3. Add Controllers & Configured CORS Policy
builder.Services.AddControllers();

var allowedOriginsSetting = builder.Configuration["AllowedOrigins"];
var allowedOrigins = !string.IsNullOrWhiteSpace(allowedOriginsSetting)
    ? allowedOriginsSetting.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    : new[] { "http://localhost:5173", "http://localhost:3000", "http://localhost:8080" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("ConfiguredCorsPolicy", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        }
        else
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

// 4. Add Rate Limiters (Contact Form & Auth Endpoint)
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("ContactLimiter", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 5;
    });

    options.AddFixedWindowLimiter("AuthLimiter", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 5;
    });
});

// 5. Add Swagger / OpenAPI documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 6. Security Headers & Middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    if (app.Environment.IsProduction())
    {
        context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    await next();
});

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Nambu Kamali Portfolio API v1");
    });
}
else
{
    app.UseHttpsRedirection();
}

app.UseStaticFiles();
app.UseCors("ConfiguredCorsPolicy");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// 7. Initialize & Seed Database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var db = services.GetRequiredService<ApplicationDbContext>();
        var hasher = services.GetRequiredService<IPasswordHasher>();
        var config = services.GetRequiredService<IConfiguration>();
        
        await db.Database.EnsureCreatedAsync();
        await InitialDataSeeder.SeedAsync(db, hasher, config);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database initialization exception: {ex.Message}");
    }
}

app.Run();
