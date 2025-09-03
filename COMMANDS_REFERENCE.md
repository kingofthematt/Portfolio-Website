# Website Hosting Commands Reference
## Docker + Python + Ngrok Setup

### 🐳 Docker Commands

#### Build the Docker Image
```bash
docker build -t cybersecurity-portfolio .
```
- Builds a Docker image from the Dockerfile
- Tags it as "cybersecurity-portfolio"
- Copies your website files into the container

#### Run the Docker Container
```bash
docker run -d -p 8000:8000 --name cybersecurity-portfolio cybersecurity-portfolio
```
- `-d`: Run in detached mode (background)
- `-p 8000:8000`: Map host port 8000 to container port 8000
- `--name`: Give the container a name
- Last parameter is the image name

#### Alternative: Using Docker Compose
```bash
# Start the container
docker-compose up -d

# Stop the container
docker-compose down

# View logs
docker-compose logs
```

#### Docker Management Commands
```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop cybersecurity-portfolio

# Start a stopped container
docker start cybersecurity-portfolio

# Remove a container
docker rm cybersecurity-portfolio

# Remove an image
docker rmi cybersecurity-portfolio

# View container logs
docker logs cybersecurity-portfolio

# Execute commands inside container
docker exec -it cybersecurity-portfolio /bin/bash
```

### 🌐 Ngrok Commands

#### Start Ngrok Tunnel
```bash
ngrok http 8000
```
- Creates a secure tunnel to your local port 8000
- Provides a public HTTPS URL

#### Ngrok Management
```bash
# Check ngrok version
ngrok version

# View tunnel status (web interface)
# Open: http://localhost:4040

# Check tunnel API
curl http://localhost:4040/api/tunnels

# Stop ngrok (Ctrl+C in the terminal where it's running)
```

### 🔧 Complete Setup Workflow

#### 1. Initial Setup (One-time)
```bash
# Create Dockerfile and docker-compose.yml (already done)
# Build the Docker image
docker build -t cybersecurity-portfolio .

# Start the container
docker run -d -p 8000:8000 --name cybersecurity-portfolio cybersecurity-portfolio

# Start ngrok tunnel
ngrok http 8000
```

#### 2. Daily Usage
```bash
# Start everything
docker start cybersecurity-portfolio
ngrok http 8000

# Stop everything
docker stop cybersecurity-portfolio
# Ctrl+C to stop ngrok
```

#### 3. Troubleshooting
```bash
# Check if container is running
docker ps

# Check container logs
docker logs cybersecurity-portfolio

# Restart container
docker restart cybersecurity-portfolio

# Check ngrok tunnel
curl http://localhost:4040/api/tunnels

# Test local access
curl http://localhost:8000

# Test ngrok access
curl https://YOUR_NGROK_URL.ngrok-free.app
```

### 📊 Monitoring Commands

#### Check Website Status
```bash
# Test local website
curl -I http://localhost:8000

# Test ngrok website
curl -I https://YOUR_NGROK_URL.ngrok-free.app

# View ngrok web interface
# Open: http://localhost:4040
```

#### View Logs
```bash
# Docker container logs
docker logs cybersecurity-portfolio

# Follow logs in real-time
docker logs -f cybersecurity-portfolio

# Ngrok logs (in the terminal where ngrok is running)
```

### 🚀 Quick Start Script
Create a batch file (start-website.bat) for Windows:
```batch
@echo off
echo Starting Cybersecurity Portfolio Website...
docker start cybersecurity-portfolio
echo Docker container started
echo Starting ngrok tunnel...
ngrok http 8000
```

### 🛑 Quick Stop Script
Create a batch file (stop-website.bat) for Windows:
```batch
@echo off
echo Stopping Cybersecurity Portfolio Website...
docker stop cybersecurity-portfolio
echo Docker container stopped
echo Remember to stop ngrok with Ctrl+C
pause
```

### 📝 Important Notes

1. **Keep both running**: Docker container AND ngrok tunnel must be active
2. **Ngrok URL changes**: Each time you restart ngrok, you get a new URL
3. **Port 8000**: Must be available on your system
4. **Docker Desktop**: Must be running for Docker commands to work
5. **Ngrok account**: Free plan allows 1 tunnel at a time

### 🌍 Your Current Setup
- **Local URL**: http://localhost:8000
- **Public URL**: https://5b06b6e10d11.ngrok-free.app
- **Docker Container**: cybersecurity-portfolio
- **Ngrok Status**: Active with 27+ connections

