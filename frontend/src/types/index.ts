// ── Input: what the student sends to the backend ──────────────────
export interface AptitudeTestResult {
  userId: string
  logicalReasoningScore: number
  verbalReasoningScore: number
  quantitativeScore: number
}

// ── Output: what the backend returns after AI processing ──────────
export interface CareerRecommendation {
  userId: string
  logicalScore: number
  verbalScore: number
  quantitativeScore: number
  aiRecommendation: string
  processedAt: string // ISO date string from Java LocalDateTime
}

// ── History: stored in localStorage ──────────────────────────────
export interface HistoryEntry extends CareerRecommendation {
  name: string
  submittedAt: string
}

// ── MCQ Question ──────────────────────────────────────────────────
export interface MCQQuestion {
  q: string
  options: string[]
  correct: number
}

export type AptitudeCategory = 'logical' | 'verbal' | 'quantitative'

export type MCQAnswers = {
  [K in AptitudeCategory]: Record<number, string>
}

export type SelfRatings = {
  [K in AptitudeCategory]: number
}