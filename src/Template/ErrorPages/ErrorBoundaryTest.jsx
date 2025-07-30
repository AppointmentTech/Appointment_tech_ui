import React from 'react';
import { Button, Box } from '@mui/material';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary.jsx';

// Component that will throw an error
const ErrorThrower = () => {
  throw new Error('This is a test error for ErrorBoundary');
};

// Wrapper component for testing ErrorBoundary
const ErrorBoundaryTest = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  const handleTestError = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    return <ErrorThrower />;
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Button
        variant="outlined"
        color="error"
        onClick={handleTestError}
        sx={{ mt: 2 }}
      >
        Test Error Boundary
      </Button>
    </Box>
  );
};

// Wrapped version for demo
const ErrorBoundaryTestWrapper = () => (
  <ErrorBoundary>
    <ErrorBoundaryTest />
  </ErrorBoundary>
);

export default ErrorBoundaryTestWrapper; 