using System;

namespace Portfolio.Domain.Entities
{
    public class Certification : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public DateTime IssueDate { get; set; }
        public string? CredentialId { get; set; }
        public string VerificationUrl { get; set; } = string.Empty;
        public string CertificateUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DisplayOrder { get; set; } = 0;
    }
}
