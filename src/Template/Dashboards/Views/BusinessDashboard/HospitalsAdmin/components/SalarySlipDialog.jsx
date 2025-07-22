import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider } from "@mui/material";

const SalarySlipDialog = ({ open, onClose, record }) => {
  if (!record) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Salary Slip - {record.staffName}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Role: {record.role}</Typography>
        <Typography variant="body2" color="text.secondary">Month: {record.month}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Base Salary</Typography>
          <Typography>₹{(record.base || 0).toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Overtime</Typography>
          <Typography>₹{(record.overtime || 0).toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Deductions</Typography>
          <Typography>-₹{(record.deductions || 0).toLocaleString()}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography fontWeight="bold">Net Salary</Typography>
          <Typography fontWeight="bold">₹{(record.net || 0).toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Status</Typography>
          <Typography>{record.status}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={() => window.print()} variant="contained">Print</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalarySlipDialog; 