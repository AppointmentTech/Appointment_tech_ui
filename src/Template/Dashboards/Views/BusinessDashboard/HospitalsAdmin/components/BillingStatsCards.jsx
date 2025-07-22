import React from "react";
import { Grid, Card, CardContent, Box, Typography, Avatar } from "@mui/material";

const BillingStatsCards = ({ stats, theme }) => (
  <Grid container spacing={3} mb={4}>
    {stats.map((stat, index) => (
      <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
        <Card 
          sx={{ 
            height: "100%",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[8],
            }
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {stat.value}
                </Typography>
              </Box>
              <Avatar 
                sx={{ 
                  bgcolor: stat.color + "20",
                  color: stat.color,
                  width: 48,
                  height: 48
                }}
              >
                {stat.icon}
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default BillingStatsCards; 