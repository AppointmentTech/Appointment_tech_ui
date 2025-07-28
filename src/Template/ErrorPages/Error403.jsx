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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import SecurityIcon from '@mui/icons-material/Security';

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

const Error403 = () => {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSignIn = () => {
    navigate('/SignIn');
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
          background: `linear-gradient(135deg, ${theme.palette.warning.main}05 0%, ${theme.palette.error.main}05 100%)`
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
              background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.error.main}, ${theme.palette.info.main})`,
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
            {/* Animated Security Icon */}
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.warning.main}20 0%, ${theme.palette.error.main}20 100%)`,
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
                  background: `linear-gradient(135deg, ${theme.palette.warning.main}10 0%, ${theme.palette.error.main}10 100%)`,
                  animation: `${pulse} 3s ease-in-out infinite`
                }
              }}
            >
              <LockIcon 
                sx={{ 
                  fontSize: 80, 
                  color: theme.palette.warning.main,
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
                background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                mb: 2,
                animation: `${shake} 2s ease-in-out infinite 0.5s`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }}
            >
              403
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
              Access Forbidden
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
              Sorry! You don't have permission to access this area. 
              Please sign in with appropriate credentials or contact your administrator.
            </Typography>

            {/* Animated Action Buttons */}
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<LoginIcon />}
                  onClick={handleSignIn}
                  sx={{
                    borderRadius: 3,
                    px: 5,
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    backgroundColor: theme.palette.warning.main,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    animation: `${fadeInUp} 0.8s ease-out 0.9s both`,
                    '&:hover': {
                      backgroundColor: theme.palette.warning.dark,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Sign In
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
                  startIcon={<ArrowBackIcon />}
                  onClick={handleGoBack}
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
                  Go Back
                </Button>
              </Grid>
            </Grid>

            {/* Animated Security Info */}
            <Box 
              sx={{ 
                mt: 4, 
                pt: 4, 
                borderTop: `2px solid ${theme.palette.divider}`,
                animation: `${fadeInUp} 0.8s ease-out 1.8s both`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <SecurityIcon 
                  sx={{ 
                    mr: 2, 
                    color: theme.palette.warning.main,
                    animation: `${rotate} 4s linear infinite`
                  }} 
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600
                  }}
                >
                  Security Notice
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
                  • Verify your login credentials
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}
                >
                  • Check your account permissions
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}
                >
                  • Contact system administrator
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}
                >
                  • Ensure proper authentication
                </Typography>
              </Box>
            </Box>

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
                Need Help?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center'
                }}
              >
                {['About', 'ContactUs', 'SignUp'].map((page, index) => (
                  <Button
                    key={page}
                    variant="text"
                    size="large"
                    onClick={() => navigate(`/${page}`)}
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
                background: `linear-gradient(135deg, ${theme.palette.warning.main}10, ${theme.palette.error.main}10)`,
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
                background: `linear-gradient(135deg, ${theme.palette.error.main}10, ${theme.palette.warning.main}10)`,
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

export default Error403; 