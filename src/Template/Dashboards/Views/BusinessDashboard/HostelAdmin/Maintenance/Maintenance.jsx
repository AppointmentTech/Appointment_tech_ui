import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Fab,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Rating,
  LinearProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Download,
  Refresh,
  Engineering,
  Build,
  Handyman,
  Plumbing,
  ElectricalServices,
  CleaningServices,
  Security,
  LocalShipping,
  Inventory,
  Assignment,
  Schedule,
  CheckCircle,
  Warning,
  Error,
  Close,
  Save,
  Cancel,
  ExpandMore,
  Notifications,
  Message,
  Call,
  WhatsApp,
  AdminPanelSettings,
  SupervisorAccount,
  PersonAdd,
  Group,
  TrendingUp,
  AttachMoney,
  Receipt,
  Assessment,
  EventNote,
  AccessTime,
  CheckCircleOutline,
  CancelOutlined,
  PendingActions,
  PriorityHigh,
  BugReport,
  ReportProblem,
  Construction,
  HomeRepairService,
  Hardware,
  Settings,
  Wrench,
  Screwdriver,
  Drill,
  Paint,
  Brush,
  Hammer,
  Saw,
  TapeMeasure,
  Level,
  Flashlight,
  Extension,
  Cable,
  Pipe,
  Faucet,
  Sink,
  Toilet,
  Shower,
  Bathtub,
  Heater,
  AcUnit,
  Fan,
  Lightbulb,
  Outlet,
  Thermostat,
  SmokeDetector,
  FireExtinguisher,
  FirstAid,
  Emergency,
  Phone,
  LocationOn,
  CalendarToday,
  Timer,
  Stopwatch,
  HourglassEmpty,
  HourglassFull,
  Done,
  DoneAll,
  Pending,
  Today,
  Tomorrow,
  NextWeek,
  DateRange,
  TimeToLeave,
  DirectionsWalk,
  DirectionsCar,
  DirectionsBus,
  DirectionsSubway,
  DirectionsBike,
  DirectionsRun,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "Template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function Maintenance() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form State
  const [formData, setFormData] = useState({
    requestId: "",
    title: "",
    description: "",
    category: "",
    priority: "medium",
    location: "",
    roomNumber: "",
    equipment: "",
    reportedBy: "",
    reportedDate: "",
    assignedTo: "",
    estimatedCost: 0,
    actualCost: 0,
    status: "pending",
    scheduledDate: "",
    completedDate: "",
    workNotes: "",
    images: [],
    attachments: [],
  });

  // Mock Data
  const mockRequests = [
    {
      id: 1,
      requestId: "MR001",
      title: "AC not working in Room A-101",
      description: "Air conditioner is not cooling properly. Room temperature is very high.",
      category: "HVAC",
      priority: "high",
      location: "Block A",
      roomNumber: "A-101",
      equipment: "Split AC Unit",
      reportedBy: "Rahul Sharma",
      reportedDate: "2024-01-15",
      assignedTo: "Technician Amit",
      estimatedCost: 2500,
      actualCost: 0,
      status: "in_progress",
      scheduledDate: "2024-01-16",
      completedDate: "",
      workNotes: "Technician assigned, parts ordered",
      images: [],
      attachments: [],
    },
    {
      id: 2,
      requestId: "MR002",
      title: "Water leakage in Kitchen",
      description: "Water is leaking from the ceiling in the kitchen area.",
      category: "Plumbing",
      priority: "high",
      location: "Kitchen",
      roomNumber: "",
      equipment: "Water Pipeline",
      reportedBy: "Kitchen Staff",
      reportedDate: "2024-01-14",
      assignedTo: "Plumber Rajesh",
      estimatedCost: 1500,
      actualCost: 1200,
      status: "completed",
      scheduledDate: "2024-01-15",
      completedDate: "2024-01-15",
      workNotes: "Pipe repaired, leakage fixed",
      images: [],
      attachments: [],
    },
    {
      id: 3,
      requestId: "MR003",
      title: "Broken window in Room B-205",
      description: "Window glass is cracked and needs replacement.",
      category: "General",
      priority: "medium",
      location: "Block B",
      roomNumber: "B-205",
      equipment: "Window",
      reportedBy: "Priya Patel",
      reportedDate: "2024-01-13",
      assignedTo: "Carpenter Suresh",
      estimatedCost: 800,
      actualCost: 0,
      status: "pending",
      scheduledDate: "2024-01-18",
      completedDate: "",
      workNotes: "Glass ordered, will be installed on scheduled date",
      images: [],
      attachments: [],
    },
    {
      id: 4,
      requestId: "MR004",
      title: "Electrical socket not working",
      description: "Power socket in Room C-103 is not providing electricity.",
      category: "Electrical",
      priority: "medium",
      location: "Block C",
      roomNumber: "C-103",
      equipment: "Power Socket",
      reportedBy: "Amit Kumar",
      reportedDate: "2024-01-12",
      assignedTo: "Electrician Ravi",
      estimatedCost: 500,
      actualCost: 450,
      status: "completed",
      scheduledDate: "2024-01-13",
      completedDate: "2024-01-13",
      workNotes: "Socket replaced, working properly now",
      images: [],
      attachments: [],
    },
    {
      id: 5,
      requestId: "MR005",
      title: "Cleaning required in Common Area",
      description: "Common area needs deep cleaning and maintenance.",
      category: "Cleaning",
      priority: "low",
      location: "Common Area",
      roomNumber: "",
      equipment: "Cleaning Equipment",
      reportedBy: "Admin",
      reportedDate: "2024-01-11",
      assignedTo: "Housekeeping Team",
      estimatedCost: 300,
      actualCost: 0,
      status: "scheduled",
      scheduledDate: "2024-01-20",
      completedDate: "",
      workNotes: "Scheduled for weekend cleaning",
      images: [],
      attachments: [],
    },
  ];

  useEffect(() => {
    setMaintenanceRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter, maintenanceRequests]);

  const filterRequests = () => {
    let filtered = maintenanceRequests.filter((request) => {
      const matchesSearch = 
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
      const matchesCategory = categoryFilter === "all" || request.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
    
    setFilteredRequests(filtered);
  };

  const handleOpenDialog = (request = null) => {
    if (request) {
      setEditingRequest(request);
      setFormData(request);
      setIsEditMode(true);
    } else {
      setEditingRequest(null);
      setFormData({
        requestId: `MR${String(Date.now()).slice(-6)}`,
        title: "",
        description: "",
        category: "",
        priority: "medium",
        location: "",
        roomNumber: "",
        equipment: "",
        reportedBy: "",
        reportedDate: new Date().toISOString().split('T')[0],
        assignedTo: "",
        estimatedCost: 0,
        actualCost: 0,
        status: "pending",
        scheduledDate: "",
        completedDate: "",
        workNotes: "",
        images: [],
        attachments: [],
      });
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRequest(null);
    setIsEditMode(false);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const requestData = {
      ...formData,
      id: isEditMode ? editingRequest.id : Date.now(),
    };

    if (isEditMode) {
      setMaintenanceRequests(prev => prev.map(request => 
        request.id === editingRequest.id ? requestData : request
      ));
      setSnackbar({
        open: true,
        message: "Maintenance request updated successfully!",
        severity: "success",
      });
    } else {
      setMaintenanceRequests(prev => [...prev, requestData]);
      setSnackbar({
        open: true,
        message: "Maintenance request created successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setMaintenanceRequests(prev => prev.filter(request => request.id !== id));
    setSnackbar({
      open: true,
      message: "Maintenance request deleted successfully!",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRequests);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Maintenance Requests");
    XLSX.writeFile(wb, "Maintenance_Requests_Export.xlsx");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in_progress":
        return "info";
      case "completed":
        return "success";
      case "scheduled":
        return "primary";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <PriorityHigh />;
      case "medium":
        return <PendingActions />;
              case "low":
          return <Done />;
        default:
          return <PendingActions />;
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "HVAC": <AcUnit />,
      "Plumbing": <Plumbing />,
      "Electrical": <ElectricalServices />,
      "General": <Build />,
      "Cleaning": <CleaningServices />,
      "Security": <Security />,
    };
    return icons[category] || <Engineering />;
  };

  const columns = [
    {
      field: "requestId",
      headerName: "Request ID",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "title",
      headerName: "Issue",
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.roomNumber && `Room: ${params.row.roomNumber}`}
          </Typography>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {getCategoryIcon(params.value)}
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {getPriorityIcon(params.value)}
          <Chip
            label={params.value}
            color={getPriorityColor(params.value)}
            size="small"
          />
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      width: 150,
    },
    {
      field: "estimatedCost",
      headerName: "Est. Cost (₹)",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          ₹{(params.value || 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Request">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Request">
            <IconButton 
              size="small" 
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Dashboard Stats
  const stats = [
    {
      title: "Total Requests",
      value: maintenanceRequests.length,
      icon: <Assignment color="primary" />,
      color: "#2196F3",
    },
    {
      title: "Pending",
      value: maintenanceRequests.filter(r => r.status === "pending").length,
      icon: <PendingActions color="primary" />,
      color: "#FF9800",
    },
    {
      title: "In Progress",
      value: maintenanceRequests.filter(r => r.status === "in_progress").length,
      icon: <Build color="primary" />,
      color: "#2196F3",
    },
    {
      title: "Completed",
      value: maintenanceRequests.filter(r => r.status === "completed").length,
      icon: <CheckCircle color="primary" />,
      color: "#4CAF50",
    },
    {
      title: "High Priority",
      value: maintenanceRequests.filter(r => r.priority === "high").length,
      icon: <PriorityHigh color="primary" />,
      color: "#F44336",
    },
    {
      title: "Total Cost",
      value: `₹${maintenanceRequests.reduce((sum, r) => sum + r.actualCost, 0).toLocaleString()}`,
      icon: <AttachMoney color="primary" />,
      color: "#9C27B0",
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden"
      }}>
        <CoAdminHeader />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, 
            pt: { xs: 8, sm: 10 },
            overflow: "auto",
            height: "100vh",
            backgroundColor: theme.palette.background.default
          }}
        >
          {/* Header */}
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
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold"
                color="primary"
              >
                Maintenance Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage maintenance requests, work orders, and facility upkeep
              </Typography>
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center" 
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                size={isMobile ? "small" : "medium"}
              >
                New Request
              </Button>
            </Box>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} mb={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card 
                  sx={{ 
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {stat.title}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {stat.value}
                        </Typography>
                      </Box>
                      <Avatar 
                        sx={{ 
                          bgcolor: stat.color + "20",
                          color: stat.color,
                          width: 48,
                          height: 48
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in_progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      label="Priority"
                    >
                      <MenuItem value="all">All Priorities</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      <MenuItem value="HVAC">HVAC</MenuItem>
                      <MenuItem value="Plumbing">Plumbing</MenuItem>
                      <MenuItem value="Electrical">Electrical</MenuItem>
                      <MenuItem value="General">General</MenuItem>
                      <MenuItem value="Cleaning">Cleaning</MenuItem>
                      <MenuItem value="Security">Security</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={exportToExcel}
                    fullWidth
                    size="small"
                  >
                    Export
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setPriorityFilter("all");
                      setCategoryFilter("all");
                    }}
                    fullWidth
                    size="small"
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Data Grid */}
          <Card>
            <CardContent>
              <DataGrid
                rows={filteredRequests}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableSelectionOnClick
                autoHeight
                sx={{
                  border: 0,
                  "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Add/Edit Request Dialog */}
          <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                  {isEditMode ? "Edit Maintenance Request" : "New Maintenance Request"}
                </Typography>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Request ID"
                    value={formData.requestId}
                    onChange={(e) => handleFormChange("requestId", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => handleFormChange("category", e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="HVAC">HVAC</MenuItem>
                      <MenuItem value="Plumbing">Plumbing</MenuItem>
                      <MenuItem value="Electrical">Electrical</MenuItem>
                      <MenuItem value="General">General</MenuItem>
                      <MenuItem value="Cleaning">Cleaning</MenuItem>
                      <MenuItem value="Security">Security</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={formData.priority}
                      onChange={(e) => handleFormChange("priority", e.target.value)}
                      label="Priority"
                    >
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    value={formData.roomNumber}
                    onChange={(e) => handleFormChange("roomNumber", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Equipment"
                    value={formData.equipment}
                    onChange={(e) => handleFormChange("equipment", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Reported By"
                    value={formData.reportedBy}
                    onChange={(e) => handleFormChange("reportedBy", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Reported Date"
                    type="date"
                    value={formData.reportedDate}
                    onChange={(e) => handleFormChange("reportedDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Assigned To"
                    value={formData.assignedTo}
                    onChange={(e) => handleFormChange("assignedTo", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Estimated Cost (₹)"
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => handleFormChange("estimatedCost", parseInt(e.target.value) || 0)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Actual Cost (₹)"
                    type="number"
                    value={formData.actualCost}
                    onChange={(e) => handleFormChange("actualCost", parseInt(e.target.value) || 0)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => handleFormChange("status", e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in_progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Scheduled Date"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleFormChange("scheduledDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Completed Date"
                    type="date"
                    value={formData.completedDate}
                    onChange={(e) => handleFormChange("completedDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Work Notes"
                    multiline
                    rows={3}
                    value={formData.workNotes}
                    onChange={(e) => handleFormChange("workNotes", e.target.value)}
                    placeholder="Additional notes, progress updates, etc."
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                startIcon={<Save />}
              >
                {isEditMode ? "Update" : "Create"} Request
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          {/* Floating Action Button for Mobile */}
          {isMobile && (
            <Fab
              color="primary"
              aria-label="add maintenance request"
              sx={{ position: "fixed", bottom: 16, right: 16 }}
              onClick={() => handleOpenDialog()}
            >
              <Add />
            </Fab>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
} 