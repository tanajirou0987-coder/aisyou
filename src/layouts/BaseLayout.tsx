import React from 'react'
import { BackgroundEffects } from '../components/BackgroundEffects'

interface BaseLayoutProps {
  children: React.ReactNode
  className?: string
  showBackgroundEffects?: boolean
}

export function BaseLayout({ 
  children, 
  className = '', 
  showBackgroundEffects = true 
}: BaseLayoutProps) {
  return (
    <div 
      className={`w-full h-full relative overflow-hidden ${className}`} 
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {showBackgroundEffects && <BackgroundEffects />}
      <div className="relative z-10 w-full h-full scrollable-area">
        {children}
      </div>
    </div>
  )
}
