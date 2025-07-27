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
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ThemeContext } from "ContextOrRedux/ThemeProvider.js";

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
  const theme = useTheme();
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
          ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`
          : `linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 3, md: 6 },
        transition: "background 0.5s ease-in-out",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left Decorative Element */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "10%",
          width: "300px",
          height: "400px",
          background: darkMode
            ? `linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))`
            : `linear-gradient(45deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))`,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          transform: "rotate(-15deg)",
          zIndex: 0,
          opacity: darkMode ? 0.6 : 1,
        }}
      />
      
      {/* Right Decorative Element */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: "20%",
          width: "250px",
          height: "350px",
          background: darkMode
            ? `linear-gradient(-45deg, rgba(236, 72, 153, 0.1), rgba(239, 68, 68, 0.1))`
            : `linear-gradient(-45deg, rgba(236, 72, 153, 0.25), rgba(239, 68, 68, 0.25))`,
          borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
          transform: "rotate(20deg)",
          zIndex: 0,
          opacity: darkMode ? 0.6 : 1,
        }}
      />
      
      {/* Center Decorative Circle */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "60%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "200px",
          background: darkMode
            ? `radial-gradient(circle, rgba(34, 197, 94, 0.1), transparent)`
            : `radial-gradient(circle, rgba(34, 197, 94, 0.25), transparent)`,
          borderRadius: "50%",
          zIndex: 0,
          opacity: darkMode ? 0.4 : 0.9,
        }}
      />

      <Container maxWidth="lg">
       <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: darkMode ? "#ffffff" : "#1e293b",
            transition: "color 0.5s",
          }}
        >
          Discover Your Interests
        </Typography>

        {/* Search Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2.5,
            alignItems: 'center',
            justifyContent: 'center',
            background: darkMode
              ? 'rgba(44, 62, 80, 0.75)'
              : 'rgba(96, 165, 250, 0.18)', // more visible blue for light mode
            borderRadius: 4,
            p: { xs: 2, md: 3 },
            boxShadow: darkMode
              ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              : '0 8px 32px 0 rgba(80,80,180,0.10)',
            mb: 4,
            transition: 'background 0.5s',
            backdropFilter: 'blur(10px)',
            border: darkMode
              ? '1.5px solid rgba(255,255,255,0.08)'
              : '1.5px solid #60a5fa', // blue-400 border for light mode
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: darkMode ? '#34495e' : '#f8fafc',
                color: darkMode ? '#fff' : '#222',
              },
              input: {
                color: darkMode ? '#fff' : '#222',
              },
              transition: 'background 0.5s',
            }}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: darkMode ? '#34495e' : '#f8fafc',
                color: darkMode ? '#fff' : '#222',
              },
              input: {
                color: darkMode ? '#fff' : '#222',
              },
              transition: 'background 0.5s',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: 3,
              ml: { md: 1 },
              height: 56,
              fontSize: "1.1rem",
            }}
          >
            Search
          </Button>
        </Box>

        {/* Browse Categories */}
        <Box sx={{ mt: 6, mb: 2, display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: darkMode ? "#ffffff" : "#1e293b",
              transition: "color 0.5s",
            }}
          >
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
                      backgroundColor: darkMode ? '#2c3e50' : '#ffffff',
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      textAlign: "center",
                      boxShadow: darkMode
                        ? "0 8px 24px rgba(0,0,0,0.45)"
                        : "0 8px 20px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        backgroundColor: darkMode ? '#34495e' : '#f8fafc',
                        boxShadow: darkMode
                          ? "0 12px 32px rgba(0,0,0,0.65)"
                          : "0 12px 30px rgba(0,0,0,0.12)",
                      },
                      "&:hover .hoverfooter": {
                        height: "90px",
                      },
                      "&:hover .hoverHeader": {
                        height: "90px",
                        backgroundColor: darkMode ? '#2c3e50' : '#ffffff',
                      },
                      "&:hover .profileImage": {
                        border: `4px solid ${theme.palette.primary.main}`,
                        transform: "scale(1.05)",
                      },
                      "&:hover .categoryTitle": {
                        color: "#ffffff",
                      }
                    }}
                  >
                    {/* hover footer */}
                    <Box
                      className="hoverfooter"
                      sx={{
                        backgroundColor: theme.palette.primary.main,
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
                        backgroundColor: theme.palette.primary.main,
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
                        border: `3px solid ${theme.palette.primary.light}`,
                      }}
                    />

                    {/* Title */}
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      className="categoryTitle"
                      sx={{
                        px: 1,
                        color: darkMode ? theme.palette.primary.light : "#1e293b",
                        textTransform: "capitalize",
                        fontSize: "0.95rem",
                        mt: 1,
                        zIndex: 2,
                        position: "relative",
                        transition: "color 0.3s",
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
       </Box>
      </Container>
    </Box >
  );
}