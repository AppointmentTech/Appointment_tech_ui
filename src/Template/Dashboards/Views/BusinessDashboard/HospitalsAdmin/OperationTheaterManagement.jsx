import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Drawer,
  Button,
  Avatar,
  Stack,
  Divider,
  useTheme,
  Grid,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
  Snackbar,
  Alert,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
// Add FullCalendar import (if available)
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Mock data for doctors
const mockDoctors = [
  { id: 1, name: "Dr. Alice", role: "Surgeon", phone: "555-1111", email: "alice@hospital.com" },
  { id: 2, name: "Dr. Bob", role: "Orthopedic", phone: "555-2222", email: "bob@hospital.com" },
  { id: 3, name: "Dr. Carol", role: "Cardiologist", phone: "555-3333", email: "carol@hospital.com" },
  { id: 4, name: "Dr. Dave", role: "Neurosurgeon", phone: "555-4444", email: "dave@hospital.com" },
];
// Mock data for patients
const mockPatients = [
  { id: 1, name: "John Doe", age: 45, gender: "Male", contact: "999-1111", notes: "Diabetic" },
  { id: 2, name: "Jane Smith", age: 38, gender: "Female", contact: "999-2222", notes: "Allergic to penicillin" },
  { id: 3, name: "Sam Wilson", age: 60, gender: "Male", contact: "999-3333", notes: "Hypertension" },
];
// Mock data for OT schedules
const mockSchedules = [
  {
    id: 1,
    ot: "OT-1",
    date: "2024-06-20",
    time: "09:00",
    doctors: [1, 2],
    patient: 1,
    surgeryType: "Knee Replacement",
    status: "Scheduled",
  },
  {
    id: 2,
    ot: "OT-2",
    date: "2024-06-20",
    time: "13:00",
    doctors: [3],
    patient: 2,
    surgeryType: "Heart Bypass",
    status: "In Progress",
  },
  {
    id: 3,
    ot: "OT-3",
    date: "2024-06-21",
    time: "10:30",
    doctors: [4],
    patient: 3,
    surgeryType: "Brain Tumor Removal",
    status: "Completed",
  },
];

const statusColors = {
  Scheduled: "#6366f1",
  "In Progress": "#fbbf24",
  Completed: "#10b981",
  Cancelled: "#f87171",
};
const getStatusData = (schedules) => {
  const counts = {};
  schedules.forEach((s) => {
    counts[s.status] = (counts[s.status] || 0) + 1;
  });
  return Object.keys(counts).map((status) => ({ name: status, value: counts[status], color: statusColors[status] || "#a3a3a3" }));
};
const getSurgeryTypeData = (schedules) => {
  const counts = {};
  schedules.forEach((s) => {
    counts[s.surgeryType] = (counts[s.surgeryType] || 0) + 1;
  });
  return Object.keys(counts).map((type) => ({ type, count: counts[type] }));
};

export default function OperationTheaterManagement() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [form, setForm] = useState({
    ot: '',
    date: '',
    time: '',
    surgeryType: '',
    doctors: [],
    patient: '',
    status: 'Scheduled',
  });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setSchedules(mockSchedules);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewDetails = (row) => {
    setSelectedSchedule(row);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedSchedule(null);
  };

  // Move actions column to first
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 140,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton color="info" size="large" onClick={() => handleViewDetails(params.row)}>
              <VisibilityOutlinedIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="primary" size="medium" onClick={() => {
              setEditingSchedule(params.row);
              setForm({ ...params.row });
              setBookingDialogOpen(true);
            }}>
              <EditNoteOutlinedIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" size="medium" onClick={() => handleDelete(params.row)}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    { field: "id", headerName: "ID", minWidth: 60 },
    { field: "ot", headerName: "OT Name", minWidth: 100 },
    { field: "date", headerName: "Date", minWidth: 110 },
    { field: "time", headerName: "Time", minWidth: 90 },
    {
      field: "doctors",
      headerName: "Doctor(s)",
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.row.doctors.map((docId) => {
            const doc = mockDoctors.find((d) => d.id === docId);
            return doc ? (
              <Tooltip key={doc.id} title={doc.name + ' - ' + doc.role}>
                <Avatar sx={{ width: 28, height: 28, fontSize: 14, bgcolor: '#6366f1' }}>{doc.name[0]}</Avatar>
              </Tooltip>
            ) : null;
          })}
        </Stack>
      ),
    },
    {
      field: "patient",
      headerName: "Patient",
      minWidth: 160,
      renderCell: (params) => {
        const patient = mockPatients.find((p) => p.id === params.row.patient);
        return patient ? (
          <Box>
            <Typography fontWeight={600}>{patient.name}</Typography>
            <Typography variant="caption" color="text.secondary">{patient.gender}, {patient.age} yrs</Typography>
          </Box>
        ) : null;
      },
    },
    { field: "surgeryType", headerName: "Surgery Type", minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          size="small"
          sx={{
            bgcolor: statusColors[params.row.status] || '#a3a3a3',
            color: '#fff',
            fontWeight: 700,
            px: 1.5,
            borderRadius: 1.5,
            fontSize: 13,
          }}
        />
      ),
    },
  ];

  // Dashboard background and card style
  const bgGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #181c2a 0%, #232946 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  const cardGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #232946 0%, #181c2a 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
  const cardText = theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b';

  // Chart data
  const statusData = getStatusData(schedules);
  const surgeryTypeData = getSurgeryTypeData(schedules);

  // Delete handler
  const handleDelete = (row) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setSchedules(prev => prev.filter(s => s.id !== row.id));
      setSnackOptions({ color: 'success', message: 'Booking deleted.' });
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: bgGradient }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, pt: 10, overflow: "auto" }}>
        <Box mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)'
                : 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Operation Theater Management
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}
            sx={{ mb: 1 }}
          >
            Manage and monitor all operation theaters, schedules, and staff assignments
          </Typography>
        </Box>
        {/* Charts Section */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}>
                OT Schedule Status
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-status-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: theme.palette.mode === 'dark' ? '#232946' : '#fff', color: cardText }} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}>
                Surgeries by Type
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={surgeryTypeData}>
                  <XAxis dataKey="type" stroke={theme.palette.mode === 'dark' ? '#cbd5e1' : undefined} />
                  <YAxis allowDecimals={false} stroke={theme.palette.mode === 'dark' ? '#cbd5e1' : undefined} />
                  <Bar dataKey="count" fill="#6366f1" name="Surgeries" barSize={28} radius={[8, 8, 0, 0]} />
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: theme.palette.mode === 'dark' ? '#232946' : '#fff', color: cardText }} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Toggle Table/Calendar View */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant={viewMode === 'table' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('table')}
            sx={{ mr: 1 }}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('calendar')}
          >
            Calendar View
          </Button>
        </Box>
        {/* Table or Calendar View */}
        {viewMode === 'table' ? (
          <Paper
            sx={{
              width: "100%",
              overflowX: "auto",
              borderRadius: 3,
              boxShadow: 4,
              p: { xs: 1, sm: 2 },
              background: cardGradient,
              color: cardText,
              minWidth: { xs: 350, sm: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: 3,
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: { xs: "300px", sm: "60vh" },
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ width: "100%", flex: 1 }}>
                <DataGrid
                  rows={schedules}
                  columns={columns}
                  checkboxSelection
                  disableRowSelectionOnClick
                  pagination
                  pageSizeOptions={[5, 10, 25]}
                  getRowId={(row) => row.id}
                  initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    background: cardGradient,
                    color: cardText,
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#f0f0f0',
                      fontWeight: "bold",
                    },
                    "& .MuiDataGrid-root": {
                      minWidth: { xs: 350, sm: 0 },
                    },
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                  }}
                  autoHeight
                />
              </Box>
            )}
          </Paper>
        ) : (
          <Paper
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: 4,
              p: { xs: 1, sm: 2 },
              background: cardGradient,
              color: cardText,
              minWidth: { xs: 350, sm: 0 },
              mb: 3,
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
              height={600}
              events={schedules.map(s => ({
                id: s.id,
                title: `${s.ot}: ${s.surgeryType} (${s.doctors.map(id => mockDoctors.find(d => d.id === id)?.name).join(', ')})`,
                start: `${s.date}T${s.time}`,
                end: `${s.date}T${s.time}`,
                backgroundColor: statusColors[s.status] || '#6366f1',
                borderColor: statusColors[s.status] || '#6366f1',
                textColor: '#fff',
              }))}
              eventClick={info => {
                const schedule = schedules.find(s => s.id.toString() === info.event.id);
                if (schedule) handleViewDetails(schedule);
              }}
              themeSystem={theme.palette.mode === 'dark' ? 'dark' : 'standard'}
            />
          </Paper>
        )}
        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
          <Alert onClose={() => setSnackOpen(false)} severity={snackOptions.color} sx={{ width: '100%' }}>
            {snackOptions.message}
          </Alert>
        </Snackbar>
      </Box>
      {/* Schedule Details Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 420 },
            maxWidth: 480,
            p: 0,
            background: cardGradient,
            color: cardText,
            boxShadow: 6,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            zIndex: (theme) => theme.zIndex.drawer + 10,
          },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1, overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.25rem" }, mb: 2, textAlign: 'center' }}>
            OT Schedule Details
          </Typography>
          {selectedSchedule ? (
            <Paper elevation={0} sx={{ mb: 3, p: 2, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6' }}>
              <Stack spacing={1}>
                <Typography variant="body2"><b>OT:</b> {selectedSchedule.ot}</Typography>
                <Typography variant="body2"><b>Date:</b> {selectedSchedule.date}</Typography>
                <Typography variant="body2"><b>Time:</b> {selectedSchedule.time}</Typography>
                <Typography variant="body2"><b>Surgery Type:</b> {selectedSchedule.surgeryType}</Typography>
                <Typography variant="body2"><b>Status:</b> {selectedSchedule.status}</Typography>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" sx={{ mt: 1 }}>Doctor(s)</Typography>
              <Stack direction="row" spacing={1} mb={2}>
                {selectedSchedule.doctors.map((docId) => {
                  const doc = mockDoctors.find((d) => d.id === docId);
                  return doc ? (
                    <Tooltip key={doc.id} title={doc.name + ' - ' + doc.role}>
                      <Avatar sx={{ width: 36, height: 36, fontSize: 16, bgcolor: '#6366f1' }}>{doc.name[0]}</Avatar>
                    </Tooltip>
                  ) : null;
                })}
              </Stack>
              <Typography variant="subtitle2">Patient</Typography>
              {(() => {
                const patient = mockPatients.find((p) => p.id === selectedSchedule.patient);
                return patient ? (
                  <Box>
                    <Typography fontWeight={600}>{patient.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{patient.gender}, {patient.age} yrs</Typography>
                    <Typography variant="body2" color="text.secondary">Contact: {patient.contact}</Typography>
                    <Typography variant="body2" color="text.secondary">Notes: {patient.notes}</Typography>
                  </Box>
                ) : null;
              })()}
            </Paper>
          ) : (
            <Typography variant="body2" color="text.secondary">No schedule selected.</Typography>
          )}
          <Button onClick={handleCloseDrawer} color="primary" variant="contained" fullWidth sx={{ fontWeight: 600, mt: 4 }}>
            Close
          </Button>
        </Box>
      </Drawer>
      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingSchedule ? 'Edit OT Booking' : 'Book Operation Theater'}</DialogTitle>
        <DialogContent>
          <Select
            value={form.ot}
            onChange={e => setForm(f => ({ ...f, ot: e.target.value }))}
            fullWidth sx={{ mb: 2 }}
            displayEmpty
          >
            <MenuItem value="" disabled>Select OT</MenuItem>
            {["OT-1", "OT-2", "OT-3", "OT-4"].map(ot => (
              <MenuItem key={ot} value={ot}>{ot}</MenuItem>
            ))}
          </Select>
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            fullWidth sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            value={form.time}
            onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
            fullWidth sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Surgery Type"
            value={form.surgeryType}
            onChange={e => setForm(f => ({ ...f, surgeryType: e.target.value }))}
            fullWidth sx={{ mb: 2 }}
          />
          <Select
            multiple
            value={form.doctors}
            onChange={e => setForm(f => ({ ...f, doctors: e.target.value }))}
            fullWidth sx={{ mb: 2 }}
            renderValue={selected => selected.map(id => mockDoctors.find(d => d.id === id)?.name).join(', ')}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Doctor(s)</MenuItem>
            {mockDoctors.map(doc => (
              <MenuItem key={doc.id} value={doc.id}>{doc.name} ({doc.role})</MenuItem>
            ))}
          </Select>
          <Select
            value={form.patient}
            onChange={e => setForm(f => ({ ...f, patient: e.target.value }))}
            fullWidth sx={{ mb: 2 }}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Patient</MenuItem>
            {mockPatients.map(p => (
              <MenuItem key={p.id} value={p.id}>{p.name} ({p.gender}, {p.age} yrs)</MenuItem>
            ))}
          </Select>
          <Select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            fullWidth sx={{ mb: 2 }}
          >
            {Object.keys(statusColors).map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Validation: prevent double-booking
              const conflict = schedules.some(s =>
                s.ot === form.ot &&
                s.date === form.date &&
                s.time === form.time &&
                (!editingSchedule || s.id !== editingSchedule.id)
              );
              if (conflict) {
                setSnackOptions({ color: 'error', message: 'This OT is already booked for the selected date and time.' });
                setSnackOpen(true);
                return;
              }
              if (editingSchedule) {
                setSchedules(prev => prev.map(s => s.id === editingSchedule.id ? { ...form, id: editingSchedule.id } : s));
                setSnackOptions({ color: 'success', message: 'Booking updated!' });
              } else {
                setSchedules(prev => [...prev, { ...form, id: Date.now() }]);
                setSnackOptions({ color: 'success', message: 'OT booked successfully!' });
              }
              setSnackOpen(true);
              setBookingDialogOpen(false);
            }}
            disabled={!form.ot || !form.date || !form.time || !form.surgeryType || !form.doctors.length || !form.patient}
          >
            {editingSchedule ? 'Update' : 'Book'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* FAB for booking */}
      <Fab
        color="primary"
        aria-label="book-ot"
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 2000 }}
        onClick={() => {
          setEditingSchedule(null);
          setForm({ ot: '', date: '', time: '', surgeryType: '', doctors: [], patient: '', status: 'Scheduled' });
          setBookingDialogOpen(true);
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
} 