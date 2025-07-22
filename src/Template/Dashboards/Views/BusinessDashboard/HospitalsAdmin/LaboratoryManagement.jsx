import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const LaboratoryManagement = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor="#f5f6fa">
    <Card sx={{ minWidth: 400, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom color="primary">
          Laboratory Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is the Laboratory Management module. Implement lab test tracking, results, and related features here.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default LaboratoryManagement; 