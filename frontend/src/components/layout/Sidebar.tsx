import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Home,
  Quiz,
  History,
  Close,
  Psychology,
  TrendingUp,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleSidebar } from '../../features/ui/uiSlice';

// Define nav items in one place — easy to add more later
const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: <Home />,
  },
  {
    label: 'Take Test',
    path: '/test',
    icon: <Quiz />,
  },
  {
    label: 'History',
    path: '/history',
    icon: <History />,
  },
];

const DRAWER_WIDTH = 260;

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  // Read sidebar open/close state from Redux
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  const handleClose = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          bgcolor: '#0D0D22',
          borderRight: '1px solid rgba(255,255,255,0.07)',
        },
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Psychology sx={{ color: '#6C63FF', fontSize: 28 }} />
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            AI Career
          </Typography>
        </Box>

        {/* Close button — dispatches toggleSidebar */}
        <IconButton
          onClick={handleClose}
          sx={{ color: '#8888AA', '&:hover': { color: '#FF6B6B' } }}
        >
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

      {/* ── Nav Items ── */}
      <List sx={{ px: 1.5, pt: 2 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleClose} // close sidebar on navigation
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(108,99,255,0.15)' : 'transparent',
                  border: isActive
                    ? '1px solid rgba(108,99,255,0.3)'
                    : '1px solid transparent',
                  '&:hover': {
                    bgcolor: 'rgba(108,99,255,0.1)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#6C63FF' : '#8888AA',
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: isActive ? '#A89CFF' : '#CCCCDD',
                      fontWeight: isActive ? 700 : 400,
                      fontSize: '0.95rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mt: 2 }} />

      {/* ── Bottom Info ── */}
      <Box sx={{ p: 2.5, mt: 'auto' }}>
        <Box
          sx={{
            bgcolor: 'rgba(108,99,255,0.1)',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: 3,
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TrendingUp sx={{ color: '#00D4AA', fontSize: 18 }} />
            <Typography
              sx={{ color: '#00D4AA', fontWeight: 700, fontSize: '0.85rem' }}
            >
              Powered by AI
            </Typography>
          </Box>
          <Typography
            sx={{ color: '#8888AA', fontSize: '0.78rem', lineHeight: 1.6 }}
          >
            Llama 3.3 70B model analysing your aptitude scores in real time.
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

/*
What's happening here?
MUI Drawer component:

<Drawer anchor="left" open={isSidebarOpen} onClose={handleClose}>

anchor="left" → slides in from the left
open={isSidebarOpen} → reads Redux state to decide open/close
onClose={handleClose} → clicking outside dispatches toggleSidebar()

Active link highlighting:

const isActive = pathname === item.path

The active page gets a purple highlighted background, purple icon, and bold text. All others stay grey. Clean and obvious to the user where they are.

Auto-close on navigation:

onClick={handleClose}

When a user clicks a nav item the sidebar closes automatically. Good UX — don't make users close it manually.
navItems array pattern

const navItems = [
  { label: 'Home', path: '/', icon: <Home /> },
  ...
]
```
This is a very common real-world pattern. Instead of repeating JSX for each link, you define data in one array and `.map()` over it. To add a new page later you just add one object to the array. 🎯

---

## 🧠 Mental Model
```
Navbar hamburger clicked
        ↓
dispatch(toggleSidebar())       → uiSlice: isSidebarOpen = true
        ↓
Sidebar reads isSidebarOpen     → Drawer open={true} → slides in
        ↓
User clicks a nav item
        ↓
dispatch(toggleSidebar())       → uiSlice: isSidebarOpen = false
        ↓
Sidebar reads isSidebarOpen     → Drawer open={false} → slides out
navigate('/test')               → page changes

Navbar and Sidebar are completely independent components — they never talk to each other directly. They both just talk to Redux. 🔥

*/
