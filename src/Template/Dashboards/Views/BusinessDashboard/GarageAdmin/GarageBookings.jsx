import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BadgeIcon from '@mui/icons-material/Badge';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';
import QrCodeIcon from '@mui/icons-material/QrCode';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';
import TimelineIcon from '@mui/icons-material/Timeline';
import SourceIcon from '@mui/icons-material/Source';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip as ReTooltip, ResponsiveContainer, Legend } from 'recharts';
import dayjs from 'dayjs';

// Mock Data
const mockTechnicians = [
  { id: 1, name: 'Amit Kumar' },
  { id: 2, name: 'Priya Singh' },
  { id: 3, name: 'Ravi Verma' },
  { id: 4, name: 'Sunita Sharma' },
];
const mockBookings = [
  { id: 201, bookingId: 'BK001', date: '2024-06-10', time: '10:00', customer: 'Rahul Mehra', vehicle: 'Honda City', services: ['Oil Change'], technician: 'Amit Kumar', status: 'Upcoming', payment: 'Paid', amount: 1200, source: 'App' },
  { id: 202, bookingId: 'BK002', date: '2024-06-10', time: '11:00', customer: 'Sneha Patel', vehicle: 'Suzuki Swift', services: ['AC Repair', 'PUC Renewal'], technician: null, status: 'Upcoming', payment: 'Unpaid', amount: 1800, source: 'Walk-in' },
  { id: 203, bookingId: 'BK003', date: '2024-06-09', time: '15:00', customer: 'Amit Singh', vehicle: 'Royal Enfield', services: ['Brake Check'], technician: 'Ravi Verma', status: 'Completed', payment: 'Paid', amount: 600, source: 'Phone' },
  { id: 204, bookingId: 'BK004', date: '2024-06-08', time: '13:00', customer: 'Priya Sharma', vehicle: 'Hyundai i20', services: ['Wheel Alignment'], technician: 'Sunita Sharma', status: 'Cancelled', payment: 'Unpaid', amount: 0, source: 'WhatsApp' },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const bookingTimeline = [
  { id: 201, time: '10:00', customer: 'Rahul Mehra', vehicle: 'Honda City', service: 'Oil Change', status: 'Upcoming', technician: 'Amit Kumar' },
  { id: 202, time: '11:00', customer: 'Sneha Patel', vehicle: 'Suzuki Swift', service: 'AC Repair', status: 'Upcoming', technician: null },
  { id: 205, time: '12:00', customer: 'New Customer', vehicle: 'Maruti Alto', service: 'General Service', status: 'Upcoming', technician: null },
];
const mockActivity = [
  { type: 'add', bookingId: 'BK005', customer: 'Ravi Kumar', vehicle: 'Honda Amaze', user: 'Admin', desc: 'New booking created', time: '2 min ago', date: 'Today', services: ['PUC Renewal'], technician: 'Amit Kumar' },
  { type: 'edit', bookingId: 'BK002', customer: 'Sneha Patel', vehicle: 'Suzuki Swift', user: 'Manager', desc: 'Booking updated', time: '10 min ago', date: 'Today', services: ['AC Repair'], technician: null },
  { type: 'completed', bookingId: 'BK003', customer: 'Amit Singh', vehicle: 'Royal Enfield', user: 'Admin', desc: 'Booking marked as completed', time: '1 hr ago', date: 'Yesterday', services: ['Brake Check'], technician: 'Ravi Verma' },
  { type: 'cancelled', bookingId: 'BK004', customer: 'Priya Sharma', vehicle: 'Hyundai i20', user: 'Admin', desc: 'Booking cancelled', time: '2 days ago', date: 'Earlier', services: ['Wheel Alignment'], technician: 'Sunita Sharma' },
  { type: 'payment', bookingId: 'BK001', customer: 'Rahul Mehra', vehicle: 'Honda City', user: 'Admin', desc: 'Payment received', time: '3 days ago', date: 'Earlier', services: ['Oil Change'], technician: 'Amit Kumar' },
];
const groupedActivity = [
  { date: 'Today', items: mockActivity.filter(a => a.date === 'Today') },
  { date: 'Yesterday', items: mockActivity.filter(a => a.date === 'Yesterday') },
  { date: 'Earlier', items: mockActivity.filter(a => a.date === 'Earlier') },
];
const fieldIconMap = {
  bookingId: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  date: <EventAvailableIcon fontSize="small" sx={{ mr: 1 }} />,
  time: <TimelineIcon fontSize="small" sx={{ mr: 1 }} />,
  customer: <PersonIcon fontSize="small" sx={{ mr: 1 }} />,
  vehicle: <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />,
  services: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  technician: <AssignmentIndIcon fontSize="small" sx={{ mr: 1 }} />,
  status: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  payment: <PaymentIcon fontSize="small" sx={{ mr: 1 }} />,
  amount: <PaymentIcon fontSize="small" sx={{ mr: 1 }} />,
  source: <SourceIcon fontSize="small" sx={{ mr: 1 }} />,
};

export default function GarageBookings() {
  const theme = useTheme();
  // State for dialogs, drawer, etc.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [drawerEdit, setDrawerEdit] = useState(false);
  const [drawerEditData, setDrawerEditData] = useState({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    vehicle: '',
    date: '',
    time: '',
    services: [],
    technician: '',
    status: 'Upcoming',
    payment: 'Unpaid',
    amount: '',
    source: '',
  });
  const [formError, setFormError] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'success' });
  const [bookings, setBookings] = useState(mockBookings);
  const [techDialogOpen, setTechDialogOpen] = useState(false);
  const [techAssignBookingId, setTechAssignBookingId] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [expandedTimelineCard, setExpandedTimelineCard] = useState(null);
  const handleExpandTimelineCard = (id) => setExpandedTimelineCard(expandedTimelineCard === id ? null : id);

  const handleView = (row) => {
    setDrawerData(row);
    setDrawerEdit(false);
    setDrawerOpen(true);
  };
  const handleEdit = (row) => {
    setDrawerData(row);
    setDrawerEdit(true);
    setDrawerEditData(row);
    setDrawerOpen(true);
  };
  const handleDrawerEditChange = (field, value) => {
    setDrawerEditData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDrawerEditSave = () => {
    setDrawerData(drawerEditData);
    setDrawerEdit(false);
  };
  const handleDrawerEditCancel = () => {
    setDrawerEdit(false);
    setDrawerEditData(drawerData);
  };

  const handleAddOpen = () => {
    setFormData({
      customer: '', vehicle: '', date: '', time: '', services: [], technician: '', status: 'Upcoming', payment: 'Unpaid', amount: '', source: ''
    });
    setFormError({});
    setAddDialogOpen(true);
  };
  const handleAddClose = () => setAddDialogOpen(false);
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  const validateForm = (data) => {
    let err = {};
    if (!data.customer) err.customer = 'Customer required';
    if (!data.vehicle) err.vehicle = 'Vehicle required';
    if (!data.date) err.date = 'Date required';
    if (!data.time) err.time = 'Time required';
    if (!data.services.length) err.services = 'At least one service required';
    if (!data.amount) err.amount = 'Amount required';
    if (!data.source) err.source = 'Source required';
    return err;
  };
  const handleAddBooking = () => {
    const err = validateForm(formData);
    if (Object.keys(err).length) { setFormError(err); return; }
    const newBooking = {
      id: Date.now(),
      bookingId: 'BK' + (bookings.length + 1).toString().padStart(3, '0'),
      ...formData,
    };
    setBookings([newBooking, ...bookings]);
    setSnackbar({ open: true, message: 'Booking added (mock)', color: 'success' });
    setAddDialogOpen(false);
  };

  const handleTechDialogOpen = (bookingId) => {
    setTechAssignBookingId(bookingId);
    setTechDialogOpen(true);
    setSelectedTech(null);
  };
  const handleTechDialogClose = () => {
    setTechDialogOpen(false);
    setTechAssignBookingId(null);
    setSelectedTech(null);
  };
  const handleAssignTechnician = () => {
    setBookings(bookings.map(b => b.id === techAssignBookingId ? { ...b, technician: selectedTech?.name || '' } : b));
    handleTechDialogClose();
  };

  const statusOrder = ['Upcoming', 'Completed', 'Cancelled', 'No-show'];
  const statusColors = {
    'Upcoming': 'info',
    'Completed': 'success',
    'Cancelled': 'error',
    'No-show': 'warning',
  };
  const paymentColors = {
    'Paid': 'success',
    'Unpaid': 'error',
  };
  const handleTimelineStatusAdvance = (id) => {
    setBookings(bookings.map(b => {
      if (b.id !== id) return b;
      const idx = statusOrder.indexOf(b.status);
      let newStatus = b.status;
      if (idx < statusOrder.length - 1) newStatus = statusOrder[idx + 1];
      return { ...b, status: newStatus };
    }));
  };
  const handleTimelineMarkPaid = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, payment: 'Paid' } : b));
  };
  const today = dayjs().format('YYYY-MM-DD');
  const timelineBookings = bookings.filter(b => b.date === today);

  // Group fields for drawer
  const groupFields = (data) => ([
    { group: 'Booking Info', fields: [ ['bookingId', data.bookingId], ['date', data.date], ['time', data.time], ['status', data.status], ['source', data.source] ] },
    { group: 'Customer Info', fields: [ ['customer', data.customer] ] },
    { group: 'Vehicle Info', fields: [ ['vehicle', data.vehicle] ] },
    { group: 'Service Info', fields: [ ['services', data.services && data.services.join(', ')] ] },
    { group: 'Technician', fields: [ ['technician', data.technician] ] },
    { group: 'Payment', fields: [ ['payment', data.payment], ['amount', data.amount] ] },
  ]);
  // (Scaffolded code will follow the plan above)
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, background: theme.palette.background.default, overflow: 'auto' }}>
        <Typography variant="h5" fontWeight={700} mb={3}>Garage Bookings Management</Typography>
        {/* Metrics Cards */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Total Bookings</Typography><Typography variant="h5" fontWeight={700}>48</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Upcoming</Typography><Typography variant="h5" fontWeight={700} color="info.main">8</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Completed</Typography><Typography variant="h5" fontWeight={700} color="success.main">32</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Cancellations</Typography><Typography variant="h5" fontWeight={700} color="error.main">4</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">No-shows</Typography><Typography variant="h5" fontWeight={700} color="warning.main">4</Typography></CardContent></Card></Grid>
        </Grid>
        {/* Quick Actions */}
        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleAddOpen}>Add Booking</Button>
          <Button variant="outlined" startIcon={<UploadFileIcon />}>Bulk Import</Button>
          <Button variant="outlined">Export</Button>
          <Button variant="outlined" startIcon={<AssignmentIndIcon color="info" />}>Assign Technician</Button>
          <Button variant="outlined" startIcon={<WhatsAppIcon color="success" />}>Send Reminder</Button>
        </Box>
        {/* Booking Timeline */}
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', mb: 3, pb: 1 }}>
          {timelineBookings.map((b) => (
            <Card key={b.id} sx={{ minWidth: 340, maxWidth: 400, flex: '0 0 auto', borderLeft: 4, borderColor: statusColors[b.status], boxShadow: 3, position: 'relative' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <TimelineIcon color="primary" />
                  <Typography variant="subtitle1" fontWeight={700}>{b.time}</Typography>
                  <Chip label={b.status} size="small" color={statusColors[b.status]} />
                  <Chip label={b.payment} size="small" color={paymentColors[b.payment]} icon={<PaymentIcon />} />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>{b.customer} - {b.vehicle}</Typography>
                <Box mt={1} mb={1} display="flex" gap={1} flexWrap="wrap">
                  {Array.isArray(b.services) && b.services.map((s, idx) => (
                    <Chip key={idx} label={s} size="small" color="info" />
                  ))}
                </Box>
                <Chip label={b.source} size="small" color="default" icon={<SourceIcon />} sx={{ mb: 1 }} />
                <Box display="flex" alignItems="center" gap={1} mt={1} mb={1}>
                  {b.technician ? (
                    <>
                      <Chip avatar={<Avatar>{b.technician.split(' ').map(n => n[0]).join('').toUpperCase()}</Avatar>} label={b.technician} color="success" size="small" />
                      <Button size="small" variant="outlined" onClick={() => handleTechDialogOpen(b.id)}>Edit</Button>
                    </>
                  ) : (
                    <Button size="small" variant="contained" color="info" onClick={() => handleTechDialogOpen(b.id)}>Assign Technician</Button>
                  )}
                </Box>
                <Box display="flex" gap={1} mt={1}>
                  {b.status !== 'Completed' && b.status !== 'Cancelled' && b.status !== 'No-show' && (
                    <Button size="small" variant="contained" color="success" onClick={() => handleTimelineStatusAdvance(b.id)}>
                      {b.status === 'Upcoming' ? 'Mark Completed' : b.status === 'Completed' ? 'Completed' : b.status === 'Cancelled' ? 'Cancelled' : 'No-show'}
                    </Button>
                  )}
                  {b.payment === 'Unpaid' && (
                    <Button size="small" variant="contained" color="warning" onClick={() => handleTimelineMarkPaid(b.id)}>Mark as Paid</Button>
                  )}
                  <Button size="small" variant="outlined" onClick={() => handleView(b)}>View Details</Button>
                </Box>
                {/* Payment Section */}
                {b.payment === 'Unpaid' && (
                  <Box mt={2} mb={1}>
                    <Chip label={`Amount Due: ₹${b.amount}`} color="error" size="small" icon={<PaymentIcon />} sx={{ mb: 1 }} />
                    <Box display="flex" gap={1} mt={1}>
                      <Tooltip title="UPI/Paytm QR"><IconButton><QrCodeIcon color="secondary" /></IconButton></Tooltip>
                    </Box>
                  </Box>
                )}
                {/* Contact Buttons */}
                <Box display="flex" gap={1} mt={1}>
                  <Tooltip title="WhatsApp"><IconButton><WhatsAppIcon color="success" /></IconButton></Tooltip>
                  <Tooltip title="SMS"><IconButton><SmsIcon color="info" /></IconButton></Tooltip>
                  <Tooltip title="Email"><IconButton><EmailIcon color="primary" /></IconButton></Tooltip>
                </Box>
                {/* Show More/Less */}
                <Button size="small" onClick={() => handleExpandTimelineCard(b.id)} sx={{ mt: 1, alignSelf: 'flex-start' }}>
                  {expandedTimelineCard === b.id ? 'Show Less' : 'Show More'}
                </Button>
                {expandedTimelineCard === b.id && (
                  <Box mt={1}>
                    <Typography variant="body2" color="text.secondary">Amount: ₹{b.amount}</Typography>
                    <Typography variant="body2" color="text.secondary">Payment: {b.payment}</Typography>
                    <Typography variant="body2" color="text.secondary">Source: {b.source}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
        {/* DataGrid Table */}
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>All Bookings</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={bookings}
                columns={[
                  { field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => (
                    <Box display="flex" gap={1}>
                      <Tooltip title="View Details"><IconButton onClick={() => handleView(params.row)}><PersonIcon /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton><DeleteIcon /></IconButton></Tooltip>
                      <Tooltip title="Assign Technician"><IconButton onClick={() => handleTechDialogOpen(params.row.id)}><AssignmentIndIcon color="info" /></IconButton></Tooltip>
                      <Tooltip title="Send Reminder"><IconButton><WhatsAppIcon color="success" /></IconButton></Tooltip>
                      <Tooltip title="Mark Completed"><IconButton><EventAvailableIcon color="success" /></IconButton></Tooltip>
                      <Tooltip title="Cancel"><IconButton><CancelIcon color="error" /></IconButton></Tooltip>
                    </Box>
                  ), sortable: false, filterable: false },
                  { field: 'bookingId', headerName: 'Booking ID', flex: 1 },
                  { field: 'date', headerName: 'Date', flex: 1 },
                  { field: 'time', headerName: 'Time', flex: 1 },
                  { field: 'customer', headerName: 'Customer', flex: 1 },
                  { field: 'vehicle', headerName: 'Vehicle', flex: 1 },
                  { field: 'services', headerName: 'Services', flex: 1.2, renderCell: (params) => params.value.map((s, idx) => <Chip key={idx} label={s} size="small" color="info" sx={{ mr: 0.5 }} />) },
                  { field: 'technician', headerName: 'Technician', flex: 1, renderCell: (params) => params.value ? <Chip avatar={<Avatar>{params.value.split(' ').map(n => n[0]).join('').toUpperCase()}</Avatar>} label={params.value} color="success" size="small" /> : <Chip label="Unassigned" color="warning" size="small" /> },
                  { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => <Chip label={params.value} color={params.value === 'Upcoming' ? 'info' : params.value === 'Completed' ? 'success' : params.value === 'Cancelled' ? 'error' : 'warning'} size="small" /> },
                  { field: 'payment', headerName: 'Payment', flex: 1, renderCell: (params) => params.value === 'Paid' ? <Chip label="Paid" color="success" size="small" icon={<PaymentIcon />} /> : <Chip label="Unpaid" color="error" size="small" icon={<PaymentIcon />} /> },
                  { field: 'amount', headerName: 'Amount (₹)', flex: 1 },
                  { field: 'source', headerName: 'Source', flex: 1, renderCell: (params) => <Chip label={params.value} color="default" size="small" icon={<SourceIcon />} /> },
                ]}
                checkboxSelection
                disableRowSelectionOnClick
                components={{ Toolbar: CustomTableToolbar }}
                componentsProps={{ toolbar: {
                  handleAdd: () => {},
                  handleExport: () => {},
                  handleDelete: () => {},
                  handleEdit: () => {},
                  handleDeleteSelected: () => {},
                }}}
              />
            </Box>
          </CardContent>
        </Card>
        {/* Recent Activity (at end) */}
        <Card sx={{ mt: 4, mb: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>Recent Activity</Typography>
            <Grid container spacing={2}>
              {groupedActivity.flatMap((grp) =>
                grp.items.map((act, idx) => (
                  <Grid item xs={12} md={6} key={grp.date + idx}>
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 3, mb: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>
                          {act.type === 'add' && <AddCircleIcon color="success" />}
                          {act.type === 'edit' && <EditIcon color="info" />}
                          {act.type === 'completed' && <EventAvailableIcon color="success" />}
                          {act.type === 'cancelled' && <CancelIcon color="error" />}
                          {act.type === 'payment' && <PaymentIcon color="primary" />}
                          <Chip label={act.type.charAt(0).toUpperCase() + act.type.slice(1)} size="small" color={
                            act.type === 'add' ? 'success' :
                            act.type === 'edit' ? 'info' :
                            act.type === 'completed' ? 'success' :
                            act.type === 'cancelled' ? 'error' :
                            act.type === 'payment' ? 'primary' : 'default'
                          } sx={{ textTransform: 'capitalize' }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary">{act.time}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Box sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                          {act.user.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </Box>
                        <Typography variant="body1" fontWeight={700}>{act.customer}</Typography>
                        <Chip label={act.vehicle} size="small" color="info" icon={<DirectionsCarIcon />} />
                        {act.technician && <Chip label={act.technician} size="small" color="success" icon={<AssignmentIndIcon />} />}
                        {act.services && act.services.map((s, i) => <Chip key={i} label={s} size="small" color="primary" />)}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1 }}>{act.desc}</Typography>
                    </Paper>
                  </Grid>
                ))
              )}
            </Grid>
          </CardContent>
        </Card>
        {/* Drawer, Dialogs, Snackbar would go here (scaffolded for now) */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 400, p: 2 } }}>
          <Box sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={700}>Booking Details</Typography>
              <Box display="flex" gap={1}>
                <Tooltip title="WhatsApp"><IconButton><WhatsAppIcon color="success" /></IconButton></Tooltip>
                <Tooltip title="SMS"><IconButton><SmsIcon color="info" /></IconButton></Tooltip>
                <Tooltip title="Email"><IconButton><EmailIcon color="primary" /></IconButton></Tooltip>
                <Tooltip title="Print"><IconButton><PrintIcon color="primary" /></IconButton></Tooltip>
                <Tooltip title="UPI/Paytm QR"><IconButton><QrCodeIcon color="secondary" /></IconButton></Tooltip>
              </Box>
            </Box>
            {drawerData && groupFields(drawerEdit ? drawerEditData : drawerData).map((grp) => (
              <Box key={grp.group} mb={2}>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>{grp.group}</Typography>
                <List>
                  {grp.fields.map(([key, value]) => (
                    <ListItem key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {fieldIconMap[key]}
                      <Typography variant="body2" fontWeight={600} sx={{ minWidth: 90, textTransform: 'capitalize' }}>{key}</Typography>
                      {drawerEdit ? (
                        <TextField size="small" value={value} onChange={e => handleDrawerEditChange(key, e.target.value)} sx={{ flex: 1 }} />
                      ) : (
                        <Typography variant="body2" color="text.secondary">{value}</Typography>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
            {drawerEdit ? (
              <Box display="flex" gap={2} mt={2}>
                <Button variant="contained" color="success" onClick={handleDrawerEditSave}>Save</Button>
                <Button variant="outlined" onClick={handleDrawerEditCancel}>Cancel</Button>
              </Box>
            ) : (
              <Box display="flex" gap={2} mt={2}>
                <Button variant="contained" onClick={() => setDrawerEdit(true)} startIcon={<EditIcon />}>Edit</Button>
                <Button variant="outlined" onClick={() => setDrawerOpen(false)}>Close</Button>
              </Box>
            )}
          </Box>
        </Drawer>
        <Dialog open={addDialogOpen} onClose={handleAddClose} maxWidth="xs" fullWidth>
          <DialogTitle>Add Booking</DialogTitle>
          <DialogContent>
            <TextField label="Customer" value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })} error={!!formError.customer} helperText={formError.customer} fullWidth margin="normal" />
            <TextField label="Vehicle" value={formData.vehicle} onChange={e => setFormData({ ...formData, vehicle: e.target.value })} error={!!formError.vehicle} helperText={formError.vehicle} fullWidth margin="normal" />
            <TextField label="Date" type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} error={!!formError.date} helperText={formError.date} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Time" type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} error={!!formError.time} helperText={formError.time} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <Autocomplete
              multiple
              options={[ 'Oil Change', 'AC Repair', 'PUC Renewal', 'Brake Check', 'Wheel Alignment', 'General Service' ]}
              value={formData.services}
              onChange={(_, value) => setFormData({ ...formData, services: value })}
              renderInput={(params) => <TextField {...params} label="Services" error={!!formError.services} helperText={formError.services} margin="normal" />}
            />
            <Autocomplete
              options={mockTechnicians}
              getOptionLabel={option => option.name}
              value={mockTechnicians.find(t => t.name === formData.technician) || null}
              onChange={(_, value) => setFormData({ ...formData, technician: value ? value.name : '' })}
              renderInput={(params) => <TextField {...params} label="Technician (optional)" margin="normal" />}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
            <TextField label="Amount (₹)" type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} error={!!formError.amount} helperText={formError.amount} fullWidth margin="normal" />
            <Autocomplete
              options={[ 'App', 'Walk-in', 'Phone', 'WhatsApp' ]}
              value={formData.source}
              onChange={(_, value) => setFormData({ ...formData, source: value || '' })}
              renderInput={(params) => <TextField {...params} label="Source" error={!!formError.source} helperText={formError.source} margin="normal" />}
              freeSolo
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddBooking}>Add</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={techDialogOpen} onClose={handleTechDialogClose} maxWidth="xs" fullWidth>
          <DialogTitle>Assign Technician</DialogTitle>
          <DialogContent>
            <Autocomplete
              options={mockTechnicians}
              getOptionLabel={option => option.name}
              value={selectedTech}
              onChange={(_, value) => setSelectedTech(value)}
              renderInput={(params) => <TextField {...params} label="Technician" fullWidth margin="normal" />}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTechDialogClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAssignTechnician} disabled={!selectedTech}>Assign</Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbar.message} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
      </Box>
    </Box>
  );
} 