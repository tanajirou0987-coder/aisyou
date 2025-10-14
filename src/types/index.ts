export type AppMode = 'romance' | 'friendship' | 'drinking'

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

// グループセッション関連の型定義
export interface GroupSession {
  groupId: string
  groupName?: string
  createdAt: string
  status: 'active' | 'completed'
}

export interface GroupParticipant {
  userId: string
  userName: string
  gender: 'male' | 'female'
  registrationOrder: number
  diagnosisCompleted: boolean
  intoxicationLevel?: number
  diagnosisData?: Answer[]
}

export interface GroupRomanticSummary {
  groupId: string
  maleCount: number
  femaleCount: number
  maleNames: string[]
  femaleNames: string[]
  totalCombinations: number
  averageScore: number
  maxScore: {
    maleName: string
    femaleName: string
    score: number
  }
  minScore: {
    maleName: string
    femaleName: string
    score: number
  }
  balanceComment: string
  overallComment: string
}

export interface BestCouple {
  rank: number
  maleId: string
  maleName: string
  femaleId: string
  femaleName: string
  romanticScore: number
  detailedComment: string
}

export interface CombinationItem {
  rank: number
  maleId: string
  maleName: string
  femaleId: string
  femaleName: string
  romanticScore: number
  compatibilityLevel: '相性抜群！' | 'いい感じ' | '微妙' | '友達止まり'
  starRating: number
  briefComment: string
}

export interface AllCombinationsList {
  groupId: string
  totalCombinations: number
  combinations: CombinationItem[]
}

export interface WorstCouple {
  maleId: string
  maleName: string
  femaleId: string
  femaleName: string
  romanticScore: number
  humorousComment: string
}

export interface GroupDiagnosisProgress {
  groupId: string
  currentUserId?: string
  completedCount: number
  totalCount: number
  currentUserAnswers?: Record<string, string>
  intoxicationLevel?: number
}

export interface CompletionStatus {
  groupId: string
  completedUsers: string[]
  pendingUsers: string[]
  allCompleted: boolean
}

export interface GenderBalance {
  maleCount: number
  femaleCount: number
  isBalanced: boolean
  warningMessage?: string
}

export interface AppState {
  mode: AppMode
  participants: Participant[]
  questions: Question[]
  currentQuestionIndex: number
  compatibilityScores: CompatibilityScore[]
  futurePredictions: FuturePrediction[]
  isQuestionActive: boolean
  // グループセッション関連の状態
  groupSession?: GroupSession
  groupParticipants: GroupParticipant[]
  groupDiagnosisProgress?: GroupDiagnosisProgress
  groupRomanticSummary?: GroupRomanticSummary
  bestCouples: BestCouple[]
  allCombinationsList?: AllCombinationsList
  worstCouple?: WorstCouple
  completionStatus?: CompletionStatus
  genderBalance?: GenderBalance
  // 相性診断の関係ステージ
  relationshipStage?: {
    status: 'before_dating' | 'dating'
    duration?: 'less_than_3m' | '3m_to_1y' | '1y_to_3y' | 'over_3y'
  }
}







