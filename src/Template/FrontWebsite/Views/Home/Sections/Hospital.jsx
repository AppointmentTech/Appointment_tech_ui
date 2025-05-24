import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";

const categories = [
  {
    title: "Government Hospitals",
    description: "Affordable and accessible healthcare services.",
    image:
      "https://img.freepik.com/free-photo/retired-person-using-wheelchair-talking-with-senior-doctor-appointment-while-being-helped-by-professional-nurse-private-clinic-older-man-living-with-disability-busy-hospital-reception_482257-46754.jpg?t=st=1736692080~exp=1736695680~hmac=71c3af304e0532058a07ecc7062d93bb2ce5d260c37d9977acf5b0bc07eacc58&w=996", // Replace with your image URL
  },
  {
    title: "Private Hospitals",
    description: "Premium healthcare services with modern facilities.",
    image:
      "https://img.freepik.com/free-photo/old-woman-with-sickness-getting-consultation-from-nurse-doctor_482257-17816.jpg?t=st=1736692152~exp=1736695752~hmac=b54996e4a18e69c5f8f234ada9398b21afe698d73cf7c75c489907c6b90e22cc&w=1060", // Replace with your image URL
  },
  {
    title: "Clinics",
    description: "Small-scale healthcare for regular check-ups.",
    image:
      "https://img.freepik.com/free-photo/indian-doctor-receives-patient-tells-him-about-results-tests-medicine-health_496169-2765.jpg?t=st=1736692210~exp=1736695810~hmac=93b4a6e8ad9fcc5506e74de4755da93b2c5ccb0a8dbd733a61f4cf66f48d30fd&w=996", // Replace with your image URL
  },
  {
    title: "Specialized Doctors",
    description: "Expert care from specialists in various fields.",
    image:
      "https://img.freepik.com/free-photo/medium-shot-scientists-posing-together_23-2148969982.jpg?t=st=1736692250~exp=1736695850~hmac=2f2e5d1c880ae18053c2d1557166edab9f151f62ebcdb31f422c314c79bcc839&w=996", // Replace with your image URL
  },
];

const Hospital = () => {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Your Health, Our Priority
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Your health is our responsibility; booking an appointment is
              yours.
            </Typography>
            {/* <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Your Health, Our Priority
            </Typography>
            <Typography variant="subtitle1" textAlign="center" gutterBottom>
              Your health is our responsibility; booking an appointment is
              yours.
            </Typography> */}
          </Box>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    boxShadow: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={category.image}
                    alt={category.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, mt: "auto", textAlign: "center" }}>
                    <Button variant="contained" color="primary" fullWidth>
                      Book Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Hospital;
