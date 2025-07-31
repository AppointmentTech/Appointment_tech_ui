import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  Room as RoomIcon,
  LocalShipping as DeliveryIcon,
  Restaurant as FoodIcon,
  CleaningServices as CleaningIcon,
  Build as MaintenanceIcon,
  Security as SecurityIcon,
  Spa as SpaIcon,
  BarChart as ChartIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { sidebarData } from '../../../../../CommonComponents/SidebarData.js';
import { getServiceTypesFromSidebar, generateMockDataForServices } from './ServiceConfig.js';

// Use dynamic service types from SidebarData
const dynamicServiceTypes = getServiceTypesFromSidebar(sidebarData);

// Generate dynamic mock analytics data based on available services
const generateMockAnalytics = (serviceTypes) => {
  const mockAnalytics = {};
  
  Object.entries(serviceTypes).forEach(([key, config]) => {
    const totalServices = Math.floor(Math.random() * 50) + 10;
    const completed = Math.floor(totalServices * 0.8);
    const inProgress = Math.floor(totalServices * 0.1);
    const pending = totalServices - completed - inProgress;
    const averageRating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const efficiency = Math.floor(Math.random() * 20) + 80;
    
    mockAnalytics[key] = {
      totalServices,
      completed,
      inProgress,
      pending,
      averageRating: parseFloat(averageRating),
      averageCompletionTime: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)} hours`,
      efficiency,
      topPerformer: ['Sarah Wilson', 'Mike Johnson', 'David Brown', 'Lisa Anderson', 'John Smith'][Math.floor(Math.random() * 5)],
      topPerformerRating: (Math.random() * 1 + 4).toFixed(1),
      commonIssues: ['Late delivery', 'Missing supplies', 'Guest complaints', 'Scheduling conflicts', 'Quality issues'],
      recentFeedback: [
        { rating: 5, comment: 'Excellent service', guest: 'Alice Johnson', room: '101' },
        { rating: 4, comment: 'Good service', guest: 'Bob Davis', room: '102' },
        { rating: 5, comment: 'Perfect service', guest: 'Carol White', room: '103' }
      ]
    };
  });
  
  return mockAnalytics;
};

const mockAnalytics = generateMockAnalytics(dynamicServiceTypes);

// Use dynamic service types from SidebarData
const SERVICE_TYPES = dynamicServiceTypes;

const ServiceAnalytics = () => {
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState('cleaning');
  const [timeRange, setTimeRange] = useState('week');

  const currentAnalytics = mockAnalytics[selectedService];
  const serviceConfig = SERVICE_TYPES[selectedService];

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'success';
    if (efficiency >= 80) return 'warning';
    return 'error';
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'warning';
    return 'error';
  };

  return (
    <Box>
      {/* Header with Service Selection */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: theme.palette[serviceConfig.color]?.main,
            fontSize: '2rem'
          }}>
            {serviceConfig.icon}
          </Box>
          <Typography variant="h4" fontWeight={700}>
            {serviceConfig.label} Analytics
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Service Type</InputLabel>
          <Select
            value={selectedService}
            onChange={e => setSelectedService(e.target.value)}
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
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="h3" color="primary" fontWeight={700}>
              {currentAnalytics.totalServices}
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
            <Typography variant="h3" color="success.main" fontWeight={700}>
              {currentAnalytics.completed}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Completed
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(currentAnalytics.completed / currentAnalytics.totalServices) * 100}
              color="success"
              sx={{ mt: 1 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="h3" color="warning.main" fontWeight={700}>
              {currentAnalytics.averageRating}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Average Rating
            </Typography>
            <Box display="flex" justifyContent="center" mt={1}>
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  color={i < Math.floor(currentAnalytics.averageRating) ? "warning" : "disabled"}
                  fontSize="small"
                />
              ))}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2 }}>
            <Typography variant="h3" color="info.main" fontWeight={700}>
              {currentAnalytics.efficiency}%
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Efficiency Rate
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={currentAnalytics.efficiency}
              color={getEfficiencyColor(currentAnalytics.efficiency)}
              sx={{ mt: 1 }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Analytics */}
      <Grid container spacing={3}>
        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Performance Metrics
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SpeedIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Average Completion Time"
                  secondary={currentAnalytics.averageCompletionTime}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Top Performer"
                  secondary={`${currentAnalytics.topPerformer} (${currentAnalytics.topPerformerRating}★)`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AssessmentIcon color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Services in Progress"
                  secondary={`${currentAnalytics.inProgress} active services`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ScheduleIcon color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="Pending Services"
                  secondary={`${currentAnalytics.pending} waiting`}
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Common Issues */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Common Issues
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {currentAnalytics.commonIssues.map((issue, index) => (
                <Chip
                  key={index}
                  label={issue}
                  color="warning"
                  variant="outlined"
                  icon={<WarningIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Recent Feedback */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Recent Feedback
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentAnalytics.recentFeedback.map((feedback, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <PersonIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="body2">{feedback.guest}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={feedback.room} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            color={i < feedback.rating ? "warning" : "disabled"}
                            fontSize="small"
                          />
                        ))}
                        <Typography variant="body2" ml={0.5}>
                          {feedback.rating}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300 }}>
                        {feedback.comment}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        {/* Service Type Comparison */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Service Type Comparison
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Total Services</TableCell>
                  <TableCell>Completion Rate</TableCell>
                  <TableCell>Average Rating</TableCell>
                  <TableCell>Efficiency</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(mockAnalytics).map(([type, data]) => {
                  const config = SERVICE_TYPES[type];
                  const completionRate = ((data.completed / data.totalServices) * 100).toFixed(1);
                  
                  return (
                    <TableRow key={type} sx={{ 
                      bgcolor: type === selectedService ? 'action.selected' : 'inherit'
                    }}>
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
                        <Typography variant="body2">{data.totalServices}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LinearProgress 
                            variant="determinate" 
                            value={parseFloat(completionRate)}
                            color="success"
                            sx={{ width: 60 }}
                          />
                          <Typography variant="body2">{completionRate}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <StarIcon 
                            color={getRatingColor(data.averageRating)}
                            fontSize="small"
                          />
                          <Typography variant="body2">{data.averageRating}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${data.efficiency}%`}
                          color={getEfficiencyColor(data.efficiency)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => setSelectedService(type)}
                          >
                            <ChartIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceAnalytics; 