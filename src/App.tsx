import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/navigation/Navbar'
import Hero from './components/hero/Hero'
import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import MyStack from './components/stack/MyStack'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <MyStack />
      <Contact />
      <Footer />
    </ThemeProvider>
  )
}

export default App
