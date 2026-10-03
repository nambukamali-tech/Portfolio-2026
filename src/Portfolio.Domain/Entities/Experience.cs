using System;

namespace Portfolio.Domain.Entities
{
    public class Experience : BaseEntity
    {
        public string JobTitle { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string EmploymentType { get; set; } = "Full-time"; // Full-time, Internship, Contract, Freelance
        public string Location { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrent { get; set; } = false;
        public string Description { get; set; } = string.Empty;
        public string Technologies { get; set; } = string.Empty; // Comma separated tags
        public int DisplayOrder { get; set; } = 0;
    }
}
