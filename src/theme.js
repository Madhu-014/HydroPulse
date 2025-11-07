import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { 
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5"
    },
    secondary: { 
      main: "#EC4899",
      light: "#F472B6",
      dark: "#DB2777"
    },
    success: { main: "#10B981" },
    warning: { main: "#F59E0B" },
    error: { main: "#EF4444" },
    info: { main: "#06B6D4" },
    background: {
      default: "#0A0E27",
      paper: "#131830"
    }
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em'
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em'
    },
    h6: {
      fontWeight: 700
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(145deg, rgba(19, 24, 48, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(99, 102, 241, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, rgba(19, 24, 48, 0.98) 0%, rgba(10, 14, 39, 0.98) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          fontWeight: 600
        },
        contained: {
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.6)'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderBottom: '2px solid rgba(99, 102, 241, 0.3)'
        }
      }
    }
  }
});
export default theme;