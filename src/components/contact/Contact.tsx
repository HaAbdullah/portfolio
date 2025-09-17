import { Box, Typography, Container, TextField, Button, Alert, Divider, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Email, LinkedIn } from '@mui/icons-material'

interface ContactFormData {
  name: string
  email: string
  message: string
}

const Contact: React.FC = () => {


  const handleClick = () => {
    console.log("Oh how life used to be")
  }
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleInputChange = (field: keyof ContactFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setShowError(false)

    try {
      const response = await fetch('https://formspree.io/f/mzborobd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setShowSuccess(false), 5000)
      } else {
        setShowError(true)
      }
    } catch (error) {
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <Box
      sx={{
        background: '#0a192f',
        py: { xs: 4, md: 6 },
        borderBottom: '1px solid rgba(100, 255, 218, 0.1)'
      }}
      id="contact"
    >
      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
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
                05.
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                onClick={handleClick}
                sx={{
                  color: '#ccd6f6',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 2,
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2,
                  '&::before': {
                    content: '"✦"',
                    color: '#64ffda',
                    fontSize: '2rem'
                  }
                }}
              >
                Get In Touch
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#a8b2d1',
                  fontSize: '1.1rem',
                  maxWidth: 500,
                  mx: 'auto',
                  lineHeight: 1.6,
                  mb: 4
                }}
              >
                Have a question or want to work together? I'd love to hear from you.
              </Typography>
              
              {/* Quick Contact Options */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 3,
                  mb: 4
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    href="mailto:abdullah.hasanjee@gmail.com"
                    sx={{
                      color: '#64ffda',
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      border: '1px solid rgba(100, 255, 218, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(100, 255, 218, 0.2)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      p: 1.5
                    }}
                  >
                    <Email />
                  </IconButton>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    href="https://www.linkedin.com/in/abdullah-hasanjee/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#64ffda',
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      border: '1px solid rgba(100, 255, 218, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(100, 255, 218, 0.2)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      p: 1.5
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                </motion.div>
              </Box>

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(100, 255, 218, 0.2)' }} />
                <Typography sx={{ px: 2, color: '#a8b2d1', fontSize: '0.9rem' }}>
                  or send a message
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(100, 255, 218, 0.2)' }} />
              </Box>
            </Box>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                maxWidth: 600,
                mx: 'auto',
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                backgroundColor: 'rgba(100, 255, 218, 0.03)',
                border: '1px solid rgba(100, 255, 218, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.05)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                }
              }}
            >
              {/* Success/Error Messages */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3,
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      color: '#64ffda',
                      '& .MuiAlert-icon': { color: '#64ffda' }
                    }}
                  >
                    Thanks for your message! I'll get back to you soon.
                  </Alert>
                </motion.div>
              )}

              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      color: '#ff6b6b'
                    }}
                  >
                    Something went wrong. Please try again or email me directly.
                  </Alert>
                </motion.div>
              )}

              {/* Form Fields */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#ccd6f6',
                        '& fieldset': {
                          borderColor: 'rgba(100, 255, 218, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(100, 255, 218, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#64ffda',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#a8b2d1',
                        '&.Mui-focused': {
                          color: '#64ffda',
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#ccd6f6',
                        '& fieldset': {
                          borderColor: 'rgba(100, 255, 218, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(100, 255, 218, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#64ffda',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#a8b2d1',
                        '&.Mui-focused': {
                          color: '#64ffda',
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange('message')}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#ccd6f6',
                        '& fieldset': {
                          borderColor: 'rgba(100, 255, 218, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(100, 255, 218, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#64ffda',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#a8b2d1',
                        '&.Mui-focused': {
                          color: '#64ffda',
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    variant="outlined"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={<Send />}
                    sx={{
                      alignSelf: 'center',
                      px: 4,
                      py: 1.5,
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
                      '&:disabled': {
                        color: '#a8b2d1',
                        borderColor: '#a8b2d1',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Contact