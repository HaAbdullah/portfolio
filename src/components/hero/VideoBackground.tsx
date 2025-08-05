import { useState, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'

interface VideoBackgroundProps {
  videoId: string
  opacity?: number
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoId, 
  opacity = 0.3 
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true)
      setIsPlaying(true)
    } else if (iframeRef.current) {
      const iframe = iframeRef.current
      const message = isPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}'
      iframe.contentWindow?.postMessage(message, '*')
      setIsPlaying(!isPlaying)
    }
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
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${hasStarted ? 1 : 0}&mute=0&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vw',
                height: '56.25vw',
                minHeight: '100vh',
                minWidth: '177.78vh',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                pointerEvents: 'none',
              }}
              allow="autoplay; encrypted-media"
              title="Background Video"
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

      {/* Floating Play/Pause Button - Always visible */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handlePlayPause}
          sx={{
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            color: '#64ffda',
            border: '2px solid rgba(100, 255, 218, 0.3)',
            backdropFilter: 'blur(10px)',
            opacity: 1,
            transition: 'all 0.3s ease',
            width: 56,
            height: 56,
            '&:hover': {
              backgroundColor: 'rgba(100, 255, 218, 0.2)',
              transform: 'scale(1.1)',
            },
          }}
        >
          {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
        </IconButton>
      </Box>
    </>
  )
}

export default VideoBackground