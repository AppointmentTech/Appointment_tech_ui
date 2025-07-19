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
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import CoAdminHeader from "Template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
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
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold"
                color="primary"
              >
                Hostel Management Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor and manage your hostel operations efficiently
            </Typography>
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
                  minWidth: 120,
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
                placeholder="Search..."
                size="small"
                InputProps={{ 
                  startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  minWidth: 200,
                  bgcolor: "background.paper",
                  borderRadius: 1
                }}
              />
              
              <Button
                variant="contained"
                startIcon={<Refresh />}
                size="small"
              >
                Refresh
              </Button>
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
          <Box mt={4}>
          <UserStayRequest />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
