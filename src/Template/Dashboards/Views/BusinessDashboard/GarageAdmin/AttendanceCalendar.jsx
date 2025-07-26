import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Today,
  Event,
  People,
  Info,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { ThemeContext } from "ContextOrRedux/ThemeProvider.js";

const AttendanceCalendar = () => {
  const theme = useTheme();
  const themeMode = useContext(ThemeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const darkMode = themeMode.state.darkMode;

  // State for calendar navigation
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [holidayDialogOpen, setHolidayDialogOpen] = useState(false);
  const [staffDialogOpen, setStaffDialogOpen] = useState(false);

  // Sample staff data
  const staffData = [
    { id: 1, name: "Ravi Kumar", position: "Mechanic", avatar: "RK" },
    { id: 2, name: "Amit Singh", position: "Electrician", avatar: "AS" },
    { id: 3, name: "Sneha Patel", position: "Service Advisor", avatar: "SP" },
    { id: 4, name: "Rajesh Verma", position: "Technician", avatar: "RV" },
    { id: 5, name: "Priya Sharma", position: "Receptionist", avatar: "PS" },
  ];

  // Sample holiday data
  const holidays = [
    { date: "2025-07-10", name: "Eid al-Adha", type: "Religious" },
    { date: "2025-07-21", name: "Guru Purnima", type: "Religious" },
    { date: "2025-07-26", name: "Kargil Vijay Diwas", type: "National" },
    { date: "2025-08-15", name: "Independence Day", type: "National" },
  ];

  // Sample attendance data
  const attendanceData = {
    "2025-07-01": [
      { staffId: 1, status: "Present", checkIn: "09:00", checkOut: "18:00" },
      { staffId: 2, status: "Present", checkIn: "08:30", checkOut: "17:30" },
      { staffId: 3, status: "Present", checkIn: "09:15", checkOut: "18:15" },
      { staffId: 4, status: "Absent", checkIn: null, checkOut: null },
      { staffId: 5, status: "Present", checkIn: "08:45", checkOut: "17:45" },
    ],
    "2025-07-02": [
      { staffId: 1, status: "Present", checkIn: "09:00", checkOut: "18:00" },
      { staffId: 2, status: "Late", checkIn: "09:45", checkOut: "18:45" },
      { staffId: 3, status: "Present", checkIn: "09:15", checkOut: "18:15" },
      { staffId: 4, status: "Present", checkIn: "08:30", checkOut: "17:30" },
      { staffId: 5, status: "Present", checkIn: "08:45", checkOut: "17:45" },
    ],
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const goToToday = () => {
    setCurrentDate(dayjs());
  };

  const year = currentDate.year();
  const month = currentDate.month(); // 0-indexed

  const daysInMonth = currentDate.daysInMonth();
  const startDay = currentDate.startOf("month").day(); // 0 = Sunday

  const generateCalendarDays = () => {
    const calendar = [];
    for (let i = 0; i < startDay; i++) {
      calendar.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = currentDate.date(day).format("YYYY-MM-DD");
      const holiday = holidays.find(h => h.date === dateStr);
      const attendance = attendanceData[dateStr] || [];
      const presentCount = attendance.filter(a => a.status === "Present").length;
      const absentCount = attendance.filter(a => a.status === "Absent").length;
      const lateCount = attendance.filter(a => a.status === "Late").length;

      calendar.push({
        date: dateStr,
        day,
        holiday,
        attendance,
        presentCount,
        absentCount,
        lateCount,
        totalStaff: staffData.length,
      });
    }
    return calendar;
  };

  const calendarData = generateCalendarDays();

  const getCellColor = (item) => {
    if (!item) return darkMode ? "#2d3748" : "#f0f0f0";
    
    if (item.holiday) return darkMode ? "#e53e3e" : "#f44336";
    
    if (item.attendance.length > 0) {
      const presentRatio = item.presentCount / item.totalStaff;
      if (presentRatio >= 0.8) return darkMode ? "#38a169" : "#4caf50";
      if (presentRatio >= 0.6) return darkMode ? "#d69e2e" : "#ff9800";
      return darkMode ? "#e53e3e" : "#f44336";
    }
    
    return darkMode ? "#4a5568" : "#e0f7fa";
  };

  const getCellText = (item) => {
    if (!item) return "";
    if (item.holiday) return `${item.holiday.name}\n(${item.holiday.type})`;
    if (item.attendance.length > 0) {
      return `${item.presentCount}/${item.totalStaff} Present\n${item.lateCount} Late`;
    }
    return "No Data";
  };

  const handleDateClick = (item) => {
    if (item) {
      setSelectedDate(item);
      setStaffDialogOpen(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present": return darkMode ? "#38a169" : "#4caf50";
      case "Absent": return darkMode ? "#e53e3e" : "#f44336";
      case "Late": return darkMode ? "#d69e2e" : "#ff9800";
      default: return darkMode ? "#718096" : "#9e9e9e";
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Attendance Calendar
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Event />}
              onClick={() => setHolidayDialogOpen(true)}
            >
              Holidays
            </Button>
            <Button
              variant="outlined"
              startIcon={<People />}
              onClick={() => setStaffDialogOpen(true)}
            >
              Staff Info
            </Button>
          </Stack>
        </Grid>

        {/* Calendar Navigation */}
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              {currentDate.format("MMMM YYYY")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={goToPreviousMonth} color="primary">
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={goToToday} color="primary">
                <Today />
              </IconButton>
              <IconButton onClick={goToNextMonth} color="primary">
                <ChevronRight />
              </IconButton>
            </Stack>
          </Box>

          {/* Calendar Grid */}
          <Grid container spacing={1}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
              <Grid item xs={isMobile ? 1.7 : 1.7} key={idx}>
                <Typography 
                  align="center" 
                  fontWeight="bold"
                  color="text.primary"
                  sx={{ fontSize: isMobile ? 12 : 14 }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}

            {calendarData.map((item, idx) => (
              <Grid item xs={isMobile ? 1.7 : 1.7} key={idx}>
                <Tooltip
                  title={item ? getCellText(item) : ""}
                  arrow
                  placement="top"
                >
                  <Box
                    onClick={() => handleDateClick(item)}
                    sx={{
                      height: 60,
                      backgroundColor: getCellColor(item),
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: darkMode ? "#ffffff" : "#000000",
                      fontWeight: "bold",
                      whiteSpace: "pre-line",
                      textAlign: "center",
                      fontSize: isMobile ? 10 : 12,
                      cursor: item ? "pointer" : "default",
                      border: `1px solid ${theme.palette.divider}`,
                      transition: "all 0.2s ease",
                      "&:hover": item ? {
                        transform: "scale(1.05)",
                        boxShadow: theme.shadows[4],
                      } : {},
                    }}
                  >
                    {item?.day || ""}
                  </Box>
                </Tooltip>
              </Grid>
            ))}
          </Grid>

          {/* Legend */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Legend:</strong> 🟥 Holiday | 🟢 Good Attendance | 🟡 Moderate | 🔴 Poor | ⚫ No Data
            </Typography>
          </Box>
        </Paper>

        {/* Staff Information Cards */}
        <Grid container spacing={2}>
          {staffData.map((staff) => (
            <Grid item xs={12} sm={6} md={4} key={staff.id}>
              <Card 
                sx={{ 
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                      {staff.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="text.primary">
                        {staff.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {staff.position}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Staff ID: {staff.id}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Holiday Dialog */}
        <Dialog 
          open={holidayDialogOpen} 
          onClose={() => setHolidayDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle color="text.primary">Holiday List</DialogTitle>
          <DialogContent>
            <List>
              {holidays.map((holiday, index) => (
                <React.Fragment key={holiday.date}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.error.main }}>
                        <Event />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={holiday.name}
                      secondary={`${dayjs(holiday.date).format("DD MMMM YYYY")} - ${holiday.type}`}
                    />
                    <Chip 
                      label={holiday.type} 
                      size="small" 
                      color="error" 
                      variant="outlined"
                    />
                  </ListItem>
                  {index < holidays.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHolidayDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Staff Attendance Dialog */}
        <Dialog 
          open={staffDialogOpen} 
          onClose={() => setStaffDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle color="text.primary">
            {selectedDate ? `Staff Attendance - ${dayjs(selectedDate.date).format("DD MMMM YYYY")}` : "Staff Information"}
          </DialogTitle>
          <DialogContent>
            {selectedDate ? (
              <List>
                {staffData.map((staff) => {
                  const attendance = selectedDate.attendance.find(a => a.staffId === staff.id);
                  return (
                    <ListItem key={staff.id}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {staff.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={staff.name}
                        secondary={`${staff.position} - ${attendance ? attendance.status : "No Data"}`}
                      />
                      {attendance && (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                          <Chip 
                            label={attendance.status} 
                            size="small" 
                            sx={{ 
                              bgcolor: getStatusColor(attendance.status),
                              color: "#ffffff",
                              mb: 1
                            }}
                          />
                          {attendance.checkIn && (
                            <Typography variant="caption" color="text.secondary">
                              {attendance.checkIn} - {attendance.checkOut}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <List>
                {staffData.map((staff) => (
                  <ListItem key={staff.id}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {staff.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={staff.name}
                      secondary={staff.position}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStaffDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AttendanceCalendar;
