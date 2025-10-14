import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// 20タイプ判定ロジック
export function calculateTwentyTypeCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []

  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const participant1 = participants[i]
      const participant2 = participants[j]

      const compatibilityScore = calculatePairTwentyTypeCompatibility(participant1, participant2)
      scores.push(compatibilityScore)
    }
  }

  return scores.sort((a, b) => b.score - a.score)
}

function calculatePairTwentyTypeCompatibility(participant1: Participant, participant2: Participant): CompatibilityScore {
  // 各参加者のタイプを判定
  const type1 = determineTwentyType(participant1)
  const type2 = determineTwentyType(participant2)

  // タイプ間の相性を計算
  const compatibilityScore = calculateTypeCompatibility(type1, type2)

  const factors: CompatibilityFactor[] = [
    {
      category: '20タイプ相性',
      score: compatibilityScore,
      weight: 1,
      description: `${participant1.name}さんは${type1}タイプ、${participant2.name}さんは${type2}タイプです。`
    }
  ]

  return {
    participant1Id: participant1.id,
    participant2Id: participant2.id,
    score: compatibilityScore,
    factors
  }
}

// 20タイプ判定関数
function determineTwentyType(participant: Participant): string {
  // 各軸のスコアを計算
  const openness = calculateAxisScore(participant, '開放性')
  const extraversion = calculateAxisScore(participant, '外向性')
  const conscientiousness = calculateAxisScore(participant, '誠実性')
  const agreeableness = calculateAxisScore(participant, '協調性')
  const neuroticism = calculateAxisScore(participant, '神経症傾向')

  // 20タイプ判定ロジック
  if (openness >= 3 && extraversion >= 3 && conscientiousness >= 3 && agreeableness >= 3) {
    return 'adventurous_social_growth' // 冒険的社交家-成長志向
  } else if (openness >= 3 && extraversion >= 3 && conscientiousness < 3 && agreeableness < 3) {
    return 'adventurous_social_free' // 冒険的社交家-自由奔放
  } else if (openness >= 3 && extraversion < 3 && conscientiousness >= 3 && agreeableness < 3) {
    return 'introspective_perfectionist' // 内省的探求者-完璧主義
  } else if (openness >= 3 && extraversion < 3 && conscientiousness < 3 && agreeableness >= 3) {
    return 'introspective_caring' // 内省的探求者-思いやり深い
  } else if (openness < 3 && extraversion >= 3 && conscientiousness >= 3 && agreeableness >= 3) {
    return 'stable_social_responsible' // 安定した社交家-責任感強い
  } else if (openness < 3 && extraversion >= 3 && conscientiousness < 3 && agreeableness < 3) {
    return 'stable_social_individual' // 安定した社交家-個人主義
  } else if (openness < 3 && extraversion < 3 && conscientiousness >= 3 && agreeableness < 3) {
    return 'stable_introvert_cautious' // 安定した内省家-慎重
  } else if (openness < 3 && extraversion < 3 && conscientiousness < 3 && agreeableness >= 3) {
    return 'stable_introvert_cooperative' // 安定した内省家-協調的
  } else if (openness >= 3 && extraversion >= 3 && conscientiousness >= 3 && agreeableness < 3) {
    return 'passionate_leader' // 情熱的リーダー
  } else if (openness >= 3 && extraversion < 3 && conscientiousness < 3 && agreeableness >= 3) {
    return 'creative_cooperator' // 創造的協調者
  } else if (openness < 3 && extraversion >= 3 && conscientiousness >= 3 && agreeableness < 3) {
    return 'practical_social' // 実務的社交家
  } else if (openness < 3 && extraversion < 3 && conscientiousness < 3 && agreeableness >= 3) {
    return 'gentle_introvert' // 穏やかな内省家
  } else if (openness >= 3 && extraversion < 3 && conscientiousness >= 3 && agreeableness >= 3) {
    return 'adventurous_perfectionist' // 冒険的完璧主義者
  } else if (openness >= 3 && extraversion >= 3 && conscientiousness < 3 && agreeableness >= 3) {
    return 'social_free_spirit' // 社交的自由人
  } else if (openness < 3 && extraversion >= 3 && conscientiousness < 3 && agreeableness >= 3) {
    return 'stable_practical' // 安定した実務家
  } else if (openness >= 3 && extraversion < 3 && conscientiousness < 3 && agreeableness < 3) {
    return 'introspective_idealist' // 内省的な理想主義者
  } else if (neuroticism < 2 && openness >= 3) {
    return 'passionate_adventurer' // 情熱的な冒険家
  } else if (neuroticism < 2 && openness < 3) {
    return 'stable_realist' // 安定した現実主義者
  } else if (neuroticism >= 3 && openness >= 3) {
    return 'sensitive_artist' // 敏感な芸術家
  } else if (neuroticism >= 3 && openness < 3) {
    return 'cautious_stabilizer' // 慎重な安定家
  } else {
    // デフォルトタイプ
    return 'stable_introvert_cooperative'
  }
}

// 軸のスコア計算
function calculateAxisScore(participant: Participant, category: string): number {
  const answers = participant.answers.filter(a => {
    // 質問IDからカテゴリを判定
    if (category === '開放性' && a.questionId.startsWith('open_')) return true
    if (category === '外向性' && a.questionId.startsWith('extra_')) return true
    if (category === '誠実性' && a.questionId.startsWith('cons_')) return true
    if (category === '協調性' && a.questionId.startsWith('agree_')) return true
    if (category === '神経症傾向' && a.questionId.startsWith('neuro_')) return true
    return false
  })

  if (answers.length === 0) return 2.5 // デフォルト値

  const totalScore = answers.reduce((sum, answer) => sum + answer.value, 0)
  return totalScore / answers.length
}

// タイプ間の相性計算
function calculateTypeCompatibility(type1: string, type2: string): number {
  // 20タイプ間の相性マトリックス
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    'adventurous_social_growth': {
      'introspective_caring': 88, 'stable_social_responsible': 85, 'passionate_leader': 90,
      'creative_cooperator': 85, 'adventurous_perfectionist': 92, 'social_free_spirit': 88,
      'passionate_adventurer': 95, 'sensitive_artist': 80
    },
    'introspective_caring': {
      'adventurous_social_growth': 88, 'stable_introvert_cooperative': 90, 'creative_cooperator': 92,
      'gentle_introvert': 88, 'adventurous_perfectionist': 85, 'introspective_idealist': 90,
      'passionate_adventurer': 85, 'sensitive_artist': 95
    },
    'stable_social_responsible': {
      'adventurous_social_growth': 85, 'stable_introvert_cooperative': 92, 'practical_social': 88,
      'gentle_introvert': 85, 'stable_practical': 90, 'stable_realist': 88
    },
    'passionate_leader': {
      'adventurous_social_growth': 90, 'creative_cooperator': 85, 'practical_social': 88,
      'social_free_spirit': 85, 'passionate_adventurer': 92, 'cautious_stabilizer': 75
    },
    'creative_cooperator': {
      'introspective_caring': 92, 'passionate_leader': 85, 'gentle_introvert': 88,
      'adventurous_perfectionist': 85, 'introspective_idealist': 90, 'sensitive_artist': 88
    },
    'stable_introvert_cooperative': {
      'introspective_caring': 90, 'stable_social_responsible': 92, 'gentle_introvert': 95,
      'stable_practical': 88, 'stable_realist': 90, 'cautious_stabilizer': 85
    },
    'passionate_adventurer': {
      'adventurous_social_growth': 95, 'introspective_caring': 85, 'passionate_leader': 92,
      'social_free_spirit': 90, 'sensitive_artist': 80, 'stable_realist': 75
    },
    'sensitive_artist': {
      'introspective_caring': 95, 'creative_cooperator': 88, 'gentle_introvert': 90,
      'introspective_idealist': 92, 'passionate_adventurer': 80, 'cautious_stabilizer': 85
    },
    'stable_realist': {
      'stable_social_responsible': 88, 'stable_introvert_cooperative': 90, 'stable_practical': 92,
      'passionate_adventurer': 75, 'cautious_stabilizer': 88
    },
    'cautious_stabilizer': {
      'stable_introvert_cooperative': 85, 'passionate_leader': 75, 'passionate_adventurer': 80,
      'sensitive_artist': 85, 'stable_realist': 88
    }
  }

  // 相性スコアを取得（双方向で検索）
  const score = compatibilityMatrix[type1]?.[type2] || 
                compatibilityMatrix[type2]?.[type1] || 
                75 // デフォルトスコア

  return score
}

// タイプ名を日本語に変換
export function getTypeName(typeId: string): string {
  const typeNames: { [key: string]: string } = {
    'adventurous_social_growth': '冒険的社交家-成長志向',
    'adventurous_social_free': '冒険的社交家-自由奔放',
    'introspective_perfectionist': '内省的探求者-完璧主義',
    'introspective_caring': '内省的探求者-思いやり深い',
    'stable_social_responsible': '安定した社交家-責任感強い',
    'stable_social_individual': '安定した社交家-個人主義',
    'stable_introvert_cautious': '安定した内省家-慎重',
    'stable_introvert_cooperative': '安定した内省家-協調的',
    'passionate_leader': '情熱的リーダー',
    'creative_cooperator': '創造的協調者',
    'practical_social': '実務的社交家',
    'gentle_introvert': '穏やかな内省家',
    'adventurous_perfectionist': '冒険的完璧主義者',
    'social_free_spirit': '社交的自由人',
    'stable_practical': '安定した実務家',
    'introspective_idealist': '内省的な理想主義者',
    'passionate_adventurer': '情熱的な冒険家',
    'stable_realist': '安定した現実主義者',
    'sensitive_artist': '敏感な芸術家',
    'cautious_stabilizer': '慎重な安定家'
  }

  return typeNames[typeId] || '未知のタイプ'
}







