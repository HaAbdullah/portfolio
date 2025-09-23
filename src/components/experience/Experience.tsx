import React, { useState } from 'react'
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ExperienceData {
  id: string
  company: string
  companyShort?: string
  role: string
  duration: string
  location: string
  description: string[]
}

const experienceData: ExperienceData[] = [
  {
    id: 'eccc',
    company: 'Environment and Climate Change Canada',
    companyShort: 'ECCC',
    role: 'Backend/Database Developer Intern',
    duration: 'May 2025 – May 2026',
    location: 'Toronto, ON',
    description: [
      'Deployed a Java Spring Boot microservice to process real-time water quality data from 500+ sensors, using Redis caching to reduce database queries by 75% and handle 1K+ requests/hour',
      'Automated percentile calculations across 13M+ hydrometric records using optimized PL/SQL procedures and materialized view caching, reducing processing time by 84% and improving query response time by 2.5x',
      'Developing Spring Boot API gateway to centralize 20+ database connections, implementing pooling and query optimization, expected to reduce response times by 60% and improve query data metrics by 50%',
      'Built ETL PostgreSQL pipeline aggregating real-time data from 200+ monitoring stations, implementing data normalization and storage optimization achieving <1s query times for 20,000 monthly users',
      'Built custom JIRA dashboard gadget using Atlassian SDK to track billable hours across 8 internal clients, automating weekly time allocation reports and eliminating manual aggregation',
      'Aiding in the implementation Liquibase VCS for Oracle systems, establishing CI/CD pipeline expected to reduce deployment errors and standardized database change management processes alongside Git'
    ]
  },
  {
    id: 'insporos',
    company: 'Insporos Technologies',
    role: 'Contract Software Developer',
    duration: 'December 2024 – January 2025',
    location: 'Mississauga, ON',
    description: [
      'Developed full-stack features using React, Node.js, Express, and PostgreSQL, integrating local storage with IndexedDB and cloud syncing with AWS S3 and Render',
      'Optimized AWS S3 image uploads, reducing file sizes by 25% through Sharp.js compression and temporary file clean up, improving performance and storage efficiency',
      'Implemented bcrypt encryption within Node.js for secure password storage in PostgreSQL databases'
    ]
  },
  {
    id: 'myride901',
    company: 'MyRide901',
    role: 'Part-time Front-End Developer Intern',
    duration: 'August 2024 – November 2024',
    location: 'Toronto, ON',
    description: [
      'Rebuilt the mobile app front-end into a web version using React and CSS, enabling users to interactively demo app features, boosting site engagement and app downloads',
      'Redesigned the website\'s features section with HTML, CSS, and JavaScript, implementing an interactive panel that highlights 8 app features while optimizing page length for user experience',
      'Recreated and updated designs from Elementor (WordPress) to Figma, resulting in a 30% reduction in implementation time and a 20% decrease in implementation errors',
      'Collaborated in Agile/Scrum team using Jira for project tracking, delivering tasks within SDLC timelines'
    ]
  },
  {
    id: 'isna',
    company: 'ISNA Canada',
    role: 'Full-time Event Planning Intern',
    duration: 'May 2024 – August 2024',
    location: 'Mississauga, ON',
    description: [
      'Scraped web using Python (Selenium, Beautiful Soup) and Maps API for restaurant details to convert to Excel sheets using Pandas and OpenPyXL, processing 120 entries',
      'Developed a front-end interface, integrating MySQL for data management, to streamline vendor selection, improving staff efficiency across 5 events (2,500 attendees)',
      'Led organization of 3 large-scale events with a total attendance of 1,900 participants managing vendor selection, logistics coordination, and venue bookings',
      'Planned and executed 2 independent events, attracting 600 attendees with a 94% positive feedback rate',
      'Served as MC for multiple events, ensuring smooth flow and audience engagement'
    ]
  },
  {
    id: 'mind4youth',
    company: 'Mind4Youth',
    role: 'Web Developer Intern',
    duration: 'August 2023 – January 2024',
    location: 'Remote',
    description: [
      'Designed user-friendly website prototypes in Figma, collaborating with developers to bring them to life using HTML, CSS, and WordPress'
    ]
  }
]

const Experience: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [selectedExperience, setSelectedExperience] = useState<string>('eccc')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentExperience = experienceData.find(exp => exp.id === selectedExperience)

  return (
    <Container maxWidth="lg" id="experience" sx={{ pt: 12, pb: 4 }} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            02.
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
            Experience
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 }, 
          minHeight: { xs: 'auto', md: '500px' }
        }}>
        {/* Left Sidebar - Company List (Desktop) / Top Tabs (Mobile) */}
        <Box sx={{ 
          flex: { xs: 'none', md: '0 0 280px' },
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          overflowX: { xs: 'auto', md: 'visible' },
          gap: { xs: 0, md: 0 },
          pb: { xs: 1, md: 0 },
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(100, 255, 218, 0.1)',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '2px',
          },
        }}>
          {experienceData.map((experience) => (
            <Box
              key={experience.id}
              onClick={() => setSelectedExperience(experience.id)}
              sx={{
                p: { xs: 1.5, md: 2 },
                cursor: 'pointer',
                minWidth: { xs: '140px', md: 'auto' },
                textAlign: { xs: 'center', md: 'left' },
                borderLeft: { 
                  xs: 'none', 
                  md: selectedExperience === experience.id 
                    ? `3px solid ${theme.palette.primary.main}` 
                    : '3px solid transparent'
                },
                borderBottom: { 
                  xs: selectedExperience === experience.id 
                    ? `3px solid ${theme.palette.primary.main}` 
                    : '3px solid transparent',
                  md: 'none'
                },
                backgroundColor: selectedExperience === experience.id 
                  ? 'rgba(100, 255, 218, 0.1)' 
                  : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.05)',
                  borderLeft: { 
                    xs: 'none', 
                    md: `3px solid ${theme.palette.primary.main}`
                  },
                  borderBottom: { 
                    xs: `3px solid ${theme.palette.primary.main}`,
                    md: 'none'
                  }
                }
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: selectedExperience === experience.id 
                    ? theme.palette.primary.main 
                    : theme.palette.text.secondary,
                  fontWeight: selectedExperience === experience.id ? 600 : 400,
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  transition: 'color 0.3s ease',
                  whiteSpace: { xs: 'nowrap', md: 'normal' }
                }}
              >
                {isMobile && experience.companyShort 
                  ? experience.companyShort 
                  : experience.company}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Right Content - Experience Details */}
        <Box sx={{ 
          flex: 1, 
          pl: { xs: 0, md: 2 },
          pt: { xs: 2, md: 0 }
        }}>
          {currentExperience && (
            <motion.div
              key={selectedExperience}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: '1.4rem', md: '1.8rem' }
                }}
              >
                {currentExperience.role} @{' '}
                <Box
                  component="span"
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 700
                  }}
                >
                  {currentExperience.company}
                </Box>
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 1,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {currentExperience.duration}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 3,
                  fontSize: { xs: '0.85rem', md: '0.95rem' }
                }}
              >
                {currentExperience.location}
              </Typography>

              <Box>
                {currentExperience.description.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mr: 2,
                        mt: 0.5,
                        fontSize: '0.8rem'
                      }}
                    >
                      ▸
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        fontSize: { xs: '1rem', md: '1.1rem' }
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          )}
        </Box>
        </Box>
      </motion.div>
    </Container>
  )
}

export default Experience
