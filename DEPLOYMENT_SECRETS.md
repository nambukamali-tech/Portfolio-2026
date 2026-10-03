# Required Deployment Secrets Documentation

To automate production deployment via GitHub Actions (`.github/workflows/deploy.yml`), set the following secrets in your GitHub Repository under **Settings** -> **Secrets and variables** -> **Actions**:

---

## 1. Azure App Service Secrets (Backend API)

| Secret Name | Description | Where to Obtain |
| :--- | :--- | :--- |
| `AZURE_WEBAPP_NAME` | The exact name of your Azure Web App (e.g. `nambukamali-api`) | Azure Portal -> App Services -> Overview |
| `AZURE_WEBAPP_PUBLISH_PROFILE` | XML Publish Profile content for Azure App Service | Azure Portal -> App Service -> **Get publish profile** |

---

## 2. Vercel Secrets (Frontend React App)

| Secret Name | Description | Where to Obtain |
| :--- | :--- | :--- |
| `VERCEL_TOKEN` | Personal Access Token for Vercel CLI deployments | Vercel Account Settings -> **Tokens** -> Create Token |
| `VERCEL_ORG_ID` | Vercel Organization / Team ID | `client/.vercel/project.json` or Vercel Account Settings |
| `VERCEL_PROJECT_ID` | Vercel Project ID | `client/.vercel/project.json` or Vercel Project Settings |

---

## 3. Azure & Cloud Environment Secrets (Do NOT put in Git)

Set these environment variables directly inside the **Azure App Service Configuration**:

```env
ConnectionStrings__DefaultConnection=Host=your-pg-server.postgres.database.azure.com;Port=5432;Database=nk_portfolio_db;Username=admin@your-pg-server;Password=YOUR_SECURE_POSTGRES_PASSWORD;SslMode=Require;
Jwt__SecretKey=YOUR_STRONG_SECURE_RANDOM_JWT_SECRET_KEY_MINIMUM_32_CHARACTERS
Jwt__Issuer=PortfolioApi
Jwt__Audience=PortfolioClient
Jwt__ExpirationInHours=24
ADMIN_INITIAL_EMAIL=admin@nambukamali.dev
ADMIN_INITIAL_PASSWORD=YOUR_STRONG_PRODUCTION_ADMIN_PASSWORD
AllowedOrigins=https://nambukamali.dev,https://your-portfolio.vercel.app
```
