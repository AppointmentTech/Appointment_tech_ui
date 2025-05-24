import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";

const categories = [
  {
    title: "Salon",
    image:
      "https://img.freepik.com/free-photo/hairdresser-grooming-their-client_23-2149205917.jpg?t=st=1736694823~exp=1736698423~hmac=7257deb3288d80de1169fbed5588fccf6cc3126a78023960026dc5d81166fe9f&w=996",
    description: "Professional haircuts and styling services.",
  },
  {
    title: "Beauty Parlour",
    image:
      "https://img.freepik.com/free-photo/visit-hairdresser-before-important-day_329181-1927.jpg?t=st=1736694924~exp=1736698524~hmac=b50656012e79f3889d02a031eb3b3c14d745c16066945b0511f00f90a3267733&w=996",
    description: "Pampering beauty treatments and skincare.",
  },
  {
    title: "Tattoo Artist",
    image:
      "https://img.freepik.com/free-photo/adult-man-working-with-tattoo-pen-arm_23-2147834089.jpg?t=st=1736695006~exp=1736698606~hmac=527f157d2c876e0f561519585d9cec405c6e2fa4c61f7d385760abb58bef4b1e&w=996",
    description: "Creative and personalized tattoo designs.",
  },
  {
    title: "Nail Spa",
    image:
      "https://img.freepik.com/free-photo/high-angle-woman-getting-manicure_23-2149975499.jpg?t=st=1736695101~exp=1736698701~hmac=306f3679e100e83f0fd5d6968c5e83caeab8ea3a3f2e94044b35850ed1adaf25&w=996",
    description: "Expert manicures, pedicures, and nail art.",
  },
  //   {
  //     title: "Makeup Artist",
  //     image: "https://img.freepik.com/free-photo/beautiful-female-customer-work-makeup-artist_329181-1948.jpg?t=st=1736695185~exp=1736698785~hmac=dc35c286a770ca66da57a072d844d66d0a8b3061381339f6cde477ecb614023b&w=996",
  //     description: "Professional makeup services for all occasions.",
  //   },
];

const Beauty = () => {
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
                          Book Your Beauty & Tattoo Session
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          textAlign="center"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          Feel beautiful, feel confident, feel inked.
                        </Typography>
            {/* <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Book Your Beauty & Tattoo Session
            </Typography>
            <Typography variant="subtitle1" textAlign="center" gutterBottom>
              Feel beautiful, feel confident, feel inked.
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

export default Beauty;
