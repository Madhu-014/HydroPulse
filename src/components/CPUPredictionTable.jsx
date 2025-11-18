import React, { useMemo } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  LinearProgress
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import InsightsIcon from "@mui/icons-material/Insights";
import SpeedIcon from "@mui/icons-material/Speed";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// CPU data
const actualCPUData = [
  0.001966693, 0.003744092, 0.010520073, 0.008588493, 0.003005992,
  0.002999998, 0.002747962, 0.00815166, 0.00679118, 0.007328318,
  0.006038187, 0.009075093, 0, 0.00083514, 0.00128423,
  0.00036139, 0.001228059, 0.00000127, 0.021235764, 0,
  0.000000823, 0.00237557, 0.000000884, 0.00000137, 0.001092762,
  0.001220073, 0.002302586, 0.000813459, 0.003713911
];

// Generate predictions
function generatePredictions(actualData) {
  const predictions = [];
  const windowSize = 3;
  for (let i = 0; i < actualData.length; i++) {
    if (i < windowSize) {
      predictions.push(actualData.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1));
    } else {
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

  // Table data
  const tableData = useMemo(
    () =>
      actualCPUData.map((actual, idx) => ({
        index: idx + 1,
        actual,
        predicted: predictions[idx],
        error: Math.abs(actual - predictions[idx]),
        errorPercent:
          actual !== 0 ? (Math.abs(actual - predictions[idx]) / actual) * 100 : 0
      })),
    [predictions]
  );

  // Metrics
  const MAE = useMemo(
    () => (tableData.reduce((a, r) => a + r.error, 0) / tableData.length).toFixed(6),
    [tableData]
  );

  const RMSE = useMemo(() => {
    const mse =
      tableData.reduce((a, r) => a + r.error ** 2, 0) / tableData.length;
    return Math.sqrt(mse).toFixed(6);
  }, [tableData]);

  const MAPE = useMemo(() => {
    const sum = tableData.reduce((a, r) => a + r.errorPercent, 0);
    return (sum / tableData.length).toFixed(2);
  }, [tableData]);

  const SMAPE = useMemo(() => {
    const val =
      (100 / tableData.length) *
      tableData.reduce((a, r) => {
        const denom = (Math.abs(r.actual) + Math.abs(r.predicted)) / 2;
        return a + (denom === 0 ? 0 : Math.abs(r.actual - r.predicted) / denom);
      }, 0);
    return val.toFixed(2);
  }, [tableData]);

  const driftScore = useMemo(() => {
    const diff = tableData.reduce((a, r) => a + (r.predicted - r.actual), 0);
    return diff.toFixed(5);
  }, [tableData]);

  const volatility = useMemo(() => {
    const mean =
      actualCPUData.reduce((a, v) => a + v, 0) / actualCPUData.length;
    const variance =
      actualCPUData.reduce((a, v) => a + (v - mean) ** 2, 0) /
      actualCPUData.length;
    return Math.sqrt(variance).toFixed(6);
  }, []);

  const stabilityScore = useMemo(() => {
    return Math.max(0, 100 - volatility * 9000).toFixed(1); // custom scoring
  }, [volatility]);

  const accuracy = (100 - Math.min(MAPE, 100)).toFixed(2);

  // Chart data
  const chartData = useMemo(
    () =>
      actualCPUData.map((actual, idx) => ({
        index: idx + 1,
        actual: actual * 100,
        predicted: predictions[idx] * 100
      })),
    [predictions]
  );

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        background: "rgba(10, 14, 39, 0.85)",
        backdropFilter: "blur(20px)",
        borderRadius: 4,
        border: "1px solid rgba(99, 102, 241, 0.25)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Glow Orbs */}
      <Box sx={{
        position: "absolute",
        top: -120,
        right: -120,
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.28), transparent)",
        filter: "blur(70px)"
      }} />
      <Box sx={{
        position: "absolute",
        bottom: -150,
        left: -120,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.25), transparent)",
        filter: "blur(70px)"
      }} />

      {/* Header + Metrics */}
      <Box sx={{ position: "relative", zIndex: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, flexWrap: "wrap" }}>
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #60A5FA, #34D399, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              CPU Prediction Performance
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 1 }}>
              Detailed analytics from model predictions & CPU behaviour
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            <Chip label={`Accuracy: ${accuracy}%`} color="success" />
            <Chip label={`RMSE: ${RMSE}`} color="primary" icon={<InsightsIcon />} />
            <Chip label={`MAE: ${MAE}`} color="secondary" icon={<EqualizerIcon />} />
            <Chip label={`MAPE: ${MAPE}%`} sx={{ bgcolor: "rgba(56,189,248,0.25)" }} />
            <Chip label={`SMAPE: ${SMAPE}%`} sx={{ bgcolor: "rgba(147,51,234,0.25)" }} />
            <Chip label={`Drift: ${driftScore}`} sx={{ bgcolor: "rgba(236,72,153,0.25)" }} />
            <Chip label={`Volatility: ${volatility}`} sx={{ bgcolor: "rgba(249,115,22,0.25)" }} />
            <Chip label={`Stability: ${stabilityScore}%`} color="success" icon={<SpeedIcon />} />
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ mb: 4 }}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="index" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip />
              <Area type="monotone" dataKey="actual" stroke="#22D3EE" fill="#22D3EE55" strokeWidth={3} />
              <Area type="monotone" dataKey="predicted" stroke="#A78BFA" fill="#A78BFA44" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Table */}
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["#", "Actual", "Predicted", "Abs Error", "Status", "Accuracy"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.map((row) => {
                const ok = row.errorPercent < 10;
                return (
                  <TableRow key={row.index}>
                    <TableCell><Chip label={row.index} size="small" /></TableCell>
                    <TableCell>{row.actual.toFixed(9)}</TableCell>
                    <TableCell>{row.predicted.toFixed(9)}</TableCell>
                    <TableCell>{row.error.toFixed(9)}</TableCell>
                    <TableCell>
                      {ok ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="warning" />}
                    </TableCell>
                    <TableCell>
                      <LinearProgress variant="determinate" value={Math.min(100 - row.errorPercent, 100)} />
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
