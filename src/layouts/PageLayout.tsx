import React from 'react'
import { BaseLayout } from './BaseLayout'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  showBackgroundEffects?: boolean
}

export function PageLayout({ 
  children, 
  className = '', 
  showBackgroundEffects = true 
}: PageLayoutProps) {
  return (
    <BaseLayout showBackgroundEffects={showBackgroundEffects}>
      <div className={`w-full h-full ${className}`}>
        {children}
      </div>
    </BaseLayout>
  )
}
