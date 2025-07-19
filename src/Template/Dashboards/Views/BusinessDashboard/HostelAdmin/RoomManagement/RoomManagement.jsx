import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
//   useTheme,
  // useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import Search from "@mui/icons-material/Search";
import Download from "@mui/icons-material/Download";
import Refresh from "@mui/icons-material/Refresh";
// import Wifi from "@mui/icons-material/Wifi";
// import AcUnit from "@mui/icons-material/AcUnit";
// import LocalParking from "@mui/icons-material/LocalParking";
// import Restaurant from "@mui/icons-material/Restaurant";
// import LocalLaundryService from "@mui/icons-material/LocalLaundryService";
// import FitnessCenter from "@mui/icons-material/FitnessCenter";
// import Security from "@mui/icons-material/Security";
// import CleaningServices from "@mui/icons-material/CleaningServices";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Warning from "@mui/icons-material/Warning";
import Error from "@mui/icons-material/Error";
import Close from "@mui/icons-material/Close";
import Save from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CoAdminHeader from "Template/Dashboards/Components/CoAdminHeader/CoAdminHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
export default function RoomManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form State
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    capacity: "",
    price: "",
    floor: "",
    building: "",
    status: "available",
    amenities: {
      wifi: false,
      ac: false,
      parking: false,
      food: false,
      laundry: false,
      gym: false,
      security: false,
      cleaning: false,
    },
    description: "",
    images: [],
  });

  // Mock Data
  const mockRooms = [
    {
      id: 1,
      roomNumber: "A-101",
      roomType: "Single",
      capacity: 1,
      price: 8000,
      floor: 1,
      building: "Block A",
      status: "occupied",
      amenities: ["wifi", "ac", "parking"],
      description: "Comfortable single room with modern amenities",
      currentOccupant: "Rahul Sharma",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-20",
    },
    {
      id: 2,
      roomNumber: "A-102",
      roomType: "Double",
      capacity: 2,
      price: 12000,
      floor: 1,
      building: "Block A",
      status: "available",
      amenities: ["wifi", "ac", "parking", "food"],
      description: "Spacious double room with attached bathroom",
      currentOccupant: null,
      checkInDate: null,
      checkOutDate: null,
    },
    {
      id: 3,
      roomNumber: "B-201",
      roomType: "Triple",
      capacity: 3,
      price: 15000,
      floor: 2,
      building: "Block B",
      status: "maintenance",
      amenities: ["wifi", "ac", "parking", "food", "laundry"],
      description: "Large triple room with study area",
      currentOccupant: null,
      checkInDate: null,
      checkOutDate: null,
    },
    {
      id: 4,
      roomNumber: "C-301",
      roomType: "Single",
      capacity: 1,
      price: 9000,
      floor: 3,
      building: "Block C",
      status: "available",
      amenities: ["wifi", "ac", "parking", "food", "gym"],
      description: "Premium single room with gym access",
      currentOccupant: null,
      checkInDate: null,
      checkOutDate: null,
    },
  ];

  useEffect(() => {
    setRooms(mockRooms);
    setFilteredRooms(mockRooms);
  }, []);

  useEffect(() => {
    filterRooms();
  }, [searchTerm, statusFilter, typeFilter, rooms]);

  const filterRooms = () => {
    let filtered = rooms.filter((room) => {
      const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (room.currentOccupant && room.currentOccupant.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || room.status === statusFilter;
      const matchesType = typeFilter === "all" || room.roomType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    setFilteredRooms(filtered);
  };

  const handleOpenDialog = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        capacity: room.capacity,
        price: room.price,
        floor: room.floor,
        building: room.building,
        status: room.status,
        amenities: {
          wifi: room.amenities.includes("wifi"),
          ac: room.amenities.includes("ac"),
          parking: room.amenities.includes("parking"),
          food: room.amenities.includes("food"),
          laundry: room.amenities.includes("laundry"),
          gym: room.amenities.includes("gym"),
          security: room.amenities.includes("security"),
          cleaning: room.amenities.includes("cleaning"),
        },
        description: room.description,
        images: room.images || [],
      });
      setIsEditMode(true);
    } else {
      setEditingRoom(null);
      setFormData({
        roomNumber: "",
        roomType: "",
        capacity: "",
        price: "",
        floor: "",
        building: "",
        status: "available",
        amenities: {
          wifi: false,
          ac: false,
          parking: false,
          food: false,
          laundry: false,
          gym: false,
          security: false,
          cleaning: false,
        },
        description: "",
        images: [],
      });
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRoom(null);
    setIsEditMode(false);
  };

  const handleFormChange = (field, value) => {
    if (field.startsWith("amenities.")) {
      const amenity = field.split(".")[1];
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [amenity]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const amenitiesArray = Object.keys(formData.amenities).filter(
      key => formData.amenities[key]
    );

    const roomData = {
      ...formData,
      amenities: amenitiesArray,
      id: isEditMode ? editingRoom.id : Date.now(),
    };

    if (isEditMode) {
      setRooms(prev => prev.map(room => 
        room.id === editingRoom.id ? roomData : room
      ));
      setSnackbar({
        open: true,
        message: "Room updated successfully!",
        severity: "success",
      });
    } else {
      setRooms(prev => [...prev, roomData]);
      setSnackbar({
        open: true,
        message: "Room added successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setRooms(prev => prev.filter(room => room.id !== id));
    setSnackbar({
      open: true,
      message: "Room deleted successfully!",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRooms);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rooms");
    XLSX.writeFile(wb, "Room_Management_Export.xlsx");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "occupied":
        return "warning";
      case "maintenance":
        return "error";
      default:
        return "default";
    }
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
    //   wifi: <Wifi fontSize="small" />,
    //   ac: <AcUnit fontSize="small" />,
    //   parking: <LocalParking fontSize="small" />,
    //   food: <Restaurant fontSize="small" />,
    //   laundry: <LocalLaundryService fontSize="small" />,
    //   gym: <FitnessCenter fontSize="small" />,
    //   security: <Security fontSize="small" />,
    //   cleaning: <CleaningServices fontSize="small" />,
    };
    return icons[amenity] || <CheckCircle fontSize="small" />;
  };

  const columns = [
    { field: "roomNumber", headerName: "Room Number", width: 130 },
    { field: "roomType", headerName: "Type", width: 100 },
    { field: "capacity", headerName: "Capacity", width: 100 },
    { 
      field: "price", 
      headerName: "Price (₹)", 
      width: 120,
      valueFormatter: (params) => `₹${(params.value || 0).toLocaleString()}`,
    },
    { field: "floor", headerName: "Floor", width: 80 },
    { field: "building", headerName: "Building", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "amenities",
      headerName: "Amenities",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          {params.value.slice(0, 3).map((amenity, index) => (
            <Tooltip key={index} title={amenity}>
              <IconButton size="small" disabled>
                {getAmenityIcon(amenity)}
              </IconButton>
            </Tooltip>
          ))}
          {params.value.length > 3 && (
            <Chip label={`+${params.value.length - 3}`} size="small" />
          )}
        </Box>
      ),
    },
    {
      field: "currentOccupant",
      headerName: "Current Occupant",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value || "Vacant"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Room">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Room">
            <IconButton 
              size="small" 
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CoAdminHeader />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, 
            py: { xs: 8, sm: 10 },
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh"
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            mb={4}
            gap={2}
          >
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold"
                color="primary"
              >
                Room Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage hostel rooms, amenities, and occupancy
              </Typography>
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center" 
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                size={isMobile ? "small" : "medium"}
              >
                Add Room
              </Button>
            </Box>
          </Box>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="occupied">Occupied</MenuItem>
                      <MenuItem value="maintenance">Maintenance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      label="Type"
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Double">Double</MenuItem>
                      <MenuItem value="Triple">Triple</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={exportToExcel}
                    fullWidth
                    size="small"
                  >
                    Export
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                    fullWidth
                    size="small"
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Data Grid */}
          <Card>
            <CardContent>
              <DataGrid
                rows={filteredRooms}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableSelectionOnClick
                autoHeight
                sx={{
                  border: 0,
                  "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Add/Edit Room Dialog */}
          <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                  {isEditMode ? "Edit Room" : "Add New Room"}
                </Typography>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    value={formData.roomNumber}
                    onChange={(e) => handleFormChange("roomNumber", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Room Type</InputLabel>
                    <Select
                      value={formData.roomType}
                      onChange={(e) => handleFormChange("roomType", e.target.value)}
                      label="Room Type"
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Double">Double</MenuItem>
                      <MenuItem value="Triple">Triple</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleFormChange("capacity", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price (₹)"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Floor"
                    type="number"
                    value={formData.floor}
                    onChange={(e) => handleFormChange("floor", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Building"
                    value={formData.building}
                    onChange={(e) => handleFormChange("building", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => handleFormChange("status", e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="occupied">Occupied</MenuItem>
                      <MenuItem value="maintenance">Maintenance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Amenities
                    </Typography>
                  </Divider>
                </Grid>
                
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {Object.entries(formData.amenities).map(([amenity, checked]) => (
                      <Grid item xs={6} sm={4} md={3} key={amenity}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checked}
                              onChange={(e) => handleFormChange(`amenities.${amenity}`, e.target.checked)}
                            />
                          }
                          label={
                            <Box display="flex" alignItems="center" gap={1}>
                              {getAmenityIcon(amenity)}
                              <Typography variant="body2" textTransform="capitalize">
                                {amenity}
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                startIcon={<Save />}
              >
                {isEditMode ? "Update" : "Add"} Room
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          {/* Floating Action Button for Mobile */}
          {isMobile && (
            <Fab
              color="primary"
              aria-label="add room"
              sx={{ position: "fixed", bottom: 16, right: 16 }}
              onClick={() => handleOpenDialog()}
            >
              <Add />
            </Fab>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
} 