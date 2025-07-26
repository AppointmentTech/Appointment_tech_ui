import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ModeProvider } from './ContextOrRedux/ThemeProvider.js';
import ErrorBoundary from './CommonComponents/ErrorBoundary.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ModeProvider>
        <App />
      </ModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Register service worker for caching and offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring with error handling
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      try {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      } catch (error) {
        console.warn('Web Vitals error:', error);
      }
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });
  }
};

// Report web vitals in development
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
}
