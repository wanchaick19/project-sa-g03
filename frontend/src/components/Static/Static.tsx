import React, { useEffect, useState } from 'react';
import { GetDashboardData } from '../../services/https/index';
import { Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { ShoppingCart, People, AttachMoney } from '@mui/icons-material';
import './StaticStyle.css'; // Updated path for Dashboard styles

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <CircularProgress className="loading-spinner" />;
  if (error) return <Typography className="error-message">{error}</Typography>;
  if (!dashboardData) return <Typography className="error-message">No data available.</Typography>;

  return (
    <Container className="dashboard">
      <Typography variant="h4" className="dashboard">Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className="card">
            <div>
              <Typography className="card-title">จำนวนร้านค้า</Typography>
              <Typography className="card-value">{dashboardData.totalShops}</Typography>
            </div>
            <ShoppingCart className="card-icon" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className="card">
            <div>
              <Typography className="card-title">จำนวนบัญชีผู้ใช้</Typography>
              <Typography className="card-value">{dashboardData.totalUsers}</Typography>
            </div>
            <People className="card-icon" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className="card">
            <div>
              <Typography className="card-title">รายได้</Typography>
              <Typography className="card-value">${dashboardData.totalReservationsPrice.toFixed(2)}</Typography>
            </div>
            <AttachMoney className="card-icon" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
