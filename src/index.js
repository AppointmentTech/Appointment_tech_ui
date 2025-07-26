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

// Register service worker for caching and offline support (disabled in development)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
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
