/**
 * 高速相性計算システム
 * 
 * テンプレート化されたデータを使用して高速な相性計算を実現
 * 処理時間を大幅に短縮
 */

import { getLoveStyleCompatibility, getLoveStyleScore } from './loveStyleMatrixTemplate'
import { getPatternCompatibilityScore, identifyAnswerPattern } from './answerPatternTemplates'
import { getPersonalityCompatibility, getPersonalityScore, identifyPersonalityProfile } from './personalityTemplates'

export interface FastCompatibilityResult {
  totalScore: number
  loveStyleScore: number
  personalityScore: number
  patternScore: number
  analysis: string
  strengths: string[]
  challenges: string[]
  advice: string[]
  calculationTime: number
}

/**
 * 高速相性計算のメイン関数
 */
export function calculateFastCompatibility(
  maleAnswers: any,
  femaleAnswers: any
): FastCompatibilityResult {
  const startTime = performance.now()
  
  try {
    // 1. 回答パターンを特定
    const malePattern = identifyAnswerPattern(maleAnswers)
    const femalePattern = identifyAnswerPattern(femaleAnswers)
    
    // 2. 性格プロファイルを特定
    const malePersonality = identifyPersonalityProfile(maleAnswers)
    const femalePersonality = identifyPersonalityProfile(femaleAnswers)
    
    // 3. 恋愛スタイルを特定
    const maleLoveStyle = identifyLoveStyle(maleAnswers)
    const femaleLoveStyle = identifyLoveStyle(femaleAnswers)
    
    // 4. 各要素の相性を計算
    const loveStyleScore = getLoveStyleScore(maleLoveStyle, femaleLoveStyle)
    const personalityScore = getPersonalityScore(malePersonality, femalePersonality)
    const patternScore = getPatternCompatibilityScore(malePattern, femalePattern)
    
    // 5. 重み付け平均で総合スコアを計算
    const weights = {
      loveStyle: 0.40,
      personality: 0.30,
      pattern: 0.30
    }
    
    const totalScore = Math.round(
      loveStyleScore * weights.loveStyle +
      personalityScore * weights.personality +
      patternScore * weights.pattern
    )
    
    // 6. 詳細分析を生成
    const loveStyleCompatibility = getLoveStyleCompatibility(maleLoveStyle, femaleLoveStyle)
    const personalityCompatibility = getPersonalityCompatibility(malePersonality, femalePersonality)
    
    const analysis = generateFastAnalysis(
      loveStyleCompatibility,
      personalityCompatibility,
      totalScore
    )
    
    const endTime = performance.now()
    const calculationTime = endTime - startTime
    
    return {
      totalScore: Math.max(0, Math.min(100, totalScore)),
      loveStyleScore,
      personalityScore,
      patternScore,
      analysis: analysis.summary,
      strengths: analysis.strengths,
      challenges: analysis.challenges,
      advice: analysis.advice,
      calculationTime
    }
    
  } catch (error) {
    console.error('Fast compatibility calculation error:', error)
    
    // フォールバック処理
    const endTime = performance.now()
    const calculationTime = endTime - startTime
    
    return {
      totalScore: 70,
      loveStyleScore: 70,
      personalityScore: 70,
      patternScore: 70,
      analysis: '一般的な相性',
      strengths: ['基本的な相性'],
      challenges: ['相互理解の深化'],
      advice: ['コミュニケーションを大切にする'],
      calculationTime
    }
  }
}

/**
 * 恋愛スタイルを特定
 */
function identifyLoveStyle(answers: any): string {
  if (!answers || typeof answers !== 'object') return 'Eros'
  
  const answerValues = Object.values(answers) as number[]
  if (answerValues.length !== 18) return 'Eros'
  
  // 恋愛スタイルスコアを計算
  const loveStyleScores = calculateLoveStyleScores(answerValues)
  
  // 最も高いスコアのスタイルを返す
  return getMainLoveStyle(loveStyleScores)
}

/**
 * 恋愛スタイルスコアを計算
 */
function calculateLoveStyleScores(answers: number[]): Record<string, number> {
  const scores = { Eros: 0, Ludus: 0, Storge: 0, Pragma: 0, Mania: 0, Agape: 0 }
  
  // 各質問の回答から恋愛スタイルスコアを計算
  for (let i = 0; i < answers.length; i++) {
    const questionNum = i + 1
    const answerValue = answers[i]
    
    // 質問番号に基づいて恋愛スタイルを分類
    if (questionNum <= 3) scores.Eros += answerValue
    else if (questionNum <= 6) scores.Ludus += answerValue
    else if (questionNum <= 9) scores.Storge += answerValue
    else if (questionNum <= 12) scores.Pragma += answerValue
    else if (questionNum <= 15) scores.Mania += answerValue
    else scores.Agape += answerValue
  }
  
  return scores
}

/**
 * 主要な恋愛スタイルを取得
 */
function getMainLoveStyle(scores: Record<string, number>): string {
  let maxScore = 0
  let mainStyle = 'Eros'
  
  for (const [style, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score
      mainStyle = style
    }
  }
  
  return mainStyle
}

/**
 * 高速分析を生成
 */
function generateFastAnalysis(
  loveStyleCompatibility: any,
  personalityCompatibility: any,
  totalScore: number
): {
  summary: string
  strengths: string[]
  challenges: string[]
  advice: string[]
} {
  const strengths = [
    ...loveStyleCompatibility.strengths,
    ...personalityCompatibility.strengths
  ]
  
  const challenges = [
    ...loveStyleCompatibility.challenges,
    ...personalityCompatibility.challenges
  ]
  
  const advice = [
    ...loveStyleCompatibility.advice,
    ...personalityCompatibility.advice
  ]
  
  let summary = ''
  if (totalScore >= 90) {
    summary = '完璧な相性！理想的な関係を築ける可能性が高いです。'
  } else if (totalScore >= 80) {
    summary = '非常に良い相性！素晴らしい関係を築ける可能性が高いです。'
  } else if (totalScore >= 70) {
    summary = '良い相性！安定した関係を築ける可能性が高いです。'
  } else if (totalScore >= 60) {
    summary = '一般的な相性。お互いの理解を深めることで良い関係を築けます。'
  } else {
    summary = '相性に課題があります。お互いの違いを理解し、努力することで関係を改善できます。'
  }
  
  return {
    summary,
    strengths: [...new Set(strengths)],
    challenges: [...new Set(challenges)],
    advice: [...new Set(advice)]
  }
}

/**
 * バッチ処理による高速計算
 */
export async function calculateFastCompatibilityBatch(
  combinations: Array<{ male: string; female: string; maleAnswers: any; femaleAnswers: any }>
): Promise<Array<{ male: string; female: string; score: number; analysis: string }>> {
  const startTime = performance.now()
  
  // 並列処理で複数の組み合わせを同時計算
  const results = await Promise.all(
    combinations.map(async (combo) => {
      const result = calculateFastCompatibility(combo.maleAnswers, combo.femaleAnswers)
      return {
        male: combo.male,
        female: combo.female,
        score: result.totalScore,
        analysis: result.analysis
      }
    })
  )
  
  const endTime = performance.now()
  console.log(`Batch calculation completed in ${endTime - startTime}ms`)
  
  return results
}

/**
 * キャッシュ付き高速計算
 */
const compatibilityCache = new Map<string, FastCompatibilityResult>()

export function calculateFastCompatibilityWithCache(
  maleAnswers: any,
  femaleAnswers: any
): FastCompatibilityResult {
  // キャッシュキーを生成
  const cacheKey = generateCacheKey(maleAnswers, femaleAnswers)
  
  // キャッシュから結果を取得
  if (compatibilityCache.has(cacheKey)) {
    return compatibilityCache.get(cacheKey)!
  }
  
  // 計算を実行
  const result = calculateFastCompatibility(maleAnswers, femaleAnswers)
  
  // 結果をキャッシュに保存
  compatibilityCache.set(cacheKey, result)
  
  return result
}

/**
 * キャッシュキーを生成
 */
function generateCacheKey(maleAnswers: any, femaleAnswers: any): string {
  const maleKey = JSON.stringify(maleAnswers)
  const femaleKey = JSON.stringify(femaleAnswers)
  return `${maleKey}-${femaleKey}`
}

/**
 * キャッシュをクリア
 */
export function clearCompatibilityCache(): void {
  compatibilityCache.clear()
}

/**
 * キャッシュサイズを取得
 */
export function getCacheSize(): number {
  return compatibilityCache.size
}

/**
 * パフォーマンス統計を取得
 */
export function getPerformanceStats(): {
  cacheSize: number
  averageCalculationTime: number
  cacheHitRate: number
} {
  return {
    cacheSize: compatibilityCache.size,
    averageCalculationTime: 0, // 実装時に統計を追加
    cacheHitRate: 0 // 実装時に統計を追加
  }
}
