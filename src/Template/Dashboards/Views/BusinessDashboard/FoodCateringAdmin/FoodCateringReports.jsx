import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Paper, Chip, Avatar, Tabs, Tab, Snackbar } from '@mui/material';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Mock data
const summaryData = [
  { label: 'Total Revenue', value: '₹2,40,000', icon: <MonetizationOnIcon />, color: 'primary.main' },
  { label: 'Total Bookings', value: 320, icon: <RestaurantIcon />, color: 'secondary.main' },
  { label: 'Top Category', value: 'Wedding', icon: <EmojiEventsIcon />, color: 'success.main' },
  { label: 'Top Customer', value: 'Amit Kumar', icon: <PeopleIcon />, color: 'info.main' },
  { label: 'Avg. Order Value', value: '₹750', icon: <TrendingUpIcon />, color: 'warning.main' },
];

const revenueTrend = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 28000 },
  { month: 'Mar', revenue: 35000 },
  { month: 'Apr', revenue: 40000 },
  { month: 'May', revenue: 45000 },
  { month: 'Jun', revenue: 50000 },
];

const bookingsByType = [
  { type: 'Hostel', value: 80 },
  { type: 'Personal', value: 60 },
  { type: 'Birthday', value: 40 },
  { type: 'Wedding', value: 90 },
  { type: 'Corporate', value: 30 },
  { type: 'Other', value: 20 },
];

const topMenuItems = [
  { name: 'Paneer Butter Masala', orders: 60 },
  { name: 'Pizza', orders: 45 },
  { name: 'Cake', orders: 40 },
  { name: 'Biryani', orders: 35 },
  { name: 'Pasta', orders: 30 },
];

const revenueByCategory = [
  { category: 'Wedding', revenue: 90000 },
  { category: 'Birthday', revenue: 40000 },
  { category: 'Hostel', revenue: 35000 },
  { category: 'Personal', revenue: 30000 },
  { category: 'Corporate', revenue: 25000 },
  { category: 'Other', revenue: 20000 },
];

const mockTable = [
  { id: 1, person: 'Amit Kumar', type: 'Wedding', date: '2024-06-10', price: 12000, status: 'Paid' },
  { id: 2, person: 'Priya Singh', type: 'Personal', date: '2024-06-11', price: 8000, status: 'Unpaid' },
  { id: 3, person: 'Rahul Sharma', type: 'Birthday', date: '2024-06-12', price: 5000, status: 'Paid' },
  { id: 4, person: 'Sunita Mehra', type: 'Wedding', date: '2024-06-15', price: 15000, status: 'Paid' },
  { id: 5, person: 'Corporate HR', type: 'Corporate', date: '2024-06-18', price: 20000, status: 'Paid' },
  { id: 6, person: 'Vikas Jain', type: 'Other', date: '2024-06-20', price: 4000, status: 'Unpaid' },
];

const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6699'];

// Add mock data for bookings with 'people' field
const bookingTypes = [
  { label: 'Hostel', value: 'Hostel' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Birthday', value: 'Birthday' },
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Corporate', value: 'Corporate' },
  { label: 'Other', value: 'Other' },
];
const allBookings = [
  { id: 1, person: 'Amit Kumar', type: 'Wedding', date: '2024-06-10', price: 12000, status: 'Paid', people: 120 },
  { id: 2, person: 'Priya Singh', type: 'Personal', date: '2024-06-11', price: 8000, status: 'Unpaid', people: 4 },
  { id: 3, person: 'Rahul Sharma', type: 'Birthday', date: '2024-06-12', price: 5000, status: 'Paid', people: 30 },
  { id: 4, person: 'Sunita Mehra', type: 'Wedding', date: '2024-06-15', price: 15000, status: 'Paid', people: 200 },
  { id: 5, person: 'Corporate HR', type: 'Corporate', date: '2024-06-18', price: 20000, status: 'Paid', people: 50 },
  { id: 6, person: 'Vikas Jain', type: 'Other', date: '2024-06-20', price: 4000, status: 'Unpaid', people: 10 },
  { id: 7, person: 'Hostel Admin', type: 'Hostel', date: '2024-06-21', price: 10000, status: 'Paid', people: 80 },
];

export default function FoodCateringReports() {
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tab, setTab] = useState(0);
  const [peopleDialogOpen, setPeopleDialogOpen] = useState(false);
  const [peopleDialogData, setPeopleDialogData] = useState(null);
  const handlePeopleOpen = (row) => { setPeopleDialogData(row); setPeopleDialogOpen(true); };
  const handlePeopleClose = () => setPeopleDialogOpen(false);

  // Compute counters for each type
  const typeCounters = bookingTypes.map(t => {
    const bookings = allBookings.filter(b => b.type === t.value);
    return {
      ...t,
      totalBookings: bookings.length,
      totalPeople: bookings.reduce((sum, b) => sum + (b.people || 0), 0),
    };
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CommonHeader role="admin" />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, pt: 10, mt: { xs: 8, sm: 10 }, overflow: 'auto', height: '100vh', backgroundColor: theme.palette.background.default }}>
        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {summaryData.map((counter, idx) => (
            <Grid item xs={12} sm={6} md={2} key={counter.label}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, borderRadius: 5, boxShadow: theme.shadows[3], bgcolor: theme.palette.background.paper }}>
                <Avatar sx={{ bgcolor: counter.color, width: 56, height: 56, mb: 1 }}>{counter.icon}</Avatar>
                <Typography variant="h6" fontWeight={600} color="primary" sx={{ mb: 0.5 }}>{counter.value}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>{counter.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Charts Tabs */}
        <Paper sx={{ mb: 3, bgcolor: theme.palette.background.paper, p: 2, borderRadius: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" indicatorColor="primary" textColor="primary">
            <Tab label="Revenue Trend" />
            <Tab label="Bookings by Type" />
            <Tab label="Top Menu Items" />
            <Tab label="Revenue by Category" />
          </Tabs>
          {tab === 0 && (
            <Box sx={{ width: '100%', height: 320, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
          {tab === 1 && (
            <Box sx={{ width: '100%', height: 320, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={bookingsByType} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={100} label>
                    {bookingsByType.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          )}
          {tab === 2 && (
            <Box sx={{ width: '100%', height: 320, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topMenuItems} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill={theme.palette.secondary.main} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}
          {tab === 3 && (
            <Box sx={{ width: '100%', height: 320, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByCategory} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill={theme.palette.success.main} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Paper>
        {/* Catering Type Counters */}
        <Paper sx={{ mb: 3, bgcolor: theme.palette.background.paper, p: 2, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Catering Type Analysis</Typography>
          <Grid container spacing={2}>
            {typeCounters.map(tc => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={tc.value}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2, borderRadius: 4, boxShadow: theme.shadows[2], bgcolor: theme.palette.background.paper }}>
                  <Typography variant="subtitle2" color="text.secondary">{tc.label}</Typography>
                  <Typography variant="h5" fontWeight={800} color="primary">{tc.totalBookings} Bookings</Typography>
                  <Typography variant="body2" color="info.main">{tc.totalPeople} People</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
        {/* All Bookings Table */}
        <Paper sx={{ p: 2, borderRadius: 4, boxShadow: theme.shadows[2], mb: 4, overflowX: 'auto', background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #1e293b 60%, #232946 100%)' : 'linear-gradient(135deg, #f0f4fa 60%, #e3f2fd 100%)', backdropFilter: 'blur(6px)' }}>
          <Typography variant="h6" fontWeight={700} mb={2}>All Catering Bookings</Typography>
          <Box minWidth={1100}>
            <Grid container sx={{ borderBottom: '2px solid', borderColor: 'divider', p: 1 }}>
              <Grid item xs={2}><Typography fontWeight={700}>Type</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Person</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Date</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>People</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>Status</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Price</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>ID</Typography></Grid>
            </Grid>
            {allBookings.map((row) => (
              <Grid container key={row.id} alignItems="center" sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}>
                <Grid item xs={2}><Chip label={row.type} color="primary" /></Grid>
                <Grid item xs={2}><Typography fontWeight={700}>{row.person}</Typography></Grid>
                <Grid item xs={2}><Typography>{row.date}</Typography></Grid>
                <Grid item xs={2}>
                  <Typography color="info.main" fontWeight={700} sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: theme.palette.primary.main } }} onClick={() => handlePeopleOpen(row)}>
                    {row.people}
                  </Typography>
                </Grid>
                <Grid item xs={1}><Chip label={row.status} color={row.status === 'Paid' ? 'success' : 'error'} /></Grid>
                <Grid item xs={2}><Typography fontWeight={700}>₹{row.price}</Typography></Grid>
                <Grid item xs={1}><Typography>{row.id}</Typography></Grid>
              </Grid>
            ))}
          </Box>
        </Paper>
        {/* Add a spacer at the bottom for extra space */}
        <Box sx={{ mb: { xs: 8, sm: 10, md: 12 } }} />
        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} message={snackbar.message} />
      </Box>
      <Dialog open={peopleDialogOpen} onClose={handlePeopleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 5, boxShadow: 12, bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' } }}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {peopleDialogData && (
            <Box sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.7)' : 'rgba(240,244,250,0.7)',
              boxShadow: theme.shadows[2],
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
              minWidth: { xs: 'auto', sm: 350 },
            }}>
              <Typography variant="h5" fontWeight={900} color="primary" mb={2} sx={{ letterSpacing: 1 }}>Booking #{peopleDialogData.id}</Typography>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6} display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="info" />
                  <Box>
                    <Typography fontWeight={700}>Person</Typography>
                    <Typography>{peopleDialogData.person}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" gap={1}>
                  <CategoryIcon color="primary" />
                  <Box>
                    <Typography fontWeight={700}>Type</Typography>
                    <Typography>{peopleDialogData.type}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" gap={1}>
                  <EventIcon color="secondary" />
                  <Box>
                    <Typography fontWeight={700}>Date</Typography>
                    <Typography>{peopleDialogData.date}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" gap={1}>
                  <GroupIcon color="info" />
                  <Box>
                    <Typography fontWeight={700}>People</Typography>
                    <Typography color="info.main" fontWeight={700}>{peopleDialogData.people}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" gap={1}>
                  {peopleDialogData.status === 'Paid' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                  <Box>
                    <Typography fontWeight={700}>Status</Typography>
                    <Chip label={peopleDialogData.status} color={peopleDialogData.status === 'Paid' ? 'success' : 'error'} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" gap={1}>
                  <MonetizationOnIcon color="success" />
                  <Box>
                    <Typography fontWeight={700}>Price</Typography>
                    <Typography fontWeight={700}>₹{peopleDialogData.price}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePeopleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 