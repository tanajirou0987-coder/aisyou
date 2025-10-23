import React, { useEffect, useState } from 'react'

export function BackgroundEffects() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    // キラキラパーティクル生成
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      }))
      setSparkles(newSparkles)
    }

    // ハート型浮遊エフェクト生成
    const generateHearts = () => {
      const newHearts = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: 10 + i * 20,
        delay: i * 3
      }))
      setHearts(newHearts)
    }

    generateSparkles()
    generateHearts()

    // 定期的にエフェクトを更新
    const interval = setInterval(() => {
      generateSparkles()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* キラキラパーティクル背景 */}
      <div className="sparkle-container">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* ハート型浮遊背景 */}
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.x}%`,
              animationDelay: `${heart.delay}s`
            }}
          >
            💕
          </div>
        ))}
      </div>
    </>
  )
}








