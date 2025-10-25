/**
 * 性格特性テンプレート（ビッグファイブ理論）
 * 
 * ビッグファイブ性格理論に基づく性格特性の組み合わせを事前計算
 * 相性計算の高速化を実現
 */

export interface PersonalityProfile {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
}

export interface PersonalityCompatibility {
  score: number
  analysis: string
  strengths: string[]
  challenges: string[]
  advice: string[]
}

export const PERSONALITY_TEMPLATES: Record<string, PersonalityProfile> = {
  // 高開放性パターン
  'high_openness_high_conscientiousness': {
    openness: 4.5,
    conscientiousness: 4.5,
    extraversion: 3.5,
    agreeableness: 4.0,
    neuroticism: 2.5
  },
  'high_openness_low_conscientiousness': {
    openness: 4.5,
    conscientiousness: 2.0,
    extraversion: 4.0,
    agreeableness: 3.5,
    neuroticism: 3.0
  },
  'high_openness_high_extraversion': {
    openness: 4.5,
    conscientiousness: 3.0,
    extraversion: 4.5,
    agreeableness: 4.0,
    neuroticism: 3.0
  },
  'high_openness_low_extraversion': {
    openness: 4.5,
    conscientiousness: 3.5,
    extraversion: 2.0,
    agreeableness: 4.0,
    neuroticism: 3.5
  },

  // 高誠実性パターン
  'high_conscientiousness_high_agreeableness': {
    openness: 3.0,
    conscientiousness: 4.5,
    extraversion: 3.5,
    agreeableness: 4.5,
    neuroticism: 2.0
  },
  'high_conscientiousness_low_agreeableness': {
    openness: 3.0,
    conscientiousness: 4.5,
    extraversion: 3.0,
    agreeableness: 2.0,
    neuroticism: 3.0
  },
  'high_conscientiousness_high_extraversion': {
    openness: 3.5,
    conscientiousness: 4.5,
    extraversion: 4.0,
    agreeableness: 3.5,
    neuroticism: 2.5
  },
  'high_conscientiousness_low_extraversion': {
    openness: 3.0,
    conscientiousness: 4.5,
    extraversion: 2.0,
    agreeableness: 3.5,
    neuroticism: 3.0
  },

  // 高外向性パターン
  'high_extraversion_high_agreeableness': {
    openness: 3.5,
    conscientiousness: 3.0,
    extraversion: 4.5,
    agreeableness: 4.5,
    neuroticism: 2.5
  },
  'high_extraversion_low_agreeableness': {
    openness: 3.5,
    conscientiousness: 3.0,
    extraversion: 4.5,
    agreeableness: 2.0,
    neuroticism: 3.5
  },
  'high_extraversion_high_openness': {
    openness: 4.5,
    conscientiousness: 3.0,
    extraversion: 4.5,
    agreeableness: 3.5,
    neuroticism: 3.0
  },
  'high_extraversion_low_openness': {
    openness: 2.0,
    conscientiousness: 3.5,
    extraversion: 4.5,
    agreeableness: 3.5,
    neuroticism: 3.0
  },

  // 高協調性パターン
  'high_agreeableness_high_conscientiousness': {
    openness: 3.0,
    conscientiousness: 4.5,
    extraversion: 3.5,
    agreeableness: 4.5,
    neuroticism: 2.0
  },
  'high_agreeableness_low_conscientiousness': {
    openness: 3.5,
    conscientiousness: 2.0,
    extraversion: 3.5,
    agreeableness: 4.5,
    neuroticism: 3.0
  },
  'high_agreeableness_high_extraversion': {
    openness: 3.5,
    conscientiousness: 3.0,
    extraversion: 4.5,
    agreeableness: 4.5,
    neuroticism: 2.5
  },
  'high_agreeableness_low_extraversion': {
    openness: 3.0,
    conscientiousness: 3.5,
    extraversion: 2.0,
    agreeableness: 4.5,
    neuroticism: 3.0
  },

  // 低神経症傾向パターン
  'low_neuroticism_high_conscientiousness': {
    openness: 3.5,
    conscientiousness: 4.5,
    extraversion: 3.5,
    agreeableness: 4.0,
    neuroticism: 1.5
  },
  'low_neuroticism_high_extraversion': {
    openness: 3.5,
    conscientiousness: 3.0,
    extraversion: 4.5,
    agreeableness: 4.0,
    neuroticism: 1.5
  },
  'low_neuroticism_high_agreeableness': {
    openness: 3.0,
    conscientiousness: 3.5,
    extraversion: 3.5,
    agreeableness: 4.5,
    neuroticism: 1.5
  },
  'low_neuroticism_high_openness': {
    openness: 4.5,
    conscientiousness: 3.0,
    extraversion: 3.5,
    agreeableness: 4.0,
    neuroticism: 1.5
  },

  // バランス型パターン
  'balanced_high': {
    openness: 4.0,
    conscientiousness: 4.0,
    extraversion: 4.0,
    agreeableness: 4.0,
    neuroticism: 2.0
  },
  'balanced_medium': {
    openness: 3.0,
    conscientiousness: 3.0,
    extraversion: 3.0,
    agreeableness: 3.0,
    neuroticism: 3.0
  },
  'balanced_low': {
    openness: 2.0,
    conscientiousness: 2.0,
    extraversion: 2.0,
    agreeableness: 2.0,
    neuroticism: 4.0
  },

  // 極端なパターン
  'extreme_openness': {
    openness: 5.0,
    conscientiousness: 2.0,
    extraversion: 4.0,
    agreeableness: 3.0,
    neuroticism: 3.5
  },
  'extreme_conscientiousness': {
    openness: 2.0,
    conscientiousness: 5.0,
    extraversion: 2.5,
    agreeableness: 4.0,
    neuroticism: 2.0
  },
  'extreme_extraversion': {
    openness: 3.5,
    conscientiousness: 2.5,
    extraversion: 5.0,
    agreeableness: 3.5,
    neuroticism: 3.0
  },
  'extreme_agreeableness': {
    openness: 3.0,
    conscientiousness: 3.5,
    extraversion: 3.0,
    agreeableness: 5.0,
    neuroticism: 2.5
  },
  'extreme_neuroticism': {
    openness: 3.0,
    conscientiousness: 2.0,
    extraversion: 2.0,
    agreeableness: 3.0,
    neuroticism: 5.0
  }
}

export const PERSONALITY_COMPATIBILITY_MATRIX: Record<string, PersonalityCompatibility> = {
  // 高開放性の相性
  'high_openness-high_openness': {
    score: 90,
    analysis: '創造性と好奇心の共有',
    strengths: ['新しい体験への開放性', '創造的な活動', '深い議論'],
    challenges: ['現実的な問題への対処', '安定性の欠如'],
    advice: ['創造性を活かした活動を共有する', '現実的な問題も一緒に解決する']
  },
  'high_openness-low_openness': {
    score: 60,
    analysis: '創造性と安定性の対比',
    strengths: ['バランスの取れた関係', '相互補完'],
    challenges: ['価値観の違い', '活動の好みの違い'],
    advice: ['お互いの価値観を尊重する', '共通の活動を見つける']
  },

  // 高誠実性の相性
  'high_conscientiousness-high_conscientiousness': {
    score: 95,
    analysis: '責任感と計画性の共有',
    strengths: ['信頼できる関係', '目標の共有', '安定した関係'],
    challenges: ['柔軟性の欠如', '自発性の不足'],
    advice: ['計画性を活かした関係を築く', '時には柔軟性も大切にする']
  },
  'high_conscientiousness-low_conscientiousness': {
    score: 65,
    analysis: '責任感と自由の対比',
    strengths: ['相互補完', 'バランスの取れた関係'],
    challenges: ['価値観の違い', '生活スタイルの違い'],
    advice: ['お互いの価値観を理解する', 'バランスを取る努力をする']
  },

  // 高外向性の相性
  'high_extraversion-high_extraversion': {
    score: 85,
    analysis: '社交性とエネルギーの共有',
    strengths: ['活発な関係', '社交的な活動', 'エネルギーの共有'],
    challenges: ['静かな時間の不足', '深い議論の不足'],
    advice: ['活発な活動を共有する', '時には静かな時間も大切にする']
  },
  'high_extraversion-low_extraversion': {
    score: 70,
    analysis: '社交性と内向性の対比',
    strengths: ['相互補完', 'バランスの取れた関係'],
    challenges: ['エネルギーの違い', '活動の好みの違い'],
    advice: ['お互いのエネルギーレベルを理解する', 'バランスを取る努力をする']
  },

  // 高協調性の相性
  'high_agreeableness-high_agreeableness': {
    score: 90,
    analysis: '協調性と理解の共有',
    strengths: ['調和の取れた関係', '相互理解', '協力的な関係'],
    challenges: ['対立の回避', '決断力の不足'],
    advice: ['調和を大切にする', '時には対立も必要']
  },
  'high_agreeableness-low_agreeableness': {
    score: 75,
    analysis: '協調性と独立性の対比',
    strengths: ['相互補完', 'バランスの取れた関係'],
    challenges: ['価値観の違い', 'コミュニケーションの違い'],
    advice: ['お互いの価値観を理解する', 'コミュニケーションを大切にする']
  },

  // 低神経症傾向の相性
  'low_neuroticism-low_neuroticism': {
    score: 95,
    analysis: '感情の安定性の共有',
    strengths: ['安定した関係', '信頼できる関係', 'ストレス耐性'],
    challenges: ['感情表現の不足', 'スリルの不足'],
    advice: ['安定性を大切にする', '時には感情表現も大切にする']
  },
  'low_neuroticism-high_neuroticism': {
    score: 80,
    analysis: '安定性と感情の対比',
    strengths: ['相互補完', '感情の理解'],
    challenges: ['感情の起伏の違い', 'ストレス耐性の違い'],
    advice: ['お互いの感情を理解する', 'サポートし合う']
  }
}

/**
 * 性格特性プロファイルを特定
 */
export function identifyPersonalityProfile(answers: any): string {
  if (!answers || typeof answers !== 'object') return 'balanced_medium'
  
  const answerValues = Object.values(answers) as number[]
  if (answerValues.length !== 18) return 'balanced_medium'
  
  // ビッグファイブ特性を計算
  const personality = calculateBigFiveFromAnswers(answerValues)
  
  // 最も類似したプロファイルを検索
  return findMostSimilarPersonalityProfile(personality)
}

/**
 * 回答からビッグファイブ特性を計算
 */
function calculateBigFiveFromAnswers(answers: number[]): PersonalityProfile {
  // 質問の分類（18問を6つの特性に分類）
  const openness = (answers[0] + answers[1] + answers[2]) / 3
  const conscientiousness = (answers[3] + answers[4] + answers[5]) / 3
  const extraversion = (answers[6] + answers[7] + answers[8]) / 3
  const agreeableness = (answers[9] + answers[10] + answers[11]) / 3
  const neuroticism = (answers[12] + answers[13] + answers[14]) / 3
  
  return {
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    neuroticism
  }
}

/**
 * 最も類似した性格プロファイルを検索
 */
function findMostSimilarPersonalityProfile(personality: PersonalityProfile): string {
  let bestMatch = 'balanced_medium'
  let bestScore = 0
  
  for (const [profileName, template] of Object.entries(PERSONALITY_TEMPLATES)) {
    const similarity = calculatePersonalitySimilarity(personality, template)
    if (similarity > bestScore) {
      bestScore = similarity
      bestMatch = profileName
    }
  }
  
  return bestMatch
}

/**
 * 性格特性の類似度計算
 */
function calculatePersonalitySimilarity(personality1: PersonalityProfile, personality2: PersonalityProfile): number {
  const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism']
  let similarity = 0
  
  traits.forEach(trait => {
    const diff = Math.abs(personality1[trait] - personality2[trait])
    similarity += Math.max(0, 5 - diff)
  })
  
  return similarity / traits.length
}

/**
 * 性格特性の相性を取得
 */
export function getPersonalityCompatibility(maleProfile: string, femaleProfile: string): PersonalityCompatibility {
  const key = `${maleProfile}-${femaleProfile}`
  const reverseKey = `${femaleProfile}-${maleProfile}`
  
  return PERSONALITY_COMPATIBILITY_MATRIX[key] || 
         PERSONALITY_COMPATIBILITY_MATRIX[reverseKey] || 
         {
           score: 75,
           analysis: '一般的な相性',
           strengths: ['基本的な相性'],
           challenges: ['相互理解の深化'],
           advice: ['コミュニケーションを大切にする']
         }
}

/**
 * 性格特性の相性スコアのみを取得（高速化）
 */
export function getPersonalityScore(maleProfile: string, femaleProfile: string): number {
  const compatibility = getPersonalityCompatibility(maleProfile, femaleProfile)
  return compatibility.score
}
