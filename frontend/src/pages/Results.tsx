import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box, Button, Container, Typography, Card, CardContent,
  Grid, Chip, LinearProgress, Divider,
} from '@mui/material'
import { Home, History, Replay } from '@mui/icons-material'
import { scoreColor, scoreLabel } from '../utils/score'
import type { CareerRecommendation } from '../types'

interface LocationState {
  result: CareerRecommendation
  name: string
}

export default function Results() {
  const { state } = useLocation() as { state: LocationState | null }
  const navigate = useNavigate()

  if (!state?.result) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#0A0A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: '#8888AA', mb: 3 }}>No results found. Please take the test first.</Typography>
          <Button variant="contained" onClick={() => navigate('/test')}
            sx={{ background: 'linear-gradient(135deg, #6C63FF, #5B54E8)', textTransform: 'none', fontWeight: 700 }}>
            Take the Test
          </Button>
        </Box>
      </Box>
    )
  }

  const { result, name } = state

  const scores = [
    { label: 'Logical Reasoning', value: result.logicalScore, icon: '🧠' },
    { label: 'Verbal Reasoning', value: result.verbalScore, icon: '📖' },
    { label: 'Quantitative', value: result.quantitativeScore, icon: '🔢' },
  ]

  // Split AI response into paragraphs for cleaner rendering
  const paragraphs = result.aiRecommendation
    .split('\n')
    .filter(p => p.trim().length > 0)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0A1A', py: 6 }}>
      <Container maxWidth="md">

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '3rem', mb: 2 }}>🎯</Typography>
          <Typography variant="h4" sx={{ color: '#FFF', fontFamily: '"Playfair Display", serif', fontWeight: 700, mb: 1 }}>
            Your Career Recommendations
          </Typography>
          {name && (
            <Typography sx={{ color: '#8888AA', fontSize: '1.05rem' }}>
              Personalised results for{' '}
              <Box component="span" sx={{ color: '#A89CFF', fontWeight: 600 }}>{name}</Box>
            </Typography>
          )}
          {result.processedAt && (
            <Chip label={`Analysed on ${new Date(result.processedAt).toLocaleString()}`} size="small"
              sx={{ mt: 1.5, bgcolor: 'rgba(255,255,255,0.05)', color: '#666688', fontSize: '0.75rem' }} />
          )}
        </Box>

        {/* Score Summary */}
        <Card sx={{ bgcolor: '#12122A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 700, mb: 3 }}>📊 Your Aptitude Scores</Typography>
            <Grid container spacing={3}>
              {scores.map(({ label, value, icon }) => (
                <Grid item xs={12} sm={4} key={label}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ color: '#CCCCDD', fontSize: '0.9rem' }}>{icon} {label}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: scoreColor(value), fontWeight: 700 }}>{value}</Typography>
                        <Chip label={scoreLabel(value)} size="small"
                          sx={{ bgcolor: `${scoreColor(value)}20`, color: scoreColor(value), fontSize: '0.7rem', height: 20 }} />
                      </Box>
                    </Box>
                    <LinearProgress variant="determinate" value={value}
                      sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.07)', '& .MuiLinearProgress-bar': { bgcolor: scoreColor(value), borderRadius: 4 } }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* AI Recommendation */}
        <Card sx={{ bgcolor: '#12122A', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 4, mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🤖</Box>
              <Box>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1 }}>AI Career Analysis</Typography>
                <Typography sx={{ color: '#8888AA', fontSize: '0.75rem' }}>Powered by AI · Where AI Meets Ambition</Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mb: 3 }} />
            <Box>
              {paragraphs.map((para, i) => (
                <Typography key={i} sx={{
                  color: /^\d\./.test(para) ? '#A89CFF' : '#CCCCDD',
                  lineHeight: 1.85, mb: 1.5,
                  fontWeight: /^\d\./.test(para) ? 600 : 400,
                  fontSize: /^\d\./.test(para) ? '1rem' : '0.95rem',
                }}>
                  {para.replace(/\*\*/g, '')}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Actions */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="outlined" startIcon={<Home />} onClick={() => navigate('/')}
              sx={{ borderColor: 'rgba(255,255,255,0.15)', color: '#8888AA', borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1.3, '&:hover': { borderColor: '#6C63FF', color: '#A89CFF' } }}>
              Go Home
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="outlined" startIcon={<History />} onClick={() => navigate('/history')}
              sx={{ borderColor: 'rgba(255,255,255,0.15)', color: '#8888AA', borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1.3, '&:hover': { borderColor: '#00D4AA', color: '#00D4AA' } }}>
              View History
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" startIcon={<Replay />} onClick={() => navigate('/test')}
              sx={{ background: 'linear-gradient(135deg, #6C63FF, #5B54E8)', borderRadius: 2, textTransform: 'none', fontWeight: 700, py: 1.3 }}>
              Retake Test
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}