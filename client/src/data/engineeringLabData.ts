export interface ArchitectureLayer {
  id: string;
  number: number;
  name: string;
  category: 'Presentation' | 'Pipeline' | 'Application' | 'Domain' | 'Infrastructure';
  badge: string;
  color: string;
  description: string;
  csharpFile: string;
  codeSnippet: string;
  keyResponsibilities: string[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'presentation',
    number: 1,
    name: 'Presentation Layer',
    category: 'Presentation',
    badge: 'ASP.NET Core Web API',
    color: 'from-blue-500 to-cyan-400',
    description: 'Receives external HTTP requests, validates route/model state, and immediately delegates execution to MediatR commands without embedding business logic.',
    csharpFile: 'AttendanceController.cs',
    codeSnippet: `[ApiController]
[Route("api/v1/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly IMediator _mediator;

    public AttendanceController(IMediator mediator) => _mediator = mediator;

    [HttpPost("punch-in")]
    [ProducesResponseType(typeof(AttendanceDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> PunchIn([FromBody] PunchInCommand command, CancellationToken ct)
    {
        var result = await _mediator.Send(command, ct);
        return Ok(result);
    }
}`,
    keyResponsibilities: [
      'Thin controller architecture (zero business logic)',
      'Route model binding & HTTP status code mapping (200, 201, 400, 404)',
      'Async cancellation token propagation (CancellationToken ct)',
      'Swagger / OpenAPI DTO schema documentation'
    ]
  },
  {
    id: 'pipeline',
    number: 2,
    name: 'Cross-Cutting Pipeline Behaviors',
    category: 'Pipeline',
    badge: 'MediatR & FluentValidation',
    color: 'from-cyan-400 to-teal-400',
    description: 'Intercepts incoming requests before reaching handlers. Performs automated schema validation, execution timing, error handling, and structured logging.',
    csharpFile: 'ValidationBehavior.cs',
    codeSnippet: `public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators) 
        => _validators = validators;

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        if (_validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);
            var validationResults = await Task.WhenAll(
                _validators.Select(v => v.ValidateAsync(context, ct)));
            var failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();

            if (failures.Count != 0)
                throw new FluentValidation.ValidationException(failures);
        }
        return await next();
    }
}`,
    keyResponsibilities: [
      'Automated FluentValidation before handler invocation',
      'Centralized exception interception & standardized problem details',
      'Telemetry logging & Stopwatch execution performance tracking',
      'Decoupled middleware pattern inside MediatR execution pipeline'
    ]
  },
  {
    id: 'application',
    number: 3,
    name: 'Application Layer (CQRS)',
    category: 'Application',
    badge: 'MediatR Command / Query Handler',
    color: 'from-blue-600 to-indigo-500',
    description: 'Encapsulates specific use-cases. Coordinates domain entities and infrastructure abstractions. Strict separation between Read operations (Queries) and Write operations (Commands).',
    csharpFile: 'PunchInCommandHandler.cs',
    codeSnippet: `public record PunchInCommand(
    Guid EmployeeId,
    DateTime PunchTime,
    GeoCoordinate Location
) : IRequest<AttendanceResultDto>;

public class PunchInCommandHandler : IRequestHandler<PunchInCommand, AttendanceResultDto>
{
    private readonly IAttendanceRepository _repository;
    private readonly IGeofenceService _geofenceService;
    private readonly IUnitOfWork _unitOfWork;

    public async Task<AttendanceResultDto> Handle(PunchInCommand cmd, CancellationToken ct)
    {
        var isWithinGeofence = await _geofenceService.VerifyLocationAsync(cmd.Location, ct);
        if (!isWithinGeofence)
            throw new BusinessException("Punch location is outside designated job site perimeter.");

        var record = AttendanceRecord.Create(cmd.EmployeeId, cmd.PunchTime, cmd.Location);
        await _repository.AddAsync(record, ct);
        await _unitOfWork.SaveChangesAsync(ct);

        return new AttendanceResultDto(record.Id, record.Status, record.PunchTime);
    }
}`,
    keyResponsibilities: [
      'CQRS segregation (IRequest<TResponse> for Queries and Commands)',
      'Transaction boundaries management via Unit of Work',
      'Zero dependency on EF Core directly (depends on clean interfaces)',
      'Clean domain event orchestration'
    ]
  },
  {
    id: 'domain',
    number: 4,
    name: 'Domain Layer (Core Logic & Invariants)',
    category: 'Domain',
    badge: 'Pure C# Domain Entities',
    color: 'from-emerald-400 to-cyan-500',
    description: 'The heart of software architecture. Pure C# with zero external dependencies. Enforces business rules, cumulative attendance mathematics, break time subtractions, and status transitions.',
    csharpFile: 'AttendanceRecord.cs',
    codeSnippet: `public class AttendanceRecord : BaseAuditableEntity
{
    public Guid EmployeeId { get; private set; }
    public DateTime CheckInTime { get; private set; }
    public DateTime? CheckOutTime { get; private set; }
    public TimeSpan TotalBreakDuration { get; private set; }
    public AttendanceStatus Status { get; private set; }

    public static AttendanceRecord Create(Guid employeeId, DateTime checkIn, GeoCoordinate coord)
    {
        return new AttendanceRecord
        {
            Id = Guid.NewGuid(),
            EmployeeId = employeeId,
            CheckInTime = checkIn,
            Status = AttendanceStatus.CheckedIn,
            CreatedAt = DateTime.UtcNow
        };
    }

    public TimeSpan CalculateNetWorkingHours()
    {
        if (!CheckOutTime.HasValue) return TimeSpan.Zero;
        var grossDuration = CheckOutTime.Value - CheckInTime;
        var netDuration = grossDuration - TotalBreakDuration;
        return netDuration < TimeSpan.Zero ? TimeSpan.Zero : netDuration;
    }
}`,
    keyResponsibilities: [
      'Enforces enterprise business invariants & encapsulated state',
      'Zero external NuGet or database dependencies (pure C# domain model)',
      'Cumulative shift & break calculation mathematics',
      'Domain events dispatch upon state transitions'
    ]
  },
  {
    id: 'infrastructure',
    number: 5,
    name: 'Infrastructure Layer (Persistence & Messaging)',
    category: 'Infrastructure',
    badge: 'EF Core 8, SQL Server & RabbitMQ',
    color: 'from-indigo-500 to-purple-500',
    description: 'Implements repository interfaces, manages Entity Framework Core database contexts, schema migrations, and integrates asynchronous message queues (RabbitMQ).',
    csharpFile: 'ApplicationDbContext.cs',
    codeSnippet: `public class ApplicationDbContext : DbContext, IUnitOfWork
{
    public DbSet<AttendanceRecord> AttendanceRecords => Set<AttendanceRecord>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<GeofenceZone> GeofenceZones => Set<GeofenceZone>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        
        modelBuilder.Entity<AttendanceRecord>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.EmployeeId, e.CheckInTime });
            entity.Property(e => e.TotalBreakDuration).HasConversion(
                v => v.Ticks,
                v => TimeSpan.FromTicks(v));
        });
    }
}`,
    keyResponsibilities: [
      'EF Core 8 Fluent API entity mappings & foreign keys',
      'Optimized indexed queries with SQL Server execution plan alignment',
      'Unit of work atomic commit transactions',
      'RabbitMQ integration event publisher for push notifications'
    ]
  }
];

export interface ApiEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST';
  path: string;
  description: string;
  defaultPayload?: string;
  execute: (inputJson?: string) => {
    status: number;
    statusText: string;
    durationMs: number;
    headers: Record<string, string>;
    data: unknown;
  };
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'profile',
    name: 'Get Developer Profile',
    method: 'GET',
    path: '/api/v1/profile',
    description: 'Retrieves verified profile data, academic distinctions, and current engineering role.',
    execute: () => ({
      status: 200,
      statusText: '200 OK',
      durationMs: 16,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-powered-by': 'ASP.NET Core 8.0',
        'x-cache': 'HIT'
      },
      data: {
        success: true,
        data: {
          fullName: 'Nambu Kamali N',
          title: 'Junior Software Developer (.NET & Full-Stack)',
          currentCompany: 'PrimeMover Solutions, Coimbatore',
          academics: {
            masterDegree: 'M.Sc Computer Science (2023 - 2025)',
            institution: 'Alagappa University',
            honors: 'University 1st Rank Holder (Gold Medalist)',
            cgpa: '8.93 / 10.0'
          },
          bachelorDegree: {
            degree: 'B.Sc Computer Science (2020 - 2023)',
            honors: '5th Rank Holder',
            cgpa: '8.70 / 10.0'
          },
          email: 'nambukamali@gmail.com',
          location: 'Coimbatore, Tamil Nadu, India',
          activeProjects: ['FFM (Field Force Management)', 'Ackcio Telemetry Ingestion']
        }
      }
    })
  },
  {
    id: 'ffm-attendance',
    name: 'Calculate Cumulative Shift Hours (FFM)',
    method: 'POST',
    path: '/api/v1/attendance/calculate-hours',
    description: 'Simulates the real Field Force Management attendance calculation engine with break subtractions and geofence verification.',
    defaultPayload: JSON.stringify(
      {
        employeeId: 'EMP-1042',
        employeeName: 'Field Force Engineer',
        checkInTime: '09:00 AM',
        checkOutTime: '06:30 PM',
        lunchBreakMinutes: 45,
        teaBreakMinutes: 15,
        clientSiteCoordinates: {
          latitude: 11.0168,
          longitude: 76.9558,
          accuracyRadiusMeters: 25
        }
      },
      null,
      2
    ),
    execute: (inputJson) => {
      let lunch = 45;
      let tea = 15;
      try {
        if (inputJson) {
          const parsed = JSON.parse(inputJson);
          lunch = Number(parsed.lunchBreakMinutes) || 45;
          tea = Number(parsed.teaBreakMinutes) || 15;
        }
      } catch {
        // fallback
      }

      const totalBreakMinutes = lunch + tea;
      // 09:00 AM to 06:30 PM = 9h 30m = 570 mins
      const grossMinutes = 570;
      const netMinutes = Math.max(0, grossMinutes - totalBreakMinutes);
      const netHours = Math.floor(netMinutes / 60);
      const netRemainingMins = netMinutes % 60;
      const decimalHours = +(netMinutes / 60).toFixed(2);

      return {
        status: 200,
        statusText: '200 OK',
        durationMs: 24,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-powered-by': 'ASP.NET Core 8.0 - FFM Calculation Engine',
          'x-execution-time': '24ms'
        },
        data: {
          success: true,
          calculationResult: {
            checkIn: '09:00:00 AM IST',
            checkOut: '06:30:00 PM IST',
            grossShiftDuration: '9 hours 30 minutes (570 mins)',
            totalBreaksDeducted: `${totalBreakMinutes} minutes (Lunch: ${lunch}m, Tea: ${tea}m)`,
            netPayableWorkingTime: `${netHours} hours ${netRemainingMins} minutes`,
            netHoursDecimal: decimalHours,
            standardShiftHours: 8.0,
            overtimeHours: decimalHours > 8 ? +(decimalHours - 8).toFixed(2) : 0,
            shiftComplianceStatus: decimalHours >= 8 ? 'COMPLIANT' : 'SHORT_HOURS',
            geofenceVerification: {
              status: 'VERIFIED_WITHIN_POLYGON',
              perimeterRadiusAllowedMeters: 50,
              reportedAccuracyRadiusMeters: 25,
              tamperingDetected: false
            }
          }
        }
      };
    }
  },
  {
    id: 'skills-backend',
    name: 'Query Skills by Category',
    method: 'GET',
    path: '/api/v1/skills?category=backend',
    description: 'Queries backend engineering proficiencies, frameworks, and architecture patterns.',
    execute: () => ({
      status: 200,
      statusText: '200 OK',
      durationMs: 18,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-powered-by': 'ASP.NET Core 8.0'
      },
      data: {
        success: true,
        category: 'backend',
        count: 7,
        items: [
          { name: 'ASP.NET Core 8 Web API', proficiency: 92, status: 'Core Stack', yearsExp: 1.5 },
          { name: 'C# (.NET 8/9/10)', proficiency: 94, status: 'Core Stack', yearsExp: 2.0 },
          { name: 'Clean Architecture & CQRS', proficiency: 88, status: 'Production Pattern', yearsExp: 1.5 },
          { name: 'Entity Framework Core', proficiency: 90, status: 'ORM', yearsExp: 1.5 },
          { name: 'SQL Server & Database Design', proficiency: 86, status: 'Relational DB', yearsExp: 2.0 },
          { name: 'MediatR & FluentValidation', proficiency: 89, status: 'Pipeline Pattern', yearsExp: 1.5 },
          { name: 'RabbitMQ Message Broker', proficiency: 82, status: 'Event Streaming', yearsExp: 1.0 }
        ]
      }
    })
  },
  {
    id: 'projects-featured',
    name: 'List Production Projects',
    method: 'GET',
    path: '/api/v1/projects?featured=true',
    description: 'Returns highlighted enterprise projects with tech stacks and architecture notes.',
    execute: () => ({
      status: 200,
      statusText: '200 OK',
      durationMs: 22,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-powered-by': 'ASP.NET Core 8.0'
      },
      data: {
        success: true,
        total: 3,
        projects: [
          {
            title: 'FFM (Field Force Management)',
            type: 'Enterprise Web API',
            status: 'Active Production Development',
            organization: 'PrimeMover Solutions',
            architecture: 'Clean Architecture with MediatR CQRS',
            highlights: ['Cumulative attendance engine', 'Geofencing boundary checks', 'Manager correction workflows']
          },
          {
            title: 'Ackcio Sensor Data Ingestion Pipeline',
            type: 'IoT Backend',
            organization: 'PrimeMover Solutions',
            architecture: 'Event-driven telemetry ingestion',
            highlights: ['High-throughput parsing', 'Zero-data-loss validation', 'EF Core optimized storage']
          },
          {
            title: 'Full-Stack Portfolio System 2026',
            type: 'Full-Stack Web Application',
            architecture: 'ASP.NET Core Web API + React 19 TypeScript',
            highlights: ['Secured JWT admin panel', 'Dockerized multi-stage builds', 'Direct FormSubmit contact pipeline']
          }
        ]
      }
    })
  },
  {
    id: 'health',
    name: 'System Health & Metrics',
    method: 'GET',
    path: '/api/v1/health',
    description: 'Healthcheck probe reporting API status, uptime, and database connectivity.',
    execute: () => ({
      status: 200,
      statusText: '200 OK',
      durationMs: 12,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-health-status': 'Healthy'
      },
      data: {
        status: 'Healthy',
        environment: 'Production',
        timestamp: new Date().toISOString(),
        checks: [
          { component: 'SqlServerDatabase', status: 'Healthy', latencyMs: 6 },
          { component: 'RabbitMQCluster', status: 'Healthy', latencyMs: 4 },
          { component: 'MemoryAllocation', status: 'Healthy', heapUsedMb: 68.4 }
        ],
        uptimeHours: 348.5
      }
    })
  }
];
