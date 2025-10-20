import React from 'react'
import { ButtonVariant } from '../../types'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant['variant']
  size?: ButtonVariant['size']
  children: React.ReactNode
  emoji?: string
  selected?: boolean
  loading?: boolean
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  emoji,
  selected = false,
  loading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-bold transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'btn-kawaii-primary',
    secondary: 'btn-kawaii-secondary',
    start: 'start-button',
    answer: `answer-button ${selected ? 'selected' : ''}`
  }
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm rounded-lg',
    md: 'py-3 px-6 text-base rounded-xl',
    lg: 'py-4 px-8 text-lg rounded-2xl'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button 
      className={classes}
      disabled={disabled || loading}
      data-emoji={emoji}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  )
}