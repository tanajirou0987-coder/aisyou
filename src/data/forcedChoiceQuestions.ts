import { Question, AppMode } from '../types'

// 強制選択法による質問データ（科学的根拠に基づく）
const forcedChoiceQuestions: Question[] = [
  // 開放性 vs 安定性
  {
    id: 'fc_1',
    mode: 'romance',
    text: 'どちらにより共感しますか？',
    options: [
      { id: 'fc1_1', text: '新しいアイデアや体験を積極的に試すこと', value: 1 },
      { id: 'fc1_2', text: '確実で安全な方法を選ぶこと', value: 2 }
    ],
    category: '開放性',
    weight: 3
  },
  
  // 外向性 vs 内向性
  {
    id: 'fc_2',
    mode: 'romance',
    text: 'どちらが重要だと思いますか？',
    options: [
      { id: 'fc2_1', text: '人との交流でエネルギーを得ること', value: 1 },
      { id: 'fc2_2', text: '一人の時間でエネルギーを回復すること', value: 2 }
    ],
    category: '外向性',
    weight: 3
  },
  
  // 誠実性 vs 柔軟性
  {
    id: 'fc_3',
    mode: 'romance',
    text: 'どちらを選びますか？',
    options: [
      { id: 'fc3_1', text: '計画を立てて計画的に行動すること', value: 1 },
      { id: 'fc3_2', text: 'その場の流れに任せて柔軟に対応すること', value: 2 }
    ],
    category: '誠実性',
    weight: 3
  },
  
  // 協調性 vs 独立性
  {
    id: 'fc_4',
    mode: 'romance',
    text: 'どちらにより価値を感じますか？',
    options: [
      { id: 'fc4_1', text: 'チームワークと協調を大切にすること', value: 1 },
      { id: 'fc4_2', text: '個人の判断と独立性を重視すること', value: 2 }
    ],
    category: '協調性',
    weight: 3
  },
  
  // 感情安定性 vs 感受性
  {
    id: 'fc_5',
    mode: 'romance',
    text: 'どちらが自然ですか？',
    options: [
      { id: 'fc5_1', text: 'ストレスがあっても冷静でいられること', value: 1 },
      { id: 'fc5_2', text: '感情に素直に反応し表現すること', value: 2 }
    ],
    category: '感情安定性',
    weight: 3
  },
  
  // 価値観：仕事 vs プライベート
  {
    id: 'fc_6',
    mode: 'romance',
    text: 'どちらを優先しますか？',
    options: [
      { id: 'fc6_1', text: '仕事での成功と達成感', value: 1 },
      { id: 'fc6_2', text: 'プライベートでの充実と楽しみ', value: 2 }
    ],
    category: '価値観',
    weight: 4
  },
  
  // コミュニケーション：直接 vs 配慮
  {
    id: 'fc_7',
    mode: 'romance',
    text: 'どちらのコミュニケーションを好みますか？',
    options: [
      { id: 'fc7_1', text: '率直で直接的な意見交換', value: 1 },
      { id: 'fc7_2', text: '相手を思いやる優しい表現', value: 2 }
    ],
    category: 'コミュニケーション',
    weight: 4
  },
  
  // ライフスタイル：冒険 vs 安定
  {
    id: 'fc_8',
    mode: 'romance',
    text: 'どちらの生活を理想としますか？',
    options: [
      { id: 'fc8_1', text: '変化に富んだ冒険的な生活', value: 1 },
      { id: 'fc8_2', text: '安定した予測可能な生活', value: 2 }
    ],
    category: 'ライフスタイル',
    weight: 3
  },
  
  // 恋愛観：情熱 vs 安定
  {
    id: 'fc_9',
    mode: 'romance',
    text: 'どちらを重視しますか？',
    options: [
      { id: 'fc9_1', text: '情熱的でドラマチックな恋愛', value: 1 },
      { id: 'fc9_2', text: '安定した信頼関係のある恋愛', value: 2 }
    ],
    category: '恋愛観',
    weight: 3
  },
  
  // 将来観：成長 vs 安定
  {
    id: 'fc_10',
    mode: 'romance',
    text: 'どちらを目指しますか？',
    options: [
      { id: 'fc10_1', text: '常に成長し続けること', value: 1 },
      { id: 'fc10_2', text: '現在の安定を維持すること', value: 2 }
    ],
    category: '将来観',
    weight: 3
  },
  
  // 友達モード用の質問
  {
    id: 'fc_11',
    mode: 'friendship',
    text: 'どちらにより共感しますか？',
    options: [
      { id: 'fc11_1', text: '新しい友達を作ることを積極的に行う', value: 1 },
      { id: 'fc11_2', text: '少数の親しい友達との深い関係を大切にする', value: 2 }
    ],
    category: '社交性',
    weight: 3
  },
  
  {
    id: 'fc_12',
    mode: 'friendship',
    text: 'どちらが重要だと思いますか？',
    options: [
      { id: 'fc12_1', text: '友達との楽しい時間を共有すること', value: 1 },
      { id: 'fc12_2', text: '友達の悩みを聞いて支えること', value: 2 }
    ],
    category: '支援性',
    weight: 3
  },
  
  {
    id: 'fc_13',
    mode: 'friendship',
    text: 'どちらを選びますか？',
    options: [
      { id: 'fc13_1', text: 'グループでの活動を楽しむこと', value: 1 },
      { id: 'fc13_2', text: '一対一での深い会話を好むこと', value: 2 }
    ],
    category: '交流スタイル',
    weight: 3
  },
  
  {
    id: 'fc_14',
    mode: 'friendship',
    text: 'どちらにより価値を感じますか？',
    options: [
      { id: 'fc14_1', text: '友達との共通の趣味や活動', value: 1 },
      { id: 'fc14_2', text: '友達との価値観や考え方の共有', value: 2 }
    ],
    category: '価値観',
    weight: 4
  },
  
  {
    id: 'fc_15',
    mode: 'friendship',
    text: 'どちらが自然ですか？',
    options: [
      { id: 'fc15_1', text: '友達の意見に合わせて調和を図ること', value: 1 },
      { id: 'fc15_2', text: '自分の意見をはっきりと伝えること', value: 2 }
    ],
    category: 'コミュニケーション',
    weight: 4
  }
]

// 16タイプ判定用の質問を選択（8問固定）
export function getRandomForcedChoiceQuestions(count: number, mode: AppMode): Question[] {
  // 16タイプ判定に必要な8問を固定で選択
  const essentialQuestions = [
    'fc_1',  // 開放性 vs 安定性
    'fc_2',  // 外向性 vs 内向性
    'fc_6',  // 価値観: 仕事 vs 生活
    'fc_7',  // コミュニケーション: 直接 vs 配慮
    'fc_8',  // ライフスタイル: 冒険 vs 安定
    'fc_10', // 将来観: 成長 vs 安定
    'fc_11', // 友達モード用の外向性
    'fc_15'  // 友達モード用のコミュニケーション
  ]
  
  const modeQuestions = forcedChoiceQuestions.filter(q => 
    essentialQuestions.includes(q.id) && (q.mode === mode || q.mode === 'romance')
  )
  
  // 8問を確実に返す
  return modeQuestions.slice(0, 8)
}

// 全質問を取得
export function getAllForcedChoiceQuestions(mode: AppMode): Question[] {
  return forcedChoiceQuestions.filter(q => q.mode === mode || q.mode === 'romance')
}
