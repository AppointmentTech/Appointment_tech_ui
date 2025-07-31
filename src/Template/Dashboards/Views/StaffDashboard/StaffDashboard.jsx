import React, { useState } from 'react';
import StaffHeader from './Components/StaffHeader.jsx';
import AssignedServices from './ServicesManagement/AssignedServices.jsx';
import ServiceManagement from './ServicesManagement/ServiceManagement.jsx';
import ServiceAnalytics from './ServicesManagement/ServiceAnalytics.jsx';
import ServiceScheduler from './ServicesManagement/ServiceScheduler.jsx';
import ServiceDashboard from './ServicesManagement/ServiceDashboard.jsx';
import RoomManagement from './ServicesManagement/RoomManagement.jsx';
import MaintenanceRequests from './ServicesManagement/MaintenanceRequests.jsx';
import GuestManagement from './ServicesManagement/GuestManagement.jsx';
import StaffProfile from './Profile/StaffProfile.jsx';
import DailyTasks from './ServicesManagement/DailyTasks.jsx';
import { Box, useTheme, Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSidebar } from './Context/SidebarContext.js';

// Navigation items for AppBar title display
const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'assigned', label: 'Assigned Services' },
  { key: 'services', label: 'Service Management' },
  { key: 'scheduler', label: 'Service Scheduler' },
  { key: 'analytics', label: 'Service Analytics' },
  { key: 'guests', label: 'Guest Management' },
  { key: 'rooms', label: 'Room Management' },
  { key: 'maintenance', label: 'Maintenance Requests' },
  { key: 'profile', label: 'Profile' },
];

const initialGuests = [
  { id: 1, name: 'Alice', room: '102', phone: '9876543210', checkedIn: true },
  { id: 2, name: 'Bob', room: '105', phone: '9123456789', checkedIn: true },
];
const initialRooms = [
  { id: 1, number: '101', status: 'Clean', guest: null },
  { id: 2, number: '102', status: 'Dirty', guest: { name: 'Alice', phone: '9876543210' } },
  { id: 3, number: '103', status: 'Needs Maintenance', guest: null },
  { id: 4, number: '104', status: 'Clean', guest: null },
  { id: 5, number: '105', status: 'Dirty', guest: { name: 'Bob', phone: '9123456789' } },
];
const initialMaintenance = [
  { id: 1, room: '103', issue: 'AC not working', status: 'Open' },
  { id: 2, room: '105', issue: 'Leaky faucet', status: 'In Progress' },
  { id: 3, room: '102', issue: 'Broken window', status: 'Resolved' },
];

const StaffDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarCollapsed } = useSidebar();
  const [section, setSection] = useState('dashboard');
  const [guests, setGuests] = useState(initialGuests);
  const [rooms, setRooms] = useState(initialRooms);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [logMaintenanceOpen, setLogMaintenanceOpen] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({ room: '', issue: '' });

  // Synchronize guest check-in/check-out with rooms
  const handleAssignRoom = (roomId, guest) => {
    setRooms(rooms => rooms.map(r => r.id === roomId ? { ...r, guest, status: 'Dirty' } : r));
    setGuests(gs => [...gs, { ...guest, id: Date.now(), room: rooms.find(r => r.id === roomId).number, checkedIn: true }]);
  };
  const handleCheckOutRoom = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.guest) {
      setGuests(gs => gs.map(g => g.name === room.guest.name && g.room === room.number ? { ...g, checkedIn: false } : g));
    }
    setRooms(rooms => rooms.map(r => r.id === roomId ? { ...r, guest: null, status: 'Dirty' } : r));
  };
  const handleGuestCheckOut = (guestId) => {
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      setRooms(rooms => rooms.map(r => r.number === guest.room ? { ...r, guest: null, status: 'Dirty' } : r));
      setGuests(gs => gs.map(g => g.id === guestId ? { ...g, checkedIn: false } : g));
    }
  };
  // DailyTasks navigation handler
  const handleTaskNavigate = (type, ref) => {
    if (type === 'cleaning' || type === 'maintenance') setSection('rooms');
    else if (type === 'checkin') setSection('guests');
    else if (type === 'request') setSection('assigned');
  };
  // Log maintenance issue
  const handleLogMaintenance = () => {
    setMaintenance(m => [
      ...m,
      { id: Date.now(), room: maintenanceForm.room, issue: maintenanceForm.issue, status: 'Open' },
    ]);
    setLogMaintenanceOpen(false);
    setMaintenanceForm({ room: '', issue: '' });
    setSection('maintenance');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, position: 'relative' }}>
      <StaffHeader
        navItems={NAV_ITEMS}
        section={section}
        setSection={setSection}
      />
             <Box
         sx={{
           ml: { xs: 0, md: sidebarCollapsed ? '80px' : '280px' },
           p: { xs: 1, sm: 4 },
           mt: 8, // Account for fixed AppBar
           minHeight: '60vh',
           transition: 'margin-left 0.3s ease',
         }}
       >
        {section === 'assigned' && <DailyTasks onTaskNavigate={handleTaskNavigate} />}
        <Box sx={{ minHeight: 400 }}>
          {section === 'dashboard' && <ServiceDashboard />}
          {section === 'assigned' && <AssignedServices />}
          {section === 'services' && <ServiceManagement />}
          {section === 'scheduler' && <ServiceScheduler />}
          {section === 'analytics' && <ServiceAnalytics />}
          {section === 'guests' && <GuestManagement guests={guests} setGuests={setGuests} onCheckOut={handleGuestCheckOut} />}
          {section === 'rooms' && <RoomManagement rooms={rooms} setRooms={setRooms} onAssign={handleAssignRoom} onCheckOut={handleCheckOutRoom} />}
          {section === 'maintenance' && <MaintenanceRequests maintenance={maintenance} setMaintenance={setMaintenance} />}
          {section === 'profile' && <StaffProfile />}
        </Box>
      </Box>
      {/* Floating Action Button for logging maintenance issue */}
             <Fab 
         color="error" 
         aria-label="log-maintenance" 
         sx={{ 
           position: 'fixed', 
           bottom: 32, 
           right: 32, 
           zIndex: 1200,
           ml: { xs: 0, md: sidebarCollapsed ? '80px' : '280px' },
           transition: 'margin-left 0.3s ease'
         }} 
         onClick={() => setLogMaintenanceOpen(true)}
       >
        <AddIcon />
      </Fab>
      {/* Modal for logging maintenance issue */}
      <Dialog open={logMaintenanceOpen} onClose={() => setLogMaintenanceOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Log Maintenance Issue</DialogTitle>
        <DialogContent>
          <TextField
            label="Room Number"
            name="room"
            value={maintenanceForm.room}
            onChange={e => setMaintenanceForm(f => ({ ...f, room: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Issue Description"
            name="issue"
            value={maintenanceForm.issue}
            onChange={e => setMaintenanceForm(f => ({ ...f, issue: e.target.value }))}
            fullWidth
            margin="normal"
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogMaintenanceOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleLogMaintenance} variant="contained" color="primary">Log Issue</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffDashboard; 