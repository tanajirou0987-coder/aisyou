/**
 * 科学的相性診断システム
 * 解答結果のみに基づく決定論的な相性計算
 */

import { LoveStyleScores, LoveStyleResult } from './loveStyleCalculator'

// 科学的相性計算結果
export interface ScientificCompatibilityResult {
  totalScore: number
  loveStyleCompatibility: number
  personalityCompatibility: number
  communicationCompatibility: number
  valuesCompatibility: number
  lifestyleCompatibility: number
  detailedAnalysis: {
    strengths: string[]
    challenges: string[]
    recommendations: string[]
  }
}

/**
 * 科学的根拠に基づく相性計算（完全に決定論的）
 * 解答データのみを使用し、名前やランダム要素は一切使用しない
 */
export function calculateScientificCompatibility(
  maleAnswers: any,
  femaleAnswers: any
): ScientificCompatibilityResult {
  console.log('=== SCIENTIFIC COMPATIBILITY CALCULATION START ===')
  console.log('Male answers:', maleAnswers)
  console.log('Female answers:', femaleAnswers)

  // 1. 恋愛スタイル相性（ジョン・リーの理論）
  const loveStyleScore = calculateLoveStyleCompatibility(maleAnswers, femaleAnswers)
  console.log('Love style compatibility:', loveStyleScore)

  // 2. 性格特性相性（ビッグファイブ理論）
  const personalityScore = calculatePersonalityCompatibility(maleAnswers, femaleAnswers)
  console.log('Personality compatibility:', personalityScore)

  // 3. コミュニケーション相性
  const communicationScore = calculateCommunicationCompatibility(maleAnswers, femaleAnswers)
  console.log('Communication compatibility:', communicationScore)

  // 4. 価値観相性
  const valuesScore = calculateValuesCompatibility(maleAnswers, femaleAnswers)
  console.log('Values compatibility:', valuesScore)

  // 5. ライフスタイル相性
  const lifestyleScore = calculateLifestyleCompatibility(maleAnswers, femaleAnswers)
  console.log('Lifestyle compatibility:', lifestyleScore)

  // 重み付き平均で総合スコアを計算
  const weights = {
    loveStyle: 0.35,
    personality: 0.25,
    communication: 0.20,
    values: 0.15,
    lifestyle: 0.05
  }

  const totalScore = Math.round(
    loveStyleScore * weights.loveStyle +
    personalityScore * weights.personality +
    communicationScore * weights.communication +
    valuesScore * weights.values +
    lifestyleScore * weights.lifestyle
  )

  console.log('Total scientific score:', totalScore)
  console.log('=== SCIENTIFIC COMPATIBILITY CALCULATION END ===')

  return {
    totalScore: Math.max(0, Math.min(100, totalScore)),
    loveStyleCompatibility: loveStyleScore,
    personalityCompatibility: personalityScore,
    communicationCompatibility: communicationScore,
    valuesCompatibility: valuesScore,
    lifestyleCompatibility: lifestyleScore,
    detailedAnalysis: generateDetailedAnalysis(
      loveStyleScore,
      personalityScore,
      communicationScore,
      valuesScore,
      lifestyleScore
    )
  }
}

/**
 * 恋愛スタイル相性計算（ジョン・リーの理論）
 */
function calculateLoveStyleCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 恋愛スタイルスコアを計算
  const maleScores = calculateLoveStyleScores(maleAnswers)
  const femaleScores = calculateLoveStyleScores(femaleAnswers)

  // 相性マトリックス（科学的根拠に基づく）
  const compatibilityMatrix = {
    'Eros': { 'Eros': 95, 'Ludus': 60, 'Storge': 70, 'Pragma': 65, 'Mania': 80, 'Agape': 85 },
    'Ludus': { 'Eros': 60, 'Ludus': 90, 'Storge': 55, 'Pragma': 70, 'Mania': 45, 'Agape': 50 },
    'Storge': { 'Eros': 70, 'Ludus': 55, 'Storge': 95, 'Pragma': 85, 'Mania': 75, 'Agape': 90 },
    'Pragma': { 'Eros': 65, 'Ludus': 70, 'Storge': 85, 'Pragma': 90, 'Mania': 60, 'Agape': 80 },
    'Mania': { 'Eros': 80, 'Ludus': 45, 'Storge': 75, 'Pragma': 60, 'Mania': 85, 'Agape': 70 },
    'Agape': { 'Eros': 85, 'Ludus': 50, 'Storge': 90, 'Pragma': 80, 'Mania': 70, 'Agape': 95 }
  }

  const maleMainStyle = getMainLoveStyle(maleScores)
  const femaleMainStyle = getMainLoveStyle(femaleScores)

  return compatibilityMatrix[maleMainStyle][femaleMainStyle]
}

/**
 * 性格特性相性計算（ビッグファイブ理論）
 */
function calculatePersonalityCompatibility(maleAnswers: any, femaleAnswers: any): number {
  const maleBigFive = estimateBigFiveFromAnswers(maleAnswers)
  const femaleBigFive = estimateBigFiveFromAnswers(femaleAnswers)

  // ビッグファイブの相性計算
  let compatibility = 0

  // 外向性：適度な差があると相性が良い
  const extraversionDiff = Math.abs(maleBigFive.extraversion - femaleBigFive.extraversion)
  compatibility += Math.max(0, 20 - extraversionDiff * 2)

  // 協調性：両方高いと相性が良い
  const agreeablenessAvg = (maleBigFive.agreeableness + femaleBigFive.agreeableness) / 2
  compatibility += agreeablenessAvg * 0.3

  // 誠実性：両方高いと相性が良い
  const conscientiousnessAvg = (maleBigFive.conscientiousness + femaleBigFive.conscientiousness) / 2
  compatibility += conscientiousnessAvg * 0.3

  // 神経症傾向：両方低いと相性が良い
  const neuroticismAvg = (maleBigFive.neuroticism + femaleBigFive.neuroticism) / 2
  compatibility += (100 - neuroticismAvg) * 0.2

  return Math.max(0, Math.min(100, compatibility))
}

/**
 * コミュニケーション相性計算
 */
function calculateCommunicationCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 質問3, 6, 9, 12, 15, 18からコミュニケーション傾向を分析
  const maleCommScore = calculateCommunicationScore(maleAnswers)
  const femaleCommScore = calculateCommunicationScore(femaleAnswers)

  // コミュニケーションスタイルの相性
  const styleCompatibility = 100 - Math.abs(maleCommScore - femaleCommScore) * 2

  return Math.max(0, Math.min(100, styleCompatibility))
}

/**
 * 価値観相性計算
 */
function calculateValuesCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 質問2, 5, 8, 11, 14, 17から価値観を分析
  const maleValuesScore = calculateValuesScore(maleAnswers)
  const femaleValuesScore = calculateValuesScore(femaleAnswers)

  // 価値観の類似性
  const valuesSimilarity = 100 - Math.abs(maleValuesScore - femaleValuesScore) * 3

  return Math.max(0, Math.min(100, valuesSimilarity))
}

/**
 * ライフスタイル相性計算
 */
function calculateLifestyleCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 質問1, 4, 7, 10, 13, 16からライフスタイルを分析
  const maleLifestyleScore = calculateLifestyleScore(maleAnswers)
  const femaleLifestyleScore = calculateLifestyleScore(femaleAnswers)

  // ライフスタイルの適合性
  const lifestyleFit = 100 - Math.abs(maleLifestyleScore - femaleLifestyleScore) * 2.5

  return Math.max(0, Math.min(100, lifestyleFit))
}

// ヘルパー関数群
function calculateLoveStyleScores(answers: any): LoveStyleScores {
  const scores = { Eros: 0, Ludus: 0, Storge: 0, Pragma: 0, Mania: 0, Agape: 0 }
  
  // 各質問の回答から恋愛スタイルスコアを計算
  Object.entries(answers).forEach(([questionId, value]) => {
    const questionNum = parseInt(questionId.replace('opt_love_', ''))
    const answerValue = value as number
    
    // 質問番号に基づいて恋愛スタイルを分類
    if (questionNum <= 3) scores.Eros += answerValue
    else if (questionNum <= 6) scores.Ludus += answerValue
    else if (questionNum <= 9) scores.Storge += answerValue
    else if (questionNum <= 12) scores.Pragma += answerValue
    else if (questionNum <= 15) scores.Mania += answerValue
    else scores.Agape += answerValue
  })
  
  return scores
}

function getMainLoveStyle(scores: LoveStyleScores): string {
  return Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0]
}

function estimateBigFiveFromAnswers(answers: any): any {
  // 回答からビッグファイブを推定
  const totalScore = Object.values(answers).reduce((sum: number, value: any) => sum + value, 0)
  const avgScore = totalScore / Object.keys(answers).length
  
  return {
    extraversion: Math.min(100, avgScore * 20 + 20),
    agreeableness: Math.min(100, avgScore * 20 + 20),
    conscientiousness: Math.min(100, avgScore * 20 + 20),
    neuroticism: Math.min(100, (5 - avgScore) * 20 + 20),
    openness: Math.min(100, avgScore * 20 + 20)
  }
}

function calculateCommunicationScore(answers: any): number {
  // コミュニケーション関連の質問（3, 6, 9, 12, 15, 18）の平均
  const commQuestions = ['opt_love_3', 'opt_love_6', 'opt_love_9', 'opt_love_12', 'opt_love_15', 'opt_love_18']
  const commAnswers = commQuestions.map(q => answers[q] || 3).filter(v => v !== undefined)
  return commAnswers.reduce((sum, val) => sum + val, 0) / commAnswers.length * 20
}

function calculateValuesScore(answers: any): number {
  // 価値観関連の質問（2, 5, 8, 11, 14, 17）の平均
  const valuesQuestions = ['opt_love_2', 'opt_love_5', 'opt_love_8', 'opt_love_11', 'opt_love_14', 'opt_love_17']
  const valuesAnswers = valuesQuestions.map(q => answers[q] || 3).filter(v => v !== undefined)
  return valuesAnswers.reduce((sum, val) => sum + val, 0) / valuesAnswers.length * 20
}

function calculateLifestyleScore(answers: any): number {
  // ライフスタイル関連の質問（1, 4, 7, 10, 13, 16）の平均
  const lifestyleQuestions = ['opt_love_1', 'opt_love_4', 'opt_love_7', 'opt_love_10', 'opt_love_13', 'opt_love_16']
  const lifestyleAnswers = lifestyleQuestions.map(q => answers[q] || 3).filter(v => v !== undefined)
  return lifestyleAnswers.reduce((sum, val) => sum + val, 0) / lifestyleAnswers.length * 20
}

function generateDetailedAnalysis(
  loveStyle: number,
  personality: number,
  communication: number,
  values: number,
  lifestyle: number
): any {
  const strengths = []
  const challenges = []
  const recommendations = []

  if (loveStyle >= 80) strengths.push('恋愛スタイルが非常に合っている')
  if (personality >= 80) strengths.push('性格がよく合っている')
  if (communication >= 80) strengths.push('コミュニケーションが取れている')
  if (values >= 80) strengths.push('価値観が似ている')
  if (lifestyle >= 80) strengths.push('ライフスタイルが合っている')

  if (loveStyle < 60) challenges.push('恋愛スタイルに違いがある')
  if (personality < 60) challenges.push('性格に違いがある')
  if (communication < 60) challenges.push('コミュニケーションに課題がある')
  if (values < 60) challenges.push('価値観に違いがある')
  if (lifestyle < 60) challenges.push('ライフスタイルに違いがある')

  if (loveStyle < 70) recommendations.push('お互いの恋愛観を理解し合う')
  if (personality < 70) recommendations.push('性格の違いを認め合う')
  if (communication < 70) recommendations.push('コミュニケーションを大切にする')
  if (values < 70) recommendations.push('価値観の違いを尊重する')
  if (lifestyle < 70) recommendations.push('ライフスタイルを調整し合う')

  return { strengths, challenges, recommendations }
}
