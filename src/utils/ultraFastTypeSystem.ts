import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// 超高速タイプシステム（完全なテーブル参照）
export interface UltraFastType {
  id: string
  name: string
  description: string
  traits: string[]
}

// 16タイプの定義
const ULTRA_FAST_TYPES: UltraFastType[] = [
  { id: 'type1', name: '冒険的社交家', description: '新しい体験を求めて人と交流する', traits: ['開放性', '外向性', '冒険', '社交'] },
  { id: 'type2', name: '内省的探求者', description: '一人で新しい体験を探求する', traits: ['開放性', '内向性', '探求', '内省'] },
  { id: 'type3', name: '安定した社交家', description: '確実な方法で人と交流する', traits: ['安定性', '外向性', '安定', '社交'] },
  { id: 'type4', name: '安定した内省家', description: '一人で安定した生活を送る', traits: ['安定性', '内向性', '安定', '内省'] },
  { id: 'type5', name: '成長志向の仕事人', description: '仕事で常に成長を目指す', traits: ['仕事', '成長', '向上', '達成'] },
  { id: 'type6', name: '安定志向の仕事人', description: '仕事で安定を重視する', traits: ['仕事', '安定', '維持', '確実'] },
  { id: 'type7', name: '成長志向の生活人', description: '生活で成長を求める', traits: ['生活', '成長', '充実', '向上'] },
  { id: 'type8', name: '安定志向の生活人', description: '生活で安定を重視する', traits: ['生活', '安定', '維持', '充実'] },
  { id: 'type9', name: '率直なグループリーダー', description: 'グループで率直に意見を述べる', traits: ['直接性', 'グループ', 'リーダーシップ', '率直'] },
  { id: 'type10', name: '率直な個人主義者', description: '一対一で率直にコミュニケーション', traits: ['直接性', '個人', '率直', '明確'] },
  { id: 'type11', name: '思いやりのある協調者', description: 'グループで思いやりを持って協調', traits: ['配慮', 'グループ', '協調', '思いやり'] },
  { id: 'type12', name: '思いやりのある個人主義者', description: '一対一で思いやりのあるコミュニケーション', traits: ['配慮', '個人', '思いやり', '深さ'] },
  { id: 'type13', name: '情熱的な冒険家', description: '情熱的に新しい冒険を求める', traits: ['冒険', '情熱', '変化', 'ドラマ'] },
  { id: 'type14', name: '安定した冒険家', description: '計画的に新しい体験を求める', traits: ['冒険', '安定', '計画', '体験'] },
  { id: 'type15', name: '情熱的な安定家', description: '安定した関係で情熱を表現', traits: ['安定', '情熱', '信頼', '表現'] },
  { id: 'type16', name: '完全な安定家', description: '安定した関係を大切にする', traits: ['安定', '信頼', '維持', '確実'] }
]

// 超高速タイプ判定（シンプルなルールベース）
export function determineUltraFastType(participant: Participant): UltraFastType {
  const answers = participant.answers
  
  // 質問1-2で基本的な性格を判定
  const q1 = answers.find(a => a.questionId === 'q1')?.value || 1
  const q2 = answers.find(a => a.questionId === 'q2')?.value || 1
  
  // 質問6-7で価値観を判定
  const q6 = answers.find(a => a.questionId === 'q6')?.value || 1
  const q7 = answers.find(a => a.questionId === 'q7')?.value || 1
  
  // 質問8-9でライフスタイルを判定
  const q8 = answers.find(a => a.questionId === 'q8')?.value || 1
  const q9 = answers.find(a => a.questionId === 'q9')?.value || 1
  
  // シンプルなルールでタイプを決定
  if (q1 === 1 && q2 === 1) return ULTRA_FAST_TYPES[0] // 冒険的社交家
  if (q1 === 1 && q2 === 2) return ULTRA_FAST_TYPES[1] // 内省的探求者
  if (q1 === 2 && q2 === 1) return ULTRA_FAST_TYPES[2] // 安定した社交家
  if (q1 === 2 && q2 === 2) return ULTRA_FAST_TYPES[3] // 安定した内省家
  
  if (q6 === 1 && q7 === 1) return ULTRA_FAST_TYPES[4] // 成長志向の仕事人
  if (q6 === 1 && q7 === 2) return ULTRA_FAST_TYPES[5] // 安定志向の仕事人
  if (q6 === 2 && q7 === 1) return ULTRA_FAST_TYPES[6] // 成長志向の生活人
  if (q6 === 2 && q7 === 2) return ULTRA_FAST_TYPES[7] // 安定志向の生活人
  
  if (q8 === 1 && q9 === 1) return ULTRA_FAST_TYPES[8] // 率直なグループリーダー
  if (q8 === 1 && q9 === 2) return ULTRA_FAST_TYPES[9] // 率直な個人主義者
  if (q8 === 2 && q9 === 1) return ULTRA_FAST_TYPES[10] // 思いやりのある協調者
  if (q8 === 2 && q9 === 2) return ULTRA_FAST_TYPES[11] // 思いやりのある個人主義者
  
  // デフォルト
  return ULTRA_FAST_TYPES[0]
}

// 超高速相性計算（事前計算済みテーブル）
const ULTRA_FAST_COMPATIBILITY: { [key: string]: { [key: string]: number } } = {
  'type1': { 'type2': 85, 'type3': 70, 'type4': 60, 'type5': 90, 'type6': 65, 'type7': 85, 'type8': 60, 'type9': 85, 'type10': 75, 'type11': 80, 'type12': 70, 'type13': 95, 'type14': 80, 'type15': 70, 'type16': 55 },
  'type2': { 'type1': 85, 'type3': 60, 'type4': 70, 'type5': 80, 'type6': 55, 'type7': 90, 'type8': 65, 'type9': 70, 'type10': 85, 'type11': 75, 'type12': 90, 'type13': 85, 'type14': 90, 'type15': 60, 'type16': 50 },
  'type3': { 'type1': 70, 'type2': 60, 'type4': 80, 'type5': 75, 'type6': 90, 'type7': 70, 'type8': 85, 'type9': 80, 'type10': 70, 'type11': 85, 'type12': 75, 'type13': 60, 'type14': 75, 'type15': 80, 'type16': 90 },
  'type4': { 'type1': 60, 'type2': 70, 'type3': 80, 'type5': 70, 'type6': 85, 'type7': 75, 'type8': 90, 'type9': 70, 'type10': 80, 'type11': 80, 'type12': 85, 'type13': 50, 'type14': 70, 'type15': 75, 'type16': 95 },
  'type5': { 'type1': 90, 'type2': 80, 'type3': 75, 'type4': 70, 'type6': 75, 'type7': 85, 'type8': 60, 'type9': 90, 'type10': 85, 'type11': 75, 'type12': 70, 'type13': 85, 'type14': 80, 'type15': 70, 'type16': 60 },
  'type6': { 'type1': 65, 'type2': 55, 'type3': 90, 'type4': 85, 'type5': 75, 'type7': 70, 'type8': 80, 'type9': 80, 'type10': 75, 'type11': 85, 'type12': 80, 'type13': 60, 'type14': 75, 'type15': 80, 'type16': 90 },
  'type7': { 'type1': 85, 'type2': 90, 'type3': 70, 'type4': 75, 'type5': 85, 'type6': 70, 'type8': 75, 'type9': 75, 'type10': 80, 'type11': 80, 'type12': 85, 'type13': 90, 'type14': 85, 'type15': 75, 'type16': 65 },
  'type8': { 'type1': 60, 'type2': 65, 'type3': 85, 'type4': 90, 'type5': 60, 'type6': 80, 'type7': 75, 'type9': 70, 'type10': 75, 'type11': 85, 'type12': 90, 'type13': 65, 'type14': 80, 'type15': 85, 'type16': 95 },
  'type9': { 'type1': 85, 'type2': 70, 'type3': 80, 'type4': 70, 'type5': 90, 'type6': 80, 'type7': 75, 'type8': 70, 'type10': 80, 'type11': 75, 'type12': 65, 'type13': 80, 'type14': 75, 'type15': 70, 'type16': 65 },
  'type10': { 'type1': 75, 'type2': 85, 'type3': 70, 'type4': 80, 'type5': 85, 'type6': 75, 'type7': 80, 'type8': 75, 'type9': 80, 'type11': 70, 'type12': 80, 'type13': 75, 'type14': 80, 'type15': 70, 'type16': 65 },
  'type11': { 'type1': 80, 'type2': 75, 'type3': 85, 'type4': 80, 'type5': 75, 'type6': 85, 'type7': 80, 'type8': 85, 'type9': 75, 'type10': 70, 'type12': 85, 'type13': 75, 'type14': 80, 'type15': 85, 'type16': 90 },
  'type12': { 'type1': 70, 'type2': 90, 'type3': 75, 'type4': 85, 'type5': 70, 'type6': 80, 'type7': 85, 'type8': 90, 'type9': 65, 'type10': 80, 'type11': 85, 'type13': 70, 'type14': 80, 'type15': 80, 'type16': 85 },
  'type13': { 'type1': 95, 'type2': 85, 'type3': 60, 'type4': 50, 'type5': 85, 'type6': 60, 'type7': 90, 'type8': 65, 'type9': 80, 'type10': 75, 'type11': 75, 'type12': 70, 'type14': 85, 'type15': 80, 'type16': 60 },
  'type14': { 'type1': 80, 'type2': 90, 'type3': 75, 'type4': 70, 'type5': 80, 'type6': 75, 'type7': 85, 'type8': 80, 'type9': 75, 'type10': 80, 'type11': 80, 'type12': 80, 'type13': 85, 'type15': 75, 'type16': 70 },
  'type15': { 'type1': 70, 'type2': 60, 'type3': 80, 'type4': 75, 'type5': 70, 'type6': 80, 'type7': 75, 'type8': 85, 'type9': 70, 'type10': 70, 'type11': 85, 'type12': 80, 'type13': 80, 'type14': 75, 'type16': 90 },
  'type16': { 'type1': 55, 'type2': 50, 'type3': 90, 'type4': 95, 'type5': 60, 'type6': 90, 'type7': 65, 'type8': 95, 'type9': 65, 'type10': 65, 'type11': 90, 'type12': 85, 'type13': 60, 'type14': 70, 'type15': 90 }
}

// 超高速相性計算
export function calculateUltraFastCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  // 各参加者のタイプを瞬時に判定
  const participantTypes = participants.map(p => ({
    participant: p,
    type: determineUltraFastType(p)
  }))
  
  // 事前計算済みテーブルから瞬時に相性を取得
  for (let i = 0; i < participantTypes.length; i++) {
    for (let j = i + 1; j < participantTypes.length; j++) {
      const type1 = participantTypes[i].type
      const type2 = participantTypes[j].type
      
      // 事前計算済みテーブルから瞬時にスコアを取得
      const baseScore = ULTRA_FAST_COMPATIBILITY[type1.id]?.[type2.id] || 50
      
      // 微細なランダム要素（±1の範囲）
      const randomOffset = Math.floor(Math.random() * 3) - 1
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
          category: '特性の一致度',
          score: calculateTraitCompatibilityUltraFast(type1, type2),
          weight: 1,
          description: getTraitCompatibilityDescriptionUltraFast(type1, type2)
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

// 超高速特性一致度計算
function calculateTraitCompatibilityUltraFast(type1: UltraFastType, type2: UltraFastType): number {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  const totalTraits = new Set([...type1.traits, ...type2.traits]).size
  
  return Math.round((commonTraits.length / totalTraits) * 100)
}

// 超高速特性一致度説明文
function getTraitCompatibilityDescriptionUltraFast(type1: UltraFastType, type2: UltraFastType): string {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  
  if (commonTraits.length >= 3) return '多くの特性が一致している'
  if (commonTraits.length === 2) return '一部の特性が一致している'
  if (commonTraits.length === 1) return '特性に違いがあるが、相補的'
  return '特性が異なるが、バランスが取れている'
}







