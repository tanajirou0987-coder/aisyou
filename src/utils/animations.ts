/**
 * アニメーション用のキーフレームを生成
 */
export const createKeyframes = (name: string, frames: Record<string, any>) => {
  return `
    @keyframes ${name} {
      ${Object.entries(frames)
        .map(([key, value]) => `${key} { ${Object.entries(value)
          .map(([prop, val]) => `${prop}: ${val}`)
          .join('; ')} }`)
        .join('\n')}
    }
  `
}

/**
 * フェードインアニメーション
 */
export const fadeIn = (duration: number = 0.3, delay: number = 0) => ({
  animation: `fadeIn ${duration}s ease-in-out ${delay}s both`
})

/**
 * スライドインアニメーション
 */
export const slideIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: number = 0.5) => ({
  animation: `slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} ${duration}s ease-out both`
})

/**
 * バウンスアニメーション
 */
export const bounce = (intensity: 'light' | 'medium' | 'strong' = 'medium') => {
  const durations = { light: '0.5s', medium: '1s', strong: '1.5s' }
  return {
    animation: `bounce ${durations[intensity]} ease-in-out infinite`
  }
}

/**
 * パルスアニメーション
 */
export const pulse = (duration: number = 2) => ({
  animation: `pulse ${duration}s ease-in-out infinite`
})

/**
 * 回転アニメーション
 */
export const rotate = (duration: number = 1, direction: 'clockwise' | 'counterclockwise' = 'clockwise') => ({
  animation: `rotate${direction === 'clockwise' ? '' : 'Reverse'} ${duration}s linear infinite`
})

/**
 * スケールアニメーション
 */
export const scale = (from: number = 0.8, to: number = 1.1, duration: number = 0.6) => ({
  animation: `scale ${duration}s ease-in-out infinite alternate`,
  transformOrigin: 'center'
})

/**
 * アニメーション遅延を段階的に設定
 */
export const createStaggeredDelay = (index: number, baseDelay: number = 0.1, step: number = 0.1) => ({
  animationDelay: `${baseDelay + (index * step)}s`
})


