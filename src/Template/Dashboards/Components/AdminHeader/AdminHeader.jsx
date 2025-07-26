import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "@context/ThemeProvider.js";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { authPostRecord } from "@services/services";
import SnackBar from "@snackbar/SnackBar.jsx";
import { AuthContext } from "ContextOrRedux/AuthContext";
import { sidebarData, moduleData, additionalMenuItems } from "@components/SidebarData.js";

const API_Logout = "api/v1/authrouter/logout";
const drawerWidth = 300;
const collapsedDrawerWidth = 80;

export default function AdminHeader() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const theme = useTheme();
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpen] = React.useState(!isMobile);
  const [collapsed, setCollapsed] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedService, setSelectedService] = useState({});
  const [selectedModules, setSelectedModules] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({
    color: "success",
    message: "Hi",
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const openProfile = Boolean(anchorEl);
  const currentDrawerWidth = collapsed ? collapsedDrawerWidth : drawerWidth;
  
  // Handle responsive behavior
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
      setCollapsed(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  // Prevent content flickering during transitions
  const handleDrawerToggle = () => {
    setIsTransitioning(true);
    setCollapsed(!collapsed);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleToggle = (sectionName) => {
    setSelectedService((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };
  
  const handleModules = (moduleName) => {
    setSelectedModules((prevState) => ({
      ...prevState,
      [moduleName]: !prevState[moduleName],
    }));
  };
  
  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleLogout = () => {
    var tokenData = {
      token: context.state.token,
    };
    authPostRecord(API_Logout, tokenData)
      .then((response) => {
        if (response.status === "success") {
          setSnackOptions({
            color: response.color,
            message: response.message,
          });
          dispatch({ type: "LOGOUT" });
        } else {
          setSnackOptions({
            color: response.color,
            message: response.message,
          });
        }
        setSnackOpen(true);
      })
      .catch((err) => {
        setSnackOptions({
          color: "error",
          message: err.response.data.detail,
        });
        setSnackOpen(true);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        elevation={0}
        sx={{
          background: darkMode 
            ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" 
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
          color: darkMode ? "#e2e8f0" : "#1e293b",
          borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          backdropFilter: "blur(20px)",
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && !isMobile && {
            marginLeft: currentDrawerWidth,
            width: `calc(100% - ${currentDrawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 64, sm: 70 },
          px: { xs: 2, sm: 3 },
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: { xs: 2, sm: 3 },
              ...(open && !isMobile && { display: "none" }),
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                background: darkMode 
                  ? "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)" 
                  : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              AppointmentTech
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: { xs: 1, sm: 1.5 },
            "& .MuiIconButton-root": {
              borderRadius: "12px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)",
                transform: "translateY(-2px)",
                boxShadow: darkMode 
                  ? "0 4px 12px rgba(0,0,0,0.3)" 
                  : "0 4px 12px rgba(0,0,0,0.15)",
              },
            },
          }}>
            <Tooltip
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              arrow
              placement="bottom"
            >
              <IconButton
                color="inherit"
                onClick={() =>
                  themeMode.dispatch({
                    type: darkMode ? "LIGHTMODE" : "DARKMODE",
                  })
                }
                sx={{ p: 1.5 }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Messages" arrow placement="bottom">
              <IconButton size="large" color="inherit">
                <Badge badgeContent={4} color="error" sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    height: "18px",
                    minWidth: "18px",
                    borderRadius: "9px",
                    background: darkMode ? "#ef4444" : "#dc2626",
                  }
                }}>
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications" arrow placement="bottom">
              <IconButton size="large" color="inherit">
                <Badge badgeContent={17} color="error" sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    height: "18px",
                    minWidth: "18px",
                    borderRadius: "9px",
                    background: darkMode ? "#ef4444" : "#dc2626",
                  }
                }}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Box sx={{ ml: 1 }}>
              <Tooltip title="Account settings" arrow placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleProfileOpen}
                  sx={{
                    border: `2px solid ${darkMode ? "#475569" : "#cbd5e1"}`,
                    borderRadius: "14px",
                    "&:hover": {
                      borderColor: darkMode ? "#60a5fa" : "#3b82f6",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openProfile}
                onClose={handleProfileClose}
                onClick={handleProfileClose}
                slotProps={{
                  paper: {
                    elevation: 12,
                    sx: {
                      overflow: "visible",
                      filter: darkMode 
                        ? "drop-shadow(0px 12px 32px rgba(0,0,0,0.4))" 
                        : "drop-shadow(0px 12px 32px rgba(0,0,0,0.15))",
                      mt: 2,
                      borderRadius: "16px",
                      minWidth: 220,
                      background: darkMode ? "#1e293b" : "#ffffff",
                      border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 16,
                        width: 12,
                        height: 12,
                        bgcolor: darkMode ? "#1e293b" : "#ffffff",
                        borderLeft: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                        borderTop: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => navigate(context.state.usertype.Default_Page)}
                  sx={{ 
                    borderRadius: "12px", 
                    mx: 1, 
                    my: 0.5, 
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    }
                  }}
                >
                  <Avatar sx={{ width: 28, height: 28, mr: 2 }} />
                  Dashboard
                </MenuItem>
                <MenuItem 
                  onClick={handleProfileClose}
                  sx={{ 
                    borderRadius: "12px", 
                    mx: 1, 
                    my: 0.5, 
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    }
                  }}
                >
                  <Avatar sx={{ width: 28, height: 28, mr: 2 }} />
                  Profile
                </MenuItem>

                <Divider sx={{ my: 1.5, borderColor: darkMode ? "#334155" : "#e2e8f0" }} />
                <MenuItem 
                  onClick={handleProfileClose}
                  sx={{ 
                    borderRadius: "12px", 
                    mx: 1, 
                    my: 0.5, 
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem 
                  onClick={handleProfileClose}
                  sx={{ 
                    borderRadius: "12px", 
                    mx: 1, 
                    my: 0.5, 
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ 
                    borderRadius: "12px", 
                    mx: 1, 
                    my: 0.5,
                    py: 1.5,
                    color: darkMode ? "#f87171" : "#dc2626",
                    "&:hover": {
                      backgroundColor: darkMode ? "rgba(248,113,113,0.1)" : "rgba(220,38,38,0.1)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </MuiAppBar>
      
      <MuiDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? handleDrawerClose : undefined}
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: currentDrawerWidth,
            boxSizing: "border-box",
            background: darkMode 
              ? "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)" 
              : "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
            borderRight: `1px solid ${darkMode ? "#475569" : "#e2e8f0"}`,
            boxShadow: darkMode 
              ? "4px 0 20px rgba(0,0,0,0.5)" 
              : "4px 0 20px rgba(0,0,0,0.1)",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: darkMode ? "#64748b" : "#cbd5e1",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: darkMode ? "#94a3b8" : "#94a3b8",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing(0, 2),
            minHeight: { xs: 64, sm: 70 },
            borderBottom: `1px solid ${darkMode ? "#475569" : "#e2e8f0"}`,
            background: darkMode 
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <Collapse in={!collapsed} orientation="horizontal" timeout={300}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: darkMode ? "#f1f5f9" : "#1e293b",
                whiteSpace: "nowrap",
                fontSize: { xs: "1rem", sm: "1.1rem" },
                background: darkMode 
                  ? "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)" 
                  : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                flexGrow: 1,
              }}
            >
              Admin Panel
            </Typography>
          </Collapse>
          
          <Box sx={{ 
            display: "flex", 
            gap: 1, 
            ml: "auto",
            justifyContent: "flex-end"
          }}>
            {!isMobile && (
              <Tooltip title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"} arrow placement="bottom">
                <IconButton 
                  onClick={handleDrawerToggle}
                  disabled={isTransitioning}
                  sx={{
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </Tooltip>
            )}
            
            {isMobile && (
              <IconButton 
                onClick={handleDrawerClose}
                sx={{
                  color: darkMode ? "#f1f5f9" : "#1e293b",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        
        <Box sx={{ 
          overflow: "auto", 
          height: "calc(100vh - 70px)",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: darkMode ? "#64748b" : "#cbd5e1",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: darkMode ? "#94a3b8" : "#94a3b8",
          },
        }}>
          <List sx={{ pt: 2, pb: 1 }}>
            <ListItemButton 
              onClick={() => navigate("/AdminDashboard")}
              sx={{
                mx: 1.5,
                mb: 1,
                borderRadius: "14px",
                background: darkMode 
                  ? "linear-gradient(135deg, rgba(96,165,250,0.1) 0%, rgba(167,139,250,0.1) 100%)" 
                  : "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 100%)",
                border: `1px solid ${darkMode ? "rgba(96,165,250,0.2)" : "rgba(59,130,246,0.1)"}`,
                "&:hover": {
                  background: darkMode 
                    ? "linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(167,139,250,0.15) 100%)" 
                    : "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)",
                  transform: "translateX(4px)",
                  boxShadow: darkMode 
                    ? "0 4px 12px rgba(96,165,250,0.2)" 
                    : "0 4px 12px rgba(59,130,246,0.15)",
                },
                "&.Mui-selected": {
                  background: darkMode 
                    ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" 
                    : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  color: "#ffffff",
                  "&:hover": {
                    background: darkMode 
                      ? "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" 
                      : "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  },
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <ListItemIcon sx={{ minWidth: 44 }}>
                <DashboardIcon />
              </ListItemIcon>
              <Collapse in={!collapsed} orientation="horizontal" timeout={300}>
                <ListItemText 
                  primary="Dashboard" 
                  primaryTypographyProps={{ 
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                />
              </Collapse>
            </ListItemButton>

            <Divider sx={{ my: 3, mx: 2, borderColor: darkMode ? "#475569" : "#e2e8f0" }} />
            
            <Collapse in={!collapsed} orientation="horizontal" timeout={300}>
              <Box sx={{ px: 2.5, mb: 1.5 }}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    fontWeight: 700,
                    color: darkMode ? "#94a3b8" : "#64748b",
                    letterSpacing: "1.2px",
                    fontSize: "0.75rem",
                  }}
                >
                  SERVICES
                </Typography>
              </Box>
            </Collapse>

            {sidebarData.sections.map((section) => (
              <Box key={section.name}>
                <ListItemButton 
                  onClick={() => handleToggle(section.name)}
                  sx={{
                    mx: 1.5,
                    mb: 0.5,
                    borderRadius: "12px",
                    "&:hover": {
                      backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                      transform: "translateX(2px)",
                    },
                    transition: "all 0.2s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    {section.icon}
                  </ListItemIcon>
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    justifyContent: "space-between",
                    minWidth: 0,
                  }}>
                    <Collapse in={!collapsed} orientation="horizontal" timeout={300} sx={{ flexGrow: 1, minWidth: 0 }}>
                      <ListItemText 
                        primary={section.name} 
                        primaryTypographyProps={{ 
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: darkMode ? "#e2e8f0" : "#374151",
                          noWrap: true,
                        }}
                      />
                    </Collapse>
                    {/* Only show one icon, depending on collapsed state */}
                    {!collapsed ? (
                      <Collapse in={!collapsed} orientation="horizontal" timeout={300} sx={{ ml: 1 }}>
                        {selectedService[section.name] ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowRightIcon />
                        )}
                      </Collapse>
                    ) : (
                      <Box sx={{ ml: 1 }}>
                        {selectedService[section.name] ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                      </Box>
                    )}
                  </Box>
                </ListItemButton>

                <Collapse
                  in={selectedService[section.name] && !collapsed}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {section.items.map((item, index) => (
                      <ListItemButton 
                        key={index} 
                        sx={{ 
                          pl: 7,
                          py: 0.75,
                          mx: 1.5,
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)",
                            transform: "translateX(2px)",
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                        onClick={() => item.url && navigate(item.url)}
                      >
                        <ListItemText 
                          primary={typeof item === 'string' ? item : item.name}
                          primaryTypographyProps={{ 
                            fontSize: "0.85rem",
                            color: darkMode ? "#cbd5e1" : "#6b7280",
                            fontWeight: 400,
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
          
          <Divider sx={{ my: 3, mx: 2, borderColor: darkMode ? "#475569" : "#e2e8f0" }} />
          
          <Collapse in={!collapsed} orientation="horizontal" timeout={300}>
            <Box sx={{ px: 2.5, mb: 1.5 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  fontWeight: 700,
                  color: darkMode ? "#94a3b8" : "#64748b",
                  letterSpacing: "1.2px",
                  fontSize: "0.75rem",
                }}
              >
                MODULES
              </Typography>
            </Box>
          </Collapse>

          {moduleData.sections.map((section) => (
            <Box key={section.name}>
              <ListItemButton 
                onClick={() => handleModules(section.name)}
                sx={{
                  mx: 1.5,
                  mb: 0.5,
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    transform: "translateX(2px)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  {section.icon}
                </ListItemIcon>
                <Collapse in={!collapsed} orientation="horizontal" timeout={300}>
                  <ListItemText 
                    primary={section.name}
                    primaryTypographyProps={{ 
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: darkMode ? "#e2e8f0" : "#374151",
                    }}
                  />
                </Collapse>
                <Collapse in={!collapsed} orientation="horizontal" timeout={300}>
                  {selectedModules[section.name] ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </Collapse>
              </ListItemButton>

              <Collapse
                in={selectedModules[section.name] && !collapsed}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {section.items.map((item, index) => (
                    <ListItemButton
                      key={index}
                      sx={{ 
                        pl: 7,
                        py: 0.75,
                        mx: 1.5,
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)",
                          transform: "translateX(2px)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                      onClick={() => navigate(item.url)}
                    >
                      <ListItemText 
                        primary={item.name}
                        primaryTypographyProps={{ 
                          fontSize: "0.85rem",
                          color: darkMode ? "#cbd5e1" : "#6b7280",
                          fontWeight: 400,
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </Box>
        
        {/* Add a divider and a visually distinct container for the additional menu */}
        <Divider sx={{ my: 2, mx: 2, borderColor: darkMode ? '#334155' : '#e2e8f0' }} />
        <List sx={{ pb: 1, pt: 0 }}>
          {additionalMenuItems.map((item) => {
            let icon = null;
            let iconColor = '';
            if (item.name.toLowerCase().includes('share')) {
              icon = <ShareIcon fontSize="inherit" />;
              iconColor = '#3b82f6'; // blue
            } else if (item.name.toLowerCase().includes('news')) {
              icon = <NewspaperIcon fontSize="inherit" />;
              iconColor = '#f59e42'; // orange
            } else {
              icon = <NewspaperIcon fontSize="inherit" />;
              iconColor = darkMode ? '#60a5fa' : '#3b82f6';
            }
            return (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: '10px',
                    minHeight: 44,
                    mb: 0.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: iconColor, fontSize: 20 }}>
                    {icon}
                  </ListItemIcon>
                  <Collapse in={!collapsed} orientation="horizontal" timeout={300} sx={{ flexGrow: 1 }}>
                    <ListItemText 
                      primary={item.name}
                      primaryTypographyProps={{ 
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: darkMode ? '#e2e8f0' : '#374151',
                      }}
                    />
                  </Collapse>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        
        <SnackBar
          open={snackOpen}
          setOpen={setSnackOpen}
          options={snackOptions}
        />
      </MuiDrawer>
    </Box>
  );
}
