import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Container,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ContactUsForm() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            *Your Connection to Excellence – Reach Out Today*
          </Typography>
        </Box>

        {/* Contact Options Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: 8,
            justifyContent: "center",
          }}
        >
          {[
            {
              icon: PhoneIphoneIcon,
              title: "Call Us",
              description: "+1 234 567 890",
            },
            {
              icon: MailOutlineIcon,
              title: "Email Us",
              description: "contact@yourbusiness.com",
            },
            {
              icon: LocationOnOutlinedIcon,
              title: "Visit Us",
              description: "123 Main Street, Your City, Country",
            },
          ].map((option, index) => (
            <Card
            key={index}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: 3,
                width: "100%",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <option.icon sx={{ color: "#fff", fontSize: 30 }} />
              </Avatar>{" "}
              <Typography variant="h6" fontWeight="bold" mt={2}>
                {option.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {option.description}
              </Typography>
            </Card>
            // <Box
            //   key={index}
            //   sx={{
            //     textAlign: "center",
            //     p: 3,
            //     bgcolor: "rgba(0, 0, 0, 0.03)",
            //     borderRadius: "12px",
            //     flex: 1,
            //     boxShadow: 1,
            //   }}
            // >
            //   {option.icon}
            //   <Typography variant="h6" fontWeight="bold" mt={2}>
            //     {option.title}
            //   </Typography>
            //   <Typography variant="body1" color="text.secondary">
            //     {option.description}
            //   </Typography>
            // </Box>
          ))}
        </Box>

        {/* Contact Form Section */}
        <Card
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            p: 4,
            bgcolor: "rgba(0, 0, 0, 0.03)",
            borderRadius: "12px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            *We'd Love to Hear From You*
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Fill out the form below, and we’ll get back to you as soon as
            possible.
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ textTransform: "none", borderRadius: "12px" }}
            >
              Send Message
            </Button>
          </form>
        </Card>

        {/* Social Media Section */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            *Connect With Us on Social Media*
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Stay updated with the latest news and updates.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            {[
              { icon: <FacebookIcon fontSize="large" />, link: "#" },
              { icon: <TwitterIcon fontSize="large" />, link: "#" },
              { icon: <InstagramIcon fontSize="large" />, link: "#" },
              { icon: <LinkedInIcon fontSize="large" />, link: "#" },
            ].map((social, index) => (
              <IconButton
                key={index}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
