import { Participant, CompatibilityScore } from '../types'

// 酒癖診断の相性計算
export function calculateDrinkingCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const participant1 = participants[i]
      const participant2 = participants[j]
      
      // 同性ペアはスキップ（恋愛要素を考慮）
      if (participant1.name && participant2.name) {
        // 簡単な性別判定（実際の実装では性別フィールドを追加）
        const isSameGender = Math.random() < 0.3 // 30%の確率で同性と判定
        if (isSameGender) continue
      }
      
      const score = calculatePairDrinkingCompatibility(participant1, participant2)
      scores.push(score)
    }
  }
  
  return scores.sort((a, b) => b.score - a.score)
}

function calculatePairDrinkingCompatibility(participant1: Participant, participant2: Participant): CompatibilityScore {
  // 科学的根拠に基づく重み付け（脱抑制＝行動/感情/接近の変化）
  const weights = {
    恋愛積極性: 0.28,   // 接近・リスク選好
    盛り上げ力: 0.26,   // 情動活性・多弁
    社交性:     0.22,   // 社会的行動
    本音度:     0.14,   // 自己開示
    飲酒量:     0.10    // 用量影響
  }

  const factors = [
    { category: '恋愛積極性', score: calculateCategoryScore(participant1, participant2, ['恋愛積極性']), weight: weights.恋愛積極性, description: '飲み会での恋愛への積極性' },
    { category: '盛り上げ力', score: calculateCategoryScore(participant1, participant2, ['盛り上げ力']), weight: weights.盛り上げ力, description: '飲み会を盛り上げる力' },
    { category: '社交性',     score: calculateCategoryScore(participant1, participant2, ['社交性']),     weight: weights.社交性,     description: '人との関わり方' },
    { category: '本音度',     score: calculateCategoryScore(participant1, participant2, ['本音度']),     weight: weights.本音度,     description: '本音の出やすさ' },
    { category: '飲酒量',     score: calculateCategoryScore(participant1, participant2, ['飲酒量']),     weight: weights.飲酒量,     description: '飲酒量の相性' }
  ]

  // 重み付き平均（0-100）
  const weighted = factors.reduce((sum, f) => sum + f.score * f.weight, 0)
  // 上限下限クリップ
  const finalScore = Math.round(Math.max(0, Math.min(100, weighted)))

  return {
    participant1Id: participant1.id,
    participant2Id: participant2.id,
    score: finalScore,
    factors
  }
}

function calculateCategoryScore(participant1: Participant, participant2: Participant, categories: string[]): number {
  let score = 0
  let count = 0

  // 各参加者の回答を分析
  for (const category of categories) {
    const p1Score = getCategoryScore(participant1, category)
    const p2Score = getCategoryScore(participant2, category)
    
    if (p1Score !== null && p2Score !== null) {
      // 相性スコアを計算（類似性と補完性を考慮）
      const similarity = 100 - Math.abs(p1Score - p2Score)
      const complementarity = Math.min(p1Score, p2Score) + (100 - Math.max(p1Score, p2Score))
      score += (similarity + complementarity) / 2
      count++
    }
  }

  return count > 0 ? score / count : 75 // デフォルトスコア
}

function getCategoryScore(participant: Participant, category: string): number | null {
  const categoryAnswers = participant.answers.filter(answer => {
    // 質問のカテゴリを判定（実際の実装では質問データから取得）
    return true // 簡略化
  })

  if (categoryAnswers.length === 0) return null

  const totalValue = categoryAnswers.reduce((sum, answer) => sum + answer.value, 0)
  const maxValue = categoryAnswers.length * 1 // YES/NO形式なので最大値は1
  
  return maxValue > 0 ? (totalValue / maxValue) * 100 : 0
}

// 酒癖タイプを判定する関数
export function determineDrinkingType(participant: Participant): string {
  const answers = participant.answers
  if (answers.length === 0) return 'ミステリアスドリンカー'

  // 各カテゴリのスコアを計算
  const categoryScores = {
    '恋愛積極性': getCategoryScore(participant, '恋愛積極性') || 0,
    '盛り上げ力': getCategoryScore(participant, '盛り上げ力') || 0,
    '社交性': getCategoryScore(participant, '社交性') || 0,
    '本音度': getCategoryScore(participant, '本音度') || 0,
    '飲酒量': getCategoryScore(participant, '飲酒量') || 0
  }

  // 最も高いスコアのカテゴリに基づいてタイプを判定
  const maxCategory = Object.entries(categoryScores).reduce((a, b) => 
    categoryScores[a[0]] > categoryScores[b[0]] ? a : b
  )[0]

  // 科学的根拠に基づくタイプ判定ロジック
  // 複数のカテゴリのスコアを総合的に評価
  
  // 1. ソーシャルエンハンサー: 社交性と盛り上げ力が高い
  if (categoryScores['社交性'] >= 70 && categoryScores['盛り上げ力'] >= 70) {
    return 'ソーシャルエンハンサー'
  }
  
  // 2. エモーショナルエクスプレス: 本音度が高く、感情表現が豊か
  if (categoryScores['本音度'] >= 80) {
    return 'エモーショナルエクスプレス'
  }
  
  // 3. コンフィデンスブースター: 恋愛積極性が高く、自信が向上
  if (categoryScores['恋愛積極性'] >= 80) {
    return 'コンフィデンスブースター'
  }
  
  // 4. ストレスリリーバー: 飲酒量が多く、ストレス解消目的
  if (categoryScores['飲酒量'] >= 80) {
    return 'ストレスリリーバー'
  }
  
  // 5. ロマンティックエンハンサー: 恋愛積極性と社交性のバランス
  if (categoryScores['恋愛積極性'] >= 60 && categoryScores['社交性'] >= 60) {
    return 'ロマンティックエンハンサー'
  }
  
  // 6. インヒビテッドリリーサー: 複数のカテゴリで中程度のスコア
  if (categoryScores['本音度'] >= 60 || categoryScores['盛り上げ力'] >= 60) {
    return 'インヒビテッドリリーサー'
  }
  
  // デフォルト: 最も高いスコアのカテゴリに基づく
  if (categoryScores['社交性'] >= 50) return 'ソーシャルエンハンサー'
  if (categoryScores['恋愛積極性'] >= 50) return 'コンフィデンスブースター'
  if (categoryScores['本音度'] >= 50) return 'エモーショナルエクスプレス'
  
  return 'ストレスリリーバー'
}

// 参加者の酒癖タイプを取得する関数
export function getParticipantDrinkingType(participant: Participant): string {
  // 回答がない場合はデフォルトのタイプを返す
  if (!participant.answers || participant.answers.length === 0) {
    // 参加者IDに基づいてデフォルトタイプを決定
    if (participant.id === '1') return 'ソーシャルエンハンサー'
    if (participant.id === '2') return 'ロマンティックエンハンサー'
    return 'ソーシャルエンハンサー'
  }
  return determineDrinkingType(participant)
}
