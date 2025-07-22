import React, { useState } from 'react';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import { Box, Card, Typography, Button, IconButton, Drawer, TextField, MenuItem, Stack, Grid, Divider, Paper, useTheme, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import SnackBar from '../../../../../SnackBar/SnackBar.jsx';
import CustomTableToolbar from '../../../../../CommonComponents/CustomTableToolbar';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Sample initial data
const initialLabRecords = [
  { id: 1, testName: 'CBC', patient: 'John Doe', status: 'Completed', date: '2024-06-01', result: 'Normal' },
  { id: 2, testName: 'Blood Sugar', patient: 'Jane Smith', status: 'Pending', date: '2024-06-02', result: '-' },
  { id: 3, testName: 'Lipid Profile', patient: 'Alice Brown', status: 'Abnormal', date: '2024-06-03', result: 'High Cholesterol' },
];

const statusColors = {
  Completed: '#4caf50',
  Pending: '#ff9800',
  Abnormal: '#f44336',
};
const statusOptions = [
  { value: 'Completed', label: 'Completed', color: '#4caf50' },
  { value: 'Pending', label: 'Pending', color: '#ff9800' },
  { value: 'Abnormal', label: 'Abnormal', color: '#f44336' },
];

function getStatusCounts(records) {
  return statusOptions.map(opt => ({
    name: opt.label,
    value: records.filter(r => r.status === opt.value).length,
    color: opt.color,
  }));
}
function getChartData(records) {
  // Group by date for bar chart
  const dateMap = {};
  records.forEach(r => {
    if (!dateMap[r.date]) dateMap[r.date] = { date: r.date, Completed: 0, Pending: 0, Abnormal: 0 };
    dateMap[r.date][r.status]++;
  });
  return Object.values(dateMap);
}

export default function LaboratoryManagement() {
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
  const drawerBg = isDark ? '#232946' : '#fff';

  const [labRecords, setLabRecords] = useState(initialLabRecords);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add'); // 'add' | 'edit' | 'preview'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form, setForm] = useState({ testName: '', patient: '', status: 'Pending', date: '', result: '' });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: 'success', message: '' });
  const [selectedIDs, setSelectedIDs] = useState([]);

  // Chart data
  const statusCounts = getStatusCounts(labRecords);
  const barChartData = getChartData(labRecords);

  // Drawer handlers
  const openDrawer = (mode, record = null) => {
    setDrawerMode(mode);
    setSelectedRecord(record);
    if (mode === 'edit' || mode === 'preview') {
      setForm(record);
    } else {
      setForm({ testName: '', patient: '', status: 'Pending', date: '', result: '' });
    }
    setDrawerOpen(true);
  };
  const closeDrawer = () => setDrawerOpen(false);

  // CRUD handlers
  const handleAdd = () => openDrawer('add');
  const handleEdit = (record) => openDrawer('edit', record);
  const handlePreview = (record) => openDrawer('preview', record);
  const handleDelete = (id) => {
    setLabRecords(labRecords.filter(r => r.id !== id));
    setSnackOptions({ color: 'success', message: 'Record deleted.' });
    setSnackOpen(true);
  };

  // Batch delete handler
  const handleBatchDelete = () => {
    setLabRecords(labRecords.filter(r => !selectedIDs.includes(r.id)));
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
      setLabRecords([...labRecords, { ...form, id: Date.now() }]);
      setSnackOptions({ color: 'success', message: 'Test added.' });
    } else if (drawerMode === 'edit') {
      setLabRecords(labRecords.map(r => r.id === selectedRecord.id ? { ...form, id: r.id } : r));
      setSnackOptions({ color: 'success', message: 'Test updated.' });
    }
    setDrawerOpen(false);
    setSnackOpen(true);
  };

  // Counter summary
  const total = labRecords.length;
  const completed = labRecords.filter(r => r.status === 'Completed').length;
  const pending = labRecords.filter(r => r.status === 'Pending').length;
  const abnormal = labRecords.filter(r => r.status === 'Abnormal').length;

  // DataGrid columns
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 110,
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
    { field: 'testName', headerName: 'Test Name', minWidth: 120, flex: 1 },
    { field: 'patient', headerName: 'Patient', minWidth: 120, flex: 1 },
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
    { field: 'date', headerName: 'Date', minWidth: 100, flex: 1 },
    { field: 'result', headerName: 'Result', minWidth: 120, flex: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: bgGradient }}>
      <CommonHeader role="admin" />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, pt: { xs: 10, md: 12 }, maxWidth: 1400, mx: 'auto', overflow: 'auto' }}>
        <Typography variant="h4" fontWeight={700} mb={2} color="primary">Laboratory Management</Typography>
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
                <ScienceIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Tests</Typography>
                <Typography variant="h5" fontWeight={700}>{total}</Typography>
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
                <CheckCircleIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Completed</Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">{completed}</Typography>
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
                <HourglassBottomIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Pending</Typography>
                <Typography variant="h5" fontWeight={700} color="warning.main">{pending}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4} md={3}>
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
                <ErrorOutlineIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Abnormal</Typography>
                <Typography variant="h5" fontWeight={700} color="error.main">{abnormal}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, height: 260, border: `1px solid ${borderColor}` }}>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Status Distribution</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {statusCounts.map((entry, idx) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: drawerBg, color: cardText, borderRadius: 8, border: `1px solid ${borderColor}` }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, bgcolor: cardGradient, boxShadow: 2, height: 260, border: `1px solid ${borderColor}` }}>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Tests by Date & Status</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="date" stroke={cardText} fontSize={13} />
                  <YAxis allowDecimals={false} stroke={cardText} fontSize={13} />
                  <RechartsTooltip contentStyle={{ background: drawerBg, color: cardText, borderRadius: 8, border: `1px solid ${borderColor}` }} />
                  <Bar dataKey="Completed" stackId="a" fill={statusColors.Completed} />
                  <Bar dataKey="Pending" stackId="a" fill={statusColors.Pending} />
                  <Bar dataKey="Abnormal" stackId="a" fill={statusColors.Abnormal} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        {/* Table and Add Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>Lab Test Records</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ borderRadius: 2, fontWeight: 600, fontSize: 15 }}>
            Add Test
          </Button>
        </Box>
        <Paper sx={{ width: '100%', overflowX: 'auto', borderRadius: 3, boxShadow: 4, p: { xs: 0.5, sm: 1 }, background: cardGradient, color: cardText, mb: 3, border: `1px solid ${borderColor}` }}>
          <DataGrid
            rows={labRecords}
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
                  rows={labRecords}
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
                // minHeight: 38,
                // maxHeight: 38,
              },
              '& .MuiDataGrid-row': {
                // minHeight: 36,
                // maxHeight: 36,
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
                // minHeight: 38,
                // maxHeight: 38,
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
            background: drawerBg,
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
        {/* Sticky header for drawer */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            bgcolor: drawerBg,
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
            {drawerMode === 'add' && 'Add Lab Test'}
            {drawerMode === 'edit' && 'Edit Lab Test'}
            {drawerMode === 'preview' && 'Lab Test Details'}
          </Typography>
          <IconButton onClick={closeDrawer} sx={{ color: cardText }}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ borderColor: borderColor }} />
        {/* Scrollable content area, with extra top padding to clear header */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, sm: 3 }, pt: 2, pb: 3 }}>
          {drawerMode === 'preview' ? (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: cardGradient, color: cardText, mb: 2, border: `1px solid ${borderColor}` }}>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ScienceIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Test Name</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.testName}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleIcon color="info" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Patient</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.patient}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <HourglassBottomIcon color="warning" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Status</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.status}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <ScienceIcon color="secondary" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Date</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.date}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <ErrorOutlineIcon color="error" />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>Result</Typography>
                </Box>
                <Typography mb={1} sx={{ fontWeight: 500, fontSize: 16, ml: 4 }}>{selectedRecord?.result}</Typography>
              </Stack>
            </Paper>
          ) : (
            <Box component="form" onSubmit={handleFormSubmit}>
              <TextField
                label="Test Name"
                name="testName"
                value={form.testName}
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
                required
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Result"
                name="result"
                value={form.result}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: 15 }}>
                {drawerMode === 'add' ? 'Add Test' : 'Save Changes'}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
} 