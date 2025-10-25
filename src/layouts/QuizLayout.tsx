import React from 'react'
import { BaseLayout } from './BaseLayout'

interface QuizLayoutProps {
  children: React.ReactNode
  progress: number
  currentQuestion: number
  totalQuestions: number
  className?: string
}

export function QuizLayout({ 
  children, 
  progress, 
  currentQuestion, 
  totalQuestions,
  className = '' 
}: QuizLayoutProps) {
  return (
    <BaseLayout className={`quiz-screen ${className}`}>
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
    </BaseLayout>
  )
}












