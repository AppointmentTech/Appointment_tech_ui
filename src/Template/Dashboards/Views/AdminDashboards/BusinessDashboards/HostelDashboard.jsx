import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { BarChart as RechartsBarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ComposedChart, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TextField, Grid, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import StarIcon from "@mui/icons-material/Star";
import HotelIcon from "@mui/icons-material/Hotel";
import BedIcon from "@mui/icons-material/Bed";
import AdminHeader from "../../../Components/AdminHeader/AdminHeader.jsx";

const HostelDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const counters = [
    { label: "Total Revenue", value: "₹850,000", icon: <AttachMoneyIcon />, trend: "+15.2%", color: "#4CAF50" },
    { label: "Total Bookings", value: "5,200", icon: <BookOnlineIcon />, trend: "+12.8%", color: "#2196F3" },
    { label: "Active Rooms", value: "1,250", icon: <BedIcon />, trend: "+8.5%", color: "#FF9800" },
    { label: "Customer Satisfaction", value: "96.5%", icon: <StarIcon />, trend: "+3.2%", color: "#9C27B0" },
    { label: "Occupancy Rate", value: "87.3%", icon: <TrendingUpIcon />, trend: "+5.8%", color: "#00BCD4" },
    { label: "Average Stay", value: "3.2 days", icon: <PeopleIcon />, trend: "+1.2%", color: "#F44336" },
  ];

  const barData = [
    { name: "Jan", revenue: 120000, bookings: 320, rooms: 280 },
    { name: "Feb", revenue: 140000, bookings: 380, rooms: 320 },
    { name: "Mar", revenue: 130000, bookings: 350, rooms: 300 },
    { name: "Apr", revenue: 160000, bookings: 420, rooms: 380 },
    { name: "May", revenue: 150000, bookings: 400, rooms: 360 },
    { name: "Jun", revenue: 180000, bookings: 480, rooms: 420 },
  ];

  const pieData = [
    { name: "Standard Rooms", value: 45, color: "#0088FE" },
    { name: "Deluxe Rooms", value: 30, color: "#00C49F" },
    { name: "Suite Rooms", value: 15, color: "#FFBB28" },
    { name: "Dormitory", value: 10, color: "#FF8042" },
  ];

  const tableData = [
    { id: 1, location: "Downtown Hostel", revenue: "₹180,000", bookings: 1200, occupancy: "92%", rating: "4.8", rooms: 150 },
    { id: 2, location: "Airport Hostel", revenue: "₹150,000", bookings: 980, occupancy: "88%", rating: "4.6", rooms: 120 },
    { id: 3, location: "University Hostel", revenue: "₹120,000", bookings: 850, occupancy: "95%", rating: "4.9", rooms: 200 },
    { id: 4, location: "Business Hostel", revenue: "₹200,000", bookings: 1100, occupancy: "85%", rating: "4.7", rooms: 180 },
    { id: 5, location: "Tourist Hostel", revenue: "₹100,000", bookings: 720, occupancy: "78%", rating: "4.5", rooms: 100 },
    { id: 6, location: "Student Hostel", revenue: "₹90,000", bookings: 650, occupancy: "90%", rating: "4.4", rooms: 150 },
  ];

  // Additional comprehensive data
  const weeklyTrends = [
    { week: "Week 1", revenue: 120000, bookings: 320, occupancy: 85, satisfaction: 4.6 },
    { week: "Week 2", revenue: 140000, bookings: 380, occupancy: 88, satisfaction: 4.7 },
    { week: "Week 3", revenue: 130000, bookings: 350, occupancy: 87, satisfaction: 4.8 },
    { week: "Week 4", revenue: 160000, bookings: 420, occupancy: 90, satisfaction: 4.9 },
  ];

  const locationPerformance = [
    { location: "Downtown", revenue: 180000, bookings: 1200, occupancy: 92, rating: 4.8 },
    { location: "Airport", revenue: 150000, bookings: 980, occupancy: 88, rating: 4.6 },
    { location: "University", revenue: 120000, bookings: 850, occupancy: 95, rating: 4.9 },
    { location: "Business", revenue: 200000, bookings: 1100, occupancy: 85, rating: 4.7 },
    { location: "Tourist", revenue: 100000, bookings: 720, occupancy: 78, rating: 4.5 },
  ];

  const customerSatisfaction = [
    { aspect: "Room Cleanliness", rating: 4.8 },
    { aspect: "Staff Service", rating: 4.9 },
    { aspect: "Location", rating: 4.7 },
    { aspect: "Value for Money", rating: 4.6 },
    { aspect: "Amenities", rating: 4.5 },
  ];

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
          backgroundColor: "#f5f5f5"
        }}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Hostel Management Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive overview of hostel operations and performance metrics
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                placeholder="Search hostels..."
                size="small"
                InputProps={{ 
                  endAdornment: <SearchIcon />,
                  sx: { bgcolor: "#fff", borderRadius: 1 }
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="contained" color="primary" startIcon={<HotelIcon />}>
                Add New Hostel
              </Button>
            </Box>
          </Box>

          {/* Counters */}
          <Grid container spacing={3} mb={4}>
            {counters.map((counter, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Avatar sx={{ bgcolor: counter.color, width: 48, height: 48 }}>
                        {counter.icon}
                      </Avatar>
                      <Chip 
                        label={counter.trend} 
                        size="small"
                        color={counter.trend.startsWith('+') ? 'success' : 'error'}
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {counter.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {counter.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} mb={4}>
            {/* Revenue and Bookings Trend */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Revenue & Bookings Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                          name === 'revenue' ? 'Revenue' : name === 'bookings' ? 'Bookings' : 'Rooms'
                        ]}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8884d8" 
                        strokeWidth={3}
                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        dot={{ fill: '#82ca9d', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Room Type Distribution */}
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Room Type Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value, name) => [`${value}%`, name]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Additional Analytics Section */}
          <Grid container spacing={3} mb={4}>
            {/* Weekly Trends */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Weekly Performance Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={weeklyTrends}>
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                      <RechartsTooltip />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        fill="#8884d8" 
                        stroke="#8884d8"
                        fillOpacity={0.3}
                        name="Revenue"
                      />
                      <Bar yAxisId="left" dataKey="bookings" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Bookings" />
                      <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#ffc658" strokeWidth={2} name="Satisfaction" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Customer Satisfaction Radar */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Customer Satisfaction Metrics
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={customerSatisfaction}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="aspect" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Satisfaction" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <RechartsTooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Location Performance */}
          <Card sx={{ mb: 4, transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                Location Performance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={locationPerformance}>
                  <XAxis dataKey="location" />
                  <YAxis />
                  <RechartsTooltip formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : name === 'bookings' ? 'Bookings' : name === 'occupancy' ? 'Occupancy %' : 'Rating'
                  ]} />
                  <Legend />
                  <Bar dataKey="bookings" fill="#8884d8" radius={[4, 4, 0, 0]} name="Bookings" />
                  <Bar dataKey="occupancy" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Occupancy %" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hostel Performance Table */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Hostel Performance Overview
                </Typography>
                <Button variant="outlined" color="primary" size="small">
                  Export Report
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Hostel Location</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Bookings</TableCell>
                      <TableCell>Total Rooms</TableCell>
                      <TableCell>Occupancy Rate</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {row.location}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold" color="primary">
                            {row.revenue}
                          </Typography>
                        </TableCell>
                        <TableCell>{row.bookings}</TableCell>
                        <TableCell>{row.rooms}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.occupancy} 
                            size="small" 
                            color={parseInt(row.occupancy) > 85 ? "success" : parseInt(row.occupancy) > 70 ? "warning" : "error"}
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <StarIcon sx={{ fontSize: 16, color: '#FFD700' }} />
                            <Typography variant="body2">{row.rating}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Button size="small" color="primary" variant="outlined">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default HostelDashboard; 