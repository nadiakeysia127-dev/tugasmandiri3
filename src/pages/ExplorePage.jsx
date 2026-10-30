import React, { useState } from 'react';
import { Box, Typography, Grid, Stack, InputBase, Tabs, Tab } from '@mui/material';
import { Search } from '@mui/icons-material';
import SongCard from '../components/SongCard';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { albums, categories, artists } from '../data/mockData';

function ExplorePage() {
  const { songs } = useMusicPlayer();
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState('');

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      s.artist.toLowerCase().includes(q.toLowerCase()) ||
      s.genre.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3, maxWidth: 1400, mx: 'auto' }}>

      {/* Search bar */}
      <Box sx={{
        display: 'flex', alignItems: 'center',
        bgcolor: '#212121', border: '1px solid #383838', borderRadius: '4px',
        px: 2, py: 1, mb: 4, maxWidth: 560,
      }}>
        <Search sx={{ color: '#aaa', mr: 1.5, fontSize: 20 }} />
        <InputBase
          id="explore-search"
          placeholder="Cari lagu, artis, genre..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ flex: 1, color: '#fff', fontSize: '0.9rem' }}
        />
      </Box>

      {/* Jika tidak ada pencarian: tampilkan genre */}
      {!q && (
        <Box sx={{ mb: 4 }}>
          <Typography fontWeight={500} fontSize="1.1rem" sx={{ mb: 2 }}>Genre & Mood</Typography>
          <Grid container spacing={1.5}>
            {categories.map((cat) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={cat.id}>
                <Box
                  id={`genre-${cat.id}`}
                  sx={{
                    p: 2.5, borderRadius: '4px', cursor: 'pointer',
                    bgcolor: cat.color + '33',
                    border: `1px solid ${cat.color}55`,
                    '&:hover': { bgcolor: cat.color + '55' },
                  }}
                >
                  <Typography fontWeight={600} fontSize="0.95rem">{cat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        id="explore-tabs"
        sx={{ mb: 3, borderBottom: '1px solid #383838' }}
      >
        <Tab label="Lagu" id="explore-tab-songs" />
        <Tab label="Artis" id="explore-tab-artists" />
        <Tab label="Album" id="explore-tab-albums" />
      </Tabs>

      {/* Tab: Lagu */}
      {tab === 0 && (
        <Stack spacing={0}>
          {filtered.map((song) => (
            <SongCard key={song.id} song={song} variant="row" />
          ))}
          {filtered.length === 0 && (
            <Typography color="#555" sx={{ py: 4, textAlign: 'center' }}>
              Tidak ada hasil untuk "{q}"
            </Typography>
          )}
        </Stack>
      )}

      {/* Tab: Artis */}
      {tab === 1 && (
        <Grid container spacing={2}>
          {artists.map((artist) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={artist.id}>
              <Box
                id={`artist-${artist.id}`}
                sx={{
                  textAlign: 'center', p: 2, bgcolor: '#212121',
                  borderRadius: '4px', cursor: 'pointer', '&:hover': { bgcolor: '#272727' },
                }}
              >
                <Box component="img" src={artist.cover} alt={artist.name}
                  sx={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', mx: 'auto', mb: 1, display: 'block' }}
                />
                <Typography variant="body2" fontWeight={500} noWrap>{artist.name}</Typography>
                <Typography variant="caption" color="text.secondary">{artist.genre}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Tab: Album */}
      {tab === 2 && (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={album.id}>
              <Box
                id={`album-${album.id}`}
                sx={{
                  bgcolor: '#212121', borderRadius: '4px', overflow: 'hidden',
                  cursor: 'pointer', '&:hover': { bgcolor: '#272727' },
                }}
              >
                <Box component="img" src={album.cover} alt={album.title}
                  sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                />
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="body2" fontWeight={500} noWrap>{album.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{album.artist}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

    </Box>
  );
}

export default ExplorePage;
