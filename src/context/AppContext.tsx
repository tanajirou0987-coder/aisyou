import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { 
  AppState, 
  AppMode, 
  Participant, 
  Question, 
  Answer, 
  CompatibilityScore,
  GroupSession,
  GroupParticipant,
  GroupDiagnosisProgress,
  GroupRomanticSummary,
  BestCouple,
  AllCombinationsList,
  WorstCouple,
  CompletionStatus,
  GenderBalance
} from '../types'
import { 
  calculateCategoryScores, 
  calculatePersonalityProfile, 
  determineDrinkingType,
  calculateCompatibilityScore
} from '../utils/scientificDrinkingAnalysis'

interface AppContextType {
  state: AppState
  setMode: (mode: AppMode) => void
  setQuestions: (questions: Question[]) => void
  addParticipant: (name: string) => void
  removeParticipant: (id: string) => void
  submitAnswer: (participantId: string, questionId: string, optionId: string, value: number) => void
  nextQuestion: () => void
  calculateCompatibility: () => void
  resetApp: () => void
  setMockData: (mode: AppMode) => void
  setGroupMockData: () => void
  // グループセッション関連の関数
  startGroupSession: (groupName?: string) => void
  addGroupParticipant: (userName: string, gender: 'male' | 'female') => void
  removeGroupParticipant: (userId: string) => void
  startGroupDiagnosis: () => void
  submitGroupAnswer: (userId: string, questionId: string, optionId: string, value: number) => void
  completeUserDiagnosis: (userId: string) => void
  calculateGroupResults: () => void
  resetGroupSession: () => void
  checkGenderBalance: () => GenderBalance
  // 相性診断の関係ステージ設定
  setRelationshipStage: (status: 'before_dating' | 'dating', duration?: 'less_than_3m' | '3m_to_1y' | '1y_to_3y' | 'over_3y') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

type AppAction =
  | { type: 'SET_MODE'; payload: AppMode }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'SET_PARTICIPANTS'; payload: Participant[] }
  | { type: 'ADD_PARTICIPANT'; payload: Participant }
  | { type: 'REMOVE_PARTICIPANT'; payload: string }
  | { type: 'SUBMIT_ANSWER'; payload: { participantId: string; questionId: string; optionId: string; value: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'CALCULATE_COMPATIBILITY'; payload: CompatibilityScore[] }
  | { type: 'RESET_APP' }
  // グループセッション関連のアクション
  | { type: 'START_GROUP_SESSION'; payload: GroupSession }
  | { type: 'ADD_GROUP_PARTICIPANT'; payload: GroupParticipant }
  | { type: 'REMOVE_GROUP_PARTICIPANT'; payload: string }
  | { type: 'START_GROUP_DIAGNOSIS'; payload: GroupDiagnosisProgress }
  | { type: 'SUBMIT_GROUP_ANSWER'; payload: { userId: string; questionId: string; optionId: string; value: number } }
  | { type: 'COMPLETE_USER_DIAGNOSIS'; payload: string }
  | { type: 'CALCULATE_GROUP_RESULTS'; payload: { summary: GroupRomanticSummary; bestCouples: BestCouple[]; allCombinations: AllCombinationsList; worstCouple: WorstCouple; completionStatus: CompletionStatus } }
  | { type: 'RESET_GROUP_SESSION' }
  // 相性診断の関係ステージ
  | { type: 'SET_RELATIONSHIP_STAGE'; payload: { status: 'before_dating' | 'dating', duration?: 'less_than_3m' | '3m_to_1y' | '1y_to_3y' | 'over_3y' } }

const initialState: AppState = {
  mode: 'romance',
  participants: [],
  questions: [],
  currentQuestionIndex: 0,
  compatibilityScores: [],
  futurePredictions: [],
  isQuestionActive: false,
  // グループセッション関連の初期状態
  groupParticipants: [],
  bestCouples: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload }

    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, currentQuestionIndex: 0, isQuestionActive: true }
    
    case 'SET_PARTICIPANTS':
      return { ...state, participants: action.payload }
    
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [...state.participants, action.payload]
      }
    
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter(p => p.id !== action.payload)
      }
    
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        participants: state.participants.map(participant =>
          participant.id === action.payload.participantId
            ? {
                ...participant,
                answers: [
                  ...participant.answers.filter(a => a.questionId !== action.payload.questionId),
                  {
                    questionId: action.payload.questionId,
                    optionId: action.payload.optionId,
                    value: action.payload.value,
                    timestamp: Date.now()
                  }
                ]
              }
            : participant
        )
      }
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      }
    
    case 'CALCULATE_COMPATIBILITY':
      return {
        ...state,
        compatibilityScores: action.payload
      }
    
    
    case 'RESET_APP':
      return initialState
    
    // グループセッション関連のケース
    case 'START_GROUP_SESSION':
      return {
        ...state,
        groupSession: action.payload,
        groupParticipants: [],
        groupDiagnosisProgress: undefined,
        groupRomanticSummary: undefined,
        bestCouples: [],
        allCombinationsList: undefined,
        worstCouple: undefined,
        completionStatus: undefined
      }
    
    case 'ADD_GROUP_PARTICIPANT':
      return {
        ...state,
        groupParticipants: [...state.groupParticipants, action.payload]
      }
    
    case 'REMOVE_GROUP_PARTICIPANT':
      return {
        ...state,
        groupParticipants: state.groupParticipants.filter(p => p.userId !== action.payload)
      }
    
    case 'START_GROUP_DIAGNOSIS':
      return {
        ...state,
        groupDiagnosisProgress: action.payload
      }
    
    case 'SUBMIT_GROUP_ANSWER':
      return {
        ...state,
        groupParticipants: state.groupParticipants.map(participant =>
          participant.userId === action.payload.userId
            ? {
                ...participant,
                diagnosisData: [
                  ...(participant.diagnosisData || []).filter(a => a.questionId !== action.payload.questionId),
                  {
                    questionId: action.payload.questionId,
                    optionId: action.payload.optionId,
                    value: action.payload.value,
                    timestamp: Date.now()
                  }
                ]
              }
            : participant
        )
      }
    
    case 'COMPLETE_USER_DIAGNOSIS':
      return {
        ...state,
        groupParticipants: state.groupParticipants.map(participant =>
          participant.userId === action.payload
            ? { ...participant, diagnosisCompleted: true }
            : participant
        )
      }
    
    case 'CALCULATE_GROUP_RESULTS':
      return {
        ...state,
        groupRomanticSummary: action.payload.summary,
        bestCouples: action.payload.bestCouples,
        allCombinationsList: action.payload.allCombinations,
        worstCouple: action.payload.worstCouple,
        completionStatus: action.payload.completionStatus
      }
    
    case 'RESET_GROUP_SESSION':
      return {
        ...state,
        groupSession: undefined,
        groupParticipants: [],
        groupDiagnosisProgress: undefined,
        groupRomanticSummary: undefined,
        bestCouples: [],
        allCombinationsList: undefined,
        worstCouple: undefined,
        completionStatus: undefined
      }
    
    case 'SET_RELATIONSHIP_STAGE':
      return {
        ...state,
        relationshipStage: action.payload
      }
    
    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const setMode = (mode: AppMode) => {
    dispatch({ type: 'SET_MODE', payload: mode })
  }

  const setQuestions = (questions: Question[]) => {
    dispatch({ type: 'SET_QUESTIONS', payload: questions })
  }

  const addParticipant = (name: string, gender: 'male' | 'female' = 'male') => {
    const participant: Participant = {
      id: `participant_${Date.now()}`,
      name,
      gender,
      answers: [],
      joinedAt: Date.now()
    }
    dispatch({ type: 'ADD_PARTICIPANT', payload: participant })
  }

  const removeParticipant = (id: string) => {
    dispatch({ type: 'REMOVE_PARTICIPANT', payload: id })
  }

  const submitAnswer = (participantId: string, questionId: string, optionId: string, value: number) => {
    dispatch({ type: 'SUBMIT_ANSWER', payload: { participantId, questionId, optionId, value } })
  }

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' })
  }

  const calculateCompatibility = () => {
    // 相性計算ロジックは後で実装
    dispatch({ type: 'CALCULATE_COMPATIBILITY', payload: [] })
  }


  const resetApp = () => {
    dispatch({ type: 'RESET_APP' })
  }

  // 管理者用：モックデータを設定する関数
  const setMockData = (mode: AppMode) => {
    const mockParticipants: Participant[] = [
      {
        id: '1',
        name: '太郎',
        gender: 'male',
        answers: [],
        joinedAt: Date.now()
      },
      {
        id: '2', 
        name: '花子',
        gender: 'female',
        answers: [],
        joinedAt: Date.now()
      }
    ]
    
    // 全ての状態をリセットしてから設定
    dispatch({ type: 'RESET_APP' })
    dispatch({ type: 'SET_MODE', payload: mode })
    dispatch({ type: 'SET_PARTICIPANTS', payload: mockParticipants })
    dispatch({ 
      type: 'SET_RELATIONSHIP_STAGE', 
      payload: { 
        status: 'dating', 
        duration: '3m_to_1y' 
      } 
    })
  }

  // グループ診断用のモックデータを設定する関数
  const setGroupMockData = () => {
    const mockGroupParticipants: GroupParticipant[] = [
      {
        userId: '1',
        userName: '田中太郎',
        gender: 'male',
        registrationOrder: 1,
        diagnosisCompleted: true,
        diagnosisData: [
          // 恋愛積極性: 高め (drinking_1, 5, 7, 9, 11, 13, 15)
          { questionId: 'drinking_1', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_5', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_7', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_9', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_11', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_13', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_15', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 盛り上げ力: 高め (drinking_2, 6, 10, 12)
          { questionId: 'drinking_2', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_6', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_10', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_12', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 社交性: 高め (drinking_8, 14)
          { questionId: 'drinking_8', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_14', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 飲酒量: 普通 (drinking_3)
          { questionId: 'drinking_3', optionId: 'no', value: 0, timestamp: Date.now() },
          // 本音度: 高め (drinking_4)
          { questionId: 'drinking_4', optionId: 'yes', value: 1, timestamp: Date.now() }
        ]
      },
      {
        userId: '2',
        userName: '佐藤花子',
        gender: 'female',
        registrationOrder: 2,
        diagnosisCompleted: true,
        diagnosisData: [
          // 恋愛積極性: 中程度
          { questionId: 'drinking_1', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_5', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_7', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_9', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_11', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_13', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_15', optionId: 'no', value: 0, timestamp: Date.now() },
          // 盛り上げ力: 低め
          { questionId: 'drinking_2', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_6', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_10', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_12', optionId: 'no', value: 0, timestamp: Date.now() },
          // 社交性: 中程度
          { questionId: 'drinking_8', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_14', optionId: 'no', value: 0, timestamp: Date.now() },
          // 飲酒量: 低め
          { questionId: 'drinking_3', optionId: 'no', value: 0, timestamp: Date.now() },
          // 本音度: 高め
          { questionId: 'drinking_4', optionId: 'yes', value: 1, timestamp: Date.now() }
        ]
      },
      {
        userId: '3',
        userName: '山田次郎',
        gender: 'male',
        registrationOrder: 3,
        diagnosisCompleted: true,
        diagnosisData: [
          // 恋愛積極性: 低め
          { questionId: 'drinking_1', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_5', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_7', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_9', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_11', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_13', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_15', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 盛り上げ力: 中程度
          { questionId: 'drinking_2', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_6', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_10', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_12', optionId: 'no', value: 0, timestamp: Date.now() },
          // 社交性: 低め
          { questionId: 'drinking_8', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_14', optionId: 'no', value: 0, timestamp: Date.now() },
          // 飲酒量: 高め
          { questionId: 'drinking_3', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 本音度: 低め
          { questionId: 'drinking_4', optionId: 'no', value: 0, timestamp: Date.now() }
        ]
      },
      {
        userId: '4',
        userName: '鈴木美咲',
        gender: 'female',
        registrationOrder: 4,
        diagnosisCompleted: true,
        diagnosisData: [
          // 恋愛積極性: 高め
          { questionId: 'drinking_1', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_5', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_7', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_9', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_11', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_13', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_15', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 盛り上げ力: 高め
          { questionId: 'drinking_2', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_6', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_10', optionId: 'no', value: 0, timestamp: Date.now() },
          { questionId: 'drinking_12', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 社交性: 高め
          { questionId: 'drinking_8', optionId: 'yes', value: 1, timestamp: Date.now() },
          { questionId: 'drinking_14', optionId: 'yes', value: 1, timestamp: Date.now() },
          // 飲酒量: 普通
          { questionId: 'drinking_3', optionId: 'no', value: 0, timestamp: Date.now() },
          // 本音度: 高め
          { questionId: 'drinking_4', optionId: 'yes', value: 1, timestamp: Date.now() }
        ]
      }
    ]
    
    // グループセッションを開始
    const groupSession: GroupSession = {
      groupId: 'demo_group_123',
      groupName: 'デモグラスノオト',
      createdAt: new Date().toISOString(),
      status: 'active'
    }
    
    dispatch({ type: 'START_GROUP_SESSION', payload: groupSession })
    
    // 参加者を設定
    mockGroupParticipants.forEach(participant => {
      dispatch({ type: 'ADD_GROUP_PARTICIPANT', payload: participant })
    })
    
    // 結果を計算
    setTimeout(() => {
      calculateGroupResults()
    }, 100)
  }

  // グループセッション関連の関数
  const startGroupSession = (groupName?: string) => {
    const groupSession: GroupSession = {
      groupId: `group_${Date.now()}`,
      groupName,
      createdAt: new Date().toISOString(),
      status: 'active'
    }
    dispatch({ type: 'START_GROUP_SESSION', payload: groupSession })
  }

  const addGroupParticipant = (userName: string, gender: 'male' | 'female') => {
    const participant: GroupParticipant = {
      userId: `user_${Date.now()}`,
      userName,
      gender,
      registrationOrder: state.groupParticipants.length + 1,
      diagnosisCompleted: false
    }
    dispatch({ type: 'ADD_GROUP_PARTICIPANT', payload: participant })
  }

  const removeGroupParticipant = (userId: string) => {
    dispatch({ type: 'REMOVE_GROUP_PARTICIPANT', payload: userId })
  }

  const startGroupDiagnosis = () => {
    const progress: GroupDiagnosisProgress = {
      groupId: state.groupSession?.groupId || '',
      completedCount: 0,
      totalCount: state.groupParticipants.length
    }
    dispatch({ type: 'START_GROUP_DIAGNOSIS', payload: progress })
  }

  const submitGroupAnswer = (userId: string, questionId: string, optionId: string, value: number) => {
    dispatch({ type: 'SUBMIT_GROUP_ANSWER', payload: { userId, questionId, optionId, value } })
  }

  const completeUserDiagnosis = (userId: string) => {
    dispatch({ type: 'COMPLETE_USER_DIAGNOSIS', payload: userId })
  }

  const calculateGroupResults = () => {
    // グループ結果計算ロジックを実装
    console.log('AppContext - 参加者データ:', state.groupParticipants)
    console.log('AppContext - 使用する計算ロジック: groupCompatibilityCalculator')
    
    // 確実に新しい計算ロジックを使用
    const calculateGroupCompatibility = (participants: any[]) => {
      const groupId = 'group_' + Date.now()
      
      // 男性と女性を分離
      const maleParticipants = participants.filter(p => p.gender === 'male')
      const femaleParticipants = participants.filter(p => p.gender === 'female')
      
      console.log('AppContext内 - 男性参加者:', maleParticipants.map(p => `${p.userName}♂`))
      console.log('AppContext内 - 女性参加者:', femaleParticipants.map(p => `${p.userName}♀`))
      console.log('AppContext内 - 期待される組み合わせ数:', maleParticipants.length * femaleParticipants.length)
      
      // 異性間の組み合わせのみ相性スコアを計算
      const combinations: any[] = []
      
      // 確実に異性間のみの組み合わせを計算
      if (maleParticipants.length > 0 && femaleParticipants.length > 0) {
        for (const male of maleParticipants) {
          for (const female of femaleParticipants) {
            // 性別が異なることを再確認（男性と女性の組み合わせのみ）
            if (male.gender === 'male' && female.gender === 'female') {
              console.log(`AppContext内 - 異性間の組み合わせを計算: ${male.userName}♂ × ${female.userName}♀`)
              
              // 科学的根拠に基づいた相性スコアを計算
              let romanticScore = 50 // デフォルトスコア
              
              if (male.diagnosisData && male.diagnosisData.length > 0 && 
                  female.diagnosisData && female.diagnosisData.length > 0) {
                // カテゴリー別スコアを計算
                const maleCategoryScores = calculateCategoryScores(male.diagnosisData)
                const femaleCategoryScores = calculateCategoryScores(female.diagnosisData)
                
                // 性格プロファイルを計算
                const maleProfile = calculatePersonalityProfile(maleCategoryScores)
                const femaleProfile = calculatePersonalityProfile(femaleCategoryScores)
                
                // 科学的な相性スコアを計算
                romanticScore = calculateCompatibilityScore(maleProfile, femaleProfile)
                
                console.log(`AppContext内 - 科学的スコア計算完了: ${male.userName}♂ × ${female.userName}♀ = ${romanticScore}点`)
              } else {
                console.log(`AppContext内 - 診断データ不足のためデフォルトスコア使用: ${male.userName}♂ × ${female.userName}♀`)
              }
              
              combinations.push({
                rank: 0,
                maleId: male.userId,
                maleName: male.userName,
                femaleId: female.userId,
                femaleName: female.userName,
                romanticScore,
                compatibilityLevel: romanticScore >= 80 ? '相性抜群！' : romanticScore >= 60 ? 'いい感じ' : romanticScore >= 40 ? '微妙' : '友達止まり',
                starRating: Math.ceil(romanticScore / 20),
                briefComment: romanticScore >= 80 ? '今夜くっつく可能性大！' : romanticScore >= 60 ? 'いい感じ' : romanticScore >= 40 ? '微妙' : '友達止まりかも'
              })
            } else {
              console.log(`AppContext内 - 同性間の組み合わせをスキップ: ${male.userName}(${male.gender}) × ${female.userName}(${female.gender})`)
            }
          }
        }
      } else {
        console.log('AppContext内 - 異性間の組み合わせがありません（男性または女性がいません）')
      }
      
      // スコア順にソート
      combinations.sort((a, b) => b.romanticScore - a.romanticScore)
      
      // ランクを設定
      combinations.forEach((combo, index) => {
        combo.rank = index + 1
      })
      
      console.log('AppContext内 - 計算された組み合わせ数:', combinations.length)
      console.log('AppContext内 - 組み合わせ詳細:', combinations)
      
      // 異性間のみの組み合わせが生成されているか確認
      const heterosexualCombinations = combinations.filter(c => c.maleId && c.femaleId)
      console.log('AppContext内 - 異性間の組み合わせ数:', heterosexualCombinations.length)
      console.log('AppContext内 - 異性間の組み合わせ詳細:', heterosexualCombinations)
      
      // グループ全体のサマリーを生成
      const summary = {
        groupId,
        maleCount: maleParticipants.length,
        femaleCount: femaleParticipants.length,
        maleNames: maleParticipants.map(p => p.userName),
        femaleNames: femaleParticipants.map(p => p.userName),
        totalCombinations: combinations.length,
        averageScore: combinations.length > 0 ? Math.round(combinations.reduce((sum, c) => sum + c.romanticScore, 0) / combinations.length) : 0,
        maxScore: {
          maleName: combinations[0]?.maleName || '',
          femaleName: combinations[0]?.femaleName || '',
          score: combinations[0]?.romanticScore || 0
        },
        minScore: {
          maleName: combinations[combinations.length - 1]?.maleName || '',
          femaleName: combinations[combinations.length - 1]?.femaleName || '',
          score: combinations[combinations.length - 1]?.romanticScore || 0
        },
        balanceComment: maleParticipants.length === 0 || femaleParticipants.length === 0 
          ? '残念ながら異性がいないため、恋愛相性診断ができませんでした。' 
          : '完璧なバランス！全員にチャンスがある理想的な構成です。',
        overallComment: combinations.length > 0 
          ? `このグループは恋愛が生まれやすい相性！特に${combinations[0]?.maleName}さん♂と${combinations[0]?.femaleName}さん♀は今夜くっつく可能性大。`
          : '異性間の組み合わせがないため、恋愛相性診断ができませんでした。'
      }
      
      // ベストカップルTop3を生成
      const bestCouples = combinations.slice(0, 3).map((combo, index) => ({
        rank: index + 1,
        maleId: combo.maleId,
        maleName: combo.maleName,
        femaleId: combo.femaleId,
        femaleName: combo.femaleName,
        romanticScore: combo.romanticScore,
        detailedComment: `危険なほど相性抜群！今夜この二人を二人きりにしたら、告白やキスまで行く可能性大。`
      }))
      
      // 全組み合わせリスト
      const allCombinations = {
        groupId,
        totalCombinations: combinations.length,
        combinations
      }
      
      // ワーストカップル
      const worstCouple = combinations.length > 0 ? {
        maleId: combinations[combinations.length - 1].maleId,
        maleName: combinations[combinations.length - 1].maleName,
        femaleId: combinations[combinations.length - 1].femaleId,
        femaleName: combinations[combinations.length - 1].femaleName,
        romanticScore: combinations[combinations.length - 1].romanticScore,
        humorousComment: 'どれだけ酔っても恋愛対象として見れない最強の友達ゾーン（笑）。'
      } : undefined
      
      // 完了状況
      const completionStatus = {
        groupId,
        completedUsers: participants.filter(p => p.diagnosisCompleted).map(p => p.userId),
        pendingUsers: participants.filter(p => !p.diagnosisCompleted).map(p => p.userId),
        allCompleted: participants.every(p => p.diagnosisCompleted)
      }
      
      return {
        summary,
        bestCouples,
        allCombinations,
        worstCouple,
        completionStatus
      }
    }
    
    const results = calculateGroupCompatibility(state.groupParticipants)
    
    console.log('AppContext - 計算結果:', results)
    
    dispatch({ 
      type: 'CALCULATE_GROUP_RESULTS', 
      payload: results
    })
  }

  const resetGroupSession = () => {
    dispatch({ type: 'RESET_GROUP_SESSION' })
  }

  const checkGenderBalance = (): GenderBalance => {
    const maleCount = state.groupParticipants.filter(p => p.gender === 'male').length
    const femaleCount = state.groupParticipants.filter(p => p.gender === 'female').length
    const isBalanced = maleCount > 0 && femaleCount > 0
    
    let warningMessage: string | undefined
    if (maleCount === 0) {
      warningMessage = '現在、女性のみが登録されています。恋愛相性診断をするには、男性の参加者も登録してください。'
    } else if (femaleCount === 0) {
      warningMessage = '現在、男性のみが登録されています。恋愛相性診断をするには、女性の参加者も登録してください。'
    }
    
    return {
      maleCount,
      femaleCount,
      isBalanced,
      warningMessage
    }
  }

  const setRelationshipStage = (
    status: 'before_dating' | 'dating',
    duration?: 'less_than_3m' | '3m_to_1y' | '1y_to_3y' | 'over_3y'
  ) => {
    dispatch({ type: 'SET_RELATIONSHIP_STAGE', payload: { status, duration } })
  }

  return (
    <AppContext.Provider value={{
      state,
      setMode,
      setQuestions,
      addParticipant,
      removeParticipant,
      submitAnswer,
      nextQuestion,
      calculateCompatibility,
      resetApp,
      setMockData,
      setGroupMockData,
      // グループセッション関連の関数
      startGroupSession,
      addGroupParticipant,
      removeGroupParticipant,
      startGroupDiagnosis,
      submitGroupAnswer,
      completeUserDiagnosis,
      calculateGroupResults,
      resetGroupSession,
      checkGenderBalance,
      setRelationshipStage
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}






