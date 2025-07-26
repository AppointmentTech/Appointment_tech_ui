import React, { useState } from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

const GarageAttendance = () => {
  const theme = useTheme();

  const [records, setRecords] = useState([
    { id: 1, name: "Ravi Kumar", date: "2025-07-25", status: "Present" },
    { id: 2, name: "Amit Singh", date: "2025-07-25", status: "Absent" },
    { id: 3, name: "Sneha Patel", date: "2025-07-25", status: "Present" },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleOpenDialog = (record = null) => {
    setSelectedRecord(
      record || {
        name: "",
        date: dayjs().format("YYYY-MM-DD"),
        status: "Present",
      }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRecord(null);
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

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;

  // --- Heatmap Data ---
  const heatmapData = [
    { date: "2025-07-01", count: 5 },
    { date: "2025-07-02", count: 7 },
    { date: "2025-07-03", count: 7 },
    { date: "2025-07-04", count: 7 },
    { date: "2025-07-05", count: 1 },
    { date: "2025-07-06", count: 6 },
    { date: "2025-07-07", count: 8 },
    { date: "2025-07-08", count: 2 },
    { date: "2025-07-09", count: 0 },
    { date: "2025-07-10", count: 4 },
    { date: "2025-07-11", count: 7 },
    { date: "2025-07-12", count: 3 },
    { date: "2025-07-13", count: 9 },
    { date: "2025-07-14", count: 2 },
    { date: "2025-07-15", count: 8 },
    { date: "2025-07-16", count: 6 },
    { date: "2025-07-17", count: 5 },
    { date: "2025-07-18", count: 3 },
    { date: "2025-07-19", count: 7 },
    { date: "2025-07-20", count: 4 },
    { date: "2025-07-21", count: 6 },
    { date: "2025-07-22", count: 3 },
    { date: "2025-07-23", count: 8 },
    { date: "2025-07-24", count: 1 },
    { date: "2025-07-25", count: 5 },
    { date: "2025-07-26", count: 2 },
    { date: "2025-07-27", count: 0 },
    { date: "2025-07-28", count: 6 },
    { date: "2025-07-29", count: 3 },
    { date: "2025-07-30", count: 4 },
    { date: "2025-07-31", count: 7 },
  ];

  const getHeatColor = (count) => {
    if (count === 0) return "#e0e0e0";
    if (count <= 2) return "#a5d6a7";
    if (count <= 5) return "#66bb6a";
    if (count <= 7) return "#43a047";
    return "#2e7d32";
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
          <Typography variant="h4" fontWeight="bold" color="text.primary">Staff Attendance</Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              startIcon={<AddCircleIcon />} 
              onClick={() => handleOpenDialog()}
            >
              Mark Attendance
            </Button>
            <Button 
              variant="contained" 
              onClick={() => window.location.href = '/AttendanceCalendar'}
            >
              View Calendar
            </Button>
          </Stack>
        </Grid>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 2,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}>
              <Typography variant="h6" color="text.primary">{presentCount}</Typography>
              <Typography variant="body2" color="text.secondary">Present</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 2,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}>
              <Typography variant="h6" color="text.primary">{absentCount}</Typography>
              <Typography variant="body2" color="text.secondary">Absent</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper sx={{ 
              p: 2,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}>
              <Typography variant="h6" color="text.primary">{records.length}</Typography>
              <Typography variant="body2" color="text.secondary">Total Entries</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Heatmap */}
        <Paper sx={{ 
          p: 2, 
          mb: 4,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}>
          <Typography fontWeight="bold" gutterBottom color="text.primary">July 2025 Attendance Heatmap</Typography>
          <Grid container spacing={1}>
            {heatmapData.map((day, index) => (
              <Grid item xs={3} sm={1.5} md={1} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: 40,
                    borderRadius: 1,
                    backgroundColor: getHeatColor(day.count),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {dayjs(day.date).date()}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Attendance Records */}
        <Grid container spacing={3}>
          {records.map((record) => (
            <Grid item xs={12} sm={6} md={4} key={record.id}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderLeft: `4px solid ${
                    record.status === "Present"
                      ? theme.palette.success.main
                      : theme.palette.error.main
                  }`,
                }}
              >
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 10, right: 10 }}
                  onClick={() => handleOpenDialog(record)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar>{record.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.primary">{record.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(record.date).format("DD MMM YYYY")}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" color="text.primary">
                  Status:{" "}
                  <strong
                    style={{
                      color:
                        record.status === "Present"
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    }}
                  >
                    {record.status}
                  </strong>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle color="text.primary">{selectedRecord?.id ? "Update" : "Mark"} Attendance</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Staff Name"
                fullWidth
                value={selectedRecord?.name || ""}
                onChange={(e) =>
                  setSelectedRecord((prev) => ({ ...prev, name: e.target.value }))
                }
              />
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
              <Select
                label="Status"
                fullWidth
                value={selectedRecord?.status || "Present"}
                onChange={(e) =>
                  setSelectedRecord((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {selectedRecord?.id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageAttendance;
