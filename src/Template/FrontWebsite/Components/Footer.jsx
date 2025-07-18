import React,{useContext} from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Container,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ThemeContext } from "ContextOrRedux/ThemeProvider.js";
import logo from "../Assets/Media/logo.png";

const Footer = () => {
      const themeMode = useContext(ThemeContext);
      const darkMode = themeMode.state.darkMode;
  return (
    <React.Fragment>
      
    <Box
      sx={{
        background: darkMode
          ? "linear-gradient(135deg,rgb(97, 110, 219),rgb(63, 77, 156),rgb(53, 77, 212))"
          : "#090040",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg" >
      <Grid container spacing={4}>
        {/* Logo and About Section */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <Box
              component="img"
              src={logo} // Replace with your logo's URL or path
              alt="Logo"
              sx={{
                height: 50,
                width: 50,
                objectFit: "contain",
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              YourCompany
            </Typography>
          </Box>
          <Typography variant="body2" color="grey.400">
            Delivering quality services and solutions since 2025 Your
            satisfaction is our priority.
          </Typography>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="#" underline="hover" color="grey.300">
              Home
            </Link>
          </Box>
          <Box>
            <Link href="#" underline="hover" color="grey.300">
              About Us
            </Link>
          </Box>
          <Box>
            <Link href="#" underline="hover" color="grey.300">
              Services
            </Link>
          </Box>
          <Box>
            <Link href="#" underline="hover" color="grey.300">
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" color="grey.400">
            Email: info@yourcompany.com
          </Typography>
          <Typography variant="body2" color="grey.400">
            Phone: +1 234 567 890
          </Typography>
          <Typography variant="body2" color="grey.400">
            Address: 1234 Your Street, City, Country
          </Typography>
        </Grid>

        {/* Subscribe Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Stay Updated
          </Typography>
          <Typography variant="body2" color="grey.400" mb={2}>
            Subscribe to our newsletter for updates and offers.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="Enter your email"
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                flexGrow: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Box
        sx={{
          borderTop: "1px solid #444",
          mt: 4,
          pt: 2,
        }}
      >
        {/* Social Media and Copyright */}
        <Grid container justifyContent="space-between" alignItems="center">
          {/* Social Media Icons */}
          <Grid item>
            <Box>
              <IconButton href="#" sx={{ color: "grey.400" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "grey.400" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "grey.400" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "grey.400" }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          {/* Copyright */}
          <Grid item>
            <Typography variant="body2" color="grey.400">
              © {new Date().getFullYear()} YourCompany. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      </Container>
    </Box>
    </React.Fragment>
  );
};

export default Footer;
