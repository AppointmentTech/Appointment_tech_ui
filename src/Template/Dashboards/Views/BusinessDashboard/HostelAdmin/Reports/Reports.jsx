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
import { BarChart as RechartsBarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import CoAdminHeader from "@template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
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
    // Additional chart data
    occupancyTrends: [
      { month: "Jan", occupancy: 75, revenue: 450000, bookings: 180 },
      { month: "Feb", occupancy: 80, revenue: 520000, bookings: 200 },
      { month: "Mar", occupancy: 82, revenue: 580000, bookings: 220 },
      { month: "Apr", occupancy: 85, revenue: 650000, bookings: 235 },
      { month: "May", occupancy: 88, revenue: 720000, bookings: 245 },
      { month: "Jun", occupancy: 90, revenue: 780000, bookings: 260 },
    ],
    bookingPatterns: [
      { day: "Mon", bookings: 45, checkins: 38, checkouts: 32 },
      { day: "Tue", bookings: 52, checkins: 45, checkouts: 40 },
      { day: "Wed", bookings: 48, checkins: 42, checkouts: 35 },
      { day: "Thu", bookings: 55, checkins: 48, checkouts: 42 },
      { day: "Fri", bookings: 62, checkins: 55, checkouts: 48 },
      { day: "Sat", bookings: 58, checkins: 52, checkouts: 45 },
      { day: "Sun", bookings: 50, checkins: 45, checkouts: 38 },
    ],
    revenueBreakdown: [
      { category: "Room Rent", value: 65, color: "#0088FE" },
      { category: "Food Services", value: 20, color: "#00C49F" },
      { category: "Laundry", value: 8, color: "#FFBB28" },
      { category: "Other Services", value: 7, color: "#FF8042" },
    ],
    expenseBreakdown: [
      { category: "Staff Salaries", value: 45, color: "#FF6B6B" },
      { category: "Utilities", value: 25, color: "#4ECDC4" },
      { category: "Maintenance", value: 15, color: "#45B7D1" },
      { category: "Food Supplies", value: 10, color: "#96CEB4" },
      { category: "Other", value: 5, color: "#FFEAA7" },
    ],
    customerSatisfaction: [
      { aspect: "Cleanliness", rating: 4.8 },
      { aspect: "Staff Service", rating: 4.6 },
      { aspect: "Room Comfort", rating: 4.7 },
      { aspect: "Food Quality", rating: 4.5 },
      { aspect: "Value for Money", rating: 4.4 },
      { aspect: "Location", rating: 4.9 },
    ],
    staffPerformance: [
      { name: "John Doe", attendance: 95, rating: 4.5, tasks: 45 },
      { name: "Jane Smith", attendance: 92, rating: 4.7, tasks: 52 },
      { name: "Mike Johnson", attendance: 88, rating: 4.3, tasks: 38 },
      { name: "Sarah Wilson", attendance: 96, rating: 4.8, tasks: 48 },
      { name: "David Brown", attendance: 90, rating: 4.4, tasks: 42 },
    ],
    serviceUsage: [
      { service: "Breakfast", usage: 85, revenue: 125000, rating: 4.5 },
      { service: "Lunch", usage: 65, revenue: 147000, rating: 4.2 },
      { service: "Dinner", usage: 75, revenue: 168000, rating: 4.3 },
      { service: "Laundry", usage: 45, revenue: 45000, rating: 4.0 },
      { service: "WiFi", usage: 95, revenue: 25000, rating: 4.6 },
    ],
    securityIncidents: [
      { month: "Jan", incidents: 2, resolved: 2, pending: 0 },
      { month: "Feb", incidents: 1, resolved: 1, pending: 0 },
      { month: "Mar", incidents: 3, resolved: 2, pending: 1 },
      { month: "Apr", incidents: 0, resolved: 0, pending: 0 },
      { month: "May", incidents: 1, resolved: 1, pending: 0 },
      { month: "Jun", incidents: 2, resolved: 2, pending: 0 },
    ],
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
            <Tab label="Operations" icon={<Engineering />} />
            <Tab label="Finance" icon={<AttachMoney />} />
            <Tab label="Customer Service" icon={<Star />} />
            <Tab label="HR" icon={<People />} />
            <Tab label="Services" icon={<Restaurant />} />
            <Tab label="Security" icon={<Security />} />
          </Tabs>

          {/* Operations Reports */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Occupancy Trends
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockData.occupancyTrends}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [
                          name === 'occupancy' ? `${value}%` : `₹${value.toLocaleString()}`,
                          name === 'occupancy' ? 'Occupancy' : name === 'revenue' ? 'Revenue' : 'Bookings'
                        ]} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="occupancy" 
                          stroke="#4CAF50" 
                          strokeWidth={3}
                          dot={{ fill: '#4CAF50', strokeWidth: 2, r: 5 }}
                          name="Occupancy %"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#2196F3" 
                          strokeWidth={2}
                          dot={{ fill: '#2196F3', strokeWidth: 2, r: 4 }}
                          name="Revenue"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Weekly Booking Patterns
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={mockData.bookingPatterns}>
                        <XAxis dataKey="day" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" radius={[4, 4, 0, 0]} name="Bookings" />
                        <Line yAxisId="right" type="monotone" dataKey="checkins" stroke="#82ca9d" strokeWidth={2} name="Check-ins" />
                        <Line yAxisId="right" type="monotone" dataKey="checkouts" stroke="#ffc658" strokeWidth={2} name="Check-outs" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Operations Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="primary.main" fontWeight="bold">
                            {mockData.occupancy.current}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Current Occupancy
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="success.main" fontWeight="bold">
                            {mockData.bookings.current}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Active Bookings
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="info.main" fontWeight="bold">
                            45
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Available Rooms
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="warning.main" fontWeight="bold">
                            8
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Pending Requests
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
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
                            <TableCell>Actions</TableCell>
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
                            <TableCell>
                              <IconButton size="small" color="primary">
                                <Visibility />
                              </IconButton>
                              <IconButton size="small" color="secondary">
                                <Edit />
                              </IconButton>
                            </TableCell>
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
                            <TableCell>
                              <IconButton size="small" color="primary">
                                <Visibility />
                              </IconButton>
                              <IconButton size="small" color="secondary">
                                <Edit />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>MR003</TableCell>
                            <TableCell>Room B-205</TableCell>
                            <TableCell>Light bulb replacement</TableCell>
                            <TableCell>
                              <Chip label="Low" color="success" size="small" />
                            </TableCell>
                            <TableCell>
                              <Chip label="Pending" color="default" size="small" />
                            </TableCell>
                            <TableCell>2024-01-16</TableCell>
                            <TableCell>
                              <IconButton size="small" color="primary">
                                <Visibility />
                              </IconButton>
                              <IconButton size="small" color="secondary">
                                <Edit />
                              </IconButton>
                            </TableCell>
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
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Revenue Breakdown
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={mockData.revenueBreakdown}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={60}
                          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {mockData.revenueBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Expense Breakdown
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={mockData.expenseBreakdown}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={60}
                          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {mockData.expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
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
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Transactions
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>TXN001</TableCell>
                            <TableCell>
                              <Chip label="Income" color="success" size="small" />
                            </TableCell>
                            <TableCell>₹15,000</TableCell>
                            <TableCell>Room booking payment</TableCell>
                            <TableCell>2024-01-15</TableCell>
                            <TableCell>
                              <Chip label="Completed" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>TXN002</TableCell>
                            <TableCell>
                              <Chip label="Expense" color="error" size="small" />
                            </TableCell>
                            <TableCell>₹8,500</TableCell>
                            <TableCell>Maintenance supplies</TableCell>
                            <TableCell>2024-01-14</TableCell>
                            <TableCell>
                              <Chip label="Completed" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>TXN003</TableCell>
                            <TableCell>
                              <Chip label="Income" color="success" size="small" />
                            </TableCell>
                            <TableCell>₹12,000</TableCell>
                            <TableCell>Food service payment</TableCell>
                            <TableCell>2024-01-13</TableCell>
                            <TableCell>
                              <Chip label="Pending" color="warning" size="small" />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Customer Service Reports */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Customer Satisfaction Radar
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={mockData.customerSatisfaction}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="aspect" />
                        <PolarRadiusAxis angle={90} domain={[0, 5]} />
                        <Radar
                          name="Rating"
                          dataKey="rating"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Satisfaction Trends
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockData.customerSatisfaction.data}>
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip formatter={(value) => [`${value}/5`, 'Rating']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="rating" 
                          stroke="#4CAF50" 
                          strokeWidth={3}
                          dot={{ fill: '#4CAF50', strokeWidth: 2, r: 5 }}
                          name="Customer Rating"
                        />
                      </LineChart>
                    </ResponsiveContainer>
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

          {/* HR Reports */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Staff Performance Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={mockData.staffPerformance}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attendance" fill="#8884d8" name="Attendance %" />
                        <Bar dataKey="rating" fill="#82ca9d" name="Rating" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Task Completion vs Rating
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={mockData.staffPerformance}>
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="tasks" fill="#8884d8" radius={[4, 4, 0, 0]} name="Tasks Completed" />
                        <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#82ca9d" strokeWidth={2} name="Rating" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Staff Performance Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="success.main" fontWeight="bold">
                            95%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Average Attendance
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="primary.main" fontWeight="bold">
                            4.2/5
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Average Rating
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="info.main" fontWeight="bold">
                            12
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Active Staff
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="warning.main" fontWeight="bold">
                            2
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Training Required
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Services Reports */}
          {activeTab === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Service Usage vs Revenue
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={mockData.serviceUsage}>
                        <XAxis dataKey="service" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip formatter={(value, name) => [
                          name === 'usage' ? `${value}%` : `₹${value.toLocaleString()}`,
                          name === 'usage' ? 'Usage %' : 'Revenue'
                        ]} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="usage" fill="#8884d8" radius={[4, 4, 0, 0]} name="Usage %" />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} name="Revenue" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Service Ratings
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={mockData.serviceUsage}>
                        <XAxis dataKey="service" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip formatter={(value) => [`${value}/5`, 'Rating']} />
                        <Legend />
                        <Bar dataKey="rating" fill="#ffc658" radius={[4, 4, 0, 0]} name="Rating" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Service Performance Metrics
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Service Type</TableCell>
                            <TableCell>Usage Count</TableCell>
                            <TableCell>Revenue</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Breakfast</TableCell>
                            <TableCell>1,250</TableCell>
                            <TableCell>₹125,000</TableCell>
                            <TableCell>
                              <Rating value={4.5} size="small" readOnly />
                            </TableCell>
                            <TableCell>
                              <Chip label="Active" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Lunch</TableCell>
                            <TableCell>980</TableCell>
                            <TableCell>₹147,000</TableCell>
                            <TableCell>
                              <Rating value={4.2} size="small" readOnly />
                            </TableCell>
                            <TableCell>
                              <Chip label="Active" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Dinner</TableCell>
                            <TableCell>1,120</TableCell>
                            <TableCell>₹168,000</TableCell>
                            <TableCell>
                              <Rating value={4.3} size="small" readOnly />
                            </TableCell>
                            <TableCell>
                              <Chip label="Active" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Laundry</TableCell>
                            <TableCell>450</TableCell>
                            <TableCell>₹45,000</TableCell>
                            <TableCell>
                              <Rating value={4.0} size="small" readOnly />
                            </TableCell>
                            <TableCell>
                              <Chip label="Active" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Security Reports */}
          {activeTab === 5 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Security Incidents Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={mockData.securityIncidents}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="incidents" fill="#ff6b6b" radius={[4, 4, 0, 0]} name="Total Incidents" />
                        <Line type="monotone" dataKey="resolved" stroke="#4CAF50" strokeWidth={2} name="Resolved" />
                        <Line type="monotone" dataKey="pending" stroke="#ff9800" strokeWidth={2} name="Pending" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Monthly Incident Trends
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={mockData.securityIncidents}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="incidents" 
                          stackId="1"
                          stroke="#ff6b6b" 
                          fill="#ff6b6b" 
                          fillOpacity={0.6}
                          name="Total Incidents"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="resolved" 
                          stackId="2"
                          stroke="#4CAF50" 
                          fill="#4CAF50" 
                          fillOpacity={0.6}
                          name="Resolved"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Security Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="success.main" fontWeight="bold">
                            0
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Major Incidents
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="warning.main" fontWeight="bold">
                            3
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Minor Incidents
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="info.main" fontWeight="bold">
                            24/7
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Security Coverage
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="primary.main" fontWeight="bold">
                            100%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            CCTV Coverage
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Security Logs
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Event Type</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Severity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>2024-01-15 14:30</TableCell>
                            <TableCell>Access Entry</TableCell>
                            <TableCell>Main Gate</TableCell>
                            <TableCell>Authorized entry - Staff ID: ST001</TableCell>
                            <TableCell>
                              <Chip label="Low" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2024-01-15 13:45</TableCell>
                            <TableCell>Access Exit</TableCell>
                            <TableCell>Back Gate</TableCell>
                            <TableCell>Authorized exit - Staff ID: ST002</TableCell>
                            <TableCell>
                              <Chip label="Low" color="success" size="small" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2024-01-15 12:20</TableCell>
                            <TableCell>Unauthorized Access</TableCell>
                            <TableCell>Kitchen Area</TableCell>
                            <TableCell>Unauthorized access attempt - Resolved</TableCell>
                            <TableCell>
                              <Chip label="Medium" color="warning" size="small" />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
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