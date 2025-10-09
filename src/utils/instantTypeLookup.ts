import { Participant, CompatibilityScore, CompatibilityFactor } from '../types'

// 瞬時タイプ参照システム
export interface InstantType {
  id: string
  name: string
  description: string
  traits: string[]
}

// 16タイプの定義
const INSTANT_TYPES: InstantType[] = [
  { id: 'explorer_social', name: '冒険的社交家', description: '新しい体験を求めて人と交流する', traits: ['開放性', '外向性', '冒険', '社交'] },
  { id: 'explorer_introvert', name: '内省的探求者', description: '一人で新しい体験を探求する', traits: ['開放性', '内向性', '探求', '内省'] },
  { id: 'stabilizer_social', name: '安定した社交家', description: '確実な方法で人と交流する', traits: ['安定性', '外向性', '安定', '社交'] },
  { id: 'stabilizer_introvert', name: '安定した内省家', description: '一人で安定した生活を送る', traits: ['安定性', '内向性', '安定', '内省'] },
  { id: 'work_growth', name: '成長志向の仕事人', description: '仕事で常に成長を目指す', traits: ['仕事', '成長', '向上', '達成'] },
  { id: 'work_stability', name: '安定志向の仕事人', description: '仕事で安定を重視する', traits: ['仕事', '安定', '維持', '確実'] },
  { id: 'life_growth', name: '成長志向の生活人', description: '生活で成長を求める', traits: ['生活', '成長', '充実', '向上'] },
  { id: 'life_stability', name: '安定志向の生活人', description: '生活で安定を重視する', traits: ['生活', '安定', '維持', '充実'] },
  { id: 'direct_group', name: '率直なグループリーダー', description: 'グループで率直に意見を述べる', traits: ['直接性', 'グループ', 'リーダーシップ', '率直'] },
  { id: 'direct_individual', name: '率直な個人主義者', description: '一対一で率直にコミュニケーション', traits: ['直接性', '個人', '率直', '明確'] },
  { id: 'caring_group', name: '思いやりのある協調者', description: 'グループで思いやりを持って協調', traits: ['配慮', 'グループ', '協調', '思いやり'] },
  { id: 'caring_individual', name: '思いやりのある個人主義者', description: '一対一で思いやりのあるコミュニケーション', traits: ['配慮', '個人', '思いやり', '深さ'] },
  { id: 'adventure_passion', name: '情熱的な冒険家', description: '情熱的に新しい冒険を求める', traits: ['冒険', '情熱', '変化', 'ドラマ'] },
  { id: 'adventure_stable', name: '安定した冒険家', description: '計画的に新しい体験を求める', traits: ['冒険', '安定', '計画', '体験'] },
  { id: 'stable_passion', name: '情熱的な安定家', description: '安定した関係で情熱を表現', traits: ['安定', '情熱', '信頼', '表現'] },
  { id: 'stable_stable', name: '完全な安定家', description: '安定した関係を大切にする', traits: ['安定', '信頼', '維持', '確実'] }
]

// 答えの組み合わせからタイプを瞬時に決定するテーブル
// キー: "q1_q2_q3_q4_q5_q6_q7_q8_q9_q10_q11_q12_q13_q14_q15" (各質問の答え)
// 値: タイプID
const ANSWER_COMBINATION_TO_TYPE: { [key: string]: string } = {
  // パターン1: 探求者系
  '111111111111111': 'explorer_social',      // 全体的に開放性・外向性が高い
  '112111111111111': 'explorer_social',      // 開放性が高く、外向性が高い
  '111211111111111': 'explorer_introvert',   // 開放性が高く、内向性が高い
  '112211111111111': 'explorer_introvert',   // 開放性が高く、内向性が高い
  
  // パターン2: 安定者系
  '222222222222222': 'stabilizer_introvert', // 全体的に安定性・内向性が高い
  '221222222222222': 'stabilizer_introvert', // 安定性が高く、内向性が高い
  '222122222222222': 'stabilizer_social',    // 安定性が高く、外向性が高い
  '221122222222222': 'stabilizer_social',    // 安定性が高く、外向性が高い
  
  // パターン3: 仕事重視系
  '121212121212121': 'work_growth',          // 仕事重視で成長志向
  '121212121212122': 'work_stability',       // 仕事重視で安定志向
  '212121212121212': 'work_growth',          // 仕事重視で成長志向
  '212121212121221': 'work_stability',       // 仕事重視で安定志向
  
  // パターン4: 生活重視系
  '212121212121212': 'life_growth',          // 生活重視で成長志向
  '212121212121221': 'life_stability',       // 生活重視で安定志向
  '121212121212121': 'life_growth',          // 生活重視で成長志向
  '121212121212122': 'life_stability',       // 生活重視で安定志向
  
  // パターン5: 直接型系
  '112211221122112': 'direct_group',         // 直接型でグループ志向
  '112211221122121': 'direct_individual',    // 直接型で個人志向
  '221122112211221': 'direct_group',         // 直接型でグループ志向
  '221122112211212': 'direct_individual',    // 直接型で個人志向
  
  // パターン6: 配慮型系
  '221122112211221': 'caring_group',         // 配慮型でグループ志向
  '221122112211212': 'caring_individual',    // 配慮型で個人志向
  '112211221122112': 'caring_group',         // 配慮型でグループ志向
  '112211221122121': 'caring_individual',    // 配慮型で個人志向
  
  // パターン7: 冒険家系
  '111111111111111': 'adventure_passion',    // 全体的に冒険的で情熱的
  '111111111111112': 'adventure_stable',     // 冒険的だが安定志向
  '222222222222222': 'adventure_passion',    // 安定だが情熱的
  '222222222222221': 'adventure_stable',     // 安定で安定志向
  
  // パターン8: 安定家系
  '222222222222222': 'stable_stable',        // 全体的に安定志向
  '222222222222221': 'stable_passion',       // 安定だが情熱的
  '111111111111111': 'stable_stable',        // 開放的だが安定志向
  '111111111111112': 'stable_passion',       // 開放的で情熱的
  
  // デフォルトパターン（その他の組み合わせ）
  'default': 'explorer_social'
}

// 事前計算済みの相性テーブル（瞬時参照用）
const INSTANT_COMPATIBILITY: { [key: string]: { [key: string]: number } } = {
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

// 答えの組み合わせからタイプを瞬時に決定
export function determineInstantType(participant: Participant): InstantType {
  const answers = participant.answers
  
  // 15問の答えを順番に並べてキーを作成
  const answerKey = answers
    .sort((a, b) => a.questionId.localeCompare(b.questionId)) // 質問ID順にソート
    .map(answer => answer.value)
    .join('_')
  
  // 答えの組み合わせからタイプIDを取得
  const typeId = ANSWER_COMBINATION_TO_TYPE[answerKey] || ANSWER_COMBINATION_TO_TYPE['default']
  
  return INSTANT_TYPES.find(type => type.id === typeId) || INSTANT_TYPES[0]
}

// 瞬時相性計算（事前計算済みテーブルを参照）
export function calculateInstantCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  // 各参加者のタイプを瞬時に判定
  const participantTypes = participants.map(p => ({
    participant: p,
    type: determineInstantType(p)
  }))
  
  // 事前計算済みテーブルから瞬時に相性を取得
  for (let i = 0; i < participantTypes.length; i++) {
    for (let j = i + 1; j < participantTypes.length; j++) {
      const type1 = participantTypes[i].type
      const type2 = participantTypes[j].type
      
      // 事前計算済みテーブルから瞬時にスコアを取得
      const baseScore = INSTANT_COMPATIBILITY[type1.id]?.[type2.id] || 50
      
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
          score: calculateTraitCompatibilityInstant(type1, type2),
          weight: 1,
          description: getTraitCompatibilityDescriptionInstant(type1, type2)
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

// 瞬時特性一致度計算
function calculateTraitCompatibilityInstant(type1: InstantType, type2: InstantType): number {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  const totalTraits = new Set([...type1.traits, ...type2.traits]).size
  
  return Math.round((commonTraits.length / totalTraits) * 100)
}

// 瞬時特性一致度説明文
function getTraitCompatibilityDescriptionInstant(type1: InstantType, type2: InstantType): string {
  const commonTraits = type1.traits.filter(trait => type2.traits.includes(trait))
  
  if (commonTraits.length >= 3) return '多くの特性が一致している'
  if (commonTraits.length === 2) return '一部の特性が一致している'
  if (commonTraits.length === 1) return '特性に違いがあるが、相補的'
  return '特性が異なるが、バランスが取れている'
}







