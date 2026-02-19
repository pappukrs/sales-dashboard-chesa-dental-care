import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import OrderDetails from './components/OrderDetails';
import { LayoutDashboard } from 'lucide-react';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#050505' }}>
        <AppBar
          position="sticky"
          elevation={0}
          className="glass-effect"
          sx={{
            top: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: 'rgba(5, 5, 5, 0.8)',
            borderBottom: '1px solid rgba(0, 209, 255, 0.1)'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LayoutDashboard size={28} style={{ marginRight: 12, color: '#00D1FF' }} />
              <Typography
                variant="h6"
                component="div"
                className="gradient-text"
                sx={{
                  fontWeight: 800,
                  letterSpacing: -1,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Chesa Sales
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: { xs: 2, md: 4 }, mb: 4, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
