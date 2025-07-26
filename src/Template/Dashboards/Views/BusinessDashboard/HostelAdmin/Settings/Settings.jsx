import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Fab,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Rating,
  LinearProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Download,
  Refresh,
  Settings,
  Security,
  Notifications,
  Language,
  Palette,
  Storage,
  Backup,
  Restore,
  Update,
  SystemUpdate,
  BugReport,
  Help,
  Info,
  PrivacyTip,
  Lock,
  LockOpen,
  VisibilityOff,
  VisibilityOn,
  Email,
  Phone,
  WhatsApp,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  Reddit,
  Telegram,
  Discord,
  Slack,
  Microsoft,
  Google,
  Apple,
  Amazon,
  Netflix,
  Spotify,
  Uber,
  Airbnb,
  Tesla,
  SpaceX,
  Meta,
  Alphabet,
  CheckCircle,
  Warning,
  Error,
  Close,
  Save,
  Cancel,
  ExpandMore,
  AdminPanelSettings,
  SupervisorAccount,
  PersonAdd,
  Group,
  TrendingUp,
  AttachMoney,
  Receipt,
  Assessment,
  EventNote,
  AccessTime,
  CheckCircleOutline,
  CancelOutlined,
  PendingActions,
  Inventory,
  ShoppingCart,
  Kitchen,
  DateRange,
  CalendarToday,
  Today,
  ThisWeek,
  ThisMonth,
  ThisYear,
  Custom,
  FileDownload,
  PictureAsPdf,
  Print,
  Share,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "@template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function SystemSettings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Settings State
  const [generalSettings, setGeneralSettings] = useState({
    hostelName: "Student Hostel Management System",
    address: "123 Hostel Street, Mumbai, Maharashtra 400001",
    phone: "+91 98765 43210",
    email: "admin@hostel.com",
    website: "www.hostel.com",
    timezone: "Asia/Kolkata",
    currency: "INR",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-hour",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    maintenanceAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    loginAttempts: 5,
    autoLock: true,
    dataEncryption: true,
    backupFrequency: "daily",
    auditLogs: true,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    primaryColor: "#2196F3",
    secondaryColor: "#FF9800",
    fontSize: "medium",
    compactMode: false,
    showAnimations: true,
    autoRefresh: true,
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionPeriod: 30,
    cloudBackup: true,
    localBackup: true,
    lastBackup: "2024-01-15 02:00:00",
    nextBackup: "2024-01-16 02:00:00",
  });

  const handleSaveSettings = (category) => {
    setSnackbar({
      open: true,
      message: `${category} settings saved successfully!`,
      severity: "success",
    });
  };

  const handleResetSettings = (category) => {
    setSnackbar({
      open: true,
      message: `${category} settings reset to default!`,
      severity: "warning",
    });
  };

  const handleBackupNow = () => {
    setSnackbar({
      open: true,
      message: "Backup initiated successfully!",
      severity: "success",
    });
  };

  const handleRestoreBackup = () => {
    setSnackbar({
      open: true,
      message: "Backup restoration initiated!",
      severity: "info",
    });
  };

  const handleSystemUpdate = () => {
    setSnackbar({
      open: true,
      message: "System update check initiated!",
      severity: "info",
    });
  };

  return (
    <React.Fragment>
      <Box sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden"
      }}>
        <CoAdminHeader />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, 
            pt: { xs: 8, sm: 10 },
            overflow: "auto",
            height: "100vh",
            backgroundColor: theme.palette.background.default
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            mb={4}
            gap={2}
          >
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold"
                color="primary"
              >
                System Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure system preferences, security, and administrative settings
              </Typography>
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center" 
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Button
                variant="outlined"
                startIcon={<Backup />}
                onClick={handleBackupNow}
                size={isMobile ? "small" : "medium"}
              >
                Backup Now
              </Button>
              <Button
                variant="contained"
                startIcon={<SystemUpdate />}
                onClick={handleSystemUpdate}
                size={isMobile ? "small" : "medium"}
              >
                Check Updates
              </Button>
            </Box>
          </Box>

          {/* Settings Tabs */}
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="General" />
            <Tab label="Notifications" />
            <Tab label="Security" />
            <Tab label="Appearance" />
            <Tab label="Backup & Restore" />
            <Tab label="System Info" />
          </Tabs>

          {/* General Settings */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      General Settings
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Hostel Name"
                          value={generalSettings.hostelName}
                          onChange={(e) => setGeneralSettings(prev => ({
                            ...prev,
                            hostelName: e.target.value
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={generalSettings.phone}
                          onChange={(e) => setGeneralSettings(prev => ({
                            ...prev,
                            phone: e.target.value
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          value={generalSettings.address}
                          onChange={(e) => setGeneralSettings(prev => ({
                            ...prev,
                            address: e.target.value
                          }))}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={generalSettings.email}
                          onChange={(e) => setGeneralSettings(prev => ({
                            ...prev,
                            email: e.target.value
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Website"
                          value={generalSettings.website}
                          onChange={(e) => setGeneralSettings(prev => ({
                            ...prev,
                            website: e.target.value
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Timezone</InputLabel>
                          <Select
                            value={generalSettings.timezone}
                            onChange={(e) => setGeneralSettings(prev => ({
                              ...prev,
                              timezone: e.target.value
                            }))}
                            label="Timezone"
                          >
                            <MenuItem value="Asia/Kolkata">Asia/Kolkata (IST)</MenuItem>
                            <MenuItem value="Asia/Dubai">Asia/Dubai (GST)</MenuItem>
                            <MenuItem value="America/New_York">America/New_York (EST)</MenuItem>
                            <MenuItem value="Europe/London">Europe/London (GMT)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Currency</InputLabel>
                          <Select
                            value={generalSettings.currency}
                            onChange={(e) => setGeneralSettings(prev => ({
                              ...prev,
                              currency: e.target.value
                            }))}
                            label="Currency"
                          >
                            <MenuItem value="INR">Indian Rupee (₹)</MenuItem>
                            <MenuItem value="USD">US Dollar ($)</MenuItem>
                            <MenuItem value="EUR">Euro (€)</MenuItem>
                            <MenuItem value="GBP">British Pound (£)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Language</InputLabel>
                          <Select
                            value={generalSettings.language}
                            onChange={(e) => setGeneralSettings(prev => ({
                              ...prev,
                              language: e.target.value
                            }))}
                            label="Language"
                          >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Hindi">Hindi</MenuItem>
                            <MenuItem value="Spanish">Spanish</MenuItem>
                            <MenuItem value="French">French</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Date Format</InputLabel>
                          <Select
                            value={generalSettings.dateFormat}
                            onChange={(e) => setGeneralSettings(prev => ({
                              ...prev,
                              dateFormat: e.target.value
                            }))}
                            label="Date Format"
                          >
                            <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                            <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                            <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Box display="flex" gap={2} mt={3}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={() => handleSaveSettings("General")}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={() => handleResetSettings("General")}
                      >
                        Reset to Default
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Quick Actions
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Backup />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Backup System"
                          secondary="Create a backup of all data"
                        />
                        <ListItemSecondaryAction>
                          <Button size="small" onClick={handleBackupNow}>
                            Backup
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <SystemUpdate />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="System Update"
                          secondary="Check for system updates"
                        />
                        <ListItemSecondaryAction>
                          <Button size="small" onClick={handleSystemUpdate}>
                            Check
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Notification Settings */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Notification Preferences
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Notification Channels
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                emailNotifications: e.target.checked
                              }))}
                            />
                          }
                          label="Email Notifications"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.smsNotifications}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                smsNotifications: e.target.checked
                              }))}
                            />
                          }
                          label="SMS Notifications"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.pushNotifications}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                pushNotifications: e.target.checked
                              }))}
                            />
                          }
                          label="Push Notifications"
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" gutterBottom>
                          Alert Types
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.bookingAlerts}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                bookingAlerts: e.target.checked
                              }))}
                            />
                          }
                          label="Booking Alerts"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.paymentAlerts}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                paymentAlerts: e.target.checked
                              }))}
                            />
                          }
                          label="Payment Alerts"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.maintenanceAlerts}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                maintenanceAlerts: e.target.checked
                              }))}
                            />
                          }
                          label="Maintenance Alerts"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.securityAlerts}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                securityAlerts: e.target.checked
                              }))}
                            />
                          }
                          label="Security Alerts"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.marketingEmails}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                marketingEmails: e.target.checked
                              }))}
                            />
                          }
                          label="Marketing Emails"
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex" gap={2} mt={3}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={() => handleSaveSettings("Notification")}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={() => handleResetSettings("Notification")}
                      >
                        Reset to Default
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Security Settings */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Security Settings
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={securitySettings.twoFactorAuth}
                              onChange={(e) => setSecuritySettings(prev => ({
                                ...prev,
                                twoFactorAuth: e.target.checked
                              }))}
                            />
                          }
                          label="Two-Factor Authentication"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Password Expiry (days)"
                          type="number"
                          value={securitySettings.passwordExpiry}
                          onChange={(e) => setSecuritySettings(prev => ({
                            ...prev,
                            passwordExpiry: parseInt(e.target.value) || 90
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Session Timeout (minutes)"
                          type="number"
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings(prev => ({
                            ...prev,
                            sessionTimeout: parseInt(e.target.value) || 30
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Max Login Attempts"
                          type="number"
                          value={securitySettings.loginAttempts}
                          onChange={(e) => setSecuritySettings(prev => ({
                            ...prev,
                            loginAttempts: parseInt(e.target.value) || 5
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Backup Frequency</InputLabel>
                          <Select
                            value={securitySettings.backupFrequency}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              backupFrequency: e.target.value
                            }))}
                            label="Backup Frequency"
                          >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={securitySettings.autoLock}
                              onChange={(e) => setSecuritySettings(prev => ({
                                ...prev,
                                autoLock: e.target.checked
                              }))}
                            />
                          }
                          label="Auto-lock on inactivity"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={securitySettings.dataEncryption}
                              onChange={(e) => setSecuritySettings(prev => ({
                                ...prev,
                                dataEncryption: e.target.checked
                              }))}
                            />
                          }
                          label="Data Encryption"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={securitySettings.auditLogs}
                              onChange={(e) => setSecuritySettings(prev => ({
                                ...prev,
                                auditLogs: e.target.checked
                              }))}
                            />
                          }
                          label="Audit Logs"
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex" gap={2} mt={3}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={() => handleSaveSettings("Security")}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={() => handleResetSettings("Security")}
                      >
                        Reset to Default
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Appearance Settings */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Appearance Settings
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Theme</InputLabel>
                          <Select
                            value={appearanceSettings.theme}
                            onChange={(e) => setAppearanceSettings(prev => ({
                              ...prev,
                              theme: e.target.value
                            }))}
                            label="Theme"
                          >
                            <MenuItem value="light">Light</MenuItem>
                            <MenuItem value="dark">Dark</MenuItem>
                            <MenuItem value="auto">Auto</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Font Size</InputLabel>
                          <Select
                            value={appearanceSettings.fontSize}
                            onChange={(e) => setAppearanceSettings(prev => ({
                              ...prev,
                              fontSize: e.target.value
                            }))}
                            label="Font Size"
                          >
                            <MenuItem value="small">Small</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="large">Large</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Primary Color"
                          type="color"
                          value={appearanceSettings.primaryColor}
                          onChange={(e) => setAppearanceSettings(prev => ({
                            ...prev,
                            primaryColor: e.target.value
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Secondary Color"
                          type="color"
                          value={appearanceSettings.secondaryColor}
                          onChange={(e) => setAppearanceSettings(prev => ({
                            ...prev,
                            secondaryColor: e.target.value
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={appearanceSettings.compactMode}
                              onChange={(e) => setAppearanceSettings(prev => ({
                                ...prev,
                                compactMode: e.target.checked
                              }))}
                            />
                          }
                          label="Compact Mode"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={appearanceSettings.showAnimations}
                              onChange={(e) => setAppearanceSettings(prev => ({
                                ...prev,
                                showAnimations: e.target.checked
                              }))}
                            />
                          }
                          label="Show Animations"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={appearanceSettings.autoRefresh}
                              onChange={(e) => setAppearanceSettings(prev => ({
                                ...prev,
                                autoRefresh: e.target.checked
                              }))}
                            />
                          }
                          label="Auto Refresh"
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex" gap={2} mt={3}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={() => handleSaveSettings("Appearance")}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={() => handleResetSettings("Appearance")}
                      >
                        Reset to Default
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Backup & Restore */}
          {activeTab === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Backup & Restore
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={backupSettings.autoBackup}
                              onChange={(e) => setBackupSettings(prev => ({
                                ...prev,
                                autoBackup: e.target.checked
                              }))}
                            />
                          }
                          label="Automatic Backup"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Backup Frequency</InputLabel>
                          <Select
                            value={backupSettings.backupFrequency}
                            onChange={(e) => setBackupSettings(prev => ({
                              ...prev,
                              backupFrequency: e.target.value
                            }))}
                            label="Backup Frequency"
                          >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Backup Time"
                          type="time"
                          value={backupSettings.backupTime}
                          onChange={(e) => setBackupSettings(prev => ({
                            ...prev,
                            backupTime: e.target.value
                          }))}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Retention Period (days)"
                          type="number"
                          value={backupSettings.retentionPeriod}
                          onChange={(e) => setBackupSettings(prev => ({
                            ...prev,
                            retentionPeriod: parseInt(e.target.value) || 30
                          }))}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={backupSettings.cloudBackup}
                              onChange={(e) => setBackupSettings(prev => ({
                                ...prev,
                                cloudBackup: e.target.checked
                              }))}
                            />
                          }
                          label="Cloud Backup"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={backupSettings.localBackup}
                              onChange={(e) => setBackupSettings(prev => ({
                                ...prev,
                                localBackup: e.target.checked
                              }))}
                            />
                          }
                          label="Local Backup"
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex" gap={2} mt={3}>
                      <Button
                        variant="contained"
                        startIcon={<Backup />}
                        onClick={handleBackupNow}
                      >
                        Backup Now
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Restore />}
                        onClick={handleRestoreBackup}
                      >
                        Restore Backup
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Backup Status
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Last Backup"
                          secondary={backupSettings.lastBackup}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Next Backup"
                          secondary={backupSettings.nextBackup}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Backup Size"
                          secondary="2.5 GB"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* System Info */}
          {activeTab === 5 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      System Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          System Version
                        </Typography>
                        <Typography variant="body1">
                          v2.1.0
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Database Version
                        </Typography>
                        <Typography variant="body1">
                          MySQL 8.0.32
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Last Update
                        </Typography>
                        <Typography variant="body1">
                          2024-01-15
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          System Status
                        </Typography>
                        <Chip label="Healthy" color="success" size="small" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Storage Used
                        </Typography>
                        <Typography variant="body1">
                          45.2 GB / 100 GB
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={45.2} 
                          sx={{ mt: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Memory Usage
                        </Typography>
                        <Typography variant="body1">
                          2.1 GB / 8 GB
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={26.25} 
                          sx={{ mt: 1 }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </React.Fragment>
  );
} 