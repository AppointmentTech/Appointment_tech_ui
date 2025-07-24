import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  LinearProgress,
  Stack,
  Drawer,
  List,
  ListItem,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import GarageIcon from "@mui/icons-material/Garage";
import PaymentIcon from "@mui/icons-material/Payment";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import Star from "@mui/icons-material/Star";
import Alarm from "@mui/icons-material/Alarm";
import LocalOffer from "@mui/icons-material/LocalOffer";
import Receipt from "@mui/icons-material/Receipt";
import MoneyOff from "@mui/icons-material/MoneyOff";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Add from "@mui/icons-material/Add";
import Download from "@mui/icons-material/Download";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import Refresh from "@mui/icons-material/Refresh";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip as RechartsTooltip } from "recharts";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import { DataGrid } from '@mui/x-data-grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Snackbar from '@mui/material/Snackbar';

export default function GarageAdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data
  const metrics = [
    {
      title: "Total Revenue",
      value: "₹4,80,000",
      change: "+10.2%",
      trend: "up",
      icon: <PaymentIcon color="primary" />, color: "#4CAF50",
    },
    {
      title: "Total Bookings",
      value: "1,120",
      change: "+6.8%",
      trend: "up",
      icon: <GarageIcon color="primary" />, color: "#2196F3",
    },
    {
      title: "Vehicles Serviced",
      value: "950",
      change: "+4.5%",
      trend: "up",
      icon: <DirectionsCar color="primary" />, color: "#FF9800",
    },
    {
      title: "Pending Job Cards",
      value: "18",
      change: "-8.1%",
      trend: "down",
      icon: <AssignmentIcon color="primary" />, color: "#F44336",
    },
    {
      title: "Low Stock Alerts",
      value: "5",
      change: "+2",
      trend: "up",
      icon: <InventoryIcon color="primary" />, color: "#9C27B0",
    },
    {
      title: "Customer Rating",
      value: "4.7/5",
      change: "+0.1",
      trend: "up",
      icon: <Star color="primary" />, color: "#FFC107",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 80000, bookings: 90 },
    { month: "Feb", revenue: 90000, bookings: 110 },
    { month: "Mar", revenue: 75000, bookings: 95 },
    { month: "Apr", revenue: 120000, bookings: 140 },
    { month: "May", revenue: 95000, bookings: 120 },
    { month: "Jun", revenue: 110000, bookings: 130 },
  ];

  const inventoryData = [
    { part: "Engine Oil", stock: 12 },
    { part: "Brake Pads", stock: 5 },
    { part: "Air Filter", stock: 8 },
    { part: "Coolant", stock: 3 },
    { part: "Spark Plug", stock: 15 },
  ];

  const jobCardStatus = [
    { status: "Completed", value: 60, color: "#4CAF50" },
    { status: "In Progress", value: 25, color: "#2196F3" },
    { status: "Pending", value: 15, color: "#F44336" },
  ];

  const staffAttendance = [
    { name: "Present", value: 18, color: "#4CAF50" },
    { name: "Absent", value: 2, color: "#F44336" },
  ];

  const customerSatisfaction = [
    { aspect: "Service Quality", rating: 4.8 },
    { aspect: "Timeliness", rating: 4.6 },
    { aspect: "Pricing", rating: 4.5 },
    { aspect: "Cleanliness", rating: 4.7 },
    { aspect: "Communication", rating: 4.6 },
    { aspect: "Transparency", rating: 4.5 },
  ];

  const recentJobs = [
    {
      id: 1,
      customer: "Amit Sharma",
      vehicle: "Maruti Swift",
      job: "Oil Change",
      date: "2024-06-01",
      amount: "₹2,000",
      status: "Completed",
    },
    {
      id: 2,
      customer: "Priya Singh",
      vehicle: "Honda Activa",
      job: "Brake Repair",
      date: "2024-06-02",
      amount: "₹1,200",
      status: "In Progress",
    },
    {
      id: 3,
      customer: "Ravi Kumar",
      vehicle: "Hyundai i20",
      job: "AC Service",
      date: "2024-06-03",
      amount: "₹2,500",
      status: "Pending",
    },
    {
      id: 4,
      customer: "Sunita Verma",
      vehicle: "Bajaj Pulsar",
      job: "Chain Adjustment",
      date: "2024-06-04",
      amount: "₹800",
      status: "Completed",
    },
  ];

  // Fix for DataGrid: ensure all rows have a unique id
  const lowStockParts = inventoryData
    .filter((item) => item.stock < 10)
    .map((item, idx) => ({ ...item, id: idx + 1 }));

  // New mock data for enhancements
  const [selectedJobIDs, setSelectedJobIDs] = useState([]);
  const [selectedStockIDs, setSelectedStockIDs] = useState([]);

  const reminders = [
    { id: 1, vehicle: "Maruti Swift", type: "Insurance", due: "2024-06-10", customer: "Amit Sharma", contact: "+91-9876543210" },
    { id: 2, vehicle: "Honda Activa", type: "PUC", due: "2024-06-12", customer: "Priya Singh", contact: "+91-9123456780" },
    { id: 3, vehicle: "Hyundai i20", type: "Service", due: "2024-06-15", customer: "Ravi Kumar", contact: "+91-9988776655" },
  ];

  const remindersWithId = reminders.map((item, idx) => ({ ...item, id: item.id || idx + 1 }));

  const pendingPayments = [
    { id: 1, customer: "Amit Sharma", vehicle: "Maruti Swift", amount: "₹1,500", due: "2024-06-10", contact: "+91-9876543210" },
    { id: 2, customer: "Sunita Verma", vehicle: "Bajaj Pulsar", amount: "₹800", due: "2024-06-12", contact: "+91-9988776655" },
  ];

  const pendingPaymentsWithId = pendingPayments.map((item, idx) => ({ ...item, id: item.id || idx + 1 }));

  const supplierOrders = [
    { id: 1, supplier: "ABC Spares", part: "Brake Pads", qty: 20, status: "Pending", ordered: "2024-06-01" },
    { id: 2, supplier: "XYZ Lubes", part: "Engine Oil", qty: 50, status: "Received", ordered: "2024-05-28" },
  ];

  const supplierOrdersWithId = supplierOrders.map((item, idx) => ({ ...item, id: item.id || idx + 1 }));

  const feedbacks = [
    { id: 1, customer: "Amit Sharma", rating: 5, comment: "Great service!", date: "2024-06-01" },
    { id: 2, customer: "Priya Singh", rating: 4, comment: "Quick and professional.", date: "2024-06-02" },
    { id: 3, customer: "Ravi Kumar", rating: 3, comment: "Average experience.", date: "2024-06-03" },
  ];

  const feedbacksWithId = feedbacks.map((item, idx) => ({ ...item, id: item.id || idx + 1 }));

  // Quick Actions
  const quickActions = [
    { label: "Add Job", icon: <AssignmentIcon color="primary" /> },
    { label: "Add Vehicle", icon: <DirectionsCar color="primary" /> },
    { label: "Add Payment", icon: <PaymentIcon color="primary" /> },
    { label: "Add Supplier Order", icon: <LocalShipping color="primary" /> },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      case "Pending":
        return "error";
      default:
        return "default";
    }
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <TrendingUp sx={{ color: "#4CAF50" }} />
    ) : (
      <TrendingDown sx={{ color: "#F44336" }} />
    );
  };

  // Table columns for CustomTableToolbar
  const jobColumns = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details"><IconButton onClick={() => handleViewDetails(params.row, 'Job Details')}><Visibility /></IconButton></Tooltip>
          <Tooltip title="Edit"><IconButton onClick={() => console.log('Edit', params.row)}><Edit /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton onClick={() => console.log('Delete', params.row)} color="error"><Delete /></IconButton></Tooltip>
        </Box>
      ),
    },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "vehicle", headerName: "Vehicle", flex: 1 },
    { field: "job", headerName: "Job", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "status", headerName: "Status", flex: 1, renderCell: (params) => renderStatusChip(params.value) },
  ];
  const stockColumns = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details"><IconButton onClick={() => handleViewDetails(params.row, 'Stock Details')}><Visibility /></IconButton></Tooltip>
          <Tooltip title="Edit"><IconButton onClick={() => console.log('Edit', params.row)}><Edit /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton onClick={() => console.log('Delete', params.row)} color="error"><Delete /></IconButton></Tooltip>
        </Box>
      ),
    },
    { field: "part", headerName: "Part", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 1 },
  ];

  // Add mock data for document management
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Insurance.pdf', type: 'Insurance', uploaded: '2024-06-01', url: '#' },
    { id: 2, name: 'PUC.pdf', type: 'PUC', uploaded: '2024-06-02', url: '#' },
    { id: 3, name: 'ServiceReport.pdf', type: 'Service', uploaded: '2024-06-03', url: '#' },
  ]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Add mock data for advanced analytics
  const revenueByService = [
    { service: 'Oil Change', revenue: 50000 },
    { service: 'Brake Repair', revenue: 35000 },
    { service: 'AC Service', revenue: 25000 },
    { service: 'General Service', revenue: 60000 },
  ];
  const repeatCustomers = [
    { name: 'Amit Sharma', visits: 5 },
    { name: 'Priya Singh', visits: 4 },
    { name: 'Ravi Kumar', visits: 3 },
  ];

  const documentsWithId = documents.map((item, idx) => ({ ...item, id: item.id || idx + 1 }));

  // Add state for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState('');

  // Add state for confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAction, setConfirmDialogAction] = useState('');

  // Add state for Add Data dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogType, setAddDialogType] = useState('');
  const [addFormData, setAddFormData] = useState({});
  const [addSuccess, setAddSuccess] = useState(false);

  // Add state for Bulk Action Details dialog
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkDialogType, setBulkDialogType] = useState('');

  // Helper to open drawer with row data and title
  const handleViewDetails = (row, title) => {
    setDrawerData(row);
    setDrawerTitle(title);
    setDrawerOpen(true);
  };

  const handleQuickAction = (action) => {
    if (action === 'reminder') {
      setConfirmDialogAction('Send Reminder to All');
      setConfirmDialogOpen(true);
    } else if (action === 'export') {
      setBulkDialogType('export');
      setBulkDialogOpen(true);
    } else if (action === 'pendingJobs') {
      setBulkDialogType('pendingJobs');
      setBulkDialogOpen(true);
    } else if (action === 'lowStock') {
      setBulkDialogType('lowStock');
      setBulkDialogOpen(true);
    } else if (action.startsWith('add')) {
      setAddDialogType(action.replace('add', ''));
      setAddFormData({});
      setAddDialogOpen(true);
    } else {
      alert(`Action: ${action}`);
    }
  };

  const handleAddFormChange = (key, value) => {
    setAddFormData(prev => ({ ...prev, [key]: value }));
  };
  const handleAddFormSubmit = () => {
    setAddDialogOpen(false);
    setAddSuccess(true);
  };

  // Helper to render status as Chip
  const renderStatusChip = (status) => {
    if (!status) return null;
    let color = 'default';
    if (typeof status === 'string') {
      if (status.toLowerCase().includes('pending')) color = 'warning';
      else if (status.toLowerCase().includes('completed') || status.toLowerCase().includes('received') || status.toLowerCase().includes('success')) color = 'success';
      else if (status.toLowerCase().includes('in progress')) color = 'info';
      else if (status.toLowerCase().includes('absent') || status.toLowerCase().includes('cancel') || status.toLowerCase().includes('error')) color = 'error';
    }
    return <Chip label={status} color={color} size="small" sx={{ ml: 1 }} />;
  };

  const fieldIconMap = {
    customer: <PersonIcon fontSize="small" sx={{ mr: 1 }} />,
    name: <PersonIcon fontSize="small" sx={{ mr: 1 }} />,
    vehicle: <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />,
    date: <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />,
    checkin: <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />,
    checkout: <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />,
    amount: <PaymentIcon fontSize="small" sx={{ mr: 1 }} />,
    payment: <PaymentIcon fontSize="small" sx={{ mr: 1 }} />,
    job: <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />,
    status: <InfoIcon fontSize="small" sx={{ mr: 1 }} />,
    type: <InfoIcon fontSize="small" sx={{ mr: 1 }} />,
    uploaded: <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />,
    part: <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />,
    stock: <InfoIcon fontSize="small" sx={{ mr: 1 }} />,
    rating: <Star fontSize="small" sx={{ mr: 1 }} />,
    comment: <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />,
  };

  // Grouping logic
  const groupFields = (data) => {
    if (!data) return [];
    const groups = [
      {
        label: 'Customer Info',
        fields: Object.entries(data).filter(([k]) => ['customer', 'name', 'contact'].includes(k.toLowerCase())),
      },
      {
        label: 'Vehicle Info',
        fields: Object.entries(data).filter(([k]) => ['vehicle', 'part', 'type'].includes(k.toLowerCase())),
      },
      {
        label: 'Status/Meta',
        fields: Object.entries(data).filter(([k]) => ['status', 'rating', 'comment', 'uploaded'].includes(k.toLowerCase())),
      },
      {
        label: 'Financial',
        fields: Object.entries(data).filter(([k]) => ['amount', 'payment', 'qty'].includes(k.toLowerCase())),
      },
      {
        label: 'Other',
        fields: Object.entries(data).filter(([k]) => !['customer','name','contact','vehicle','part','type','status','rating','comment','uploaded','amount','payment','qty','id'].includes(k.toLowerCase())),
      },
    ];
    return groups.filter(g => g.fields.length > 0);
  };

  // Drawer edit mode state
  const [drawerEdit, setDrawerEdit] = useState(false);
  const [drawerEditData, setDrawerEditData] = useState({});

  const handleDrawerEdit = () => {
    setDrawerEditData(drawerData);
    setDrawerEdit(true);
  };
  const handleDrawerEditChange = (key, value) => {
    setDrawerEditData(prev => ({ ...prev, [key]: value }));
  };
  const handleDrawerEditSave = () => {
    setDrawerEdit(false);
    setDrawerData(drawerEditData); // mock save
  };
  const handleDrawerEditCancel = () => {
    setDrawerEdit(false);
    setDrawerEditData({});
  };

  return (
    <React.Fragment>
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
          {/* Header Section */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            mb={4}
            gap={2}
          >
            <Box>
              <Typography
                variant={{ xs: "h5", md: "h4" }}
                fontWeight="bold"
                color="primary"
              >
                Garage Management Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive monitoring and management of garage operations, bookings, and performance metrics
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Typography variant="caption" color="text.secondary">
                  Last updated: {new Date().toLocaleDateString()}
                </Typography>
                <Chip label="Live Data" size="small" color="success" variant="outlined" />
                <Chip label="24/7 Monitoring" size="small" color="info" variant="outlined" />
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
              width={{ xs: "100%", md: "auto" }}
            >
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 120 },
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>

              <TextField
                placeholder="Search jobs, vehicles, customers..."
                size="small"
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  minWidth: { xs: "100%", sm: 250 },
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              />

              <Box display="flex" gap={1}>
                <Button variant="outlined" startIcon={<Refresh />} size="small">
                  Refresh
                </Button>
                <Button variant="contained" startIcon={<Download />} size="small">
                  Export
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Quick Actions */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Quick Actions
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Add Actions</Typography>
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Add a new job">
                        <Button variant="outlined" startIcon={<AssignmentIcon color="primary" />} fullWidth size="large" onClick={() => handleQuickAction('addJob')}>
                          Add Job
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Add a new vehicle">
                        <Button variant="outlined" startIcon={<DirectionsCarIcon color="primary" />} fullWidth size="large" onClick={() => handleQuickAction('addVehicle')}>
                          Add Vehicle
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Add a new payment">
                        <Button variant="outlined" startIcon={<PaymentIcon color="primary" />} fullWidth size="large" onClick={() => handleQuickAction('addPayment')}>
                          Add Payment
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Add a new supplier order">
                        <Button variant="outlined" startIcon={<LocalShipping color="primary" />} fullWidth size="large" onClick={() => handleQuickAction('addSupplierOrder')}>
                          Add Supplier Order
                        </Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Bulk/Utility Actions</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Pending jobs needing attention">
                        <Button variant="outlined" startIcon={<Badge badgeContent={18} color="error"><AssignmentIcon color="warning" /></Badge>} fullWidth size="large" onClick={() => handleQuickAction('pendingJobs')}>
                          Pending Jobs
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Low stock parts needing reorder">
                        <Button variant="outlined" startIcon={<Badge badgeContent={lowStockParts.length} color="error"><InventoryIcon color="error" /></Badge>} fullWidth size="large" onClick={() => handleQuickAction('lowStock')}>
                          Low Stock Alerts
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Send reminder to all customers">
                        <Button variant="outlined" startIcon={<NotificationsActiveIcon color="primary" />} fullWidth size="large" onClick={() => handleQuickAction('reminder')}>
                          Send Reminder to All
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Tooltip title="Export all garage data">
                        <Button variant="outlined" startIcon={<FileDownloadIcon color="primary" />} fullWidth size="large" onClick={() => handleQuickAction('export')}>
                          Export All Data
                        </Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  {/* Confirmation Dialog for critical actions */}
                  <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogContent>
                      <Typography>Are you sure you want to {confirmDialogAction}?</Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
                      <Button variant="contained" color="primary" onClick={() => { setConfirmDialogOpen(false); alert(`${confirmDialogAction} completed!`); }}>Yes, Proceed</Button>
                    </DialogActions>
                  </Dialog>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Metrics Cards */}
          <Grid container spacing={3} mb={4}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {metric.title}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {metric.value}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          {getTrendIcon(metric.trend)}
                          <Typography
                            variant="body2"
                            color={metric.trend === "up" ? "success.main" : "error.main"}
                          >
                            {metric.change}
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: metric.color + "20",
                          color: metric.color,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {metric.icon}
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Key Insights */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Key Insights
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    - Average customer rating is 4.7/5, indicating high satisfaction.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    - 950 vehicles serviced this month, a 4.5% increase from last month.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    - Total revenue of ₹4,80,000, a 10.2% increase from last month.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Advanced Analytics */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Revenue by Service Type
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueByService}>
                      <XAxis dataKey="service" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Repeat Customers
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={repeatCustomers}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        paddingAngle={5}
                        dataKey="visits"
                      >
                        {repeatCustomers.map((entry, index) => (
                          <Cell key={`cell-repeat-${index}`} fill={`hsl(${index * 50}, 70%, 50%)`} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={3} mb={4}>
            {/* Revenue Chart */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Revenue & Bookings Trend
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4CAF50"
                        strokeWidth={2}
                        name="Revenue (₹)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="bookings"
                        stroke="#2196F3"
                        strokeWidth={2}
                        name="Bookings"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Job Card Status Pie Chart */}
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Job Card Status
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={jobCardStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {jobCardStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Box textAlign="center" mt={2}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {jobCardStatus[0].value + jobCardStatus[1].value + jobCardStatus[2].value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Job Cards
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Customer Satisfaction and Low Stock Parts */}
          <Grid container spacing={3} mb={4}>
            {/* Customer Satisfaction Radar */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Customer Satisfaction Metrics
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={customerSatisfaction}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="aspect" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Rating" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Low Stock Parts Table */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Low Stock Parts
                  </Typography>
                  <DataGrid
                    rows={lowStockParts}
                    columns={stockColumns}
                    checkboxSelection
                    components={{ Toolbar: CustomTableToolbar }}
                    componentsProps={{
                      toolbar: {
                        selectedIDs: selectedStockIDs,
                        handleDelete: () => {
                          setLowStockParts(lowStockParts.filter((_, index) => !selectedStockIDs.includes(index)));
                          setSelectedStockIDs([]);
                        },
                        handleExport: () => console.log("Export Low Stock Parts"),
                        handlePrint: () => console.log("Print Low Stock Parts"),
                        handleAdd: () => console.log("Add New Part"),
                        handleEdit: () => console.log("Edit Selected Part"),
                        handleDeleteSelected: () => {
                          setLowStockParts(lowStockParts.filter((_, index) => !selectedStockIDs.includes(index)));
                          setSelectedStockIDs([]);
                        },
                        handleWhatsApp: () => console.log("WhatsApp Low Stock Parts"),
                        handleSMS: () => console.log("SMS Low Stock Parts"),
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Jobs Table */}
          <Card>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
                flexDirection={{ xs: "column", sm: "row" }}
                gap={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Recent Jobs
                    </Typography>
                <Box display="flex" gap={1}>
                  <Button variant="outlined" startIcon={<Download />} size="small">
                    Export
                  </Button>
                  <Button variant="contained" startIcon={<Add />} size="small">
                    New Job
                  </Button>
                  </Box>
              </Box>

              <DataGrid
                rows={recentJobs}
                columns={jobColumns}
                checkboxSelection
                components={{ Toolbar: CustomTableToolbar }}
                componentsProps={{
                  toolbar: {
                    selectedIDs: selectedJobIDs,
                    handleDelete: () => {
                      setRecentJobs(recentJobs.filter((_, index) => !selectedJobIDs.includes(index)));
                      setSelectedJobIDs([]);
                    },
                    handleExport: () => console.log("Export Recent Jobs"),
                    handlePrint: () => console.log("Print Recent Jobs"),
                    handleAdd: () => console.log("Add New Job"),
                    handleEdit: () => console.log("Edit Selected Job"),
                    handleDeleteSelected: () => {
                      setRecentJobs(recentJobs.filter((_, index) => !selectedJobIDs.includes(index)));
                      setSelectedJobIDs([]);
                    },
                    handleWhatsApp: () => console.log("WhatsApp Recent Jobs"),
                    handleSMS: () => console.log("SMS Recent Jobs"),
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Upcoming Reminders
                  </Typography>
                  <DataGrid
                    rows={remindersWithId}
                    columns={[
                      { field: "vehicle", headerName: "Vehicle" },
                      { field: "type", headerName: "Type" },
                      { field: "due", headerName: "Due Date" },
                      { field: "customer", headerName: "Customer" },
                      { field: "contact", headerName: "Contact" },
                    ]}
                    checkboxSelection={false}
                    components={{ Toolbar: CustomTableToolbar }}
                    componentsProps={{
                      toolbar: {
                        selectedIDs: [], // No selection for reminders
                        handleDelete: () => console.log("Delete Reminders"),
                        handleExport: () => console.log("Export Reminders"),
                        handlePrint: () => console.log("Print Reminders"),
                        handleAdd: () => console.log("Add New Reminder"),
                        handleEdit: () => console.log("Edit Reminders"),
                        handleDeleteSelected: () => console.log("Delete Selected Reminders"),
                        handleWhatsApp: () => console.log("WhatsApp Reminders"),
                        handleSMS: () => console.log("SMS Reminders"),
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Pending Payments */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Pending Payments
                  </Typography>
                  <DataGrid
                    rows={pendingPaymentsWithId}
                    columns={[
                      { field: "customer", headerName: "Customer" },
                      { field: "vehicle", headerName: "Vehicle" },
                      { field: "amount", headerName: "Amount" },
                      { field: "due", headerName: "Due Date" },
                      { field: "contact", headerName: "Contact" },
                    ]}
                    checkboxSelection={false}
                    components={{ Toolbar: CustomTableToolbar }}
                    componentsProps={{
                      toolbar: {
                        selectedIDs: [], // No selection for payments
                        handleDelete: () => console.log("Delete Payments"),
                        handleExport: () => console.log("Export Payments"),
                        handlePrint: () => console.log("Print Payments"),
                        handleAdd: () => console.log("Add New Payment"),
                        handleEdit: () => console.log("Edit Payments"),
                        handleDeleteSelected: () => console.log("Delete Selected Payments"),
                        handleWhatsApp: () => console.log("WhatsApp Payments"),
                        handleSMS: () => console.log("SMS Payments"),
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            </Grid>

          {/* Supplier Orders */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Supplier Orders
                  </Typography>
                  <DataGrid
                    rows={supplierOrdersWithId}
                    columns={[
                      { field: "supplier", headerName: "Supplier" },
                      { field: "part", headerName: "Part" },
                      { field: "qty", headerName: "Quantity" },
                      { field: "status", headerName: "Status", renderCell: (params) => renderStatusChip(params.value) },
                      { field: "ordered", headerName: "Ordered Date" },
                    ]}
                    checkboxSelection={false}
                    components={{ Toolbar: CustomTableToolbar }}
                    componentsProps={{
                      toolbar: {
                        selectedIDs: [], // No selection for orders
                        handleDelete: () => console.log("Delete Orders"),
                        handleExport: () => console.log("Export Orders"),
                        handlePrint: () => console.log("Print Orders"),
                        handleAdd: () => console.log("Add New Order"),
                        handleEdit: () => console.log("Edit Orders"),
                        handleDeleteSelected: () => console.log("Delete Selected Orders"),
                        handleWhatsApp: () => console.log("WhatsApp Orders"),
                        handleSMS: () => console.log("SMS Orders"),
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Feedback */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
            <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Recent Feedback
                  </Typography>
                  <DataGrid
                    rows={feedbacksWithId}
                    columns={[
                      { field: "customer", headerName: "Customer" },
                      { field: "rating", headerName: "Rating" },
                      { field: "comment", headerName: "Comment" },
                      { field: "date", headerName: "Date" },
                    ]}
                    checkboxSelection={false}
                    components={{ Toolbar: CustomTableToolbar }}
                    componentsProps={{
                      toolbar: {
                        selectedIDs: [], // No selection for feedback
                        handleDelete: () => console.log("Delete Feedback"),
                        handleExport: () => console.log("Export Feedback"),
                        handlePrint: () => console.log("Print Feedback"),
                        handleAdd: () => console.log("Add New Feedback"),
                        handleEdit: () => console.log("Edit Feedback"),
                        handleDeleteSelected: () => console.log("Delete Selected Feedback"),
                        handleWhatsApp: () => console.log("WhatsApp Feedback"),
                        handleSMS: () => console.log("SMS Feedback"),
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Document Management */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              <Card
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                      Document Management
                </Typography>
                    <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={() => setUploadDialogOpen(true)}>
                      Upload Document
                  </Button>
                  </Box>
                  <DataGrid
                    rows={documentsWithId}
                    columns={[
                      { field: "name", headerName: "Name", flex: 1 },
                      { field: "type", headerName: "Type" },
                      { field: "uploaded", headerName: "Uploaded Date" },
                      { field: "actions", headerName: "Actions", type: "actions", getActions: (params) => [
                        <Tooltip title="Download">
                          <IconButton onClick={() => window.open(params.row.url, '_blank')}>
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>,
                        <Tooltip title="View Details"><IconButton onClick={() => handleViewDetails(params.row, 'Document Details')}><Visibility /></IconButton></Tooltip>,
                        <Tooltip title="Edit"><IconButton onClick={() => console.log('Edit Document', params.row)}><Edit /></IconButton></Tooltip>,
                        <Tooltip title="Delete"><IconButton onClick={() => console.log('Delete Document', params.row)} color="error"><Delete /></IconButton></Tooltip>,
                      ] },
                    ]}
                    checkboxSelection={false}
                    components={{ Toolbar: CustomTableToolbar }}
                    componentsProps={{
                      toolbar: {
                        selectedIDs: [], // No selection for documents
                        handleDelete: () => console.log("Delete Documents"),
                        handleExport: () => console.log("Export Documents"),
                        handlePrint: () => console.log("Print Documents"),
                        handleAdd: () => console.log("Add New Document"),
                        handleEdit: () => console.log("Edit Documents"),
                        handleDeleteSelected: () => console.log("Delete Selected Documents"),
                        handleWhatsApp: () => console.log("WhatsApp Documents"),
                        handleSMS: () => console.log("SMS Documents"),
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Upload Document Dialog */}
          <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
            <DialogTitle>Upload New Document</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Document Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <Select
                margin="dense"
                label="Document Type"
                fullWidth
                variant="standard"
              >
                <MenuItem value="Insurance">Insurance</MenuItem>
                <MenuItem value="PUC">PUC</MenuItem>
                <MenuItem value="Service">Service Report</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
              <Button variant="contained">Upload</Button>
            </DialogActions>
          </Dialog>

          {/* Add Data Dialog */}
          <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
            <DialogTitle>Add {addDialogType.charAt(0).toUpperCase() + addDialogType.slice(1)}</DialogTitle>
            <DialogContent>
              {addDialogType.toLowerCase() === 'job' && (
                <>
                  <TextField label="Customer" fullWidth margin="dense" value={addFormData.customer || ''} onChange={e => handleAddFormChange('customer', e.target.value)} />
                  <TextField label="Vehicle" fullWidth margin="dense" value={addFormData.vehicle || ''} onChange={e => handleAddFormChange('vehicle', e.target.value)} />
                  <TextField label="Job" fullWidth margin="dense" value={addFormData.job || ''} onChange={e => handleAddFormChange('job', e.target.value)} />
                  <TextField label="Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={addFormData.date || ''} onChange={e => handleAddFormChange('date', e.target.value)} />
                  <TextField label="Amount" type="number" fullWidth margin="dense" value={addFormData.amount || ''} onChange={e => handleAddFormChange('amount', e.target.value)} />
                  <TextField label="Status" fullWidth margin="dense" value={addFormData.status || ''} onChange={e => handleAddFormChange('status', e.target.value)} />
                </>
              )}
              {addDialogType.toLowerCase() === 'vehicle' && (
                <>
                  <TextField label="Vehicle Name" fullWidth margin="dense" value={addFormData.name || ''} onChange={e => handleAddFormChange('name', e.target.value)} />
                  <TextField label="Type" fullWidth margin="dense" value={addFormData.type || ''} onChange={e => handleAddFormChange('type', e.target.value)} />
                  <TextField label="Registration Number" fullWidth margin="dense" value={addFormData.registration || ''} onChange={e => handleAddFormChange('registration', e.target.value)} />
                </>
              )}
              {addDialogType.toLowerCase() === 'payment' && (
                <>
                  <TextField label="Customer" fullWidth margin="dense" value={addFormData.customer || ''} onChange={e => handleAddFormChange('customer', e.target.value)} />
                  <TextField label="Vehicle" fullWidth margin="dense" value={addFormData.vehicle || ''} onChange={e => handleAddFormChange('vehicle', e.target.value)} />
                  <TextField label="Amount" type="number" fullWidth margin="dense" value={addFormData.amount || ''} onChange={e => handleAddFormChange('amount', e.target.value)} />
                  <TextField label="Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={addFormData.date || ''} onChange={e => handleAddFormChange('date', e.target.value)} />
                  <TextField label="Status" fullWidth margin="dense" value={addFormData.status || ''} onChange={e => handleAddFormChange('status', e.target.value)} />
                </>
              )}
              {addDialogType.toLowerCase() === 'supplierorder' && (
                <>
                  <TextField label="Supplier" fullWidth margin="dense" value={addFormData.supplier || ''} onChange={e => handleAddFormChange('supplier', e.target.value)} />
                  <TextField label="Part" fullWidth margin="dense" value={addFormData.part || ''} onChange={e => handleAddFormChange('part', e.target.value)} />
                  <TextField label="Quantity" type="number" fullWidth margin="dense" value={addFormData.qty || ''} onChange={e => handleAddFormChange('qty', e.target.value)} />
                  <TextField label="Status" fullWidth margin="dense" value={addFormData.status || ''} onChange={e => handleAddFormChange('status', e.target.value)} />
                  <TextField label="Ordered Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={addFormData.ordered || ''} onChange={e => handleAddFormChange('ordered', e.target.value)} />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleAddFormSubmit}>Add</Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={addSuccess} autoHideDuration={3000} onClose={() => setAddSuccess(false)} message="Data added successfully!" />
                </Box>
              </Box>

      {/* Drawer for details */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => { setDrawerOpen(false); setDrawerEdit(false); }}>
        <Box sx={{ width: 400, p: 3, maxWidth: '100vw', height: '100%', overflowY: 'auto', bgcolor: 'background.paper' }}>
          <Typography variant="h5" fontWeight="bold" mb={2} color="primary.main">{drawerTitle}</Typography>
          <Divider sx={{ mb: 2 }} />
          {drawerEdit ? (
            <List>
              {groupFields(drawerEditData).map((group, gidx) => (
                <React.Fragment key={group.label}>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mt: gidx > 0 ? 2 : 0, mb: 1 }}>{group.label}</Typography>
                  {group.fields.map(([key, value], idx) => (
                    <React.Fragment key={key}>
                      <ListItem alignItems="flex-start" sx={{ py: 1.5, px: 0 }}>
                        <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center' }}>
                          {fieldIconMap[key.toLowerCase()] || <InfoIcon fontSize="small" sx={{ mr: 1 }} />}
                          <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}:</Typography>
                        </Box>
                        <Box>
                          <TextField
                            value={drawerEditData[key] ?? ''}
                            onChange={e => handleDrawerEditChange(key, e.target.value)}
                            size="small"
                            variant="standard"
                            sx={{ minWidth: 180 }}
                          />
                        </Box>
                      </ListItem>
                      {idx < group.fields.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <List>
              {groupFields(drawerData).map((group, gidx) => (
                <React.Fragment key={group.label}>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mt: gidx > 0 ? 2 : 0, mb: 1 }}>{group.label}</Typography>
                  {group.fields.map(([key, value], idx) => (
                    <React.Fragment key={key}>
                      <ListItem alignItems="flex-start" sx={{ py: 1.5, px: 0 }}>
                        <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center' }}>
                          {fieldIconMap[key.toLowerCase()] || <InfoIcon fontSize="small" sx={{ mr: 1 }} />}
                          <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}:</Typography>
                        </Box>
                        <Box>
                          {key.toLowerCase().includes('status') ? renderStatusChip(value) :
                            <Typography variant="body1" color="text.primary" sx={{ wordBreak: 'break-all' }}>{String(value)}</Typography>}
                        </Box>
                      </ListItem>
                      {idx < group.fields.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </List>
          )}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {drawerEdit ? (
              <>
                <Button variant="contained" color="success" onClick={handleDrawerEditSave}>Save</Button>
                <Button variant="outlined" color="error" onClick={handleDrawerEditCancel}>Cancel</Button>
              </>
            ) : (
              <Button variant="contained" fullWidth onClick={handleDrawerEdit}>Edit</Button>
            )}
            <Button variant="outlined" fullWidth onClick={() => { setDrawerOpen(false); setDrawerEdit(false); }}>Close</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Bulk Action Details Dialog */}
      <Dialog open={bulkDialogOpen} onClose={() => setBulkDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {bulkDialogType === 'pendingJobs' && 'Pending Jobs'}
          {bulkDialogType === 'lowStock' && 'Low Stock Parts'}
          {bulkDialogType === 'reminder' && 'Customers to Remind'}
          {bulkDialogType === 'export' && 'Export All Data'}
        </DialogTitle>
        <DialogContent>
          {bulkDialogType === 'pendingJobs' && (
              <TableContainer>
              <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer</TableCell>
                      <TableCell>Vehicle</TableCell>
                      <TableCell>Job</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {recentJobs.filter(j => j.status === 'Pending').map((job, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{job.customer}</TableCell>
                        <TableCell>{job.vehicle}</TableCell>
                        <TableCell>{job.job}</TableCell>
                        <TableCell>{job.date}</TableCell>
                      <TableCell>{job.amount}</TableCell>
                      <TableCell>{renderStatusChip(job.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          )}
          {bulkDialogType === 'lowStock' && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Part</TableCell>
                    <TableCell>Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lowStockParts.map((part, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{part.part}</TableCell>
                      <TableCell>{part.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {bulkDialogType === 'reminder' && (
            <List>
              {recentJobs.map((job, idx) => (
                <ListItem key={idx}>{job.customer} ({job.vehicle})</ListItem>
              ))}
            </List>
          )}
          {bulkDialogType === 'export' && (
            <Box>
              <Typography>All garage data (jobs, vehicles, payments, suppliers, inventory, feedback, etc.) will be exported as a report.</Typography>
        </Box>
          )}
        </DialogContent>
        <DialogActions>
          {bulkDialogType === 'pendingJobs' && <Button variant="contained" onClick={() => { setBulkDialogOpen(false); alert('All pending jobs marked as completed!'); }}>Mark All as Completed</Button>}
          {bulkDialogType === 'lowStock' && <Button variant="contained" onClick={() => { setBulkDialogOpen(false); alert('Reorder placed for all low stock parts!'); }}>Reorder All</Button>}
          <Button onClick={() => setBulkDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
} 