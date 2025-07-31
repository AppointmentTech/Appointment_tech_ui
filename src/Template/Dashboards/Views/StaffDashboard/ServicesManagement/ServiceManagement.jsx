import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Select,
  MenuItem,
  Modal,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Divider,
  Alert,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge
} from '@mui/material';
import {
  AssignmentTurnedIn as AssignmentIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon,
  Room as RoomIcon,
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

// Use dynamic service types from SidebarData
const SERVICE_TYPES = getServiceTypesFromSidebar(sidebarData);

// Generate dynamic mock services based on available service types
const generateMockServices = (serviceTypes) => {
  const mockServices = [];
  const serviceKeys = Object.keys(serviceTypes);
  
  serviceKeys.forEach((serviceType, index) => {
    const config = serviceTypes[serviceType];
    const categories = config.categories || ['General'];
    
    categories.forEach((category, catIndex) => {
      mockServices.push({
        id: mockServices.length + 1,
        type: serviceType,
        category: category,
        title: `${category} - Room ${100 + mockServices.length + 1}`,
        description: `${category} service for Room ${100 + mockServices.length + 1}`,
        status: ['Active', 'Pending', 'Completed', 'Scheduled'][Math.floor(Math.random() * 4)],
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        assignedTo: ['John Smith', 'Sarah Wilson', 'Mike Johnson', 'David Brown', 'Lisa Anderson'][Math.floor(Math.random() * 5)],
        assignedBy: ['Manager', 'Kitchen Manager', 'Maintenance Manager', 'Front Desk', 'Spa Manager'][Math.floor(Math.random() * 5)],
        dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        startDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() : null,
        estimatedDuration: `${Math.floor(Math.random() * 3) + 1} hours`,
        actualDuration: Math.random() > 0.7 ? `${Math.floor(Math.random() * 2) + 1} hours` : null,
        room: `${100 + mockServices.length + 1}`,
        guest: ['Alice Johnson', 'Bob Davis', 'Carol White', 'Emma Wilson', 'Frank Miller'][Math.floor(Math.random() * 5)],
        notes: `Service notes for ${category}`,
        completedAt: Math.random() > 0.8 ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() : null,
        rating: Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 4 : null,
        feedback: Math.random() > 0.8 ? 'Good service, satisfied customer' : null
      });
    });
  });
  
  return mockServices;
};

const mockServices = generateMockServices(SERVICE_TYPES);

const statusColors = {
  Scheduled: 'default',
  Active: 'primary',
  Pending: 'warning',
  Completed: 'success',
  Cancelled: 'error',
  Overdue: 'error'
};

const priorityColors = {
  High: 'error',
  Medium: 'warning',
  Low: 'info'
};

const ServiceManagement = () => {
  const theme = useTheme();
  const [services, setServices] = useState(mockServices);
  const [filter, setFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [stats, setStats] = useState({});

  // Calculate statistics
  useEffect(() => {
    const now = new Date();
    const stats = {
      total: services.length,
      active: services.filter(s => s.status === 'Active').length,
      pending: services.filter(s => s.status === 'Pending').length,
      completed: services.filter(s => s.status === 'Completed').length,
      overdue: services.filter(s => 
        s.status !== 'Completed' && new Date(s.dueDate) < now
      ).length,
      byType: Object.keys(SERVICE_TYPES).reduce((acc, type) => {
        acc[type] = services.filter(s => s.type === type).length;
        return acc;
      }, {})
    };
    setStats(stats);
  }, [services]);

  // Filter services based on current filters
  const filteredServices = services.filter(service => {
    const statusMatch = filter === 'All' || service.status === filter;
    const typeMatch = typeFilter === 'All' || service.type === typeFilter;
    return statusMatch && typeMatch;
  });

  // Handle service status update
  const handleStatusUpdate = (serviceId, newStatus) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { 
            ...service, 
            status: newStatus,
            completedAt: newStatus === 'Completed' ? new Date().toISOString() : service.completedAt
          }
        : service
    ));
  };

  // Handle service edit
  const handleEdit = (service) => {
    setEditForm(service);
    setEditModal(true);
  };

  // Handle edit form submission
  const handleEditSubmit = () => {
    setServices(prev => prev.map(service => 
      service.id === editForm.id ? editForm : service
    ));
    setEditModal(false);
    setEditForm({});
  };

  // Handle service view
  const handleView = (service) => {
    setSelectedService(service);
    setViewModal(true);
  };

  // Get service type configuration
  const getServiceTypeConfig = (type) => SERVICE_TYPES[type] || {};

  return (
    <Box>
      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Total Services</Typography>
            <Typography variant="h4" color="primary" fontWeight={700}>{stats.total}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="subtitle2" color="primary">Active</Typography>
            <Typography variant="h4" color="primary" fontWeight={700}>{stats.active}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="subtitle2" color="success.main">Completed</Typography>
            <Typography variant="h4" color="success.main" fontWeight={700}>{stats.completed}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="subtitle2" color="error.main">Overdue</Typography>
            <Typography variant="h4" color="error.main" fontWeight={700}>{stats.overdue}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Service Type Distribution */}
      <Card sx={{ mb: 4, p: 3, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>Service Type Distribution</Typography>
        <Grid container spacing={2}>
          {Object.entries(stats.byType || {}).map(([type, count]) => {
            const config = getServiceTypeConfig(type);
            return (
              <Grid item xs={6} sm={4} md={2} key={type}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mb: 1,
                    color: theme.palette[config.color]?.main || 'primary.main'
                  }}>
                    {config.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600}>{count}</Typography>
                  <Typography variant="caption" color="text.secondary">{config.label}</Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Card>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Service Management
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Service Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              label="Service Type"
            >
              <MenuItem value="All">All Types</MenuItem>
              {Object.entries(SERVICE_TYPES).map(([key, config]) => (
                <MenuItem key={key} value={key}>{config.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => {
              setFilter('All');
              setTypeFilter('All');
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {/* Services Table */}
      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.background.paper }}>
              <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Assigned To</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map(service => {
              const now = new Date();
              const isOverdue = service.status !== 'Completed' && new Date(service.dueDate) < now;
              const typeConfig = getServiceTypeConfig(service.type);
              
              return (
                <TableRow key={service.id} sx={{ 
                  bgcolor: isOverdue ? 'error.light' : 'inherit',
                  opacity: service.status === 'Completed' ? 0.7 : 1
                }}>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {service.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {service.room} • {service.guest}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={typeConfig.icon}
                      label={typeConfig.label}
                      color={typeConfig.color}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={isOverdue ? 'Overdue' : service.status}
                      color={isOverdue ? 'error' : statusColors[service.status]}
                      variant={isOverdue ? 'filled' : 'outlined'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={service.priority}
                      color={priorityColors[service.priority]}
                      size="small"
                    />
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
                    <Typography variant="body2">
                      {new Date(service.dueDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(service.dueDate).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleView(service)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Service">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(service)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {service.status !== 'Completed' && (
                        <Tooltip title="Mark Complete">
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
            {filteredServices.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  <Typography variant="h6">No services found</Typography>
                  <Typography variant="body2">Try adjusting your filters</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Service Modal */}
      <Dialog open={editModal} onClose={() => setEditModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Service Title"
                value={editForm.title || ''}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editForm.status || ''}
                  onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={editForm.priority || ''}
                  onChange={e => setEditForm({ ...editForm, priority: e.target.value })}
                  label="Priority"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assigned To"
                value={editForm.assignedTo || ''}
                onChange={e => setEditForm({ ...editForm, assignedTo: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                value={editForm.notes || ''}
                onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModal(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* View Service Details Modal */}
      <Dialog open={viewModal} onClose={() => setViewModal(false)} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedService && (
            <Box>
              <Typography variant="h5" fontWeight={700} mb={3}>
                {selectedService.title}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight={600} mb={2}>Service Details</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Type" 
                        secondary={
                          <Chip
                            icon={getServiceTypeConfig(selectedService.type).icon}
                            label={getServiceTypeConfig(selectedService.type).label}
                            color={getServiceTypeConfig(selectedService.type).color}
                            size="small"
                          />
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Category" 
                        secondary={selectedService.category}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Status" 
                        secondary={
                          <Chip
                            label={selectedService.status}
                            color={statusColors[selectedService.status]}
                            size="small"
                          />
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Priority" 
                        secondary={
                          <Chip
                            label={selectedService.priority}
                            color={priorityColors[selectedService.priority]}
                            size="small"
                          />
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight={600} mb={2}>Assignment Details</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Assigned To" 
                        secondary={selectedService.assignedTo}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Assigned By" 
                        secondary={selectedService.assignedBy}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Room" 
                        secondary={selectedService.room}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Guest" 
                        secondary={selectedService.guest}
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={600} mb={2}>Timeline</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Due Date</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(selectedService.dueDate).toLocaleString()}
                      </Typography>
                    </Grid>
                    {selectedService.startDate && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Start Date</Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {new Date(selectedService.startDate).toLocaleString()}
                        </Typography>
                      </Grid>
                    )}
                    {selectedService.completedAt && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Completed At</Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {new Date(selectedService.completedAt).toLocaleString()}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                
                {selectedService.notes && (
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={600} mb={2}>Notes</Typography>
                    <Typography variant="body1">{selectedService.notes}</Typography>
                  </Grid>
                )}
                
                {selectedService.status === 'Completed' && selectedService.rating && (
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={600} mb={2}>Feedback</Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="body2">Rating:</Typography>
                      {[...Array(5)].map((_, i) => (
                        <CheckIcon 
                          key={i} 
                          color={i < selectedService.rating ? "primary" : "disabled"}
                          fontSize="small"
                        />
                      ))}
                    </Box>
                    {selectedService.feedback && (
                      <Typography variant="body1">{selectedService.feedback}</Typography>
                    )}
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewModal(false)}>Close</Button>
          <Button 
            onClick={() => {
              setViewModal(false);
              handleEdit(selectedService);
            }} 
            variant="contained"
          >
            Edit Service
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceManagement; 