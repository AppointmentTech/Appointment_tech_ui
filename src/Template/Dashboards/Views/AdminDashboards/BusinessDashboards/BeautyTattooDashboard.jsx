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
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import PersonIcon from "@mui/icons-material/Person";
import CommonHeader from "../../../Components/CommonHeader.jsx";

const BeautyTattooDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const counters = [
    { label: "Total Revenue", value: "₹280,000", icon: <AttachMoneyIcon />, trend: "+18.3%", color: "#4CAF50" },
    { label: "Total Appointments", value: "1,800", icon: <BookOnlineIcon />, trend: "+15.2%", color: "#2196F3" },
    { label: "Active Customers", value: "1,200", icon: <PeopleIcon />, trend: "+12.8%", color: "#FF9800" },
    { label: "Customer Satisfaction", value: "95.2%", icon: <StarIcon />, trend: "+3.5%", color: "#9C27B0" },
    { label: "Available Artists", value: "18", icon: <PersonIcon />, trend: "+22.2%", color: "#00BCD4" },
    { label: "Pending Appointments", value: "32", icon: <TrendingUpIcon />, trend: "-5.1%", color: "#F44336" },
  ];

  const barData = [
    { name: "Jan", revenue: 35000, appointments: 120, customers: 85 },
    { name: "Feb", revenue: 42000, appointments: 150, customers: 110 },
    { name: "Mar", revenue: 38000, appointments: 135, customers: 95 },
    { name: "Apr", revenue: 48000, appointments: 180, customers: 130 },
    { name: "May", revenue: 45000, appointments: 165, customers: 120 },
    { name: "Jun", revenue: 52000, appointments: 200, customers: 145 },
  ];

  const pieData = [
    { name: "Hair Styling", value: 30, color: "#0088FE" },
    { name: "Tattoo Art", value: 25, color: "#00C49F" },
    { name: "Facial Treatments", value: 20, color: "#FFBB28" },
    { name: "Nail Art", value: 15, color: "#FF8042" },
    { name: "Body Art", value: 10, color: "#8884D8" },
  ];

  const tableData = [
    { id: 1, service: "Hair Styling", revenue: "₹85,000", appointments: 520, customers: 480, artists: 8, rating: "4.8" },
    { id: 2, service: "Tattoo Art", revenue: "₹75,000", appointments: 380, customers: 350, artists: 6, rating: "4.9" },
    { id: 3, service: "Facial Treatments", revenue: "₹60,000", appointments: 280, customers: 250, artists: 4, rating: "4.7" },
    { id: 4, service: "Nail Art", revenue: "₹40,000", appointments: 320, customers: 300, artists: 3, rating: "4.6" },
    { id: 5, service: "Body Art", revenue: "₹20,000", appointments: 150, customers: 140, artists: 2, rating: "4.5" },
  ];

  // Additional comprehensive data
  const weeklyTrends = [
    { week: "Week 1", revenue: 45000, appointments: 180, customers: 120, satisfaction: 4.6 },
    { week: "Week 2", revenue: 52000, appointments: 200, customers: 140, satisfaction: 4.7 },
    { week: "Week 3", revenue: 48000, appointments: 190, customers: 130, satisfaction: 4.8 },
    { week: "Week 4", revenue: 55000, appointments: 220, customers: 150, satisfaction: 4.9 },
  ];

  const artistPerformance = [
    { name: "Sarah Wilson", appointments: 45, rating: 4.9, revenue: 85000, specialty: "Hair Styling" },
    { name: "Mike Johnson", appointments: 38, rating: 4.8, revenue: 72000, specialty: "Tattoo Art" },
    { name: "Emma Davis", appointments: 42, rating: 4.7, revenue: 68000, specialty: "Facial Treatments" },
    { name: "Alex Brown", appointments: 35, rating: 4.6, revenue: 55000, specialty: "Nail Art" },
    { name: "Lisa Chen", appointments: 28, rating: 4.5, revenue: 42000, specialty: "Body Art" },
  ];

  const customerSatisfaction = [
    { aspect: "Service Quality", rating: 4.8 },
    { aspect: "Artist Skills", rating: 4.9 },
    { aspect: "Cleanliness", rating: 4.7 },
    { aspect: "Value for Money", rating: 4.6 },
    { aspect: "Overall Experience", rating: 4.8 },
  ];

  return (
    <React.Fragment>
      <Box sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden"
      }}>
        <CommonHeader />
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
                Beauty & Tattoo Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive overview of beauty and tattoo services performance
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                placeholder="Search services..."
                size="small"
                InputProps={{ 
                  endAdornment: <SearchIcon />,
                  sx: { bgcolor: "#fff", borderRadius: 1 }
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="contained" color="primary" startIcon={<FaceRetouchingNaturalIcon />}>
                Add Service
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
            {/* Revenue and Appointments Trend */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Revenue & Appointments Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                          name === 'revenue' ? 'Revenue' : name === 'appointments' ? 'Appointments' : 'Customers'
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
                        dataKey="appointments" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        dot={{ fill: '#82ca9d', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Service Distribution */}
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Service Distribution
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
                      <Bar yAxisId="left" dataKey="appointments" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Appointments" />
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

          {/* Artist Performance */}
          <Card sx={{ mb: 4, transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                Artist Performance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={artistPerformance}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : name === 'appointments' ? 'Appointments' : 'Rating'
                  ]} />
                  <Legend />
                  <Bar dataKey="appointments" fill="#8884d8" radius={[4, 4, 0, 0]} name="Appointments" />
                  <Bar dataKey="rating" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Rating" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Performance Table */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Service Performance Overview
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
                      <TableCell>Service Type</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Appointments</TableCell>
                      <TableCell>Customers</TableCell>
                      <TableCell>Artists</TableCell>
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
                            {row.service}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold" color="primary">
                            {row.revenue}
                          </Typography>
                        </TableCell>
                        <TableCell>{row.appointments}</TableCell>
                        <TableCell>{row.customers}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.artists} 
                            size="small" 
                            color="info"
                            variant="outlined"
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

export default BeautyTattooDashboard; 