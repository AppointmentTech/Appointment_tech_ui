import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Chip, Box } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildIcon from '@mui/icons-material/Build';

const mockTasks = [
  { id: 1, type: 'cleaning', label: 'Clean Room 101', priority: 'High', due: '09:00 AM' },
  { id: 2, type: 'checkin', label: 'Check-in Guest: Alice (Room 102)', priority: 'Medium', due: '11:00 AM' },
  { id: 3, type: 'request', label: 'Deliver towels to Room 105', priority: 'Low', due: '12:00 PM' },
  { id: 4, type: 'maintenance', label: 'Fix AC in Room 103', priority: 'High', due: '02:00 PM' },
];

const typeIcons = {
  cleaning: <AssignmentTurnedInIcon color="primary" />,
  checkin: <MeetingRoomIcon color="success" />,
  request: <AssignmentTurnedInIcon color="warning" />,
  maintenance: <BuildIcon color="error" />,
};

const priorityColors = {
  High: 'error',
  Medium: 'warning',
  Low: 'info',
};

const DailyTasks = () => (
  <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
        Today's Tasks
      </Typography>
      <List>
        {mockTasks.map(task => (
          <ListItem key={task.id} sx={{ alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 36 }}>{typeIcons[task.type]}</ListItemIcon>
            <ListItemText
              primary={task.label}
              secondary={`Due: ${task.due}`}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
            <Chip label={task.priority} color={priorityColors[task.priority]} size="small" sx={{ fontWeight: 600 }} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default DailyTasks; 