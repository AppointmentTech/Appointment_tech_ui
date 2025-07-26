import React, { useState, useEffect, useCallback, useMemo } from "react";


import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
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
import Drawer from '@mui/material/Drawer';

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
import BillingStatsCards from "./components/BillingStatsCards.jsx";
import BillingCharts from "./components/BillingCharts.jsx";
import PatientPaymentTable from "./components/PatientPaymentTable.jsx";
import SalaryDetailsTable from "./components/SalaryDetailsTable.jsx";
import FinancialReport from "./components/FinancialReport.jsx";
import InvoiceDialog from "./components/InvoiceDialog.jsx";
import SalarySlipDialog from "./components/SalarySlipDialog.jsx";

export default function HospitalBillingManagement() {
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

  // 1. Update mock data and state to support all billing scenarios
  const [showBillDrawer, setShowBillDrawer] = useState(false);
  const [drawerBill, setDrawerBill] = useState(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showInsuranceDialog, setShowInsuranceDialog] = useState(false);

  // 1. Add state for salary management
  const [salaryRecords, setSalaryRecords] = useState([
    { id: 1, staffName: 'Dr. Mehta', role: 'Doctor', month: '2024-06', base: 120000, overtime: 10000, deductions: 5000, net: 125000, status: 'Paid' },
    { id: 2, staffName: 'Nurse Priya', role: 'Nurse', month: '2024-06', base: 40000, overtime: 2000, deductions: 1000, net: 41000, status: 'Pending' },
  ]);
  const [salaryDialogOpen, setSalaryDialogOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);

  // 1. Add state for asset management
  const [assets, setAssets] = useState([
    { id: 1, name: 'MRI Machine', type: 'Medical Equipment', value: 5000000, depreciation: 500000, status: 'Active' },
    { id: 2, name: 'Ambulance', type: 'Vehicle', value: 1200000, depreciation: 120000, status: 'Active' },
  ]);
  const [assetDialogOpen, setAssetDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // 1. Add state for vendor & utility billing
  const [vendorBills, setVendorBills] = useState([
    { id: 1, vendor: 'MedSupplies Ltd.', type: 'Medical Supplies', amount: 150000, dueDate: '2024-06-20', status: 'Paid' },
    { id: 2, vendor: 'City Power', type: 'Electricity', amount: 50000, dueDate: '2024-06-25', status: 'Pending' },
  ]);
  const [vendorDialogOpen, setVendorDialogOpen] = useState(false);
  const [selectedVendorBill, setSelectedVendorBill] = useState(null);

  // 2. Add a summary card for total salary paid this month
  const totalSalaryPaid = salaryRecords.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.net, 0);

  // 2. Add a summary card for total asset value
  const totalAssetValue = assets.reduce((sum, a) => sum + a.value, 0);

  // 2. Add a summary card for total vendor payments this month
  const totalVendorPayments = vendorBills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0);

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
      patientId: "P001",
      patientType: "In-Patient",
      patientName: "Rahul Sharma",
      patientPhone: "+91 98765 43210",
      doctor: "Dr. Mehta",
      department: "Cardiology",
      admissionDate: "2024-01-15",
      dischargeDate: "2024-01-20",
      insurance: {
        provider: "MediCare",
        policyNo: "MC123456",
        claimStatus: "Approved",
        claimAmount: 8000,
        patientShare: 1650,
      },
      services: [
        { type: "Room", description: "Single Room", qty: 5, rate: 1600, amount: 8000 },
        { type: "Diagnostics", description: "ECG", qty: 1, rate: 500, amount: 500 },
        { type: "Pharmacy", description: "Medicines", qty: 1, rate: 1000, amount: 1000 },
        { type: "Food", description: "Meals", qty: 5, rate: 300, amount: 1500 },
      ],
      advancePayments: [
        { date: "2024-01-15", method: "Cash", amount: 3000, reference: "ADV001" },
      ],
      paymentHistory: [
        { date: "2024-01-20", method: "Online Transfer", amount: 8650, reference: "TXN001" },
      ],
      refunds: [],
      discounts: 500,
      tax: 950,
      totalAmount: 9650,
      paidAmount: 9650,
      balanceAmount: 0,
      paymentStatus: "paid",
      billStatus: "paid",
      dueDate: "2024-01-20",
      notes: "Payment received on time",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: 2,
      billId: "BILL002",
      patientId: "P002",
      patientType: "Out-Patient",
      patientName: "Priya Patel",
      patientPhone: "+91 98765 43212",
      doctor: "Dr. Singh",
      department: "Orthopedics",
      admissionDate: "2024-01-16",
      dischargeDate: "2024-01-25",
      insurance: null,
      services: [
        { type: "Consultation", description: "Consultation Fee", qty: 1, rate: 500, amount: 500 },
        { type: "X-Ray", description: "Chest X-Ray", qty: 1, rate: 1500, amount: 1500 },
        { type: "Pharmacy", description: "Painkillers", qty: 2, rate: 200, amount: 400 },
      ],
      advancePayments: [],
      paymentHistory: [],
      refunds: [],
      discounts: 0,
      tax: 150,
      totalAmount: 2400,
      paidAmount: 0,
      balanceAmount: 2400,
      paymentStatus: "pending",
      billStatus: "pending",
      dueDate: "2024-01-25",
      notes: "Partial payment received",
      createdAt: "2024-01-16",
      updatedAt: "2024-01-16",
    },
    {
      id: 3,
      billId: "BILL003",
      patientId: "P003",
      patientType: "Emergency",
      patientName: "Amit Kumar",
      patientPhone: "+91 98765 43214",
      doctor: "Dr. Gupta",
      department: "Emergency",
      admissionDate: "2024-01-17",
      dischargeDate: "2024-01-22",
      insurance: {
        provider: "HealthCare",
        policyNo: "HC123456",
        claimStatus: "Pending",
        claimAmount: 10000,
        patientShare: 0,
      },
      services: [
        { type: "Room", description: "Emergency Room", qty: 1, rate: 2000, amount: 2000 },
        { type: "Surgery", description: "Appendectomy", qty: 1, rate: 15000, amount: 15000 },
        { type: "Pharmacy", description: "Antibiotics", qty: 1, rate: 500, amount: 500 },
      ],
      advancePayments: [],
      paymentHistory: [],
      refunds: [],
      discounts: 1000,
      tax: 1700,
      totalAmount: 17400,
      paidAmount: 0,
      balanceAmount: 17400,
      paymentStatus: "pending",
      billStatus: "overdue",
      dueDate: "2024-01-22",
      notes: "Payment overdue",
      createdAt: "2024-01-17",
      updatedAt: "2024-01-22",
    },
  ];

  // 2. Add new state for filters, charts, and dialogs
  const [patientTypeFilter, setPatientTypeFilter] = useState("all");
  const [insuranceFilter, setInsuranceFilter] = useState("all");

  // 1. Add mock currentUser state
  const [currentUser] = useState({ role: 'Admin', name: 'Super Admin' });
  // 2. Add audit log state
  const [auditLog, setAuditLog] = useState([
    { id: 1, action: 'Bill Created', user: 'Super Admin', date: '2024-06-10' },
    { id: 2, action: 'Salary Paid', user: 'Accountant', date: '2024-06-09' },
  ]);
  // 3. Conditionally render actions/sections based on currentUser.role
  // 4. Add an Audit Trail section at the bottom of the dashboard

  useEffect(() => {
    setBills(mockBills);
    setFilteredBills(mockBills);
  }, []);

  useEffect(() => {
    filterBills();
  }, [searchTerm, statusFilter, dateFilter, bills, patientTypeFilter, insuranceFilter]);

  const filterBills = () => {
    let filtered = bills.filter((bill) => {
      const matchesSearch =
        bill.billId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bill.patientName && bill.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bill.patientId && bill.patientId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bill.patientPhone && bill.patientPhone.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "all" || bill.paymentStatus === statusFilter;
      const matchesPatientType = patientTypeFilter === "all" || bill.patientType === patientTypeFilter;
      const matchesInsurance = insuranceFilter === "all" || (insuranceFilter === "with" ? bill.insurance : !bill.insurance);
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
      return matchesSearch && matchesStatus && matchesPatientType && matchesInsurance && matchesDate;
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

  // 4. Add new summary cards and charts (revenue, insurance, overdue, etc.)
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

  // 5. Update columns for DataGrid to show patient, doctor, department, insurance, and actions (view, edit, print, refund, claim)
  const columns = useMemo(() => [
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="View Bill">
            <IconButton size="small" color="primary" onClick={() => { setDrawerBill(params.row); setShowBillDrawer(true); }}>
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print Bill">
            <IconButton size="small" color="secondary" onClick={() => window.print()}>
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Bill">
            <IconButton size="small" color="success" onClick={() => exportToExcel()}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Bill">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleEdit(params.row)}
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
      field: "patientName",
      headerName: "Patient",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {params.row.patientName.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.patientId}
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
  ], [handleOpenDialog, handleDelete]);

  const [tableTab, setTableTab] = useState(0);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [salarySlipOpen, setSalarySlipOpen] = useState(false);

  // Add/Edit Bill Handler
  const handleEdit = (bill) => {
    setEditingBill(bill);
    setFormData({ ...bill });
    setIsEditMode(true);
    setOpenDialog(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden"
      }}>
        <CommonHeader />
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

          {/* Always show Overview (stats + charts) */}
          <BillingStatsCards stats={stats} theme={theme} />
          <BillingCharts />

          {/* Tabs above the table section */}
          <Card sx={{ mb: 4 }}>
            <Tabs
              value={tableTab}
              onChange={(e, v) => setTableTab(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Patient Payments" />
              <Tab label="Staff Salaries" />
              <Tab label="Financial Report" />
            </Tabs>
          </Card>

          {tableTab === 0 && (
            <>
              <PatientPaymentTable 
                bills={bills}
                onInvoiceClick={(bill) => { setSelectedInvoice(bill); setInvoiceOpen(true); }}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <InvoiceDialog open={invoiceOpen} onClose={() => setInvoiceOpen(false)} bill={selectedInvoice} />
            </>
          )}
          {tableTab === 1 && (
            <>
              <SalaryDetailsTable 
                salaryRecords={salaryRecords}
                onSalarySlipClick={(record) => { setSelectedSalary(record); setSalarySlipOpen(true); }}
                // onEdit, onDelete handlers can be added here
              />
              <SalarySlipDialog open={salarySlipOpen} onClose={() => setSalarySlipOpen(false)} record={selectedSalary} />
            </>
          )}
          {tableTab === 2 && <FinancialReport />}

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
                <>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Customer Information</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Customer Name"
                        value={formData.customerName}
                        onChange={(e) => handleFormChange("customerName", e.target.value)}
                        required
                        helperText={!formData.customerName ? "Required" : ""}
                        error={!formData.customerName}
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
                        helperText={!formData.customerEmail ? "Required" : ""}
                        error={!formData.customerEmail}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Customer Phone"
                        value={formData.customerPhone}
                        onChange={(e) => handleFormChange("customerPhone", e.target.value)}
                        required
                        helperText={!formData.customerPhone ? "Required" : ""}
                        error={!formData.customerPhone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Bill ID"
                        value={formData.billId}
                        onChange={(e) => handleFormChange("billId", e.target.value)}
                        required
                        helperText={!formData.billId ? "Required" : ""}
                        error={!formData.billId}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {activeTab === 1 && (
                <>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Room Details</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Room Number"
                        value={formData.roomNumber}
                        onChange={(e) => handleFormChange("roomNumber", e.target.value)}
                        required
                        helperText={!formData.roomNumber ? "Required" : ""}
                        error={!formData.roomNumber}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required error={!formData.roomType}>
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
                        {!formData.roomType && <Typography variant="caption" color="error">Required</Typography>}
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
                        helperText={!formData.checkInDate ? "Required" : ""}
                        error={!formData.checkInDate}
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
                        helperText={!formData.checkOutDate ? "Required" : ""}
                        error={!formData.checkOutDate}
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
                        helperText={!formData.numberOfDays ? "Required" : ""}
                        error={!formData.numberOfDays}
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
                        helperText={!formData.dueDate ? "Required" : ""}
                        error={!formData.dueDate}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {activeTab === 2 && (
                <>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Charges</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Room Rent (₹)"
                        type="number"
                        value={formData.roomRent || ""}
                        onChange={(e) => handleFormChange("roomRent", parseInt(e.target.value) || 0)}
                        required
                        helperText={!formData.roomRent ? "Required" : ""}
                        error={!formData.roomRent}
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
                </>
              )}

              {activeTab === 3 && (
                <>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Payment & Summary</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Paid Amount (₹)"
                        type="number"
                        value={formData.paidAmount || ""}
                        onChange={(e) => handleFormChange("paidAmount", parseInt(e.target.value) || 0)}
                        required
                        helperText={!formData.paidAmount ? "Required" : ""}
                        error={!formData.paidAmount}
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
                      <FormControl fullWidth required error={!formData.paymentMethod}>
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
                        {!formData.paymentMethod && <Typography variant="caption" color="error">Required</Typography>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required error={!formData.paymentStatus}>
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
                        {!formData.paymentStatus && <Typography variant="caption" color="error">Required</Typography>}
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
                  {/* Summary Preview */}
                  <Divider sx={{ my: 3 }} />
                  <Box p={2} bgcolor={theme.palette.background.paper} borderRadius={2}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Bill Summary Preview</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">Customer: {formData.customerName}</Typography>
                        <Typography variant="body2">Room: {formData.roomNumber} ({formData.roomType})</Typography>
                        <Typography variant="body2">Check-in: {formData.checkInDate}</Typography>
                        <Typography variant="body2">Check-out: {formData.checkOutDate}</Typography>
                        <Typography variant="body2">Due: {formData.dueDate}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">Total: ₹{(formData.totalAmount || 0).toLocaleString()}</Typography>
                        <Typography variant="body2">Paid: ₹{(formData.paidAmount || 0).toLocaleString()}</Typography>
                        <Typography variant="body2">Balance: ₹{(formData.balanceAmount || 0).toLocaleString()}</Typography>
                        <Typography variant="body2">Status: {formData.paymentStatus}</Typography>
                        <Typography variant="body2">Method: {formData.paymentMethod}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </>
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

      {/* Bill Details Drawer */}
      <Drawer anchor="right" open={showBillDrawer} onClose={() => setShowBillDrawer(false)} sx={{ zIndex: 1301 }}>
        <Box sx={{ width: { xs: 320, sm: 480 }, p: 3, maxWidth: '100vw' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Bill Details</Typography>
            <IconButton onClick={() => setShowBillDrawer(false)}><Close /></IconButton>
          </Box>
          {drawerBill && (
            <>
              <Typography variant="subtitle2" color="text.secondary">Bill ID: {drawerBill.billId}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Patient: {drawerBill.patientName} ({drawerBill.patientId})</Typography>
              <Typography variant="subtitle2" color="text.secondary">Doctor: {drawerBill.doctor}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Department: {drawerBill.department}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Type: {drawerBill.patientType}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">Services</Typography>
              <Table size="small" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Rate</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drawerBill.services?.map((s, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{s.type}</TableCell>
                      <TableCell>{s.description}</TableCell>
                      <TableCell align="right">{s.qty}</TableCell>
                      <TableCell align="right">₹{s.rate}</TableCell>
                      <TableCell align="right">₹{s.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">Insurance</Typography>
              {drawerBill.insurance ? (
                <Box mb={2}>
                  <Typography variant="body2">Provider: {drawerBill.insurance.provider}</Typography>
                  <Typography variant="body2">Policy No: {drawerBill.insurance.policyNo}</Typography>
                  <Typography variant="body2">Claim Status: {drawerBill.insurance.claimStatus}</Typography>
                  <Typography variant="body2">Claim Amount: ₹{drawerBill.insurance.claimAmount}</Typography>
                  <Typography variant="body2">Patient Share: ₹{drawerBill.insurance.patientShare}</Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">No insurance</Typography>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">Payment History</Typography>
              <Table size="small" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Reference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drawerBill.paymentHistory?.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell>₹{p.amount}</TableCell>
                      <TableCell>{p.reference}</TableCell>
                    </TableRow>
                  ))}
                  {drawerBill.advancePayments?.map((a, idx) => (
                    <TableRow key={"adv-"+idx}>
                      <TableCell>{a.date}</TableCell>
                      <TableCell>{a.method} (Advance)</TableCell>
                      <TableCell>₹{a.amount}</TableCell>
                      <TableCell>{a.reference}</TableCell>
                    </TableRow>
                  ))}
                  {drawerBill.refunds?.map((r, idx) => (
                    <TableRow key={"ref-"+idx}>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>Refund</TableCell>
                      <TableCell>-₹{r.amount}</TableCell>
                      <TableCell>{r.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2">Discounts:</Typography>
                <Typography variant="body2">₹{drawerBill.discounts || 0}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2">Tax:</Typography>
                <Typography variant="body2">₹{drawerBill.tax || 0}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" fontWeight="bold">Total Amount:</Typography>
                <Typography variant="body2" fontWeight="bold">₹{drawerBill.totalAmount || 0}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2">Paid:</Typography>
                <Typography variant="body2">₹{drawerBill.paidAmount || 0}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" color="error">Balance:</Typography>
                <Typography variant="body2" color="error">₹{drawerBill.balanceAmount || 0}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">Notes: {drawerBill.notes}</Typography>
            </>
          )}
        </Box>
      </Drawer>
    </React.Fragment>
  );
} 