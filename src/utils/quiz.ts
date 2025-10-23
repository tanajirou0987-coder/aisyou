import { QuizState, QuizConfig, AnswerOption } from '../types/quiz'

/**
 * クイズの初期状態を作成
 */
export const createInitialQuizState = (config: QuizConfig): QuizState => {
  return {
    currentQuestion: 0,
    totalQuestions: config.questions.length,
    answers: {},
    isCompleted: false
  }
}

/**
 * 回答を更新
 */
export const updateAnswer = (
  state: QuizState,
  questionId: string,
  participantId: string,
  answer: string
): QuizState => {
  return {
    ...state,
    answers: {
      ...state.answers,
      [questionId]: {
        ...state.answers[questionId],
        [participantId]: answer
      }
    }
  }
}

/**
 * 次の質問に進む
 */
export const goToNextQuestion = (state: QuizState): QuizState => {
  const nextQuestion = state.currentQuestion + 1
  return {
    ...state,
    currentQuestion: nextQuestion,
    isCompleted: nextQuestion >= state.totalQuestions
  }
}

/**
 * 前の質問に戻る
 */
export const goToPreviousQuestion = (state: QuizState): QuizState => {
  return {
    ...state,
    currentQuestion: Math.max(0, state.currentQuestion - 1)
  }
}

/**
 * プログレスを計算
 */
export const calculateQuizProgress = (state: QuizState): number => {
  return Math.round((state.currentQuestion / state.totalQuestions) * 100)
}

/**
 * 回答が完了しているかチェック
 */
export const isAnswerComplete = (
  state: QuizState,
  questionId: string,
  participants: string[]
): boolean => {
  const questionAnswers = state.answers[questionId] || {}
  return participants.every(participantId => questionAnswers[participantId])
}

/**
 * ランダムな回答オプションを生成
 */
export const generateRandomAnswers = (count: number): AnswerOption[] => {
  const emojis = ['😊', '😍', '🥰', '😘', '💕', '💖', '💗', '💝']
  const texts = [
    'とても当てはまる', '当てはまる', 'どちらでもない', 
    '当てはまらない', '全く当てはまらない'
  ]
  
  return Array.from({ length: count }, (_, index) => ({
    text: texts[index] || `選択肢${index + 1}`,
    emoji: emojis[index % emojis.length],
    value: `option_${index + 1}`
  }))
}








