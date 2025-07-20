import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Button, Grid, Divider, useTheme } from '@mui/material';

const mockProfile = {
  name: 'John Doe',
  role: 'Hostel Staff',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  avatar: '',
  stats: {
    assigned: 12,
    completed: 8,
    overdue: 1,
  },
  recent: [
    { id: 1, action: 'Completed Room Cleaning (101)', time: 'Today, 10:00 AM' },
    { id: 2, action: 'Marked Room 102 as Dirty', time: 'Yesterday, 5:30 PM' },
    { id: 3, action: 'Reported Maintenance for Room 103', time: 'Yesterday, 2:15 PM' },
  ],
};

const StaffProfile = () => {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
      <Card sx={{ maxWidth: 500, width: '100%', borderRadius: 3, boxShadow: 4, p: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar
            src={mockProfile.avatar}
            sx={{ width: 96, height: 96, mb: 2, bgcolor: theme.palette.primary.main, fontSize: 40 }}
          >
            {mockProfile.name.charAt(0)}
          </Avatar>
          <Typography variant="h5" fontWeight={700} color="text.primary">{mockProfile.name}</Typography>
          <Typography variant="subtitle1" color="primary" fontWeight={600}>{mockProfile.role}</Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>{mockProfile.email}</Typography>
          <Typography variant="body2" color="text.secondary">{mockProfile.phone}</Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 2, borderRadius: 2 }}>
            Edit Profile
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} justifyContent="center" textAlign="center">
          <Grid item xs={4}>
            <Typography variant="h6" color="primary.main" fontWeight={700}>{mockProfile.stats.assigned}</Typography>
            <Typography variant="body2" color="text.secondary">Assigned</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="success.main" fontWeight={700}>{mockProfile.stats.completed}</Typography>
            <Typography variant="body2" color="text.secondary">Completed</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="error.main" fontWeight={700}>{mockProfile.stats.overdue}</Typography>
            <Typography variant="body2" color="text.secondary">Overdue</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1}>Recent Activity</Typography>
        {mockProfile.recent.map(item => (
          <Box key={item.id} mb={1}>
            <Typography variant="body2" color="text.secondary">{item.action}</Typography>
            <Typography variant="caption" color="text.disabled">{item.time}</Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

export default StaffProfile; 