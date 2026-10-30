import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { MusicPlayerProvider } from './context/MusicPlayerContext.jsx';
import './index.css';

// Warna persis YouTube Music
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff0000' },
    background: {
      default: '#0f0f0f',
      paper: '#212121',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: '"YouTube Sans", "Roboto", Arial, sans-serif',
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#212121', borderRight: 'none' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', boxShadow: 'none' },
        contained: {
          backgroundColor: '#ff0000',
          '&:hover': { backgroundColor: '#cc0000', boxShadow: 'none' },
        },
      },
    },
    MuiSlider: {
      styleOverrides: { root: { color: '#ff0000' } },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', '&.Mui-selected': { color: '#ff0000' } },
      },
    },
    MuiTabs: {
      styleOverrides: { indicator: { backgroundColor: '#ff0000' } },
    },
  },
  shadows: Array(25).fill('none'),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MusicPlayerProvider>
        <App />
      </MusicPlayerProvider>
    </ThemeProvider>
  </BrowserRouter>
);
