import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, IconButton, Chip, Avatar, Stack, Divider, Tooltip, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemAvatar, ListItemText, Card, CardContent, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";
import { useTheme } from '@mui/material/styles';
import { WhatsApp, Print, Edit, Delete, Payment, AssignmentInd, DirectionsCar, Person, AccessTime, Done, Cancel, Sms, Email, MoreHoriz, ExpandMore, ExpandLess, AttachMoney, Receipt, Group, Build, Timeline, FileCopy, CloudUpload, Add, Event, Phone, Star, VerifiedUser, Info, CheckCircle, ErrorOutline } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import dayjs from 'dayjs';

const mockJobCards = [
  {
    id: 1,
    jobCardId: 'JC2024001',
    vehicle: {
      number: 'MH12AB1234',
      type: 'Car',
      brand: 'Maruti',
      model: 'Swift',
      color: 'Red',
      image: '',
    },
    customer: {
      name: 'Rahul Sharma',
      phone: '9876543210',
      loyalty: true,
    },
    technician: [{ name: 'Amit', avatar: '' }],
    services: ['Oil Change', 'Brake Check'],
    status: 'In Bay',
    paymentStatus: 'Unpaid',
    startTime: dayjs().subtract(1, 'hour').toISOString(),
    endTime: '',
    remarks: 'Customer waiting',
    partsUsed: ['Oil Filter', 'Brake Pads'],
    documents: [],
    amount: 2500,
    source: 'Walk-in',
    activity: [
      { type: 'created', time: dayjs().subtract(1, 'hour').toISOString(), by: 'Reception' },
      { type: 'status', status: 'In Bay', time: dayjs().subtract(30, 'minute').toISOString(), by: 'Amit' },
    ],
  },
  {
    id: 2,
    jobCardId: 'JC2024002',
    vehicle: {
      number: 'MH14XY5678',
      type: 'Bike',
      brand: 'Bajaj',
      model: 'Pulsar',
      color: 'Black',
      image: '',
    },
    customer: {
      name: 'Priya Singh',
      phone: '9123456780',
      loyalty: false,
    },
    technician: [{ name: 'Sunil', avatar: '' }],
    services: ['PUC', 'Chain Adjustment'],
    status: 'Work Started',
    paymentStatus: 'Partial',
    startTime: dayjs().subtract(2, 'hour').toISOString(),
    endTime: '',
    remarks: '',
    partsUsed: ['Chain Lube'],
    documents: [],
    amount: 800,
    source: 'App',
    activity: [
      { type: 'created', time: dayjs().subtract(2, 'hour').toISOString(), by: 'App' },
      { type: 'status', status: 'Work Started', time: dayjs().subtract(1, 'hour').toISOString(), by: 'Sunil' },
    ],
  },
  // ...more mock job cards
];

const statusSteps = [
  'Waiting',
  'In Bay',
  'Work Started',
  'QC',
  'Completed',
  'Payment Pending',
  'Paid',
];

const paymentStatusColors = {
  Paid: 'success',
  Unpaid: 'error',
  Partial: 'warning',
};

const jobCardColumns = [
  { field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={1}>
      <Tooltip title="View Details"><IconButton size="small"><Info fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Edit"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Delete"><IconButton size="small"><Delete fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Print"><IconButton size="small"><Print fontSize="small" /></IconButton></Tooltip>
    </Stack>
  ) },
  { field: 'jobCardId', headerName: 'Job Card ID', flex: 1 },
  { field: 'vehicle', headerName: 'Vehicle', flex: 1, valueGetter: (params) => params.row?.vehicle?.number || '' },
  { field: 'customer', headerName: 'Customer', flex: 1, valueGetter: (params) => params.row?.customer?.name || '' },
  { field: 'technician', headerName: 'Technician', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={1}>{params.row.technician.map((t, i) => <Chip key={i} label={t.name} size="small" icon={<Build fontSize="small" />} />)}</Stack>
  ) },
  { field: 'services', headerName: 'Services', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={0.5}>{params.row.services.map((s, i) => <Chip key={i} label={s} size="small" color="primary" />)}</Stack>
  ) },
  { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'Paid' ? 'success' : params.value === 'Completed' ? 'primary' : 'warning'} size="small" />
  ) },
  { field: 'startTime', headerName: 'Start Time', flex: 1, valueGetter: (params) => dayjs(params.value).format('HH:mm') },
  { field: 'endTime', headerName: 'End Time', flex: 1, valueGetter: (params) => params.value ? dayjs(params.value).format('HH:mm') : '-' },
  { field: 'paymentStatus', headerName: 'Payment', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={paymentStatusColors[params.value] || 'default'} size="small" />
  ) },
];

const metrics = [
  { label: 'Total Jobs Today', value: 18, icon: <DirectionsCar color="primary" /> },
  { label: 'Jobs In Progress', value: 6, icon: <Build color="warning" /> },
  { label: 'Jobs Completed', value: 10, icon: <Done color="success" /> },
  { label: 'Pending Payments', value: 4, icon: <AttachMoney color="error" /> },
  { label: 'Avg. Job Duration', value: '1h 20m', icon: <AccessTime color="info" /> },
  { label: 'Repeat Customers', value: 7, icon: <Star color="secondary" /> },
];

const quickActions = [
  { label: 'Add Job Card', icon: <Add />, action: 'add' },
  { label: 'Bulk Import', icon: <CloudUpload />, action: 'import' },
  { label: 'Export', icon: <FileCopy />, action: 'export' },
  { label: 'Assign Technician', icon: <AssignmentInd />, action: 'assignTech' },
  { label: 'Bulk WhatsApp/SMS', icon: <WhatsApp />, action: 'bulkMsg' },
  { label: 'Print Job Cards', icon: <Print />, action: 'print' },
];

const jobsByStatusData = [
  { name: 'Waiting', value: 2 },
  { name: 'In Bay', value: 3 },
  { name: 'Work Started', value: 1 },
  { name: 'QC', value: 1 },
  { name: 'Completed', value: 7 },
  { name: 'Payment Pending', value: 2 },
  { name: 'Paid', value: 2 },
];
const revenueByServiceData = [
  { name: 'Oil Change', revenue: 12000 },
  { name: 'Brake Check', revenue: 8000 },
  { name: 'PUC', revenue: 3000 },
  { name: 'Chain Adjustment', revenue: 2000 },
];
const avgJobDurationData = [
  { name: 'Mon', duration: 80 },
  { name: 'Tue', duration: 75 },
  { name: 'Wed', duration: 90 },
  { name: 'Thu', duration: 70 },
  { name: 'Fri', duration: 85 },
  { name: 'Sat', duration: 95 },
  { name: 'Sun', duration: 60 },
];
const techPerformanceData = [
  { tech: 'Amit', jobs: 8 },
  { tech: 'Sunil', jobs: 6 },
  { tech: 'Ravi', jobs: 4 },
  { tech: 'Manoj', jobs: 5 },
];

const recentActivity = [
  { id: 1, type: 'created', time: dayjs().subtract(1, 'hour').toISOString(), by: 'Reception', jobCardId: 'JC2024001', customer: 'Rahul Sharma' },
  { id: 2, type: 'status', status: 'Work Started', time: dayjs().subtract(30, 'minute').toISOString(), by: 'Amit', jobCardId: 'JC2024002', customer: 'Priya Singh' },
  { id: 3, type: 'payment', status: 'Paid', time: dayjs().subtract(10, 'minute').toISOString(), by: 'Reception', jobCardId: 'JC2024003', customer: 'Suresh Kumar' },
];

const GarageJobCards = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [jobCards, setJobCards] = useState(mockJobCards);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: '', data: null });
  const [expandedCard, setExpandedCard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handlers
  const handleOpenDrawer = (jobCard) => {
    setSelectedJobCard(jobCard);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedJobCard(null);
  };
  const handleDialogOpen = (type, data = null) => setDialog({ open: true, type, data });
  const handleDialogClose = () => setDialog({ open: false, type: '', data: null });
  const handleExpandCard = (id) => setExpandedCard(expandedCard === id ? null : id);
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false); // Add save logic as needed
  const handleCancel = () => setIsEditing(false);

  // ...mock action handlers for status, payment, assign tech, etc.

  // Theme-based background helpers
  const getSectionBg = () => theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100];
  const getCardBg = () => theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff';

  return (
<Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <CommonHeader role="admin" />
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            pt: { xs: 8, sm: 10 },
            overflow: "auto",
            height: "100vh",
            backgroundColor: theme.palette.background.default,
          }}
        >
        {/* Live Job Card Queue */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, mt: 3 }}>Live Job Card Queue</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, px: 2 }}>
            {jobCards.map((job) => (
              <Card
                key={job.id}
                sx={{
                  minWidth: 320,
                  maxWidth: 340,
                  m: 1,
                  boxShadow: 3,
                  borderLeft: `6px solid ${theme.palette.primary.main}`,
                  bgcolor: theme.palette.background.paper,
                  '&:hover': {
                    boxShadow: 6,
                    borderLeft: `6px solid ${theme.palette.primary.dark}`,
                  },
                }}
                onClick={() => handleOpenDrawer(job)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <DirectionsCar color="primary" />
                    <Typography variant="subtitle2">{job.jobCardId}</Typography>
                    <Chip label={job.status} color={job.status === 'Paid' ? 'success' : job.status === 'Completed' ? 'primary' : 'warning'} size="small" />
                    <Chip label={job.paymentStatus} color={paymentStatusColors[job.paymentStatus] || 'default'} size="small" />
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Stack spacing={0.5}>
                    <Typography variant="body2"><b>Vehicle:</b> {job.vehicle.number} ({job.vehicle.brand} {job.vehicle.model})</Typography>
                    <Typography variant="body2"><b>Customer:</b> {job.customer.name} <IconButton size="small"><WhatsApp fontSize="small" /></IconButton></Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <b>Technician:</b>
                      {job.technician.map((t, i) => <Chip key={i} label={t.name} size="small" icon={<Build fontSize="small" />} />)}
                      <Tooltip title="Assign/Edit Technician"><IconButton size="small" onClick={() => handleDialogOpen('assignTech', job)}><AssignmentInd fontSize="small" /></IconButton></Tooltip>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <b>Services:</b>
                      {job.services.map((s, i) => <Chip key={i} label={s} size="small" color="primary" />)}
                    </Stack>
                    <Typography variant="body2"><b>Start:</b> {dayjs(job.startTime).format('HH:mm')}</Typography>
                    <Typography variant="body2"><b>Amount:</b> ₹{job.amount}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Tooltip title="WhatsApp"><IconButton size="small"><WhatsApp fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Call"><IconButton size="small"><Phone fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Print"><IconButton size="small"><Print fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Mark as Complete"><IconButton size="small"><Done fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Mark as Paid"><IconButton size="small"><Payment fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="View Details"><IconButton size="small"><Info fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title={expandedCard === job.id ? 'Show Less' : 'Show More'}><IconButton size="small" onClick={() => handleExpandCard(job.id)}>{expandedCard === job.id ? <ExpandLess /> : <ExpandMore />}</IconButton></Tooltip>
                  </Stack>
                  {expandedCard === job.id && (
                    <Box sx={{ mt: 1, px: 2 }}>
                      <Typography variant="body2"><b>Parts Used:</b> {job.partsUsed.join(', ')}</Typography>
                      <Typography variant="body2"><b>Remarks:</b> {job.remarks || '-'}</Typography>
                      {/* Documents, images, etc. */}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>

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

        {/* Analytics & Charts */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Jobs by Status</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={jobsByStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                    {jobsByStatusData.map((entry, idx) => <Cell key={idx} fill={theme.palette.primary[idx % 5] || theme.palette.primary.main} />)}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Revenue by Service</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={revenueByServiceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="revenue" fill={theme.palette.success.main} />
                  <RechartsTooltip />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Avg. Job Duration (min)</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={avgJobDurationData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="duration" stroke={theme.palette.info.main} />
                  <RechartsTooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Technician Performance</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={techPerformanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="tech" />
                  <PolarRadiusAxis />
                  <Radar dataKey="jobs" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.light} fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Job Cards Table */}
        <Paper sx={{ height: 400, mb: 2, bgcolor: theme.palette.background.paper }}>
          <DataGrid
            rows={jobCards}
            columns={jobCardColumns}
            components={{ Toolbar: CustomTableToolbar }}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={(params) => handleOpenDrawer(params.row)}
          />
        </Paper>

        {/* Recent Activity */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Recent Activity</Typography>
        <Paper sx={{ mb: 2, bgcolor: getSectionBg(), p: 2 }}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            {recentActivity.map((a, idx) => (
              <Box key={a.id} sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {/* Timeline Dot */}
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%',
                  bgcolor: a.type === 'created' ? theme.palette.primary.main : a.type === 'status' ? theme.palette.info.main : theme.palette.success.main,
                  mt: 0.5, mr: 2, flexShrink: 0,
                  boxShadow: 1,
                }} />
                {/* Content Card */}
                <Paper elevation={0} sx={{ flex: 1, bgcolor: getCardBg(), p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: a.type === 'created' ? theme.palette.primary.light : a.type === 'status' ? theme.palette.info.light : theme.palette.success.light, width: 36, height: 36 }}>
                      {a.type === 'created' ? <Add /> : a.type === 'status' ? <Build /> : <AttachMoney />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.customer} <span style={{ color: theme.palette.text.secondary, fontWeight: 400 }}>- {a.jobCardId}</span></Typography>
                      <Typography variant="body2" color="text.secondary">
                        {a.type === 'created' ? 'Job Card Created' : a.type === 'status' ? `Status: ${a.status}` : `Payment: ${a.status}`}
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

        {/* Drawer: Job Card Details */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{ sx: { width: isMdUp ? 400 : '90vw', p: 0, bgcolor: theme.palette.background.paper } }}>
          <Box sx={{ p: 2,mt: 12, mb:5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedJobCard && (
              <>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Job Card Details</Typography>
                {/* <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto' }}> */}
                  {/* Vehicle Section */}
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Vehicle</Typography>
                    <Typography variant="body2"><DirectionsCar fontSize="small" /> {selectedJobCard.vehicle.number} ({selectedJobCard.vehicle.brand} {selectedJobCard.vehicle.model})</Typography>
                  </Paper>
                  {/* Customer Section */}
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Customer</Typography>
                    <Typography variant="body2"><Person fontSize="small" /> {selectedJobCard.customer.name} ({selectedJobCard.customer.phone})</Typography>
                  </Paper>
                  {/* Technician Section */}
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Technician</Typography>
                    <Typography variant="body2"><Build fontSize="small" /> {selectedJobCard.technician.map((t) => t.name).join(', ')}</Typography>
                  </Paper>
                  {/* Services Section */}
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Services</Typography>
                    <Typography variant="body2"><Group fontSize="small" /> {selectedJobCard.services.join(', ')}</Typography>
                  </Paper>
                  {/* Payment Section */}
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Payment</Typography>
                    <Typography variant="body2"><AttachMoney fontSize="small" /> ₹{selectedJobCard.amount}</Typography>
                    <Typography variant="body2"><Receipt fontSize="small" /> {selectedJobCard.paymentStatus}</Typography>
                  </Paper>
                  {/* Status & Other Info */}
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Status & Other Info</Typography>
                    <Typography variant="body2"><Info fontSize="small" /> {selectedJobCard.status}</Typography>
                    <Typography variant="body2"><FileCopy fontSize="small" /> Parts Used: {selectedJobCard.partsUsed.join(', ')}</Typography>
                    <Typography variant="body2"><Event fontSize="small" /> Source: {selectedJobCard.source}</Typography>
                    <Typography variant="body2"><Sms fontSize="small" /> Remarks: {selectedJobCard.remarks || '-'}</Typography>
                  </Paper>
                {/* </Stack> */}
                <Divider sx={{ my: 2 }} />
                {/* Action Buttons Row */}
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

        {/* Dialogs (Add/Edit, Assign Tech, Import, Bulk Msg, Print) */}
        <Dialog open={dialog.open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{dialog.type === 'add' ? 'Add Job Card' : dialog.type === 'assignTech' ? 'Assign Technician' : dialog.type === 'import' ? 'Bulk Import' : dialog.type === 'bulkMsg' ? 'Bulk Messaging' : dialog.type === 'print' ? 'Print Preview' : 'Edit Job Card'}</DialogTitle>
          <DialogContent>
            {/* Mock forms/fields for each dialog type */}
            {dialog.type === 'add' && (
              <Stack spacing={2}>
                <TextField label="Vehicle Number" fullWidth />
                <TextField label="Customer Name" fullWidth />
                <TextField label="Phone" fullWidth />
                <FormControl fullWidth><InputLabel>Service</InputLabel><Select><MenuItem>Oil Change</MenuItem><MenuItem>Brake Check</MenuItem></Select></FormControl>
                <Button variant="contained">Add</Button>
              </Stack>
            )}
            {dialog.type === 'assignTech' && (
              <Stack spacing={2}>
                <FormControl fullWidth><InputLabel>Technician</InputLabel><Select><MenuItem>Amit</MenuItem><MenuItem>Sunil</MenuItem></Select></FormControl>
                <Button variant="contained">Assign</Button>
              </Stack>
            )}
            {dialog.type === 'import' && (
              <Button variant="contained" startIcon={<CloudUpload />}>Upload Excel</Button>
            )}
            {dialog.type === 'bulkMsg' && (
              <TextField label="Message" multiline rows={4} fullWidth />
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

export default GarageJobCards; 