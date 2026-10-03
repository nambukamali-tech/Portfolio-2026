# Full-Stack Developer Portfolio - Nambu Kamali

Production-ready personal developer portfolio website and content management engine built with **ASP.NET Core Web API (C#)**, **Clean Architecture**, **PostgreSQL / EF Core**, and a **React (TypeScript)** frontend powered by **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

---

## Production Readiness Audit & Deployment Blueprint

### 1. Build & Test Audit Summary

| Component | Status | Details |
| :--- | :--- | :--- |
| **Backend Build** | **PASSED** | 0 Warnings, 0 Errors across 6 projects in `Portfolio.slnx` |
| **Backend Test Suite** | **PASSED** | 6 Passed, 0 Failed, 0 Skipped (`dotnet test Portfolio.slnx`) |
| **Frontend Build** | **PASSED** | `tsc -b && vite build` built `dist/` bundle in 645ms with 0 errors |
| **Database Provider** | **READY** | PostgreSQL Npgsql provider + EF Core migrations + SQLite dev fallback |
| **Authentication & Auth**| **HARDENED** | JWT Bearer verification + BCrypt password hashing + `[Authorize]` protection |
| **Rate Limiting** | **ACTIVE** | `AuthLimiter` (5 req/min) & `ContactLimiter` (5 req/min) enforced |
| **Security Baseline** | **AUDITED** | No hardcoded secrets, CORS origin isolation, security headers active |

---

## 2. Environment Variables Configuration

### Backend Environment Variables (`Azure App Service / Production Server`)
```env
# Database Connection String
ConnectionStrings__DefaultConnection=Host=your-pg-server.postgres.database.azure.com;Port=5432;Database=nk_portfolio_db;Username=nambukamali_admin@your-pg-server;Password=YOUR_SECURE_POSTGRES_PASSWORD;SslMode=Require;

# JWT Security Credentials (MUST be at least 32 characters long in production)
Jwt__SecretKey=YOUR_STRONG_SECURE_RANDOM_JWT_SECRET_KEY_MINIMUM_32_CHARACTERS
Jwt__Issuer=PortfolioApi
Jwt__Audience=PortfolioClient
Jwt__ExpirationInHours=24

# Initial Admin Account Setup (Executed on first startup)
ADMIN_INITIAL_EMAIL=admin@nambukamali.dev
ADMIN_INITIAL_PASSWORD=YOUR_STRONG_PRODUCTION_ADMIN_PASSWORD

# Configured Production Frontend Origin for CORS
AllowedOrigins=https://nambukamali.dev,https://your-portfolio.vercel.app
```

### Frontend Environment Variables (`Vercel / Production Client`)
```env
VITE_API_URL=https://your-api-domain.azurewebsites.net/api/v1
```

---

## 3. Initial Admin Account Creation (Production Setup)

Hardcoded default credentials (`AdminPass123!`) have been **completely removed** from source code.

To generate your production admin account:
1. Set `ADMIN_INITIAL_EMAIL` and `ADMIN_INITIAL_PASSWORD` in your production server environment variables before launching the API.
2. Upon first boot, the ASP.NET Core API detects these environment variables, hashes `ADMIN_INITIAL_PASSWORD` using BCrypt, and seeds your admin record into PostgreSQL.
3. Unset or clear `ADMIN_INITIAL_PASSWORD` from your deployment settings after first boot for maximum security.

---

## 4. PostgreSQL Configuration & EF Core Database Migrations

### Applying EF Core Migrations
To generate or apply migrations against your PostgreSQL instance:

```powershell
# Create EF Core Migration
dotnet ef migrations add InitialPostgresCreate --project src/Portfolio.Infrastructure --startup-project src/Portfolio.Api

# Update Target Database
dotnet ef database update --project src/Portfolio.Infrastructure --startup-project src/Portfolio.Api
```

---

## 5. Deployment Step-by-Step Instructions

### A. Frontend Deployment to Vercel
1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository and select `client` as the **Root Directory**.
4. Framework Preset: **Vite**.
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-api-domain.azurewebsites.net/api/v1`
6. Click **Deploy**. Vercel will build `dist/` and issue an automatic HTTPS SSL certificate.

### B. Backend API Deployment to Azure App Service
1. Provision an **Azure App Service** (Linux / .NET 9 or Docker Container).
2. Provision an **Azure Database for PostgreSQL Flexible Server**.
3. In Azure App Service -> **Settings** -> **Environment variables**, set all environment variables listed in Section 2 above.
4. Publish the API using Azure CLI or GitHub Actions:
   ```powershell
   dotnet publish src/Portfolio.Api/Portfolio.Api.csproj -c Release -o ./publish
   ```
5. Deploy `./publish` contents or push the `Dockerfile` container image.

### C. Custom Domain Setup
1. **Frontend**: In Vercel Project Settings -> **Domains**, add `nambukamali.dev`. Add the CNAME record (`cname.vercel-dns.com`) at your DNS registrar (e.g. Cloudflare / Namecheap).
2. **Backend**: In Azure App Service -> **Custom Domains**, add `api.nambukamali.dev`. Add A and TXT DNS validation records.

---

## 6. Local Development Commands

### Run Backend API
```powershell
dotnet run --project src/Portfolio.Api/Portfolio.Api.csproj
```

### Run Frontend Client
```powershell
cd client
npm install
npm run dev
```

### Run Unit Tests
```powershell
dotnet test Portfolio.slnx
```

---

## 7. Security Hardening Checklist Completed

- [x] No hardcoded production passwords or JWT secrets in code or repository.
- [x] Production JWT key enforced minimum 32-character requirement.
- [x] Environment-driven Admin user initialization process established.
- [x] CORS restricted to configured origins (`AllowedOrigins`) in production.
- [x] HTTPS redirection enforced in production.
- [x] Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `HSTS`) active.
- [x] Rate limiting active on Auth (`AuthLimiter`) and Contact (`ContactLimiter`) endpoints.
- [x] File upload size (max 10MB), extension, and MIME type validation enforced.
- [x] EF Core parameterized queries used for SQL injection protection.
- [x] Sensitive credentials excluded from application logging.
