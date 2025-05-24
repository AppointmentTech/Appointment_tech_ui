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
    title: "Car Garages",
    description: "Expert car repair and maintenance services.",
    image:
      "https://img.freepik.com/free-photo/mechanic-showing-customer-problem-with-car_1170-1413.jpg?t=st=1736693237~exp=1736696837~hmac=aeea9cea8c84bd8ba8c5c6f987834e26cd204809368a3740b83066f81136322a&w=996", // Replace with your image URL
  },
  {
    title: "Bike Garages",
    description: "Professional bike servicing and repairs.",
    image:
      "https://img.freepik.com/premium-photo/mechanic-woman-placing-custom-motorcycle-platform_1048944-29197010.jpg?w=996", // Replace with your image URL
  },
  {
    title: "Vehicle Wash",
    description: "Vehicle Wash for cars and bikes.",
    image:
      "https://img.freepik.com/free-photo/beautiful-car-washing-service_23-2149212209.jpg?t=st=1736693582~exp=1736697182~hmac=5df358c3c75190719fa6c04421bcceadba414f8b94c56884aef0759791428bf6&w=996", // Replace with your image URL
  },
  {
    title: "Specialized Garages",
    description: "Garages specialized in high-end and luxury vehicles.",
    image:
      "https://img.freepik.com/premium-photo/two-men-are-looking-car-with-number-2-back_972324-85689.jpg?w=1060", // Replace with your image URL
  },
];

const Garage = () => {
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
              Your Trusted Garage Service, Book Now!
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Book your appointment today and drive with confidence.
            </Typography>
            {/* <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Your Trusted Garage Service, Book Now!
            </Typography>
            <Typography variant="subtitle1" textAlign="center" gutterBottom>
              Book your appointment today and drive with confidence.
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

export default Garage;
