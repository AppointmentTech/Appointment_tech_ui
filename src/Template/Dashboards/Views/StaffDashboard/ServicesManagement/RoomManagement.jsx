import React, { useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const mockRooms = [
  { id: 1, number: '101', status: 'Clean', guest: null },
  { id: 2, number: '102', status: 'Dirty', guest: { name: 'Alice', phone: '9876543210' } },
  { id: 3, number: '103', status: 'Needs Maintenance', guest: null },
  { id: 4, number: '104', status: 'Clean', guest: null },
  { id: 5, number: '105', status: 'Dirty', guest: { name: 'Bob', phone: '9123456789' } },
];

const statusColors = {
  Clean: 'success',
  Dirty: 'warning',
  'Needs Maintenance': 'error',
};

const RoomManagement = () => {
  const theme = useTheme();
  const [rooms, setRooms] = useState(mockRooms);
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestForm, setGuestForm] = useState({ name: '', phone: '' });

  const markClean = (id) => {
    setRooms(rooms => rooms.map(r => r.id === id ? { ...r, status: 'Clean' } : r));
  };
  const reportIssue = (id) => {
    setRooms(rooms => rooms.map(r => r.id === id ? { ...r, status: 'Needs Maintenance' } : r));
  };
  const handleAssignOpen = (room) => {
    setSelectedRoom(room);
    setAssignOpen(true);
  };
  const handleAssignClose = () => {
    setAssignOpen(false);
    setGuestForm({ name: '', phone: '' });
    setSelectedRoom(null);
  };
  const handleAssign = () => {
    setRooms(rooms => rooms.map(r => r.id === selectedRoom.id ? { ...r, guest: { ...guestForm }, status: 'Dirty' } : r));
    handleAssignClose();
  };
  const handleCheckOut = (id) => {
    setRooms(rooms => rooms.map(r => r.id === id ? { ...r, guest: null, status: 'Dirty' } : r));
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">Room Management</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Guest</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map(room => (
            <TableRow key={room.id}>
              <TableCell>{room.number}</TableCell>
              <TableCell>
                <Chip label={room.status} color={statusColors[room.status]} />
              </TableCell>
              <TableCell>
                {room.guest ? (
                  <>
                    <Typography variant="body2" fontWeight={600}>{room.guest.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{room.guest.phone}</Typography>
                  </>
                ) : <Typography variant="caption" color="text.disabled">-</Typography>}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ mr: 1, borderRadius: 2 }}
                  disabled={room.status === 'Clean'}
                  onClick={() => markClean(room.id)}
                >
                  Mark Clean
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mr: 1, borderRadius: 2 }}
                  onClick={() => reportIssue(room.id)}
                >
                  Report Issue
                </Button>
                {!room.guest ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleAssignOpen(room)}
                  >
                    Assign Room
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleCheckOut(room.id)}
                  >
                    Check Out
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Assign Room Modal */}
      <Dialog open={assignOpen} onClose={handleAssignClose} maxWidth="xs" fullWidth>
        <DialogTitle>Assign Room {selectedRoom?.number}</DialogTitle>
        <DialogContent>
          <TextField
            label="Guest Name"
            name="name"
            value={guestForm.name}
            onChange={e => setGuestForm(f => ({ ...f, name: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={guestForm.phone}
            onChange={e => setGuestForm(f => ({ ...f, phone: e.target.value }))}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAssignClose} color="inherit">Cancel</Button>
          <Button onClick={handleAssign} variant="contained" color="primary">Assign</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomManagement; 