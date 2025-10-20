import { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  background?: string
  transform?: string
  style?: CSSProperties
}

/**
 * ポップアート風カードコンポーネント
 * 統一されたスタイルでカードを表示
 */
export function Card({ children, className = '', background = '#FFFFFF', transform, style }: CardProps) {
  const defaultStyle: CSSProperties = {
    background,
    transform,
    ...style
  }

  return (
    <div className={`card ${className}`} style={defaultStyle}>
      {children}
    </div>
  )
}
















