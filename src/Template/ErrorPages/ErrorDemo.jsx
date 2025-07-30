import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Grid,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Error404 from './Error404.jsx';
import Error403 from './Error403.jsx';
import Error500 from './Error500.jsx';
import ErrorMaintenance from './ErrorMaintenance.jsx';
import ErrorBoundaryTestWrapper from './ErrorBoundaryTest.jsx';

const ErrorDemo = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleTestError = (errorType) => {
    navigate(`/error/${errorType}`);
  };

  // Removed the old error boundary test code

  const handleTestMaintenance = () => {
    navigate('/error/maintenance');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Error Pages Demo
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Test Error Pages
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => handleTestError('404')}
                sx={{ py: 2 }}
              >
                Test 404 Error
              </Button>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => handleTestError('403')}
                sx={{ py: 2 }}
              >
                Test 403 Error
              </Button>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => handleTestError('500')}
                sx={{ py: 2 }}
              >
                Test 500 Error
              </Button>
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleTestMaintenance}
                sx={{ py: 2 }}
              >
                Test Maintenance
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <ErrorBoundaryTestWrapper />
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Error Page Features
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Design Features
              </Typography>
              <ul>
                <li>Material-UI components</li>
                <li>Responsive layout</li>
                <li>Theme-aware styling</li>
                <li>Gradient backgrounds</li>
                <li>Professional typography</li>
              </ul>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🧭 Navigation Features
              </Typography>
              <ul>
                <li>Multiple navigation options</li>
                <li>Context-aware buttons</li>
                <li>Quick links section</li>
                <li>Breadcrumb-style navigation</li>
                <li>Smart error recovery</li>
              </ul>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔧 Developer Features
              </Typography>
              <ul>
                <li>Development error details</li>
                <li>Comprehensive error logging</li>
                <li>Easy customization</li>
                <li>TypeScript-ready structure</li>
                <li>Error boundary integration</li>
              </ul>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ♿ Accessibility Features
              </Typography>
              <ul>
                <li>Proper heading structure</li>
                <li>ARIA attributes</li>
                <li>Keyboard navigation</li>
                <li>Screen reader support</li>
                <li>High contrast support</li>
              </ul>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Back to Home
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorDemo; 