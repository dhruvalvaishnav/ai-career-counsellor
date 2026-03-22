import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Container, Grid, Typography, Card, CardContent, Chip,
} from '@mui/material'
import { Psychology, TrendingUp, School, ArrowForward } from '@mui/icons-material'

const features = [
  {
    icon: <Psychology sx={{ fontSize: 40, color: '#6C63FF' }} />,
    title: 'AI-Powered Analysis',
    desc: 'Groq AI analyses your aptitude scores and generates personalised career paths tailored just for you.',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: '#00D4AA' }} />,
    title: 'Real-World Insights',
    desc: 'Recommendations based on current industry trends and real job market demand.',
  },
  {
    icon: <School sx={{ fontSize: 40, color: '#FF6B6B' }} />,
    title: 'Actionable Next Steps',
    desc: 'Get concrete steps to start your career journey — courses, skills, and resources.',
  },
]

const steps = [
  'Enter your name and student ID',
  'Answer aptitude questions across 3 categories',
  'Submit and let Groq AI analyse your strengths',
  'Get your top 3 personalised career recommendations',
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0A1A' }}>

      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1A1A3E 50%, #0A0A1A 100%)',
        pt: { xs: 10, md: 16 }, pb: { xs: 8, md: 12 },
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative' }}>
          <Chip label="✨ AI-Powered Career Guidance" sx={{ mb: 3, bgcolor: 'rgba(108,99,255,0.15)', color: '#A89CFF', border: '1px solid rgba(108,99,255,0.3)', fontWeight: 600 }} />
          <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#FFF', lineHeight: 1.2, mb: 3, fontSize: { xs: '2.4rem', md: '3.8rem' } }}>
            Discover Your{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Perfect Career
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: '#8888AA', mb: 5, maxWidth: 560, mx: 'auto', lineHeight: 1.7, fontWeight: 400 }}>
            Take a 5-minute aptitude test and let our AI analyse your strengths to recommend the best career paths tailored just for you.
          </Typography>
          <Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={() => navigate('/test')}
            sx={{ background: 'linear-gradient(135deg, #6C63FF, #5B54E8)', px: 5, py: 1.8, borderRadius: 3, fontSize: '1.05rem', fontWeight: 700, textTransform: 'none', boxShadow: '0 8px 32px rgba(108,99,255,0.35)', '&:hover': { background: 'linear-gradient(135deg, #7B73FF, #6C63FF)', transform: 'translateY(-2px)', boxShadow: '0 12px 40px rgba(108,99,255,0.45)' }, transition: 'all 0.2s ease' }}>
            Start Free Test
          </Button>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 6, color: '#FFF', fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
          Why Use AI Career Counsellor?
        </Typography>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ bgcolor: '#12122A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, p: 2, height: '100%', transition: 'all 0.3s ease', '&:hover': { border: '1px solid rgba(108,99,255,0.4)', transform: 'translateY(-4px)', boxShadow: '0 16px 48px rgba(108,99,255,0.15)' } }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 700, mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#8888AA', lineHeight: 1.8 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How it works */}
      <Box sx={{ bgcolor: '#0D0D22', py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 6, color: '#FFF', fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
            How It Works
          </Typography>
          <Grid container spacing={3}>
            {steps.map((step, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ minWidth: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                    {i + 1}
                  </Box>
                  <Typography sx={{ color: '#CCCCDD', lineHeight: 1.7, pt: 0.5 }}>{step}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 7 }}>
            <Button variant="outlined" size="large" endIcon={<ArrowForward />} onClick={() => navigate('/test')}
              sx={{ borderColor: '#6C63FF', color: '#A89CFF', px: 5, py: 1.6, borderRadius: 3, fontWeight: 700, textTransform: 'none', fontSize: '1rem', '&:hover': { bgcolor: 'rgba(108,99,255,0.1)', borderColor: '#A89CFF' } }}>
              Take the Test Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Typography sx={{ color: '#555577', fontSize: '0.85rem' }}>
          © 2025 AI Career Counsellor · Built with React + Spring Boot + Groq AI
        </Typography>
      </Box>
    </Box>
  )
}