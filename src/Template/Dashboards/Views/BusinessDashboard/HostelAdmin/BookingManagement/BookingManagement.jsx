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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Calendar,
  DatePicker,
  LocalizationProvider,
  AdapterDateFns,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import Search from "@mui/icons-material/Search";
import FilterList from "@mui/icons-material/FilterList";
import Download from "@mui/icons-material/Download";
import Refresh from "@mui/icons-material/Refresh";
import Payment from "@mui/icons-material/Payment";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Warning from "@mui/icons-material/Warning";
import Error from "@mui/icons-material/Error";
import Close from "@mui/icons-material/Close";
import Save from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";
import ConfirmationNumber from "@mui/icons-material/ConfirmationNumber";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Wifi from "@mui/icons-material/Wifi";
import AcUnit from "@mui/icons-material/AcUnit";
import LocalParking from "@mui/icons-material/LocalParking";
import Restaurant from "@mui/icons-material/Restaurant";
import LocalLaundryService from "@mui/icons-material/LocalLaundryService";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import Security from "@mui/icons-material/Security";
import CleaningServices from "@mui/icons-material/CleaningServices";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "@template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
export default function BookingManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form State
  const [formData, setFormData] = useState({
    bookingId: "",
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    roomId: "",
    roomNumber: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    totalAmount: 0,
    advanceAmount: 0,
    balanceAmount: 0,
    paymentMethod: "",
    paymentStatus: "pending",
    bookingStatus: "confirmed",
    specialRequests: "",
    notes: "",
    amenities: {
      wifi: false,
      ac: false,
      parking: false,
      food: false,
      laundry: false,
      gym: false,
      security: false,
      cleaning: false,
    },
  });

  // Mock Data
  const mockBookings = [
    {
      id: 1,
      bookingId: "BK001",
      customerId: 1,
      customerName: "Rahul Sharma",
      customerEmail: "rahul.sharma@email.com",
      customerPhone: "+91 98765 43210",
      roomId: 1,
      roomNumber: "A-101",
      roomType: "Single",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-20",
      numberOfGuests: 1,
      totalAmount: 8000,
      advanceAmount: 8000,
      balanceAmount: 0,
      paymentMethod: "Online Transfer",
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      specialRequests: "Early check-in at 10 AM",
      notes: "Customer requested early check-in",
      amenities: ["wifi", "ac", "parking"],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-15",
    },
    {
      id: 2,
      bookingId: "BK002",
      customerId: 2,
      customerName: "Priya Patel",
      customerEmail: "priya.patel@email.com",
      customerPhone: "+91 98765 43212",
      roomId: 2,
      roomNumber: "B-205",
      roomType: "Double",
      checkInDate: "2024-01-16",
      checkOutDate: "2024-01-25",
      numberOfGuests: 2,
      totalAmount: 12000,
      advanceAmount: 6000,
      balanceAmount: 6000,
      paymentMethod: "Cash",
      paymentStatus: "partial",
      bookingStatus: "confirmed",
      specialRequests: "Late check-out at 2 PM",
      notes: "Pending payment for remaining amount",
      amenities: ["wifi", "ac", "parking", "food"],
      createdAt: "2024-01-12",
      updatedAt: "2024-01-16",
    },
    {
      id: 3,
      bookingId: "BK003",
      customerId: 3,
      customerName: "Amit Kumar",
      customerEmail: "amit.kumar@email.com",
      customerPhone: "+91 98765 43214",
      roomId: 3,
      roomNumber: "C-103",
      roomType: "Triple",
      checkInDate: "2024-01-17",
      checkOutDate: "2024-01-22",
      numberOfGuests: 3,
      totalAmount: 15000,
      advanceAmount: 15000,
      balanceAmount: 0,
      paymentMethod: "Credit Card",
      paymentStatus: "paid",
      bookingStatus: "cancelled",
      specialRequests: "Extra bed required",
      notes: "Booking cancelled due to emergency",
      amenities: ["wifi", "ac", "parking", "food", "laundry"],
      createdAt: "2024-01-13",
      updatedAt: "2024-01-17",
    },
    {
      id: 4,
      bookingId: "BK004",
      customerId: 4,
      customerName: "Neha Singh",
      customerEmail: "neha.singh@email.com",
      customerPhone: "+91 98765 43216",
      roomId: 4,
      roomNumber: "A-203",
      roomType: "Single",
      checkInDate: "2024-01-18",
      checkOutDate: "2024-01-30",
      numberOfGuests: 1,
      totalAmount: 18000,
      advanceAmount: 18000,
      balanceAmount: 0,
      paymentMethod: "UPI",
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      specialRequests: "Vegetarian food only",
      notes: "Customer prefers vegetarian meals",
      amenities: ["wifi", "ac", "parking", "food", "gym"],
      createdAt: "2024-01-14",
      updatedAt: "2024-01-18",
    },
  ];

  useEffect(() => {
    setBookings(mockBookings);
    setFilteredBookings(mockBookings);
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, dateFilter, bookings]);

  const filterBookings = () => {
    let filtered = bookings.filter((booking) => {
      const matchesSearch = 
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || booking.bookingStatus === statusFilter;
      
      let matchesDate = true;
      if (dateFilter === "today") {
        const today = new Date().toISOString().split('T')[0];
        matchesDate = booking.checkInDate === today;
      } else if (dateFilter === "upcoming") {
        const today = new Date();
        const checkIn = new Date(booking.checkInDate);
        matchesDate = checkIn > today;
      } else if (dateFilter === "past") {
        const today = new Date();
        const checkOut = new Date(booking.checkOutDate);
        matchesDate = checkOut < today;
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
    
    setFilteredBookings(filtered);
  };

  const handleOpenDialog = (booking = null) => {
    if (booking) {
      setEditingBooking(booking);
      setFormData(booking);
      setIsEditMode(true);
    } else {
      setEditingBooking(null);
      setFormData({
        bookingId: `BK${String(Date.now()).slice(-6)}`,
        customerId: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        roomId: "",
        roomNumber: "",
        roomType: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: 1,
        totalAmount: 0,
        advanceAmount: 0,
        balanceAmount: 0,
        paymentMethod: "",
        paymentStatus: "pending",
        bookingStatus: "confirmed",
        specialRequests: "",
        notes: "",
        amenities: {
          wifi: false,
          ac: false,
          parking: false,
          food: false,
          laundry: false,
          gym: false,
          security: false,
          cleaning: false,
        },
      });
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBooking(null);
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
    const bookingData = {
      ...formData,
      id: isEditMode ? editingBooking.id : Date.now(),
      createdAt: isEditMode ? editingBooking.createdAt : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (isEditMode) {
      setBookings(prev => prev.map(booking => 
        booking.id === editingBooking.id ? bookingData : booking
      ));
      setSnackbar({
        open: true,
        message: "Booking updated successfully!",
        severity: "success",
      });
    } else {
      setBookings(prev => [...prev, bookingData]);
      setSnackbar({
        open: true,
        message: "Booking created successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    setSnackbar({
      open: true,
      message: "Booking deleted successfully!",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "Booking_Management_Export.xlsx");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "pending":
        return "error";
      default:
        return "default";
    }
  };

  const calculateDuration = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const columns = [
    {
      field: "bookingId",
      headerName: "Booking ID",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {params.row.customerName.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.customerEmail}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "roomNumber",
      headerName: "Room",
      width: 120,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.roomType}
          </Typography>
        </Box>
      ),
    },
    {
      field: "dates",
      headerName: "Stay Duration",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2">
            {params.row.checkInDate} - {params.row.checkOutDate}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {calculateDuration(params.row.checkInDate, params.row.checkOutDate)} days
          </Typography>
        </Box>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            ₹{(params.value || 0).toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Balance: ₹{(params.row.balanceAmount || 0).toLocaleString()}
          </Typography>
        </Box>
      ),
    },
    {
      field: "bookingStatus",
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
      field: "paymentStatus",
      headerName: "Payment",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getPaymentStatusColor(params.value)}
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
          <Tooltip title="Edit Booking">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Booking">
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
      title: "Total Bookings",
      value: bookings.length,
      icon: <ConfirmationNumber color="primary" />,
      color: "#2196F3",
    },
    {
      title: "Confirmed",
      value: bookings.filter(b => b.bookingStatus === "confirmed").length,
      icon: <CheckCircle color="primary" />,
      color: "#4CAF50",
    },
    {
      title: "Pending",
      value: bookings.filter(b => b.bookingStatus === "pending").length,
      icon: <Warning color="primary" />,
      color: "#FF9800",
    },
    {
      title: "Cancelled",
      value: bookings.filter(b => b.bookingStatus === "cancelled").length,
      icon: <Error color="primary" />,
      color: "#F44336",
    },
    {
      title: "Total Revenue",
      // value: `₹${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`,
      icon: <AttachMoney color="primary" />,
      color: "#9C27B0",
    },
    {
      title: "Pending Payments",
      // value: `₹${bookings.reduce((sum, b) => sum + b.balanceAmount, 0).toLocaleString()}`,
      icon: <Payment color="primary" />,
      color: "#FF5722",
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
                Booking Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage reservations, payments, and customer stays
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
                New Booking
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
                    placeholder="Search bookings..."
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
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Date Filter</InputLabel>
                    <Select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      label="Date Filter"
                    >
                      <MenuItem value="all">All Dates</MenuItem>
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="upcoming">Upcoming</MenuItem>
                      <MenuItem value="past">Past</MenuItem>
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
                      setDateFilter("all");
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
                rows={filteredBookings}
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

          {/* Add/Edit Booking Dialog */}
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
                  {isEditMode ? "Edit Booking" : "New Booking"}
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
                <Tab label="Customer Details" />
                <Tab label="Room & Dates" />
                <Tab label="Payment & Amenities" />
                <Tab label="Additional Info" />
              </Tabs>

              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Customer Name"
                      value={formData.customerName}
                      onChange={(e) => handleFormChange("customerName", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Customer Email"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleFormChange("customerEmail", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Customer Phone"
                      value={formData.customerPhone}
                      onChange={(e) => handleFormChange("customerPhone", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Guests"
                      type="number"
                      value={formData.numberOfGuests}
                      onChange={(e) => handleFormChange("numberOfGuests", parseInt(e.target.value))}
                      required
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Room Number"
                      value={formData.roomNumber}
                      onChange={(e) => handleFormChange("roomNumber", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Room Type</InputLabel>
                      <Select
                        value={formData.roomType}
                        onChange={(e) => handleFormChange("roomType", e.target.value)}
                        label="Room Type"
                      >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Double">Double</MenuItem>
                        <MenuItem value="Triple">Triple</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-in Date"
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => handleFormChange("checkInDate", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-out Date"
                      type="date"
                      value={formData.checkOutDate}
                      onChange={(e) => handleFormChange("checkOutDate", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Total Amount (₹)"
                      type="number"
                      value={formData.totalAmount}
                      onChange={(e) => handleFormChange("totalAmount", parseInt(e.target.value))}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Advance Amount (₹)"
                      type="number"
                      value={formData.advanceAmount}
                      onChange={(e) => handleFormChange("advanceAmount", parseInt(e.target.value))}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Payment Method</InputLabel>
                      <Select
                        value={formData.paymentMethod}
                        onChange={(e) => handleFormChange("paymentMethod", e.target.value)}
                        label="Payment Method"
                      >
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Credit Card">Credit Card</MenuItem>
                        <MenuItem value="Debit Card">Debit Card</MenuItem>
                        <MenuItem value="UPI">UPI</MenuItem>
                        <MenuItem value="Online Transfer">Online Transfer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Payment Status</InputLabel>
                      <Select
                        value={formData.paymentStatus}
                        onChange={(e) => handleFormChange("paymentStatus", e.target.value)}
                        label="Payment Status"
                      >
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="partial">Partial</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Amenities
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {Object.entries(formData.amenities).map(([amenity, checked]) => (
                        <Grid item xs={6} sm={4} md={3} key={amenity}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={checked}
                                onChange={(e) => handleFormChange(`amenities.${amenity}`, e.target.checked)}
                              />
                            }
                            label={
                              <Box display="flex" alignItems="center" gap={1}>
                                {amenity === "wifi" && <Wifi fontSize="small" />}
                                {amenity === "ac" && <AcUnit fontSize="small" />}
                                {amenity === "parking" && <LocalParking fontSize="small" />}
                                {amenity === "food" && <Restaurant fontSize="small" />}
                                {amenity === "laundry" && <LocalLaundryService fontSize="small" />}
                                {amenity === "gym" && <FitnessCenter fontSize="small" />}
                                {amenity === "security" && <Security fontSize="small" />}
                                {amenity === "cleaning" && <CleaningServices fontSize="small" />}
                                <Typography variant="body2" textTransform="capitalize">
                                  {amenity}
                                </Typography>
                              </Box>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {activeTab === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Special Requests"
                      multiline
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => handleFormChange("specialRequests", e.target.value)}
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
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Booking Status</InputLabel>
                      <Select
                        value={formData.bookingStatus}
                        onChange={(e) => handleFormChange("bookingStatus", e.target.value)}
                        label="Booking Status"
                      >
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
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
                {isEditMode ? "Update" : "Create"} Booking
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
              aria-label="new booking"
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