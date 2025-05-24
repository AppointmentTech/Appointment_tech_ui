import React,{useState} from "react";
import {
  Box,
  Typography,

  Button,
Container
} from "@mui/material";
export default function AboutBanner () {

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{  py: 5 }}>
    
      {/* Hero Banner */}
      <Box
        sx={{
          textAlign: "center",
          background: "linear-gradient(45deg, #0d47a1, #2196f3)",
          color: "#fff",
          py: 6,
          borderRadius: "16px",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Discover Excellence in Every Service
        </Typography>
        <Typography variant="h6" gutterBottom>
          From hostel stays to fashion design, we cater to your every need.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: 3,
            borderRadius: "12px",
            px: 4,
            textTransform: "none",
          }}
        >
          Get Started
        </Button>
      </Box>
    
    </Container>
    </React.Fragment>
  );
};
