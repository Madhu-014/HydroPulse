# 🚀 Quick Start Guide - Aqua Analytics Dashboard

## Prerequisites
- Node.js 18+ (for local development)
- Docker & Docker Compose (for containerized deployment)

## 🏃 Run Locally (Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to: `http://localhost:5173`
   - The app will hot-reload on code changes

## 🐳 Run with Docker (Production)

### Option 1: Docker Compose (Easiest)

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f aqua-frontend

# Stop
docker-compose down
```

Access at: `http://localhost:3000`

### Option 2: Docker Commands

```bash
# Build image
docker build -t aqua-dashboard .

# Run container
docker run -d \
  --name aqua-dashboard \
  -p 3000:80 \
  --restart unless-stopped \
  aqua-dashboard

# Check status
docker ps

# View logs
docker logs -f aqua-dashboard

# Stop and remove
docker stop aqua-dashboard
docker rm aqua-dashboard
```

## 📊 Customize CPU Data

Edit `src/components/CPUPredictionTable.jsx`:

```javascript
const actualCPUData = [
  0.001966693,  // Replace with your values
  0.003744092,
  0.010520073,
  // ... add more data points
];
```

## 🎨 Customize Theme

Edit `src/theme.js`:

```javascript
palette: {
  primary: { main: "#6366F1" },    // Change colors
  secondary: { main: "#EC4899" },
  // ... more options
}
```

## 📁 Add Experiment Data

Edit `public/results.json`:

```json
[
  {
    "run_id": "exp_001",
    "params": {
      "n_estimators": 100,
      "max_depth": 10
    },
    "metrics": {
      "rmse": 0.02,
      "mae": 0.007,
      "r2": 0.84
    },
    "git_commit": "abc123",
    "comments": "Baseline model"
  }
]
```

## 🔧 Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Build output is in 'dist/' folder
```

## 🌐 Deploy to Cloud

### Netlify
```bash
npm run build
# Drag 'dist' folder to Netlify
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Docker Registry
```bash
# Tag image
docker tag aqua-dashboard your-registry/aqua-dashboard:latest

# Push to registry
docker push your-registry/aqua-dashboard:latest

# Pull and run on server
docker pull your-registry/aqua-dashboard:latest
docker run -d -p 80:80 your-registry/aqua-dashboard:latest
```

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Change port in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead of 3000
```

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues
```bash
# Remove all containers and images
docker-compose down -v
docker system prune -a

# Rebuild
docker-compose up -d --build
```

## 📱 Features Overview

✅ **CPU Prediction Table** - 29 data points with accuracy tracking
✅ **Performance Metrics** - RMSE, R², MAE, Total Runs
✅ **Interactive Charts** - Area, Bar, Scatter, Line charts
✅ **Experiment Tracking** - Search, filter, and sort runs
✅ **Responsive Design** - Works on all devices
✅ **Docker Ready** - One-command deployment

## 🎯 Next Steps

1. ✏️ Customize CPU data with your actual values
2. 🎨 Adjust theme colors to match your brand
3. 📊 Add your experiment data to results.json
4. 🚀 Deploy to production using Docker
5. 📈 Monitor and analyze your ML models

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Open an issue on GitHub
- Review the code comments in components

---

**Happy Analyzing! 🚀**
