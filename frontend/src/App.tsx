import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Home from './pages/Home';
import Test from './pages/Test';
import Results from './pages/Results';
import History from './pages/History';

// Layout components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Shared components
import Loader from './components/shared/Loader';
import Toast from './components/shared/Toast';

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
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap');
      `}</style>

      <BrowserRouter>
        {/* 
          Box with minHeight + flexDirection column
          This makes the footer always stick to the bottom
          even when page content is short
        */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {/* Navbar — hides itself on /test page */}
          <Navbar />

          {/* Sidebar — opens/closes via Redux isSidebarOpen */}
          <Sidebar />

          {/* Main content — grows to fill available space */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Box>

          {/* Footer - hides itself on /test page */}
          <Footer />
        </Box>

        {/* 
          Global components — placed OUTSIDE the flex column
          They float above everything using position:fixed
          Loader and Toast manage themselves via Redux
          You never need to touch these again
        */}
        <Loader />
        <Toast />
      </BrowserRouter>
    </ThemeProvider>
  );
}
