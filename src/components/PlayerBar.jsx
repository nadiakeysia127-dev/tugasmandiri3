import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, IconButton, Stack } from '@mui/material';
import {
  PlayArrow, Pause, SkipNext, SkipPrevious,
  VolumeUp, VolumeOff, FavoriteBorder, Favorite, Shuffle, Repeat,
} from '@mui/icons-material';
import { useMusicPlayer } from '../context/MusicPlayerContext';

function fmt(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function PlayerBar() {
  const {
    currentSong, isPlaying, togglePlay, nextSong, prevSong,
    volume, setVolume, progress, setProgress,
    currentTime, setCurrentTime, shuffle, setShuffle,
    repeat, setRepeat, toggleLike, isLiked,
  } = useMusicPlayer();

  const [muted, setMuted] = useState(false);
  const [lastVol, setLastVol] = useState(80);

  // Simulasi progress
  useEffect(() => {
    if (!isPlaying || !currentSong) return;
    const id = setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 0.5;
        if (next >= currentSong.durationSec) { setProgress(0); return 0; }
        setProgress((next / currentSong.durationSec) * 100);
        return next;
      });
    }, 500);
    return () => clearInterval(id);
  }, [isPlaying, currentSong]);

  if (!currentSong) {
    return (
      <Box sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 70, bgcolor: '#212121', borderTop: '1px solid #383838',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Typography variant="body2" color="#666">Pilih lagu untuk mulai memutar</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      bgcolor: '#212121', borderTop: '1px solid #383838',
      px: { xs: 1, md: 3 }, py: 1,
    }}>
      {/* Progress bar di atas */}
      <Slider
        value={progress}
        onChange={(_, v) => {
          setProgress(v);
          setCurrentTime((v / 100) * currentSong.durationSec);
        }}
        sx={{
          position: 'absolute', top: -4, left: 0, right: 0, width: '100%',
          p: '0 !important', height: 3, borderRadius: 0,
          color: '#ff0000',
          '& .MuiSlider-thumb': { width: 0, height: 0, '&:hover': { width: 12, height: 12 } },
          '&:hover .MuiSlider-thumb': { width: 12, height: 12 },
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Info lagu */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: '30%', minWidth: 0 }}>
          <Box
            component="img"
            src={currentSong.cover}
            alt={currentSong.title}
            sx={{ width: 46, height: 46, borderRadius: 1, flexShrink: 0, objectFit: 'cover' }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={500} noWrap>{currentSong.title}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>{currentSong.artist}</Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => toggleLike(currentSong.id)}
            sx={{ color: isLiked(currentSong.id) ? '#ff0000' : '#aaa' }}
          >
            {isLiked(currentSong.id) ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
        </Stack>

        {/* Kontrol */}
        <Stack alignItems="center" spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton
              size="small"
              onClick={() => setShuffle(p => !p)}
              sx={{ color: shuffle ? '#ff0000' : '#aaa', display: { xs: 'none', md: 'flex' } }}
            >
              <Shuffle fontSize="small" />
            </IconButton>

            <IconButton onClick={prevSong} sx={{ color: '#fff' }}>
              <SkipPrevious />
            </IconButton>

            <IconButton
              id="player-play-btn"
              onClick={togglePlay}
              sx={{ bgcolor: '#ff0000', color: '#fff', width: 40, height: 40, '&:hover': { bgcolor: '#cc0000' } }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <IconButton onClick={nextSong} sx={{ color: '#fff' }}>
              <SkipNext />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => setRepeat(p => p === 'none' ? 'all' : 'none')}
              sx={{ color: repeat !== 'none' ? '#ff0000' : '#aaa', display: { xs: 'none', md: 'flex' } }}
            >
              <Repeat fontSize="small" />
            </IconButton>
          </Stack>

          <Typography variant="caption" color="#666" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {fmt(currentTime)} / {currentSong.duration}
          </Typography>
        </Stack>

        {/* Volume */}
        <Stack
          direction="row" alignItems="center" spacing={1}
          sx={{ width: '30%', justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}
        >
          <IconButton
            size="small"
            onClick={() => {
              if (muted) { setVolume(lastVol); setMuted(false); }
              else { setLastVol(volume); setVolume(0); setMuted(true); }
            }}
            sx={{ color: '#aaa' }}
          >
            {muted || volume === 0 ? <VolumeOff fontSize="small" /> : <VolumeUp fontSize="small" />}
          </IconButton>
          <Slider
            value={muted ? 0 : volume}
            onChange={(_, v) => { setVolume(v); setMuted(false); }}
            sx={{ width: 80, color: '#aaa', height: 3 }}
            size="small"
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default PlayerBar;
