import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import {
  PieChart,
  BarChart,
  Bar,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const GarageReports = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  const metrics = [
    { label: "Total Revenue", value: "₹1,20,000", color: "#4caf50" },
    { label: "Total Expenses", value: "₹45,000", color: "#f44336" },
    { label: "Net Profit", value: "₹75,000", color: "#2196f3" },
    { label: "Pending Payments", value: "₹8,000", color: "#ff9800" },
  ];

  const revenueTrend = [
    { month: "Jan", revenue: 20000 },
    { month: "Feb", revenue: 25000 },
    { month: "Mar", revenue: 30000 },
    { month: "Apr", revenue: 25000 },
  ];

  const expenseTrend = [
    { month: "Jan", expense: 10000 },
    { month: "Feb", expense: 12000 },
    { month: "Mar", expense: 13000 },
    { month: "Apr", expense: 10000 },
  ];

  const paymentDistribution = [
    { name: "UPI", value: 40, color: "#4caf50" },
    { name: "Cash", value: 25, color: "#2196f3" },
    { name: "Card", value: 20, color: "#ff9800" },
    { name: "Bank Transfer", value: 15, color: "#9c27b0" },
  ];

  const detailedBreakdown = [
    { label: "Most Frequent Customer", value: "Rajesh Kumar" },
    { label: "Top Service", value: "Engine Repair" },
    { label: "Most Used Payment Method", value: "UPI" },
    { label: "Highest Expense Category", value: "Parts Purchase" },
    { label: "Invoice Count", value: "134" },
    { label: "Technician with Most Jobs", value: "Amit Singh" },
  ];
  const customerGrowth = [
    { month: "Jan", customers: 20 },
    { month: "Feb", customers: 25 },
    { month: "Mar", customers: 30 },
    { month: "Apr", customers: 40 },
  ];
  const technicianJobs = [
    { technician: "Amit", jobs: 22 },
    { technician: "Vikram", jobs: 18 },
    { technician: "Sandeep", jobs: 16 },
    { technician: "Rahul", jobs: 14 },
  ];
  const vehicleTypes = [
    { type: "Two-Wheelers", count: 50, color: "#4caf50" },
    { type: "Cars", count: 30, color: "#2196f3" },
    { type: "Trucks", count: 10, color: "#ff9800" },
    { type: "Auto", count: 5, color: "#9c27b0" },
  ];
  const bookingStats = [
    { service: "AC Service", count: 25 },
    { service: "Battery", count: 20 },
    { service: "Engine", count: 18 },
    { service: "Wheel Align.", count: 12 },
  ];
  const inventoryTrend = [
    { month: "Jan", stock: 120 },
    { month: "Feb", stock: 100 },
    { month: "Mar", stock: 140 },
    { month: "Apr", stock: 110 },
  ];
  const invoiceStats = [
    { month: "Jan", count: 22 },
    { month: "Feb", count: 28 },
    { month: "Mar", count: 30 },
    { month: "Apr", count: 35 },
  ];
  const reminders = [
    { type: "Insurance", count: 14 },
    { type: "PUC", count: 12 },
    { type: "Fitness", count: 8 },
    { type: "Service", count: 25 },
  ];
  const campaignPerformance = [
    { campaign: "Festival Offer", clicks: 120, conversions: 30 },
    { campaign: "Monsoon Checkup", clicks: 90, conversions: 20 },
    { campaign: "Battery Promo", clicks: 75, conversions: 18 },
  ];
  const feedbackRatings = [
    { month: "Jan", rating: 4.2 },
    { month: "Feb", rating: 4.0 },
    { month: "Mar", rating: 4.5 },
    { month: "Apr", rating: 4.3 },
  ];
  const staffAttendance = [
    { day: "Mon", present: 12, absent: 2 },
    { day: "Tue", present: 13, absent: 1 },
    { day: "Wed", present: 14, absent: 0 },
    { day: "Thu", present: 11, absent: 3 },
    { day: "Fri", present: 13, absent: 1 },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CommonHeader role="admin" />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          overflow: "auto",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Garage Reports
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Consolidated view of all financials including revenue, expenses,
          payments, and service data.
        </Typography>

        {/* Metrics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {metrics.map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                sx={{
                  p: 2,
                  borderLeft: `4px solid ${item.color}`,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Revenue Trend</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4caf50"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Expense Trend</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#f44336"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Payment Methods</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {paymentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Customer Growth */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Customer Growth</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#9c27b0"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Technician Jobs */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">
                Technician Job Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={technicianJobs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="technician" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="jobs" fill="#03a9f4" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Vehicle Types */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">
                Vehicle Type Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="count"
                  >
                    {vehicleTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Booking Volume */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">
                Booking Volume by Service
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#ff5722" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Inventory Stock Trend */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Inventory Stock Trend</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inventoryTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="stock"
                    stroke="#8bc34a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Invoice Count by Month */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Invoice Count by Month</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invoiceStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#795548" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Reminder Frequency */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Reminder Frequency</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reminders}
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {reminders.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#03a9f4" />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Campaign Performance */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Campaign Performance</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="campaign" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="clicks" fill="#03a9f4" />
                  <Bar dataKey="conversions" fill="#ff9800" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Feedback Ratings Over Time */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">
                Feedback Ratings Over Time
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feedbackRatings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#ff5722"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Staff Attendance Overview */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">
                Staff Attendance Overview
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={staffAttendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="present" stackId="a" fill="#4caf50" />
                  <Bar dataKey="absent" stackId="a" fill="#f44336" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Detailed Breakdown */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300, overflow: "auto" }}>
              <Typography fontWeight="bold" gutterBottom>
                Additional Insights
              </Typography>
              <Stack spacing={2} divider={<Divider flexItem />}>
                {detailedBreakdown.map((item, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {item.label}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GarageReports;
