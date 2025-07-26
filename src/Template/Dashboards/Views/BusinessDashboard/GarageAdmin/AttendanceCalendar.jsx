import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";

const AttendanceCalendar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const year = 2025;
  const month = 6; // 0-indexed: 6 = July

  const holidays = ["2025-07-10", "2025-07-21"];
  const leaves = {
    "2025-07-05": { name: "Amit Singh", type: "Sick Leave" },
    "2025-07-14": { name: "Ravi Kumar", type: "Casual Leave" },
  };

  const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
  const startDay = dayjs(`${year}-${month + 1}-01`).day(); // 0 = Sunday

  const generateCalendarDays = () => {
    const calendar = [];
    for (let i = 0; i < startDay; i++) {
      calendar.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      calendar.push({
        date: dateStr,
        isHoliday: holidays.includes(dateStr),
        leave: leaves[dateStr] || null,
        day,
      });
    }
    return calendar;
  };

  const calendarData = generateCalendarDays();

  const getCellColor = (item) => {
    if (!item) return "#f0f0f0";
    if (item.isHoliday) return "#f44336";
    if (item.leave) return "#fdd835";
    return "#e0f7fa";
  };

  const getCellText = (item) => {
    if (!item) return "";
    if (item.isHoliday) return "Holiday";
    if (item.leave) return `${item.leave.name}\n${item.leave.type}`;
    return "Working Day";
  };

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        📅 July 2025 Attendance Calendar
      </Typography>

      {/* Calendar Grid */}
      <Grid container spacing={1}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <Grid item xs={isMobile ? 1.7 : 1.7} key={idx}>
            <Typography align="center" fontWeight="bold">
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
                sx={{
                  height: 60,
                  backgroundColor: getCellColor(item),
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                  fontWeight: "bold",
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  fontSize: isMobile ? 12 : 14,
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
        <Typography variant="body2">
          <strong>Legend:</strong> 🟥 Holiday | 🟨 Leave | 🟦 Working Day
        </Typography>
      </Box>
    </Paper>
  );
};

export default AttendanceCalendar;
