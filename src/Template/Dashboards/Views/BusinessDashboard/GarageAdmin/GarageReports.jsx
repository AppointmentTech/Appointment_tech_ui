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
          Consolidated view of all financials including revenue, expenses, payments, and service data.
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
                  <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={2} />
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
                  <Line type="monotone" dataKey="expense" stroke="#f44336" strokeWidth={2} />
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

          {/* Detailed Breakdown */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300, overflow: 'auto' }}>
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
