import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";

// ✅ Columns Definition

// ✅ Sample Data with Status
const initialRows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: "Pending" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    status: "In Progress",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    status: "Approved",
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, status: "Pending" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    status: "In Progress",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    status: "Approved",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    status: "Pending",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    status: "Approved",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    status: "Rejected",
  },
  {
    id: 10,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    status: "In Progress",
  },
  {
    id: 11,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    status: "Approved",
  },
  {
    id: 12,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    status: "Pending",
  },
  {
    id: 13,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    status: "Approved",
  },
  {
    id: 14,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    status: "Rejected",
  },
];

export default function UserStayRequest() {
  const [rows, setRows] = useState(initialRows);
  const [filterText, setFilterText] = useState("");
  const [statusFilters, setStatusFilters] = useState({
    All: true,
    Pending: false,
    "In Progress": false,
    Approved: false,
    Rejected: false,
  });

  // ✅ Function to Export Data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "DataGrid_Export.xlsx");
  };

  // ✅ Filter Data Based on Search Input and Status Filters
  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterText(value);

    let filteredRows = initialRows;

    // Filter based on the status checkboxes
    if (Object.values(statusFilters).some(Boolean)) {
      filteredRows = filteredRows.filter(
        (row) => statusFilters[row.status] || statusFilters.All,
      );
    }

    // Apply text filter
    filteredRows = filteredRows.filter(
      (row) =>
        row.firstName?.toLowerCase().includes(value) ||
        row.lastName?.toLowerCase().includes(value) ||
        String(row.age || "").includes(value),
    );

    setRows(filteredRows);
  };

  // ✅ Approve Function
  const handleApprove = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status: "Approved" } : row,
    );
    setRows(updatedRows);
  };

  // ✅ Delete Function
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // ✅ Handle Checkbox Change for Filtering Status
  const handleStatusFilterChange = (event) => {
    const { name, checked } = event.target;

    setStatusFilters((prevState) => {
      const updatedStatus = { ...prevState, [name]: checked };

      if (name === "All") {
        // If 'All' is checked, uncheck other checkboxes
        Object.keys(updatedStatus).forEach((key) => {
          if (key !== "All") updatedStatus[key] = false;
        });
      }

      handleFilter({ target: { value: filterText } }); // Apply the filter after changing the checkboxes
      return updatedStatus;
    });
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 160,
      sortable: false,
      valueGetter: (params) =>
        `${params?.row?.firstName || ""} ${params?.row?.lastName || ""}`,
    },
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
    <React.Fragment>
        <Paper sx={{ height: 700, width: "100%", padding: 2 }}>
          {/* ✅ Toolbar Above the Table */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            {/* ✅ Title */}
            <Typography variant="h6">Stay Request</Typography>

            {/* ✅ Right Side - Search + Buttons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* ✅ Search Input */}
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={filterText}
                onChange={handleFilter}
              />

              {/* ✅ Export Button */}
              {/* <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            color="success"
            onClick={exportToExcel}
          >
            Export to Excel
          </Button> */}
            </Box>
          </Box>

          {/* ✅ Status Filters Above the Table */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters.All}
                  onChange={handleStatusFilterChange}
                  name="All"
                />
              }
              label="All Status"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters.Pending}
                  onChange={handleStatusFilterChange}
                  name="Pending"
                />
              }
              label="Pending"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters["In Progress"]}
                  onChange={handleStatusFilterChange}
                  name="In Progress"
                />
              }
              label="In Progress"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters.Approved}
                  onChange={handleStatusFilterChange}
                  name="Approved"
                />
              }
              label="Approved"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters.Rejected}
                  onChange={handleStatusFilterChange}
                  name="Rejected"
                />
              }
              label="Rejected"
            />
          </Box>

          {/* ✅ DataGrid Component */}
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 50, 100]}
            // checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
    </React.Fragment>
  );
}
