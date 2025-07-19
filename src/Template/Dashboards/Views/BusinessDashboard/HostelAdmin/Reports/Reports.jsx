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
  Assessment,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  ShowChart,
  Timeline,
  Analytics,
  Dashboard,
  Receipt,
  AttachMoney,
  People,
  Hotel,
  Restaurant,
  Engineering,
  Security,
  CleaningServices,
  CheckCircle,
  Warning,
  Error,
  Close,
  Save,
  Cancel,
  ExpandMore,
  Notifications,
  Message,
  Call,
  WhatsApp,
  Schedule,
  Assignment,
  AdminPanelSettings,
  SupervisorAccount,
  PersonAdd,
  Group,
  Star,
  EventNote,
  AccessTime,
  CheckCircleOutline,
  CancelOutlined,
  PendingActions,
  Inventory,
  ShoppingCart,
  Kitchen,
  Nutrition,
  Allergies,
  Vegetarian,
  Vegan,
  Halal,
  Kosher,
  GlutenFree,
  DairyFree,
  NutFree,
  Spicy,
  Mild,
  Hot,
  Cold,
  Warm,
  Fresh,
  Organic,
  Local,
  Imported,
  Seasonal,
  YearRound,
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
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "Template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function Reports() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState("thisMonth");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Mock Data for Reports
  const mockData = {
    occupancy: {
      current: 85,
      previous: 78,
      trend: "up",
      data: [
        { month: "Jan", occupancy: 75 },
        { month: "Feb", occupancy: 80 },
        { month: "Mar", occupancy: 82 },
        { month: "Apr", occupancy: 85 },
        { month: "May", occupancy: 88 },
        { month: "Jun", occupancy: 90 },
      ]
    },
    revenue: {
      current: 1250000,
      previous: 1100000,
      trend: "up",
      data: [
        { month: "Jan", revenue: 950000 },
        { month: "Feb", revenue: 1050000 },
        { month: "Mar", revenue: 1150000 },
        { month: "Apr", revenue: 1200000 },
        { month: "May", revenue: 1250000 },
        { month: "Jun", revenue: 1300000 },
      ]
    },
    bookings: {
      current: 245,
      previous: 220,
      trend: "up",
      data: [
        { month: "Jan", bookings: 180 },
        { month: "Feb", bookings: 200 },
        { month: "Mar", bookings: 220 },
        { month: "Apr", bookings: 235 },
        { month: "May", bookings: 245 },
        { month: "Jun", bookings: 260 },
      ]
    },
    customerSatisfaction: {
      current: 4.5,
      previous: 4.3,
      trend: "up",
      data: [
        { month: "Jan", rating: 4.2 },
        { month: "Feb", rating: 4.3 },
        { month: "Mar", rating: 4.4 },
        { month: "Apr", rating: 4.4 },
        { month: "May", rating: 4.5 },
        { month: "Jun", rating: 4.5 },
      ]
    }
  };

  const reportTypes = [
    {
      id: "occupancy",
      name: "Occupancy Report",
      description: "Room occupancy rates and trends",
      icon: <Hotel />,
      category: "Operations"
    },
    {
      id: "revenue",
      name: "Revenue Report",
      description: "Financial performance and revenue analysis",
      icon: <AttachMoney />,
      category: "Finance"
    },
    {
      id: "bookings",
      name: "Booking Report",
      description: "Booking patterns and customer behavior",
      icon: <EventNote />,
      category: "Operations"
    },
    {
      id: "customerSatisfaction",
      name: "Customer Satisfaction",
      description: "Customer feedback and ratings",
      icon: <Star />,
      category: "Customer Service"
    },
    {
      id: "staffPerformance",
      name: "Staff Performance",
      description: "Employee productivity and ratings",
      icon: <People />,
      category: "HR"
    },
    {
      id: "foodServices",
      name: "Food Services",
      description: "Catering and food service analytics",
      icon: <Restaurant />,
      category: "Services"
    },
    {
      id: "maintenance",
      name: "Maintenance Report",
      description: "Facility maintenance and repairs",
      icon: <Engineering />,
      category: "Operations"
    },
    {
      id: "security",
      name: "Security Report",
      description: "Security incidents and safety metrics",
      icon: <Security />,
      category: "Security"
    }
  ];

  const generateReport = () => {
    if (!selectedReport) {
      setSnackbar({
        open: true,
        message: "Please select a report type",
        severity: "warning",
      });
      return;
    }

    setSnackbar({
      open: true,
      message: "Report generated successfully!",
      severity: "success",
    });
  };

  const exportReport = (format) => {
    setSnackbar({
      open: true,
      message: `Report exported as ${format.toUpperCase()} successfully!`,
      severity: "success",
    });
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? <TrendingUp color="success" /> : <TrendingDown color="error" />;
  };

  const getTrendColor = (trend) => {
    return trend === "up" ? "success.main" : "error.main";
  };

  const getTrendText = (trend) => {
    return trend === "up" ? "Increased" : "Decreased";
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CoAdminHeader />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, 
            py: { xs: 8, sm: 10 },
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh"
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
                Reports & Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive reports and analytics for hostel management
              </Typography>
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center" 
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={() => exportReport("excel")}
                size={isMobile ? "small" : "medium"}
              >
                Export All
              </Button>
            </Box>
          </Box>

          {/* Quick Stats */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Current Occupancy
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        {mockData.occupancy.current}%
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        {getTrendIcon(mockData.occupancy.trend)}
                        <Typography variant="caption" color={getTrendColor(mockData.occupancy.trend)}>
                          {getTrendText(mockData.occupancy.trend)} from last month
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                      <Hotel />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Monthly Revenue
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        {formatCurrency(mockData.revenue.current)}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        {getTrendIcon(mockData.revenue.trend)}
                        <Typography variant="caption" color={getTrendColor(mockData.revenue.trend)}>
                          {getTrendText(mockData.revenue.trend)} from last month
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: "success.main", width: 48, height: 48 }}>
                      <AttachMoney />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total Bookings
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        {mockData.bookings.current}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        {getTrendIcon(mockData.bookings.trend)}
                        <Typography variant="caption" color={getTrendColor(mockData.bookings.trend)}>
                          {getTrendText(mockData.bookings.trend)} from last month
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: "info.main", width: 48, height: 48 }}>
                      <EventNote />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Customer Rating
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        {mockData.customerSatisfaction.current}/5
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        {getTrendIcon(mockData.customerSatisfaction.trend)}
                        <Typography variant="caption" color={getTrendColor(mockData.customerSatisfaction.trend)}>
                          {getTrendText(mockData.customerSatisfaction.trend)} from last month
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: "warning.main", width: 48, height: 48 }}>
                      <Star />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Report Generator */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generate Custom Report
              </Typography>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Report Type</InputLabel>
                    <Select
                      value={selectedReport}
                      onChange={(e) => setSelectedReport(e.target.value)}
                      label="Report Type"
                    >
                      {reportTypes.map((report) => (
                        <MenuItem key={report.id} value={report.id}>
                          {report.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Date Range</InputLabel>
                    <Select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      label="Date Range"
                    >
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="thisWeek">This Week</MenuItem>
                      <MenuItem value="thisMonth">This Month</MenuItem>
                      <MenuItem value="thisYear">This Year</MenuItem>
                      <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {dateRange === "custom" && (
                  <>
                    <Grid item xs={12} sm={6} md={2}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <TextField
                        fullWidth
                        label="End Date"
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="contained"
                    startIcon={<Assessment />}
                    onClick={generateReport}
                    fullWidth
                  >
                    Generate
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Report Categories */}
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Operations" />
            <Tab label="Finance" />
            <Tab label="Customer Service" />
            <Tab label="HR" />
            <Tab label="Services" />
            <Tab label="Security" />
          </Tabs>

          {/* Operations Reports */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Occupancy Trends
                    </Typography>
                    <Box height={300} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        Chart placeholder - Occupancy data visualization
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Booking Patterns
                    </Typography>
                    <Box height={300} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        Chart placeholder - Booking patterns visualization
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Maintenance Requests
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Request ID</TableCell>
                            <TableCell>Room/Area</TableCell>
                            <TableCell>Issue</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>MR001</TableCell>
                            <TableCell>Room A-101</TableCell>
                            <TableCell>AC not working</TableCell>
                            <TableCell>
                              <Chip label="High" color="error" size="small" />
                            </TableCell>
                            <TableCell>
                              <Chip label="In Progress" color="warning" size="small" />
                            </TableCell>
                            <TableCell>2024-01-15</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>MR002</TableCell>
                            <TableCell>Kitchen</TableCell>
                            <TableCell>Water leakage</TableCell>
                            <TableCell>
                              <Chip label="Medium" color="warning" size="small" />
                            </TableCell>
                            <TableCell>
                              <Chip label="Completed" color="success" size="small" />
                            </TableCell>
                            <TableCell>2024-01-14</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Finance Reports */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Revenue Trends
                    </Typography>
                    <Box height={300} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        Chart placeholder - Revenue trends visualization
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Expense Breakdown
                    </Typography>
                    <Box height={300} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        Chart placeholder - Expense breakdown pie chart
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Financial Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="success.main" fontWeight="bold">
                            {formatCurrency(mockData.revenue.current)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Revenue
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="error.main" fontWeight="bold">
                            ₹850,000
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Expenses
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="primary.main" fontWeight="bold">
                            ₹400,000
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Net Profit
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="info.main" fontWeight="bold">
                            32%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Profit Margin
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Customer Service Reports */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Customer Satisfaction Trends
                    </Typography>
                    <Box height={300} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        Chart placeholder - Customer satisfaction trends
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Feedback Categories
                    </Typography>
                    <Box height={300} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        Chart placeholder - Feedback categories distribution
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Customer Reviews
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>R</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Rahul Sharma"
                          secondary={
                            <Box>
                              <Rating value={5} size="small" readOnly />
                              <Typography variant="body2">
                                "Excellent service and clean rooms. Staff is very helpful."
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Typography variant="caption" color="text.secondary">
                            2 days ago
                          </Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>P</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Priya Patel"
                          secondary={
                            <Box>
                              <Rating value={4} size="small" readOnly />
                              <Typography variant="body2">
                                "Good food and comfortable stay. Would recommend."
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Typography variant="caption" color="text.secondary">
                            5 days ago
                          </Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Export Options */}
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Export Reports
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<FileDownload />}
                    onClick={() => exportReport("excel")}
                    fullWidth
                  >
                    Excel
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<PictureAsPdf />}
                    onClick={() => exportReport("pdf")}
                    fullWidth
                  >
                    PDF
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Print />}
                    onClick={() => exportReport("print")}
                    fullWidth
                  >
                    Print
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    onClick={() => exportReport("share")}
                    fullWidth
                  >
                    Share
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

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