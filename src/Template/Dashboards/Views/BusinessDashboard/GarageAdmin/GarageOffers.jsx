import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";
import dayjs from "dayjs";

const GarageOffers = () => {
  const theme = useTheme();

  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Monsoon Checkup Camp",
      description: "Free vehicle checkup + 15% discount on labor.",
      startDate: "2025-07-20",
      endDate: "2025-08-05",
      status: "Active",
      imageUrl: "https://img.freepik.com/free-vector/mechanic-service-banner-template_23-2148848738.jpg?t=st=1753543507~exp=1753547107~hmac=d8d583774a69bf1547d378a5735acf9959dabf3d2539f6110e087d21eed1b260&w=826",
    },
    {
      id: 2,
      title: "Battery Replacement Promo",
      description: "Flat ₹500 off on Amaron and Exide batteries.",
      startDate: "2025-07-01",
      endDate: "2025-07-15",
      status: "Expired",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleOpenDialog = (offer = null) => {
    setSelectedOffer(
      offer || {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Active",
        imageUrl: "",
        videoUrl: "",
      }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedOffer(null);
    setDialogOpen(false);
  };

  const handleSaveOffer = () => {
    const newOffer = {
      id: selectedOffer?.id || Date.now(),
      ...selectedOffer,
    };

    setOffers((prev) =>
      selectedOffer?.id
        ? prev.map((o) => (o.id === selectedOffer.id ? newOffer : o))
        : [...prev, newOffer]
    );

    handleCloseDialog();
  };

  const renderStatusChip = (status) =>
    status === "Active" ? (
      <Chip icon={<CheckCircleIcon />} label="Active" color="success" />
    ) : (
      <Chip icon={<CancelIcon />} label="Expired" color="default" />
    );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CommonHeader role="admin" />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          overflow: "auto",
          background: theme.palette.mode === "dark"
            ? "#121212"
            : "linear-gradient(120deg, #f3f4f6, #e3f2fd)",
        }}
      >
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">Offers & Campaigns</Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleRoundedIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 3 }}
          >
            New Campaign
          </Button>
        </Grid>

        {/* Offer Cards */}
        <Grid container spacing={3}>
          {offers.map((offer) => (
            <Grid item xs={12} md={6} key={offer.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: theme.palette.mode === "dark"
                    ? "#1e1e1e"
                    : "linear-gradient(135deg, #ffffff, #e8f5e9)",
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.05)",
                }}
              >
                {offer.imageUrl && (
                  <img
                    src={offer.imageUrl}
                    alt="Offer"
                    style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
                  />
                )}
                {offer.videoUrl && (
                  <video
                    src={offer.videoUrl}
                    controls
                    style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
                  />
                )}

                <Typography variant="h6" fontWeight="bold">
                  {offer.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {offer.description}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
                  <Chip
                    label={`From: ${dayjs(offer.startDate).format("DD MMM")}`}
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    label={`To: ${dayjs(offer.endDate).format("DD MMM")}`}
                    variant="outlined"
                    color="primary"
                  />
                  {renderStatusChip(offer.status)}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenDialog(offer)}
                    sx={{ borderRadius: 2 }}
                  >
                    Edit
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              p: 3,
              borderRadius: 4,
              backdropFilter: "blur(15px)",
              backgroundColor: theme.palette.mode === "dark"
                ? "rgba(18,18,18,0.9)"
                : "rgba(255,255,255,0.9)",
            },
          }}
        >
          <DialogTitle fontWeight="bold">
            {selectedOffer?.id ? "Update Offer" : "Create New Offer"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Offer Title"
                fullWidth
                value={selectedOffer?.title || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={selectedOffer?.description || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, description: e.target.value }))
                }
              />
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={selectedOffer?.startDate || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, startDate: e.target.value }))
                }
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={selectedOffer?.endDate || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, endDate: e.target.value }))
                }
              />
              <TextField
                label="Image URL"
                fullWidth
                value={selectedOffer?.imageUrl || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
              />
              <TextField
                label="Video URL"
                fullWidth
                value={selectedOffer?.videoUrl || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, videoUrl: e.target.value }))
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveOffer} variant="contained">
              {selectedOffer?.id ? "Update" : "Add Offer"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageOffers;
