import { useEffect, useState } from 'react'
import { setViewportHeight } from '../../utils/layout'

export function useViewport() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight()
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // 初期化
    setViewportHeight()
    
    // イベントリスナーを追加
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return dimensions
}


