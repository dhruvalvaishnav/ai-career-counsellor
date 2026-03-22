import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleSidebar } from '../../features/ui/uiSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  // Read sidebar state from Redux store
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  // Hide navbar completely on test page so student can focus
  if (pathname === '/test') return null;

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'rgba(10,10,26,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 0.5 }}>
          {/* Hamburger menu — dispatches toggleSidebar to Redux */}
          <IconButton
            onClick={() => dispatch(toggleSidebar())}
            sx={{
              color: isSidebarOpen ? '#6C63FF' : '#8888AA',
              mr: 2,
              '&:hover': { color: '#A89CFF' },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1.15rem',
              background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            AI Career Counsellor
          </Typography>

          {/* Nav links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: pathname === '/' ? '#A89CFF' : '#8888AA',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { color: '#A89CFF' },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/history"
              sx={{
                color: pathname === '/history' ? '#A89CFF' : '#8888AA',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { color: '#A89CFF' },
              }}
            >
              History
            </Button>
            <Button
              component={Link}
              to="/test"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #6C63FF, #5B54E8)',
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 2,
                px: 2.5,
              }}
            >
              Take Test
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

/*

What's happening here?
Redux in action — first real usage

const dispatch = useAppDispatch()
const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen)

useAppSelector — reads isSidebarOpen from the Redux store. When this value changes anywhere in the app, this component automatically re-renders. No props needed.
dispatch(toggleSidebar()) — when hamburger is clicked, it sends an action to Redux. The uiSlice flips isSidebarOpen from false to true (or vice versa). The Sidebar component will react to this change automatically.

Active link highlighting

color: pathname === '/' ? '#A89CFF' : '#8888AA'
```
Current page link glows purple, others stay grey. `useLocation()` gives you the current URL path.

---

## 🧠 Mental Model
```
User clicks hamburger
        ↓
dispatch(toggleSidebar())
        ↓
uiSlice: state.isSidebarOpen = true
        ↓
Navbar re-renders  → hamburger turns purple
Sidebar re-renders → slides open   (we build this next)


*/