import React, { useState, useMemo } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const GarageReminders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  // Unified reminders state
  const [reminders, setReminders] = useState([
    { date: "2025-07-28", vehicle: "KA01AB1234", type: "Service", owner: "Ravi Kumar", status: "Upcoming" },
    { date: "2025-07-30", vehicle: "KA02XY5678", type: "PUC", owner: "Amit Verma", status: "Upcoming" },
    { date: "2025-08-02", vehicle: "KA03ZZ7890", type: "Insurance", owner: "Sunita Sharma", status: "Upcoming" },
    { date: "2025-08-04", vehicle: "KA04TT4567", type: "Fitness", owner: "Meena Das", status: "Upcoming" },
    { date: "2025-07-15", vehicle: "KA07EF9012", type: "Insurance", owner: "Nisha", status: "Completed" },
    { date: "2025-07-20", vehicle: "KA09GH3456", type: "Fitness", owner: "Sunil", status: "Overdue" },
    // ... more mock data ...
  ]);

  // Filter/search state
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    status: "All",
    type: "All",
    fromDate: "",
    toDate: "",
  });

  // Add/Edit dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    date: "",
    vehicle: "",
    type: "Service",
    owner: "",
    status: "Upcoming",
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState({ open: false, reminder: null });

  // Tab state
  const reminderTabs = ["Upcoming", "Completed", "Overdue"];
  const [tab, setTab] = useState("Upcoming");

  // Reminder type colors
  const typeColors = {
    Service: "#4caf50",
    Insurance: "#2196f3",
    PUC: "#ff9800",
    Fitness: "#9c27b0",
  };

  // Filtered reminders (by tab, search, and filter)
  const filteredReminders = useMemo(() => {
    return reminders.filter((r) => {
      // Tab filter
      if (tab && r.status !== tab) return false;
      // Search filter
      if (search && !(
        r.vehicle.toLowerCase().includes(search.toLowerCase()) ||
        r.owner.toLowerCase().includes(search.toLowerCase())
      )) return false;
      // Status filter
      if (filter.status !== "All" && r.status !== filter.status) return false;
      // Type filter
      if (filter.type !== "All" && r.type !== filter.type) return false;
      // Date range filter
      if (filter.fromDate && r.date < filter.fromDate) return false;
      if (filter.toDate && r.date > filter.toDate) return false;
      return true;
    });
  }, [reminders, tab, search, filter]);

  // Summary cards (derived)
  const summaryCards = useMemo(() => [
    { label: "Upcoming Reminders", value: reminders.filter(r => r.status === "Upcoming").length, color: "#2196f3" },
    { label: "Overdue Reminders", value: reminders.filter(r => r.status === "Overdue").length, color: "#f44336" },
    { label: "Completed This Month", value: reminders.filter(r => r.status === "Completed" && r.date.startsWith("2025-07")).length, color: "#4caf50" },
    { label: "Total Reminders", value: reminders.length, color: "#9c27b0" },
  ], [reminders]);

  // Reminder type distribution (for PieChart)
  const reminderDistribution = useMemo(() => {
    const counts = {};
    reminders.forEach(r => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({ type, count, color: typeColors[type] }));
  }, [reminders]);

  // Monthly trend (for LineChart)
  const monthlyReminderTrend = useMemo(() => {
    const months = {};
    reminders.forEach(r => {
      const m = r.date.slice(0, 7); // YYYY-MM
      months[m] = (months[m] || 0) + 1;
    });
    return Object.entries(months).map(([month, reminders]) => ({ month, reminders }));
  }, [reminders]);

  // Icon rendering for tabs
  const renderIcon = (label) => {
    switch (label) {
      case "Upcoming": return <EventNoteIcon color="primary" />;
      case "Completed": return <CheckCircleIcon sx={{ color: "#4caf50" }} />;
      case "Overdue": return <HighlightOffIcon sx={{ color: "#f44336" }} />;
      default: return null;
    }
  };

  // Handle filter drawer
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Handle add/edit dialog
  const handleDialogOpen = (reminder = null) => {
    if (reminder) {
      setEditMode(true);
      setForm(reminder);
    } else {
      setEditMode(false);
      setForm({ date: "", vehicle: "", type: "Service", owner: "", status: "Upcoming" });
    }
    setFormErrors({});
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditMode(false);
    setForm({ date: "", vehicle: "", type: "Service", owner: "", status: "Upcoming" });
    setFormErrors({});
  };
  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!form.date) errors.date = "Date required";
    if (!form.vehicle) errors.vehicle = "Vehicle required";
    if (!form.type) errors.type = "Type required";
    if (!form.owner) errors.owner = "Owner required";
    if (!form.status) errors.status = "Status required";
    return errors;
  };
  // Add/edit submit
  const handleFormSubmit = () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (editMode) {
      setReminders((prev) => prev.map(r => (r === form ? form : (r.date === form.date && r.vehicle === form.vehicle ? form : r))));
    } else {
      setReminders((prev) => [...prev, { ...form }]);
    }
    handleDialogClose();
  };

  // Handle delete
  const handleDelete = (reminder) => {
    setDeleteDialog({ open: true, reminder });
  };
  const confirmDelete = () => {
    setReminders((prev) => prev.filter(r => r !== deleteDialog.reminder));
    setDeleteDialog({ open: false, reminder: null });
  };
  const cancelDelete = () => setDeleteDialog({ open: false, reminder: null });

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
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Garage Reminders
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Overview of all scheduled, completed, and pending service reminders.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleDialogOpen()}>
            Add Reminder
          </Button>
        </Stack>

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

        {/* Search and Filter */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Box sx={{ position: "relative", width: 250 }}>
            <SearchIcon sx={{ position: "absolute", left: 8, top: 10, color: "text.secondary" }} />
            <input
              type="text"
              placeholder="Search vehicle/owner..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 8px 8px 32px",
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                outline: "none",
                fontSize: 16,
                background: theme.palette.background.paper,
              }}
            />
          </Box>
          <Button variant="outlined" startIcon={<FilterAltIcon />} onClick={() => setFilterDrawer(true)}>
            Filters
          </Button>
        </Stack>

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
          {filteredReminders.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography color="textSecondary">No reminders found for the selected criteria.</Typography>
            </Paper>
          ) : (
            filteredReminders.map((item, index) => (
              <Paper key={index} sx={{ p: 2, borderLeft: `4px solid ${typeColors[item.type]}` }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography fontWeight="bold">
                      {item.type} — {item.vehicle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Owner: {item.owner} • Date: {item.date}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={item.type} size="small" sx={{ backgroundColor: typeColors[item.type], color: "#fff" }} />
                    <IconButton size="small" onClick={() => handleDialogOpen(item)} title="Edit Reminder">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(item)} title="Delete Reminder">
                      <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            ))
          )}
        </Stack>

        {/* Add/Edit Reminder Dialog */}
        <Drawer anchor="right" open={dialogOpen} onClose={handleDialogClose}>
          <Box sx={{ width: 350, p: 3 }}>
            <Typography variant="h6" gutterBottom>{editMode ? "Edit Reminder" : "Add Reminder"}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              />
              {formErrors.date && <Typography color="error" variant="caption">{formErrors.date}</Typography>}
              <input
                type="text"
                placeholder="Vehicle Number"
                value={form.vehicle}
                onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              />
              {formErrors.vehicle && <Typography color="error" variant="caption">{formErrors.vehicle}</Typography>}
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              >
                {Object.keys(typeColors).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {formErrors.type && <Typography color="error" variant="caption">{formErrors.type}</Typography>}
              <input
                type="text"
                placeholder="Owner Name"
                value={form.owner}
                onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              />
              {formErrors.owner && <Typography color="error" variant="caption">{formErrors.owner}</Typography>}
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              >
                {reminderTabs.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {formErrors.status && <Typography color="error" variant="caption">{formErrors.status}</Typography>}
              <Button variant="contained" onClick={handleFormSubmit} fullWidth>
                {editMode ? "Update" : "Add"}
              </Button>
              <Button onClick={handleDialogClose} fullWidth>Cancel</Button>
            </Stack>
          </Box>
        </Drawer>

        {/* Filter Drawer */}
        <Drawer anchor="right" open={filterDrawer} onClose={() => setFilterDrawer(false)}>
          <Box sx={{ width: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <select
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              >
                <option value="All">All Statuses</option>
                {reminderTabs.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                name="type"
                value={filter.type}
                onChange={handleFilterChange}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              >
                <option value="All">All Types</option>
                {Object.keys(typeColors).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="date"
                name="fromDate"
                value={filter.fromDate}
                onChange={handleFilterChange}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              />
              <input
                type="date"
                name="toDate"
                value={filter.toDate}
                onChange={handleFilterChange}
                style={{ padding: 8, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
              />
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setFilterDrawer(false)}>Apply</Button>
            </Stack>
          </Box>
        </Drawer>

        {/* Delete Confirmation Dialog */}
        <Drawer anchor="bottom" open={deleteDialog.open} onClose={cancelDelete}>
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>Delete Reminder?</Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Are you sure you want to delete this reminder? This action cannot be undone.
            </Typography>
            <Button variant="contained" color="error" onClick={confirmDelete} sx={{ mr: 2 }}>Delete</Button>
            <Button onClick={cancelDelete}>Cancel</Button>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default GarageReminders;
