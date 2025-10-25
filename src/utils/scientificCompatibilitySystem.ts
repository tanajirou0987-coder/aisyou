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
  // 高速化：簡略化された相性計算
  const loveStyleScore = calculateLoveStyleCompatibility(maleAnswers, femaleAnswers)
  const personalityScore = calculatePersonalityCompatibility(maleAnswers, femaleAnswers)
  const communicationScore = calculateCommunicationCompatibility(maleAnswers, femaleAnswers)
  const valuesScore = calculateValuesCompatibility(maleAnswers, femaleAnswers)
  const lifestyleScore = calculateLifestyleCompatibility(maleAnswers, femaleAnswers)

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

  return {
    totalScore: Math.max(0, Math.min(100, totalScore)),
    loveStyleCompatibility: loveStyleScore,
    personalityCompatibility: personalityScore,
    communicationCompatibility: communicationScore,
    valuesCompatibility: valuesScore,
    lifestyleCompatibility: lifestyleScore,
    detailedAnalysis: {
      summary: '科学的根拠に基づく相性診断',
      strengths: ['価値観の一致', 'コミュニケーション'],
      areas: ['相互理解の深化']
    }
  }
}

/**
 * 恋愛スタイル相性計算（ジョン・リーの理論）
 */
function calculateLoveStyleCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 高速化：簡略化された恋愛スタイル計算
  const maleScores = calculateLoveStyleScores(maleAnswers)
  const femaleScores = calculateLoveStyleScores(femaleAnswers)
  
  // 基本的な相性計算（高速化）
  const maleMainStyle = getMainLoveStyle(maleScores)
  const femaleMainStyle = getMainLoveStyle(femaleScores)
  
  // 簡略化された相性計算
  if (maleMainStyle === femaleMainStyle) return 90
  if (['Eros', 'Agape'].includes(maleMainStyle) && ['Eros', 'Agape'].includes(femaleMainStyle)) return 85
  if (['Storge', 'Pragma'].includes(maleMainStyle) && ['Storge', 'Pragma'].includes(femaleMainStyle)) return 80
  return 70
}

/**
 * 性格特性相性計算（ビッグファイブ理論）
 */
function calculatePersonalityCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 高速化：簡略化された性格相性計算
  const maleBigFive = estimateBigFiveFromAnswers(maleAnswers)
  const femaleBigFive = estimateBigFiveFromAnswers(femaleAnswers)
  
  // 基本的な相性計算
  const agreeablenessAvg = (maleBigFive.agreeableness + femaleBigFive.agreeableness) / 2
  const conscientiousnessAvg = (maleBigFive.conscientiousness + femaleBigFive.conscientiousness) / 2
  const neuroticismAvg = (maleBigFive.neuroticism + femaleBigFive.neuroticism) / 2
  
  return Math.round(agreeablenessAvg * 0.4 + conscientiousnessAvg * 0.4 + (100 - neuroticismAvg) * 0.2)
}

/**
 * コミュニケーション相性計算
 */
function calculateCommunicationCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 高速化：簡略化されたコミュニケーション相性計算
  const maleCommScore = calculateCommunicationScore(maleAnswers)
  const femaleCommScore = calculateCommunicationScore(femaleAnswers)
  return Math.max(0, 100 - Math.abs(maleCommScore - femaleCommScore) * 2)
}

/**
 * 価値観相性計算
 */
function calculateValuesCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 高速化：簡略化された価値観相性計算
  const maleValuesScore = calculateValuesScore(maleAnswers)
  const femaleValuesScore = calculateValuesScore(femaleAnswers)
  return Math.max(0, 100 - Math.abs(maleValuesScore - femaleValuesScore) * 3)
}

/**
 * ライフスタイル相性計算
 */
function calculateLifestyleCompatibility(maleAnswers: any, femaleAnswers: any): number {
  // 高速化：簡略化されたライフスタイル相性計算
  const maleLifestyleScore = calculateLifestyleScore(maleAnswers)
  const femaleLifestyleScore = calculateLifestyleScore(femaleAnswers)
  return Math.max(0, 100 - Math.abs(maleLifestyleScore - femaleLifestyleScore) * 2.5)
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
