import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SongCard from '../components/SongCard';
import { recentlyPlayed } from '../data/mockData';

function HomePage() {
  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>

      <Typography fontWeight={500} fontSize="1.1rem" sx={{ mb: 2 }}>
        Baru Diputar
      </Typography>

      <Grid container spacing={2}>
        {recentlyPlayed.map((song) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={song.id}>
            <SongCard song={song} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
}

export default HomePage;
