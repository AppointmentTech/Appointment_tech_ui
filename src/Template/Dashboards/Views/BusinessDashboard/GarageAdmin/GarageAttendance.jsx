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
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
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

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const GarageAttendance = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [holidayDialogOpen, setHolidayDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectedHolidayIDs, setSelectedHolidayIDs] = useState([]);
  const [calendarView, setCalendarView] = useState(Views.MONTH);

  // Staff data
  const [staffMembers] = useState([
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
    { id: 1, name: "Republic Day", date: "2025-01-26", type: "National Holiday", description: "Republic Day of India" },
    { id: 2, name: "Holi", date: "2025-03-14", type: "Festival", description: "Holi Festival" },
    { id: 3, name: "Independence Day", date: "2025-08-15", type: "National Holiday", description: "Independence Day of India" },
    { id: 4, name: "Diwali", date: "2025-11-01", type: "Festival", description: "Diwali Festival" },
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
      const eventDate = new Date(holiday.date);
      events.push({
        id: `holiday-${holiday.id}`,
        title: holiday.name,
        start: eventDate,
        end: eventDate,
        resource: holiday,
        type: 'holiday',
        color: theme.palette.warning.main
      });
    });

    return events;
  }, [records, holidays, theme.palette]);

  // Staff table columns with actions first
  const staffColumns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Attendance Calendar">
            <IconButton size="small" color="primary">
              <CalendarMonthIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Staff">
            <IconButton size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Staff">
            <IconButton size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Stack>
      )
    },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'joinDate', headerName: 'Join Date', width: 120 },
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
      }
    );
    setHolidayDialogOpen(true);
  };

  const handleCloseHolidayDialog = () => {
    setHolidayDialogOpen(false);
    setSelectedHoliday(null);
  };

  const handleSave = () => {
    const newRecord = {
      id: selectedRecord?.id || Date.now(),
      ...selectedRecord,
    };

    setRecords((prev) =>
      selectedRecord?.id
        ? prev.map((r) => (r.id === selectedRecord.id ? newRecord : r))
        : [...prev, newRecord]
    );

    handleCloseDialog();
  };

  const handleSaveHoliday = () => {
    const newHoliday = {
      id: selectedHoliday?.id || Date.now(),
      ...selectedHoliday,
    };

    setHolidays((prev) =>
      selectedHoliday?.id
        ? prev.map((h) => (h.id === selectedHoliday.id ? newHoliday : h))
        : [...prev, newHoliday]
    );

    handleCloseHolidayDialog();
  };

  const handleDelete = () => {
    setRecords((prev) => prev.filter((record) => !selectedIDs.includes(record.id)));
    setSelectedIDs([]);
  };

  const handleDeleteHolidays = () => {
    setHolidays((prev) => prev.filter((holiday) => !selectedHolidayIDs.includes(holiday.id)));
    setSelectedHolidayIDs([]);
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        padding: '2px 5px',
        fontSize: '12px',
        fontWeight: 'bold'
      }
    };
  };

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Custom calendar toolbar
  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    const goToPrev = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const viewNames = {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    };

    const currentView = viewNames[toolbar.view] || toolbar.view;

    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2, 
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outlined" size="small" onClick={goToPrev}>
            Back
          </Button>
          <Button variant="outlined" size="small" onClick={goToNext}>
            Next
          </Button>
        </Stack>
        
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {toolbar.label}
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Button 
            variant={toolbar.view === 'month' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => toolbar.onView('month')}
          >
            Month
          </Button>
          <Button 
            variant={toolbar.view === 'week' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => toolbar.onView('week')}
          >
            Week
          </Button>
          <Button 
            variant={toolbar.view === 'day' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => toolbar.onView('day')}
          >
            Day
          </Button>
        </Stack>
      </Box>
    );
  };

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
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">Staff Attendance Management</Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              startIcon={<AddCircleIcon />} 
              onClick={() => handleOpenDialog()}
            >
              Mark Attendance
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<BeachAccessIcon />} 
              onClick={() => handleOpenHolidayDialog()}
            >
              Add Holiday
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
              <Typography variant="h6">{staffMembers.length}</Typography>
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
          <Paper sx={{ p: 2, height: 600 }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="month"
              view={calendarView}
              onView={(view) => setCalendarView(view)}
              tooltipAccessor={(event) => {
                if (event.type === 'attendance') {
                  return `${event.title}\nPunch In: ${event.punchIn || 'N/A'}\nPunch Out: ${event.punchOut || 'N/A'}\nTotal Hours: ${event.totalHours}`;
                }
                return event.title;
              }}
              components={{
                toolbar: CustomToolbar
              }}
              sx={{
                '& .rbc-calendar': {
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
                '& .rbc-header': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 'bold',
                },
                '& .rbc-today': {
                  backgroundColor: theme.palette.action.hover,
                },
                '& .rbc-off-range-bg': {
                  backgroundColor: theme.palette.action.disabledBackground,
                },
                '& .rbc-event': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            />
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 2, height: 600 }}>
            <DataGrid
              rows={staffMembers}
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
                  rows: staffMembers,
                  columns: staffColumns,
                  selectedIDs: selectedIDs,
                  handleDelete: handleDelete,
                },
              }}
              sx={{
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 'bold',
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 'bold',
                },
              }}
            />
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 2, height: 600 }}>
            <DataGrid
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
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 'bold',
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 'bold',
                },
              }}
            />
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper sx={{ p: 2, height: 600 }}>
            <DataGrid
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
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 'bold',
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 'bold',
                },
              }}
            />
          </Paper>
        )}

        {/* Enhanced Attendance Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>{selectedRecord?.id ? "Update" : "Mark"} Attendance</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Staff Member</InputLabel>
                  <Select
                    value={selectedRecord?.staffId || ""}
                    onChange={(e) => {
                      const staff = staffMembers.find(s => s.id === e.target.value);
                      setSelectedRecord((prev) => ({ 
                        ...prev, 
                        staffId: e.target.value,
                        staffName: staff ? staff.name : ""
                      }));
                    }}
                  >
                    {staffMembers.map((staff) => (
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
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Time Tracking</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Punch In Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={selectedRecord?.punchIn || ""}
                  onChange={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, punchIn: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Punch Out Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={selectedRecord?.punchOut || ""}
                  onChange={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, punchOut: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Lunch Break</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Lunch Start Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={selectedRecord?.lunchStart || ""}
                  onChange={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, lunchStart: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Lunch End Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={selectedRecord?.lunchEnd || ""}
                  onChange={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, lunchEnd: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Short Break</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Break Start Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={selectedRecord?.breakStart || ""}
                  onChange={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, breakStart: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Break End Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={selectedRecord?.breakEnd || ""}
                  onChange={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, breakEnd: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {selectedRecord?.id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Holiday Dialog */}
        <Dialog open={holidayDialogOpen} onClose={handleCloseHolidayDialog} fullWidth maxWidth="sm">
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
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseHolidayDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveHoliday}>
              {selectedHoliday?.id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageAttendance;
