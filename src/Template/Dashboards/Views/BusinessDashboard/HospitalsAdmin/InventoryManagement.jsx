import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Drawer,
  Button,
  Avatar,
  Stack,
  Divider,
  useTheme,
  Grid,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
  InputAdornment,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CustomTableToolbar from "../../../../../CommonComponents/CustomTableToolbar";
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
// For QR/Barcode: use 'qrcode.react' and 'react-barcode' if available, else mock
import { QRCodeSVG } from 'qrcode.react';
// import Barcode from 'react-barcode';
import { DataGrid } from "@mui/x-data-grid";
// Add jsPDF import for PDF download
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Mock data for inventory items
const mockInventory = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Medicine",
    quantity: 120,
    threshold: 50,
    status: "In Stock",
    expiry: "2024-12-15",
    supplier: { name: "MediSupply Co.", contact: "medisupply@example.com" },
    barcode: "123456789012",
    staffId: 201,
  },
  {
    id: 2,
    name: "Syringe 5ml",
    category: "Equipment",
    quantity: 30,
    threshold: 40,
    status: "Low Stock",
    expiry: "2025-03-01",
    supplier: { name: "EquipMart", contact: "equipmart@example.com" },
    barcode: "234567890123",
    staffId: 202,
  },
  {
    id: 3,
    name: "Bandages",
    category: "Supplies",
    quantity: 0,
    threshold: 20,
    status: "Out of Stock",
    expiry: "2024-07-10",
    supplier: { name: "FirstAidPro", contact: "firstaidpro@example.com" },
    barcode: "345678901234",
    staffId: 203,
  },
  {
    id: 4,
    name: "Ibuprofen",
    category: "Medicine",
    quantity: 80,
    threshold: 30,
    status: "In Stock",
    expiry: "2025-01-20",
    supplier: { name: "MediSupply Co.", contact: "medisupply@example.com" },
    barcode: "456789012345",
    staffId: 201,
  },
  {
    id: 5,
    name: "Gloves",
    category: "Supplies",
    quantity: 15,
    threshold: 25,
    status: "Low Stock",
    expiry: "2024-08-05",
    supplier: { name: "EquipMart", contact: "equipmart@example.com" },
    barcode: "567890123456",
    staffId: 202,
  },
];

// Mock data for staff
const mockStaff = {
  201: { id: 201, name: "Pharmacist Alice", role: "Pharmacist", phone: "555-1111", email: "alice@hospital.com", avatar: "A" },
  202: { id: 202, name: "Storekeeper Bob", role: "Storekeeper", phone: "555-2222", email: "bob@hospital.com", avatar: "B" },
  203: { id: 203, name: "Nurse Carol", role: "Nurse", phone: "555-3333", email: "carol@hospital.com", avatar: "C" },
};

// Chart data helpers
const statusColors = {
  "In Stock": "#10b981",
  "Low Stock": "#fbbf24",
  "Out of Stock": "#f87171",
};
const getStatusData = (inventory) => {
  const counts = {};
  inventory.forEach((item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
  });
  return Object.keys(counts).map((status) => ({ name: status, value: counts[status], color: statusColors[status] || "#a3a3a3" }));
};
const getCategoryData = (inventory) => {
  const counts = {};
  inventory.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });
  return Object.keys(counts).map((category) => ({ category, count: counts[category] }));
};

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [bulkDeleteIds, setBulkDeleteIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("In Stock");
  const [isBarcodeVisible, setIsBarcodeVisible] = useState(false);
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isSupplierInfoVisible, setIsSupplierInfoVisible] = useState(false);
  const [isRoleBasedAccess, setIsRoleBasedAccess] = useState(false);
  // Add state for barcode dialog
  const [barcodeDialogOpen, setBarcodeDialogOpen] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState("");
  // Add state for stock in/out dialogs and transaction log
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [stockType, setStockType] = useState('in'); // 'in' or 'out'
  const [stockItem, setStockItem] = useState(null);
  const [stockQty, setStockQty] = useState(1);
  const [stockReason, setStockReason] = useState('');
  const [stockDate, setStockDate] = useState(new Date().toISOString().slice(0, 10));
  const [itemHistory, setItemHistory] = useState({}); // { [itemId]: [ {type, qty, reason, date} ] }

  // Invoice/Bill state
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]); // [{itemId, name, price, quantity, total}]
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [invoiceNumber, setInvoiceNumber] = useState(() => `INV-${Date.now()}`);
  // Add state for tax, discount, address
  const [taxPercent, setTaxPercent] = useState(18);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('flat'); // 'flat' or 'percent'
  const [customerAddress, setCustomerAddress] = useState("");

  const theme = useTheme();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInventory(mockInventory);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewStaff = (row) => {
    setSelectedStaff(mockStaff[row.staffId]);
    setSelectedItem(row);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedStaff(null);
    setSelectedItem(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setSnackOptions({ color: "success", message: `Status updated to ${newStatus}` });
    setSnackOpen(true);
  };

  const statusOptions = [
    { value: "In Stock", label: "In Stock", color: "#10b981" },
    { value: "Low Stock", label: "Low Stock", color: "#fbbf24" },
    { value: "Out of Stock", label: "Out of Stock", color: "#f87171" },
  ];

  // Helper: get item price (mock)
  const getItemPrice = (item) => {
    // For demo, assign price based on category
    if (item.category === 'Medicine') return 10;
    if (item.category === 'Equipment') return 50;
    if (item.category === 'Supplies') return 5;
    return 20;
  };

  const columns = [
    {
      field: "edit",
      headerName: "Edit",
      minWidth: 70,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title="Edit Inventory Item">
          <IconButton
            color="primary"
            size="medium"
            onClick={() => alert(`Edit inventory ID: ${params.row.id}`)}
          >
            <EditNoteOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 180,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderHeader: () => <VisibilityOutlinedIcon color="info" />,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Item & Staff Details">
            <IconButton
              color="info"
              size="large"
              onClick={() => handleViewStaff(params.row)}
            >
              <VisibilityOutlinedIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Stock In">
            <IconButton
              color="success"
              size="medium"
              onClick={() => {
                setStockType('in');
                setStockItem(params.row);
                setStockQty(1);
                setStockReason('');
                setStockDate(new Date().toISOString().slice(0, 10));
                setStockDialogOpen(true);
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Stock Out">
            <IconButton
              color="warning"
              size="medium"
              onClick={() => {
                setStockType('out');
                setStockItem(params.row);
                setStockQty(1);
                setStockReason('');
                setStockDate(new Date().toISOString().slice(0, 10));
                setStockDialogOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    { field: "id", headerName: "ID", minWidth: 80 },
    { field: "name", headerName: "Item Name", minWidth: 180 },
    { field: "category", headerName: "Category", minWidth: 140 },
    { field: "quantity", headerName: "Quantity", minWidth: 100,
      cellClassName: (params) =>
        params.row.quantity <= params.row.threshold ?
          (params.row.quantity === 0 ? 'out-of-stock' : 'low-stock') : '',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.row.quantity}
          {params.row.quantity === 0 && (
            <Tooltip title="Out of Stock"><span style={{ color: '#f87171', fontWeight: 700 }}>●</span></Tooltip>
          )}
          {params.row.quantity > 0 && params.row.quantity <= params.row.threshold && (
            <Tooltip title="Low Stock"><span style={{ color: '#fbbf24', fontWeight: 700 }}>●</span></Tooltip>
          )}
        </Box>
      ),
    },
    { field: "threshold", headerName: "Threshold", minWidth: 100 },
    {
      field: "expiry",
      headerName: "Expiry Date",
      minWidth: 130,
      renderCell: (params) => {
        const today = new Date();
        const expiry = new Date(params.row.expiry);
        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        let color = undefined;
        let tooltip = undefined;
        if (diffDays <= 0) {
          color = '#f87171';
          tooltip = 'Expired';
        } else if (diffDays <= 30) {
          color = '#fbbf24';
          tooltip = `Expiring in ${diffDays} days`;
        }
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {params.row.expiry}
            {color && (
              <Tooltip title={tooltip}><span style={{ color, fontWeight: 700 }}>●</span></Tooltip>
            )}
          </Box>
        );
      },
    },
    {
      field: "supplier",
      headerName: "Supplier",
      minWidth: 180,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={600}>{params.row.supplier?.name}</Typography>
          <Typography variant="caption" color="text.secondary">{params.row.supplier?.contact}</Typography>
        </Box>
      ),
    },
    {
      field: "barcode",
      headerName: "Barcode",
      minWidth: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          fontFamily="monospace"
          sx={{ cursor: 'pointer', color: '#6366f1', textDecoration: 'underline' }}
          onClick={() => {
            setBarcodeValue(params.row.barcode);
            setBarcodeDialogOpen(true);
          }}
        >
          {params.row.barcode}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 170,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 700,
            color: statusOptions.find(opt => opt.value === params.row.status)?.color,
            background: (theme) => theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6',
            borderRadius: 2,
            minWidth: 110,
            '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 },
          }}
          MenuProps={{
            PaperProps: {
              sx: { borderRadius: 2 }
            }
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Chip
                label={option.label}
                size="small"
                sx={{
                  bgcolor: option.color,
                  color: '#fff',
                  fontWeight: 700,
                  px: 1.5,
                  borderRadius: 1.5,
                  fontSize: 13,
                }}
              />
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  // Dashboard background and card style (match HospitalsAdminDashboard)
  const bgGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #181c2a 0%, #232946 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  const cardGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #232946 0%, #181c2a 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
  const cardText = theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b';

  // Chart data
  const statusData = getStatusData(inventory);
  const categoryData = getCategoryData(inventory);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: bgGradient }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, pt: 10, overflow: "auto" }}>
        <Box mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)'
                : 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Inventory / Pharmacy Management
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}
            sx={{ mb: 1 }}
          >
            Track, manage, and monitor all inventory and pharmacy items
          </Typography>
        </Box>
        {/* Charts Section */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}>
                Inventory Status Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-status-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: theme.palette.mode === 'dark' ? '#232946' : '#fff', color: cardText }} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}>
                Items per Category
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={categoryData}>
                  <XAxis dataKey="category" stroke={theme.palette.mode === 'dark' ? '#cbd5e1' : undefined} />
                  <YAxis allowDecimals={false} stroke={theme.palette.mode === 'dark' ? '#cbd5e1' : undefined} />
                  <Bar dataKey="count" fill="#6366f1" name="Items" barSize={28} radius={[8, 8, 0, 0]} />
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: theme.palette.mode === 'dark' ? '#232946' : '#fff', color: cardText }} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Table Section */}
        <Paper
          sx={{
            width: "100%",
            overflowX: "auto",
            borderRadius: 3,
            boxShadow: 4,
            p: { xs: 1, sm: 2 },
            background: cardGradient,
            color: cardText,
            minWidth: { xs: 350, sm: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mb: 3,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: { xs: "300px", sm: "60vh" },
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ width: "100%", flex: 1 }}>
              <DataGrid
                rows={inventory}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                pagination
                pageSizeOptions={[5, 10, 25]}
                getRowId={(row) => row.id}
                initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                slots={{
                  toolbar: () => (
                    <CustomTableToolbar
                      rows={inventory}
                      columns={columns}
                      selectedIDs={[]}
                      handleDelete={() => {}}
                    />
                  ),
                }}
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  background: cardGradient,
                  color: cardText,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-root": {
                    minWidth: { xs: 350, sm: 0 },
                  },
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                }}
                autoHeight
              />
            </Box>
          )}
        </Paper>
        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
          <Alert onClose={() => setSnackOpen(false)} severity={snackOptions.color} sx={{ width: '100%' }}>
            {snackOptions.message}
          </Alert>
        </Snackbar>
      </Box>
      {/* Item & Staff Details Drawer - moved outside scrolling Box */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 420 },
            maxWidth: 480,
            p: 0,
            background: cardGradient,
            color: cardText,
            boxShadow: 6,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            zIndex: (theme) => theme.zIndex.drawer + 10,
          },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1, overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.25rem" }, mb: 2, textAlign: 'center' }}>
            Inventory Item Details
          </Typography>
          {selectedItem ? (
            <Paper elevation={0} sx={{ mb: 3, p: 2, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 48, height: 48, fontSize: 24, bgcolor: '#6366f1' }}>{selectedItem.name[0]}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{selectedItem.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedItem.category}</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <Typography variant="body2"><b>Quantity:</b> {selectedItem.quantity}</Typography>
                <Typography variant="body2"><b>Threshold:</b> {selectedItem.threshold}</Typography>
                <Typography variant="body2"><b>Status:</b> {selectedItem.status}</Typography>
                <Typography variant="body2"><b>Item ID:</b> {selectedItem.id}</Typography>
              </Stack>
            </Paper>
          ) : (
            <Typography variant="body2" color="text.secondary">No item selected.</Typography>
          )}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
            Staff Details
          </Typography>
          {selectedStaff ? (
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 48, height: 48, fontSize: 24, bgcolor: '#10b981' }}>{selectedStaff.avatar}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{selectedStaff.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedStaff.role}</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <Typography variant="body2"><b>Phone:</b> {selectedStaff.phone}</Typography>
                <Typography variant="body2"><b>Email:</b> {selectedStaff.email}</Typography>
              </Stack>
            </Paper>
          ) : (
            <Typography variant="body2" color="text.secondary">No staff selected.</Typography>
          )}
          {isHistoryVisible && selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Transaction History</Typography>
              {(itemHistory[selectedItem.id] || []).length === 0 ? (
                <Typography variant="body2" color="text.secondary">No transactions yet.</Typography>
              ) : (
                <Box sx={{ maxHeight: 180, overflowY: 'auto' }}>
                  {(itemHistory[selectedItem.id] || []).map((tx, idx) => (
                    <Box key={idx} sx={{ mb: 1, p: 1, border: '1px solid #e0e7ef', borderRadius: 1 }}>
                      <Typography variant="body2"><b>{tx.type === 'in' ? 'Stock In' : 'Stock Out'}</b> - Qty: {tx.qty}</Typography>
                      <Typography variant="caption" color="text.secondary">{tx.date} | {tx.reason}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}
          <Button onClick={handleCloseDrawer} color="primary" variant="contained" fullWidth sx={{ fontWeight: 600, mt: 4 }}>
            Close
          </Button>
        </Box>
      </Drawer>
      {/* Barcode Dialog */}
      <Dialog open={barcodeDialogOpen} onClose={() => setBarcodeDialogOpen(false)}>
        <DialogTitle>
          Barcode & QR Code
          <IconButton
            aria-label="close"
            onClick={() => setBarcodeDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 320 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4, my: 2 }}>
            {/* Barcode SVG */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Barcode</Typography>
              <svg width="180" height="60" xmlns="http://www.w3.org/2000/svg">
                <rect width="180" height="60" fill="#fff" stroke="#6366f1" strokeWidth="2" />
                <text x="90" y="40" fontSize="22" fontFamily="monospace" fill="#6366f1" textAnchor="middle">{barcodeValue}</text>
              </svg>
              <Typography variant="body2" fontFamily="monospace" sx={{ mt: 1 }}>{barcodeValue}</Typography>
            </Box>
            {/* QR Code */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>QR Code</Typography>
              <QRCodeSVG value={barcodeValue || ' '} size={90} />
              <Typography variant="body2" fontFamily="monospace" sx={{ mt: 1 }}>{barcodeValue}</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {/* Stock In/Out Dialog */}
      <Dialog open={stockDialogOpen} onClose={() => setStockDialogOpen(false)}>
        <DialogTitle>{stockType === 'in' ? 'Stock In' : 'Stock Out'} - {stockItem?.name}</DialogTitle>
        <DialogContent sx={{ minWidth: 320 }}>
          <TextField
            label="Quantity"
            type="number"
            value={stockQty}
            onChange={e => setStockQty(Math.max(1, Number(e.target.value)))}
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ min: 1, max: stockType === 'out' ? stockItem?.quantity : undefined }}
          />
          <TextField
            label="Reason"
            value={stockReason}
            onChange={e => setStockReason(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={stockDate}
            onChange={e => setStockDate(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStockDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={stockType === 'in' ? 'success' : 'warning'}
            onClick={() => {
              // Update inventory
              setInventory(prev => prev.map(item =>
                item.id === stockItem.id
                  ? { ...item, quantity: stockType === 'in' ? item.quantity + Number(stockQty) : Math.max(0, item.quantity - Number(stockQty)) }
                  : item
              ));
              // Log transaction
              setItemHistory(prev => ({
                ...prev,
                [stockItem.id]: [
                  ...(prev[stockItem.id] || []),
                  { type: stockType, qty: Number(stockQty), reason: stockReason, date: stockDate }
                ]
              }));
              setSnackOptions({ color: 'success', message: `Stock ${stockType === 'in' ? 'added' : 'removed'} successfully!` });
              setSnackOpen(true);
              setStockDialogOpen(false);
            }}
            disabled={stockType === 'out' && stockQty > (stockItem?.quantity || 0)}
          >
            {stockType === 'in' ? 'Add Stock' : 'Remove Stock'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add Generate Invoice FAB */}
      <Fab
        color="primary"
        aria-label="generate-invoice"
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 2000 }}
        onClick={() => {
          setInvoiceDialogOpen(true);
          setInvoiceItems([]);
          setCustomerName("");
          setCustomerContact("");
          setInvoiceDate(new Date().toISOString().slice(0, 10));
          setInvoiceNumber(`INV-${Date.now()}`);
          setTaxPercent(18);
          setDiscount(0);
          setDiscountType('flat');
          setCustomerAddress("");
        }}
      >
        <AddIcon />
      </Fab>

      {/* Invoice Dialog */}
      <Dialog open={invoiceDialogOpen} onClose={() => setInvoiceDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Generate Invoice / Bill</DialogTitle>
        <DialogContent>
          {/* Company Branding */}
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
              <Box sx={{ width: 48, height: 48, bgcolor: '#6366f1', borderRadius: '50%' }} />
              <Box>
                <Typography variant="h5" fontWeight={700}>Your Company Name</Typography>
                <Typography variant="body2">123 Main St, City, Country</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Customer Details</Typography>
            <TextField
              label="Customer Name"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              fullWidth sx={{ mb: 2 }}
            />
            <TextField
              label="Contact"
              value={customerContact}
              onChange={e => setCustomerContact(e.target.value)}
              fullWidth sx={{ mb: 2 }}
            />
            <TextField
              label="Address"
              value={customerAddress}
              onChange={e => setCustomerAddress(e.target.value)}
              fullWidth multiline rows={2} sx={{ mb: 2 }}
            />
            <TextField
              label="Date"
              type="date"
              value={invoiceDate}
              onChange={e => setInvoiceDate(e.target.value)}
              fullWidth sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Invoice Number"
              value={invoiceNumber}
              fullWidth sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Select Items</Typography>
            {inventory.map(item => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Checkbox
                  checked={invoiceItems.some(i => i.itemId === item.id)}
                  onChange={e => {
                    if (e.target.checked) {
                      setInvoiceItems(prev => [...prev, { itemId: item.id, name: item.name, price: getItemPrice(item), quantity: 1, total: getItemPrice(item) }]);
                    } else {
                      setInvoiceItems(prev => prev.filter(i => i.itemId !== item.id));
                    }
                  }}
                />
                <Typography sx={{ minWidth: 120 }}>{item.name}</Typography>
                <TextField
                  label="Qty"
                  type="number"
                  size="small"
                  value={invoiceItems.find(i => i.itemId === item.id)?.quantity || 1}
                  onChange={e => {
                    const qty = Math.max(1, Number(e.target.value));
                    setInvoiceItems(prev => prev.map(i => i.itemId === item.id ? { ...i, quantity: qty, total: qty * i.price } : i));
                  }}
                  sx={{ width: 70 }}
                  disabled={!invoiceItems.some(i => i.itemId === item.id)}
                  inputProps={{ min: 1, max: item.quantity }}
                />
                <Typography sx={{ minWidth: 60 }}>x ₹{getItemPrice(item)}</Typography>
                <Typography sx={{ minWidth: 80 }}>= ₹{(invoiceItems.find(i => i.itemId === item.id)?.total || getItemPrice(item)).toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>
          {/* Tax and Discount Fields */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Tax (%)"
              type="number"
              value={taxPercent}
              onChange={e => setTaxPercent(Math.max(0, Number(e.target.value)))}
              sx={{ width: 120 }}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Discount"
              type="number"
              value={discount}
              onChange={e => setDiscount(Math.max(0, Number(e.target.value)))}
              sx={{ width: 120 }}
              inputProps={{ min: 0 }}
            />
            <Select
              value={discountType}
              onChange={e => setDiscountType(e.target.value)}
              sx={{ width: 120 }}
            >
              <MenuItem value="flat">Flat (₹)</MenuItem>
              <MenuItem value="percent">Percent (%)</MenuItem>
            </Select>
          </Box>
          {/* Invoice Preview */}
          <Box
            sx={{
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? '#334155' : '#e0e7ef',
              borderRadius: 2,
              p: 2,
              mt: 2,
              background: theme.palette.mode === 'dark' ? '#232946' : '#f9fafb',
              color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>Invoice Preview</Typography>
            <Typography variant="body2">Invoice #: {invoiceNumber}</Typography>
            <Typography variant="body2">Date: {invoiceDate}</Typography>
            <Typography variant="body2">Customer: {customerName} | {customerContact}</Typography>
            <Typography variant="body2">Address: {customerAddress}</Typography>
            <Box sx={{ mt: 2 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'inherit', color: 'inherit' }}>
                <thead>
                  <tr style={{ background: theme.palette.mode === 'dark' ? '#334155' : '#e0e7ef', color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b' }}>
                    <th style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}` }}>Item</th>
                    <th style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}` }}>Qty</th>
                    <th style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}` }}>Price</th>
                    <th style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}` }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map(i => (
                    <tr key={i.itemId}>
                      <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}` }}>{i.name}</td>
                      <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'center' }}>{i.quantity}</td>
                      <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right' }}>₹{i.price}</td>
                      <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right' }}>₹{i.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right', fontWeight: 700 }}>Subtotal</td>
                    <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right', fontWeight: 700 }}>₹{invoiceItems.reduce((sum, i) => sum + i.total, 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right' }}>Tax ({taxPercent}%)</td>
                    <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right' }}>₹{((invoiceItems.reduce((sum, i) => sum + i.total, 0) * taxPercent) / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right' }}>Discount {discountType === 'percent' ? `(${discount}%)` : ''}</td>
                    <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right' }}>₹{discountType === 'percent' ? ((invoiceItems.reduce((sum, i) => sum + i.total, 0) * discount) / 100).toFixed(2) : discount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right', fontWeight: 700 }}>Total</td>
                    <td style={{ padding: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`, textAlign: 'right', fontWeight: 700 }}>
                      ₹{(
                        invoiceItems.reduce((sum, i) => sum + i.total, 0) +
                        (invoiceItems.reduce((sum, i) => sum + i.total, 0) * taxPercent) / 100 -
                        (discountType === 'percent'
                          ? (invoiceItems.reduce((sum, i) => sum + i.total, 0) * discount) / 100
                          : discount)
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvoiceDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Download PDF using jsPDF
              const doc = new jsPDF();
              doc.text('Your Company Name', 14, 16);
              doc.text('123 Main St, City, Country', 14, 24);
              doc.text(`Invoice #: ${invoiceNumber}`, 14, 36);
              doc.text(`Date: ${invoiceDate}`, 14, 44);
              doc.text(`Customer: ${customerName}`, 14, 52);
              doc.text(`Contact: ${customerContact}`, 14, 60);
              doc.text(`Address: ${customerAddress}`, 14, 68);
              doc.autoTable({
                startY: 76,
                head: [['Item', 'Qty', 'Price', 'Total']],
                body: invoiceItems.map(i => [i.name, i.quantity, `₹${i.price}`, `₹${i.total.toFixed(2)}`]),
              });
              const subtotal = invoiceItems.reduce((sum, i) => sum + i.total, 0);
              const tax = (subtotal * taxPercent) / 100;
              const disc = discountType === 'percent' ? (subtotal * discount) / 100 : discount;
              const total = subtotal + tax - disc;
              doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
              doc.text(`Tax (${taxPercent}%): ₹${tax.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 18);
              doc.text(`Discount: ₹${disc.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 26);
              doc.text(`Total: ₹${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 34);
              doc.save(`${invoiceNumber}.pdf`);
              setSnackOptions({ color: 'success', message: 'Invoice PDF downloaded!' });
              setSnackOpen(true);
              setInvoiceDialogOpen(false);
            }}
            disabled={invoiceItems.length === 0 || !customerName}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setSnackOptions({ color: 'success', message: 'Invoice saved (mock)!' });
              setSnackOpen(true);
            }}
            disabled={invoiceItems.length === 0 || !customerName}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              setSnackOptions({ color: 'info', message: 'Invoice emailed (mock)!' });
              setSnackOpen(true);
            }}
            disabled={invoiceItems.length === 0 || !customerName}
          >
            Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 