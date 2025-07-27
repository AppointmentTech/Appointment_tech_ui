import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useTheme, Card, CardContent, Grid, Chip, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';

const initialGuests = [
  { id: 1, name: 'Alice', room: '102', phone: '9876543210', checkedIn: true },
  { id: 2, name: 'Bob', room: '105', phone: '9123456789', checkedIn: true },
];

const GuestManagement = () => {
  const theme = useTheme();
  const [guests, setGuests] = useState(initialGuests);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guestForm, setGuestForm] = useState({ name: '', room: '', phone: '' });

  // Summary
  const totalGuests = guests.length;
  const checkedIn = guests.filter(g => g.checkedIn).length;
  const checkedOut = totalGuests - checkedIn;

  // Handlers
  const handleAddOpen = () => { setAddOpen(true); setGuestForm({ name: '', room: '', phone: '' }); };
  const handleAddClose = () => setAddOpen(false);
  const handleAdd = () => {
    setGuests(gs => [...gs, { ...guestForm, id: Date.now(), checkedIn: true }]);
    handleAddClose();
  };
  const handleEditOpen = (guest) => { setSelectedGuest(guest); setGuestForm(guest); setEditOpen(true); };
  const handleEditClose = () => setEditOpen(false);
  const handleEdit = () => {
    setGuests(gs => gs.map(g => g.id === selectedGuest.id ? { ...g, ...guestForm } : g));
    handleEditClose();
  };
  const handleDeleteOpen = (guest) => { setSelectedGuest(guest); setDeleteOpen(true); };
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDelete = () => {
    setGuests(gs => gs.filter(g => g.id !== selectedGuest.id));
    handleDeleteClose();
  };
  const handleInfoOpen = (guest) => { setSelectedGuest(guest); setInfoOpen(true); };
  const handleInfoClose = () => setInfoOpen(false);
  const handleCheckOut = (id) => {
    setGuests(gs => gs.map(g => g.id === id ? { ...g, checkedIn: false } : g));
  };

  // DataGrid columns
  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton color="info" onClick={() => handleInfoOpen(params.row)}><InfoIcon /></IconButton>
          <IconButton color="primary" onClick={() => handleEditOpen(params.row)}><EditIcon /></IconButton>
          <IconButton color="error" onClick={() => handleDeleteOpen(params.row)}><DeleteIcon /></IconButton>
        </Box>
      ),
      sortable: false,
      filterable: false,
      disableExport: true,
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'checkedIn', headerName: 'Status', width: 130, renderCell: (params) => (
      params.value
        ? <Chip label="Checked In" color="success" size="small" />
        : <Chip label="Checked Out" color="default" size="small" />
    ) },
    {
      field: 'checkOut',
      headerName: 'Check Out',
      width: 120,
      renderCell: (params) => (
        params.row.checkedIn ? (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ borderRadius: 2 }}
            onClick={() => handleCheckOut(params.row.id)}
          >
            Check Out
          </Button>
        ) : null
      ),
      sortable: false,
      filterable: false,
      disableExport: true,
    },
  ];

  return (
    <Box>
      {/* Summary Card */}
      <Card sx={{ mb: 3, bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[2] }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <GroupIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">Total Guests</Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>{totalGuests}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip label="Checked In" color="success" size="small" />
                <Typography variant="subtitle2" color="text.secondary">Checked In</Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>{checkedIn}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip label="Checked Out" color="default" size="small" />
                <Typography variant="subtitle2" color="text.secondary">Checked Out</Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>{checkedOut}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* DataGrid Table */}
      <Box sx={{ height: 400, width: '100%', mb: 3 }}>
        <DataGrid
          rows={guests}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.shadows[1],
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: theme.palette.mode === 'dark' ? '#23272f' : '#f9fafb',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#e0e7ef',
            },
            '& .MuiDataGrid-columnHeaders': {
              background: theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
              fontWeight: 700,
              fontSize: '1rem',
            },
          }}
          getRowId={row => row.id}
        />
      </Box>
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
      {/* Edit Guest Modal */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Guest</DialogTitle>
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
          <Button onClick={handleEditClose} color="inherit">Cancel</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Guest</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this guest?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="inherit">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Info Dialog */}
      <Dialog open={infoOpen} onClose={handleInfoClose} maxWidth="xs" fullWidth>
        <DialogTitle>Guest Details</DialogTitle>
        <DialogContent>
          {selectedGuest && (
            <Box p={1}>
              <Typography variant="subtitle1" fontWeight={700} color="primary" mb={1}>{selectedGuest.name}</Typography>
              <Typography variant="body2" color="text.secondary">Room: <b>{selectedGuest.room}</b></Typography>
              <Typography variant="body2" color="text.secondary">Phone: <b>{selectedGuest.phone}</b></Typography>
              <Typography variant="body2" color="text.secondary">Status: {selectedGuest.checkedIn ? <Chip label="Checked In" color="success" size="small" /> : <Chip label="Checked Out" color="default" size="small" />}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInfoClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuestManagement; 