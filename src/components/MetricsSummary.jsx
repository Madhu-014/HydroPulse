// MetricsSummary.jsx
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InsightsIcon from "@mui/icons-material/Insights";
import SpeedIcon from "@mui/icons-material/Speed";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

// Generate small sparkline data
const generateTrendData = (arr, length = 15) => {
  if (!arr || arr.length === 0)
    return Array(length).fill(0).map((_, i) => ({ index: i, value: 0 }));
  const step = Math.max(1, Math.floor(arr.length / length));
  return arr.filter((_, idx) => idx % step === 0).map((v, i) => ({ index: i, value: v }));
};

export default function MetricsSummary({ nodeHealth }) {
  const theme = useTheme();
  if (!nodeHealth) return null;

  // Define metrics
  const metrics = useMemo(() => {
    const sampleTrend = generateTrendData(nodeHealth.rmse?.history ?? [], 20);

    return [
      {
        title: "RMSE",
        value: nodeHealth.rmse?.average ?? 0,
        best: nodeHealth.rmse?.best ?? 0,
        icon: <TrendingDownIcon fontSize="large" />,
        gradient: theme.palette.gradients.primary,
        trendData: generateTrendData(nodeHealth.rmse?.history),
        color: "#6366F1",
      },
      {
        title: "MAE",
        value: nodeHealth.mae?.average ?? 0,
        best: nodeHealth.mae?.best ?? 0,
        icon: <TrendingDownIcon fontSize="large" />,
        gradient: theme.palette.gradients.success,
        trendData: generateTrendData(nodeHealth.mae?.history),
        color: "#10B981",
      },
      {
        title: "MAPE",
        value: nodeHealth.mape ?? 0,
        best: nodeHealth.mape ?? 0,
        icon: <EqualizerIcon fontSize="large" />,
        gradient: theme.palette.gradients.warning,
        trendData: sampleTrend,
        color: "#FBBF24",
      },
      {
        title: "SMAPE",
        value: nodeHealth.smape ?? 0,
        best: nodeHealth.smape ?? 0,
        icon: <InsightsIcon fontSize="large" />,
        gradient: theme.palette.gradients.secondary,
        trendData: sampleTrend,
        color: "#8B5CF6",
      },
      {
        title: "Drift",
        value: nodeHealth.drift ?? 0,
        best: nodeHealth.drift ?? 0,
        icon: <TrendingUpIcon fontSize="large" />,
        gradient: theme.palette.gradients.info,
        trendData: sampleTrend,
        color: "#EC4899",
      },
      {
        title: "Volatility",
        value: nodeHealth.volatility ?? 0,
        best: nodeHealth.volatility ?? 0,
        icon: <SpeedIcon fontSize="large" />,
        gradient: theme.palette.gradients.error,
        trendData: sampleTrend,
        color: "#F97316",
      },
      {
        title: "Stability",
        value: nodeHealth.stability ?? 0,
        best: nodeHealth.stability ?? 0,
        icon: <SpeedIcon fontSize="large" />,
        gradient: theme.palette.gradients.success,
        trendData: sampleTrend,
        color: "#22C55E",
      },
      {
        title: "Accuracy",
        value: nodeHealth.accuracy ?? 0,
        best: nodeHealth.accuracy ?? 0,
        icon: <TrendingUpIcon fontSize="large" />,
        gradient: theme.palette.gradients.primary,
        trendData: sampleTrend,
        color: "#3B82F6",
      },
    ];
  }, [nodeHealth, theme.palette.gradients]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(260px, 1fr))" gap={3}>
      {metrics.map((metric, index) => (
        <Card
          key={index}
          sx={{
            background: metric.gradient,
            color: "#fff",
            borderRadius: 3,
            p: 2,
            boxShadow: "0 6px 25px rgba(0,0,0,0.4)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="h6">{metric.title}</Typography>
              {metric.icon}
            </Box>

            <Typography variant="h4" fontWeight="bold">
              {metric.value.toFixed(4)}
            </Typography>

            <Typography variant="body2" opacity={0.9}>
              Best: {metric.best.toFixed(4)}
            </Typography>

            <Box mt={2} height={60}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metric.trendData}>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.7)",
                      border: "none",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: 12,
                    }}
                    formatter={(value) => value.toFixed(4)}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={metric.color}
                    strokeWidth={2}
                    fill={`${metric.color}33`}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            <LinearProgress
              variant="determinate"
              value={Math.min((metric.best / (metric.value || 1)) * 100, 100)}
              sx={{
                mt: 2,
                height: 8,
                borderRadius: 5,
                background: "rgba(255,255,255,0.3)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#fff",
                },
              }}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
