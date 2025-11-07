import React from "react";
import { Paper, Typography, Grid, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SpeedIcon from "@mui/icons-material/Speed";

export default function MetricsSummary({ runs }) {
  const avgRmse = runs.length ? (runs.reduce((sum, r) => sum + r.metrics.rmse, 0) / runs.length).toFixed(3) : 0;
  const avgR2 = runs.length ? (runs.reduce((sum, r) => sum + r.metrics.r2, 0) / runs.length).toFixed(3) : 0;
  const avgMae = runs.length ? (runs.reduce((sum, r) => sum + r.metrics.mae, 0) / runs.length).toFixed(3) : 0;
  const bestRmse = runs.length ? Math.min(...runs.map(r => r.metrics.rmse)).toFixed(3) : 0;
  const bestR2 = runs.length ? Math.max(...runs.map(r => r.metrics.r2)).toFixed(3) : 0;
  const bestMae = runs.length ? Math.min(...runs.map(r => r.metrics.mae)).toFixed(3) : 0;

  const metrics = [
    {
      title: "RMSE",
      value: avgRmse,
      best: bestRmse,
      icon: TrendingDownIcon,
      color: "#6366F1",
      gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
      bgGradient: "radial-gradient(circle at top right, rgba(99, 102, 241, 0.2), transparent)"
    },
    {
      title: "R² Score",
      value: avgR2,
      best: bestR2,
      icon: TrendingUpIcon,
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      bgGradient: "radial-gradient(circle at top right, rgba(16, 185, 129, 0.2), transparent)"
    },
    {
      title: "MAE",
      value: avgMae,
      best: bestMae,
      icon: ShowChartIcon,
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
      bgGradient: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.2), transparent)"
    },
    {
      title: "Total Runs",
      value: runs.length,
      best: "Active",
      icon: SpeedIcon,
      color: "#EC4899",
      gradient: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
      bgGradient: "radial-gradient(circle at top right, rgba(236, 72, 153, 0.2), transparent)"
    }
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <Grid item xs={12} sm={6} lg={3} key={idx}>
            <Paper 
              elevation={8} 
              sx={{ 
                p: 3.5, 
                position: "relative", 
                overflow: "hidden", 
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: `1px solid ${metric.color}33`,
                "&:hover": { 
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: `0 12px 40px ${metric.color}40`,
                  border: `1px solid ${metric.color}66`
                }
              }}
            >
              {/* Animated background gradient */}
              <Box sx={{ 
                position: "absolute", 
                top: 0, 
                right: 0, 
                width: 180, 
                height: 180, 
                background: metric.bgGradient,
                borderRadius: "50%",
                animation: "pulse 3s ease-in-out infinite"
              }} />
              
              {/* Decorative line */}
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: metric.gradient
              }} />

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 3, 
                    background: metric.gradient,
                    display: "flex",
                    boxShadow: `0 4px 14px ${metric.color}60`
                  }}>
                    <Icon sx={{ color: "white", fontSize: 28 }} />
                  </Box>
                  <Box sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: `${metric.color}20`,
                    border: `1px solid ${metric.color}40`
                  }}>
                    <Typography variant="caption" fontWeight={700} sx={{ color: metric.color }}>
                      Best: {metric.best}
                    </Typography>
                  </Box>
                </Box>

                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  fontWeight={700}
                  sx={{ mb: 1.5, letterSpacing: '0.5px', textTransform: 'uppercase' }}
                >
                  {metric.title}
                </Typography>

                <Typography 
                  variant="h3" 
                  fontWeight={800} 
                  sx={{ 
                    background: metric.gradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: '-0.02em'
                  }}
                >
                  {metric.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        );
      })}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </Grid>
  );
}
