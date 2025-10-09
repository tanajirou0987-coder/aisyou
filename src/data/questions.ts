import { Question } from '../types'

export const romanceQuestions: Question[] = [
  {
    id: 'romance_1',
    text: '理想のデートは？',
    category: 'lifestyle',
    weight: 3,
    options: [
      { id: 'romance_1_a', text: '映画館で映画を見る', value: 1, description: '静かで落ち着いた時間を好む' },
      { id: 'romance_1_b', text: 'アウトドアでアクティブに', value: 2, description: '活発でエネルギッシュ' },
      { id: 'romance_1_c', text: '家でまったり過ごす', value: 3, description: 'リラックスした時間を大切にする' },
      { id: 'romance_1_d', text: '新しい場所を探検する', value: 4, description: '冒険心が旺盛' }
    ]
  },
  {
    id: 'romance_2',
    text: '喧嘩をした時、どう対処する？',
    category: 'communication',
    weight: 4,
    options: [
      { id: 'romance_2_a', text: 'すぐに話し合って解決する', value: 1, description: 'コミュニケーション重視' },
      { id: 'romance_2_b', text: '少し時間を置いてから話す', value: 2, description: '冷静な判断力' },
      { id: 'romance_2_c', text: '相手の機嫌が直るまで待つ', value: 3, description: '相手を思いやる気持ち' },
      { id: 'romance_2_d', text: '自然に解決するのを待つ', value: 4, description: '楽観的で大らか' }
    ]
  },
  {
    id: 'romance_3',
    text: '大切な人への愛情表現は？',
    category: 'affection',
    weight: 3,
    options: [
      { id: 'romance_3_a', text: '言葉で伝える', value: 1, description: '言葉での表現が得意' },
      { id: 'romance_3_b', text: '行動で示す', value: 2, description: '行動で愛情を表現' },
      { id: 'romance_3_c', text: 'プレゼントを贈る', value: 3, description: '物で愛情を表現' },
      { id: 'romance_3_d', text: '一緒に過ごす時間を作る', value: 4, description: '時間を共有することで愛情を表現' }
    ]
  },
  {
    id: 'romance_4',
    text: '将来の夢は？',
    category: 'future',
    weight: 2,
    options: [
      { id: 'romance_4_a', text: '安定した生活を送る', value: 1, description: '安定志向' },
      { id: 'romance_4_b', text: '大きな成功を掴む', value: 2, description: '野心的' },
      { id: 'romance_4_c', text: '家族と幸せに暮らす', value: 3, description: '家族重視' },
      { id: 'romance_4_d', text: '自由に生きる', value: 4, description: '自由志向' }
    ]
  },
  {
    id: 'romance_5',
    text: 'ストレス解消法は？',
    category: 'personality',
    weight: 2,
    options: [
      { id: 'romance_5_a', text: '一人で過ごす', value: 1, description: '内向的' },
      { id: 'romance_5_b', text: '友達と過ごす', value: 2, description: '社交的' },
      { id: 'romance_5_c', text: '運動する', value: 3, description: 'アクティブ' },
      { id: 'romance_5_d', text: '趣味に没頭する', value: 4, description: '集中力がある' }
    ]
  },
  {
    id: 'romance_6',
    text: 'お金の使い方は？',
    category: 'values',
    weight: 3,
    options: [
      { id: 'romance_6_a', text: '節約を心がける', value: 1, description: '節約志向' },
      { id: 'romance_6_b', text: '必要なものには使う', value: 2, description: 'バランス型' },
      { id: 'romance_6_c', text: '好きなものに使う', value: 3, description: '自己投資型' },
      { id: 'romance_6_d', text: '思い切って使う', value: 4, description: '大胆型' }
    ]
  },
  {
    id: 'romance_7',
    text: '休日の過ごし方は？',
    category: 'lifestyle',
    weight: 2,
    options: [
      { id: 'romance_7_a', text: '家でゆっくり過ごす', value: 1, description: '家でのんびり' },
      { id: 'romance_7_b', text: '外出して楽しむ', value: 2, description: '外出派' },
      { id: 'romance_7_c', text: '趣味や勉強に時間を使う', value: 3, description: '自己啓発派' },
      { id: 'romance_7_d', text: '友達や家族と過ごす', value: 4, description: '人との時間重視' }
    ]
  },
  {
    id: 'romance_8',
    text: '相手に求めることは？',
    category: 'expectations',
    weight: 4,
    options: [
      { id: 'romance_8_a', text: '理解してくれること', value: 1, description: '理解を求める' },
      { id: 'romance_8_b', text: '支えてくれること', value: 2, description: 'サポートを求める' },
      { id: 'romance_8_c', text: '一緒に成長できること', value: 3, description: '成長を求める' },
      { id: 'romance_8_d', text: '楽しい時間を共有できること', value: 4, description: '楽しさを求める' }
    ]
  },
  {
    id: 'romance_9',
    text: '恋愛での優先順位は？',
    category: 'priorities',
    weight: 3,
    options: [
      { id: 'romance_9_a', text: '安定感', value: 1, description: '安定を重視' },
      { id: 'romance_9_b', text: '刺激', value: 2, description: '刺激を重視' },
      { id: 'romance_9_c', text: '信頼関係', value: 3, description: '信頼を重視' },
      { id: 'romance_9_d', text: '自由さ', value: 4, description: '自由を重視' }
    ]
  },
  {
    id: 'romance_10',
    text: '相手との距離感は？',
    category: 'relationship',
    weight: 2,
    options: [
      { id: 'romance_10_a', text: '常に一緒にいたい', value: 1, description: '密着型' },
      { id: 'romance_10_b', text: '適度な距離を保ちたい', value: 2, description: 'バランス型' },
      { id: 'romance_10_c', text: '時々一人の時間も欲しい', value: 3, description: '独立型' },
      { id: 'romance_10_d', text: 'お互いの時間を尊重したい', value: 4, description: '尊重型' }
    ]
  },
  {
    id: 'romance_11',
    text: '理想の結婚観は？',
    category: 'marriage',
    weight: 3,
    options: [
      { id: 'romance_11_a', text: '伝統的な結婚', value: 1, description: '伝統志向' },
      { id: 'romance_11_b', text: 'パートナーシップ重視', value: 2, description: '対等志向' },
      { id: 'romance_11_c', text: '自由な形の結婚', value: 3, description: '自由志向' },
      { id: 'romance_11_d', text: '結婚は選択肢の一つ', value: 4, description: '柔軟志向' }
    ]
  },
  {
    id: 'romance_12',
    text: 'コミュニケーションの取り方は？',
    category: 'communication',
    weight: 3,
    options: [
      { id: 'romance_12_a', text: '直接的に話す', value: 1, description: '直接的' },
      { id: 'romance_12_b', text: '相手の気持ちを考えて話す', value: 2, description: '配慮型' },
      { id: 'romance_12_c', text: '文字で伝える方が得意', value: 3, description: '文字派' },
      { id: 'romance_12_d', text: '行動で示す', value: 4, description: '行動派' }
    ]
  },
  {
    id: 'romance_13',
    text: '価値観で最も大切なことは？',
    category: 'values',
    weight: 4,
    options: [
      { id: 'romance_13_a', text: '家族', value: 1, description: '家族重視' },
      { id: 'romance_13_b', text: '友情', value: 2, description: '友情重視' },
      { id: 'romance_13_c', text: '仕事', value: 3, description: '仕事重視' },
      { id: 'romance_13_d', text: '自由', value: 4, description: '自由重視' }
    ]
  },
  {
    id: 'romance_14',
    text: '理想の住環境は？',
    category: 'lifestyle',
    weight: 2,
    options: [
      { id: 'romance_14_a', text: '都市部', value: 1, description: '都会派' },
      { id: 'romance_14_b', text: '郊外', value: 2, description: '郊外派' },
      { id: 'romance_14_c', text: '田舎', value: 3, description: '田舎派' },
      { id: 'romance_14_d', text: '場所は問わない', value: 4, description: '柔軟派' }
    ]
  },
  {
    id: 'romance_15',
    text: '恋愛で大切にしたいことは？',
    category: 'love',
    weight: 4,
    options: [
      { id: 'romance_15_a', text: '誠実さ', value: 1, description: '誠実性重視' },
      { id: 'romance_15_b', text: '情熱', value: 2, description: '情熱重視' },
      { id: 'romance_15_c', text: '理解し合うこと', value: 3, description: '理解重視' },
      { id: 'romance_15_d', text: '楽しい時間', value: 4, description: '楽しさ重視' }
    ]
  }
]

export const friendshipQuestions: Question[] = [
  {
    id: 'friendship_1',
    text: '友達と過ごす時間で好きなのは？',
    category: 'social',
    weight: 3,
    options: [
      { id: 'friendship_1_a', text: 'カフェでおしゃべり', value: 1, description: '落ち着いた会話を好む' },
      { id: 'friendship_1_b', text: 'スポーツやゲーム', value: 2, description: 'アクティブな活動が好き' },
      { id: 'friendship_1_c', text: '映画やコンサート', value: 3, description: 'エンターテイメント好き' },
      { id: 'friendship_1_d', text: '旅行や冒険', value: 4, description: '新しい体験を求める' }
    ]
  },
  {
    id: 'friendship_2',
    text: '友達に相談された時、どうする？',
    category: 'support',
    weight: 4,
    options: [
      { id: 'friendship_2_a', text: 'じっくり話を聞く', value: 1, description: '聞き上手' },
      { id: 'friendship_2_b', text: '一緒に解決策を考える', value: 2, description: '問題解決型' },
      { id: 'friendship_2_c', text: '励まして元気づける', value: 3, description: 'ポジティブ思考' },
      { id: 'friendship_2_d', text: '客観的なアドバイスをする', value: 4, description: '冷静で論理的' }
    ]
  },
  {
    id: 'friendship_3',
    text: 'グループでの役割は？',
    category: 'personality',
    weight: 2,
    options: [
      { id: 'friendship_3_a', text: 'リーダーシップを取る', value: 1, description: 'リーダー気質' },
      { id: 'friendship_3_b', text: 'みんなをまとめる', value: 2, description: '調整役' },
      { id: 'friendship_3_c', text: 'ムードメーカー', value: 3, description: '明るい性格' },
      { id: 'friendship_3_d', text: 'サポート役', value: 4, description: '縁の下の力持ち' }
    ]
  },
  {
    id: 'friendship_4',
    text: '友達との約束で大切にしているのは？',
    category: 'values',
    weight: 3,
    options: [
      { id: 'friendship_4_a', text: '時間を守る', value: 1, description: '時間に厳格' },
      { id: 'friendship_4_b', text: '相手の気持ちを考える', value: 2, description: '思いやりがある' },
      { id: 'friendship_4_c', text: '楽しい時間を過ごす', value: 3, description: '楽しさ重視' },
      { id: 'friendship_4_d', text: 'お互いを尊重する', value: 4, description: '相互尊重' }
    ]
  },
  {
    id: 'friendship_5',
    text: '新しい友達を作る時は？',
    category: 'social',
    weight: 2,
    options: [
      { id: 'friendship_5_a', text: '積極的に話しかける', value: 1, description: '積極的' },
      { id: 'friendship_5_b', text: '自然な流れで仲良くなる', value: 2, description: '自然体' },
      { id: 'friendship_5_c', text: '共通の趣味で繋がる', value: 3, description: '趣味重視' },
      { id: 'friendship_5_d', text: '時間をかけて信頼関係を築く', value: 4, description: '慎重で真面目' }
    ]
  },
  {
    id: 'friendship_6',
    text: '友達との時間で重視することは？',
    category: 'social',
    weight: 3,
    options: [
      { id: 'friendship_6_a', text: '深い話ができること', value: 1, description: '深い関係を求める' },
      { id: 'friendship_6_b', text: '楽しく過ごせること', value: 2, description: '楽しさを重視' },
      { id: 'friendship_6_c', text: 'お互いを理解し合えること', value: 3, description: '理解を重視' },
      { id: 'friendship_6_d', text: 'リラックスできること', value: 4, description: 'リラックス重視' }
    ]
  },
  {
    id: 'friendship_7',
    text: '友達との価値観の違いをどう感じる？',
    category: 'values',
    weight: 3,
    options: [
      { id: 'friendship_7_a', text: '興味深いと感じる', value: 1, description: '多様性を楽しむ' },
      { id: 'friendship_7_b', text: '学びになると感じる', value: 2, description: '学習志向' },
      { id: 'friendship_7_c', text: '時々困ると感じる', value: 3, description: '時々困惑' },
      { id: 'friendship_7_d', text: '尊重して受け入れる', value: 4, description: '寛容' }
    ]
  },
  {
    id: 'friendship_8',
    text: '友達との距離感は？',
    category: 'relationship',
    weight: 2,
    options: [
      { id: 'friendship_8_a', text: '頻繁に会いたい', value: 1, description: '密接型' },
      { id: 'friendship_8_b', text: '適度な頻度で会いたい', value: 2, description: 'バランス型' },
      { id: 'friendship_8_c', text: '時々会えれば良い', value: 3, description: '距離重視' },
      { id: 'friendship_8_d', text: '会えなくても繋がっている', value: 4, description: '精神的な繋がり重視' }
    ]
  },
  {
    id: 'friendship_9',
    text: '友達との意見の対立をどう解決する？',
    category: 'communication',
    weight: 3,
    options: [
      { id: 'friendship_9_a', text: '話し合って解決する', value: 1, description: '対話重視' },
      { id: 'friendship_9_b', text: '時間を置いて解決する', value: 2, description: '時間的解決' },
      { id: 'friendship_9_c', text: 'お互いを尊重して受け入れる', value: 3, description: '受容型' },
      { id: 'friendship_9_d', text: '自然に解決するのを待つ', value: 4, description: '自然解決型' }
    ]
  },
  {
    id: 'friendship_10',
    text: '友達に求めることは？',
    category: 'expectations',
    weight: 3,
    options: [
      { id: 'friendship_10_a', text: '理解してくれること', value: 1, description: '理解を求める' },
      { id: 'friendship_10_b', text: '支えてくれること', value: 2, description: 'サポートを求める' },
      { id: 'friendship_10_c', text: '一緒に成長できること', value: 3, description: '成長を求める' },
      { id: 'friendship_10_d', text: '楽しい時間を共有できること', value: 4, description: '楽しさを求める' }
    ]
  },
  {
    id: 'friendship_11',
    text: '友達との時間で大切なのは？',
    category: 'time',
    weight: 2,
    options: [
      { id: 'friendship_11_a', text: '質の高い時間', value: 1, description: '質重視' },
      { id: 'friendship_11_b', text: '長い時間', value: 2, description: '量重視' },
      { id: 'friendship_11_c', text: '定期的な時間', value: 3, description: '定期性重視' },
      { id: 'friendship_11_d', text: '特別な時間', value: 4, description: '特別感重視' }
    ]
  },
  {
    id: 'friendship_12',
    text: '友達との関係で重視するのは？',
    category: 'relationship',
    weight: 3,
    options: [
      { id: 'friendship_12_a', text: '信頼関係', value: 1, description: '信頼重視' },
      { id: 'friendship_12_b', text: '楽しい関係', value: 2, description: '楽しさ重視' },
      { id: 'friendship_12_c', text: '深い関係', value: 3, description: '深さ重視' },
      { id: 'friendship_12_d', text: '自由な関係', value: 4, description: '自由重視' }
    ]
  },
  {
    id: 'friendship_13',
    text: '友達との共通点で重要なのは？',
    category: 'commonality',
    weight: 2,
    options: [
      { id: 'friendship_13_a', text: '価値観', value: 1, description: '価値観重視' },
      { id: 'friendship_13_b', text: '趣味', value: 2, description: '趣味重視' },
      { id: 'friendship_13_c', text: '性格', value: 3, description: '性格重視' },
      { id: 'friendship_13_d', text: '共通点はなくても良い', value: 4, description: '多様性重視' }
    ]
  },
  {
    id: 'friendship_14',
    text: '友達との約束を破られた時は？',
    category: 'conflict',
    weight: 3,
    options: [
      { id: 'friendship_14_a', text: '理由を聞いて理解する', value: 1, description: '理解型' },
      { id: 'friendship_14_b', text: '次回は守ってほしいと伝える', value: 2, description: '改善要求型' },
      { id: 'friendship_14_c', text: '気にしない', value: 3, description: '寛容型' },
      { id: 'friendship_14_d', text: '距離を置く', value: 4, description: '距離型' }
    ]
  },
  {
    id: 'friendship_15',
    text: '友達との関係で最も大切なのは？',
    category: 'values',
    weight: 4,
    options: [
      { id: 'friendship_15_a', text: '誠実さ', value: 1, description: '誠実性重視' },
      { id: 'friendship_15_b', text: '楽しい時間', value: 2, description: '楽しさ重視' },
      { id: 'friendship_15_c', text: '理解し合うこと', value: 3, description: '理解重視' },
      { id: 'friendship_15_d', text: '自由な関係', value: 4, description: '自由重視' }
    ]
  }
]

export function getQuestionsForMode(mode: 'romance' | 'friendship'): Question[] {
  return mode === 'romance' ? romanceQuestions : friendshipQuestions
}

export function getRandomQuestions(mode: 'romance' | 'friendship', count: number = 15): Question[] {
  const allQuestions = getQuestionsForMode(mode)
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}