import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Stack,
  Divider,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Drawer,
  Button,
  IconButton,
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const GarageReminders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [tab, setTab] = useState("Upcoming");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const summaryCards = [
    { label: "Upcoming Reminders", value: 38, color: "#2196f3" },
    { label: "Overdue Reminders", value: 5, color: "#f44336" },
    { label: "Completed This Month", value: 21, color: "#4caf50" },
    { label: "Total Reminders", value: 89, color: "#9c27b0" },
  ];

  const reminderDistribution = [
    { type: "Service", count: 30, color: "#4caf50" },
    { type: "Insurance", count: 20, color: "#2196f3" },
    { type: "PUC", count: 15, color: "#ff9800" },
    { type: "Fitness", count: 12, color: "#9c27b0" },
  ];

  const monthlyReminderTrend = [
    { month: "Jan", reminders: 20 },
    { month: "Feb", reminders: 24 },
    { month: "Mar", reminders: 18 },
    { month: "Apr", reminders: 27 },
  ];

  const upcomingReminders = [
    { date: "2025-07-28", vehicle: "KA01AB1234", type: "Service", owner: "Ravi Kumar" },
    { date: "2025-07-30", vehicle: "KA02XY5678", type: "PUC", owner: "Amit Verma" },
    { date: "2025-08-02", vehicle: "KA03ZZ7890", type: "Insurance", owner: "Sunita Sharma" },
    { date: "2025-08-04", vehicle: "KA04TT4567", type: "Fitness", owner: "Meena Das" },
  ];
  const reminderTabs = ["Upcoming", "Completed", "Overdue"];

  const allReminders = {
    Upcoming: [
      { date: "2025-07-28", type: "Service", vehicle: "KA01AB1234", owner: "Ravi" },
      { date: "2025-07-30", type: "PUC", vehicle: "KA05CD5678", owner: "Amit" },
    ],
    Completed: [
      { date: "2025-07-15", type: "Insurance", vehicle: "KA07EF9012", owner: "Nisha" },
    ],
    Overdue: [
      { date: "2025-07-20", type: "Fitness", vehicle: "KA09GH3456", owner: "Sunil" },
    ],
  };
  
  const typeColors = {
    Service: "#4caf50",
    Insurance: "#2196f3",
    PUC: "#ff9800",
    Fitness: "#9c27b0",
  };
  const renderIcon = (label) => {
    switch (label) {
      case "Upcoming": return <EventNoteIcon color="primary" />;
      case "Completed": return <CheckCircleIcon sx={{ color: "#4caf50" }} />;
      case "Overdue": return <HighlightOffIcon sx={{ color: "#f44336" }} />;
      default: return null;
    }
  };
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
          Garage Reminders
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Overview of all scheduled, completed, and pending service reminders.
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {summaryCards.map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper sx={{ p: 2, borderLeft: `4px solid ${item.color}` }}>
                <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                <Typography variant="body2" color="textSecondary">{item.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Reminder Type Distribution */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Reminder Type Distribution</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reminderDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="count"
                  >
                    {reminderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Monthly Reminder Trend */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography fontWeight="bold">Monthly Reminder Trend</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyReminderTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="reminders" stroke="#03a9f4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Tab Navigation */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
          {reminderTabs.map((label) => (
            <Tab
              key={label}
              value={label}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  {renderIcon(label)}
                  <Typography>{label}</Typography>
                </Stack>
              }
            />
          ))}
        </Tabs>

        {/* Reminder Timeline */}
        <Stack spacing={2}>
          {allReminders[tab]?.map((item, index) => (
            <Paper key={index} sx={{ p: 2, borderLeft: `4px solid ${typeColors[item.type]}` }}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography fontWeight="bold">
                    {item.type} — {item.vehicle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Owner: {item.owner} • Date: {item.date}
                  </Typography>
                </Box>
                <Chip label={item.type} size="small" sx={{ backgroundColor: typeColors[item.type], color: "#fff" }} />
              </Stack>
            </Paper>
          ))}
        </Stack>

        {/* Filter Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="textSecondary">[Filter options go here]</Typography>
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setDrawerOpen(false)}>Apply</Button>
          </Box>
        </Drawer>
   
      </Box>
    </Box>
  );
};

export default GarageReminders;
