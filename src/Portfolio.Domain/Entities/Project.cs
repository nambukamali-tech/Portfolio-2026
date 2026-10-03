namespace Portfolio.Domain.Entities
{
    public class Project : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string FullDescription { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string Category { get; set; } = "Full-Stack"; // Full-Stack, Backend, Frontend, Mobile
        public string Technologies { get; set; } = string.Empty; // Comma separated tags
        public string GitHubUrl { get; set; } = string.Empty;
        public string LiveDemoUrl { get; set; } = string.Empty;
        public string ProjectStatus { get; set; } = "Completed"; // Completed, In Progress, Architecture Preview
        public bool IsFeatured { get; set; } = true;
        public bool IsPublished { get; set; } = true;
        public int DisplayOrder { get; set; } = 0;
        public string ProblemStatement { get; set; } = string.Empty;
        public string SolutionOverview { get; set; } = string.Empty;
        public string ArchitectureNotes { get; set; } = string.Empty;
    }
}
