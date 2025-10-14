import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// ビッグファイブ性格理論に基づいた相性計算（最適化版）
export function calculatePsychologyCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  // 事前にビッグファイブ特性を計算してキャッシュ
  const traitCache = new Map<string, any>()
  participants.forEach(p => {
    traitCache.set(p.id, calculateBigFiveTraits(p))
  })
  
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const participant1 = participants[i]
      const participant2 = participants[j]
      
      const compatibilityScore = calculatePairPsychologyCompatibilityOptimized(
        participant1, 
        participant2, 
        traitCache.get(participant1.id)!, 
        traitCache.get(participant2.id)!
      )
      scores.push(compatibilityScore)
    }
  }
  
  return scores.sort((a, b) => b.score - a.score)
}

// 最適化されたペア相性計算（キャッシュされた特性を使用）
function calculatePairPsychologyCompatibilityOptimized(
  participant1: Participant, 
  participant2: Participant, 
  p1Traits: any, 
  p2Traits: any
): CompatibilityScore {
  const factors: CompatibilityFactor[] = []
  
  // 各特性の相性を計算
  const traitCompatibility = calculateTraitCompatibility(p1Traits, p2Traits)
  
  // 価値観の一致度を計算（簡略化）
  const valuesCompatibility = calculateValuesCompatibilityOptimized(participant1, participant2)
  
  // コミュニケーション相性を計算（簡略化）
  const communicationCompatibility = calculateCommunicationCompatibilityOptimized(participant1, participant2)
  
  // 総合相性スコアの計算（心理学研究に基づく重み付け）
  const totalScore = calculateTotalCompatibilityScore(traitCompatibility, valuesCompatibility, communicationCompatibility)
  
  // 相性要因の詳細
  factors.push(
    { category: '性格特性', score: traitCompatibility.total, weight: 3, description: getTraitDescription(traitCompatibility.total) },
    { category: '価値観', score: valuesCompatibility, weight: 4, description: getValuesDescription(valuesCompatibility) },
    { category: 'コミュニケーション', score: communicationCompatibility, weight: 4, description: getCommunicationDescription(communicationCompatibility) }
  )
  
  return {
    participant1Id: participant1.id,
    participant2Id: participant2.id,
    score: Math.round(totalScore),
    factors
  }
}

function calculatePairPsychologyCompatibility(participant1: Participant, participant2: Participant): CompatibilityScore {
  const factors: CompatibilityFactor[] = []
  
  // ビッグファイブ性格特性の計算
  const p1Traits = calculateBigFiveTraits(participant1)
  const p2Traits = calculateBigFiveTraits(participant2)
  
  // 各特性の相性を計算
  const traitCompatibility = calculateTraitCompatibility(p1Traits, p2Traits)
  
  // 価値観の一致度を計算
  const valuesCompatibility = calculateValuesCompatibility(participant1, participant2)
  
  // コミュニケーション相性を計算
  const communicationCompatibility = calculateCommunicationCompatibility(participant1, participant2)
  
  // 総合相性スコアの計算（心理学研究に基づく重み付け）
  const totalScore = calculateTotalCompatibilityScore(traitCompatibility, valuesCompatibility, communicationCompatibility)
  
  // 相性要因の詳細
  factors.push(
    { category: '性格特性', score: traitCompatibility.total, weight: 3, description: getTraitDescription(traitCompatibility.total) },
    { category: '価値観', score: valuesCompatibility, weight: 4, description: getValuesDescription(valuesCompatibility) },
    { category: 'コミュニケーション', score: communicationCompatibility, weight: 4, description: getCommunicationDescription(communicationCompatibility) }
  )
  
  return {
    participant1Id: participant1.id,
    participant2Id: participant2.id,
    score: Math.round(totalScore),
    factors
  }
}

// ビッグファイブ性格特性の計算
function calculateBigFiveTraits(participant: Participant) {
  const traits = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  }
  
  const traitCounts = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  }
  
  participant.answers.forEach(answer => {
    const questionId = answer.questionId
    if (questionId.includes('openness')) {
      traits.openness += answer.value
      traitCounts.openness++
    } else if (questionId.includes('conscientiousness')) {
      traits.conscientiousness += answer.value
      traitCounts.conscientiousness++
    } else if (questionId.includes('extraversion')) {
      traits.extraversion += answer.value
      traitCounts.extraversion++
    } else if (questionId.includes('agreeableness')) {
      traits.agreeableness += answer.value
      traitCounts.agreeableness++
    } else if (questionId.includes('neuroticism')) {
      traits.neuroticism += answer.value
      traitCounts.neuroticism++
    }
  })
  
  // 平均値を計算
  Object.keys(traits).forEach(trait => {
    if (traitCounts[trait] > 0) {
      traits[trait] = traits[trait] / traitCounts[trait]
    }
  })
  
  return traits
}

// 性格特性の相性計算（類似性仮説と相補性仮説を組み合わせ）
function calculateTraitCompatibility(traits1: any, traits2: any) {
  const similarities = {
    openness: calculateSimilarity(traits1.openness, traits2.openness),
    conscientiousness: calculateSimilarity(traits1.conscientiousness, traits2.conscientiousness),
    extraversion: calculateSimilarity(traits1.extraversion, traits2.extraversion),
    agreeableness: calculateSimilarity(traits1.agreeableness, traits2.agreeableness),
    neuroticism: calculateComplementarity(traits1.neuroticism, traits2.neuroticism) // 神経症傾向は相補性
  }
  
  const total = Object.values(similarities).reduce((sum, score) => sum + score, 0) / Object.keys(similarities).length
  
  return {
    ...similarities,
    total
  }
}

// 類似性計算（似ているほど高いスコア）
function calculateSimilarity(value1: number, value2: number): number {
  const diff = Math.abs(value1 - value2)
  return Math.max(0, 100 - diff * 25)
}

// 相補性計算（神経症傾向は低い方が良い）
function calculateComplementarity(value1: number, value2: number): number {
  const avg = (value1 + value2) / 2
  return Math.max(0, 100 - avg * 25)
}

// 価値観の一致度計算（最適化版）
function calculateValuesCompatibilityOptimized(participant1: Participant, participant2: Participant): number {
  // 最初の価値観質問のみを使用して高速化
  const values1 = participant1.answers.find(a => a.questionId.includes('values'))
  const values2 = participant2.answers.find(a => a.questionId.includes('values'))
  
  if (!values1 || !values2) return 50
  
  return calculateSimilarity(values1.value, values2.value)
}

// 価値観の一致度計算
function calculateValuesCompatibility(participant1: Participant, participant2: Participant): number {
  const values1 = participant1.answers.filter(a => a.questionId.includes('values'))
  const values2 = participant2.answers.filter(a => a.questionId.includes('values'))
  
  if (values1.length === 0 || values2.length === 0) return 50
  
  let totalCompatibility = 0
  let count = 0
  
  values1.forEach(v1 => {
    const v2 = values2.find(v => v.questionId === v1.questionId)
    if (v2) {
      totalCompatibility += calculateSimilarity(v1.value, v2.value)
      count++
    }
  })
  
  return count > 0 ? totalCompatibility / count : 50
}

// コミュニケーション相性計算（最適化版）
function calculateCommunicationCompatibilityOptimized(participant1: Participant, participant2: Participant): number {
  // 最初のコミュニケーション質問のみを使用して高速化
  const comm1 = participant1.answers.find(a => a.questionId.includes('communication'))
  const comm2 = participant2.answers.find(a => a.questionId.includes('communication'))
  
  if (!comm1 || !comm2) return 50
  
  return calculateSimilarity(comm1.value, comm2.value)
}

// コミュニケーション相性計算
function calculateCommunicationCompatibility(participant1: Participant, participant2: Participant): number {
  const comm1 = participant1.answers.filter(a => a.questionId.includes('communication'))
  const comm2 = participant2.answers.filter(a => a.questionId.includes('communication'))
  
  if (comm1.length === 0 || comm2.length === 0) return 50
  
  let totalCompatibility = 0
  let count = 0
  
  comm1.forEach(c1 => {
    const c2 = comm2.find(c => c.questionId === c1.questionId)
    if (c2) {
      totalCompatibility += calculateSimilarity(c1.value, c2.value)
      count++
    }
  })
  
  return count > 0 ? totalCompatibility / count : 50
}

// 総合相性スコアの計算（心理学研究に基づく重み付け）
function calculateTotalCompatibilityScore(traitCompatibility: any, valuesCompatibility: number, communicationCompatibility: number): number {
  // 価値観の一致が最も重要（重み4）
  // コミュニケーションが次に重要（重み4）
  // 性格特性は中程度の重要度（重み3）
  
  const weightedScore = (
    traitCompatibility.total * 3 +
    valuesCompatibility * 4 +
    communicationCompatibility * 4
  ) / (3 + 4 + 4)
  
  return weightedScore
}

// 説明文の生成
function getTraitDescription(score: number): string {
  if (score >= 80) return '性格が非常によく合っている'
  if (score >= 60) return '性格がよく合っている'
  if (score >= 40) return '性格に違いがある'
  return '性格の違いが大きい'
}

function getValuesDescription(score: number): string {
  if (score >= 80) return '価値観が非常によく一致している'
  if (score >= 60) return '価値観がよく一致している'
  if (score >= 40) return '価値観に違いがある'
  return '価値観の違いが大きい'
}

function getCommunicationDescription(score: number): string {
  if (score >= 80) return 'コミュニケーションが非常によく合っている'
  if (score >= 60) return 'コミュニケーションがよく合っている'
  if (score >= 40) return 'コミュニケーションに違いがある'
  return 'コミュニケーションの違いが大きい'
}

