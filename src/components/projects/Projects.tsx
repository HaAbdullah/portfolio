import React, { useState, useRef } from 'react'
import { Box, Typography, Container, useTheme, IconButton, Button } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GitHub, Launch, ChevronLeft, ChevronRight } from '@mui/icons-material'

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  imageUrl: string
  featured: boolean
}

const projectsData: Project[] = [
  {
    id: 'optimove',
    title: 'OptiMove',
    description: 'Analyzes an image of a chessboard and provides a recommended move for the given chess position',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'React', 'JavaScript', 'Pandas'],
    githubUrl: 'https://github.com/HaAbdullah/OptiMove',
    demoUrl: 'https://haabdullah.github.io/OptiMove/',
    imageUrl: '/projects/OptiMove.png',
    featured: true
  },
  {
    id: 'align',
    title: 'Align',
    description: 'A clean, intuitive web platform that lets users upload resumes and job descriptions, then generates tailored resumes and cover letters to maximize job match success.',
    techStack: ['React', 'Vite', 'Express', 'JavaScript', 'Firebase', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/HaAbdullah/Align',
    demoUrl: 'https://align-demo.com',
    imageUrl: '/projects/Align.png',
    featured: true
  },
  {
    id: 'keywe',
    title: 'KeyWe',
    description: 'A chrome extension that allows users to associate websites with unique code words facilitating a seamless browsing experience.',
    techStack: ['HTML/CSS', 'JavaScript', 'Chrome Storage API'],
    githubUrl: 'https://github.com/HaAbdullah/Keywe',
    demoUrl: 'https://chromewebstore.google.com/detail/pbbojhhloifmdbggfibbjfihildgehpc',
    imageUrl: '/projects/KeyWe.jpg',
    featured: true
  },
  {
    id: 'optimove-card',
    title: 'OptiMove',
    description: 'Analyzes an image of a chessboard and provides a recommended move for the given chess position',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'React', 'JavaScript', 'Pandas'],
    githubUrl: 'https://github.com/HaAbdullah/OptiMove',
    imageUrl: '/projects/OptiMove.png',
    featured: false
  },
  {
    id: 'align-card',
    title: 'Align',
    description: 'A clean, intuitive web platform that lets users upload resumes and job descriptions, then generates tailored resumes and cover letters to maximize job match success.',
    techStack: ['React','Express', 'JavaScript', 'Firebase', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/HaAbdullah/Align',
    imageUrl: '/projects/Align.png',
    featured: false
  },
  {
    id: 'cypress',
    title: 'Cypress',
    description: 'A website that allows citizens to report and follow issues around the city in this interactive feed and map, to basically be able to keep an eye out and be aware of things in their community.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Python'],
    githubUrl: 'https://github.com/HaAbdullah/Cypress',
    imageUrl: '/projects/TurboTypist1.png',
    featured: false
  },
  {
    id: 'gradreadygeese',
    title: 'GradReadyGeese',
    description: 'Parses a UWaterloo transcript and uses web scraping to determine courses needed to graduate',
    techStack: ['Python', 'PyPDF', 'Selenium', 'Beautiful Soup', 'HTML/CSS', 'JavaScript'],
    githubUrl: 'https://github.com/HaAbdullah/StarterHacks/',
    imageUrl: '/projects/GradReadyGeese.png',
    featured: false
  },
  {
    id: 'currensea',
    title: 'CurrenSea Converter',
    description: 'World-wide currency converter with a minimalistic aesthetic design',
    techStack: ['Python', 'PyQt5', 'Fixer.io API'],
    githubUrl: 'https://github.com/HaAbdullah/CurrenSea',
    imageUrl: '/projects/TurboTypist1.png',
    featured: false
  },
  {
    id: 'freelancetracker',
    title: 'Freelance Tracker',
    description: 'A tracker for freelance clients and services',
    techStack: ['Python'],
    githubUrl: 'https://github.com/HaAbdullah/FreelanceManager',
    imageUrl: '/projects/TurboTypist1.png',
    featured: false
  }
]

const Projects: React.FC = () => {
  const theme = useTheme()
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const featuredProjects = projectsData.filter(project => project.featured)
  const otherProjects = projectsData.filter(project => !project.featured)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  return (
    <Container maxWidth="lg" id="projects" sx={{ pt: 2, pb: 8 }} ref={ref}>
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontSize: '1.1rem',
              fontWeight: 500,
              mb: 1,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            03.
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: '3rem',
              fontWeight: 700,
              color: theme.palette.text.primary,
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              '&::before': {
                content: '"✦"',
                color: theme.palette.primary.main,
                fontSize: '2rem'
              }
            }}
          >
            Projects
          </Typography>
        </Box>
      </motion.div>

      {/* Featured Projects Slider */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Box sx={{ mb: 8 }}>
          <Box sx={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Slider Container */}
          <Box
            sx={{
              position: 'relative',
              height: '600px',
              borderRadius: 2,
              overflow: 'hidden',
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: `0 8px 32px rgba(100, 255, 218, 0.2)`,
              '&:hover .project-overlay': {
                opacity: 1
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${featuredProjects[currentSlide]?.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay - Only visible on hover */}
                <Box
                  className="project-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.9))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    textAlign: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    {featuredProjects[currentSlide]?.title}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      maxWidth: 600,
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }}
                  >
                    {featuredProjects[currentSlide]?.description}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 4,
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    {featuredProjects[currentSlide]?.techStack.join(', ')}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton
                      href={featuredProjects[currentSlide]?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: theme.palette.text.primary,
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(100, 255, 218, 0.2)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <GitHub />
                    </IconButton>
                    
                    {featuredProjects[currentSlide]?.demoUrl && (
                      <Button
                        variant="outlined"
                        href={featuredProjects[currentSlide]?.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Launch />}
                        sx={{
                          color: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: 'rgba(100, 255, 218, 0.1)',
                            borderColor: theme.palette.primary.main,
                            transform: 'translateY(-2px)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.palette.text.secondary,
              backgroundColor: 'rgba(10, 25, 47, 0.9)',
              '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: 'rgba(10, 25, 47, 1)'
              }
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.palette.text.secondary,
              backgroundColor: 'rgba(10, 25, 47, 0.9)',
              '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: 'rgba(10, 25, 47, 1)'
              }
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>

          {/* Slide Indicators */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 3
            }}
          >
            {featuredProjects.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: currentSlide === index 
                    ? theme.palette.primary.main 
                    : theme.palette.text.secondary,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main
                  }
                }}
              />
            ))}
          </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Other Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 3,
            mt: 4
          }}
        >
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
            >
              <Box
                sx={{
                  p: 3,
                  border: `2px solid rgba(100, 255, 218, 0.3)`,
                  borderRadius: 2,
                  backgroundColor: 'rgba(10, 25, 47, 0.8)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 25px rgba(100, 255, 218, 0.2)`
                  }
                }}
              >
                {/* Card Header */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Box sx={{ fontSize: '2rem' }}>📂</Box>
                  <IconButton
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    <GitHub />
                  </IconButton>
                </Box>

                {/* Project Info */}
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1.3rem'
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                    lineHeight: 1.6,
                    flex: 1
                  }}
                >
                  {project.description}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                >
                  {project.techStack.join(', ')}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
        </Box>
      </motion.div>
    </Container>
  )
}

export default Projects