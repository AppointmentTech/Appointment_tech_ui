import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import SnackBar from "@snackbar/SnackBar.jsx";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CustomTableToolbar from "../../../../../../CommonComponents/CustomTableToolbar";

// Mock data for hospital food/catering
const mockFood = [
  { id: 1, patient: "John Doe", meal: "Breakfast", diet: "Diabetic", date: "2024-06-10", status: "Served" },
  { id: 2, patient: "Jane Smith", meal: "Lunch", diet: "Low Sodium", date: "2024-06-11", status: "Pending" },
  { id: 3, patient: "Alice Johnson", meal: "Dinner", diet: "Regular", date: "2024-06-12", status: "Served" },
];

export default function FoodCatering() {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFood(mockFood);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      field: "actions",
      headerName: "Edit",
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton color="primary">
            <EditNoteOutlinedIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    { field: "id", headerName: "ID", minWidth: 80 },
    { field: "patient", headerName: "Patient Name", minWidth: 180 },
    { field: "meal", headerName: "Meal", minWidth: 120 },
    { field: "diet", headerName: "Diet Type", minWidth: 140 },
    { field: "date", headerName: "Date", minWidth: 120 },
    { field: "status", headerName: "Status", minWidth: 120 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Food & Catering Management
        </Typography>
        <Paper sx={{ height: 600, width: "100%", overflowX: "auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={food}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pagination
              pageSizeOptions={[5, 10, 25]}
              getRowId={(row) => row.id}
              initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
              slots={{
                toolbar: () => (
                  <CustomTableToolbar
                    rows={food}
                    columns={columns}
                    selectedIDs={[]}
                    handleDelete={() => {}}
                  />
                ),
              }}
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f0f0f0",
                  fontWeight: "bold",
                },
              }}
            />
          )}
        </Paper>
        <SnackBar open={snackOpen} setOpen={setSnackOpen} options={snackOptions} />
      </Box>
    </Container>
  );
} 