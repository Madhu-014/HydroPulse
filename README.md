🌊 HydroPulse – Intelligent Node Health & CPU Prediction Dashboard

A modern, visually rich monitoring dashboard built with React + Vite + Material-UI + Recharts, designed for ML Ops, cluster monitoring, node health tracking, and CPU usage prediction.
HydroPulse provides interactive experiment visualization, node performance summaries, and real-time prediction analytics — all wrapped in a beautiful blue–green–purple themed UI.










✨ Highlights

💠 HydroPulse Theme – Professional blue-green-purple ML dashboard look

📊 Node Health Monitoring – RMSE, MAE, R², Latency, Error Rate & health indicators

🔮 CPU Prediction Engine – Actual vs predicted CPU usage with accuracy tracking

📈 Advanced Visualization Suite – Error charts, performance scoring, smoothing analysis

🔍 Run Insights – Expandable drawers with configuration, metrics & experiment details

⚡ Ultra Fast – Built with Vite + optimized asset loading

📱 Responsive – Works perfectly on laptop, tablet, and mobile

🐳 Docker & Vercel Ready – Deploy anywhere effortlessly

🚀 Core Features
🔹 Node Health & Metrics Summary

RMSE, MAE, Latency, Error Rate, and custom metrics

Gradient metric cards

Best-run indicators

Linear progress visualization

🔹 HydroPulse Charts Panel

Interactive charts using Recharts:

📊 Error Analysis Chart (RMSE, MAE, R²)

🚀 Performance Score Chart

🔁 Trend Smoothing Index (New)

📉 Stability/Volatility Metric (New)

🔹 CPU Usage Prediction

Real-time prediction using a moving average-based model

Trend-corrected predictions

Accuracy % per datapoint

Visual scatter + line chart comparison

🔹 Runs Management

View all ML experiments

Sort, filter, expand, and inspect runs

Git commit, parameters, comments & plots

Detailed sidebar drawer

🧩 Project Structure
HydroPulse/
├── public/
│   ├── results.json                 # Experiment runs
│   └── plots/                       # Stored experiment plots
├── src/
│   ├── components/
│   │   ├── CPUPredictionTable.jsx   # CPU prediction with accuracy tracking
│   │   ├── MetricsSummary.jsx       # Node health metric cards
│   │   ├── ChartsPanel.jsx          # Interactive analytics charts
│   │   ├── RunsTable.jsx            # Runs listing
│   │   ├── DetailsDrawer.jsx        # Run details drawer
│   │   ├── LayoutShell.jsx          # Main layout container
│   │   └── utils.js                 # Shared utilities
│   ├── App.jsx                      # Root application
│   ├── main.jsx                     # Entry point
│   └── theme.js                     # HydroPulse color theme
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
└── package.json

💻 Local Development
npm install
npm run dev


App runs on:
👉 http://localhost:5173

🏗️ Production Build
npm run build
npm run preview

🐳 Docker Deployment
Using Docker Compose
docker-compose up -d
docker-compose logs -f
docker-compose down

Direct Docker Build
docker build -t hydropulse-dashboard .
docker run -d -p 3000:80 hydropulse-dashboard


Dashboard:
👉 http://localhost:3000

Docker Features

Multi-stage build

Nginx optimized for SPAs

Gzip compression

Static caching

Security headers

🎨 Design Customization

Modify colors in theme.js:

primary:   { main: "#3ABEF9" },   // Blue
secondary: { main: "#14B8A6" },   // Teal
accent:    { main: "#8B5CF6" },   // Purple

📁 Customize Prediction Data

Inside CPUPredictionTable.jsx:

const actualCPUData = [0.0019, 0.0037, 0.0105, ...];

🧠 CPU Prediction Model

The dashboard uses:

Moving Average (window=3)

Directional trend correction

Error computation per point

Total accuracy score

Real & predicted curve visualization

Simple but perfect for monitoring demos and MLOps workloads.

🌐 Deploying to Vercel

HydroPulse is fully Vercel compatible.

Steps:

Commit your project to GitHub

Go to Vercel → New Project

Select your HydroPulse repo

Build settings auto-detected

Deploy 🚀

Each push triggers automatic redeploys.

🔐 Security Features

Content Security Policy ready

X-Frame-Options

X-XSS-Protection

Mime-sniff protection

HTTPS-ready with proxy

📈 Performance Optimizations

Code splitting

Lazy loading

Minified build

Static asset compression

Fast Vite server

🤝 Contributing

Fork the repo

Create a feature branch

Push changes

Create PR

📜 License

MIT License

❤️ Made for ML Engineers, MLOps enthusiasts, and Cloud Developers
