import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, TextField, Typography, Checkbox, FormControlLabel, Container } from "@mui/material";

// Mock data for admission requests
const initialRows = [
  { id: 1, patient: "John Doe", age: 35, status: "Pending" },
  { id: 2, patient: "Jane Smith", age: 28, status: "In Progress" },
  { id: 3, patient: "Alice Johnson", age: 42, status: "Approved" },
  { id: 4, patient: "Bob Brown", age: 50, status: "Pending" },
];

export default function AdmissionRequests() {
  const [rows, setRows] = useState(initialRows);
  const [filterText, setFilterText] = useState("");
  const [statusFilters, setStatusFilters] = useState({
    All: true,
    Pending: false,
    "In Progress": false,
    Approved: false,
    Rejected: false,
  });

  // Filter Data Based on Search Input and Status Filters
  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterText(value);
    let filteredRows = initialRows;
    if (Object.values(statusFilters).some(Boolean)) {
      filteredRows = filteredRows.filter(
        (row) => statusFilters[row.status] || statusFilters.All
      );
    }
    filteredRows = filteredRows.filter(
      (row) =>
        row.patient?.toLowerCase().includes(value) ||
        String(row.age || "").includes(value)
    );
    setRows(filteredRows);
  };

  // Approve Function
  const handleApprove = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status: "Approved" } : row
    );
    setRows(updatedRows);
  };

  // Delete Function
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Handle Checkbox Change for Filtering Status
  const handleStatusFilterChange = (event) => {
    const { name, checked } = event.target;
    setStatusFilters((prevState) => {
      const updatedStatus = { ...prevState, [name]: checked };
      if (name === "All") {
        Object.keys(updatedStatus).forEach((key) => {
          if (key !== "All") updatedStatus[key] = false;
        });
      }
      handleFilter({ target: { value: filterText } });
      return updatedStatus;
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "patient", headerName: "Patient Name", width: 180 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Typography
          color={
            params.value === "Pending"
              ? "orange"
              : params.value === "In Progress"
              ? "blue"
              : params.value === "Rejected"
              ? "red"
              : "green"
          }
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleApprove(params.id)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admission Requests
        </Typography>
        <Paper sx={{ height: 600, width: "100%", padding: 2 }}>
          {/* Toolbar Above the Table */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
            <Typography variant="h6">Admission Requests</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={filterText}
                onChange={handleFilter}
              />
            </Box>
          </Box>
          {/* Status Filters Above the Table */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={statusFilters.All} onChange={handleStatusFilterChange} name="All" />}
              label="All Status"
            />
            <FormControlLabel
              control={<Checkbox checked={statusFilters.Pending} onChange={handleStatusFilterChange} name="Pending" />}
              label="Pending"
            />
            <FormControlLabel
              control={<Checkbox checked={statusFilters["In Progress"]} onChange={handleStatusFilterChange} name="In Progress" />}
              label="In Progress"
            />
            <FormControlLabel
              control={<Checkbox checked={statusFilters.Approved} onChange={handleStatusFilterChange} name="Approved" />}
              label="Approved"
            />
            <FormControlLabel
              control={<Checkbox checked={statusFilters.Rejected} onChange={handleStatusFilterChange} name="Rejected" />}
              label="Rejected"
            />
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 50, 100]}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Container>
  );
} 