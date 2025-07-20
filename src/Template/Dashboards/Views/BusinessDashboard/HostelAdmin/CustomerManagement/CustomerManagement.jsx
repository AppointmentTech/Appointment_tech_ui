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
//   useTheme,
  // useMediaQuery,
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
  School,
  Work,
  Emergency,
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
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "Template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
export default function CustomerManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form State
  const [formData, setFormData] = useState({
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
    occupation: "",
    institution: "",
    course: "",
    yearOfStudy: "",
    idProof: {
      type: "",
      number: "",
      image: "",
    },
    preferences: {
      roomType: "",
      foodPreference: "",
      specialNeeds: "",
    },
    status: "active",
    notes: "",
  });

  // Mock Data
  const mockCustomers = [
    {
      id: 1,
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98765 43210",
      dateOfBirth: "1998-05-15",
      gender: "Male",
      address: {
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
      emergencyContact: {
        name: "Rajesh Sharma",
        relationship: "Father",
        phone: "+91 98765 43211",
        email: "rajesh.sharma@email.com",
      },
      occupation: "Student",
      institution: "Mumbai University",
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      idProof: {
        type: "Aadhar Card",
        number: "1234-5678-9012",
        image: "",
      },
      preferences: {
        roomType: "Single",
        foodPreference: "Vegetarian",
        specialNeeds: "None",
      },
      status: "active",
      currentRoom: "A-101",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-20",
      totalAmount: 8000,
      paidAmount: 8000,
      balanceAmount: 0,
      rating: 4.5,
      notes: "Excellent student, very cooperative",
      bookingHistory: [
        {
          id: 1,
          room: "A-101",
          checkIn: "2024-01-15",
          checkOut: "2024-01-20",
          amount: 8000,
          status: "Completed",
        },
      ],
    },
    {
      id: 2,
      firstName: "Priya",
      lastName: "Patel",
      email: "priya.patel@email.com",
      phone: "+91 98765 43212",
      dateOfBirth: "1999-08-22",
      gender: "Female",
      address: {
        street: "456 Park Avenue",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        country: "India",
      },
      emergencyContact: {
        name: "Sunita Patel",
        relationship: "Mother",
        phone: "+91 98765 43213",
        email: "sunita.patel@email.com",
      },
      occupation: "Student",
      institution: "Delhi University",
      course: "Business Administration",
      yearOfStudy: "2nd Year",
      idProof: {
        type: "PAN Card",
        number: "ABCDE1234F",
        image: "",
      },
      preferences: {
        roomType: "Double",
        foodPreference: "Non-Vegetarian",
        specialNeeds: "None",
      },
      status: "pending",
      currentRoom: "B-205",
      checkInDate: "2024-01-16",
      checkOutDate: "2024-01-25",
      totalAmount: 12000,
      paidAmount: 6000,
      balanceAmount: 6000,
      rating: 4.2,
      notes: "Pending payment for remaining amount",
      bookingHistory: [
        {
          id: 2,
          room: "B-205",
          checkIn: "2024-01-16",
          checkOut: "2024-01-25",
          amount: 12000,
          status: "Active",
        },
      ],
    },
    {
      id: 3,
      firstName: "Amit",
      lastName: "Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 98765 43214",
      dateOfBirth: "1997-12-10",
      gender: "Male",
      address: {
        street: "789 Lake Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        country: "India",
      },
      emergencyContact: {
        name: "Ravi Kumar",
        relationship: "Brother",
        phone: "+91 98765 43215",
        email: "ravi.kumar@email.com",
      },
      occupation: "Working Professional",
      institution: "Tech Solutions Ltd",
      course: "",
      yearOfStudy: "",
      idProof: {
        type: "Driving License",
        number: "DL-0123456789",
        image: "",
      },
      preferences: {
        roomType: "Single",
        foodPreference: "Vegetarian",
        specialNeeds: "None",
      },
      status: "inactive",
      currentRoom: null,
      checkInDate: null,
      checkOutDate: null,
      totalAmount: 0,
      paidAmount: 0,
      balanceAmount: 0,
      rating: 4.8,
      notes: "Former resident, left on good terms",
      bookingHistory: [
        {
          id: 3,
          room: "C-103",
          checkIn: "2023-12-01",
          checkOut: "2024-01-15",
          amount: 45000,
          status: "Completed",
        },
      ],
    },
  ];

  useEffect(() => {
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, statusFilter, typeFilter, customers]);

  const filterCustomers = () => {
    let filtered = customers.filter((customer) => {
      const matchesSearch = 
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      const matchesType = typeFilter === "all" || customer.occupation === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    setFilteredCustomers(filtered);
  };

  const handleOpenDialog = (customer = null) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData(customer);
      setIsEditMode(true);
    } else {
      setEditingCustomer(null);
      setFormData({
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
        occupation: "",
        institution: "",
        course: "",
        yearOfStudy: "",
        idProof: {
          type: "",
          number: "",
          image: "",
        },
        preferences: {
          roomType: "",
          foodPreference: "",
          specialNeeds: "",
        },
        status: "active",
        notes: "",
      });
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCustomer(null);
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
    const customerData = {
      ...formData,
      id: isEditMode ? editingCustomer.id : Date.now(),
    };

    if (isEditMode) {
      setCustomers(prev => prev.map(customer => 
        customer.id === editingCustomer.id ? customerData : customer
      ));
      setSnackbar({
        open: true,
        message: "Customer updated successfully!",
        severity: "success",
      });
    } else {
      setCustomers(prev => [...prev, customerData]);
      setSnackbar({
        open: true,
        message: "Customer added successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    setSnackbar({
      open: true,
      message: "Customer deleted successfully!",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredCustomers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "Customer_Management_Export.xlsx");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "pending":
        return "warning";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Customer Name",
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
              {params.row.occupation}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "currentRoom",
      headerName: "Current Room",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || "Not Assigned"}
          color={params.value ? "primary" : "default"}
          size="small"
        />
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
      field: "balanceAmount",
      headerName: "Balance",
      width: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color={params.value > 0 ? "error.main" : "success.main"}
          fontWeight="bold"
        >
          ₹{(params.value || 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <Star sx={{ color: "#FFC107", fontSize: 16 }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
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
          <Tooltip title="Edit Customer">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Customer">
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
                Customer Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage customer profiles, bookings, and preferences
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
                Add Customer
              </Button>
            </Box>
          </Box>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search customers..."
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
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      label="Type"
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="Student">Student</MenuItem>
                      <MenuItem value="Working Professional">Working Professional</MenuItem>
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
                      setTypeFilter("all");
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
                rows={filteredCustomers}
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

          {/* Add/Edit Customer Dialog */}
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
                  {isEditMode ? "Edit Customer" : "Add New Customer"}
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
                <Tab label="Academic/Professional" />
                <Tab label="Preferences" />
              </Tabs>

              {activeTab === 0 && (
                <Grid container spacing={3}>
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
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formData.status}
                        onChange={(e) => handleFormChange("status", e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
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
                    <FormControl fullWidth>
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        value={formData.occupation}
                        onChange={(e) => handleFormChange("occupation", e.target.value)}
                        label="Occupation"
                      >
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Working Professional">Working Professional</MenuItem>
                        <MenuItem value="Business Owner">Business Owner</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Institution/Company"
                      value={formData.institution}
                      onChange={(e) => handleFormChange("institution", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Course/Department"
                      value={formData.course}
                      onChange={(e) => handleFormChange("course", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Year of Study/Experience"
                      value={formData.yearOfStudy}
                      onChange={(e) => handleFormChange("yearOfStudy", e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      ID Proof
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>ID Type</InputLabel>
                      <Select
                        value={formData.idProof.type}
                        onChange={(e) => handleFormChange("idProof.type", e.target.value)}
                        label="ID Type"
                      >
                        <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                        <MenuItem value="PAN Card">PAN Card</MenuItem>
                        <MenuItem value="Driving License">Driving License</MenuItem>
                        <MenuItem value="Passport">Passport</MenuItem>
                        <MenuItem value="College ID">College ID</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="ID Number"
                      value={formData.idProof.number}
                      onChange={(e) => handleFormChange("idProof.number", e.target.value)}
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Preferred Room Type</InputLabel>
                      <Select
                        value={formData.preferences.roomType}
                        onChange={(e) => handleFormChange("preferences.roomType", e.target.value)}
                        label="Preferred Room Type"
                      >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Double">Double</MenuItem>
                        <MenuItem value="Triple">Triple</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Food Preference</InputLabel>
                      <Select
                        value={formData.preferences.foodPreference}
                        onChange={(e) => handleFormChange("preferences.foodPreference", e.target.value)}
                        label="Food Preference"
                      >
                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                        <MenuItem value="Jain">Jain</MenuItem>
                        <MenuItem value="No Food">No Food</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Special Needs/Requirements"
                      multiline
                      rows={3}
                      value={formData.preferences.specialNeeds}
                      onChange={(e) => handleFormChange("preferences.specialNeeds", e.target.value)}
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
                {isEditMode ? "Update" : "Add"} Customer
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
              aria-label="add customer"
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