import React, { useState } from 'react';
import StaffHeader from './Components/StaffHeader.jsx';
import AssignedServices from './ServicesManagement/AssignedServices.jsx';
import RoomManagement from './ServicesManagement/RoomManagement.jsx';
import MaintenanceRequests from './ServicesManagement/MaintenanceRequests.jsx';
import GuestManagement from './ServicesManagement/GuestManagement.jsx';
import StaffProfile from './Profile/StaffProfile.jsx';
import DailyTasks from './ServicesManagement/DailyTasks.jsx';
import { Box, useTheme } from '@mui/material';

const NAV_ITEMS = [
  { key: 'assigned', label: 'Assigned Services' },
  { key: 'guests', label: 'Guest Management' },
  { key: 'rooms', label: 'Room Management' },
  { key: 'maintenance', label: 'Maintenance Requests' },
  { key: 'profile', label: 'Profile' },
];

const StaffDashboard = () => {
  const theme = useTheme();
  const [section, setSection] = useState('assigned');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <StaffHeader
        navItems={NAV_ITEMS}
        section={section}
        setSection={setSection}
      />
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: { xs: 1, sm: 4 },
          mt: 4,
          minHeight: '60vh',
        }}
      >
        {section === 'assigned' && <DailyTasks />}
        <Box sx={{ background: theme.palette.background.paper, borderRadius: 2, boxShadow: 2, p: { xs: 1, sm: 4 }, minHeight: 400 }}>
          {section === 'assigned' && <AssignedServices />}
          {section === 'guests' && <GuestManagement />}
          {section === 'rooms' && <RoomManagement />}
          {section === 'maintenance' && <MaintenanceRequests />}
          {section === 'profile' && <StaffProfile />}
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDashboard; 