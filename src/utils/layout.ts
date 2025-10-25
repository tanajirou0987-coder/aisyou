/**
 * ビューポート高さを正確に計算する
 */
export const setViewportHeight = (): void => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

/**
 * レスポンシブな値を作成する
 */
export const createResponsiveValue = (
  mobile: number, 
  tablet: number, 
  desktop: number
): string => {
  return `clamp(${mobile}px, ${tablet}vw, ${desktop}px)`
}

/**
 * 画面サイズに基づくスペーシングを取得
 */
export const getSpacing = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string => {
  const spacingMap = {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)'
  }
  return spacingMap[size]
}

/**
 * プログレス値を計算
 */
export const calculateProgress = (current: number, total: number): number => {
  return Math.round((current / total) * 100)
}

/**
 * アニメーション遅延を生成
 */
export const generateAnimationDelay = (index: number, baseDelay: number = 0.1): string => {
  return `${baseDelay + (index * 0.1)}s`
}












