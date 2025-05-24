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
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import Header from "Template/FrontWebsite/Components/Header.jsx";
import Footer from "Template/FrontWebsite/Components/Footer.jsx";

export default function FashionDesignDetails() {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [500, 5000],
    rating: 0,
    colors: [],
    sizes: [],
    materials: [],
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  const fashionData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Design ${i + 1}`,
    category: i % 3 === 0 ? "Casual" : i % 2 === 0 ? "Formal" : "Ethnic",
    colors: ["Red", "Blue", "Green", "Black", "White"].filter(
      () => Math.random() > 0.5,
    ),
    sizes: ["S", "M", "L", "XL"].filter(() => Math.random() > 0.5),
    materials: ["Cotton", "Silk", "Denim", "Polyester"].filter(
      () => Math.random() > 0.5,
    ),
    price: Math.floor(Math.random() * 4500) + 500,
    rating: Math.random() * 5,
    image: `https://via.placeholder.com/150?text=Design+${i + 1}`,
  }));

  const designsPerPage = 6;

  const applyFilters = () => {
    let filtered = fashionData.filter(
      (design) =>
        (!filters.category || design.category === filters.category) &&
        design.price >= filters.priceRange[0] &&
        design.price <= filters.priceRange[1] &&
        design.rating >= filters.rating &&
        (filters.colors.length === 0 ||
          filters.colors.some((color) => design.colors.includes(color))) &&
        (filters.sizes.length === 0 ||
          filters.sizes.some((size) => design.sizes.includes(size))) &&
        (filters.materials.length === 0 ||
          filters.materials.some((material) =>
            design.materials.includes(material),
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

    return filtered.slice((page - 1) * designsPerPage, page * designsPerPage);
  };

  const filteredDesigns = applyFilters();

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
        label="Category"
        variant="outlined"
        size="small"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
        max={5000}
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
        Colors
      </Typography>
      {["Red", "Blue", "Green", "Black", "White"].map((color) => (
        <FormControlLabel
          key={color}
          control={
            <Checkbox
              checked={filters.colors.includes(color)}
              onChange={() => handleCheckboxChange("colors", color)}
            />
          }
          label={color}
        />
      ))}

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Sizes
      </Typography>
      {["S", "M", "L", "XL"].map((size) => (
        <FormControlLabel
          key={size}
          control={
            <Checkbox
              checked={filters.sizes.includes(size)}
              onChange={() => handleCheckboxChange("sizes", size)}
            />
          }
          label={size}
        />
      ))}

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Materials
      </Typography>
      {["Cotton", "Silk", "Denim", "Polyester"].map((material) => (
        <FormControlLabel
          key={material}
          control={
            <Checkbox
              checked={filters.materials.includes(material)}
              onChange={() => handleCheckboxChange("materials", material)}
            />
          }
          label={material}
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
              label="Category"
              variant="outlined"
              size="small"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
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
              max={5000}
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
              Colors
            </Typography>
            {["Red", "Blue", "Green", "Black", "White"].map((color) => (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox
                    checked={filters.colors.includes(color)}
                    onChange={() => handleCheckboxChange("colors", color)}
                  />
                }
                label={color}
              />
            ))}

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Sizes
            </Typography>
            {["S", "M", "L", "XL"].map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleCheckboxChange("sizes", size)}
                  />
                }
                label={size}
              />
            ))}

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Materials
            </Typography>
            {["Cotton", "Silk", "Denim", "Polyester"].map((material) => (
              <FormControlLabel
                key={material}
                control={
                  <Checkbox
                    checked={filters.materials.includes(material)}
                    onChange={() => handleCheckboxChange("materials", material)}
                  />
                }
                label={material}
              />
            ))}
          </Box>
        </Box>

        {/* Hostel List Section */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="bold">
              Fashion Design
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
              <Tab label="Name" value="name" sx={{ fontSize: "small" }} />
              <Tab label="Rating" value="rating" sx={{ fontSize: "small" }} />
            </Tabs>
          </Box>
          <Grid container spacing={3}>
            {filteredDesigns.map((design) => (
              <Grid item xs={12} sm={6} md={4} key={design.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={design.image}
                    alt={design.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {design.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {design.category}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{design.price}
                    </Typography>
                    <Rating value={design.rating} readOnly precision={0.5} />
                    <Typography variant="body2" color="textSecondary">
                      Colors: {design.colors.join(", ") || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Sizes: {design.sizes.join(", ") || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Materials: {design.materials.join(", ") || "N/A"}
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
              count={Math.ceil(fashionData.length / designsPerPage)}
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
