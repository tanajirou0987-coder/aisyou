import { Question } from '../types'

/**
 * ジョン・リーのラブスタイル類型論に基づく45問の質問
 * 
 * 恋愛スタイル分類：
 * - エロス（Eros）: 情熱的・ロマンティック・外見重視・理想追求 - 8問
 * - ルダス（Ludus）: 遊び心・束縛を嫌う・複数恋愛・ゲーム感覚 - 7問
 * - ストルゲ（Storge）: 友情ベース・ゆっくり発展・安定志向・穏やか - 8問
 * - プラグマ（Pragma）: 現実的・条件重視・計画的・長期視点 - 7問
 * - マニア（Mania）: 依存的・嫉妬深い・感情起伏・夢中 - 7問
 * - アガペ（Agape）: 献身的・無償の愛・相手優先・自己犠牲 - 8問
 * 
 * 回答形式：5段階評価
 * 1: 全く当てはまらない
 * 2: あまり当てはまらない
 * 3: どちらともいえない
 * 4: やや当てはまる
 * 5: 非常に当てはまる
 */

export const loveStyleQuestions: Question[] = [
  // エロス（Eros）- 情熱的・ロマンティック - 8問
  {
    id: 'love_1',
    text: '恋愛では、一目惚れや強い惹かれを感じることが多い',
    category: 'eros',
    weight: 3,
    options: [
      { id: 'love_1_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_1_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_1_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_1_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_1_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_2',
    text: '相手の外見や雰囲気に強く惹かれる',
    category: 'eros',
    weight: 3,
    options: [
      { id: 'love_2_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_2_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_2_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_2_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_2_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_3',
    text: 'ロマンティックなデートや雰囲気を大切にしたい',
    category: 'eros',
    weight: 3,
    options: [
      { id: 'love_3_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_3_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_3_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_3_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_3_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_4',
    text: '理想の恋愛像を強く持っている',
    category: 'eros',
    weight: 2,
    options: [
      { id: 'love_4_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_4_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_4_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_4_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_4_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_5',
    text: '恋愛において、情熱的な気持ちを重視する',
    category: 'eros',
    weight: 3,
    options: [
      { id: 'love_5_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_5_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_5_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_5_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_5_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_6',
    text: '相手との身体的な魅力や相性を大切にする',
    category: 'eros',
    weight: 2,
    options: [
      { id: 'love_6_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_6_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_6_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_6_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_6_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_7',
    text: '恋に落ちると、相手のことで頭がいっぱいになる',
    category: 'eros',
    weight: 3,
    options: [
      { id: 'love_7_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_7_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_7_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_7_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_7_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_8',
    text: '「運命の人」という概念を信じている',
    category: 'eros',
    weight: 2,
    options: [
      { id: 'love_8_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_8_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_8_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_8_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_8_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // ルダス（Ludus）- 遊び心・束縛を嫌う - 7問
  {
    id: 'love_9',
    text: '恋愛を深刻に考えすぎず、楽しむことを優先する',
    category: 'ludus',
    weight: 3,
    options: [
      { id: 'love_9_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_9_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_9_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_9_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_9_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_10',
    text: '束縛されることが苦手で、自由を大切にしたい',
    category: 'ludus',
    weight: 3,
    options: [
      { id: 'love_10_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_10_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_10_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_10_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_10_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_11',
    text: '恋愛はゲームのようなものだと思うことがある',
    category: 'ludus',
    weight: 2,
    options: [
      { id: 'love_11_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_11_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_11_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_11_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_11_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_12',
    text: '複数の人と同時に仲良くすることに抵抗が少ない',
    category: 'ludus',
    weight: 2,
    options: [
      { id: 'love_12_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_12_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_12_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_12_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_12_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_13',
    text: '恋愛において、刺激や新鮮さを求める',
    category: 'ludus',
    weight: 3,
    options: [
      { id: 'love_13_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_13_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_13_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_13_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_13_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_14',
    text: '恋愛関係に長期的なコミットメントを求めない',
    category: 'ludus',
    weight: 2,
    options: [
      { id: 'love_14_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_14_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_14_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_14_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_14_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_15',
    text: '恋愛の駆け引きを楽しむ',
    category: 'ludus',
    weight: 2,
    options: [
      { id: 'love_15_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_15_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_15_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_15_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_15_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // ストルゲ（Storge）- 友情ベース・安定志向 - 8問
  {
    id: 'love_16',
    text: '友達から恋愛関係に発展するのが理想的だ',
    category: 'storge',
    weight: 3,
    options: [
      { id: 'love_16_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_16_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_16_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_16_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_16_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_17',
    text: '恋愛関係は時間をかけてゆっくり育てたい',
    category: 'storge',
    weight: 3,
    options: [
      { id: 'love_17_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_17_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_17_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_17_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_17_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_18',
    text: '穏やかで安定した関係を望む',
    category: 'storge',
    weight: 3,
    options: [
      { id: 'love_18_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_18_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_18_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_18_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_18_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_19',
    text: '共通の趣味や価値観を大切にしたい',
    category: 'storge',
    weight: 2,
    options: [
      { id: 'love_19_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_19_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_19_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_19_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_19_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_20',
    text: '相手との深い信頼関係を築きたい',
    category: 'storge',
    weight: 3,
    options: [
      { id: 'love_20_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_20_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_20_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_20_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_20_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_21',
    text: '一緒にいて居心地が良いことを重視する',
    category: 'storge',
    weight: 2,
    options: [
      { id: 'love_21_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_21_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_21_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_21_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_21_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_22',
    text: '恋愛において、友情のような親密さを求める',
    category: 'storge',
    weight: 2,
    options: [
      { id: 'love_22_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_22_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_22_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_22_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_22_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_23',
    text: 'ドラマティックな展開よりも、日常的な幸せを大切にする',
    category: 'storge',
    weight: 2,
    options: [
      { id: 'love_23_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_23_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_23_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_23_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_23_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // プラグマ（Pragma）- 現実的・条件重視 - 7問
  {
    id: 'love_24',
    text: '恋愛相手を選ぶ際、条件を重視する',
    category: 'pragma',
    weight: 3,
    options: [
      { id: 'love_24_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_24_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_24_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_24_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_24_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_25',
    text: '将来を見据えて、計画的に関係を進めたい',
    category: 'pragma',
    weight: 3,
    options: [
      { id: 'love_25_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_25_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_25_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_25_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_25_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_26',
    text: '恋愛において、現実的な側面を考慮する',
    category: 'pragma',
    weight: 3,
    options: [
      { id: 'love_26_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_26_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_26_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_26_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_26_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_27',
    text: '相手との経済的・社会的な相性も重要だ',
    category: 'pragma',
    weight: 2,
    options: [
      { id: 'love_27_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_27_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_27_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_27_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_27_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_28',
    text: '家族や友人からの評価も気にする',
    category: 'pragma',
    weight: 2,
    options: [
      { id: 'love_28_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_28_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_28_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_28_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_28_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_29',
    text: '長期的な視点で相手を選びたい',
    category: 'pragma',
    weight: 3,
    options: [
      { id: 'love_29_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_29_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_29_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_29_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_29_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_30',
    text: '感情よりも、理性を優先することが多い',
    category: 'pragma',
    weight: 2,
    options: [
      { id: 'love_30_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_30_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_30_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_30_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_30_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // マニア（Mania）- 依存的・嫉妬深い - 7問
  {
    id: 'love_31',
    text: '恋愛中は相手のことで頭がいっぱいになり、他のことが手につかない',
    category: 'mania',
    weight: 3,
    options: [
      { id: 'love_31_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_31_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_31_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_31_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_31_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_32',
    text: '相手が他の人と親しくしていると嫉妬してしまう',
    category: 'mania',
    weight: 3,
    options: [
      { id: 'love_32_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_32_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_32_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_32_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_32_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_33',
    text: '恋愛において感情の起伏が激しくなる',
    category: 'mania',
    weight: 3,
    options: [
      { id: 'love_33_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_33_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_33_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_33_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_33_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_34',
    text: '相手からの愛情を常に確認したくなる',
    category: 'mania',
    weight: 2,
    options: [
      { id: 'love_34_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_34_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_34_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_34_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_34_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_35',
    text: '相手に依存してしまうことがある',
    category: 'mania',
    weight: 2,
    options: [
      { id: 'love_35_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_35_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_35_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_35_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_35_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_36',
    text: '些細なことで不安になったり、心配になったりする',
    category: 'mania',
    weight: 2,
    options: [
      { id: 'love_36_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_36_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_36_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_36_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_36_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_37',
    text: '恋愛に夢中になりすぎて、自分を見失うことがある',
    category: 'mania',
    weight: 3,
    options: [
      { id: 'love_37_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_37_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_37_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_37_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_37_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // アガペ（Agape）- 献身的・無償の愛 - 8問
  {
    id: 'love_38',
    text: '相手の幸せのためなら、自分を犠牲にできる',
    category: 'agape',
    weight: 3,
    options: [
      { id: 'love_38_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_38_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_38_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_38_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_38_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_39',
    text: '相手を無条件に愛したい',
    category: 'agape',
    weight: 3,
    options: [
      { id: 'love_39_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_39_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_39_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_39_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_39_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_40',
    text: '相手の幸せが自分の幸せだと感じる',
    category: 'agape',
    weight: 3,
    options: [
      { id: 'love_40_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_40_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_40_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_40_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_40_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_41',
    text: '見返りを求めずに尽くしたい',
    category: 'agape',
    weight: 2,
    options: [
      { id: 'love_41_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_41_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_41_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_41_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_41_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_42',
    text: '相手のためなら、何でもしてあげたい',
    category: 'agape',
    weight: 3,
    options: [
      { id: 'love_42_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_42_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_42_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_42_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_42_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_43',
    text: '相手の成長や幸福を願い、サポートしたい',
    category: 'agape',
    weight: 2,
    options: [
      { id: 'love_43_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_43_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_43_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_43_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_43_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_44',
    text: '自分のことよりも、相手のことを優先する',
    category: 'agape',
    weight: 2,
    options: [
      { id: 'love_44_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_44_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_44_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_44_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_44_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'love_45',
    text: '相手が自分を必要としているなら、いつでも支えたい',
    category: 'agape',
    weight: 3,
    options: [
      { id: 'love_45_1', text: '全く当てはまらない', value: 1 },
      { id: 'love_45_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'love_45_3', text: 'どちらともいえない', value: 3 },
      { id: 'love_45_4', text: 'やや当てはまる', value: 4 },
      { id: 'love_45_5', text: '非常に当てはまる', value: 5 }
    ]
  }
]



















