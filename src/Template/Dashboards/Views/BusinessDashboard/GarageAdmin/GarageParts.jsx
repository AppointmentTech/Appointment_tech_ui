import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, IconButton, Chip, Avatar, Stack, Divider, Tooltip, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Card, CardContent, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import { useTheme } from '@mui/material/styles';
import { Edit, Delete, Info, Add, CloudUpload, FileCopy, Print, Inventory2, Warning, ErrorOutline, Done, Cancel, LocalShipping, Category, AttachMoney, TrendingDown, TrendingUp, AccessTime, Group, Store, Event, CheckCircle, DirectionsCar } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';

const mockParts = [
  {
    id: 1,
    name: 'Front Brake Pad',
    sku: 'FBP-001',
    category: 'Brakes',
    brand: 'Bosch',
    vehicles: ['Swift', 'Baleno'],
    quantity: 8,
    minStock: 5,
    unitPrice: 900,
    supplier: 'BrakeMart',
    status: 'Low Stock',
    gst: '18%',
    activity: [
      { type: 'added', time: dayjs().subtract(10, 'day').toISOString(), by: 'Admin' },
      { type: 'updated', time: dayjs().subtract(2, 'day').toISOString(), by: 'Admin' },
    ],
  },
  {
    id: 2,
    name: 'Engine Oil Filter',
    sku: 'EOF-002',
    category: 'Filters',
    brand: 'Mahle',
    vehicles: ['Swift', 'Dzire'],
    quantity: 0,
    minStock: 3,
    unitPrice: 350,
    supplier: 'FilterHouse',
    status: 'Out of Stock',
    gst: '12%',
    activity: [
      { type: 'added', time: dayjs().subtract(20, 'day').toISOString(), by: 'Admin' },
      { type: 'out', time: dayjs().subtract(1, 'day').toISOString(), by: 'System' },
    ],
  },
  {
    id: 3,
    name: 'Air Filter',
    sku: 'AF-003',
    category: 'Filters',
    brand: 'Mahle',
    vehicles: ['Baleno'],
    quantity: 15,
    minStock: 5,
    unitPrice: 250,
    supplier: 'FilterHouse',
    status: 'In Stock',
    gst: '12%',
    activity: [
      { type: 'added', time: dayjs().subtract(30, 'day').toISOString(), by: 'Admin' },
      { type: 'updated', time: dayjs().subtract(5, 'day').toISOString(), by: 'Admin' },
    ],
  },
];

const metrics = [
  { label: 'Total Parts', value: 80, icon: <Inventory2 color="primary" /> },
  { label: 'Categories', value: 6, icon: <Category color="info" /> },
  { label: 'Brands', value: 8, icon: <Store color="secondary" /> },
  { label: 'Low Stock', value: 5, icon: <Warning color="warning" /> },
  { label: 'Out of Stock', value: 2, icon: <ErrorOutline color="error" /> },
  { label: 'Suppliers', value: 4, icon: <LocalShipping color="success" /> },
];

const quickActions = [
  { label: 'Add Part', icon: <Add />, action: 'add' },
  { label: 'Bulk Import', icon: <CloudUpload />, action: 'import' },
  { label: 'Export', icon: <FileCopy />, action: 'export' },
  { label: 'Add Supplier', icon: <Store />, action: 'addSupplier' },
  { label: 'Print', icon: <Print />, action: 'print' },
];

const partsColumns = [
  { field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={1}>
      <Tooltip title="View Details"><IconButton size="small"><Info fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Edit"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Delete"><IconButton size="small"><Delete fontSize="small" /></IconButton></Tooltip>
    </Stack>
  ) },
  { field: 'name', headerName: 'Part Name', flex: 1 },
  { field: 'sku', headerName: 'Part Number', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'brand', headerName: 'Brand', flex: 1 },
  { field: 'vehicles', headerName: 'Compatible Vehicles', flex: 1, valueGetter: (params) => params.row?.vehicles?.join(', ') || '' },
  { field: 'quantity', headerName: 'In Stock', flex: 1 },
  { field: 'minStock', headerName: 'Min Stock', flex: 1 },
  { field: 'unitPrice', headerName: 'Unit Price', flex: 1, valueGetter: (params) => `₹${params.row?.unitPrice ?? ''}` },
  { field: 'supplier', headerName: 'Supplier', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'In Stock' ? 'success' : params.value === 'Low Stock' ? 'warning' : 'error'} size="small" />
  ) },
];

const GarageParts = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [parts, setParts] = useState(mockParts);
  const [selectedPart, setSelectedPart] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: '', data: null });
  const [isEditing, setIsEditing] = useState(false);

  // Handlers
  const handleOpenDrawer = (part) => {
    setSelectedPart(part);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPart(null);
    setIsEditing(false);
  };
  const handleDialogOpen = (type, data = null) => setDialog({ open: true, type, data });
  const handleDialogClose = () => setDialog({ open: false, type: '', data: null });
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false); // Add save logic as needed
  const handleCancel = () => setIsEditing(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CommonHeader role="admin" />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          overflow: 'auto',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Section Heading */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Parts Overview</Typography>
        {/* Metrics */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {metrics.map((m, i) => (
            <Grid item xs={6} md={2} key={i}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 1, bgcolor: theme.palette.background.paper }}>
                {m.icon}
                <Typography variant="h6">{m.value}</Typography>
                <Typography variant="caption">{m.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* Quick Actions */}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          {quickActions.map((a, i) => (
            <Button key={i} variant="contained" startIcon={a.icon} onClick={() => handleDialogOpen(a.action)}>{a.label}</Button>
          ))}
        </Stack>
        {/* Live Parts Alerts */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Live Parts Alerts</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, px: 2 }}>
            {/* Low Stock */}
            {parts.filter(p => p.status === 'Low Stock').map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.warning.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Warning color="warning" />
                    <Typography variant="subtitle2">Low Stock</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b> ({item.sku})</Typography>
                  <Typography variant="body2">Qty: {item.quantity} | Min: {item.minStock}</Typography>
                  <Typography variant="body2">Supplier: {item.supplier}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* Out of Stock */}
            {parts.filter(p => p.status === 'Out of Stock').map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.error.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ErrorOutline color="error" />
                    <Typography variant="subtitle2">Out of Stock</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b> ({item.sku})</Typography>
                  <Typography variant="body2">Supplier: {item.supplier}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* Recently Added */}
            {parts.filter(p => dayjs().diff(dayjs(p.activity.find(a => a.type === 'added')?.time), 'day') <= 7).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.success.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Add color="success" />
                    <Typography variant="subtitle2">Recently Added</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b> ({item.sku})</Typography>
                  <Typography variant="body2">Added: {dayjs(item.activity.find(a => a.type === 'added')?.time).format('DD MMM')}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* Recently Updated */}
            {parts.filter(p => dayjs().diff(dayjs(p.activity.find(a => a.type === 'updated')?.time), 'day') <= 7).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.info.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Edit color="info" />
                    <Typography variant="subtitle2">Recently Updated</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b> ({item.sku})</Typography>
                  <Typography variant="body2">Updated: {dayjs(item.activity.find(a => a.type === 'updated')?.time).format('DD MMM')}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
        {/* Analytics & Charts (mock) */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Parts by Category</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={[{ name: 'Brakes', value: 30 }, { name: 'Filters', value: 40 }, { name: 'Fluids', value: 10 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                    <Cell fill={theme.palette.primary.main} />
                    <Cell fill={theme.palette.info.main} />
                    <Cell fill={theme.palette.success.main} />
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Parts by Brand</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={[{ name: 'Bosch', value: 30 }, { name: 'Mahle', value: 40 }, { name: 'Castrol', value: 10 }]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill={theme.palette.secondary.main} />
                  <RechartsTooltip />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Parts Table */}
        <Paper sx={{ height: 400, mb: 2, bgcolor: theme.palette.background.paper }}>
          <DataGrid
            rows={parts}
            columns={partsColumns}
            components={{ Toolbar: CustomTableToolbar }}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={(params) => handleOpenDrawer(params.row)}
          />
        </Paper>
        {/* Recent Activity */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Recent Activity</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper, p: 2 }}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            {parts.flatMap(p => p.activity.map((a, idx) => ({ ...a, part: p.name, sku: p.sku, key: `${p.id}-${idx}` }))).sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf()).slice(0, 6).map((a) => (
              <Box key={a.key} sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {/* Timeline Dot */}
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%',
                  bgcolor: a.type === 'added' ? theme.palette.primary.main : a.type === 'updated' ? theme.palette.info.main : a.type === 'out' ? theme.palette.error.main : theme.palette.success.main,
                  mt: 0.5, mr: 2, flexShrink: 0,
                  boxShadow: 1,
                }} />
                {/* Content Card */}
                <Paper elevation={0} sx={{ flex: 1, bgcolor: theme.palette.background.default, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: a.type === 'added' ? theme.palette.primary.light : a.type === 'updated' ? theme.palette.info.light : a.type === 'out' ? theme.palette.error.light : theme.palette.success.light, width: 36, height: 36 }}>
                      {a.type === 'added' ? <Add /> : a.type === 'updated' ? <Edit /> : a.type === 'out' ? <ErrorOutline /> : <CheckCircle />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.part} <span style={{ color: theme.palette.text.secondary, fontWeight: 400 }}>- {a.sku}</span></Typography>
                      <Typography variant="body2" color="text.secondary">
                        {a.type === 'added' ? 'Part Added' : a.type === 'updated' ? 'Part Updated' : a.type === 'out' ? 'Out of Stock' : 'In Stock'}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 90, textAlign: 'right' }}>
                    {dayjs(a.time).format('DD MMM, HH:mm')}<br/>by {a.by}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Paper>
        {/* Drawer: Part Details */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{ sx: { width: isMdUp ? 400 : '90vw', p: 0, bgcolor: theme.palette.background.paper } }}>
          <Box sx={{ p: 2, mt: 12, mb: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedPart && (
              <>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Part Details</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>General Info</Typography>
                  <Typography variant="body2"><Category fontSize="small" /> {selectedPart.name} ({selectedPart.sku})</Typography>
                  <Typography variant="body2"><Store fontSize="small" /> Brand: {selectedPart.brand}</Typography>
                  <Typography variant="body2"><Group fontSize="small" /> Category: {selectedPart.category}</Typography>
                  <Typography variant="body2"><DirectionsCar fontSize="small" /> Vehicles: {selectedPart.vehicles.join(', ')}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Stock Info</Typography>
                  <Typography variant="body2"><Inventory2 fontSize="small" /> In Stock: {selectedPart.quantity}</Typography>
                  <Typography variant="body2"><Warning fontSize="small" /> Min Stock: {selectedPart.minStock}</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> Unit Price: ₹{selectedPart.unitPrice}</Typography>
                  <Typography variant="body2"><CheckCircle fontSize="small" /> Status: {selectedPart.status}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Supplier Info</Typography>
                  <Typography variant="body2"><Store fontSize="small" /> Supplier: {selectedPart.supplier}</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> GST: {selectedPart.gst}</Typography>
                </Paper>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
                  {!isEditing && (
                    <Button variant="contained" startIcon={<Edit />} onClick={handleEdit}>Edit</Button>
                  )}
                  {isEditing && (
                    <>
                      <Button variant="contained" startIcon={<Done />} onClick={handleSave}>Save</Button>
                      <Button variant="contained" startIcon={<Cancel />} onClick={handleCancel}>Cancel</Button>
                    </>
                  )}
                </Stack>
              </>
            )}
          </Box>
        </Drawer>
        {/* Dialogs (Add/Edit Part, Add/Edit Supplier, Import, Print) */}
        <Dialog open={dialog.open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{dialog.type === 'add' ? 'Add Part' : dialog.type === 'addSupplier' ? 'Add Supplier' : dialog.type === 'import' ? 'Bulk Import' : dialog.type === 'print' ? 'Print Preview' : 'Edit Part'}</DialogTitle>
          <DialogContent>
            {/* Mock forms/fields for each dialog type */}
            {dialog.type === 'add' && (
              <Stack spacing={2}>
                <TextField label="Part Name" fullWidth />
                <TextField label="Part Number" fullWidth />
                <TextField label="Brand" fullWidth />
                <FormControl fullWidth><InputLabel>Category</InputLabel><Select><MenuItem>Brakes</MenuItem><MenuItem>Filters</MenuItem><MenuItem>Fluids</MenuItem></Select></FormControl>
                <TextField label="Compatible Vehicles" fullWidth />
                <TextField label="Quantity" type="number" fullWidth />
                <TextField label="Min Stock" type="number" fullWidth />
                <TextField label="Unit Price" type="number" fullWidth />
                <TextField label="GST" fullWidth />
                <Button variant="contained">Add</Button>
              </Stack>
            )}
            {dialog.type === 'addSupplier' && (
              <Stack spacing={2}>
                <TextField label="Supplier Name" fullWidth />
                <TextField label="GSTIN" fullWidth />
                <TextField label="Phone" fullWidth />
                <Button variant="contained">Add Supplier</Button>
              </Stack>
            )}
            {dialog.type === 'import' && (
              <Button variant="contained" startIcon={<CloudUpload />}>Upload Excel</Button>
            )}
            {dialog.type === 'print' && (
              <Typography>Print Preview (mock)</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageParts; 