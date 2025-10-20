import React from 'react'
import { BaseLayout } from '../layouts/BaseLayout'

interface FullscreenLayoutProps {
  children: React.ReactNode
  className?: string
}

export function FullscreenLayout({ children, className = '' }: FullscreenLayoutProps) {
  return (
    <BaseLayout className={className}>
      {children}
    </BaseLayout>
  )
}

interface ScreenProps {
  children: React.ReactNode
  active?: boolean
  className?: string
}

export function Screen({ children, active = false, className = '' }: ScreenProps) {
  return (
    <div className={`screen ${active ? 'active' : ''} ${className}`}>
      {children}
    </div>
  )
}

interface StartScreenProps {
  title: string
  subtitle: string
  buttonText: string
  onButtonClick: () => void
  logo?: string
}

export function StartScreen({ title, subtitle, buttonText, onButtonClick, logo = '💕' }: StartScreenProps) {
  return (
    <Screen active className="start-screen">
      <div className="start-logo">{logo}</div>
      <h1 className="start-title">{title}</h1>
      <p className="start-subtitle">{subtitle}</p>
      <button className="start-button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </Screen>
  )
}

interface QuizScreenProps {
  children: React.ReactNode
  progress: number
  currentQuestion: number
  totalQuestions: number
}

export function QuizScreen({ children, progress, currentQuestion, totalQuestions }: QuizScreenProps) {
  return (
    <Screen active className="quiz-screen">
      <div className="quiz-header">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="question-counter">
          <span>質問 {currentQuestion}</span>
          <span>{totalQuestions}問中</span>
        </div>
      </div>
      <div className="quiz-content">
        {children}
      </div>
    </Screen>
  )
}

interface QuestionCardProps {
  question: string
  answers: Array<{ text: string; emoji: string; value: string }>
  selectedAnswer?: string
  onAnswerSelect: (value: string) => void
}

export function QuestionCard({ question, answers, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  return (
    <div className="question-card">
      <h2 className="question-title">{question}</h2>
      <div className="answer-buttons">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${selectedAnswer === answer.value ? 'selected' : ''}`}
            data-emoji={answer.emoji}
            onClick={() => onAnswerSelect(answer.value)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  )
}
