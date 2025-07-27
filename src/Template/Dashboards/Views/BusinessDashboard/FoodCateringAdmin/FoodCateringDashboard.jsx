import React, { useState } from "react";
import { Card, CardContent, Tabs, Tab, useTheme, Box, Typography, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, Paper } from "@mui/material";
import { BarChart as RechartsBarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ComposedChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import StarIcon from "@mui/icons-material/Star";
import FlatwareIcon from "@mui/icons-material/Flatware";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HotelIcon from "@mui/icons-material/Hotel";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "CommonComponents/CustomTableToolbar.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid } from '@mui/x-data-grid';
import GroupIcon from '@mui/icons-material/Group';
import BrushIcon from '@mui/icons-material/Brush';

const cateringTypes = [
  { label: "All", value: "all" },
  { label: "Delivery", value: "delivery", icon: <LocalShippingIcon /> },
  { label: "Hostel", value: "hostel", icon: <HotelIcon /> },
  { label: "Wedding", value: "wedding" },
  { label: "Corporate", value: "corporate" },
  { label: "Personal", value: "personal" },
  { label: "Birthday", value: "birthday" },
  { label: "Other", value: "other" },
];

const allCounters = {
  all: [
    { label: "Total Revenue", value: "₹420,000", icon: <AttachMoneyIcon />, trend: "+14.2%", color: "success.main" },
    { label: "Total Bookings", value: "2,100", icon: <BookOnlineIcon />, trend: "+10.5%", color: "info.main" },
    { label: "Active Customers", value: "1,350", icon: <PeopleIcon />, trend: "+8.7%", color: "warning.main" },
    { label: "Customer Satisfaction", value: "97.1%", icon: <StarIcon />, trend: "+2.9%", color: "secondary.main" },
    { label: "Menu Items", value: "85", icon: <RestaurantIcon />, trend: "+5.3%", color: "primary.main" },
    { label: "Pending Orders", value: "18", icon: <TrendingUpIcon />, trend: "-4.2%", color: "error.main" },
  ],
  delivery: [
    { label: "Delivery Revenue", value: "₹120,000", icon: <LocalShippingIcon />, trend: "+12.1%", color: "success.main" },
    { label: "Orders Delivered", value: "800", icon: <BookOnlineIcon />, trend: "+9.2%", color: "info.main" },
    { label: "Active Delivery Customers", value: "600", icon: <PeopleIcon />, trend: "+7.5%", color: "warning.main" },
    { label: "Satisfaction", value: "96.2%", icon: <StarIcon />, trend: "+2.1%", color: "secondary.main" },
  ],
  hostel: [
    { label: "Hostel Revenue", value: "₹90,000", icon: <HotelIcon />, trend: "+10.3%", color: "success.main" },
    { label: "Hostel Bookings", value: "500", icon: <BookOnlineIcon />, trend: "+8.1%", color: "info.main" },
    { label: "Hostel Customers", value: "400", icon: <PeopleIcon />, trend: "+6.8%", color: "warning.main" },
    { label: "Satisfaction", value: "97.8%", icon: <StarIcon />, trend: "+3.0%", color: "secondary.main" },
  ],
  wedding: [
    { label: "Wedding Revenue", value: "₹120,000", icon: <FlatwareIcon />, trend: "+15.0%", color: "success.main" },
    { label: "Wedding Bookings", value: "60", icon: <BookOnlineIcon />, trend: "+10.0%", color: "info.main" },
  ],
  corporate: [
    { label: "Corporate Revenue", value: "₹90,000", icon: <FlatwareIcon />, trend: "+13.0%", color: "success.main" },
    { label: "Corporate Bookings", value: "45", icon: <BookOnlineIcon />, trend: "+8.0%", color: "info.main" },
  ],
  personal: [
    { label: "Personal Revenue", value: "₹50,000", icon: <FlatwareIcon />, trend: "+8.0%", color: "success.main" },
    { label: "Personal Bookings", value: "28", icon: <BookOnlineIcon />, trend: "+5.0%", color: "info.main" },
  ],
  birthday: [
    { label: "Birthday Revenue", value: "₹70,000", icon: <FlatwareIcon />, trend: "+9.0%", color: "success.main" },
    { label: "Birthday Bookings", value: "38", icon: <BookOnlineIcon />, trend: "+6.0%", color: "info.main" },
  ],
  other: [
    { label: "Other Revenue", value: "₹30,000", icon: <FlatwareIcon />, trend: "+5.0%", color: "success.main" },
    { label: "Other Bookings", value: "15", icon: <BookOnlineIcon />, trend: "+2.0%", color: "info.main" },
  ],
};

const cateringTypeInfo = {
  all: {
    title: "All Catering Types",
    description: "Overview of all catering services including delivery, hostel, events, and more.",
    highlights: [
      { label: "Total Revenue", value: "₹420,000" },
      { label: "Total Bookings", value: "2,100" },
      { label: "Customer Satisfaction", value: "97.1%" },
    ],
  },
  delivery: {
    title: "Delivery Catering",
    description: "Performance and analytics for food delivery catering.",
    highlights: [
      { label: "Delivery Revenue", value: "₹120,000" },
      { label: "Orders Delivered", value: "800" },
      { label: "Active Delivery Customers", value: "600" },
    ],
  },
  hostel: {
    title: "Hostel Catering",
    description: "Performance and analytics for hostel catering services.",
    highlights: [
      { label: "Hostel Revenue", value: "₹90,000" },
      { label: "Hostel Bookings", value: "500" },
      { label: "Hostel Customers", value: "400" },
    ],
  },
  wedding: {
    title: "Wedding Catering",
    description: "Performance and analytics for wedding catering.",
    highlights: [
      { label: "Wedding Revenue", value: "₹120,000" },
      { label: "Wedding Bookings", value: "60" },
    ],
  },
  corporate: {
    title: "Corporate Catering",
    description: "Performance and analytics for corporate catering.",
    highlights: [
      { label: "Corporate Revenue", value: "₹90,000" },
      { label: "Corporate Bookings", value: "45" },
    ],
  },
  personal: {
    title: "Personal Catering",
    description: "Performance and analytics for personal catering.",
    highlights: [
      { label: "Personal Revenue", value: "₹50,000" },
      { label: "Personal Bookings", value: "28" },
    ],
  },
  birthday: {
    title: "Birthday Catering",
    description: "Performance and analytics for birthday catering.",
    highlights: [
      { label: "Birthday Revenue", value: "₹70,000" },
      { label: "Birthday Bookings", value: "38" },
    ],
  },
  other: {
    title: "Other Catering",
    description: "Performance and analytics for other catering types.",
    highlights: [
      { label: "Other Revenue", value: "₹30,000" },
      { label: "Other Bookings", value: "15" },
    ],
  },
};

const FoodCateringDashboard = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [cateringType, setCateringType] = useState("all");
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsRow, setDetailsRow] = useState(null);

  const handleAction = (row) => {
    setDetailsRow(row);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => setDetailsOpen(false);
  const handleDelete = () => {
    // Implement delete logic for selectedIDs
    setSelectedIDs([]);
  };

  const columns = [
    { field: "event", headerName: "Event Type", width: 140, renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1}>
        <FlatwareIcon fontSize="small" color="primary" />
        <Typography fontWeight={600}>{params.value}</Typography>
      </Box>
    ) },
    { field: "revenue", headerName: "Revenue", width: 120, renderCell: (params) => (
      <Typography fontWeight={700} color="primary">{params.value}</Typography>
    ) },
    { field: "bookings", headerName: "Bookings", width: 110 },
    { field: "customers", headerName: "Customers", width: 110 },
    { field: "menuItems", headerName: "Menu Items", width: 110 },
    { field: "peopleServed", headerName: "People Served", width: 130, renderCell: (params) => (
      <Chip icon={<GroupIcon />} label={params.value} size="small" color="info" />
    ) },
    { field: "designTheme", headerName: "Design/Theme", width: 130, renderCell: (params) => (
      <Chip icon={<BrushIcon />} label={params.value} size="small" color="secondary" />
    ) },
    { field: "rating", headerName: "Rating", width: 90, renderCell: (params) => (
      <Chip label={params.value} size="small" color="success" />
    ) },
    { field: "totalPeopleBooked", headerName: "Total People Booked", width: 160, valueGetter: (params) => {
      if (!params || !params.row) return 0;
      const bookings = Number(params.row.bookings) || 0;
      const peopleServed = Number(params.row.peopleServed) || 0;
      return bookings * peopleServed;
    }, renderCell: (params) => (
      <Typography fontWeight={700} color="secondary">{params.value}</Typography>
    ) },
  ];

  const barData = {
    all: [
    { name: "Jan", revenue: 52000, bookings: 180, customers: 120 },
    { name: "Feb", revenue: 48000, bookings: 160, customers: 110 },
    { name: "Mar", revenue: 57000, bookings: 210, customers: 140 },
    { name: "Apr", revenue: 60000, bookings: 230, customers: 150 },
    { name: "May", revenue: 65000, bookings: 250, customers: 170 },
    { name: "Jun", revenue: 68000, bookings: 270, customers: 180 },
    ],
    delivery: [
      { name: "Jan", revenue: 40000, bookings: 120, customers: 80 },
      { name: "Feb", revenue: 42000, bookings: 130, customers: 85 },
      { name: "Mar", revenue: 45000, bookings: 140, customers: 90 },
      { name: "Apr", revenue: 48000, bookings: 150, customers: 95 },
      { name: "May", revenue: 50000, bookings: 160, customers: 100 },
      { name: "Jun", revenue: 52000, bookings: 170, customers: 105 },
    ],
    hostel: [
      { name: "Jan", revenue: 30000, bookings: 80, customers: 60 },
      { name: "Feb", revenue: 32000, bookings: 85, customers: 65 },
      { name: "Mar", revenue: 34000, bookings: 90, customers: 70 },
      { name: "Apr", revenue: 36000, bookings: 95, customers: 75 },
      { name: "May", revenue: 38000, bookings: 100, customers: 80 },
      { name: "Jun", revenue: 40000, bookings: 105, customers: 85 },
    ],
    wedding: [
      { name: "Jan", revenue: 100000, bookings: 50, customers: 45 },
      { name: "Feb", revenue: 105000, bookings: 52, customers: 47 },
      { name: "Mar", revenue: 110000, bookings: 54, customers: 49 },
      { name: "Apr", revenue: 115000, bookings: 56, customers: 51 },
      { name: "May", revenue: 120000, bookings: 58, customers: 53 },
      { name: "Jun", revenue: 125000, bookings: 60, customers: 55 },
    ],
    corporate: [
      { name: "Jan", revenue: 80000, bookings: 40, customers: 35 },
      { name: "Feb", revenue: 82000, bookings: 41, customers: 36 },
      { name: "Mar", revenue: 84000, bookings: 42, customers: 37 },
      { name: "Apr", revenue: 86000, bookings: 43, customers: 38 },
      { name: "May", revenue: 88000, bookings: 44, customers: 39 },
      { name: "Jun", revenue: 90000, bookings: 45, customers: 40 },
    ],
    personal: [
      { name: "Jan", revenue: 45000, bookings: 25, customers: 22 },
      { name: "Feb", revenue: 46000, bookings: 26, customers: 23 },
      { name: "Mar", revenue: 47000, bookings: 27, customers: 24 },
      { name: "Apr", revenue: 48000, bookings: 28, customers: 25 },
      { name: "May", revenue: 49000, bookings: 29, customers: 26 },
      { name: "Jun", revenue: 50000, bookings: 30, customers: 27 },
    ],
    birthday: [
      { name: "Jan", revenue: 60000, bookings: 30, customers: 28 },
      { name: "Feb", revenue: 61000, bookings: 31, customers: 29 },
      { name: "Mar", revenue: 62000, bookings: 32, customers: 30 },
      { name: "Apr", revenue: 63000, bookings: 33, customers: 31 },
      { name: "May", revenue: 64000, bookings: 34, customers: 32 },
      { name: "Jun", revenue: 65000, bookings: 35, customers: 33 },
    ],
    other: [
      { name: "Jan", revenue: 25000, bookings: 15, customers: 13 },
      { name: "Feb", revenue: 26000, bookings: 16, customers: 14 },
      { name: "Mar", revenue: 27000, bookings: 17, customers: 15 },
      { name: "Apr", revenue: 28000, bookings: 18, customers: 16 },
      { name: "May", revenue: 29000, bookings: 19, customers: 17 },
      { name: "Jun", revenue: 30000, bookings: 20, customers: 18 },
    ],
  };

  const pieData = {
    all: [
    { name: "Wedding", value: 35, color: "#0088FE" },
    { name: "Corporate", value: 25, color: "#00C49F" },
    { name: "Birthday", value: 20, color: "#FFBB28" },
    { name: "Personal", value: 12, color: "#FF8042" },
    { name: "Other", value: 8, color: "#8884D8" },
    ],
    delivery: [
      { name: "Wedding", value: 20, color: "#0088FE" },
      { name: "Corporate", value: 15, color: "#00C49F" },
      { name: "Birthday", value: 10, color: "#FFBB28" },
      { name: "Personal", value: 5, color: "#FF8042" },
      { name: "Other", value: 3, color: "#8884D8" },
    ],
    hostel: [
      { name: "Wedding", value: 10, color: "#0088FE" },
      { name: "Corporate", value: 8, color: "#00C49F" },
      { name: "Birthday", value: 5, color: "#FFBB28" },
      { name: "Personal", value: 3, color: "#FF8042" },
      { name: "Other", value: 2, color: "#8884D8" },
    ],
    wedding: [
      { name: "Wedding", value: 100, color: "#0088FE" },
      { name: "Corporate", value: 80, color: "#00C49F" },
      { name: "Birthday", value: 60, color: "#FFBB28" },
      { name: "Personal", value: 40, color: "#FF8042" },
      { name: "Other", value: 20, color: "#8884D8" },
    ],
    corporate: [
      { name: "Wedding", value: 50, color: "#0088FE" },
      { name: "Corporate", value: 40, color: "#00C49F" },
      { name: "Birthday", value: 30, color: "#FFBB28" },
      { name: "Personal", value: 20, color: "#FF8042" },
      { name: "Other", value: 10, color: "#8884D8" },
    ],
    personal: [
      { name: "Wedding", value: 20, color: "#0088FE" },
      { name: "Corporate", value: 15, color: "#00C49F" },
      { name: "Birthday", value: 10, color: "#FFBB28" },
      { name: "Personal", value: 5, color: "#FF8042" },
      { name: "Other", value: 3, color: "#8884D8" },
    ],
    birthday: [
      { name: "Wedding", value: 10, color: "#0088FE" },
      { name: "Corporate", value: 8, color: "#00C49F" },
      { name: "Birthday", value: 6, color: "#FFBB28" },
      { name: "Personal", value: 4, color: "#FF8042" },
      { name: "Other", value: 2, color: "#8884D8" },
    ],
    other: [
      { name: "Wedding", value: 5, color: "#0088FE" },
      { name: "Corporate", value: 4, color: "#00C49F" },
      { name: "Birthday", value: 3, color: "#FFBB28" },
      { name: "Personal", value: 2, color: "#FF8042" },
      { name: "Other", value: 1, color: "#8884D8" },
    ],
  };

  const tableData = {
    all: [
      { id: 1, event: "Wedding", revenue: "₹120,000", bookings: 60, customers: 55, menuItems: 30, rating: "4.9", peopleServed: 300, designTheme: "Classic" },
      { id: 2, event: "Corporate", revenue: "₹90,000", bookings: 45, customers: 40, menuItems: 20, rating: "4.8", peopleServed: 180, designTheme: "Modern" },
      { id: 3, event: "Birthday", revenue: "₹70,000", bookings: 38, customers: 35, menuItems: 15, rating: "4.7", peopleServed: 90, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹50,000", bookings: 28, customers: 25, menuItems: 10, rating: "4.6", peopleServed: 60, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹30,000", bookings: 15, customers: 12, menuItems: 10, rating: "4.5", peopleServed: 40, designTheme: "Minimal" },
    ],
    delivery: [
      { id: 1, event: "Wedding", revenue: "₹80,000", bookings: 40, customers: 35, menuItems: 20, rating: "4.9", peopleServed: 200, designTheme: "Modern" },
      { id: 2, event: "Corporate", revenue: "₹60,000", bookings: 30, customers: 28, menuItems: 15, rating: "4.8", peopleServed: 120, designTheme: "Classic" },
      { id: 3, event: "Birthday", revenue: "₹40,000", bookings: 20, customers: 18, menuItems: 10, rating: "4.7", peopleServed: 60, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹25,000", bookings: 12, customers: 10, menuItems: 8, rating: "4.6", peopleServed: 40, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹15,000", bookings: 6, customers: 5, menuItems: 5, rating: "4.5", peopleServed: 25, designTheme: "Minimal" },
    ],
    hostel: [
      { id: 1, event: "Wedding", revenue: "₹60,000", bookings: 30, customers: 25, menuItems: 15, rating: "4.9", peopleServed: 150, designTheme: "Modern" },
      { id: 2, event: "Corporate", revenue: "₹45,000", bookings: 22, customers: 18, menuItems: 10, rating: "4.8", peopleServed: 90, designTheme: "Classic" },
      { id: 3, event: "Birthday", revenue: "₹30,000", bookings: 15, customers: 13, menuItems: 8, rating: "4.7", peopleServed: 50, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹20,000", bookings: 10, customers: 8, menuItems: 5, rating: "4.6", peopleServed: 30, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹10,000", bookings: 5, customers: 4, menuItems: 3, rating: "4.5", peopleServed: 20, designTheme: "Minimal" },
    ],
    wedding: [
      { id: 1, event: "Wedding", revenue: "₹100,000", bookings: 50, customers: 45, menuItems: 25, rating: "4.9", peopleServed: 250, designTheme: "Modern" },
      { id: 2, event: "Corporate", revenue: "₹80,000", bookings: 40, customers: 35, menuItems: 20, rating: "4.8", peopleServed: 180, designTheme: "Classic" },
      { id: 3, event: "Birthday", revenue: "₹60,000", bookings: 30, customers: 25, menuItems: 15, rating: "4.7", peopleServed: 120, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹40,000", bookings: 20, customers: 15, menuItems: 10, rating: "4.6", peopleServed: 80, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹20,000", bookings: 10, customers: 8, menuItems: 8, rating: "4.5", peopleServed: 50, designTheme: "Minimal" },
    ],
    corporate: [
      { id: 1, event: "Wedding", revenue: "₹50,000", bookings: 25, customers: 22, menuItems: 12, rating: "4.9", peopleServed: 120, designTheme: "Modern" },
      { id: 2, event: "Corporate", revenue: "₹40,000", bookings: 20, customers: 18, menuItems: 10, rating: "4.8", peopleServed: 90, designTheme: "Classic" },
      { id: 3, event: "Birthday", revenue: "₹30,000", bookings: 15, customers: 13, menuItems: 8, rating: "4.7", peopleServed: 60, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹20,000", bookings: 10, customers: 8, menuItems: 5, rating: "4.6", peopleServed: 40, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹10,000", bookings: 5, customers: 4, menuItems: 3, rating: "4.5", peopleServed: 25, designTheme: "Minimal" },
    ],
    personal: [
      { id: 1, event: "Wedding", revenue: "₹20,000", bookings: 10, customers: 8, menuItems: 5, rating: "4.9", peopleServed: 80, designTheme: "Modern" },
      { id: 2, event: "Corporate", revenue: "₹15,000", bookings: 8, customers: 6, menuItems: 4, rating: "4.8", peopleServed: 60, designTheme: "Classic" },
      { id: 3, event: "Birthday", revenue: "₹10,000", bookings: 5, customers: 4, menuItems: 3, rating: "4.7", peopleServed: 40, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹5,000", bookings: 3, customers: 2, menuItems: 2, rating: "4.6", peopleServed: 25, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹3,000", bookings: 2, customers: 1, menuItems: 1, rating: "4.5", peopleServed: 20, designTheme: "Minimal" },
    ],
    birthday: [
      { id: 1, event: "Wedding", revenue: "₹10,000", bookings: 5, customers: 4, menuItems: 3, rating: "4.9", peopleServed: 50, designTheme: "Modern" },
      { id: 2, event: "Corporate", revenue: "₹8,000", bookings: 4, customers: 3, menuItems: 2, rating: "4.8", peopleServed: 30, designTheme: "Classic" },
      { id: 3, event: "Birthday", revenue: "₹6,000", bookings: 3, customers: 2, menuItems: 1, rating: "4.7", peopleServed: 20, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹4,000", bookings: 2, customers: 1, menuItems: 1, rating: "4.6", peopleServed: 15, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹2,000", bookings: 1, customers: 1, menuItems: 1, rating: "4.5", peopleServed: 10, designTheme: "Minimal" },
    ],
    other: [
      { id: 1, event: "Wedding", revenue: "₹5,000", bookings: 3, customers: 2, menuItems: 1, rating: "4.9", peopleServed: 30, designTheme: "Modern" },
      { id: 2, event: "Corporate", revenue: "₹4,000", bookings: 2, customers: 1, menuItems: 1, rating: "4.8", peopleServed: 20, designTheme: "Classic" },
      { id: 3, event: "Birthday", revenue: "₹3,000", bookings: 2, customers: 1, menuItems: 1, rating: "4.7", peopleServed: 15, designTheme: "Fun" },
      { id: 4, event: "Personal", revenue: "₹2,000", bookings: 1, customers: 1, menuItems: 1, rating: "4.6", peopleServed: 10, designTheme: "Traditional" },
      { id: 5, event: "Other", revenue: "₹1,000", bookings: 1, customers: 1, menuItems: 1, rating: "4.5", peopleServed: 5, designTheme: "Minimal" },
    ],
  };

  const weeklyTrends = {
    all: [
    { week: "Week 1", revenue: 65000, bookings: 250, customers: 170, satisfaction: 4.7 },
    { week: "Week 2", revenue: 60000, bookings: 230, customers: 150, satisfaction: 4.8 },
    { week: "Week 3", revenue: 57000, bookings: 210, customers: 140, satisfaction: 4.9 },
    { week: "Week 4", revenue: 68000, bookings: 270, customers: 180, satisfaction: 4.9 },
    ],
    delivery: [
      { week: "Week 1", revenue: 50000, bookings: 180, customers: 120, satisfaction: 4.8 },
      { week: "Week 2", revenue: 48000, bookings: 170, customers: 115, satisfaction: 4.9 },
      { week: "Week 3", revenue: 52000, bookings: 190, customers: 130, satisfaction: 4.9 },
      { week: "Week 4", revenue: 55000, bookings: 200, customers: 135, satisfaction: 4.9 },
    ],
    hostel: [
      { week: "Week 1", revenue: 35000, bookings: 100, customers: 80, satisfaction: 4.7 },
      { week: "Week 2", revenue: 36000, bookings: 105, customers: 85, satisfaction: 4.8 },
      { week: "Week 3", revenue: 37000, bookings: 110, customers: 90, satisfaction: 4.9 },
      { week: "Week 4", revenue: 38000, bookings: 115, customers: 95, satisfaction: 4.9 },
    ],
    wedding: [
      { week: "Week 1", revenue: 90000, bookings: 45, customers: 40, satisfaction: 4.8 },
      { week: "Week 2", revenue: 92000, bookings: 46, customers: 41, satisfaction: 4.9 },
      { week: "Week 3", revenue: 94000, bookings: 47, customers: 42, satisfaction: 4.9 },
      { week: "Week 4", revenue: 96000, bookings: 48, customers: 43, satisfaction: 4.9 },
    ],
    corporate: [
      { week: "Week 1", revenue: 75000, bookings: 35, customers: 32, satisfaction: 4.7 },
      { week: "Week 2", revenue: 72000, bookings: 34, customers: 31, satisfaction: 4.8 },
      { week: "Week 3", revenue: 70000, bookings: 33, customers: 30, satisfaction: 4.9 },
      { week: "Week 4", revenue: 73000, bookings: 34, customers: 31, satisfaction: 4.9 },
    ],
    personal: [
      { week: "Week 1", revenue: 40000, bookings: 20, customers: 15, satisfaction: 4.8 },
      { week: "Week 2", revenue: 41000, bookings: 21, customers: 16, satisfaction: 4.9 },
      { week: "Week 3", revenue: 42000, bookings: 22, customers: 17, satisfaction: 4.9 },
      { week: "Week 4", revenue: 43000, bookings: 23, customers: 18, satisfaction: 4.9 },
    ],
    birthday: [
      { week: "Week 1", revenue: 55000, bookings: 25, customers: 20, satisfaction: 4.7 },
      { week: "Week 2", revenue: 56000, bookings: 26, customers: 21, satisfaction: 4.8 },
      { week: "Week 3", revenue: 57000, bookings: 27, customers: 22, satisfaction: 4.9 },
      { week: "Week 4", revenue: 58000, bookings: 28, customers: 23, satisfaction: 4.9 },
    ],
    other: [
      { week: "Week 1", revenue: 20000, bookings: 10, customers: 8, satisfaction: 4.8 },
      { week: "Week 2", revenue: 21000, bookings: 11, customers: 9, satisfaction: 4.9 },
      { week: "Week 3", revenue: 22000, bookings: 12, customers: 10, satisfaction: 4.9 },
      { week: "Week 4", revenue: 23000, bookings: 13, customers: 11, satisfaction: 4.9 },
    ],
  };

  const chefPerformance = {
    all: [
    { name: "Chef Arjun", bookings: 32, rating: 4.9, revenue: 85000, specialty: "Wedding" },
    { name: "Chef Priya", bookings: 28, rating: 4.8, revenue: 72000, specialty: "Corporate" },
    { name: "Chef Rohan", bookings: 25, rating: 4.7, revenue: 68000, specialty: "Birthday" },
    { name: "Chef Meera", bookings: 20, rating: 4.6, revenue: 55000, specialty: "Personal" },
    { name: "Chef Sunil", bookings: 15, rating: 4.5, revenue: 42000, specialty: "Other" },
    ],
    delivery: [
      { name: "Chef Arjun", bookings: 20, rating: 4.9, revenue: 60000, specialty: "Wedding" },
      { name: "Chef Priya", bookings: 18, rating: 4.8, revenue: 50000, specialty: "Corporate" },
      { name: "Chef Rohan", bookings: 15, rating: 4.7, revenue: 40000, specialty: "Birthday" },
      { name: "Chef Meera", bookings: 12, rating: 4.6, revenue: 30000, specialty: "Personal" },
      { name: "Chef Sunil", bookings: 10, rating: 4.5, revenue: 20000, specialty: "Other" },
    ],
    hostel: [
      { name: "Chef Arjun", bookings: 10, rating: 4.9, revenue: 30000, specialty: "Wedding" },
      { name: "Chef Priya", bookings: 8, rating: 4.8, revenue: 25000, specialty: "Corporate" },
      { name: "Chef Rohan", bookings: 6, rating: 4.7, revenue: 20000, specialty: "Birthday" },
      { name: "Chef Meera", bookings: 5, rating: 4.6, revenue: 15000, specialty: "Personal" },
      { name: "Chef Sunil", bookings: 4, rating: 4.5, revenue: 10000, specialty: "Other" },
    ],
    wedding: [
      { name: "Chef Arjun", bookings: 10, rating: 4.9, revenue: 50000, specialty: "Wedding" },
      { name: "Chef Priya", bookings: 8, rating: 4.8, revenue: 40000, specialty: "Corporate" },
      { name: "Chef Rohan", bookings: 6, rating: 4.7, revenue: 30000, specialty: "Birthday" },
      { name: "Chef Meera", bookings: 4, rating: 4.6, revenue: 20000, specialty: "Personal" },
      { name: "Chef Sunil", bookings: 2, rating: 4.5, revenue: 10000, specialty: "Other" },
    ],
    corporate: [
      { name: "Chef Arjun", bookings: 8, rating: 4.9, revenue: 40000, specialty: "Wedding" },
      { name: "Chef Priya", bookings: 6, rating: 4.8, revenue: 30000, specialty: "Corporate" },
      { name: "Chef Rohan", bookings: 5, rating: 4.7, revenue: 25000, specialty: "Birthday" },
      { name: "Chef Meera", bookings: 4, rating: 4.6, revenue: 20000, specialty: "Personal" },
      { name: "Chef Sunil", bookings: 3, rating: 4.5, revenue: 15000, specialty: "Other" },
    ],
    personal: [
      { name: "Chef Arjun", bookings: 6, rating: 4.9, revenue: 30000, specialty: "Wedding" },
      { name: "Chef Priya", bookings: 5, rating: 4.8, revenue: 25000, specialty: "Corporate" },
      { name: "Chef Rohan", bookings: 4, rating: 4.7, revenue: 20000, specialty: "Birthday" },
      { name: "Chef Meera", bookings: 3, rating: 4.6, revenue: 15000, specialty: "Personal" },
      { name: "Chef Sunil", bookings: 2, rating: 4.5, revenue: 10000, specialty: "Other" },
    ],
    birthday: [
      { name: "Chef Arjun", bookings: 4, rating: 4.9, revenue: 20000, specialty: "Wedding" },
      { name: "Chef Priya", bookings: 3, rating: 4.8, revenue: 15000, specialty: "Corporate" },
      { name: "Chef Rohan", bookings: 2, rating: 4.7, revenue: 10000, specialty: "Birthday" },
      { name: "Chef Meera", bookings: 2, rating: 4.6, revenue: 10000, specialty: "Personal" },
      { name: "Chef Sunil", bookings: 1, rating: 4.5, revenue: 5000, specialty: "Other" },
    ],
    other: [
      { name: "Chef Arjun", bookings: 2, rating: 4.9, revenue: 10000, specialty: "Wedding" },
      { name: "Chef Priya", bookings: 1, rating: 4.8, revenue: 8000, specialty: "Corporate" },
      { name: "Chef Rohan", bookings: 1, rating: 4.7, revenue: 6000, specialty: "Birthday" },
      { name: "Chef Meera", bookings: 1, rating: 4.6, revenue: 5000, specialty: "Personal" },
      { name: "Chef Sunil", bookings: 1, rating: 4.5, revenue: 3000, specialty: "Other" },
    ],
  };

  const customerSatisfaction = {
    all: [
      { aspect: "Food Quality", rating: 4.9 },
      { aspect: "Service", rating: 4.8 },
      { aspect: "Presentation", rating: 4.7 },
      { aspect: "Punctuality", rating: 4.6 },
      { aspect: "Overall Experience", rating: 4.8 },
    ],
    delivery: [
      { aspect: "Food Quality", rating: 4.9 },
      { aspect: "Service", rating: 4.8 },
      { aspect: "Presentation", rating: 4.7 },
      { aspect: "Punctuality", rating: 4.6 },
      { aspect: "Overall Experience", rating: 4.8 },
    ],
    hostel: [
      { aspect: "Food Quality", rating: 4.9 },
      { aspect: "Service", rating: 4.8 },
      { aspect: "Presentation", rating: 4.7 },
      { aspect: "Punctuality", rating: 4.6 },
      { aspect: "Overall Experience", rating: 4.8 },
    ],
    wedding: [
      { aspect: "Food Quality", rating: 4.9 },
      { aspect: "Service", rating: 4.8 },
      { aspect: "Presentation", rating: 4.7 },
      { aspect: "Punctuality", rating: 4.6 },
      { aspect: "Overall Experience", rating: 4.8 },
    ],
    corporate: [
      { aspect: "Food Quality", rating: 4.9 },
      { aspect: "Service", rating: 4.8 },
      { aspect: "Presentation", rating: 4.7 },
      { aspect: "Punctuality", rating: 4.6 },
      { aspect: "Overall Experience", rating: 4.8 },
    ],
    personal: [
      { aspect: "Food Quality", rating: 4.9 },
      { aspect: "Service", rating: 4.8 },
      { aspect: "Presentation", rating: 4.7 },
      { aspect: "Punctuality", rating: 4.6 },
      { aspect: "Overall Experience", rating: 4.8 },
    ],
    birthday: [
      { aspect: "Food Quality", rating: 4.9 },
      { aspect: "Service", rating: 4.8 },
      { aspect: "Presentation", rating: 4.7 },
      { aspect: "Punctuality", rating: 4.6 },
      { aspect: "Overall Experience", rating: 4.8 },
    ],
    other: [
    { aspect: "Food Quality", rating: 4.9 },
    { aspect: "Service", rating: 4.8 },
    { aspect: "Presentation", rating: 4.7 },
    { aspect: "Punctuality", rating: 4.6 },
    { aspect: "Overall Experience", rating: 4.8 },
    ],
  };

  const getTableColumns = (columns, handleAction) => [
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleAction(params.row)}>
          <InfoIcon />
        </IconButton>
      ),
      sortable: false,
      filterable: false,
      disableExport: true,
    },
    ...columns,
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <CommonHeader role="admin" />
        <Box
          sx={{
          flexGrow: 1, 
            p: { xs: 1, sm: 2, md: 3 },
          pt: 10,
            mt: { xs: 8, sm: 10 }, // Ensure content is below header
          overflow: "auto",
          height: "100vh",
            backgroundColor: theme.palette.background.default,
            transition: "background-color 0.3s",
          }}
        >
          {/* Tabs for Catering Type */}
          <Paper elevation={2} sx={{ mb: 3, bgcolor: theme.palette.background.paper }}>
            <Tabs
              value={cateringType}
              onChange={(_, v) => setCateringType(v)}
              variant="scrollable"
              scrollButtons="auto"
              indicatorColor="primary"
              textColor="primary"
            >
              {cateringTypes.map((type) => (
                <Tab
                  key={type.value}
                  value={type.value}
                  label={type.label}
                  icon={type.icon || null}
                  iconPosition={type.icon ? "start" : undefined}
                  sx={{ minWidth: 120, fontWeight: 600 }}
                />
              ))}
            </Tabs>
          </Paper>

          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} mb={3} flexDirection={{ xs: "column", md: "row" }} gap={2}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                Food Catering Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cateringType === "all"
                  ? "Comprehensive overview of food catering business performance"
                  : `Analytics for ${cateringTypes.find((t) => t.value === cateringType)?.label || "Selected"} Catering`}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                placeholder="Search events..."
                size="small"
                InputProps={{ 
                  endAdornment: <SearchIcon />, 
                  sx: { bgcolor: theme.palette.background.paper, borderRadius: 1 },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="contained" color="primary" startIcon={<FlatwareIcon />}>
                Add Event
              </Button>
            </Box>
          </Box>

          {/* Counters */}
          <Grid container spacing={3} mb={4}>
            {(allCounters[cateringType] || []).map((counter, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s",
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: theme.shadows[2],
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[6] },
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Avatar sx={{ bgcolor: theme.palette[counter.color.split('.')[0]][counter.color.split('.')[1]], width: 48, height: 48 }}>
                        {counter.icon}
                      </Avatar>
                      <Chip 
                        label={counter.trend} 
                        size="small"
                        color={counter.trend.startsWith('+') ? 'success' : 'error'}
                        sx={{ fontSize: '0.75rem' }}
                      />
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

          {/* Charts */}
          <Grid container spacing={3} mb={4}>
            {/* Revenue and Bookings Trend */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[2] }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
                    Revenue & Bookings Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={barData[cateringType]}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                          name === 'revenue' ? 'Revenue' : name === 'bookings' ? 'Bookings' : 'Customers'
                        ]}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke={theme.palette.info.main}
                        strokeWidth={2}
                        dot={{ fill: theme.palette.info.main, strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Event Distribution */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[2] }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
                    Event Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData[cateringType]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData[cateringType].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value, name) => [`${value}%`, name]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Additional Analytics Section */}
          <Grid container spacing={3} mb={4}>
            {/* Weekly Trends */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Weekly Performance Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={weeklyTrends[cateringType]}>
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                      <RechartsTooltip />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        fill={theme.palette.primary.main}
                        stroke={theme.palette.primary.main}
                        fillOpacity={0.3}
                        name="Revenue"
                      />
                      <Bar yAxisId="left" dataKey="bookings" fill={theme.palette.info.main} radius={[4, 4, 0, 0]} name="Bookings" />
                      <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke={theme.palette.warning.main} strokeWidth={2} name="Satisfaction" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Customer Satisfaction Radar */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                    Customer Satisfaction Metrics
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={customerSatisfaction[cateringType]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="aspect" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Satisfaction" dataKey="rating" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} fillOpacity={0.3} />
                      <RechartsTooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chef Performance */}
          <Card sx={{ mb: 4, transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
                Chef Performance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={chefPerformance[cateringType]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : name === 'bookings' ? 'Bookings' : 'Rating'
                  ]} />
                  <Legend />
                  <Bar dataKey="bookings" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} name="Bookings" />
                  <Bar dataKey="rating" fill={theme.palette.success.main} radius={[4, 4, 0, 0]} name="Rating" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Event Performance Table */}
          <Card sx={{ bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[2], mb: 4 }}>
            <CardContent>
              {/* Dynamic Info Card */}
              <Box mb={3} p={2} borderRadius={3} boxShadow={1} bgcolor={theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100'}>
                <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
                  {cateringTypeInfo[cateringType].title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {cateringTypeInfo[cateringType].description}
                </Typography>
                <Grid container spacing={2}>
                  {cateringTypeInfo[cateringType].highlights.map((h, idx) => (
                    <Grid item key={idx} xs={12} sm={6} md={4}>
                      <Box p={2} borderRadius={2} bgcolor={theme.palette.background.paper} boxShadow={1} display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography variant="caption" color="text.secondary">{h.label}</Typography>
                        <Typography variant="subtitle1" fontWeight={700}>{h.value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {/* Modern DataGrid Table */}
              <Box sx={{ width: "100%", height: 420 }}>
                <DataGrid
                  rows={tableData[cateringType] || []}
                  columns={getTableColumns(columns, handleAction)}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={(ids) => setSelectedIDs(ids)}
                  rowSelectionModel={selectedIDs}
                  components={{ Toolbar: CustomTableToolbar }}
                  componentsProps={{
                    toolbar: {
                      rows: tableData[cateringType] || [],
                      columns: columns,
                      selectedIDs: selectedIDs,
                      handleDelete: handleDelete,
                    },
                  }}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 3,
                    boxShadow: theme.shadows[3],
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#23272f' : '#f9fafb',
                    },
                    '& .MuiDataGrid-row:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#e0e7ef',
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      background: theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
                      fontWeight: 700,
                      fontSize: '1rem',
                    },
                  }}
                  getRowId={(row) => row.id}
                />
                <Dialog open={detailsOpen} onClose={handleDetailsClose} maxWidth="sm" fullWidth>
                  <DialogTitle>Event Details</DialogTitle>
                  <DialogContent>
                    {detailsRow && (
                      <Box p={2}>
                        <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
                          <FlatwareIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {detailsRow.event}
                          </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Revenue</Typography>
                            <Typography fontWeight={700} color="primary">{detailsRow.revenue}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Bookings</Typography>
                            <Typography fontWeight={700}>{detailsRow.bookings}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Customers</Typography>
                            <Typography fontWeight={700}>{detailsRow.customers}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Menu Items</Typography>
                            <Typography fontWeight={700}>{detailsRow.menuItems}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">People Served</Typography>
                            <Chip icon={<GroupIcon />} label={detailsRow.peopleServed} size="small" color="info" />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Design/Theme</Typography>
                            <Chip icon={<BrushIcon />} label={detailsRow.designTheme} size="small" color="secondary" />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Rating</Typography>
                            <Chip label={detailsRow.rating} size="small" color="success" />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </DialogContent>
                </Dialog>
                          </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default FoodCateringDashboard; 