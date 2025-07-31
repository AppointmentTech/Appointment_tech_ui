import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Alert,
  Divider,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import {
  AssignmentTurnedIn as AssignmentIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Speed as SpeedIcon,
  Person as PersonIcon,
  Room as RoomIcon,
  LocalShipping as DeliveryIcon,
  Restaurant as FoodIcon,
  CleaningServices as CleaningIcon,
  Build as MaintenanceIcon,
  Security as SecurityIcon,
  Spa as SpaIcon,
  Notifications as NotificationIcon,
  Today as TodayIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { sidebarData } from '../../../../../CommonComponents/SidebarData.js';
import { getServiceTypesFromSidebar, generateMockDataForServices } from './ServiceConfig.js';

// Dynamic service types from SidebarData
const dynamicServiceTypes = getServiceTypesFromSidebar(sidebarData);

// Generate dynamic mock data based on available services
const mockDashboardData = {
  ...generateMockDataForServices(dynamicServiceTypes),
  recentActivities: [
    {
      id: 1,
      type: 'hostel',
      action: 'completed',
      title: 'Room 101 Cleaning',
      staff: 'Sarah Wilson',
      time: '2 hours ago',
      rating: 5
    },
    {
      id: 2,
      type: 'food',
      action: 'started',
      title: 'Breakfast Delivery - Room 102',
      staff: 'Mike Johnson',
      time: '1 hour ago',
      rating: null
    },
    {
      id: 3,
      type: 'maintenance',
      action: 'scheduled',
      title: 'AC Repair - Room 103',
      staff: 'David Brown',
      time: '30 minutes ago',
      rating: null
    },
    {
      id: 4,
      type: 'delivery',
      action: 'completed',
      title: 'Package Delivery - Room 104',
      staff: 'John Smith',
      time: '15 minutes ago',
      rating: 4
    },
    {
      id: 5,
      type: 'spa',
      action: 'in_progress',
      title: 'Massage Session - Room 105',
      staff: 'Lisa Anderson',
      time: '10 minutes ago',
      rating: null
    }
  ],
  upcomingServices: [
    {
      id: 1,
      type: 'hostel',
      title: 'Room 106 Cleaning',
      time: '09:00',
      staff: 'Sarah Wilson',
      priority: 'High'
    },
    {
      id: 2,
      type: 'food',
      title: 'Lunch Delivery - Room 107',
      time: '12:00',
      staff: 'Mike Johnson',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Plumbing Repair - Room 108',
      time: '14:00',
      staff: 'David Brown',
      priority: 'High'
    }
  ],
  topPerformers: [
    { name: 'Sarah Wilson', rating: 4.8, services: 45, type: 'Hostel Management' },
    { name: 'Mike Johnson', rating: 4.7, services: 32, type: 'Food & Catering' },
    { name: 'Lisa Anderson', rating: 4.9, services: 15, type: 'Wellness & Spa' },
    { name: 'David Brown', rating: 4.5, services: 18, type: 'Maintenance' }
  ]
};

// Use dynamic service types from SidebarData
const SERVICE_TYPES = dynamicServiceTypes;

const ServiceDashboard = () => {
  const theme = useTheme();
  const [dashboardData] = useState(mockDashboardData);

  const getActionColor = (action) => {
    switch (action) {
      case 'completed': return 'success';
      case 'started': return 'primary';
      case 'scheduled': return 'info';
      case 'in_progress': return 'warning';
      default: return 'default';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'completed': return <CheckIcon />;
      case 'started': return <AssignmentIcon />;
      case 'scheduled': return <ScheduleIcon />;
      case 'in_progress': return <TimeIcon />;
      default: return <NotificationIcon />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Service Dashboard
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Service
          </Button>
        </Box>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="h3" color="primary" fontWeight={700}>
              {dashboardData.overview.totalServices}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Total Services
            </Typography>
            <Box display="flex" justifyContent="center" gap={1} mt={1}>
              <TrendingUpIcon color="success" fontSize="small" />
              <Typography variant="caption" color="success.main">+12% this week</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="h3" color="warning.main" fontWeight={700}>
              {dashboardData.overview.activeServices}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Active Services
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(dashboardData.overview.activeServices / dashboardData.overview.totalServices) * 100}
              color="warning"
              sx={{ mt: 1 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="h3" color="success.main" fontWeight={700}>
              {dashboardData.overview.completedToday}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Completed Today
            </Typography>
            <Box display="flex" justifyContent="center" mt={1}>
              <TodayIcon color="success" fontSize="small" />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="h3" color="info.main" fontWeight={700}>
              {dashboardData.overview.averageRating}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Average Rating
            </Typography>
            <Box display="flex" justifyContent="center" mt={1}>
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  color={i < Math.floor(dashboardData.overview.averageRating) ? "warning" : "disabled"}
                  fontSize="small"
                />
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Service Type Performance */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Service Type Performance
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(dashboardData.serviceTypes).map(([type, data]) => {
                  const config = SERVICE_TYPES[type];
                  if (!config || !config.color) {
                    console.warn('Missing config or color for service type:', type, config);
                    return null; // Guard: skip if config or color is undefined
                  }
                  return (
                    <TableRow key={type}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box sx={{ color: theme.palette[config.color]?.main }}>
                            {config.icon}
                          </Box>
                          <Typography variant="body2" fontWeight={600}>
                            {config.label}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>{data.total}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={data.active} color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={data.completed} color="success" size="small" />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <StarIcon color="warning" fontSize="small" />
                          <Typography variant="body2">{data.rating}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="View Details">
                            <IconButton size="small">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Manage">
                            <IconButton size="small" color="primary">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Top Performers
            </Typography>
            <List>
              {dashboardData.topPerformers.map((performer, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={performer.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {performer.type} • {performer.services} services
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <StarIcon color="warning" fontSize="small" />
                          <Typography variant="body2">{performer.rating}</Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities and Upcoming Services */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Recent Activities
            </Typography>
            <List>
              {dashboardData.recentActivities.map((activity) => {
                const config = SERVICE_TYPES[activity.type];
                return (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Badge
                        badgeContent={
                          <Box sx={{ color: theme.palette[getActionColor(activity.action)]?.main }}>
                            {getActionIcon(activity.action)}
                          </Box>
                        }
                      >
                        <Box sx={{ color: theme.palette[config.color]?.main }}>
                          {config.icon}
                        </Box>
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {activity.staff} • {activity.time}
                          </Typography>
                          {activity.rating && (
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <StarIcon color="warning" fontSize="small" />
                              <Typography variant="body2">{activity.rating}</Typography>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Upcoming Services
            </Typography>
            <List>
              {dashboardData.upcomingServices.map((service) => {
                const config = SERVICE_TYPES[service.type];
                return (
                  <ListItem key={service.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Box sx={{ color: theme.palette[config.color]?.main }}>
                        {config.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={service.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {service.staff} • {service.time}
                          </Typography>
                          <Chip 
                            label={service.priority} 
                            color={getPriorityColor(service.priority)} 
                            size="small" 
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      }
                    />
                    <Box display="flex" gap={1}>
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Start Service">
                        <IconButton size="small" color="success">
                          <AssignmentIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mt: 4, p: 3, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AddIcon />}
              sx={{ p: 2, height: 'auto', flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Schedule Service
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Create new service request
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ViewIcon />}
              sx={{ p: 2, height: 'auto', flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                View Analytics
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Service performance metrics
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ScheduleIcon />}
              sx={{ p: 2, height: 'auto', flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Manage Schedule
              </Typography>
              <Typography variant="caption" color="text.secondary">
                View and edit schedules
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PersonIcon />}
              sx={{ p: 2, height: 'auto', flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Staff Management
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Manage staff assignments
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ServiceDashboard; 