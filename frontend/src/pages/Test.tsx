import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Container, Typography, Card, CardContent,
  LinearProgress, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, Slider, Chip, Alert,
} from '@mui/material'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import { submitAptitudeTest } from '../services/api'
import { mcqQuestions } from '../data/questions'
import { calcScore } from '../utils/score'
import type { AptitudeCategory, MCQAnswers, SelfRatings, HistoryEntry } from '../types'

// The 5 steps of the test wizard
type Section = 'info' | AptitudeCategory | 'selfrate'
const SECTIONS: Section[] = ['info', 'logical', 'verbal', 'quantitative', 'selfrate']

const sectionLabel: Record<string, string> = {
  logical: '🧠 Logical Reasoning',
  verbal: '📖 Verbal Reasoning',
  quantitative: '🔢 Quantitative',
}

export default function Test() {
  const navigate = useNavigate()
  const [sectionIndex, setSectionIndex] = useState(0)
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [answers, setAnswers] = useState<MCQAnswers>({ logical: {}, verbal: {}, quantitative: {} })
  const [selfRate, setSelfRate] = useState<SelfRatings>({ logical: 50, verbal: 50, quantitative: 50 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentSection = SECTIONS[sectionIndex]
  const progress = (sectionIndex / (SECTIONS.length - 1)) * 100
  const isMCQSection = (s: Section): s is AptitudeCategory =>
    ['logical', 'verbal', 'quantitative'].includes(s)

  const handleAnswer = (cat: AptitudeCategory, qIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [cat]: { ...prev[cat], [qIndex]: value } }))
  }

  const canProceed = (): boolean => {
    if (currentSection === 'info') return name.trim().length > 0
    if (isMCQSection(currentSection)) {
      return Object.keys(answers[currentSection]).length === mcqQuestions[currentSection].length
    }
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        userId: userId.trim() || name.toLowerCase().replace(/\s+/g, '_'),
        logicalReasoningScore: calcScore('logical', answers, selfRate),
        verbalReasoningScore: calcScore('verbal', answers, selfRate),
        quantitativeScore: calcScore('quantitative', answers, selfRate),
      }
      const result = await submitAptitudeTest(payload)

      // Persist to localStorage for History page
      const existing: HistoryEntry[] = JSON.parse(localStorage.getItem('careerHistory') ?? '[]')
      const entry: HistoryEntry = { ...result, name, submittedAt: new Date().toISOString() }
      localStorage.setItem('careerHistory', JSON.stringify([entry, ...existing].slice(0, 10)))

      navigate('/results', { state: { result, name } })
    } catch {
      setError('Could not connect to backend. Make sure Spring Boot is running on port 8080.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0A1A', py: 6 }}>
      <Container maxWidth="md">

        {/* Progress */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ color: '#8888AA', fontSize: '0.85rem' }}>Step {sectionIndex + 1} of {SECTIONS.length}</Typography>
            <Typography sx={{ color: '#8888AA', fontSize: '0.85rem' }}>{Math.round(progress)}% complete</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress}
            sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.07)', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #6C63FF, #00D4AA)', borderRadius: 3 } }} />
        </Box>

        {/* Step: Info */}
        {currentSection === 'info' && (
          <Card sx={{ bgcolor: '#12122A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4 }}>
            <CardContent sx={{ p: 5 }}>
              <Typography variant="h4" sx={{ color: '#FFF', fontFamily: '"Playfair Display", serif', fontWeight: 700, mb: 1 }}>Welcome! 👋</Typography>
              <Typography sx={{ color: '#8888AA', mb: 4 }}>Let's start with some basic information about you.</Typography>
              <TextField fullWidth label="Your Full Name" variant="outlined" value={name}
                onChange={e => setName(e.target.value)} sx={{ mb: 3, '& .MuiOutlinedInput-root': { color: '#FFF', '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' }, '&:hover fieldset': { borderColor: '#6C63FF' } }, '& .MuiInputLabel-root': { color: '#8888AA' } }} />
              <TextField fullWidth label="Student ID (optional)" variant="outlined" value={userId}
                onChange={e => setUserId(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { color: '#FFF', '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' }, '&:hover fieldset': { borderColor: '#6C63FF' } }, '& .MuiInputLabel-root': { color: '#8888AA' } }} />
            </CardContent>
          </Card>
        )}

        {/* Step: MCQ */}
        {isMCQSection(currentSection) && (
          <Box>
            <Chip label={sectionLabel[currentSection]} sx={{ mb: 4, bgcolor: 'rgba(108,99,255,0.15)', color: '#A89CFF', fontWeight: 700, fontSize: '0.95rem', px: 1 }} />
            {mcqQuestions[currentSection].map((q, i) => (
              <Card key={i} sx={{ bgcolor: '#12122A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={{ color: '#FFF', fontWeight: 600, mb: 3, lineHeight: 1.6 }}>
                    Q{i + 1}. {q.q}
                  </Typography>
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup value={answers[currentSection][i] ?? ''} onChange={e => handleAnswer(currentSection, i, e.target.value)}>
                      {q.options.map((opt, j) => (
                        <FormControlLabel key={j} value={String(j)} label={opt}
                          control={<Radio sx={{ color: '#6C63FF', '&.Mui-checked': { color: '#6C63FF' } }} />}
                          sx={{ color: '#CCCCDD', mb: 1, borderRadius: 2, px: 2, py: 0.5, bgcolor: answers[currentSection][i] === String(j) ? 'rgba(108,99,255,0.1)' : 'transparent', border: answers[currentSection][i] === String(j) ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent', transition: 'all 0.2s' }} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Step: Self Rating */}
        {currentSection === 'selfrate' && (
          <Card sx={{ bgcolor: '#12122A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4 }}>
            <CardContent sx={{ p: 5 }}>
              <Typography variant="h5" sx={{ color: '#FFF', fontFamily: '"Playfair Display", serif', fontWeight: 700, mb: 1 }}>Self Assessment</Typography>
              <Typography sx={{ color: '#8888AA', mb: 5 }}>How confident do you feel in each area? Slide to rate yourself honestly.</Typography>
              {(
                [
                  { key: 'logical' as const, label: '🧠 Logical Reasoning', color: '#6C63FF' },
                  { key: 'verbal' as const, label: '📖 Verbal Reasoning', color: '#00D4AA' },
                  { key: 'quantitative' as const, label: '🔢 Quantitative Skills', color: '#FF6B6B' },
                ] as const
              ).map(({ key, label, color }) => (
                <Box key={key} sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography sx={{ color: '#CCCCDD', fontWeight: 600 }}>{label}</Typography>
                    <Typography sx={{ color, fontWeight: 700 }}>{selfRate[key]}/100</Typography>
                  </Box>
                  <Slider value={selfRate[key]} onChange={(_, v) => setSelfRate(prev => ({ ...prev, [key]: v as number }))}
                    min={0} max={100} sx={{ color, '& .MuiSlider-thumb': { boxShadow: `0 0 12px ${color}55` } }} />
                </Box>
              ))}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => setSectionIndex(s => s - 1)} disabled={sectionIndex === 0}
            sx={{ borderColor: 'rgba(255,255,255,0.15)', color: '#8888AA', borderRadius: 2, textTransform: 'none', fontWeight: 600, '&:hover': { borderColor: '#6C63FF', color: '#A89CFF' } }}>
            Back
          </Button>

          {currentSection !== 'selfrate' ? (
            <Button variant="contained" endIcon={<ArrowForward />} onClick={() => setSectionIndex(s => s + 1)} disabled={!canProceed()}
              sx={{ background: 'linear-gradient(135deg, #6C63FF, #5B54E8)', px: 4, borderRadius: 2, textTransform: 'none', fontWeight: 700, '&:disabled': { opacity: 0.4 } }}>
              Continue
            </Button>
          ) : (
            <Button variant="contained" endIcon={<ArrowForward />} onClick={handleSubmit} disabled={loading}
              sx={{ background: 'linear-gradient(135deg, #00D4AA, #00B894)', px: 4, borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>
              {loading ? 'Analysing with AI...' : 'Get My Career Path 🚀'}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  )
}