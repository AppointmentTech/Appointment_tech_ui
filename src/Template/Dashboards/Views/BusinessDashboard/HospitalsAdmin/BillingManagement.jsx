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
import SnackBar from "../../../../../../SnackBar/SnackBar.jsx";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CustomTableToolbar from "../../../../../../CommonComponents/CustomTableToolbar";

// Mock data for hospital billing
const mockBills = [
  { id: 1, patient: "John Doe", amount: 1200, date: "2024-06-10", status: "Paid" },
  { id: 2, patient: "Jane Smith", amount: 800, date: "2024-06-11", status: "Unpaid" },
  { id: 3, patient: "Alice Johnson", amount: 1500, date: "2024-06-12", status: "Paid" },
];

export default function BillingManagement() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBills(mockBills);
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
    { field: "amount", headerName: "Amount", minWidth: 120 },
    { field: "date", headerName: "Date", minWidth: 120 },
    { field: "status", headerName: "Status", minWidth: 120 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Billing Management
        </Typography>
        <Paper sx={{ height: 600, width: "100%", overflowX: "auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={bills}
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
                    rows={bills}
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