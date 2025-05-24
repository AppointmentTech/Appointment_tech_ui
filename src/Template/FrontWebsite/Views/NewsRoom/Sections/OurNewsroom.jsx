import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Container,
} from "@mui/material";

export default function OurNewsroom() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ my: 3 }}>
          {/* Page Header */}
          <Typography
            variant="h4"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Welcome to Our Newsroom
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Get the latest updates, insights, and stories from our diverse
            business ventures.
          </Typography>

          {/* News Sections */}
          <Grid container spacing={6}>
            {[
              {
                title: "Innovations in Hostel Living",
                punchline: "Reimagining Comfort for the Next Generation",
                description:
                  "Explore how we're setting trends in student living with modern amenities and premium services.",
                image:
                  "https://img.freepik.com/free-photo/happy-young-people-using-tablet-students-learning-having-fun-friends-party-home-hipster-company-together-two-men-one-woman-smiling-positive-online-education-listening-music_285396-212.jpg?t=st=1736865732~exp=1736869332~hmac=b807afa63d4fa27784089798632fbc0543fb1a7e5ade12e9226a694495750c55&w=996",
              },
              {
                title: "Catering Success Stories",
                punchline: "From Kitchens to Hearts",
                description:
                  "Discover how our catering services are making events unforgettable with world-class cuisines.",
                image:
                  "https://img.freepik.com/free-photo/delicious-catering-food-table_23-2148482445.jpg?t=st=1737296785~exp=1737300385~hmac=76359c14c9eceffc42cce4b2785701876ace1fe293c30eb36fa58e427c077280&w=360",
              },
              {
                title: "Healthcare Breakthroughs",
                punchline: "Empowering Lives with Care",
                description:
                  "Stay informed about our latest efforts to make healthcare accessible and efficient.",
                image: "https://img.freepik.com/free-photo/medical-specialist-presenting-coronavirus-using-tablet-sitting-desk-medical-office_482257-8097.jpg?t=st=1737296863~exp=1737300463~hmac=a3ae08ea8cef294173feb5bdafd5b5badeebd5ea24245a2a8436a6d0a84d5ce2&w=996",
              },
              {
                title: "Garage Tech Trends",
                punchline: "Driving the Future of Maintenance",
                description:
                  "Learn about our cutting-edge technology and expertise in vehicle servicing.",
                image: "https://img.freepik.com/free-photo/person-using-ar-technology-their-daily-occupation_23-2151137331.jpg?t=st=1737297046~exp=1737300646~hmac=f3567e7c184684285e6b99d2550e598ef2fd5d360a3afdf643fe288397abf397&w=996",
              },
              {
                title: "Beauty & Ink Chronicles",
                punchline: "Unveiling Creativity, One Style at a Time",
                description:
                  "Dive into the artistry of our beauty experts and tattoo artists, making bold statements.",
                image: "https://img.freepik.com/free-photo/beauty-woman-applying-makeup-beautiful-girl-looking-mirror-applying-cosmetic-with-big-brush_155003-3746.jpg?t=st=1737297203~exp=1737300803~hmac=f21caae741d5bc711bccd4efda08dcfd43c37cb43a9d518e0662e5c1cd92a3f4&w=996",
              },
              {
                title: "Fashion Runway Insights",
                punchline: "Where Innovation Meets Elegance",
                description:
                  "Stay ahead with updates from the fashion world, curated by our in-house designers.",
                image: "https://img.freepik.com/free-photo/happy-female-friends-enjoying-shopping-clothes-store-together-holding-dress-posing-taking-pictures-mobile-phone-consumerism-shopping-concept_74855-11789.jpg?t=st=1737297285~exp=1737300885~hmac=348f2d70307b3fc69c164a192ca019d825ac35207b5776f71f2aeacc7beb1dc1&w=996",
              },
              
              {
                title: "Customer Testimonials",
                punchline: "Real Stories, Real Impact",
                description:
                  "Hear from our customers about how our services have positively impacted their lives.",
                image: "https://img.freepik.com/free-photo/collage-customer-experience-concept_23-2149367125.jpg?t=st=1737297380~exp=1737300980~hmac=92d5cc493e58d37514663ce78c0006a64293b0703cb64c70de94cc12dd2cbab5&w=996",
              },
              {
                title: "Sustainability Initiatives",
                punchline: "Building a Better Tomorrow",
                description:
                  "Discover our commitment to sustainability and how we’re making a difference.",
                image: "https://img.freepik.com/free-photo/researchers-looking-alternative-energy-souces_23-2149311442.jpg?ga=GA1.1.741936167.1725459333&semt=ais_incoming",
              },
              {
                title: "Events & Announcements",
                punchline: "Stay in the Loop",
                description:
                  "Don’t miss out on our upcoming events, launches, and exciting collaborations.",
                image: "https://img.freepik.com/free-photo/nightclub-stage-singer-spotlighted-audience-illuminated-music-fills-air-generated-by-artificial-intelligence_188544-124734.jpg?t=st=1737297552~exp=1737301152~hmac=5f3056735e3b995f0523083b4cd42d7c76ec1dfbe32677c85829c5fce91ea47e&w=1060",
              },
            ].map((section, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                 <Card
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                    boxShadow: 4,
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  {/* Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={section.image}
                    alt={section.title}
                    sx={{
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Content */}
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h5" fontWeight="bold">
                      {section.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      sx={{ fontStyle: "italic", mb: 1 }}
                    >
                      {section.punchline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {section.description}
                    </Typography>
                  </CardContent>
                </Card>
                
              </Grid>
            ))}
          </Grid>
      </Container>
    </React.Fragment>
  );
}
