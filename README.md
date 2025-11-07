# 🚀 Aqua Analytics - CPU Prediction Dashboard

A stunning, modern React dashboard for ML experiment visualization with real-time CPU usage prediction analysis. Built with React, Vite, Material-UI, and Recharts with a beautiful glassmorphic design.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Material--UI](https://img.shields.io/badge/Material--UI-5.14-007FFF)

## ✨ Features

- 🎨 **Stunning Modern UI** - Glassmorphic design with gradient animations and smooth transitions
- 📊 **CPU Prediction Table** - Real-time comparison of predicted vs actual CPU usage with accuracy metrics
- 📈 **Interactive Charts** - Multiple visualization modes (Area, Bar, Scatter, Line charts)
- 🎯 **Performance Metrics** - RMSE, R² Score, MAE tracking with best run indicators
- 🔍 **Advanced Filtering** - Search and sort functionality for experiment runs
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🐳 **Docker Ready** - Fully containerized with production-optimized build
- ⚡ **Lightning Fast** - Built with Vite for optimal performance

## 🎯 Key Components

### CPU Prediction Analysis
- **29 Data Points** - Real CPU usage samples with ML predictions
- **Visual Comparison** - Beautiful area charts showing actual vs predicted values
- **Accuracy Tracking** - Per-sample and overall accuracy metrics
- **Color-Coded Status** - Visual indicators for prediction accuracy

### Performance Dashboard
- **Metric Cards** - Animated cards showing RMSE, R², MAE, and total runs
- **Multi-Mode Charts** - Switch between different visualization styles
- **Run Details** - Expandable drawer with complete experiment information
- **Real-Time Updates** - Dynamic data loading and filtering

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The dashboard will be available at `http://localhost:3000`

### Using Docker Directly

```bash
# Build the image
docker build -t aqua-analytics-dashboard .

# Run the container
docker run -d -p 3000:80 --name aqua-dashboard aqua-analytics-dashboard

# View logs
docker logs -f aqua-dashboard

# Stop the container
docker stop aqua-dashboard
docker rm aqua-dashboard
```

### Docker Features
- ✅ Multi-stage build for minimal image size
- ✅ Nginx web server for production
- ✅ Health checks enabled
- ✅ Gzip compression
- ✅ Security headers configured
- ✅ Static asset caching
- ✅ SPA routing support

## 📁 Project Structure

```
aqua-frontend/
├── public/
│   ├── results.json          # Experiment data
│   └── plots/                # Chart images
├── src/
│   ├── components/
│   │   ├── CPUPredictionTable.jsx    # 🆕 CPU prediction component
│   │   ├── MetricsSummary.jsx        # Performance metrics cards
│   │   ├── ChartsPanel.jsx           # Interactive charts
│   │   ├── RunsTable.jsx             # Experiment runs table
│   │   ├── DetailsDrawer.jsx         # Run details sidebar
│   │   ├── LayoutShell.jsx           # Main layout
│   │   └── utils.js                  # Utility functions
│   ├── App.jsx                       # Main application
│   ├── main.jsx                      # Entry point
│   └── theme.js                      # 🆕 Enhanced MUI theme
├── Dockerfile                        # 🆕 Docker configuration
├── docker-compose.yml                # 🆕 Docker Compose setup
├── nginx.conf                        # 🆕 Nginx configuration
├── .dockerignore                     # 🆕 Docker ignore rules
└── package.json                      # Dependencies
```

## 🎨 Customization

### Theme Colors
Edit `src/theme.js` to customize the color scheme:
```javascript
primary: { main: "#6366F1" }      // Indigo
secondary: { main: "#EC4899" }    // Pink
success: { main: "#10B981" }      // Green
warning: { main: "#F59E0B" }      // Amber
```

### CPU Data
Update the CPU usage data in `src/components/CPUPredictionTable.jsx`:
```javascript
const actualCPUData = [
  0.001966693, 0.003744092, 0.010520073, ...
];
```

### Experiment Data
Edit `public/results.json` to add/modify experiment runs:
```json
{
  "run_id": "experiment_001",
  "params": { "n_estimators": 100, "max_depth": 10 },
  "metrics": { "rmse": 0.02, "mae": 0.007, "r2": 0.84 },
  "git_commit": "abc123",
  "comments": "Baseline model",
  "plots": {
    "residuals": "plots/experiment_001_residuals.png",
    "feature_importance": "plots/experiment_001_feature_importance.png"
  }
}
```

## 🛠️ Technology Stack

- **Frontend Framework:** React 18.2
- **Build Tool:** Vite 7.2
- **UI Library:** Material-UI 5.14
- **Charts:** Recharts 2.8
- **Styling:** Emotion (CSS-in-JS)
- **Font:** Plus Jakarta Sans
- **Server:** Nginx (Production)
- **Container:** Docker

## 📊 CPU Prediction Algorithm

The dashboard includes a simple moving average prediction algorithm:
- **Window Size:** 3 samples
- **Trend Analysis:** Linear trend adjustment
- **Accuracy Tracking:** Per-sample error calculation
- **Visualization:** Dual-line area chart comparison

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linting (if configured)
```

## 🔒 Security Features

- X-Frame-Options header
- X-Content-Type-Options header
- X-XSS-Protection header
- Content Security Policy ready
- HTTPS ready (requires reverse proxy)

## 📈 Performance Optimizations

- Code splitting
- Lazy loading
- Asset optimization
- Gzip compression
- Browser caching
- Minified production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- Recharts team for the charting library
- React team for the amazing framework

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Made with ❤️ for ML Engineers and Data Scientists**