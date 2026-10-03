using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Profile> Profiles { get; }
        DbSet<Skill> Skills { get; }
        DbSet<Experience> Experiences { get; }
        DbSet<Project> Projects { get; }
        DbSet<Certification> Certifications { get; }
        DbSet<Education> Educations { get; }
        DbSet<ServiceItem> Services { get; }
        DbSet<ContactMessage> ContactMessages { get; }
        DbSet<AdminUser> AdminUsers { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
