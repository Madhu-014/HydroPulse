import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Select,
  MenuItem,
  Container,
  InputAdornment,
  useTheme
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

export default function LayoutShell({ query, onQuery, sortBy, onSortBy, runs, children }) {
  const theme = useTheme();

  const hydro = {
    blue: "#3ABEF9",
    teal: "#14B8A6",
    purple: "#8B5CF6",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        backgroundImage: `
          radial-gradient(circle at 15% 20%, ${hydro.blue}22, transparent 45%),
          radial-gradient(circle at 85% 80%, ${hydro.teal}22, transparent 45%),
          radial-gradient(circle at 50% 50%, ${hydro.purple}15, transparent 60%)
        `,
        backgroundSize: "cover",
      }}
    >
      {/* ---------------- NAVBAR ---------------- */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: `1px solid rgba(58,190,249,0.25)`,
          backdropFilter: "blur(18px) saturate(200%)",
          background: "rgba(10, 15, 28, 0.75)",
          boxShadow: `0 0 20px ${hydro.blue}20`,
        }}
      >
        <Toolbar sx={{ py: 1.2 }}>

          {/* APP TITLE */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              background: `linear-gradient(to right, ${hydro.blue}, ${hydro.teal}, ${hydro.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.03em",
            }}
          >
            ⚡ HydroPulse — CPU Predictor
          </Typography>

          {/* RUN COUNT */}
          <Typography
            variant="caption"
            sx={{
              mr: 3,
              opacity: 0.9,
              color: hydro.blue,
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
            }}
          >
            {runs.length} runs tracked
          </Typography>

          {/* SEARCH FIELD */}
          <TextField
            size="small"
            placeholder="Search runs…"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            sx={{
              mr: 2,
              width: { xs: 160, sm: 220, md: 260 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(58,190,249,0.15)",
                transition: "0.25s ease",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  boxShadow: `0 0 12px ${hydro.purple}55`,
                  borderColor: hydro.purple,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: hydro.blue, fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* SORT SELECT */}
          <Select
            size="small"
            value={sortBy}
            onChange={(e) => onSortBy(e.target.value)}
            sx={{
              minWidth: 150,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(20,184,166,0.25)",
              transition: "0.25s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
                boxShadow: `0 0 12px ${hydro.teal}55`,
                borderColor: hydro.teal,
              },
              "& .MuiSelect-select": {
                pl: 5,
                py: 1,
                color: hydro.blue,
              },
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ ml: 1 }}>
                <SortIcon sx={{ fontSize: 18, color: hydro.teal }} />
              </InputAdornment>
            }
          >
            <MenuItem value="rmse">Sort by RMSE</MenuItem>
            <MenuItem value="r2">Sort by R² Score</MenuItem>
            <MenuItem value="mae">Sort by MAE</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            animation: "fadeIn 0.6s ease",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
