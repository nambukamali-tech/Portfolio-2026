import axios from 'axios';
import type {
  Profile, Skill, Experience, Project, Certification, Education, ServiceItem,
  ContactMessage, DashboardOverview, PagedResult
} from '../types/portfolio';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fallbackProfile: Profile = {
  id: '1',
  fullName: 'Nambu Kamali',
  headline: 'Junior Software Developer | .NET & React Specialist',
  summary: 'Passionate Junior Full-Stack Developer specializing in building modern, scalable web applications with ASP.NET Core and React. Focused on Clean Architecture, database optimization, and high-performance UI components.',
  location: 'India',
  profileImageUrl: '/images/profile.jpg',
  resumeUrl: '/resume.pdf',
  email: 'nambukamali@example.com',
  linkedInUrl: 'https://linkedin.com/in/nambukamali',
  gitHubUrl: 'https://github.com/nambukamali',
  availabilityStatus: 'Open to opportunities',
  yearsExperience: 1,
  projectsCompleted: 8,
};

export const portfolioApi = {
  getProfile: async (): Promise<Profile> => {
    try {
      const res = await apiClient.get<Profile>('/profile');
      return res.data;
    } catch {
      return fallbackProfile;
    }
  },

  getSkills: async (category?: string): Promise<Skill[]> => {
    try {
      const res = await apiClient.get<Skill[]>('/skills', { params: { category } });
      return res.data;
    } catch {
      return [
        { id: '1', name: 'C#', category: 'Backend', icon: 'Terminal', displayOrder: 1, isVisible: true },
        { id: '2', name: 'ASP.NET Core Web API', category: 'Backend', icon: 'Server', displayOrder: 2, isVisible: true },
        { id: '3', name: 'Entity Framework Core', category: 'Backend', icon: 'Database', displayOrder: 3, isVisible: true },
        { id: '4', name: 'React', category: 'Frontend', icon: 'Atom', displayOrder: 4, isVisible: true },
        { id: '5', name: 'TypeScript', category: 'Frontend', icon: 'FileCode2', displayOrder: 5, isVisible: true },
        { id: '6', name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', displayOrder: 6, isVisible: true },
        { id: '7', name: 'PostgreSQL', category: 'Database', icon: 'DatabaseBackup', displayOrder: 7, isVisible: true },
        { id: '8', name: 'Clean Architecture', category: 'Architecture & Concepts', icon: 'Cpu', displayOrder: 8, isVisible: true },
      ];
    }
  },

  getExperiences: async (): Promise<Experience[]> => {
    try {
      const res = await apiClient.get<Experience[]>('/experience');
      return res.data;
    } catch {
      return [
        {
          id: '1',
          jobTitle: 'Junior Full-Stack Developer',
          companyName: 'Software Solutions Ltd',
          employmentType: 'Full-time',
          location: 'India',
          startDate: '2025-01-01',
          isCurrent: true,
          description: 'Developing full-stack web applications with ASP.NET Core and React. Designing REST APIs, database schemas in PostgreSQL, and clean user interfaces.',
          technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'EF Core'],
          displayOrder: 1,
        }
      ];
    }
  },

  getProjects: async (category?: string, search?: string, page = 1, pageSize = 6): Promise<PagedResult<Project>> => {
    try {
      const res = await apiClient.get<PagedResult<Project>>('/projects', {
        params: { category, search, page, pageSize }
      });
      return res.data;
    } catch {
      const sampleProjects: Project[] = [
        {
          id: '1',
          title: 'Field Force Management (FFM)',
          slug: 'field-force-management',
          shortDescription: 'Enterprise platform for mobile workforce assignment, location updates, and task analytics.',
          fullDescription: 'Field Force Management system connecting central operations with field technicians. Built with ASP.NET Core Clean Architecture on backend and React frontend.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          category: 'Full-Stack',
          technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'EF Core', 'Tailwind CSS'],
          gitHubUrl: 'https://github.com/nambukamali/ffm-system',
          liveDemoUrl: 'https://ffm-demo.example.com',
          projectStatus: 'Completed',
          isFeatured: true,
          isPublished: true,
          displayOrder: 1,
          problemStatement: 'Field agents needed real-time sync for assignment reporting without manual delay.',
          solutionOverview: 'Built central ASP.NET REST API with instant state tracking and interactive web dashboard.',
          architectureNotes: 'Clean Architecture with EF Core PostgreSQL and JWT authorization.',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Full-Stack Developer Portfolio Engine',
          slug: 'developer-portfolio-engine',
          shortDescription: 'Futuristic portfolio web application with dynamic REST API integrations and admin dashboard.',
          fullDescription: 'Custom portfolio web application built with React + Vite frontend and ASP.NET Core Web API backend.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          category: 'Full-Stack',
          technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Framer Motion', 'Tailwind CSS'],
          gitHubUrl: 'https://github.com/nambukamali/portfolio-engine',
          liveDemoUrl: 'https://nambukamali.dev',
          projectStatus: 'Completed',
          isFeatured: true,
          isPublished: true,
          displayOrder: 2,
          problemStatement: 'Static portfolios lack live backend capability and contact persistence.',
          solutionOverview: 'Created dynamic full-stack portfolio with JWT admin control.',
          architectureNotes: 'ASP.NET Core Clean Architecture with FluentValidation & PostgreSQL.',
          createdAt: new Date().toISOString()
        }
      ];

      return {
        items: sampleProjects,
        totalCount: sampleProjects.length,
        pageNumber: 1,
        pageSize: 6,
        totalPages: 1
      };
    }
  },

  getCertifications: async (): Promise<Certification[]> => {
    try {
      const res = await apiClient.get<Certification[]>('/certifications');
      return res.data;
    } catch {
      return [
        {
          id: '1',
          name: 'Foundational C# & ASP.NET Core Web Development',
          issuer: 'Microsoft & FreeCodeCamp',
          issueDate: '2025-06-01',
          credentialId: 'MSFT-CS-2026',
          verificationUrl: 'https://learn.microsoft.com',
          certificateUrl: '/certificates/csharp-cert.pdf',
          description: 'Comprehensive verification of core C# syntax, object-oriented principles, LINQ, and REST API development.',
          displayOrder: 1
        }
      ];
    }
  },

  getEducation: async (): Promise<Education[]> => {
    try {
      const res = await apiClient.get<Education[]>('/education');
      return res.data;
    } catch {
      return [
        {
          id: '1',
          qualification: 'Bachelor of Technology in Computer Science',
          institution: 'University Institute of Technology',
          startDate: '2021-08-01',
          endDate: '2025-05-01',
          description: 'Focused on Data Structures, Algorithms, Software Engineering, Database Systems, and Web Engineering.',
          displayOrder: 1
        }
      ];
    }
  },

  getServices: async (): Promise<ServiceItem[]> => {
    try {
      const res = await apiClient.get<ServiceItem[]>('/services');
      return res.data;
    } catch {
      return [
        {
          id: '1',
          title: 'ASP.NET Core Web API Development',
          description: 'Building robust, scalable, and secure RESTful Web APIs using C#, ASP.NET Core, Clean Architecture, and Entity Framework Core.',
          icon: 'Server',
          technologies: ['C#', 'ASP.NET Core', 'Swagger', 'JWT', 'EF Core'],
          isActive: true,
          displayOrder: 1
        },
        {
          id: '2',
          title: 'React & TypeScript Frontend UI',
          description: 'Crafting high-performance, modern, dynamic user interfaces using React, TypeScript, Tailwind CSS, and fluid animations.',
          icon: 'Layout',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          isActive: true,
          displayOrder: 2
        },
        {
          id: '3',
          title: 'PostgreSQL Database Integration',
          description: 'Designing normalized relational database schemas, creating EF Core migrations, writing LINQ queries, and query optimization.',
          icon: 'Database',
          technologies: ['PostgreSQL', 'SQL', 'LINQ', 'EF Core'],
          isActive: true,
          displayOrder: 3
        }
      ];
    }
  },

  submitContact: async (data: { fullName: string; email: string; subject: string; message: string }) => {
    const res = await apiClient.post('/contact', data);
    return res.data;
  },

  adminLogin: async (email: string, password: string) => {
    const res = await apiClient.post<{ token: string; email: string; username: string; expiresAt: string }>(
      '/admin/auth/login',
      { email, password }
    );
    if (res.data.token) {
      localStorage.setItem('portfolio_admin_token', res.data.token);
      localStorage.setItem('portfolio_admin_user', JSON.stringify({ email: res.data.email, username: res.data.username }));
    }
    return res.data;
  },

  adminLogout: () => {
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
  },

  getAdminOverview: async (): Promise<DashboardOverview> => {
    const res = await apiClient.get<DashboardOverview>('/admin/messages/overview');
    return res.data;
  },

  updateAdminProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const res = await apiClient.put<Profile>('/admin/profile', data);
    return res.data;
  },

  createSkill: async (skill: Partial<Skill>): Promise<Skill> => {
    const res = await apiClient.post<Skill>('/admin/skills', skill);
    return res.data;
  },

  deleteSkill: async (id: string) => {
    await apiClient.delete(`/admin/skills/${id}`);
  },

  createProject: async (project: Partial<Project>): Promise<Project> => {
    const res = await apiClient.post<Project>('/admin/projects', project);
    return res.data;
  },

  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const res = await apiClient.put<Project>(`/admin/projects/${id}`, project);
    return res.data;
  },

  togglePublishProject: async (id: string) => {
    const res = await apiClient.patch(`/admin/projects/${id}/publish`);
    return res.data;
  },

  deleteProject: async (id: string) => {
    await apiClient.delete(`/admin/projects/${id}`);
  },

  getAdminMessages: async (): Promise<ContactMessage[]> => {
    const res = await apiClient.get<ContactMessage[]>('/admin/messages');
    return res.data;
  },

  updateMessageStatus: async (id: string, status: string) => {
    const res = await apiClient.patch(`/admin/messages/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  },

  deleteMessage: async (id: string) => {
    await apiClient.delete(`/admin/messages/${id}`);
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<{ url: string; fileName: string }>('/admin/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};
