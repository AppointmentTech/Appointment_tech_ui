import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Container,
  Paper,
  IconButton,
} from "@mui/material";

export default function GetToKnow() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Get To Know Us
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Get the latest updates, insights, and stories from our diverse
          business ventures.
        </Typography>
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fafafa",
            // borderRight: "1px solid #ddd",
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
              lg: "none",
              xl: "none",
            },
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "20px 10px",
            borderRadius: "16px",
          }}
        >
          <Tabs
            orientation="horizontal"
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="Get to Know Us Tabs"
            sx={{
              width: "100%",
              "& .MuiTab-root": {
                padding: "15px 30px",
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#222",
                "&.Mui-selected": {
                  backgroundColor: "#222",
                  color: "white",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <Tab label="Our Mission" />
            <Tab label="Our Vision" />
            <Tab label="Our Values" />
            {/* <Tab label="Team" /> */}
          </Tabs>
        </Box>
        <Box sx={{ display: "flex" }}>
          {/* Left Sidebar */}
          <Box
            sx={{
              width: 250,
              bgcolor: "#fafafa",
              // borderRight: "1px solid #ddd",
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "20px 10px",
              borderRadius: "16px",
            }}
          >
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={handleTabChange}
              aria-label="Get to Know Us Tabs"
              sx={{
                width: "100%",
                "& .MuiTab-root": {
                  padding: "35px 30px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#222",
                  "&.Mui-selected": {
                    backgroundColor: "#222",
                    color: "white",
                    borderRadius: "8px",
                  },
                },
              }}
            >
              <Tab label="Our Mission" />
              <Tab label="Our Vision" />
              <Tab label="Our Values" />
              {/* <Tab label="Team" /> */}
            </Tabs>
          </Box>

          {/* Right Content Area */}
          <Container>
            {/* <Paper sx={{ padding: "40px", borderRadius: "10px", boxShadow: 3 }}> */}
            {activeTab === 0 && (
              <Box
                style={{
                  padding: "60px 10px",
                  textAlign: "center",
                  backgroundColor: "#f0f4f8",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="h3" color="text.primary" gutterBottom>
                  Our Mission
                </Typography>
                <Paper
                  style={{
                    padding: "40px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    maxWidth: "900px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      // color: '#1976d2',
                      marginBottom: "20px",
                    }}
                  >
                    Empowering Change
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#666666",
                      marginBottom: "20px",
                    }}
                  >
                    "We are committed to driving impactful change through
                    innovation and creating opportunities that empower
                    individuals and organizations to reach their fullest
                    potential."
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    style={{ fontStyle: "italic" }}
                  >
                    *"Innovation in Action, Change in Progress."*
                  </Typography>
                </Paper>
              </Box>
            )}
            {activeTab === 1 && (
              <Box
                style={{
                  padding: "60px 10px",
                  textAlign: "center",
                  backgroundColor: "#e8eaf6",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="h3" color="text.primary" gutterBottom>
                  Our Vision
                </Typography>
                <Paper
                  style={{
                    padding: "40px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    maxWidth: "900px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      //  color: '#1976d2',
                      marginBottom: "20px",
                    }}
                  >
                    Shaping the Future
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#666666",
                      marginBottom: "20px",
                    }}
                  >
                    "We envision a world where our solutions inspire
                    transformation and create sustainable progress, ensuring a
                    brighter and more inclusive future for all."
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    style={{ fontStyle: "italic" }}
                  >
                    *"Building Tomorrow, Today."*
                  </Typography>
                </Paper>
              </Box>
            )}
            {activeTab === 2 && (
              <Box
                style={{
                  padding: "60px 10px",
                  textAlign: "center",
                  backgroundColor: "#f0f4f8",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="h3" color="text.primary" gutterBottom>
                  Our Core Values
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12} sm={4}>
                    <Paper
                      style={{
                        padding: "30px",
                        textAlign: "center",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          fontWeight: "bold",
                          // color: '#1976d2',
                          marginBottom: "15px",
                        }}
                      >
                        Integrity
                      </Typography>
                      <Typography variant="body1" style={{ color: "#666666" }}>
                        "We uphold the highest standards of honesty,
                        transparency, and responsibility in everything we do."
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper
                      style={{
                        padding: "30px",
                        textAlign: "center",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          fontWeight: "bold",
                          // color: '#1976d2',
                          marginBottom: "15px",
                        }}
                      >
                        Innovation
                      </Typography>
                      <Typography variant="body1" style={{ color: "#666666" }}>
                        "We embrace creativity and strive to provide
                        groundbreaking solutions that solve real-world
                        challenges."
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper
                      style={{
                        padding: "30px",
                        textAlign: "center",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          fontWeight: "bold",
                          // color: '#1976d2',
                          marginBottom: "15px",
                        }}
                      >
                        Excellence
                      </Typography>
                      <Typography variant="body1" style={{ color: "#666666" }}>
                        "We continually aim for excellence in everything we do,
                        delivering results that surpass expectations."
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ fontStyle: "italic", marginTop: "30px" }}
                >
                  *"Integrity, Innovation, Excellence – The Cornerstones of Our
                  Journey."*
                </Typography>
              </Box>
            )}
            {/* {activeTab === 3 && (
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: "600" }}>
                    Meet Our Team
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: "20px", color: "gray" }}
                  >
                    Our team is our strength. A group of passionate individuals
                    working together to achieve excellence. Our leadership and
                    diverse talent pool are the driving forces behind our
                    success.
                  </Typography>
                </Box>
              )} */}
            {/* </Paper> */}
          </Container>
        </Box>
      </Container>
    </React.Fragment>
  );
}
