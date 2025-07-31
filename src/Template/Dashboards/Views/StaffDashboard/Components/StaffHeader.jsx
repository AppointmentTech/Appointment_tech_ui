import React, { useState, useContext } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Collapse,
  Tooltip,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemButton,
  Card,
  CardContent,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Room as RoomIcon,
  Build as BuildIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Home as HotelIcon,
  LocalHospital as LocalHospitalIcon,
  FaceRetouchingNatural as BeautyIcon,
  Restaurant as FoodIcon,
  Garage as GarageIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ChevronLeft as CollapseIcon,
  ChevronRight as ExpandIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { sidebarData } from '../../../../../CommonComponents/SidebarData.js';
import { ThemeContext } from '../../../../../ContextOrRedux/ThemeProvider.js';
import { useSidebar } from 'Template/Dashboards/Views/StaffDashboard/Context/SidebarContext';

const StaffHeader = ({ navItems, section, setSection }) => {
  const theme = useTheme();
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed } = useSidebar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedServiceTypes, setExpandedServiceTypes] = useState({});
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'New Service Request',
      message: 'Room 101 cleaning service has been requested',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Maintenance Alert',
      message: 'AC in Room 103 needs attention',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Service Completed',
      message: 'Food delivery to Room 102 completed successfully',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'error',
      title: 'System Update',
      message: 'Scheduled maintenance in 30 minutes',
      time: '2 hours ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get service types from sidebar data
  const serviceTypes = sidebarData.sections.map(section => ({
    name: section.name,
    icon: section.icon,
    items: section.items
  }));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleServiceTypeToggle = (serviceName) => {
    setExpandedServiceTypes(prev => ({
      ...prev,
      [serviceName]: !prev[serviceName]
    }));
  };

  const handleServiceItemClick = (serviceType, item) => {
    // Map service items to dashboard sections
    const itemName = typeof item === 'string' ? item : item.name;
    const itemUrl = typeof item === 'string' ? null : item.url;
    
    // Set the current section based on the service item
    if (itemName.toLowerCase().includes('dashboard')) {
      setSection('dashboard');
    } else if (itemName.toLowerCase().includes('room')) {
      setSection('rooms');
    } else if (itemName.toLowerCase().includes('customer') || itemName.toLowerCase().includes('guest')) {
      setSection('guests');
    } else if (itemName.toLowerCase().includes('maintenance')) {
      setSection('maintenance');
    } else if (itemName.toLowerCase().includes('booking') || itemName.toLowerCase().includes('appointment')) {
      setSection('scheduler');
    } else if (itemName.toLowerCase().includes('report') || itemName.toLowerCase().includes('analytics')) {
      setSection('analytics');
    } else if (itemName.toLowerCase().includes('service')) {
      setSection('services');
    } else if (itemName.toLowerCase().includes('assigned')) {
      setSection('assigned');
    } else {
      // Default to dashboard for other items
      setSection('dashboard');
    }

    // Close mobile drawer if on mobile
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleThemeToggle = () => {
    themeMode.dispatch({ type: darkMode ? 'LIGHTMODE' : 'DARKMODE' });
  };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return <InfoIcon color="info" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getServiceTypeIcon = (serviceName) => {
    const iconMap = {
      'Hostels': <HotelIcon />,
      'Hospitals': <LocalHospitalIcon />,
      'Beauty & Tattoo': <BeautyIcon />,
      'Food Catering': <FoodIcon />,
      'Garages': <GarageIcon />
    };
    return iconMap[serviceName] || <AssignmentIcon />;
  };

  const getItemIcon = (itemName) => {
    const name = typeof itemName === 'string' ? itemName : itemName.name;
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('dashboard')) return <DashboardIcon />;
    if (lowerName.includes('room')) return <RoomIcon />;
    if (lowerName.includes('customer') || lowerName.includes('guest')) return <PeopleIcon />;
    if (lowerName.includes('maintenance')) return <BuildIcon />;
    if (lowerName.includes('booking') || lowerName.includes('appointment')) return <ScheduleIcon />;
    if (lowerName.includes('report') || lowerName.includes('analytics')) return <AnalyticsIcon />;
    if (lowerName.includes('service')) return <AssignmentIcon />;
    if (lowerName.includes('assigned')) return <AssignmentIcon />;
    if (lowerName.includes('profile') || lowerName.includes('person')) return <PersonIcon />;
    
    return <AssignmentIcon />;
  };

  const drawerWidth = sidebarCollapsed ? 80 : 280;

  const drawer = (
    <Box sx={{ 
      width: drawerWidth,
      height: '100vh',
      bgcolor: darkMode ? 'background.paper' : 'background.default',
      borderRight: 1,
      borderColor: darkMode ? 'divider' : 'grey.300',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Header - Fixed */}
      <Box sx={{ 
        p: sidebarCollapsed ? 2 : 3, 
        borderBottom: 1, 
        borderColor: darkMode ? 'divider' : 'grey.300',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        bgcolor: darkMode ? 'background.paper' : 'grey.50'
      }}>
        {!sidebarCollapsed && (
          <>
            <Box>
              <Typography variant="h6" fontWeight={700} color={darkMode ? 'primary.main' : 'primary.dark'}>
                Staff Dashboard
              </Typography>
              <Typography variant="body2" color={darkMode ? 'text.secondary' : 'text.primary'} sx={{ mt: 0.5 }}>
                Service Management
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setSidebarCollapsed(true)}
              sx={{ 
                color: darkMode ? 'text.secondary' : 'text.primary',
                '&:hover': {
                  bgcolor: darkMode ? 'action.hover' : 'grey.200'
                }
              }}
            >
              <CollapseIcon />
            </IconButton>
          </>
        )}
        {sidebarCollapsed && (
          <IconButton 
            size="small" 
            onClick={() => setSidebarCollapsed(false)}
            sx={{ 
              color: darkMode ? 'text.secondary' : 'text.primary',
              '&:hover': {
                bgcolor: darkMode ? 'action.hover' : 'grey.200'
              }
            }}
          >
            <ExpandIcon />
          </IconButton>
        )}
      </Box>

      {/* Service Types Section - Primary Navigation - Scrollable */}
      <Box sx={{ 
        p: sidebarCollapsed ? 1 : 2,
        flex: 1,
        overflow: 'auto',
        bgcolor: darkMode ? 'background.paper' : 'background.default',
        '&::-webkit-scrollbar': {
          width: '6px'
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: darkMode ? theme.palette.divider : theme.palette.grey[400],
          borderRadius: '3px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: darkMode ? theme.palette.text.secondary : theme.palette.grey[600]
        }
      }}>
        {!sidebarCollapsed && (
          <Typography variant="subtitle2" fontWeight={600} color={darkMode ? 'text.secondary' : 'text.primary'} sx={{ mb: 2 }}>
            SERVICE TYPES & NAVIGATION
          </Typography>
        )}
        <List dense>
          {serviceTypes.map((serviceType, index) => (
            <Box key={index}>
              <ListItemButton
                onClick={() => handleServiceTypeToggle(serviceType.name)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  minHeight: sidebarCollapsed ? 48 : 40,
                  color: darkMode ? 'text.primary' : 'text.primary',
                  '&:hover': {
                    bgcolor: darkMode ? 'action.hover' : 'grey.100'
                  },
                  '&:active': {
                    bgcolor: darkMode ? 'action.selected' : 'grey.200'
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: sidebarCollapsed ? 32 : 40,
                  color: darkMode ? 'text.primary' : 'text.primary'
                }}>
                  {getServiceTypeIcon(serviceType.name)}
                </ListItemIcon>
                {!sidebarCollapsed && (
                  <>
                    <ListItemText
                      primary={serviceType.name}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                        color: darkMode ? 'text.primary' : 'text.primary'
                      }}
                    />
                    <Chip
                      label={serviceType.items.length}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        borderColor: darkMode ? 'primary.main' : 'primary.main',
                        color: darkMode ? 'primary.main' : 'primary.main'
                      }}
                    />
                    <Box sx={{ color: darkMode ? 'text.primary' : 'text.primary' }}>
                      {expandedServiceTypes[serviceType.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Box>
                  </>
                )}
              </ListItemButton>
              
              {/* Service Categories - Navigation Items */}
              {!sidebarCollapsed && (
                <Collapse in={expandedServiceTypes[serviceType.name]} timeout="auto" unmountOnExit>
                  <List dense sx={{ pl: 2 }}>
                    {serviceType.items.map((item, itemIndex) => (
                      <ListItemButton
                        key={itemIndex}
                        onClick={() => handleServiceItemClick(serviceType.name, item)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          minHeight: 32,
                          color: darkMode ? 'text.secondary' : 'text.secondary',
                          '&:hover': {
                            bgcolor: darkMode ? 'action.hover' : 'grey.100'
                          },
                          '&:active': {
                            bgcolor: darkMode ? 'action.selected' : 'grey.200'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ 
                          minWidth: 24,
                          color: darkMode ? 'text.secondary' : 'text.secondary'
                        }}>
                          {getItemIcon(item)}
                        </ListItemIcon>
                        <ListItemText
                          primary={typeof item === 'string' ? item : item.name}
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: darkMode ? 'text.secondary' : 'text.secondary'
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: darkMode ? 'divider' : 'grey.300' }} />

      {/* Quick Actions - Fixed Bottom */}
      <Box sx={{ 
        p: sidebarCollapsed ? 1 : 2, 
        flexShrink: 0,
        bgcolor: darkMode ? 'background.paper' : 'grey.50'
      }}>
        {!sidebarCollapsed && (
          <Typography variant="subtitle2" fontWeight={600} color={darkMode ? 'text.secondary' : 'text.primary'} sx={{ mb: 2 }}>
            QUICK ACTIONS
          </Typography>
        )}
        <List dense>
          <ListItemButton 
            onClick={handleNotificationClick}
            sx={{ 
              borderRadius: 1, 
              mb: 0.5, 
              minHeight: sidebarCollapsed ? 48 : 40,
              color: darkMode ? 'text.primary' : 'text.primary',
              '&:hover': {
                bgcolor: darkMode ? 'action.hover' : 'grey.100'
              }
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: sidebarCollapsed ? 32 : 40,
              color: darkMode ? 'text.primary' : 'text.primary'
            }}>
              <NotificationsIcon />
            </ListItemIcon>
            {!sidebarCollapsed && (
              <>
                <ListItemText
                  primary="Notifications"
                  primaryTypographyProps={{ 
                    variant: 'body2', 
                    fontWeight: 500,
                    color: darkMode ? 'text.primary' : 'text.primary'
                  }}
                />
                <Badge badgeContent={unreadCount} color="error" size="small" />
              </>
            )}
          </ListItemButton>
          <ListItemButton sx={{ 
            borderRadius: 1, 
            mb: 0.5, 
            minHeight: sidebarCollapsed ? 48 : 40,
            color: darkMode ? 'text.primary' : 'text.primary',
            '&:hover': {
              bgcolor: darkMode ? 'action.hover' : 'grey.100'
            }
          }}>
            <ListItemIcon sx={{ 
              minWidth: sidebarCollapsed ? 32 : 40,
              color: darkMode ? 'text.primary' : 'text.primary'
            }}>
              <SettingsIcon />
            </ListItemIcon>
            {!sidebarCollapsed && (
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ 
                  variant: 'body2', 
                  fontWeight: 500,
                  color: darkMode ? 'text.primary' : 'text.primary'
                }}
              />
            )}
          </ListItemButton>
          <ListItemButton 
            onClick={() => setSection('profile')}
            sx={{ 
              borderRadius: 1, 
              mb: 0.5, 
              minHeight: sidebarCollapsed ? 48 : 40,
              color: darkMode ? 'text.primary' : 'text.primary',
              '&:hover': {
                bgcolor: darkMode ? 'action.hover' : 'grey.100'
              }
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: sidebarCollapsed ? 32 : 40,
              color: darkMode ? 'text.primary' : 'text.primary'
            }}>
              <PersonIcon />
            </ListItemIcon>
            {!sidebarCollapsed && (
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{ 
                  variant: 'body2', 
                  fontWeight: 500,
                  color: darkMode ? 'text.primary' : 'text.primary'
                }}
              />
            )}
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Top AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: darkMode ? 'background.paper' : 'background.paper',
          color: darkMode ? 'text.primary' : 'text.primary',
          boxShadow: darkMode ? 1 : '0 2px 8px rgba(0,0,0,0.1)',
          ml: { xs: 0, md: sidebarCollapsed ? '80px' : '280px' },
          width: { xs: '100%', md: `calc(100% - ${sidebarCollapsed ? 80 : 280}px)` },
          borderBottom: darkMode ? '1px solid' : '1px solid',
          borderColor: darkMode ? 'divider' : 'grey.300',
          backdropFilter: darkMode ? 'none' : 'blur(10px)',
          backgroundColor: darkMode ? 'background.paper' : 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ 
              mr: 2,
              color: darkMode ? 'text.primary' : 'text.primary',
              '&:hover': {
                bgcolor: darkMode ? 'action.hover' : 'grey.100'
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            color: darkMode ? 'text.primary' : 'text.primary',
            textShadow: darkMode ? 'none' : '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            {navItems.find(item => item.key === section)?.label || 'Staff Dashboard'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Theme Toggle */}
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                          <IconButton 
              color="inherit" 
              onClick={handleThemeToggle}
              sx={{
                color: darkMode ? 'text.primary' : 'text.primary',
                '&:hover': {
                  bgcolor: darkMode ? 'action.hover' : 'grey.100'
                },
                transition: 'all 0.2s ease',
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            <IconButton 
              color="inherit" 
              onClick={handleNotificationClick}
              sx={{
                color: darkMode ? 'text.primary' : 'text.primary',
                '&:hover': {
                  bgcolor: darkMode ? 'action.hover' : 'grey.100'
                },
                transition: 'all 0.2s ease',
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <Badge badgeContent={unreadCount} color="error" size="small" />
              <NotificationsIcon />
            </IconButton>
            
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ 
                ml: 1,
                color: darkMode ? 'text.primary' : 'text.primary',
                '&:hover': {
                  bgcolor: darkMode ? 'action.hover' : 'grey.100'
                },
                transition: 'all 0.2s ease',
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <Avatar sx={{ 
                width: 32, 
                height: 32,
                bgcolor: darkMode ? 'primary.main' : 'primary.main',
                boxShadow: darkMode ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 9999,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: 0,
            height: '100vh',
            borderRight: 1,
            borderColor: darkMode ? 'divider' : 'grey.300',
            bgcolor: darkMode ? 'background.paper' : 'background.default',
            overflow: 'hidden',
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 9999
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Notification Dialog */}
      <Dialog 
        open={notificationOpen} 
        onClose={handleNotificationClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: darkMode ? 'background.paper' : 'background.paper',
            color: darkMode ? 'text.primary' : 'text.primary',
            boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: darkMode ? 'divider' : 'grey.300',
          bgcolor: darkMode ? 'background.paper' : 'grey.50'
        }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight={700} color={darkMode ? 'text.primary' : 'text.primary'}>
              Notifications
            </Typography>
            <IconButton 
              onClick={handleNotificationClose}
              sx={{
                color: darkMode ? 'text.primary' : 'text.primary',
                '&:hover': {
                  bgcolor: darkMode ? 'action.hover' : 'grey.100'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ 
          bgcolor: darkMode ? 'background.paper' : 'background.paper',
          p: 0
        }}>
          <Box sx={{ maxHeight: 400, overflow: 'auto', p: 2 }}>
            {notifications.length === 0 ? (
              <Box textAlign="center" py={3}>
                <NotificationsIcon sx={{ 
                  fontSize: 48, 
                  color: darkMode ? 'text.secondary' : 'text.secondary', 
                  mb: 2 
                }} />
                <Typography variant="h6" color={darkMode ? 'text.secondary' : 'text.secondary'}>
                  No notifications
                </Typography>
                <Typography variant="body2" color={darkMode ? 'text.secondary' : 'text.secondary'}>
                  You're all caught up!
                </Typography>
              </Box>
            ) : (
              notifications.map((notification) => (
                <Card key={notification.id} sx={{ 
                  mb: 2, 
                  border: notification.read ? 'none' : `2px solid ${theme.palette.primary.main}`,
                  bgcolor: darkMode ? 'background.paper' : 'background.paper',
                  boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="flex-start" gap={2}>
                      <Box sx={{ mt: 0.5 }}>
                        {getNotificationIcon(notification.type)}
                      </Box>
                      <Box flex={1}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                          <Typography variant="subtitle1" fontWeight={600} color={darkMode ? 'text.primary' : 'text.primary'}>
                            {notification.title}
                          </Typography>
                          <Typography variant="caption" color={darkMode ? 'text.secondary' : 'text.secondary'}>
                            {notification.time}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color={darkMode ? 'text.secondary' : 'text.secondary'}>
                          {notification.message}
                        </Typography>
                        {!notification.read && (
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label="New" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                              sx={{
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: 1, 
          borderColor: darkMode ? 'divider' : 'grey.300',
          bgcolor: darkMode ? 'background.paper' : 'grey.50',
          p: 2
        }}>
          <Button 
            onClick={handleNotificationClose} 
            color="inherit"
            sx={{
              color: darkMode ? 'text.primary' : 'text.primary',
              '&:hover': {
                bgcolor: darkMode ? 'action.hover' : 'grey.100'
              }
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                bgcolor: theme.palette.primary.dark
              }
            }}
          >
            Mark All as Read
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            bgcolor: darkMode ? 'background.paper' : 'background.paper',
            color: darkMode ? 'text.primary' : 'text.primary',
            boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
            border: darkMode ? '1px solid' : '1px solid',
            borderColor: darkMode ? 'divider' : 'grey.300'
          }
        }}
      >
        <MenuItem 
          onClick={() => { setSection('profile'); handleProfileMenuClose(); }}
          sx={{
            '&:hover': {
              bgcolor: darkMode ? 'action.hover' : 'grey.100'
            }
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem 
          onClick={handleProfileMenuClose}
          sx={{
            '&:hover': {
              bgcolor: darkMode ? 'action.hover' : 'grey.100'
            }
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider sx={{ borderColor: darkMode ? 'divider' : 'grey.300' }} />
        <MenuItem 
          onClick={handleProfileMenuClose}
          sx={{
            '&:hover': {
              bgcolor: darkMode ? 'action.hover' : 'grey.100'
            }
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Toolbar spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default StaffHeader; 