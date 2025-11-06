import React from "react";
import { Box, AppBar, Toolbar, Typography, TextField, Select, MenuItem, Container, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

export default function LayoutShell({ query, onQuery, sortBy, onSortBy, runs, children }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" elevation={0} sx={{ backdropFilter: "blur(10px)" }}>
        <Toolbar sx={{ py: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, background: "linear-gradient(135deg, #818CF8 0%, #22D3EE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ✨ Aurora Dashboard
          </Typography>
          <Typography variant="caption" sx={{ mr: 3, color: "text.secondary", display: { xs: "none", sm: "block" } }}>
            {runs.length} runs tracked
          </Typography>
          <TextField
            size="small"
            placeholder="Search runs..."
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            sx={{ 
              mr: 2, 
              width: 250,
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              )
            }}
          />
          <Select
            size="small"
            value={sortBy}
            onChange={(e) => onSortBy(e.target.value)}
            sx={{ 
              minWidth: 140,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" }
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ ml: 1 }}>
                <SortIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              </InputAdornment>
            }
          >
            <MenuItem value="rmse">Sort by RMSE</MenuItem>
            <MenuItem value="r2">Sort by R²</MenuItem>
            <MenuItem value="mae">Sort by MAE</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
