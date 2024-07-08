import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary:{
      main: '#d4af37',
      dark: '#a28834',
      light: '#e8b923'
    },
    // black
    secondary:{
      main: '#231F1D',
    },
    // white
    info:{
      main: '#F3F3F3'
    } 
  },
  
  typography: {
    fontFamily: [
      'Cardo', 
      'serif'
    ].join(','),
    
    h1: {
      fontFamily: [
        'Cardo',
        'serif'
      ].join(','),
      fontSize: '60px'
    },
    h1b: {
      fontFamily: [
        'Cardo',
        'serif'
      ].join(','),
      fontSize: '60px',
      fontWeight: 'bold'
    },

    h2: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '50px'
    },
    h2b: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '50px',
      fontWeight: 'bold'
    },

    h3: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '40px',
    },
    h3b: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '40px',
      fontWeight: 'bold'
    },

    h4: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '25px',
    },
    h4b: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '25px',
      fontWeight: 'bold'
    },
    h4b: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '25px',
      fontStyle: 'italic'
    },

    h5: {
      fontFamily: [
        'Zilla Slab',
        'serif'
      ].join(','),
      fontSize: '20px',
    },

    button: {
      fontFamily: [
        'Cardo',
        'serif'
      ].join(','),
      fontSize: '16px',
      fontWeight: 'bold'
    },

    letter: {
      fontFamily: [
        'Castellar',
        'serif'
      ].join(','),
      fontSize: '100px',
      fontWeight: 'regular'
    },

    test: {
      fontFamily: [
        'Cardo',
        'serif'
      ].join(','),
      fontSize: '120px',
      fontWeight: 'bold'
    },
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <App /> 
    </ThemeProvider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
