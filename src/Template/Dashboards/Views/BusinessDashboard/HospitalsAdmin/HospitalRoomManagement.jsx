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
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
  Grid as MuiGrid,
  CardActions,
} from "@mui/material";
import SnackBar from "../../../../../SnackBar/SnackBar.jsx";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BedIcon from "@mui/icons-material/Hotel";
import CustomTableToolbar from "../../../../../CommonComponents/CustomTableToolbar";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// New mock data: wards -> rooms -> beds
const mockWards = [
  {
    wardId: 1,
    wardName: "General Ward",
    rooms: [
      {
        roomId: 1,
        roomLabel: "G-101",
        beds: [
          { bedId: 1, bedLabel: "G-101-A", status: "Occupied", patient: { name: "John Doe", age: 45, gender: "Male", admissionDate: "2024-06-01" } },
          { bedId: 2, bedLabel: "G-101-B", status: "Available", patient: null },
        ],
      },
      {
        roomId: 2,
        roomLabel: "G-102",
        beds: [
          { bedId: 1, bedLabel: "G-102-A", status: "Available", patient: null },
          { bedId: 2, bedLabel: "G-102-B", status: "Available", patient: null },
        ],
      },
    ],
  },
  {
    wardId: 2,
    wardName: "ICU",
    rooms: [
      {
        roomId: 3,
        roomLabel: "ICU-201",
        beds: [
          { bedId: 1, bedLabel: "ICU-201-A", status: "Available", patient: null },
          { bedId: 2, bedLabel: "ICU-201-B", status: "Available", patient: null },
        ],
      },
    ],
  },
  {
    wardId: 3,
    wardName: "Private Ward",
    rooms: [
      {
        roomId: 4,
        roomLabel: "P-301",
        beds: [
          { bedId: 1, bedLabel: "P-301-A", status: "Occupied", patient: { name: "Alice Johnson", age: 60, gender: "Female", admissionDate: "2024-06-02" } },
        ],
      },
    ],
  },
];

const statusOptions = [
  { value: "Occupied", label: "Occupied", color: "#f87171" },
  { value: "Available", label: "Available", color: "#10b981" },
  { value: "Cleaning", label: "Cleaning", color: "#fbbf24" },
  { value: "Maintenance", label: "Maintenance", color: "#6366f1" },
];

const getStatusData = (rooms) => {
  const counts = {};
  rooms.forEach((r) => {
    counts[r.status] = (counts[r.status] || 0) + 1;
  });
  return Object.keys(counts).map((status) => ({ name: status, value: counts[status], color: statusOptions.find(opt => opt.value === status)?.color || "#a3a3a3" }));
};

const getSummary = (rooms) => {
  const total = rooms.length;
  const occupied = rooms.filter(r => r.status === "Occupied").length;
  const available = rooms.filter(r => r.status === "Available").length;
  const icu = rooms.filter(r => r.type === "ICU").length;
  const privateRooms = rooms.filter(r => r.type === "Private Room").length;
  return { total, occupied, available, icu, privateRooms };
};

// Summary calculation helpers
const getSummaryStats = (wards) => {
  let totalWards = wards.length;
  let totalRooms = 0;
  let totalBeds = 0;
  let occupiedBeds = 0;
  let availableBeds = 0;
  wards.forEach(ward => {
    totalRooms += ward.rooms.length;
    ward.rooms.forEach(room => {
      totalBeds += room.beds.length;
      room.beds.forEach(bed => {
        if (bed.status === 'Occupied') occupiedBeds++;
        if (bed.status === 'Available') availableBeds++;
      });
    });
  });
  return { totalWards, totalRooms, totalBeds, occupiedBeds, availableBeds };
};
const getBedOccupancyChartData = (wards) => {
  let occupied = 0, available = 0;
  wards.forEach(ward => ward.rooms.forEach(room => room.beds.forEach(bed => {
    if (bed.status === 'Occupied') occupied++;
    if (bed.status === 'Available') available++;
  })));
  return [
    { name: 'Occupied', value: occupied, color: '#f87171' },
    { name: 'Available', value: available, color: '#10b981' },
  ];
};

export default function HospitalRoomManagement() {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allocateDialogOpen, setAllocateDialogOpen] = useState(false);
  const [allocateRoom, setAllocateRoom] = useState(null);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "", admissionDate: "" });
  const [expandedWard, setExpandedWard] = useState(null);
  const [expandedRoom, setExpandedRoom] = useState(null);
  const [addRoomDialogOpen, setAddRoomDialogOpen] = useState(false);
  const [newRoomWardId, setNewRoomWardId] = useState("");
  const [newRoomLabel, setNewRoomLabel] = useState("");
  const [newRoomBeds, setNewRoomBeds] = useState(2);
  const [drawerBed, setDrawerBed] = useState(null);
  const [addBedDialogOpen, setAddBedDialogOpen] = useState(false);
  const [addBedRoom, setAddBedRoom] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setWards(mockWards);
      setLoading(false);
    }, 500);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setWards((prev) =>
      prev.map((ward) =>
        ward.wardId === id ? { ...ward, rooms: ward.rooms.map(room => ({ ...room, beds: room.beds.map(bed => ({ ...bed, status: newStatus })) })) } : ward
      )
    );
    setSnackOptions({ color: "success", message: `Status updated to ${newStatus}` });
    setSnackOpen(true);
  };

  const handleViewRoom = (row) => {
    setSelectedRoom(row);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRoom(null);
  };

  // Allocation handlers
  const handleOpenAllocate = (wardId, roomId, bed) => {
    setAllocateRoom({ wardId, roomId, bed });
    setNewPatient({ name: "", age: "", gender: "", admissionDate: "" });
    setAllocateDialogOpen(true);
  };
  const handleCloseAllocate = () => {
    setAllocateDialogOpen(false);
    setAllocateRoom(null);
  };
  const handleAllocateBedSubmit = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.admissionDate) {
      setSnackOptions({ color: "error", message: "Please fill all patient details." });
      setSnackOpen(true);
      return;
    }
    setWards((prev) =>
      prev.map((ward) =>
        ward.wardId === allocateRoom.wardId
          ? {
              ...ward,
              rooms: ward.rooms.map((room) =>
                room.roomId === allocateRoom.roomId
                  ? {
                      ...room,
                      beds: room.beds.map((bed) =>
                        bed.bedId === allocateRoom.bed.bedId
                          ? { ...bed, status: "Occupied", patient: { ...newPatient } }
                          : bed
                      ),
                    }
                  : room
              ),
            }
          : ward
      )
    );
    setSnackOptions({ color: "success", message: `Patient allocated to ${allocateRoom.bed.bedLabel}` });
    setSnackOpen(true);
    setAllocateDialogOpen(false);
    setAllocateRoom(null);
  };
  const handleDeallocateBed = (wardId, roomId, bedId) => {
    setWards((prev) =>
      prev.map((ward) =>
        ward.wardId === wardId
          ? {
              ...ward,
              rooms: ward.rooms.map((room) =>
                room.roomId === roomId
                  ? {
                      ...room,
                      beds: room.beds.map((bed) =>
                        bed.bedId === bedId
                          ? { ...bed, status: "Available", patient: null }
                          : bed
                      ),
                    }
                  : room
              ),
            }
          : ward
      )
    );
    setSnackOptions({ color: "success", message: `Patient deallocated from bed` });
    setSnackOpen(true);
  };

  // Add Room dialog state and handlers
  const handleOpenAddRoom = () => {
    setAddRoomDialogOpen(true);
    setNewRoomWardId(wards[0]?.wardId || "");
    setNewRoomLabel("");
    setNewRoomBeds(2);
  };
  const handleCloseAddRoom = () => {
    setAddRoomDialogOpen(false);
  };
  const handleAddRoomSubmit = () => {
    if (!newRoomWardId || !newRoomLabel || newRoomBeds < 1) {
      setSnackOptions({ color: "error", message: "Please fill all room details." });
      setSnackOpen(true);
      return;
    }
    setWards((prev) =>
      prev.map((ward) =>
        ward.wardId === newRoomWardId
          ? {
              ...ward,
              rooms: [
                ...ward.rooms,
                {
                  roomId: Date.now(),
                  roomLabel: newRoomLabel,
                  beds: Array.from({ length: newRoomBeds }, (_, i) => ({
                    bedId: i + 1,
                    bedLabel: `${newRoomLabel}-${String.fromCharCode(65 + i)}`,
                    status: "Available",
                    patient: null,
                  })),
                },
              ],
            }
          : ward
      )
    );
    setSnackOptions({ color: "success", message: `Room ${newRoomLabel} added to ward.` });
    setSnackOpen(true);
    handleCloseAddRoom();
  };

  // Add Bed handlers
  const handleOpenAddBed = (wardId, roomId) => {
    setAddBedRoom({ wardId, roomId });
    setAddBedDialogOpen(true);
  };
  const handleCloseAddBed = () => {
    setAddBedDialogOpen(false);
    setAddBedRoom(null);
  };
  const handleAddBedSubmit = () => {
    if (!addBedRoom) return;
    setWards(prev => prev.map(ward =>
      ward.wardId === addBedRoom.wardId
        ? {
            ...ward,
            rooms: ward.rooms.map(room =>
              room.roomId === addBedRoom.roomId
                ? {
                    ...room,
                    beds: [
                      ...room.beds,
                      {
                        bedId: Date.now(),
                        bedLabel: `${room.roomLabel}-${String.fromCharCode(65 + room.beds.length)}`,
                        status: "Available",
                        patient: null,
                      },
                    ],
                  }
                : room
            ),
          }
        : ward
    ));
    setSnackOptions({ color: "success", message: `Bed added to room.` });
    setSnackOpen(true);
    handleCloseAddBed();
  };

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
        <Tooltip title="Edit Room">
          <IconButton
            color="primary"
            size="medium"
            onClick={() => alert(`Edit room ID: ${params.row.id}`)}
          >
            <EditNoteOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      headerName: "View",
      minWidth: 70,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderHeader: () => <VisibilityOutlinedIcon color="info" />,
      renderCell: (params) => (
        <Tooltip title="View Room Details">
          <IconButton
            color="info"
            size="large"
            onClick={() => handleViewRoom(params.row)}
          >
            <VisibilityOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      ),
    },
    { field: "id", headerName: "ID", minWidth: 80 },
    { field: "ward", headerName: "Ward", minWidth: 120 },
    { field: "bed", headerName: "Bed", minWidth: 120 },
    { field: "type", headerName: "Type", minWidth: 140 },
    {
      field: "currentPatient",
      headerName: "Current Patient",
      minWidth: 160,
      renderCell: (params) => (
        params.row.patients.length > 0 ? (
          <Typography fontWeight={600} color="primary.main">{params.row.patients[0].name}</Typography>
        ) : (
          <Typography color="text.secondary">Available</Typography>
        )
      ),
    },
    {
      field: "patients",
      headerName: "Patients",
      minWidth: 100,
      renderCell: (params) => (
        <Chip
          label={params.row.patients.length}
          color={params.row.patients.length > 0 ? "primary" : "default"}
          size="small"
          sx={{ fontWeight: 700 }}
        />
      ),
    },
    {
      field: "allocate",
      headerName: "Allocate",
      minWidth: 110,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        params.row.patients.length === 0 ? (
          <Button variant="outlined" size="small" color="success" onClick={() => handleOpenAllocate(params.row.wardId, params.row.roomId, params.row.bed)}>
            Allocate
          </Button>
        ) : null
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row.wardId, e.target.value)}
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

  // Dashboard background and card style
  const bgGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #181c2a 0%, #232946 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  const cardGradient = theme.palette.mode === 'dark'
    ? "linear-gradient(135deg, #232946 0%, #181c2a 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
  const cardText = theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b';

  const statusData = getStatusData(wards);
  const summary = getSummaryStats(wards);
  const bedChartData = getBedOccupancyChartData(wards);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: bgGradient }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, pt: 6, overflow: "auto" }}>
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
            Room/Bed/Ward Management
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            color={theme.palette.mode === 'dark' ? '#fbbf24' : 'primary.main'}
            sx={{ mb: 1 }}
          >
            Manage and monitor all hospital rooms, beds, and wards
          </Typography>
        </Box>
        {/* Summary Cards & Chart */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6} sm={3} md={2}>
            <Card sx={{ p: 1, background: cardGradient, color: cardText, borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
                <BedIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>{summary.totalRooms}</Typography>
                <Typography variant="body2">Total Rooms</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Card sx={{ p: 1, background: cardGradient, color: cardText, borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
                <Chip label="Occupied" size="small" sx={{ bgcolor: '#f87171', color: '#fff', mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>{summary.occupiedBeds}</Typography>
                <Typography variant="body2">Occupied Beds</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Card sx={{ p: 1, background: cardGradient, color: cardText, borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
                <Chip label="Available" size="small" sx={{ bgcolor: '#10b981', color: '#fff', mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>{summary.availableBeds}</Typography>
                <Typography variant="body2">Available Beds</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Card sx={{ p: 1, background: cardGradient, color: cardText, borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
                <Chip label="ICU" size="small" sx={{ bgcolor: '#6366f1', color: '#fff', mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>{summary.totalWards}</Typography>
                <Typography variant="body2">Total Wards</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Card sx={{ p: 1, background: cardGradient, color: cardText, borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
                <Chip label="Private" size="small" sx={{ bgcolor: '#fbbf24', color: '#fff', mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>{summary.totalBeds}</Typography>
                <Typography variant="body2">Total Beds</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 1, background: cardGradient, color: cardText, borderRadius: 2, boxShadow: 2, height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent sx={{ height: 150, p: 1 }}>
                <ResponsiveContainer width="100%" height={130}>
                  <PieChart>
                    <Pie data={bedChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} label>
                      {bedChartData.map((entry, idx) => (
                        <Cell key={`cell-status-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                    <RechartsTooltip contentStyle={{ background: theme.palette.mode === 'dark' ? '#232946' : '#fff', color: cardText }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Table Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: 1, mb: 2 }}>Room & Bed Management</Typography>
          <Button variant="contained" color="primary" startIcon={<AddCircleOutline />} onClick={handleOpenAddRoom} sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1, mb: 3 }}>Add Room</Button>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: 'primary.main', letterSpacing: 1 }}>All Rooms</Typography>
          <MuiGrid container spacing={4}>
            {wards.flatMap(ward => ward.rooms.map(room => (
              <MuiGrid item xs={12} sm={6} md={4} lg={3} key={room.roomId}>
                <Paper elevation={4} sx={{ borderRadius: 4, boxShadow: 4, background: cardGradient, color: cardText, minHeight: 180, display: 'flex', flexDirection: 'column', p: 3, gap: 2 }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={700}>{ward.wardName}</Typography>
                    <Typography variant="h5" fontWeight={800} sx={{ color: 'primary.main', letterSpacing: 1 }}>{room.roomLabel}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Beds</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                    {room.beds.map(bed => (
                      <Tooltip key={bed.bedId} title={bed.patient ? bed.patient.name : (bed.status === 'Available' ? 'Available' : bed.status)} placement="top">
                        <Chip
                          label={bed.bedLabel + (bed.patient ? ` (${bed.patient.name.split(' ').map(n => n[0]).join('')})` : '')}
                          color={bed.status === 'Occupied' ? 'error' : 'success'}
                          variant={bed.status === 'Available' ? 'outlined' : 'filled'}
                          size="small"
                          sx={{ fontWeight: 700, fontSize: 13, px: 1.5, py: 1, borderRadius: 2, cursor: 'pointer', minWidth: 70 }}
                          onClick={() => setDrawerBed({ wardId: ward.wardId, roomId: room.roomId, bed })}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Button size="medium" color="success" startIcon={<AddCircleOutline />} onClick={() => handleOpenAddBed(ward.wardId, room.roomId)} sx={{ fontWeight: 700, borderRadius: 2, alignSelf: 'flex-end' }}>Add Bed</Button>
                </Paper>
              </MuiGrid>
            )))}
          </MuiGrid>
        </Box>
        <SnackBar open={snackOpen} setOpen={setSnackOpen} options={snackOptions} />
      </Box>
      {/* Room Details Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 380 },
            maxWidth: 420,
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
            Room/Bed/Ward Details
          </Typography>
          {selectedRoom ? (
            <Paper elevation={0} sx={{ mb: 3, p: 2, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 48, height: 48, fontSize: 24, bgcolor: '#6366f1' }}>{selectedRoom.bed.bedLabel[0]}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{selectedRoom.bed.bedLabel}</Typography>
                  <Typography variant="body2" color="text.secondary">Bed</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <Typography variant="body2"><b>Ward:</b> {selectedRoom.wardName}</Typography>
                <Typography variant="body2"><b>Room:</b> {selectedRoom.roomLabel}</Typography>
                <Typography variant="body2"><b>Status:</b> {selectedRoom.status}</Typography>
                <Typography variant="body2"><b>Bed ID:</b> {selectedRoom.bed.bedLabel}</Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Patient in this Bed</Typography>
              {selectedRoom.patient ? (
                <Stack spacing={2}>
                  <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#1e293b' : '#fff', boxShadow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: '#6366f1', width: 36, height: 36 }}>{selectedRoom.patient.name[0]}</Avatar>
                      <Box flex={1}>
                        <Typography variant="body1" fontWeight={600}>{selectedRoom.patient.name}</Typography>
                        <Typography variant="body2" color="text.secondary">Age: {selectedRoom.patient.age}, Gender: {selectedRoom.patient.gender}</Typography>
                        <Typography variant="body2" color="text.secondary">Admitted: {selectedRoom.patient.admissionDate}</Typography>
                      </Box>
                      <Button variant="outlined" color="error" size="small" onClick={() => handleDeallocateBed(selectedRoom.wardId, selectedRoom.roomId, selectedRoom.bed.bedId)}>
                        Deallocate
                      </Button>
                    </Stack>
                  </Paper>
                </Stack>
              ) : (
                <>
                  <Typography variant="body2" color="text.secondary">No patient assigned to this bed.</Typography>
                  <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={() => handleOpenAllocate(selectedRoom.wardId, selectedRoom.roomId, selectedRoom.bed)}>
                    Allocate Patient
                  </Button>
                </>
              )}
            </Paper>
          ) : (
            <Typography variant="body2" color="text.secondary">No room selected.</Typography>
          )}
          <Button onClick={handleCloseDrawer} color="primary" variant="contained" fullWidth sx={{ fontWeight: 600, mt: 4 }}>
            Close
          </Button>
        </Box>
      </Drawer>
      {/* Allocate Patient Dialog */}
      <Dialog open={allocateDialogOpen} onClose={handleCloseAllocate} maxWidth="xs" fullWidth>
        <DialogTitle>Allocate Patient</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              value={newPatient.name}
              onChange={e => setNewPatient(p => ({ ...p, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Age"
              type="number"
              value={newPatient.age}
              onChange={e => setNewPatient(p => ({ ...p, age: e.target.value }))}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <MuiSelect
                label="Gender"
                value={newPatient.gender}
                onChange={e => setNewPatient(p => ({ ...p, gender: e.target.value }))}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </MuiSelect>
            </FormControl>
            <TextField
              label="Admission Date"
              type="date"
              value={newPatient.admissionDate}
              onChange={e => setNewPatient(p => ({ ...p, admissionDate: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAllocate}>Cancel</Button>
          <Button onClick={handleAllocateBedSubmit} variant="contained" color="success">Allocate</Button>
        </DialogActions>
      </Dialog>
      {/* Add Room Dialog */}
      <Dialog open={addRoomDialogOpen} onClose={handleCloseAddRoom} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Room</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel>Ward</InputLabel>
              <MuiSelect
                label="Ward"
                value={newRoomWardId}
                onChange={e => setNewRoomWardId(e.target.value)}
              >
                {wards.map(ward => (
                  <MenuItem key={ward.wardId} value={ward.wardId}>{ward.wardName}</MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
            <TextField
              label="Room Label"
              value={newRoomLabel}
              onChange={e => setNewRoomLabel(e.target.value)}
              fullWidth
            />
            <TextField
              label="Number of Beds"
              type="number"
              value={newRoomBeds}
              onChange={e => setNewRoomBeds(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddRoom}>Cancel</Button>
          <Button onClick={handleAddRoomSubmit} variant="contained" color="success">Add Room</Button>
        </DialogActions>
      </Dialog>
      {/* Add Bed Dialog */}
      <Dialog open={addBedDialogOpen} onClose={handleCloseAddBed} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Bed</DialogTitle>
        <DialogContent>
          <Typography>Bed will be added to the end of the selected room.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddBed}>Cancel</Button>
          <Button onClick={handleAddBedSubmit} variant="contained" color="success">Add Bed</Button>
        </DialogActions>
      </Dialog>
      {/* Drawer for bed details and allocation */}
      <Drawer
        anchor="right"
        open={!!drawerBed}
        onClose={() => setDrawerBed(null)}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 380 },
            maxWidth: 420,
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
            Bed Details
          </Typography>
          {drawerBed ? (
            <Paper elevation={0} sx={{ mb: 3, p: 2, borderRadius: 2, background: theme.palette.mode === 'dark' ? '#232946' : '#f3f4f6' }}>
              <Typography variant="subtitle1" fontWeight={700}>{drawerBed.bed.bedLabel}</Typography>
              <Typography variant="body2" color="text.secondary">Status: {drawerBed.bed.status}</Typography>
              {drawerBed.bed.patient ? (
                <>
                  <Typography variant="body2" color="text.secondary">Patient: {drawerBed.bed.patient.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Age: {drawerBed.bed.patient.age}, Gender: {drawerBed.bed.patient.gender}</Typography>
                  <Typography variant="body2" color="text.secondary">Admitted: {drawerBed.bed.patient.admissionDate}</Typography>
                  <Button variant="outlined" color="error" fullWidth sx={{ mt: 2 }} onClick={() => handleDeallocateBed(drawerBed.wardId, drawerBed.roomId, drawerBed.bed.bedId)}>
                    Deallocate
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={() => handleOpenAllocate(drawerBed.wardId, drawerBed.roomId, drawerBed.bed)}>
                  Allocate Patient
                </Button>
              )}
            </Paper>
          ) : null}
          <Button onClick={() => setDrawerBed(null)} color="primary" variant="contained" fullWidth sx={{ fontWeight: 600, mt: 4 }}>
            Close
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
} 