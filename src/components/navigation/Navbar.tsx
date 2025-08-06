import { useState, useEffect } from 'react'
import { Box, Typography, IconButton, Container, Drawer } from '@mui/material'
import { Email, GitHub, LinkedIn, Menu, Close } from '@mui/icons-material'
import { motion } from 'framer-motion'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]

const socialLinks = [
  { icon: Email, href: 'mailto:abdullah.hasanjee@gmail.com', label: 'Email' },
  { icon: GitHub, href: 'https://github.com/HaAbdullah', label: 'GitHub' },
  { icon: LinkedIn, href: 'https://www.linkedin.com/in/abdullah-hasanjee/', label: 'LinkedIn' }
]

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: isScrolled ? 24 : 0,
        left: isScrolled ? 24 : 0,
        right: isScrolled ? 24 : 0,
        width: isScrolled ? 'auto' : '100%',
        maxWidth: isScrolled ? '1000px' : 'none',
        margin: isScrolled ? '0 auto' : 0,
        zIndex: 1000,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box
        sx={{
          backgroundColor: isScrolled 
            ? 'rgba(10, 25, 47, 0.95)' 
            : 'rgba(10, 25, 47, 0.98)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          borderRadius: isScrolled ? 16 : 0,
          border: isScrolled ? '1px solid rgba(100, 255, 218, 0.2)' : 'none',
          borderBottom: !isScrolled ? '1px solid rgba(100, 255, 218, 0.1)' : 'none',
          boxShadow: isScrolled 
            ? '0 8px 32px rgba(100, 255, 218, 0.15)' 
            : '0 2px 20px rgba(0, 0, 0, 0.3)',
          padding: isScrolled ? '16px 32px' : '12px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? 'auto' : '58px',
            }}
          >
            {/* Logo/Name */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Typography
                variant={isScrolled ? 'h5' : 'h4'}
                sx={{
                  fontWeight: 900,
                  color: '#ccd6f6',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: isScrolled ? '1.5rem' : '1.8rem',
                  lineHeight: 1,
                  '&:hover': {
                    color: '#64ffda',
                  },
                }}
                onClick={() => handleNavClick('#')}
              >
                Abdullah Hasanjee
              </Typography>
            </motion.div>

            {/* Navigation Links */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: isScrolled ? 3 : 4,
                flex: 1,
                mx: 4,
                mr: 6,
              }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{}}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#a8b2d1',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontSize: isScrolled ? '1.1rem' : '1.2rem',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      lineHeight: 1,
                      '&:hover': {
                        color: '#64ffda',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: 0,
                        height: 2,
                        backgroundColor: '#64ffda',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </Typography>
                </motion.div>
              ))}
            </Box>

            {/* Mobile Hamburger Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  color: '#a8b2d1',
                  '&:hover': {
                    color: '#64ffda',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  },
                }}
              >
                <Menu />
              </IconButton>
            </Box>

            {/* Social Icons - Desktop */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: isScrolled ? 1 : 1.5,
              }}
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      size={isScrolled ? 'medium' : 'large'}
                      sx={{
                        color: '#a8b2d1',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#64ffda',
                          backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        },
                      }}
                    >
                      <IconComponent fontSize={isScrolled ? 'medium' : 'large'} />
                    </IconButton>
                  </motion.div>
                )
              })}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mobile Full-Screen Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0a192f',
            border: 'none',
          },
        }}
      >
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            px: 4,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              color: '#a8b2d1',
              fontSize: '2rem',
              '&:hover': {
                color: '#64ffda',
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
              },
            }}
          >
            <Close fontSize="large" />
          </IconButton>

          {/* Navigation Items */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              mb: 6,
            }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Typography
                  variant="h4"
                  component="button"
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: '#a8b2d1',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '2rem',
                    background: 'none',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    textAlign: 'center',
                    '&:hover': {
                      color: '#64ffda',
                      transform: 'translateY(-2px)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 3,
                      backgroundColor: '#64ffda',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </motion.div>
            ))}
          </Box>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
              }}
            >
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#a8b2d1',
                        fontSize: '2rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#64ffda',
                          backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        },
                      }}
                    >
                      <IconComponent fontSize="large" />
                    </IconButton>
                  </motion.div>
                )
              })}
            </Box>
          </motion.div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Typography
              variant="body2"
              sx={{
                position: 'absolute',
                bottom: 32,
                color: '#a8b2d1',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              Abdullah Hasanjee
            </Typography>
          </motion.div>
        </Box>
      </Drawer>
    </motion.div>
  )
}

export default Navbar