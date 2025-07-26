import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer, Legend } from 'recharts';
import CommonHeader from "@template/Dashboards/Components/CommonHeader.jsx";
import CustomTableToolbar from "@components/CustomTableToolbar.js";

const mockTechnicians = [
  { id: 1, name: 'Amit Kumar', skill: 'Engine', email: 'amit.kumar@example.com', phone: '9876543210', status: 'Active', experience: 5 },
  { id: 2, name: 'Priya Singh', skill: 'AC', email: 'priya.singh@example.com', phone: '9123456780', status: 'On Leave', experience: 3 },
  { id: 3, name: 'Ravi Verma', skill: 'Electrical', email: 'ravi.verma@example.com', phone: '9988776655', status: 'Active', experience: 7 },
  { id: 4, name: 'Sunita Sharma', skill: 'Bodywork', email: 'sunita.sharma@example.com', phone: '9876501234', status: 'Inactive', experience: 2 },
];

const skillData = [
  { name: 'Engine', value: 10 },
  { name: 'AC', value: 6 },
  { name: 'Electrical', value: 8 },
  { name: 'Bodywork', value: 4 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const attendanceData = [
  { name: 'Present', value: 22 },
  { name: 'Absent', value: 3 },
  { name: 'On Leave', value: 2 },
];

const mockActivity = [
  { type: 'add', technician: 'Amit Kumar', skill: 'Engine', user: 'Admin', desc: 'Added new technician', time: '2 min ago' },
  { type: 'edit', technician: 'Priya Singh', skill: 'AC', user: 'Manager', desc: 'Updated skill to AC', time: '10 min ago' },
  { type: 'delete', technician: 'Sunita Sharma', skill: 'Bodywork', user: 'Admin', desc: 'Technician removed', time: '1 hr ago' },
];

const fieldIconMap = {
  name: <PersonIcon fontSize="small" sx={{ mr: 1 }} />,
  skill: <EngineeringIcon fontSize="small" sx={{ mr: 1 }} />,
  email: <EmailIcon fontSize="small" sx={{ mr: 1 }} />,
  phone: <PhoneIcon fontSize="small" sx={{ mr: 1 }} />,
  status: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
  experience: <BadgeIcon fontSize="small" sx={{ mr: 1 }} />,
};

export default function GarageTechnicianManagement() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [drawerEdit, setDrawerEdit] = useState(false);
  const [drawerEditData, setDrawerEditData] = useState({});
  const [selectedIDs, setSelectedIDs] = useState([]);

  const handleView = (row) => {
    setDrawerData(row);
    setDrawerEdit(false);
    setDrawerOpen(true);
  };
  const handleEdit = (row) => {
    setDrawerData(row);
    setDrawerEdit(true);
    setDrawerEditData(row);
    setDrawerOpen(true);
  };
  const handleDelete = (row) => {
    // Implement delete logic
    alert('Delete: ' + row.name);
  };
  const handleDrawerEditChange = (field, value) => {
    setDrawerEditData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDrawerEditSave = () => {
    // Implement save logic
    setDrawerData(drawerEditData);
    setDrawerEdit(false);
  };
  const handleDrawerEditCancel = () => {
    setDrawerEdit(false);
    setDrawerEditData(drawerData);
  };

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="View Details"><IconButton onClick={() => handleView(params.row)}><PersonIcon /></IconButton></Tooltip>
          <Tooltip title="Edit"><IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton onClick={() => handleDelete(params.row)}><DeleteIcon /></IconButton></Tooltip>
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'skill', headerName: 'Skill', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.2 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => <Chip label={params.value} color={params.value === 'Active' ? 'success' : params.value === 'On Leave' ? 'warning' : 'default'} size="small" /> },
    { field: 'experience', headerName: 'Experience (yrs)', flex: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CommonHeader />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, background: theme.palette.background.default, overflow: 'auto' }}>
        <Typography variant="h5" fontWeight={700} mb={3}>Technician Management</Typography>
        {/* Metrics */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography variant="subtitle2">Total Technicians</Typography><Typography variant="h5" fontWeight={700}>28</Typography></CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography variant="subtitle2">Active</Typography><Typography variant="h5" fontWeight={700} color="success.main">22</Typography></CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography variant="subtitle2">On Leave</Typography><Typography variant="h5" fontWeight={700} color="warning.main">3</Typography></CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography variant="subtitle2">Inactive</Typography><Typography variant="h5" fontWeight={700} color="text.secondary">3</Typography></CardContent></Card>
          </Grid>
        </Grid>
        {/* Quick Actions */}
        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" startIcon={<AddCircleIcon />}>Add Technician</Button>
          <Button variant="outlined">Bulk Import</Button>
          <Button variant="outlined">Export</Button>
        </Box>
        {/* Charts */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={6}>
            <Card><CardContent>
              <Typography variant="subtitle2" mb={2}>Technicians by Skill</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={skillData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {skillData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
                  </Pie>
                  <Legend />
                  <ReTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card><CardContent>
              <Typography variant="subtitle2" mb={2}>Attendance Overview</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#8884d8" />
                  <ReTooltip />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </CardContent></Card>
          </Grid>
        </Grid>
       
        {/* DataGrid Table */}
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>All Technicians</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={mockTechnicians}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(ids) => setSelectedIDs(ids)}
                components={{ Toolbar: CustomTableToolbar }}
                componentsProps={{ toolbar: {
                  selectedIDs,
                  handleDelete: (row) => handleDelete(row),
                  handleAdd: () => alert('Add Technician'),
                  handleEdit: (row) => handleEdit(row),
                  handleDeleteSelected: () => alert('Delete selected'),
                }}}
              />
            </Box>
          </CardContent>
        </Card>
         {/* Recent Activity */}
         <Card sx={{ mt: 4 }}>
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
                      <Chip label={act.skill} size="small" color={act.skill === 'Engine' ? 'success' : act.skill === 'AC' ? 'info' : 'default'} />
                      <Typography variant="body2" color="text.primary" fontWeight={700} ml={1}>{act.technician}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{act.desc}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 70, textAlign: 'right', mt: 0.5 }}>{act.time}</Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        {/* Drawer for details */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 380, p: 2 } }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Technician Details</Typography>
            {drawerData && (
              <List>
                {Object.entries(drawerEdit ? drawerEditData : drawerData).map(([key, value]) => (
                  <ListItem key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {fieldIconMap[key]}
                    <Typography variant="body2" fontWeight={600} sx={{ minWidth: 90, textTransform: 'capitalize' }}>{key}</Typography>
                    {drawerEdit ? (
                      <TextField size="small" value={value} onChange={e => handleDrawerEditChange(key, e.target.value)} sx={{ flex: 1 }} />
                    ) : (
                      <Typography variant="body2" color="text.secondary">{value}</Typography>
                    )}
                  </ListItem>
                ))}
              </List>
            )}
            {drawerEdit ? (
              <Box display="flex" gap={2} mt={2}>
                <Button variant="contained" color="success" onClick={handleDrawerEditSave}>Save</Button>
                <Button variant="outlined" onClick={handleDrawerEditCancel}>Cancel</Button>
              </Box>
            ) : (
              <Box display="flex" gap={2} mt={2}>
                <Button variant="contained" onClick={() => setDrawerEdit(true)} startIcon={<EditIcon />}>Edit</Button>
                <Button variant="outlined" onClick={() => setDrawerOpen(false)}>Close</Button>
              </Box>
            )}
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
} 