import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  // useTheme,
  // useMediaQuery,
  Divider,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import People from "@mui/icons-material/People";
import Hotel from "@mui/icons-material/Hotel";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Star from "@mui/icons-material/Star";
import Search from "@mui/icons-material/Search";
import FilterList from "@mui/icons-material/FilterList";
import Refresh from "@mui/icons-material/Refresh";
import Download from "@mui/icons-material/Download";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import Notifications from "@mui/icons-material/Notifications";
import Schedule from "@mui/icons-material/Schedule";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Warning from "@mui/icons-material/Warning";
import Error from "@mui/icons-material/Error";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import UserStayRequest from "./UserStayRequest/UserStayRequest.jsx";

export default function HostelAdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  
  const [selectedCategory, setSelectedCategory] = useState("Hostels");
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  // Enhanced Mock Data
  const metrics = [
    {
      title: "Total Revenue",
      value: "₹2,45,000",
      change: "+12.5%",
      trend: "up",
      icon: <AttachMoney color="primary" />,
      color: "#4CAF50",
    },
    {
      title: "Total Bookings",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: <Hotel color="primary" />,
      color: "#2196F3",
    },
    {
      title: "Active Residents",
      value: "892",
      change: "+5.1%",
      trend: "up",
      icon: <People color="primary" />,
      color: "#FF9800",
    },
    {
      title: "Occupancy Rate",
      value: "94.2%",
      change: "+2.3%",
      trend: "up",
      icon: <Star color="primary" />,
      color: "#9C27B0",
    },
    {
      title: "Pending Requests",
      value: "23",
      change: "-15.2%",
      trend: "down",
      icon: <Schedule color="primary" />,
      color: "#F44336",
    },
    {
      title: "Customer Rating",
      value: "4.6/5",
      change: "+0.2",
      trend: "up",
      icon: <Star color="primary" />,
      color: "#FFC107",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000, bookings: 45 },
    { month: "Feb", revenue: 52000, bookings: 52 },
    { month: "Mar", revenue: 48000, bookings: 48 },
    { month: "Apr", revenue: 61000, bookings: 61 },
    { month: "May", revenue: 55000, bookings: 55 },
    { month: "Jun", revenue: 67000, bookings: 67 },
  ];

  const occupancyData = [
    { name: "Occupied", value: 94, color: "#4CAF50" },
    { name: "Available", value: 6, color: "#2196F3" },
  ];

  // Additional detailed data
  const roomTypes = [
    { type: "Standard Single", count: 45, occupied: 42, revenue: 189000 },
    { type: "Standard Double", count: 30, occupied: 28, revenue: 168000 },
    { type: "Deluxe Room", count: 20, occupied: 18, revenue: 144000 },
    { type: "Suite", count: 10, occupied: 8, revenue: 96000 },
    { type: "Dormitory", count: 15, occupied: 12, revenue: 72000 },
  ];

  const weeklyOccupancy = [
    { day: "Mon", occupancy: 85, revenue: 45000, checkins: 12 },
    { day: "Tue", occupancy: 88, revenue: 48000, checkins: 15 },
    { day: "Wed", occupancy: 92, revenue: 52000, checkins: 18 },
    { day: "Thu", occupancy: 95, revenue: 55000, checkins: 20 },
    { day: "Fri", occupancy: 98, revenue: 58000, checkins: 22 },
    { day: "Sat", occupancy: 96, revenue: 56000, checkins: 19 },
    { day: "Sun", occupancy: 89, revenue: 49000, checkins: 14 },
  ];

  const customerSatisfaction = [
    { aspect: "Cleanliness", rating: 4.8 },
    { aspect: "Staff Service", rating: 4.6 },
    { aspect: "Room Comfort", rating: 4.7 },
    { aspect: "Food Quality", rating: 4.5 },
    { aspect: "Value for Money", rating: 4.4 },
    { aspect: "Location", rating: 4.9 },
  ];

  const maintenanceRequests = [
    { id: "MR001", room: "A-101", issue: "AC not working", priority: "High", status: "In Progress", assigned: "Tech Team" },
    { id: "MR002", room: "B-205", issue: "Water leakage", priority: "Medium", status: "Completed", assigned: "Plumber" },
    { id: "MR003", room: "C-103", issue: "Light bulb replacement", priority: "Low", status: "Pending", assigned: "Electrician" },
    { id: "MR004", room: "D-401", issue: "WiFi connectivity", priority: "High", status: "In Progress", assigned: "IT Team" },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "Rahul Sharma",
      room: "A-101",
      checkIn: "2024-01-15",
      checkOut: "2024-01-20",
      amount: "₹8,000",
      status: "Confirmed",
    },
    {
      id: 2,
      guest: "Priya Patel",
      room: "B-205",
      checkIn: "2024-01-16",
      checkOut: "2024-01-25",
      amount: "₹12,000",
      status: "Pending",
    },
    {
      id: 3,
      guest: "Amit Kumar",
      room: "C-103",
      checkIn: "2024-01-17",
      checkOut: "2024-01-22",
      amount: "₹6,000",
      status: "Confirmed",
    },
    {
      id: 4,
      guest: "Neha Singh",
      room: "A-203",
      checkIn: "2024-01-18",
      checkOut: "2024-01-30",
      amount: "₹18,000",
      status: "Confirmed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <TrendingUp sx={{ color: "#4CAF50" }} />
    ) : (
      <TrendingDown sx={{ color: "#F44336" }} />
    );
  };

  return (
    <React.Fragment>
      <Box sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden"
      }}>
        <CommonHeader role="coadmin" />
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
          {/* Header Section */}
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
                variant={{ xs: "h5", md: "h4" }} 
                fontWeight="bold"
                color="primary"
              >
                Hostel Management Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive monitoring and management of hostel operations, bookings, and performance metrics
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Typography variant="caption" color="text.secondary">
                  Last updated: {new Date().toLocaleDateString()}
                </Typography>
                <Chip label="Live Data" size="small" color="success" variant="outlined" />
                <Chip label="24/7 Monitoring" size="small" color="info" variant="outlined" />
              </Box>
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center" 
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
              width={{ xs: "100%", md: "auto" }}
            >
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                size="small"
                sx={{ 
                  minWidth: { xs: "100%", sm: 120 },
                  bgcolor: "background.paper",
                  borderRadius: 1
                }}
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
              
              <TextField
                placeholder="Search bookings, rooms, guests..."
                size="small"
                InputProps={{ 
                  startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  minWidth: { xs: "100%", sm: 250 },
                  bgcolor: "background.paper",
                  borderRadius: 1
                }}
              />
              
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  size="small"
                >
                  Refresh
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  size="small"
                >
                  Export
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Metrics Cards */}
          <Grid container spacing={3} mb={4}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card 
                  sx={{ 
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {metric.title}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {metric.value}
                    </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          {getTrendIcon(metric.trend)}
                          <Typography 
                            variant="body2" 
                            color={metric.trend === "up" ? "success.main" : "error.main"}
                          >
                            {metric.change}
                    </Typography>
                        </Box>
                      </Box>
                      <Avatar 
                        sx={{ 
                          bgcolor: metric.color + "20",
                          color: metric.color,
                          width: 48,
                          height: 48
                        }}
                      >
                        {metric.icon}
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={3} mb={4}>
            {/* Revenue Chart */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Revenue & Bookings Trend
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      {/* <RechartsTooltip /> */}
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#4CAF50" 
                        strokeWidth={2}
                        name="Revenue (₹)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="#2196F3" 
                        strokeWidth={2}
                        name="Bookings"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Occupancy Chart */}
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Occupancy Rate
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={occupancyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {occupancyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      {/* <RechartsTooltip /> */}
                    </PieChart>
                  </ResponsiveContainer>
                  <Box textAlign="center" mt={2}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      94%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Occupancy
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
                      </Grid>
        </Grid>

          {/* Additional Analytics Section */}
          <Grid container spacing={3} mb={4}>
            {/* Room Type Performance */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Room Type Performance
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={roomTypes}>
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Weekly Occupancy Trends */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Weekly Occupancy Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={weeklyOccupancy}>
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="occupancy" 
                        fill="#4CAF50" 
                        stroke="#4CAF50"
                        fillOpacity={0.3}
                        name="Occupancy %"
                      />
                      <Bar yAxisId="right" dataKey="checkins" fill="#2196F3" radius={[4, 4, 0, 0]} name="Check-ins" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Customer Satisfaction and Maintenance */}
          <Grid container spacing={3} mb={4}>
            {/* Customer Satisfaction Radar */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Customer Satisfaction Metrics
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={customerSatisfaction}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="aspect" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Rating" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Maintenance Requests */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Active Maintenance Requests
                  </Typography>
                  <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {maintenanceRequests.map((request) => (
                      <Box key={request.id} sx={{ 
                        p: 2, 
                        mb: 1, 
                        border: '1px solid #e0e0e0', 
                        borderRadius: 1,
                        '&:hover': { backgroundColor: theme.palette.action.hover }
                      }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {request.id} - {request.room}
                          </Typography>
                          <Chip 
                            label={request.priority} 
                            size="small" 
                            color={request.priority === "High" ? "error" : request.priority === "Medium" ? "warning" : "success"}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          {request.issue}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            Assigned: {request.assigned}
                          </Typography>
                          <Chip 
                            label={request.status} 
                            size="small" 
                            color={request.status === "Completed" ? "success" : request.status === "In Progress" ? "warning" : "default"}
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Quick Stats Summary */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    ₹6,69,000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue (This Month)
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <TrendingUp sx={{ color: "success.main" }} />
                    <Typography variant="caption" color="success.main">
                      +15.2% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    142
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Rooms Available
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Hotel sx={{ color: "primary.main" }} />
                    <Typography variant="caption" color="primary.main">
                      94% occupancy rate
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    4.6/5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Customer Rating
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Star sx={{ color: "warning.main" }} />
                    <Typography variant="caption" color="warning.main">
                      Based on 1,247 reviews
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    23
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Requests
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Schedule sx={{ color: "info.main" }} />
                    <Typography variant="caption" color="info.main">
                      4 high priority
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Bookings Table */}
          <Card>
            <CardContent>
              <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="center"
                mb={3}
                flexDirection={{ xs: "column", sm: "row" }}
                gap={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Recent Bookings
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    size="small"
                  >
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="small"
                  >
                    New Booking
            </Button>
                </Box>
              </Box>

              <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                      <TableCell>Guest</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Check-in</TableCell>
                      <TableCell>Check-out</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {booking.guest.charAt(0)}
                            </Avatar>
                            <Typography variant="body2">
                              {booking.guest}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{booking.room}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {booking.amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={booking.status}
                            color={getStatusColor(booking.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <Tooltip title="View Details">
                              <IconButton size="small" color="primary">
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small" color="secondary">
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" color="error">
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* User Stay Requests Section */}
          {/* <Box mt={4}>
          <UserStayRequest />
          </Box> */}
        </Box>
      </Box>
    </React.Fragment>
  );
}
