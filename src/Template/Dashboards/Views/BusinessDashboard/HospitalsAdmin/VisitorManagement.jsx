import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const VisitorManagement = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor="#f5f6fa">
    <Card sx={{ minWidth: 400, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom color="primary">
          Visitor Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is the Visitor Management module. Implement visitor registration, tracking, and related features here.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default VisitorManagement; 