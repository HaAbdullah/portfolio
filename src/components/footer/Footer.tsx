import { Box, Typography, Container, IconButton, Fab } from '@mui/material'
import { Email, GitHub, LinkedIn, KeyboardArrowUp } from '@mui/icons-material'
import { motion } from 'framer-motion'

const socialLinks = [
  { icon: Email, href: 'mailto:abdullah.hasanjee@gmail.com', label: 'Email' },
  { icon: GitHub, href: 'https://github.com/HaAbdullah', label: 'GitHub' },
  { icon: LinkedIn, href: 'https://www.linkedin.com/in/abdullah-hasanjee/', label: 'LinkedIn' }
]

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        background: '#0a192f',
        py: 4,
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              maxWidth: 1200,
              mx: 'auto',
              width: '100%',
            }}
          >
            {/* Copyright Text */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#a8b2d1',
                  fontSize: '0.9rem',
                  lineHeight: 1.6
                }}
              >
                Built and designed by Abdullah Hasanjee.
                <br />
                All rights reserved. ©
              </Typography>
            </Box>

            {/* Scroll to Top Button - Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginLeft: '-100px' }}
            >
              <Fab
                size="medium"
                onClick={scrollToTop}
                sx={{
                  backgroundColor: '#64ffda',
                  color: '#0a192f',
                  boxShadow: '0 4px 20px rgba(100, 255, 218, 0.3)',
                  '&:hover': {
                    backgroundColor: '#64ffda',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(100, 255, 218, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <KeyboardArrowUp />
              </Fab>
            </motion.div>

            {/* Social Links */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <IconButton
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#a8b2d1',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#64ffda',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  </motion.div>
                )
              })}
            </Box>
          </Box>
        </motion.div>
      </Container>

    </Box>
  )
}

export default Footer