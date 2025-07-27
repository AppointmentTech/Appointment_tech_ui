import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Chip, IconButton, Snackbar, Avatar } from '@mui/material';
import CommonHeader from 'Template/Dashboards/Components/CommonHeader.jsx';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DownloadIcon from '@mui/icons-material/Download';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { useTheme } from '@mui/material/styles';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
const weekOptions = ['This Week', 'Next Week'];
const hostels = ['Hostel A', 'Hostel B', 'Hostel C'];

const createInitialMenu = () => weekDays.reduce((acc, day) => {
  acc[day] = mealTypes.reduce((macc, meal) => { macc[meal] = []; return macc; }, {});
  return acc;
}, {});

const initialMenus = hostels.reduce((acc, hostel) => {
  acc[hostel] = { 'This Week': createInitialMenu(), 'Next Week': createInitialMenu() };
  return acc;
}, {});

const summaryCounters = [
  { label: 'Total Orders', icon: <RestaurantIcon />, color: 'primary.main' },
  { label: 'Hostels Served', icon: <LocalDiningIcon />, color: 'secondary.main' },
  { label: 'Active Dishes', icon: <LunchDiningIcon />, color: 'success.main' },
  { label: 'Inactive Dishes', icon: <DinnerDiningIcon />, color: 'error.main' },
];

export default function PersonalCateringManagement() {
  const theme = useTheme();
  const [selectedHostel, setSelectedHostel] = useState(hostels[0]);
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]);
  const [menus, setMenus] = useState(initialMenus);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCell, setEditCell] = useState({ day: '', meal: '', item: null });
  const [menuForm, setMenuForm] = useState({ name: '', description: '', status: true });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [addWeekDialogOpen, setAddWeekDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [infoDialogData, setInfoDialogData] = useState({ day: '', meal: '', items: [] });
  const [batchMenu, setBatchMenu] = useState(createInitialMenu());
  const [batchTab, setBatchTab] = useState(weekDays[0]);

  // Derived menu for current hostel/week
  const weeklyMenu = menus[selectedHostel][selectedWeek];

  // Analytics
  const allItems = Object.values(weeklyMenu).flatMap(day => mealTypes.flatMap(meal => day[meal]));
  const totalOrders = allItems.length;
  const hostelsServed = hostels.length;
  const activeItems = allItems.filter(i => i.status).length;
  const inactiveItems = totalOrders - activeItems;
  const summaryValues = [totalOrders, hostelsServed, activeItems, inactiveItems];

  // Dialog handlers
  const handleAdd = (day, meal) => {
    setEditCell({ day, meal, item: null });
    setMenuForm({ name: '', description: '', status: true });
    setDialogOpen(true);
  };
  const handleEdit = (day, meal, item) => {
    setEditCell({ day, meal, item });
    setMenuForm(item);
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogSave = () => {
    setMenus(prev => {
      const updated = { ...prev };
      const items = [...updated[selectedHostel][selectedWeek][editCell.day][editCell.meal]];
      if (editCell.item) {
        const idx = items.findIndex(i => i === editCell.item);
        items[idx] = { ...menuForm };
      } else {
        items.push({ ...menuForm });
      }
      updated[selectedHostel][selectedWeek][editCell.day][editCell.meal] = items;
      return updated;
    });
    setDialogOpen(false);
    setSnackbar({ open: true, message: 'Menu item saved!', severity: 'success' });
  };
  const handleDelete = (day, meal, item) => {
    setMenus(prev => {
      const updated = { ...prev };
      updated[selectedHostel][selectedWeek][day][meal] = updated[selectedHostel][selectedWeek][day][meal].filter(i => i !== item);
      return updated;
    });
    setSnackbar({ open: true, message: 'Menu item deleted!', severity: 'info' });
  };

  // Bulk actions
  const handleCopyWeek = () => setSnackbar({ open: true, message: 'Copied previous week!', severity: 'info' });
  const handleClearWeek = () => {
    setMenus(prev => {
      const updated = { ...prev };
      updated[selectedHostel][selectedWeek] = createInitialMenu();
      return updated;
    });
    setSnackbar({ open: true, message: 'Cleared week!', severity: 'warning' });
  };
  const handleExportWeek = () => setSnackbar({ open: true, message: 'Exported week!', severity: 'success' });

  // Info dialog
  const handleInfoOpen = (day, meal, items) => {
    setInfoDialogData({ day, meal, items });
    setInfoDialogOpen(true);
  };
  const handleInfoClose = () => setInfoDialogOpen(false);

  // Batch add dialog
  const handleAddWeekOpen = () => setAddWeekDialogOpen(true);
  const handleAddWeekClose = () => setAddWeekDialogOpen(false);
  const handleBatchMenuChange = (day, meal, idx, value) => {
    setBatchMenu(prev => {
      const updated = { ...prev };
      updated[day][meal][idx] = value;
      return updated;
    });
  };
  const handleBatchMenuAddRow = (day, meal) => {
    setBatchMenu(prev => {
      const updated = { ...prev };
      updated[day][meal].push('');
      return updated;
    });
  };
  const handleBatchMenuRemoveRow = (day, meal, idx) => {
    setBatchMenu(prev => {
      const updated = { ...prev };
      updated[day][meal] = updated[day][meal].filter((_, i) => i !== idx);
      return updated;
    });
  };
  const handleBatchMenuSave = () => {
    setMenus(prev => {
      const updated = { ...prev };
      weekDays.forEach(day => {
        mealTypes.forEach(meal => {
          updated[selectedHostel][selectedWeek][day][meal] = batchMenu[day][meal].filter(name => name.trim()).map(name => ({ name, description: '', status: true }));
        });
      });
      return updated;
    });
    setAddWeekDialogOpen(false);
    setSnackbar({ open: true, message: 'Weekly menu added!', severity: 'success' });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CommonHeader role="admin" />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, pt: 10, mt: { xs: 8, sm: 10 }, overflow: 'auto', height: '100vh', backgroundColor: theme.palette.background.default }}>
        {/* Hostel Selector */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Hostel</InputLabel>
            <Select value={selectedHostel} label="Hostel" onChange={e => setSelectedHostel(e.target.value)}>
              {hostels.map(h => <MenuItem key={h} value={h}>{h}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAddWeekOpen} sx={{ fontWeight: 700, borderRadius: 3, boxShadow: theme.shadows[2] }}>Add Weekly Menu</Button>
        </Box>
        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {summaryCounters.map((counter, idx) => (
            <Grid item xs={12} sm={6} md={3} key={counter.label}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, borderRadius: 5, boxShadow: theme.shadows[3], bgcolor: theme.palette.background.paper }}>
                <Avatar sx={{ bgcolor: counter.color, width: 56, height: 56, mb: 1 }}>{counter.icon}</Avatar>
                <Typography variant="h4" fontWeight={800} color="primary" sx={{ mb: 0.5 }}>{summaryValues[idx]}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>{counter.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Week Selector & Bulk Actions */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Tabs value={selectedWeek} onChange={(_, v) => setSelectedWeek(v)}>
            {weekOptions.map(opt => <Tab key={opt} value={opt} label={opt} />)}
          </Tabs>
          <Button startIcon={<FileCopyIcon />} onClick={handleCopyWeek} variant="outlined">Copy Week</Button>
          <Button startIcon={<ClearAllIcon />} onClick={handleClearWeek} variant="outlined" color="warning">Clear Week</Button>
          <Button startIcon={<DownloadIcon />} onClick={handleExportWeek} variant="contained" color="primary">Export</Button>
        </Box>
        {/* Weekly Menu Grid with Info column */}
        <Paper sx={{ p: 2, borderRadius: 4, boxShadow: theme.shadows[2], mb: 4, overflowX: 'auto' }}>
          <Box minWidth={1000}>
            <Grid container>
              <Grid item xs={2} sx={{ borderBottom: '2px solid', borderColor: 'divider', p: 1 }}>
                <Typography fontWeight={700}>Meal / Day</Typography>
              </Grid>
              {weekDays.map(day => (
                <Grid item xs key={day} sx={{ borderBottom: '2px solid', borderColor: 'divider', p: 1 }}>
                  <Typography fontWeight={700}>{day}</Typography>
                </Grid>
              ))}
              <Grid item xs={1} sx={{ borderBottom: '2px solid', borderColor: 'divider', p: 1 }}>
                <Typography fontWeight={700}>Info</Typography>
              </Grid>
            </Grid>
            {mealTypes.map(meal => (
              <Grid container key={meal} alignItems="center" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                <Grid item xs={2} sx={{ p: 1 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {meal === 'Breakfast' && <BreakfastDiningIcon color="info" />}
                    {meal === 'Lunch' && <LunchDiningIcon color="success" />}
                    {meal === 'Dinner' && <DinnerDiningIcon color="primary" />}
                    {meal === 'Snacks' && <FastfoodIcon color="secondary" />}
                    <Typography fontWeight={700}>{meal}</Typography>
                  </Box>
                </Grid>
                {weekDays.map(day => (
                  <Grid item xs key={day} sx={{ p: 1 }}>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {(weeklyMenu[day][meal] || []).map((item, idx) => (
                        <Paper key={idx} sx={{ p: 1, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, bgcolor: item.status ? theme.palette.background.paper : theme.palette.action.disabledBackground, boxShadow: theme.shadows[1], transition: 'box-shadow 0.2s', '&:hover': { boxShadow: theme.shadows[4] } }}>
                          <Chip label={item.name} color={item.status ? 'success' : 'default'} size="small" sx={{ fontWeight: 700 }} />
                          <IconButton size="small" onClick={() => handleEdit(day, meal, item)}><EditIcon fontSize="small" /></IconButton>
                          <IconButton size="small" onClick={() => handleDelete(day, meal, item)}><DeleteIcon fontSize="small" /></IconButton>
                        </Paper>
                      ))}
                      <Button size="small" variant="outlined" color="primary" onClick={() => handleAdd(day, meal)} sx={{ mt: 0.5 }}>Add</Button>
                    </Box>
                  </Grid>
                ))}
                {/* Info column */}
                <Grid item xs={1} sx={{ p: 1 }}>
                  <IconButton color="info" onClick={() => handleInfoOpen(weekDays, meal, weekDays.map(day => weeklyMenu[day][meal]))}>
                    <InfoIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Paper>
        {/* Add Weekly Menu Dialog (Tabbed) */}
        <Dialog open={addWeekDialogOpen} onClose={handleAddWeekClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper } }}>
          <DialogTitle>Add Weekly Menu</DialogTitle>
          <DialogContent>
            <Tabs value={batchTab} onChange={(_, v) => setBatchTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
              {weekDays.map(day => <Tab key={day} value={day} label={day} />)}
            </Tabs>
            {weekDays.map(day => (
              batchTab === day && (
                <Box key={day}>
                  {mealTypes.map(meal => (
                    <Box key={meal} mb={2}>
                      <Typography fontWeight={700} mb={1}>{meal}</Typography>
                      {batchMenu[day][meal].map((val, idx) => (
                        <Box key={idx} display="flex" alignItems="center" gap={1} mb={1}>
                          <TextField label="Dish Name" value={val} onChange={e => handleBatchMenuChange(day, meal, idx, e.target.value)} size="small" sx={{ flex: 1 }} />
                          <IconButton size="small" onClick={() => handleBatchMenuRemoveRow(day, meal, idx)} disabled={batchMenu[day][meal].length === 1}><DeleteIcon fontSize="small" /></IconButton>
                        </Box>
                      ))}
                      <Button size="small" startIcon={<FastfoodIcon />} onClick={() => handleBatchMenuAddRow(day, meal)}>Add Dish</Button>
                    </Box>
                  ))}
                </Box>
              )
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddWeekClose} color="inherit">Cancel</Button>
            <Button onClick={handleBatchMenuSave} variant="contained" color="primary">Save Weekly Menu</Button>
          </DialogActions>
        </Dialog>
        {/* Info Dialog */}
        <Dialog open={infoDialogOpen} onClose={handleInfoClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper } }}>
          <DialogTitle>Menu Info - {infoDialogData.meal}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {infoDialogData.items && infoDialogData.items.map((items, idx) => (
                <Grid item xs={12} md={6} key={weekDays[idx]}>
                  <Typography fontWeight={700} mb={1}>{weekDays[idx]}</Typography>
                  {items.length === 0 ? (
                    <Typography color="text.secondary">No dishes</Typography>
                  ) : (
                    items.map((item, i) => (
                      <Paper key={i} sx={{ p: 1, borderRadius: 2, mb: 1, bgcolor: item.status ? theme.palette.background.paper : theme.palette.action.disabledBackground, boxShadow: theme.shadows[1] }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip label={item.name} color={item.status ? 'success' : 'default'} size="small" sx={{ fontWeight: 700 }} />
                          <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInfoClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, boxShadow: 8, bgcolor: theme.palette.background.paper } }}>
          <DialogTitle>{editCell.item ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          <DialogContent>
            <TextField label="Dish Name" value={menuForm.name} onChange={e => setMenuForm(f => ({ ...f, name: e.target.value }))} fullWidth margin="normal" />
            <TextField label="Description" value={menuForm.description} onChange={e => setMenuForm(f => ({ ...f, description: e.target.value }))} fullWidth margin="normal" multiline rows={2} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select value={menuForm.status} label="Status" onChange={e => setMenuForm(f => ({ ...f, status: e.target.value === 'true' }))}>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="inherit">Cancel</Button>
            <Button onClick={handleDialogSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar(s => ({ ...s, open: false }))} message={snackbar.message} />
      </Box>
    </Box>
  );
} 