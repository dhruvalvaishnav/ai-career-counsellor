import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Box, Button, AppBar, Toolbar, Typography, Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Home from './pages/Home'
import Test from './pages/Test'
import Results from './pages/Results'
import History from './pages/History'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6C63FF' },
    secondary: { main: '#00D4AA' },
    background: { default: '#0A0A1A', paper: '#12122A' },
  },
  typography: {
    fontFamily: '"DM Sans", "Roboto", sans-serif',
  },
})

function Navbar() {
  const { pathname } = useLocation()
  if (pathname === '/test') return null // hide on test page for focus

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 0.5 }}>
          <Typography component={Link} to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 800, fontSize: '1.15rem', background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: '"Playfair Display", serif' }}>
            AI Career Counsellor
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} to="/history" sx={{ color: '#8888AA', textTransform: 'none', fontWeight: 600, '&:hover': { color: '#A89CFF' } }}>History</Button>
            <Button component={Link} to="/test" variant="contained"
              sx={{ background: 'linear-gradient(135deg, #6C63FF, #5B54E8)', textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 2.5 }}>
              Take Test
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap');`}</style>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}