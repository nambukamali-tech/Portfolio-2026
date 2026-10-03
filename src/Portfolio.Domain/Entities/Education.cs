using System;

namespace Portfolio.Domain.Entities
{
    public class Education : BaseEntity
    {
        public string Qualification { get; set; } = string.Empty;
        public string Institution { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public int DisplayOrder { get; set; } = 0;
    }
}
