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
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import Header from "Template/FrontWebsite/Components/Header.jsx";
import Footer from "Template/FrontWebsite/Components/Footer.jsx";

export default function GarageDetails() {
  const [filters, setFilters] = useState({
    serviceType: "",
    priceRange: [500, 10000],
    rating: 0,
    vehicleTypes: [],
    serviceLevels: [],
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  const serviceData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Service ${i + 1}`,
    serviceType:
      i % 3 === 0 ? "Repair" : i % 2 === 0 ? "Maintenance" : "Cleaning",
    vehicleTypes: ["Car", "Bike", "Truck", "Bus"].filter(
      () => Math.random() > 0.5,
    ),
    serviceLevels: ["Basic", "Standard", "Premium"].filter(
      () => Math.random() > 0.5,
    ),
    price: Math.floor(Math.random() * 9500) + 500,
    rating: Math.random() * 5,
    image: `https://via.placeholder.com/150?text=Service+${i + 1}`,
  }));

  const servicesPerPage = 6;

  const applyFilters = () => {
    let filtered = serviceData.filter(
      (service) =>
        (!filters.serviceType || service.serviceType === filters.serviceType) &&
        service.price >= filters.priceRange[0] &&
        service.price <= filters.priceRange[1] &&
        service.rating >= filters.rating &&
        (filters.vehicleTypes.length === 0 ||
          filters.vehicleTypes.some((type) =>
            service.vehicleTypes.includes(type),
          )) &&
        (filters.serviceLevels.length === 0 ||
          filters.serviceLevels.some((level) =>
            service.serviceLevels.includes(level),
          )),
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

    return filtered.slice((page - 1) * servicesPerPage, page * servicesPerPage);
  };

  const filteredServices = applyFilters();

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const renderFilters = () => (
    <Box sx={{ width: 300, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Filters
        </Typography>
        <IconButton onClick={() => setFilterOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        label="Service Type"
        variant="outlined"
        size="small"
        value={filters.serviceType}
        onChange={(e) =>
          setFilters({ ...filters, serviceType: e.target.value })
        }
      />

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Price Range
      </Typography>
      <Slider
        value={filters.priceRange}
        onChange={(_, newValue) =>
          setFilters({ ...filters, priceRange: newValue })
        }
        valueLabelDisplay="auto"
        min={500}
        max={10000}
      />

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Rating
      </Typography>
      <Rating
        value={filters.rating}
        onChange={(_, newValue) => setFilters({ ...filters, rating: newValue })}
        precision={0.5}
      />

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Vehicle Types
      </Typography>
      {["Car", "Bike", "Truck", "Bus"].map((type) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={filters.vehicleTypes.includes(type)}
              onChange={() => handleCheckboxChange("vehicleTypes", type)}
            />
          }
          label={type}
        />
      ))}

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Service Levels
      </Typography>
      {["Basic", "Standard", "Premium"].map((level) => (
        <FormControlLabel
          key={level}
          control={
            <Checkbox
              checked={filters.serviceLevels.includes(level)}
              onChange={() => handleCheckboxChange("serviceLevels", level)}
            />
          }
          label={level}
        />
      ))}
    </Box>
  );
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
          <FormControlLabel value="name" control={<Radio />} label="Name" />
          <FormControlLabel value="rating" control={<Radio />} label="Rating" />
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
              label="Service Type"
              variant="outlined"
              size="small"
              value={filters.serviceType}
              onChange={(e) =>
                setFilters({ ...filters, serviceType: e.target.value })
              }
            />

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Price Range
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={(_, newValue) =>
                setFilters({ ...filters, priceRange: newValue })
              }
              valueLabelDisplay="auto"
              min={500}
              max={10000}
            />

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

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Vehicle Types
            </Typography>
            {["Car", "Bike", "Truck", "Bus"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={filters.vehicleTypes.includes(type)}
                    onChange={() => handleCheckboxChange("vehicleTypes", type)}
                  />
                }
                label={type}
              />
            ))}

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Service Levels
            </Typography>
            {["Basic", "Standard", "Premium"].map((level) => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    checked={filters.serviceLevels.includes(level)}
                    onChange={() =>
                      handleCheckboxChange("serviceLevels", level)
                    }
                  />
                }
                label={level}
              />
            ))}
          </Box>
        </Box>

        {/* Hostel List Section */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="bold">
              Garage Services
            </Typography>
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
              <Tab label="Name" value="name" sx={{ fontSize: "small" }} />
              <Tab label="Rating" value="rating" sx={{ fontSize: "small" }} />
            </Tabs>
          </Box>
          <Grid container spacing={3}>
            {filteredServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {service.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Service Type: {service.serviceType}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{service.price}
                    </Typography>
                    <Rating value={service.rating} readOnly precision={0.5} />
                    <Typography variant="body2" color="textSecondary">
                      Vehicle Types: {service.vehicleTypes.join(", ") || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Service Levels:{" "}
                      {service.serviceLevels.join(", ") || "N/A"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="contained" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(serviceData.length / servicesPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Box>
        </Box>
        {/* </Box */}
        <Drawer
          anchor="left"
          open={isFilterOpen}
          onClose={() => setFilterOpen(false)}
        >
          {renderFilters()}
        </Drawer>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
