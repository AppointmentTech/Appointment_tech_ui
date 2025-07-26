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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
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

  // Staff data
  const [staffMembers] = useState([
    { id: 1, name: "Ravi Kumar", position: "Mechanic", phone: "+91 98765 43210", email: "ravi@garage.com", joinDate: "2023-01-15" },
    { id: 2, name: "Amit Singh", position: "Electrician", phone: "+91 98765 43211", email: "amit@garage.com", joinDate: "2023-02-20" },
    { id: 3, name: "Sneha Patel", position: "Service Advisor", phone: "+91 98765 43212", email: "sneha@garage.com", joinDate: "2023-03-10" },
    { id: 4, name: "Rajesh Kumar", position: "Painter", phone: "+91 98765 43213", email: "rajesh@garage.com", joinDate: "2023-01-25" },
    { id: 5, name: "Priya Sharma", position: "Receptionist", phone: "+91 98765 43214", email: "priya@garage.com", joinDate: "2023-04-05" },
  ]);

  // Attendance records
  const [records, setRecords] = useState([
    { id: 1, staffId: 1, staffName: "Ravi Kumar", date: "2025-01-25", status: "Present", checkIn: "09:00", checkOut: "18:00" },
    { id: 2, staffId: 2, staffName: "Amit Singh", date: "2025-01-25", status: "Present", checkIn: "08:45", checkOut: "17:30" },
    { id: 3, staffId: 3, staffName: "Sneha Patel", date: "2025-01-25", status: "Present", checkIn: "09:15", checkOut: "18:15" },
    { id: 4, staffId: 4, staffName: "Rajesh Kumar", date: "2025-01-25", status: "Absent", checkIn: "", checkOut: "" },
    { id: 5, staffId: 5, staffName: "Priya Sharma", date: "2025-01-25", status: "Present", checkIn: "08:30", checkOut: "17:45" },
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
        color: record.status === 'Present' ? '#4caf50' : '#f44336'
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
        color: '#ff9800'
      });
    });

    return events;
  }, [records, holidays]);

  // Staff table columns
  const staffColumns = [
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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // Attendance table columns
  const attendanceColumns = [
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
    { field: 'checkIn', headerName: 'Check In', width: 100 },
    { field: 'checkOut', headerName: 'Check Out', width: 100 },
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
  ];

  // Holiday table columns
  const holidayColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Holiday Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
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
  ];

  const handleOpenDialog = (record = null) => {
    setSelectedRecord(
      record || {
        staffId: "",
        staffName: "",
        date: dayjs().format("YYYY-MM-DD"),
        status: "Present",
        checkIn: "",
        checkOut: "",
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
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
              tooltipAccessor={(event) => event.title}
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
                 },
               }}
             />
           </Paper>
         )}

        {/* Attendance Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{selectedRecord?.id ? "Update" : "Mark"} Attendance</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
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
              <TextField
                label="Check In Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={selectedRecord?.checkIn || ""}
                onChange={(e) =>
                  setSelectedRecord((prev) => ({ ...prev, checkIn: e.target.value }))
                }
              />
              <TextField
                label="Check Out Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={selectedRecord?.checkOut || ""}
                onChange={(e) =>
                  setSelectedRecord((prev) => ({ ...prev, checkOut: e.target.value }))
                }
              />
            </Stack>
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
