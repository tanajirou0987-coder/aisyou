import { Participant, CompatibilityScore, CompatibilityFactor, Answer, GroupParticipant } from '../types'
import { calculateLoveStyleType, LoveStyleResult } from './loveStyleCalculator'
import { calculateDetailedCompatibility } from './loveCompatibilityMatrix'
import { getTypeById } from '../data/loveStyleTypes'

/**
 * 参加者全員の相性を計算（ラブスタイル類型論ベース）
 */
export function calculateCompatibility(
  participants: Participant[],
  genderMap?: Map<string, 'male' | 'female'>
): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  // まず各参加者のタイプを判定（キャッシュ）
  const typeResults = new Map<string, LoveStyleResult>()
  participants.forEach(p => {
    // 性別マップから性別を取得、なければデフォルト
    const gender = genderMap?.get(p.id) || determineGender(p)
    const result = calculateLoveStyleType(p.answers, gender)
    typeResults.set(p.id, result)
  })
  
  // 全組み合わせの相性を計算
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const participant1 = participants[i]
      const participant2 = participants[j]
      
      const compatibilityScore = calculatePairCompatibility(
        participant1,
        participant2,
        typeResults.get(participant1.id)!,
        typeResults.get(participant2.id)!
      )
      scores.push(compatibilityScore)
    }
  }
  
  return scores.sort((a, b) => b.score - a.score)
}

/**
 * ペアの相性を計算
 */
function calculatePairCompatibility(
  participant1: Participant,
  participant2: Participant,
  type1: LoveStyleResult,
  type2: LoveStyleResult
): CompatibilityScore {
  // 詳細な相性分析を実行
  const compatibility = calculateDetailedCompatibility(type1.scores, type2.scores)
  
  // 相性要因を構築
  const factors: CompatibilityFactor[] = []
  
  // 各恋愛スタイルの相性をファクターとして追加
  Object.entries(compatibility.categoryScores).forEach(([category, score]) => {
    factors.push({
      category: getCategoryDisplayName(category),
      score,
      weight: 3,
      description: getStyleCompatibilityDescription(category, score)
    })
  })
  
  // 総合評価ファクターを追加
  factors.push({
    category: '総合相性',
    score: compatibility.totalScore,
    weight: 5,
    description: getOverallCompatibilityDescription(compatibility.totalScore)
  })
  
  return {
    participant1Id: participant1.id,
    participant2Id: participant2.id,
    score: compatibility.totalScore,
    factors
  }
}

/**
 * 参加者の性別を判定（仮実装）
 * TODO: 実際のデータ構造に合わせて修正
 */
function determineGender(participant: Participant): 'male' | 'female' {
  // 仮：participantオブジェクトにgenderプロパティがあると仮定
  // 実際にはGroupParticipantから取得する必要がある
  return 'male' // デフォルトは男性
}

/**
 * カテゴリ表示名を取得
 */
function getCategoryDisplayName(category: string): string {
  const displayNames: Record<string, string> = {
    eros: '情熱・ロマンス',
    ludus: '自由・遊び心',
    storge: '友情・安定',
    pragma: '現実・計画性',
    mania: '依存・情熱',
    agape: '献身・無償の愛'
  }
  return displayNames[category] || category
}

/**
 * スタイル別の相性説明を取得
 */
function getStyleCompatibilityDescription(category: string, score: number): string {
  if (score >= 80) {
    return `${getCategoryDisplayName(category)}の価値観が非常によく合っています`
  } else if (score >= 60) {
    return `${getCategoryDisplayName(category)}の価値観がある程度合っています`
  } else if (score >= 40) {
    return `${getCategoryDisplayName(category)}の価値観に違いがあります`
  } else {
    return `${getCategoryDisplayName(category)}の価値観が大きく異なります`
  }
}

/**
 * 総合的な相性説明を取得
 */
function getOverallCompatibilityDescription(score: number): string {
  if (score >= 90) {
    return '理想的な相性です。お互いの価値観が非常によく調和しています。'
  } else if (score >= 80) {
    return 'とても良い相性です。長期的な関係を築きやすいでしょう。'
  } else if (score >= 70) {
    return '良い相性です。お互いを理解し合える関係が期待できます。'
  } else if (score >= 60) {
    return 'まあまあの相性です。努力次第で良好な関係を築けます。'
  } else if (score >= 50) {
    return '普通の相性です。価値観の違いを認め合うことが大切です。'
  } else if (score >= 40) {
    return 'やや相性に課題があります。お互いの違いを尊重する姿勢が必要です。'
  } else {
    return '相性に課題があります。価値観の違いを理解し合う努力が重要です。'
  }
}

// 互換性のため、既存の関数も残す
export function getCompatibilityLevel(score: number): string {
  if (score >= 90) return '最高の相性'
  if (score >= 80) return 'とても良い相性'
  if (score >= 70) return '良い相性'
  if (score >= 60) return 'まあまあの相性'
  if (score >= 50) return '普通の相性'
  if (score >= 40) return 'やや相性が悪い'
  return '相性が悪い'
}

export function getCompatibilityColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-blue-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-600'
}
