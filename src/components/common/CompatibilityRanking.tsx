/**
 * 相性ランキング表示の共通コンポーネント
 * 重複していたランキング表示ロジックを統一
 */

import React from 'react'
import { CompatibilityCard } from './ScoreDisplay'
import { Card } from '../ui/Card'
import { Trophy, Heart } from 'lucide-react'

export interface RankingItem {
  rank: number
  participant1Name: string
  participant2Name: string
  score: number
  coupleType?: {
    name: string
    emoji: string
    description: string
  }
  compatibilityLevel?: string
}

export interface CompatibilityRankingProps {
  title: string
  subtitle?: string
  items: RankingItem[]
  showDetails?: boolean
  onViewDetails?: (rank: number) => void
  className?: string
}

export function CompatibilityRanking({
  title,
  subtitle,
  items,
  showDetails = false,
  onViewDetails,
  className = ''
}: CompatibilityRankingProps) {
  return (
    <Card className={`compatibility-ranking ${className}`}>
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-4xl font-bold text-[#FF1493] mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-600 mb-2">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <CompatibilityCard
            key={index}
            participant1Name={item.participant1Name}
            participant2Name={item.participant2Name}
            score={item.score}
            coupleType={item.coupleType}
            rank={item.rank}
            showDetails={showDetails}
            onViewDetails={onViewDetails ? () => onViewDetails(item.rank) : undefined}
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-lg text-gray-600">
            まだ相性データがありません
          </p>
        </div>
      )}
    </Card>
  )
}

export interface TopCouplesProps {
  couples: Array<{
    rank: number
    maleName: string
    femaleName: string
    score: number
    type: string
  }>
  className?: string
}

export function TopCouples({ couples, className = '' }: TopCouplesProps) {
  return (
    <div className={`top-couples ${className}`}>
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FF1493]">
        🏆 相性ランキング 🏆
      </h2>
      <p className="text-center text-lg text-gray-600 mb-8">
        誰と相性いいか見てみよう！
      </p>
      
      <div className="space-y-6">
        {couples.map((couple, index) => (
          <div key={index} className="p-6 bg-white rounded-2xl border-2 border-pink-100 hover:border-pink-200 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {couple.rank === 1 ? '👑' : couple.rank === 2 ? '🥈' : couple.rank === 3 ? '🥉' : '🏅'}
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  {couple.rank}位：{couple.maleName} × {couple.femaleName}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF1493]">{couple.score}%</div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Heart 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(couple.score / 20) ? 'text-pink-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">💕</div>
              <div className="text-2xl font-bold text-[#FF1493] mb-1">
                {couple.type}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600">
          💡 気になるペアをタップ！
        </p>
      </div>
    </div>
  )
}









