/**
 * アニメーション関連のユーティリティ関数
 */

/**
 * フェードインアニメーション
 */
export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 }
}

/**
 * スライドアップアニメーション
 */
export const slideUp = {
  from: { 
    opacity: 0, 
    transform: 'translateY(20px)' 
  },
  to: { 
    opacity: 1, 
    transform: 'translateY(0)' 
  }
}

/**
 * スケールアニメーション
 */
export const scaleIn = {
  from: { 
    opacity: 0, 
    transform: 'scale(0.9)' 
  },
  to: { 
    opacity: 1, 
    transform: 'scale(1)' 
  }
}

/**
 * バウンスアニメーション
 */
export const bounce = {
  from: { 
    opacity: 0, 
    transform: 'translateY(-20px)' 
  },
  to: { 
    opacity: 1, 
    transform: 'translateY(0)' 
  }
}

/**
 * 回転アニメーション
 */
export const rotate = {
  from: { 
    opacity: 0, 
    transform: 'rotate(-180deg)' 
  },
  to: { 
    opacity: 1, 
    transform: 'rotate(0deg)' 
  }
}

/**
 * パルスアニメーション
 */
export const pulse = {
  from: { 
    opacity: 0, 
    transform: 'scale(0.8)' 
  },
  to: { 
    opacity: 1, 
    transform: 'scale(1)' 
  }
}

/**
 * アニメーション遅延を段階的に設定
 */
export const createStaggeredDelay = (index: number, baseDelay: number = 0.1, step: number = 0.1) => ({
  animationDelay: `${baseDelay + (index * step)}s`
})