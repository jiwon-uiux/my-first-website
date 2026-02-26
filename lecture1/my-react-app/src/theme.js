import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87CEEB',
      dark: '#5BA4C8',
      contrastText: '#1A2B4A',
    },
    secondary: {
      main: '#B2EBF2',
      contrastText: '#1A2B4A',
    },
    text: {
      primary: '#1A2B4A',
      secondary: '#4A6580',
    },
    background: {
      default: '#F0F8FF',
      paper: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      letterSpacing: '0.3em',
      fontWeight: 700,
    },
    h2: {
      letterSpacing: '0.1em',
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 300,
      letterSpacing: '0.15em',
    },
  },
  spacing: 8,
});

export default theme;
