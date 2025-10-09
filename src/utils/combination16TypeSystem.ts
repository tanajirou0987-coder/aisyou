import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// 16タイプ組み合わせシステム
export interface Combination16Type {
  id: string
  name: string
  description: string
  axis1: string
  axis2: string
  traits: string[]
}

// 4つの軸の定義
const AXES = {
  // 軸1: 開放性 vs 安定性
  openness: {
    high: { name: '探求者', traits: ['開放性', '変化', '新しさ'] },
    low: { name: '安定者', traits: ['安定性', '確実性', '伝統'] }
  },
  
  // 軸2: 外向性 vs 内向性
  extraversion: {
    high: { name: '社交家', traits: ['外向性', '社交性', '交流'] },
    low: { name: '内省家', traits: ['内向性', '内省', '一人時間'] }
  },
  
  // 軸3: 価値観: 仕事 vs 生活
  values: {
    work: { name: '仕事重視', traits: ['仕事', '達成', '成功'] },
    life: { name: '生活重視', traits: ['生活', '充実', '楽しみ'] }
  },
  
  // 軸4: コミュニケーション: 直接 vs 配慮
  communication: {
    direct: { name: '直接型', traits: ['直接性', '率直', '明確'] },
    caring: { name: '配慮型', traits: ['配慮', '優しさ', '思いやり'] }
  }
}

// 16タイプの組み合わせ定義
const COMBINATION_16_TYPES: Combination16Type[] = [
  // 探求者 × 社交家
  { id: 'explorer_social', name: '冒険的社交家', description: '新しい体験を求めて人と交流する', axis1: '探求者', axis2: '社交家', traits: ['開放性', '外向性', '冒険', '社交'] },
  { id: 'explorer_introvert', name: '内省的探求者', description: '一人で新しい体験を探求する', axis1: '探求者', axis2: '内省家', traits: ['開放性', '内向性', '探求', '内省'] },
  { id: 'stabilizer_social', name: '安定した社交家', description: '確実な方法で人と交流する', axis1: '安定者', axis2: '社交家', traits: ['安定性', '外向性', '安定', '社交'] },
  { id: 'stabilizer_introvert', name: '安定した内省家', description: '一人で安定した生活を送る', axis1: '安定者', axis2: '内省家', traits: ['安定性', '内向性', '安定', '内省'] },
  
  // 仕事重視 × 成長/安定
  { id: 'work_growth', name: '成長志向の仕事人', description: '仕事で常に成長を目指す', axis1: '仕事重視', axis2: '成長志向', traits: ['仕事', '成長', '向上', '達成'] },
  { id: 'work_stability', name: '安定志向の仕事人', description: '仕事で安定を重視する', axis1: '仕事重視', axis2: '安定志向', traits: ['仕事', '安定', '維持', '確実'] },
  { id: 'life_growth', name: '成長志向の生活人', description: '生活で成長を求める', axis1: '生活重視', axis2: '成長志向', traits: ['生活', '成長', '充実', '向上'] },
  { id: 'life_stability', name: '安定志向の生活人', description: '生活で安定を重視する', axis1: '生活重視', axis2: '安定志向', traits: ['生活', '安定', '維持', '充実'] },
  
  // 直接型 × グループ/個人
  { id: 'direct_group', name: '率直なグループリーダー', description: 'グループで率直に意見を述べる', axis1: '直接型', axis2: 'グループ型', traits: ['直接性', 'グループ', 'リーダーシップ', '率直'] },
  { id: 'direct_individual', name: '率直な個人主義者', description: '一対一で率直にコミュニケーション', axis1: '直接型', axis2: '個人型', traits: ['直接性', '個人', '率直', '明確'] },
  { id: 'caring_group', name: '思いやりのある協調者', description: 'グループで思いやりを持って協調', axis1: '配慮型', axis2: 'グループ型', traits: ['配慮', 'グループ', '協調', '思いやり'] },
  { id: 'caring_individual', name: '思いやりのある個人主義者', description: '一対一で思いやりのあるコミュニケーション', axis1: '配慮型', axis2: '個人型', traits: ['配慮', '個人', '思いやり', '深さ'] },
  
  // 冒険家 × 情熱/安定
  { id: 'adventure_passion', name: '情熱的な冒険家', description: '情熱的に新しい冒険を求める', axis1: '冒険家', axis2: '情熱家', traits: ['冒険', '情熱', '変化', 'ドラマ'] },
  { id: 'adventure_stable', name: '安定した冒険家', description: '計画的に新しい体験を求める', axis1: '冒険家', axis2: '安定愛好家', traits: ['冒険', '安定', '計画', '体験'] },
  { id: 'stable_passion', name: '情熱的な安定家', description: '安定した関係で情熱を表現', axis1: '安定家', axis2: '情熱家', traits: ['安定', '情熱', '信頼', '表現'] },
  { id: 'stable_stable', name: '完全な安定家', description: '安定した関係を大切にする', axis1: '安定家', axis2: '安定愛好家', traits: ['安定', '信頼', '維持', '確実'] }
]

// 16タイプの相性テーブル（研究に基づく）
const COMBINATION_16_COMPATIBILITY: { [key: string]: { [key: string]: number } } = {
  // 探求者系
  'explorer_social': {
    'explorer_introvert': 85, 'stabilizer_social': 70, 'stabilizer_introvert': 60,
    'work_growth': 90, 'work_stability': 65, 'life_growth': 85, 'life_stability': 60,
    'direct_group': 85, 'direct_individual': 75, 'caring_group': 80, 'caring_individual': 70,
    'adventure_passion': 95, 'adventure_stable': 80, 'stable_passion': 70, 'stable_stable': 55
  },
  'explorer_introvert': {
    'explorer_social': 85, 'stabilizer_social': 60, 'stabilizer_introvert': 70,
    'work_growth': 80, 'work_stability': 55, 'life_growth': 90, 'life_stability': 65,
    'direct_group': 70, 'direct_individual': 85, 'caring_group': 75, 'caring_individual': 90,
    'adventure_passion': 85, 'adventure_stable': 90, 'stable_passion': 60, 'stable_stable': 50
  },
  'stabilizer_social': {
    'explorer_social': 70, 'explorer_introvert': 60, 'stabilizer_introvert': 80,
    'work_growth': 75, 'work_stability': 90, 'life_growth': 70, 'life_stability': 85,
    'direct_group': 80, 'direct_individual': 70, 'caring_group': 85, 'caring_individual': 75,
    'adventure_passion': 60, 'adventure_stable': 75, 'stable_passion': 80, 'stable_stable': 90
  },
  'stabilizer_introvert': {
    'explorer_social': 60, 'explorer_introvert': 70, 'stabilizer_social': 80,
    'work_growth': 70, 'work_stability': 85, 'life_growth': 75, 'life_stability': 90,
    'direct_group': 70, 'direct_individual': 80, 'caring_group': 80, 'caring_individual': 85,
    'adventure_passion': 50, 'adventure_stable': 70, 'stable_passion': 75, 'stable_stable': 95
  },
  
  // 仕事重視系
  'work_growth': {
    'explorer_social': 90, 'explorer_introvert': 80, 'stabilizer_social': 75, 'stabilizer_introvert': 70,
    'work_stability': 75, 'life_growth': 85, 'life_stability': 60,
    'direct_group': 90, 'direct_individual': 85, 'caring_group': 75, 'caring_individual': 70,
    'adventure_passion': 85, 'adventure_stable': 80, 'stable_passion': 70, 'stable_stable': 60
  },
  'work_stability': {
    'explorer_social': 65, 'explorer_introvert': 55, 'stabilizer_social': 90, 'stabilizer_introvert': 85,
    'work_growth': 75, 'life_growth': 70, 'life_stability': 80,
    'direct_group': 80, 'direct_individual': 75, 'caring_group': 85, 'caring_individual': 80,
    'adventure_passion': 60, 'adventure_stable': 75, 'stable_passion': 80, 'stable_stable': 90
  },
  'life_growth': {
    'explorer_social': 85, 'explorer_introvert': 90, 'stabilizer_social': 70, 'stabilizer_introvert': 75,
    'work_growth': 85, 'work_stability': 70, 'life_stability': 75,
    'direct_group': 75, 'direct_individual': 80, 'caring_group': 80, 'caring_individual': 85,
    'adventure_passion': 90, 'adventure_stable': 85, 'stable_passion': 75, 'stable_stable': 65
  },
  'life_stability': {
    'explorer_social': 60, 'explorer_introvert': 65, 'stabilizer_social': 85, 'stabilizer_introvert': 90,
    'work_growth': 60, 'work_stability': 80, 'life_growth': 75,
    'direct_group': 70, 'direct_individual': 75, 'caring_group': 85, 'caring_individual': 90,
    'adventure_passion': 65, 'adventure_stable': 80, 'stable_passion': 85, 'stable_stable': 95
  },
  
  // 直接型系
  'direct_group': {
    'explorer_social': 85, 'explorer_introvert': 70, 'stabilizer_social': 80, 'stabilizer_introvert': 70,
    'work_growth': 90, 'work_stability': 80, 'life_growth': 75, 'life_stability': 70,
    'direct_individual': 80, 'caring_group': 75, 'caring_individual': 65,
    'adventure_passion': 80, 'adventure_stable': 75, 'stable_passion': 70, 'stable_stable': 65
  },
  'direct_individual': {
    'explorer_social': 75, 'explorer_introvert': 85, 'stabilizer_social': 70, 'stabilizer_introvert': 80,
    'work_growth': 85, 'work_stability': 75, 'life_growth': 80, 'life_stability': 75,
    'direct_group': 80, 'caring_group': 70, 'caring_individual': 80,
    'adventure_passion': 75, 'adventure_stable': 80, 'stable_passion': 70, 'stable_stable': 65
  },
  'caring_group': {
    'explorer_social': 80, 'explorer_introvert': 75, 'stabilizer_social': 85, 'stabilizer_introvert': 80,
    'work_growth': 75, 'work_stability': 85, 'life_growth': 80, 'life_stability': 85,
    'direct_group': 75, 'direct_individual': 70, 'caring_individual': 85,
    'adventure_passion': 75, 'adventure_stable': 80, 'stable_passion': 85, 'stable_stable': 90
  },
  'caring_individual': {
    'explorer_social': 70, 'explorer_introvert': 90, 'stabilizer_social': 75, 'stabilizer_introvert': 85,
    'work_growth': 70, 'work_stability': 80, 'life_growth': 85, 'life_stability': 90,
    'direct_group': 65, 'direct_individual': 80, 'caring_group': 85,
    'adventure_passion': 70, 'adventure_stable': 80, 'stable_passion': 80, 'stable_stable': 85
  },
  
  // 冒険家系
  'adventure_passion': {
    'explorer_social': 95, 'explorer_introvert': 85, 'stabilizer_social': 60, 'stabilizer_introvert': 50,
    'work_growth': 85, 'work_stability': 60, 'life_growth': 90, 'life_stability': 65,
    'direct_group': 80, 'direct_individual': 75, 'caring_group': 75, 'caring_individual': 70,
    'adventure_stable': 85, 'stable_passion': 80, 'stable_stable': 60
  },
  'adventure_stable': {
    'explorer_social': 80, 'explorer_introvert': 90, 'stabilizer_social': 75, 'stabilizer_introvert': 70,
    'work_growth': 80, 'work_stability': 75, 'life_growth': 85, 'life_stability': 80,
    'direct_group': 75, 'direct_individual': 80, 'caring_group': 80, 'caring_individual': 80,
    'adventure_passion': 85, 'stable_passion': 75, 'stable_stable': 70
  },
  'stable_passion': {
    'explorer_social': 70, 'explorer_introvert': 60, 'stabilizer_social': 80, 'stabilizer_introvert': 75,
    'work_growth': 70, 'work_stability': 80, 'life_growth': 75, 'life_stability': 85,
    'direct_group': 70, 'direct_individual': 70, 'caring_group': 85, 'caring_individual': 80,
    'adventure_passion': 80, 'adventure_stable': 75, 'stable_stable': 90
  },
  'stable_stable': {
    'explorer_social': 55, 'explorer_introvert': 50, 'stabilizer_social': 90, 'stabilizer_introvert': 95,
    'work_growth': 60, 'work_stability': 90, 'life_growth': 65, 'life_stability': 95,
    'direct_group': 65, 'direct_individual': 65, 'caring_group': 90, 'caring_individual': 85,
    'adventure_passion': 60, 'adventure_stable': 70, 'stable_passion': 90
  }
}

// 参加者の16タイプを判定
export function determineCombination16Type(participant: Participant): Combination16Type {
  const answers = participant.answers
  
  // 各軸のスコアを計算
  const axisScores = {
    openness: calculateAxisScore(answers, 'openness'),
    extraversion: calculateAxisScore(answers, 'extraversion'),
    values: calculateAxisScore(answers, 'values'),
    communication: calculateAxisScore(answers, 'communication')
  }
  
  // 軸の組み合わせからタイプを決定
  const typeId = determineTypeFromAxes(axisScores)
  
  return COMBINATION_16_TYPES.find(type => type.id === typeId) || COMBINATION_16_TYPES[0]
}

// 軸のスコア計算
function calculateAxisScore(answers: any[], axis: string): 'high' | 'low' {
  let score = 0
  let count = 0
  
  answers.forEach(answer => {
    const questionId = answer.questionId
    
    // 各軸に関連する質問を判定
    if (axis === 'openness' && (questionId.includes('fc_1') || questionId.includes('fc_8'))) {
      score += answer.value === 1 ? 1 : 0
      count++
    }
    if (axis === 'extraversion' && (questionId.includes('fc_2') || questionId.includes('fc_11'))) {
      score += answer.value === 1 ? 1 : 0
      count++
    }
    if (axis === 'values' && (questionId.includes('fc_6') || questionId.includes('fc_10'))) {
      score += answer.value === 1 ? 1 : 0
      count++
    }
    if (axis === 'communication' && (questionId.includes('fc_7') || questionId.includes('fc_15'))) {
      score += answer.value === 1 ? 1 : 0
      count++
    }
  })
  
  return count > 0 && score / count > 0.5 ? 'high' : 'low'
}

// 軸の組み合わせからタイプIDを決定
function determineTypeFromAxes(axisScores: any): string {
  const openness = axisScores.openness === 'high' ? 'explorer' : 'stabilizer'
  const extraversion = axisScores.extraversion === 'high' ? 'social' : 'introvert'
  const values = axisScores.values === 'high' ? 'work' : 'life'
  const communication = axisScores.communication === 'high' ? 'direct' : 'caring'
  
  // 組み合わせパターンに基づいてタイプを決定
  if (openness === 'explorer' && extraversion === 'social') return 'explorer_social'
  if (openness === 'explorer' && extraversion === 'introvert') return 'explorer_introvert'
  if (openness === 'stabilizer' && extraversion === 'social') return 'stabilizer_social'
  if (openness === 'stabilizer' && extraversion === 'introvert') return 'stabilizer_introvert'
  
  if (values === 'work' && axisScores.values === 'high') return 'work_growth'
  if (values === 'work' && axisScores.values === 'low') return 'work_stability'
  if (values === 'life' && axisScores.values === 'high') return 'life_growth'
  if (values === 'life' && axisScores.values === 'low') return 'life_stability'
  
  if (communication === 'direct' && extraversion === 'high') return 'direct_group'
  if (communication === 'direct' && extraversion === 'low') return 'direct_individual'
  if (communication === 'caring' && extraversion === 'high') return 'caring_group'
  if (communication === 'caring' && extraversion === 'low') return 'caring_individual'
  
  // デフォルト
  return 'explorer_social'
}

// 16タイプ組み合わせシステムによる相性計算
export function calculateCombination16Compatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  // 各参加者の16タイプを判定
  const participantTypes = participants.map(p => ({
    participant: p,
    type: determineCombination16Type(p)
  }))
  
  // 相性スコアを計算
  for (let i = 0; i < participantTypes.length; i++) {
    for (let j = i + 1; j < participantTypes.length; j++) {
      const type1 = participantTypes[i].type
      const type2 = participantTypes[j].type
      
      // 相性テーブルからスコアを取得
      const baseScore = COMBINATION_16_COMPATIBILITY[type1.id]?.[type2.id] || 50
      
      // ランダム要素を追加（±3の範囲で微調整）
      const randomOffset = Math.floor(Math.random() * 7) - 3
      const finalScore = Math.max(0, Math.min(100, baseScore + randomOffset))
      
      // 相性要因を生成
      const factors: CompatibilityFactor[] = [
        {
          category: '16タイプ相性',
          score: finalScore,
          weight: 1,
          description: `${type1.name} × ${type2.name}の相性`
        },
        {
          category: '軸の一致度',
          score: calculateAxisCompatibility(type1, type2),
          weight: 1,
          description: getAxisCompatibilityDescription(type1, type2)
        }
      ]
      
      scores.push({
        participant1Id: participantTypes[i].participant.id,
        participant2Id: participantTypes[j].participant.id,
        score: finalScore,
        factors
      })
    }
  }
  
  return scores.sort((a, b) => b.score - a.score)
}

// 軸の一致度計算
function calculateAxisCompatibility(type1: Combination16Type, type2: Combination16Type): number {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  const totalTraits = new Set([...type1.traits, ...type2.traits]).size
  
  return Math.round((commonTraits.length / totalTraits) * 100)
}

// 軸一致度の説明文
function getAxisCompatibilityDescription(type1: Combination16Type, type2: Combination16Type): string {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  
  if (commonTraits.length >= 3) return '多くの軸が一致している'
  if (commonTraits.length === 2) return '一部の軸が一致している'
  if (commonTraits.length === 1) return '軸に違いがあるが、相補的'
  return '軸が異なるが、バランスが取れている'
}







