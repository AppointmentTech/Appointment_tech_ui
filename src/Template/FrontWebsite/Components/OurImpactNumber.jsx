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
  Container
} from "@mui/material";


export default function OurImpactNumber () {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* Our Impact in Numbers */}
        <Box
          sx={{
            my: 6,
            py: 4,
            bgcolor: "secondary.main",
            color: "#fff",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Our Impact in Numbers
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {[
              { title: "20K+", subtitle: "Happy Customers" },
              { title: "500+", subtitle: "Expert Professionals" },
              { title: "100+", subtitle: "Cities Covered" },
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Typography variant="h3" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="h6">{item.subtitle}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call-to-Action */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Experience the Best?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, borderRadius: "12px" }}
          >
            Explore Our Services
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

