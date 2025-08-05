import { Box, Typography, Button, Container, IconButton } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { Email, LinkedIn, Close } from '@mui/icons-material'
import { useTypingAnimation } from '../../hooks/useTypingAnimation'
import MusicPlayer from './MusicPlayer'
import ProfileImage from './ProfileImage'
import { useState } from 'react'

interface HeroProps {
  name?: string
  title?: string
  description?: string
}

const Hero: React.FC<HeroProps> = ({
  name = "Hey, Abdullah here.",
  title = "I craft digital experiences.",
  description = "I'm a software developer and computer science student from Toronto, Canada. I'm captivated by expansive software systems and make little things that solve everyday inconveniences."
}) => {
  const [showContactIcons, setShowContactIcons] = useState(false)
  
  const { displayText: typedName } = useTypingAnimation({
    text: name,
    speed: 80,
    startDelay: 500
  })

  const handleSayHiClick = () => {
    setShowContactIcons(!showContactIcons)
  }

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        background: '#0a192f',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '100px', // Account for fixed navbar
      }}
    >
      {/* Music Player with Video Background */}
      <MusicPlayer 
        playlistId="PLMOdaAjtRY5T-S1GlXuhkabG37pYniPK5" 
        opacity={0.4}
      />
      <Container 
        maxWidth="xl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          px: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 1000,
            width: '100%',
          }}
        >
          {/* Interactive Profile Image */}
          <ProfileImage 
            size={{ xs: 200, sm: 250, md: 300 }}
          />

          {/* Name with typing animation */}
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: '#ccd6f6',
                textAlign: 'center',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              {typedName.split('Abdullah').map((part, index) => (
                <span key={index}>
                  {part}
                  {index === 0 && typedName.includes('Abdullah') && (
                    <Box
                      component="span"
                      sx={{
                        color: '#64ffda',
                        fontWeight: 700,
                      }}
                    >
                      Abdullah
                    </Box>
                  )}
                </span>
              ))}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: '2px',
                  height: '0.88em',
                  backgroundColor: '#64ffda',
                  ml: 0.5,
                  verticalAlign: 'baseline',
                  animation: 'fadeBlinkCursor 1.5s infinite',
                  '@keyframes fadeBlinkCursor': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            </Typography>
          </Box>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 1.5,
                color: '#a8b2d1',
                fontWeight: 300,
                textAlign: 'center',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
              }}
            >
              {title}
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: 2,
                color: '#a8b2d1',
                lineHeight: 1.7,
                textAlign: 'center',
                maxWidth: 700,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              }}
            >
              {description}
            </Typography>
          </motion.div>

          {/* Button / Contact Icons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
          >
            <AnimatePresence mode="wait">
              {!showContactIcons ? (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={handleSayHiClick}
                    sx={{
                      px: 6,
                      py: 1.2,
                      borderRadius: 1,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: '#64ffda',
                      borderColor: '#64ffda',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        borderColor: '#64ffda',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Say Hi!
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="icons"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <IconButton
                      href="https://www.linkedin.com/in/abdullah-hasanjee/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#64ffda',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        border: '2px solid #64ffda',
                        '&:hover': {
                          backgroundColor: 'rgba(100, 255, 218, 0.2)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                        p: 1.5
                      }}
                    >
                      <LinkedIn fontSize="large" />
                    </IconButton>
                    
                    <IconButton
                      onClick={handleSayHiClick}
                      sx={{
                        color: '#a8b2d1',
                        '&:hover': {
                          color: '#64ffda',
                          transform: 'rotate(90deg)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Close />
                    </IconButton>
                    
                    <IconButton
                      href="mailto:abdullah.hasanjee@gmail.com"
                      sx={{
                        color: '#64ffda',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        border: '2px solid #64ffda',
                        '&:hover': {
                          backgroundColor: 'rgba(100, 255, 218, 0.2)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                        p: 1.5
                      }}
                    >
                      <Email fontSize="large" />
                    </IconButton>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero