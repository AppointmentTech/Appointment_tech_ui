import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Chip,
  keyframes
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import BuildIcon from '@mui/icons-material/Build';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EngineeringIcon from '@mui/icons-material/Engineering';

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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ErrorMaintenance = ({ 
  estimatedTime = 30, // minutes
  maintenanceMessage = "We're performing scheduled maintenance to improve your experience.",
  showTimer = true 
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [timeLeft, setTimeLeft] = useState(estimatedTime * 60); // Convert to seconds
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!showTimer) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showTimer]);

  useEffect(() => {
    const initialTime = estimatedTime * 60;
    const remainingPercentage = (timeLeft / initialTime) * 100;
    setProgress(remainingPercentage);
  }, [timeLeft, estimatedTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCheckStatus = () => {
    // You can integrate with your status page or API
    window.open('https://status.yourcompany.com', '_blank');
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
          background: `linear-gradient(135deg, ${theme.palette.warning.main}05 0%, ${theme.palette.info.main}05 100%)`
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
              background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.info.main}, ${theme.palette.primary.main})`,
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
            {/* Animated Maintenance Icon */}
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.warning.main}20 0%, ${theme.palette.info.main}20 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                position: 'relative',
                animation: `${float} 3s ease-in-out infinite`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  right: -10,
                  bottom: -10,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.warning.main}10 0%, ${theme.palette.info.main}10 100%)`,
                  animation: `${pulse} 3s ease-in-out infinite`
                }
              }}
            >
              <BuildIcon 
                sx={{ 
                  fontSize: 80, 
                  color: theme.palette.warning.main,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                  animation: `${rotate} 8s linear infinite`
                }} 
              />
            </Box>

            {/* Animated Status Badge */}
            <Chip
              icon={<NotificationsIcon />}
              label="MAINTENANCE MODE"
              color="warning"
              variant="filled"
              sx={{ 
                fontWeight: 'bold',
                fontSize: '0.9rem',
                py: 1,
                animation: `${pulse} 2s ease-in-out infinite`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />

            {/* Animated Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 3,
                animation: `${fadeInUp} 0.8s ease-out 0.3s both`
              }}
            >
              Under Maintenance
            </Typography>

            {/* Animated Description */}
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
              {maintenanceMessage}
            </Typography>

            {/* Animated Timer Section */}
            {showTimer && (
              <Box sx={{ width: '100%', mb: 4, animation: `${fadeInUp} 0.8s ease-out 0.9s both` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <AccessTimeIcon 
                    sx={{ 
                      mr: 2, 
                      color: theme.palette.warning.main,
                      animation: `${rotate} 4s linear infinite`
                    }} 
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Estimated Time Remaining
                  </Typography>
                </Box>
                
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.warning.main,
                    mb: 2,
                    fontFamily: 'monospace',
                    animation: `${pulse} 2s ease-in-out infinite`,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                >
                  {formatTime(timeLeft)}
                </Typography>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: theme.palette.grey[200],
                      animation: `${slideIn} 1s ease-out`,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 6,
                        background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.info.main} 100%)`,
                        animation: `${pulse} 2s ease-in-out infinite`
                      }
                    }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {progress > 0 ? `${Math.round(progress)}% complete` : 'Maintenance complete!'}
                </Typography>
              </Box>
            )}

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
                    backgroundColor: theme.palette.warning.main,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    animation: `${fadeInUp} 0.8s ease-out 1.2s both`,
                    '&:hover': {
                      backgroundColor: theme.palette.warning.dark,
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
                    animation: `${fadeInUp} 0.8s ease-out 1.5s both`,
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
                  onClick={handleCheckStatus}
                  sx={{
                    borderRadius: 3,
                    px: 5,
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    animation: `${fadeInUp} 0.8s ease-out 1.8s both`,
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Check Status
                </Button>
              </Grid>
            </Grid>

            {/* Animated Maintenance Info */}
            <Box 
              sx={{ 
                mt: 4, 
                pt: 4, 
                borderTop: `2px solid ${theme.palette.divider}`,
                animation: `${fadeInUp} 0.8s ease-out 2.1s both`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <EngineeringIcon 
                  sx={{ 
                    mr: 2, 
                    color: theme.palette.info.main,
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
                  What's happening?
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
                    fontSize: '0.875rem',
                    animation: `${fadeInUp} 0.8s ease-out 2.4s both`
                  }}
                >
                  • System updates and improvements
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem',
                    animation: `${fadeInUp} 0.8s ease-out 2.5s both`
                  }}
                >
                  • Database optimization
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem',
                    animation: `${fadeInUp} 0.8s ease-out 2.6s both`
                  }}
                >
                  • Security enhancements
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem',
                    animation: `${fadeInUp} 0.8s ease-out 2.7s both`
                  }}
                >
                  • Performance improvements
                </Typography>
              </Box>
            </Box>

            {/* Animated Contact Info */}
            <Box 
              sx={{ 
                mt: 4, 
                p: 3, 
                bgcolor: theme.palette.background.paper, 
                borderRadius: 3,
                border: `2px solid ${theme.palette.divider}`,
                animation: `${fadeInUp} 0.8s ease-out 2.8s both`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Need immediate assistance? Contact support at{' '}
                <Typography
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.dark,
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={() => navigate('/ContactUs')}
                >
                  support@yourcompany.com
                </Typography>
              </Typography>
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
                background: `linear-gradient(135deg, ${theme.palette.warning.main}10, ${theme.palette.info.main}10)`,
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
                background: `linear-gradient(135deg, ${theme.palette.info.main}10, ${theme.palette.warning.main}10)`,
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

export default ErrorMaintenance; 