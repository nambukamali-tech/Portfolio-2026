export interface Profile {
  id: string;
  fullName: string;
  headline: string;
  summary: string;
  location: string;
  profileImageUrl: string;
  resumeUrl: string;
  email: string;
  linkedInUrl: string;
  gitHubUrl: string;
  availabilityStatus: string;
  yearsExperience: number;
  projectsCompleted: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  displayOrder: number;
  isVisible: boolean;
  proficiencyLevel?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  displayOrder: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnailUrl: string;
  category: string;
  technologies: string[];
  gitHubUrl: string;
  liveDemoUrl: string;
  projectStatus: string;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  problemStatement: string;
  solutionOverview: string;
  architectureNotes: string;
  createdAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl: string;
  certificateUrl: string;
  description: string;
  displayOrder: number;
}

export interface Education {
  id: string;
  qualification: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description: string;
  displayOrder: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  isActive: boolean;
  displayOrder: number;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  readAt?: string;
}

export interface DashboardOverview {
  totalProjects: number;
  totalSkills: number;
  totalCertifications: number;
  unreadMessages: number;
  recentMessages: ContactMessage[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
