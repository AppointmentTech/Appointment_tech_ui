import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  Stack,
  Divider,
  Tooltip,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import {
  Add,
  FilterList,
  MoneyOff,
  Schedule,
  LocalAtm,
  Edit,
  Visibility,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Business,
  Receipt,
} from "@mui/icons-material";
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
import dayjs from "dayjs";
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";

const GarageExpenses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);

  // Mock expense data
  const expenseData = [
    {
      id: 1,
      expenseId: "EXP-001",
      category: "Parts Purchase",
      vendor: "AutoMart Pvt Ltd",
      amount: 12500,
      paymentMethod: "Bank Transfer",
      status: "Paid",
      expenseDate: "2024-01-10",
      notes: "Purchased engine parts",
    },
    {
      id: 2,
      expenseId: "EXP-002",
      category: "Workshop Supplies",
      vendor: "Garage Tools Co.",
      amount: 3200,
      paymentMethod: "Cash",
      status: "Pending",
      expenseDate: null,
      notes: "Screwdrivers, oil cans",
    },
    {
      id: 3,
      expenseId: "EXP-003",
      category: "Electricity",
      vendor: "MSEB",
      amount: 4500,
      paymentMethod: "UPI",
      status: "Paid",
      expenseDate: "2024-01-05",
      notes: "Monthly electricity bill",
    },
  ];

  // Metrics / cards data
  const metrics = [
    {
      title: "Total Expenses",
      value: "₹20,200",
      change: "+8.6%",
      trend: "up",
      icon: <MoneyOff />,
      color: "#f44336",
    },
    {
      title: "Pending Expenses",
      value: "₹3,200",
      change: "-5.3%",
      trend: "down",
      icon: <Schedule />,
      color: "#ff9800",
    },
    {
      title: "Paid Expenses",
      value: "₹17,000",
      change: "+4.2%",
      trend: "up",
      icon: <CheckCircle />,
      color: "#4caf50",
    },
    {
      title: "Top Category",
      value: "Parts Purchase",
      change: "60% of total",
      trend: "up",
      icon: <LocalAtm />,
      color: "#2196f3",
    },
  ];

  // Chart data
  const categoryPieData = [
    { name: "Parts Purchase", value: 60, color: "#4caf50" },
    { name: "Supplies", value: 25, color: "#2196f3" },
    { name: "Utilities", value: 15, color: "#f44336" },
  ];

  const monthlyExpenseTrend = [
    { month: "Jan", expense: 20200 },
    { month: "Dec", expense: 18000 },
    { month: "Nov", expense: 16500 },
  ];

  // Helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "#4caf50";
      case "Pending":
        return "#ff9800";
      case "Overdue":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  // Table columns
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => {
                setSelectedExpense(params.row);
                setDrawerOpen(true);
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
    { field: "expenseId", headerName: "ID", width: 100 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "vendor", headerName: "Vendor", width: 180 },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => (
        <Typography fontWeight="bold" color="primary">
          ₹{params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{ backgroundColor: getStatusColor(params.value), color: "white" }}
        />
      ),
    },
    {
      field: "expenseDate",
      headerName: "Date",
      width: 130,
      valueGetter: (params) => {
        const date = dayjs(params?.row?.expenseDate);
        return date.isValid() ? date.format("DD/MM/YYYY") : "Pending";
      },
    //   valueGetter: (params) => {
    //     const d = dayjs(params.row.expenseDate);
    //     return d.isValid() ? d.format("DD/MM/YYYY") : "Pending";
    //   },
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Side / Top header */}
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
        {/* Page Heading */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Expense Management
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Track all garage-related expenses and monitor spending trends
        </Typography>

        {/* Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {metrics.map((metric, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  borderLeft: `4px solid ${metric.color}`,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {metric.title}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    {metric.trend === "up" ? (
                      <TrendingUp fontSize="small" color="success" />
                    ) : (
                      <TrendingDown fontSize="small" color="error" />
                    )}
                    <Typography
                      variant="caption"
                      color={metric.trend === "up" ? "success.main" : "error.main"}
                    >
                      {metric.change}
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: `${metric.color}20`,
                    color: metric.color,
                  }}
                >
                  {metric.icon}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Category-wise Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryPieData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Monthly Expense Trend
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyExpenseTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="expense" stroke="#f44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Button variant="contained" startIcon={<Add />} onClick={() => setAddDialog(true)}>
            Add Expense
          </Button>
          <Button variant="outlined" startIcon={<FilterList />} onClick={() => setFilterDialog(true)}>
            Filter
          </Button>
        </Stack>

        {/* Expenses Table */}
        <Paper sx={{ height: 400, mb: 3 }}>
          <DataGrid
            rows={expenseData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            checkboxSelection
            disableSelectionOnClick
            onRowClick={(params) => {
              setSelectedExpense(params.row);
              setDrawerOpen(true);
            }}
            components={{ Toolbar: CustomTableToolbar }}
            componentsProps={{ toolbar: { showQuickFilter: true } }}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "action.hover",
              },
            }}
          />
        </Paper>

        {/* Expense Details Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { width: { xs: "100%", sm: 400 } } }}
        >
          {selectedExpense && (
            <Box sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Expense Details
                </Typography>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <Visibility />
                </IconButton>
              </Stack>

              {/* Status Section */}
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: `${getStatusColor(selectedExpense.status)}10`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Chip
                    label={selectedExpense.status}
                    sx={{ backgroundColor: getStatusColor(selectedExpense.status), color: "white" }}
                  />
                  <Typography variant="body2" color="textSecondary">
                  {selectedExpense
                      ? dayjs(selectedExpense.expenseDate).isValid()
                        ? `Paid on ${dayjs(selectedExpense.expenseDate).format("DD MMM YYYY")}`
                        : dayjs(selectedExpense.dueDate).isValid()
                          ? `Due on ${dayjs(selectedExpense.dueDate).format("DD MMM YYYY")}`
                          : "Invalid date"
                      : "No payment information"}
                    {/* {selectedExpense.status === "Paid" && dayjs(selectedExpense.expenseDate).isValid()
                      ? `Paid on ${dayjs(selectedExpense.expenseDate).format("DD/MM/YYYY")}`
                      : "Payment pending"} */}
                  </Typography>
                </Stack>
              </Paper>

              {/* Expense Info */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Expense Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Expense ID
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedExpense.expenseId}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Category
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedExpense.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">
                      Amount
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      ₹{selectedExpense.amount.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Vendor Info */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Vendor Information
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar>
                    {selectedExpense.vendor.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedExpense.vendor}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Vendor
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Payment Method */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Payment Method
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocalAtm color="action" />
                  <Typography variant="body2" fontWeight="medium">
                    {selectedExpense.paymentMethod}
                  </Typography>
                </Stack>
              </Paper>

              {/* Notes */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Notes
                </Typography>
                <Typography variant="body2">
                  {selectedExpense.notes || "-"}
                </Typography>
              </Paper>

              {/* Actions */}
              <Stack direction="row" spacing={2}>
                <Button variant="contained" fullWidth startIcon={<Edit />}>
                  Edit Expense
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Receipt />}>
                  View Receipt
                </Button>
              </Stack>
            </Box>
          )}
        </Drawer>

        {/* Add Expense Dialog */}
        <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Category" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Vendor" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Amount" size="small" type="number" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select label="Status">
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Notes" multiline rows={3} size="small" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setAddDialog(false)}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Filter Dialog */}
        <Dialog open={filterDialog} onClose={() => setFilterDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Filter Expenses</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select label="Status">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="From Date" type="date" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="To Date" type="date" size="small" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setFilterDialog(false)}>
              Apply Filters
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageExpenses;