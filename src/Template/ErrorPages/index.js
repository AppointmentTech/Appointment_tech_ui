// Error Pages Index
// Export all error page components for easy importing

export { default as Error404 } from './Error404.jsx';
export { default as Error403 } from './Error403.jsx';
export { default as Error500 } from './Error500.jsx';
export { default as ErrorMaintenance } from './ErrorMaintenance.jsx';
export { default as ErrorBoundaryFallback } from './ErrorBoundaryFallback.jsx';
export { default as ErrorBoundaryTestWrapper } from './ErrorBoundaryTest.jsx';
export { default as ErrorDemo } from './ErrorDemo.jsx';

// Error page types for reference
export const ERROR_TYPES = {
  NOT_FOUND: '404',
  FORBIDDEN: '403',
  SERVER_ERROR: '500',
  MAINTENANCE: 'maintenance',
  RUNTIME_ERROR: 'runtime'
};

// Error page configurations
export const ERROR_CONFIG = {
  404: {
    title: 'Page Not Found',
    description: 'The page you\'re looking for doesn\'t exist or has been moved.',
    icon: 'SearchIcon',
    color: 'error'
  },
  403: {
    title: 'Access Forbidden',
    description: 'You don\'t have permission to access this page.',
    icon: 'LockIcon',
    color: 'warning'
  },
  500: {
    title: 'Internal Server Error',
    description: 'Something went wrong on our end. We\'re working to fix the issue.',
    icon: 'ReportProblemIcon',
    color: 'error'
  },
  maintenance: {
    title: 'Under Maintenance',
    description: 'We\'re performing scheduled maintenance to improve your experience.',
    icon: 'BuildIcon',
    color: 'warning'
  },
  runtime: {
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Our team has been notified.',
    icon: 'BugReportIcon',
    color: 'error'
  }
}; 