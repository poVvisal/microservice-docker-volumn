# Sports Management Microservices with Docker

This project contains two microservices (Player and Coach) that connect to a MongoDB Docker container instead of MongoDB Atlas.

## Architecture

- **Player Microservice**: Runs on port 5003
- **Coach Microservice**: Runs on port 5002  
- **MongoDB**: Runs on port 27017 with persistent volume storage

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- PowerShell (Windows) or Terminal (Mac/Linux)

### Running the Services

1. **Clone or navigate to the project directory:**
   ```powershell
   cd c:\Users\MSI\Desktop\docker-volumn
   ```

2. **Start all services with Docker Compose:**
   ```powershell
   docker-compose up -d
   ```

3. **Check if services are running:**
   ```powershell
   docker-compose ps
   ```

4. **View logs:**
   ```powershell
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f player-service
   docker-compose logs -f coach-service
   docker-compose logs -f mongodb
   ```

### Service URLs

- **Player Service**: http://localhost:5003
- **Coach Service**: http://localhost:5002
- **MongoDB**: mongodb://localhost:27017/sportsmanagement

### Stopping Services

```powershell
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Database Configuration

The services now connect to a local MongoDB Docker container with the following configuration:

- **Host**: mongodb (container name)
- **Port**: 27017
- **Database**: sportsmanagement

The MongoDB container includes:
- Persistent volume storage (`mongodb_data`)
- Automatic database initialization
- Pre-created collections and indexes

## Environment Variables

Both microservices use the following environment variables:

- `MONGODB_HOST`: MongoDB container hostname (default: mongodb)
- `MONGODB_PORT`: MongoDB port (default: 27017)  
- `MONGODB_DATABASE`: Database name (default: sportsmanagement)
- `NODE_ENV`: Environment mode (development/production)

## Development

### Building Individual Services

```powershell
# Build player service
docker build -t player-service ./Player_Microservice

# Build coach service  
docker build -t coach-service ./Coach_Microservice
```

### Connecting to MongoDB

```powershell
# Access MongoDB shell
docker exec -it sports_mongodb mongosh sportsmanagement
```

### Rebuilding Services

```powershell
# Rebuild and restart specific service
docker-compose up -d --build player-service

# Rebuild all services
docker-compose up -d --build
```

## Troubleshooting

### Service Connection Issues
1. Ensure all containers are on the same network
2. Check container logs for connection errors
3. Verify MongoDB is fully started before microservices

### Port Conflicts
- Player Service: Change port 5003 in docker-compose.yml
- Coach Service: Change port 5002 in docker-compose.yml  
- MongoDB: Change port 27017 in docker-compose.yml

### Data Persistence
- MongoDB data is stored in `mongodb_data` Docker volume
- To reset database: `docker-compose down -v` then `docker-compose up -d`

## Security Notes

- No authentication is currently implemented (suitable for development only)
- Consider adding authentication for production environments
- MongoDB runs without authentication (suitable for development only)
