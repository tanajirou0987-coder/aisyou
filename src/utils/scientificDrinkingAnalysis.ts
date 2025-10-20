// 科学的根拠に基づいたグラスノオトロジック
// 参考: アルコール摂取時の性格変化に関する心理学研究、ビッグファイブ理論

export interface DiagnosisData {
  questionId: string
  optionId: string
  value: number
  timestamp: number
}

export interface CategoryScore {
  category: string
  score: number
  weight: number
  description: string
}

export interface PersonalityProfile {
  socialEnhancement: number      // 社交性向上度 (0-100)
  romanticInclination: number    // 恋愛傾向度 (0-100)
  emotionalExpression: number    // 感情表現度 (0-100)
  confidenceBoost: number        // 自信向上度 (0-100)
  stressRelief: number           // ストレス解消度 (0-100)
}

// カテゴリー別の質問IDマッピング
const categoryMapping: { [key: string]: string[] } = {
  '恋愛積極性': ['drinking_1', 'drinking_5', 'drinking_7', 'drinking_9', 'drinking_11', 'drinking_13', 'drinking_15'],
  '盛り上げ力': ['drinking_2', 'drinking_6', 'drinking_10', 'drinking_12'],
  '社交性': ['drinking_8', 'drinking_14'],
  '飲酒量': ['drinking_3'],
  '本音度': ['drinking_4']
}

// カテゴリー別の重み（心理学的重要度に基づく）
const categoryWeights: { [key: string]: number } = {
  '恋愛積極性': 1.5,  // 恋愛診断において最も重要
  '盛り上げ力': 1.2,  // 社交性の指標として重要
  '社交性': 1.3,      // 対人関係の基礎
  '飲酒量': 0.8,      // 補助的な指標
  '本音度': 1.0       // 感情表現の指標
}

/**
 * カテゴリー別スコアを計算
 * @param diagnosisData 診断データ
 * @returns カテゴリー別スコア
 */
export function calculateCategoryScores(diagnosisData: DiagnosisData[]): CategoryScore[] {
  const categoryScores: CategoryScore[] = []
  
  for (const [category, questionIds] of Object.entries(categoryMapping)) {
    const relevantAnswers = diagnosisData.filter(answer => 
      questionIds.includes(answer.questionId)
    )
    
    if (relevantAnswers.length === 0) continue
    
    const totalScore = relevantAnswers.reduce((sum, answer) => sum + answer.value, 0)
    const maxScore = relevantAnswers.length
    const normalizedScore = (totalScore / maxScore) * 100
    const weight = categoryWeights[category] || 1.0
    
    categoryScores.push({
      category,
      score: normalizedScore,
      weight,
      description: getCategoryDescription(category, normalizedScore)
    })
  }
  
  return categoryScores
}

/**
 * カテゴリー別の説明を取得
 */
function getCategoryDescription(category: string, score: number): string {
  const descriptions: { [key: string]: { [key: string]: string } } = {
    '恋愛積極性': {
      high: '恋愛に対して非常に積極的で、アプローチが得意',
      medium: '恋愛に対してバランスの取れたアプローチ',
      low: '恋愛に対して慎重で、じっくり関係を築くタイプ'
    },
    '盛り上げ力': {
      high: '場を盛り上げるのが得意で、ムードメーカー',
      medium: '状況に応じて場を盛り上げることができる',
      low: '落ち着いた雰囲気を好み、聞き役に回ることが多い'
    },
    '社交性': {
      high: '人懐っこく、誰とでもすぐに打ち解ける',
      medium: '適度な社交性を持ち、バランスが良い',
      low: '少人数での深い関係を好む'
    }
  }
  
  const level = score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low'
  return descriptions[category]?.[level] || ''
}

/**
 * 性格プロファイルを計算（ビッグファイブ理論に基づく）
 * @param categoryScores カテゴリー別スコア
 * @returns 性格プロファイル
 */
export function calculatePersonalityProfile(categoryScores: CategoryScore[]): PersonalityProfile {
  const getWeightedScore = (category: string): number => {
    const score = categoryScores.find(cs => cs.category === category)
    return score ? score.score * score.weight : 0
  }
  
  // 各次元のスコアを計算
  const romanticScore = getWeightedScore('恋愛積極性')
  const socialScore = getWeightedScore('盛り上げ力') + getWeightedScore('社交性')
  const emotionalScore = getWeightedScore('本音度') + getWeightedScore('社交性')
  const confidenceScore = getWeightedScore('盛り上げ力') + getWeightedScore('恋愛積極性') * 0.5
  const stressReliefScore = getWeightedScore('飲酒量') + getWeightedScore('社交性') * 0.5
  
  // 正規化（0-100の範囲に）
  const normalize = (score: number, max: number): number => {
    return Math.round(Math.min(100, Math.max(0, (score / max) * 100)))
  }
  
  return {
    socialEnhancement: normalize(socialScore, 250),
    romanticInclination: normalize(romanticScore, 150),
    emotionalExpression: normalize(emotionalScore, 200),
    confidenceBoost: normalize(confidenceScore, 200),
    stressRelief: normalize(stressReliefScore, 150)
  }
}

/**
 * 性格プロファイルに基づいて酒癖タイプを判定
 * @param profile 性格プロファイル
 * @returns 酒癖タイプ
 */
export function determineDrinkingType(profile: PersonalityProfile): string {
  // 各タイプのスコアを計算（多次元分析）
  const typeScores = {
    'ソーシャルエンハンサー': 
      profile.socialEnhancement * 0.4 + 
      profile.confidenceBoost * 0.3 + 
      profile.emotionalExpression * 0.3,
    
    'ロマンティックエンハンサー': 
      profile.romanticInclination * 0.5 + 
      profile.emotionalExpression * 0.3 + 
      profile.socialEnhancement * 0.2,
    
    'コンフィデンスブースター': 
      profile.confidenceBoost * 0.4 + 
      profile.romanticInclination * 0.3 + 
      profile.socialEnhancement * 0.3,
    
    'エモーショナルエクスプレス': 
      profile.emotionalExpression * 0.5 + 
      profile.romanticInclination * 0.3 + 
      profile.stressRelief * 0.2,
    
    'ストレスリリーバー': 
      profile.stressRelief * 0.5 + 
      profile.emotionalExpression * 0.3 + 
      profile.socialEnhancement * 0.2
  }
  
  // 最もスコアが高いタイプを返す
  const maxType = Object.entries(typeScores).reduce((max, [type, score]) => 
    score > max.score ? { type, score } : max,
    { type: 'ミステリアスドリンカー', score: 0 }
  )
  
  // スコアが低すぎる場合はミステリアスドリンカー
  return maxType.score > 30 ? maxType.type : 'ミステリアスドリンカー'
}

/**
 * ペアの相性スコアを科学的に計算
 * @param profile1 参加者1の性格プロファイル
 * @param profile2 参加者2の性格プロファイル
 * @returns 相性スコア (0-100)
 */
export function calculateCompatibilityScore(
  profile1: PersonalityProfile, 
  profile2: PersonalityProfile
): number {
  // 補完性スコア（違いが魅力になる）
  const complementarity = 
    Math.abs(profile1.confidenceBoost - profile2.confidenceBoost) * 0.3 +
    Math.abs(profile1.emotionalExpression - profile2.emotionalExpression) * 0.2
  
  // 類似性スコア（共通点が安心感を生む）
  const similarity = 
    (100 - Math.abs(profile1.socialEnhancement - profile2.socialEnhancement)) * 0.3 +
    (100 - Math.abs(profile1.romanticInclination - profile2.romanticInclination)) * 0.4 +
    (100 - Math.abs(profile1.stressRelief - profile2.stressRelief)) * 0.1
  
  // 総合スコア（補完性と類似性のバランス）
  const totalScore = (complementarity * 0.4 + similarity * 0.6)
  
  // 正規化して返す（四捨五入）
  return Math.round(Math.min(100, Math.max(20, totalScore)))
}

/**
 * リード度を計算（S/M傾向）
 * @param profile 性格プロファイル
 * @returns リード度 (0-100, 高いほどS寄り)
 */
export function calculateLeadershipScore(profile: PersonalityProfile): number {
  return Math.round(
    profile.confidenceBoost * 0.4 +
    profile.socialEnhancement * 0.3 +
    profile.romanticInclination * 0.3
  )
}

/**
 * 積極度を計算
 * @param profile 性格プロファイル
 * @returns 積極度 (0-100)
 */
export function calculateActivityScore(profile: PersonalityProfile): number {
  return Math.round(
    profile.romanticInclination * 0.4 +
    profile.socialEnhancement * 0.3 +
    profile.confidenceBoost * 0.3
  )
}

