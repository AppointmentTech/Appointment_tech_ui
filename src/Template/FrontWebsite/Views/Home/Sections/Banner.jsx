import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ThemeContext } from "@context/ThemeProvider.js";

// Categories Array
const categories = [
  {
    id: 1,
    title: "Hostels",
    NavigatePage: "/HostelDetails",
    image: "https://img.freepik.com/free-photo/young-friends-hostel_52683-121725.jpg",
  },
  {
    id: 2,
    title: "Hospitals",
    NavigatePage: "/HospitalDetails",
    image: "https://img.freepik.com/free-photo/modern-hospital-building-exterior_1150-3567.jpg",
  },
  {
    id: 3,
    title: "Garages",
    NavigatePage: "/GarageDetails",
    image: "https://img.freepik.com/free-photo/auto-repair-shop-interior-with-tools_1150-3134.jpg",
  },
  {
    id: 4,
    title: "Beauty & Tattoo",
    NavigatePage: "/BeautyTattooDetails",
    image: "https://img.freepik.com/free-photo/beauty-salon-interior-with-modern-furniture_1150-3916.jpg",
  },
  {
    id: 5,
    title: "Food Catering",
    NavigatePage: "/FoodCateringDetails",
    image: "https://img.freepik.com/free-photo/modern-office-interior-with-computer_1150-3007.jpg",
  },
  {
    id: 6,
    title: "Fashion Design",
    NavigatePage: "/FashionDesignDetails",
    image: "https://img.freepik.com/free-photo/cozy-interior-modern-cafe-with-computers_1150-3193.jpg",
  },
  {
    id: 7,
    title: "Professional Services and Expertise",
    NavigatePage: "/ProfessionalServicesDetails",
    image: "https://img.freepik.com/free-photo/luxury-hotel-room-interior-with-comfortable-bed_1150-3057.jpg",
  },
  {
    id: 8,
    title: "Taxis",
    image: "https://img.freepik.com/free-photo/taxi-service-modern-yellow-cab-car_1150-3522.jpg",
  },
];

export default function UniqueSearchAndCategories() {
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: darkMode
          ? "#131010ff" // Or any dark background
          : "linear-gradient(200deg, #615EFC,#6D67E4)",
        //  : "linear-gradient(to right, #2C4C9C,#4F75FF,615EFC,AAC4FF,615EFC)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 4, color: "white" }}
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
              ? "rgba(223, 216, 216, 0.83)"
              : "rgba(255, 255, 255, 1)",
            borderRadius: "16px",
            padding: "10px",
            boxShadow: 7,
          }}
        >
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
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
          <TextField
            fullWidth
            placeholder="Search products, categories, or subcategories..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "12px", px: 4, textTransform: "none" }}
          >
            Search
          </Button>
        </Box>

        {/* Browse Categories */}
        <Box sx={{ mt: 6, mb: 2, display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
            Browse Categories
          </Typography>
        </Box>

        {/* Grid with 4 per row on large screens */}
        <Grid container spacing={4} justifyContent="center">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  {/* Round Card with Image & Title Inside */}
                  <Box
                    onClick={() =>
                      category.NavigatePage && navigate(category.NavigatePage)
                    }
                    sx={{
                      width: 250,
                      height: 220,
                      backgroundColor: "#fdf8f1", // base cream
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      textAlign: "center",
                      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
                      "&:hover .hoverfooter": {
                        height: "90px",
                      },
                      "&:hover .hoverHeader": {
                        height: "90px",
                        backgroundColor: "white",
                      },
                      "&:hover .profileImage": {
                        border: "4px solid",
                        borderColor:"#1c1c1fff",
                        transform: "scale(1.05)",
                      },
                      // "&:hover .categoryTitle": {
                      //   opacity: 1,
                      //   color:"black",
                      // }
                    }}
                  >
                    {/* hover footer */}
                    <Box
                      className="hoverfooter"
                      sx={{
                        backgroundColor: "#8576FF",
                        height: "0px",
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        borderTopLeftRadius: "50% 20%",
                        borderTopRightRadius: "40% 30%",
                        transition: "height 0.4s ease",
                        zIndex: 1,
                      }}
                    />
                    {/* Always-visible Top Header */}
                    <Box
                      className="hoverHeader"
                      sx={{
                        backgroundColor: "#8576FF",
                        height: "100px",
                        width: "100%",
                        borderBottomLeftRadius: "50% 20%",
                        borderBottomRightRadius: "50% 20%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transition: "height 0.4s ease",
                      }}
                    />

                    {/* Circular Image */}
                    <Box
                      component="img"
                      src={category.image}
                      alt={category.title}
                      className="profileImage"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginTop: "50px",
                        zIndex: 2,
                        position: "relative",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Title */}
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        px: 1,
                        color: "primary",
                        textTransform: "capitalize",
                        fontSize: "0.95rem",
                        mt: 1,
                        zIndex: 2,
                        position: "relative",
                        "&:hover": { color: "#101110ff" },
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

            ))
          ) : (
            <Typography mt={4} width="100%" textAlign="center">
              No categories found.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box >
  );
}