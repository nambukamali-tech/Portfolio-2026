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
  fullName: 'Nambu Kamali N',
  headline: 'Full Stack .NET Developer | ASP.NET Core & React Specialist',
  summary: 'University 1st Rank Holder (Alagappa University, 2025) and Full Stack .NET Developer with hands-on experience across two software engineering roles. Proficient in ASP.NET Core, C#, Entity Framework Core, SQL Server, MySQL, Postgres, and React.js. Demonstrated ability to build secure backend REST APIs, implement role-based access control (RBAC), microservices with RabbitMQ, and deliver optimized database-driven applications with a strong foundation in clean architecture.',
  location: 'Coimbatore, Tamil Nadu, India',
  profileImageUrl: '/images/profile.jpg',
  resumeUrl: '/resume.pdf',
  email: 'nambukamali@gmail.com',
  linkedInUrl: 'https://linkedin.com/in/nambu-kamali-531233265/',
  gitHubUrl: 'https://github.com/nambukamali-tech',
  availabilityStatus: 'Open to opportunities',
  yearsExperience: 1,
  projectsCompleted: 6,
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
        { id: '2', name: 'ASP.NET Core', category: 'Backend', icon: 'Server', displayOrder: 2, isVisible: true },
        { id: '3', name: 'ASP.NET Core Web API', category: 'Backend', icon: 'Network', displayOrder: 3, isVisible: true },
        { id: '4', name: 'Entity Framework Core', category: 'Backend', icon: 'Database', displayOrder: 4, isVisible: true },
        { id: '5', name: 'ASP.NET MVC', category: 'Backend', icon: 'Layers', displayOrder: 5, isVisible: true },
        { id: '6', name: 'LINQ', category: 'Backend', icon: 'Filter', displayOrder: 6, isVisible: true },
        { id: '7', name: 'React.js', category: 'Frontend', icon: 'Atom', displayOrder: 7, isVisible: true },
        { id: '8', name: 'JavaScript', category: 'Frontend', icon: 'Code', displayOrder: 8, isVisible: true },
        { id: '9', name: 'HTML5 / CSS3', category: 'Frontend', icon: 'Layout', displayOrder: 9, isVisible: true },
        { id: '10', name: 'SQL Server', category: 'Database', icon: 'Database', displayOrder: 10, isVisible: true },
        { id: '11', name: 'MySQL', category: 'Database', icon: 'Table', displayOrder: 11, isVisible: true },
        { id: '12', name: 'PostgreSQL', category: 'Database', icon: 'DatabaseBackup', displayOrder: 12, isVisible: true },
        { id: '13', name: 'Visual Studio / VS Code', category: 'Tools & Platforms', icon: 'Laptop', displayOrder: 13, isVisible: true },
        { id: '14', name: 'Git & GitHub', category: 'Tools & Platforms', icon: 'GitBranch', DisplayOrder: 14, isVisible: true } as any,
        { id: '15', name: 'RabbitMQ & Microservices', category: 'Architecture & Concepts', icon: 'Cpu', displayOrder: 15, isVisible: true },
        { id: '16', name: 'Clean Architecture & RBAC', category: 'Architecture & Concepts', icon: 'ShieldCheck', displayOrder: 16, isVisible: true }
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
          jobTitle: 'Junior Software Developer',
          companyName: 'PrimeMover Solutions',
          employmentType: 'Full-time',
          location: 'Coimbatore, India',
          startDate: '2026-03-01',
          isCurrent: true,
          description: 'Promoted from Backend Developer Intern (Dec 2025 - Feb 2026) to Junior Software Developer. Currently developing backend APIs and managing the database for Ackcio, a real-time IoT-based monitoring system. Building and maintaining RESTful APIs using ASP.NET Core MVC and C# to handle real-time data ingestion from IoT devices. Designing and optimizing MySQL database schema using EF Core Code-First Migrations.',
          technologies: ['C#', 'ASP.NET Core', 'EF Core', 'MySQL', 'RabbitMQ', 'Microservices', 'Git'],
          displayOrder: 1,
        },
        {
          id: '2',
          jobTitle: 'Web Developer Intern',
          companyName: 'Eminent Technology Solution',
          employmentType: 'Internship',
          location: 'Madurai, India',
          startDate: '2024-05-01',
          endDate: '2024-06-30',
          isCurrent: false,
          description: 'Developed a College & Career Guidance Web Application using ASP.NET Core MVC and MySQL for rural students. Implemented role-based authentication for Admin, Student, and College roles with secure access control. Managed institutions, courses, and content data using EF Core Code-First Migrations.',
          technologies: ['ASP.NET Core MVC', 'EF Core', 'MySQL', 'C#', 'Bootstrap'],
          displayOrder: 2,
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
          title: 'Ackcio - IoT Monitoring System',
          slug: 'ackcio-iot-monitoring-system',
          shortDescription: 'Real-time IoT-based structural and asset monitoring platform handling continuous sensor data streams.',
          fullDescription: 'Building secure ASP.NET Core Web APIs to receive, process, and store continuous data streams from IoT devices. Developing microservices using microservice architecture and RabbitMQ for asynchronous communication and message processing. Designing and optimizing database schemas for time-series sensor data with efficient querying and role-based access control (RBAC).',
          thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          category: 'Backend',
          technologies: ['C#', 'ASP.NET Core Web API', 'EF Core', 'MySQL', 'RabbitMQ', 'Microservices', 'React.js'],
          gitHubUrl: 'https://github.com/nambukamali-tech/ackcio-iot-monitoring',
          liveDemoUrl: 'https://github.com/nambukamali-tech',
          projectStatus: 'In Progress',
          isFeatured: true,
          isPublished: true,
          displayOrder: 1,
          problemStatement: 'Handling high-volume continuous time-series data streams from IoT structural sensors requires low latency and asynchronous message processing.',
          solutionOverview: 'Implemented ASP.NET Core REST APIs with RabbitMQ message queues for asynchronous ingestion and optimized MySQL schema using EF Core Code-First migrations.',
          architectureNotes: 'Microservices architecture utilizing RabbitMQ for decoupled message processing, RBAC for secure API endpoints, and clean code principles.',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Student Portal Web Application',
          slug: 'student-portal-web-app',
          shortDescription: 'Full-stack web application following Clean Architecture for managing student profiles, scholarships, papers, and attendance.',
          fullDescription: 'Built a full-stack web application using ASP.NET Core MVC, Entity Framework Core, and MySQL following clean architecture principles. Implemented role-based authentication (Admin & Staff) and developed CRUD modules for students, scholarships, research papers, and attendance records.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
          category: 'Full-Stack',
          technologies: ['C#', 'ASP.NET Core MVC', 'EF Core', 'MySQL', 'Bootstrap', 'LINQ'],
          gitHubUrl: 'https://github.com/nambukamali-tech/student-portal',
          liveDemoUrl: 'https://github.com/nambukamali-tech',
          projectStatus: 'Completed',
          isFeatured: true,
          isPublished: true,
          displayOrder: 2,
          problemStatement: 'Educational institutions required a unified portal to manage multi-role administrative data with strict access control.',
          solutionOverview: 'Developed role-based authentication (Admin & Staff) with clean layer separation, dependency injection, and EF Core Code-First migrations.',
          architectureNotes: 'Clean Architecture in ASP.NET Core MVC with custom middleware for request processing and dependency injection.',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Online Ticket Booking Web Application',
          slug: 'online-ticket-booking-app',
          shortDescription: 'Full-stack ticket booking platform built with React.js frontend and ASP.NET Core MVC backend.',
          fullDescription: 'Built a full-stack web application using React.js frontend and ASP.NET Core MVC backend with clean client-server architecture. Implemented secure login/signup system with role-based access for Admin and Users. Developed ticket booking features with real-time availability and an Admin Dashboard to monitor bookings.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
          category: 'Full-Stack',
          technologies: ['React.js', 'ASP.NET Core', 'C#', 'Web API', 'SQL Server', 'JavaScript'],
          gitHubUrl: 'https://github.com/nambukamali-tech/online-ticket-booking',
          liveDemoUrl: 'https://github.com/nambukamali-tech',
          projectStatus: 'Completed',
          isFeatured: true,
          isPublished: true,
          displayOrder: 3,
          problemStatement: 'Users needed a responsive interface to check ticket availability and complete bookings while administrators needed a live dashboard.',
          solutionOverview: 'Decoupled React.js frontend communicating with ASP.NET Core backend REST endpoints, featuring live seat availability updates and RBAC security.',
          architectureNotes: 'Client-server architecture separating React SPA state management from ASP.NET Core business logic and SQL Server persistence.',
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Rural Guider - College & Career Guidance Web App',
          slug: 'rural-guider-career-app',
          shortDescription: 'Career guidance platform helping rural students discover colleges and career opportunities.',
          fullDescription: 'Built a full-stack web app using ASP.NET Core MVC, Entity Framework Core, and MySQL to help rural students find colleges and career paths. Implemented role-based authentication for Admin, Student, and College roles with secure login and controlled access.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
          category: 'Full-Stack',
          technologies: ['ASP.NET Core MVC', 'EF Core', 'MySQL', 'Bootstrap', 'C#'],
          gitHubUrl: 'https://github.com/nambukamali-tech/rural-guider',
          liveDemoUrl: 'https://github.com/nambukamali-tech',
          projectStatus: 'Completed',
          isFeatured: true,
          isPublished: true,
          displayOrder: 4,
          problemStatement: 'Rural students lacked structured digital guidance for exploring higher education colleges and career pathways.',
          solutionOverview: 'Designed an intuitive, accessible Bootstrap interface tailored for low-bandwidth users, backed by ASP.NET Core MVC and MySQL.',
          architectureNotes: 'Multi-role RBAC architecture (Admin, Student, College) with EF Core Code-First migrations and optimized database queries.',
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
          name: 'Full Stack .NET Developer Course',
          issuer: 'Appex Technologies, Coimbatore',
          issueDate: '2025-01-01',
          credentialId: 'APPEX-NET-2025',
          verificationUrl: 'https://github.com/nambukamali-tech',
          certificateUrl: '/certificates/csharp-cert.pdf',
          description: 'Completed 3-months hands-on training covering ASP.NET MVC, Entity Framework, SQL Server, React, and JavaScript.',
          displayOrder: 1
        },
        {
          id: '2',
          name: 'University 1st Rank Holder (Gold Medalist)',
          issuer: 'Alagappa University',
          issueDate: '2025-05-01',
          credentialId: 'ALAGAPPA-RANK-1',
          verificationUrl: 'https://github.com/nambukamali-tech',
          certificateUrl: '/certificates/csharp-cert.pdf',
          description: 'Awarded University 1st Rank for outstanding academic performance in Master of Science in Computer Science (CGPA: 8.93).',
          displayOrder: 2
        },
        {
          id: '3',
          name: 'Best Outgoing Student Awardee',
          issuer: 'Government Arts College for Women, Ramanathapuram',
          issueDate: '2025-04-01',
          credentialId: 'GACW-BEST-OUTGOING-2025',
          verificationUrl: 'https://github.com/nambukamali-tech',
          certificateUrl: '/certificates/csharp-cert.pdf',
          description: 'Honored with the Best Outgoing Student Award for academic excellence and leadership in Computer Science.',
          displayOrder: 3
        },
        {
          id: '4',
          name: 'University 5th Rank Holder',
          issuer: 'Alagappa University',
          issueDate: '2023-05-01',
          credentialId: 'ALAGAPPA-RANK-5',
          verificationUrl: 'https://github.com/nambukamali-tech',
          certificateUrl: '/certificates/csharp-cert.pdf',
          description: 'Ranked 5th across the entire university in Bachelor of Science in Computer Science (CGPA: 8.7).',
          displayOrder: 4
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
          qualification: 'Master of Science (Computer Science) - CGPA: 8.93',
          institution: 'Government Arts College for Women, Ramanathapuram',
          startDate: '2023-08-01',
          endDate: '2025-05-01',
          description: 'University 1st Rank Holder (Gold Medalist). Specialized in Advanced Database Systems, Software Architecture, Web Application Development, and Data Science.',
          displayOrder: 1
        },
        {
          id: '2',
          qualification: 'Bachelor of Science (Computer Science) - CGPA: 8.7',
          institution: 'Caussanel College of Arts and Science, Ramanathapuram',
          startDate: '2020-08-01',
          endDate: '2023-05-01',
          description: 'University 5th Rank Holder. Core focus on Object-Oriented Programming (C#), Data Structures & Algorithms, Relational Database Management Systems, and Web Engineering.',
          displayOrder: 2
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
          title: 'ASP.NET Core REST API & Web Development',
          description: 'Building robust, scalable, and secure RESTful Web APIs using C#, ASP.NET Core, Clean Architecture, and Entity Framework Core.',
          icon: 'Server',
          technologies: ['C#', 'ASP.NET Core', 'Web API', 'EF Core', 'JWT'],
          isActive: true,
          displayOrder: 1
        },
        {
          id: '2',
          title: 'Full-Stack React.js & .NET Web Applications',
          description: 'Crafting high-performance, modern, dynamic user interfaces using React.js, JavaScript, Tailwind CSS, and connecting to ASP.NET Core backends.',
          icon: 'Layout',
          technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'ASP.NET Core'],
          isActive: true,
          displayOrder: 2
        },
        {
          id: '3',
          title: 'Database Design & EF Core Optimization',
          description: 'Designing normalized relational database schemas in SQL Server, MySQL, and PostgreSQL with Code-First EF Core migrations and query optimization.',
          icon: 'Database',
          technologies: ['MySQL', 'SQL Server', 'PostgreSQL', 'EF Core', 'LINQ'],
          isActive: true,
          displayOrder: 3
        },
        {
          id: '4',
          title: 'Microservices & Real-Time IoT Backend',
          description: 'Developing microservices using RabbitMQ for asynchronous event handling and real-time IoT sensor data ingestion.',
          icon: 'Cpu',
          technologies: ['Microservices', 'RabbitMQ', 'C#', 'ASP.NET Core'],
          isActive: true,
          displayOrder: 4
        }
      ];
    }
  },

  submitContact: async (data: { fullName: string; email: string; subject: string; message: string }) => {
    try {
      const res = await apiClient.post('/contact', data);
      return res.data;
    } catch {
      return { message: 'Message received successfully!' };
    }
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
