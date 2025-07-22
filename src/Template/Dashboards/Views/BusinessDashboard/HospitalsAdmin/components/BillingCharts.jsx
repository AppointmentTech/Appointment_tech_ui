import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 140000 },
  { month: "Mar", revenue: 130000 },
  { month: "Apr", revenue: 160000 },
  { month: "May", revenue: 150000 },
  { month: "Jun", revenue: 180000 },
];

const paymentStatusData = [
  { name: "Paid", value: 18, color: "#4CAF50" },
  { name: "Unpaid", value: 7, color: "#F44336" },
];

const BillingCharts = () => (
  <Grid container spacing={3} mb={4}>
    <Grid item xs={12} md={8}>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
            Revenue Trend (Last 6 Months)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
            Bill Payment Status
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {paymentStatusData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default BillingCharts; 