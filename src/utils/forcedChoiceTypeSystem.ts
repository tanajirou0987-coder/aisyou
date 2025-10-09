import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// 2択ベースの超高速タイプ判定システム
export interface ForcedChoiceType {
  id: string
  name: string
  description: string
  traits: string[]
  score: number
}

// 2択ベースのタイプ分類（毎回ランダムに選択）
const FORCED_CHOICE_TYPE_SETS = [
  // セット1: 性格特性ベース
  [
    { id: 'openness_high', name: '探求者', description: '新しい体験と変化を求める', traits: ['開放性', '変化'], score: 0 },
    { id: 'openness_low', name: '安定者', description: '確実性と安定を重視する', traits: ['安定性', '確実性'], score: 0 },
    { id: 'extraversion_high', name: '社交家', description: '人との交流でエネルギーを得る', traits: ['外向性', '社交性'], score: 0 },
    { id: 'extraversion_low', name: '内省家', description: '一人の時間でエネルギーを回復する', traits: ['内向性', '内省'], score: 0 }
  ],
  
  // セット2: 価値観ベース
  [
    { id: 'work_focused', name: '仕事重視型', description: '仕事での成功を最優先する', traits: ['仕事', '達成'], score: 0 },
    { id: 'life_focused', name: '生活重視型', description: 'プライベートの充実を重視する', traits: ['生活', '充実'], score: 0 },
    { id: 'growth_focused', name: '成長志向型', description: '常に成長し続けることを目指す', traits: ['成長', '向上'], score: 0 },
    { id: 'stability_focused', name: '安定志向型', description: '現在の安定を維持することを重視する', traits: ['安定', '維持'], score: 0 }
  ],
  
  // セット3: コミュニケーションスタイル
  [
    { id: 'direct_communicator', name: '直接型', description: '率直で直接的なコミュニケーション', traits: ['直接性', '率直'], score: 0 },
    { id: 'caring_communicator', name: '配慮型', description: '相手を思いやる優しいコミュニケーション', traits: ['配慮', '優しさ'], score: 0 },
    { id: 'group_oriented', name: 'グループ型', description: 'グループでの活動を好む', traits: ['グループ', '協調'], score: 0 },
    { id: 'individual_oriented', name: '個人型', description: '一対一での深い交流を好む', traits: ['個人', '深さ'], score: 0 }
  ],
  
  // セット4: ライフスタイル
  [
    { id: 'adventure_seeker', name: '冒険家', description: '変化に富んだ冒険的な生活を好む', traits: ['冒険', '変化'], score: 0 },
    { id: 'stability_seeker', name: '安定家', description: '安定した予測可能な生活を好む', traits: ['安定', '予測'], score: 0 },
    { id: 'passionate_lover', name: '情熱家', description: '情熱的でドラマチックな関係を好む', traits: ['情熱', 'ドラマ'], score: 0 },
    { id: 'stable_lover', name: '安定愛好家', description: '安定した信頼関係を重視する', traits: ['安定', '信頼'], score: 0 }
  ]
]

// 研究に基づく2択相性テーブル
const FORCED_CHOICE_COMPATIBILITY = {
  // 性格特性ベースの相性
  0: {
    'openness_high': { 'openness_low': 60, 'extraversion_high': 80, 'extraversion_low': 70 },
    'openness_low': { 'openness_high': 60, 'extraversion_high': 70, 'extraversion_low': 85 },
    'extraversion_high': { 'openness_high': 80, 'openness_low': 70, 'extraversion_low': 65 },
    'extraversion_low': { 'openness_high': 70, 'openness_low': 85, 'extraversion_high': 65 }
  },
  
  // 価値観ベースの相性
  1: {
    'work_focused': { 'life_focused': 70, 'growth_focused': 90, 'stability_focused': 75 },
    'life_focused': { 'work_focused': 70, 'growth_focused': 75, 'stability_focused': 85 },
    'growth_focused': { 'work_focused': 90, 'life_focused': 75, 'stability_focused': 60 },
    'stability_focused': { 'work_focused': 75, 'life_focused': 85, 'growth_focused': 60 }
  },
  
  // コミュニケーションスタイルの相性
  2: {
    'direct_communicator': { 'caring_communicator': 80, 'group_oriented': 85, 'individual_oriented': 70 },
    'caring_communicator': { 'direct_communicator': 80, 'group_oriented': 75, 'individual_oriented': 90 },
    'group_oriented': { 'direct_communicator': 85, 'caring_communicator': 75, 'individual_oriented': 60 },
    'individual_oriented': { 'direct_communicator': 70, 'caring_communicator': 90, 'group_oriented': 60 }
  },
  
  // ライフスタイルの相性
  3: {
    'adventure_seeker': { 'stability_seeker': 65, 'passionate_lover': 90, 'stable_lover': 60 },
    'stability_seeker': { 'adventure_seeker': 65, 'passionate_lover': 60, 'stable_lover': 90 },
    'passionate_lover': { 'adventure_seeker': 90, 'stability_seeker': 60, 'stable_lover': 70 },
    'stable_lover': { 'adventure_seeker': 60, 'stability_seeker': 90, 'passionate_lover': 70 }
  }
}

// 現在のタイプセットを取得（毎回ランダム）
export function getCurrentForcedChoiceTypeSet(): ForcedChoiceType[] {
  const randomIndex = Math.floor(Math.random() * FORCED_CHOICE_TYPE_SETS.length)
  return FORCED_CHOICE_TYPE_SETS[randomIndex].map(type => ({ ...type }))
}

// 2択回答からタイプを判定（超高速）
export function determineForcedChoiceType(participant: Participant, typeSet: ForcedChoiceType[]): ForcedChoiceType {
  // 各タイプのスコアをリセット
  typeSet.forEach(type => type.score = 0)
  
  // 回答を分析してタイプスコアを計算
  participant.answers.forEach(answer => {
    const questionId = answer.questionId
    const value = answer.value
    
    // 質問IDと回答値に基づいてタイプスコアを更新
    updateTypeScores(typeSet, questionId, value)
  })
  
  // 最も高いスコアのタイプを返す
  return typeSet.reduce((max, current) => 
    current.score > max.score ? current : max
  )
}

// タイプスコアの更新（2択ベースの高速計算）
function updateTypeScores(typeSet: ForcedChoiceType[], questionId: string, value: number) {
  // 質問のカテゴリに基づいてスコアを更新
  if (questionId.includes('fc_1')) { // 開放性 vs 安定性
    if (value === 1) {
      typeSet.find(t => t.id === 'openness_high')?.score ? (typeSet.find(t => t.id === 'openness_high')!.score += 3) : null
    } else {
      typeSet.find(t => t.id === 'openness_low')?.score ? (typeSet.find(t => t.id === 'openness_low')!.score += 3) : null
    }
  }
  
  if (questionId.includes('fc_2')) { // 外向性 vs 内向性
    if (value === 1) {
      typeSet.find(t => t.id === 'extraversion_high')?.score ? (typeSet.find(t => t.id === 'extraversion_high')!.score += 3) : null
    } else {
      typeSet.find(t => t.id === 'extraversion_low')?.score ? (typeSet.find(t => t.id === 'extraversion_low')!.score += 3) : null
    }
  }
  
  if (questionId.includes('fc_6')) { // 仕事 vs プライベート
    if (value === 1) {
      typeSet.find(t => t.id === 'work_focused')?.score ? (typeSet.find(t => t.id === 'work_focused')!.score += 4) : null
    } else {
      typeSet.find(t => t.id === 'life_focused')?.score ? (typeSet.find(t => t.id === 'life_focused')!.score += 4) : null
    }
  }
  
  if (questionId.includes('fc_7')) { // 直接 vs 配慮
    if (value === 1) {
      typeSet.find(t => t.id === 'direct_communicator')?.score ? (typeSet.find(t => t.id === 'direct_communicator')!.score += 4) : null
    } else {
      typeSet.find(t => t.id === 'caring_communicator')?.score ? (typeSet.find(t => t.id === 'caring_communicator')!.score += 4) : null
    }
  }
  
  if (questionId.includes('fc_8')) { // 冒険 vs 安定
    if (value === 1) {
      typeSet.find(t => t.id === 'adventure_seeker')?.score ? (typeSet.find(t => t.id === 'adventure_seeker')!.score += 3) : null
    } else {
      typeSet.find(t => t.id === 'stability_seeker')?.score ? (typeSet.find(t => t.id === 'stability_seeker')!.score += 3) : null
    }
  }
  
  if (questionId.includes('fc_9')) { // 情熱 vs 安定
    if (value === 1) {
      typeSet.find(t => t.id === 'passionate_lover')?.score ? (typeSet.find(t => t.id === 'passionate_lover')!.score += 3) : null
    } else {
      typeSet.find(t => t.id === 'stable_lover')?.score ? (typeSet.find(t => t.id === 'stable_lover')!.score += 3) : null
    }
  }
  
  if (questionId.includes('fc_10')) { // 成長 vs 安定
    if (value === 1) {
      typeSet.find(t => t.id === 'growth_focused')?.score ? (typeSet.find(t => t.id === 'growth_focused')!.score += 3) : null
    } else {
      typeSet.find(t => t.id === 'stability_focused')?.score ? (typeSet.find(t => t.id === 'stability_focused')!.score += 3) : null
    }
  }
  
  if (questionId.includes('fc_13')) { // グループ vs 個人
    if (value === 1) {
      typeSet.find(t => t.id === 'group_oriented')?.score ? (typeSet.find(t => t.id === 'group_oriented')!.score += 3) : null
    } else {
      typeSet.find(t => t.id === 'individual_oriented')?.score ? (typeSet.find(t => t.id === 'individual_oriented')!.score += 3) : null
    }
  }
}

// 2択ベースの超高速相性計算
export function calculateForcedChoiceCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  // 現在のタイプセットを取得
  const currentTypeSet = getCurrentForcedChoiceTypeSet()
  const categoryIndex = FORCED_CHOICE_TYPE_SETS.findIndex(set => 
    set.some(type => currentTypeSet.some(t => t.id === type.id))
  )
  
  // 各参加者のタイプを判定（超高速）
  const participantTypes = participants.map(p => ({
    participant: p,
    type: determineForcedChoiceType(p, currentTypeSet)
  }))
  
  // 相性スコアを計算（参照テーブル使用で瞬時）
  for (let i = 0; i < participantTypes.length; i++) {
    for (let j = i + 1; j < participantTypes.length; j++) {
      const type1 = participantTypes[i].type
      const type2 = participantTypes[j].type
      
      // 相性テーブルからスコアを取得
      const compatibilityTable = FORCED_CHOICE_COMPATIBILITY[categoryIndex as keyof typeof FORCED_CHOICE_COMPATIBILITY]
      const baseScore = compatibilityTable[type1.id as keyof typeof compatibilityTable]?.[type2.id] || 50
      
      // ランダム要素を追加（±5の範囲で微調整）
      const randomOffset = Math.floor(Math.random() * 11) - 5
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
function calculateTraitCompatibility(type1: ForcedChoiceType, type2: ForcedChoiceType): number {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  const totalTraits = new Set([...type1.traits, ...type2.traits]).size
  
  return Math.round((commonTraits.length / totalTraits) * 100)
}

// 特性一致度の説明文
function getTraitCompatibilityDescription(type1: ForcedChoiceType, type2: ForcedChoiceType): string {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  
  if (commonTraits.length >= 2) return '多くの特性が一致している'
  if (commonTraits.length === 1) return '一部の特性が一致している'
  return '特性に違いがあるが、相補的'
}







