import { useState, useCallback } from 'react'
import { QuizState, QuizConfig } from '../types'
import { 
  createInitialQuizState, 
  updateAnswer, 
  goToNextQuestion, 
  goToPreviousQuestion,
  calculateQuizProgress 
} from '../utils/quiz'

export function useQuiz(config: QuizConfig) {
  const [state, setState] = useState<QuizState>(() => 
    createInitialQuizState(config)
  )

  const handleAnswer = useCallback((
    questionId: string,
    participantId: string,
    answer: string
  ) => {
    setState(prev => updateAnswer(prev, questionId, participantId, answer))
  }, [])

  const nextQuestion = useCallback(() => {
    setState(prev => goToNextQuestion(prev))
  }, [])

  const previousQuestion = useCallback(() => {
    setState(prev => goToPreviousQuestion(prev))
  }, [])

  const progress = calculateQuizProgress(state)

  return {
    state,
    progress,
    handleAnswer,
    nextQuestion,
    previousQuestion
  }
}