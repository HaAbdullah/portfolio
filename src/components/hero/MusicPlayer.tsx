import { useState, useRef, useEffect, useCallback } from 'react'
import { 
  Box, 
  IconButton, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Collapse,
  CircularProgress
} from '@mui/material'
import { PlayArrow, Pause, QueueMusic, Refresh, SkipNext } from '@mui/icons-material'
import { motion } from 'framer-motion'
import YouTubeApiService, { type YouTubeVideo } from '../../services/youtubeApi'

// YouTube API type declarations
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MusicPlayerProps {
  playlistId: string
  opacity?: number
}

// Fallback playlist in case API fails
const fallbackPlaylist: YouTubeVideo[] = [
  {
    id: 'byvSTnxddN4',
    title: 'Aesthetic Vibes',
    artist: 'Chill Music',
    thumbnail: 'https://img.youtube.com/vi/byvSTnxddN4/mqdefault.jpg'
  }
]

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlistId, opacity = 0.4 }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentSong, setCurrentSong] = useState<YouTubeVideo>(fallbackPlaylist[0])
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [playlist, setPlaylist] = useState<YouTubeVideo[]>(fallbackPlaylist)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const iframeRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const currentIndexRef = useRef(currentIndex)
  const playlistRef = useRef(playlist)

  // Keep refs updated
  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    playlistRef.current = playlist
  }, [playlist])

  // Load YouTube API script
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }
  }, [])

  // Load playlist on component mount
  useEffect(() => {
    loadPlaylist()
  }, [playlistId])
  // Initialize YouTube Player ONCE and keep it stable
  useEffect(() => {
    if (!hasStarted) return;

    const initializePlayer = () => {
      if (iframeRef.current && window.YT && !playerRef.current) {
        console.log('Creating YouTube player');
        playerRef.current = new window.YT.Player(iframeRef.current, {
          height: '100%',
          width: '100%',
          videoId: currentSong.id,
          playerVars: {
            autoplay: 1,
            mute: 0,
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              console.log('YouTube player ready');
              setPlayerReady(true);
            },
            onStateChange: (event: any) => {
              console.log('Player state changed:', event.data);
              if (event.data === window.YT.PlayerState.ENDED) {
                console.log('🎵 Video ended, playing next song');
                setTimeout(() => {
                  playNextSong();
                }, 100); // Small delay to prevent race conditions
              }
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              }
              if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              }
            },
          },
        });
      }
    };

    // If API is already loaded, initialize immediately
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Set global callback for when API loads
      (window as any).onYouTubeIframeAPIReady = initializePlayer;
    }
  }, [hasStarted]); // Only depends on hasStarted, not currentSong

  // Change video when currentSong changes (without recreating player)
  useEffect(() => {
    if (playerRef.current && playerReady && hasStarted) {
      console.log('🎵 Loading new video:', currentSong.title, currentSong.id);
      playerRef.current.loadVideoById(currentSong.id);
    }
  }, [currentSong.id]); // Only depend on the ID
  const loadPlaylist = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await YouTubeApiService.getPlaylistVideos(playlistId, 50)
      if (response.videos.length > 0) {
        setPlaylist(response.videos)
        setCurrentSong(response.videos[0])
        setCurrentIndex(0)
      } else {
        setError('No songs found in playlist')
        setPlaylist(fallbackPlaylist)
        setCurrentIndex(0)
      }
    } catch (err) {
      console.error('Failed to load playlist:', err)
      setError('Failed to load playlist')
      setPlaylist(fallbackPlaylist)
    } finally {
      setIsLoading(false)
    }
  }

  const playNextSong = useCallback(() => {
    const currentPlaylist = playlistRef.current;
    const currentIdx = currentIndexRef.current;
    
    if (currentPlaylist.length === 0) return;
    
    console.log('🎵 Playing next song... Current index:', currentIdx);
    
    const nextIndex = (currentIdx + 1) % currentPlaylist.length;
    console.log('🎵 Next index:', nextIndex, 'Song:', currentPlaylist[nextIndex]?.title);
    
    setCurrentIndex(nextIndex);
    setCurrentSong(currentPlaylist[nextIndex]);
    setIsPlaying(true);
  }, []); // Empty deps because we use refs
  
  const handleMusicButtonClick = () => {
    if (!hasStarted) {
      // First click: start playing and expand
      setHasStarted(true)
      setIsPlaying(true)
      setIsExpanded(true)
    } else {
      // Toggle expansion and close playlist if collapsing
      if (isExpanded && showPlaylist) {
        setShowPlaylist(false)
      }
      setIsExpanded(!isExpanded)
    }
  }

  const handlePlayPause = () => {
    if (playerRef.current && playerReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      // State will be updated by the onStateChange event
    }
  }

  const handleSongSelect = (song: YouTubeVideo) => {
    const songIndex = playlist.findIndex(s => s.id === song.id)
    setCurrentIndex(songIndex)
    setCurrentSong(song)
    setIsPlaying(true)
    if (!hasStarted) {
      setHasStarted(true)
    }
    setShowPlaylist(false)
  }



  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        setPlayerReady(false)
      }
    }
  }, [])

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist)
  }

  return (
    <>
      {/* Video Background Container - Only show when started */}
      {hasStarted && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          {/* Video Background */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: opacity,
              zIndex: 1,
            }}
          >
            <div
              id={`youtube-player-${hasStarted ? 'active' : 'inactive'}`}
              ref={iframeRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vw',
                height: '56.25vw',
                minHeight: '100vh',
                minWidth: '177.78vh',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          </Box>

          {/* Dark Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(10, 25, 47, 0.4)',
              zIndex: 2,
            }}
          />
        </Box>
      )}

      {/* Playlist Dropdown */}
      <Collapse in={showPlaylist}>
        <Paper
          sx={{
            position: 'fixed',
            bottom: hasStarted && isExpanded ? 151 : 100,
            right: hasStarted && isExpanded ? 24 : 24,
            backgroundColor: 'rgba(10, 25, 47, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: 2,
            maxHeight: 300,
            overflow: 'auto',
            minWidth: hasStarted && isExpanded ? 360 : 300,
            zIndex: 1001,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid rgba(100, 255, 218, 0.1)' }}>
            <Typography variant="h6" sx={{ color: '#64ffda' }}>
              {error ? 'Playlist Error' : 'Vibe With Me'}
            </Typography>
            <IconButton
              onClick={loadPlaylist}
              disabled={isLoading}
              sx={{ color: '#64ffda', p: 0.5 }}
            >
              {isLoading ? <CircularProgress size={20} sx={{ color: '#64ffda' }} /> : <Refresh fontSize="small" />}
            </IconButton>
          </Box>

          {error && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#ff6b6b', mb: 1 }}>
                {error}
              </Typography>
              <Typography variant="caption" sx={{ color: '#a8b2d1' }}>
                Using fallback playlist
              </Typography>
            </Box>
          )}

          <List sx={{ p: 0, maxHeight: 200, overflow: 'auto' }}>
            {playlist.map((song, index) => (
              <ListItem
                key={`${song.id}-${index}`}
                component="div"
                onClick={() => handleSongSelect(song)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  },
                  borderBottom: '1px solid rgba(100, 255, 218, 0.05)',
                  backgroundColor: currentSong.id === song.id ? 'rgba(100, 255, 218, 0.05)' : 'transparent',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={song.thumbnail}
                    sx={{ width: 40, height: 40 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={song.title}
                  secondary={song.artist}
                  primaryTypographyProps={{
                    color: currentSong.id === song.id ? '#64ffda' : '#ccd6f6',
                    fontSize: '0.9rem',
                    fontWeight: currentSong.id === song.id ? 600 : 400,
                  }}
                  secondaryTypographyProps={{
                    color: '#a8b2d1',
                    fontSize: '0.8rem',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Collapse>

      {/* Music Player Control */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        {/* Compact Player Rectangle - Shows when expanded and started */}
        {hasStarted && isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 80,
              backgroundColor: 'rgba(10, 25, 47, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 255, 218, 0.3)',
              borderRadius: 12,
              padding: 12,
              minWidth: 280,
              boxShadow: '0 8px 32px rgba(100, 255, 218, 0.15)',
            }}
          >
            {/* Song Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                src={currentSong.thumbnail}
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#ccd6f6',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentSong.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#a8b2d1',
                    fontSize: '0.8rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentSong.artist}
                </Typography>
              </Box>
            </Box>
            
            {/* Control Buttons Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconButton
                onClick={togglePlaylist}
                sx={{
                  color: '#64ffda',
                  p: 1,
                  '&:hover': { backgroundColor: 'rgba(100, 255, 218, 0.1)' },
                }}
              >
                <QueueMusic fontSize="small" />
              </IconButton>
              
              <IconButton
                onClick={handlePlayPause}
                sx={{
                  color: '#64ffda',
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  p: 1.5,
                  '&:hover': { backgroundColor: 'rgba(100, 255, 218, 0.2)' },
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              
              <IconButton
                onClick={playNextSong}
                sx={{
                  color: '#64ffda',
                  p: 1,
                  '&:hover': { backgroundColor: 'rgba(100, 255, 218, 0.1)' },
                }}
              >
                <SkipNext fontSize="small" />
              </IconButton>
            </Box>
          </motion.div>
        )}

        {/* Main Control Button */}
        <motion.div
          animate={{
            rotate: hasStarted && isExpanded ? 180 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <IconButton
            onClick={handleMusicButtonClick}
            sx={{
              backgroundColor: 'rgba(10, 25, 47, 0.95)',
              color: '#64ffda',
              border: '2px solid rgba(100, 255, 218, 0.4)',
              backdropFilter: 'blur(20px)',
              width: 64,
              height: 64,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                transform: 'scale(1.05)',
                borderColor: '#64ffda',
              },
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(100, 255, 218, 0.2)',
            }}
          >
            <QueueMusic fontSize="large" />
          </IconButton>
        </motion.div>

      </Box>
    </>
  )
}

export default MusicPlayer