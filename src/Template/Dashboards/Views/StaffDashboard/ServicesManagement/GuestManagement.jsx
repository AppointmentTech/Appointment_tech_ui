import React, { useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useTheme } from '@mui/material';

const initialGuests = [
  { id: 1, name: 'Alice', room: '102', phone: '9876543210', checkedIn: true },
  { id: 2, name: 'Bob', room: '105', phone: '9123456789', checkedIn: true },
];

const GuestManagement = () => {
  const theme = useTheme();
  const [guests, setGuests] = useState(initialGuests);
  const [addOpen, setAddOpen] = useState(false);
  const [guestForm, setGuestForm] = useState({ name: '', room: '', phone: '' });

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(false);
    setGuestForm({ name: '', room: '', phone: '' });
  };
  const handleAdd = () => {
    setGuests(gs => [...gs, { ...guestForm, id: Date.now(), checkedIn: true }]);
    handleAddClose();
  };
  const handleCheckOut = (id) => {
    setGuests(gs => gs.map(g => g.id === id ? { ...g, checkedIn: false } : g));
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={700} color="text.primary">Guest Management</Typography>
        <Button variant="contained" color="primary" onClick={handleAddOpen} sx={{ borderRadius: 2, fontWeight: 600 }}>
          Add Guest
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guests.map(guest => (
            <TableRow key={guest.id}>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.room}</TableCell>
              <TableCell>{guest.phone}</TableCell>
              <TableCell>
                <Typography variant="body2" color={guest.checkedIn ? 'success.main' : 'text.secondary'}>
                  {guest.checkedIn ? 'Checked In' : 'Checked Out'}
                </Typography>
              </TableCell>
              <TableCell>
                {guest.checkedIn && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleCheckOut(guest.id)}
                  >
                    Check Out
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Add Guest Modal */}
      <Dialog open={addOpen} onClose={handleAddClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Guest</DialogTitle>
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
            label="Room Number"
            name="room"
            value={guestForm.room}
            onChange={e => setGuestForm(f => ({ ...f, room: e.target.value }))}
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
          <Button onClick={handleAddClose} color="inherit">Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">Add Guest</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuestManagement; 