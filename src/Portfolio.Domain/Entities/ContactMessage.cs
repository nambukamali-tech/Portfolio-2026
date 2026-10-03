using System;

namespace Portfolio.Domain.Entities
{
    public class ContactMessage : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Status { get; set; } = "Unread"; // Unread, Read, Archived
        public DateTime? ReadAt { get; set; }
    }
}
