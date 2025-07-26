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

// Mock data for hospital reports
const mockReports = [
  { id: 1, title: "Monthly Revenue", value: "₹50,000", date: "2024-06-01" },
  { id: 2, title: "Patient Admissions", value: 120, date: "2024-06-01" },
  { id: 3, title: "Discharges", value: 80, date: "2024-06-01" },
];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ color: "success", message: "" });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
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
    { field: "title", headerName: "Report Title", minWidth: 180 },
    { field: "value", headerName: "Value", minWidth: 120 },
    { field: "date", headerName: "Date", minWidth: 120 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reports & Analytics
        </Typography>
        <Paper sx={{ height: 600, width: "100%", overflowX: "auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={reports}
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
                    rows={reports}
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