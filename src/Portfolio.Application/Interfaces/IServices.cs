using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(AdminUser user);
    }

    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string passwordHash);
    }

    public interface IFileStorageService
    {
        Task<string> SaveFileAsync(byte[] fileBytes, string fileName, string contentType);
        Task<bool> DeleteFileAsync(string relativePath);
    }
}
