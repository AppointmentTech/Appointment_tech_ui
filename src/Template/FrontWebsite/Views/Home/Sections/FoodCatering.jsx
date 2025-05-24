import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
} from "@mui/material";

const categories = [
  {
    title: "Home Catering",
    image:
      "https://img.freepik.com/free-photo/medium-shot-men-with-delicious-food_23-2148965349.jpg?t=st=1736696342~exp=1736699942~hmac=4a38d4d8f53fe2f1b1adb3b18c13ad140226eb3f824639827f16d4521032b655&w=996",
    description: "Personalized catering for intimate gatherings.",
  },
  {
    title: "Wedding Catering",
    image:
      "https://img.freepik.com/free-photo/long-table-with-luxury-plates-decorated-with-colorful-flowers-candles_181624-24389.jpg?t=st=1736696389~exp=1736699989~hmac=6bd4b92afefa958b44f91675b8f2e0d67ca478af7ceffe96cda61b61bb72b748&w=996",
    description: "Delicious multi-course meals for weddings.",
  },
  {
    title: "Corporate Catering",
    image:
      "https://img.freepik.com/free-photo/business-people-serving-themselves-buffet_1262-1698.jpg?t=st=1736696452~exp=1736700052~hmac=3735fe63e910f191f39a97085aaebfb097373029abed92060621b878326f2e69&w=996",
    description: "Professional catering for corporate events.",
  },
  {
    title: "Party Catering",
    image:
      "https://img.freepik.com/free-photo/waiter-carries-plate-with-tasty-snacks_8353-1263.jpg?t=st=1736696501~exp=1736700101~hmac=cd908fc4d294e402451187fa6eaf59543a59121cc9cb98e09020b0b881ec4178&w=996",
    description: "Customizable menus for birthdays and celebrations.",
  },
  //   {
  //     title: "Buffet Catering",
  //     image: "https://via.placeholder.com/300",
  //     description: "Lavish buffet spreads for all occasions.",
  //   },
];

const FoodCatering = () => {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box>
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Food Catering Services
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Good food, good company, unforgettable moments.
            </Typography>
            {/* <Typography
            variant="h5"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            gutterBottom
          >
            Food Catering Services
          </Typography>
          <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Good food, good company, unforgettable moments.
          </Typography> */}
          </Box>
          {/* Categories Grid */}
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

export default FoodCatering;
