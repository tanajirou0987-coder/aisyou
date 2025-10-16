import { ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

/**
 * ポップアート風ボタンコンポーネント
 * primary: 赤背景の強調ボタン
 * secondary: 白背景の補助ボタン
 */
export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  )
}








