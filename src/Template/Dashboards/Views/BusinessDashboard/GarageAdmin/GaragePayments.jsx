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
  Card,
  CardContent,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";
import {
  Payment,
  AccountBalance,
  Receipt,
  CreditCard,
  TrendingUp,
  TrendingDown,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Add,
  FilterList,
  Download,
  Print,
  Email,
  WhatsApp,
  Phone,
  CalendarToday,
  Person,
  Business,
  AttachMoney,
  CheckCircle,
  Warning,
  Error,
  Schedule,
  LocalShipping,
  Build,
  DirectionsCar,
  // Unused icons commented out as per user preference
  // ReceiptLong,
  // AccountBalanceWallet,
  // PaymentOutlined,
  // CreditCardOff,
  // MoneyOff,
  // CurrencyRupee,
  // CurrencyExchange,
  // AccountCircle,
  // BusinessCenter,
  // Store,
  // LocalAtm,
  // MonetizationOn,
  // Euro,
  // Pound,
  // Yen,
  // Dollar,
  // Rupee,
  // Bitcoin,
  // QrCode,
  // QrCode2,
  // QrCodeScanner,
  // Contactless,
  // ContactlessOutlined,
  // CreditScore,
  // CreditScoreOutlined,
  // AccountBalanceOutlined,
  // AccountBalanceWalletOutlined,
  // PaymentOutlined,
  // ReceiptOutlined,
  // ReceiptLongOutlined,
  // CreditCardOutlined,
  // CreditCardOffOutlined,
  // MoneyOffOutlined,
  // CurrencyRupeeOutlined,
  // CurrencyExchangeOutlined,
  // AccountCircleOutlined,
  // BusinessCenterOutlined,
  // StoreOutlined,
  // LocalAtmOutlined,
  // MonetizationOnOutlined,
  // EuroOutlined,
  // PoundOutlined,
  // YenOutlined,
  // DollarOutlined,
  // RupeeOutlined,
  // BitcoinOutlined,
  // QrCodeOutlined,
  // QrCode2Outlined,
  // QrCodeScannerOutlined,
  // ContactlessOutlined,
  // CreditScoreOutlined,
  // AccountBalanceOutlined,
  // AccountBalanceWalletOutlined
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
const GaragePayments = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addPaymentDialog, setAddPaymentDialog] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);
  const [bulkActionDialog, setBulkActionDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Mock data for payments
  const mockPayments = [
    {
      id: 1,
      paymentId: "PAY-001",
      customerName: "Rajesh Kumar",
      customerPhone: "+91 98765 43210",
      vehicleNumber: "MH-12-AB-1234",
      serviceType: "Engine Repair",
      amount: 8500,
      paymentMethod: "UPI",
      paymentStatus: "Completed",
      paymentDate: "2024-01-15",
      dueDate: "2024-01-15",
      technician: "Amit Singh",
      invoiceNumber: "INV-2024-001",
      gstAmount: 1275,
      totalAmount: 9775,
      paymentReference: "UPI123456789",
      notes: "Engine oil change and filter replacement",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      paymentId: "PAY-002",
      customerName: "Priya Sharma",
      customerPhone: "+91 87654 32109",
      vehicleNumber: "DL-01-CD-5678",
      serviceType: "Brake Service",
      amount: 3200,
      paymentMethod: "Cash",
      paymentStatus: "Pending",
      paymentDate: null,
      dueDate: "2024-01-20",
      technician: "Vikram Patel",
      invoiceNumber: "INV-2024-002",
      gstAmount: 480,
      totalAmount: 3680,
      paymentReference: null,
      notes: "Brake pad replacement and brake fluid check",
      createdAt: "2024-01-16T14:20:00Z",
    },
    {
      id: 3,
      paymentId: "PAY-003",
      customerName: "Suresh Verma",
      customerPhone: "+91 76543 21098",
      vehicleNumber: "KA-05-EF-9012",
      serviceType: "AC Service",
      amount: 4500,
      paymentMethod: "Card",
      paymentStatus: "Completed",
      paymentDate: "2024-01-17",
      dueDate: "2024-01-17",
      technician: "Rahul Gupta",
      invoiceNumber: "INV-2024-003",
      gstAmount: 675,
      totalAmount: 5175,
      paymentReference: "CARD987654321",
      notes: "AC gas refill and filter cleaning",
      createdAt: "2024-01-17T09:15:00Z",
    },
    {
      id: 4,
      paymentId: "PAY-004",
      customerName: "Meera Patel",
      customerPhone: "+91 65432 10987",
      vehicleNumber: "TN-07-GH-3456",
      serviceType: "Wheel Alignment",
      amount: 1200,
      paymentMethod: "Paytm",
      paymentStatus: "Completed",
      paymentDate: "2024-01-18",
      dueDate: "2024-01-18",
      technician: "Arun Kumar",
      invoiceNumber: "INV-2024-004",
      gstAmount: 180,
      totalAmount: 1380,
      paymentReference: "PAYTM456789123",
      notes: "Four wheel alignment and balancing",
      createdAt: "2024-01-18T16:45:00Z",
    },
    {
      id: 5,
      paymentId: "PAY-005",
      customerName: "Vikram Singh",
      customerPhone: "+91 54321 09876",
      vehicleNumber: "AP-13-IJ-7890",
      serviceType: "Battery Replacement",
      amount: 2800,
      paymentMethod: "Bank Transfer",
      paymentStatus: "Completed",
      paymentDate: "2024-01-19",
      dueDate: "2024-01-19",
      technician: "Sandeep Yadav",
      invoiceNumber: "INV-2024-005",
      gstAmount: 420,
      totalAmount: 3220,
      paymentReference: "NEFT789123456",
      notes: "New battery installation and testing",
      createdAt: "2024-01-19T11:30:00Z",
    },
  ].map((item, idx) => ({ ...item, id: item.id || idx + 1 }));

  // Payment metrics
  const paymentMetrics = [
    {
      title: "Total Revenue",
      value: "₹45,230",
      change: "+12.5%",
      trend: "up",
      icon: <AttachMoney />,
      color: "#4caf50",
    },
    {
      title: "Pending Payments",
      value: "₹3,680",
      change: "-8.2%",
      trend: "down",
      icon: <Schedule />,
      color: "#ff9800",
    },
    {
      title: "Completed Payments",
      value: "₹41,550",
      change: "+15.3%",
      trend: "up",
      icon: <CheckCircle />,
      color: "#2196f3",
    },
    {
      title: "Payment Success Rate",
      value: "92.8%",
      change: "+2.1%",
      trend: "up",
      icon: <TrendingUp />,
      color: "#9c27b0",
    },
  ];

  // Payment method distribution data
  const paymentMethodData = [
    { name: "UPI", value: 35, color: "#4caf50" },
    { name: "Cash", value: 25, color: "#2196f3" },
    { name: "Card", value: 20, color: "#ff9800" },
    { name: "Paytm", value: 15, color: "#9c27b0" },
    { name: "Bank Transfer", value: 5, color: "#f44336" },
  ];

  // Monthly revenue data
  const monthlyRevenueData = [
    { month: "Jan", revenue: 45230, pending: 3680 },
    { month: "Dec", revenue: 40150, pending: 4200 },
    { month: "Nov", revenue: 38920, pending: 3800 },
    { month: "Oct", revenue: 42100, pending: 3500 },
    { month: "Sep", revenue: 39500, pending: 4100 },
    { month: "Aug", revenue: 37800, pending: 4300 },
  ];

  // Payment status distribution
  const paymentStatusData = [
    { status: "Completed", count: 92, color: "#4caf50" },
    { status: "Pending", count: 6, color: "#ff9800" },
    { status: "Failed", count: 2, color: "#f44336" },
  ];

  // Live payment alerts
  const paymentAlerts = [
    {
      id: 1,
      type: "warning",
      message: "Payment overdue for INV-2024-002 (₹3,680)",
      customer: "Priya Sharma",
      dueDate: "2024-01-20",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "success",
      message: "Payment received via UPI for INV-2024-006",
      customer: "Ramesh Kumar",
      amount: "₹5,200",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "info",
      message: "New payment scheduled for tomorrow",
      customer: "Anita Desai",
      amount: "₹2,800",
      time: "30 minutes ago",
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "payment_received",
      title: "Payment Received",
      description: "₹8,500 received from Rajesh Kumar via UPI",
      time: "2 hours ago",
      icon: <CheckCircle />,
      color: "#4caf50",
    },
    {
      id: 2,
      type: "payment_pending",
      title: "Payment Pending",
      description: "₹3,680 pending from Priya Sharma (Due: 2024-01-20)",
      time: "4 hours ago",
      icon: <Warning />,
      color: "#ff9800",
    },
    {
      id: 3,
      type: "payment_failed",
      title: "Payment Failed",
      description: "₹2,100 payment failed for Suresh Verma",
      time: "6 hours ago",
      icon: <Error />,
      color: "#f44336",
    },
    {
      id: 4,
      type: "invoice_generated",
      title: "Invoice Generated",
      description: "New invoice INV-2024-007 generated for ₹4,500",
      time: "1 day ago",
      icon: <Receipt />,
      color: "#2196f3",
    },
    {
      id: 5,
      type: "payment_reminder",
      title: "Payment Reminder Sent",
      description: "Reminder sent to 5 customers with pending payments",
      time: "1 day ago",
      icon: <Email />,
      color: "#9c27b0",
    },
  ];

  const handleRowClick = (params) => {
    setSelectedPayment(params.row);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPayment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#4caf50";
      case "Pending":
        return "#ff9800";
      case "Failed":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "UPI":
        return <Payment />;
      case "Cash":
        return <AttachMoney />;
      case "Card":
        return <CreditCard />;
      case "Paytm":
        return <Payment />;
      case "Bank Transfer":
        return <AccountBalance />;
      default:
        return <Payment />;
    }
  };

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPayment(params.row);
                setDrawerOpen(true);
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Payment">
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Actions">
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
    {
      field: "paymentId",
      headerName: "Payment ID",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.customerPhone}
          </Typography>
        </Box>
      ),
    },
    {
      field: "vehicleNumber",
      headerName: "Vehicle",
      width: 130,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.serviceType}
          </Typography>
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          ₹{params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 140,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          {getPaymentMethodIcon(params.value)}
          <Typography variant="body2">{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: getStatusColor(params.value),
            color: "white",
            fontWeight: "medium",
          }}
        />
      ),
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 130,
      valueGetter: (params) => {
        const date = dayjs(params?.row?.paymentDate);
        return date.isValid() ? date.format("DD/MM/YYYY") : "Pending";
      },
    },
    {
      field: "technician",
      headerName: "Technician",
      width: 130,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem" }}>
            {params.value?.charAt(0)}
          </Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Stack>
      ),
    },
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
          height: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Payment Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage all payment transactions, track revenue, and handle payment
            processing
          </Typography>
        </Box>

        {/* Metrics Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Payment Overview
          </Typography>
          <Grid container spacing={3}>
            {paymentMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
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
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp fontSize="small" color="success" />
                      ) : (
                        <TrendingDown fontSize="small" color="error" />
                      )}
                      <Typography
                        variant="caption"
                        color={
                          metric.trend === "up" ? "success.main" : "error.main"
                        }
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
        </Box>

        {/* Quick Actions Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Quick Actions
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddPaymentDialog(true)}
            >
              Add Payment
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterDialog(true)}
            >
              Filter Payments
            </Button>
            <Button variant="outlined" startIcon={<Download />}>
              Export Data
            </Button>
            <Button variant="outlined" startIcon={<Print />}>
              Print Report
            </Button>
            <Button variant="outlined" startIcon={<Email />}>
              Send Reminders
            </Button>
            <Button variant="outlined" startIcon={<WhatsApp />}>
              WhatsApp Reminders
            </Button>
          </Stack>
        </Box>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Payment Method Distribution */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Payment Method Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Monthly Revenue Trend */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Monthly Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4caf50"
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="#ff9800"
                    strokeWidth={2}
                    name="Pending"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Live Payment Alerts */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Live Payment Alerts
          </Typography>
          <Grid container spacing={2}>
            {paymentAlerts.map((alert) => (
              <Grid item xs={12} sm={6} md={4} key={alert.id}>
                <Paper
                  sx={{
                    p: 2,
                    borderLeft: `4px solid ${
                      alert.type === "success"
                        ? "#4caf50"
                        : alert.type === "warning"
                          ? "#ff9800"
                          : "#2196f3"
                    }`,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: `${
                          alert.type === "success"
                            ? "#4caf50"
                            : alert.type === "warning"
                              ? "#ff9800"
                              : "#2196f3"
                        }20`,
                      }}
                    >
                      {alert.type === "success" ? (
                        <CheckCircle color="success" />
                      ) : alert.type === "warning" ? (
                        <Warning color="warning" />
                      ) : (
                        <Schedule color="info" />
                      )}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {alert.customer} • {alert.time}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Payments Table */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Payment Transactions
          </Typography>
          <Paper sx={{ height: 400 }}>
            <DataGrid
              rows={mockPayments}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              checkboxSelection
              disableSelectionOnClick
              onRowClick={handleRowClick}
              components={{
                Toolbar: CustomTableToolbar,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              sx={{
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            />
          </Paper>
        </Box>

        {/* Recent Activity */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Recent Activity
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              {recentActivity.map((activity) => (
                <Box key={activity.id}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: `${activity.color}20`,
                        color: activity.color,
                      }}
                    >
                      {activity.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {activity.description}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                      {activity.time}
                    </Typography>
                  </Stack>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Payment Details Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: { width: { xs: "100%", sm: 400 } },
          }}
        >
          {selectedPayment && (
            <Box sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Payment Details
                </Typography>
                <IconButton onClick={handleCloseDrawer}>
                  <MoreVert />
                </IconButton>
              </Stack>

              {/* Payment Status */}
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: `${getStatusColor(selectedPayment.paymentStatus)}10`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={selectedPayment.paymentStatus}
                    sx={{
                      backgroundColor: getStatusColor(
                        selectedPayment.paymentStatus,
                      ),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {selectedPayment
                      ? dayjs(selectedPayment.paymentDate).isValid()
                        ? `Paid on ${dayjs(selectedPayment.paymentDate).format("DD MMM YYYY")}`
                        : dayjs(selectedPayment.dueDate).isValid()
                          ? `Due on ${dayjs(selectedPayment.dueDate).format("DD MMM YYYY")}`
                          : "Invalid date"
                      : "No payment information"}
                  </Typography>
                </Stack>
              </Paper>

              {/* Payment Information */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Payment Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Payment ID
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedPayment.paymentId}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Invoice Number
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedPayment.invoiceNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Amount
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary"
                    >
                      ₹{selectedPayment.amount.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      GST Amount
                    </Typography>
                    <Typography variant="body2">
                      ₹{selectedPayment.gstAmount.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">
                      Total Amount
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      ₹{selectedPayment.totalAmount.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Customer Information */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Customer Information
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {selectedPayment.customerName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedPayment.customerName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {selectedPayment.customerPhone}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <DirectionsCar color="action" />
                    <Typography variant="body2">
                      {selectedPayment.vehicleNumber}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>

              {/* Service Details */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Service Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Service Type
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedPayment.serviceType}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Technician
                    </Typography>
                    <Typography variant="body2">
                      {selectedPayment.technician}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">
                      Notes
                    </Typography>
                    <Typography variant="body2">
                      {selectedPayment.notes}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Payment Method */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Payment Method
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedPayment.paymentMethod}
                    </Typography>
                    {selectedPayment.paymentReference && (
                      <Typography variant="body2" color="textSecondary">
                        Ref: {selectedPayment.paymentReference}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Paper>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button variant="contained" fullWidth startIcon={<Edit />}>
                  Edit Payment
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Receipt />}>
                  View Invoice
                </Button>
              </Stack>
            </Box>
          )}
        </Drawer>

        {/* Add Payment Dialog */}
        <Dialog
          open={addPaymentDialog}
          onClose={() => setAddPaymentDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight="bold">
              Add New Payment
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Vehicle Number"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Service Type"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  variant="outlined"
                  size="small"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Payment Method</InputLabel>
                  <Select label="Payment Method">
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Card">Card</MenuItem>
                    <MenuItem value="Paytm">Paytm</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddPaymentDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => setAddPaymentDialog(false)}
            >
              Add Payment
            </Button>
          </DialogActions>
        </Dialog>

        {/* Filter Dialog */}
        <Dialog
          open={filterDialog}
          onClose={() => setFilterDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight="bold">
              Filter Payments
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Payment Status</InputLabel>
                  <Select label="Payment Status">
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Payment Method</InputLabel>
                  <Select label="Payment Method">
                    <MenuItem value="all">All Methods</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Card">Card</MenuItem>
                    <MenuItem value="Paytm">Paytm</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date From"
                  variant="outlined"
                  size="small"
                  type="date"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date To"
                  variant="outlined"
                  size="small"
                  type="date"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Show only overdue payments"
                />
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

export default GaragePayments;
