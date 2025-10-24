import React from 'react'
import { CardVariant } from '../../types'

interface CardProps {
  children: React.ReactNode
  variant?: CardVariant['variant']
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ 
  children, 
  variant = 'default', 
  className = '',
  hover = false,
  padding = 'md'
}: CardProps) {
  const variantClasses = {
    default: 'card-kawaii',
    question: 'question-card',
    glass: 'bg-white/80 backdrop-blur-sm border-2 border-kawaii-light-pink/30'
  }
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-lg transition-all duration-300' : ''
  
  const classes = `${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}