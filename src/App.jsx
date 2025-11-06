import React, { useEffect, useState, useMemo } from "react";
import LayoutShell from "./components/LayoutShell.jsx";
import MetricsSummary from "./components/MetricsSummary.jsx";
import RunsTable from "./components/RunsTable.jsx";
import ChartsPanel from "./components/ChartsPanel.jsx";
import DetailsDrawer from "./components/DetailsDrawer.jsx";
import { loadRuns } from "./components/utils.js";

export default function App() {
  const [runs, setRuns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("rmse"); // rmse | r2 | mae
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadRuns().then(data => {
      setRuns(data);
      setSelected(data[0] || null);
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
      <MetricsSummary runs={runs} />
      <ChartsPanel runs={filtered} />
      <RunsTable
        runs={filtered}
        onSelect={setSelected}
        selectedId={selected?.run_id}
      />
      <DetailsDrawer run={selected} onClose={() => setSelected(null)} />
    </LayoutShell>
  );
}