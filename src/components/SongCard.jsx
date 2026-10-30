import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { PlayArrow, Pause, FavoriteBorder, Favorite } from '@mui/icons-material';
import { useMusicPlayer } from '../context/MusicPlayerContext';

function SongCard({ song, variant = 'card' }) {
  const { currentSong, isPlaying, playSong, togglePlay, toggleLike, isLiked } = useMusicPlayer();
  const isCurrent = currentSong?.id === song.id;
  const liked = isLiked(song.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    isCurrent ? togglePlay() : playSong(song);
  };

  // List row variant
  if (variant === 'row') {
    return (
      <Box
        id={`song-row-${song.id}`}
        onClick={() => playSong(song)}
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          p: '6px 8px', borderRadius: 1, cursor: 'pointer',
          bgcolor: isCurrent ? 'rgba(255,0,0,0.08)' : 'transparent',
          '&:hover': { bgcolor: isCurrent ? 'rgba(255,0,0,0.12)' : '#272727' },
        }}
      >
        <Box component="img" src={song.cover} alt={song.title}
          sx={{ width: 42, height: 42, borderRadius: '2px', objectFit: 'cover', flexShrink: 0 }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" noWrap
            sx={{ color: isCurrent ? '#ff0000' : '#fff', fontWeight: isCurrent ? 600 : 400 }}>
            {song.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>{song.artist}</Typography>
        </Box>
        <Typography variant="caption" color="#555" sx={{ flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>
          {song.duration}
        </Typography>
        <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
          sx={{ color: liked ? '#ff0000' : '#555' }}>
          {liked ? <Favorite sx={{ fontSize: 16 }} /> : <FavoriteBorder sx={{ fontSize: 16 }} />}
        </IconButton>
        <IconButton size="small" onClick={handlePlay} sx={{ color: '#aaa' }}>
          {isCurrent && isPlaying ? <Pause sx={{ fontSize: 18 }} /> : <PlayArrow sx={{ fontSize: 18 }} />}
        </IconButton>
      </Box>
    );
  }

  // Card variant (default)
  return (
    <Box
      id={`song-card-${song.id}`}
      onClick={() => playSong(song)}
      sx={{
        bgcolor: '#212121', borderRadius: '4px', overflow: 'hidden',
        cursor: 'pointer', border: isCurrent ? '1px solid #ff0000' : '1px solid transparent',
        '&:hover': { bgcolor: '#272727' },
        '&:hover .play-btn': { opacity: 1 },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box component="img" src={song.cover} alt={song.title}
          sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
        />
        <IconButton className="play-btn" onClick={handlePlay}
          sx={{
            position: 'absolute', bottom: 6, right: 6,
            bgcolor: '#ff0000', color: '#fff',
            width: 36, height: 36,
            opacity: isCurrent ? 1 : 0,
            '&:hover': { bgcolor: '#cc0000' },
          }}
        >
          {isCurrent && isPlaying ? <Pause sx={{ fontSize: 18 }} /> : <PlayArrow sx={{ fontSize: 18 }} />}
        </IconButton>
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Typography variant="body2" fontWeight={500} noWrap
          sx={{ color: isCurrent ? '#ff0000' : '#fff' }}>
          {song.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
          {song.artist}
        </Typography>
      </Box>
    </Box>
  );
}

export default SongCard;
