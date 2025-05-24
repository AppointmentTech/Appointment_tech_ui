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

export default function HospitalDetails() {
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [1000, 10000],
    rating: 0,
    type: [],
    facilities: [],
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  // Mock JSON Data (30 Hospital)
  const hospitalData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Hospital ${i + 1}`,
    location: `City ${i % 5 + 1}`,
    type: i % 3 === 0 ? "Government" : i % 2 === 0 ? "Private" : "Multi-specialty",
    facilities: {
      ICU: Math.random() > 0.5,
      Emergency: Math.random() > 0.5,
      Pharmacy: Math.random() > 0.5,
      Parking: Math.random() > 0.5,
    },
    image: `https://via.placeholder.com/150?text=Hospital+${i + 1}`,
    rating: Math.random() * 5,
    price: Math.floor(Math.random() * 9000) + 1000,
  }));

  const hospitalsPerPage = 6;

  // Filter Logic
  const applyFilters = () => {
    let filtered = hospitalData.filter(
      (hospital) =>
        (!filters.location || hospital.location.includes(filters.location)) &&
        hospital.price >= filters.priceRange[0] &&
        hospital.price <= filters.priceRange[1] &&
        hospital.rating >= filters.rating &&
        (filters.type.length === 0 || filters.type.includes(hospital.type)) &&
        filters.facilities.every((facility) => hospital.facilities[facility])
    );

    if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "priceLowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered.slice((page - 1) * hospitalsPerPage, page * hospitalsPerPage);
  };

  const filteredHospitals = applyFilters();
  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };
  // Paginated Data
  const paginatedCatering = filteredHospitals.slice(
    (page - 1) * hospitalsPerPage,
    page * hospitalsPerPage,
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

      <Box>
              {/* Location Filter */}
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                size="small"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />

              {/* Price Range */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Price Range
              </Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, newValue) =>
                  setFilters({ ...filters, priceRange: newValue })
                }
                valueLabelDisplay="auto"
                min={1000}
                max={10000}
              />

              {/* Rating */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Rating
              </Typography>
              <Rating
                value={filters.rating}
                onChange={(_, newValue) =>
                  setFilters({ ...filters, rating: newValue })
                }
                precision={0.5}
              />

              {/* Type Filter */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Hospital Type
              </Typography>
              {["Government", "Private", "Multi-specialty"].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={filters.type.includes(type)}
                      onChange={() => handleCheckboxChange("type", type)}
                    />
                  }
                  label={type}
                />
              ))}

              {/* Facilities */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Facilities
              </Typography>
              {["ICU", "Emergency", "Pharmacy", "Parking"].map((facility) => (
                <FormControlLabel
                  key={facility}
                  control={
                    <Checkbox
                      checked={filters.facilities.includes(facility)}
                      onChange={() =>
                        handleCheckboxChange("facilities", facility)
                      }
                    />
                  }
                  label={facility}
                />
              ))}
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

          <Box>
              {/* Location Filter */}
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                size="small"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />

              {/* Price Range */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Price Range
              </Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, newValue) =>
                  setFilters({ ...filters, priceRange: newValue })
                }
                valueLabelDisplay="auto"
                min={1000}
                max={10000}
              />

              {/* Rating */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Rating
              </Typography>
              <Rating
                value={filters.rating}
                onChange={(_, newValue) =>
                  setFilters({ ...filters, rating: newValue })
                }
                precision={0.5}
              />

              {/* Type Filter */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Hospital Type
              </Typography>
              {["Government", "Private", "Multi-specialty"].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={filters.type.includes(type)}
                      onChange={() => handleCheckboxChange("type", type)}
                    />
                  }
                  label={type}
                />
              ))}

              {/* Facilities */}
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Facilities
              </Typography>
              {["ICU", "Emergency", "Pharmacy", "Parking"].map((facility) => (
                <FormControlLabel
                  key={facility}
                  control={
                    <Checkbox
                      checked={filters.facilities.includes(facility)}
                      onChange={() =>
                        handleCheckboxChange("facilities", facility)
                      }
                    />
                  }
                  label={facility}
                />
              ))}
            </Box>
        </Box>

        {/* Hostel List Section */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="bold">
              Hospital
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
            {filteredHospitals.map((item) => (
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
              count={Math.ceil(filteredHospitals.length / hospitalsPerPage)}
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
