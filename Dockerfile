# 1. Build React frontend assets
FROM node:20-alpine AS client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm ci || npm install
COPY client/ ./
RUN npm run build

# 2. Build .NET SDK API
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Portfolio.slnx ./
COPY src/Portfolio.Domain/Portfolio.Domain.csproj src/Portfolio.Domain/
COPY src/Portfolio.Application/Portfolio.Application.csproj src/Portfolio.Application/
COPY src/Portfolio.Infrastructure/Portfolio.Infrastructure.csproj src/Portfolio.Infrastructure/
COPY src/Portfolio.Api/Portfolio.Api.csproj src/Portfolio.Api/

RUN dotnet restore Portfolio.slnx

COPY . ./
RUN dotnet publish src/Portfolio.Api/Portfolio.Api.csproj -c Release -o /app/publish

# Copy built React dist to wwwroot of published app
COPY --from=client-build /client/dist /app/publish/wwwroot

# 3. Production ASP.NET Core Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
