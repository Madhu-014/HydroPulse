# 🌊 HydroPulse – Real-Time Water Quality Monitoring Dashboard

HydroPulse is a modern **full-stack water quality monitoring system** designed to collect, analyze, and visualize **real-time environmental sensor data**.

It features a clean, intuitive **React + Vite dashboard** that displays key water parameters such as **pH, Temperature, Turbidity, TDS**, and more — ideal for **IoT, ML applications, smart water networks**, and environmental monitoring.

---

## ✨ Features

### 🔹 **Real-Time Dashboard**
- Live readings for **pH, Temperature, TDS, Turbidity**
- Smooth animated charts powered by **Recharts**
- Modern UI built using **Material-UI**

### 🔹 **Sensor Data Ingestion**
- Supports hardware like **ESP32, NodeMCU (ESP8266), Arduino + sensors)**
- Backend API endpoint for pushing sensor readings

### 🔹 **Historical Data Visualization**
- Interactive **time-series charts**
- Filters by **hour, day, week**
- (Optional) CSV export

### 🔹 **Alerts & Status Indicators**
- Color-coded alert levels  
- Auto-detection of unsafe readings (e.g., **high turbidity → red alert**)

### 🔹 **Optimized Frontend**
- Built with **Vite** (super-fast builds)
- Fully **responsive** for all screen sizes

---

## 📁 Project Structure

```plaintext
HydroPulse/
├── backend/
│   ├── server.js                # Express backend server
│   ├── routes/                  # API routes
│   ├── models/                  # Database models (MongoDB optional)
│   └── database.js              # DB connection file
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Dashboard & other pages
│   │   ├── hooks/               # Custom React hooks
│   │   ├── context/             # Global state providers
│   │   ├── api.js               # API communication
│   │   └── main.jsx             # React root
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

🚀 Quick Start Guide
✅ Clone the Repository
git clone https://github.com/Madhu-014/HydroPulse.git
cd HydroPulse

▶️ Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


Your frontend runs at:

👉 http://localhost:5173

⚙️ Backend Setup (Node.js + Express)
cd backend
npm install
npm start


Backend runs at:

👉 http://localhost:5000

🌐 Deploying Frontend to Vercel

Push your project to GitHub

Open Vercel Dashboard

Click New Project → Import GitHub Repo

Select HydroPulse

Set:

Framework Preset: Vite
Build Command: npm run build
Output Directory: dist


Click Deploy 🎉

Your live dashboard will be deployed instantly.

🛠️ Tech Stack
Frontend

React 18

Vite

Material-UI

Recharts

Axios

Backend

Node.js

Express

MongoDB (optional)

Deployment

Vercel (Frontend)

Render / Heroku / AWS / Local Server (Backend)

🔮 Future Enhancements

ML-based anomaly detection

Predictive water quality scoring

SMS/Email alert notifications

Multi-sensor multi-node support

Offline IoT data buffering

🤝 Contributing

Fork the repo

Create a feature branch

Commit your changes

Open a Pull Request

📄 License

MIT License © 2025

❤️ Acknowledgments

Thanks to the open-source community behind React, Vite, Express, Material-UI, and Recharts.
