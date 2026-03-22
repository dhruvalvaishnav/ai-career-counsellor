import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';

export default function Loader() {
  // Read loading state from Redux
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  // If not loading, render nothing at all
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        // Cover the entire screen
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',

        // Dark semi-transparent overlay
        bgcolor: 'rgba(10,10,26,0.85)',
        backdropFilter: 'blur(6px)',

        // Center the spinner
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        // Sit on top of everything else
        zIndex: 9999,
      }}
    >
      {/* Spinner */}
      <CircularProgress
        size={56}
        thickness={4}
        sx={{
          color: '#6C63FF',
          mb: 3,
          '@keyframes glow': {
            '0%': { filter: 'drop-shadow(0 0 4px #6C63FF)' },
            '50%': { filter: 'drop-shadow(0 0 16px #6C63FF)' },
            '100%': { filter: 'drop-shadow(0 0 4px #6C63FF)' },
          },
          animation: 'glow 1.5s ease-in-out infinite',
        }}
      />

      {/* Message */}
      <Typography
        sx={{
          color: '#A89CFF',
          fontWeight: 700,
          fontSize: '1rem',
          mb: 1,
        }}
      >
        Analysing with AI...
      </Typography>
      <Typography sx={{ color: '#8888AA', fontSize: '0.85rem' }}>
        Generating your personalised career path
      </Typography>
    </Box>
  );
}

/*

What's happening here?
position: 'fixed' + zIndex: 9999

position: 'fixed'   // taken out of normal page flow
top: 0, left: 0     // anchored to top-left corner of screen
width: '100vw'      // 100% of viewport width
height: '100vh'     // 100% of viewport height
zIndex: 9999        // sits on top of EVERYTHING else

This creates a full-screen overlay that blocks all interaction while loading. The user can't click anything underneath it.

backdropFilter: 'blur(6px)'
Blurs the content behind the overlay. Looks premium — the page content is still visible but frosted. Works in all modern browsers.

Reads directly from Redux:

const isLoading = useAppSelector((state) => state.ui.isLoading)
if (!isLoading) return null

The Loader component manages itself completely. You never need to pass props to it or conditionally render it in a parent. Just place it once in App.tsx and forget about it.
To show it from anywhere in your app:

dispatch(setLoading(true))   // Loader appears instantly
dispatch(setLoading(false))  // Loader disappears
```

---

## 🧠 Mental Model
```
Any component anywhere
        ↓
dispatch(setLoading(true))
        ↓
uiSlice: state.isLoading = true
        ↓
Loader reads isLoading = true
        ↓
Full screen overlay appears
        ↓
API call finishes
        ↓
dispatch(setLoading(false))
        ↓
Loader reads isLoading = false
        ↓
return null → overlay disappears

One component. Zero props. Works from anywhere. That's the power of Redux. 🔥

*/
