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
} from "@mui/material";
import SnackBar from "@snackbar/SnackBar.jsx";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomTableToolbar from "../../../../../CommonComponents/CustomTableToolbar";
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for appointments
const mockAppointments = [
  { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2024-06-10", time: "10:00", status: "Scheduled", staffId: 101 },
  { id: 2, patient: "Jane Smith", doctor: "Dr. Brown", date: "2024-06-11", time: "11:30", status: "Completed", staffId: 102 },
  { id: 3, patient: "Alice Johnson", doctor: "Dr. Lee", date: "2024-06-12", time: "09:00", status: "Cancelled", staffId: 103 },
  { id: 4, patient: "Bob Martin", doctor: "Dr. Smith", date: "2024-06-13", time: "14:00", status: "Scheduled", staffId: 101 },
  { id: 5, patient: "Sara Lee", doctor: "Dr. Brown", date: "2024-06-14", time: "15:30", status: "Scheduled", staffId: 102 },
];

// Mock data for staff
const mockStaff = {
  101: { id: 101, name: "Nurse Olivia", role: "Nurse", phone: "555-1234", email: "olivia@hospital.com", avatar: "O" },
  102: { id: 102, name: "Receptionist Max", role: "Receptionist", phone: "555-5678", email: "max@hospital.com", avatar: "M" },
  103: { id: 103, name: "Attendant Emma", role: "Attendant", phone: "555-9012", email: "emma@hospital.com", avatar: "E" },
};

// Chart data helpers
const statusColors = {
  Scheduled: "#6366f1",
  Completed: "#10b981",
  Cancelled: "#f87171",
};
const getStatusData = (appointments) => {
  const counts = {};
  appointments.forEach((a) => {
    counts[a.status] = (counts[a.status] || 0) + 1;
  });
  return Object.keys(counts).map((status) => ({ name: status, value: counts[status], color: statusColors[status] || "#a3a3a3" }));
};
const getDoctorData = (appointments) => {
  const counts = {};
  appointments.forEach((a) => {
    counts[a.doctor] = (counts[a.doctor] || 0) + 1;
  });
  return Object.keys(counts).map((doctor) => ({ doctor, count: counts[doctor] }));
};

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewStaff = (row) => {
    setSelectedStaff(mockStaff[row.staffId]);
    setSelectedAppointment(row);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedStaff(null);
    setSelectedAppointment(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
    setSnackOptions({ color: "success", message: `Status updated to ${newStatus}` });
    setSnackOpen(true);
  };

  const statusOptions = [
    { value: "Scheduled", label: "Scheduled", color: "#6366f1" },
    { value: "Completed", label: "Completed", color: "#10b981" },
    { value: "Cancelled", label: "Cancelled", color: "#f87171" },
  ];

  const columns = [
    {
      field: "edit",
      headerName: "Edit",
      minWidth: 70,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title="Edit Appointment">
          <IconButton
            color="primary"
            size="medium"
            onClick={() => alert(`Edit appointment ID: ${params.row.id}`)}
            // sx={{
            //   bgcolor: theme.palette.mode === "dark" ? "#232946" : "#e0e7ef",
            //   borderRadius: 2,
            //   boxShadow: 1,
            //   '&:hover': {
            //     bgcolor: theme.palette.mode === "dark" ? "#6366f1" : "#6366f1",
            //     color: "#fff",
            //   },
            // }}
          >
            <EditNoteOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderHeader: () => <VisibilityOutlinedIcon color="info" />,
      renderCell: (params) => (
        <Tooltip title="View Appointment & Staff Details">
          <IconButton
            color="info"
            size="large"
            onClick={() => handleViewStaff(params.row)}
            // sx={{
            //   bgcolor: theme.palette.mode === "dark" ? "#232946" : "#e0e7ef",
            //   borderRadius: 2,
            //   boxShadow: 1,
            //   '&:hover': {
            //     bgcolor: theme.palette.mode === "dark" ? "#6366f1" : "#6366f1",
            //     color: "#fff",
            //   },
            // }}
          >
            <VisibilityOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      ),
    },
    { field: "id", headerName: "ID", minWidth: 80 },
    { field: "patient", headerName: "Patient Name", minWidth: 180 },
    { field: "doctor", headerName: "Doctor Name", minWidth: 180 },
    { field: "date", headerName: "Date", minWidth: 120 },
    { field: "time", headerName: "Time", minWidth: 100 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 170,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 700,
            color: statusOptions.find(opt => opt.value === params.row.status)?.color,
            background: (theme) => theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6',
            borderRadius: 2,
            minWidth: 110,
            '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 },
          }}
          MenuProps={{
            PaperProps: {
              sx: { borderRadius: 2 }
            }
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Chip
                label={option.label}
                size="small"
                sx={{
                  bgcolor: option.color,
                  color: '#fff',
                  fontWeight: 700,
                  px: 1.5,
                  borderRadius: 1.5,
                  fontSize: 13,
                }}
              />
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  // Dashboard background and card style (match HospitalsAdminDashboard)
  const bgGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #181c2a 0%, #232946 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  const cardGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #232946 0%, #181c2a 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
  const cardText = theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b';

  // Chart data
  const statusData = getStatusData(appointments);
  const doctorData = getDoctorData(appointments);

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
            Appointment Management
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}
            sx={{ mb: 1 }}
          >
            Manage and monitor all hospital appointments and staff assignments
          </Typography>
        </Box>
        {/* Charts Section */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}>
                Appointment Status Breakdown
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
                Appointments per Doctor
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={doctorData}>
                  <XAxis dataKey="doctor" stroke={theme.palette.mode === 'dark' ? '#cbd5e1' : undefined} />
                  <YAxis allowDecimals={false} stroke={theme.palette.mode === 'dark' ? '#cbd5e1' : undefined} />
                  <Bar dataKey="count" fill="#6366f1" name="Appointments" barSize={28} radius={[8, 8, 0, 0]} />
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: theme.palette.mode === 'dark' ? '#232946' : '#fff', color: cardText }} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Table Section */}
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
                rows={appointments}
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
                      rows={appointments}
                      columns={columns}
                      selectedIDs={[]}
                      handleDelete={() => {}}
                    />
                  ),
                }}
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  background: cardGradient,
                  color: cardText,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f0f0f0",
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
        <SnackBar open={snackOpen} setOpen={setSnackOpen} options={snackOptions} />
      </Box>
      {/* Staff & Appointment Details Drawer - moved outside scrolling Box */}
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
            Appointment Details
          </Typography>
          {selectedAppointment ? (
            <Paper elevation={0} sx={{ mb: 3, p: 2, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 48, height: 48, fontSize: 24, bgcolor: '#6366f1' }}>{selectedAppointment.patient[0]}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{selectedAppointment.patient}</Typography>
                  <Typography variant="body2" color="text.secondary">Patient</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <Typography variant="body2"><b>Doctor:</b> {selectedAppointment.doctor}</Typography>
                <Typography variant="body2"><b>Date:</b> {selectedAppointment.date}</Typography>
                <Typography variant="body2"><b>Time:</b> {selectedAppointment.time}</Typography>
                <Typography variant="body2"><b>Status:</b> {selectedAppointment.status}</Typography>
                <Typography variant="body2"><b>Appointment ID:</b> {selectedAppointment.id}</Typography>
              </Stack>
            </Paper>
          ) : (
            <Typography variant="body2" color="text.secondary">No appointment selected.</Typography>
          )}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
            Staff Details
          </Typography>
          {selectedStaff ? (
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 48, height: 48, fontSize: 24, bgcolor: '#10b981' }}>{selectedStaff.avatar}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{selectedStaff.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedStaff.role}</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <Typography variant="body2"><b>Phone:</b> {selectedStaff.phone}</Typography>
                <Typography variant="body2"><b>Email:</b> {selectedStaff.email}</Typography>
              </Stack>
            </Paper>
          ) : (
            <Typography variant="body2" color="text.secondary">No staff selected.</Typography>
          )}
          <Button onClick={handleCloseDrawer} color="primary" variant="contained" fullWidth sx={{ fontWeight: 600, mt: 4 }}>
            Close
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
} 