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
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import PrintIcon from '@mui/icons-material/Print';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip as ReTooltip, ResponsiveContainer, Legend } from 'recharts';
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';

// Mock Data
const mockCustomers = [
  { id: 1, name: 'Rahul Mehra', phone: '9876543210', email: 'rahul.mehra@example.com', vehicles: 'Honda City', lastVisit: '2024-06-01', totalVisits: 8, outstanding: 0, loyalty: 'Gold', feedback: 4.5 },
  { id: 2, name: 'Sneha Patel', phone: '9123456780', email: 'sneha.patel@example.com', vehicles: 'Suzuki Swift', lastVisit: '2024-05-28', totalVisits: 5, outstanding: 500, loyalty: 'Silver', feedback: 4.0 },
  { id: 3, name: 'Amit Singh', phone: '9988776655', email: 'amit.singh@example.com', vehicles: 'Hyundai i20, Royal Enfield', lastVisit: '2024-05-30', totalVisits: 12, outstanding: 0, loyalty: 'Platinum', feedback: 5.0 },
  { id: 4, name: 'Priya Sharma', phone: '9876501234', email: 'priya.sharma@example.com', vehicles: 'Hero Splendor', lastVisit: '2024-05-25', totalVisits: 3, outstanding: 200, loyalty: 'None', feedback: 3.5 },
];
const vehicleTypeData = [
  { name: 'Car', value: 18 },
  { name: 'Bike', value: 10 },
  { name: 'SUV', value: 7 },
  { name: 'Other', value: 3 },
];
const visitsPerMonth = [
  { month: 'Jan', visits: 12 },
  { month: 'Feb', visits: 15 },
  { month: 'Mar', visits: 18 },
  { month: 'Apr', visits: 20 },
  { month: 'May', visits: 22 },
  { month: 'Jun', visits: 10 },
];
const revenueTrend = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 20000 },
  { month: 'May', revenue: 22000 },
  { month: 'Jun', revenue: 10000 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const mockActivity = [
  { type: 'add', customer: 'Rahul Mehra', vehicle: 'Honda City', user: 'Admin', desc: 'New customer registered', time: '2 min ago', date: 'Today' },
  { type: 'edit', customer: 'Sneha Patel', vehicle: 'Suzuki Swift', user: 'Manager', desc: 'Profile updated', time: '10 min ago', date: 'Today' },
  { type: 'payment', customer: 'Priya Sharma', vehicle: 'Hero Splendor', user: 'Admin', desc: 'Outstanding payment received', time: '1 hr ago', date: 'Yesterday' },
  { type: 'loyalty', customer: 'Amit Singh', vehicle: 'Hyundai i20', user: 'Admin', desc: 'Upgraded to Platinum', time: '2 days ago', date: 'Earlier' },
  { type: 'feedback', customer: 'Sneha Patel', vehicle: 'Suzuki Swift', user: 'Admin', desc: 'Feedback submitted', time: '3 days ago', date: 'Earlier' },
];
const groupedActivity = [
  { date: 'Today', items: mockActivity.filter(a => a.date === 'Today') },
  { date: 'Yesterday', items: mockActivity.filter(a => a.date === 'Yesterday') },
  { date: 'Earlier', items: mockActivity.filter(a => a.date === 'Earlier') },
];
const fieldIconMap = {
  name: <PersonIcon fontSize="small" sx={{ mr: 1 }} />,
  phone: <PhoneIcon fontSize="small" sx={{ mr: 1 }} />,
  email: <EmailIcon fontSize="small" sx={{ mr: 1 }} />,
  vehicles: <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />,
  lastVisit: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  totalVisits: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  outstanding: <QrCodeIcon fontSize="small" sx={{ mr: 1 }} />,
  loyalty: <LoyaltyIcon fontSize="small" sx={{ mr: 1 }} />,
  feedback: <FeedbackIcon fontSize="small" sx={{ mr: 1 }} />,
};

export default function GarageCustomerManagement() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [drawerEdit, setDrawerEdit] = useState(false);
  const [drawerEditData, setDrawerEditData] = useState({});
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [loyaltyDialogOpen, setLoyaltyDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'success' });
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', vehicles: '', loyalty: 'None' });
  const [formError, setFormError] = useState({});
  // Add state for expanded activity
  const [expandedIdx, setExpandedIdx] = useState(null);
  const handleExpandClick = (idx) => setExpandedIdx(expandedIdx === idx ? null : idx);

  const handleView = (row) => { setDrawerData(row); setDrawerEdit(false); setDrawerOpen(true); };
  const handleEdit = (row) => { setDrawerData(row); setDrawerEdit(true); setDrawerEditData(row); setDrawerOpen(true); };
  const handleDelete = (row) => { setSnackbar({ open: true, message: 'Deleted (mock)', color: 'error' }); };
  const handleDrawerEditChange = (field, value) => { setDrawerEditData((prev) => ({ ...prev, [field]: value })); };
  const handleDrawerEditSave = () => { setDrawerData(drawerEditData); setDrawerEdit(false); setSnackbar({ open: true, message: 'Saved (mock)', color: 'success' }); };
  const handleDrawerEditCancel = () => { setDrawerEdit(false); setDrawerEditData(drawerData); };
  const handleAddOpen = () => { setFormData({ name: '', phone: '', email: '', vehicles: '', loyalty: 'None' }); setFormError({}); setAddDialogOpen(true); };
  const handleAddClose = () => setAddDialogOpen(false);
  const handleBulkOpen = () => setBulkDialogOpen(true);
  const handleBulkClose = () => setBulkDialogOpen(false);
  const handleMessageOpen = () => setMessageDialogOpen(true);
  const handleMessageClose = () => setMessageDialogOpen(false);
  const handleLoyaltyOpen = () => setLoyaltyDialogOpen(true);
  const handleLoyaltyClose = () => setLoyaltyDialogOpen(false);
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  const validateForm = (data) => { let err = {}; if (!data.name) err.name = 'Name required'; if (!data.phone) err.phone = 'Phone required'; if (!data.email) err.email = 'Email required'; if (!data.vehicles) err.vehicles = 'Vehicle required'; return err; };
  const handleAddCustomer = () => { const err = validateForm(formData); if (Object.keys(err).length) { setFormError(err); return; } setSnackbar({ open: true, message: 'Customer added (mock)', color: 'success' }); setAddDialogOpen(false); };
  const handleExport = () => { setSnackbar({ open: true, message: 'Exported as CSV (mock)', color: 'info' }); };
  const groupFields = (data) => ([
    { group: 'Personal', fields: [ ['name', data.name], ['loyalty', data.loyalty] ] },
    { group: 'Contact', fields: [ ['phone', data.phone], ['email', data.email] ] },
    { group: 'Vehicle Info', fields: [ ['vehicles', data.vehicles], ['lastVisit', data.lastVisit], ['totalVisits', data.totalVisits] ] },
    { group: 'Financial', fields: [ ['outstanding', data.outstanding] ] },
    { group: 'Feedback', fields: [ ['feedback', data.feedback] ] },
  ]);
  const columns = [
    { field: 'actions', headerName: 'Actions', width: 180, renderCell: (params) => (
      <Box display="flex" gap={1}>
        <Tooltip title="View Details"><IconButton onClick={() => handleView(params.row)}><PersonIcon /></IconButton></Tooltip>
        <Tooltip title="Edit"><IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton></Tooltip>
        <Tooltip title="Delete"><IconButton onClick={() => handleDelete(params.row)}><DeleteIcon /></IconButton></Tooltip>
        <Tooltip title="Send WhatsApp"><IconButton><WhatsAppIcon color="success" /></IconButton></Tooltip>
        <Tooltip title="Send SMS"><IconButton><SmsIcon color="info" /></IconButton></Tooltip>
        <Tooltip title="Assign Loyalty"><IconButton onClick={handleLoyaltyOpen}><LoyaltyIcon color="warning" /></IconButton></Tooltip>
      </Box>
    ), sortable: false, filterable: false },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.2 },
    { field: 'vehicles', headerName: 'Vehicles', flex: 1.2 },
    { field: 'lastVisit', headerName: 'Last Visit', flex: 1 },
    { field: 'totalVisits', headerName: 'Total Visits', flex: 1 },
    { field: 'outstanding', headerName: 'Outstanding (₹)', flex: 1, renderCell: (params) => params.value > 0 ? <Chip label={`₹${params.value}`} color="error" size="small" icon={<QrCodeIcon />} /> : <Chip label="0" color="success" size="small" /> },
    { field: 'loyalty', headerName: 'Loyalty', flex: 1, renderCell: (params) => <Chip label={params.value} color={params.value === 'Gold' ? 'warning' : params.value === 'Platinum' ? 'success' : params.value === 'Silver' ? 'info' : 'default'} size="small" icon={<LoyaltyIcon />} /> },
    { field: 'feedback', headerName: 'Feedback', flex: 1, renderCell: (params) => <Chip label={params.value} color="primary" size="small" icon={<FeedbackIcon />} /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, background: theme.palette.background.default, overflow: 'auto' }}>
        <Typography variant="h5" fontWeight={700} mb={3}>Garage Customer Management</Typography>
        {/* Metrics */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Total Customers</Typography><Typography variant="h5" fontWeight={700}>38</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Active</Typography><Typography variant="h5" fontWeight={700} color="success.main">28</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">New Signups</Typography><Typography variant="h5" fontWeight={700} color="info.main">6</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Outstanding Payments</Typography><Typography variant="h5" fontWeight={700} color="error.main">2</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={6} md={2.4}><Card><CardContent><Typography variant="subtitle2">Loyalty Members</Typography><Typography variant="h5" fontWeight={700} color="warning.main">12</Typography></CardContent></Card></Grid>
        </Grid>
        {/* Quick Actions */}
        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleAddOpen}>Add Customer</Button>
          <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={handleBulkOpen}>Bulk Import</Button>
          <Button variant="outlined" onClick={handleExport}>Export</Button>
          <Button variant="outlined" startIcon={<WhatsAppIcon color="success" />} onClick={handleMessageOpen}>Bulk WhatsApp</Button>
          <Button variant="outlined" startIcon={<SmsIcon color="info" />} onClick={handleMessageOpen}>Bulk SMS</Button>
        </Box>
        {/* Charts */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={4}><Card><CardContent><Typography variant="subtitle2" mb={2}>Customers by Vehicle Type</Typography><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={vehicleTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>{vehicleTypeData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}</Pie><Legend /><ReTooltip /></PieChart></ResponsiveContainer></CardContent></Card></Grid>
          <Grid item xs={12} md={4}><Card><CardContent><Typography variant="subtitle2" mb={2}>Visits per Month</Typography><ResponsiveContainer width="100%" height={180}><BarChart data={visitsPerMonth}><XAxis dataKey="month" /><YAxis /><Bar dataKey="visits" fill="#8884d8" /><ReTooltip /><Legend /></BarChart></ResponsiveContainer></CardContent></Card></Grid>
          <Grid item xs={12} md={4}><Card><CardContent><Typography variant="subtitle2" mb={2}>Revenue Trend</Typography><ResponsiveContainer width="100%" height={180}><LineChart data={revenueTrend}><XAxis dataKey="month" /><YAxis /><Line type="monotone" dataKey="revenue" stroke="#00C49F" strokeWidth={2} /><ReTooltip /><Legend /></LineChart></ResponsiveContainer></CardContent></Card></Grid>
        </Grid>
        {/* DataGrid Table */}
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>All Customers</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={mockCustomers}
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
                          {/* Icon */}
                          {act.type === 'add' && <AddCircleIcon color="success" />}
                          {act.type === 'edit' && <EditIcon color="info" />}
                          {act.type === 'payment' && <QrCodeIcon color="primary" />}
                          {act.type === 'loyalty' && <LoyaltyIcon color="warning" />}
                          {act.type === 'feedback' && <FeedbackIcon color="secondary" />}
                          {/* Action type chip */}
                          <Chip label={act.type.charAt(0).toUpperCase() + act.type.slice(1)} size="small" color={
                            act.type === 'add' ? 'success' :
                            act.type === 'edit' ? 'info' :
                            act.type === 'payment' ? 'primary' :
                            act.type === 'loyalty' ? 'warning' :
                            act.type === 'feedback' ? 'secondary' : 'default'
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
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1, display: '-webkit-box', WebkitLineClamp: expandedIdx === idx ? 'none' : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {act.desc}
                      </Typography>
                      {/* Extra info chips */}
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {act.type === 'payment' && <Chip label="Payment Received" color="primary" size="small" icon={<QrCodeIcon />} />}
                        {act.type === 'loyalty' && <Chip label="Loyalty Upgrade" color="warning" size="small" icon={<LoyaltyIcon />} />}
                        {act.type === 'feedback' && <Chip label="Feedback" color="secondary" size="small" icon={<FeedbackIcon />} />}
                      </Box>
                      {/* Show More/Less */}
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
              <Typography variant="h6" fontWeight={700}>Customer Details</Typography>
              <Box display="flex" gap={1}>
                <Tooltip title="WhatsApp"><IconButton><WhatsAppIcon color="success" /></IconButton></Tooltip>
                <Tooltip title="SMS"><IconButton><SmsIcon color="info" /></IconButton></Tooltip>
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
        {/* Add/Edit Customer Dialog */}
        <Dialog open={addDialogOpen} onClose={handleAddClose} maxWidth="xs" fullWidth>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <TextField label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} error={!!formError.name} helperText={formError.name} fullWidth margin="normal" />
            <TextField label="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} error={!!formError.phone} helperText={formError.phone} fullWidth margin="normal" />
            <TextField label="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} error={!!formError.email} helperText={formError.email} fullWidth margin="normal" />
            <TextField label="Vehicles" value={formData.vehicles} onChange={e => setFormData({ ...formData, vehicles: e.target.value })} error={!!formError.vehicles} helperText={formError.vehicles} fullWidth margin="normal" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddCustomer}>Add</Button>
          </DialogActions>
        </Dialog>
        {/* Bulk Import Dialog */}
        <Dialog open={bulkDialogOpen} onClose={handleBulkClose} maxWidth="xs" fullWidth>
          <DialogTitle>Bulk Import Customers</DialogTitle>
          <DialogContent>
            <Button variant="outlined" startIcon={<UploadFileIcon />}>Upload CSV (mock)</Button>
            <Typography variant="body2" color="text.secondary" mt={2}>Only .csv files allowed. Max 100 customers per upload.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBulkClose}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Bulk Messaging Dialog */}
        <Dialog open={messageDialogOpen} onClose={handleMessageClose} maxWidth="xs" fullWidth>
          <DialogTitle>Bulk Messaging</DialogTitle>
          <DialogContent>
            <TextField label="Message" multiline rows={4} fullWidth margin="normal" />
            <Typography variant="body2" color="text.secondary">Send WhatsApp/SMS to selected customers (mock).</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMessageClose}>Close</Button>
            <Button variant="contained" onClick={() => { setSnackbar({ open: true, message: 'Message sent (mock)', color: 'success' }); setMessageDialogOpen(false); }}>Send</Button>
          </DialogActions>
        </Dialog>
        {/* Assign Loyalty Dialog */}
        <Dialog open={loyaltyDialogOpen} onClose={handleLoyaltyClose} maxWidth="xs" fullWidth>
          <DialogTitle>Assign Loyalty Card</DialogTitle>
          <DialogContent>
            <TextField label="Loyalty Level" fullWidth margin="normal" />
            <Typography variant="body2" color="text.secondary">Assign loyalty card to customer (mock).</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoyaltyClose}>Close</Button>
            <Button variant="contained" onClick={() => { setSnackbar({ open: true, message: 'Loyalty assigned (mock)', color: 'success' }); setLoyaltyDialogOpen(false); }}>Assign</Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbar.message} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
      </Box>
    </Box>
  );
} 