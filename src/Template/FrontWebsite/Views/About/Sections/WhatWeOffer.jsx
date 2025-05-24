import React, { useState } from "react";
import { Box, Grid, Typography, Card, Avatar, Container } from "@mui/material";
import {
  Apartment,
  Restaurant,
  LocalHospital,
  DirectionsCar,
  Spa,
  Checkroom,
  Work,
  Star,
} from "@mui/icons-material";
export default function WhatWeOffer() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* Business Highlights */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            What We Offer
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Hostel",
                icon: Apartment,
                text: "Comfortable and secure living spaces.",
              },
              {
                title: "Food Catering",
                icon: Restaurant,
                text: "Delicious meals tailored to your events.",
              },
              {
                title: "Hospital Appointments",
                icon: LocalHospital,
                text: "Easy bookings for trusted healthcare.",
              },
              {
                title: "Garage Services",
                icon: DirectionsCar,
                text: "Reliable car and bike repair services.",
              },
              {
                title: "Beauty & Tattoo",
                icon: Spa,
                text: "Revamp your style with our experts.",
              },
              {
                title: "Fashion Design",
                icon: Checkroom,
                text: "Custom outfits made to perfection.",
              },
              {
                title: "Professional Services",
                icon: Work,
                text: "Expert solutions for your business needs.",
              },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    boxShadow: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "secondary.main",
                      width: 56,
                      height: 56,
                      mb: 2,
                    }}
                  >
                    <service.icon sx={{ color: "#fff", fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.text}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
