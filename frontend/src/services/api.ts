import axios from 'axios'
import type { AptitudeTestResult, CareerRecommendation } from '../types'

const api = axios.create({
  baseURL: '/api', // proxied to http://localhost:8080 via vite.config.ts
  headers: { 'Content-Type': 'application/json' },
})

// Submit aptitude test → returns AI-generated CareerRecommendation
export const submitAptitudeTest = async (
  payload: AptitudeTestResult
): Promise<CareerRecommendation> => {
  const response = await api.post<CareerRecommendation>('/aptitude/submit', payload)
  return response.data
}

// Health check
export const checkHealth = async (): Promise<string> => {
  const response = await api.get<string>('/aptitude/health')
  return response.data
}

export default api