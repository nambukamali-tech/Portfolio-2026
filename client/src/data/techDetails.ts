export interface TechDetail {
  name: string;
  category: string;
  tagline: string;
  description: string;
  howNambuUsesIt: string;
  keyStrengths: string[];
  appliedInProjects: string[];
}

export const techDetailsDictionary: Record<string, TechDetail> = {
  'c#': {
    name: 'C#',
    category: 'Backend',
    tagline: 'Modern, object-oriented language for enterprise backend services.',
    description: 'C# is a modern, statically typed, multi-paradigm programming language developed by Microsoft for the .NET platform, offering robust type safety, garbage collection, and high execution speed.',
    howNambuUsesIt: 'Used across all backend solutions to build strongly-typed domain entities, MediatR command/query handlers, business rule validators, and asynchronous processing logic.',
    keyStrengths: [
      'Strongly typed with pattern matching and LINQ support',
      'Asynchronous programming with async/await',
      'High-performance memory allocation and Garbage Collection',
      'Extensive standard library and enterprise tooling'
    ],
    appliedInProjects: ['FFM - Field Force Management', 'Ackcio IoT Monitoring', 'Student Portal', 'Online Ticket Booking']
  },
  'asp.net core': {
    name: 'ASP.NET Core',
    category: 'Backend',
    tagline: 'Cross-platform, high-performance framework for building cloud-connected web services.',
    description: 'ASP.NET Core is an open-source, cloud-ready framework by Microsoft for building modern, cloud-based, Internet-connected applications on Windows, macOS, and Linux.',
    howNambuUsesIt: 'Serves as the foundation for clean architecture Web APIs, custom middleware pipelines, authentication filters, and dependency injection service configurations.',
    keyStrengths: [
      'Built-in first-class Dependency Injection',
      'Configurable Middleware request-pipeline architecture',
      'High throughput and ultra-low latency benchmarks',
      'Seamless integration with Entity Framework Core & JWT'
    ],
    appliedInProjects: ['FFM - Field Force Management', 'Ackcio IoT Monitoring', 'Student Portal', 'Online Ticket Booking']
  },
  'asp.net core web api': {
    name: 'ASP.NET Core Web API',
    category: 'Backend',
    tagline: 'RESTful API engine delivering secure JSON endpoints to web and mobile clients.',
    description: 'ASP.NET Core Web API is the dedicated HTTP service layer in .NET designed to create RESTful services consumed by a broad range of clients, including browsers, mobile apps, and IoT devices.',
    howNambuUsesIt: 'Designs normalized RESTful endpoints with versioning, rate limiting, exception handling middleware, and role-based access control (RBAC).',
    keyStrengths: [
      'Model validation and standard HTTP status code conventions',
      'Swagger / OpenAPI automated documentation integration',
      'Rate limiting middleware protecting against abuse',
      'JWT Bearer token authorization and role claim checks'
    ],
    appliedInProjects: ['FFM - Field Force Management', 'Ackcio IoT Monitoring', 'Portfolio API Engine']
  },
  'entity framework core': {
    name: 'Entity Framework Core (EF Core)',
    category: 'Backend / ORM',
    tagline: 'Lightweight, extensible Object-Relational Mapper (ORM) for .NET.',
    description: 'EF Core is Microsoft\'s modern ORM enabling .NET developers to work with databases using strongly-typed .NET domain objects, eliminating the need for boilerplate data-access code.',
    howNambuUsesIt: 'Implements Code-First database migrations, fluent API entity relationship configurations, query projections, and optimized relational joins for MySQL, PostgreSQL, and SQLite.',
    keyStrengths: [
      'Automated schema versioning with Code-First Migrations',
      'Type-safe query construction via LINQ',
      'Change Tracking and optimistic concurrency management',
      'Lazy, Eager, and Explicit relationship loading strategies'
    ],
    appliedInProjects: ['FFM - Field Force Management', 'Ackcio IoT Monitoring', 'Student Portal', 'Rural Guider']
  },
  'mediatr & cqrs': {
    name: 'MediatR & CQRS',
    category: 'Architecture & Concepts',
    tagline: 'Command Query Responsibility Segregation with decoupled in-process messaging.',
    description: 'CQRS separates read operations (queries) from write operations (commands) to optimize scalability and data integrity, while MediatR acts as an in-process mediator to decouple senders from handlers.',
    howNambuUsesIt: 'Architects the FFM backend by isolating business mutation commands (CheckIn, CheckOut, StartBreak, EndBreak) from query requests, accompanied by validation pipeline behaviors.',
    keyStrengths: [
      'Single Responsibility Principle enforced at the handler level',
      'Decoupled architecture without direct controller-to-service coupling',
      'Pipeline behaviors for cross-cutting logging, validation, and metrics',
      'Simplified unit testing with isolated mock dependencies'
    ],
    appliedInProjects: ['FFM - Field Force Management']
  },
  'rabbitmq & microservices': {
    name: 'RabbitMQ & Microservices',
    category: 'Architecture & Concepts',
    tagline: 'Asynchronous message brokering for resilient distributed architectures.',
    description: 'RabbitMQ is an enterprise-grade message broker that enables decoupled asynchronous communication between microservices, ensuring reliable message delivery and high fault tolerance.',
    howNambuUsesIt: 'Utilized in the Ackcio IoT monitoring platform to ingest real-time continuous sensor data streams asynchronously into queues without blocking user-facing API threads.',
    keyStrengths: [
      'Decoupled publisher/subscriber event-driven workflows',
      'Guaranteed message persistence and acknowledgment policies',
      'High scalability preventing service degradation during traffic spikes',
      'Fault-tolerant message queues with dead-letter exchanges'
    ],
    appliedInProjects: ['Ackcio - IoT Monitoring System']
  },
  'clean architecture & rbac': {
    name: 'Clean Architecture & RBAC',
    category: 'Architecture & Concepts',
    tagline: 'Domain-centric separation of concerns with Role-Based Access Control security.',
    description: 'Clean Architecture organizes code into concentric layers (Domain, Application, Infrastructure, Presentation) ensuring business rules remain independent of UI, databases, and external frameworks.',
    howNambuUsesIt: 'Structures all enterprise solutions with strict inward dependency rules, interfaces for persistence, and role-based authorization ensuring only authorized roles access critical resources.',
    keyStrengths: [
      'Complete independence from UI and database frameworks',
      'Highly testable domain logic with comprehensive unit test coverage',
      'Fine-grained access control (Admin, Manager, Employee, Student)',
      'Long-term maintainability and reduced technical debt'
    ],
    appliedInProjects: ['FFM - Field Force Management', 'Student Portal', 'Portfolio Backend']
  },
  'react.js': {
    name: 'React.js',
    category: 'Frontend',
    tagline: 'Declarative, component-based library for crafting modern dynamic user interfaces.',
    description: 'React is an open-source JavaScript library developed by Meta for building composable user interfaces with a virtual DOM, component lifecycles, and state hooks.',
    howNambuUsesIt: 'Builds responsive Single Page Applications (SPAs) with TypeScript, custom hooks, Framer Motion transitions, responsive layouts, and REST API axios clients.',
    keyStrengths: [
      'Component reusability and declarative UI composition',
      'Fast Virtual DOM reconciliation',
      'Rich ecosystem of state hooks and animation libraries',
      'Seamless TypeScript integration for type-safe props and state'
    ],
    appliedInProjects: ['Developer Portfolio', 'Online Ticket Booking Web App']
  },
  'javascript': {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    tagline: 'Versatile language powering client-side interactivity and browser runtime engines.',
    description: 'JavaScript is the high-level, multi-paradigm programming language of the web, supporting dynamic scripting, asynchronous event loops, and modern ES modules.',
    howNambuUsesIt: 'Powers client-side DOM interactions, event listeners, asynchronous HTTP fetch requests, and state management.',
    keyStrengths: [
      'Native in-browser execution with zero compilation overhead',
      'Asynchronous Event Loop with Promises and async/await',
      'Rich object manipulation and functional array operators (map, filter, reduce)',
      'Universal compatibility across all modern devices'
    ],
    appliedInProjects: ['Online Ticket Booking', 'Developer Portfolio', 'Student Portal']
  },
  'html5 / css3': {
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    tagline: 'The structural and aesthetic foundation of the modern web.',
    description: 'HTML5 delivers semantic structure and accessible elements, while CSS3 provides modern layout engines (Flexbox, Grid), media queries, animations, and custom properties.',
    howNambuUsesIt: 'Crafts accessible, semantic web layouts with smooth responsive breakpoints, dark mode color variables, and glassmorphism styling.',
    keyStrengths: [
      'Semantic structure improving SEO and screen reader accessibility',
      'CSS Grid and Flexbox for fluid responsive layouts',
      'CSS custom properties (variables) for theme management',
      'Hardware-accelerated CSS animations and transitions'
    ],
    appliedInProjects: ['Developer Portfolio', 'Student Portal', 'Rural Guider']
  },
  'sql server': {
    name: 'SQL Server (T-SQL)',
    category: 'Database',
    tagline: 'Enterprise relational database management system by Microsoft.',
    description: 'Microsoft SQL Server is an enterprise RDBMS known for ACID compliance, advanced indexing, transaction logging, and robust security management.',
    howNambuUsesIt: 'Used for designing normalized relational schemas, foreign key constraints, indexes, and stored procedures in full-stack .NET applications.',
    keyStrengths: [
      'Strict ACID transaction guarantees and data durability',
      'Powerful query optimizer and Execution Plan analysis',
      'Comprehensive security controls and encryption at rest',
      'Native tooling via SQL Server Management Studio (SSMS)'
    ],
    appliedInProjects: ['Online Ticket Booking', 'Academic Projects']
  },
  'mysql': {
    name: 'MySQL',
    category: 'Database',
    tagline: 'High-performance, open-source relational database engine.',
    description: 'MySQL is one of the world\'s most popular open-source relational databases, widely used for web and IoT backends requiring fast read/write throughput.',
    howNambuUsesIt: 'Powers the database tier for Ackcio and FFM, utilizing EF Core Code-First migrations, index tuning, and time-series sensor tables.',
    keyStrengths: [
      'High-speed read performance for web and mobile workloads',
      'Robust InnoDB transactional storage engine with foreign keys',
      'Broad cloud hosting availability (Azure MySQL, AWS RDS)',
      'Seamless integration with Pomelo EF Core provider'
    ],
    appliedInProjects: ['FFM - Field Force Management', 'Ackcio IoT Monitoring', 'Student Portal', 'Rural Guider']
  },
  'postgresql': {
    name: 'PostgreSQL',
    category: 'Database',
    tagline: 'Advanced open-source object-relational database known for reliability and extensibility.',
    description: 'PostgreSQL is a powerful, open-source object-relational database system with over 35 years of active development, renowned for proven reliability, feature robustness, and performance.',
    howNambuUsesIt: 'Configured as the primary production database for this portfolio API with automated schema generation, UUID primary keys, and Npgsql EF Core provider.',
    keyStrengths: [
      'Advanced indexing (B-Tree, GIN, GiST) and JSONB support',
      'Full ACID compliance with strong data integrity guarantees',
      'Native UUID generator support and efficient connection pooling',
      'Excellent performance on cloud services (Azure Database for PostgreSQL)'
    ],
    appliedInProjects: ['Portfolio Backend API Engine']
  },
  'linq': {
    name: 'LINQ (Language Integrated Query)',
    category: 'Backend',
    tagline: 'Declarative, type-safe data querying across in-memory collections and database providers.',
    description: 'LINQ extends C# with native query capabilities, allowing developers to query collections, databases, and XML with compile-time type checking and IntelliSense.',
    howNambuUsesIt: 'Constructs expressive database projections, filtered pagination, aggregations, and complex multi-table joins in EF Core repository queries.',
    keyStrengths: [
      'Compile-time syntax validation eliminating runtime SQL typos',
      'Deferred execution optimizing query plan generation',
      'Consistent query syntax across in-memory lists, databases, and XML',
      'Fluent method syntax with lambda expressions'
    ],
    appliedInProjects: ['FFM - Field Force Management', 'Ackcio IoT Monitoring', 'Student Portal']
  },
  'asp.net mvc': {
    name: 'ASP.NET Core MVC',
    category: 'Backend',
    tagline: 'Model-View-Controller framework for server-rendered web applications.',
    description: 'ASP.NET Core MVC provides a design pattern that separates an application into three main components: Model, View, and Controller, facilitating clear separation of concerns.',
    howNambuUsesIt: 'Used to build role-based server-side portals (Student Portal and Rural Guider) with Razor views, model binding, and validation attributes.',
    keyStrengths: [
      'Clear separation of concerns between business models and views',
      'Strongly typed Razor view helpers and Tag Helpers',
      'Integrated cross-site request forgery (CSRF) protection',
      'Fast server-side rendering for accessible portal interfaces'
    ],
    appliedInProjects: ['Student Portal Web App', 'Rural Guider - Career Guidance']
  },
  'git & github': {
    name: 'Git & GitHub',
    category: 'Tools & Platforms',
    tagline: 'Distributed version control and collaborative software delivery platform.',
    description: 'Git tracks code revisions and branch lifecycles, while GitHub provides cloud repository hosting, pull requests, automated CI/CD workflows, and issue tracking.',
    howNambuUsesIt: 'Manages multi-branch development workflows, atomic semantic commits, GitHub Actions CI/CD pipelines, and cloud deployments.',
    keyStrengths: [
      'Branching and pull request peer review workflows',
      'Automated testing via GitHub Actions CI/CD pipelines',
      'Cryptographic commit integrity and history tracking',
      'Seamless team collaboration and release tagging'
    ],
    appliedInProjects: ['All Projects & Enterprise Codebases']
  },
  'visual studio / vs code': {
    name: 'Visual Studio / VS Code',
    category: 'Tools & Platforms',
    tagline: 'Premier integrated development environments for .NET and web engineering.',
    description: 'Visual Studio is Microsoft\'s flagship IDE with advanced C# debugging, profiling, and test runners, while VS Code provides a lightweight, highly extensible editor for frontend and full-stack development.',
    howNambuUsesIt: 'Daily engineering driver for solution management, live debugging, EF Core migration CLI execution, and frontend TypeScript development.',
    keyStrengths: [
      'Comprehensive profiling, memory leak detection, and diagnostics',
      'Integrated test runner for xUnit and integration testing',
      'Deep IntelliSense, refactoring tools, and code navigation',
      'Multi-project solution architecture support'
    ],
    appliedInProjects: ['All Projects']
  },
  'ai tools': {
    name: 'AI Engineering & Developer Tools',
    category: 'Tools & Platforms',
    tagline: 'Leveraging AI for rapid code generation, automated refactoring, and test suite creation.',
    description: 'Modern developer AI tools (GitHub Copilot, LLM-assisted coding agents) enhance developer productivity, test case generation, and architecture documentation.',
    howNambuUsesIt: 'Accelerates unit test writing, complex regex formulation, documentation generation, and exploratory design validation while retaining strict code quality standards.',
    keyStrengths: [
      'Rapid prototype scaffolding and boilerplate elimination',
      'Comprehensive test case generation covering edge cases',
      'Accelerated debugging and log output analysis',
      'Enhanced engineering productivity and documentation clarity'
    ],
    appliedInProjects: ['Developer Portfolio', 'FFM - Field Force Management']
  }
};

export const getTechDetail = (techName: string, categoryFallback = 'Technology'): TechDetail => {
  const normalized = techName.toLowerCase().trim();
  
  // Direct match
  if (techDetailsDictionary[normalized]) {
    return techDetailsDictionary[normalized];
  }

  // Partial match checks
  for (const [key, detail] of Object.entries(techDetailsDictionary)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return detail;
    }
  }

  // Smart fallback
  return {
    name: techName,
    category: categoryFallback,
    tagline: `Core technology applied in Nambu Kamali's full-stack and backend software solutions.`,
    description: `${techName} is utilized in modern software engineering to build reliable, maintainable, and scalable application components.`,
    howNambuUsesIt: `Integrated into software projects to deliver performant code adhering to clean architecture and industry best practices.`,
    keyStrengths: [
      'Applied with clean engineering principles',
      'Modular architecture and maintainable structure',
      'Seamless integration within the .NET & React ecosystem',
      'Continuous refinement and performance optimization'
    ],
    appliedInProjects: ['Developer Portfolio']
  };
};
