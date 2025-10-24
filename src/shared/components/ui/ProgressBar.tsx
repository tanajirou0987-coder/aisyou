import React from 'react'

interface ProgressBarProps {
  progress: number
  className?: string
  showLabel?: boolean
  label?: string
  color?: 'pink' | 'blue' | 'green' | 'purple'
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ 
  progress, 
  className = '', 
  showLabel = false,
  label,
  color = 'pink',
  size = 'md'
}: ProgressBarProps) {
  const colorClasses = {
    pink: 'bg-gradient-to-r from-pink-400 to-pink-600',
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
    green: 'bg-gradient-to-r from-green-400 to-green-600',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-600'
  }
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const progressValue = Math.min(100, Math.max(0, progress))
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div 
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progressValue}%` }}
        />
      </div>
      {showLabel && label && (
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>{label}</span>
          <span>{Math.round(progressValue)}%</span>
        </div>
      )}
    </div>
  )
}