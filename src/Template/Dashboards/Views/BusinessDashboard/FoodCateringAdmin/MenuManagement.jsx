import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useTheme, Card, CardContent, Grid, Chip, IconButton, Tabs, Tab, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HotelIcon from '@mui/icons-material/Hotel';
import CakeIcon from '@mui/icons-material/Cake';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const initialMenu = [
  { id: 1, name: 'Paneer Butter Masala', category: 'Main Course', price: 220, status: true, description: 'Rich and creamy paneer curry.', image: '', type: 'Hostel', meal: 'Lunch', day: 'Monday' },
  { id: 2, name: 'Veg Biryani', category: 'Rice', price: 180, status: true, description: 'Aromatic rice with vegetables.', image: '', type: 'Hostel', meal: 'Dinner', day: 'Monday' },
  { id: 3, name: 'Gulab Jamun', category: 'Dessert', price: 60, status: false, description: 'Sweet milk-solid balls in syrup.', image: '', type: 'Hostel', meal: 'Lunch', day: 'Tuesday' },
  { id: 4, name: 'Idli Sambar', category: 'Breakfast', price: 50, status: true, description: 'Steamed rice cakes with sambar.', image: '', type: 'Hostel', meal: 'Breakfast', day: 'Wednesday' },
  { id: 5, name: 'Pasta', category: 'Main Course', price: 150, status: true, description: 'Italian pasta with sauce.', image: '', type: 'Restaurant', meal: 'Lunch', day: 'Monday' },
  { id: 6, name: 'Sandwich', category: 'Snacks', price: 70, status: true, description: 'Veg sandwich.', image: '', type: 'Catering', meal: 'Snacks', day: 'Friday' },
];

// Update menuTypes to match FoodCateringDashboard.jsx
const menuTypes = [
  { label: 'All', value: 'All', icon: <RestaurantIcon /> },
  { label: 'Delivery', value: 'Delivery', icon: <LocalShippingIcon /> },
  { label: 'Hostel', value: 'Hostel', icon: <HotelIcon /> },
  { label: 'Wedding', value: 'Wedding', icon: <CelebrationIcon /> },
  { label: 'Corporate', value: 'Corporate', icon: <BusinessCenterIcon /> },
  { label: 'Personal', value: 'Personal', icon: <EmojiPeopleIcon /> },
  { label: 'Birthday', value: 'Birthday', icon: <CakeIcon /> },
  { label: 'Other', value: 'Other', icon: <MoreHorizIcon /> },
];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const cateringSubtypes = ['Wedding', 'Corporate', 'Personal', 'Birthday', 'Other'];

const defaultCategories = ['Main Course', 'Rice', 'Dessert', 'Breakfast', 'Snacks'];

const MenuManagement = () => {
  const theme = useTheme();
  const [menu, setMenu] = useState(initialMenu);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuForm, setMenuForm] = useState({ name: '', category: '', price: '', status: true, description: '', image: '', type: menuTypes[0].value, meal: mealTypes[0], day: weekDays[0], subtype: cateringSubtypes[0] });
  const [menuType, setMenuType] = useState(menuTypes[0].value);
  const [mealType, setMealType] = useState(mealTypes[0]);
  const [weekDay, setWeekDay] = useState(weekDays[0]);
  const [cateringSubtype, setCateringSubtype] = useState(cateringSubtypes[0]);
  const [categories, setCategories] = useState([...defaultCategories]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Filtered menu based on selections and search/filters
  const filteredMenu = menu.filter(m =>
    (menuType === 'All' || m.type === menuType) &&
    m.meal === mealType &&
    (menuType !== 'Hostel' || m.day === weekDay) &&
    (menuType !== 'Catering' || m.subtype === cateringSubtypes[0] || m.subtype === cateringSubtype) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCategory || m.category === filterCategory) &&
    (!filterStatus || (filterStatus === 'Active' ? m.status : !m.status))
  );

  // Summary
  const totalItems = filteredMenu.length;
  const uniqueCategories = [...new Set(filteredMenu.map(m => m.category))];
  const activeItems = filteredMenu.filter(m => m.status).length;
  const inactiveItems = totalItems - activeItems;

  // Summary counters for card-based analytics (like FoodCateringDashboard)
  const summaryCounters = [
    { label: 'Total Items', value: totalItems, icon: <FastfoodIcon />, color: 'primary.main' },
    { label: 'Categories', value: uniqueCategories.length, icon: <CategoryIcon />, color: 'secondary.main' },
    { label: 'Active', value: activeItems, icon: <CheckCircleIcon />, color: 'success.main' },
    { label: 'Inactive', value: inactiveItems, icon: <CancelIcon />, color: 'error.main' },
  ];

  // Handlers
  const handleAddOpen = () => { setAddOpen(true); setMenuForm({ name: '', category: categories[0] || '', price: '', status: true, description: '', image: '', type: menuType, meal: mealType, day: weekDay, subtype: cateringSubtypes[0] }); };
  const handleAddClose = () => setAddOpen(false);
  const handleAdd = () => {
    setMenu(m => [...m, { ...menuForm, id: Date.now(), price: Number(menuForm.price) }]);
    handleAddClose();
  };
  const handleEditOpen = (item) => { setSelectedItem(item); setMenuForm(item); setEditOpen(true); };
  const handleEditClose = () => setEditOpen(false);
  const handleEdit = () => {
    setMenu(m => m.map(i => i.id === selectedItem.id ? { ...i, ...menuForm, price: Number(menuForm.price) } : i));
    handleEditClose();
  };
  const handleDeleteOpen = (item) => { setSelectedItem(item); setDeleteOpen(true); };
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDelete = () => {
    setMenu(m => m.filter(i => i.id !== selectedItem.id));
    handleDeleteClose();
  };
  const handleInfoOpen = (item) => { setSelectedItem(item); setInfoOpen(true); };
  const handleInfoClose = () => setInfoOpen(false);
  const handleStatusToggle = (id) => {
    setMenu(m => m.map(i => i.id === id ? { ...i, status: !i.status } : i));
  };
  const handleCategoryDialogOpen = () => setCategoryDialogOpen(true);
  const handleCategoryDialogClose = () => setCategoryDialogOpen(false);
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(c => [...c, newCategory]);
      setNewCategory('');
      setCategoryDialogOpen(false);
    }
  };

  // DataGrid columns
  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
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
    { field: 'name', headerName: 'Name', width: 150, renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1}>
        <FastfoodIcon color="primary" fontSize="small" />
        <Typography fontWeight={600}>{params.value}</Typography>
      </Box>
    ) },
    { field: 'category', headerName: 'Category', width: 120, renderCell: (params) => (
      <Chip icon={<CategoryIcon />} label={params.value} size="small" color="secondary" />
    ) },
    { field: 'price', headerName: 'Price (₹)', width: 100, renderCell: (params) => (
      <Typography fontWeight={700} color="primary">₹{params.value}</Typography>
    ) },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
      <Chip
        label={params.value ? 'Active' : 'Inactive'}
        color={params.value ? 'success' : 'default'}
        size="small"
        icon={params.value ? <CheckCircleIcon /> : <CancelIcon />}
        onClick={() => handleStatusToggle(params.row.id)}
        sx={{ cursor: 'pointer' }}
      />
    ) },
    { field: 'description', headerName: 'Description', width: 180 },
    { field: 'meal', headerName: 'Meal', width: 90 },
    { field: 'day', headerName: 'Day', width: 90, hide: menuType !== 'Hostel' },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'subtype', headerName: 'Catering Subtype', width: 120, hide: menuType !== 'Catering' },
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <CommonHeader role="admin" />
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 2, md: 3 },
            pt: 10,
            mt: { xs: 8, sm: 10 },
            overflow: 'auto',
            height: '100vh',
            backgroundColor: theme.palette.background.default,
            transition: 'background-color 0.3s',
          }}
        >
          {/* Card-based summary counters */}
          <Grid container spacing={3} mb={4}>
            {summaryCounters.map((counter, index) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
                <Card sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  bgcolor: `linear-gradient(135deg, ${theme.palette.background.paper} 60%, ${theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light} 100%)`,
                  color: theme.palette.text.primary,
                  boxShadow: theme.shadows[3],
                  borderRadius: 4,
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[8] },
                  border: `1.5px solid ${theme.palette.divider}`,
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Avatar sx={{ bgcolor: counter.color, width: 48, height: 48 }}>
                        {counter.icon}
                      </Avatar>
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {counter.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {counter.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Controls: Tabs for menuType, then Selects for mealType, day, subtype, etc. */}
          <Paper elevation={2} sx={{ mb: 3, bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100', p: 2.5, borderRadius: 3, border: `1.5px solid ${theme.palette.divider}` }}>
            <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
              <Tabs
                value={menuType}
                onChange={(_, v) => {
                  setMenuType(v);
                  setMealType(mealTypes[0]);
                  setWeekDay(weekDays[0]);
                  setCateringSubtype(cateringSubtypes[0]);
                }}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                textColor="primary"
                sx={{
                  minWidth: 0,
                  '& .MuiTab-root': {
                    borderRadius: 2,
                    mx: 0.5,
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: theme.palette.action.hover,
                    },
                    '&.Mui-selected': {
                      background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      boxShadow: theme.shadows[2],
                    },
                  },
                }}
              >
                {menuTypes.map((type) => (
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
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Meal</InputLabel>
                <Select value={mealType} label="Meal" onChange={e => setMealType(e.target.value)}>
                  {mealTypes.map(meal => <MenuItem key={meal} value={meal}>{meal}</MenuItem>)}
                </Select>
              </FormControl>
              {menuType === 'Hostel' && (
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <InputLabel>Day</InputLabel>
                  <Select value={weekDay} label="Day" onChange={e => setWeekDay(e.target.value)}>
                    {weekDays.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
              {menuType === 'Catering' && (
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Subtype</InputLabel>
                  <Select value={cateringSubtype} label="Subtype" onChange={e => setCateringSubtype(e.target.value)}>
                    {cateringSubtypes.map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
              <TextField
                label="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                size="small"
                sx={{ width: 180 }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select value={filterCategory} label="Category" onChange={e => setFilterCategory(e.target.value)}>
                  <MenuItem value="">All</MenuItem>
                  {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select value={filterStatus} label="Status" onChange={e => setFilterStatus(e.target.value)}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              <Button startIcon={<AddCircleIcon />} variant="outlined" color="secondary" onClick={handleCategoryDialogOpen}>
                Add Category
              </Button>
              <Button variant="contained" color="primary" sx={{ ml: 'auto' }} onClick={handleAddOpen}>Add Menu Item</Button>
            </Box>
          </Paper>

          {/* DataGrid Table in a Card */}
          <Card sx={{ bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[3], mb: 4, borderRadius: 4, border: `1.5px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                Menu Items Overview
              </Typography>
              <Box sx={{ width: '100%', height: 420 }}>
                <DataGrid
                  rows={filteredMenu}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                  components={{ Toolbar: CustomTableToolbar }}
                  componentsProps={{
                    toolbar: {
                      rows: filteredMenu,
                      columns: columns,
                      selectedIDs: [],
                      handleDelete: () => {},
                    },
                  }}
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
            </CardContent>
          </Card>

          {/* Add Category Dialog */}
          <Dialog open={categoryDialogOpen} onClose={handleCategoryDialogClose} maxWidth="xs" fullWidth>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              <TextField
                label="Category Name"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCategoryDialogClose} color="inherit">Cancel</Button>
              <Button onClick={handleAddCategory} variant="contained" color="primary">Add</Button>
            </DialogActions>
          </Dialog>
          {/* Add Menu Item Modal */}
          <Dialog open={addOpen} onClose={handleAddClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                name="name"
                value={menuForm.name}
                onChange={e => setMenuForm(f => ({ ...f, name: e.target.value }))}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select value={menuForm.category} label="Category" onChange={e => setMenuForm(f => ({ ...f, category: e.target.value }))}>
                  {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                label="Price (₹)"
                name="price"
                type="number"
                value={menuForm.price}
                onChange={e => setMenuForm(f => ({ ...f, price: e.target.value }))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={menuForm.description}
                onChange={e => setMenuForm(f => ({ ...f, description: e.target.value }))}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Meal</InputLabel>
                <Select value={menuForm.meal} label="Meal" onChange={e => setMenuForm(f => ({ ...f, meal: e.target.value }))}>
                  {mealTypes.map(meal => <MenuItem key={meal} value={meal}>{meal}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select value={menuForm.type} label="Type" onChange={e => setMenuForm(f => ({ ...f, type: e.target.value }))}>
                  {menuTypes.map(type => <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>)}
                </Select>
              </FormControl>
              {menuForm.type === 'Hostel' && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Day</InputLabel>
                  <Select value={menuForm.day} label="Day" onChange={e => setMenuForm(f => ({ ...f, day: e.target.value }))}>
                    {weekDays.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
              {menuForm.type === 'Catering' && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Subtype</InputLabel>
                  <Select value={menuForm.subtype} label="Subtype" onChange={e => setMenuForm(f => ({ ...f, subtype: e.target.value }))}>
                    {cateringSubtypes.map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddClose} color="inherit">Cancel</Button>
              <Button onClick={handleAdd} variant="contained" color="primary">Add Item</Button>
            </DialogActions>
          </Dialog>
          {/* Edit Menu Item Modal */}
          <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                name="name"
                value={menuForm.name}
                onChange={e => setMenuForm(f => ({ ...f, name: e.target.value }))}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select value={menuForm.category} label="Category" onChange={e => setMenuForm(f => ({ ...f, category: e.target.value }))}>
                  {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                label="Price (₹)"
                name="price"
                type="number"
                value={menuForm.price}
                onChange={e => setMenuForm(f => ({ ...f, price: e.target.value }))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={menuForm.description}
                onChange={e => setMenuForm(f => ({ ...f, description: e.target.value }))}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Meal</InputLabel>
                <Select value={menuForm.meal} label="Meal" onChange={e => setMenuForm(f => ({ ...f, meal: e.target.value }))}>
                  {mealTypes.map(meal => <MenuItem key={meal} value={meal}>{meal}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select value={menuForm.type} label="Type" onChange={e => setMenuForm(f => ({ ...f, type: e.target.value }))}>
                  {menuTypes.map(type => <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>)}
                </Select>
              </FormControl>
              {menuForm.type === 'Hostel' && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Day</InputLabel>
                  <Select value={menuForm.day} label="Day" onChange={e => setMenuForm(f => ({ ...f, day: e.target.value }))}>
                    {weekDays.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
              {menuForm.type === 'Catering' && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Subtype</InputLabel>
                  <Select value={menuForm.subtype} label="Subtype" onChange={e => setMenuForm(f => ({ ...f, subtype: e.target.value }))}>
                    {cateringSubtypes.map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="inherit">Cancel</Button>
              <Button onClick={handleEdit} variant="contained" color="primary">Save Changes</Button>
            </DialogActions>
          </Dialog>
          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteOpen} onClose={handleDeleteClose} maxWidth="xs" fullWidth>
            <DialogTitle>Delete Menu Item</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this menu item?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} color="inherit">Cancel</Button>
              <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
            </DialogActions>
          </Dialog>
          {/* Info Dialog */}
          <Dialog open={infoOpen} onClose={handleInfoClose} maxWidth="xs" fullWidth PaperProps={{
            sx: {
              borderRadius: 5,
              boxShadow: 12,
              bgcolor: `linear-gradient(135deg, ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]} 70%, ${theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light} 100%)`,
              border: `2px solid ${theme.palette.primary.main}`,
              p: 0,
            },
          }}>
            <Box p={3} display="flex" flexDirection="column" alignItems="center" gap={2}>
              {selectedItem && (
                <>
                  <Avatar sx={{
                    bgcolor: 'primary.main',
                    width: 72,
                    height: 72,
                    mb: 1,
                    border: `3px solid ${theme.palette.secondary.main}`,
                    boxShadow: theme.shadows[4],
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 60%, ${theme.palette.secondary.main} 100%)`,
                  }}>
                    <FastfoodIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} color="primary" mb={1}>{selectedItem.name}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Category</Typography>
                      <Chip icon={<CategoryIcon />} label={selectedItem.category} size="small" color="secondary" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Price</Typography>
                      <Chip label={`₹${selectedItem.price}`} size="small" color="primary" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Status</Typography>
                      {selectedItem.status ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="default" size="small" />}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Meal</Typography>
                      <Chip label={selectedItem.meal} size="small" color="info" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Type</Typography>
                      <Chip label={selectedItem.type} size="small" color="primary" />
                    </Grid>
                    {selectedItem.type === 'Hostel' && (
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Day</Typography>
                        <Chip label={selectedItem.day} size="small" color="secondary" />
                      </Grid>
                    )}
                    {selectedItem.type === 'Catering' && (
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Subtype</Typography>
                        <Chip label={selectedItem.subtype} size="small" color="info" />
                      </Grid>
                    )}
                  </Grid>
                  <Box mt={2} width="100%">
                    <Typography variant="body2" color="text.secondary" mb={0.5}>Description</Typography>
                    <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ bgcolor: theme.palette.background.paper, borderRadius: 2, p: 1, minHeight: 40 }}>{selectedItem.description}</Typography>
                  </Box>
                  <Button onClick={handleInfoClose} variant="contained" color="primary" sx={{ mt: 2, borderRadius: 3, fontWeight: 700, px: 4, boxShadow: theme.shadows[2] }}>Close</Button>
                </>
              )}
            </Box>
          </Dialog>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MenuManagement; 