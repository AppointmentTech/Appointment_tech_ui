import React, { useState, useEffect } from "react";
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import {
  Container,
  Grid,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Paper,
  CircularProgress,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  InputAdornment,
  useTheme,
  useMediaQuery,
  MenuItem,
  Drawer,
  Divider
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomTableToolbar from "CommonComponents/CustomTableToolbar";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import SnackBar from 'SnackBar/SnackBar.jsx';
import { DataGrid } from "@mui/x-data-grid";
import TodayIcon from '@mui/icons-material/Today';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PhoneIcon from '@mui/icons-material/Phone';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

// Update mockPatients so at least one patient has today's date
const today = new Date();
const getDateStr = (d) => d.toISOString().slice(0, 10);
const todayStr = getDateStr(today);
const mockPatients = [
  { id: 1, name: "John Doe", age: 35, gender: "Male", admissionDate: todayStr, status: "Admitted", contact: "555-1234", address: "123 Main St", doctor: "Dr. Smith", notes: "Diabetic" },
  { id: 2, name: "Jane Smith", age: 28, gender: "Female", admissionDate: "2024-06-02", status: "Discharged", contact: "555-5678", address: "456 Oak Ave", doctor: "Dr. Lee", notes: "Asthma" },
  { id: 3, name: "Alice Johnson", age: 42, gender: "Female", admissionDate: "2024-06-03", status: "Admitted", contact: "555-9012", address: "789 Pine Rd", doctor: "Dr. Patel", notes: "Hypertension" },
];

// Mock admissions/discharges for the last 7 days
const last7Days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - (6 - i));
  return getDateStr(d);
});
const admissionsPerDay = [2, 3, 1, 4, 2, 3, 2];
const dischargesPerDay = [1, 2, 0, 2, 1, 2, 1];
const admissionsChartData = last7Days.map((date, i) => ({
  date,
  admissions: admissionsPerDay[i],
  discharges: dischargesPerDay[i],
}));

export default function PatientManagement() {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const genderColors = { Male: theme.palette.primary.main, Female: theme.palette.secondary.main };
  const statusColors = { Admitted: 'success', Discharged: 'info' };

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', gender: '', admissionDate: '', status: 'Admitted' });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 500);
  }, []);

  // Filtered patients
  const filteredPatients = patients.filter(p =>
    (filter === 'All' || p.status === filter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.gender.toLowerCase().includes(search.toLowerCase()) ||
      p.status.toLowerCase().includes(search.toLowerCase()))
  );

  // Summary data
  const totalPatients = patients.length;
  const admitted = patients.filter(p => p.status === 'Admitted').length;
  const discharged = patients.filter(p => p.status === 'Discharged').length;
  const genderData = [
    { name: 'Male', value: patients.filter(p => p.gender === 'Male').length },
    { name: 'Female', value: patients.filter(p => p.gender === 'Female').length },
  ];
  const statusData = [
    { name: 'Admitted', value: admitted },
    { name: 'Discharged', value: discharged },
  ];

  // Calculate today's admissions/discharges
  const todaysAdmissions = patients.filter(p => p.admissionDate === todayStr && p.status === 'Admitted').length;
  const todaysDischarges = patients.filter(p => p.admissionDate === todayStr && p.status === 'Discharged').length;
  const todaysStatusData = [
    { name: 'Admitted', value: patients.filter(p => p.admissionDate === todayStr && p.status === 'Admitted').length },
    { name: 'Discharged', value: patients.filter(p => p.admissionDate === todayStr && p.status === 'Discharged').length },
  ];

  // Add Patient Dialog
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForm({ name: '', age: '', gender: '', admissionDate: '', status: 'Admitted' });
    setFormErrors({});
  };
  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const validateForm = () => {
    const errors = {};
    if (!form.name) errors.name = 'Name is required';
    if (!form.age || form.age <= 0) errors.age = 'Valid age required';
    if (!form.gender) errors.gender = 'Gender is required';
    if (!form.admissionDate) errors.admissionDate = 'Admission date required';
    if (!form.status) errors.status = 'Status is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAddPatient = () => {
    if (!validateForm()) return;
    setPatients([
      ...patients,
      { id: patients.length + 1, ...form },
    ]);
    setSnackOptions({ color: 'success', message: 'Patient added successfully!' });
    setSnackOpen(true);
    handleCloseDialog();
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPatient(null);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "",
      minWidth: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar sx={{ bgcolor: params.row.gender === 'Male' ? genderColors.Male : genderColors.Female }}>
          {params.row.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </Avatar>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Edit">
            <IconButton color="primary">
              <EditNoteOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Details">
            <IconButton color="info" onClick={() => handleViewDetails(params.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    { field: "id", headerName: "ID", minWidth: 60 },
    { field: "name", headerName: "Patient Name", minWidth: 160 },
    { field: "age", headerName: "Age", minWidth: 80 },
    { field: "gender", headerName: "Gender", minWidth: 100, renderCell: (params) => (
      <Chip icon={params.value === 'Male' ? <MaleIcon /> : <FemaleIcon />} label={params.value} sx={{ bgcolor: genderColors[params.value], color: '#fff' }} />
    ) },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      renderCell: (params) => (
        <Chip label={params.row.status} color={statusColors[params.row.status]} />
      )
    },
    {
      field: "admissionDate",
      headerName: "Admission Date",
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2">{params.row.admissionDate}</Typography>
      )
    },
    { field: "contact", headerName: "Contact", minWidth: 120 },
    { field: "address", headerName: "Address", minWidth: 180 },
    { field: "doctor", headerName: "Doctor", minWidth: 120 },
    { field: "notes", headerName: "Notes", minWidth: 120 },
  ];
  const bgGradient = darkMode
  ? "linear-gradient(135deg, #181c2a 0%, #232946 100%)"
  : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: bgGradient }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, pt: { xs: '72px', md: '80px' }, overflow: "auto" }}>
        {/* Section Header */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} mb={3} gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <GroupIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ background: darkMode ? 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)' : 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Patient Management
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {/* Global Search Bar */}
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, bgcolor: theme.palette.background.paper, fontWeight: 600 }
            }}
            sx={{ minWidth: 320, flex: 1 }}
          />
        </Box>
        {/* Summary Row with Today's Counts */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <BarChartIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>Summary</Typography>
        </Box>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, boxShadow: 1, bgcolor: theme.palette.background.paper }}>
              <GroupIcon color="primary" sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>{totalPatients}</Typography>
                <Typography variant="body2">Total Patients</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, boxShadow: 1, bgcolor: theme.palette.background.paper }}>
              <TodayIcon color="success" sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>{todaysAdmissions}</Typography>
                <Typography variant="body2">Today's Admissions</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, boxShadow: 1, bgcolor: theme.palette.background.paper }}>
              <TodayIcon color="info" sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>{todaysDischarges}</Typography>
                <Typography variant="body2">Today's Discharges</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
        {/* Charts Row - Redesigned Analytics Section */}
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {/* Admissions & Discharges Bar Chart */}
              <Card sx={{ p: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: theme.palette.background.paper }}>
                <Typography variant="subtitle1" fontWeight={700} mb={2} color={theme.palette.text.primary}>
                  Admissions & Discharges (Last 7 Days)
                </Typography>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={admissionsChartData}>
                    <XAxis dataKey="date" stroke={theme.palette.text.primary} />
                    <YAxis stroke={theme.palette.text.primary} />
                    <Bar dataKey="admissions" fill={theme.palette.success.main} name="Admissions" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="discharges" fill={theme.palette.info.main} name="Discharges" radius={[8, 8, 0, 0]} />
                    <Legend />
                    <RechartsTooltip contentStyle={{ background: theme.palette.background.paper, color: theme.palette.text.primary }} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Today's Status Pie Chart */}
              <Card sx={{ pt: 4, pb: 2, px: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: theme.palette.background.paper, alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={700} mb={1} color={theme.palette.text.primary} align="center">
                  Today's Status Breakdown
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2} align="center">
                  Shows the number of patients admitted and discharged today.
                </Typography>
                <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1}>
                  <Box display="flex" alignItems="center" justifyContent="center" width="100%" height={170}>
                    <ResponsiveContainer width={150} height={170}>
                      <PieChart>
                        <Pie
                          data={todaysStatusData.every(s => s.value === 0)
                            ? [{ name: 'No Activity', value: 1 }]
                            : todaysStatusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          label={({ name, value }) =>
                            todaysStatusData.every(s => s.value === 0)
                              ? 'No Activity Today'
                              : `${name}: ${value}`
                          }
                          labelLine={false}
                        >
                          {todaysStatusData.every(s => s.value === 0)
                            ? [<Cell key="cell-no-activity" fill={theme.palette.action.disabled} />]
                            : todaysStatusData.map((entry, idx) => (
                                <Cell
                                  key={`cell-today-status-${idx}`}
                                  fill={entry.name === 'Admitted' ? theme.palette.success.main : theme.palette.info.main}
                                />
                              ))}
                        </Pie>
                        <Legend verticalAlign="bottom" align="center" />
                        <RechartsTooltip
                          contentStyle={{ background: theme.palette.background.paper, color: theme.palette.text.primary }}
                          formatter={(value, name) =>
                            todaysStatusData.every(s => s.value === 0)
                              ? ['No admissions or discharges today', '']
                              : [value, name]
                          }
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Overall Patient Status Pie Chart */}
              <Card sx={{ pt: 4, pb: 2, px: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: theme.palette.background.paper, alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={700} mb={1} color={theme.palette.text.primary} align="center">
                  Overall Patient Status
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2} align="center">
                  Shows the total number of patients currently admitted and discharged.
                </Typography>
                <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1}>
                  <Box display="flex" alignItems="center" justifyContent="center" width="100%" height={170}>
                    <ResponsiveContainer width={150} height={170}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          label={({ name, value }) => `${name}: ${value}`}
                          labelLine={false}
                        >
                          {statusData.map((entry, idx) => (
                            <Cell
                              key={`cell-overall-status-${idx}`}
                              fill={entry.name === 'Admitted' ? theme.palette.success.main : theme.palette.info.main}
                            />
                          ))}
                        </Pie>
                        <Legend verticalAlign="bottom" align="center" />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ my: 3 }} />
        {/* Quick Filters */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <FilterListIcon color="primary" />
          {['All', 'Admitted', 'Discharged'].map(val => (
            <Chip
              key={val}
              label={val}
              color={filter === val ? 'primary' : 'default'}
              onClick={() => setFilter(val)}
              sx={{ fontWeight: 700, cursor: 'pointer', borderRadius: 2 }}
            />
          ))}
        </Box>
        {/* Action Bar - Redesigned */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2} mb={2}>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleOpenDialog} sx={{ fontWeight: 700, borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}>
            Add Patient
          </Button>
          <Button variant="outlined" onClick={() => { setFilter('All'); setSearch(''); }} sx={{ width: { xs: '100%', sm: 'auto' } }}>Reset</Button>
          <Box flexGrow={1} />
          {/* Status Summary Chips */}
          <Box display="flex" gap={1}>
            <Chip label={`Admitted: ${admitted}`} color="success" size="small" />
            <Chip label={`Discharged: ${discharged}`} color="info" size="small" />
          </Box>
        </Box>
        {/* Patient Table Section Header */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <TableChartIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>Patient List</Typography>
        </Box>
        {/* Patient Table */}
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Card sx={{ p: 2, borderRadius: 2, boxShadow: 1, bgcolor: theme.palette.background.paper, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 }, minWidth: 900 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <CircularProgress />
              </Box>
            ) : filteredPatients.length === 0 ? (
              <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
                <SentimentDissatisfiedIcon color="disabled" sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h6" color="text.secondary">No patients found.</Typography>
              </Box>
            ) : (
              <DataGrid
                rows={filteredPatients}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                pagination
                pageSizeOptions={[5, 10, 25]}
                getRowId={(row) => row.id}
                initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                slots={{
                  toolbar: () => (
                    <CustomTableToolbar
                      rows={filteredPatients}
                      columns={columns}
                      selectedIDs={[]}
                      handleDelete={() => {}}
                    />
                  ),
                }}
                sx={{
                  borderRadius: 2,
                  boxShadow: 1,
                  bgcolor: theme.palette.background.paper,
                  position: 'relative',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 4 },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: darkMode ? theme.palette.background.paper : theme.palette.primary.light,
                    color: darkMode ? theme.palette.text.primary : theme.palette.primary.contrastText,
                    fontWeight: "bold",
                    position: 'relative',
                    top: 0,
                    zIndex: 1,
                  },
                  "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiDataGrid-row": {
                    bgcolor: theme.palette.background.default,
                    '&:nth-of-type(even)': {
                      bgcolor: theme.palette.action.hover,
                    },
                    '&:hover': {
                      bgcolor: theme.palette.action.selected,
                      // Remove boxShadow on row hover
                    },
                  },
                  // Sticky last column (actions)
                  "& .MuiDataGrid-cell:last-child": {
                    // position: 'sticky',
                    right: 0,
                    background: theme.palette.background.paper,
                    zIndex: 2,
                    boxShadow: '-4px 0 8px -4px rgba(0,0,0,0.04)',
                  },
                  // Sticky column header for last column
                  "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader:last-child": {
                    // position: 'sticky',
                    right: 0,
                    background: darkMode ? theme.palette.background.paper : theme.palette.primary.light,
                    zIndex: 3,
                    boxShadow: '-4px 0 8px -4px rgba(0,0,0,0.04)',
                  },
                }}
              />
            )}
          </Card>
        </Box>
        {/* Add Patient Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Patient Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleFormChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              margin="dense"
              label="Age"
              name="age"
              type="number"
              fullWidth
              value={form.age}
              onChange={handleFormChange}
              error={!!formErrors.age}
              helperText={formErrors.age}
            />
            <TextField
              margin="dense"
              label="Gender"
              name="gender"
              select
              SelectProps={{ native: true }}
              fullWidth
              value={form.gender}
              onChange={handleFormChange}
              error={!!formErrors.gender}
              helperText={formErrors.gender}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </TextField>
            <TextField
              margin="dense"
              label="Admission Date"
              name="admissionDate"
              type="date"
              fullWidth
              value={form.admissionDate}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              error={!!formErrors.admissionDate}
              helperText={formErrors.admissionDate}
            />
            <TextField
              margin="dense"
              label="Status"
              name="status"
              select
              SelectProps={{ native: true }}
              fullWidth
              value={form.status}
              onChange={handleFormChange}
              error={!!formErrors.status}
              helperText={formErrors.status}
            >
              <option value="Admitted">Admitted</option>
              <option value="Discharged">Discharged</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddPatient} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>
        {/* Patient Details Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
          <Box sx={{ width: 350, p: 0, bgcolor: theme.palette.background.paper, height: '100%', mt: { xs: '72px', md: '80px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            {selectedPatient && (
              <>
                {/* Header Section */}
                <Box sx={{
                  px: 3, py: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: darkMode
                    ? 'linear-gradient(90deg, #232946 0%, #3b82f6 100%)'
                    : 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
                  borderTopLeftRadius: 8, borderTopRightRadius: 8,
                }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: selectedPatient.gender === 'Male' ? genderColors.Male : genderColors.Female, width: 48, height: 48, fontWeight: 700, fontSize: 22 }}>
                      {selectedPatient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#fff">{selectedPatient.name}</Typography>
                      <Chip label={selectedPatient.status} color={statusColors[selectedPatient.status]} size="small" sx={{ fontWeight: 700 }} />
                    </Box>
                  </Box>
                  <Tooltip title="Close">
                    <IconButton onClick={handleCloseDrawer} sx={{ color: '#fff' }}>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                {/* Details Section */}
                <Box sx={{ flex: 1, px: 3, py: 2, overflowY: 'auto' }}>
                  {/* Personal Info */}
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">Personal Info</Typography>
                  <Grid container spacing={1} mb={2}>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}>ID:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.id}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}><Tooltip title="Age"><span><TrendingUpIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /></span></Tooltip>Age:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.age}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}><Tooltip title="Gender"><span>{selectedPatient.gender === 'Male' ? <MaleIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> : <FemaleIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />}</span></Tooltip>Gender:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.gender}</Typography></Grid>
                  </Grid>
                  <Divider sx={{ mb: 2 }} />
                  {/* Contact Info */}
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">Contact Info</Typography>
                  <Grid container spacing={1} mb={2}>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}><Tooltip title="Contact"><span><PhoneIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /></span></Tooltip>Contact:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.contact}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}><Tooltip title="Address"><span><InfoOutlinedIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /></span></Tooltip>Address:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.address}</Typography></Grid>
                  </Grid>
                  <Divider sx={{ mb: 2 }} />
                  {/* Medical Info */}
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">Medical Info</Typography>
                  <Grid container spacing={1} mb={2}>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}><Tooltip title="Admission Date"><span><TodayIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /></span></Tooltip>Admission:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.admissionDate}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}><Tooltip title="Doctor"><span><InfoOutlinedIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /></span></Tooltip>Doctor:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.doctor}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2" fontWeight={600}><Tooltip title="Notes"><span><InfoOutlinedIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /></span></Tooltip>Notes:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body2">{selectedPatient.notes}</Typography></Grid>
                  </Grid>
                </Box>
                {/* Sticky Footer Actions */}
                <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper, position: 'sticky', bottom: 0, zIndex: 2 }}>
                  <Tooltip title="Edit Patient">
                    <Button variant="contained" color="primary" fullWidth sx={{ mb: 1, fontWeight: 700 }}>Edit Patient</Button>
                  </Tooltip>
                  <Tooltip title="Discharge Patient">
                    <Button variant="outlined" color="error" fullWidth sx={{ fontWeight: 700 }}>Discharge</Button>
                  </Tooltip>
                </Box>
              </>
            )}
          </Box>
        </Drawer>
        <SnackBar open={snackOpen} setOpen={setSnackOpen} options={snackOptions} />
      </Box>
    </Box>
  );
} 