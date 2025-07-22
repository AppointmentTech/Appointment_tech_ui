import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const InvoiceDialog = ({ open, onClose, bill }) => {
  if (!bill) return null;
  const items = bill.services || bill.items || [];
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Invoice - {bill.billId}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Patient: {bill.patientName || bill.customerName}</Typography>
        <Typography variant="body2" color="text.secondary">Date: {bill.createdAt || bill.date || "-"}</Typography>
        <Divider sx={{ my: 2 }} />
        {items.length > 0 && (
          <>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Services/Items</Typography>
            <Table size="small" sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.description || item.type || item.desc}</TableCell>
                    <TableCell align="right">{item.qty || item.quantity || 1}</TableCell>
                    <TableCell align="right">₹{(item.rate || item.amount || 0).toLocaleString()}</TableCell>
                    <TableCell align="right">₹{(item.amount || item.rate || 0).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider sx={{ my: 2 }} />
          </>
        )}
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography fontWeight="bold">Total</Typography>
          <Typography fontWeight="bold">₹{(bill.totalAmount || 0).toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Paid</Typography>
          <Typography>₹{(bill.paidAmount || 0).toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Balance</Typography>
          <Typography>₹{(bill.balanceAmount || 0).toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Status</Typography>
          <Typography>{bill.paymentStatus}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={() => window.print()} variant="contained">Print</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceDialog; 