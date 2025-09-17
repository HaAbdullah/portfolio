import { useState } from 'react'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import ogPfp from '../../assets/hero/og_pfp.jpeg'
import chibiPfp from '../../assets/hero/chibi_pfp.png'
import cyberpunkPfp from '../../assets/hero/cyberpunk_pfp.png'
import pixelatedPfp from '../../assets/hero/pixelated_pfp.png'

interface ProfileImageProps {
  size?: {
    xs: number
    sm: number
    md: number
  }
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  size = { xs: 200, sm: 250, md: 300 } 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const images = [ogPfp, chibiPfp, cyberpunkPfp, pixelatedPfp]
  const imageNames = ['Original', 'Chibi', 'Retro', 'Pixelated']

  const handleClick = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
        mb: 2,
      }}
    >
      {/* Hover Indicator Ring */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          rotate: { duration: 2, repeat: isHovered ? Infinity : 0 }
        }}
        style={{
          position: 'absolute',
          width: size.md + 40,
          height: size.md + 40,
          borderRadius: '50%',
          border: '2px dashed rgba(100, 255, 218, 0.4)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Secondary Pulse Ring */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.5, 0.2, 0.5] : 0,
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: size.md + 60,
          height: size.md + 60,
          borderRadius: '50%',
          border: '1px solid rgba(100, 255, 218, 0.3)',
        }}
      />

      {/* Main Profile Image Container */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        animate={{
          rotateY: isHovered ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
        style={{
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            width: { xs: size.xs, sm: size.sm, md: size.md },
            height: { xs: size.xs, sm: size.sm, md: size.md },
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
            border: '4px solid #64ffda',
            boxShadow: isHovered 
              ? '0 0 30px rgba(100, 255, 218, 0.5), 0 0 60px rgba(100, 255, 218, 0.3)' 
              : '0 0 20px rgba(100, 255, 218, 0.2)',
            transition: 'all 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isHovered 
                ? 'linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.05))' 
                : 'transparent',
              borderRadius: '50%',
              zIndex: 2,
              transition: 'background 0.3s ease',
            }
          }}
        >
          {/* Front Face */}
          <Box
            component="img"
            src={images[currentImage]}
            alt={`Abdullah's ${imageNames[currentImage]} Profile`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '45% center',
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />

          {/* Back Face - Next Image Preview */}
          <Box
            component="img"
            src={images[(currentImage + 1) % images.length]}
            alt={`Abdullah's ${imageNames[(currentImage + 1) % images.length]} Profile Preview`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '45% center',
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotateY(180deg)',
            }}
          />
        </Box>
      </motion.div>

      {/* Subtle Glow Effect */}
      <Box
        sx={{
          position: 'absolute',
          width: { xs: size.xs + 20, sm: size.sm + 20, md: size.md + 20 },
          height: { xs: size.xs + 20, sm: size.sm + 20, md: size.md + 20 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%)',
          opacity: isHovered ? 0.8 : 0.3,
          transition: 'opacity 0.3s ease',
          zIndex: -1,
          animation: isHovered ? 'pulse 2s infinite' : 'none',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)', opacity: 0.3 },
            '50%': { transform: 'scale(1.05)', opacity: 0.6 },
            '100%': { transform: 'scale(1)', opacity: 0.3 },
          },
        }}
      />

      {/* Image Type Indicator */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(10, 25, 47, 0.9)',
            color: '#64ffda',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 500,
            border: '1px solid rgba(100, 255, 218, 0.3)',
            backdropFilter: 'blur(10px)',
            whiteSpace: 'nowrap',
          }}
        >
          {imageNames[currentImage]} - Click to cycle
        </motion.div>
      )}
    </Box>
  )
}

export default ProfileImage