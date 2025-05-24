import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
} from "@mui/material";

export default function WhatOurCustomersSay() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* Customer Reviews */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Hear it from the people who love our services.
          </Typography>
          {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
          What Our Customers Say
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hear it from the people who love our services.
        </Typography> */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[...Array(3)].map((_, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    boxShadow: 3,
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    "Amazing service and very professional staff! Highly
                    recommend."
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    - Customer {i + 1}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call-to-Action */}
        <Box
          sx={{
            textAlign: "center",
            my: 6,
            py: 4,
            bgcolor: "primary.main",
            color: "#fff",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Explore our services today and experience the difference.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, borderRadius: "12px" }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
