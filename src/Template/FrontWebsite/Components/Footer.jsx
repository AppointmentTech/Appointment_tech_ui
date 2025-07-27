import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Container,
  Paper,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ThemeContext } from "ContextOrRedux/ThemeProvider.js";
import { useTheme } from "@mui/material/styles";
import logo from "../Assets/Media/logo.png";

const Footer = () => {
  const themeMode = useContext(ThemeContext);
  const darkMode = themeMode.state.darkMode;
  const theme = useTheme();
  const orange = "#ff671f";
  const darkBg = theme.palette.background.default;
  const lightBg = "#fff";
  const splitBg = !darkMode
    ? `linear-gradient(120deg, ${orange} 55%, ${lightBg} 0%)`
    : `linear-gradient(120deg, ${orange} 55%, ${darkBg} 0%)`;
  const cardBg = !darkMode ? "#fff" : theme.palette.background.paper;
  const cardText = orange;
  const sectionText = orange;
  const socialBarBg = orange;
  const socialBarColor = "#fff";
  
  // Enhanced text colors for better visibility
  const primaryTextColor = !darkMode ? "#1a1a1a" : "#ffffff";
  const secondaryTextColor = !darkMode ? "#4a4a4a" : "#e0e0e0";
  const linkTextColor = !darkMode ? "#2c2c2c" : "#ffffff";

  return (
    <Box sx={{ position: "relative", mt: 8 }}>
      

      {/* Diagonal Split Background */}
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: 700, sm: 600, md: 420 },
          background: splitBg,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
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
            : `linear-gradient(45deg, rgb(114 117 241 / 25%), rgb(187 147 225 / 8%))`,
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
          right: "6%",
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
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 10 } }}>
        {/* Central Floating Card */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 3, md: 4 } }}>
          <Paper elevation={6} sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: 4,
            background: cardBg,
            minWidth: { xs: 280, sm: 320 },
            maxWidth: 420,
            textAlign: "center",
            transform: { xs: "none", md: "translateY(-60px)" },
            boxShadow: !darkMode ? "0 8px 32px rgba(255,103,31,0.12)" : "0 8px 32px rgba(0,0,0,0.32)",
            backdropFilter: 'blur(10px)',
            border: !darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
          }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ height: { xs: 40, sm: 48 }, width: { xs: 40, sm: 48 }, objectFit: "contain" }}
              />
              <Typography variant="h5" fontWeight="bold" sx={{ 
                fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                lineHeight: 1.2
              }}>
                YourCompany
              </Typography>
            </Box>
            <Typography variant="body2" color={secondaryTextColor} sx={{ 
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
              lineHeight: 1.5
            }}>
              Delivering quality services and solutions since 2025. Your satisfaction is our priority.
            </Typography>
          </Paper>
        </Box>
        {/* Footer Sections */}
        <Grid container spacing={{ xs: 2, md: 2 }} justifyContent="center">
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h5" gutterBottom sx={{ 
                fontSize: { xs: '1.4rem', sm: '1.5rem', md: '1.6rem' },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2
              }}>
                Quick Links
              </Typography>
              <Link href="/" underline="hover" color={linkTextColor} sx={{ 
                display: "block", 
                mb: 1.5, 
                fontWeight: 500, 
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                transition: 'all 0.3s ease',
                '&:hover': { 
                  // color: orange, 
                  textDecoration: 'underline',
                  transform: 'translateX(5px)',
                  fontWeight: 600
                }
              }}>
                Home
              </Link>
              <Link href="/about" underline="hover" color={linkTextColor} sx={{ 
                display: "block", 
                mb: 1.5, 
                fontWeight: 500, 
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                transition: 'all 0.3s ease',
                '&:hover': { 
                  // color: orange, 
                  textDecoration: 'underline',
                  transform: 'translateX(5px)',
                  fontWeight: 600
                }
              }}>
                About Us
              </Link>
              <Link href="/OurBusinesses" underline="hover" color={linkTextColor} sx={{ 
                display: "block", 
                mb: 1.5, 
                fontWeight: 500, 
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                transition: 'all 0.3s ease',
                '&:hover': { 
                  // color: orange, 
                  textDecoration: 'underline',
                  transform: 'translateX(5px)',
                  fontWeight: 600
                }
              }}>
                Our Business
              </Link>
              <Link href="/NewsRoom" underline="hover" color={linkTextColor} sx={{ 
                display: "block", 
                mb: 1.5, 
                fontWeight: 500, 
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                transition: 'all 0.3s ease',
              }}>
                News Room
              </Link>
              <Link href="/ContactUs" underline="hover" color={linkTextColor} sx={{ 
                display: "block", 
                fontWeight: 500, 
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                transition: 'all 0.3s ease',
                '&:hover': { 
                  // color: orange, 
                  textDecoration: 'underline',
                  transform: 'translateX(5px)',
                  fontWeight: 600
                }
              }}>
                Contact
              </Link>
            </Box>
          </Grid>
          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h5" gutterBottom sx={{ 
                fontSize: { xs: '1.4rem', sm: '1.5rem', md: '1.6rem' },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2
              }}>
                Contact Us
              </Typography>
              <Typography variant="body2" color={secondaryTextColor} sx={{ 
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                mb: 1.5,
                lineHeight: 1.6,
              }}>
                Email: info@yourcompany.com
              </Typography>
              <Typography variant="body2" color={secondaryTextColor} sx={{ 
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                mb: 1.5,
                lineHeight: 1.6
              }}>
                Phone: +1 234 567 890
              </Typography>
              <Typography variant="body2" color={secondaryTextColor} sx={{ 
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                lineHeight: 1.6
              }}>
                Address: 1234 Your Street, City, Country
              </Typography>
            </Box>
          </Grid>
          {/* Subscribe */}
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h5" gutterBottom sx={{ 
                fontSize: { xs: '1.4rem', sm: '1.5rem', md: '1.6rem' },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2
              }}>
                Stay Updated
              </Typography>
              <Typography variant="body2" color={secondaryTextColor} mb={3} sx={{ 
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                lineHeight: 1.6
              }}>
                Subscribe to our newsletter for updates and offers.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  placeholder="Enter your email"
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: !darkMode ? "#f8f9fa" : theme.palette.background.default,
                    borderRadius: 1,
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: `1px solid ${orange}`,
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    background: orange,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    minWidth: { xs: '100%', sm: 'auto' },
                    py: 1.5,
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      background: '#e65c18',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(255, 103, 31, 0.4)',
                      scale: 1.05
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Social Bar */}
      <Box
        sx={{
          width: "100%",
          background: socialBarBg,
          color: socialBarColor,
          py: { xs: 2, md: 2 },
          mt: { xs: -2, md: -4 },
          zIndex: 2,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <IconButton href="#" sx={{ 
                  background: "rgba(255,255,255,0.1)", 
                  color: socialBarColor, 
                  m: 0.5, 
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    background: orange, 
                    color: '#fff',
                    transform: 'scale(1.15) rotate(5deg)',
                    boxShadow: '0 4px 12px rgba(255, 103, 31, 0.4)'
                  }
                }}>
                  <FacebookIcon sx={{ fontSize: { xs: '1.3rem', sm: '1.4rem' } }} />
                </IconButton>
                <IconButton href="#" sx={{ 
                  background: "rgba(255,255,255,0.1)", 
                  color: socialBarColor, 
                  m: 0.5, 
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    background: orange, 
                    color: '#fff',
                    transform: 'scale(1.15) rotate(5deg)',
                    boxShadow: '0 4px 12px rgba(255, 103, 31, 0.4)'
                  }
                }}>
                  <TwitterIcon sx={{ fontSize: { xs: '1.3rem', sm: '1.4rem' } }} />
                </IconButton>
                <IconButton href="#" sx={{ 
                  background: "rgba(255,255,255,0.1)", 
                  color: socialBarColor, 
                  m: 0.5, 
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    background: orange, 
                    color: '#fff',
                    transform: 'scale(1.15) rotate(5deg)',
                    boxShadow: '0 4px 12px rgba(255, 103, 31, 0.4)'
                  }
                }}>
                  <InstagramIcon sx={{ fontSize: { xs: '1.3rem', sm: '1.4rem' } }} />
                </IconButton>
                <IconButton href="#" sx={{ 
                  background: "rgba(255,255,255,0.1)", 
                  color: socialBarColor, 
                  m: 0.5, 
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    background: orange, 
                    color: '#fff',
                    transform: 'scale(1.15) rotate(5deg)',
                    boxShadow: '0 4px 12px rgba(255, 103, 31, 0.4)'
                  }
                }}>
                  <LinkedInIcon sx={{ fontSize: { xs: '1.3rem', sm: '1.4rem' } }} />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="inherit" sx={{ 
                fontWeight: 500, 
                textAlign: { xs: 'center', sm: 'right' }, 
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.4
              }}>
                © {new Date().getFullYear()} YourCompany. All Rights Reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
