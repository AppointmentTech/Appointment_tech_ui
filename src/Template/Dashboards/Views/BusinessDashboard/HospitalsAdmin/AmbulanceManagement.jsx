import React, { useState } from 'react';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import { Box, Card, Typography, Button, IconButton, Drawer, TextField, MenuItem, Stack, Grid, Divider, Paper, useTheme, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import SnackBar from '../../../../../SnackBar/SnackBar.jsx';
import CustomTableToolbar from '../../../../../CommonComponents/CustomTableToolbar';

// Mock data
const initialAmbulances = [
  {
    id: 1,
    ambulanceId: 'AMB-001',
    location: 'Central Hospital',
    status: 'Available',
    callTime: '',
    patient: '',
    pickupLocation: '',
    dropLocation: '',
    dropTime: '',
    driver: 'John Driver',
    contact: '555-1234',
  },
  {
    id: 2,
    ambulanceId: 'AMB-002',
    location: 'West Clinic',
    status: 'On Call',
    callTime: '2024-06-10 09:30',
    patient: 'Alice Brown',
    pickupLocation: 'West Clinic',
    dropLocation: 'Central Hospital',
    dropTime: '2024-06-10 10:00',
    driver: 'Mike Wheels',
    contact: '555-5678',
  },
  {
    id: 3,
    ambulanceId: 'AMB-003',
    location: 'East Hospital',
    status: 'In Transit',
    callTime: '2024-06-10 10:15',
    patient: 'Bob Smith',
    pickupLocation: 'East Hospital',
    dropLocation: 'Central Hospital',
    dropTime: '',
    driver: 'Sara Road',
    contact: '555-9012',
  },
  {
    id: 4,
    ambulanceId: 'AMB-004',
    location: 'Central Hospital',
    status: 'Available',
    callTime: '',
    patient: '',
    pickupLocation: '',
    dropLocation: '',
    dropTime: '',
    driver: 'Tom Lane',
    contact: '555-3456',
  },
];

const statusColors = {
  'Available': '#10b981',
  'On Call': '#6366f1',
  'In Transit': '#fbbf24',
  'Unavailable': '#f87171',
};
const statusOptions = [
  { value: 'Available', label: 'Available', color: '#10b981' },
  { value: 'On Call', label: 'On Call', color: '#6366f1' },
  { value: 'In Transit', label: 'In Transit', color: '#fbbf24' },
  { value: 'Unavailable', label: 'Unavailable', color: '#f87171' },
];

function getStatusCounts(records) {
  return statusOptions.map(opt => ({
    name: opt.label,
    value: records.filter(r => r.status === opt.value).length,
    color: opt.color,
  }));
}
function getLocationCounts(records) {
  const locMap = {};
  records.forEach(r => {
    if (!locMap[r.location]) locMap[r.location] = 0;
    locMap[r.location]++;
  });
  return Object.entries(locMap).map(([loc, count]) => ({ location: loc, count }));
}

export default function AmbulanceManagement() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const bgGradient = isDark
    ? 'linear-gradient(135deg, #181c2a 0%, #232946 100%)'
    : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
  const cardGradient = isDark
    ? 'linear-gradient(135deg, #232946 0%, #181c2a 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)';
  const cardText = isDark ? '#e2e8f0' : '#1e293b';
  const borderColor = isDark ? alpha('#64748b', 0.3) : alpha('#cbd5e1', 0.7);
  const headerBg = isDark ? alpha('#232946', 0.9) : alpha('#f1f5f9', 0.9);
  const rowHover = isDark ? alpha('#6366f1', 0.08) : alpha('#6366f1', 0.04);

  const [ambulances, setAmbulances] = useState(initialAmbulances);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add'); // 'add' | 'edit' | 'preview'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form, setForm] = useState({
    ambulanceId: '',
    location: '',
    status: 'Available',
    callTime: '',
    patient: '',
    pickupLocation: '',
    dropLocation: '',
    dropTime: '',
    driver: '',
    contact: '',
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: 'success', message: '' });
  const [selectedIDs, setSelectedIDs] = useState([]);

  // Chart data
  const statusCounts = getStatusCounts(ambulances);
  const locationCounts = getLocationCounts(ambulances);

  // Drawer handlers
  const openDrawer = (mode, record = null) => {
    setDrawerMode(mode);
    setSelectedRecord(record);
    if (mode === 'edit' || mode === 'preview') {
      setForm(record);
    } else {
      setForm({
        ambulanceId: '',
        location: '',
        status: 'Available',
        callTime: '',
        patient: '',
        pickupLocation: '',
        dropLocation: '',
        dropTime: '',
        driver: '',
        contact: '',
      });
    }
    setDrawerOpen(true);
  };
  const closeDrawer = () => setDrawerOpen(false);

  // CRUD handlers
  const handleAdd = () => openDrawer('add');
  const handleEdit = (record) => openDrawer('edit', record);
  const handlePreview = (record) => openDrawer('preview', record);
  const handleDelete = (id) => {
    setAmbulances(ambulances.filter(r => r.id !== id));
    setSnackOptions({ color: 'success', message: 'Record deleted.' });
    setSnackOpen(true);
  };
  // Batch delete handler
  const handleBatchDelete = () => {
    setAmbulances(ambulances.filter(r => !selectedIDs.includes(r.id)));
    setSnackOptions({ color: 'success', message: 'Selected records deleted.' });
    setSnackOpen(true);
    setSelectedIDs([]);
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (drawerMode === 'add') {
      setAmbulances([...ambulances, { ...form, id: Date.now() }]);
      setSnackOptions({ color: 'success', message: 'Ambulance added.' });
    } else if (drawerMode === 'edit') {
      setAmbulances(ambulances.map(r => r.id === selectedRecord.id ? { ...form, id: r.id } : r));
      setSnackOptions({ color: 'success', message: 'Ambulance updated.' });
    }
    setDrawerOpen(false);
    setSnackOpen(true);
  };

  // DataGrid columns
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 120,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <strong>Actions</strong>,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <IconButton color="info" onClick={() => handlePreview(params.row)} size="small" sx={{ p: 0.75 }}>
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton color="primary" onClick={() => handleEdit(params.row)} size="small" sx={{ p: 0.75 }}>
            <EditNoteOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)} size="small" sx={{ p: 0.75 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
    { field: 'ambulanceId', headerName: 'Ambulance ID', minWidth: 120, flex: 1 },
    { field: 'location', headerName: 'Location', minWidth: 120, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 110,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: statusColors[params.row.status], mr: 1 }} />
          <Typography fontWeight={600} color={statusColors[params.row.status] || 'text.primary'} sx={{ fontSize: 13 }}>
            {params.row.status}
          </Typography>
        </Box>
      ),
    },
    { field: 'callTime', headerName: 'Call Time', minWidth: 140, flex: 1 },
    { field: 'patient', headerName: 'Patient', minWidth: 120, flex: 1 },
    { field: 'pickupLocation', headerName: 'Pickup Location', minWidth: 120, flex: 1 },
    { field: 'dropLocation', headerName: 'Drop Location', minWidth: 120, flex: 1 },
    { field: 'dropTime', headerName: 'Drop Time', minWidth: 140, flex: 1 },
    { field: 'driver', headerName: 'Driver', minWidth: 120, flex: 1 },
    { field: 'contact', headerName: 'Contact', minWidth: 120, flex: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: bgGradient }}>
      <CommonHeader role="admin" />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, pt: { xs: 10, md: 12 }, maxWidth: 1400, mx: 'auto', overflow: 'auto' }}>
        <Typography variant="h4" fontWeight={700} mb={2} color="primary">Ambulance Management</Typography>
        {/* Counters and Chart */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                borderRadius: 2,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: 1,
              }}>
                <DirectionsCarIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Ambulances</Typography>
                <Typography variant="h5" fontWeight={700}>{ambulances.length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={3}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                bgcolor: theme.palette.success.light,
                color: theme.palette.success.main,
                borderRadius: 2,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: 1,
              }}>
                <CallIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">On Call</Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">{ambulances.filter(a => a.status === 'On Call').length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={3}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                bgcolor: theme.palette.info.light,
                color: theme.palette.info.main,
                borderRadius: 2,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: 1,
              }}>
                <LocationOnIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Available</Typography>
                <Typography variant="h5" fontWeight={700} color="info.main">{ambulances.filter(a => a.status === 'Available').length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={3}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                bgcolor: theme.palette.warning.light,
                color: theme.palette.warning.main,
                borderRadius: 2,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: 1,
              }}>
                <PersonIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">In Transit</Typography>
                <Typography variant="h5" fontWeight={700} color="warning.main">{ambulances.filter(a => a.status === 'In Transit').length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, height: 260, border: `1px solid ${borderColor}` }}>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Ambulance Status Distribution</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {statusCounts.map((entry, idx) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: cardGradient, color: cardText, borderRadius: 8, border: `1px solid ${borderColor}` }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, height: 260, border: `1px solid ${borderColor}` }}>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Ambulances per Location</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={locationCounts}>
                  <XAxis dataKey="location" stroke={cardText} fontSize={13} />
                  <YAxis allowDecimals={false} stroke={cardText} fontSize={13} />
                  <RechartsTooltip contentStyle={{ background: cardGradient, color: cardText, borderRadius: 8, border: `1px solid ${borderColor}` }} />
                  <Bar dataKey="count" fill="#6366f1" name="Ambulances" barSize={28} radius={[8, 8, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        {/* Table and Add Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>Ambulance Records</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ borderRadius: 2, fontWeight: 600, fontSize: 15 }}>
            Add Ambulance
          </Button>
        </Box>
        <Paper sx={{ width: '100%', overflowX: 'auto', borderRadius: 3, boxShadow: 4, p: { xs: 0.5, sm: 1 }, background: cardGradient, color: cardText, mb: 3, border: `1px solid ${borderColor}` }}>
          <DataGrid
            rows={ambulances}
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            checkboxSelection
            disableRowSelectionOnClick={false}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            onRowSelectionModelChange={(ids) => setSelectedIDs(ids)}
            rowSelectionModel={selectedIDs}
            slots={{
              toolbar: () => (
                <CustomTableToolbar
                  rows={ambulances}
                  columns={columns}
                  selectedIDs={selectedIDs}
                  handleDelete={handleBatchDelete}
                />
              ),
            }}
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              background: cardGradient,
              color: cardText,
              fontSize: { xs: '0.85rem', sm: '0.97rem' },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: headerBg,
                fontWeight: 'bold',
                fontSize: 15,
                borderBottom: `1px solid ${borderColor}`,
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: rowHover,
                },
              },
              '& .MuiDataGrid-cell': {
                py: 0.5,
                px: 1,
                fontSize: 14,
                borderBottom: `1px solid ${borderColor}`,
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: headerBg,
                borderTop: `1px solid ${borderColor}`,
              },
              '& .MuiDataGrid-virtualScroller': {
                background: 'transparent',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
            }}
          />
        </Paper>
        <SnackBar open={snackOpen} setOpen={setSnackOpen} options={snackOptions} />
      </Box>
      {/* Drawer for Add/Edit/Preview */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: { xs: '100vw', sm: 400 },
            maxWidth: 440,
            p: 0,
            background: cardGradient,
            color: cardText,
            boxShadow: 6,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            zIndex: (theme) => theme.zIndex.drawer + 10,
            border: `1px solid ${borderColor}`,
            top: 0,
            height: '100vh',
          },
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            bgcolor: cardGradient,
            px: { xs: 2, sm: 3 },
            pt: { xs: 3, sm: 4 },
            pb: 1.5,
            borderBottom: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: 19 }}>
            {drawerMode === 'add' && 'Add Ambulance'}
            {drawerMode === 'edit' && 'Edit Ambulance'}
            {drawerMode === 'preview' && 'Ambulance Details'}
          </Typography>
          <IconButton onClick={closeDrawer} sx={{ color: cardText }}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ borderColor: borderColor }} />
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, sm: 3 }, pt: 2, pb: 3 }}>
          {drawerMode === 'preview' ? (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: cardGradient, color: cardText, mb: 2, border: `1px solid ${borderColor}` }}>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <DirectionsCarIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Ambulance ID</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.ambulanceId}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon color="info" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Location</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.location}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CallIcon color="success" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Status</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.status}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="secondary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Patient</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.patient}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Pickup Location</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.pickupLocation}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon color="error" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Drop Location</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.dropLocation}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CallIcon color="info" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Call Time</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.callTime}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CallIcon color="warning" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Drop Time</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.dropTime}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Driver</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.driver}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CallIcon color="secondary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Contact</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.contact}</Typography>
              </Stack>
            </Paper>
          ) : (
            <Box component="form" onSubmit={handleFormSubmit}>
              <TextField
                label="Ambulance ID"
                name="ambulanceId"
                value={form.ambulanceId}
                onChange={handleFormChange}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Location"
                name="location"
                value={form.location}
                onChange={handleFormChange}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Status"
                name="status"
                value={form.status}
                onChange={handleFormChange}
                select
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              >
                {statusOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Call Time"
                name="callTime"
                type="datetime-local"
                value={form.callTime}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Patient"
                name="patient"
                value={form.patient}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Pickup Location"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Drop Location"
                name="dropLocation"
                value={form.dropLocation}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Drop Time"
                name="dropTime"
                type="datetime-local"
                value={form.dropTime}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Driver"
                name="driver"
                value={form.driver}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Contact"
                name="contact"
                value={form.contact}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: 15 }}>
                {drawerMode === 'add' ? 'Add Ambulance' : 'Save Changes'}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
} 