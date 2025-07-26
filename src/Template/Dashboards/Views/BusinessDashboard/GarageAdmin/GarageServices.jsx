import React, { useState } from 'react';
import CommonHeader from '@template/Dashboards/Components/CommonHeader.jsx';
import {
  Box, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Chip, Tooltip, InputAdornment, Grid, Card, CardContent, Divider, List, ListItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BarChart from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { PieChart, Pie, Cell, BarChart as ReBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const mockCategories = ['Maintenance', 'Electrical', 'Bodywork', 'AC', 'Other'];
const initialServices = [
  { id: 1, name: 'Oil Change', category: 'Maintenance', price: 800, status: 'Enabled', description: 'Engine oil replacement.' },
  { id: 2, name: 'Brake Repair', category: 'Maintenance', price: 1200, status: 'Enabled', description: 'Brake pad and disc repair.' },
  { id: 3, name: 'AC Service', category: 'AC', price: 1500, status: 'Disabled', description: 'Air conditioning check and refill.' },
  { id: 4, name: 'Dent Removal', category: 'Bodywork', price: 2000, status: 'Enabled', description: 'Body dent removal and painting.' },
];
const mockActivity = [
  { type: 'add', service: 'Wheel Alignment', category: 'Maintenance', user: 'Amit Sharma', desc: 'Added new service', time: '2 min ago' },
  { type: 'edit', service: 'AC Service', category: 'AC', user: 'Priya Singh', desc: 'Price updated from ₹1200 to ₹1500', time: '10 min ago' },
  { type: 'delete', service: 'Old Tyre Change', category: 'Bodywork', user: 'Ravi Kumar', desc: 'Service removed', time: '1 hr ago' },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function GarageServices() {
  const theme = useTheme();
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', price: '', status: 'Enabled', description: '' });
  const [editId, setEditId] = useState(null);

  // Metrics
  const totalServices = services.length;
  const enabledServices = services.filter(s => s.status === 'Enabled').length;
  const disabledServices = services.filter(s => s.status === 'Disabled').length;
  const avgPrice = services.length ? Math.round(services.reduce((sum, s) => sum + Number(s.price), 0) / services.length) : 0;

  // Chart data
  const servicesByCategory = mockCategories.map(cat => ({ name: cat, value: services.filter(s => s.category === cat).length }));
  const priceDistribution = services.map(s => ({ name: s.name, price: Number(s.price) }));

  const filteredServices = services.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCategory || s.category === filterCategory) &&
    (!filterStatus || s.status === filterStatus)
  );

  const handleOpenDialog = (service) => {
    if (service) {
      setEditMode(true);
      setEditId(service.id);
      setForm(service);
    } else {
      setEditMode(false);
      setEditId(null);
      setForm({ name: '', category: '', price: '', status: 'Enabled', description: '' });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setForm({ name: '', category: '', price: '', status: 'Enabled', description: '' });
    setEditId(null);
    setEditMode(false);
  };

  const handleFormChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (editMode) {
      setServices(services.map(s => s.id === editId ? { ...form, id: editId } : s));
    } else {
      setServices([...services, { ...form, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleToggleStatus = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, status: s.status === 'Enabled' ? 'Disabled' : 'Enabled' } : s));
  };

  // Quick Actions
  const handleBulkEnable = () => {
    setServices(services.map(s => ({ ...s, status: 'Enabled' })));
  };
  const handleBulkDisable = () => {
    setServices(services.map(s => ({ ...s, status: 'Disabled' })));
  };
  const handleExport = () => {
    alert('Exported all services!');
  };

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit"><IconButton onClick={() => handleOpenDialog(params.row)}><EditIcon /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton color="error" onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton></Tooltip>
          <Tooltip title={params.row.status === 'Enabled' ? 'Disable' : 'Enable'}>
            <IconButton color={params.row.status === 'Enabled' ? 'success' : 'default'} onClick={() => handleToggleStatus(params.row.id)}>
              {params.row.status === 'Enabled' ? <ToggleOnIcon /> : <ToggleOffIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    { field: 'name', headerName: 'Service Name', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'price', headerName: 'Price (₹)', flex: 1, type: 'number' },
    { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'Enabled' ? 'success' : 'default'} size="small" />
    ) },
    { field: 'description', headerName: 'Description', flex: 2 },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CommonHeader role="admin" />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          overflow: "auto",
          height: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Metrics Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Total Services</Typography>
                <Typography variant="h5" fontWeight={700}>{totalServices}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Enabled</Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">{enabledServices}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Disabled</Typography>
                <Typography variant="h5" fontWeight={700} color="error.main">{disabledServices}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Avg. Price</Typography>
                <Typography variant="h5" fontWeight={700}>₹{avgPrice}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Quick Actions */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Service</Button>
          <Button variant="outlined" startIcon={<ToggleOnIcon />} color="success" onClick={handleBulkEnable}>Bulk Enable</Button>
          <Button variant="outlined" startIcon={<ToggleOffIcon />} color="error" onClick={handleBulkDisable}>Bulk Disable</Button>
          <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleExport}>Export All</Button>
        </Box>
        {/* Charts */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}><PieChartIcon color="primary" /><Typography variant="subtitle1" fontWeight={700}>Services by Category</Typography></Box>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={servicesByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {servicesByCategory.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}><BarChart color="primary" /><Typography variant="subtitle1" fontWeight={700}>Price Distribution</Typography></Box>
                <ResponsiveContainer width="100%" height={220}>
                  <ReBarChart data={priceDistribution}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="price" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Recent Activity */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>Recent Activity</Typography>
            <List sx={{ p: 0 }}>
              {mockActivity.map((act, idx) => (
                <ListItem key={idx} sx={{ alignItems: 'flex-start', gap: 2, py: 2, px: 0, borderLeft: 4, borderColor:
                  act.type === 'add' ? 'success.main' :
                  act.type === 'edit' ? 'info.main' :
                  act.type === 'delete' ? 'error.main' : 'grey.400',
                  mb: 1, background: idx % 2 === 0 ? 'background.paper' : 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ mt: 0.5 }}>
                    {act.type === 'add' && <AddCircleIcon color="success" />}
                    {act.type === 'edit' && <EditIcon color="info" />}
                    {act.type === 'delete' && <DeleteIcon color="error" />}
                  </Box>
                  <Box sx={{ minWidth: 40, mr: 2 }}>
                    <Box sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                      {act.user.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Box>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>{act.type}</Typography>
                      <Chip label={act.category} size="small" color={act.category === 'Maintenance' ? 'success' : act.category === 'AC' ? 'info' : 'default'} />
                      <Typography variant="body2" color="text.primary" fontWeight={700} ml={1}>{act.service}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{act.desc}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 70, textAlign: 'right', mt: 0.5 }}>{act.time}</Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        {/* Service Table */}
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
          <DataGrid
            autoHeight
            rows={filteredServices}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8, 16, 32]}
            disableSelectionOnClick
          />
        </Box>
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{editMode ? 'Edit Service' : 'Add Service'}</DialogTitle>
          <DialogContent>
            <TextField label="Service Name" fullWidth margin="dense" value={form.name} onChange={e => handleFormChange('name', e.target.value)} />
            <Select
              label="Category"
              fullWidth
              margin="dense"
              value={form.category}
              onChange={e => handleFormChange('category', e.target.value)}
              displayEmpty
              sx={{ my: 1 }}
            >
              <MenuItem value="">Select Category</MenuItem>
              {mockCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
            <TextField label="Price (₹)" type="number" fullWidth margin="dense" value={form.price} onChange={e => handleFormChange('price', e.target.value)} />
            <Select
              label="Status"
              fullWidth
              margin="dense"
              value={form.status}
              onChange={e => handleFormChange('status', e.target.value)}
              sx={{ my: 1 }}
            >
              <MenuItem value="Enabled">Enabled</MenuItem>
              <MenuItem value="Disabled">Disabled</MenuItem>
            </Select>
            <TextField label="Description" fullWidth margin="dense" multiline minRows={2} value={form.description} onChange={e => handleFormChange('description', e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>{editMode ? 'Save Changes' : 'Add Service'}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
} 