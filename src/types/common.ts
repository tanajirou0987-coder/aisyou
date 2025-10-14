/**
 * アプリケーション全体で使用する共通型定義
 */

// 性別
export type Gender = 'male' | 'female'

// セッションステータス
export type SessionStatus = 'waiting' | 'in_progress' | 'completed'

// 参加者情報
export interface Participant {
  userId: string
  userName: string
  gender: Gender
  currentQuestionIndex: number
  answers: number[]
  isCompleted: boolean
  joinedAt: number
}

// セッションデータ
export interface SessionData {
  sessionId: string
  groupName: string
  currentQuestionIndex: number
  totalQuestions: number
  participants: Record<string, Participant>
  status: SessionStatus
  createdAt: number
}

// 相性スコア詳細
export interface CompatibilityScoreDetails {
  [category: string]: number
}

// ペア分析データ
export interface PairAnalysis {
  relationshipType: string
  coupleDescription: string
  detailedScores: CompatibilityScoreDetails
  romanticPotential: number
  romanticPotentialDetails: {
    description: string
    factors: string[]
  }
  actionRecommendations: {
    title: string
    description: string
  }[]
  seatingRecommendation: {
    ideal: string
    reason: string
  }
  drinkRecommendations: {
    forMale: string[]
    forFemale: string[]
  }
  conversationTopics: string[]
  personalityTendencies: {
    male: string
    female: string
  }
  physicalIntimacy: {
    level: string
    description: string
  }
}

// エラー型
export interface AppError {
  code: string
  message: string
  details?: unknown
}




