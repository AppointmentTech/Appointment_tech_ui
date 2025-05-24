import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Slider,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Pagination,
  Rating,
  Container,
  Drawer,
  IconButton,
  SwipeableDrawer,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Header from "Template/FrontWebsite/Components/Header.jsx";
import Footer from "Template/FrontWebsite/Components/Footer.jsx";

export default function FoodCateringDetails() {
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [1000, 10000],
    serviceType: { buffet: false, plated: false, familyStyle: false },
    dietaryPreferences: { vegan: false, vegetarian: false, nonVeg: false },
    mealType: { lunch: false, dinner: false, breakfast: false },
    rating: 0,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  // Mock JSON Data (30 Food Catering)
  const cateringData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Food Catering ${i + 1}`,
    location: i % 2 === 0 ? "New York" : "San Francisco",
    price: Math.floor(1000 + Math.random() * 9000),
    serviceType:
      i % 3 === 0 ? "buffet" : i % 3 === 1 ? "plated" : "familyStyle",
    dietaryPreferences: [
      ...(Math.random() > 0.5 ? ["Vegan"] : []),
      ...(Math.random() > 0.5 ? ["Vegetarian"] : []),
      ...(Math.random() > 0.5 ? ["Non-Veg"] : []),
    ],
    mealType: i % 2 === 0 ? "lunch" : "dinner",
    rating: Math.floor(Math.random() * 5 + 1),
    datePublished: `2025-01-${String(i + 1).padStart(2, "0")}`,
    distance: Math.floor(Math.random() * 20 + 1),
    image: `https://via.placeholder.com/300x200?text=Catering+${i + 1}`,
  }));

  const itemsPerPage = 6;

  // Filter Logic
  const applyFilters = () => {
    let filteredData = [...cateringData];

    // Filter by location
    if (filters.location) {
      filteredData = filteredData.filter((catering) =>
        catering.location
          .toLowerCase()
          .includes(filters.location.toLowerCase()),
      );
    }

    // Filter by price range
    filteredData = filteredData.filter(
      (catering) =>
        catering.price >= filters.priceRange[0] &&
        catering.price <= filters.priceRange[1],
    );

    // Filter by service type
    const { buffet, plated, familyStyle } = filters.serviceType;
    if (buffet || plated || familyStyle) {
      filteredData = filteredData.filter(
        (catering) =>
          (buffet && catering.serviceType === "buffet") ||
          (plated && catering.serviceType === "plated") ||
          (familyStyle && catering.serviceType === "familyStyle"),
      );
    }

    // Filter by dietary preferences
    const { vegan, vegetarian, nonVeg } = filters.dietaryPreferences;
    if (vegan || vegetarian || nonVeg) {
      filteredData = filteredData.filter((catering) =>
        ["Vegan", "Vegetarian", "Non-Veg"].every(
          (preference) =>
            (!vegan || catering.dietaryPreferences.includes("Vegan")) &&
            (!vegetarian ||
              catering.dietaryPreferences.includes("Vegetarian")) &&
            (!nonVeg || catering.dietaryPreferences.includes("Non-Veg")),
        ),
      );
    }

    // Filter by meal type
    const { lunch, dinner, breakfast } = filters.mealType;
    if (lunch || dinner || breakfast) {
      filteredData = filteredData.filter(
        (catering) =>
          (lunch && catering.mealType === "lunch") ||
          (dinner && catering.mealType === "dinner") ||
          (breakfast && catering.mealType === "breakfast"),
      );
    }

    // Filter by rating
    if (filters.rating > 0) {
      filteredData = filteredData.filter(
        (catering) => catering.rating >= filters.rating,
      );
    }

    // Sort by selected option
    if (sortBy === "lowToHigh") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      filteredData.sort((a, b) => b.price - a.price);
    } else if (sortBy === "datePublished") {
      filteredData.sort(
        (a, b) => new Date(b.datePublished) - new Date(a.datePublished),
      );
    } else if (sortBy === "distance") {
      filteredData.sort((a, b) => a.distance - b.distance);
    }

    return filteredData;
  };

  const filteredCatering = applyFilters();

  // Paginated Data
  const paginatedCatering = filteredCatering.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // Render Filters
  const renderFilters = () => (
    <Box sx={{ width: 300, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Filters
        </Typography>
        <IconButton onClick={() => setFilterOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Location
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter location..."
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={filters.priceRange}
          min={1000}
          max={10000}
          valueLabelDisplay="auto"
          onChange={(e, newValue) =>
            setFilters({ ...filters, priceRange: newValue })
          }
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Service Type
        </Typography>
        {["buffet", "plated", "familyStyle"].map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={filters.serviceType[type]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    serviceType: {
                      ...filters.serviceType,
                      [type]: e.target.checked,
                    },
                  })
                }
              />
            }
            label={type.charAt(0).toUpperCase() + type.slice(1)}
          />
        ))}
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Dietary Preferences
        </Typography>
        {["vegan", "vegetarian", "nonVeg"].map((preference) => (
          <FormControlLabel
            key={preference}
            control={
              <Checkbox
                checked={filters.dietaryPreferences[preference]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dietaryPreferences: {
                      ...filters.dietaryPreferences,
                      [preference]: e.target.checked,
                    },
                  })
                }
              />
            }
            label={preference.charAt(0).toUpperCase() + preference.slice(1)}
          />
        ))}
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Meal Type
        </Typography>
        {["lunch", "dinner", "breakfast"].map((meal) => (
          <FormControlLabel
            key={meal}
            control={
              <Checkbox
                checked={filters.mealType[meal]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    mealType: { ...filters.mealType, [meal]: e.target.checked },
                  })
                }
              />
            }
            label={meal.charAt(0).toUpperCase() + meal.slice(1)}
          />
        ))}
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Rating
        </Typography>
        <Rating
          value={filters.rating}
          onChange={(e, newValue) =>
            setFilters({ ...filters, rating: newValue })
          }
        />
      </Box>
    </Box>
  );
  // Render Sorting
  const renderSorting = () => (
    <Box sx={{ width: 300, p: 2 }}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="female"
          name="radio-buttons-group"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <FormControlLabel
            value="relevance"
            control={<Radio />}
            label="relevance"
          />
          <FormControlLabel
            value="lowToHigh"
            control={<Radio />}
            label="Price: Low to High"
          />
          <FormControlLabel
            value="highToLow"
            control={<Radio />}
            label="Price: High to Low"
          />
          <FormControlLabel
            value="datePublished"
            control={<Radio />}
            label="Date Published"
          />
          <FormControlLabel
            value="distance"
            control={<Radio />}
            label="Distance"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
  const handleChange = (event, newValue) => {
    setSortBy(newValue);
  };
  return (
    <React.Fragment>
      <Header />
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        {/* <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}> */}
        {/* Filters Section */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Button
            onClick={() => setFilterOpen(true)}
            startIcon={<FilterListIcon />}
          >
            Filter
          </Button>
          <Button onClick={() => setSortOpen(true)} startIcon={<SortIcon />}>
            Sort
          </Button>
        </Box>
        {/* Filters Drawer */}
        <Drawer
          anchor="left"
          open={isFilterOpen}
          onClose={() => setFilterOpen(false)}
        >
          {renderFilters()}
        </Drawer>
        {/* Sorting Swipeable Drawer */}
        <SwipeableDrawer
          anchor="bottom"
          open={isSortOpen}
          onClose={() => setSortOpen(false)}
          onOpen={() => setSortOpen(true)}
        >
          {renderSorting()}
        </SwipeableDrawer>
        <Box
          sx={{
            width: { xs: "100%", md: "300px" },
            flexShrink: 0,
            p: 2,
            display: { xs: "none", md: "block" },
            justifyContent: "flex-start",
            borderRight: { md: "1px solid #e0e0e0" },
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Filters
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Location
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter location..."
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Price Range
            </Typography>
            <Slider
              value={filters.priceRange}
              min={1000}
              max={10000}
              valueLabelDisplay="auto"
              onChange={(e, newValue) =>
                setFilters({ ...filters, priceRange: newValue })
              }
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Service Type
            </Typography>
            {["buffet", "plated", "familyStyle"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={filters.serviceType[type]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        serviceType: {
                          ...filters.serviceType,
                          [type]: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label={type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Dietary Preferences
            </Typography>
            {["vegan", "vegetarian", "nonVeg"].map((preference) => (
              <FormControlLabel
                key={preference}
                control={
                  <Checkbox
                    checked={filters.dietaryPreferences[preference]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        dietaryPreferences: {
                          ...filters.dietaryPreferences,
                          [preference]: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label={preference.charAt(0).toUpperCase() + preference.slice(1)}
              />
            ))}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Meal Type
            </Typography>
            {["lunch", "dinner", "breakfast"].map((meal) => (
              <FormControlLabel
                key={meal}
                control={
                  <Checkbox
                    checked={filters.mealType[meal]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        mealType: {
                          ...filters.mealType,
                          [meal]: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label={meal.charAt(0).toUpperCase() + meal.slice(1)}
              />
            ))}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Rating
            </Typography>
            <Rating
              value={filters.rating}
              onChange={(e, newValue) =>
                setFilters({ ...filters, rating: newValue })
              }
            />
          </Box>
        </Box>

        {/* Hostel List Section */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="bold">
              Food Catering
            </Typography>
            {/* <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
              <MenuItem value="datePublished">Date Published</MenuItem>
              <MenuItem value="distance">Distance</MenuItem>
            </Select> */}
          </Box>
          <Box
            sx={{
              width: "100%",
              mb: 3,
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              alignItems: "center",
              typography: "body1",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Sort By:
            </Typography>
            <Tabs
              value={sortBy}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"

              // size="small"
            >
              <Tab
                label="relevance"
                value="relevance"
                sx={{ fontSize: "small" }}
              />
              <Tab
                label="Price: Low to High"
                value="lowToHigh"
                sx={{ fontSize: "small" }}
              />
              <Tab
                label="Price: High to Low"
                value="highToLow"
                sx={{ fontSize: "small" }}
              />
              <Tab
                label="Date Published"
                value="datePublished"
                sx={{ fontSize: "small" }}
              />
              <Tab
                label="Distance"
                value="distance"
                sx={{ fontSize: "small" }}
              />
            </Tabs>
          </Box>
          <Grid container spacing={3}>
            {paginatedCatering.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.location}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{item.price}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Rating value={item.rating} readOnly />
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      Service Type: {item.serviceType}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Meal Type: {item.mealType}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" fullWidth>
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(filteredCatering.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>
        </Box>
        {/* </Box */}
      </Container>

      <Footer />
    </React.Fragment>
  );
}
