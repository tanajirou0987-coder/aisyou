import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// 研究に基づく動的タイプ分類システム
export interface PersonalityType {
  id: string
  name: string
  description: string
  traits: string[]
}

// 複数のタイプ分類セット（毎回ランダムに選択）
const TYPE_CATEGORIES = [
  // セット1: 価値観重視分類
  [
    { id: 'value_leader', name: '価値観リーダー', description: '明確な価値観を持ち、それを大切にする', traits: ['価値観', 'リーダーシップ'] },
    { id: 'value_follower', name: '価値観フォロワー', description: '他者の価値観を尊重し、調和を重視する', traits: ['価値観', '協調性'] },
    { id: 'value_explorer', name: '価値観探求者', description: '新しい価値観を探求し、柔軟性を持つ', traits: ['価値観', '開放性'] },
    { id: 'value_stabilizer', name: '価値観安定者', description: '伝統的な価値観を大切にし、安定を求める', traits: ['価値観', '安定性'] }
  ],
  
  // セット2: コミュニケーション重視分類
  [
    { id: 'comm_direct', name: '直接型', description: '率直で直接的なコミュニケーションを好む', traits: ['コミュニケーション', '率直性'] },
    { id: 'comm_gentle', name: '優しい型', description: '相手を思いやる優しいコミュニケーション', traits: ['コミュニケーション', '優しさ'] },
    { id: 'comm_analytical', name: '分析型', description: '論理的で分析的なコミュニケーション', traits: ['コミュニケーション', '論理性'] },
    { id: 'comm_emotional', name: '感情型', description: '感情を重視したコミュニケーション', traits: ['コミュニケーション', '感情性'] }
  ],
  
  // セット3: ライフスタイル重視分類
  [
    { id: 'life_adventurer', name: '冒険家', description: '新しい体験や冒険を求める', traits: ['ライフスタイル', '冒険心'] },
    { id: 'life_planner', name: '計画者', description: '計画的で秩序立った生活を好む', traits: ['ライフスタイル', '計画性'] },
    { id: 'life_social', name: '社交家', description: '人との交流を重視する', traits: ['ライフスタイル', '社交性'] },
    { id: 'life_individual', name: '個人主義者', description: '個人の時間や空間を大切にする', traits: ['ライフスタイル', '独立性'] }
  ],
  
  // セット4: 性格特性重視分類
  [
    { id: 'personality_optimist', name: '楽観主義者', description: '前向きで楽観的な性格', traits: ['性格', '楽観性'] },
    { id: 'personality_realist', name: '現実主義者', description: '現実的で冷静な判断をする', traits: ['性格', '現実性'] },
    { id: 'personality_idealist', name: '理想主義者', description: '理想を追求し、完璧を求める', traits: ['性格', '理想性'] },
    { id: 'personality_pragmatist', name: '実用主義者', description: '実用的で効率的なアプローチ', traits: ['性格', '実用性'] }
  ]
]

// 研究に基づく相性テーブル（各セットごと）
const COMPATIBILITY_TABLES = {
  // 価値観重視分類の相性
  0: {
    'value_leader': { 'value_follower': 90, 'value_explorer': 75, 'value_stabilizer': 60 },
    'value_follower': { 'value_leader': 90, 'value_stabilizer': 85, 'value_explorer': 70 },
    'value_explorer': { 'value_leader': 75, 'value_follower': 70, 'value_stabilizer': 50 },
    'value_stabilizer': { 'value_leader': 60, 'value_follower': 85, 'value_explorer': 50 }
  },
  
  // コミュニケーション重視分類の相性
  1: {
    'comm_direct': { 'comm_gentle': 80, 'comm_analytical': 85, 'comm_emotional': 60 },
    'comm_gentle': { 'comm_direct': 80, 'comm_emotional': 90, 'comm_analytical': 70 },
    'comm_analytical': { 'comm_direct': 85, 'comm_gentle': 70, 'comm_emotional': 65 },
    'comm_emotional': { 'comm_direct': 60, 'comm_gentle': 90, 'comm_analytical': 65 }
  },
  
  // ライフスタイル重視分類の相性
  2: {
    'life_adventurer': { 'life_planner': 70, 'life_social': 85, 'life_individual': 60 },
    'life_planner': { 'life_adventurer': 70, 'life_individual': 80, 'life_social': 75 },
    'life_social': { 'life_adventurer': 85, 'life_planner': 75, 'life_individual': 50 },
    'life_individual': { 'life_adventurer': 60, 'life_planner': 80, 'life_social': 50 }
  },
  
  // 性格特性重視分類の相性
  3: {
    'personality_optimist': { 'personality_realist': 75, 'personality_idealist': 85, 'personality_pragmatist': 70 },
    'personality_realist': { 'personality_optimist': 75, 'personality_pragmatist': 90, 'personality_idealist': 60 },
    'personality_idealist': { 'personality_optimist': 85, 'personality_realist': 60, 'personality_pragmatist': 65 },
    'personality_pragmatist': { 'personality_optimist': 70, 'personality_realist': 90, 'personality_idealist': 65 }
  }
}

// 現在のタイプ分類セットを取得（毎回ランダム）
export function getCurrentTypeCategory(): PersonalityType[] {
  const randomIndex = Math.floor(Math.random() * TYPE_CATEGORIES.length)
  return TYPE_CATEGORIES[randomIndex]
}

// 参加者のタイプを判定
export function determinePersonalityType(participant: Participant, typeCategory: PersonalityType[]): PersonalityType {
  const answers = participant.answers
  
  // 各タイプのスコアを計算
  const typeScores = typeCategory.map(type => ({
    type,
    score: calculateTypeScore(answers, type)
  }))
  
  // 最も高いスコアのタイプを返す
  return typeScores.reduce((max, current) => 
    current.score > max.score ? current : max
  ).type
}

// タイプスコアの計算
function calculateTypeScore(answers: any[], type: PersonalityType): number {
  let score = 0
  let count = 0
  
  answers.forEach(answer => {
    // 質問IDからタイプに関連する回答を判定
    const questionId = answer.questionId
    
    // 各タイプの特性に基づいてスコアを計算
    if (type.traits.some(trait => questionId.includes(trait.toLowerCase()))) {
      score += answer.value
      count++
    }
    
    // 特定の質問パターンでのスコア調整
    if (type.id.includes('leader') && answer.value >= 3) score += 2
    if (type.id.includes('follower') && answer.value <= 2) score += 2
    if (type.id.includes('explorer') && answer.value >= 3) score += 2
    if (type.id.includes('stabilizer') && answer.value <= 2) score += 2
  })
  
  return count > 0 ? score / count : 0
}

// 動的タイプシステムによる相性計算
export function calculateDynamicTypeCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  // 現在のタイプ分類を取得
  const currentTypeCategory = getCurrentTypeCategory()
  const categoryIndex = TYPE_CATEGORIES.indexOf(currentTypeCategory)
  
  // 各参加者のタイプを判定
  const participantTypes = participants.map(p => ({
    participant: p,
    type: determinePersonalityType(p, currentTypeCategory)
  }))
  
  // 相性スコアを計算
  for (let i = 0; i < participantTypes.length; i++) {
    for (let j = i + 1; j < participantTypes.length; j++) {
      const type1 = participantTypes[i].type
      const type2 = participantTypes[j].type
      
      // 相性テーブルからスコアを取得
      const compatibilityTable = COMPATIBILITY_TABLES[categoryIndex as keyof typeof COMPATIBILITY_TABLES]
      const baseScore = compatibilityTable[type1.id as keyof typeof compatibilityTable]?.[type2.id] || 50
      
      // ランダム要素を追加（±10の範囲）
      const randomOffset = Math.floor(Math.random() * 21) - 10
      const finalScore = Math.max(0, Math.min(100, baseScore + randomOffset))
      
      // 相性要因を生成
      const factors: CompatibilityFactor[] = [
        {
          category: 'タイプ相性',
          score: finalScore,
          weight: 1,
          description: `${type1.name} × ${type2.name}の相性`
        },
        {
          category: '特性の一致度',
          score: calculateTraitCompatibility(type1, type2),
          weight: 1,
          description: getTraitCompatibilityDescription(type1, type2)
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

// 特性の一致度計算
function calculateTraitCompatibility(type1: PersonalityType, type2: PersonalityType): number {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  const totalTraits = new Set([...type1.traits, ...type2.traits]).size
  
  return Math.round((commonTraits.length / totalTraits) * 100)
}

// 特性一致度の説明文
function getTraitCompatibilityDescription(type1: PersonalityType, type2: PersonalityType): string {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  
  if (commonTraits.length >= 2) return '多くの特性が一致している'
  if (commonTraits.length === 1) return '一部の特性が一致している'
  return '特性に違いがあるが、相補的'
}







