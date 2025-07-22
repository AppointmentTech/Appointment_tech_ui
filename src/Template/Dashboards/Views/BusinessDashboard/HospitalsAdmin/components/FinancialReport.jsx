import React from "react";
import { Card, CardContent, Typography, Grid, Box, Button } from "@mui/material";
import * as XLSX from "xlsx";

const mockReport = [
  { label: "Total Revenue", value: 34050, color: "#4CAF50" },
  { label: "Total Paid", value: 9650, color: "#2196F3" },
  { label: "Outstanding", value: 24400, color: "#F44336" },
];

const FinancialReport = () => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(mockReport.map(r => ({ Label: r.label, Value: r.value })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Financial Report");
    XLSX.writeFile(wb, "Financial_Report.xlsx");
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Financial Report Summary
          </Typography>
          <Button variant="outlined" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Box>
        <Grid container spacing={2}>
          {mockReport.map((item, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Box p={2} borderRadius={2} bgcolor={item.color + '20'}>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  ₹{item.value.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FinancialReport; 