import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Container,
} from "@mui/material";

export default function OurBusinessBanner() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Hero Section */}
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
            Explore Our Diverse Business Portfolio
          </Typography>
          <Typography variant="h6" gutterBottom>
            Seven industries, one vision – excellence and trust.
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
            Discover More
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
