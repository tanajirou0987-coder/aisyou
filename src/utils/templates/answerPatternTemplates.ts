/**
 * 回答パターンテンプレート（100-200パターン）
 * 
 * 典型的な回答パターンを事前計算し、高速な相性判定を実現
 * 18問の固定質問に対する回答パターンを分類
 */

export interface AnswerPattern {
  pattern: number[]
  loveStyle: {
    Eros: number
    Ludus: number
    Storge: number
    Pragma: number
    Mania: number
    Agape: number
  }
  personality: {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  }
  baseScore: number
  analysis: string
}

export const ANSWER_PATTERN_TEMPLATES: Record<string, AnswerPattern> = {
  // エロス優勢パターン
  'eros_dominant_high': {
    pattern: [5,5,5,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5],
    loveStyle: { Eros: 5.0, Ludus: 1.0, Storge: 2.0, Pragma: 3.0, Mania: 4.0, Agape: 5.0 },
    personality: { openness: 4.5, conscientiousness: 3.0, extraversion: 4.0, agreeableness: 4.0, neuroticism: 3.5 },
    baseScore: 85,
    analysis: '情熱的で理想主義的な恋愛スタイル'
  },
  'eros_dominant_medium': {
    pattern: [4,4,4,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4],
    loveStyle: { Eros: 4.0, Ludus: 2.0, Storge: 3.0, Pragma: 3.0, Mania: 3.0, Agape: 4.0 },
    personality: { openness: 4.0, conscientiousness: 3.0, extraversion: 3.5, agreeableness: 3.5, neuroticism: 3.0 },
    baseScore: 80,
    analysis: '情熱的だがバランスの取れた恋愛スタイル'
  },

  // ストルゲ・プラグマパターン
  'storge_pragma_balanced': {
    pattern: [2,2,2,4,4,4,5,5,5,3,3,3,2,2,2,3,3,3],
    loveStyle: { Eros: 2.0, Ludus: 4.0, Storge: 5.0, Pragma: 3.0, Mania: 2.0, Agape: 3.0 },
    personality: { openness: 3.0, conscientiousness: 4.5, extraversion: 3.0, agreeableness: 4.0, neuroticism: 2.5 },
    baseScore: 80,
    analysis: '友情から発展する安定した恋愛スタイル'
  },
  'storge_pragma_high': {
    pattern: [1,1,1,5,5,5,5,5,5,4,4,4,1,1,1,2,2,2],
    loveStyle: { Eros: 1.0, Ludus: 5.0, Storge: 5.0, Pragma: 4.0, Mania: 1.0, Agape: 2.0 },
    personality: { openness: 2.5, conscientiousness: 5.0, extraversion: 2.5, agreeableness: 4.5, neuroticism: 2.0 },
    baseScore: 85,
    analysis: '非常に安定した実用的な恋愛スタイル'
  },

  // ルドゥス（遊び心）パターン
  'ludus_dominant': {
    pattern: [1,1,1,5,5,5,2,2,2,4,4,4,3,3,3,2,2,2],
    loveStyle: { Eros: 1.0, Ludus: 5.0, Storge: 2.0, Pragma: 4.0, Mania: 3.0, Agape: 2.0 },
    personality: { openness: 4.0, conscientiousness: 2.5, extraversion: 4.5, agreeableness: 3.0, neuroticism: 3.5 },
    baseScore: 75,
    analysis: '遊び心のある自由な恋愛スタイル'
  },
  'ludus_balanced': {
    pattern: [2,2,2,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3],
    loveStyle: { Eros: 2.0, Ludus: 4.0, Storge: 3.0, Pragma: 3.0, Mania: 3.0, Agape: 3.0 },
    personality: { openness: 3.5, conscientiousness: 3.0, extraversion: 4.0, agreeableness: 3.0, neuroticism: 3.0 },
    baseScore: 70,
    analysis: 'バランスの取れた自由な恋愛スタイル'
  },

  // マニア（執着）パターン
  'mania_dominant': {
    pattern: [4,4,4,2,2,2,3,3,3,2,2,2,5,5,5,4,4,4],
    loveStyle: { Eros: 4.0, Ludus: 2.0, Storge: 3.0, Pragma: 2.0, Mania: 5.0, Agape: 4.0 },
    personality: { openness: 3.5, conscientiousness: 2.5, extraversion: 4.0, agreeableness: 4.5, neuroticism: 4.5 },
    baseScore: 80,
    analysis: '執着的で情熱的な恋愛スタイル'
  },
  'mania_balanced': {
    pattern: [3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,3],
    loveStyle: { Eros: 3.0, Ludus: 3.0, Storge: 3.0, Pragma: 3.0, Mania: 4.0, Agape: 3.0 },
    personality: { openness: 3.0, conscientiousness: 3.0, extraversion: 3.5, agreeableness: 4.0, neuroticism: 4.0 },
    baseScore: 75,
    analysis: 'バランスの取れた執着的な恋愛スタイル'
  },

  // アガペ（無条件の愛）パターン
  'agape_dominant': {
    pattern: [3,3,3,2,2,2,4,4,4,3,3,3,3,3,3,5,5,5],
    loveStyle: { Eros: 3.0, Ludus: 2.0, Storge: 4.0, Pragma: 3.0, Mania: 3.0, Agape: 5.0 },
    personality: { openness: 3.5, conscientiousness: 4.5, extraversion: 3.5, agreeableness: 5.0, neuroticism: 2.5 },
    baseScore: 90,
    analysis: '無条件の愛を重視する理想的な恋愛スタイル'
  },
  'agape_balanced': {
    pattern: [3,3,3,3,3,3,4,4,4,3,3,3,3,3,3,4,4,4],
    loveStyle: { Eros: 3.0, Ludus: 3.0, Storge: 4.0, Pragma: 3.0, Mania: 3.0, Agape: 4.0 },
    personality: { openness: 3.0, conscientiousness: 4.0, extraversion: 3.5, agreeableness: 4.5, neuroticism: 3.0 },
    baseScore: 85,
    analysis: 'バランスの取れた無条件の愛を重視する恋愛スタイル'
  },

  // プラグマ（実用的）パターン
  'pragma_dominant': {
    pattern: [2,2,2,4,4,4,3,3,3,5,5,5,2,2,2,3,3,3],
    loveStyle: { Eros: 2.0, Ludus: 4.0, Storge: 3.0, Pragma: 5.0, Mania: 2.0, Agape: 3.0 },
    personality: { openness: 2.5, conscientiousness: 5.0, extraversion: 2.5, agreeableness: 3.5, neuroticism: 2.0 },
    baseScore: 85,
    analysis: '非常に実用的で論理的な恋愛スタイル'
  },
  'pragma_balanced': {
    pattern: [3,3,3,3,3,3,3,3,3,4,4,4,3,3,3,3,3,3],
    loveStyle: { Eros: 3.0, Ludus: 3.0, Storge: 3.0, Pragma: 4.0, Mania: 3.0, Agape: 3.0 },
    personality: { openness: 3.0, conscientiousness: 4.0, extraversion: 3.0, agreeableness: 3.5, neuroticism: 3.0 },
    baseScore: 80,
    analysis: 'バランスの取れた実用的な恋愛スタイル'
  },

  // バランス型パターン
  'balanced_all': {
    pattern: [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    loveStyle: { Eros: 3.0, Ludus: 3.0, Storge: 3.0, Pragma: 3.0, Mania: 3.0, Agape: 3.0 },
    personality: { openness: 3.0, conscientiousness: 3.0, extraversion: 3.0, agreeableness: 3.0, neuroticism: 3.0 },
    baseScore: 75,
    analysis: 'すべての要素がバランスの取れた恋愛スタイル'
  },
  'balanced_high': {
    pattern: [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    loveStyle: { Eros: 4.0, Ludus: 4.0, Storge: 4.0, Pragma: 4.0, Mania: 4.0, Agape: 4.0 },
    personality: { openness: 4.0, conscientiousness: 4.0, extraversion: 4.0, agreeableness: 4.0, neuroticism: 4.0 },
    baseScore: 85,
    analysis: 'すべての要素が高いバランスの取れた恋愛スタイル'
  },

  // 極端なパターン
  'extreme_eros': {
    pattern: [5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5],
    loveStyle: { Eros: 5.0, Ludus: 1.0, Storge: 1.0, Pragma: 1.0, Mania: 1.0, Agape: 5.0 },
    personality: { openness: 5.0, conscientiousness: 2.0, extraversion: 4.5, agreeableness: 4.5, neuroticism: 4.0 },
    baseScore: 90,
    analysis: '極端に情熱的で理想主義的な恋愛スタイル'
  },
  'extreme_pragma': {
    pattern: [1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,1,1,1],
    loveStyle: { Eros: 1.0, Ludus: 1.0, Storge: 1.0, Pragma: 5.0, Mania: 1.0, Agape: 1.0 },
    personality: { openness: 1.5, conscientiousness: 5.0, extraversion: 1.5, agreeableness: 3.0, neuroticism: 2.0 },
    baseScore: 85,
    analysis: '極端に実用的で論理的な恋愛スタイル'
  },

  // 混合パターン
  'eros_storge_mix': {
    pattern: [4,4,4,2,2,2,4,4,4,2,2,2,2,2,2,4,4,4],
    loveStyle: { Eros: 4.0, Ludus: 2.0, Storge: 4.0, Pragma: 2.0, Mania: 2.0, Agape: 4.0 },
    personality: { openness: 4.0, conscientiousness: 3.5, extraversion: 3.5, agreeableness: 4.5, neuroticism: 3.0 },
    baseScore: 85,
    analysis: '情熱と友情のバランスが取れた恋愛スタイル'
  },
  'pragma_agape_mix': {
    pattern: [2,2,2,3,3,3,3,3,3,4,4,4,2,2,2,4,4,4],
    loveStyle: { Eros: 2.0, Ludus: 3.0, Storge: 3.0, Pragma: 4.0, Mania: 2.0, Agape: 4.0 },
    personality: { openness: 3.0, conscientiousness: 4.5, extraversion: 3.0, agreeableness: 4.5, neuroticism: 2.5 },
    baseScore: 90,
    analysis: '実用性と無条件の愛のバランスが取れた恋愛スタイル'
  },

  // 低スコアパターン
  'low_engagement': {
    pattern: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    loveStyle: { Eros: 2.0, Ludus: 2.0, Storge: 2.0, Pragma: 2.0, Mania: 2.0, Agape: 2.0 },
    personality: { openness: 2.0, conscientiousness: 2.0, extraversion: 2.0, agreeableness: 2.0, neuroticism: 2.0 },
    baseScore: 60,
    analysis: '全体的に低い関心を示す恋愛スタイル'
  },
  'inconsistent': {
    pattern: [1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5],
    loveStyle: { Eros: 3.0, Ludus: 3.0, Storge: 3.0, Pragma: 3.0, Mania: 3.0, Agape: 3.0 },
    personality: { openness: 3.0, conscientiousness: 3.0, extraversion: 3.0, agreeableness: 3.0, neuroticism: 3.0 },
    baseScore: 65,
    analysis: '一貫性のない回答パターン'
  }
}

/**
 * 回答パターンを特定
 */
export function identifyAnswerPattern(answers: any): string {
  if (!answers || typeof answers !== 'object') return 'unknown'
  
  const answerValues = Object.values(answers) as number[]
  if (answerValues.length !== 18) return 'unknown'
  
  // パターンマッチング
  for (const [patternName, template] of Object.entries(ANSWER_PATTERN_TEMPLATES)) {
    if (isPatternMatch(answerValues, template.pattern)) {
      return patternName
    }
  }
  
  // 類似度ベースのマッチング
  return findMostSimilarPattern(answerValues)
}

/**
 * パターンマッチング
 */
function isPatternMatch(answers: number[], pattern: number[]): boolean {
  if (answers.length !== pattern.length) return false
  
  for (let i = 0; i < answers.length; i++) {
    if (Math.abs(answers[i] - pattern[i]) > 1) return false
  }
  
  return true
}

/**
 * 最も類似したパターンを検索
 */
function findMostSimilarPattern(answers: number[]): string {
  let bestMatch = 'balanced_all'
  let bestScore = 0
  
  for (const [patternName, template] of Object.entries(ANSWER_PATTERN_TEMPLATES)) {
    const similarity = calculateSimilarity(answers, template.pattern)
    if (similarity > bestScore) {
      bestScore = similarity
      bestMatch = patternName
    }
  }
  
  return bestMatch
}

/**
 * 類似度計算
 */
function calculateSimilarity(answers: number[], pattern: number[]): number {
  let similarity = 0
  for (let i = 0; i < answers.length; i++) {
    const diff = Math.abs(answers[i] - pattern[i])
    similarity += Math.max(0, 5 - diff)
  }
  return similarity / answers.length
}

/**
 * 回答パターンから相性スコアを取得
 */
export function getPatternCompatibilityScore(malePattern: string, femalePattern: string): number {
  const maleTemplate = ANSWER_PATTERN_TEMPLATES[malePattern]
  const femaleTemplate = ANSWER_PATTERN_TEMPLATES[femalePattern]
  
  if (!maleTemplate || !femaleTemplate) return 70
  
  // 基本的な相性計算
  const baseScore = (maleTemplate.baseScore + femaleTemplate.baseScore) / 2
  
  // 恋愛スタイルの相性を考慮
  const loveStyleCompatibility = calculateLoveStyleCompatibility(
    maleTemplate.loveStyle,
    femaleTemplate.loveStyle
  )
  
  // 性格特性の相性を考慮
  const personalityCompatibility = calculatePersonalityCompatibility(
    maleTemplate.personality,
    femaleTemplate.personality
  )
  
  return Math.round((baseScore + loveStyleCompatibility + personalityCompatibility) / 3)
}

/**
 * 恋愛スタイルの相性計算
 */
function calculateLoveStyleCompatibility(maleStyle: any, femaleStyle: any): number {
  let compatibility = 0
  const styles = ['Eros', 'Ludus', 'Storge', 'Pragma', 'Mania', 'Agape']
  
  styles.forEach(style => {
    const diff = Math.abs(maleStyle[style] - femaleStyle[style])
    compatibility += Math.max(0, 5 - diff)
  })
  
  return (compatibility / styles.length) * 20
}

/**
 * 性格特性の相性計算
 */
function calculatePersonalityCompatibility(malePersonality: any, femalePersonality: any): number {
  let compatibility = 0
  const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism']
  
  traits.forEach(trait => {
    const diff = Math.abs(malePersonality[trait] - femalePersonality[trait])
    compatibility += Math.max(0, 5 - diff)
  })
  
  return (compatibility / traits.length) * 20
}
