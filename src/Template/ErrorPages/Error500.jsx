import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  keyframes
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import WarningIcon from '@mui/icons-material/Warning';

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

const wobble = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-6px) rotate(-5deg);
  }
  30% {
    transform: translateX(5px) rotate(3deg);
  }
  45% {
    transform: translateX(-5px) rotate(-3deg);
  }
  60% {
    transform: translateX(4px) rotate(2deg);
  }
  75% {
    transform: translateX(-4px) rotate(-1deg);
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Error500 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleContactSupport = () => {
    navigate('/ContactUs');
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
                animation: `${wobble} 3s ease-in-out infinite`,
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
              <ReportProblemIcon 
                sx={{ 
                  fontSize: 80, 
                  color: theme.palette.error.main,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }} 
              />
            </Box>

            {/* Animated Error Code */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '5rem', md: '8rem' },
                fontWeight: 'bold',
                background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.warning.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                mb: 2,
                animation: `${wobble} 3s ease-in-out infinite 0.5s`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }}
            >
              500
            </Typography>

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
              Internal Server Error
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
              Oops! Something went wrong on our end. Our team has been notified and we're working to fix the issue. 
              Please try refreshing the page or contact support if the problem persists.
            </Typography>

            {/* Animated Action Buttons */}
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item>
                <Button
                  variant="contained"
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
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    animation: `${fadeInUp} 0.8s ease-out 0.9s both`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Refresh Page
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
                  startIcon={<ContactSupportIcon />}
                  onClick={handleContactSupport}
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
                  Contact Support
                </Button>
              </Grid>
            </Grid>

            {/* Animated Troubleshooting Info */}
            <Box 
              sx={{ 
                mt: 4, 
                pt: 4, 
                borderTop: `2px solid ${theme.palette.divider}`,
                animation: `${fadeInUp} 0.8s ease-out 1.8s both`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <WarningIcon 
                  sx={{ 
                    mr: 2, 
                    color: theme.palette.warning.main,
                    animation: `${float} 3s ease-in-out infinite`
                  }} 
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600
                  }}
                >
                  Troubleshooting Tips
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'center',
                  maxWidth: 400
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}
                >
                  • Check your internet connection
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}
                >
                  • Clear your browser cache
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}
                >
                  • Try again in a few minutes
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}
                >
                  • Contact our support team
                </Typography>
              </Box>
            </Box>

            {/* Animated Status Info */}
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
                System Status
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center'
                }}
              >
                {['Status Page', 'Support', 'Documentation'].map((item, index) => (
                  <Button
                    key={item}
                    variant="text"
                    size="large"
                    onClick={() => {
                      if (item === 'Support') navigate('/ContactUs');
                      else if (item === 'Status Page') window.open('https://status.yourcompany.com', '_blank');
                      else window.open('https://docs.yourcompany.com', '_blank');
                    }}
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
                    {item}
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

export default Error500; 