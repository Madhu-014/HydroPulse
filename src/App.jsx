import React, { useEffect, useState, useMemo } from "react";
import { Box, Container, Fade, Zoom } from "@mui/material";
import LayoutShell from "./components/LayoutShell.jsx";
import MetricsSummary from "./components/MetricsSummary.jsx";
import RunsTable from "./components/RunsTable.jsx";
import ChartsPanel from "./components/ChartsPanel.jsx";
import CPUPredictionTable from "./components/CPUPredictionTable.jsx";
import { loadRuns } from "./components/utils.js";

export default function App() {
  const [runs, setRuns] = useState([]);
  const [sortBy, setSortBy] = useState("rmse");
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadRuns().then(data => {
      setRuns(data);
      setTimeout(() => setLoaded(true), 100);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const arr = runs.filter(r =>
      r.run_id.toLowerCase().includes(q) ||
      (r.comments || "").toLowerCase().includes(q) ||
      Object.entries(r.params).some(([k, v]) => (`${k}:${v}`).toLowerCase().includes(q))
    );
    return arr.sort((a, b) => {
      if (sortBy === "r2") return b.metrics.r2 - a.metrics.r2;
      return a.metrics[sortBy] - b.metrics[sortBy];
    });
  }, [runs, query, sortBy]);

  return (
    <LayoutShell
      query={query}
      onQuery={setQuery}
      sortBy={sortBy}
      onSortBy={setSortBy}
      runs={runs}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Decorative Background Elements */}
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <Box sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }} />
        </Box>

        {/* Content */}
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={loaded} timeout={800}>
            <Box sx={{ mb: 4 }}>
              <MetricsSummary runs={runs} />
            </Box>
          </Fade>

          <Zoom in={loaded} timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <CPUPredictionTable />
            </Box>
          </Zoom>

          <Fade in={loaded} timeout={1200}>
            <Box sx={{ mb: 4 }}>
              <ChartsPanel runs={filtered} />
            </Box>
          </Fade>

          <Fade in={loaded} timeout={1400}>
            <Box sx={{ mb: 4 }}>
              <RunsTable runs={filtered} />
            </Box>
          </Fade>
        </Container>
      </Box>
    </LayoutShell>
  );
}