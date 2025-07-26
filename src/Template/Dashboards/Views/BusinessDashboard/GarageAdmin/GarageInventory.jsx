import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, IconButton, Chip, Avatar, Stack, Divider, Tooltip, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Card, CardContent, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";
import { useTheme } from '@mui/material/styles';
import { Edit, Delete, Info, Add, CloudUpload, FileCopy, Print, Inventory2, Warning, ErrorOutline, Done, Cancel, LocalShipping, Category, AttachMoney, TrendingDown, TrendingUp, AccessTime, Group, Store, Event, CheckCircle } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';

const mockInventory = [
  {
    id: 1,
    name: 'Engine Oil',
    sku: 'EO-001',
    category: 'Fluids',
    brand: 'Castrol',
    quantity: 12,
    minStock: 10,
    unitPrice: 350,
    totalValue: 4200,
    expiry: dayjs().add(6, 'month').toISOString(),
    supplier: 'AutoSupplies',
    status: 'In Stock',
    gst: '18%',
    activity: [
      { type: 'added', time: dayjs().subtract(10, 'day').toISOString(), by: 'Admin' },
      { type: 'adjusted', time: dayjs().subtract(2, 'day').toISOString(), by: 'Admin', change: -2 },
    ],
  },
  {
    id: 2,
    name: 'Brake Pads',
    sku: 'BP-002',
    category: 'Brakes',
    brand: 'Bosch',
    quantity: 3,
    minStock: 5,
    unitPrice: 800,
    totalValue: 2400,
    expiry: dayjs().add(2, 'month').toISOString(),
    supplier: 'BrakeMart',
    status: 'Low Stock',
    gst: '18%',
    activity: [
      { type: 'added', time: dayjs().subtract(20, 'day').toISOString(), by: 'Admin' },
      { type: 'low', time: dayjs().subtract(1, 'day').toISOString(), by: 'System' },
    ],
  },
  {
    id: 3,
    name: 'Air Filter',
    sku: 'AF-003',
    category: 'Filters',
    brand: 'Mahle',
    quantity: 0,
    minStock: 3,
    unitPrice: 250,
    totalValue: 0,
    expiry: dayjs().add(1, 'year').toISOString(),
    supplier: 'FilterHouse',
    status: 'Out of Stock',
    gst: '12%',
    activity: [
      { type: 'added', time: dayjs().subtract(30, 'day').toISOString(), by: 'Admin' },
      { type: 'out', time: dayjs().subtract(2, 'day').toISOString(), by: 'System' },
    ],
  },
];

const metrics = [
  { label: 'Total Parts', value: 120, icon: <Inventory2 color="primary" /> },
  { label: 'Low Stock', value: 8, icon: <Warning color="warning" /> },
  { label: 'Out of Stock', value: 2, icon: <ErrorOutline color="error" /> },
  { label: 'Total Value', value: '₹1,20,000', icon: <AttachMoney color="success" /> },
  { label: 'Expiring Soon', value: 3, icon: <AccessTime color="info" /> },
  { label: 'Suppliers', value: 5, icon: <LocalShipping color="secondary" /> },
];

const quickActions = [
  { label: 'Add Item', icon: <Add />, action: 'add' },
  { label: 'Bulk Import', icon: <CloudUpload />, action: 'import' },
  { label: 'Export', icon: <FileCopy />, action: 'export' },
  { label: 'Add Supplier', icon: <Store />, action: 'addSupplier' },
  { label: 'Stock Adjustment', icon: <TrendingDown />, action: 'adjust' },
  { label: 'Print', icon: <Print />, action: 'print' },
];

const inventoryColumns = [
  { field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
    <Stack direction="row" spacing={1}>
      <Tooltip title="View Details"><IconButton size="small"><Info fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Edit"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Delete"><IconButton size="small"><Delete fontSize="small" /></IconButton></Tooltip>
    </Stack>
  ) },
  { field: 'name', headerName: 'Item Name', flex: 1 },
  { field: 'sku', headerName: 'SKU', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'brand', headerName: 'Brand', flex: 1 },
  { field: 'quantity', headerName: 'In Stock', flex: 1 },
  { field: 'minStock', headerName: 'Min Stock', flex: 1 },
  { field: 'unitPrice', headerName: 'Unit Price', flex: 1, valueGetter: (params) => `₹${params.row?.unitPrice ?? ''}` },
  { field: 'totalValue', headerName: 'Total Value', flex: 1, valueGetter: (params) => `₹${params.row?.totalValue ?? ''}` },
  { field: 'expiry', headerName: 'Expiry', flex: 1, valueGetter: (params) => params.row?.expiry ? dayjs(params.row.expiry).format('DD MMM YYYY') : '' },
  { field: 'supplier', headerName: 'Supplier', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'In Stock' ? 'success' : params.value === 'Low Stock' ? 'warning' : 'error'} size="small" />
  ) },
];

const GarageInventory = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [inventory, setInventory] = useState(mockInventory);
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: '', data: null });
  const [isEditing, setIsEditing] = useState(false);

  // Handlers
  const handleOpenDrawer = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
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
        {/* Metrics */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Inventory Overview</Typography>
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
        {/* Live Inventory Alerts */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Live Inventory Alerts</Typography>
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, px: 2 }}>
            {/* Low Stock */}
            {inventory.filter(i => i.status === 'Low Stock').map((item) => (
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
            {inventory.filter(i => i.status === 'Out of Stock').map((item) => (
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
            {/* Expiring Soon */}
            {inventory.filter(i => dayjs(i.expiry).diff(dayjs(), 'month') <= 2 && i.quantity > 0).map((item) => (
              <Card key={item.id} sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.info.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTime color="info" />
                    <Typography variant="subtitle2">Expiring Soon</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><b>{item.name}</b> ({item.sku})</Typography>
                  <Typography variant="body2">Expiry: {dayjs(item.expiry).format('DD MMM YYYY')}</Typography>
                </CardContent>
              </Card>
            ))}
            {/* Recent Adjustments (mock) */}
            <Card sx={{ minWidth: 260, maxWidth: 280, m: 1, boxShadow: 3, borderLeft: `6px solid ${theme.palette.success.main}` }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUp color="success" />
                  <Typography variant="subtitle2">Recent Adjustment</Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2"><b>Engine Oil</b> (EO-001)</Typography>
                <Typography variant="body2">+5 added by Admin</Typography>
                <Typography variant="body2">{dayjs().subtract(1, 'day').format('DD MMM, HH:mm')}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Paper>
        {/* Analytics & Charts (mock) */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Stock by Category</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={[{ name: 'Fluids', value: 40 }, { name: 'Brakes', value: 30 }, { name: 'Filters', value: 20 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                    <Cell fill={theme.palette.primary.main} />
                    <Cell fill={theme.palette.warning.main} />
                    <Cell fill={theme.palette.success.main} />
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="subtitle2">Stock Value Trend</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[{ name: 'Jan', value: 100000 }, { name: 'Feb', value: 120000 }, { name: 'Mar', value: 110000 }]}> 
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke={theme.palette.info.main} />
                  <RechartsTooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Inventory Table */}
        <Paper sx={{ height: 400, mb: 2, bgcolor: theme.palette.background.paper }}>
          <DataGrid
            rows={inventory}
            columns={inventoryColumns}
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
            {inventory.flatMap(i => i.activity.map((a, idx) => ({ ...a, item: i.name, sku: i.sku, key: `${i.id}-${idx}` }))).sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf()).slice(0, 6).map((a) => (
              <Box key={a.key} sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {/* Timeline Dot */}
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%',
                  bgcolor: a.type === 'added' ? theme.palette.primary.main : a.type === 'adjusted' ? theme.palette.success.main : a.type === 'low' ? theme.palette.warning.main : theme.palette.error.main,
                  mt: 0.5, mr: 2, flexShrink: 0,
                  boxShadow: 1,
                }} />
                {/* Content Card */}
                <Paper elevation={0} sx={{ flex: 1, bgcolor: theme.palette.background.default, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: a.type === 'added' ? theme.palette.primary.light : a.type === 'adjusted' ? theme.palette.success.light : a.type === 'low' ? theme.palette.warning.light : theme.palette.error.light, width: 36, height: 36 }}>
                      {a.type === 'added' ? <Add /> : a.type === 'adjusted' ? <TrendingUp /> : a.type === 'low' ? <Warning /> : <ErrorOutline />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.item} <span style={{ color: theme.palette.text.secondary, fontWeight: 400 }}>- {a.sku}</span></Typography>
                      <Typography variant="body2" color="text.secondary">
                        {a.type === 'added' ? 'Item Added' : a.type === 'adjusted' ? `Stock Adjusted (${a.change > 0 ? '+' : ''}${a.change})` : a.type === 'low' ? 'Low Stock' : 'Out of Stock'}
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
        {/* Drawer: Inventory Item Details */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{ sx: { width: isMdUp ? 400 : '90vw', p: 0, bgcolor: theme.palette.background.paper } }}>
          <Box sx={{ p: 2, mt: 12, mb: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedItem && (
              <>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Item Details</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>General Info</Typography>
                  <Typography variant="body2"><Category fontSize="small" /> {selectedItem.name} ({selectedItem.sku})</Typography>
                  <Typography variant="body2"><Store fontSize="small" /> Brand: {selectedItem.brand}</Typography>
                  <Typography variant="body2"><Group fontSize="small" /> Category: {selectedItem.category}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Stock Info</Typography>
                  <Typography variant="body2"><Inventory2 fontSize="small" /> In Stock: {selectedItem.quantity}</Typography>
                  <Typography variant="body2"><Warning fontSize="small" /> Min Stock: {selectedItem.minStock}</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> Unit Price: ₹{selectedItem.unitPrice}</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> Total Value: ₹{selectedItem.totalValue}</Typography>
                  <Typography variant="body2"><AccessTime fontSize="small" /> Expiry: {dayjs(selectedItem.expiry).format('DD MMM YYYY')}</Typography>
                  <Typography variant="body2"><CheckCircle fontSize="small" /> Status: {selectedItem.status}</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.default, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Supplier Info</Typography>
                  <Typography variant="body2"><Store fontSize="small" /> Supplier: {selectedItem.supplier}</Typography>
                  <Typography variant="body2"><AttachMoney fontSize="small" /> GST: {selectedItem.gst}</Typography>
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
        {/* Dialogs (Add/Edit Item, Add/Edit Supplier, Import, Adjust, Print) */}
        <Dialog open={dialog.open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{dialog.type === 'add' ? 'Add Item' : dialog.type === 'addSupplier' ? 'Add Supplier' : dialog.type === 'import' ? 'Bulk Import' : dialog.type === 'adjust' ? 'Stock Adjustment' : dialog.type === 'print' ? 'Print Preview' : 'Edit Item'}</DialogTitle>
          <DialogContent>
            {/* Mock forms/fields for each dialog type */}
            {dialog.type === 'add' && (
              <Stack spacing={2}>
                <TextField label="Item Name" fullWidth />
                <TextField label="SKU" fullWidth />
                <TextField label="Brand" fullWidth />
                <FormControl fullWidth><InputLabel>Category</InputLabel><Select><MenuItem>Fluids</MenuItem><MenuItem>Brakes</MenuItem><MenuItem>Filters</MenuItem></Select></FormControl>
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
            {dialog.type === 'adjust' && (
              <Stack spacing={2}>
                <TextField label="Item" fullWidth />
                <TextField label="Adjustment Qty" type="number" fullWidth />
                <Button variant="contained">Adjust</Button>
              </Stack>
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

export default GarageInventory; 