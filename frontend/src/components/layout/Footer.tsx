import { Link, useLocation } from 'react-router-dom';
import { Box, Container, Typography, Divider, Grid } from '@mui/material';
import { Psychology } from '@mui/icons-material';

// Hide footer on these pages — test page needs full focus
const HIDDEN_ON = ['/test'];

export default function Footer() {
  const { pathname } = useLocation();

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0D0D22',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* ── Brand ── */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Psychology sx={{ color: '#6C63FF', fontSize: 28 }} />
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                AI Career Counsellor
              </Typography>
            </Box>
            <Typography
              sx={{
                color: '#8888AA',
                fontSize: '0.88rem',
                lineHeight: 1.8,
                maxWidth: 280,
              }}
            >
              Helping students discover their ideal career paths using
              AI-powered aptitude analysis and real-world insights.
            </Typography>
          </Grid>

          {/* ── Quick Links ── */}
          <Grid item xs={6} md={2}>
            <Typography
              sx={{ color: '#FFF', fontWeight: 700, mb: 2, fontSize: '0.9rem' }}
            >
              Quick Links
            </Typography>
            {[
              { label: 'Home', path: '/' },
              { label: 'Take Test', path: '/test' },
              { label: 'History', path: '/history' },
            ].map((item) => (
              <Box key={item.path} sx={{ mb: 1 }}>
                <Typography
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#8888AA',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    '&:hover': { color: '#A89CFF' },
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Grid>

          {/* ── Tech Stack ── */}
          <Grid item xs={6} md={3}>
            <Typography
              sx={{ color: '#FFF', fontWeight: 700, mb: 2, fontSize: '0.9rem' }}
            >
              Built With
            </Typography>
            {[
              'React + Vite + TypeScript',
              'Spring Boot + Kafka',
              'Groq AI (Llama 3.3 70B)',
              'Material UI',
              'Redux Toolkit',
            ].map((tech) => (
              <Box key={tech} sx={{ mb: 1 }}>
                <Typography sx={{ color: '#8888AA', fontSize: '0.88rem' }}>
                  {tech}
                </Typography>
              </Box>
            ))}
          </Grid>

          {/* ── Status ── */}
          <Grid item xs={12} md={3}>
            <Typography
              sx={{ color: '#FFF', fontWeight: 700, mb: 2, fontSize: '0.9rem' }}
            >
              Project Status
            </Typography>
            <Box
              sx={{
                bgcolor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                {/* Animated green dot — shows app is live */}
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#00D4AA',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.3 },
                      '100%': { opacity: 1 },
                    },
                    animation: 'pulse 2s infinite',
                  }}
                />
                <Typography
                  sx={{
                    color: '#00D4AA',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  Active Development
                </Typography>
              </Box>
              <Typography
                sx={{ color: '#8888AA', fontSize: '0.78rem', lineHeight: 1.6 }}
              >
                Learning project by Dhruval Vaishnav. Backend + AI integration
                in progress.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', my: 4 }} />

        {/* ── Bottom Bar ── */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography sx={{ color: '#555577', fontSize: '0.82rem' }}>
            © 2026 AI Career Counsellor · Where AI meets ambition
          </Typography>
          <Typography sx={{ color: '#555577', fontSize: '0.82rem' }}>
            Made with 💜 for students
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


/*
What's happening here?
Hide on specific pages

const HIDDEN_ON = ['/test']
if (HIDDEN_ON.includes(pathname)) return null

Clean pattern — define which pages hide the footer in one array. To hide on more pages later, just add to the array. Same pattern works for Navbar too — notice we used the same approach there.

mt: 'auto' trick
mt: 'auto'

This pushes the footer to the bottom of the page even when content is short. Works when the parent has minHeight: '100vh' and display: 'flex', flexDirection: 'column'. We'll wire this up in App.tsx next.

Animated pulse dot:

'@keyframes pulse': {
  '0%':   { opacity: 1 },
  '50%':  { opacity: 0.3 },
  '100%': { opacity: 1 },
},
animation: 'pulse 2s infinite',
```
MUI lets you define CSS keyframe animations inline inside `sx`. The green dot slowly pulses to show the app is actively running — a nice real-world UI detail.

### Links array pattern
Same as Sidebar — define links as data, `.map()` over them. Consistent pattern across your whole codebase. 🎯

---

## 🧠 Footer doesn't need Redux

Notice the Footer has **no Redux** — no `useAppDispatch` or `useAppSelector`. That's intentional and correct.

Rule of thumb:
```
Does this component need to READ or CHANGE global state?
  YES → use Redux
  NO  → keep it simple, no Redux needed


  Footer just displays static info and links. No global state needed. Keep it simple. ✅


*/