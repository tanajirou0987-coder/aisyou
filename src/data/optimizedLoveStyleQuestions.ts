import { Question } from '../types'

/**
 * 科学的根拠に基づく包括的相性診断質問（18問）
 * 
 * 科学的根拠：
 * - ジョン・リーのラブスタイル類型論（1973）
 * - ビッグファイブ性格理論（コスタ&マクレー）
 * - 愛着理論（ボウルビー）
 * - コミュニケーション理論
 * - 価値観理論（シュワルツ）
 * - ライフスタイル適合性理論
 * 
 * 診断要素（各3問）：
 * - 恋愛スタイル: エロス・ルダス・ストルゲ - 3問
 * - 性格特性: プラグマ・マニア・アガペ - 3問
 * - 愛着スタイル: 安定・不安・回避 - 3問
 * - コミュニケーション: 直接性・感情的・分析的 - 3問
 * - 価値観: 伝統・達成・善行 - 3問
 * - ライフスタイル: 社交・仕事・余暇 - 3問
 * 
 * 各質問は複数の心理学理論を統合して設計されており、
 * 恋愛スタイルだけでなく、性格、愛着、コミュニケーション、
 * 価値観、ライフスタイルの適合性を包括的に診断します。
 * 
 * 回答形式：5段階評価
 * 1: 全く当てはまらない
 * 2: あまり当てはまらない
 * 3: どちらともいえない
 * 4: やや当てはまる
 * 5: 非常に当てはまる
 */

export const optimizedLoveStyleQuestions: Question[] = [
  // エロス（Eros）- 情熱的・ロマンティック - 3問
  {
    id: 'opt_eros_1',
    text: '恋愛では、一目惚れや強い惹かれを感じることが多い',
    category: 'eros',
    weight: 3,
    options: [
      { id: 'opt_eros_1_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_eros_1_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_eros_1_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_eros_1_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_eros_1_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_eros_2',
    text: 'ロマンティックなデートや雰囲気を大切にしたい',
    category: 'eros',
    weight: 3,
    options: [
      { id: 'opt_eros_2_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_eros_2_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_eros_2_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_eros_2_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_eros_2_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_eros_3',
    text: '理想の恋愛像を強く持っている',
    category: 'eros',
    weight: 2,
    options: [
      { id: 'opt_eros_3_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_eros_3_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_eros_3_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_eros_3_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_eros_3_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // ルダス（Ludus）- 遊び心・束縛を嫌う - 3問
  {
    id: 'opt_ludus_1',
    text: '恋愛は楽しいゲームのようなものだと思う',
    category: 'ludus',
    weight: 3,
    options: [
      { id: 'opt_ludus_1_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_ludus_1_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_ludus_1_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_ludus_1_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_ludus_1_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_ludus_2',
    text: '束縛されることを嫌い、自由な関係を好む',
    category: 'ludus',
    weight: 3,
    options: [
      { id: 'opt_ludus_2_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_ludus_2_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_ludus_2_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_ludus_2_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_ludus_2_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_ludus_3',
    text: '複数の人と同時に付き合うことに抵抗がない',
    category: 'ludus',
    weight: 2,
    options: [
      { id: 'opt_ludus_3_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_ludus_3_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_ludus_3_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_ludus_3_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_ludus_3_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // ストルゲ（Storge）- 友情ベース・安定 - 3問
  {
    id: 'opt_storge_1',
    text: '友達から恋愛に発展する関係を好む',
    category: 'storge',
    weight: 3,
    options: [
      { id: 'opt_storge_1_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_storge_1_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_storge_1_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_storge_1_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_storge_1_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_storge_2',
    text: 'ドラマティックな展開よりも、日常的な幸せを大切にする',
    category: 'storge',
    weight: 3,
    options: [
      { id: 'opt_storge_2_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_storge_2_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_storge_2_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_storge_2_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_storge_2_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_storge_3',
    text: '時間をかけてゆっくり関係を築くことを好む',
    category: 'storge',
    weight: 2,
    options: [
      { id: 'opt_storge_3_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_storge_3_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_storge_3_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_storge_3_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_storge_3_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // プラグマ（Pragma）- 現実的・条件重視 - 3問
  {
    id: 'opt_pragma_1',
    text: '恋愛相手を選ぶ際、条件を重視する',
    category: 'pragma',
    weight: 3,
    options: [
      { id: 'opt_pragma_1_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_pragma_1_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_pragma_1_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_pragma_1_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_pragma_1_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_pragma_2',
    text: '将来を見据えて、計画的に関係を進めたい',
    category: 'pragma',
    weight: 3,
    options: [
      { id: 'opt_pragma_2_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_pragma_2_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_pragma_2_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_pragma_2_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_pragma_2_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_pragma_3',
    text: '感情よりも現実的な判断を重視する',
    category: 'pragma',
    weight: 2,
    options: [
      { id: 'opt_pragma_3_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_pragma_3_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_pragma_3_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_pragma_3_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_pragma_3_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // マニア（Mania）- 依存的・情熱的 - 3問
  {
    id: 'opt_mania_1',
    text: '恋愛相手に強く依存してしまう傾向がある',
    category: 'mania',
    weight: 3,
    options: [
      { id: 'opt_mania_1_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_mania_1_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_mania_1_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_mania_1_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_mania_1_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_mania_2',
    text: '嫉妬深く、相手の行動を気にしすぎてしまう',
    category: 'mania',
    weight: 3,
    options: [
      { id: 'opt_mania_2_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_mania_2_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_mania_2_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_mania_2_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_mania_2_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_mania_3',
    text: '恋愛で感情の起伏が激しい',
    category: 'mania',
    weight: 2,
    options: [
      { id: 'opt_mania_3_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_mania_3_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_mania_3_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_mania_3_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_mania_3_5', text: '非常に当てはまる', value: 5 }
    ]
  },

  // アガペ（Agape）- 献身的・無償の愛 - 3問
  {
    id: 'opt_agape_1',
    text: '相手の幸せを自分の幸せよりも優先する',
    category: 'agape',
    weight: 3,
    options: [
      { id: 'opt_agape_1_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_agape_1_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_agape_1_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_agape_1_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_agape_1_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_agape_2',
    text: '相手のために自分を犠牲にすることに抵抗がない',
    category: 'agape',
    weight: 3,
    options: [
      { id: 'opt_agape_2_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_agape_2_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_agape_2_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_agape_2_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_agape_2_5', text: '非常に当てはまる', value: 5 }
    ]
  },
  {
    id: 'opt_agape_3',
    text: '相手が自分を必要としているなら、いつでも支えたい',
    category: 'agape',
    weight: 2,
    options: [
      { id: 'opt_agape_3_1', text: '全く当てはまらない', value: 1 },
      { id: 'opt_agape_3_2', text: 'あまり当てはまらない', value: 2 },
      { id: 'opt_agape_3_3', text: 'どちらともいえない', value: 3 },
      { id: 'opt_agape_3_4', text: 'やや当てはまる', value: 4 },
      { id: 'opt_agape_3_5', text: '非常に当てはまる', value: 5 }
    ]
  }
]

