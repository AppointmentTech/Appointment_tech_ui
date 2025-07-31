import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Room as RoomIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Today as TodayIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Assignment as AssignmentIcon,
  LocalShipping as DeliveryIcon,
  Restaurant as FoodIcon,
  CleaningServices as CleaningIcon,
  Build as MaintenanceIcon,
  Security as SecurityIcon,
  Spa as SpaIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { sidebarData } from '../../../../../CommonComponents/SidebarData.js';
import { getServiceTypesFromSidebar } from './ServiceConfig.js';

const SERVICE_TYPES = getServiceTypesFromSidebar(sidebarData);

// Generate dynamic mock scheduled services based on available service types
const generateMockScheduledServices = (serviceTypes) => {
  const mockScheduledServices = [];
  const serviceKeys = Object.keys(serviceTypes);
  
  serviceKeys.forEach((serviceType, index) => {
    const config = serviceTypes[serviceType];
    const categories = config.categories || ['General'];
    
    categories.forEach((category, catIndex) => {
      if (mockScheduledServices.length < 10) { // Limit to 10 services for demo
        mockScheduledServices.push({
          id: mockScheduledServices.length + 1,
          type: serviceType,
          title: `${category} - Room ${100 + mockScheduledServices.length + 1}`,
          room: `${100 + mockScheduledServices.length + 1}`,
          guest: ['Alice Johnson', 'Bob Davis', 'Carol White', 'Emma Wilson', 'Frank Miller'][Math.floor(Math.random() * 5)],
          assignedTo: ['Sarah Wilson', 'Mike Johnson', 'David Brown', 'John Smith', 'Lisa Anderson'][Math.floor(Math.random() * 5)],
          date: '2024-06-10',
          time: config.slots ? config.slots[Math.floor(Math.random() * config.slots.length)] : '09:00',
          duration: config.duration || 60,
          status: ['Scheduled', 'Completed', 'In Progress'][Math.floor(Math.random() * 3)],
          notes: `${category} service for room ${100 + mockScheduledServices.length + 1}`
        });
      }
    });
  });
  
  return mockScheduledServices;
};

const mockScheduledServices = generateMockScheduledServices(SERVICE_TYPES);

const ServiceScheduler = () => {
  const theme = useTheme();
  const [scheduledServices, setScheduledServices] = useState(mockScheduledServices);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedService, setSelectedService] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [filter, setFilter] = useState('All');

  // Get services for selected date
  const getServicesForDate = (date) => {
    return scheduledServices.filter(service => service.date === date);
  };

  // Get available time slots for a service type
  const getAvailableSlots = (serviceType, date) => {
    const serviceConfig = SERVICE_TYPES[serviceType];
    const bookedServices = getServicesForDate(date).filter(s => s.type === serviceType);
    const bookedTimes = bookedServices.map(s => s.time);
    
    return serviceConfig.slots.filter(slot => !bookedTimes.includes(slot));
  };

  // Check for scheduling conflicts
  const checkConflicts = (serviceType, date, time, duration, excludeId = null) => {
    const servicesForDate = getServicesForDate(date).filter(s => s.id !== excludeId);
    const serviceStart = new Date(`${date}T${time}`);
    const serviceEnd = new Date(serviceStart.getTime() + duration * 60000);
    
    return servicesForDate.some(service => {
      const existingStart = new Date(`${service.date}T${service.time}`);
      const existingEnd = new Date(existingStart.getTime() + service.duration * 60000);
      
      return (serviceStart < existingEnd && serviceEnd > existingStart);
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const newService = {
      id: Date.now(),
      ...formData,
      status: 'Scheduled'
    };
    
    setScheduledServices(prev => [...prev, newService]);
    setAddModal(false);
    setFormData({});
  };

  // Handle service edit
  const handleEdit = (service) => {
    setFormData(service);
    setEditModal(true);
  };

  // Handle edit submission
  const handleEditSubmit = () => {
    setScheduledServices(prev => prev.map(service => 
      service.id === formData.id ? formData : service
    ));
    setEditModal(false);
    setFormData({});
  };

  // Handle service deletion
  const handleDelete = (serviceId) => {
    setScheduledServices(prev => prev.filter(service => service.id !== serviceId));
    setDeleteModal(false);
  };

  // Handle status update
  const handleStatusUpdate = (serviceId, newStatus) => {
    setScheduledServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, status: newStatus } : service
    ));
  };

  const currentDateServices = getServicesForDate(selectedDate);
  const filteredServices = filter === 'All' 
    ? currentDateServices 
    : currentDateServices.filter(service => service.status === filter);

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Service Scheduler
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddModal(true)}
        >
          Schedule Service
        </Button>
      </Box>

      {/* Date Selection and Filters */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Date Selection
            </Typography>
            <TextField
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Status Filter
            </Typography>
            <FormControl fullWidth>
              <Select
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>
      </Grid>

      {/* Daily Schedule Overview */}
      <Card sx={{ mb: 4, p: 3, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Schedule for {new Date(selectedDate).toLocaleDateString()}
        </Typography>
        
        {filteredServices.length === 0 ? (
          <Alert severity="info">
            No services scheduled for this date. Click "Schedule Service" to add one.
          </Alert>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Guest</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServices
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(service => {
                  const serviceConfig = SERVICE_TYPES[service.type];
                  const hasConflict = checkConflicts(service.type, service.date, service.time, service.duration, service.id);
                  
                  return (
                    <TableRow key={service.id} sx={{ 
                      bgcolor: hasConflict ? 'error.light' : 'inherit'
                    }}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <TimeIcon fontSize="small" color="primary" />
                          <Typography variant="body2" fontWeight={600}>
                            {service.time}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box sx={{ color: theme.palette[serviceConfig.color]?.main }}>
                            {serviceConfig.icon}
                          </Box>
                          <Typography variant="body2" fontWeight={600}>
                            {service.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={service.room} size="small" color="primary" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{service.guest}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 24, height: 24 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                          <Typography variant="body2">{service.assignedTo}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={service.status}
                          color={
                            service.status === 'Completed' ? 'success' :
                            service.status === 'In Progress' ? 'warning' :
                            service.status === 'Cancelled' ? 'error' : 'primary'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(service)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                setSelectedService(service);
                                setDeleteModal(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          {service.status === 'Scheduled' && (
                            <Tooltip title="Start Service">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleStatusUpdate(service.id, 'In Progress')}
                              >
                                <AssignmentIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {service.status === 'In Progress' && (
                            <Tooltip title="Complete Service">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleStatusUpdate(service.id, 'Completed')}
                              >
                                <CheckIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Service Type Overview */}
      <Card sx={{ p: 3, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Service Type Overview
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(SERVICE_TYPES).map(([type, config]) => {
            const typeServices = currentDateServices.filter(s => s.type === type);
            const completed = typeServices.filter(s => s.status === 'Completed').length;
            const inProgress = typeServices.filter(s => s.status === 'In Progress').length;
            const scheduled = typeServices.filter(s => s.status === 'Scheduled').length;
            
            return (
              <Grid item xs={12} sm={6} md={4} key={type}>
                <Paper sx={{ p: 2, border: `2px solid ${theme.palette[config.color]?.main}20` }}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Box sx={{ color: theme.palette[config.color]?.main }}>
                      {config.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {config.label}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Total:</Typography>
                    <Typography variant="body2" fontWeight={600}>{typeServices.length}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Completed:</Typography>
                    <Typography variant="body2" color="success.main" fontWeight={600}>{completed}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">In Progress:</Typography>
                    <Typography variant="body2" color="warning.main" fontWeight={600}>{inProgress}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Scheduled:</Typography>
                    <Typography variant="body2" color="primary.main" fontWeight={600}>{scheduled}</Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Card>

      {/* Add Service Modal */}
      <Dialog open={addModal} onClose={() => setAddModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule New Service</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={formData.type || ''}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  label="Service Type"
                >
                  {Object.entries(SERVICE_TYPES).map(([key, config]) => (
                    <MenuItem key={key} value={key}>
                      <Box display="flex" alignItems="center" gap={1}>
                        {config.icon}
                        {config.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Service Title"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Room Number"
                value={formData.room || ''}
                onChange={e => setFormData({ ...formData, room: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Guest Name"
                value={formData.guest || ''}
                onChange={e => setFormData({ ...formData, guest: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assigned To"
                value={formData.assignedTo || ''}
                onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  value={formData.time || ''}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  label="Time Slot"
                >
                  {formData.type && getAvailableSlots(formData.type, selectedDate).map(slot => (
                    <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                value={formData.notes || ''}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddModal(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.type || !formData.title || !formData.time}
          >
            Schedule Service
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Service Modal */}
      <Dialog open={editModal} onClose={() => setEditModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Service Title"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Room Number"
                value={formData.room || ''}
                onChange={e => setFormData({ ...formData, room: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Guest Name"
                value={formData.guest || ''}
                onChange={e => setFormData({ ...formData, guest: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assigned To"
                value={formData.assignedTo || ''}
                onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                value={formData.notes || ''}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModal(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedService?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button 
            onClick={() => handleDelete(selectedService?.id)} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceScheduler; 