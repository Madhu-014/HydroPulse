import React, { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Grid,
  Paper
} from "@mui/material";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  LineChart,   // added
  BarChart,    // added
  Bar, 
  Line, 
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from "recharts";


export default function ChartsPanel({ runs }) {
  const [mode, setMode] = useState("overview");

  const colors = {
    blue: "#3ABEF9",
    teal: "#14B8A6",
    purple: "#8B5CF6",
    pink: "#EC4899",
    yellow: "#FACC15",
    bgDark1: "#0A1A2F",
    bgDark2: "#05101F"
  };

  // Ensure metrics are numbers
  const data = useMemo(() =>
    runs.map((r, i) => ({
      idx: i + 1,
      run: r.run_id.slice(0, 8),
      rmse: Number(r.metrics.rmse),
      mae: Number(r.metrics.mae),
      r2: Number(r.metrics.r2),
      mape: Number(r.metrics.mape || 0),
      smape: Number(r.metrics.smape || 0),
      drift: Number(r.metrics.drift || 0),
      volatility: Number(r.metrics.volatility || 0),
      stability: Number(r.metrics.stability || 0),
      accuracy: Number(((1 - (r.metrics.mape || 0)/100) * 100).toFixed(2))
    })), [runs]
  );

  // Derived datasets
  const performanceData = useMemo(() =>
    data.map(d => ({ run: d.run, performance: (1 - d.rmse) * d.r2 * 100, rmse: d.rmse, r2: d.r2 })), [data]
  );

  const driftVolData = useMemo(() =>
    data.map(d => ({ run: d.run, drift: d.drift, volatility: d.volatility })), [data]
  );

  const smapeMapeData = useMemo(() =>
    data.map(d => ({ run: d.run, mape: d.mape, smape: d.smape })), [data]
  );

  const stabilityAccuracyData = useMemo(() =>
    data.map(d => ({ run: d.run, stability: d.stability, accuracy: d.accuracy })), [data]
  );

  return (
    <Card sx={{
      background: `linear-gradient(to bottom right, ${colors.bgDark1}, ${colors.bgDark2})`,
      border: "1px solid rgba(58,190,249,0.25)",
      boxShadow: "0px 0px 35px rgba(0,0,0,0.45)",
      borderRadius: 3,
      p: 3
    }}>
      <CardHeader
        title={
          <Typography variant="h4" sx={{
            fontWeight: 800,
            background: `linear-gradient(to right, ${colors.blue}, ${colors.teal}, ${colors.purple})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            📊 Model Performance Dashboard
          </Typography>
        }
        subheader={<Typography variant="body2" sx={{ color: "rgb(148 163 184)" }}>
          Visual summary of model metrics including error, performance, drift, and stability
        </Typography>}
        action={
          <ToggleButtonGroup
            exclusive
            value={mode}
            onChange={(e, v) => v && setMode(v)}
            sx={{ background: "rgba(58,190,249,0.12)", borderRadius: 1.5, border: "1px solid rgba(58,190,249,0.25)", p: "2px" }}
          >
            <ToggleButton value="overview" sx={{ px:3, py:1, textTransform:"none", fontWeight:600, borderRadius:"10px !important", "&.Mui-selected": {background: colors.blue, color:"white", boxShadow:"0 4px 15px rgba(58,190,249,0.4)"}}}>Overview</ToggleButton>
            <ToggleButton value="error" sx={{ px:3, py:1, textTransform:"none", fontWeight:600, borderRadius:"10px !important", "&.Mui-selected": {background: colors.teal, color:"white", boxShadow:"0 4px 15px rgba(20,184,166,0.4)"}}}>Error Analysis</ToggleButton>
            <ToggleButton value="performance" sx={{ px:3, py:1, textTransform:"none", fontWeight:600, borderRadius:"10px !important", "&.Mui-selected": {background: colors.purple, color:"white", boxShadow:"0 4px 15px rgba(139,92,246,0.4)"}}}>Performance</ToggleButton>
            <ToggleButton value="drift" sx={{ px:3, py:1, textTransform:"none", fontWeight:600, borderRadius:"10px !important", "&.Mui-selected": {background: colors.pink, color:"white", boxShadow:"0 4px 15px rgba(236,72,153,0.4)"}}}>Drift & Volatility</ToggleButton>
            <ToggleButton value="accuracy" sx={{ px:3, py:1, textTransform:"none", fontWeight:600, borderRadius:"10px !important", "&.Mui-selected": {background: colors.yellow, color:"white", boxShadow:"0 4px 15px rgba(250,204,21,0.4)"}}}>Stability & Accuracy</ToggleButton>
          </ToggleButtonGroup>
        }
        sx={{ pb: 0 }}
      />

      <CardContent>
        {/* OVERVIEW: show multiple small charts together */}
        {mode === "overview" && (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p:2, background:"rgba(58,190,249,0.08)", borderRadius:2 }}>
                <Typography sx={{ color: colors.blue, fontWeight:700, mb:1 }}>📉 RMSE Trend</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                    <Line type="monotone" dataKey="rmse" stroke={colors.blue} strokeWidth={3} dot={{ r:3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p:2, background:"rgba(20,184,166,0.08)", borderRadius:2 }}>
                <Typography sx={{ color: colors.teal, fontWeight:700, mb:1 }}>📊 MAE Trend</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                    <Line type="monotone" dataKey="mae" stroke={colors.teal} strokeWidth={3} dot={{ r:3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p:2, background:"rgba(139,92,246,0.08)", borderRadius:2 }}>
                <Typography sx={{ color: colors.purple, fontWeight:700, mb:1 }}>📈 Performance Score</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={performanceData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                    <Bar dataKey="performance" fill={colors.purple} radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p:2, background:"rgba(236,72,153,0.08)", borderRadius:2 }}>
                <Typography sx={{ color: colors.pink, fontWeight:700, mb:1 }}>⚡ Drift & Volatility</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={driftVolData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                    <Line dataKey="drift" stroke={colors.pink} strokeWidth={3} dot={{ r:3 }} name="Drift" />
                    <Line dataKey="volatility" stroke={colors.yellow} strokeWidth={3} dot={{ r:3 }} name="Volatility" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p:2, background:"rgba(250,204,21,0.08)", borderRadius:2 }}>
                <Typography sx={{ color: colors.yellow, fontWeight:700, mb:1 }}>📏 Stability & Accuracy</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={stabilityAccuracyData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                    <Line dataKey="stability" stroke={colors.purple} strokeWidth={3} dot={{ r:4 }} name="Stability" />
                    <Line dataKey="accuracy" stroke={colors.teal} strokeWidth={3} dot={{ r:4 }} name="Accuracy" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* ERROR ANALYSIS */}
        {mode === "error" && (
          <Box sx={{ mt: 4, p: 3, borderRadius: 3, background: "rgba(20,184,166,0.08)" }}>
            <Typography sx={{ color: colors.teal, fontWeight: 700, mb: 1 }}>📊 RMSE, MAE & R² Analysis</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={data}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
                <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                <Legend />
                <Bar yAxisId="left" dataKey="rmse" fill={colors.blue} name="RMSE" radius={[6,6,0,0]} />
                <Bar yAxisId="left" dataKey="mae" fill={colors.teal} name="MAE" radius={[6,6,0,0]} />
                <Line yAxisId="right" dataKey="r2" stroke={colors.purple} strokeWidth={3} dot={{ r:5 }} name="R² Score" />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* PERFORMANCE SCORE */}
        {mode === "performance" && (
          <Box sx={{ mt: 4, p: 3, borderRadius: 3, background: "rgba(139,92,246,0.08)" }}>
            <Typography sx={{ color: colors.purple, fontWeight: 700, mb: 1 }}>🚀 Performance Score</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                <Bar dataKey="performance" fill={colors.purple} radius={[10,10,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* DRIFT & VOLATILITY */}
        {mode === "drift" && (
          <Box sx={{ mt:4, p:3, borderRadius:3, background:"rgba(236,72,153,0.08)" }}>
            <Typography sx={{ color: colors.pink, fontWeight:700, mb:1 }}>⚡ Drift & Volatility</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={driftVolData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                <Line dataKey="drift" stroke={colors.pink} strokeWidth={3} dot={{ r:4 }} name="Drift" />
                <Line dataKey="volatility" stroke={colors.yellow} strokeWidth={3} dot={{ r:4 }} name="Volatility" />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* STABILITY & ACCURACY */}
        {mode === "accuracy" && (
          <Box sx={{ mt:4, p:3, borderRadius:3, background:"rgba(250,204,21,0.08)" }}>
            <Typography sx={{ color: colors.yellow, fontWeight:700, mb:1 }}>📏 Stability & Accuracy</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={stabilityAccuracyData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="run" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background:"rgba(10,26,47,0.95)", borderRadius:6 }} />
                <Line dataKey="stability" stroke={colors.purple} strokeWidth={3} dot={{ r:4 }} name="Stability" />
                <Line dataKey="accuracy" stroke={colors.teal} strokeWidth={3} dot={{ r:4 }} name="Accuracy" />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        )}

      </CardContent>
    </Card>
  );
}
