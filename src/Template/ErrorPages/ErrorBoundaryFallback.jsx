import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Grid,
  useTheme,
  Alert,
  Collapse,
  IconButton,
  keyframes
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import BugReportIcon from '@mui/icons-material/BugReport';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ErrorIcon from '@mui/icons-material/Error';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Safe navigation function that works without Router context
const safeNavigate = (path) => {
  try {
    // Try to use React Router if available
    const { useNavigate } = require('react-router-dom');
    const navigate = useNavigate();
    navigate(path);
  } catch (error) {
    // Fallback to window.location if Router is not available
    if (path === '/') {
      window.location.href = '/';
    } else if (path === -1) {
      window.history.back();
    } else {
      window.location.href = path;
    }
  }
};

const ErrorBoundaryFallback = ({ error, errorInfo, onReset }) => {
  const theme = useTheme();
  const [showDetails, setShowDetails] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoHome = () => {
    safeNavigate('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          background: `linear-gradient(135deg, ${theme.palette.error.main}05 0%, ${theme.palette.warning.main}05 100%)`
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            textAlign: 'center',
            maxWidth: 800,
            width: '100%',
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            border: `2px solid ${theme.palette.divider}`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.warning.main}, ${theme.palette.info.main})`,
              animation: `${pulse} 2s ease-in-out infinite`
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? `${fadeInUp} 0.8s ease-out` : 'none'
            }}
          >
            {/* Animated Error Icon */}
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.error.main}20 0%, ${theme.palette.warning.main}20 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                position: 'relative',
                animation: `${shake} 2s ease-in-out infinite`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  right: -10,
                  bottom: -10,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.error.main}10 0%, ${theme.palette.warning.main}10 100%)`,
                  animation: `${pulse} 3s ease-in-out infinite`
                }
              }}
            >
              <ErrorIcon 
                sx={{ 
                  fontSize: 80, 
                  color: theme.palette.error.main,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }} 
              />
            </Box>

            {/* Animated Error Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 3,
                animation: `${fadeInUp} 0.8s ease-out 0.3s both`
              }}
            >
              Something went wrong
            </Typography>

            {/* Animated Error Description */}
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                mb: 5,
                maxWidth: 500,
                lineHeight: 1.6,
                animation: `${fadeInUp} 0.8s ease-out 0.6s both`
              }}
            >
              An unexpected error occurred. Our team has been notified and we're working to fix the issue. 
              You can try refreshing the page or navigate to a different section.
            </Typography>

            {/* Animated Action Buttons */}
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RefreshIcon />}
                  onClick={handleReset}
                  sx={{
                    borderRadius: 3,
                    px: 5,
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    animation: `${fadeInUp} 0.8s ease-out 0.9s both`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Try Again
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                  sx={{
                    borderRadius: 3,
                    px: 5,
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    transition: 'all 0.3s ease',
                    animation: `${fadeInUp} 0.8s ease-out 1.2s both`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderWidth: 2
                    }
                  }}
                >
                  Go to Home
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  size="large"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  sx={{
                    borderRadius: 3,
                    px: 5,
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    animation: `${fadeInUp} 0.8s ease-out 1.5s both`,
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Refresh Page
                </Button>
              </Grid>
            </Grid>

            {/* Animated Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && error && (
              <Box sx={{ mt: 4, width: '100%', animation: `${fadeInUp} 0.8s ease-out 1.8s both` }}>
                <Button
                  variant="text"
                  onClick={() => setShowDetails(!showDetails)}
                  endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{
                    textTransform: 'none',
                    color: theme.palette.text.secondary,
                    mb: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  {showDetails ? 'Hide' : 'Show'} Error Details
                </Button>
                
                <Collapse in={showDetails}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      textAlign: 'left',
                      mb: 2,
                      animation: `${fadeInUp} 0.5s ease-out`
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Error Message:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      component="pre"
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        fontSize: '0.75rem',
                        fontFamily: 'monospace'
                      }}
                    >
                      {error.toString()}
                    </Typography>
                  </Alert>
                  
                  {errorInfo && (
                    <Alert 
                      severity="info" 
                      sx={{ 
                        textAlign: 'left',
                        animation: `${fadeInUp} 0.5s ease-out 0.2s both`
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Component Stack:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        component="pre"
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace'
                        }}
                      >
                        {errorInfo.componentStack}
                      </Typography>
                    </Alert>
                  )}
                </Collapse>
              </Box>
            )}

            {/* Animated Quick Links */}
            <Box 
              sx={{ 
                mt: 4, 
                pt: 4, 
                borderTop: `2px solid ${theme.palette.divider}`,
                animation: `${fadeInUp} 0.8s ease-out 2.1s both`
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 3,
                  fontWeight: 600
                }}
              >
                Quick Navigation
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center'
                }}
              >
                {['About', 'ContactUs', 'SignIn'].map((page, index) => (
                  <Button
                    key={page}
                    variant="text"
                    size="large"
                    onClick={() => safeNavigate(`/${page}`)}
                    sx={{
                      textTransform: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      animation: `${fadeInUp} 0.8s ease-out ${2.4 + index * 0.1}s both`,
                      '&:hover': {
                        background: theme.palette.primary.main + '10',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.error.main}10, ${theme.palette.warning.main}10)`,
                animation: `${pulse} 4s ease-in-out infinite`,
                zIndex: -1
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.warning.main}10, ${theme.palette.error.main}10)`,
                animation: `${pulse} 4s ease-in-out infinite 2s`,
                zIndex: -1
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorBoundaryFallback; 