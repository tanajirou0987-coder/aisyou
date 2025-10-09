import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// シンプルで高速な相性計算
export function calculateSimpleCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const participant1 = participants[i]
      const participant2 = participants[j]
      
      const compatibilityScore = calculatePairSimpleCompatibility(participant1, participant2)
      scores.push(compatibilityScore)
    }
  }
  
  return scores.sort((a, b) => b.score - a.score)
}

function calculatePairSimpleCompatibility(participant1: Participant, participant2: Participant): CompatibilityScore {
  // シンプルな相性計算：回答の類似度ベース
  let totalSimilarity = 0
  let questionCount = 0
  
  // 各質問の回答を比較
  participant1.answers.forEach(answer1 => {
    const answer2 = participant2.answers.find(a => a.questionId === answer1.questionId)
    if (answer2) {
      const difference = Math.abs(answer1.value - answer2.value)
      const similarity = Math.max(0, 100 - difference * 25) // 0-4の差を0-100のスコアに変換
      totalSimilarity += similarity
      questionCount++
    }
  })
  
  // 平均類似度を計算
  const averageSimilarity = questionCount > 0 ? totalSimilarity / questionCount : 50
  
  // ランダム要素を追加（±10%）
  const randomFactor = (Math.random() - 0.5) * 20
  const finalScore = Math.max(0, Math.min(100, averageSimilarity + randomFactor))
  
  // シンプルな要因
  const factors: CompatibilityFactor[] = [
    {
      category: '回答の類似度',
      score: Math.round(averageSimilarity),
      weight: 3,
      description: getSimilarityDescription(averageSimilarity)
    },
    {
      category: '相性の良さ',
      score: Math.round(finalScore),
      weight: 2,
      description: getCompatibilityDescription(finalScore)
    }
  ]
  
  return {
    participant1Id: participant1.id,
    participant2Id: participant2.id,
    score: Math.round(finalScore),
    factors
  }
}

function getSimilarityDescription(score: number): string {
  if (score >= 80) return '非常に似た価値観を持っています'
  if (score >= 60) return '似た価値観を持っています'
  if (score >= 40) return '価値観に違いがあります'
  return '価値観が大きく異なります'
}

function getCompatibilityDescription(score: number): string {
  if (score >= 80) return '非常に良い相性です'
  if (score >= 60) return '良い相性です'
  if (score >= 40) return '普通の相性です'
  return '相性に課題があります'
}








