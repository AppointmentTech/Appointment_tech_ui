import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

const Hostel = () => {
  // Hostel data
  const hostels = [
    {
      type: "Boys Hostel",
      image:
        "https://img.freepik.com/free-photo/focused-young-employees-waiting-meeting-beginning_1262-14934.jpg?t=st=1736689772~exp=1736693372~hmac=304b84b60a08173453f43820d7a983321a06a7083e12aa2088ee100d4bc21013&w=996",
      description:
        "A well-furnished hostel for boys with all modern amenities.",
    },
    {
      type: "Women Hostel",
      image:
        "https://img.freepik.com/free-photo/roommates-sharing-happy-moments-together_23-2149112089.jpg?t=st=1736689862~exp=1736693462~hmac=9ed6b47c1d0cf92cea1284b3625d5ff03e11a388bc88fd9dfb8dcaeb46a19a65&w=996",
      description: "A secure and comfortable hostel for women students.",
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box>
          {/* Title */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Book Your Stay at Our Hostel
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Your perfect space for study, rest, and growth.
            </Typography>
            {/* <Typography
              variant="h5"
              textAlign="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Book Your Stay at Our Hostel
            </Typography>
            <Typography variant="subtitle1" textAlign="center" gutterBottom>
              Your perfect space for study, rest, and growth.
            </Typography> */}
          </Box>
          {/* Responsive Grid */}
          <Grid container spacing={4}>
            {hostels.map((hostel, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Card for each hostel */}
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  {/* Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={hostel.image}
                    alt={hostel.type}
                    sx={{
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Content */}
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {hostel.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {hostel.description}
                    </Typography>
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

export default Hostel;
