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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';

const GarageOffers = () => {
  const theme = useTheme();

  // State
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
  const [deleteDialog, setDeleteDialog] = useState({ open: false, offer: null });
  const [search, setSearch] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Filtered offers
  const filteredOffers = offers.filter((offer) => {
    if (!search) return true;
    return (
      offer.title.toLowerCase().includes(search.toLowerCase()) ||
      offer.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Open dialog for add/edit
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
    setFormErrors({});
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setSelectedOffer(null);
    setFormErrors({});
    setDialogOpen(false);
  };

  // Save offer (add/edit)
  const handleSaveOffer = () => {
    // Validation
    let errors = {};
    if (!selectedOffer.title) errors.title = "Title is required";
    if (!selectedOffer.startDate) errors.startDate = "Start date required";
    if (!selectedOffer.endDate) errors.endDate = "End date required";
    if (!selectedOffer.imageUrl && !selectedOffer.videoUrl) errors.media = "Image or video required";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
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

  // Delete offer
  const handleDelete = (offer) => {
    setDeleteDialog({ open: true, offer });
  };
  const confirmDelete = () => {
    setOffers((prev) => prev.filter((o) => o !== deleteDialog.offer));
    setDeleteDialog({ open: false, offer: null });
  };
  const cancelDelete = () => setDeleteDialog({ open: false, offer: null });

  // Status badge
  const renderStatusBadge = (status) => (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 2,
        px: 2,
        py: 0.5,
        borderRadius: 2,
        backgroundColor: status === "Active" ? theme.palette.success.main : theme.palette.grey[500],
        color: "#fff",
        fontWeight: 600,
        fontSize: 13,
        boxShadow: 2,
      }}
    >
      {status}
    </Box>
  );

  // Media preview
  const renderMedia = (offer) => {
    if (offer.imageUrl) {
      return (
        <Box sx={{ position: "relative" }}>
          <img
            src={offer.imageUrl}
            alt="Offer"
            style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12 }}
          />
        </Box>
      );
    }
    if (offer.videoUrl) {
      return (
        <Box sx={{ position: "relative" }}>
          <video
            src={offer.videoUrl}
            controls
            style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12 }}
          />
        </Box>
      );
    }
    return null;
  };

  // Empty state
  const renderEmptyState = () => (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <img
        src="https://cdn.dribbble.com/users/1751799/screenshots/3818677/media/2e7e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.png"
        alt="No offers"
        style={{ width: 180, opacity: 0.7 }}
      />
      <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
        No offers or campaigns found.
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleRoundedIcon />}
        sx={{ mt: 3, borderRadius: 3 }}
        onClick={() => handleOpenDialog()}
      >
        Create First Offer
      </Button>
    </Box>
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
        {/* Header & Search */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">Offers & Campaigns</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ position: "relative", width: 220 }}>
              <SearchIcon sx={{ position: "absolute", left: 8, top: 10, color: "text.secondary" }} />
              <input
                type="text"
                placeholder="Search offers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 8px 8px 32px",
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  outline: "none",
                  fontSize: 16,
                  background: theme.palette.background.paper,
                }}
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<AddCircleRoundedIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ borderRadius: 3, display: { xs: "none", sm: "flex" } }}
            >
              New Campaign
            </Button>
          </Stack>
        </Grid>

        {/* Offer Cards Grid */}
        {filteredOffers.length === 0 ? (
          renderEmptyState()
        ) : (
          <Grid container spacing={3}>
            {filteredOffers.map((offer) => (
              <Grid item xs={12} sm={6} md={4} key={offer.id}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.07)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0px 16px 32px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  {/* Status badge */}
                  {renderStatusBadge(offer.status)}
                  {/* Media preview */}
                  {renderMedia(offer)}
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {offer.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {offer.description}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
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
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(offer)}
                        title="Edit Offer"
                        sx={{ borderRadius: 2 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(offer)}
                        title="Delete Offer"
                        sx={{ borderRadius: 2 }}
                      >
                        <DeleteOutlineOutlinedIcon color="error" />
                      </IconButton>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button for mobile */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
            borderRadius: "50%",
            minWidth: 0,
            width: 56,
            height: 56,
            display: { xs: "flex", sm: "none" },
            boxShadow: 4,
          }}
          onClick={() => handleOpenDialog()}
        >
          <AddCircleRoundedIcon fontSize="large" />
        </Button>

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
                error={!!formErrors.title}
                helperText={formErrors.title}
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
                error={!!formErrors.startDate}
                helperText={formErrors.startDate}
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
                error={!!formErrors.endDate}
                helperText={formErrors.endDate}
              />
              <TextField
                label="Image URL"
                fullWidth
                value={selectedOffer?.imageUrl || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
                error={!!formErrors.media}
                helperText={formErrors.media && !selectedOffer?.imageUrl && !selectedOffer?.videoUrl ? formErrors.media : ""}
              />
              <TextField
                label="Video URL"
                fullWidth
                value={selectedOffer?.videoUrl || ""}
                onChange={(e) =>
                  setSelectedOffer((prev) => ({ ...prev, videoUrl: e.target.value }))
                }
                error={!!formErrors.media}
                helperText={formErrors.media && !selectedOffer?.imageUrl && !selectedOffer?.videoUrl ? formErrors.media : ""}
              />
              {/* Media preview in dialog */}
              {(selectedOffer?.imageUrl || selectedOffer?.videoUrl) && (
                <Box sx={{ mt: 1 }}>
                  {selectedOffer?.imageUrl && (
                    <img
                      src={selectedOffer.imageUrl}
                      alt="Preview"
                      style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
                    />
                  )}
                  {selectedOffer?.videoUrl && (
                    <video
                      src={selectedOffer.videoUrl}
                      controls
                      style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
                    />
                  )}
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveOffer} variant="contained">
              {selectedOffer?.id ? "Update" : "Add Offer"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onClose={cancelDelete}>
          <DialogTitle>Delete Offer?</DialogTitle>
          <DialogContent>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Are you sure you want to delete this offer? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete}>Cancel</Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageOffers;
