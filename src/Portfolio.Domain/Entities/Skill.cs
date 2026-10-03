namespace Portfolio.Domain.Entities
{
    public class Skill : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = "Backend"; // Frontend, Backend, Database, Tools & Platforms, Architecture & Concepts
        public string Icon { get; set; } = "Code2";
        public int DisplayOrder { get; set; } = 0;
        public bool IsVisible { get; set; } = true;
        public string? ProficiencyLevel { get; set; }
    }
}
