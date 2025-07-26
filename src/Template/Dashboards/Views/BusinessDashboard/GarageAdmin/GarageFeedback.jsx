// Imports
import React, { useState } from "react";
import {
  Box, Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Rating, Select, MenuItem, Stack, Avatar, IconButton, Chip
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import FlagIcon from "@mui/icons-material/Flag";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import CommonHeader from "Template/Dashboards/Components/CommonHeader.jsx";

const GarageFeedback = () => {
  const theme = useTheme();

  const [reviews, setReviews] = useState([
    { id: 1, name: "Ravi Kumar", date: "2025-07-24", rating: 4, comment: "Great service!", reply: "Thanks!" },
    { id: 2, name: "Asha Patel", date: "2025-07-20", rating: 5, comment: "Quick response!", reply: "" },
    { id: 3, name: "Vinod Yadav", date: "2025-07-15", rating: 2, comment: "Too slow", reply: "" },
    { id: 4, name: "Nikita Sharma", date: "2025-07-10", rating: 3, comment: "Okay but not fast", reply: "" },
  ]);

  const [filterRating, setFilterRating] = useState("All");
  const [replyDialog, setReplyDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredReviews = filterRating === "All"
    ? reviews
    : reviews.filter((r) => r.rating === parseInt(filterRating));

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0
  ).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    name: `${star} Star`,
    value: reviews.filter((r) => r.rating === star).length,
    color: ["#4caf50", "#8bc34a", "#ffc107", "#ff9800", "#f44336"][5 - star],
  }));

  const monthlyTrend = [
    { month: "April", avg: 4.0 },
    { month: "May", avg: 3.5 },
    { month: "June", avg: 4.2 },
    { month: "July", avg: 4.0 },
  ];

  const keywordFrequency = [
    { keyword: "quick", count: 3 },
    { keyword: "slow", count: 2 },
    { keyword: "great", count: 4 },
    { keyword: "okay", count: 1 },
  ];

  const handleOpenReply = (review) => {
    setSelectedReview(review);
    setReplyDialog(true);
  };

  const handleReplySave = () => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id ? { ...r, reply: selectedReview.reply } : r
      )
    );
    setReplyDialog(false);
  };

  const handleExportCSV = () => {
    window.open("/mnt/data/GarageFeedback_Export.csv", "_blank");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CommonHeader role="admin" />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          overflow: "auto",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">Customer Feedback</Typography>
          <Stack direction="row" spacing={2}>
            <Select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              size="small"
            >
              <MenuItem value="All">All Ratings</MenuItem>
              {[5, 4, 3, 2, 1].map((val) => (
                <MenuItem key={val} value={val}>{val} Star</MenuItem>
              ))}
            </Select>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExportCSV}
            >
              Export CSV
            </Button>
          </Stack>
        </Grid>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, minHeight: 120 }}>
              <Typography variant="h6">{averageRating} / 5</Typography>
              <Rating value={parseFloat(averageRating)} precision={0.1} readOnly />
              <Typography variant="body2">Average Rating</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, minHeight: 120 }}>
              <Typography variant="h6">{reviews.length}</Typography>
              <Typography variant="body2">Total Feedback</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper sx={{ p: 2, minHeight: 120 }}>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>Rating Distribution</Typography>
              <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie data={ratingDistribution} dataKey="value" outerRadius={30}>
                    {ratingDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 250 }}>
              <Typography fontWeight="bold">Monthly Rating Trend</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="avg" stroke="#4caf50" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 250 }}>
              <Typography fontWeight="bold">Keyword Frequency</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keywordFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="keyword" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#2196f3" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Feedback Cards */}
        <Grid container spacing={3}>
          {filteredReviews.map((review) => (
            <Grid item xs={12} md={4} key={review.id}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar>{review.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography fontWeight="bold">{review.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(review.date).format("DD MMM YYYY")}
                    </Typography>
                  </Box>
                </Stack>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2" sx={{ mt: 1 }}>{review.comment}</Typography>
                {review.reply && (
                  <Chip
                    label={`Replied: ${review.reply}`}
                    color="success"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    startIcon={<ReplyIcon />}
                    onClick={() => handleOpenReply(review)}
                  >
                    Reply
                  </Button>
                  <Button size="small" startIcon={<FlagIcon />} color="error">
                    Flag
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Reply Dialog */}
        <Dialog open={replyDialog} onClose={() => setReplyDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>Reply to {selectedReview?.name}</DialogTitle>
          <DialogContent>
            <TextField
              label="Reply"
              fullWidth
              multiline
              rows={3}
              value={selectedReview?.reply || ""}
              onChange={(e) =>
                setSelectedReview((prev) => ({ ...prev, reply: e.target.value }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReplyDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleReplySave}>Send Reply</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GarageFeedback;
