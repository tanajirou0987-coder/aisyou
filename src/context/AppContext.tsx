import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { AppState, AppMode, Participant, Question, Answer, CompatibilityScore } from '../types'

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
}

const AppContext = createContext<AppContextType | undefined>(undefined)

type AppAction =
  | { type: 'SET_MODE'; payload: AppMode }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'ADD_PARTICIPANT'; payload: Participant }
  | { type: 'REMOVE_PARTICIPANT'; payload: string }
  | { type: 'SUBMIT_ANSWER'; payload: { participantId: string; questionId: string; optionId: string; value: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'CALCULATE_COMPATIBILITY'; payload: CompatibilityScore[] }
  | { type: 'RESET_APP' }

const initialState: AppState = {
  mode: 'romance',
  participants: [],
  questions: [],
  currentQuestionIndex: 0,
  compatibilityScores: [],
  futurePredictions: [],
  isQuestionActive: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload }

    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, currentQuestionIndex: 0, isQuestionActive: true }
    
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
                    value: action.payload.value
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

  const addParticipant = (name: string) => {
    const participant: Participant = {
      id: `participant_${Date.now()}`,
      name,
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
      resetApp
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






