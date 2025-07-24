import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, IconButton, Chip, Avatar, Stack, Divider, Tooltip, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Card, CardContent, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import { useTheme } from '@mui/material/styles';
import { Edit, Info, Print, FileCopy, Payment, Warning, ErrorOutline, Done, Cancel, AttachMoney, TrendingUp, TrendingDown, AccessTime, Event, CheckCircle, Receipt, Download, FilterList, Star, StarBorder, Add, Group } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';

const mockInvoices = [
  {
    id: 1,
    invoiceId: 'INV-001',
    date: dayjs().subtract(2, 'day').toISOString(),
    customer: 'Rahul Sharma',
    amount: 2500,
    gst: 450,
    status: 'Paid',
    dueDate: dayjs().subtract(1, 'day').toISOString(),
    paymentMethod: 'UPI',
    activity: [
      { type: 'created', time: dayjs().subtract(2, 'day').toISOString(), by: 'Reception' },
      { type: 'paid', time: dayjs().subtract(1, 'day').toISOString(), by: 'Reception', amount: 2500 },
    ],
    items: [
      { name: 'Oil Change', qty: 1, price: 2000, gst: 18 },
      { name: 'Brake Check', qty: 1, price: 500, gst: 18 },
    ],
  },
  {
    id: 2,
    invoiceId: 'INV-002',
    date: dayjs().subtract(5, 'day').toISOString(),
    customer: 'Priya Singh',
    amount: 800,
    gst: 144,
    status: 'Pending',
    dueDate: dayjs().add(2, 'day').toISOString(),
    paymentMethod: 'Cash',
    activity: [
      { type: 'created', time: dayjs().subtract(5, 'day').toISOString(), by: 'App' },
    ],
    items: [
      { name: 'PUC', qty: 1, price: 800, gst: 18 },
    ],
  },
  {
    id: 3,
    invoiceId: 'INV-003',
    date: dayjs().subtract(10, 'day').toISOString(),
    customer: 'Suresh Kumar',
    amount: 1200,
    gst: 216,
    status: 'Overdue',
    dueDate: dayjs().subtract(2, 'day').toISOString(),
    paymentMethod: 'Paytm',
    activity: [
      { type: 'created', time: dayjs().subtract(10, 'day').toISOString(), by: 'Reception' },
      { type: 'overdue', time: dayjs().subtract(2, 'day').toISOString(), by: 'System' },
    ],
    items: [
      { name: 'Chain Adjustment', qty: 1, price: 1200, gst: 18 },
    ],
  },
];

const metrics = [
  { label: 'Total Invoices', value: 120, icon: <Receipt color="primary" /> },
  { label: 'Pending', value: 10, icon: <Warning color="warning" /> },
  { label: 'Paid', value: 100, icon: <CheckCircle color="success" /> },
  { label: 'GST Collected', value: '₹25,000', icon: <AttachMoney color="info" /> },
  { label: 'This Month’s Revenue', value: '₹1,50,000', icon: <TrendingUp color="success" /> },
  { label: 'Overdue', value: 5, icon: <ErrorOutline color="error" /> },
];

const quickActions = [
  { label: 'Create Invoice', icon: <Add />, action: 'add' },
  { label: 'Export', icon: <FileCopy />, action: 'export' },
  { label: 'Print', icon: <Print />, action: 'print' },
  { label: 'Download GST Report', icon: <Download />, action: 'downloadGST' },
  { label: 'Advanced Filter', icon: <FilterList />, action: 'filter' },
];

const invoiceColumns = [
  { field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={1}>
      <Tooltip title="View Details"><IconButton size="small"><Info fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Download"><IconButton size="small"><Download fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Print"><IconButton size="small"><Print fontSize="small" /></IconButton></Tooltip>
    </Stack>
  ) },
  { field: 'invoiceId', headerName: 'Invoice ID', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1, valueGetter: (params) => params.row?.date ? dayjs(params.row.date).format('DD MMM YYYY') : '' },
  { field: 'customer', headerName: 'Customer', flex: 1 },
  { field: 'amount', headerName: 'Amount', flex: 1, valueGetter: (params) => `₹${params.row?.amount ?? ''}` },
  { field: 'gst', headerName: 'GST', flex: 1, valueGetter: (params) => `₹${params.row?.gst ?? ''}` },
  { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'Paid' ? 'success' : params.value === 'Pending' ? 'warning' : 'error'} size="small" />
  ) },
  { field: 'dueDate', headerName: 'Due Date', flex: 1, valueGetter: (params) => params.row?.dueDate ? dayjs(params.row.dueDate).format('DD MMM YYYY') : '' },
  { field: 'paymentMethod', headerName: 'Payment Method', flex: 1 },
];

const GarageInvoices = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [invoices, setInvoices] = useState(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: '', data: null });
  const [isEditing, setIsEditing] = useState(false);

  // Handlers
  const handleOpenDrawer = (invoice) => {
    setSelectedInvoice(invoice);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedInvoice(null);
    setIsEditing(false);
  };
  const handleDialogOpen = (type, data = null) => setDialog({ open: true, type, data });
  const handleDialogClose = () => setDialog({ open: false, type: '', data: null });
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false); // Add save logic as needed
  const handleCancel = () => setIsEditing(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CommonHeader role="admin" />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          overflow: 'auto',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Section Heading */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Invoices & GST</Typography>
        {/* Metrics */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {metrics.map((m, i) => (
            <Grid item xs={6} md={2} key={i}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 1, bgcolor: theme.palette.background.paper }}>
                {m.icon}
                <Typography variant="h6">{m.value}</Typography>
                <Typography variant="caption">{m.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* Quick Actions */}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          {quickActions.map((a, i) => (
            <Button key={i} variant="contained" startIcon={a.icon} onClick={() => handleDialogOpen(a.action)}>{a.label}</Button>
          ))}
        </Stack>
        {/* Live Invoice Alerts */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Live Invoice Alerts</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, px: 2 }}>
            {/* Overdue Invoices */}
            {invoices.filter(i => i.status === 'Overdue').map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.error.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ErrorOutline color="error" />
                    <Typography variant="subtitle2">Overdue</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.invoiceId}</b></Typography>
                  <Typography variant="body2">Customer: {item.customer}</Typography>
                  <Typography variant="body2">Due: {dayjs(item.dueDate).format('DD MMM')}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* GST Filing Due (mock) */}
            <Card sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.info.main}` }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Receipt color="info" />
                  <Typography variant="subtitle2">GST Filing Due</Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">Next Filing: {dayjs().add(7, 'day').format('DD MMM')}</Typography>
              </CardContent>
            </Card>
            {/* Recent Payments */}
            {invoices.filter(i => i.status === 'Paid').slice(0, 2).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.success.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircle color="success" />
                    <Typography variant="subtitle2">Paid</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.invoiceId}</b></Typography>
                  <Typography variant="body2">Customer: {item.customer}</Typography>
                  <Typography variant="body2">Amount: ₹{item.amount}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
        {/* Analytics & Charts (mock) */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Invoices by Status</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={[{ name: 'Paid', value: 100 }, { name: 'Pending', value: 10 }, { name: 'Overdue', value: 5 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                    <Cell fill={theme.palette.success.main} />
                    <Cell fill={theme.palette.warning.main} />
                    <Cell fill={theme.palette.error.main} />
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">GST Collected Trend</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[{ name: 'Jan', value: 8000 }, { name: 'Feb', value: 9000 }, { name: 'Mar', value: 10000 }]}> 
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke={theme.palette.info.main} />
                  <RechartsTooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Invoices Table */}
        <Paper sx={{ height: 400, mb: 2, bgcolor: theme.palette.background.paper }}>
          <DataGrid
            rows={invoices}
            columns={invoiceColumns}
            components={{ Toolbar: CustomTableToolbar }}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={(params) => handleOpenDrawer(params.row)}
          />
        </Paper>
        {/* Recent Activity */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Recent Activity</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper, p: 2 }}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            {invoices.flatMap(i => i.activity.map((a, idx) => ({ ...a, invoiceId: i.invoiceId, key: `${i.id}-${idx}` }))).sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf()).slice(0, 6).map((a) => (
              <Box key={a.key} sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {/* Timeline Dot */}
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%',
                  bgcolor: a.type === 'created' ? theme.palette.primary.main : a.type === 'paid' ? theme.palette.success.main : a.type === 'overdue' ? theme.palette.error.main : theme.palette.warning.main,
                  mt: 0.5, mr: 2, flexShrink: 0,
                  boxShadow: 1,
                }} />
                {/* Content Card */}
                <Paper elevation={0} sx={{ flex: 1, bgcolor: theme.palette.background.default, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: a.type === 'created' ? theme.palette.primary.light : a.type === 'paid' ? theme.palette.success.light : a.type === 'overdue' ? theme.palette.error.light : theme.palette.warning.light, width: 36, height: 36 }}>
                      {a.type === 'created' ? <Receipt /> : a.type === 'paid' ? <CheckCircle /> : a.type === 'overdue' ? <ErrorOutline /> : <Warning />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.invoiceId}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {a.type === 'created' ? 'Invoice Created' : a.type === 'paid' ? 'Paid' : a.type === 'overdue' ? 'Overdue' : 'Alert'}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 90, textAlign: 'right' }}>
                    {dayjs(a.time).format('DD MMM, HH:mm')}<br/>by {a.by}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Paper>
        {/* Drawer: Invoice Details */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{ sx: { width: isMdUp ? 400 : '90vw', p: 0, bgcolor: theme.palette.background.paper } }}>
          <Box sx={{ p: 2, mt: 12, mb: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedInvoice && (
              <>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Invoice Details</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>General Info</Typography>
                  <Typography variant="body2"><Receipt fontSize="small" /> Invoice ID: {selectedInvoice.invoiceId}</Typography>
                  <Typography variant="body2"><Event fontSize="small" /> Date: {dayjs(selectedInvoice.date).format('DD MMM YYYY')}</Typography>
                  <Typography variant="body2"><Chip label={selectedInvoice.status} color={selectedInvoice.status === 'Paid' ? 'success' : selectedInvoice.status === 'Pending' ? 'warning' : 'error'} size="small" /></Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Customer & Payment</Typography>
                  <Typography variant="body2"><Group fontSize="small" /> Customer: {selectedInvoice.customer}</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> Amount: ₹{selectedInvoice.amount}</Typography>
                  <Typography variant="body2"><Payment fontSize="small" /> Payment Method: {selectedInvoice.paymentMethod}</Typography>
                  <Typography variant="body2"><AccessTime fontSize="small" /> Due Date: {dayjs(selectedInvoice.dueDate).format('DD MMM YYYY')}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>GST Summary</Typography>
                  <Typography variant="body2">GST: ₹{selectedInvoice.gst}</Typography>
                  <Typography variant="body2">GST %: 18%</Typography>
                  <Typography variant="body2">GSTIN: 27AAECA1234F1ZV</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Items</Typography>
                  <Stack spacing={1}>{selectedInvoice.items.map((item, idx) => (
                    <Typography key={idx} variant="body2">{item.name} x{item.qty} - ₹{item.price} (GST {item.gst}%)</Typography>
                  ))}</Stack>
                </Paper>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
                  {!isEditing && (
                    <Button variant="contained" startIcon={<Edit />} onClick={handleEdit}>Edit</Button>
                  )}
                  {isEditing && (
                    <>
                      <Button variant="contained" startIcon={<Done />} onClick={handleSave}>Save</Button>
                      <Button variant="contained" startIcon={<Cancel />} onClick={handleCancel}>Cancel</Button>
                    </>
                  )}
                  <Button variant="outlined" startIcon={<Download />}>Download</Button>
                  <Button variant="outlined" startIcon={<Print />}>Print</Button>
                </Stack>
              </>
            )}
          </Box>
        </Drawer>
        {/* Dialogs (Add/Edit Invoice, Download GST, Print, Filter) */}
        <Dialog open={dialog.open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{dialog.type === 'add' ? 'Create Invoice' : dialog.type === 'downloadGST' ? 'Download GST Report' : dialog.type === 'print' ? 'Print Preview' : dialog.type === 'filter' ? 'Advanced Filter' : 'Edit Invoice'}</DialogTitle>
          <DialogContent>
            {/* Mock forms/fields for each dialog type */}
            {dialog.type === 'add' && (
              <Stack spacing={2}>
                <TextField label="Customer Name" fullWidth />
                <TextField label="Amount" type="number" fullWidth />
                <TextField label="GST" type="number" fullWidth />
                <TextField label="Payment Method" fullWidth />
                <TextField label="Due Date" fullWidth />
                <Button variant="contained">Create</Button>
              </Stack>
            )}
            {dialog.type === 'downloadGST' && (
              <Button variant="contained" startIcon={<Download />}>Download GST Report</Button>
            )}
            {dialog.type === 'print' && (
              <Typography>Print Preview (mock)</Typography>
            )}
            {dialog.type === 'filter' && (
              <Stack spacing={2}>
                <TextField label="Customer Name" fullWidth />
                <TextField label="Status" fullWidth />
                <TextField label="Date Range" fullWidth />
                <Button variant="contained">Apply Filter</Button>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageInvoices; 