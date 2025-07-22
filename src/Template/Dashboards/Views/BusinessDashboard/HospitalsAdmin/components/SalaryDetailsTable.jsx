import React from "react";
import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SalaryDetailsTable = ({ salaryRecords, onSalarySlipClick, onEdit, onDelete }) => (
  <Card sx={{ mb: 4 }}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
        Staff Salary Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Net Salary (₹)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(salaryRecords || []).map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.staffName}</TableCell>
              <TableCell>{s.role}</TableCell>
              <TableCell>{s.month}</TableCell>
              <TableCell>{s.net.toLocaleString()}</TableCell>
              <TableCell>
                <Chip label={s.status} color={s.status === "Paid" ? "success" : "warning"} size="small" />
              </TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center" gap={1}>
                  <Button variant="outlined" size="small" onClick={() => onSalarySlipClick && onSalarySlipClick(s)}>
                    Salary Slip
                  </Button>
                  <Tooltip title="Edit">
                    <IconButton size="small" color="primary" onClick={() => onEdit && onEdit(s)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => onDelete && onDelete(s.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default SalaryDetailsTable; 