import React, { createContext, useContext, useState, useCallback } from 'react';
import { songs as initialSongs } from '../data/mockData';

const MusicPlayerContext = createContext(null);

export const MusicPlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('none'); // 'none' | 'all' | 'one'
  const [likedSongs, setLikedSongs] = useState(
    initialSongs.filter((s) => s.liked).map((s) => s.id)
  );

  // Simulasi progress
  const playSong = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const nextSong = useCallback(() => {
    if (!currentSong) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    if (shuffle) {
      const randomIdx = Math.floor(Math.random() * songs.length);
      playSong(songs[randomIdx]);
    } else {
      const next = songs[(idx + 1) % songs.length];
      playSong(next);
    }
  }, [currentSong, songs, shuffle, playSong]);

  const prevSong = useCallback(() => {
    if (!currentSong) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    playSong(prev);
  }, [currentSong, songs, playSong]);

  const toggleLike = useCallback((songId) => {
    setLikedSongs((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  }, []);

  const isLiked = useCallback((songId) => likedSongs.includes(songId), [likedSongs]);

  const value = {
    songs,
    setSongs,
    currentSong,
    isPlaying,
    volume,
    setVolume,
    progress,
    setProgress,
    currentTime,
    setCurrentTime,
    queue,
    setQueue,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    likedSongs,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    toggleLike,
    isLiked,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  return ctx;
};

export default MusicPlayerContext;
