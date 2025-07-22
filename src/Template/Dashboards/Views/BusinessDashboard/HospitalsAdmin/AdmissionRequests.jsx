import React, { useState } from 'react';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import { Box, Card, Typography, Button, IconButton, Drawer, TextField, MenuItem, Stack, Grid, Divider, Paper, useTheme, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import CustomTableToolbar from '../../../../../CommonComponents/CustomTableToolbar';
import SnackBar from '../../../../../SnackBar/SnackBar.jsx';

// Mock data
const initialRequests = [
  {
    id: 1,
    requestId: 'REQ-001',
    patient: 'John Doe',
    age: 35,
    gender: 'Male',
    department: 'Cardiology',
    doctor: 'Dr. Smith',
    status: 'Pending',
    date: '2024-06-10',
    reason: 'Chest pain',
    notes: '',
  },
  {
    id: 2,
    requestId: 'REQ-002',
    patient: 'Jane Smith',
    age: 28,
    gender: 'Female',
    department: 'General',
    doctor: 'Dr. Brown',
    status: 'In Progress',
    date: '2024-06-09',
    reason: 'Fever',
    notes: '',
  },
  {
    id: 3,
    requestId: 'REQ-003',
    patient: 'Alice Johnson',
    age: 42,
    gender: 'Female',
    department: 'Radiology',
    doctor: 'Dr. Lee',
    status: 'Approved',
    date: '2024-06-08',
    reason: 'X-ray',
    notes: '',
  },
  {
    id: 4,
    requestId: 'REQ-004',
    patient: 'Bob Brown',
    age: 50,
    gender: 'Male',
    department: 'General',
    doctor: 'Dr. Smith',
    status: 'Rejected',
    date: '2024-06-07',
    reason: 'Routine check',
    notes: 'Incomplete documents',
  },
];

const statusColors = {
  'Pending': '#fbbf24',
  'In Progress': '#6366f1',
  'Approved': '#10b981',
  'Rejected': '#f87171',
};
const statusOptions = [
  { value: 'Pending', label: 'Pending', color: '#fbbf24' },
  { value: 'In Progress', label: 'In Progress', color: '#6366f1' },
  { value: 'Approved', label: 'Approved', color: '#10b981' },
  { value: 'Rejected', label: 'Rejected', color: '#f87171' },
];

function getStatusCounts(records) {
  return statusOptions.map(opt => ({
    name: opt.label,
    value: records.filter(r => r.status === opt.value).length,
    color: opt.color,
  }));
}
function getDepartmentCounts(records) {
  const depMap = {};
  records.forEach(r => {
    if (!depMap[r.department]) depMap[r.department] = 0;
    depMap[r.department]++;
  });
  return Object.entries(depMap).map(([dep, count]) => ({ department: dep, count }));
}

export default function AdmissionRequests() {
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

  const [requests, setRequests] = useState(initialRequests);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add'); // 'add' | 'edit' | 'preview'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form, setForm] = useState({
    requestId: '',
    patient: '',
    age: '',
    gender: '',
    department: '',
    doctor: '',
    status: 'Pending',
    date: '',
    reason: '',
    notes: '',
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: 'success', message: '' });
  const [selectedIDs, setSelectedIDs] = useState([]);

  // Chart data
  const statusCounts = getStatusCounts(requests);
  const departmentCounts = getDepartmentCounts(requests);

  // Drawer handlers
  const openDrawer = (mode, record = null) => {
    setDrawerMode(mode);
    setSelectedRecord(record);
    if (mode === 'edit' || mode === 'preview') {
      setForm(record);
    } else {
      setForm({
        requestId: '',
        patient: '',
        age: '',
        gender: '',
        department: '',
        doctor: '',
        status: 'Pending',
        date: '',
        reason: '',
        notes: '',
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
    setRequests(requests.filter(r => r.id !== id));
    setSnackOptions({ color: 'success', message: 'Record deleted.' });
    setSnackOpen(true);
  };
  // Batch delete handler
  const handleBatchDelete = () => {
    setRequests(requests.filter(r => !selectedIDs.includes(r.id)));
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
      setRequests([...requests, { ...form, id: Date.now() }]);
      setSnackOptions({ color: 'success', message: 'Admission request added.' });
    } else if (drawerMode === 'edit') {
      setRequests(requests.map(r => r.id === selectedRecord.id ? { ...form, id: r.id } : r));
      setSnackOptions({ color: 'success', message: 'Admission request updated.' });
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
    { field: 'requestId', headerName: 'Request ID', minWidth: 110, flex: 1 },
    { field: 'patient', headerName: 'Patient', minWidth: 120, flex: 1 },
    { field: 'age', headerName: 'Age', minWidth: 80, flex: 1, type: 'number' },
    { field: 'gender', headerName: 'Gender', minWidth: 90, flex: 1 },
    { field: 'department', headerName: 'Department', minWidth: 120, flex: 1 },
    { field: 'doctor', headerName: 'Doctor', minWidth: 120, flex: 1 },
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
    { field: 'date', headerName: 'Date', minWidth: 110, flex: 1 },
    { field: 'reason', headerName: 'Reason', minWidth: 120, flex: 1 },
    { field: 'notes', headerName: 'Notes', minWidth: 120, flex: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: bgGradient }}>
      <CommonHeader role="admin" />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, pt: { xs: 10, md: 12 }, maxWidth: 1400, mx: 'auto', overflow: 'auto' }}>
        <Typography variant="h4" fontWeight={700} mb={2} color="primary">Admission Requests</Typography>
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
                <PersonIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Requests</Typography>
                <Typography variant="h5" fontWeight={700}>{requests.length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={2.25}>
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
                <WarningAmberIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Pending</Typography>
                <Typography variant="h5" fontWeight={700} color="warning.main">{requests.filter(a => a.status === 'Pending').length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={2.25}>
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
                <CheckCircleIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">In Progress</Typography>
                <Typography variant="h5" fontWeight={700} color="info.main">{requests.filter(a => a.status === 'In Progress').length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={2.25}>
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
                <LocalHospitalIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Approved</Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">{requests.filter(a => a.status === 'Approved').length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={2.25}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                bgcolor: theme.palette.error.light,
                color: theme.palette.error.main,
                borderRadius: 2,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: 1,
              }}>
                <DeleteIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Rejected</Typography>
                <Typography variant="h5" fontWeight={700} color="error.main">{requests.filter(a => a.status === 'Rejected').length}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, height: 260, border: `1px solid ${borderColor}` }}>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Request Status Distribution</Typography>
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
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Requests per Department</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={departmentCounts}>
                  <XAxis dataKey="department" stroke={cardText} fontSize={13} />
                  <YAxis allowDecimals={false} stroke={cardText} fontSize={13} />
                  <RechartsTooltip contentStyle={{ background: cardGradient, color: cardText, borderRadius: 8, border: `1px solid ${borderColor}` }} />
                  <Bar dataKey="count" fill="#6366f1" name="Requests" barSize={28} radius={[8, 8, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        {/* Table and Add Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>Admission Request Records</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ borderRadius: 2, fontWeight: 600, fontSize: 15 }}>
            Add Admission Request
          </Button>
        </Box>
        <Paper sx={{ width: '100%', overflowX: 'auto', borderRadius: 3, boxShadow: 4, p: { xs: 0.5, sm: 1 }, background: cardGradient, color: cardText, mb: 3, border: `1px solid ${borderColor}` }}>
          <DataGrid
            rows={requests}
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
                  rows={requests}
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
            {drawerMode === 'add' && 'Add Admission Request'}
            {drawerMode === 'edit' && 'Edit Admission Request'}
            {drawerMode === 'preview' && 'Admission Request Details'}
          </Typography>
          <IconButton onClick={closeDrawer} sx={{ color: cardText }}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ borderColor: borderColor }} />
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, sm: 3 }, pt: 2, pb: 3 }}>
          {drawerMode === 'preview' ? (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: cardGradient, color: cardText, mb: 2, border: `1px solid ${borderColor}` }}>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Request ID</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.requestId}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="info" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Patient</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.patient}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="secondary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Age</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.age}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="success" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Gender</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.gender}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalHospitalIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Department</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.department}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalHospitalIcon color="info" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Doctor</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.doctor}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Status</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.status}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <WarningAmberIcon color="info" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Date</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.date}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <WarningAmberIcon color="warning" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Reason</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.reason}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <DeleteIcon color="error" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Notes</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.notes}</Typography>
              </Stack>
            </Paper>
          ) : (
            <Box component="form" onSubmit={handleFormSubmit}>
              <TextField
                label="Request ID"
                name="requestId"
                value={form.requestId}
                onChange={handleFormChange}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Patient"
                name="patient"
                value={form.patient}
                onChange={handleFormChange}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Age"
                name="age"
                value={form.age}
                onChange={handleFormChange}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleFormChange}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Department"
                name="department"
                value={form.department}
                onChange={handleFormChange}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Doctor"
                name="doctor"
                value={form.doctor}
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
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Reason"
                name="reason"
                value={form.reason}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Notes"
                name="notes"
                value={form.notes}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                multiline
                minRows={2}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: 15 }}>
                {drawerMode === 'add' ? 'Add Admission Request' : 'Save Changes'}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
} 