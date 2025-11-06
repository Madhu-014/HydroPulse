import React from "react";
import { Paper, Typography, Grid, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function MetricsSummary({ runs }) {
  const avgRmse = runs.length ? (runs.reduce((sum, r) => sum + r.metrics.rmse, 0) / runs.length).toFixed(3) : 0;
  const avgR2 = runs.length ? (runs.reduce((sum, r) => sum + r.metrics.r2, 0) / runs.length).toFixed(3) : 0;
  const avgMae = runs.length ? (runs.reduce((sum, r) => sum + r.metrics.mae, 0) / runs.length).toFixed(3) : 0;
  const bestRmse = runs.length ? Math.min(...runs.map(r => r.metrics.rmse)).toFixed(3) : 0;
  const bestR2 = runs.length ? Math.max(...runs.map(r => r.metrics.r2)).toFixed(3) : 0;
  const bestMae = runs.length ? Math.min(...runs.map(r => r.metrics.mae)).toFixed(3) : 0;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper elevation={4} sx={{ p: 3, position: "relative", overflow: "hidden", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)" } }}>
          <Box sx={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle, rgba(129,140,248,0.2), transparent)", borderRadius: "50%" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(129,140,248,0.15)", display: "flex" }}>
              <TrendingDownIcon sx={{ color: "primary.main", fontSize: 24 }} />
            </Box>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>RMSE</Typography>
          </Box>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1, color: "primary.main" }}>{avgRmse}</Typography>
          <Typography variant="caption" color="text.secondary">Best: {bestRmse}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={4} sx={{ p: 3, position: "relative", overflow: "hidden", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)" } }}>
          <Box sx={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle, rgba(52,211,153,0.2), transparent)", borderRadius: "50%" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(52,211,153,0.15)", display: "flex" }}>
              <TrendingUpIcon sx={{ color: "success.main", fontSize: 24 }} />
            </Box>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>R² Score</Typography>
          </Box>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1, color: "success.main" }}>{avgR2}</Typography>
          <Typography variant="caption" color="text.secondary">Best: {bestR2}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={4} sx={{ p: 3, position: "relative", overflow: "hidden", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)" } }}>
          <Box sx={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle, rgba(251,191,36,0.2), transparent)", borderRadius: "50%" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(251,191,36,0.15)", display: "flex" }}>
              <ShowChartIcon sx={{ color: "warning.main", fontSize: 24 }} />
            </Box>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>MAE</Typography>
          </Box>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1, color: "warning.main" }}>{avgMae}</Typography>
          <Typography variant="caption" color="text.secondary">Best: {bestMae}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
