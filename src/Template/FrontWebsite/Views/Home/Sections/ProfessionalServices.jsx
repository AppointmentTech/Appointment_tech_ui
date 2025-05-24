import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
} from "@mui/material";

const professions = [
  {
    title: "Software Engineer",
    image:
      "https://img.freepik.com/free-photo/side-view-attractive-hispanic-software-developer-programming-using-computer-while-working-from-home_662251-958.jpg?ga=GA1.1.741936167.1725459333&semt=ais_hybrid",
    description: "Experts in coding, development, and technology.",
  },
  {
    title: "Mechanical Engineer",
    image:
      "https://img.freepik.com/free-photo/industrial-worker-working-production-line-factory_342744-177.jpg?ga=GA1.1.741936167.1725459333&semt=ais_hybrid",
    description: "Specialists in designing and maintaining mechanical systems.",
  },
  {
    title: "Civil Engineer",
    image:
      "https://img.freepik.com/free-photo/medium-shot-side-view-construction-engineer-looking-camera_23-2148233713.jpg?ga=GA1.1.741936167.1725459333&semt=ais_hybrid",
    description: "Professionals in infrastructure and construction projects.",
  },
  {
    title: "Electrical Engineer",
    image:
      "https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15084.jpg?ga=GA1.1.741936167.1725459333&semt=ais_hybrid",
    description: "Experts in electrical systems and power solutions.",
  },
  {
    title: "Lawyer (Advocate)",
    image:
      "https://img.freepik.com/premium-photo/attorney-man-scales-hammer-with-writing-documents-notes-reading-thinking-crime-analysis-advocate-lawyer-judge-with-legal-research-paperwork-analytics-court-evidence_590464-212223.jpg?w=900",
    description: "Legal professionals providing advice and representation.",
  },
  {
    title: "Chartered Accountant(CA)",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-holding-her-notebook-smiling-camera-high-quality-photo_144627-75837.jpg?t=st=1736699732~exp=1736703332~hmac=006aaa4b66d4adf3874d624a7977a0cdf42589d91c1638414edac3969f9b8878&w=996",
    description: "Experts in accounting, taxation, and financial planning.",
  },
  {
    title: "Teacher",
    image:
      "https://img.freepik.com/free-photo/smiling-showing-thumb-up-young-male-teacher-wearing-glasses-points-blackboard-classroom_141793-114462.jpg?t=st=1736699793~exp=1736703393~hmac=66f7906c6bd2dfce26c1d940c7887889ef289e9f5cb477cfe1c5900c8420e0fa&w=996",
    description: "Educators shaping the future with knowledge and guidance.",
  },
  {
    title: "Architect",
    image:
      "https://img.freepik.com/free-photo/architect-architecture-design-infrastructure-construction-concept_53876-132309.jpg?t=st=1736699834~exp=1736703434~hmac=b0bac713bccc8e44a85f0e6b0213b76bcd942716ab3b77833da8f2be6758ba14&w=900",
    description: "Designers of creative and functional building spaces.",
  },
];

const ProfessionalServices = () => {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box>
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Professional Services and Expertise
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Explore and connect with top professionals from various fields
            </Typography>
            {/* <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            gutterBottom
          >
            Professional Services and Expertise
          </Typography>
          <Typography variant="subtitle1" textAlign="center" gutterBottom>
            Explore and connect with top professionals from various fields
          </Typography> */}
          </Box>
          {/* Grid Section */}
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {professions.map((profession, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={profession.image}
                    alt={profession.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {profession.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {profession.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: "none",
                        mt: 2,
                        borderRadius: "8px",
                      }}
                      fullWidth
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ProfessionalServices;
