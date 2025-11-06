# Aurora Material Dashboard (Variant 2)

This is a fully independent React + Vite + Material UI + Recharts dashboard for ML experiment visualization.

## Features
- Summary metrics (best RMSE, best R2, total runs)
- Interactive table
- Multiple charts (line, bar, scatter)
- Run detail drawer with images
- Self-contained: ships with its own `public/results.json`

## Scripts
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Data
Edit `public/results.json` to add/remove runs. Each run format:
```json
{
  "run_id": "id_string",
  "params": { "n_estimators": 100, "max_depth": 10 },
  "metrics": { "rmse": 0.02, "mae": 0.007, "r2": 0.84 },
  "git_commit": "abcdef1",
  "comments": "Optional comment",
  "plots": {
    "residuals": "plots/<run_id>_residuals.png",
    "feature_importance": "plots/<run_id>_feature_importance.png"
  }
}
```

## Folder Layout
```
variant2-aurora/
  package.json
  vite.config.js
  index.html
  public/
    results.json
    plots/
  src/
    main.jsx
    App.jsx
    theme.js
    components/
      MetricsSummary.jsx
      RunsTable.jsx
      ChartsPanel.jsx
      DetailsDrawer.jsx
      LayoutShell.jsx
      utils.js
    styles/
      global.css
```

## Customization
- Change gradient in `LayoutShell.jsx`
- Adjust theme in `theme.js`
- Add more charts in `ChartsPanel.jsx`

## Deployment
Build and deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages).