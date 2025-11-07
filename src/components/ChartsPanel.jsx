import React, { useMemo } from "react";
import {
  Paper, Typography, Grid, ToggleButtonGroup, ToggleButton, Box
} from "@mui/material";
import {
  ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

export default function ChartsPanel({ runs }) {
  const [mode, setMode] = React.useState("composed");
  
  const data = useMemo(() => runs.map((r, i) => ({
    idx: i + 1,
    run: r.run_id.slice(0, 8),
    rmse: r.metrics.rmse,
    mae: r.metrics.mae,
    r2: r.metrics.r2
  })), [runs]);

  // Performance distribution data
  const performanceData = useMemo(() => {
    return data.map(d => ({
      run: d.run,
      performance: ((1 - d.rmse) * d.r2 * 100).toFixed(2),
      rmse: d.rmse,
      r2: d.r2
    }));
  }, [data]);

  return (
    <Paper 
      elevation={8} 
      sx={{ 
        p: 4,
        background: 'linear-gradient(145deg, rgba(19, 24, 48, 0.98) 0%, rgba(10, 14, 39, 0.98) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)'
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography 
            variant="h4" 
            fontWeight={800}
            sx={{ 
              background: 'linear-gradient(135deg, #6366F1 0%, #10B981 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            📊 Performance Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Advanced visualization of model performance metrics
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={mode}
          exclusive
          size="large"
          onChange={(_, v) => v && setMode(v)}
          sx={{ 
            bgcolor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: 3,
            p: 0.5,
            "& .MuiToggleButton-root": { 
              px: 3,
              py: 1,
              border: "none",
              borderRadius: 2.5,
              fontWeight: 700,
              transition: 'all 0.3s ease',
              "&.Mui-selected": { 
                bgcolor: "primary.main",
                color: "white",
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.6)',
                "&:hover": { 
                  bgcolor: "primary.dark",
                  transform: 'translateY(-2px)'
                }
              },
              "&:hover": {
                bgcolor: 'rgba(99, 102, 241, 0.2)'
              }
            }
          }}
        >
          <ToggleButton value="composed">Error Analysis</ToggleButton>
          <ToggleButton value="performance">Performance Score</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Grid container spacing={3}>
        {mode === "composed" && (
          <Grid item xs={12}>
            <Box sx={{ p: 3, bgcolor: 'rgba(16, 185, 129, 0.05)', borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'success.light' }}>
                📊 Combined Error & Accuracy Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Dual-axis chart showing error rates (bars) vs R² score (line) across models
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="run" 
                    stroke="rgba(255, 255, 255, 0.5)"
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="rgba(255, 255, 255, 0.5)"
                    style={{ fontSize: '11px' }}
                    label={{ 
                      value: 'Error Metrics', 
                      angle: -90, 
                      position: 'insideLeft',
                      fill: 'rgba(255, 255, 255, 0.7)',
                      style: { fontSize: '12px' }
                    }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="rgba(255, 255, 255, 0.5)"
                    style={{ fontSize: '11px' }}
                    label={{ 
                      value: 'R² Score', 
                      angle: 90, 
                      position: 'insideRight',
                      fill: 'rgba(255, 255, 255, 0.7)',
                      style: { fontSize: '12px' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(19, 24, 48, 0.95)', 
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ 
                      paddingTop: '10px',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  />
                  <Bar 
                    yAxisId="left"
                    dataKey="rmse" 
                    fill="#EF4444" 
                    name="RMSE"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    yAxisId="left"
                    dataKey="mae" 
                    fill="#F59E0B" 
                    name="MAE"
                    radius={[8, 8, 0, 0]}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="r2" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 5 }}
                    name="R² Score"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        )}

        {mode === "performance" && (
          <Grid item xs={12}>
            <Box sx={{ p: 3, bgcolor: 'rgba(236, 72, 153, 0.05)', borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'secondary.light' }}>
                🚀 Overall Performance Score
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Composite performance metric: (1 - RMSE) × R² × 100
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={performanceData}>
                  <defs>
                    <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="run" 
                    stroke="rgba(255, 255, 255, 0.5)"
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis 
                    stroke="rgba(255, 255, 255, 0.5)"
                    style={{ fontSize: '11px' }}
                    label={{ 
                      value: 'Performance Score', 
                      angle: -90, 
                      position: 'insideLeft',
                      fill: 'rgba(255, 255, 255, 0.7)',
                      style: { fontSize: '12px' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(19, 24, 48, 0.95)', 
                      border: '1px solid rgba(236, 72, 153, 0.3)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="performance" 
                    fill="url(#performanceGradient)"
                    radius={[10, 10, 0, 0]}
                    name="Performance Score"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
