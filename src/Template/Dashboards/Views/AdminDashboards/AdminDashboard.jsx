import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { BarChart as RechartsBarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart } from "recharts";
import { TextField, Grid, Box, Typography, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar, Divider, LinearProgress, Stack, IconButton, Tooltip as MuiTooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import StarIcon from "@mui/icons-material/Star";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AdminHeader from "../../Components/AdminHeader/AdminHeader.jsx";
import { sidebarData } from "CommonComponents/SidebarData.js";
import { useTheme } from "@mui/material/styles";

const AdminDashboard = () => {
  const theme = useTheme();
  const [selectedBusiness, setSelectedBusiness] = useState("All Businesses");
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all business types from sidebar data
  const businessTypes = ["All Businesses", ...sidebarData.sections.map(section => section.name)];

  // Mock Data for different business types
  const getBusinessData = (businessType) => {
    const baseData = {
      "All Businesses": {
        counters: [
          { label: "Total Revenue", value: "₹2,450,000", icon: <AttachMoneyIcon />, trend: "+12.5%", color: "#4CAF50" },
          { label: "Total Bookings", value: "15,200", icon: <BookOnlineIcon />, trend: "+8.3%", color: "#2196F3" },
          { label: "Active Customers", value: "8,450", icon: <PeopleIcon />, trend: "+15.2%", color: "#FF9800" },
          { label: "Customer Satisfaction", value: "94.2%", icon: <StarIcon />, trend: "+2.1%", color: "#9C27B0" },
          { label: "Pending Approvals", value: "156", icon: <TrendingUpIcon />, trend: "-5.8%", color: "#F44336" },
          { label: "Monthly Growth", value: "18.7%", icon: <TrendingUpIcon />, trend: "+3.2%", color: "#00BCD4" },
        ],
        // Additional detailed data
        performanceMetrics: [
          { metric: "Average Booking Value", value: "₹16,200", change: "+5.2%", status: "up" },
          { metric: "Customer Retention Rate", value: "87.3%", change: "+2.8%", status: "up" },
          { metric: "Response Time", value: "2.3 min", change: "-12.5%", status: "up" },
          { metric: "Conversion Rate", value: "23.8%", change: "+4.1%", status: "up" },
        ],
        locationData: [
          { city: "Mumbai", revenue: 450000, bookings: 2800, growth: "+18.2%" },
          { city: "Delhi", revenue: 380000, bookings: 2200, growth: "+15.8%" },
          { city: "Bangalore", revenue: 320000, bookings: 1900, growth: "+22.1%" },
          { city: "Chennai", revenue: 280000, bookings: 1600, growth: "+12.4%" },
          { city: "Hyderabad", revenue: 250000, bookings: 1400, growth: "+19.7%" },
        ],
        weeklyTrends: [
          { week: "Week 1", revenue: 180000, bookings: 1100, customers: 850 },
          { week: "Week 2", revenue: 195000, bookings: 1200, customers: 920 },
          { week: "Week 3", revenue: 210000, bookings: 1300, customers: 980 },
          { week: "Week 4", revenue: 225000, bookings: 1400, customers: 1050 },
        ],
        barData: [
          { name: "Jan", revenue: 450000, bookings: 1200, customers: 850 },
          { name: "Feb", revenue: 520000, bookings: 1350, customers: 920 },
          { name: "Mar", revenue: 480000, bookings: 1180, customers: 880 },
          { name: "Apr", revenue: 600000, bookings: 1500, customers: 1050 },
          { name: "May", revenue: 580000, bookings: 1420, customers: 980 },
          { name: "Jun", revenue: 650000, bookings: 1600, customers: 1120 },
        ],
        pieData: [
          { name: "Hostels", value: 35, color: "#0088FE" },
          { name: "Hospitals", value: 25, color: "#00C49F" },
          { name: "Garages", value: 15, color: "#FFBB28" },
          { name: "Beauty & Tattoo", value: 10, color: "#FF8042" },
          { name: "Food Catering", value: 10, color: "#8884D8" },
          { name: "Professional Services", value: 5, color: "#82CA9D" },
        ],
        tableData: [
          { id: 1, business: "Hostels", revenue: "₹850,000", bookings: 5200, customers: 3200, growth: "+15.2%" },
          { id: 2, business: "Hospitals", revenue: "₹620,000", bookings: 3800, customers: 2800, growth: "+12.8%" },
          { id: 3, business: "Garages", revenue: "₹380,000", bookings: 2200, customers: 1500, growth: "+8.5%" },
          { id: 4, business: "Beauty & Tattoo", revenue: "₹280,000", bookings: 1800, customers: 1200, growth: "+18.3%" },
          { id: 5, business: "Food Catering", revenue: "₹220,000", bookings: 1400, customers: 900, growth: "+22.1%" },
          { id: 6, business: "Professional Services", revenue: "₹100,000", bookings: 800, customers: 500, growth: "+5.7%" },
        ]
      },
      "Hostels": {
        counters: [
          { label: "Total Revenue", value: "₹850,000", icon: <AttachMoneyIcon />, trend: "+15.2%", color: "#4CAF50" },
          { label: "Total Bookings", value: "5,200", icon: <BookOnlineIcon />, trend: "+12.8%", color: "#2196F3" },
          { label: "Active Rooms", value: "1,250", icon: <PeopleIcon />, trend: "+8.5%", color: "#FF9800" },
          { label: "Customer Satisfaction", value: "96.5%", icon: <StarIcon />, trend: "+3.2%", color: "#9C27B0" },
          { label: "Occupancy Rate", value: "87.3%", icon: <TrendingUpIcon />, trend: "+5.8%", color: "#00BCD4" },
          { label: "Average Stay", value: "3.2 days", icon: <TrendingUpIcon />, trend: "+1.2%", color: "#F44336" },
        ],
        barData: [
          { name: "Jan", revenue: 120000, bookings: 320, rooms: 280 },
          { name: "Feb", revenue: 140000, bookings: 380, rooms: 320 },
          { name: "Mar", revenue: 130000, bookings: 350, rooms: 300 },
          { name: "Apr", revenue: 160000, bookings: 420, rooms: 380 },
          { name: "May", revenue: 150000, bookings: 400, rooms: 360 },
          { name: "Jun", revenue: 180000, bookings: 480, rooms: 420 },
        ],
        pieData: [
          { name: "Standard Rooms", value: 45, color: "#0088FE" },
          { name: "Deluxe Rooms", value: 30, color: "#00C49F" },
          { name: "Suite Rooms", value: 15, color: "#FFBB28" },
          { name: "Dormitory", value: 10, color: "#FF8042" },
        ],
        tableData: [
          { id: 1, location: "Downtown Hostel", revenue: "₹180,000", bookings: 1200, occupancy: "92%", rating: "4.8", growth: "+12.5%" },
          { id: 2, location: "Airport Hostel", revenue: "₹150,000", bookings: 980, occupancy: "88%", rating: "4.6", growth: "+8.3%" },
          { id: 3, location: "University Hostel", revenue: "₹120,000", bookings: 850, occupancy: "95%", rating: "4.9", growth: "+15.2%" },
          { id: 4, location: "Business Hostel", revenue: "₹200,000", bookings: 1100, occupancy: "85%", rating: "4.7", growth: "+10.8%" },
        ]
      },
      "Hospitals": {
        counters: [
          { label: "Total Revenue", value: "₹620,000", icon: <AttachMoneyIcon />, trend: "+12.8%", color: "#4CAF50" },
          { label: "Total Appointments", value: "3,800", icon: <BookOnlineIcon />, trend: "+10.5%", color: "#2196F3" },
          { label: "Active Patients", value: "2,800", icon: <PeopleIcon />, trend: "+7.2%", color: "#FF9800" },
          { label: "Patient Satisfaction", value: "94.8%", icon: <StarIcon />, trend: "+2.5%", color: "#9C27B0" },
          { label: "Available Doctors", value: "45", icon: <TrendingUpIcon />, trend: "+8.9%", color: "#00BCD4" },
          { label: "Emergency Cases", value: "156", icon: <TrendingUpIcon />, trend: "-3.2%", color: "#F44336" },
        ],
        barData: [
          { name: "Jan", revenue: 95000, appointments: 280, patients: 220 },
          { name: "Feb", revenue: 110000, appointments: 320, patients: 250 },
          { name: "Mar", revenue: 105000, appointments: 300, patients: 240 },
          { name: "Apr", revenue: 125000, appointments: 350, patients: 280 },
          { name: "May", revenue: 120000, appointments: 340, patients: 270 },
          { name: "Jun", revenue: 140000, appointments: 400, patients: 320 },
        ],
        pieData: [
          { name: "General Medicine", value: 40, color: "#0088FE" },
          { name: "Cardiology", value: 25, color: "#00C49F" },
          { name: "Orthopedics", value: 20, color: "#FFBB28" },
          { name: "Pediatrics", value: 15, color: "#FF8042" },
        ],
        tableData: [
          { id: 1, department: "General Medicine", revenue: "₹150,000", appointments: 950, patients: 750, rating: "4.7", growth: "+14.2%" },
          { id: 2, department: "Cardiology", revenue: "₹120,000", appointments: 680, patients: 520, rating: "4.9", growth: "+18.5%" },
          { id: 3, department: "Orthopedics", revenue: "₹100,000", appointments: 580, patients: 450, rating: "4.6", growth: "+9.8%" },
          { id: 4, department: "Pediatrics", revenue: "₹80,000", appointments: 420, patients: 380, rating: "4.8", growth: "+12.3%" },
        ]
      },
      "Garages": {
        counters: [
          { label: "Total Revenue", value: "₹380,000", icon: <AttachMoneyIcon />, trend: "+8.5%", color: "#4CAF50" },
          { label: "Total Services", value: "2,200", icon: <BookOnlineIcon />, trend: "+6.2%", color: "#2196F3" },
          { label: "Active Customers", value: "1,500", icon: <PeopleIcon />, trend: "+9.1%", color: "#FF9800" },
          { label: "Customer Satisfaction", value: "92.3%", icon: <StarIcon />, trend: "+1.8%", color: "#9C27B0" },
          { label: "Available Technicians", value: "28", icon: <TrendingUpIcon />, trend: "+12.5%", color: "#00BCD4" },
          { label: "Pending Repairs", value: "45", icon: <TrendingUpIcon />, trend: "-8.2%", color: "#F44336" },
        ],
        barData: [
          { name: "Jan", revenue: 55000, services: 320, customers: 220 },
          { name: "Feb", revenue: 62000, services: 380, customers: 250 },
          { name: "Mar", revenue: 58000, services: 350, customers: 240 },
          { name: "Apr", revenue: 70000, services: 420, customers: 280 },
          { name: "May", revenue: 68000, services: 400, customers: 270 },
          { name: "Jun", revenue: 78000, services: 480, customers: 320 },
        ],
        pieData: [
          { name: "Oil Change", value: 35, color: "#0088FE" },
          { name: "Brake Service", value: 25, color: "#00C49F" },
          { name: "Engine Repair", value: 20, color: "#FFBB28" },
          { name: "Tire Service", value: 20, color: "#FF8042" },
        ],
        tableData: [
          { id: 1, service: "Oil Change", revenue: "₹85,000", services: 520, customers: 480, rating: "4.5", growth: "+11.2%" },
          { id: 2, service: "Brake Service", revenue: "₹75,000", services: 380, customers: 350, rating: "4.7", growth: "+8.5%" },
          { id: 3, service: "Engine Repair", revenue: "₹120,000", services: 280, customers: 250, rating: "4.6", growth: "+15.8%" },
          { id: 4, service: "Tire Service", revenue: "₹60,000", services: 320, customers: 300, rating: "4.4", growth: "+6.3%" },
        ]
      }
    };

    return baseData[businessType] || baseData["All Businesses"];
  };

  const currentData = getBusinessData(selectedBusiness);

  return (
    <React.Fragment>
      <Box sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden"
      }}>
        <AdminHeader />
        <Box sx={{ 
          flexGrow: 1, 
          p: 3, 
          pt: 10,
          overflow: "auto",
          height: "100vh",
          backgroundColor: theme.palette.background.default
          // backgroundColor: "#f5f5f5"
        }}>
      {/* Header */}
          <Box 
            display="flex" 
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between" 
            alignItems={{ xs: "flex-start", md: "center" }} 
            mb={3}
            gap={2}
          >
            <Box>
              <Typography 
                variant={{ xs: "h5", md: "h4" }} 
                fontWeight="bold" 
                gutterBottom
                color="primary"
              >
                {selectedBusiness} Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedBusiness === "All Businesses" 
                  ? "Comprehensive overview of all business performance metrics and analytics" 
                  : `Detailed performance metrics and analytics for ${selectedBusiness} operations`
                }
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Typography variant="caption" color="text.secondary">
                  Last updated: {new Date().toLocaleDateString()}
                </Typography>
                <Chip label="Live Data" size="small" color="success" variant="outlined" />
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
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                displayEmpty
                size="small"
                sx={{ 
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  borderRadius: 1, 
                  minWidth: { xs: "100%", sm: 200 },
                  "& .MuiSelect-select": { py: 1.5 }
                }}
              >
                {businessTypes.map((business) => (
                  <MenuItem 
                    key={business} 
                    value={business}
                    sx={{
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      '&.Mui-selected': {
                        bgcolor: theme.palette.action.selected,
                        color: theme.palette.text.primary,
                      },
                    }}
                  >
                    {business}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                placeholder="Search metrics, reports..."
                size="small"
                InputProps={{ 
                  endAdornment: <SearchIcon />, 
                  sx: { bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, borderRadius: 1 }
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  minWidth: { xs: "100%", sm: 250 },
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  '& .MuiInputBase-input': {
                    color: theme.palette.text.primary,
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<TrendingUpIcon />}
              >
                Export Report
              </Button>
        </Box>
      </Box>

      {/* Counters */}
          <Grid container spacing={3} mb={4}>
            {currentData.counters.map((counter, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}>
              <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Avatar sx={{ 
                        bgcolor: counter.color, 
                        width: { xs: 40, md: 48 }, 
                        height: { xs: 40, md: 48 },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                        {counter.icon}
                      </Avatar>
                      <Chip 
                        label={counter.trend || '0%'} 
                        size="small"
                        color={counter.trend && counter.trend.startsWith('+') ? 'success' : 'error'}
                        sx={{ 
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    <Typography 
                      variant={{ xs: "h6", md: "h5" }} 
                      fontWeight="bold" 
                      gutterBottom
                      color="primary"
                    >
                      {counter.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                  {counter.label}
                </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      {counter.trend && counter.trend.startsWith('+') ? (
                        <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                      ) : (
                        <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        vs last month
                </Typography>
                    </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
          <Grid container spacing={3} mb={4}>
            {/* Revenue Trend Chart */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
              }}>
            <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      Revenue & Performance Trends
              </Typography>
                    <Box display="flex" gap={1}>
                      <Chip label="6 Months" size="small" color="primary" variant="outlined" />
                      <Chip label="Live Data" size="small" color="success" />
                    </Box>
                  </Box>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={currentData.barData}>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#e0e0e0' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickFormatter={(value) => 
                          value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value
                        }
                      />
                      <RechartsTooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                          name === 'revenue' ? 'Revenue' : name === 'bookings' ? 'Bookings' : 'Customers'
                        ]}
                        labelStyle={{ fontWeight: 'bold' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8884d8" 
                        strokeWidth={3}
                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8, stroke: '#8884d8', strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2 }}
                      />
                </LineChart>
              </ResponsiveContainer>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="caption" color="text.secondary">
                      Data updated every 15 minutes
                    </Typography>
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                  </Box>
            </CardContent>
          </Card>
        </Grid>

            {/* Distribution Chart */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
              }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {selectedBusiness === "All Businesses" ? "Business Distribution" : "Service Distribution"}
                    </Typography>
                    <Chip label="Current Month" size="small" color="primary" variant="outlined" />
                  </Box>
                  <ResponsiveContainer width="100%" height={350}>
                    <RechartsPieChart>
                      <Pie
                        data={currentData.pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {currentData.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        labelStyle={{ fontWeight: 'bold' }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary" align="center">
                      Total: {currentData.pieData.reduce((sum, item) => sum + item.value, 0)}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
                      </Grid>
        </Grid>

          {/* Additional Analytics Section */}
          <Grid container spacing={3} mb={4}>
            {/* Performance Metrics */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Performance Metrics
                  </Typography>
                  <Stack spacing={2}>
                    {currentData.performanceMetrics?.map((metric, index) => (
                      <Box key={index}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" color="text.secondary">
                            {metric.metric}
                          </Typography>
                          <Chip 
                            label={metric.change} 
                            size="small" 
                            color={metric.status === "up" ? "success" : "error"}
                            icon={metric.status === "up" ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          />
                        </Box>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          {metric.value}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={Math.random() * 100} 
                          sx={{ mt: 1, height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Location Performance */}
        <Grid item xs={12} md={6}>
              <Card sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
              }}>
            <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Top Performing Cities
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                    <RechartsBarChart data={currentData.locationData}>
                      <XAxis dataKey="city" />
                  <YAxis />
                      <RechartsTooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
          </Grid>

          {/* Weekly Trends and Customer Analytics */}
          <Grid container spacing={3} mb={4}>
            {/* Weekly Trends */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Weekly Performance Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={currentData.weeklyTrends}>
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <RechartsTooltip />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        fill="#8884d8" 
                        stroke="#8884d8"
                        fillOpacity={0.3}
                      />
                      <Bar yAxisId="right" dataKey="bookings" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Customer Satisfaction Radar */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
              }}>
            <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Customer Satisfaction Metrics
              </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={[
                      { metric: 'Service Quality', value: 95, fullMark: 100 },
                      { metric: 'Response Time', value: 88, fullMark: 100 },
                      { metric: 'Cleanliness', value: 92, fullMark: 100 },
                      { metric: 'Value for Money', value: 87, fullMark: 100 },
                      { metric: 'Staff Friendliness', value: 94, fullMark: 100 },
                      { metric: 'Overall Experience', value: 91, fullMark: 100 },
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Satisfaction" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

          {/* Real-time Activity Feed */}
          <Card sx={{ mb: 4, transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                Real-time Activity Feed
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" mb={2}>
                      Recent Bookings
                    </Typography>
                    <Stack spacing={1}>
                      {[
                        { id: 1, business: "Hostel Downtown", customer: "Rahul Sharma", amount: "₹8,500", time: "2 min ago" },
                        { id: 2, business: "Hospital City", customer: "Priya Patel", amount: "₹12,000", time: "5 min ago" },
                        { id: 3, business: "Garage Central", customer: "Amit Kumar", amount: "₹3,200", time: "8 min ago" },
                        { id: 4, business: "Beauty Salon", customer: "Neha Singh", amount: "₹2,800", time: "12 min ago" },
                      ].map((booking) => (
                        <Box key={booking.id} display="flex" alignItems="center" gap={2} p={1} sx={{ 
                          border: '1px solid #e0e0e0', 
                          borderRadius: 1,
                          '&:hover': { backgroundColor: '#f5f5f5' }
                        }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                            {booking.customer.charAt(0)}
                          </Avatar>
                          <Box flex={1}>
                            <Typography variant="body2" fontWeight="medium">
                              {booking.customer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {booking.business} • {booking.amount}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {booking.time}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" mb={2}>
                      System Notifications
                    </Typography>
                    <Stack spacing={1}>
                      {[
                        { id: 1, type: "success", message: "New business registered: Food Catering Plus", time: "1 min ago" },
                        { id: 2, type: "warning", message: "High occupancy alert: Downtown Hostel (95%)", time: "3 min ago" },
                        { id: 3, type: "info", message: "System maintenance scheduled for tonight", time: "10 min ago" },
                        { id: 4, type: "success", message: "Monthly report generated successfully", time: "15 min ago" },
                      ].map((notification) => (
                        <Box key={notification.id} display="flex" alignItems="center" gap={2} p={1} sx={{ 
                          border: '1px solid #e0e0e0', 
                          borderRadius: 1,
                          '&:hover': { backgroundColor: '#f5f5f5' }
                        }}>
                          <Chip 
                            label={notification.type} 
                            size="small" 
                            color={notification.type}
                            sx={{ minWidth: 60 }}
                          />
                          <Box flex={1}>
                            <Typography variant="body2">
                              {notification.message}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Performance Table */}
          <Card sx={{ 
            transition: 'all 0.3s ease',
            '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
          }}>
            <CardContent>
              <Box 
                display="flex" 
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between" 
                alignItems={{ xs: "flex-start", sm: "center" }} 
                mb={3}
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {selectedBusiness === "All Businesses" ? "Business Performance Overview" : "Performance Details"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Detailed metrics and analytics for {selectedBusiness.toLowerCase()} performance
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    startIcon={<SearchIcon />}
                  >
                    Filter
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small"
                    startIcon={<TrendingUpIcon />}
                  >
                    Export Data
        </Button>
      </Box>
              </Box>
              <TableContainer sx={{ 
                maxHeight: 400,
                '& .MuiTable-root': {
                  minWidth: { xs: 650, md: 800 }
                }
              }}>
                <Table stickyHeader>
          <TableHead>
            <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                        {selectedBusiness === "All Businesses" ? "Business" : 
                         selectedBusiness === "Hostels" ? "Location" :
                         selectedBusiness === "Hospitals" ? "Department" :
                         selectedBusiness === "Garages" ? "Service" : "Category"}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Revenue</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                        {selectedBusiness === "All Businesses" ? "Bookings" :
                         selectedBusiness === "Hospitals" ? "Appointments" :
                         selectedBusiness === "Garages" ? "Services" : "Bookings"}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                        {selectedBusiness === "All Businesses" ? "Customers" :
                         selectedBusiness === "Hostels" ? "Occupancy" :
                         selectedBusiness === "Hospitals" ? "Patients" :
                         selectedBusiness === "Garages" ? "Customers" : "Customers"}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Rating</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Growth</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                    {currentData.tableData.map((row) => (
                      <TableRow key={row.id} hover sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                        <TableCell>
                          <Chip label={`#${row.id}`} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                              {(row.business || row.location || row.department || row.service).charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight="medium">
                              {row.business || row.location || row.department || row.service}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold" color="primary">
                            {row.revenue}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Monthly
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {row.bookings || row.appointments || row.services}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Total
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {selectedBusiness === "Hostels" ? (
                            <Chip 
                              label={row.occupancy} 
                              size="small" 
                              color="success" 
                              variant="outlined"
                            />
                          ) : (
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {row.customers || row.patients}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Active
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <StarIcon sx={{ fontSize: 16, color: '#FFD700' }} />
                            <Typography variant="body2" fontWeight="medium">
                              {row.rating}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            /5.0
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={row.growth || '0%'} 
                            size="small" 
                            color={row.growth && row.growth.startsWith('+') ? 'success' : 'error'}
                            variant="outlined"
                            icon={row.growth && row.growth.startsWith('+') ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label="Active" 
                            size="small" 
                            color="success"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Showing {currentData.tableData.length} of {currentData.tableData.length} entries
                </Typography>
                <Button size="small" variant="outlined">
                  View All
                </Button>
              </Box>
            </CardContent>
          </Card>
    </Box>
    </Box>
    </React.Fragment>
  );
};

export default AdminDashboard;
