import React, { useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, useTheme } from '@mui/material';

const mockRequests = [
  { id: 1, room: '103', issue: 'AC not working', status: 'Open' },
  { id: 2, room: '105', issue: 'Leaky faucet', status: 'In Progress' },
  { id: 3, room: '102', issue: 'Broken window', status: 'Resolved' },
];

const statusColors = {
  Open: 'warning',
  'In Progress': 'info',
  Resolved: 'success',
};

const MaintenanceRequests = () => {
  const theme = useTheme();
  const [requests, setRequests] = useState(mockRequests);

  const markInProgress = (id) => {
    setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'In Progress' } : r));
  };
  const markResolved = (id) => {
    setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">Maintenance Requests</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell>Issue</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(req => (
            <TableRow key={req.id}>
              <TableCell>{req.room}</TableCell>
              <TableCell>{req.issue}</TableCell>
              <TableCell>
                <Chip label={req.status} color={statusColors[req.status]} />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  sx={{ mr: 1, borderRadius: 2 }}
                  disabled={req.status !== 'Open'}
                  onClick={() => markInProgress(req.id)}
                >
                  Mark In Progress
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ borderRadius: 2 }}
                  disabled={req.status === 'Resolved'}
                  onClick={() => markResolved(req.id)}
                >
                  Mark Resolved
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MaintenanceRequests; 