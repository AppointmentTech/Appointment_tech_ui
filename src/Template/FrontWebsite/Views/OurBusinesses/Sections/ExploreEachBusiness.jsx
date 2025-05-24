import React from "react";
import { useNavigate } from 'react-router-dom';
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

export default function OurBusinesses() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* Individual Business Highlights */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Explore Each Business
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Hostel",
                description: "Find your home away from home.",
                icon: "https://cdn-icons-png.flaticon.com/512/1398/1398478.png",
                NavigatePage: "/HostelDetails",
              },
              {
                title: "Food Catering",
                description: "Taste the excellence in every bite.",
                icon: "https://cdn-icons-png.flaticon.com/512/1940/1940898.png",
                NavigatePage: "/FoodCateringDetails",
              },
              {
                title: "Hospital Appointments",
                description: "Your health, our priority.",
                icon: "https://img.icons8.com/color/48/hospital-room.png",
                NavigatePage: "/HospitalDetails",
              },
              {
                title: "Garage Services",
                description: "We keep your vehicles running smoothly.",
                icon: "https://img.icons8.com/color/48/garage.png",
                NavigatePage: "/GarageDetails",
              },
              {
                title: "Beauty & Tattoo",
                description: "Unleash your style with our experts.",
                icon: "https://img.icons8.com/color/48/tattoo-machine.png",
                NavigatePage: "/BeautyTattooDetails",
              },
              {
                title: "Fashion Design",
                description: "Style tailored to perfection.",
                icon: "https://img.icons8.com/color/48/sewing-machine.png",
                NavigatePage: "/FashionDesignDetails",
              },
              {
                title: "Professional Services",
                description: "Expertise that empowers.",
                icon: "https://cdn-icons-png.flaticon.com/512/7179/7179048.png",
                NavigatePage: "/ProfessionalServicesDetails",
              },
            ].map((business, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                onClick={() => navigate(business.NavigatePage)}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: "16px",
                    boxShadow: 3,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={business.icon}
                    alt={business.title}
                    sx={{
                      width: 60,
                      height: 60,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    {business.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {business.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
