import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Fab,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Rating,
  LinearProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Download,
  Refresh,
  Restaurant,
  MenuBook,
  LocalDining,
  Fastfood,
  LocalPizza,
  LocalCafe,
  LocalBar,
  Cake,
  FreeBreakfast,
  LunchDining,
  DinnerDining,
  Nightlife,
  CheckCircle,
  Warning,
  Error,
  Close,
  Save,
  Cancel,
  ExpandMore,
  Notifications,
  Message,
  Call,
  WhatsApp,
  Schedule,
  Assignment,
  Security,
  CleaningServices,
  Engineering,
  AdminPanelSettings,
  SupervisorAccount,
  PersonAdd,
  Group,
  TrendingUp,
  AttachMoney,
  Receipt,
  Assessment,
  EventNote,
  AccessTime,
  CheckCircleOutline,
  CancelOutlined,
  PendingActions,
  Inventory,
  ShoppingCart,
  Kitchen,
  Nutrition,
  Allergies,
  Spa,
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
  Check,
  Clear,
  Info,
  Help,
  Settings,
  MoreVert,
  MoreHoriz,
  ExpandLess,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function FoodCatering() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form State
  const [formData, setFormData] = useState({
    menuId: "",
    name: "",
    description: "",
    category: "",
    mealType: "",
    price: 0,
    preparationTime: "",
    servingSize: "",
    calories: 0,
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      halal: false,
      kosher: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
    },
    allergens: [],
    ingredients: [],
    nutritionalInfo: {
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    },
    availability: "available",
    image: "",
    chef: "",
    rating: 0,
    reviews: [],
    notes: "",
  });

  // Mock Data
  const mockMenus = [
    {
      id: 1,
      menuId: "MENU001",
      name: "Masala Dosa",
      description: "Crispy rice and lentil crepe filled with spiced potato mixture",
      category: "Breakfast",
      mealType: "South Indian",
      price: 120,
      preparationTime: "15 minutes",
      servingSize: "1 piece",
      calories: 280,
      dietaryInfo: {
        vegetarian: true,
        vegan: true,
        halal: true,
        kosher: false,
        glutenFree: true,
        dairyFree: true,
        nutFree: true,
      },
      allergens: ["None"],
      ingredients: ["Rice", "Lentils", "Potatoes", "Onions", "Spices"],
      nutritionalInfo: {
        protein: 8,
        carbs: 45,
        fat: 6,
        fiber: 4,
        sugar: 2,
      },
      availability: "available",
      image: "",
      chef: "Chef Rajesh",
      rating: 4.5,
      reviews: [
        { id: 1, user: "Student1", rating: 5, comment: "Excellent taste!" },
        { id: 2, user: "Student2", rating: 4, comment: "Very good" },
      ],
      notes: "Best served hot with coconut chutney and sambar",
    },
    {
      id: 2,
      menuId: "MENU002",
      name: "Chicken Biryani",
      description: "Aromatic rice dish cooked with tender chicken and spices",
      category: "Lunch",
      mealType: "North Indian",
      price: 180,
      preparationTime: "45 minutes",
      servingSize: "1 plate",
      calories: 450,
      dietaryInfo: {
        vegetarian: false,
        vegan: false,
        halal: true,
        kosher: false,
        glutenFree: true,
        dairyFree: true,
        nutFree: true,
      },
      allergens: ["None"],
      ingredients: ["Basmati Rice", "Chicken", "Onions", "Spices", "Ghee"],
      nutritionalInfo: {
        protein: 25,
        carbs: 60,
        fat: 12,
        fiber: 3,
        sugar: 1,
      },
      availability: "available",
      image: "",
      chef: "Chef Priya",
      rating: 4.8,
      reviews: [
        { id: 3, user: "Student3", rating: 5, comment: "Amazing biryani!" },
        { id: 4, user: "Student4", rating: 4, comment: "Delicious" },
      ],
      notes: "Served with raita and pickle",
    },
    {
      id: 3,
      menuId: "MENU003",
      name: "Paneer Tikka",
      description: "Grilled cottage cheese marinated in spices and yogurt",
      category: "Dinner",
      mealType: "North Indian",
      price: 150,
      preparationTime: "25 minutes",
      servingSize: "6 pieces",
      calories: 320,
      dietaryInfo: {
        vegetarian: true,
        vegan: false,
        halal: true,
        kosher: false,
        glutenFree: false,
        dairyFree: false,
        nutFree: true,
      },
      allergens: ["Dairy"],
      ingredients: ["Paneer", "Yogurt", "Spices", "Onions", "Bell Peppers"],
      nutritionalInfo: {
        protein: 18,
        carbs: 8,
        fat: 22,
        fiber: 2,
        sugar: 3,
      },
      availability: "available",
      image: "",
      chef: "Chef Amit",
      rating: 4.3,
      reviews: [
        { id: 5, user: "Student5", rating: 4, comment: "Good taste" },
        { id: 6, user: "Student6", rating: 4, comment: "Nice texture" },
      ],
      notes: "Served with mint chutney and onions",
    },
    {
      id: 4,
      menuId: "MENU004",
      name: "Dal Khichdi",
      description: "Comforting one-pot meal of rice and lentils",
      category: "Dinner",
      mealType: "Gujarati",
      price: 100,
      preparationTime: "30 minutes",
      servingSize: "1 bowl",
      calories: 350,
      dietaryInfo: {
        vegetarian: true,
        vegan: true,
        halal: true,
        kosher: true,
        glutenFree: true,
        dairyFree: true,
        nutFree: true,
      },
      allergens: ["None"],
      ingredients: ["Rice", "Lentils", "Ghee", "Spices", "Vegetables"],
      nutritionalInfo: {
        protein: 12,
        carbs: 55,
        fat: 8,
        fiber: 6,
        sugar: 1,
      },
      availability: "available",
      image: "",
      chef: "Chef Neha",
      rating: 4.6,
      reviews: [
        { id: 7, user: "Student7", rating: 5, comment: "Perfect comfort food" },
        { id: 8, user: "Student8", rating: 4, comment: "Healthy and tasty" },
      ],
      notes: "Best for sick students or light dinner",
    },
  ];

  useEffect(() => {
    setMenus(mockMenus);
    setFilteredMenus(mockMenus);
  }, []);

  useEffect(() => {
    filterMenus();
  }, [searchTerm, categoryFilter, dietaryFilter, menus]);

  const filterMenus = () => {
    let filtered = menus.filter((menu) => {
      const matchesSearch = 
        menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.mealType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || menu.category === categoryFilter;
      
      let matchesDietary = true;
      if (dietaryFilter === "vegetarian") {
        matchesDietary = menu.dietaryInfo.vegetarian;
      } else if (dietaryFilter === "vegan") {
        matchesDietary = menu.dietaryInfo.vegan;
      } else if (dietaryFilter === "halal") {
        matchesDietary = menu.dietaryInfo.halal;
      }
      
      return matchesSearch && matchesCategory && matchesDietary;
    });
    
    setFilteredMenus(filtered);
  };

  const handleOpenDialog = (menu = null) => {
    if (menu) {
      setEditingMenu(menu);
      setFormData(menu);
      setIsEditMode(true);
    } else {
      setEditingMenu(null);
      setFormData({
        menuId: `MENU${String(Date.now()).slice(-6)}`,
        name: "",
        description: "",
        category: "",
        mealType: "",
        price: 0,
        preparationTime: "",
        servingSize: "",
        calories: 0,
        dietaryInfo: {
          vegetarian: false,
          vegan: false,
          halal: false,
          kosher: false,
          glutenFree: false,
          dairyFree: false,
          nutFree: false,
        },
        allergens: [],
        ingredients: [],
        nutritionalInfo: {
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0,
        },
        availability: "available",
        image: "",
        chef: "",
        rating: 0,
        reviews: [],
        notes: "",
      });
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMenu(null);
    setIsEditMode(false);
  };

  const handleFormChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const menuData = {
      ...formData,
      id: isEditMode ? editingMenu.id : Date.now(),
    };

    if (isEditMode) {
      setMenus(prev => prev.map(menu => 
        menu.id === editingMenu.id ? menuData : menu
      ));
      setSnackbar({
        open: true,
        message: "Menu item updated successfully!",
        severity: "success",
      });
    } else {
      setMenus(prev => [...prev, menuData]);
      setSnackbar({
        open: true,
        message: "Menu item added successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setMenus(prev => prev.filter(menu => menu.id !== id));
    setSnackbar({
      open: true,
      message: "Menu item deleted successfully!",
      severity: "success",
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredMenus);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Food Menu");
    XLSX.writeFile(wb, "Food_Catering_Export.xlsx");
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Breakfast": <FreeBreakfast />,
      "Lunch": <LunchDining />,
      "Dinner": <DinnerDining />,
      "Snacks": <Fastfood />,
      "Beverages": <LocalCafe />,
    };
    return icons[category] || <Restaurant />;
  };

  const getDietaryIcon = (dietaryInfo) => {
    if (dietaryInfo.vegan) return <Spa />;
    if (dietaryInfo.vegetarian) return <Spa />;
    if (dietaryInfo.halal) return <Favorite />;
    return <LocalDining />;
  };

  const columns = [
    {
      field: "menuId",
      headerName: "Menu ID",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Dish Name",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
            {getCategoryIcon(params.row.category)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.mealType}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {getCategoryIcon(params.value)}
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price (₹)",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          ₹{(params.value || 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "dietaryInfo",
      headerName: "Dietary",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {getDietaryIcon(params.value)}
          <Chip 
            label={params.value.vegetarian ? "Veg" : "Non-Veg"} 
            size="small" 
            color={params.value.vegetarian ? "success" : "error"}
          />
        </Box>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Rating value={params.value} size="small" readOnly />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "availability",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "available" ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Menu">
            <IconButton 
              size="small" 
              color="secondary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Menu">
            <IconButton 
              size="small" 
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Dashboard Stats
  const stats = [
    {
      title: "Total Menu Items",
      value: menus.length,
      icon: <MenuBook color="primary" />,
      color: "#2196F3",
    },
    {
      title: "Available Items",
      value: menus.filter(m => m.availability === "available").length,
      icon: <CheckCircle color="primary" />,
      color: "#4CAF50",
    },
    {
      title: "Vegetarian Options",
      value: menus.filter(m => m.dietaryInfo.vegetarian).length,
      icon: <Spa color="primary" />,
      color: "#8BC34A",
    },
    {
      title: "Average Rating",
      value: (menus.reduce((sum, m) => sum + m.rating, 0) / menus.length).toFixed(1),
      icon: <Star color="primary" />,
      color: "#FFC107",
    },
    {
      title: "Total Revenue",
      value: `₹${menus.reduce((sum, m) => sum + m.price, 0).toLocaleString()}`,
      icon: <AttachMoney color="primary" />,
      color: "#9C27B0",
    },
    {
      title: "Chef Count",
      value: new Set(menus.map(m => m.chef)).size,
      icon: <Kitchen color="primary" />,
      color: "#FF5722",
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden"
      }}>
        <CommonHeader />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, 
            pt: { xs: 8, sm: 10 },
            overflow: "auto",
            height: "100vh",
            backgroundColor: theme.palette.background.default
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            mb={4}
            gap={2}
          >
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold"
                color="primary"
              >
                Food Catering Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage menu items, dietary preferences, and food services
              </Typography>
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center" 
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                size={isMobile ? "small" : "medium"}
              >
                Add Menu Item
              </Button>
            </Box>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} mb={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card 
                  sx={{ 
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {stat.title}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {stat.value}
                        </Typography>
                      </Box>
                      <Avatar 
                        sx={{ 
                          bgcolor: stat.color + "20",
                          color: stat.color,
                          width: 48,
                          height: 48
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      <MenuItem value="Breakfast">Breakfast</MenuItem>
                      <MenuItem value="Lunch">Lunch</MenuItem>
                      <MenuItem value="Dinner">Dinner</MenuItem>
                      <MenuItem value="Snacks">Snacks</MenuItem>
                      <MenuItem value="Beverages">Beverages</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Dietary</InputLabel>
                    <Select
                      value={dietaryFilter}
                      onChange={(e) => setDietaryFilter(e.target.value)}
                      label="Dietary"
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="vegetarian">Vegetarian</MenuItem>
                      <MenuItem value="vegan">Vegan</MenuItem>
                      <MenuItem value="halal">Halal</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={exportToExcel}
                    fullWidth
                    size="small"
                  >
                    Export
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("all");
                      setDietaryFilter("all");
                    }}
                    fullWidth
                    size="small"
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Data Grid */}
          <Card>
            <CardContent>
              <DataGrid
                rows={filteredMenus}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableSelectionOnClick
                autoHeight
                sx={{
                  border: 0,
                  "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Add/Edit Menu Dialog */}
          <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                  {isEditMode ? "Edit Menu Item" : "Add New Menu Item"}
                </Typography>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Tabs 
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ mb: 3 }}
              >
                <Tab label="Basic Info" />
                <Tab label="Dietary & Allergens" />
                <Tab label="Nutrition & Ingredients" />
                <Tab label="Pricing & Availability" />
              </Tabs>

              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Menu ID"
                      value={formData.menuId}
                      onChange={(e) => handleFormChange("menuId", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Dish Name"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleFormChange("description", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={formData.category}
                        onChange={(e) => handleFormChange("category", e.target.value)}
                        label="Category"
                      >
                        <MenuItem value="Breakfast">Breakfast</MenuItem>
                        <MenuItem value="Lunch">Lunch</MenuItem>
                        <MenuItem value="Dinner">Dinner</MenuItem>
                        <MenuItem value="Snacks">Snacks</MenuItem>
                        <MenuItem value="Beverages">Beverages</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Meal Type"
                      value={formData.mealType}
                      onChange={(e) => handleFormChange("mealType", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Preparation Time"
                      value={formData.preparationTime}
                      onChange={(e) => handleFormChange("preparationTime", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Serving Size"
                      value={formData.servingSize}
                      onChange={(e) => handleFormChange("servingSize", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Chef"
                      value={formData.chef}
                      onChange={(e) => handleFormChange("chef", e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Calories"
                      type="number"
                      value={formData.calories}
                      onChange={(e) => handleFormChange("calories", parseInt(e.target.value) || 0)}
                      required
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Dietary Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {Object.entries(formData.dietaryInfo).map(([diet, checked]) => (
                        <Grid item xs={6} sm={4} md={3} key={diet}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={checked}
                                onChange={(e) => handleFormChange(`dietaryInfo.${diet}`, e.target.checked)}
                              />
                            }
                            label={
                              <Box display="flex" alignItems="center" gap={1}>
                                {diet === "vegetarian" && <Spa fontSize="small" />}
                                {diet === "vegan" && <Spa fontSize="small" />}
                                {diet === "halal" && <Favorite fontSize="small" />}
                                {diet === "kosher" && <Star fontSize="small" />}
                                {diet === "glutenFree" && <Check fontSize="small" />}
                                {diet === "dairyFree" && <Clear fontSize="small" />}
                                {diet === "nutFree" && <Info fontSize="small" />}
                                <Typography variant="body2" textTransform="capitalize">
                                  {diet.replace(/([A-Z])/g, ' $1').trim()}
                                </Typography>
                              </Box>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Allergens
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Allergens (comma separated)"
                      value={formData.allergens.join(", ")}
                      onChange={(e) => handleFormChange("allergens", e.target.value.split(", ").filter(s => s.trim()))}
                      placeholder="e.g., Dairy, Nuts, Gluten"
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Nutritional Information (per serving)
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Protein (g)"
                      type="number"
                      value={formData.nutritionalInfo.protein}
                      onChange={(e) => handleFormChange("nutritionalInfo.protein", parseFloat(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Carbohydrates (g)"
                      type="number"
                      value={formData.nutritionalInfo.carbs}
                      onChange={(e) => handleFormChange("nutritionalInfo.carbs", parseFloat(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Fat (g)"
                      type="number"
                      value={formData.nutritionalInfo.fat}
                      onChange={(e) => handleFormChange("nutritionalInfo.fat", parseFloat(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Fiber (g)"
                      type="number"
                      value={formData.nutritionalInfo.fiber}
                      onChange={(e) => handleFormChange("nutritionalInfo.fiber", parseFloat(e.target.value) || 0)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Sugar (g)"
                      type="number"
                      value={formData.nutritionalInfo.sugar}
                      onChange={(e) => handleFormChange("nutritionalInfo.sugar", parseFloat(e.target.value) || 0)}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Ingredients
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Ingredients (comma separated)"
                      value={formData.ingredients.join(", ")}
                      onChange={(e) => handleFormChange("ingredients", e.target.value.split(", ").filter(s => s.trim()))}
                      placeholder="e.g., Rice, Lentils, Spices, Vegetables"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Price (₹)"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleFormChange("price", parseInt(e.target.value) || 0)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Availability</InputLabel>
                      <Select
                        value={formData.availability}
                        onChange={(e) => handleFormChange("availability", e.target.value)}
                        label="Availability"
                      >
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="unavailable">Unavailable</MenuItem>
                        <MenuItem value="seasonal">Seasonal</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additional Notes"
                      multiline
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => handleFormChange("notes", e.target.value)}
                      placeholder="Special instructions, serving suggestions, etc."
                    />
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                startIcon={<Save />}
              >
                {isEditMode ? "Update" : "Add"} Menu Item
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          {/* Floating Action Button for Mobile */}
          {isMobile && (
            <Fab
              color="primary"
              aria-label="add menu item"
              sx={{ position: "fixed", bottom: 16, right: 16 }}
              onClick={() => handleOpenDialog()}
            >
              <Add />
            </Fab>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
} 