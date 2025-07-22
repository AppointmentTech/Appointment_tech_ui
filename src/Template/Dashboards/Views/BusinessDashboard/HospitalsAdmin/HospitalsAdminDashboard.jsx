import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "ContextOrRedux/ThemeProvider.js";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  CardActionArea,
  Divider,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import BedIcon from "@mui/icons-material/Hotel";
import WardIcon from "@mui/icons-material/MeetingRoom";
import InventoryIcon from "@mui/icons-material/Inventory";
import TheaterIcon from "@mui/icons-material/LocalHospital";
import LabIcon from "@mui/icons-material/Science";
import AmbulanceIcon from "@mui/icons-material/LocalShipping";
import AssetIcon from "@mui/icons-material/DevicesOther";
import VisitorIcon from "@mui/icons-material/Group";
import DischargeIcon from "@mui/icons-material/ExitToApp";
import PatientIcon from "@mui/icons-material/Person";
import AppointmentIcon from "@mui/icons-material/Event";
import StaffIcon from "@mui/icons-material/People";
import BillingIcon from "@mui/icons-material/Receipt";
import FoodIcon from "@mui/icons-material/Restaurant";
import ReportIcon from "@mui/icons-material/BarChart";
import MaintenanceIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Hotel from "@mui/icons-material/Hotel";
import People from "@mui/icons-material/People";
import Star from "@mui/icons-material/Star";
import Schedule from "@mui/icons-material/Schedule";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from "recharts";
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupIcon from '@mui/icons-material/Group';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmergencyIcon from '@mui/icons-material/ReportProblem';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';

const metrics = [
  {
    title: "Total Revenue",
    value: "₹5,45,000",
    change: "+10.5%",
    trend: "up",
    icon: <AttachMoney sx={{ fontSize: 32, color: "#4CAF50" }} />,
    color: "#4CAF50",
  },
  {
    title: "Total Appointments",
    value: "2,147",
    change: "+6.2%",
    trend: "up",
    icon: <Hotel sx={{ fontSize: 32, color: "#2196F3" }} />,
    color: "#2196F3",
  },
  {
    title: "Active Patients",
    value: "1,892",
    change: "+4.1%",
    trend: "up",
    icon: <People sx={{ fontSize: 32, color: "#FF9800" }} />,
    color: "#FF9800",
  },
  {
    title: "Bed Occupancy Rate",
    value: "88.2%",
    change: "+1.3%",
    trend: "up",
    icon: <Star sx={{ fontSize: 32, color: "#9C27B0" }} />,
    color: "#9C27B0",
  },
  {
    title: "Pending Admissions",
    value: "13",
    change: "-8.2%",
    trend: "down",
    icon: <Schedule sx={{ fontSize: 32, color: "#F44336" }} />,
    color: "#F44336",
  },
  {
    title: "Patient Rating",
    value: "4.7/5",
    change: "+0.1",
    trend: "up",
    icon: <Star sx={{ fontSize: 32, color: "#FFC107" }} />,
    color: "#FFC107",
  },
];

const revenueData = [
  { month: "Jan", revenue: 65000, appointments: 65 },
  { month: "Feb", revenue: 72000, appointments: 72 },
  { month: "Mar", revenue: 68000, appointments: 68 },
  { month: "Apr", revenue: 81000, appointments: 81 },
  { month: "May", revenue: 75000, appointments: 75 },
  { month: "Jun", revenue: 87000, appointments: 87 },
];

const occupancyData = [
  { name: "Occupied", value: 88, color: "#4CAF50" },
  { name: "Available", value: 12, color: "#2196F3" },
];

const patientSatisfaction = [
  { aspect: "Cleanliness", rating: 4.8 },
  { aspect: "Staff Service", rating: 4.6 },
  { aspect: "Bed Comfort", rating: 4.7 },
  { aspect: "Doctor Care", rating: 4.9 },
  { aspect: "Wait Time", rating: 4.5 },
];

const recentActivity = [
  { id: 1, type: "Admission", patient: "John Doe", time: "2 min ago", status: "success" },
  { id: 2, type: "Discharge", patient: "Jane Smith", time: "10 min ago", status: "info" },
  { id: 3, type: "Alert", patient: "ICU Bed Low", time: "20 min ago", status: "warning" },
  { id: 4, type: "Admission", patient: "Sam Wilson", time: "30 min ago", status: "success" },
  { id: 5, type: "Maintenance", patient: "Ward 3", time: "1 hr ago", status: "error" },
];

// Mock data for new analysis widgets
const admissionsDischarges = [
  { month: 'Jan', admissions: 120, discharges: 110 },
  { month: 'Feb', admissions: 135, discharges: 125 },
  { month: 'Mar', admissions: 140, discharges: 130 },
  { month: 'Apr', admissions: 150, discharges: 140 },
  { month: 'May', admissions: 160, discharges: 150 },
  { month: 'Jun', admissions: 170, discharges: 160 },
];
const departmentStats = [
  { department: 'ICU', patients: 40 },
  { department: 'General', patients: 80 },
  { department: 'Emergency', patients: 30 },
  { department: 'Surgery', patients: 25 },
  { department: 'Maternity', patients: 20 },
];
const staffUtilization = [
  { staff: 'Doctors', utilization: 90 },
  { staff: 'Nurses', utilization: 85 },
  { staff: 'Technicians', utilization: 70 },
  { staff: 'Support', utilization: 60 },
];
const topWards = [
  { ward: 'General', occupancy: 95 },
  { ward: 'ICU', occupancy: 92 },
  { ward: 'Emergency', occupancy: 90 },
  { ward: 'Surgery', occupancy: 88 },
  { ward: 'Maternity', occupancy: 85 },
];
const alerts = [
  { id: 1, type: 'warning', message: 'ICU bed occupancy above 90%' },
  { id: 2, type: 'error', message: 'Pharmacy stock low: Paracetamol' },
  { id: 3, type: 'info', message: 'Scheduled maintenance: MRI machine' },
  { id: 4, type: 'success', message: 'All staff shifts assigned' },
];

const maintenanceRequests = [
  { id: 'MR001', room: 'A-101', issue: 'AC not working', assigned: 'Tech Team', priority: 'High', status: 'In Progress' },
  { id: 'MR002', room: 'B-205', issue: 'Water leakage', assigned: 'Plumber', priority: 'Medium', status: 'Completed' },
  { id: 'MR003', room: 'C-103', issue: 'Light flickering', assigned: 'Electrician', priority: 'Low', status: 'Pending' },
  { id: 'MR004', room: 'D-201', issue: 'Broken window', assigned: 'Carpenter', priority: 'High', status: 'In Progress' },
];

const patientTypeDist = [
  { type: 'Inpatient', value: 60, color: '#6366f1' },
  { type: 'Outpatient', value: 30, color: '#06b6d4' },
  { type: 'Emergency', value: 10, color: '#f59e42' },
];
const genderRatio = [
  { type: 'Male', value: 55, color: '#3b82f6' },
  { type: 'Female', value: 45, color: '#f472b6' },
];
const insuranceCoverage = [
  { type: 'Insured', value: 70, color: '#10b981' },
  { type: 'Uninsured', value: 30, color: '#f87171' },
];
const topDoctors = [
  { name: 'Dr. Smith', patients: 120 },
  { name: 'Dr. Lee', patients: 110 },
  { name: 'Dr. Patel', patients: 105 },
  { name: 'Dr. Kim', patients: 98 },
  { name: 'Dr. Brown', patients: 90 },
];
const departmentOccupancy = [
  { department: 'ICU', occupied: 18, available: 2 },
  { department: 'General', occupied: 70, available: 10 },
  { department: 'Emergency', occupied: 25, available: 5 },
  { department: 'Surgery', occupied: 20, available: 5 },
  { department: 'Maternity', occupied: 15, available: 5 },
];
const atAGlance = [
  { label: "Today's Appointments", value: 48, icon: <EventAvailableIcon color="primary" />, color: 'primary.main' },
  { label: "Today's Discharges", value: 12, icon: <DoneAllIcon color="success" />, color: 'success.main' },
  { label: "Emergency Cases", value: 5, icon: <EmergencyIcon color="error" />, color: 'error.main' },
];
const systemHealth = [
  { label: 'Server', status: 'Online', icon: <CheckCircleIcon color="success" /> },
  { label: 'API', status: 'Online', icon: <CheckCircleIcon color="success" /> },
  { label: 'Database', status: 'Warning', icon: <WarningAmberIcon color="warning" /> },
  { label: 'Backup', status: 'Error', icon: <ErrorIcon color="error" /> },
];
const topDiagnoses = [
  { name: 'Flu', count: 32 },
  { name: 'Fracture', count: 28 },
  { name: 'Diabetes', count: 25 },
  { name: 'Hypertension', count: 22 },
  { name: 'Asthma', count: 20 },
];
const topEquipment = [
  { name: 'ECG Machine', uses: 120 },
  { name: 'X-Ray', uses: 110 },
  { name: 'MRI', uses: 90 },
  { name: 'Ventilator', uses: 80 },
  { name: 'Ultrasound', uses: 75 },
];

export default function HospitalsAdminDashboard() {
  const theme = useTheme();
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // Define backgrounds for light/dark
  const bgGradient = darkMode
    ? "linear-gradient(135deg, #181c2a 0%, #232946 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  const cardGradient = darkMode
    ? "linear-gradient(135deg, #232946 0%, #181c2a 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
  const cardGradientAlt = darkMode
    ? "linear-gradient(135deg, #232946 0%, #232946 100%)"
    : "linear-gradient(135deg, #f0fdfa 0%, #e0e7ef 100%)";
  const cardText = darkMode ? '#e2e8f0' : '#1e293b';

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: bgGradient }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, pt: 10, overflow: "auto" }}>
        {/* Header and Action Bar */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} mb={3} gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ background: darkMode ? 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)' : 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AppointmentTech
            </Typography>
            <Typography variant="h6" fontWeight={700} color={darkMode ? '#fbbf24' : 'primary.main'}>
              Hospital Management Dashboard
            </Typography>
            <Typography variant="body2" color={darkMode ? '#cbd5e1' : 'text.secondary'}>
              Comprehensive monitoring and management of hospital operations, bookings, and performance metrics
            </Typography>
            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" color={darkMode ? '#a3e635' : 'success.main'}>Last updated: 7/21/2025</Typography>
              <Chip label="Live Data" color="success" size="small" icon={<FiberManualRecordIcon sx={{ fontSize: 12 }} />} />
              <Chip label="24/7 Monitoring" color="info" size="small" icon={<MonitorHeartIcon sx={{ fontSize: 16 }} />} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={{ xs: 2, md: 0 }}>
            <Button variant="outlined" color="primary" startIcon={<FilterListIcon />} sx={{ borderRadius: 2, fontWeight: 600 }}>This Month</Button>
            <Box sx={{ position: 'relative' }}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search patients, rooms, ..."
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: darkMode ? '#a5b4fc' : 'primary.main' }} />,
                  sx: { borderRadius: 2, bgcolor: darkMode ? '#232946' : '#fff', color: cardText }
                }}
                sx={{ minWidth: 220 }}
              />
            </Box>
            <Button variant="contained" color="primary" startIcon={<RefreshIcon />} sx={{ borderRadius: 2, fontWeight: 600 }}>Refresh</Button>
            <Button variant="contained" color="warning" startIcon={<FileDownloadIcon />} sx={{ borderRadius: 2, fontWeight: 600 }}>Export</Button>
          </Box>
        </Box>

        {/* At a Glance Widgets */}
        <Grid container spacing={2} mb={2}>
          {atAGlance.map((item) => (
            <Grid item xs={12} sm={4} key={item.label}>
              <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, background: cardGradient, color: cardText, borderRadius: 2, boxShadow: 2 }}>
                {item.icon}
                <Box>
                  <Typography variant="h6" fontWeight={700} color={item.color}>{item.value}</Typography>
                  <Typography variant="body2" color={cardText}>{item.label}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Key Metrics Cards */}
        <Typography variant="h6" fontWeight={700} mb={1} color={darkMode ? '#fbbf24' : 'primary.main'}>Key Metrics</Typography>
        <Grid container spacing={2} mb={2}>
          {metrics.map((metric, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={metric.title}>
              <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: 2, borderRadius: 2, background: cardGradient, color: cardText, minHeight: 120 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Avatar sx={{ bgcolor: metric.color, width: 36, height: 36, boxShadow: 2 }}>{metric.icon}</Avatar>
                  <Typography variant="subtitle2" fontWeight={700} color={darkMode ? '#fbbf24' : 'primary.main'}>{metric.title}</Typography>
                </Box>
                <Typography variant="h5" fontWeight={800} color={cardText}>{metric.value}</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Typography variant="body2" color={metric.trend === 'up' ? 'success.main' : 'error.main'} fontWeight={700}>{metric.change}</Typography>
                  <Typography variant="caption" color={metric.trend === 'up' ? 'success.main' : 'error.main'}>{metric.trend === 'up' ? '▲' : '▼'}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Charts Section */}
        <Typography variant="h6" fontWeight={700} mb={1} color={darkMode ? '#fbbf24' : 'primary.main'}>Main Analytics</Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradientAlt, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Revenue & Bookings Trend
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" stroke={darkMode ? '#cbd5e1' : undefined} />
                  <YAxis stroke={darkMode ? '#cbd5e1' : undefined} />
                  <Bar dataKey="revenue" fill="#4CAF50" name="Revenue" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="appointments" fill="#2196F3" name="Appointments" radius={[8, 8, 0, 0]} />
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradientAlt, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Occupancy Rate
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradientAlt, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Admissions vs. Discharges
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={admissionsDischarges}>
                  <XAxis dataKey="month" stroke={darkMode ? '#cbd5e1' : undefined} />
                  <YAxis stroke={darkMode ? '#cbd5e1' : undefined} />
                  <Legend />
                  <Area type="monotone" dataKey="admissions" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} name="Admissions" />
                  <Area type="monotone" dataKey="discharges" stroke="#f59e42" fill="#f59e42" fillOpacity={0.2} name="Discharges" />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradientAlt, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Patient Type Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={patientTypeDist} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={60} label>
                    {patientTypeDist.map((entry, idx) => (
                      <Cell key={`cell-pt-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradientAlt, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Gender Ratio
              </Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={genderRatio} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={60} label>
                    {genderRatio.map((entry, idx) => (
                      <Cell key={`cell-gr-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Department Occupancy
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={departmentOccupancy} layout="vertical">
                  <XAxis type="number" stroke={darkMode ? '#cbd5e1' : undefined} />
                  <YAxis dataKey="department" type="category" stroke={darkMode ? '#cbd5e1' : undefined} />
                  <Bar dataKey="occupied" stackId="a" fill="#6366f1" name="Occupied" barSize={18} radius={[0, 8, 8, 0]} />
                  <Bar dataKey="available" stackId="a" fill="#10b981" name="Available" barSize={18} radius={[0, 8, 8, 0]} />
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Top Doctors by Patients
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={topDoctors} layout="vertical">
                  <XAxis type="number" stroke={darkMode ? '#cbd5e1' : undefined} />
                  <YAxis dataKey="name" type="category" stroke={darkMode ? '#cbd5e1' : undefined} />
                  <Bar dataKey="patients" fill="#f59e42" name="Patients" barSize={18} radius={[0, 8, 8, 0]} />
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Customer Satisfaction & Maintenance */}
        <Typography variant="h6" fontWeight={700} mb={1} color={darkMode ? '#fbbf24' : 'primary.main'}>Customer Satisfaction & Maintenance</Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Customer Satisfaction Metrics
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart cx="50%" cy="50%" outerRadius={80} data={patientSatisfaction}>
                  <PolarGrid stroke={darkMode ? '#334155' : undefined} />
                  <PolarAngleAxis dataKey="aspect" stroke={darkMode ? '#cbd5e1' : undefined} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} stroke={darkMode ? '#cbd5e1' : undefined} />
                  <Radar name="Rating" dataKey="rating" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.3} />
                  <Legend />
                  <RechartsTooltip contentStyle={{ background: darkMode ? '#232946' : '#fff', color: cardText }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText, minHeight: 220 }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Active Maintenance Requests
              </Typography>
              <Box sx={{ maxHeight: 180, overflowY: 'auto', pr: 1 }}>
                {maintenanceRequests.map(req => (
                  <Box key={req.id} mb={2} p={2} borderRadius={2} bgcolor={darkMode ? '#232946' : '#f3f4f6'} display="flex" flexDirection="column" gap={1} boxShadow={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" fontWeight={700}>{req.id} - {req.room}</Typography>
                      <Chip label={req.priority} color={req.priority === 'High' ? 'error' : req.priority === 'Medium' ? 'warning' : 'success'} size="small" />
                    </Box>
                    <Typography variant="body2" color={cardText}>{req.issue}</Typography>
                    <Typography variant="caption" color={darkMode ? '#a5b4fc' : 'primary.main'}>Assigned: {req.assigned}</Typography>
                    <Chip label={req.status} color={req.status === 'Completed' ? 'success' : req.status === 'In Progress' ? 'warning' : 'default'} size="small" sx={{ alignSelf: 'flex-end' }} />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Top 5 Lists */}
        <Typography variant="h6" fontWeight={700} mb={1} color={darkMode ? '#fbbf24' : 'primary.main'}>Top 5 Lists</Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Top 5 Wards by Occupancy
              </Typography>
              <Box>
                {topWards.map((ward, idx) => (
                  <Box key={ward.ward} display="flex" alignItems="center" mb={1}>
                    <Avatar sx={{ bgcolor: '#6366f1', width: 32, height: 32, mr: 2 }}>{idx + 1}</Avatar>
                    <Typography variant="body1" fontWeight={600} sx={{ flex: 1 }}>{ward.ward}</Typography>
                    <Chip label={`${ward.occupancy}%`} color={ward.occupancy > 90 ? 'error' : 'success'} />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Top 5 Diagnoses <HealthAndSafetyIcon sx={{ ml: 1, color: darkMode ? '#fbbf24' : 'primary.main' }} />
              </Typography>
              <Box>
                {topDiagnoses.map((diag, idx) => (
                  <Box key={diag.name} display="flex" alignItems="center" mb={1}>
                    <AssignmentIndIcon sx={{ mr: 1, color: darkMode ? '#a5b4fc' : 'primary.main' }} />
                    <Typography variant="body1" fontWeight={600} sx={{ flex: 1 }}>{diag.name}</Typography>
                    <Chip label={diag.count} color="info" />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Top 5 Equipment <LocalHospitalIcon sx={{ ml: 1, color: darkMode ? '#fbbf24' : 'primary.main' }} />
              </Typography>
              <Box>
                {topEquipment.map((equip, idx) => (
                  <Box key={equip.name} display="flex" alignItems="center" mb={1}>
                    <GroupIcon sx={{ mr: 1, color: darkMode ? '#a5b4fc' : 'primary.main' }} />
                    <Typography variant="body1" fontWeight={600} sx={{ flex: 1 }}>{equip.name}</Typography>
                    <Chip label={equip.uses} color="success" />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* System Health & Quick Actions */}
        <Typography variant="h6" fontWeight={700} mb={1} color={darkMode ? '#fbbf24' : 'primary.main'}>System Health & Quick Actions</Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradientAlt, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                System Health
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {systemHealth.map((sys) => (
                  <Chip key={sys.label} icon={sys.icon} label={`${sys.label}: ${sys.status}`} color={sys.status === 'Online' ? 'success' : sys.status === 'Warning' ? 'warning' : 'error'} sx={{ fontWeight: 600, fontSize: 15, px: 2, py: 1, borderRadius: 2 }} />
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, background: cardGradientAlt, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color={darkMode ? '#fbbf24' : 'primary.main'}>
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button variant="contained" color="primary" startIcon={<AddCircleIcon />} sx={{ borderRadius: 2, fontWeight: 700 }}>Add Patient</Button>
                <Button variant="contained" color="success" startIcon={<ScheduleIcon />} sx={{ borderRadius: 2, fontWeight: 700 }}>Schedule Surgery</Button>
                <Button variant="contained" color="warning" startIcon={<AssignmentIndIcon />} sx={{ borderRadius: 2, fontWeight: 700 }}>Assign Staff</Button>
                <Button variant="contained" color="info" startIcon={<EventAvailableIcon />} sx={{ borderRadius: 2, fontWeight: 700 }}>Book Appointment</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activity Table */}
        <Typography variant="h6" fontWeight={700} mb={1} color={darkMode ? '#fbbf24' : 'primary.main'}>Recent Activity</Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <Card sx={{ p: 2, height: 320, overflow: 'auto', borderRadius: 2, background: cardGradient, color: cardText }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary.main">
                Recent Activity
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Patient/Detail</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{activity.patient}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>
                          <Chip
                            label={activity.status}
                            color={
                              activity.status === 'success' ? 'success' :
                              activity.status === 'info' ? 'info' :
                              activity.status === 'warning' ? 'warning' :
                              activity.status === 'error' ? 'error' : 'default'
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
} 