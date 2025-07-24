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
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import PrintIcon from '@mui/icons-material/Print';
import QrCodeIcon from '@mui/icons-material/QrCode';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PaymentIcon from '@mui/icons-material/Payment';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip as ReTooltip, ResponsiveContainer, Legend } from 'recharts';
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';

// Mock Data
const mockVehicles = [
  { id: 1, reg: 'MH12AB1234', model: 'Honda City', brand: 'Honda', type: 'Car', owner: 'Rahul Mehra', lastService: '2024-05-20', nextService: '2024-11-20', pucExpiry: '2024-07-01', insuranceExpiry: '2024-08-15', status: 'Active' },
  { id: 2, reg: 'MH14XY5678', model: 'Suzuki Swift', brand: 'Suzuki', type: 'Car', owner: 'Sneha Patel', lastService: '2024-04-10', nextService: '2024-10-10', pucExpiry: '2024-05-30', insuranceExpiry: '2024-06-10', status: 'Due for Service' },
  { id: 3, reg: 'MH13CD4321', model: 'Royal Enfield', brand: 'Royal Enfield', type: 'Bike', owner: 'Amit Singh', lastService: '2024-03-15', nextService: '2024-09-15', pucExpiry: '2024-03-20', insuranceExpiry: '2024-09-20', status: 'Expired PUC' },
  { id: 4, reg: 'MH15EF8765', model: 'Hyundai i20', brand: 'Hyundai', type: 'Car', owner: 'Priya Sharma', lastService: '2024-06-01', nextService: '2024-12-01', pucExpiry: '2024-12-10', insuranceExpiry: '2024-12-20', status: 'Active' },
];
const vehicleTypeData = [
  { name: 'Car', value: 18 },
  { name: 'Bike', value: 10 },
  { name: 'SUV', value: 7 },
  { name: 'Other', value: 3 },
];
const serviceFrequency = [
  { model: 'Honda City', services: 8 },
  { model: 'Suzuki Swift', services: 5 },
  { model: 'Royal Enfield', services: 12 },
  { model: 'Hyundai i20', services: 7 },
];
const vehiclesAdded = [
  { month: 'Jan', added: 4 },
  { month: 'Feb', added: 6 },
  { month: 'Mar', added: 8 },
  { month: 'Apr', added: 10 },
  { month: 'May', added: 12 },
  { month: 'Jun', added: 5 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const mockActivity = [
  { type: 'add', vehicle: 'MH12AB1234', model: 'Honda City', user: 'Admin', desc: 'New vehicle added', time: '2 min ago', date: 'Today', owner: 'Rahul Mehra' },
  { type: 'service', vehicle: 'MH14XY5678', model: 'Suzuki Swift', user: 'Manager', desc: 'Service completed', time: '10 min ago', date: 'Today', owner: 'Sneha Patel' },
  { type: 'puc', vehicle: 'MH13CD4321', model: 'Royal Enfield', user: 'Admin', desc: 'PUC updated', time: '1 hr ago', date: 'Yesterday', owner: 'Amit Singh' },
  { type: 'insurance', vehicle: 'MH15EF8765', model: 'Hyundai i20', user: 'Admin', desc: 'Insurance renewed', time: '2 days ago', date: 'Earlier', owner: 'Priya Sharma' },
  { type: 'reminder', vehicle: 'MH14XY5678', model: 'Suzuki Swift', user: 'Admin', desc: 'Service reminder sent', time: '3 days ago', date: 'Earlier', owner: 'Sneha Patel' },
];
const groupedActivity = [
  { date: 'Today', items: mockActivity.filter(a => a.date === 'Today') },
  { date: 'Yesterday', items: mockActivity.filter(a => a.date === 'Yesterday') },
  { date: 'Earlier', items: mockActivity.filter(a => a.date === 'Earlier') },
];
const fieldIconMap = {
  reg: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  model: <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />,
  brand: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  type: <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />,
  owner: <PersonIcon fontSize="small" sx={{ mr: 1 }} />,
  lastService: <EventAvailableIcon fontSize="small" sx={{ mr: 1 }} />,
  nextService: <EventAvailableIcon fontSize="small" sx={{ mr: 1 }} />,
  pucExpiry: <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />,
  insuranceExpiry: <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />,
  status: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
};

// Add mock technicians
const mockTechnicians = [
  { id: 1, name: 'Amit Kumar' },
  { id: 2, name: 'Priya Singh' },
  { id: 3, name: 'Ravi Verma' },
  { id: 4, name: 'Sunita Sharma' },
];

// Add mock data for arriving/queued vehicles
const mockArrivingVehicles = [
  { id: 101, reg: 'MH12ZZ9999', model: 'Maruti Alto', owner: 'Vikas Joshi', arrival: '5 min ago', services: ['Oil Change', 'Brake Check'], type: 'Car', status: 'Waiting', paymentStatus: 'Unpaid', amountDue: 1200, lastService: '2023-12-01', nextService: '2024-06-01', pucExpiry: '2024-07-01', insuranceExpiry: '2024-08-15', contact: '9876543210', technician: null },
  { id: 102, reg: 'MH14AA8888', model: 'Bajaj Pulsar', owner: 'Ritu Sharma', arrival: '10 min ago', services: ['PUC Renewal'], type: 'Bike', status: 'In Bay', paymentStatus: 'Unpaid', amountDue: 300, lastService: '2023-11-10', nextService: '2024-05-10', pucExpiry: '2024-05-30', insuranceExpiry: '2024-06-10', contact: '9123456780', technician: 'Amit Kumar' },
  { id: 103, reg: 'MH13BB7777', model: 'Hyundai Creta', owner: 'Suresh Patil', arrival: '2 min ago', services: ['AC Repair', 'Wheel Alignment'], type: 'SUV', status: 'Work Started', paymentStatus: 'Paid', amountDue: 0, lastService: '2024-01-15', nextService: '2024-07-15', pucExpiry: '2024-03-20', insuranceExpiry: '2024-09-20', contact: '9988776655', technician: 'Priya Singh' },
];

export default function GarageVehicles() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [drawerEdit, setDrawerEdit] = useState(false);
  const [drawerEditData, setDrawerEditData] = useState({});
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'success' });
  const [formData, setFormData] = useState({ reg: '', model: '', brand: '', type: '', owner: '', lastService: '', nextService: '', pucExpiry: '', insuranceExpiry: '', status: 'Active' });
  const [formError, setFormError] = useState({});
  const [expandedIdx, setExpandedIdx] = useState(null);
  const handleExpandClick = (idx) => setExpandedIdx(expandedIdx === idx ? null : idx);
  const [arrivingVehicles, setArrivingVehicles] = useState(mockArrivingVehicles);
  const statusOrder = ['Waiting', 'In Bay', 'Work Started', 'Completed', 'Payment Pending', 'Paid'];
  const statusColors = {
    'Waiting': 'warning',
    'In Bay': 'info',
    'Work Started': 'primary',
    'Completed': 'success',
    'Payment Pending': 'error',
    'Paid': 'success',
  };
  const [expandedCard, setExpandedCard] = useState(null);
  const handleExpandCard = (id) => setExpandedCard(expandedCard === id ? null : id);
  const handleStatusAdvance = (id) => {
    setArrivingVehicles(arrivingVehicles.map(v => {
      if (v.id !== id) return v;
      const idx = statusOrder.indexOf(v.status);
      let newStatus = v.status;
      if (idx < statusOrder.length - 1) newStatus = statusOrder[idx + 1];
      // If moving to Payment Pending, set paymentStatus to Unpaid
      let paymentStatus = v.paymentStatus;
      if (newStatus === 'Payment Pending') paymentStatus = 'Unpaid';
      if (newStatus === 'Paid') paymentStatus = 'Paid';
      return { ...v, status: newStatus, paymentStatus };
    }));
  };
  const handleMarkPaid = (id) => {
    setArrivingVehicles(arrivingVehicles.map(v => v.id === id ? { ...v, paymentStatus: 'Paid', status: 'Paid', amountDue: 0 } : v));
  };

  const handleView = (row) => { setDrawerData(row); setDrawerEdit(false); setDrawerOpen(true); };
  const handleEdit = (row) => { setDrawerData(row); setDrawerEdit(true); setDrawerEditData(row); setDrawerOpen(true); };
  const handleDelete = (row) => { setSnackbar({ open: true, message: 'Deleted (mock)', color: 'error' }); };
  const handleDrawerEditChange = (field, value) => { setDrawerEditData((prev) => ({ ...prev, [field]: value })); };
  const handleDrawerEditSave = () => { setDrawerData(drawerEditData); setDrawerEdit(false); setSnackbar({ open: true, message: 'Saved (mock)', color: 'success' }); };
  const handleDrawerEditCancel = () => { setDrawerEdit(false); setDrawerEditData(drawerData); };
  const handleAddOpen = () => { setFormData({ reg: '', model: '', brand: '', type: '', owner: '', lastService: '', nextService: '', pucExpiry: '', insuranceExpiry: '', status: 'Active' }); setFormError({}); setAddDialogOpen(true); };
  const handleAddClose = () => setAddDialogOpen(false);
  const handleBulkOpen = () => setBulkDialogOpen(true);
  const handleBulkClose = () => setBulkDialogOpen(false);
  const handleReminderOpen = () => setReminderDialogOpen(true);
  const handleReminderClose = () => setReminderDialogOpen(false);
  const handleAssignOpen = () => setAssignDialogOpen(true);
  const handleAssignClose = () => setAssignDialogOpen(false);
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  const validateForm = (data) => { let err = {}; if (!data.reg) err.reg = 'Reg. Number required'; if (!data.model) err.model = 'Model required'; if (!data.brand) err.brand = 'Brand required'; if (!data.type) err.type = 'Type required'; if (!data.owner) err.owner = 'Owner required'; return err; };
  const handleAddVehicle = () => { const err = validateForm(formData); if (Object.keys(err).length) { setFormError(err); return; } setSnackbar({ open: true, message: 'Vehicle added (mock)', color: 'success' }); setAddDialogOpen(false); };
  const handleExport = () => { setSnackbar({ open: true, message: 'Exported as CSV (mock)', color: 'info' }); };
  const groupFields = (data) => ([
    { group: 'Vehicle Info', fields: [ ['reg', data.reg], ['model', data.model], ['brand', data.brand], ['type', data.type] ] },
    { group: 'Owner Info', fields: [ ['owner', data.owner] ] },
    { group: 'Service/PUC/Insurance', fields: [ ['lastService', data.lastService], ['nextService', data.nextService], ['pucExpiry', data.pucExpiry], ['insuranceExpiry', data.insuranceExpiry] ] },
    { group: 'Status', fields: [ ['status', data.status] ] },
  ]);
  const columns = [
    { field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => (
      <Box display="flex" gap={1}>
        <Tooltip title="View Details"><IconButton onClick={() => handleView(params.row)}><DirectionsCarIcon /></IconButton></Tooltip>
        <Tooltip title="Edit"><IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton></Tooltip>
        <Tooltip title="Delete"><IconButton onClick={() => handleDelete(params.row)}><DeleteIcon /></IconButton></Tooltip>
        <Tooltip title="Send Reminder"><IconButton onClick={handleReminderOpen}><WarningAmberIcon color="warning" /></IconButton></Tooltip>
        <Tooltip title="Assign to Customer"><IconButton onClick={handleAssignOpen}><AssignmentIndIcon color="info" /></IconButton></Tooltip>
      </Box>
    ), sortable: false, filterable: false },
    { field: 'reg', headerName: 'Reg. Number', flex: 1 },
    { field: 'model', headerName: 'Model', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'owner', headerName: 'Owner', flex: 1 },
    { field: 'lastService', headerName: 'Last Service', flex: 1 },
    { field: 'nextService', headerName: 'Next Service Due', flex: 1 },
    { field: 'pucExpiry', headerName: 'PUC Expiry', flex: 1, renderCell: (params) => <Chip label={params.value} color={new Date(params.value) < new Date() ? 'error' : 'success'} size="small" icon={<WarningAmberIcon />} /> },
    { field: 'insuranceExpiry', headerName: 'Insurance Expiry', flex: 1, renderCell: (params) => <Chip label={params.value} color={new Date(params.value) < new Date() ? 'error' : 'success'} size="small" icon={<WarningAmberIcon />} /> },
    { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => <Chip label={params.value} color={params.value === 'Active' ? 'success' : params.value === 'Due for Service' ? 'warning' : 'error'} size="small" /> },
  ];

  const [techDialogOpen, setTechDialogOpen] = useState(false);
  const [techAssignVehicleId, setTechAssignVehicleId] = useState(null);
  const [techSearch, setTechSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  const handleTechDialogOpen = (vehicleId) => {
    setTechAssignVehicleId(vehicleId);
    setTechDialogOpen(true);
    setSelectedTech(null);
  };
  const handleTechDialogClose = () => {
    setTechDialogOpen(false);
    setTechAssignVehicleId(null);
    setSelectedTech(null);
  };
  const handleAssignTechnician = () => {
    setArrivingVehicles(arrivingVehicles.map(v => v.id === techAssignVehicleId ? { ...v, technician: selectedTech?.name || null } : v));
    handleTechDialogClose();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, background: theme.palette.background.default, overflow: 'auto' }}>
        <Typography variant="h5" fontWeight={700} mb={3}>Garage Vehicles Management</Typography>
        {/* Metrics */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Total Vehicles</Typography><Typography variant="h5" fontWeight={700}>38</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Active</Typography><Typography variant="h5" fontWeight={700} color="success.main">28</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Due for Service</Typography><Typography variant="h5" fontWeight={700} color="warning.main">6</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Expired PUC/Insurance</Typography><Typography variant="h5" fontWeight={700} color="error.main">2</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Unique Customers</Typography><Typography variant="h5" fontWeight={700} color="info.main">18</Typography></CardContent></Card></Grid>
        </Grid>
        {/* Quick Actions */}
        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleAddOpen}>Add Vehicle</Button>
          <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={handleBulkOpen}>Bulk Import</Button>
          <Button variant="outlined" onClick={handleExport}>Export</Button>
          <Button variant="outlined" startIcon={<WarningAmberIcon color="warning" />} onClick={handleReminderOpen}>Bulk Reminder</Button>
          <Button variant="outlined" startIcon={<AssignmentIndIcon color="info" />} onClick={handleAssignOpen}>Assign to Customer</Button>
        </Box>
        {/* Charts */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={4}><Card><CardContent><Typography variant="subtitle2" mb={2}>Vehicles by Type</Typography><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={vehicleTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>{vehicleTypeData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}</Pie><Legend /><ReTooltip /></PieChart></ResponsiveContainer></CardContent></Card></Grid>
          <Grid item xs={12} md={4}><Card><CardContent><Typography variant="subtitle2" mb={2}>Service Frequency by Model</Typography><ResponsiveContainer width="100%" height={180}><BarChart data={serviceFrequency}><XAxis dataKey="model" /><YAxis /><Bar dataKey="services" fill="#8884d8" /><ReTooltip /><Legend /></BarChart></ResponsiveContainer></CardContent></Card></Grid>
          <Grid item xs={12} md={4}><Card><CardContent><Typography variant="subtitle2" mb={2}>Vehicles Added per Month</Typography><ResponsiveContainer width="100%" height={180}><LineChart data={vehiclesAdded}><XAxis dataKey="month" /><YAxis /><Line type="monotone" dataKey="added" stroke="#00C49F" strokeWidth={2} /><ReTooltip /><Legend /></LineChart></ResponsiveContainer></CardContent></Card></Grid>
        </Grid>
        {/* Vehicles Arriving/Queued for Service */}
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', mb: 3, pb: 1 }}>
          {arrivingVehicles.map((v) => (
            <Card key={v.id} sx={{ minWidth: 320, maxWidth: 360, flex: '0 0 auto', borderLeft: 4, borderColor: statusColors[v.status], boxShadow: 3, position: 'relative' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <DirectionsCarIcon color="primary" />
                  <Typography variant="subtitle1" fontWeight={700}>{v.reg}</Typography>
                  <Chip label={v.type} size="small" color={v.type === 'Car' ? 'primary' : v.type === 'Bike' ? 'secondary' : 'info'} />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>{v.model} - {v.owner}</Typography>
                <Typography variant="caption" color="text.secondary">Arrived: {v.arrival}</Typography>
                <Box mt={1} mb={1} display="flex" gap={1} flexWrap="wrap">
                  {v.services.map((s, idx) => (
                    <Chip key={idx} label={s} size="small" color="info" />
                  ))}
                </Box>
                <Chip label={v.status} size="small" color={statusColors[v.status]} sx={{ mb: 1 }} />
                <Box display="flex" gap={1} mt={1}>
                  {v.status !== 'Paid' && v.status !== 'Completed' && (
                    <Button size="small" variant="contained" color="success" onClick={() => handleStatusAdvance(v.id)}>
                      {v.status === 'Waiting' ? 'Move to In Bay' : v.status === 'In Bay' ? 'Start Work' : v.status === 'Work Started' ? 'Complete' : v.status === 'Payment Pending' ? 'Mark as Paid' : 'Next'}
                    </Button>
                  )}
                  <Button size="small" variant="outlined" onClick={() => handleView(v)}>View Details</Button>
                </Box>
                {/* Payment Section */}
                {v.status === 'Payment Pending' && (
                  <Box mt={2} mb={1}>
                    <Chip label={`Amount Due: ₹${v.amountDue}`} color="error" size="small" icon={<PaymentIcon />} sx={{ mb: 1 }} />
                    <Box display="flex" gap={1} mt={1}>
                      <Button size="small" variant="contained" color="success" onClick={() => handleMarkPaid(v.id)}>Mark as Paid</Button>
                      <Tooltip title="UPI/Paytm QR"><IconButton><QrCodeIcon color="secondary" /></IconButton></Tooltip>
                    </Box>
                  </Box>
                )}
                {/* Contact Buttons */}
                <Box display="flex" gap={1} mt={1}>
                  <Tooltip title="WhatsApp"><IconButton><WhatsAppIcon color="success" /></IconButton></Tooltip>
                  <Tooltip title="SMS"><IconButton><SmsIcon color="info" /></IconButton></Tooltip>
                </Box>
                {/* Technician assignment */}
                <Box display="flex" alignItems="center" gap={1} mt={1} mb={1}>
                  {v.technician ? (
                    <>
                      <Chip avatar={<Avatar>{v.technician.split(' ').map(n => n[0]).join('').toUpperCase()}</Avatar>} label={v.technician} color="success" size="small" />
                      <Button size="small" variant="outlined" onClick={() => handleTechDialogOpen(v.id)}>Edit</Button>
                    </>
                  ) : (
                    <Button size="small" variant="contained" color="info" onClick={() => handleTechDialogOpen(v.id)}>Assign Technician</Button>
                  )}
                </Box>
                {/* Show More/Less */}
                <Button size="small" onClick={() => handleExpandCard(v.id)} sx={{ mt: 1, alignSelf: 'flex-start' }}>
                  {expandedCard === v.id ? 'Show Less' : 'Show More'}
                </Button>
                {expandedCard === v.id && (
                  <Box mt={1}>
                    <Typography variant="body2" color="text.secondary">Last Service: {v.lastService || '-'}</Typography>
                    <Typography variant="body2" color="text.secondary">Next Service: {v.nextService || '-'}</Typography>
                    <Typography variant="body2" color="text.secondary">PUC Expiry: {v.pucExpiry || '-'}</Typography>
                    <Typography variant="body2" color="text.secondary">Insurance Expiry: {v.insuranceExpiry || '-'}</Typography>
                    <Typography variant="body2" color="text.secondary">Contact: {v.contact}</Typography>
                    <Typography variant="body2" color="text.secondary">Payment Status: {v.paymentStatus}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
        {/* DataGrid Table */}
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>All Vehicles</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={mockVehicles}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(ids) => setSelectedIDs(ids)}
                components={{ Toolbar: CustomTableToolbar }}
                componentsProps={{ toolbar: {
                  selectedIDs,
                  handleDelete: (row) => handleDelete(row),
                  handleAdd: handleAddOpen,
                  handleEdit: (row) => handleEdit(row),
                  handleDeleteSelected: () => setSnackbar({ open: true, message: 'Deleted selected (mock)', color: 'error' }),
                  handleExport,
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
                          {act.type === 'service' && <EventAvailableIcon color="primary" />}
                          {act.type === 'puc' && <WarningAmberIcon color="warning" />}
                          {act.type === 'insurance' && <PaymentIcon color="info" />}
                          {act.type === 'reminder' && <SmsIcon color="secondary" />}
                          <Chip label={act.type.charAt(0).toUpperCase() + act.type.slice(1)} size="small" color={
                            act.type === 'add' ? 'success' :
                            act.type === 'service' ? 'primary' :
                            act.type === 'puc' ? 'warning' :
                            act.type === 'insurance' ? 'info' :
                            act.type === 'reminder' ? 'secondary' : 'default'
                          } sx={{ textTransform: 'capitalize' }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary">{act.time}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Box sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                          {act.user.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </Box>
                        <Typography variant="body1" fontWeight={700}>{act.vehicle}</Typography>
                        <Chip label={act.model} size="small" color="info" icon={<DirectionsCarIcon />} />
                        <Chip label={act.owner} size="small" color="default" icon={<PersonIcon />} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1, display: '-webkit-box', WebkitLineClamp: expandedIdx === idx ? 'none' : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {act.desc}
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {act.type === 'puc' && <Chip label="PUC Updated" color="warning" size="small" icon={<WarningAmberIcon />} />}
                        {act.type === 'insurance' && <Chip label="Insurance Renewed" color="info" size="small" icon={<PaymentIcon />} />}
                        {act.type === 'reminder' && <Chip label="Reminder Sent" color="secondary" size="small" icon={<SmsIcon />} />}
                        {act.type === 'service' && <Chip label="Service Completed" color="primary" size="small" icon={<EventAvailableIcon />} />}
                      </Box>
                      {act.desc && act.desc.length > 60 && (
                        <Button size="small" onClick={() => handleExpandClick(idx)} sx={{ mt: 1, alignSelf: 'flex-start' }}>
                          {expandedIdx === idx ? 'Show Less' : 'Show More'}
                        </Button>
                      )}
                    </Paper>
                  </Grid>
                ))
              )}
            </Grid>
          </CardContent>
        </Card>
        {/* Drawer for details */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 400, p: 2 } }}>
          <Box sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={700}>Vehicle Details</Typography>
              <Box display="flex" gap={1}>
                <Tooltip title="WhatsApp"><IconButton><WhatsAppIcon color="success" /></IconButton></Tooltip>
                <Tooltip title="SMS"><IconButton><SmsIcon color="info" /></IconButton></Tooltip>
                <Tooltip title="Print"><IconButton><PrintIcon color="primary" /></IconButton></Tooltip>
                <Tooltip title="PUC/Insurance Reminder"><IconButton><WarningAmberIcon color="warning" /></IconButton></Tooltip>
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
        {/* Add/Edit Vehicle Dialog */}
        <Dialog open={addDialogOpen} onClose={handleAddClose} maxWidth="xs" fullWidth>
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogContent>
            <TextField label="Reg. Number" value={formData.reg} onChange={e => setFormData({ ...formData, reg: e.target.value })} error={!!formError.reg} helperText={formError.reg} fullWidth margin="normal" />
            <TextField label="Model" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} error={!!formError.model} helperText={formError.model} fullWidth margin="normal" />
            <TextField label="Brand" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} error={!!formError.brand} helperText={formError.brand} fullWidth margin="normal" />
            <TextField label="Type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} error={!!formError.type} helperText={formError.type} fullWidth margin="normal" />
            <TextField label="Owner" value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })} error={!!formError.owner} helperText={formError.owner} fullWidth margin="normal" />
            <TextField label="Last Service" value={formData.lastService} onChange={e => setFormData({ ...formData, lastService: e.target.value })} fullWidth margin="normal" />
            <TextField label="Next Service Due" value={formData.nextService} onChange={e => setFormData({ ...formData, nextService: e.target.value })} fullWidth margin="normal" />
            <TextField label="PUC Expiry" value={formData.pucExpiry} onChange={e => setFormData({ ...formData, pucExpiry: e.target.value })} fullWidth margin="normal" />
            <TextField label="Insurance Expiry" value={formData.insuranceExpiry} onChange={e => setFormData({ ...formData, insuranceExpiry: e.target.value })} fullWidth margin="normal" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddVehicle}>Add</Button>
          </DialogActions>
        </Dialog>
        {/* Bulk Import Dialog */}
        <Dialog open={bulkDialogOpen} onClose={handleBulkClose} maxWidth="xs" fullWidth>
          <DialogTitle>Bulk Import Vehicles</DialogTitle>
          <DialogContent>
            <Button variant="outlined" startIcon={<UploadFileIcon />}>Upload CSV (mock)</Button>
            <Typography variant="body2" color="text.secondary" mt={2}>Only .csv files allowed. Max 100 vehicles per upload.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBulkClose}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Bulk Reminder Dialog */}
        <Dialog open={reminderDialogOpen} onClose={handleReminderClose} maxWidth="xs" fullWidth>
          <DialogTitle>Bulk Reminder</DialogTitle>
          <DialogContent>
            <TextField label="Reminder Message" multiline rows={4} fullWidth margin="normal" />
            <Typography variant="body2" color="text.secondary">Send PUC/Insurance/Service reminders to selected vehicles (mock).</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReminderClose}>Close</Button>
            <Button variant="contained" onClick={() => { setSnackbar({ open: true, message: 'Reminder sent (mock)', color: 'success' }); setReminderDialogOpen(false); }}>Send</Button>
          </DialogActions>
        </Dialog>
        {/* Assign to Customer Dialog */}
        <Dialog open={assignDialogOpen} onClose={handleAssignClose} maxWidth="xs" fullWidth>
          <DialogTitle>Assign to Customer</DialogTitle>
          <DialogContent>
            <TextField label="Customer Name" fullWidth margin="normal" />
            <Typography variant="body2" color="text.secondary">Assign this vehicle to a customer (mock).</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAssignClose}>Close</Button>
            <Button variant="contained" onClick={() => { setSnackbar({ open: true, message: 'Assigned (mock)', color: 'success' }); setAssignDialogOpen(false); }}>Assign</Button>
          </DialogActions>
        </Dialog>
        {/* Technician Assignment Dialog */}
        <Dialog open={techDialogOpen} onClose={handleTechDialogClose} maxWidth="xs" fullWidth>
          <DialogTitle>Assign Technician</DialogTitle>
          <DialogContent>
            <Autocomplete
              options={mockTechnicians}
              getOptionLabel={(option) => option.name}
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
        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbar.message} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
      </Box>
    </Box>
  );
} 