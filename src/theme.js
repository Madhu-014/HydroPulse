// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#3ABFF8",      // bright water blue
      light: "#7DD3FC",
      dark: "#0284C7",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#34D399",      // green accent
      light: "#6EE7B7",
      dark: "#059669",
      contrastText: "#ffffff",
    },

    accent: {
      main: "#A78BFA",      // subtle purple for accents
      light: "#C4B5FD",
      dark: "#7C3AED",
    },

    background: {
      default: "#081226",   // dark bluish marine background
      paper: "#0F1B33",     // cards slightly lighter
    },

    gradients: {
      primary:
        "linear-gradient(135deg, #3ABFF8 0%, #34D399 40%, #A78BFA 100%)",
      blue:
        "linear-gradient(135deg, #0EA5E9 0%, #3ABFF8 60%, #1D4ED8 100%)",
      green:
        "linear-gradient(135deg, #34D399 0%, #059669 100%)",
      purple:
        "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    h6: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h4: { fontWeight: 800 },
  },

  shape: {
    borderRadius: 16,
  },
});

export default theme;
