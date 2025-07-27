import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Chip, IconButton, Snackbar, Avatar, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import InfoIcon from '@mui/icons-material/Info';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useTheme } from '@mui/material/styles';

const invoiceStatuses = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Overdue', value: 'overdue' },
];

const mockInvoices = [
  {
    id: 1,
    bookingId: 101,
    person: { name: 'Amit Kumar', phone: '9876543210', email: 'amit@example.com' },
    date: '2024-06-10',
    status: 'paid',
    items: [
      { name: 'Paneer Butter Masala', qty: 2, price: 250 },
      { name: 'Rice', qty: 2, price: 100 },
      { name: 'Dal', qty: 2, price: 120 },
    ],
    total: 720,
  },
  {
    id: 2,
    bookingId: 102,
    person: { name: 'Priya Singh', phone: '9123456780', email: 'priya@example.com' },
    date: '2024-06-11',
    status: 'unpaid',
    items: [
      { name: 'Pasta', qty: 1, price: 180 },
      { name: 'Garlic Bread', qty: 1, price: 80 },
    ],
    total: 260,
  },
  {
    id: 3,
    bookingId: 103,
    person: { name: 'Rahul Sharma', phone: '9988776655', email: 'rahul@example.com' },
    date: '2024-06-12',
    status: 'overdue',
    items: [
      { name: 'Cake', qty: 1, price: 500 },
      { name: 'Pizza', qty: 2, price: 300 },
    ],
    total: 1100,
  },
  {
    id: 4,
    bookingId: 104,
    person: { name: 'Sunita Mehra', phone: '9001122334', email: 'sunita@example.com' },
    date: '2024-06-15',
    status: 'paid',
    items: [
      { name: 'Paneer Tikka', qty: 3, price: 200 },
      { name: 'Naan', qty: 6, price: 30 },
    ],
    total: 780,
  },
];

const summaryCounters = [
  { label: 'Total Invoices', icon: <ReceiptIcon />, color: 'primary.main' },
  { label: 'Paid', icon: <CheckCircleIcon />, color: 'success.main' },
  { label: 'Unpaid', icon: <CancelIcon />, color: 'error.main' },
  { label: 'Overdue', icon: <WarningIcon />, color: 'warning.main' },
  { label: 'Total Revenue', icon: <MonetizationOnIcon />, color: 'secondary.main' },
];

const fetchInvoices = async () => {
  // Simulate API call
  return new Promise(resolve => setTimeout(() => resolve(mockInvoices), 500));
};

export default function FoodCateringInvoices() {
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [invoiceDialogData, setInvoiceDialogData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  React.useEffect(() => {
    setLoading(true);
    // Simulate API call
    fetchInvoices().then(data => {
      setInvoices(data);
      setLoading(false);
    });
  }, []);

  // Filter invoices by status
  const filteredInvoices = selectedStatus === 'all' ? invoices : invoices.filter(inv => inv.status === selectedStatus);
  const total = invoices.length;
  const paid = invoices.filter(i => i.status === 'paid').length;
  const unpaid = invoices.filter(i => i.status === 'unpaid').length;
  const overdue = invoices.filter(i => i.status === 'overdue').length;
  const revenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const summaryValues = [total, paid, unpaid, overdue, `₹${revenue}`];

  // Invoice dialog
  const handleInvoiceOpen = (invoice) => { setInvoiceDialogData(invoice); setInvoiceDialogOpen(true); };
  const handleInvoiceClose = () => setInvoiceDialogOpen(false);
  const handlePrint = () => { window.print(); };
  const handleDownloadPDF = () => { setSnackbar({ open: true, message: 'PDF download coming soon!', severity: 'info' }); };

  // Edit dialog logic
  const handleEditOpen = (invoice) => { setEditInvoice({ ...invoice }); setEditDialogOpen(true); };
  const handleEditClose = () => setEditDialogOpen(false);
  const handleEditSave = () => {
    setInvoices(prev => prev.map(i => i.id === editInvoice.id ? editInvoice : i));
    setEditDialogOpen(false);
    setSnackbar({ open: true, message: 'Invoice updated!', severity: 'success' });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CommonHeader role="admin" />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, pt: 10, mt: { xs: 8, sm: 10 }, overflow: 'auto', height: '100vh', backgroundColor: theme.palette.background.default }}>
        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {summaryCounters.map((counter, idx) => (
            <Grid item xs={12} sm={6} md={2} key={counter.label}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, borderRadius: 5, boxShadow: theme.shadows[3], bgcolor: theme.palette.background.paper }}>
                <Avatar sx={{ bgcolor: counter.color, width: 56, height: 56, mb: 1 }}>{counter.icon}</Avatar>
                <Typography variant="h4" fontWeight={800} color="primary" sx={{ mb: 0.5 }}>{summaryValues[idx]}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>{counter.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Invoice Status Tabs */}
        <Paper sx={{ mb: 3, bgcolor: theme.palette.background.paper, p: 2, borderRadius: 2 }}>
          <Tabs
            value={selectedStatus}
            onChange={(_, v) => setSelectedStatus(v)}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            sx={{ minWidth: 0 }}
          >
            {invoiceStatuses.map((type) => (
              <Tab
                key={type.value}
                value={type.value}
                label={type.label}
                sx={{ minWidth: 120, fontWeight: 600 }}
              />
            ))}
          </Tabs>
        </Paper>
        {/* Invoices Table */}
        <Paper sx={{ p: 2, borderRadius: 4, boxShadow: theme.shadows[2], mb: 4, overflowX: 'auto', background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #1e293b 60%, #232946 100%)' : 'linear-gradient(135deg, #f0f4fa 60%, #e3f2fd 100%)', backdropFilter: 'blur(6px)' }}>
          <Box minWidth={1000}>
            <Grid container sx={{ borderBottom: '2px solid', borderColor: 'divider', p: 1 }}>
              <Grid item xs={2}><Typography fontWeight={700}>Actions</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Invoice #</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Person</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Date</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Status</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Total</Typography></Grid>
            </Grid>
            {loading ? (
              <Box p={4} textAlign="center"><Typography>Loading invoices...</Typography></Box>
            ) : filteredInvoices.map((inv) => (
              <Grid container key={inv.id} alignItems="center" sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}>
                <Grid item xs={2}>
                  <Box display="flex" gap={1}>
                    <IconButton color="info" onClick={() => handleInvoiceOpen(inv)}><InfoIcon /></IconButton>
                    <IconButton color="primary" onClick={handlePrint}><PrintIcon /></IconButton>
                    <IconButton color="error" onClick={handleDownloadPDF}><PictureAsPdfIcon /></IconButton>
                    <IconButton color="secondary" onClick={() => handleEditOpen(inv)}><InfoIcon /></IconButton>
                  </Box>
                </Grid>
                <Grid item xs={2}><Typography fontWeight={700}>INV-{inv.id}</Typography></Grid>
                <Grid item xs={2}>
                  <Typography fontWeight={700}>{inv.person.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{inv.person.phone}</Typography>
                  <Typography variant="body2" color="text.secondary">{inv.person.email}</Typography>
                </Grid>
                <Grid item xs={2}><Typography>{inv.date}</Typography></Grid>
                <Grid item xs={2}>
                  <Chip label={inv.status.charAt(0).toUpperCase() + inv.status.slice(1)} color={inv.status === 'paid' ? 'success' : inv.status === 'unpaid' ? 'error' : 'warning'} icon={inv.status === 'paid' ? <CheckCircleIcon /> : inv.status === 'unpaid' ? <CancelIcon /> : <WarningIcon />} />
                </Grid>
                <Grid item xs={2}><Typography fontWeight={700}>₹{inv.total}</Typography></Grid>
              </Grid>
            ))}
          </Box>
        </Paper>
        {/* Add a spacer at the bottom for extra space */}
        <Box sx={{ mb: { xs: 8, sm: 10, md: 12 } }} />
        {/* Invoice Dialog */}
        <Dialog open={invoiceDialogOpen} onClose={handleInvoiceClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 5, boxShadow: 12, bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.7)' : 'rgba(240,244,250,0.7)', boxShadow: theme.shadows[2], mb: 2 } }}>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogContent>
            {invoiceDialogData && (
              <Box sx={{ p: 3, borderRadius: 4, bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.7)' : 'rgba(240,244,250,0.7)', boxShadow: theme.shadows[2], mb: 2 }}>
                <Typography variant="h5" fontWeight={900} color="primary" mb={2}>INVOICE #{invoiceDialogData.id}</Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} md={6}>
                    <Typography fontWeight={700}>Billed To:</Typography>
                    <Typography>{invoiceDialogData.person.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{invoiceDialogData.person.phone}</Typography>
                    <Typography variant="body2" color="text.secondary">{invoiceDialogData.person.email}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography fontWeight={700}>Date:</Typography>
                    <Typography>{invoiceDialogData.date}</Typography>
                    <Typography fontWeight={700} mt={2}>Status:</Typography>
                    <Chip label={invoiceDialogData.status.charAt(0).toUpperCase() + invoiceDialogData.status.slice(1)} color={invoiceDialogData.status === 'paid' ? 'success' : invoiceDialogData.status === 'unpaid' ? 'error' : 'warning'} size="small" />
                  </Grid>
                </Grid>
                <Paper sx={{ p: 2, borderRadius: 3, mb: 2, background: theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.08)' : 'rgba(33, 150, 243, 0.04)' }}>
                  <Typography fontWeight={700} mb={1}>Items</Typography>
                  <Grid container>
                    <Grid item xs={6}><Typography fontWeight={700}>Item</Typography></Grid>
                    <Grid item xs={3}><Typography fontWeight={700}>Qty</Typography></Grid>
                    <Grid item xs={3}><Typography fontWeight={700}>Price</Typography></Grid>
                  </Grid>
                  {invoiceDialogData.items.map((item, idx) => (
                    <Grid container key={idx}>
                      <Grid item xs={6}><Typography>{item.name}</Typography></Grid>
                      <Grid item xs={3}><Typography>{item.qty}</Typography></Grid>
                      <Grid item xs={3}><Typography>₹{item.price}</Typography></Grid>
                    </Grid>
                  ))}
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Typography fontWeight={900} fontSize={20}>Total: ₹{invoiceDialogData.total}</Typography>
                  </Box>
                </Paper>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button startIcon={<PrintIcon />} onClick={handlePrint} color="primary" variant="outlined">Print</Button>
            <Button startIcon={<PictureAsPdfIcon />} onClick={handleDownloadPDF} color="secondary" variant="contained">Download PDF</Button>
            <Button onClick={handleInvoiceClose} color="inherit">Close</Button>
          </DialogActions>
        </Dialog>
        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 5, boxShadow: 12, bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' } }}>
          <DialogTitle>Edit Invoice</DialogTitle>
          <DialogContent>
            {editInvoice && (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField label="Name" value={editInvoice.person.name} onChange={e => setEditInvoice(i => ({ ...i, person: { ...i.person, name: e.target.value } }))} fullWidth />
                <TextField label="Phone" value={editInvoice.person.phone} onChange={e => setEditInvoice(i => ({ ...i, person: { ...i.person, phone: e.target.value } }))} fullWidth />
                <TextField label="Email" value={editInvoice.person.email} onChange={e => setEditInvoice(i => ({ ...i, person: { ...i.person, email: e.target.value } }))} fullWidth />
                <TextField label="Date" type="date" value={editInvoice.date} onChange={e => setEditInvoice(i => ({ ...i, date: e.target.value }))} fullWidth InputLabelProps={{ shrink: true }} />
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={editInvoice.status} label="Status" onChange={e => setEditInvoice(i => ({ ...i, status: e.target.value }))}>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                  </Select>
                </FormControl>
                {/* Items editing can be added here if needed */}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="inherit">Cancel</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} message={snackbar.message} />
      </Box>
    </Box>
  );
} 