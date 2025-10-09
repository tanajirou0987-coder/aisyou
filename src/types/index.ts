export type AppMode = 'romance' | 'friendship'

export interface Question {
  id: string
  text: string
  options: QuestionOption[]
  category: string
  weight: number
}

export interface QuestionOption {
  id: string
  text: string
  value: number
  description?: string
}

export interface Answer {
  questionId: string
  optionId: string
  value: number
  timestamp: number
}

export interface Participant {
  id: string
  name: string
  answers: Answer[]
  joinedAt: number
}

export interface CompatibilityScore {
  participant1Id: string
  participant2Id: string
  score: number
  factors: CompatibilityFactor[]
}

export interface CompatibilityFactor {
  category: string
  score: number
  weight: number
  description: string
}

export interface FuturePrediction {
  participant1Id: string
  participant2Id: string
  coupleType: string
  description: string
  strengths: string[]
  challenges: string[]
  compatibilityScore: number
  personalityTraits: {
    participant1: string[]
    participant2: string[]
  }
}

export interface AppState {
  mode: AppMode
  participants: Participant[]
  questions: Question[]
  currentQuestionIndex: number
  compatibilityScores: CompatibilityScore[]
  futurePredictions: FuturePrediction[]
  isQuestionActive: boolean
}







