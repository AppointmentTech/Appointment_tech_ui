import React, { useContext, useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Badge, Tooltip, Box, Popover, Divider, Button, useMediaQuery, Drawer, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from 'ContextOrRedux/ThemeProvider.js';
import { useTheme } from '@mui/material/styles';

const navIcons = {
  assigned: <AssignmentIcon />,
  guests: <PersonIcon />,
  rooms: <MeetingRoomIcon />,
  maintenance: <BuildIcon />,
  profile: <PersonIcon />,
};

const navItemsDefault = [
  { key: 'assigned', label: 'Assigned Services' },
  { key: 'guests', label: 'Guest Management' },
  { key: 'rooms', label: 'Room Management' },
  { key: 'maintenance', label: 'Maintenance Requests' },
  { key: 'profile', label: 'Profile' },
];

const mockMessages = [
  { id: 1, sender: 'Manager', text: 'Please check urgent service requests.', time: '2 min ago' },
  { id: 2, sender: 'Reception', text: 'Guest requested extra towels.', time: '10 min ago' },
];
const mockNotifications = [
  { id: 1, type: 'info', text: 'New service assigned: Room Cleaning', time: '1 min ago' },
  { id: 2, type: 'success', text: 'Service "Laundry" marked as completed', time: '5 min ago' },
];

const StaffHeader = ({ navItems = navItemsDefault, section, setSection }) => {
  const theme = useTheme();
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [msgAnchorEl, setMsgAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const openMsg = Boolean(msgAnchorEl);
  const openNotif = Boolean(notifAnchorEl);
  const [messages, setMessages] = useState(mockMessages);
  const [notifications, setNotifications] = useState(mockNotifications);
  const handleRemoveMessage = (id) => setMessages(msgs => msgs.filter(m => m.id !== id));
  const handleRemoveNotification = (id) => setNotifications(notifs => notifs.filter(n => n.id !== id));
  // Drawer state for mobile nav
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: darkMode
          ? 'linear-gradient(90deg, #232526 0%, #414345 100%)'
          : 'linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)',
        color: theme.palette.text.primary,
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 4 },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo/Title and Navigation */}
        <Box display="flex" alignItems="center" flex={1} minWidth={0}>
          {isMobile && (
            <IconButton
              color="primary"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          )}
          <Typography
            variant={isMobile ? 'subtitle2' : 'h6'}
            fontWeight={700}
            sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 20, letterSpacing: 0.5, mr: 2, whiteSpace: 'nowrap' }}
          >
            Staff Dashboard
          </Typography>
          {/* Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                ml: 2,
              }}
            >
              {navItems.map(item => (
                <Button
                  key={item.key}
                  variant={section === item.key ? 'contained' : 'text'}
                  color={section === item.key ? 'primary' : 'inherit'}
                  onClick={() => setSection(item.key)}
                  startIcon={navIcons[item.key]}
                  sx={{
                    fontWeight: section === item.key ? 700 : 500,
                    fontSize: 12,
                    px: 1.5,
                    py: 0.5,
                    minWidth: 0,
                    textTransform: 'none',
                    borderRadius: 999,
                    color: section === item.key ? '#fff' : theme.palette.primary.main,
                    bgcolor: section === item.key ? theme.palette.primary.main : 'rgba(59,130,246,0.08)',
                    boxShadow: section === item.key ? 2 : 0,
                    border: section === item.key ? 'none' : `1.5px solid transparent`,
                    '&:hover': {
                      bgcolor: section === item.key ? theme.palette.primary.dark : 'rgba(59,130,246,0.16)',
                      color: '#fff',
                    },
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
        {/* Actions */}
        <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2} ml={2}>
          {/* Theme Toggle */}
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow placement="bottom">
            <IconButton
              color="inherit"
              onClick={() => themeMode.dispatch({ type: darkMode ? 'LIGHTMODE' : 'DARKMODE' })}
              size={isMobile ? 'small' : 'medium'}
            >
              {darkMode ? <Brightness7Icon fontSize={isMobile ? 'small' : 'medium'} /> : <Brightness4Icon fontSize={isMobile ? 'small' : 'medium'} />}
            </IconButton>
          </Tooltip>
          {/* Messages */}
          <Tooltip title="Messages" arrow placement="bottom">
            <IconButton color="inherit" onClick={e => setMsgAnchorEl(e.currentTarget)} size={isMobile ? 'small' : 'medium'}>
              <Badge badgeContent={mockMessages.length} color="error">
                <MailIcon fontSize={isMobile ? 'small' : 'medium'} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            open={Boolean(msgAnchorEl)}
            anchorEl={msgAnchorEl}
            onClose={() => setMsgAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 320,
                borderRadius: 2,
                boxShadow: 6,
                background: darkMode ? '#1e293b' : '#fff',
                color: darkMode ? '#e2e8f0' : '#1e293b',
                p: 1,
              }
            }}
          >
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 700 }}>Messages</Typography>
            <Divider />
            {mockMessages.map((msg) => (
              <Box key={msg.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, '&:hover .remove-btn': { opacity: 1 }, borderRadius: 1, cursor: 'pointer', position: 'relative' }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 16 }}>{msg.sender.charAt(0)}</Avatar>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>{msg.sender}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>{msg.text}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                <IconButton size="small" onClick={() => setMessages(msgs => msgs.filter(m => m.id !== msg.id))} sx={{ ml: 1, opacity: 0, transition: 'opacity 0.2s', position: 'absolute', right: 4, top: 4 }} className="remove-btn">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            {mockMessages.length === 0 && <Typography sx={{ px: 2, py: 2, color: 'text.secondary' }}>No messages</Typography>}
          </Popover>
          {/* Notifications */}
          <Tooltip title="Notifications" arrow placement="bottom">
            <IconButton color="inherit" onClick={e => setNotifAnchorEl(e.currentTarget)} size={isMobile ? 'small' : 'medium'}>
              <Badge badgeContent={mockNotifications.length} color="error">
                <NotificationsIcon fontSize={isMobile ? 'small' : 'medium'} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            open={Boolean(notifAnchorEl)}
            anchorEl={notifAnchorEl}
            onClose={() => setNotifAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 340,
                borderRadius: 2,
                boxShadow: 6,
                background: darkMode ? '#1e293b' : '#fff',
                color: darkMode ? '#e2e8f0' : '#1e293b',
                p: 1,
              }
            }}
          >
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 700 }}>Notifications</Typography>
            <Divider />
            {mockNotifications.map((notif) => (
              <Box key={notif.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, '&:hover .remove-btn': { opacity: 1 }, borderRadius: 1, cursor: 'pointer', position: 'relative' }}>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>{notif.text}</Typography>
                  <Typography variant="caption" color="text.secondary">{notif.time}</Typography>
                </Box>
                <IconButton size="small" onClick={() => setNotifications(notifs => notifs.filter(n => n.id !== notif.id))} sx={{ ml: 1, opacity: 0, transition: 'opacity 0.2s', position: 'absolute', right: 4, top: 4 }} className="remove-btn">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            {mockNotifications.length === 0 && <Typography sx={{ px: 2, py: 2, color: 'text.secondary' }}>No notifications</Typography>}
          </Popover>
          {/* User Avatar */}
          <Avatar sx={{ bgcolor: theme.palette.primary.main, ml: 2, width: isMobile ? 32 : 40, height: isMobile ? 32 : 40, fontSize: isMobile ? 16 : 20, boxShadow: 1 }}>S</Avatar>
        </Box>
      </Toolbar>
      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 240,
            pt: 2,
            background: darkMode ? theme.palette.background.paper : '#f8fafc',
          },
        }}
      >
        <Box display="flex" alignItems="center" px={2} mb={2}>
          <Typography variant="h6" fontWeight={700} color="primary" flex={1}>
            Menu
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map(item => (
            <ListItemButton
              key={item.key}
              selected={section === item.key}
              onClick={() => {
                setSection(item.key);
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: 2,
                my: 0.5,
                mx: 1,
                bgcolor: section === item.key ? theme.palette.primary.main : 'transparent',
                color: section === item.key ? '#fff' : theme.palette.text.primary,
                fontWeight: section === item.key ? 700 : 500,
                '&:hover': {
                  bgcolor: section === item.key ? theme.palette.primary.dark : theme.palette.action.hover,
                  color: section === item.key ? '#fff' : theme.palette.primary.main,
                },
                transition: 'all 0.2s',
              }}
            >
              <ListItemIcon sx={{ color: section === item.key ? '#fff' : theme.palette.primary.main }}>
                {navIcons[item.key]}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default StaffHeader; 