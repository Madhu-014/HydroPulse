import React from "react";
import { Drawer, Box, Typography, IconButton, Divider, Chip, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";
import CommentIcon from "@mui/icons-material/Comment";

export default function DetailsDrawer({ run, onClose }) {
  if (!run) return null;

  return (
    <Drawer 
      anchor="right" 
      open={!!run} 
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          bgcolor: "background.default",
          backgroundImage: "none"
        }
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ 
          p: 3, 
          background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={700}>Run Details</Typography>
            <IconButton 
              onClick={onClose} 
              size="small"
              sx={{ 
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Chip 
            label={run.run_id} 
            size="small" 
            sx={{ 
              mt: 2, 
              fontWeight: 600,
              bgcolor: "rgba(129,140,248,0.2)",
              color: "primary.light"
            }} 
          />
        </Box>

        <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <TimelineIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight={700}>Metrics</Typography>
          </Box>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.3)" }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>RMSE</Typography>
              <Typography variant="h4" fontWeight={700} color="primary.main">{run.metrics.rmse.toFixed(3)}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 2, bgcolor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)" }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>R² Score</Typography>
              <Typography variant="h4" fontWeight={700} color="success.main">{run.metrics.r2.toFixed(3)}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 2, bgcolor: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>MAE</Typography>
              <Typography variant="h4" fontWeight={700} color="warning.main">{run.metrics.mae.toFixed(3)}</Typography>
            </Paper>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <SettingsIcon sx={{ color: "secondary.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight={700}>Parameters</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
            {Object.entries(run.params).map(([key, value]) => (
              <Chip 
                key={key} 
                label={`${key}: ${value}`}
                size="medium"
                sx={{ 
                  bgcolor: "rgba(34,211,238,0.15)",
                  color: "secondary.light",
                  fontWeight: 600,
                  border: "1px solid rgba(34,211,238,0.3)"
                }}
              />
            ))}
          </Box>

          {run.comments && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <CommentIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={700}>Comments</Typography>
              </Box>
              <Paper elevation={1} sx={{ p: 2, bgcolor: "rgba(255,255,255,0.02)" }}>
                <Typography variant="body2" color="text.secondary">{run.comments}</Typography>
              </Paper>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
