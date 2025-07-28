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
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import CommonHeader from "../../../Components/CommonHeader.jsx";

const HospitalDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const counters = [
    { label: "Total Revenue", value: "₹620,000", icon: <AttachMoneyIcon />, trend: "+12.8%", color: "#4CAF50" },
    { label: "Total Appointments", value: "3,800", icon: <BookOnlineIcon />, trend: "+10.5%", color: "#2196F3" },
    { label: "Active Patients", value: "2,800", icon: <PeopleIcon />, trend: "+7.2%", color: "#FF9800" },
    { label: "Patient Satisfaction", value: "94.8%", icon: <StarIcon />, trend: "+2.5%", color: "#9C27B0" },
    { label: "Available Doctors", value: "45", icon: <PersonIcon />, trend: "+8.9%", color: "#00BCD4" },
    { label: "Emergency Cases", value: "156", icon: <TrendingUpIcon />, trend: "-3.2%", color: "#F44336" },
  ];

  const barData = [
    { name: "Jan", revenue: 95000, appointments: 280, patients: 220 },
    { name: "Feb", revenue: 110000, appointments: 320, patients: 250 },
    { name: "Mar", revenue: 105000, appointments: 300, patients: 240 },
    { name: "Apr", revenue: 125000, appointments: 350, patients: 280 },
    { name: "May", revenue: 120000, appointments: 340, patients: 270 },
    { name: "Jun", revenue: 140000, appointments: 400, patients: 320 },
  ];

  const pieData = [
    { name: "General Medicine", value: 40, color: "#0088FE" },
    { name: "Cardiology", value: 25, color: "#00C49F" },
    { name: "Orthopedics", value: 20, color: "#FFBB28" },
    { name: "Pediatrics", value: 15, color: "#FF8042" },
  ];

  const tableData = [
    { id: 1, department: "General Medicine", revenue: "₹150,000", appointments: 950, patients: 750, doctors: 12, rating: "4.7" },
    { id: 2, department: "Cardiology", revenue: "₹120,000", appointments: 680, patients: 520, doctors: 8, rating: "4.9" },
    { id: 3, department: "Orthopedics", revenue: "₹100,000", appointments: 580, patients: 450, doctors: 10, rating: "4.6" },
    { id: 4, department: "Pediatrics", revenue: "₹80,000", appointments: 420, patients: 380, doctors: 6, rating: "4.8" },
    { id: 5, department: "Neurology", revenue: "₹90,000", appointments: 380, patients: 320, doctors: 5, rating: "4.5" },
    { id: 6, department: "Emergency", revenue: "₹80,000", appointments: 350, patients: 280, doctors: 4, rating: "4.4" },
  ];

  // Additional comprehensive data
  const weeklyTrends = [
    { week: "Week 1", revenue: 95000, appointments: 280, patients: 220, recovery: 85 },
    { week: "Week 2", revenue: 110000, appointments: 320, patients: 250, recovery: 88 },
    { week: "Week 3", revenue: 105000, appointments: 300, patients: 240, recovery: 87 },
    { week: "Week 4", revenue: 125000, appointments: 350, patients: 280, recovery: 90 },
  ];

  const doctorPerformance = [
    { name: "Dr. Sarah Wilson", appointments: 45, rating: 4.9, patients: 38, specialty: "Cardiology" },
    { name: "Dr. Mike Johnson", appointments: 42, rating: 4.8, patients: 35, specialty: "General Medicine" },
    { name: "Dr. Emma Davis", appointments: 38, rating: 4.7, patients: 32, specialty: "Orthopedics" },
    { name: "Dr. Alex Brown", appointments: 35, rating: 4.6, patients: 30, specialty: "Pediatrics" },
    { name: "Dr. Lisa Chen", appointments: 32, rating: 4.5, patients: 28, specialty: "Neurology" },
  ];

  const patientSatisfaction = [
    { aspect: "Medical Care", rating: 4.8 },
    { aspect: "Doctor Communication", rating: 4.9 },
    { aspect: "Hospital Cleanliness", rating: 4.7 },
    { aspect: "Staff Friendliness", rating: 4.6 },
    { aspect: "Wait Times", rating: 4.4 },
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
                Hospital Management Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive overview of hospital operations and patient care metrics
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                placeholder="Search departments..."
                size="small"
                InputProps={{ 
                  endAdornment: <SearchIcon />,
                  sx: { bgcolor: "#fff", borderRadius: 1 }
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="contained" color="primary" startIcon={<LocalHospitalIcon />}>
                Add Department
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
                          name === 'revenue' ? 'Revenue' : name === 'appointments' ? 'Appointments' : 'Patients'
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

            {/* Department Distribution */}
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Department Distribution
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
                      <Bar yAxisId="left" dataKey="appointments" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Appointments" />
                      <Line yAxisId="right" type="monotone" dataKey="recovery" stroke="#ffc658" strokeWidth={2} name="Recovery %" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Patient Satisfaction Radar */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Patient Satisfaction Metrics
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={patientSatisfaction}>
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

          {/* Doctor Performance */}
          <Card sx={{ mb: 4, transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                Doctor Performance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={doctorPerformance}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip formatter={(value, name) => [
                    value,
                    name === 'appointments' ? 'Appointments' : name === 'patients' ? 'Patients' : 'Rating'
                  ]} />
                  <Legend />
                  <Bar dataKey="appointments" fill="#8884d8" radius={[4, 4, 0, 0]} name="Appointments" />
                  <Bar dataKey="patients" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Patients" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Performance Table */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Department Performance Overview
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
                      <TableCell>Department</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Appointments</TableCell>
                      <TableCell>Patients</TableCell>
                      <TableCell>Doctors</TableCell>
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
                            {row.department}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold" color="primary">
                            {row.revenue}
                          </Typography>
                        </TableCell>
                        <TableCell>{row.appointments}</TableCell>
                        <TableCell>{row.patients}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.doctors} 
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

export default HospitalDashboard; 