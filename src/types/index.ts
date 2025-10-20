/**
 * アプリケーション全体の型定義
 * 全ての型をここに集約し、他のファイルからはここを参照する
 */

// ===== 基本型定義 =====
export type Gender = 'male' | 'female'
export type AppMode = 'romance' | 'friendship' | 'drinking'
export type SessionStatus = 'waiting' | 'in_progress' | 'completed'
export type RelationshipStatus = 'before_dating' | 'dating'
export type DatingDuration = 'less_than_3m' | '3m_to_1y' | '1y_to_3y' | 'over_3y'

// ===== 参加者関連 =====
export interface Participant {
  id: string
  name: string
  gender: Gender
  answers: Answer[]
  joinedAt: number
  isCompleted?: boolean
  currentQuestionIndex?: number
}

// ===== 質問・回答関連 =====
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

// ===== 相性診断関連 =====
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

export interface CompatibilityScoreDetails {
  [category: string]: number
}

// ===== 関係ステージ =====
export interface RelationshipStage {
  status: RelationshipStatus
  duration?: DatingDuration
}

// ===== グループセッション関連 =====
export interface GroupSession {
  groupId: string
  groupName?: string
  createdAt: string
  status: 'active' | 'completed'
}

export interface GroupParticipant {
  userId: string
  userName: string
  gender: Gender
  registrationOrder: number
  diagnosisCompleted: boolean
  intoxicationLevel?: number
  diagnosisData?: Answer[]
}

// ===== 診断結果関連 =====
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

// ===== グループ診断関連 =====
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

// ===== アプリケーション状態 =====
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
  relationshipStage?: RelationshipStage
}

// ===== UI関連 =====
export interface ButtonVariant {
  variant: 'primary' | 'secondary' | 'start' | 'answer'
  size: 'sm' | 'md' | 'lg'
}

export interface CardVariant {
  variant: 'default' | 'question' | 'glass'
}

export interface LayoutProps {
  children: React.ReactNode
  className?: string
  showBackgroundEffects?: boolean
}

export interface QuizProps {
  progress: number
  currentQuestion: number
  totalQuestions: number
}

export interface AnswerOption {
  text: string
  emoji: string
  value: string
}

export interface QuestionData {
  id: string
  question: string
  answers: AnswerOption[]
}

export interface CompatibilityResult {
  score: number
  title: string
  description: string
  keywords: string[]
}

// ===== エラー関連 =====
export interface AppError {
  code: string
  message: string
  details?: unknown
}

// ===== ユーティリティ関数 =====
/**
 * 関係ステージの表示名を取得
 */
export function getRelationshipStageLabel(stage: RelationshipStage): string {
  if (stage.status === 'before_dating') {
    return '付き合う前'
  }
  
  switch (stage.duration) {
    case 'less_than_3m':
      return '付き合っている（3ヶ月未満）'
    case '3m_to_1y':
      return '付き合っている（3ヶ月〜1年未満）'
    case '1y_to_3y':
      return '付き合っている（1年〜3年未満）'
    case 'over_3y':
      return '付き合っている（3年以上）'
    default:
      return '付き合っている'
  }
}

/**
 * 関係ステージに応じたフォーカス内容
 */
export function getRelationshipStageFocus(stage: RelationshipStage): {
  title: string
  focuses: string[]
} {
  if (stage.status === 'before_dating') {
    return {
      title: '付き合う前の関係',
      focuses: ['距離の縮め方', '初デートの提案', '告白のタイミング']
    }
  }
  
  switch (stage.duration) {
    case 'less_than_3m':
      return {
        title: '交際初期（3ヶ月未満）',
        focuses: ['連絡頻度', 'デート頻度', 'この時期の注意点']
      }
    case '3m_to_1y':
      return {
        title: '安定期（3ヶ月〜1年未満）',
        focuses: ['安定期の過ごし方', '関係深化', 'お互いの理解を深める']
      }
    case '1y_to_3y':
      return {
        title: '発展期（1年〜3年未満）',
        focuses: ['マンネリ対策', '将来設計', '関係の次のステップ']
      }
    case 'over_3y':
      return {
        title: '長期的な関係（3年以上）',
        focuses: ['長期的な関係維持', '結婚や家族計画', '深い絆の構築']
      }
    default:
      return {
        title: '交際中',
        focuses: ['関係の深化', 'お互いの理解', '将来への展望']
      }
  }
}