import { Box, Typography, Container } from '@mui/material'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiBootstrap,
  SiNodedotjs, 
  SiExpress, 
  SiPython, 
  SiFlask,
  SiSpringboot,
  SiMysql, 
  SiPostgresql, 
  SiOracle,
  SiMongodb,
  SiGit, 
  SiDocker, 
  SiAmazonwebservices,
  SiLinux,
  SiFigma,
  SiHtml5
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

interface TechItem {
  name: string
  icon: React.ComponentType<any>
  color: string
}

interface StackCategory {
  title: string
  technologies: TechItem[]
}

interface MyStackProps {
  title?: string
}

const stackData: StackCategory[] = [
  {
    title: 'FRONTEND',
    technologies: [
            { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'HTML/CSS', icon: SiHtml5, color: '#E34F26' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' }
    ]
  },
  {
    title: 'BACKEND',
    technologies: [

            { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Express.js', icon: SiExpress, color: '#000000' },
                  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
                        { name: 'Flask', icon: SiFlask, color: '#000000' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },

  
    ]
  },
  {
    title: 'DATABASE',
    technologies: [
            { name: 'Oracle DB', icon: SiOracle, color: '#F80000' },
                  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' }
    ]
  },
  {
    title: 'TOOLS',
    technologies: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' }
    ]
  }
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4
    }
  }
}

const stackRowVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.15
    }
  }
}

const techVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

const MyStack: React.FC<MyStackProps> = ({
  title = "MY STACK"
}) => {
  return (
    <Box
      id="skills"
      sx={{
        minHeight: '100vh',
        background: '#0a192f',
        py: { xs: 4, md: 6 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: 5.6, textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                color: '#64ffda',
                fontSize: '1.1rem',
                fontWeight: 500,
                mb: 1,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              04.
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: '#ccd6f6',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 400,
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                '&::before': {
                  content: '"✦"',
                  color: '#64ffda',
                  fontSize: '1.5rem'
                }
              }}
            >
              {title}
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {stackData.map((stack) => (
              <motion.div
                key={stack.title}
                variants={stackRowVariants}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    mb: 6,
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 }
                  }}
                >
                  {/* Category Title */}
                  <Box
                    sx={{
                      minWidth: { sm: 200 },
                      mr: { sm: 4 }
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: '#ccd6f6',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        fontWeight: 600,
                        letterSpacing: '1px',
                        mb: { xs: 1, sm: 0 }
                      }}
                    >
                      {stack.title}
                    </Typography>
                  </Box>
                  
                  {/* Technologies */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 3,
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    {stack.technologies.map((tech) => {
                      const Icon = tech.icon
                      return (
                        <motion.div
                          key={tech.name}
                          variants={techVariants}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              px: 2,
                              py: 1,
                              borderRadius: 2,
                              backgroundColor: 'rgba(100, 255, 218, 0.05)',
                              border: '1px solid rgba(100, 255, 218, 0.1)',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                                border: '1px solid rgba(100, 255, 218, 0.3)',
                                transform: 'translateY(-2px)',
                              }
                            }}
                          >
                            <Icon 
                              size={24} 
                              color={tech.color}
                              style={{ flexShrink: 0 }}
                            />
                            <Typography
                              sx={{
                                color: '#ccd6f6',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {tech.name}
                            </Typography>
                          </Box>
                        </motion.div>
                      )
                    })}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default MyStack