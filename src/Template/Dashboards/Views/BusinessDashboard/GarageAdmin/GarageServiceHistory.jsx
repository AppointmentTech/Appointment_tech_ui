import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, IconButton, Chip, Avatar, Stack, Divider, Tooltip, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Card, CardContent, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";
import { useTheme } from '@mui/material/styles';
import { Edit, Info, Print, FileCopy, Payment, Warning, ErrorOutline, Done, Cancel, AttachMoney, TrendingUp, TrendingDown, AccessTime, Event, CheckCircle, DirectionsCar, Group, Receipt, Download, FilterList, Star, StarBorder } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';

const mockServices = [
  {
    id: 1,
    serviceId: 'SVC-001',
    date: dayjs().subtract(2, 'day').toISOString(),
    customer: 'Rahul Sharma',
    vehicle: 'Swift (MH12AB1234)',
    serviceTypes: ['Oil Change', 'Brake Check'],
    technicians: ['Amit', 'Sunil'],
    status: 'Completed',
    amount: 2500,
    paymentStatus: 'Paid',
    invoice: 'INV-001',
    activity: [
      { type: 'created', time: dayjs().subtract(2, 'day').toISOString(), by: 'Reception' },
      { type: 'completed', time: dayjs().subtract(1, 'day').toISOString(), by: 'Amit' },
      { type: 'payment', time: dayjs().subtract(1, 'day').toISOString(), by: 'Reception', amount: 2500 },
    ],
  },
  {
    id: 2,
    serviceId: 'SVC-002',
    date: dayjs().subtract(1, 'day').toISOString(),
    customer: 'Priya Singh',
    vehicle: 'Dzire (MH14XY5678)',
    serviceTypes: ['PUC'],
    technicians: ['Ravi'],
    status: 'In Progress',
    amount: 800,
    paymentStatus: 'Unpaid',
    invoice: 'INV-002',
    activity: [
      { type: 'created', time: dayjs().subtract(1, 'day').toISOString(), by: 'App' },
    ],
  },
  {
    id: 3,
    serviceId: 'SVC-003',
    date: dayjs().subtract(3, 'day').toISOString(),
    customer: 'Suresh Kumar',
    vehicle: 'Baleno (MH13CD4321)',
    serviceTypes: ['Chain Adjustment'],
    technicians: ['Manoj'],
    status: 'Cancelled',
    amount: 0,
    paymentStatus: 'Cancelled',
    invoice: 'INV-003',
    activity: [
      { type: 'created', time: dayjs().subtract(3, 'day').toISOString(), by: 'Reception' },
      { type: 'cancelled', time: dayjs().subtract(2, 'day').toISOString(), by: 'Reception' },
    ],
  },
];

const metrics = [
  { label: 'Total Services', value: 120, icon: <FileCopy color="primary" /> },
  { label: 'Completed', value: 100, icon: <CheckCircle color="success" /> },
  { label: 'In Progress', value: 10, icon: <TrendingUp color="info" /> },
  { label: 'Cancelled', value: 5, icon: <ErrorOutline color="error" /> },
  { label: 'Repeat Customers', value: 30, icon: <Star color="warning" /> },
  { label: 'Revenue (This Month)', value: '₹1,50,000', icon: <AttachMoney color="success" /> },
];

const quickActions = [
  { label: 'Export', icon: <FileCopy />, action: 'export' },
  { label: 'Print', icon: <Print />, action: 'print' },
  { label: 'Advanced Filter', icon: <FilterList />, action: 'filter' },
  { label: 'Download Invoice', icon: <Download />, action: 'downloadInvoice' },
];

const serviceColumns = [
  { field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={1}>
      <Tooltip title="View Details"><IconButton size="small"><Info fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Download Invoice"><IconButton size="small"><Download fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Print"><IconButton size="small"><Print fontSize="small" /></IconButton></Tooltip>
    </Stack>
  ) },
  { field: 'serviceId', headerName: 'Service ID', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1, valueGetter: (params) => params.row?.date ? dayjs(params.row.date).format('DD MMM YYYY') : '' },
  { field: 'customer', headerName: 'Customer', flex: 1 },
  { field: 'vehicle', headerName: 'Vehicle', flex: 1 },
  { field: 'serviceTypes', headerName: 'Service Type(s)', flex: 1, valueGetter: (params) => params.row?.serviceTypes?.join(', ') || '' },
  { field: 'technicians', headerName: 'Technician(s)', flex: 1, valueGetter: (params) => params.row?.technicians?.join(', ') || '' },
  { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'Completed' ? 'success' : params.value === 'In Progress' ? 'info' : 'error'} size="small" />
  ) },
  { field: 'amount', headerName: 'Amount', flex: 1, valueGetter: (params) => `₹${params.row?.amount ?? ''}` },
  { field: 'paymentStatus', headerName: 'Payment', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'Paid' ? 'success' : params.value === 'Unpaid' ? 'warning' : 'default'} size="small" />
  ) },
];

const GarageServiceHistory = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [services, setServices] = useState(mockServices);
  const [selectedService, setSelectedService] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: '', data: null });
  const [isEditing, setIsEditing] = useState(false);

  // Handlers
  const handleOpenDrawer = (service) => {
    setSelectedService(service);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedService(null);
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
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Service History Overview</Typography>
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
        {/* Live Service Alerts */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Live Service Alerts</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, px: 2 }}>
            {/* In Progress */}
            {services.filter(s => s.status === 'In Progress').map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.info.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TrendingUp color="info" />
                    <Typography variant="subtitle2">In Progress</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.serviceId}</b></Typography>
                  <Typography variant="body2">Customer: {item.customer}</Typography>
                  <Typography variant="body2">Vehicle: {item.vehicle}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* Recently Completed */}
            {services.filter(s => s.status === 'Completed').map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.success.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircle color="success" />
                    <Typography variant="subtitle2">Completed</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.serviceId}</b></Typography>
                  <Typography variant="body2">Customer: {item.customer}</Typography>
                  <Typography variant="body2">Vehicle: {item.vehicle}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* Cancelled */}
            {services.filter(s => s.status === 'Cancelled').map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.error.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ErrorOutline color="error" />
                    <Typography variant="subtitle2">Cancelled</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.serviceId}</b></Typography>
                  <Typography variant="body2">Customer: {item.customer}</Typography>
                  <Typography variant="body2">Vehicle: {item.vehicle}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* High-Value Jobs (mock) */}
            {services.filter(s => s.amount > 2000).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.warning.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AttachMoney color="warning" />
                    <Typography variant="subtitle2">High-Value Job</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.serviceId}</b></Typography>
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
              <Typography variant="subtitle2">Services by Type</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={[{ name: 'Oil Change', value: 40 }, { name: 'Brake Check', value: 30 }, { name: 'PUC', value: 20 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
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
              <Typography variant="subtitle2">Revenue Trend</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[{ name: 'Jan', value: 50000 }, { name: 'Feb', value: 60000 }, { name: 'Mar', value: 70000 }]}> 
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke={theme.palette.success.main} />
                  <RechartsTooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Service History Table */}
        <Paper sx={{ height: 400, mb: 2, bgcolor: theme.palette.background.paper }}>
          <DataGrid
            rows={services}
            columns={serviceColumns}
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
            {services.flatMap(s => s.activity.map((a, idx) => ({ ...a, serviceId: s.serviceId, key: `${s.id}-${idx}` }))).sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf()).slice(0, 6).map((a) => (
              <Box key={a.key} sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {/* Timeline Dot */}
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%',
                  bgcolor: a.type === 'created' ? theme.palette.primary.main : a.type === 'completed' ? theme.palette.success.main : a.type === 'cancelled' ? theme.palette.error.main : a.type === 'payment' ? theme.palette.info.main : theme.palette.warning.main,
                  mt: 0.5, mr: 2, flexShrink: 0,
                  boxShadow: 1,
                }} />
                {/* Content Card */}
                <Paper elevation={0} sx={{ flex: 1, bgcolor: theme.palette.background.default, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: a.type === 'created' ? theme.palette.primary.light : a.type === 'completed' ? theme.palette.success.light : a.type === 'cancelled' ? theme.palette.error.light : a.type === 'payment' ? theme.palette.info.light : theme.palette.warning.light, width: 36, height: 36 }}>
                      {a.type === 'created' ? <FileCopy /> : a.type === 'completed' ? <CheckCircle /> : a.type === 'cancelled' ? <ErrorOutline /> : a.type === 'payment' ? <Payment /> : <Warning />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.serviceId}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {a.type === 'created' ? 'Service Created' : a.type === 'completed' ? 'Completed' : a.type === 'cancelled' ? 'Cancelled' : a.type === 'payment' ? `Payment: ₹${a.amount}` : 'Alert'}
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
        {/* Drawer: Service/Job Details */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{ sx: { width: isMdUp ? 400 : '90vw', p: 0, bgcolor: theme.palette.background.paper } }}>
          <Box sx={{ p: 2, mt: 12, mb: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedService && (
              <>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Service Details</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>General Info</Typography>
                  <Typography variant="body2"><FileCopy fontSize="small" /> Service ID: {selectedService.serviceId}</Typography>
                  <Typography variant="body2"><Event fontSize="small" /> Date: {dayjs(selectedService.date).format('DD MMM YYYY')}</Typography>
                  <Typography variant="body2"><Chip label={selectedService.status} color={selectedService.status === 'Completed' ? 'success' : selectedService.status === 'In Progress' ? 'info' : 'error'} size="small" /></Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Customer & Vehicle</Typography>
                  <Typography variant="body2"><Group fontSize="small" /> Customer: {selectedService.customer}</Typography>
                  <Typography variant="body2"><DirectionsCar fontSize="small" /> Vehicle: {selectedService.vehicle}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Service Details</Typography>
                  <Typography variant="body2"><Receipt fontSize="small" /> Services: {selectedService.serviceTypes.join(', ')}</Typography>
                  <Typography variant="body2"><Group fontSize="small" /> Technicians: {selectedService.technicians.join(', ')}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Payment Info</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> Amount: ₹{selectedService.amount}</Typography>
                  <Typography variant="body2"><Payment fontSize="small" /> Payment Status: {selectedService.paymentStatus}</Typography>
                  <Typography variant="body2"><Download fontSize="small" /> Invoice: {selectedService.invoice}</Typography>
                  <Button variant="outlined" startIcon={<Download />} sx={{ mt: 1 }}>Download Invoice</Button>
                  <Button variant="outlined" startIcon={<Print />} sx={{ mt: 1, ml: 1 }}>Print</Button>
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
        {/* Dialogs (Advanced Filter, Print, Download Invoice) */}
        <Dialog open={dialog.open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{dialog.type === 'filter' ? 'Advanced Filter' : dialog.type === 'print' ? 'Print Preview' : dialog.type === 'downloadInvoice' ? 'Download Invoice' : 'Edit Service'}</DialogTitle>
          <DialogContent>
            {/* Mock forms/fields for each dialog type */}
            {dialog.type === 'filter' && (
              <Stack spacing={2}>
                <TextField label="Customer Name" fullWidth />
                <TextField label="Vehicle" fullWidth />
                <FormControl fullWidth><InputLabel>Status</InputLabel><Select><MenuItem>Completed</MenuItem><MenuItem>In Progress</MenuItem><MenuItem>Cancelled</MenuItem></Select></FormControl>
                <TextField label="Date Range" fullWidth />
                <Button variant="contained">Apply Filter</Button>
              </Stack>
            )}
            {dialog.type === 'print' && (
              <Typography>Print Preview (mock)</Typography>
            )}
            {dialog.type === 'downloadInvoice' && (
              <Typography>Download Invoice (mock)</Typography>
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

export default GarageServiceHistory; 