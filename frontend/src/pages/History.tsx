import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Container, Typography, Card, CardContent,
  Grid, Chip, Divider, Alert,
} from '@mui/material'
import { ArrowBack, Delete, TrendingUp } from '@mui/icons-material'
import { scoreColor } from '../utils/score'
import type { HistoryEntry } from '../types'

export default function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const stored: HistoryEntry[] = JSON.parse(localStorage.getItem('careerHistory') ?? '[]')
    setHistory(stored)
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('careerHistory')
    setHistory([])
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0A1A', py: 6 }}>
      <Container maxWidth="md">

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ color: '#8888AA', textTransform: 'none', '&:hover': { color: '#A89CFF' } }}>Back</Button>
            <Box>
              <Typography variant="h5" sx={{ color: '#FFF', fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>📋 Test History</Typography>
              <Typography sx={{ color: '#8888AA', fontSize: '0.85rem' }}>Your past career assessments</Typography>
            </Box>
          </Box>
          {history.length > 0 && (
            <Button startIcon={<Delete />} onClick={clearHistory}
              sx={{ color: '#FF6B6B', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: 'rgba(255,107,107,0.1)' } }}>
              Clear All
            </Button>
          )}
        </Box>

        {/* Empty state */}
        {history.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontSize: '4rem', mb: 2 }}>📭</Typography>
            <Typography variant="h6" sx={{ color: '#8888AA', mb: 3 }}>No test history yet</Typography>
            <Button variant="contained" onClick={() => navigate('/test')}
              sx={{ background: 'linear-gradient(135deg, #6C63FF, #5B54E8)', textTransform: 'none', fontWeight: 700, borderRadius: 2 }}>
              Take Your First Test
            </Button>
          </Box>
        )}

        {/* History list */}
        {history.map((item, i) => (
          <Card key={i} sx={{ bgcolor: '#12122A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, mb: 3, transition: 'all 0.2s', '&:hover': { border: '1px solid rgba(108,99,255,0.3)', transform: 'translateY(-2px)' } }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography sx={{ color: '#FFF', fontWeight: 700, fontSize: '1.05rem' }}>{item.name || item.userId}</Typography>
                  <Typography sx={{ color: '#555577', fontSize: '0.8rem' }}>
                    {item.submittedAt ? new Date(item.submittedAt).toLocaleString() : 'Unknown date'}
                  </Typography>
                </Box>
                <Chip icon={<TrendingUp sx={{ fontSize: 14 }} />}
                  label={`Avg: ${Math.round((item.logicalScore + item.verbalScore + item.quantitativeScore) / 3)}`}
                  size="small" sx={{ bgcolor: 'rgba(108,99,255,0.15)', color: '#A89CFF', fontWeight: 700 }} />
              </Box>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                {[
                  { label: '🧠 Logical', val: item.logicalScore },
                  { label: '📖 Verbal', val: item.verbalScore },
                  { label: '🔢 Quant', val: item.quantitativeScore },
                ].map(({ label, val }) => (
                  <Grid item xs={4} key={label}>
                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, p: 1.5, textAlign: 'center', border: `1px solid ${scoreColor(val)}30` }}>
                      <Typography sx={{ color: '#8888AA', fontSize: '0.75rem', mb: 0.5 }}>{label}</Typography>
                      <Typography sx={{ color: scoreColor(val), fontWeight: 700, fontSize: '1.2rem' }}>{val}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {item.aiRecommendation && (
                <>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mb: 2 }} />
                  <Typography sx={{ color: '#8888AA', fontSize: '0.8rem', mb: 1 }}>AI Summary</Typography>
                  <Typography sx={{ color: '#AAAACC', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    {item.aiRecommendation.slice(0, 200)}
                    {item.aiRecommendation.length > 200 && (
                      <Box component="span" sx={{ color: '#6C63FF', cursor: 'pointer', ml: 0.5 }}
                        onClick={() => navigate('/results', { state: { result: item, name: item.name } })}>
                        ...read more
                      </Box>
                    )}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))}

        {history.length > 0 && (
          <Alert severity="info" sx={{ bgcolor: 'rgba(108,99,255,0.1)', color: '#A89CFF', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 3 }}>
            History is stored locally in your browser. Clearing browser data will remove it.
          </Alert>
        )}
      </Container>
    </Box>
  )
}