import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Chip, IconButton, Snackbar, Avatar, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CategoryIcon from '@mui/icons-material/Category';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useTheme } from '@mui/material/styles';

const inventoryTypes = [
  { label: 'All', value: 'all', icon: <Inventory2Icon /> },
  { label: 'Raw Materials', value: 'raw', icon: <RestaurantIcon /> },
  { label: 'Beverages', value: 'beverages', icon: <LocalDrinkIcon /> },
  { label: 'Ready-to-Serve', value: 'ready', icon: <CheckCircleIcon /> },
  { label: 'Cleaning Supplies', value: 'cleaning', icon: <CleaningServicesIcon /> },
  { label: 'Other', value: 'other', icon: <CategoryIcon /> },
];

const mockCategories = ['Vegetables', 'Dairy', 'Grains', 'Spices', 'Soft Drinks', 'Snacks', 'Sanitizers', 'Utensils', 'Other'];

const mockInventory = [
  { id: 1, name: 'Rice', type: 'raw', category: 'Grains', quantity: 120, unit: 'kg', status: 'ok', reorder: 50, value: 3600 },
  { id: 2, name: 'Milk', type: 'raw', category: 'Dairy', quantity: 20, unit: 'liters', status: 'low', reorder: 25, value: 800 },
  { id: 3, name: 'Paneer', type: 'raw', category: 'Dairy', quantity: 5, unit: 'kg', status: 'out', reorder: 10, value: 600 },
  { id: 4, name: 'Coke', type: 'beverages', category: 'Soft Drinks', quantity: 40, unit: 'bottles', status: 'ok', reorder: 20, value: 1200 },
  { id: 5, name: 'Chips', type: 'ready', category: 'Snacks', quantity: 10, unit: 'packets', status: 'low', reorder: 15, value: 200 },
  { id: 6, name: 'Sanitizer', type: 'cleaning', category: 'Sanitizers', quantity: 2, unit: 'liters', status: 'out', reorder: 5, value: 100 },
  { id: 7, name: 'Plates', type: 'other', category: 'Utensils', quantity: 100, unit: 'pcs', status: 'ok', reorder: 50, value: 500 },
];

const summaryCounters = [
  { label: 'Total Items', icon: <Inventory2Icon />, color: 'primary.main' },
  { label: 'Low Stock', icon: <WarningIcon />, color: 'warning.main' },
  { label: 'Out of Stock', icon: <DeleteIcon />, color: 'error.main' },
  { label: 'Categories', icon: <CategoryIcon />, color: 'secondary.main' },
  { label: 'Inventory Value', icon: <MonetizationOnIcon />, color: 'success.main' },
];

export default function FoodCateringInventory() {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState('all');
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [infoDialogData, setInfoDialogData] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [inventory, setInventory] = useState(mockInventory);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', type: 'raw', category: '', quantity: '', unit: '', reorder: '', value: '' });

  // Filter inventory by type
  const filteredInventory = selectedType === 'all' ? inventory : inventory.filter(i => i.type === selectedType);

  // Analytics
  const total = inventory.length;
  const low = inventory.filter(i => i.status === 'low').length;
  const out = inventory.filter(i => i.status === 'out').length;
  const categories = new Set(inventory.map(i => i.category)).size;
  const value = inventory.reduce((sum, i) => sum + (Number(i.value) || 0), 0);
  const summaryValues = [total, low, out, categories, `₹${value}`];

  // Info dialog
  const handleInfoOpen = (item) => { setInfoDialogData(item); setInfoDialogOpen(true); };
  const handleInfoClose = () => setInfoDialogOpen(false);

  // Edit dialog
  const handleEditOpen = (item) => { setEditItem({ ...item }); setEditDialogOpen(true); };
  const handleEditClose = () => setEditDialogOpen(false);
  const handleEditSave = () => {
    setInventory(prev => prev.map(i => i.id === editItem.id ? editItem : i));
    setEditDialogOpen(false);
    setSnackbar({ open: true, message: 'Item updated!', severity: 'success' });
  };

  // Add dialog
  const handleAddOpen = () => { setNewItem({ name: '', type: 'raw', category: '', quantity: '', unit: '', reorder: '', value: '' }); setAddDialogOpen(true); };
  const handleAddClose = () => setAddDialogOpen(false);
  const handleAddSave = () => {
    setInventory(prev => [...prev, { ...newItem, id: Date.now(), status: Number(newItem.quantity) === 0 ? 'out' : Number(newItem.quantity) <= Number(newItem.reorder) ? 'low' : 'ok' }]);
    setAddDialogOpen(false);
    setSnackbar({ open: true, message: 'Item added!', severity: 'success' });
  };

  // Delete action
  const handleDelete = (item) => {
    setInventory(prev => prev.filter(i => i.id !== item.id));
    setSnackbar({ open: true, message: 'Item deleted!', severity: 'info' });
  };

  // Restock action
  const handleRestock = (item) => {
    setInventory(prev => prev.map(i => i.id === item.id ? { ...i, quantity: Number(i.quantity) + 10, status: 'ok' } : i));
    setSnackbar({ open: true, message: 'Item restocked!', severity: 'success' });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CommonHeader role="admin" />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, pt: 10, mt: { xs: 8, sm: 10 }, overflow: 'auto', height: '100vh', backgroundColor: theme.palette.background.default }}>
        {/* Add Item Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ fontWeight: 700, borderRadius: 3, boxShadow: theme.shadows[2] }}>Add Inventory Item</Button>
        </Box>
        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {summaryCounters.map((counter, idx) => (
            <Grid item xs={12} sm={6} md={2} key={counter.label}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, borderRadius: 5, boxShadow: theme.shadows[3], bgcolor: theme.palette.background.paper, backdropFilter: 'blur(8px)', border: `2px solid ${theme.palette.divider}` }}>
                <Avatar sx={{ bgcolor: counter.color, width: 56, height: 56, mb: 1 }}>{counter.icon}</Avatar>
                <Typography variant="h4" fontWeight={800} color="primary" sx={{ mb: 0.5 }}>{summaryValues[idx]}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>{counter.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Inventory Type Tabs */}
        <Paper sx={{ mb: 3, bgcolor: theme.palette.background.paper, p: 2, borderRadius: 2 }}>
          <Tabs
            value={selectedType}
            onChange={(_, v) => setSelectedType(v)}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            sx={{ minWidth: 0 }}
          >
            {inventoryTypes.map((type) => (
              <Tab
                key={type.value}
                value={type.value}
                label={type.label}
                icon={type.icon}
                iconPosition="start"
                sx={{ minWidth: 120, fontWeight: 600 }}
              />
            ))}
          </Tabs>
        </Paper>
        {/* Inventory Table */}
        <Paper sx={{
          p: 2,
          borderRadius: 4,
          boxShadow: theme.shadows[2],
          mb: 4,
          overflowX: 'auto',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e293b 60%, #232946 100%)'
            : 'linear-gradient(135deg, #f0f4fa 60%, #e3f2fd 100%)',
          backdropFilter: 'blur(6px)',
        }}>
          <Box minWidth={1100}>
            <Grid container sx={{ borderBottom: '2px solid', borderColor: 'divider', p: 1 }}>
              <Grid item xs={2}><Typography fontWeight={700}>Actions</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Item</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>Type</Typography></Grid>
              <Grid item xs={2}><Typography fontWeight={700}>Category</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>Qty</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>Unit</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>Status</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>Reorder</Typography></Grid>
              <Grid item xs={1}><Typography fontWeight={700}>Value</Typography></Grid>
            </Grid>
            {filteredInventory.map((item) => (
              <Grid container key={item.id} alignItems="center" sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}>
                <Grid item xs={2}>
                  <Box display="flex" gap={1}>
                    <IconButton color="info" onClick={() => handleInfoOpen(item)}><InfoIcon /></IconButton>
                    <IconButton color="primary" onClick={() => handleEditOpen(item)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item)}><DeleteIcon /></IconButton>
                    <IconButton color="success" onClick={() => handleRestock(item)}><AddIcon /></IconButton>
                  </Box>
                </Grid>
                <Grid item xs={2}><Typography fontWeight={700}>{item.name}</Typography></Grid>
                <Grid item xs={1}><Chip label={inventoryTypes.find(t => t.value === item.type)?.label || item.type} icon={inventoryTypes.find(t => t.value === item.type)?.icon} color="primary" /></Grid>
                <Grid item xs={2}><Chip label={item.category} icon={<CategoryIcon />} color="secondary" /></Grid>
                <Grid item xs={1}><Typography>{item.quantity}</Typography></Grid>
                <Grid item xs={1}><Typography>{item.unit}</Typography></Grid>
                <Grid item xs={1}>
                  <Chip label={item.status === 'ok' ? 'OK' : item.status === 'low' ? 'Low' : 'Out'} color={item.status === 'ok' ? 'success' : item.status === 'low' ? 'warning' : 'error'} icon={item.status === 'ok' ? <CheckCircleIcon /> : item.status === 'low' ? <WarningIcon /> : <DeleteIcon />} />
                </Grid>
                <Grid item xs={1}><Typography>{item.reorder}</Typography></Grid>
                <Grid item xs={1}><Typography>₹{item.value}</Typography></Grid>
              </Grid>
            ))}
          </Box>
        </Paper>
        {/* Info Dialog */}
        <Dialog open={infoDialogOpen} onClose={handleInfoClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper, backdropFilter: 'blur(8px)' } }}>
          <DialogTitle>Inventory Item Details</DialogTitle>
          <DialogContent>
            {infoDialogData && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="primary" mb={2}>{infoDialogData.name}</Typography>
                <Typography variant="body2" color="text.secondary">Type: <b>{inventoryTypes.find(t => t.value === infoDialogData.type)?.label || infoDialogData.type}</b></Typography>
                <Typography variant="body2" color="text.secondary">Category: <b>{infoDialogData.category}</b></Typography>
                <Typography variant="body2" color="text.secondary">Quantity: <b>{infoDialogData.quantity} {infoDialogData.unit}</b></Typography>
                <Typography variant="body2" color="text.secondary">Status: <Chip label={infoDialogData.status === 'ok' ? 'OK' : infoDialogData.status === 'low' ? 'Low' : 'Out'} color={infoDialogData.status === 'ok' ? 'success' : infoDialogData.status === 'low' ? 'warning' : 'error'} size="small" /></Typography>
                <Typography variant="body2" color="text.secondary">Reorder Level: <b>{infoDialogData.reorder}</b></Typography>
                <Typography variant="body2" color="text.secondary">Value: <b>₹{infoDialogData.value}</b></Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInfoClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper, backdropFilter: 'blur(8px)' } }}>
          <DialogTitle>Edit Inventory Item</DialogTitle>
          <DialogContent>
            {editItem && (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField label="Name" value={editItem.name} onChange={e => setEditItem(i => ({ ...i, name: e.target.value }))} fullWidth />
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select value={editItem.type} label="Type" onChange={e => setEditItem(i => ({ ...i, type: e.target.value }))}>
                    {inventoryTypes.filter(t => t.value !== 'all').map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={editItem.category} label="Category" onChange={e => setEditItem(i => ({ ...i, category: e.target.value }))}>
                    {mockCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField label="Quantity" type="number" value={editItem.quantity} onChange={e => setEditItem(i => ({ ...i, quantity: e.target.value }))} fullWidth />
                <TextField label="Unit" value={editItem.unit} onChange={e => setEditItem(i => ({ ...i, unit: e.target.value }))} fullWidth />
                <TextField label="Reorder Level" type="number" value={editItem.reorder} onChange={e => setEditItem(i => ({ ...i, reorder: e.target.value }))} fullWidth />
                <TextField label="Value (₹)" type="number" value={editItem.value} onChange={e => setEditItem(i => ({ ...i, value: e.target.value }))} fullWidth />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="inherit">Cancel</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        {/* Add Dialog */}
        <Dialog open={addDialogOpen} onClose={handleAddClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper, backdropFilter: 'blur(8px)' } }}>
          <DialogTitle>Add Inventory Item</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Name" value={newItem.name} onChange={e => setNewItem(i => ({ ...i, name: e.target.value }))} fullWidth />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={newItem.type} label="Type" onChange={e => setNewItem(i => ({ ...i, type: e.target.value }))}>
                  {inventoryTypes.filter(t => t.value !== 'all').map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={newItem.category} label="Category" onChange={e => setNewItem(i => ({ ...i, category: e.target.value }))}>
                  {mockCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Quantity" type="number" value={newItem.quantity} onChange={e => setNewItem(i => ({ ...i, quantity: e.target.value }))} fullWidth />
              <TextField label="Unit" value={newItem.unit} onChange={e => setNewItem(i => ({ ...i, unit: e.target.value }))} fullWidth />
              <TextField label="Reorder Level" type="number" value={newItem.reorder} onChange={e => setNewItem(i => ({ ...i, reorder: e.target.value }))} fullWidth />
              <TextField label="Value (₹)" type="number" value={newItem.value} onChange={e => setNewItem(i => ({ ...i, value: e.target.value }))} fullWidth />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClose} color="inherit">Cancel</Button>
            <Button onClick={handleAddSave} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} message={snackbar.message} />
        {/* At the end of the main Box, after the last Paper (table), add a spacer Box */}
        <Box sx={{ mb: { xs: 8, sm: 10, md: 12 } }} />
      </Box>
    </Box>
  );
} 