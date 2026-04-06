import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/navigation/Navbar'
import Hero from './components/hero/Hero'
import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import MyStack from './components/stack/MyStack'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import Gallery from './pages/Gallery'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
    },
    secondary: {
      main: '#64ffda',
    },
    background: {
      default: '#0a192f',
      paper: '#0a192f',
    },
    text: {
      primary: '#ccd6f6',
      secondary: '#a8b2d1',
    },
  },
  typography: {
    fontFamily: '"NTR", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
  },
})

function App() {
  const location = useLocation()
  const base = import.meta.env.BASE_URL

  // After the main page is idle, prefetch gallery images in the background
  useEffect(() => {
    if (location.pathname !== '/') return
    const id = requestIdleCallback(() => {
      fetch(`${base}gallery-manifest.json`)
        .then(r => r.json())
        .then((files: string[]) => {
          files.forEach(f => {
            const ext = f.split('.').pop()?.toLowerCase() ?? ''
            if (ext === 'mp4' || ext === 'webm' || ext === 'mov') return
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.as = 'image'
            link.href = `${base}gallery/${f}`
            document.head.appendChild(link)
          })
        })
        .catch(() => {})
    })
    return () => cancelIdleCallback(id)
  }, [location.pathname, base])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Experience />
              <Projects />
              <MyStack />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
