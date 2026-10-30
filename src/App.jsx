import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, InputBase, Avatar } from '@mui/material';
import { Search, Home, Explore } from '@mui/icons-material';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import PlayerBar from './components/PlayerBar';

const SIDEBAR_WIDTH = 200;

// ── Navbar (hanya logo + search + avatar) ─────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ gap: 2, minHeight: '56px !important' }}>

        {/* Logo */}
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', mr: 2 }}
        >
          <Box sx={{
            width: 32, height: 32, bgcolor: '#ff0000', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Box sx={{
              width: 0, height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderLeft: '12px solid white',
              ml: '3px',
            }} />
          </Box>
          <Typography fontSize="1rem" fontWeight="bold">YouTube Music</Typography>
        </Box>

        {/* Search */}
        <Box sx={{
          flex: 1, maxWidth: 500, display: 'flex', alignItems: 'center',
          bgcolor: '#121212', border: '1px solid #383838',
          borderRadius: '2px', px: 1.5, py: 0.5,
        }}>
          <Search sx={{ color: '#aaa', fontSize: 18, mr: 1 }} />
          <InputBase
            id="navbar-search"
            placeholder="Cari lagu, artis, album..."
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/explore?q=${e.target.value}`); }}
            sx={{ flex: 1, color: '#fff', fontSize: '0.875rem' }}
          />
        </Box>

        {/* Avatar - pojok kanan */}
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff0000', fontSize: '0.85rem', cursor: 'pointer', ml: 'auto' }}>
          U
        </Avatar>

      </Toolbar>
    </AppBar>
  );
}

// ── Sidebar (Home & Explore) ──────────────────────────────────────────────────
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <Home />, path: '/' },
    { label: 'Explore', icon: <Explore />, path: '/explore' },
  ];

  return (
    <Box sx={{
      width: SIDEBAR_WIDTH,
      flexShrink: 0,
      bgcolor: '#212121',
      height: '100%',
      pt: 1,
      borderRight: '1px solid #383838',
    }}>
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Box
            key={item.path}
            id={`sidebar-${item.label.toLowerCase()}`}
            onClick={() => navigate(item.path)}
            sx={{
              display: 'flex', alignItems: 'center', gap: 2,
              px: 2.5, py: 1.5, cursor: 'pointer',
              color: active ? '#fff' : '#aaa',
              bgcolor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderLeft: active ? '3px solid #ff0000' : '3px solid transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.07)', color: '#fff' },
            }}
          >
            <Box sx={{ color: active ? '#ff0000' : '#aaa', display: 'flex' }}>
              {item.icon}
            </Box>
            <Typography fontSize="0.9rem" fontWeight={active ? 600 : 400}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Body di bawah navbar */}
      <Box sx={{ display: 'flex', flex: 1, mt: '56px', pb: '72px' }}>

        {/* Sidebar kiri */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'sticky', top: '56px', height: 'calc(100vh - 56px - 72px)' }}>
          <Sidebar />
        </Box>

        {/* Konten utama */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </Box>

      </Box>

      <PlayerBar />
    </Box>
  );
}

export default App;
