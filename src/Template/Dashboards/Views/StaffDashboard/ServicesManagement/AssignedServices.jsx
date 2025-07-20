import React, { useState } from 'react';
import { Box, Card, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, Select, MenuItem, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockServices = [
  { id: 1, name: 'Room Cleaning', status: 'Active', due: '2024-06-10T12:00:00Z' },
  { id: 2, name: 'Laundry', status: 'Pending', due: '2024-06-09T15:00:00Z' },
  { id: 3, name: 'Food Delivery', status: 'Completed', due: '2024-06-08T10:00:00Z' },
  { id: 4, name: 'Grocery Pickup', status: 'Active', due: '2024-06-07T18:00:00Z' },
  { id: 5, name: 'Maintenance', status: 'Pending', due: '2024-06-06T09:00:00Z' },
];

const statusColors = {
  Active: 'primary',
  Pending: 'warning',
  Completed: 'success',
  Overdue: 'error',
};

function getStats(services) {
  const now = new Date();
  let assigned = services.length;
  let inProgress = services.filter(s => s.status === 'Active').length;
  let completed = services.filter(s => s.status === 'Completed').length;
  let overdue = services.filter(s => (s.status !== 'Completed') && new Date(s.due) < now).length;
  return { assigned, inProgress, completed, overdue };
}

const AssignedServices = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const stats = getStats(mockServices);

  const filteredServices =
    filter === 'All' ? mockServices : mockServices.filter(s => s.status === filter);

  return (
    <Box>
      {/* Stats Panel */}
      <Box display="flex" gap={3} mb={4}>
        <Card sx={{ flex: 1, p: 2, textAlign: 'center', boxShadow: 2 }}>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600}>Assigned</Typography>
          <Typography variant="h4" color="primary" fontWeight={700}>{stats.assigned}</Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: 'center', boxShadow: 2 }}>
          <Typography variant="subtitle1" color={theme.palette.primary.main} fontWeight={600}>In Progress</Typography>
          <Typography variant="h4" color="primary" fontWeight={700}>{stats.inProgress}</Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: 'center', boxShadow: 2 }}>
          <Typography variant="subtitle1" color={theme.palette.success.main} fontWeight={600}>Completed</Typography>
          <Typography variant="h4" color="success.main" fontWeight={700}>{stats.completed}</Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: 'center', boxShadow: 2 }}>
          <Typography variant="subtitle1" color={theme.palette.error.main} fontWeight={600}>Overdue</Typography>
          <Typography variant="h4" color="error.main" fontWeight={700}>{stats.overdue}</Typography>
        </Card>
      </Box>
      {/* Filter Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700} color="text.primary">Assigned Services</Typography>
        <Select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 160, borderRadius: 2, bgcolor: 'background.paper' }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </Box>
      {/* Table Layout (to be replaced by Kanban in next step) */}
      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.table?.header || theme.palette.background.paper }}>
              <TableCell sx={{ fontWeight: 600 }}>Service Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Due</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map(service => {
              const now = new Date();
              const isOverdue = service.status !== 'Completed' && new Date(service.due) < now;
              return (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={isOverdue ? 'Overdue' : service.status}
                      color={isOverdue ? statusColors.Overdue : statusColors[service.status]}
                      variant={isOverdue ? 'filled' : 'outlined'}
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{new Date(service.due).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 2, mr: 1 }}
                      onClick={() => setSelected(service)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      Mark Complete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredServices.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      {/* Modal for service details */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <Card sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 340,
          minHeight: 180,
          p: 4,
          outline: 'none',
        }}>
          {selected && (
            <>
              <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">{selected.name} Details</Typography>
              <Typography>Status: <Chip label={selected.status} color={statusColors[selected.status]} size="small" /></Typography>
              <Typography>Due: {new Date(selected.due).toLocaleString()}</Typography>
              <Typography mt={2}>More details and actions can go here.</Typography>
              <Button
                onClick={() => setSelected(null)}
                sx={{ position: 'absolute', top: 8, right: 8, minWidth: 0, p: 0 }}
                color="error"
              >
                ×
              </Button>
            </>
          )}
        </Card>
      </Modal>
    </Box>
  );
};

export default AssignedServices; 