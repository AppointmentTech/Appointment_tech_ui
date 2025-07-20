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
import GarageIcon from "@mui/icons-material/Garage";
import BuildIcon from "@mui/icons-material/Build";
import AdminHeader from "../../../Components/AdminHeader/AdminHeader.jsx";

const GarageDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const counters = [
    { label: "Total Revenue", value: "₹380,000", icon: <AttachMoneyIcon />, trend: "+8.5%", color: "#4CAF50" },
    { label: "Total Services", value: "2,200", icon: <BookOnlineIcon />, trend: "+6.2%", color: "#2196F3" },
    { label: "Active Customers", value: "1,500", icon: <PeopleIcon />, trend: "+9.1%", color: "#FF9800" },
    { label: "Customer Satisfaction", value: "92.3%", icon: <StarIcon />, trend: "+1.8%", color: "#9C27B0" },
    { label: "Available Technicians", value: "28", icon: <BuildIcon />, trend: "+12.5%", color: "#00BCD4" },
    { label: "Pending Repairs", value: "45", icon: <TrendingUpIcon />, trend: "-8.2%", color: "#F44336" },
  ];

  const barData = [
    { name: "Jan", revenue: 55000, services: 320, customers: 220 },
    { name: "Feb", revenue: 62000, services: 380, customers: 250 },
    { name: "Mar", revenue: 58000, services: 350, customers: 240 },
    { name: "Apr", revenue: 70000, services: 420, customers: 280 },
    { name: "May", revenue: 68000, services: 400, customers: 270 },
    { name: "Jun", revenue: 78000, services: 480, customers: 320 },
  ];

  const pieData = [
    { name: "Oil Change", value: 35, color: "#0088FE" },
    { name: "Brake Service", value: 25, color: "#00C49F" },
    { name: "Engine Repair", value: 20, color: "#FFBB28" },
    { name: "Tire Service", value: 20, color: "#FF8042" },
  ];

  const tableData = [
    { id: 1, service: "Oil Change", revenue: "₹85,000", services: 520, customers: 480, technicians: 8, rating: "4.5" },
    { id: 2, service: "Brake Service", revenue: "₹75,000", services: 380, customers: 350, technicians: 6, rating: "4.7" },
    { id: 3, service: "Engine Repair", revenue: "₹120,000", services: 280, customers: 250, technicians: 10, rating: "4.6" },
    { id: 4, service: "Tire Service", revenue: "₹60,000", services: 320, customers: 300, technicians: 4, rating: "4.4" },
    { id: 5, service: "AC Service", revenue: "₹40,000", services: 200, customers: 180, technicians: 3, rating: "4.3" },
    { id: 6, service: "Electrical", revenue: "₹35,000", services: 150, customers: 140, technicians: 2, rating: "4.2" },
  ];

  // Additional comprehensive data
  const weeklyTrends = [
    { week: "Week 1", revenue: 65000, services: 380, customers: 280, efficiency: 85 },
    { week: "Week 2", revenue: 72000, services: 420, customers: 310, efficiency: 88 },
    { week: "Week 3", revenue: 68000, services: 400, customers: 290, efficiency: 87 },
    { week: "Week 4", revenue: 78000, services: 450, customers: 330, efficiency: 90 },
  ];

  const technicianPerformance = [
    { name: "John Smith", services: 45, rating: 4.8, revenue: 95000, specialty: "Engine Repair" },
    { name: "Mike Johnson", services: 42, rating: 4.7, revenue: 88000, specialty: "Brake Service" },
    { name: "David Wilson", services: 38, rating: 4.6, revenue: 75000, specialty: "Oil Change" },
    { name: "Alex Brown", services: 35, rating: 4.5, revenue: 68000, specialty: "Tire Service" },
    { name: "Tom Davis", services: 32, rating: 4.4, revenue: 62000, specialty: "AC Service" },
  ];

  const serviceEfficiency = [
    { aspect: "Service Quality", rating: 4.7 },
    { aspect: "Technician Skills", rating: 4.8 },
    { aspect: "Equipment Quality", rating: 4.6 },
    { aspect: "Customer Service", rating: 4.5 },
    { aspect: "Turnaround Time", rating: 4.4 },
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
                Garage Management Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive overview of garage operations and service metrics
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
              <Button variant="contained" color="primary" startIcon={<GarageIcon />}>
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
            {/* Revenue and Services Trend */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Revenue & Services Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                          name === 'revenue' ? 'Revenue' : name === 'services' ? 'Services' : 'Customers'
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
                        dataKey="services" 
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
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
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
                      <Bar yAxisId="left" dataKey="services" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Services" />
                      <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#ffc658" strokeWidth={2} name="Efficiency %" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Service Efficiency Radar */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Service Efficiency Metrics
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={serviceEfficiency}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="aspect" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Efficiency" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <RechartsTooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Technician Performance */}
          <Card sx={{ mb: 4, transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                Technician Performance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={technicianPerformance}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : name === 'services' ? 'Services' : 'Rating'
                  ]} />
                  <Legend />
                  <Bar dataKey="services" fill="#8884d8" radius={[4, 4, 0, 0]} name="Services" />
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
                      <TableCell>Services</TableCell>
                      <TableCell>Customers</TableCell>
                      <TableCell>Technicians</TableCell>
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
                        <TableCell>{row.services}</TableCell>
                        <TableCell>{row.customers}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.technicians} 
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

export default GarageDashboard; 