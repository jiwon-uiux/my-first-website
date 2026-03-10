import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B8C6DB',
    },
    secondary: {
      main: '#27496D',
    },
    background: {
      default: '#0C1E35',
      paper: '#142850',
    },
    text: {
      primary: '#F7F7F7',
      secondary: '#B8C6DB',
    },
    moonscreen: {
      navy: '#0C1E35',
      blue: '#142850',
      card: '#27496D',
      softBlue: '#B8C6DB',
      white: '#F7F7F7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
      color: '#F7F7F7',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#F7F7F7',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#F7F7F7',
    },
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#142850',
          border: '1px solid #27496D',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#27496D',
          color: '#B8C6DB',
        },
      },
    },
  },
});

export default theme;
