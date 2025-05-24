import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Container,
} from "@mui/material";
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
export default function WhyChooseUs() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Why Choose Us? */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Get the latest updates, insights, and stories from our diverse
            business ventures.
          </Typography>
          {/* <Typography variant="h4" fontWeight="bold" textTransform= "uppercase" gutterBottom>
            Why Choose Us?
          </Typography> */}
          <Grid container spacing={3}>
            {[
              { icon: Apartment, text: "Modern Facilities" },
              { icon: Star, text: "Rated Excellence" },
              { icon: Restaurant, text: "Diverse Services" },
              { icon: LocalHospital, text: "Trusted Professionals" },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: "12px",
                    boxShadow: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <item.icon sx={{ color: "#fff", fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h6">{item.text}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
