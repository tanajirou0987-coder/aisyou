/**
 * スコア表示の共通コンポーネント
 * 重複していたスコア表示ロジックを統一
 */

import React from 'react'
import { ProgressBar } from '../ui/ProgressBar'
import { Card } from '../ui/Card'

export interface ScoreDisplayProps {
  score: number
  label: string
  color?: 'pink' | 'blue' | 'green' | 'purple'
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ScoreDisplay({
  score,
  label,
  color = 'pink',
  showPercentage = true,
  size = 'md',
  className = ''
}: ScoreDisplayProps) {
  return (
    <div className={`score-display ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-2xl font-bold text-[#FF1493]">{Math.round(score)}%</span>
        )}
      </div>
      <ProgressBar 
        progress={score} 
        color={color} 
        size={size}
      />
    </div>
  )
}

export interface ScoreGridProps {
  scores: Array<{
    label: string
    score: number
    color?: 'pink' | 'blue' | 'green' | 'purple'
  }>
  columns?: 1 | 2 | 3
  className?: string
}

export function ScoreGrid({ 
  scores, 
  columns = 2, 
  className = '' 
}: ScoreGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {scores.map((score, index) => (
        <ScoreDisplay
          key={index}
          label={score.label}
          score={score.score}
          color={score.color}
        />
      ))}
    </div>
  )
}

export interface CompatibilityCardProps {
  participant1Name: string
  participant2Name: string
  score: number
  coupleType?: {
    name: string
    emoji: string
    description: string
  }
  rank?: number
  showDetails?: boolean
  onViewDetails?: () => void
  className?: string
}

export function CompatibilityCard({
  participant1Name,
  participant2Name,
  score,
  coupleType,
  rank,
  showDetails = false,
  onViewDetails,
  className = ''
}: CompatibilityCardProps) {
  const rankEmoji = rank === 1 ? '👑' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🏅'
  
  return (
    <Card className={`compatibility-card ${className}`} hover>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {rank && <span className="text-3xl">{rankEmoji}</span>}
          <span className="text-2xl font-bold text-gray-800">
            {participant1Name} × {participant2Name}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#FF1493]">{score}%</div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(score / 20) 
                    ? 'text-pink-400' 
                    : 'text-gray-300'
                }`}
              >
                ❤️
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {coupleType && (
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{coupleType.emoji}</div>
          <div className="text-2xl font-bold text-[#FF1493] mb-1">
            {coupleType.name}
          </div>
          <div className="text-lg text-gray-600">
            「{coupleType.description}」
          </div>
        </div>
      )}
      
      {showDetails && onViewDetails && (
        <div className="text-center">
          <button
            onClick={onViewDetails}
            className="btn-kawaii-primary px-6 py-3 text-lg font-semibold rounded-2xl"
          >
            詳細を見る
          </button>
        </div>
      )}
    </Card>
  )
}










