import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Chip, IconButton, Snackbar, Avatar, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import InfoIcon from '@mui/icons-material/Info';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CakeIcon from '@mui/icons-material/Cake';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HotelIcon from '@mui/icons-material/Hotel';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';

const bookingTypes = [
  { label: 'All', value: 'all', icon: <RestaurantIcon /> },
  { label: 'Hostel', value: 'hostel', icon: <HotelIcon /> },
  { label: 'Personal', value: 'personal', icon: <EmojiPeopleIcon /> },
  { label: 'Birthday', value: 'birthday', icon: <CakeIcon /> },
  { label: 'Wedding', value: 'wedding', icon: <CelebrationIcon /> },
  { label: 'Corporate', value: 'corporate', icon: <BusinessCenterIcon /> },
  { label: 'Other', value: 'other', icon: <MoreHorizIcon /> },
];

const mockBookings = [
  {
    id: 1,
    type: 'hostel',
    person: { name: 'Amit Kumar', phone: '9876543210', email: 'amit@example.com' },
    date: '2024-06-10',
    status: 'active',
    menu: ['Paneer Butter Masala', 'Rice', 'Dal', 'Salad'],
  },
  {
    id: 2,
    type: 'personal',
    person: { name: 'Priya Singh', phone: '9123456780', email: 'priya@example.com' },
    date: '2024-06-11',
    status: 'completed',
    menu: ['Pasta', 'Garlic Bread', 'Soup'],
  },
  {
    id: 3,
    type: 'birthday',
    person: { name: 'Rahul Sharma', phone: '9988776655', email: 'rahul@example.com' },
    date: '2024-06-12',
    status: 'active',
    menu: ['Cake', 'Pizza', 'Cold Drinks'],
  },
  {
    id: 4,
    type: 'wedding',
    person: { name: 'Sunita Mehra', phone: '9001122334', email: 'sunita@example.com' },
    date: '2024-06-15',
    status: 'cancelled',
    menu: ['Paneer Tikka', 'Naan', 'Dal Makhani', 'Gulab Jamun'],
  },
  {
    id: 5,
    type: 'corporate',
    person: { name: 'Corporate HR', phone: '9112233445', email: 'hr@company.com' },
    date: '2024-06-18',
    status: 'completed',
    menu: ['Sandwich', 'Coffee', 'Cookies'],
  },
  {
    id: 6,
    type: 'other',
    person: { name: 'Vikas Jain', phone: '9871234567', email: 'vikas@example.com' },
    date: '2024-06-20',
    status: 'active',
    menu: ['Biryani', 'Raita', 'Papad'],
  },
];

const summaryCounters = [
  { label: 'Total Bookings', icon: <RestaurantIcon />, color: 'primary.main' },
  { label: 'Active', icon: <CheckCircleIcon />, color: 'success.main' },
  { label: 'Completed', icon: <FastfoodIcon />, color: 'secondary.main' },
  { label: 'Cancelled', icon: <CancelIcon />, color: 'error.main' },
  { label: 'Pending', icon: <MoreHorizIcon />, color: 'warning.main' },
  { label: 'Approved', icon: <CheckIcon />, color: 'info.main' },
];

export default function FoodCateringBookings() {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState('all');
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [infoDialogData, setInfoDialogData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteBooking, setDeleteBooking] = useState(null);
  const [bookings, setBookings] = useState(mockBookings);

  // Filter bookings by type
  const filteredBookings = selectedType === 'all' ? bookings : bookings.filter(b => b.type === selectedType);

  // Analytics
  const total = filteredBookings.length;
  const active = filteredBookings.filter(b => b.status === 'active').length;
  const completed = filteredBookings.filter(b => b.status === 'completed').length;
  const cancelled = filteredBookings.filter(b => b.status === 'cancelled').length;
  const pending = filteredBookings.filter(b => b.status === 'pending').length;
  const approved = filteredBookings.filter(b => b.status === 'approved').length;
  const summaryValues = [total, active, completed, cancelled, pending, approved];

  // Info dialog
  const handleInfoOpen = (booking) => {
    setInfoDialogData(booking);
    setInfoDialogOpen(true);
  };
  const handleInfoClose = () => setInfoDialogOpen(false);

  // Edit dialog
  const handleEditOpen = (booking) => {
    setEditBooking({ ...booking });
    setEditDialogOpen(true);
  };
  const handleEditClose = () => setEditDialogOpen(false);
  const handleEditSave = () => {
    setBookings(prev => prev.map(b => b.id === editBooking.id ? editBooking : b));
    setEditDialogOpen(false);
    setSnackbar({ open: true, message: 'Booking updated!', severity: 'success' });
  };

  // Delete dialog
  const handleDeleteOpen = (booking) => {
    setDeleteBooking(booking);
    setDeleteDialogOpen(true);
  };
  const handleDeleteClose = () => setDeleteDialogOpen(false);
  const handleDeleteConfirm = () => {
    setBookings(prev => prev.filter(b => b.id !== deleteBooking.id));
    setDeleteDialogOpen(false);
    setSnackbar({ open: true, message: 'Booking deleted!', severity: 'info' });
  };

  // Approve action
  const handleApprove = (booking) => {
    setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'approved' } : b));
    setSnackbar({ open: true, message: 'Booking approved!', severity: 'success' });
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
        {/* Booking Type Tabs */}
        <Paper sx={{ mb: 3, bgcolor: theme.palette.background.paper, p: 2, borderRadius: 2 }}>
          <Tabs
            value={selectedType}
            onChange={(_, v) => setSelectedType(v)}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            sx={{ minWidth: 0 }}
          >
            {bookingTypes.map((type) => (
              <Tab
                key={type.value}
                value={type.value}
                label={type.label}
                icon={type.icon}
                iconPosition="start"
                sx={{ minWidth: 120, fontWeight: 600 }}
              />
            ))}
          </Tabs>
        </Paper>
        {/* Bookings Table */}
        <Paper sx={{ p: 2, borderRadius: 4, boxShadow: theme.shadows[2], mb: 4, overflowX: 'auto' }}>
          <Box minWidth={900}>
            <Grid container sx={{ borderBottom: '2px solid', borderColor: 'divider', p: 1 }}>
              <Grid item xs={2}><Typography fontWeight={700}>Person</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Type</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Date</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Status</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Menu Items</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Actions</Typography></Grid>
            </Grid>
            {filteredBookings.map((b) => (
              <Grid container key={b.id} alignItems="center" sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}>
                <Grid item xs={2}>
                  <Box>
                    <Typography fontWeight={700}>{b.person.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{b.person.phone}</Typography>
                    <Typography variant="body2" color="text.secondary">{b.person.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Chip label={bookingTypes.find(t => t.value === b.type)?.label || b.type} icon={bookingTypes.find(t => t.value === b.type)?.icon} color="primary" />
                </Grid>
                <Grid item xs={2}><Typography>{b.date}</Typography></Grid>
                <Grid item xs={2}>
                  <Chip label={b.status.charAt(0).toUpperCase() + b.status.slice(1)} color={b.status === 'active' ? 'success' : b.status === 'completed' ? 'secondary' : b.status === 'cancelled' ? 'error' : b.status === 'pending' ? 'warning' : 'info'} icon={b.status === 'active' ? <CheckCircleIcon /> : b.status === 'completed' ? <FastfoodIcon /> : b.status === 'cancelled' ? <CancelIcon /> : b.status === 'pending' ? <MoreHorizIcon /> : <CheckIcon />} />
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {b.menu.map((item, idx) => (
                      <Chip key={idx} label={item} size="small" color="info" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" gap={1}>
                    <IconButton color="info" onClick={() => handleInfoOpen(b)}><InfoIcon /></IconButton>
                    <IconButton color="primary" onClick={() => handleEditOpen(b)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteOpen(b)}><DeleteIcon /></IconButton>
                    {(b.status === 'pending' || b.status === 'active') && (
                      <IconButton color="success" onClick={() => handleApprove(b)}><CheckIcon /></IconButton>
                    )}
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Paper>
        {/* Info Dialog */}
        <Dialog open={infoDialogOpen} onClose={handleInfoClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper } }}>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogContent>
            {infoDialogData && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="primary" mb={2}>{infoDialogData.person.name}</Typography>
                <Typography variant="body2" color="text.secondary">Phone: {infoDialogData.person.phone}</Typography>
                <Typography variant="body2" color="text.secondary">Email: {infoDialogData.person.email}</Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>Booking Type: <b>{bookingTypes.find(t => t.value === infoDialogData.type)?.label || infoDialogData.type}</b></Typography>
                <Typography variant="body2" color="text.secondary">Date: <b>{infoDialogData.date}</b></Typography>
                <Typography variant="body2" color="text.secondary">Status: <Chip label={infoDialogData.status.charAt(0).toUpperCase() + infoDialogData.status.slice(1)} color={infoDialogData.status === 'active' ? 'success' : infoDialogData.status === 'completed' ? 'secondary' : infoDialogData.status === 'cancelled' ? 'error' : infoDialogData.status === 'pending' ? 'warning' : 'info'} size="small" /></Typography>
                <Box mt={2}>
                  <Typography fontWeight={700} mb={1}>Menu Items</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {infoDialogData.menu.map((item, idx) => (
                      <Chip key={idx} label={item} size="small" color="info" />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInfoClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper } }}>
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogContent>
            {editBooking && (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField label="Name" value={editBooking.person.name} onChange={e => setEditBooking(b => ({ ...b, person: { ...b.person, name: e.target.value } }))} fullWidth />
                <TextField label="Phone" value={editBooking.person.phone} onChange={e => setEditBooking(b => ({ ...b, person: { ...b.person, phone: e.target.value } }))} fullWidth />
                <TextField label="Email" value={editBooking.person.email} onChange={e => setEditBooking(b => ({ ...b, person: { ...b.person, email: e.target.value } }))} fullWidth />
                <TextField label="Date" type="date" value={editBooking.date} onChange={e => setEditBooking(b => ({ ...b, date: e.target.value }))} fullWidth InputLabelProps={{ shrink: true }} />
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={editBooking.status} label="Status" onChange={e => setEditBooking(b => ({ ...b, status: e.target.value }))}>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                  </Select>
                </FormControl>
                <Box>
                  <Typography fontWeight={700} mb={1}>Menu Items</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {editBooking.menu.map((item, idx) => (
                      <Chip key={idx} label={item} onDelete={() => setEditBooking(b => ({ ...b, menu: b.menu.filter((_, i) => i !== idx) }))} color="info" />
                    ))}
                  </Box>
                  <TextField label="Add Menu Item" value={editBooking.newMenuItem || ''} onChange={e => setEditBooking(b => ({ ...b, newMenuItem: e.target.value }))} onKeyDown={e => {
                    if (e.key === 'Enter' && editBooking.newMenuItem?.trim()) {
                      setEditBooking(b => ({ ...b, menu: [...b.menu, b.newMenuItem.trim()], newMenuItem: '' }));
                    }
                  }} fullWidth sx={{ mt: 1 }} />
                  <Button onClick={() => editBooking.newMenuItem?.trim() && setEditBooking(b => ({ ...b, menu: [...b.menu, b.newMenuItem.trim()], newMenuItem: '' }))} disabled={!editBooking?.newMenuItem?.trim()} sx={{ mt: 1 }} variant="outlined">Add Menu Item</Button>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="inherit">Cancel</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper } }}>
          <DialogTitle>Delete Booking</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this booking?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="inherit">Cancel</Button>
            <Button onClick={handleDeleteConfirm} variant="contained" color="error">Delete</Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} message={snackbar.message} />
      </Box>
    </Box>
  );
} 