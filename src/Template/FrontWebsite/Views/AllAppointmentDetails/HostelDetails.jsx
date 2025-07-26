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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Header from "@template/FrontWebsite/Components/Header.jsx";
import Footer from "@template/FrontWebsite/Components/Footer.jsx";
export default function HostelDetails() {
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [1000, 10000],
    type: { boys: false, girls: false, coed: false },
    amenities: { wifi: false, parking: false, ac: false },
    rating: 0,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  // Mock JSON Data (30 Hostels)
  const hostelData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Hostel ${i + 1}`,
    location: i % 2 === 0 ? "New York" : "San Francisco",
    price: Math.floor(1000 + Math.random() * 9000),
    type: i % 3 === 0 ? "boys" : i % 3 === 1 ? "girls" : "coed",
    amenities: [
      ...(Math.random() > 0.5 ? ["Wi-Fi"] : []),
      ...(Math.random() > 0.5 ? ["Parking"] : []),
      ...(Math.random() > 0.5 ? ["AC"] : []),
    ],
    rating: Math.floor(Math.random() * 5 + 1),
    datePublished: `2025-01-${String(i + 1).padStart(2, "0")}`,
    distance: Math.floor(Math.random() * 20 + 1),
    image: `https://via.placeholder.com/300x200?text=Hostel+${i + 1}`,
  }));

  const itemsPerPage = 6;

  // Filter Logic
  const applyFilters = () => {
    let filteredData = [...hostelData];

    // Filter by location
    if (filters.location) {
      filteredData = filteredData.filter((hostel) =>
        hostel.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // Filter by price range
    filteredData = filteredData.filter(
      (hostel) =>
        hostel.price >= filters.priceRange[0] &&
        hostel.price <= filters.priceRange[1],
    );

    // Filter by type
    const { boys, girls, coed } = filters.type;
    if (boys || girls || coed) {
      filteredData = filteredData.filter(
        (hostel) =>
          (boys && hostel.type === "boys") ||
          (girls && hostel.type === "girls") ||
          (coed && hostel.type === "coed"),
      );
    }

    // Filter by amenities
    const { wifi, parking, ac } = filters.amenities;
    if (wifi || parking || ac) {
      filteredData = filteredData.filter((hostel) =>
        ["Wi-Fi", "Parking", "AC"].every(
          (amenity) =>
            (!wifi || hostel.amenities.includes("Wi-Fi")) &&
            (!parking || hostel.amenities.includes("Parking")) &&
            (!ac || hostel.amenities.includes("AC")),
        ),
      );
    }

    // Filter by rating
    if (filters.rating > 0) {
      filteredData = filteredData.filter(
        (hostel) => hostel.rating >= filters.rating,
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

  const filteredHostels = applyFilters();

  // Paginated Data
  const paginatedHostels = filteredHostels.slice(
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
          Type
        </Typography>
        {["boys", "girls", "coed"].map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={filters.type[type]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    type: { ...filters.type, [type]: e.target.checked },
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
          Amenities
        </Typography>
        {["wifi", "parking", "ac"].map((amenity) => (
          <FormControlLabel
            key={amenity}
            control={
              <Checkbox
                checked={filters.amenities[amenity]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    amenities: {
                      ...filters.amenities,
                      [amenity]: e.target.checked,
                    },
                  })
                }
              />
            }
            label={amenity.toUpperCase()}
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
      {/* <Typography variant="h6" fontWeight="bold" gutterBottom>
        Sort By
      </Typography>
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        fullWidth
      >
        <MenuItem value="relevance">Relevance</MenuItem>
        <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
        <MenuItem value="highToLow">Price: High to Low</MenuItem>
        <MenuItem value="datePublished">Date Published</MenuItem>
        <MenuItem value="distance">Distance</MenuItem>
      </Select> */}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Filters
            </Typography>
            {/* <Button variant="text" startIcon={<SortIcon />}>
              Short
            </Button> */}
            {/* <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="small"
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
              <MenuItem value="datePublished">Date Published</MenuItem>
              <MenuItem value="distance">Distance</MenuItem>
            </Select> */}
          </Box>

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
              Type
            </Typography>
            {["boys", "girls", "coed"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={filters.type[type]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        type: { ...filters.type, [type]: e.target.checked },
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
              Amenities
            </Typography>
            {["wifi", "parking", "ac"].map((amenity) => (
              <FormControlLabel
                key={amenity}
                control={
                  <Checkbox
                    checked={filters.amenities[amenity]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        amenities: {
                          ...filters.amenities,
                          [amenity]: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label={amenity.toUpperCase()}
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
              Hostels
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
            {paginatedHostels.map((hostel) => (
              <Grid item xs={12} sm={6} md={4} key={hostel.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={hostel.image}
                    alt={hostel.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {hostel.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hostel.location}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${hostel.price}/month
                    </Typography>
                    <Rating value={hostel.rating} readOnly />
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button size="small" endIcon={<ArrowRightAltIcon/>}>View Details</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(filteredHostels.length / itemsPerPage)}
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
