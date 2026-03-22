import type { AptitudeCategory, MCQAnswers, SelfRatings } from '../types'
import { mcqQuestions } from '../data/questions'

/**
 * Calculates the final score for a category (0–100)
 * MCQ contributes 70% of the score, self-rating contributes 30%
 */
export const calcScore = (
  category: AptitudeCategory,
  answers: MCQAnswers,
  selfRate: SelfRatings
): number => {
  const questions = mcqQuestions[category]
  let correctCount = 0

  questions.forEach((q, i) => {
    if (parseInt(answers[category][i] ?? '-1') === q.correct) {
      correctCount++
    }
  })

  const mcqPercent = (correctCount / questions.length) * 70  // max 70
  const selfPercent = (selfRate[category] / 100) * 30         // max 30
  return Math.round(mcqPercent + selfPercent)
}

/**
 * Returns a colour based on the score value
 */
export const scoreColor = (score: number): string => {
  if (score >= 75) return '#00D4AA'
  if (score >= 50) return '#6C63FF'
  return '#FF6B6B'
}

/**
 * Returns a label based on the score value
 */
export const scoreLabel = (score: number): string => {
  if (score >= 75) return 'Strong'
  if (score >= 50) return 'Moderate'
  return 'Developing'
}