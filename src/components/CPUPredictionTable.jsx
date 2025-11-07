import React, { useMemo } from "react";
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, Chip, LinearProgress
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Actual CPU usage data
const actualCPUData = [
  0.001966693, 0.003744092, 0.010520073, 0.008588493, 0.003005992,
  0.002999998, 0.002747962, 0.00815166, 0.00679118, 0.007328318,
  0.006038187, 0.009075093, 0, 0.00083514, 0.00128423,
  0.00036139, 0.001228059, 0.00000127, 0.021235764, 0,
  0.000000823, 0.00237557, 0.000000884, 0.00000137, 0.001092762,
  0.001220073, 0.002302586, 0.000813459, 0.003713911
];

// Simple prediction algorithm (moving average with trend)
function generatePredictions(actualData) {
  const predictions = [];
  const windowSize = 3;
  
  for (let i = 0; i < actualData.length; i++) {
    if (i < windowSize) {
      // For initial values, use a simple weighted average
      predictions.push(actualData.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1));
    } else {
      // Moving average with slight trend adjustment
      const window = actualData.slice(i - windowSize, i);
      const avg = window.reduce((a, b) => a + b, 0) / windowSize;
      const trend = (window[windowSize - 1] - window[0]) / windowSize;
      predictions.push(Math.max(0, avg + trend * 0.5));
    }
  }
  
  return predictions;
}

export default function CPUPredictionTable() {
  const predictions = useMemo(() => generatePredictions(actualCPUData), []);
  
  const tableData = useMemo(() => 
    actualCPUData.map((actual, idx) => ({
      index: idx + 1,
      actual: actual,
      predicted: predictions[idx],
      error: Math.abs(actual - predictions[idx]),
      errorPercent: actual !== 0 ? (Math.abs(actual - predictions[idx]) / actual) * 100 : 0
    })),
    [predictions]
  );

  const chartData = useMemo(() =>
    actualCPUData.map((actual, idx) => ({
      index: idx + 1,
      actual: actual * 100,
      predicted: predictions[idx] * 100
    })),
    [predictions]
  );

  const avgError = useMemo(() => {
    const sum = tableData.reduce((acc, row) => acc + row.error, 0);
    return (sum / tableData.length).toFixed(6);
  }, [tableData]);

  const accuracy = useMemo(() => {
    const avgErrorPercent = tableData.reduce((acc, row) => acc + row.errorPercent, 0) / tableData.length;
    return (100 - Math.min(avgErrorPercent, 100)).toFixed(2);
  }, [tableData]);

  return (
    <Paper 
      elevation={8} 
      sx={{ 
        p: 4, 
        background: 'linear-gradient(145deg, rgba(19, 24, 48, 0.98) 0%, rgba(10, 14, 39, 0.98) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography 
              variant="h4" 
              fontWeight={800}
              sx={{ 
                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              🚀 CPU Usage Prediction Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time comparison of predicted vs actual CPU utilization
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip 
              label={`Accuracy: ${accuracy}%`}
              color="success"
              sx={{ 
                fontSize: '0.9rem', 
                fontWeight: 700,
                height: 36,
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
              }}
            />
            <Chip 
              label={`Avg Error: ${avgError}`}
              color="info"
              sx={{ 
                fontSize: '0.9rem', 
                fontWeight: 700,
                height: 36,
                boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)'
              }}
            />
          </Box>
        </Box>

        {/* Visualization */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'rgba(99, 102, 241, 0.05)', borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            📈 Prediction Trend Visualization
          </Typography>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="index" 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
                label={{ value: 'CPU Usage (%)', angle: -90, position: 'insideLeft', fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(19, 24, 48, 0.95)', 
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#6366F1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorActual)"
                name="Actual"
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#EC4899" 
                strokeWidth={3}
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorPredicted)"
                name="Predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Table */}
        <TableContainer 
          sx={{ 
            maxHeight: 500, 
            borderRadius: 3,
            border: '1px solid rgba(99, 102, 241, 0.2)',
            '&::-webkit-scrollbar': {
              width: '10px',
              height: '10px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(99, 102, 241, 0.05)',
              borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(99, 102, 241, 0.3)',
              borderRadius: '10px',
              '&:hover': {
                background: 'rgba(99, 102, 241, 0.5)'
              }
            }
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', minWidth: 100, whiteSpace: 'nowrap' }}>Sample #</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.95rem', minWidth: 150, whiteSpace: 'nowrap' }}>Actual CPU Usage</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.95rem', minWidth: 180, whiteSpace: 'nowrap' }}>Predicted CPU Usage</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.95rem', minWidth: 140, whiteSpace: 'nowrap' }}>Absolute Error</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.95rem', minWidth: 100, whiteSpace: 'nowrap' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.95rem', minWidth: 180, whiteSpace: 'nowrap' }}>Accuracy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => {
                const isAccurate = row.errorPercent < 10;
                return (
                  <TableRow 
                    key={row.index}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(99, 102, 241, 0.08)',
                        transition: 'all 0.2s ease'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <TableCell>
                      <Chip 
                        label={row.index} 
                        size="small" 
                        sx={{ 
                          fontWeight: 700,
                          bgcolor: 'rgba(99, 102, 241, 0.2)',
                          minWidth: 45
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600} color="primary.light">
                        {row.actual.toFixed(9)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600} color="secondary.light">
                        {row.predicted.toFixed(9)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={600}
                        sx={{ 
                          color: isAccurate ? 'success.main' : 'warning.main'
                        }}
                      >
                        {row.error.toFixed(9)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {isAccurate ? (
                        <TrendingUpIcon sx={{ color: 'success.main', fontSize: 24 }} />
                      ) : (
                        <TrendingDownIcon sx={{ color: 'warning.main', fontSize: 24 }} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ minWidth: 120 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min(100 - row.errorPercent, 100)} 
                            sx={{ 
                              flexGrow: 1, 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: 'rgba(99, 102, 241, 0.2)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: isAccurate ? 'success.main' : 'warning.main',
                                borderRadius: 4
                              }
                            }}
                          />
                          <Typography variant="caption" fontWeight={700} sx={{ minWidth: 45 }}>
                            {Math.min(100 - row.errorPercent, 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}
