import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, IconButton, Chip, Avatar, Stack, Divider, Tooltip, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Card, CardContent, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import { useTheme } from '@mui/material/styles';
import { Edit, Delete, Info, Add, CloudUpload, FileCopy, Print, Payment, Warning, ErrorOutline, Done, Cancel, LocalShipping, AttachMoney, TrendingDown, TrendingUp, AccessTime, Event, CheckCircle, Email, Phone, LocationOn, VerifiedUser, Star, StarBorder } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';

const mockSuppliers = [
  {
    id: 1,
    name: 'AutoSupplies Pvt Ltd',
    gstin: '27AAECA1234F1ZV',
    phone: '9876543210',
    email: 'contact@autosupplies.com',
    address: 'Mumbai, Maharashtra',
    totalPurchases: 120000,
    pendingPayment: 15000,
    lastOrder: dayjs().subtract(3, 'day').toISOString(),
    status: 'Active',
    gstRegistered: true,
    rating: 4.5,
    feedback: [
      { user: 'Rahul', comment: 'Prompt delivery, good service.', date: dayjs().subtract(5, 'day').toISOString() },
      { user: 'Priya', comment: 'Competitive pricing.', date: dayjs().subtract(12, 'day').toISOString() },
    ],
    documents: [
      { name: 'GST Certificate', status: 'verified' },
      { name: 'Agreement', status: 'pending' },
    ],
    payments: [
      { date: dayjs().subtract(1, 'day').toISOString(), amount: 5000, mode: 'UPI', ref: 'TXN12345' },
      { date: dayjs().subtract(10, 'day').toISOString(), amount: 10000, mode: 'Bank', ref: 'NEFT67890' },
    ],
    activity: [
      { type: 'added', time: dayjs().subtract(30, 'day').toISOString(), by: 'Admin' },
      { type: 'order', time: dayjs().subtract(3, 'day').toISOString(), by: 'Admin' },
      { type: 'payment', time: dayjs().subtract(1, 'day').toISOString(), by: 'Admin', amount: 5000 },
    ],
  },
  {
    id: 2,
    name: 'BrakeMart',
    gstin: '27AAECB5678G2ZX',
    phone: '9123456780',
    email: 'sales@brakemart.com',
    address: 'Pune, Maharashtra',
    totalPurchases: 80000,
    pendingPayment: 0,
    lastOrder: dayjs().subtract(10, 'day').toISOString(),
    status: 'Active',
    gstRegistered: true,
    rating: 4.8,
    feedback: [
      { user: 'Amit', comment: 'Excellent quality products.', date: dayjs().subtract(7, 'day').toISOString() },
      { user: 'Sneha', comment: 'Very responsive to queries.', date: dayjs().subtract(15, 'day').toISOString() },
    ],
    documents: [
      { name: 'GST Certificate', status: 'verified' },
      { name: 'Agreement', status: 'verified' },
    ],
    payments: [
      { date: dayjs().subtract(2, 'day').toISOString(), amount: 10000, mode: 'UPI', ref: 'TXN112233' },
      { date: dayjs().subtract(15, 'day').toISOString(), amount: 5000, mode: 'Bank', ref: 'NEFT445566' },
    ],
    activity: [
      { type: 'added', time: dayjs().subtract(60, 'day').toISOString(), by: 'Admin' },
      { type: 'order', time: dayjs().subtract(10, 'day').toISOString(), by: 'Admin' },
    ],
  },
  {
    id: 3,
    name: 'FilterHouse',
    gstin: '27AAECF9012H3ZY',
    phone: '9988776655',
    email: 'info@filterhouse.com',
    address: 'Nashik, Maharashtra',
    totalPurchases: 50000,
    pendingPayment: 8000,
    lastOrder: dayjs().subtract(1, 'month').toISOString(),
    status: 'GST Expiring',
    gstRegistered: false,
    rating: 3.9,
    feedback: [
      { user: 'Rajesh', comment: 'Good product range, but delivery took longer.', date: dayjs().subtract(10, 'day').toISOString() },
      { user: 'Priya', comment: 'Very professional and helpful.', date: dayjs().subtract(20, 'day').toISOString() },
    ],
    documents: [
      { name: 'GST Certificate', status: 'expired' },
      { name: 'Agreement', status: 'verified' },
    ],
    payments: [
      { date: dayjs().subtract(10, 'day').toISOString(), amount: 15000, mode: 'UPI', ref: 'TXN778899' },
      { date: dayjs().subtract(20, 'day').toISOString(), amount: 20000, mode: 'Bank', ref: 'NEFT001122' },
    ],
    activity: [
      { type: 'added', time: dayjs().subtract(90, 'day').toISOString(), by: 'Admin' },
      { type: 'gst_expiry', time: dayjs().add(5, 'day').toISOString(), by: 'System' },
    ],
  },
];

const metrics = [
  { label: 'Total Suppliers', value: 12, icon: <LocalShipping color="primary" /> },
  { label: 'Active Suppliers', value: 10, icon: <CheckCircle color="success" /> },
  { label: 'Pending Payments', value: 3, icon: <Warning color="warning" /> },
  { label: 'Total Purchases', value: '₹2,50,000', icon: <AttachMoney color="info" /> },
  { label: 'Recent Orders', value: 5, icon: <Event color="secondary" /> },
  { label: 'GST Registered', value: 9, icon: <VerifiedUser color="success" /> },
];

const quickActions = [
  { label: 'Add Supplier', icon: <Add />, action: 'add' },
  { label: 'Bulk Import', icon: <CloudUpload />, action: 'import' },
  { label: 'Export', icon: <FileCopy />, action: 'export' },
  { label: 'Print', icon: <Print />, action: 'print' },
  { label: 'Pay Supplier', icon: <Payment />, action: 'pay' },
];

const suppliersColumns = [
  { field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={1}>
      <Tooltip title="View Details"><IconButton size="small"><Info fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Edit"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Delete"><IconButton size="small"><Delete fontSize="small" /></IconButton></Tooltip>
    </Stack>
  ) },
  { field: 'name', headerName: 'Supplier Name', flex: 1 },
  { field: 'rating', headerName: 'Rating', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={0.2}>{[1,2,3,4,5].map(i => params.row.rating >= i ? <Star key={i} fontSize="small" color="warning" /> : <StarBorder key={i} fontSize="small" color="disabled" />)}</Stack>
  ) },
  { field: 'gstin', headerName: 'GSTIN', flex: 1 },
  { field: 'phone', headerName: 'Phone', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'address', headerName: 'Address', flex: 1 },
  { field: 'totalPurchases', headerName: 'Total Purchases', flex: 1, valueGetter: (params) => `₹${params.row?.totalPurchases ?? ''}` },
  { field: 'pendingPayment', headerName: 'Pending Payment', flex: 1, valueGetter: (params) => `₹${params.row?.pendingPayment ?? ''}` },
  { field: 'lastOrder', headerName: 'Last Order', flex: 1, valueGetter: (params) => params.row?.lastOrder ? dayjs(params.row.lastOrder).format('DD MMM YYYY') : '' },
  { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'Active' ? 'success' : params.value === 'GST Expiring' ? 'warning' : 'error'} size="small" />
  ) },
];

const GarageSuppliers = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: '', data: null });
  const [isEditing, setIsEditing] = useState(false);

  // Handlers
  const handleOpenDrawer = (supplier) => {
    setSelectedSupplier(supplier);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedSupplier(null);
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
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Suppliers Overview</Typography>
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
        {/* Live Supplier Alerts */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Live Supplier Alerts</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, px: 2 }}>
            {/* Pending Payments */}
            {suppliers.filter(s => s.pendingPayment > 0).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.warning.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Warning color="warning" />
                    <Typography variant="subtitle2">Pending Payment</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b></Typography>
                  <Typography variant="body2">Amount: ₹{item.pendingPayment}</Typography>
                  <Typography variant="body2">Phone: {item.phone}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* Recent Orders */}
            {suppliers.filter(s => dayjs().diff(dayjs(s.lastOrder), 'day') <= 7).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.info.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Event color="info" />
                    <Typography variant="subtitle2">Recent Order</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b></Typography>
                  <Typography variant="body2">Order: {dayjs(item.lastOrder).format('DD MMM')}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* GST Expiry Soon */}
            {suppliers.filter(s => s.status === 'GST Expiring').map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.error.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ErrorOutline color="error" />
                    <Typography variant="subtitle2">GST Expiry Soon</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b></Typography>
                  <Typography variant="body2">GSTIN: {item.gstin}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* New Supplier Added */}
            {suppliers.filter(s => dayjs().diff(dayjs(s.activity.find(a => a.type === 'added')?.time), 'day') <= 7).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.success.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Add color="success" />
                    <Typography variant="subtitle2">New Supplier</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b></Typography>
                  <Typography variant="body2">Added: {dayjs(item.activity.find(a => a.type === 'added')?.time).format('DD MMM')}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
        {/* Analytics & Charts (mock) */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Purchases by Supplier</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={[{ name: 'AutoSupplies', value: 120000 }, { name: 'BrakeMart', value: 80000 }, { name: 'FilterHouse', value: 50000 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                    <Cell fill={theme.palette.primary.main} />
                    <Cell fill={theme.palette.info.main} />
                    <Cell fill={theme.palette.success.main} />
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Pending Payments Trend</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[{ name: 'Jan', value: 20000 }, { name: 'Feb', value: 15000 }, { name: 'Mar', value: 8000 }]}> 
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke={theme.palette.warning.main} />
                  <RechartsTooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Suppliers Table */}
        <Paper sx={{ height: 400, mb: 2, bgcolor: theme.palette.background.paper }}>
          <DataGrid
            rows={suppliers}
            columns={suppliersColumns}
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
            {suppliers.flatMap(s => s.activity.map((a, idx) => ({ ...a, supplier: s.name, key: `${s.id}-${idx}` }))).sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf()).slice(0, 6).map((a) => (
              <Box key={a.key} sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {/* Timeline Dot */}
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%',
                  bgcolor: a.type === 'added' ? theme.palette.primary.main : a.type === 'order' ? theme.palette.info.main : a.type === 'payment' ? theme.palette.success.main : a.type === 'gst_expiry' ? theme.palette.error.main : theme.palette.warning.main,
                  mt: 0.5, mr: 2, flexShrink: 0,
                  boxShadow: 1,
                }} />
                {/* Content Card */}
                <Paper elevation={0} sx={{ flex: 1, bgcolor: theme.palette.background.default, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: a.type === 'added' ? theme.palette.primary.light : a.type === 'order' ? theme.palette.info.light : a.type === 'payment' ? theme.palette.success.light : a.type === 'gst_expiry' ? theme.palette.error.light : theme.palette.warning.light, width: 36, height: 36 }}>
                      {a.type === 'added' ? <Add /> : a.type === 'order' ? <Event /> : a.type === 'payment' ? <Payment /> : a.type === 'gst_expiry' ? <ErrorOutline /> : <Warning />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.supplier}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {a.type === 'added' ? 'Supplier Added' : a.type === 'order' ? 'Order Placed' : a.type === 'payment' ? `Payment: ₹${a.amount}` : a.type === 'gst_expiry' ? 'GST Expiry Soon' : 'Alert'}
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
        {/* Drawer: Supplier Details */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{ sx: { width: isMdUp ? 400 : '90vw', p: 0, bgcolor: theme.palette.background.paper } }}>
          <Box sx={{ p: 2, mt: 12, mb: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedSupplier && (
              <>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Supplier Details</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>General Info</Typography>
                  <Typography variant="body2"><LocalShipping fontSize="small" /> {selectedSupplier.name}</Typography>
                  <Typography variant="body2"><VerifiedUser fontSize="small" /> GSTIN: {selectedSupplier.gstin}</Typography>
                  <Typography variant="body2"><CheckCircle fontSize="small" /> Status: {selectedSupplier.status}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Contact Info</Typography>
                  <Typography variant="body2"><Phone fontSize="small" /> {selectedSupplier.phone}</Typography>
                  <Typography variant="body2"><Email fontSize="small" /> {selectedSupplier.email}</Typography>
                  <Typography variant="body2"><LocationOn fontSize="small" /> {selectedSupplier.address}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Financial Info</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> Total Purchases: ₹{selectedSupplier.totalPurchases}</Typography>
                  <Typography variant="body2"><Warning fontSize="small" /> Pending Payment: ₹{selectedSupplier.pendingPayment}</Typography>
                  <Typography variant="body2"><Event fontSize="small" /> Last Order: {selectedSupplier.lastOrder ? dayjs(selectedSupplier.lastOrder).format('DD MMM YYYY') : '-'}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Rating & Feedback</Typography>
                  <Stack direction="row" spacing={0.2} sx={{ mb: 1 }}>{[1,2,3,4,5].map(i => selectedSupplier.rating >= i ? <Star key={i} fontSize="small" color="warning" /> : <StarBorder key={i} fontSize="small" color="disabled" />)}</Stack>
                  {selectedSupplier.feedback && selectedSupplier.feedback.length > 0 ? (
                    <Stack spacing={1}>
                      {selectedSupplier.feedback.slice(0,2).map((fb, idx) => (
                        <Box key={idx}>
                          <Typography variant="body2"><b>{fb.user}:</b> {fb.comment}</Typography>
                          <Typography variant="caption" color="text.secondary">{dayjs(fb.date).format('DD MMM YYYY')}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  ) : <Typography variant="body2" color="text.secondary">No feedback yet.</Typography>}
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Documents</Typography>
                  <Stack spacing={1}>{selectedSupplier.documents.map((doc, idx) => (
                    <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                      <Typography variant="body2">{doc.name}</Typography>
                      <Chip label={doc.status} color={doc.status === 'verified' ? 'success' : doc.status === 'pending' ? 'warning' : 'error'} size="small" />
                    </Stack>
                  ))}</Stack>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Payment History</Typography>
                  <Stack spacing={1}>{selectedSupplier.payments.map((pay, idx) => (
                    <Stack direction="row" spacing={2} key={idx}>
                      <Typography variant="body2">{dayjs(pay.date).format('DD MMM YYYY')}</Typography>
                      <Typography variant="body2">₹{pay.amount}</Typography>
                      <Typography variant="body2">{pay.mode}</Typography>
                      <Typography variant="body2">{pay.ref}</Typography>
                    </Stack>
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
                </Stack>
              </>
            )}
          </Box>
        </Drawer>
        {/* Dialogs (Add/Edit Supplier, Import, Pay, Print) */}
        <Dialog open={dialog.open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{dialog.type === 'add' ? 'Add Supplier' : dialog.type === 'import' ? 'Bulk Import' : dialog.type === 'pay' ? 'Pay Supplier' : dialog.type === 'print' ? 'Print Preview' : 'Edit Supplier'}</DialogTitle>
          <DialogContent>
            {/* Mock forms/fields for each dialog type */}
            {dialog.type === 'add' && (
              <Stack spacing={2}>
                <TextField label="Supplier Name" fullWidth />
                <TextField label="GSTIN" fullWidth />
                <TextField label="Phone" fullWidth />
                <TextField label="Email" fullWidth />
                <TextField label="Address" fullWidth />
                <Button variant="contained">Add</Button>
              </Stack>
            )}
            {dialog.type === 'import' && (
              <Button variant="contained" startIcon={<CloudUpload />}>Upload Excel</Button>
            )}
            {dialog.type === 'pay' && (
              <Stack spacing={2}>
                <TextField label="Supplier" fullWidth />
                <TextField label="Amount" type="number" fullWidth />
                <Button variant="contained">Pay</Button>
              </Stack>
            )}
            {dialog.type === 'print' && (
              <Typography>Print Preview (mock)</Typography>
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

export default GarageSuppliers; 