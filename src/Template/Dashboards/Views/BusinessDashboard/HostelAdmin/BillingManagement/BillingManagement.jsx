import React, { useState, useEffect, useCallback, useMemo } from "react";


import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "Template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

// MUI icons
import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Close from '@mui/icons-material/Close';
import Save from '@mui/icons-material/Save';
import Receipt from '@mui/icons-material/Receipt';
import AttachMoney from '@mui/icons-material/AttachMoney';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import Error from '@mui/icons-material/Error';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Visibility from '@mui/icons-material/Visibility';
import Print from '@mui/icons-material/Print';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import Download from '@mui/icons-material/Download';
import Refresh from '@mui/icons-material/Refresh';
import Cancel from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Edit from '@mui/icons-material/Edit';

export default function BillingManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
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
    billId: "",
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    roomNumber: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfDays: 0,
    roomRent: 0,
    foodCharges: 0,
    laundryCharges: 0,
    additionalCharges: 0,
    discount: 0,
    tax: 0,
    totalAmount: 0,
    paidAmount: 0,
    balanceAmount: 0,
    paymentMethod: "",
    paymentStatus: "pending",
    billStatus: "generated",
    dueDate: "",
    notes: "",
    items: [
      {
        description: "Room Rent",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ],
  });

  // Mock Data
  const mockBills = [
    {
      id: 1,
      billId: "BILL001",
      customerId: 1,
      customerName: "Rahul Sharma",
      customerEmail: "rahul.sharma@email.com",
      customerPhone: "+91 98765 43210",
      roomNumber: "A-101",
      roomType: "Single",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-20",
      numberOfDays: 5,
      roomRent: 8000,
      foodCharges: 1500,
      laundryCharges: 500,
      additionalCharges: 200,
      discount: 500,
      tax: 950,
      totalAmount: 9650,
      paidAmount: 9650,
      balanceAmount: 0,
      paymentMethod: "Online Transfer",
      paymentStatus: "paid",
      billStatus: "paid",
      dueDate: "2024-01-20",
      notes: "Payment received on time",
      items: [
        { description: "Room Rent", quantity: 5, rate: 1600, amount: 8000 },
        { description: "Food Charges", quantity: 5, rate: 300, amount: 1500 },
        { description: "Laundry", quantity: 2, rate: 250, amount: 500 },
        { description: "Additional", quantity: 1, rate: 200, amount: 200 },
      ],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: 2,
      billId: "BILL002",
      customerId: 2,
      customerName: "Priya Patel",
      customerEmail: "priya.patel@email.com",
      customerPhone: "+91 98765 43212",
      roomNumber: "B-205",
      roomType: "Double",
      checkInDate: "2024-01-16",
      checkOutDate: "2024-01-25",
      numberOfDays: 9,
      roomRent: 12000,
      foodCharges: 2700,
      laundryCharges: 900,
      additionalCharges: 300,
      discount: 0,
      tax: 1500,
      totalAmount: 14400,
      paidAmount: 7200,
      balanceAmount: 7200,
      paymentMethod: "Cash",
      paymentStatus: "partial",
      billStatus: "pending",
      dueDate: "2024-01-25",
      notes: "Partial payment received",
      items: [
        { description: "Room Rent", quantity: 9, rate: 1333, amount: 12000 },
        { description: "Food Charges", quantity: 9, rate: 300, amount: 2700 },
        { description: "Laundry", quantity: 3, rate: 300, amount: 900 },
        { description: "Additional", quantity: 1, rate: 300, amount: 300 },
      ],
      createdAt: "2024-01-16",
      updatedAt: "2024-01-16",
    },
    {
      id: 3,
      billId: "BILL003",
      customerId: 3,
      customerName: "Amit Kumar",
      customerEmail: "amit.kumar@email.com",
      customerPhone: "+91 98765 43214",
      roomNumber: "C-103",
      roomType: "Triple",
      checkInDate: "2024-01-17",
      checkOutDate: "2024-01-22",
      numberOfDays: 5,
      roomRent: 15000,
      foodCharges: 2500,
      laundryCharges: 800,
      additionalCharges: 400,
      discount: 1000,
      tax: 1700,
      totalAmount: 17400,
      paidAmount: 0,
      balanceAmount: 17400,
      paymentMethod: "",
      paymentStatus: "pending",
      billStatus: "overdue",
      dueDate: "2024-01-22",
      notes: "Payment overdue",
      items: [
        { description: "Room Rent", quantity: 5, rate: 3000, amount: 15000 },
        { description: "Food Charges", quantity: 5, rate: 500, amount: 2500 },
        { description: "Laundry", quantity: 2, rate: 400, amount: 800 },
        { description: "Additional", quantity: 1, rate: 400, amount: 400 },
      ],
      createdAt: "2024-01-17",
      updatedAt: "2024-01-22",
    },
  ];

  useEffect(() => {
    setBills(mockBills);
    setFilteredBills(mockBills);
  }, []);

  useEffect(() => {
    filterBills();
  }, [searchTerm, statusFilter, dateFilter, bills]);

  const filterBills = () => {
    let filtered = bills.filter((bill) => {
      const matchesSearch = 
        bill.billId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || bill.paymentStatus === statusFilter;
      
      let matchesDate = true;
      if (dateFilter === "today") {
        const today = new Date().toISOString().split('T')[0];
        matchesDate = bill.dueDate === today;
      } else if (dateFilter === "overdue") {
        const today = new Date();
        const dueDate = new Date(bill.dueDate);
        matchesDate = dueDate < today && bill.balanceAmount > 0;
      } else if (dateFilter === "upcoming") {
        const today = new Date();
        const dueDate = new Date(bill.dueDate);
        matchesDate = dueDate > today;
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
    
    setFilteredBills(filtered);
  };

  const calculateTotal = (data = formData) => {
    const roomRent = data.roomRent || 0;
    const foodCharges = data.foodCharges || 0;
    const laundryCharges = data.laundryCharges || 0;
    const additionalCharges = data.additionalCharges || 0;
    const discount = data.discount || 0;
    const paidAmount = data.paidAmount || 0;

    const subtotal = roomRent + foodCharges + laundryCharges + additionalCharges;
    const afterDiscount = subtotal - discount;
    const taxAmount = afterDiscount * 0.1;
    const total = afterDiscount + taxAmount;

    return {
      tax: taxAmount,
      totalAmount: total,
      balanceAmount: total - paidAmount,
    };
  };

  const handleOpenDialog = (bill = null) => {
    if (bill) {
      const { tax, totalAmount, balanceAmount } = calculateTotal(bill);
      setEditingBill(bill);
      setFormData({ ...bill, tax, totalAmount, balanceAmount });
      setIsEditMode(true);
    } else {
      const initialForm = {
        billId: `BILL${String(Date.now()).slice(-6)}`,
        customerId: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        roomNumber: "",
        roomType: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfDays: 0,
        roomRent: 0,
        foodCharges: 0,
        laundryCharges: 0,
        additionalCharges: 0,
        discount: 0,
        tax: 0,
        totalAmount: 0,
        paidAmount: 0,
        balanceAmount: 0,
        paymentMethod: "",
        paymentStatus: "pending",
        billStatus: "generated",
        dueDate: "",
        notes: "",
        items: [
          {
            description: "Room Rent",
            quantity: 1,
            rate: 0,
            amount: 0,
          },
        ],
      };
      const { tax, totalAmount, balanceAmount } = calculateTotal(initialForm);
      setEditingBill(null);
      setFormData({ ...initialForm, tax, totalAmount, balanceAmount });
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBill(null);
    setIsEditMode(false);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if ([
        "roomRent",
        "foodCharges",
        "laundryCharges",
        "additionalCharges",
        "discount",
        "paidAmount"
      ].includes(field)) {
        const { tax, totalAmount, balanceAmount } = calculateTotal(updated);
        updated.tax = tax;
        updated.totalAmount = totalAmount;
        updated.balanceAmount = balanceAmount;
      }
      return updated;
    });
  };

  const handleSubmit = () => {
    const billData = {
      ...formData,
      id: isEditMode ? editingBill.id : Date.now(),
      createdAt: isEditMode ? editingBill.createdAt : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (isEditMode) {
      setBills(prev => prev.map(bill => 
        bill.id === editingBill.id ? billData : bill
      ));
      setSnackbar({
        open: true,
        message: "Bill updated successfully!",
        severity: "success",
      });
    } else {
      setBills(prev => [...prev, billData]);
      setSnackbar({
        open: true,
        message: "Bill generated successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setBills(prev => prev.filter(bill => bill.id !== id));
    setSnackbar({
      open: true,
      message: "Bill deleted successfully!",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBills);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bills");
    XLSX.writeFile(wb, "Billing_Management_Export.xlsx");
  };

  const getStatusColor = (status) => {
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

  const getBillStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "error";
      default:
        return "default";
    }
  };

  // Dashboard Stats - Memoized to prevent unnecessary re-renders
  const stats = useMemo(() => [
    {
      title: "Total Bills",
      value: bills.length,
      icon: <Receipt color="primary" />,
      color: "#2196F3",
    },
    {
      title: "Total Revenue",
      value: `₹${bills.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toLocaleString()}`,
      icon: <AttachMoney color="primary" />,
      color: "#4CAF50",
    },
    {
      title: "Paid Amount",
      value: `₹${bills.reduce((sum, b) => sum + (b.paidAmount || 0), 0).toLocaleString()}`,
      icon: <CheckCircle color="primary" />,
      color: "#4CAF50",
    },
    {
      title: "Pending Amount",
      value: `₹${bills.reduce((sum, b) => sum + (b.balanceAmount || 0), 0).toLocaleString()}`,
      icon: <Warning color="primary" />,
      color: "#FF9800",
    },
    {
      title: "Overdue Bills",
      value: bills.filter(b => b.billStatus === "overdue").length,
      icon: <Error color="primary" />,
      color: "#F44336",
    },
    {
      title: "Average Bill",
      value: bills.length > 0 ? `₹${Math.round(bills.reduce((sum, b) => sum + (b.totalAmount || 0), 0) / bills.length).toLocaleString()}` : "₹0",
      icon: <TrendingUp color="primary" />,
      color: "#9C27B0",
    },
  ], [bills]);

  const columns = useMemo(() => [
    {
      field: "billId",
      headerName: "Bill ID",
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
              {params.row.roomNumber}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
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
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "billStatus",
      headerName: "Bill Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getBillStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="View Bill">
            <IconButton size="small" color="primary">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print Bill">
            <IconButton size="small" color="secondary">
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Bill">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Bill">
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
  ], [handleOpenDialog, handleDelete]);

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
                Billing & Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage invoices, payments, and financial reports
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
                Generate Bill
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
                    placeholder="Search bills..."
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
                    <InputLabel>Payment Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Payment Status"
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="partial">Partial</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
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
                      <MenuItem value="overdue">Overdue</MenuItem>
                      <MenuItem value="upcoming">Upcoming</MenuItem>
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
                rows={filteredBills}
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

          {/* Add/Edit Bill Dialog */}
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
                  {isEditMode ? "Edit Bill" : "Generate New Bill"}
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
                <Tab label="Customer Info" />
                <Tab label="Room Details" />
                <Tab label="Charges" />
                <Tab label="Payment" />
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
                      label="Bill ID"
                      value={formData.billId}
                      onChange={(e) => handleFormChange("billId", e.target.value)}
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Days"
                      type="number"
                      value={formData.numberOfDays || ""}
                      onChange={(e) => handleFormChange("numberOfDays", parseInt(e.target.value) || 0)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Due Date"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleFormChange("dueDate", e.target.value)}
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
                      label="Room Rent (₹)"
                      type="number"
                      value={formData.roomRent || ""}
                      onChange={(e) => handleFormChange("roomRent", parseInt(e.target.value) || 0)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Food Charges (₹)"
                      type="number"
                      value={formData.foodCharges || ""}
                      onChange={(e) => handleFormChange("foodCharges", parseInt(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Laundry Charges (₹)"
                      type="number"
                      value={formData.laundryCharges || ""}
                      onChange={(e) => handleFormChange("laundryCharges", parseInt(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Additional Charges (₹)"
                      type="number"
                      value={formData.additionalCharges || ""}
                      onChange={(e) => handleFormChange("additionalCharges", parseInt(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Discount (₹)"
                      type="number"
                      value={formData.discount || ""}
                      onChange={(e) => handleFormChange("discount", parseInt(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tax (₹)"
                      type="number"
                      value={formData.tax || 0}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" fontWeight="bold">
                        Total Amount: ₹{(formData.totalAmount || 0).toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}

              {activeTab === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Paid Amount (₹)"
                      type="number"
                      value={formData.paidAmount || ""}
                      onChange={(e) => handleFormChange("paidAmount", parseInt(e.target.value) || 0)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Balance Amount (₹)"
                      type="number"
                      value={formData.balanceAmount || 0}
                      InputProps={{ readOnly: true }}
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
                    <TextField
                      fullWidth
                      label="Notes"
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
                {isEditMode ? "Update" : "Generate"} Bill
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
              aria-label="generate bill"
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