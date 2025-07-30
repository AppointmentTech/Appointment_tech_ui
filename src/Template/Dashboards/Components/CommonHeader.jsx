import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "ContextOrRedux/ThemeProvider.js";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Badge from "@mui/material/Badge";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShareIcon from "@mui/icons-material/Share";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useMediaQuery } from "@mui/material";
import { authPostRecord } from "services/services";
import SnackBar from "SnackBar/SnackBar.jsx";
import { AuthContext } from "ContextOrRedux/AuthContext";
import { sidebarData as adminSidebarData, moduleData, additionalMenuItems as adminAdditionalMenuItems } from "CommonComponents/SidebarData.js";
import { useEnhancedNavigation } from "CommonMethods/NavigationUtils.js";
import MailIcon from "@mui/icons-material/Mail";
import Popover from "@mui/material/Popover";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const API_Logout = "api/v1/authrouter/logout";
const drawerWidth = 300;
const collapsedDrawerWidth = 80;

// Styled components for better design
const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, collapsed }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && !collapsed && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(open && collapsed && {
    marginLeft: collapsedDrawerWidth,
    width: `calc(100% - ${collapsedDrawerWidth}px)`,
  }),
}));

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, collapsed }) => ({
    width: collapsed ? collapsedDrawerWidth : drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && !collapsed && {
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    }),
    ...(open && collapsed && {
      '& .MuiDrawer-paper': {
        width: collapsedDrawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    }),
    ...(!open && {
      '& .MuiDrawer-paper': {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        overflowX: 'hidden',
      },
    }),
  })
);

export default function CommonHeader({ role: propRole }) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const theme = useTheme();
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  
  // State management
  const [open, setOpen] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState({});
  const [selectedModules, setSelectedModules] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({
    color: "success",
    message: "Hi",
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Enhanced navigation hook
  const { 
    navigateToBusiness, 
    navigateToBusinessModule, 
    navigateToAdmin, 
    navigateToStaff,
    navigateToDefaultPage,
    getCurrentRouteMetadata,
    isRouteActive,
    getAccessibleRoutes,
    getUserPermissionSummary,
    canAccessCurrentPage,
    userType,
    userPermissions,
    user
  } = useEnhancedNavigation();

  // Popover state for messages and notifications
  const [msgAnchorEl, setMsgAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const openMsg = Boolean(msgAnchorEl);
  const openNotif = Boolean(notifAnchorEl);
  const handleMsgClick = (event) => setMsgAnchorEl(event.currentTarget);
  const handleNotifClick = (event) => setNotifAnchorEl(event.currentTarget);
  const handleMsgClose = () => setMsgAnchorEl(null);
  const handleNotifClose = () => setNotifAnchorEl(null);
  
  // Sample data (use state for removal)
  const [messages, setMessages] = useState([
    { id: 1, sender: "Support", text: "Welcome to AppointmentTech!", time: "2 min ago" },
    { id: 2, sender: "Admin", text: "Your profile was updated.", time: "10 min ago" },
    { id: 3, sender: "System", text: "Monthly report is ready.", time: "1 hr ago" },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "success", text: "New business registered: Food Catering Plus", time: "1 min ago" },
    { id: 2, type: "warning", text: "High occupancy alert: Downtown Hostel (95%)", time: "3 min ago" },
    { id: 3, type: "info", text: "System maintenance scheduled for tonight", time: "10 min ago" },
    { id: 4, type: "success", text: "Monthly report generated successfully", time: "15 min ago" },
  ]);
  const handleRemoveMessage = (id) => setMessages((msgs) => msgs.filter((m) => m.id !== id));
  const handleRemoveNotification = (id) => setNotifications((notifs) => notifs.filter((n) => n.id !== id));

  // Get actual user data from context based on database structure
  const actualUserType = context?.state?.usertype?.User_Type_Name || 'guest';
  const actualUserPermissions = context?.state?.permissions || [];
  const actualUser = context?.state?.user;

  // Debug logging
  useEffect(() => {
    console.log('CommonHeader - User Data:', {
      actualUserType,
      actualUserPermissions,
      actualUser,
      userType,
      userPermissions,
      user
    });
  }, [actualUserType, actualUserPermissions, actualUser, userType, userPermissions, user]);

  // Determine role: from prop, context, or default based on actual user type
  let userRole = propRole;
  if (!userRole && actualUserType) {
    userRole = actualUserType;
  }
  if (!userRole) userRole = 'guest';

  // Get appropriate sidebar data based on actual user type
  let sidebarData, additionalMenuItems;
  if (userRole === 'Admin') {
    sidebarData = adminSidebarData;
    additionalMenuItems = adminAdditionalMenuItems;
  } else {
    // For other roles, use the same data for now
    sidebarData = adminSidebarData;
    additionalMenuItems = adminAdditionalMenuItems;
  }

  // Enhanced navigation handlers with proper error handling
  const handleNavigation = useCallback((item, options = {}) => {
    try {
      console.log('Navigation attempt:', { item, userType: actualUserType, userPermissions: actualUserPermissions });
      
      // Get current route metadata safely
      const currentRoute = getCurrentRouteMetadata ? getCurrentRouteMetadata() : {};
      
      // Determine navigation type based on item
      if (item.url && item.url.includes('/dashboard/')) {
        // Business dashboard navigation
        const businessType = item.params?.businessType || currentRoute.businessType;
        const businessId = item.params?.businessId || currentRoute.businessId;
        
        if (businessType && businessId) {
          return navigateToBusiness(businessType, businessId, {
            trackAnalytics: true,
            userRole: actualUserType,
            userPermissions: actualUserPermissions
          });
        }
      } else if (item.url && item.url.includes('/management/')) {
        // Business module navigation
        const businessType = item.params?.businessType || currentRoute.businessType;
        const businessId = item.params?.businessId || currentRoute.businessId;
        const module = item.url.split('/').pop();
        
        if (businessType && businessId && module) {
          return navigateToBusinessModule(businessType, businessId, module, {
            trackAnalytics: true,
            userRole: actualUserType,
            userPermissions: actualUserPermissions
          });
        }
      } else if (item.url && item.url.includes('/admin/')) {
        // Admin module navigation
        const module = item.url.split('/').pop();
        return navigateToAdmin(module, {
          trackAnalytics: true,
          userRole: actualUserType,
          userPermissions: actualUserPermissions
        });
      } else if (item.url && item.url.includes('/staff/')) {
        // Staff module navigation
        const module = item.url.split('/').pop();
        return navigateToStaff(module, {
          trackAnalytics: true,
          userRole: actualUserType,
          userPermissions: actualUserPermissions
        });
      } else {
        // Fallback to regular navigation
        console.log('Using fallback navigation to:', item.url);
        return navigate(item.url, { 
          state: { 
            from: window.location.pathname,
            timestamp: Date.now()
          }
        });
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Show error message to user
      setSnackOptions({
        color: "error",
        message: "Navigation failed. Please try again."
      });
      setSnackOpen(true);
    }
  }, [navigateToBusiness, navigateToBusinessModule, navigateToAdmin, navigateToStaff, getCurrentRouteMetadata, actualUserType, actualUserPermissions, navigate]);

  // Enhanced drawer toggle with animation
  const handleDrawerToggle = () => {
    setIsTransitioning(true);
    setOpen(!open);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Enhanced section toggle
  const handleToggle = (sectionName) => {
    setSelectedService(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Enhanced module toggle
  const handleModules = (moduleName) => {
    setSelectedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  // Enhanced profile handling
  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // Enhanced drawer open/close
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Enhanced logout with confirmation
  const handleLogout = async () => {
    try {
      const response = await authPostRecord(API_Logout);
      if (response.status === 200) {
        dispatch({ type: "LOGOUT" });
        navigate("/SignIn");
        setSnackOptions({
          color: "success",
          message: "Logged out successfully"
        });
        setSnackOpen(true);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setSnackOptions({
        color: "error",
        message: "Logout failed. Please try again."
      });
      setSnackOpen(true);
    }
  };

  // Enhanced dashboard navigation using actual user type from database
  const handleDashboardNavigation = () => {
    try {
      console.log('Dashboard navigation attempt:', {
        userType: actualUserType,
        defaultPage: context.state.usertype?.Default_Page
      });
      
      // Use actual user type's default page from database
      const dashboardRoute = context.state.usertype?.Default_Page || "/AdminDashboard";
      console.log('Navigating to dashboard:', dashboardRoute);
      
      navigate(dashboardRoute, {
        state: { 
          from: window.location.pathname,
          timestamp: Date.now()
        }
      });
    } catch (error) {
      console.error('Dashboard navigation error:', error);
      setSnackOptions({
        color: "error",
        message: "Navigation failed. Please try again."
      });
      setSnackOpen(true);
    }
  };

  // Calculate current drawer width
  const currentDrawerWidth = collapsed ? collapsedDrawerWidth : drawerWidth;

  // Get user permission summary
  const userPermissionSummary = getUserPermissionSummary ? getUserPermissionSummary() : {
    canView: false,
    canCreate: false,
    canUpdate: false,
    canDelete: false
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Enhanced AppBar */}
      <StyledAppBar position="fixed" open={open} collapsed={collapsed}>
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#e2e8f0' : '#1e293b',
          borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`
        }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: 2,
                color: darkMode ? '#e2e8f0' : '#1e293b',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap component="div" sx={{ 
              fontWeight: 600,
              color: darkMode ? '#e2e8f0' : '#1e293b'
            }}>
              AppointmentTech
            </Typography>
          </Box>

          {/* Center Section - Navigation Breadcrumb */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
          }}>
            <Typography variant="body2" sx={{ 
              color: darkMode ? '#94a3b8' : '#64748b',
              fontWeight: 500
            }}>
              {actualUserType} Dashboard
            </Typography>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Theme Toggle */}
            <IconButton
              onClick={() => themeMode.dispatch({ type: "TOGGLE" })}
              sx={{
                color: darkMode ? '#e2e8f0' : '#1e293b',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Messages */}
            <IconButton
              onClick={handleMsgClick}
              sx={{
                color: darkMode ? '#e2e8f0' : '#1e293b',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <Badge badgeContent={messages.length} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            {/* Notifications */}
            <IconButton
              onClick={handleNotifClick}
              sx={{
                color: darkMode ? '#e2e8f0' : '#1e293b',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* User Profile */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileOpen}
                sx={{
                  color: darkMode ? '#e2e8f0' : '#1e293b',
                  '&:hover': {
                    backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 32, 
                  height: 32,
                  backgroundColor: darkMode ? '#475569' : '#e2e8f0',
                  color: darkMode ? '#e2e8f0' : '#1e293b'
                }}>
                  {actualUser?.name?.charAt(0) || actualUserType?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Enhanced Drawer */}
      <StyledDrawer variant="permanent" open={open} collapsed={collapsed}>
        <Toolbar />
        <Box sx={{ overflow: 'auto', height: '100%' }}>
          {/* User Info Section */}
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            backgroundColor: darkMode ? '#0f172a' : '#f8fafc'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ 
                width: 40, 
                height: 40,
                backgroundColor: darkMode ? '#475569' : '#e2e8f0',
                color: darkMode ? '#e2e8f0' : '#1e293b',
                mr: 2
              }}>
                {actualUser?.name?.charAt(0) || actualUserType?.charAt(0) || 'U'}
              </Avatar>
              {!collapsed && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600,
                    color: darkMode ? '#e2e8f0' : '#1e293b'
                  }}>
                    {actualUser?.name || actualUserType || 'User'}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: darkMode ? '#94a3b8' : '#64748b'
                  }}>
                    {actualUserType || 'Guest'}
                  </Typography>
                </Box>
              )}
            </Box>
            
            {/* Permission Summary */}
            {!collapsed && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: darkMode ? '#94a3b8' : '#64748b', 
                  display: 'block' 
                }}>
                  Permissions: {userPermissionSummary.canView ? 'View' : ''} {userPermissionSummary.canCreate ? 'Create' : ''} {userPermissionSummary.canUpdate ? 'Update' : ''} {userPermissionSummary.canDelete ? 'Delete' : ''}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Navigation Sections */}
          <List sx={{ p: 0 }}>
            {/* Business Sections - Show for all authenticated users */}
            {actualUserType && actualUserType !== 'guest' ? (
              sidebarData.sections.map((section) => (
                <Box key={section.name}>
                  <ListItemButton
                    onClick={() => handleToggle(section.name)}
                    sx={{
                      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                      color: darkMode ? '#e2e8f0' : '#1e293b',
                      '&:hover': {
                        backgroundColor: darkMode ? '#334155' : '#f1f5f9'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                      {section.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText 
                        primary={section.name}
                        sx={{ 
                          '& .MuiListItemText-primary': {
                            fontWeight: 500
                          }
                        }}
                      />
                    )}
                    {!collapsed && (
                      selectedService[section.name] ? <ChevronLeftIcon /> : <ChevronRightIcon />
                    )}
                  </ListItemButton>
                  
                  <Collapse in={selectedService[section.name]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {section.items.map((item) => (
                        <ListItemButton
                          key={item.name}
                          onClick={() => handleNavigation(item)}
                          sx={{
                            pl: collapsed ? 2 : 4,
                            backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                            color: darkMode ? '#cbd5e1' : '#475569',
                            '&:hover': {
                              backgroundColor: darkMode ? '#1e293b' : '#e2e8f0'
                            },
                            '&.Mui-selected': {
                              backgroundColor: darkMode ? '#334155' : '#e2e8f0',
                              color: darkMode ? '#e2e8f0' : '#1e293b'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ color: 'inherit' }}>
                            {item.icon}
                          </ListItemIcon>
                          {!collapsed && (
                            <ListItemText 
                              primary={item.name}
                              sx={{ 
                                '& .MuiListItemText-primary': {
                                  fontSize: '0.875rem'
                                }
                              }}
                            />
                          )}
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))
            ) : null}

            {/* Admin Modules - Only show for Admin users */}
            {actualUserType === "Admin" && (
              <>
                <Divider sx={{ my: 3, mx: 2, borderColor: darkMode ? "#475569" : "#e2e8f0" }} />
                <Typography variant="overline" sx={{ 
                  px: 2, 
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontWeight: 600
                }}>
                  Admin Modules
                </Typography>
                {additionalMenuItems.map((item) => (
                  <ListItemButton
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    sx={{
                      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                      color: darkMode ? '#e2e8f0' : '#1e293b',
                      '&:hover': {
                        backgroundColor: darkMode ? '#334155' : '#f1f5f9'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText 
                        primary={item.name}
                        sx={{ 
                          '& .MuiListItemText-primary': {
                            fontWeight: 500
                          }
                        }}
                      />
                    )}
                  </ListItemButton>
                ))}
              </>
            )}
          </List>
        </Box>
      </StyledDrawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
        marginTop: '64px'
      }}>
        {/* Content will be rendered here */}
      </Box>

      {/* Enhanced Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            backgroundColor: darkMode ? '#1e293b' : '#ffffff',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            borderRadius: 2,
            minWidth: 200,
            mt: 1
          }
        }}
      >
        <MenuItem onClick={handleDashboardNavigation} sx={{ 
          color: darkMode ? '#e2e8f0' : '#1e293b',
          '&:hover': {
            backgroundColor: darkMode ? '#334155' : '#f1f5f9'
          }
        }}>
          <DashboardIcon sx={{ mr: 2 }} />
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleProfileClose} sx={{ 
          color: darkMode ? '#e2e8f0' : '#1e293b',
          '&:hover': {
            backgroundColor: darkMode ? '#334155' : '#f1f5f9'
          }
        }}>
          <Settings sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <Divider sx={{ borderColor: darkMode ? '#334155' : '#e2e8f0' }} />
        <MenuItem onClick={handleLogout} sx={{ 
          color: '#ef4444',
          '&:hover': {
            backgroundColor: darkMode ? '#7f1d1d' : '#fef2f2'
          }
        }}>
          <Logout sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Enhanced Messages Popover */}
      <Popover
        open={openMsg}
        anchorEl={msgAnchorEl}
        onClose={handleMsgClose}
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
            width: 320,
            maxHeight: 400,
            background: darkMode ? "#1e293b" : "#ffffff",
            border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            borderRadius: "12px",
            boxShadow: darkMode 
              ? "0 10px 25px rgba(0,0,0,0.3)" 
              : "0 10px 25px rgba(0,0,0,0.1)",
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" }}>
            Messages
          </Typography>
        </Box>
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                p: 2,
                borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                "&:hover": {
                  backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" }}>
                  {message.sender}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveMessage(message.id)}
                  sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#6b7280", mb: 1 }}>
                {message.text}
              </Typography>
              <Typography variant="caption" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
                {message.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Popover>

      {/* Enhanced Notifications Popover */}
      <Popover
        open={openNotif}
        anchorEl={notifAnchorEl}
        onClose={handleNotifClose}
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
            width: 320,
            maxHeight: 400,
            background: darkMode ? "#1e293b" : "#ffffff",
            border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            borderRadius: "12px",
            boxShadow: darkMode 
              ? "0 10px 25px rgba(0,0,0,0.3)" 
              : "0 10px 25px rgba(0,0,0,0.1)",
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" }}>
            Notifications
          </Typography>
        </Box>
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                p: 2,
                borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                "&:hover": {
                  backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Chip
                  label={notification.type}
                  size="small"
                  color={notification.type === 'success' ? 'success' : notification.type === 'warning' ? 'warning' : 'info'}
                  sx={{ fontSize: '0.7rem' }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveNotification(notification.id)}
                  sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: darkMode ? "#cbd5e1" : "#6b7280", mb: 1 }}>
                {notification.text}
              </Typography>
              <Typography variant="caption" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
                {notification.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Popover>

      {/* Enhanced Snackbar */}
      <SnackBar
        open={snackOpen}
        setOpen={setSnackOpen}
        options={snackOptions}
      />
    </Box>
  );
} 