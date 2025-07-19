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
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Work,
  Payment,
  History,
  Star,
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
  Schedule,
  Assignment,
  Security,
  CleaningServices,
  Restaurant,
  LocalLaundryService,
  Engineering,
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
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "Template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function StaffManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form State
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
    role: "",
    department: "",
    joiningDate: "",
    salary: 0,
    workingHours: "",
    shift: "",
    status: "active",
    skills: [],
    certifications: [],
    performance: {
      rating: 0,
      attendance: 0,
      punctuality: 0,
      qualityOfWork: 0,
    },
    notes: "",
  });

  // Mock Data
  const mockStaff = [
    {
      id: 1,
      employeeId: "EMP001",
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@hostel.com",
      phone: "+91 98765 43210",
      dateOfBirth: "1985-03-15",
      gender: "Male",
      address: {
        street: "123 Staff Quarters",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
      emergencyContact: {
        name: "Sunita Kumar",
        relationship: "Wife",
        phone: "+91 98765 43211",
        email: "sunita.kumar@email.com",
      },
      role: "Housekeeping Supervisor",
      department: "Housekeeping",
      joiningDate: "2020-01-15",
      salary: 25000,
      workingHours: "8 hours",
      shift: "Day",
      status: "active",
      skills: ["Cleaning", "Supervision", "Training"],
      certifications: ["Housekeeping Management", "Safety Training"],
      performance: {
        rating: 4.5,
        attendance: 95,
        punctuality: 98,
        qualityOfWork: 4.2,
      },
      currentAssignments: ["Floor 1", "Floor 2"],
      attendance: {
        present: 22,
        absent: 1,
        late: 2,
        totalDays: 25,
      },
      notes: "Excellent supervisor, very reliable",
    },
    {
      id: 2,
      employeeId: "EMP002",
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@hostel.com",
      phone: "+91 98765 43212",
      dateOfBirth: "1990-07-22",
      gender: "Female",
      address: {
        street: "456 Staff Colony",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400002",
        country: "India",
      },
      emergencyContact: {
        name: "Amit Sharma",
        relationship: "Husband",
        phone: "+91 98765 43213",
        email: "amit.sharma@email.com",
      },
      role: "Kitchen Staff",
      department: "Food Services",
      joiningDate: "2021-03-10",
      salary: 18000,
      workingHours: "10 hours",
      shift: "Day",
      status: "active",
      skills: ["Cooking", "Food Safety", "Menu Planning"],
      certifications: ["Food Safety Certificate", "Culinary Arts"],
      performance: {
        rating: 4.2,
        attendance: 92,
        punctuality: 95,
        qualityOfWork: 4.0,
      },
      currentAssignments: ["Breakfast", "Lunch"],
      attendance: {
        present: 20,
        absent: 2,
        late: 3,
        totalDays: 25,
      },
      notes: "Good cook, needs improvement in punctuality",
    },
    {
      id: 3,
      employeeId: "EMP003",
      firstName: "Amit",
      lastName: "Patel",
      email: "amit.patel@hostel.com",
      phone: "+91 98765 43214",
      dateOfBirth: "1988-12-10",
      gender: "Male",
      address: {
        street: "789 Staff Housing",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400003",
        country: "India",
      },
      emergencyContact: {
        name: "Rekha Patel",
        relationship: "Sister",
        phone: "+91 98765 43215",
        email: "rekha.patel@email.com",
      },
      role: "Security Guard",
      department: "Security",
      joiningDate: "2019-08-20",
      salary: 22000,
      workingHours: "12 hours",
      shift: "Night",
      status: "active",
      skills: ["Security", "CCTV Monitoring", "First Aid"],
      certifications: ["Security Training", "First Aid Certificate"],
      performance: {
        rating: 4.8,
        attendance: 98,
        punctuality: 100,
        qualityOfWork: 4.5,
      },
      currentAssignments: ["Main Gate", "CCTV Room"],
      attendance: {
        present: 24,
        absent: 0,
        late: 0,
        totalDays: 25,
      },
      notes: "Very reliable security guard",
    },
    {
      id: 4,
      employeeId: "EMP004",
      firstName: "Neha",
      lastName: "Singh",
      email: "neha.singh@hostel.com",
      phone: "+91 98765 43216",
      dateOfBirth: "1992-05-18",
      gender: "Female",
      address: {
        street: "321 Staff Residence",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400004",
        country: "India",
      },
      emergencyContact: {
        name: "Ravi Singh",
        relationship: "Father",
        phone: "+91 98765 43217",
        email: "ravi.singh@email.com",
      },
      role: "Receptionist",
      department: "Front Office",
      joiningDate: "2022-01-05",
      salary: 20000,
      workingHours: "8 hours",
      shift: "Day",
      status: "active",
      skills: ["Customer Service", "Computer Skills", "Communication"],
      certifications: ["Customer Service Training", "Computer Course"],
      performance: {
        rating: 4.3,
        attendance: 94,
        punctuality: 96,
        qualityOfWork: 4.1,
      },
      currentAssignments: ["Front Desk", "Phone Handling"],
      attendance: {
        present: 21,
        absent: 1,
        late: 2,
        totalDays: 25,
      },
      notes: "Good communication skills, friendly with students",
    },
  ];

  useEffect(() => {
    setStaff(mockStaff);
    setFilteredStaff(mockStaff);
  }, []);

  useEffect(() => {
    filterStaff();
  }, [searchTerm, statusFilter, roleFilter, staff]);

  const filterStaff = () => {
    let filtered = staff.filter((employee) => {
      const matchesSearch = 
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
      const matchesRole = roleFilter === "all" || employee.role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
    
    setFilteredStaff(filtered);
  };

  const handleOpenDialog = (employee = null) => {
    if (employee) {
      setEditingStaff(employee);
      setFormData(employee);
      setIsEditMode(true);
    } else {
      setEditingStaff(null);
      setFormData({
        employeeId: `EMP${String(Date.now()).slice(-6)}`,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: {
          street: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        },
        emergencyContact: {
          name: "",
          relationship: "",
          phone: "",
          email: "",
        },
        role: "",
        department: "",
        joiningDate: "",
        salary: 0,
        workingHours: "",
        shift: "",
        status: "active",
        skills: [],
        certifications: [],
        performance: {
          rating: 0,
          attendance: 0,
          punctuality: 0,
          qualityOfWork: 0,
        },
        notes: "",
      });
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStaff(null);
    setIsEditMode(false);
  };

  const handleFormChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const employeeData = {
      ...formData,
      id: isEditMode ? editingStaff.id : Date.now(),
    };

    if (isEditMode) {
      setStaff(prev => prev.map(employee => 
        employee.id === editingStaff.id ? employeeData : employee
      ));
      setSnackbar({
        open: true,
        message: "Staff member updated successfully!",
        severity: "success",
      });
    } else {
      setStaff(prev => [...prev, employeeData]);
      setSnackbar({
        open: true,
        message: "Staff member added successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setStaff(prev => prev.filter(employee => employee.id !== id));
    setSnackbar({
      open: true,
      message: "Staff member deleted successfully!",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredStaff);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff");
    XLSX.writeFile(wb, "Staff_Management_Export.xlsx");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "on_leave":
        return "warning";
      default:
        return "default";
    }
  };

  const getRoleIcon = (role) => {
    const icons = {
      "Housekeeping Supervisor": <CleaningServices />,
      "Kitchen Staff": <Restaurant />,
      "Security Guard": <Security />,
      "Receptionist": <Person />,
      "Maintenance Staff": <Engineering />,
      "Admin": <AdminPanelSettings />,
      "Manager": <SupervisorAccount />,
    };
    return icons[role] || <Work />;
  };

  const columns = [
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "fullName",
      headerName: "Staff Name",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {params.row.firstName.charAt(0)}{params.row.lastName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {params.row.firstName} {params.row.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.role}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {getRoleIcon(params.value)}
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      width: 120,
    },
    {
      field: "salary",
      headerName: "Salary (₹)",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          ₹{(params.value || 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "performance",
      headerName: "Performance",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Rating value={params.value.rating} size="small" readOnly />
          <Typography variant="body2">{params.value.rating}</Typography>
        </Box>
      ),
    },
    {
      field: "attendance",
      headerName: "Attendance",
      width: 120,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value.attendance}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={params.value.attendance} 
            size="small"
            sx={{ height: 4 }}
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
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
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
          <Tooltip title="Edit Staff">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Staff">
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
      title: "Total Staff",
      value: staff.length,
      icon: <Group color="primary" />,
      color: "#2196F3",
    },
    {
      title: "Active Staff",
      value: staff.filter(s => s.status === "active").length,
      icon: <CheckCircle color="primary" />,
      color: "#4CAF50",
    },
    {
      title: "On Leave",
      value: staff.filter(s => s.status === "on_leave").length,
      icon: <Warning color="primary" />,
      color: "#FF9800",
    },
    {
      title: "Average Rating",
      value: (staff.reduce((sum, s) => sum + s.performance.rating, 0) / staff.length).toFixed(1),
      icon: <Star color="primary" />,
      color: "#FFC107",
    },
    {
      title: "Total Salary",
      value: `₹${staff.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}`,
      icon: <AttachMoney color="primary" />,
      color: "#9C27B0",
    },
    {
      title: "Avg Attendance",
      value: `${(staff.reduce((sum, s) => sum + s.attendance.attendance, 0) / staff.length).toFixed(1)}%`,
      icon: <Schedule color="primary" />,
      color: "#FF5722",
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CoAdminHeader />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, 
            py: { xs: 8, sm: 10 },
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh"
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
                Staff Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage hostel staff, roles, performance, and attendance
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
                startIcon={<PersonAdd />}
                onClick={() => handleOpenDialog()}
                size={isMobile ? "small" : "medium"}
              >
                Add Staff
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
                    placeholder="Search staff..."
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
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="on_leave">On Leave</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      label="Role"
                    >
                      <MenuItem value="all">All Roles</MenuItem>
                      <MenuItem value="Housekeeping Supervisor">Housekeeping</MenuItem>
                      <MenuItem value="Kitchen Staff">Kitchen</MenuItem>
                      <MenuItem value="Security Guard">Security</MenuItem>
                      <MenuItem value="Receptionist">Receptionist</MenuItem>
                      <MenuItem value="Maintenance Staff">Maintenance</MenuItem>
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
                      setRoleFilter("all");
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
                rows={filteredStaff}
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

          {/* Add/Edit Staff Dialog */}
          <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                  {isEditMode ? "Edit Staff Member" : "Add New Staff Member"}
                </Typography>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Tabs 
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ mb: 3 }}
              >
                <Tab label="Basic Info" />
                <Tab label="Contact Details" />
                <Tab label="Employment Details" />
                <Tab label="Performance & Skills" />
              </Tabs>

              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Employee ID"
                      value={formData.employeeId}
                      onChange={(e) => handleFormChange("employeeId", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleFormChange("firstName", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleFormChange("lastName", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleFormChange("dateOfBirth", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={formData.gender}
                        onChange={(e) => handleFormChange("gender", e.target.value)}
                        label="Gender"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formData.status}
                        onChange={(e) => handleFormChange("status", e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        <MenuItem value="on_leave">On Leave</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Address Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      value={formData.address.street}
                      onChange={(e) => handleFormChange("address.street", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={formData.address.city}
                      onChange={(e) => handleFormChange("address.city", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      value={formData.address.state}
                      onChange={(e) => handleFormChange("address.state", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      value={formData.address.pincode}
                      onChange={(e) => handleFormChange("address.pincode", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={formData.address.country}
                      onChange={(e) => handleFormChange("address.country", e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Emergency Contact
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Emergency Contact Name"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleFormChange("emergencyContact.name", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => handleFormChange("emergencyContact.relationship", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Emergency Phone"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleFormChange("emergencyContact.phone", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Emergency Email"
                      type="email"
                      value={formData.emergencyContact.email}
                      onChange={(e) => handleFormChange("emergencyContact.email", e.target.value)}
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={formData.role}
                        onChange={(e) => handleFormChange("role", e.target.value)}
                        label="Role"
                      >
                        <MenuItem value="Housekeeping Supervisor">Housekeeping Supervisor</MenuItem>
                        <MenuItem value="Kitchen Staff">Kitchen Staff</MenuItem>
                        <MenuItem value="Security Guard">Security Guard</MenuItem>
                        <MenuItem value="Receptionist">Receptionist</MenuItem>
                        <MenuItem value="Maintenance Staff">Maintenance Staff</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Department"
                      value={formData.department}
                      onChange={(e) => handleFormChange("department", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Joining Date"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleFormChange("joiningDate", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Salary (₹)"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => handleFormChange("salary", parseInt(e.target.value) || 0)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Working Hours"
                      value={formData.workingHours}
                      onChange={(e) => handleFormChange("workingHours", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Shift</InputLabel>
                      <Select
                        value={formData.shift}
                        onChange={(e) => handleFormChange("shift", e.target.value)}
                        label="Shift"
                      >
                        <MenuItem value="Day">Day</MenuItem>
                        <MenuItem value="Night">Night</MenuItem>
                        <MenuItem value="Rotational">Rotational</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              {activeTab === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Performance Rating
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" gutterBottom>
                      Overall Rating
                    </Typography>
                    <Rating
                      value={formData.performance.rating}
                      onChange={(event, newValue) => {
                        handleFormChange("performance.rating", newValue);
                      }}
                      precision={0.5}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" gutterBottom>
                      Attendance (%)
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={formData.performance.attendance}
                      onChange={(e) => handleFormChange("performance.attendance", parseInt(e.target.value) || 0)}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" gutterBottom>
                      Punctuality (%)
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={formData.performance.punctuality}
                      onChange={(e) => handleFormChange("performance.punctuality", parseInt(e.target.value) || 0)}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" gutterBottom>
                      Quality of Work
                    </Typography>
                    <Rating
                      value={formData.performance.qualityOfWork}
                      onChange={(event, newValue) => {
                        handleFormChange("performance.qualityOfWork", newValue);
                      }}
                      precision={0.5}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Additional Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Skills (comma separated)"
                      value={formData.skills.join(", ")}
                      onChange={(e) => handleFormChange("skills", e.target.value.split(", ").filter(s => s.trim()))}
                      placeholder="e.g., Cleaning, Supervision, Training"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Certifications (comma separated)"
                      value={formData.certifications.join(", ")}
                      onChange={(e) => handleFormChange("certifications", e.target.value.split(", ").filter(s => s.trim()))}
                      placeholder="e.g., Safety Training, First Aid"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additional Notes"
                      multiline
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => handleFormChange("notes", e.target.value)}
                    />
                  </Grid>
                </Grid>
              )}
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
                {isEditMode ? "Update" : "Add"} Staff Member
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
              aria-label="add staff"
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