import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from "@mui/material";

export default function RunsTable({ runs, onSelect, selectedId }) {
  return (
    <Paper elevation={3}>
      <Typography variant="subtitle1" fontWeight={600} sx={{ p: 2 }}>
        Runs Overview ({runs.length})
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Run ID</TableCell>
              <TableCell align="right">RMSE</TableCell>
              <TableCell align="right">R2</TableCell>
              <TableCell align="right">MAE</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {runs.map((run) => (
              <TableRow
                key={run.run_id}
                onClick={() => onSelect(run)}
                selected={selectedId === run.run_id}
                hover
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Chip label={run.run_id} size="small" color="primary" variant="outlined" />
                </TableCell>
                <TableCell align="right">{run.metrics.rmse.toFixed(3)}</TableCell>
                <TableCell align="right">{run.metrics.r2.toFixed(3)}</TableCell>
                <TableCell align="right">{run.metrics.mae.toFixed(3)}</TableCell>
                <TableCell>{run.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
