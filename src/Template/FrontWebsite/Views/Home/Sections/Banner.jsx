import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
  Grid2,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ThemeContext } from "ContextOrRedux/ThemeProvider.js";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const categories = [
  {
    id: 1,
    title: "Hostels",
    NavigatePage: "/HostelDetails",
    image:
      "https://img.freepik.com/free-photo/young-friends-hostel_52683-121725.jpg?t=st=1736351983~exp=1736355583~hmac=214f52f3ec6c8eb64a7748ef3a0d36133231a41cb0f3a46d518a7c4620def46f&w=900",
  },
  {
    id: 2,
    title: "Hospitals",
    NavigatePage: "/HospitalDetails",
    image:
      "https://img.freepik.com/free-photo/modern-hospital-building-exterior_1150-3567.jpg?t=st=1736352417~exp=1736354017~hmac=20f460b8639989b3466f5fa5851bb6858b6cfeb72c1ec7a78e2f0570f2705d37&w=900",
  },
  {
    id: 3,
    title: "Garages",
    NavigatePage: "/GarageDetails",
    image:
      "https://img.freepik.com/free-photo/auto-repair-shop-interior-with-tools_1150-3134.jpg?t=st=1736352641~exp=1736354241~hmac=57b2f7c2551cc5db5bdb5c5e1a12c3b4c312051197fdfcfebf285d9fd80ea94b&w=900",
  },
  {
    id: 4,
    title: "Beauty & Tattoo",
    NavigatePage: "/BeautyTattooDetails",
    image:
      "https://img.freepik.com/free-photo/beauty-salon-interior-with-modern-furniture_1150-3916.jpg?t=st=1736352683~exp=1736354283~hmac=84b1ac4129072b51ad9ae1e9d9cbd2e12cdd22d55b072b14ae158f28c1bc8a5d&w=900",
  },
  {
    id: 5,
    title: "Food Catering",
    NavigatePage: "/FoodCateringDetails",
    image:
      "https://img.freepik.com/free-photo/modern-office-interior-with-computer_1150-3007.jpg?t=st=1736352945~exp=1736354545~hmac=f736d625efaa1d7f9410322a2eeb55d0c70ddef0285cf2923378b87112a57a70&w=900",
  },
  {
    id: 6,
    title: "Fashion Design",
    NavigatePage: "/FashionDesignDetails",
    image:
      "https://img.freepik.com/free-photo/cozy-interior-modern-cafe-with-computers_1150-3193.jpg?t=st=1736353022~exp=1736354622~hmac=c8eb1be6a1e1d19eb7d424f63a29a8b828908b1919e4c1be67acde64f3d4a735&w=900",
  },
  {
    id: 7,
    title: "Professional Services and Expertise",
    NavigatePage: "/ProfessionalServicesDetails",
    image:
      "https://img.freepik.com/free-photo/luxury-hotel-room-interior-with-comfortable-bed_1150-3057.jpg?t=st=1736353125~exp=1736354725~hmac=28d91c5b7c1e27c34abf57f5c08ca2327646e09d09ad43161f35e8f61ad84c96&w=900",
  },
  // {
  //   id: 8,
  //   title: "Taxis",
  //   image:
  //     "https://img.freepik.com/free-photo/taxi-service-modern-yellow-cab-car_1150-3522.jpg?t=st=1736353246~exp=1736354846~hmac=8c021b2123857f0fc597120c0362899a727ab5d34d07b0e84f648f0c101f6801&w=900",
  // },
  // {
  //   id: 9,
  //   title: "Food Caterings",
  //   image:
  //     "https://img.freepik.com/free-photo/government-office-building_1150-3244.jpg?t=st=1736353312~exp=1736354912~hmac=4a8a5d28700e5f3e6a0ac17b5b6fd3997984b98d09a34e3e52f516da31ad4be4&w=900",
  // },
  // {
  //   id: 10,
  //   title: "Schools",
  //   image:
  //     "https://img.freepik.com/free-photo/school-building-with-grass-yard_1150-3586.jpg?t=st=1736353422~exp=1736355022~hmac=ea5de4d801ed70d5d0c931dd1ed2f3cc04bfa38bdfc5edb503f3f4d11d16ebfd&w=900",
  // },
  // {
  //   id: 11,
  //   title: "Fashion Design",
  //   image:
  //     "https://img.freepik.com/free-photo/school-building-with-grass-yard_1150-3586.jpg?t=st=1736353422~exp=1736355022~hmac=ea5de4d801ed70d5d0c931dd1ed2f3cc04bfa38bdfc5edb503f3f4d11d16ebfd&w=900",
  // },
  // {
  //   id: 12,
  //   title: "Teachers Appointments",
  //   image:
  //     "https://img.freepik.com/free-photo/school-building-with-grass-yard_1150-3586.jpg?t=st=1736353422~exp=1736355022~hmac=ea5de4d801ed70d5d0c931dd1ed2f3cc04bfa38bdfc5edb503f3f4d11d16ebfd&w=900",
  // },
];

const responsiveSettings = [
  { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 3 } },
  { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 2 } },
  { breakpoint: 500, settings: { slidesToShow: 2, slidesToScroll: 1 } },
  { breakpoint: 0, settings: { slidesToShow: 1, slidesToScroll: 1 } },
];

export default function UniqueSearchAndCategories() {
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
    const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: darkMode
        //   ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
        //   : "linear-gradient(135deg, #f0f4f7, #d9e8eb, #b4d4da)",#ff671f45, #ffffff45, #046a3845
        background: darkMode
          ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(178deg, #0d47a1, #1267ab);",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        gap: 4,
        color:  "white",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Discover Your Interests
        </Typography>

        {/* Search Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: darkMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255 255 255)",
            borderRadius: "16px",
            padding: 3,
            boxShadow: 3,
          }}
        >
          {/* Location Search */}
          <TextField
            fullWidth
            placeholder="Search by location..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          {/* Product/Category Search */}
          <TextField
            fullWidth
            placeholder="Search products, categories, or subcategories..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          {/* Search Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: "12px",
              px: 4,
              textTransform: "none",
            }}
          >
            Search
          </Button>
        </Box>

        {/* Categories Section */}
        <Box
          sx={{
            mt: 6,
            mb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            // textAlign="center"
            sx={{ fontWeight: "bold" }}
          >
            Browse Categories
          </Typography>
          {/* <Button variant="text">See More</Button> */}
        </Box>
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
              <Box
                onClick={() => navigate(category.NavigatePage)}
                sx={{
                  textAlign: "center",
                  padding: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)", // Scale up the box
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "120px",
                    height: "120px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)", // Zoom image on hover
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  mt={2}
                  sx={{
                    fontWeight: "bold",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#FF5722", // Change text color on hover
                    },
                  }}
                >
                  {category.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Slider Section */}
        {/* <Slide responsive={responsiveSettings} indicators={true}>
          {categories.map((category) => (
            <Card
              key={category.id}
              sx={{
                width: "100%", // Ensures cards are full width within the slider container
                maxWidth: "300px", // Sets a max width for the cards
                margin: "0 auto", // Centers the card
                borderRadius: "16px",
                overflow: "hidden",
                // boxShadow: darkMode ? "0px 4px 20px rgba(0, 0, 0, 0.8)" : 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)",
                  zIndex: 10, // Makes sure the hovered card is above others
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={category.image}
                alt={category.title}
                sx={{ objectFit: "cover", width: "100%", height: "160px" }} // Adjust image height as needed
              />
              <CardContent
                sx={{
                  backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                  textAlign: "center",
                  padding: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: darkMode ? "#ffffff" : "#333333",
                  }}
                >
                  {category.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Slide> */}
      </Container>
    </Box>
  );
}
