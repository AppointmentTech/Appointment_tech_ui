import React, { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  Stack,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Chip,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import AttendanceCalendar from "./AttendanceCalendar.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CoffeeIcon from "@mui/icons-material/Coffee";
import dayjs from "dayjs";
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SketchPicker } from 'react-color';
import Papa from 'papaparse';

const GarageAttendance = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [holidayDialogOpen, setHolidayDialogOpen] = useState(false);
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectedHolidayIDs, setSelectedHolidayIDs] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkStaffIds, setBulkStaffIds] = useState([]);
  const [holidayColor, setHolidayColor] = useState('#FFA726');
  const [holidayRecurring, setHolidayRecurring] = useState(false);
  const [holidayDetail, setHolidayDetail] = useState(null);
  const [holidayDetailOpen, setHolidayDetailOpen] = useState(false);
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [staffProfile, setStaffProfile] = useState(null);
  const [staffForm, setStaffForm] = useState({ id: '', name: '', position: '', phone: '', email: '', joinDate: '', status: 'active' });
  const [staffFormError, setStaffFormError] = useState('');
  const [staffList, setStaffList] = useState([
    { id: 1, name: "Ravi Kumar", position: "Mechanic", phone: "+91 98765 43210", email: "ravi@garage.com", joinDate: "2023-01-15" },
    { id: 2, name: "Amit Singh", position: "Electrician", phone: "+91 98765 43211", email: "amit@garage.com", joinDate: "2023-02-20" },
    { id: 3, name: "Sneha Patel", position: "Service Advisor", phone: "+91 98765 43212", email: "sneha@garage.com", joinDate: "2023-03-10" },
    { id: 4, name: "Rajesh Kumar", position: "Painter", phone: "+91 98765 43213", email: "rajesh@garage.com", joinDate: "2023-01-25" },
    { id: 5, name: "Priya Sharma", position: "Receptionist", phone: "+91 98765 43214", email: "priya@garage.com", joinDate: "2023-04-05" },
  ]);

  // Enhanced attendance records with punch in/out, lunch, and break times
  const [records, setRecords] = useState([
    { 
      id: 1, 
      staffId: 1, 
      staffName: "Ravi Kumar", 
      date: "2025-01-25", 
      status: "Present", 
      punchIn: "09:00", 
      punchOut: "18:00",
      lunchStart: "13:00",
      lunchEnd: "14:00",
      breakStart: "11:00",
      breakEnd: "11:15",
      totalHours: "9.0",
      workingHours: "8.0"
    },
    { 
      id: 2, 
      staffId: 2, 
      staffName: "Amit Singh", 
      date: "2025-01-25", 
      status: "Present", 
      punchIn: "08:45", 
      punchOut: "17:30",
      lunchStart: "12:30",
      lunchEnd: "13:30",
      breakStart: "10:30",
      breakEnd: "10:45",
      totalHours: "8.75",
      workingHours: "7.75"
    },
    { 
      id: 3, 
      staffId: 3, 
      staffName: "Sneha Patel", 
      date: "2025-01-25", 
      status: "Present", 
      punchIn: "09:15", 
      punchOut: "18:15",
      lunchStart: "13:15",
      lunchEnd: "14:15",
      breakStart: "11:15",
      breakEnd: "11:30",
      totalHours: "9.0",
      workingHours: "8.0"
    },
    { 
      id: 4, 
      staffId: 4, 
      staffName: "Rajesh Kumar", 
      date: "2025-01-25", 
      status: "Absent", 
      punchIn: "", 
      punchOut: "",
      lunchStart: "",
      lunchEnd: "",
      breakStart: "",
      breakEnd: "",
      totalHours: "0.0",
      workingHours: "0.0"
    },
    { 
      id: 5, 
      staffId: 5, 
      staffName: "Priya Sharma", 
      date: "2025-01-25", 
      status: "Present", 
      punchIn: "08:30", 
      punchOut: "17:45",
      lunchStart: "12:45",
      lunchEnd: "13:45",
      breakStart: "10:45",
      breakEnd: "11:00",
      totalHours: "9.25",
      workingHours: "8.25"
    },
  ]);

  // Holiday data
  const [holidays, setHolidays] = useState([
    { id: 1, name: "Republic Day", date: "2025-01-26", type: "National Holiday", description: "Republic Day of India", recurring: false },
    { id: 2, name: "Holi", date: "2025-03-14", type: "Festival", description: "Holi Festival", recurring: false },
    { id: 3, name: "Independence Day", date: "2025-08-15", type: "National Holiday", description: "Independence Day of India", recurring: false },
    { id: 4, name: "Diwali", date: "2025-11-01", type: "Festival", description: "Diwali Festival", recurring: false },
  ]);

  // Calendar events
  const calendarEvents = useMemo(() => {
    const events = [];
    
    // Add attendance events
    records.forEach(record => {
      const eventDate = new Date(record.date);
      events.push({
        id: `attendance-${record.id}`,
        title: `${record.staffName} - ${record.status}`,
        start: eventDate,
        end: eventDate,
        resource: record,
        type: 'attendance',
        color: record.status === 'Present' ? theme.palette.success.main : theme.palette.error.main,
        punchIn: record.punchIn,
        punchOut: record.punchOut,
        totalHours: record.totalHours
      });
    });

    // Add holiday events
    holidays.forEach(holiday => {
      let eventDate = new Date(holiday.date);
      // If recurring, set year to current
      if (holiday.recurring) {
        eventDate.setFullYear(new Date().getFullYear());
      }
      events.push({
        id: `holiday-${holiday.id}`,
        title: holiday.name,
        start: eventDate,
        end: eventDate,
        resource: holiday,
        type: 'holiday',
        color: holiday.color || theme.palette.warning.main,
        icon: '🎉',
        recurring: holiday.recurring,
        description: holiday.description
      });
    });

    return events;
  }, [records, holidays, theme.palette]);

  // Staff-specific calendar events
  const getStaffCalendarEvents = (staffId) => {
    const staffRecords = records.filter(record => record.staffId === staffId);
    const events = [];
    
    staffRecords.forEach(record => {
      const eventDate = new Date(record.date);
      events.push({
        id: `attendance-${record.id}`,
        title: `${record.status} - ${record.punchIn || 'N/A'} to ${record.punchOut || 'N/A'}`,
        start: eventDate,
        end: eventDate,
        resource: record,
        type: 'attendance',
        color: record.status === 'Present' ? theme.palette.success.main : theme.palette.error.main,
        punchIn: record.punchIn,
        punchOut: record.punchOut,
        totalHours: record.totalHours
      });
    });

    return events;
  };

  // Helper: Calculate total and working hours
  const calculateHours = (punchIn, punchOut, lunchStart, lunchEnd, breakStart, breakEnd) => {
    if (!punchIn || !punchOut) return { total: '0.0', working: '0.0' };
    const start = dayjs(punchIn, 'HH:mm');
    const end = dayjs(punchOut, 'HH:mm');
    let total = end.diff(start, 'minute') / 60;
    let working = total;
    if (lunchStart && lunchEnd) {
      const lunchS = dayjs(lunchStart, 'HH:mm');
      const lunchE = dayjs(lunchEnd, 'HH:mm');
      working -= (lunchE.diff(lunchS, 'minute') / 60);
    }
    if (breakStart && breakEnd) {
      const breakS = dayjs(breakStart, 'HH:mm');
      const breakE = dayjs(breakEnd, 'HH:mm');
      working -= (breakE.diff(breakS, 'minute') / 60);
    }
    return {
      total: total > 0 ? total.toFixed(2) : '0.0',
      working: working > 0 ? working.toFixed(2) : '0.0',
    };
  };

  // Helper: Get all attendance records for a staff
  const getStaffAttendance = (staffId) => records.filter(r => r.staffId === staffId);

  // Staff table columns with actions first
  const staffColumns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Profile">
            <IconButton size="small" color="info" onClick={() => handleViewStaffProfile(params.row)}>
              <Avatar sx={{ width: 24, height: 24 }}>{params.row.name.charAt(0)}</Avatar>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Staff">
            <IconButton size="small" color="primary" onClick={() => { setStaffForm(params.row); setStaffModalOpen(true); }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Staff">
            <IconButton size="small" color="error" onClick={() => setStaffList(prev => prev.filter(s => s.id !== params.row.id))}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'joinDate', headerName: 'Join Date', width: 120 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
      <Chip label={params.value === 'active' ? 'Active' : 'Inactive'} color={params.value === 'active' ? 'success' : 'default'} size="small" />
    ) },
  ];

  // Enhanced attendance table columns
  const attendanceColumns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" onClick={() => handleOpenDialog(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'staffName', headerName: 'Staff Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Present' ? 'success' : 'error'}
          size="small"
        />
      )
    },
    { 
      field: 'punchIn', 
      headerName: 'Punch In', 
      width: 100,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <AccessTimeIcon fontSize="small" color="primary" />
          <Typography variant="body2">{params.value || '-'}</Typography>
        </Stack>
      )
    },
    { 
      field: 'punchOut', 
      headerName: 'Punch Out', 
      width: 100,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <AccessTimeIcon fontSize="small" color="secondary" />
          <Typography variant="body2">{params.value || '-'}</Typography>
        </Stack>
      )
    },
    { 
      field: 'lunchStart', 
      headerName: 'Lunch Start', 
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <RestaurantIcon fontSize="small" color="warning" />
          <Typography variant="body2">{params.value || '-'}</Typography>
        </Stack>
      )
    },
    { 
      field: 'lunchEnd', 
      headerName: 'Lunch End', 
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <RestaurantIcon fontSize="small" color="warning" />
          <Typography variant="body2">{params.value || '-'}</Typography>
        </Stack>
      )
    },
    { 
      field: 'breakStart', 
      headerName: 'Break Start', 
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <CoffeeIcon fontSize="small" color="info" />
          <Typography variant="body2">{params.value || '-'}</Typography>
        </Stack>
      )
    },
    { 
      field: 'breakEnd', 
      headerName: 'Break End', 
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <CoffeeIcon fontSize="small" color="info" />
          <Typography variant="body2">{params.value || '-'}</Typography>
        </Stack>
      )
    },
    { field: 'totalHours', headerName: 'Total Hours', width: 100 },
    { field: 'workingHours', headerName: 'Working Hours', width: 120 },
  ];

  // Holiday table columns with actions first
  const holidayColumns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" onClick={() => handleOpenHolidayDialog(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Holiday Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
  ];

  const handleOpenDialog = (record = null) => {
    setSelectedRecord(
      record || {
        staffId: "",
        staffName: "",
        date: dayjs().format("YYYY-MM-DD"),
        status: "Present",
        punchIn: "",
        punchOut: "",
        lunchStart: "",
        lunchEnd: "",
        breakStart: "",
        breakEnd: "",
        totalHours: "0.0",
        workingHours: "0.0"
      }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRecord(null);
  };

  const handleOpenHolidayDialog = (holiday = null) => {
    setSelectedHoliday(
      holiday || {
        name: "",
        date: dayjs().format("YYYY-MM-DD"),
        type: "National Holiday",
        description: "",
        recurring: false,
        color: '#FFA726',
      }
    );
    setHolidayDialogOpen(true);
    setHolidayColor(holiday?.color || '#FFA726');
    setHolidayRecurring(holiday?.recurring || false);
  };

  const handleCloseHolidayDialog = () => {
    setHolidayDialogOpen(false);
    setSelectedHoliday(null);
    setHolidayColor('#FFA726');
    setHolidayRecurring(false);
  };

  const handleViewStaffCalendar = (staff) => {
    setSelectedStaff(staff);
    setCalendarDialogOpen(true);
  };

  const handleCloseCalendarDialog = () => {
    setCalendarDialogOpen(false);
    setSelectedStaff(null);
  };

  const handleSave = () => {
    // Validation
    if (!selectedRecord?.staffId || !selectedRecord?.date || !selectedRecord?.status) {
      setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'error' });
      return;
    }
    if (selectedRecord.punchIn && selectedRecord.punchOut) {
      const inTime = dayjs(selectedRecord.punchIn, 'HH:mm');
      const outTime = dayjs(selectedRecord.punchOut, 'HH:mm');
      if (outTime.isBefore(inTime)) {
        setSnackbar({ open: true, message: 'Punch out time cannot be before punch in.', severity: 'error' });
        return;
      }
    }
    // Auto-calc hours
    const { total, working } = calculateHours(
      selectedRecord.punchIn,
      selectedRecord.punchOut,
      selectedRecord.lunchStart,
      selectedRecord.lunchEnd,
      selectedRecord.breakStart,
      selectedRecord.breakEnd
    );
    const newRecord = {
      id: selectedRecord?.id || Date.now(),
      ...selectedRecord,
      totalHours: total,
      workingHours: working,
    };
    setRecords((prev) =>
      selectedRecord?.id
        ? prev.map((r) => (r.id === selectedRecord.id ? newRecord : r))
        : [...prev, newRecord]
    );
    setSnackbar({ open: true, message: selectedRecord?.id ? 'Attendance updated.' : 'Attendance marked.', severity: 'success' });
    handleCloseDialog();
  };

  // Bulk marking handler
  const handleBulkMark = () => {
    if (!bulkStaffIds.length) {
      setSnackbar({ open: true, message: 'Select at least one staff.', severity: 'error' });
      return;
    }
    if (!selectedRecord?.date || !selectedRecord?.status) {
      setSnackbar({ open: true, message: 'Date and status required.', severity: 'error' });
      return;
    }
    const { total, working } = calculateHours(
      selectedRecord.punchIn,
      selectedRecord.punchOut,
      selectedRecord.lunchStart,
      selectedRecord.lunchEnd,
      selectedRecord.breakStart,
      selectedRecord.breakEnd
    );
    const newRecords = bulkStaffIds.map(staffId => {
      const staff = staffList.find(s => s.id === staffId);
      return {
        id: Date.now() + Math.random(),
        staffId,
        staffName: staff ? staff.name : '',
        date: selectedRecord.date,
        status: selectedRecord.status,
        punchIn: selectedRecord.punchIn,
        punchOut: selectedRecord.punchOut,
        lunchStart: selectedRecord.lunchStart,
        lunchEnd: selectedRecord.lunchEnd,
        breakStart: selectedRecord.breakStart,
        breakEnd: selectedRecord.breakEnd,
        totalHours: total,
        workingHours: working,
      };
    });
    setRecords(prev => [...prev, ...newRecords]);
    setSnackbar({ open: true, message: 'Bulk attendance marked.', severity: 'success' });
    setBulkDialogOpen(false);
    setBulkStaffIds([]);
  };

  const handleDelete = () => {
    setRecords((prev) => prev.filter((record) => !selectedIDs.includes(record.id)));
    setSelectedIDs([]);
  };

  const handleDeleteHolidays = () => {
    setHolidays((prev) => prev.filter((holiday) => !selectedHolidayIDs.includes(holiday.id)));
    setSelectedHolidayIDs([]);
  };

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Restore handleSaveHoliday
  const handleSaveHoliday = () => {
    if (!selectedHoliday?.name || !selectedHoliday?.date) {
      setSnackbar({ open: true, message: 'Holiday name and date are required.', severity: 'error' });
      return;
    }
    const newHoliday = {
      id: selectedHoliday?.id || Date.now(),
      ...selectedHoliday,
      color: holidayColor,
      recurring: holidayRecurring,
    };
    setHolidays((prev) =>
      selectedHoliday?.id
        ? prev.map((h) => (h.id === selectedHoliday.id ? newHoliday : h))
        : [...prev, newHoliday]
    );
    setSnackbar({ open: true, message: selectedHoliday?.id ? 'Holiday updated.' : 'Holiday added.', severity: 'success' });
    setHolidayDialogOpen(false);
    setSelectedHoliday(null);
    setHolidayColor('#FFA726');
    setHolidayRecurring(false);
  };

  // Staff import handler
  const handleStaffImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      const imported = rows.slice(1).filter(r => r.length >= 5).map(r => ({
        id: Date.now() + Math.random(),
        name: r[0],
        position: r[1],
        phone: r[2],
        email: r[3],
        joinDate: r[4],
        status: r[5] || 'active',
      }));
      setStaffList(prev => [...prev, ...imported]);
    };
    reader.readAsText(file);
  };

  // Staff export data

  const handleExportStaffCSV = () => {
    const csv = Papa.unparse([
      ['Name', 'Position', 'Phone', 'Email', 'Join Date', 'Status'],
      ...staffList.map(s => [s.name, s.position, s.phone, s.email, s.joinDate, s.status])
    ]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'staff-list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Staff add/edit handler
  const handleStaffSave = () => {
    if (!staffForm.name || !staffForm.position || !staffForm.phone || !staffForm.email || !staffForm.joinDate) {
      setStaffFormError('All fields are required.');
      return;
    }
    if (staffForm.id) {
      setStaffList(prev => prev.map(s => s.id === staffForm.id ? { ...staffForm } : s));
    } else {
      setStaffList(prev => [...prev, { ...staffForm, id: Date.now() }]);
    }
    setStaffModalOpen(false);
    setStaffForm({ id: '', name: '', position: '', phone: '', email: '', joinDate: '', status: 'active' });
    setStaffFormError('');
  };

  // Staff profile view
  const handleViewStaffProfile = (staff) => {
    setStaffProfile(staff);
  };
  const handleCloseStaffProfile = () => setStaffProfile(null);

  // Add React.memo for DataGrid rows
  const MemoizedDataGrid = React.memo(DataGrid);

  const [attendancePreviewOpen, setAttendancePreviewOpen] = useState(false);
  const [attendancePreview, setAttendancePreview] = useState(null);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CommonHeader role="admin" />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          overflow: "auto",
          backgroundColor: theme.palette.background.default,
        }}
        tabIndex={0}
        aria-label="Garage Attendance Main Content"
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">Staff Attendance Management</Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              startIcon={<AddCircleIcon />} 
              onClick={() => handleOpenDialog()}
              aria-label="Mark Attendance"
            >
              Mark Attendance
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<BeachAccessIcon />} 
              onClick={() => handleOpenHolidayDialog()}
              aria-label="Add Holiday"
            >
              Add Holiday
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setBulkDialogOpen(true)}
              aria-label="Bulk Mark Attendance"
            >
              Bulk Mark Attendance
            </Button>
          </Stack>
        </Grid>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{presentCount}</Typography>
              <Typography variant="body2">Present Today</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{absentCount}</Typography>
              <Typography variant="body2">Absent Today</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{staffList.length}</Typography>
              <Typography variant="body2">Total Staff</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{holidays.length}</Typography>
              <Typography variant="body2">Total Holidays</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ width: '100%', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="attendance tabs">
            <Tab icon={<EventIcon />} label="Calendar View" />
            <Tab icon={<PeopleIcon />} label="Staff Details" />
            <Tab icon={<AssignmentIcon />} label="Attendance Records" />
            <Tab icon={<BeachAccessIcon />} label="Holiday List" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <AttendanceCalendar 
            events={calendarEvents}
            height={600}
            title="Attendance Calendar"
            onEventClick={(event) => {
              if (event.type === 'attendance') {
                setAttendancePreview(event.resource);
                setAttendancePreviewOpen(true);
              } else if (event.type === 'holiday') {
                setHolidayDetail(event.resource);
                setHolidayDetailOpen(true);
              }
            }}
          />
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 2, height: 600 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button variant="contained" color="primary" onClick={() => { setStaffForm({ id: '', name: '', position: '', phone: '', email: '', joinDate: '', status: 'active' }); setStaffModalOpen(true); }} aria-label="Add Staff">Add Staff</Button>
              <Button variant="outlined" component="label" aria-label="Import Staff CSV">Import CSV<input type="file" accept=".csv" hidden onChange={handleStaffImport} /></Button>
              <Button variant="outlined" aria-label="Export Staff CSV" onClick={handleExportStaffCSV}>Export CSV</Button>
            </Stack>
            <MemoizedDataGrid
              rows={staffList}
              columns={staffColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                setSelectedIDs(newSelection);
              }}
              components={{
                Toolbar: CustomTableToolbar,
              }}
              componentsProps={{
                toolbar: {
                  rows: staffList,
                  columns: staffColumns,
                  selectedIDs: selectedIDs,
                  handleDelete: handleDelete,
                },
              }}
              sx={{
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                },
                "& .MuiDataGrid-columnHeader": {
                  borderRight: `1px solid ${theme.palette.divider}`,
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                  },
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.paper,
                  borderTop: `1px solid ${theme.palette.divider}`,
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.background.paper,
                },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: theme.palette.background.paper,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
              }}
            />
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 2, height: 600 }}>
            <MemoizedDataGrid
              rows={records}
              columns={attendanceColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                setSelectedIDs(newSelection);
              }}
              components={{
                Toolbar: CustomTableToolbar,
              }}
              componentsProps={{
                toolbar: {
                  rows: records,
                  columns: attendanceColumns,
                  selectedIDs: selectedIDs,
                  handleDelete: handleDelete,
                },
              }}
              sx={{
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                },
                "& .MuiDataGrid-columnHeader": {
                  borderRight: `1px solid ${theme.palette.divider}`,
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                  },
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.paper,
                  borderTop: `1px solid ${theme.palette.divider}`,
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.background.paper,
                },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: theme.palette.background.paper,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
              }}
            />
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper sx={{ p: 2, height: 600 }}>
            <MemoizedDataGrid
              rows={holidays}
              columns={holidayColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                setSelectedHolidayIDs(newSelection);
              }}
              components={{
                Toolbar: CustomTableToolbar,
              }}
              componentsProps={{
                toolbar: {
                  rows: holidays,
                  columns: holidayColumns,
                  selectedIDs: selectedHolidayIDs,
                  handleDelete: handleDeleteHolidays,
                },
              }}
              sx={{
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                },
                "& .MuiDataGrid-columnHeader": {
                  borderRight: `1px solid ${theme.palette.divider}`,
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                  },
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.paper,
                  borderTop: `1px solid ${theme.palette.divider}`,
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.background.paper,
                },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: theme.palette.background.paper,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
              }}
            />
          </Paper>
        )}

        {/* Enhanced Attendance Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md" aria-label="Attendance Dialog" tabIndex={0}>
          <DialogTitle>{selectedRecord?.id ? "Update" : "Mark"} Attendance</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Staff Member</InputLabel>
                    <Select
                      value={selectedRecord?.staffId || ""}
                      onChange={(e) => {
                        const staff = staffList.find(s => s.id === e.target.value);
                        setSelectedRecord((prev) => ({ 
                          ...prev, 
                          staffId: e.target.value,
                          staffName: staff ? staff.name : ""
                        }));
                      }}
                    >
                      {staffList.map((staff) => (
                        <MenuItem key={staff.id} value={staff.id}>
                          {staff.name} - {staff.position}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={selectedRecord?.date || ""}
                    onChange={(e) =>
                      setSelectedRecord((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedRecord?.status || "Present"}
                      onChange={(e) =>
                        setSelectedRecord((prev) => ({ ...prev, status: e.target.value }))
                      }
                    >
                      <MenuItem value="Present">Present</MenuItem>
                      <MenuItem value="Absent">Absent</MenuItem>
                      <MenuItem value="Late">Late</MenuItem>
                      <MenuItem value="Half Day">Half Day</MenuItem>
                      <MenuItem value="Work From Home">Work From Home</MenuItem>
                      <MenuItem value="On Leave">On Leave</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Time Tracking</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Punch In Time"
                    value={selectedRecord?.punchIn ? dayjs(selectedRecord.punchIn, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, punchIn: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Punch Out Time"
                    value={selectedRecord?.punchOut ? dayjs(selectedRecord.punchOut, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, punchOut: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Lunch Break</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Lunch Start Time"
                    value={selectedRecord?.lunchStart ? dayjs(selectedRecord.lunchStart, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, lunchStart: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Lunch End Time"
                    value={selectedRecord?.lunchEnd ? dayjs(selectedRecord.lunchEnd, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, lunchEnd: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Short Break</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Break Start Time"
                    value={selectedRecord?.breakStart ? dayjs(selectedRecord.breakStart, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, breakStart: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Break End Time"
                    value={selectedRecord?.breakEnd ? dayjs(selectedRecord.breakEnd, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, breakEnd: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {selectedRecord?.id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bulk Attendance Dialog */}
        <Dialog open={bulkDialogOpen} onClose={() => setBulkDialogOpen(false)} fullWidth maxWidth="md" aria-label="Bulk Attendance Dialog" tabIndex={0}>
          <DialogTitle>Bulk Mark Attendance</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Staff Members</InputLabel>
                    <Select
                      multiple
                      value={bulkStaffIds}
                      onChange={(e) => setBulkStaffIds(e.target.value)}
                      renderValue={(selected) => selected.map(id => {
                        const staff = staffList.find(s => s.id === id);
                        return staff ? staff.name : id;
                      }).join(', ')}
                    >
                      {staffList.map((staff) => (
                        <MenuItem key={staff.id} value={staff.id}>
                          {staff.name} - {staff.position}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={selectedRecord?.date || ""}
                    onChange={(e) =>
                      setSelectedRecord((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedRecord?.status || "Present"}
                      onChange={(e) =>
                        setSelectedRecord((prev) => ({ ...prev, status: e.target.value }))
                      }
                    >
                      <MenuItem value="Present">Present</MenuItem>
                      <MenuItem value="Absent">Absent</MenuItem>
                      <MenuItem value="Late">Late</MenuItem>
                      <MenuItem value="Half Day">Half Day</MenuItem>
                      <MenuItem value="Work From Home">Work From Home</MenuItem>
                      <MenuItem value="On Leave">On Leave</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Punch In Time"
                    value={selectedRecord?.punchIn ? dayjs(selectedRecord.punchIn, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, punchIn: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Punch Out Time"
                    value={selectedRecord?.punchOut ? dayjs(selectedRecord.punchOut, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, punchOut: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Lunch Start Time"
                    value={selectedRecord?.lunchStart ? dayjs(selectedRecord.lunchStart, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, lunchStart: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Lunch End Time"
                    value={selectedRecord?.lunchEnd ? dayjs(selectedRecord.lunchEnd, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, lunchEnd: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Break Start Time"
                    value={selectedRecord?.breakStart ? dayjs(selectedRecord.breakStart, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, breakStart: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Break End Time"
                    value={selectedRecord?.breakEnd ? dayjs(selectedRecord.breakEnd, 'HH:mm') : null}
                    onChange={(val) =>
                      setSelectedRecord((prev) => ({ ...prev, breakEnd: val ? val.format('HH:mm') : '' }))
                    }
                    textField={<TextField fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBulkDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleBulkMark}>
              Mark Attendance
            </Button>
          </DialogActions>
        </Dialog>

        {/* Holiday Dialog */}
        <Dialog open={holidayDialogOpen} onClose={handleCloseHolidayDialog} fullWidth maxWidth="sm" aria-label="Holiday Dialog" tabIndex={0}>
          <DialogTitle>{selectedHoliday?.id ? "Update" : "Add"} Holiday</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Holiday Name"
                fullWidth
                value={selectedHoliday?.name || ""}
                onChange={(e) =>
                  setSelectedHoliday((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={selectedHoliday?.date || ""}
                onChange={(e) =>
                  setSelectedHoliday((prev) => ({ ...prev, date: e.target.value }))
                }
                required
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={selectedHoliday?.type || "National Holiday"}
                  onChange={(e) =>
                    setSelectedHoliday((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <MenuItem value="National Holiday">National Holiday</MenuItem>
                  <MenuItem value="Festival">Festival</MenuItem>
                  <MenuItem value="Optional Holiday">Optional Holiday</MenuItem>
                  <MenuItem value="Company Holiday">Company Holiday</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={selectedHoliday?.description || ""}
                onChange={(e) =>
                  setSelectedHoliday((prev) => ({ ...prev, description: e.target.value }))
                }
              />
              <Box>
                <Typography variant="subtitle2">Holiday Color</Typography>
                <SketchPicker
                  color={holidayColor}
                  onChangeComplete={(color) => setHolidayColor(color.hex)}
                  disableAlpha
                  presetColors={["#FFA726", "#66BB6A", "#29B6F6", "#AB47BC", "#FF7043", "#789262"]}
                  width={220}
                />
              </Box>
              <FormControl fullWidth>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography>Recurring (Annual)</Typography>
                  <Select
                    value={holidayRecurring ? 'yes' : 'no'}
                    onChange={(e) => setHolidayRecurring(e.target.value === 'yes')}
                  >
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                  </Select>
                </Stack>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseHolidayDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveHoliday}>
              {selectedHoliday?.id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Holiday Detail Modal */}
        <Dialog open={holidayDetailOpen} onClose={() => setHolidayDetailOpen(false)} aria-label="Holiday Detail" tabIndex={0}>
          <DialogTitle>Holiday Details</DialogTitle>
          <DialogContent>
            {holidayDetail && (
              <Stack spacing={2}>
                <Typography variant="h6">{holidayDetail.name}</Typography>
                <Typography>Date: {holidayDetail.date}</Typography>
                <Typography>Type: {holidayDetail.type}</Typography>
                <Typography>Description: {holidayDetail.description}</Typography>
                <Typography>Recurring: {holidayDetail.recurring ? 'Yes' : 'No'}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>Color:</Typography>
                  <Box sx={{ width: 24, height: 24, background: holidayDetail.color, ml: 1, borderRadius: '50%' }} />
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHolidayDetailOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Staff Attendance Calendar Dialog */}
        <Dialog 
          open={calendarDialogOpen} 
          onClose={handleCloseCalendarDialog} 
          fullWidth 
          maxWidth="lg"
          PaperProps={{
            sx: { height: '90vh' }
          }}
        >
          <DialogTitle>
            {selectedStaff ? `${selectedStaff.name}'s Attendance Calendar` : 'Staff Attendance Calendar'}
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            {selectedStaff && (
              <AttendanceCalendar 
                events={getStaffCalendarEvents(selectedStaff.id)}
                height={600}
                title=""
                onEventClick={(event) => {
                  if (event.type === 'attendance') {
                    handleOpenDialog(event.resource);
                    handleCloseCalendarDialog();
                  }
                }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCalendarDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Staff Add/Edit Modal */}
        <Dialog open={staffModalOpen} onClose={() => setStaffModalOpen(false)} fullWidth maxWidth="sm" aria-label="Staff Modal" tabIndex={0}>
          <DialogTitle>{staffForm.id ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Name" fullWidth value={staffForm.name} onChange={e => setStaffForm(f => ({ ...f, name: e.target.value }))} required />
              <TextField label="Position" fullWidth value={staffForm.position} onChange={e => setStaffForm(f => ({ ...f, position: e.target.value }))} required />
              <TextField label="Phone" fullWidth value={staffForm.phone} onChange={e => setStaffForm(f => ({ ...f, phone: e.target.value }))} required />
              <TextField label="Email" fullWidth value={staffForm.email} onChange={e => setStaffForm(f => ({ ...f, email: e.target.value }))} required />
              <TextField label="Join Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={staffForm.joinDate} onChange={e => setStaffForm(f => ({ ...f, joinDate: e.target.value }))} required />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={staffForm.status} onChange={e => setStaffForm(f => ({ ...f, status: e.target.value }))}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              {staffFormError && <Typography color="error">{staffFormError}</Typography>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStaffModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleStaffSave}>{staffForm.id ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
        {/* Staff Profile Modal */}
        <Dialog open={!!staffProfile} onClose={handleCloseStaffProfile} fullWidth maxWidth="sm" aria-label="Staff Profile" tabIndex={0}>
          <DialogTitle>Staff Profile</DialogTitle>
          <DialogContent>
            {staffProfile && (
              <Stack spacing={2}>
                <Avatar sx={{ width: 64, height: 64, fontSize: 32 }}>{staffProfile.name.charAt(0)}</Avatar>
                <Typography variant="h6">{staffProfile.name}</Typography>
                <Typography>Position: {staffProfile.position}</Typography>
                <Typography>Phone: {staffProfile.phone}</Typography>
                <Typography>Email: {staffProfile.email}</Typography>
                <Typography>Join Date: {staffProfile.joinDate}</Typography>
                <Typography>Status: {staffProfile.status === 'active' ? 'Active' : 'Inactive'}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">Attendance Records</Typography>
                  <Paper variant="outlined" sx={{ maxHeight: 250, overflow: 'auto', mt: 1 }}>
                    <table style={{ width: '100%', fontSize: 13 }}>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Punch In</th>
                          <th>Punch Out</th>
                          <th>Leave/Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getStaffAttendance(staffProfile.id).map((rec) => (
                          <tr key={rec.id}>
                            <td>{rec.date}</td>
                            <td>{rec.status}</td>
                            <td>{rec.punchIn || '-'}</td>
                            <td>{rec.punchOut || '-'}</td>
                            <td>{rec.status === 'On Leave' ? 'Leave' : (rec.status === 'Absent' ? 'Absent' : '')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Paper>
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStaffProfile}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Attendance Preview Dialog */}
        <Dialog open={attendancePreviewOpen} onClose={() => setAttendancePreviewOpen(false)} fullWidth maxWidth="sm" aria-label="Attendance Preview" tabIndex={0}>
          <DialogTitle>Attendance Details</DialogTitle>
          <DialogContent>
            {attendancePreview && (
              <Stack spacing={2}>
                <Typography>Date: {attendancePreview.date}</Typography>
                <Typography>Staff: {attendancePreview.staffName}</Typography>
                <Typography>Status: {attendancePreview.status}</Typography>
                <Typography>Punch In: {attendancePreview.punchIn || '-'}</Typography>
                <Typography>Punch Out: {attendancePreview.punchOut || '-'}</Typography>
                <Typography>Lunch: {attendancePreview.lunchStart || '-'} to {attendancePreview.lunchEnd || '-'}</Typography>
                <Typography>Break: {attendancePreview.breakStart || '-'} to {attendancePreview.breakEnd || '-'}</Typography>
                <Typography>Total Hours: {attendancePreview.totalHours}</Typography>
                <Typography>Working Hours: {attendancePreview.workingHours}</Typography>
                {attendancePreview.status === 'On Leave' && <Typography color="warning.main">Leave</Typography>}
                {attendancePreview.status === 'Absent' && <Typography color="error.main">Absent</Typography>}
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAttendancePreviewOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for feedback */}
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default GarageAttendance;
