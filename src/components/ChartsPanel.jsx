import React, { useMemo } from "react";
import {
  Paper, Typography, Grid, ToggleButtonGroup, ToggleButton, Box
} from "@mui/material";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, ScatterChart, Scatter, ResponsiveContainer
} from "recharts";

export default function ChartsPanel({ runs }) {
  const [mode, setMode] = React.useState("rmse");
  const data = useMemo(() => runs.map((r, i) => ({
    idx: i + 1,
    run: r.run_id.slice(0, 8),
    rmse: r.metrics.rmse,
    mae: r.metrics.mae,
    r2: r.metrics.r2
  })), [runs]);

  return (
    <Paper elevation={4} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          📊 Performance Analytics
        </Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          size="small"
          onChange={(_, v) => v && setMode(v)}
          sx={{ 
            "& .MuiToggleButton-root": { 
              px: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              "&.Mui-selected": { 
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" }
              }
            }
          }}
        >
          <ToggleButton value="rmse">RMSE</ToggleButton>
          <ToggleButton value="r2">R²</ToggleButton>
          <ToggleButton value="scatter">Scatter</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={2}>
        {mode === "rmse" && (
          <Grid item xs={12} md={6}>
            <Typography variant="caption">RMSE Trend</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
                <XAxis dataKey="run" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rmse" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        )}
        {mode === "r2" && (
          <Grid item xs={12} md={6}>
            <Typography variant="caption">R2 Score Distribution</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                <XAxis dataKey="run" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="r2" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        )}
        {mode === "scatter" && (
          <Grid item xs={12} md={6}>
            <Typography variant="caption">MAE vs RMSE Scatter</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <ScatterChart>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                <XAxis dataKey="rmse" name="RMSE" />
                <YAxis dataKey="mae" name="MAE" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={data} fill="#10B981" />
              </ScatterChart>
            </ResponsiveContainer>
          </Grid>
        )}
        {/* Overview chart always present */}
        <Grid item xs={12} md={6}>
          <Typography variant="caption">All Metrics Snapshot (RMSE line + R2 line)</Typography>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
              <XAxis dataKey="run" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rmse" stroke="#6366F1" strokeWidth={2} />
              <Line type="monotone" dataKey="r2" stroke="#06B6D4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}