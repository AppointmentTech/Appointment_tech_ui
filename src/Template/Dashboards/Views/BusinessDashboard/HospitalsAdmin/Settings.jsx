import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  SnackBar as MuiSnackbar,
} from "@mui/material";

export default function Settings() {
  const [hospitalName, setHospitalName] = useState("City Hospital");
  const [address, setAddress] = useState("123 Main St, City");
  const [contact, setContact] = useState("+91 12345 67890");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleSave = () => {
    setSnackMsg("Settings saved successfully!");
    setSnackOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hospital Settings
        </Typography>
        <Paper sx={{ p: 4 }}>
          <TextField
            label="Hospital Name"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
            Save Settings
          </Button>
        </Paper>
        <MuiSnackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message={snackMsg}
        />
      </Box>
    </Container>
  );
} 