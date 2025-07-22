import React from "react";
import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PatientPaymentTable = ({ bills, onInvoiceClick, onEdit, onDelete }) => (
  <Card sx={{ mb: 4 }}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
        Patient Payment Status
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill ID</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Amount (₹)</TableCell>
            <TableCell>Paid (₹)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(bills || []).map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.billId}</TableCell>
              <TableCell>{b.patientName || b.customerName}</TableCell>
              <TableCell>{(b.totalAmount || 0).toLocaleString()}</TableCell>
              <TableCell>{(b.paidAmount || 0).toLocaleString()}</TableCell>
              <TableCell>
                <Chip label={b.paymentStatus} color={b.paymentStatus === "paid" ? "success" : b.paymentStatus === "partial" ? "warning" : "error"} size="small" />
              </TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center" gap={1}>
                  <Button variant="outlined" size="small" onClick={() => onInvoiceClick && onInvoiceClick(b)}>
                    Invoice
                  </Button>
                  <Tooltip title="Edit">
                    <IconButton size="small" color="primary" onClick={() => onEdit && onEdit(b)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => onDelete && onDelete(b.id)}>
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

export default PatientPaymentTable; 