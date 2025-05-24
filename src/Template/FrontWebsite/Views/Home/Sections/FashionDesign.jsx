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
    title: "Bridal Wear",
    image:
      "https://img.freepik.com/premium-photo/portrait-beautiful-indian-bride-gold-red-dress_423537-110.jpg?w=360",
    description: "Elegant and custom-designed bridal outfits.",
  },
  {
    title: "Casual Wear",
    image:
      "https://img.freepik.com/free-photo/two-brunette-woman-walking-across-studio_197531-12970.jpg?t=st=1736699074~exp=1736702674~hmac=44e8ebd4f1e067a57f37c096e76e72a52c87ed94e88963876f8c6c3c2c684f55&w=996",
    description: "Trendy and comfortable casual clothing.",
  },
  {
    title: "Custom Tailoring",
    image:
      "https://img.freepik.com/free-photo/portrait-male-fashion-designer-cutting-fabric-with-scissor-his-workshop_23-2148180375.jpg?t=st=1736698908~exp=1736702508~hmac=8ead6f4bb9e640417e338987f775ca30cdaea9bedfa33ad749f314d158680bae&w=996",
    description: "Tailored outfits for any occasion.",
  },
  {
    title: "Men's Formal Wear",
    image:
      "https://img.freepik.com/free-photo/elegant-indian-macho-man-model-suit-pink-tie-posed-winter-day_627829-1686.jpg?t=st=1736698995~exp=1736702595~hmac=0e3aa75092bced4fc02ce3b696301bd28dcf21de481037086045c933bffb305b&w=996",
    description: "Sophisticated suits and formal attire.",
  },
  {
    title: "Kids' Fashion",
    image:
      "https://img.freepik.com/free-photo/group-children-studio-concept_155003-15051.jpg?t=st=1736699216~exp=1736702816~hmac=d30fd60f26410c5ddd5b0424f6c07fb7090c8b31d5ecb5fd40ca640580e2872f&w=996",
    description: "Adorable and stylish outfits for kids.",
  },
  {
    title: "Ethnic Wear",
    image:
      "https://img.freepik.com/premium-photo/beautiful-young-girl-using-mobile-phone-smartphone-gray-background_136354-14658.jpg?w=360",
    description: "Traditional and modern ethnic designs.",
  },
];

const FashionDesign = () => {
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
              Book Your Fashion Design Consultation
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Your personal designer is just a click away.
            </Typography>
            {/* <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Book Your Fashion Design Consultation
            </Typography>
            <Typography variant="subtitle1" textAlign="center" gutterBottom>
              Your personal designer is just a click away.
            </Typography> */}
          </Box>

          {/* Categories Grid */}
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={category.image}
                    alt={category.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {category.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: "none",
                        mt: 2,
                        borderRadius: "8px",
                      }}
                      fullWidth
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default FashionDesign;
