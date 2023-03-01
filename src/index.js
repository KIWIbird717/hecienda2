import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/global.css"
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from './store/reduxStore'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#80AB54',
      darker: '#fff',
    },
    secondary: {
      main: '#DB6C79',
      contrastText: '#fff'
    },
    neutral: {
      main: 'rgb(226, 230, 233)',
      contrastText: '#fff',
    },
    dop: {
      main: '#fff'
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

