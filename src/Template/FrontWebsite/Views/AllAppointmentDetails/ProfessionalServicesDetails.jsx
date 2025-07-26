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
import Header from "@template/FrontWebsite/Components/Header.jsx";
import Footer from "@template/FrontWebsite/Components/Footer.jsx";

export default function ProfessionalServicesDetails() {
  const [filters, setFilters] = useState({
    expertiseType: "",
    priceRange: [1000, 20000],
    rating: 0,
    serviceCategories: [],
    experienceLevels: [],
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  const professionalData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Professional ${i + 1}`,
    expertiseType:
      i % 3 === 0 ? "Consulting" : i % 2 === 0 ? "Development" : "Design",
    serviceCategories: ["IT", "Healthcare", "Finance", "Education"].filter(
      () => Math.random() > 0.5,
    ),
    experienceLevels: ["Beginner", "Intermediate", "Expert"].filter(
      () => Math.random() > 0.5,
    ),
    price: Math.floor(Math.random() * 19000) + 1000,
    rating: Math.random() * 5,
    image: `https://via.placeholder.com/150?text=Professional+${i + 1}`,
  }));

  const servicesPerPage = 6;

  const applyFilters = () => {
    let filtered = professionalData.filter(
      (service) =>
        (!filters.expertiseType ||
          service.expertiseType === filters.expertiseType) &&
        service.price >= filters.priceRange[0] &&
        service.price <= filters.priceRange[1] &&
        service.rating >= filters.rating &&
        (filters.serviceCategories.length === 0 ||
          filters.serviceCategories.some((category) =>
            service.serviceCategories.includes(category),
          )) &&
        (filters.experienceLevels.length === 0 ||
          filters.experienceLevels.some((level) =>
            service.experienceLevels.includes(level),
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
        label="Expertise Type"
        variant="outlined"
        size="small"
        value={filters.expertiseType}
        onChange={(e) =>
          setFilters({ ...filters, expertiseType: e.target.value })
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
        min={1000}
        max={20000}
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
        Service Categories
      </Typography>
      {["IT", "Healthcare", "Finance", "Education"].map((category) => (
        <FormControlLabel
          key={category}
          control={
            <Checkbox
              checked={filters.serviceCategories.includes(category)}
              onChange={() =>
                handleCheckboxChange("serviceCategories", category)
              }
            />
          }
          label={category}
        />
      ))}

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Experience Levels
      </Typography>
      {["Beginner", "Intermediate", "Expert"].map((level) => (
        <FormControlLabel
          key={level}
          control={
            <Checkbox
              checked={filters.experienceLevels.includes(level)}
              onChange={() => handleCheckboxChange("experienceLevels", level)}
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
              label="Expertise Type"
              variant="outlined"
              size="small"
              value={filters.expertiseType}
              onChange={(e) =>
                setFilters({ ...filters, expertiseType: e.target.value })
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
              min={1000}
              max={20000}
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
              Service Categories
            </Typography>
            {["IT", "Healthcare", "Finance", "Education"].map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={filters.serviceCategories.includes(category)}
                    onChange={() =>
                      handleCheckboxChange("serviceCategories", category)
                    }
                  />
                }
                label={category}
              />
            ))}

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Experience Levels
            </Typography>
            {["Beginner", "Intermediate", "Expert"].map((level) => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    checked={filters.experienceLevels.includes(level)}
                    onChange={() =>
                      handleCheckboxChange("experienceLevels", level)
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
              Professional Services and Expertise
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
                      Expertise Type: {service.expertiseType}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{service.price}
                    </Typography>
                    <Rating value={service.rating} readOnly precision={0.5} />
                    <Typography variant="body2" color="textSecondary">
                      Service Categories:{" "}
                      {service.serviceCategories.join(", ") || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Experience Levels:{" "}
                      {service.experienceLevels.join(", ") || "N/A"}
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
              count={Math.ceil(professionalData.length / servicesPerPage)}
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
