import { Question, AppMode } from '../types'

// 固定15問の質問データ（答えの組み合わせからタイプを瞬時に判定）
const fixed15Questions: Question[] = [
  // 質問1: 開放性 vs 安定性
  {
    id: 'q1',
    mode: 'romance',
    text: 'どちらにより共感しますか？',
    options: [
      { id: 'q1_1', text: '新しいアイデアや体験を積極的に試すこと', value: 1 },
      { id: 'q1_2', text: '確実で安全な方法を選ぶこと', value: 2 }
    ],
    category: '開放性',
    weight: 3
  },
  
  // 質問2: 外向性 vs 内向性
  {
    id: 'q2',
    mode: 'romance',
    text: 'どちらが重要だと思いますか？',
    options: [
      { id: 'q2_1', text: '人との交流でエネルギーを得ること', value: 1 },
      { id: 'q2_2', text: '一人の時間でエネルギーを回復すること', value: 2 }
    ],
    category: '外向性',
    weight: 3
  },
  
  // 質問3: 誠実性 vs 柔軟性
  {
    id: 'q3',
    mode: 'romance',
    text: 'どちらを選びますか？',
    options: [
      { id: 'q3_1', text: '計画を立てて計画的に行動すること', value: 1 },
      { id: 'q3_2', text: 'その場の流れに任せて柔軟に対応すること', value: 2 }
    ],
    category: '誠実性',
    weight: 3
  },
  
  // 質問4: 協調性 vs 独立性
  {
    id: 'q4',
    mode: 'romance',
    text: 'どちらにより価値を感じますか？',
    options: [
      { id: 'q4_1', text: 'チームワークと協調を大切にすること', value: 1 },
      { id: 'q4_2', text: '個人の判断と独立性を重視すること', value: 2 }
    ],
    category: '協調性',
    weight: 3
  },
  
  // 質問5: 感情安定性 vs 感受性
  {
    id: 'q5',
    mode: 'romance',
    text: 'どちらが自然ですか？',
    options: [
      { id: 'q5_1', text: 'ストレスがあっても冷静でいられること', value: 1 },
      { id: 'q5_2', text: '感情に素直に反応し表現すること', value: 2 }
    ],
    category: '感情安定性',
    weight: 3
  },
  
  // 質問6: 価値観 - 仕事 vs プライベート
  {
    id: 'q6',
    mode: 'romance',
    text: 'どちらを優先しますか？',
    options: [
      { id: 'q6_1', text: '仕事での成功と達成感', value: 1 },
      { id: 'q6_2', text: 'プライベートでの充実と楽しみ', value: 2 }
    ],
    category: '価値観',
    weight: 4
  },
  
  // 質問7: コミュニケーション - 直接 vs 配慮
  {
    id: 'q7',
    mode: 'romance',
    text: 'どちらのコミュニケーションを好みますか？',
    options: [
      { id: 'q7_1', text: '率直で直接的な意見交換', value: 1 },
      { id: 'q7_2', text: '相手を思いやる優しい表現', value: 2 }
    ],
    category: 'コミュニケーション',
    weight: 4
  },
  
  // 質問8: ライフスタイル - 冒険 vs 安定
  {
    id: 'q8',
    mode: 'romance',
    text: 'どちらの生活を理想としますか？',
    options: [
      { id: 'q8_1', text: '変化に富んだ冒険的な生活', value: 1 },
      { id: 'q8_2', text: '安定した予測可能な生活', value: 2 }
    ],
    category: 'ライフスタイル',
    weight: 3
  },
  
  // 質問9: 恋愛観 - 情熱 vs 安定
  {
    id: 'q9',
    mode: 'romance',
    text: 'どちらを重視しますか？',
    options: [
      { id: 'q9_1', text: '情熱的でドラマチックな恋愛', value: 1 },
      { id: 'q9_2', text: '安定した信頼関係のある恋愛', value: 2 }
    ],
    category: '恋愛観',
    weight: 3
  },
  
  // 質問10: 将来観 - 成長 vs 安定
  {
    id: 'q10',
    mode: 'romance',
    text: 'どちらを目指しますか？',
    options: [
      { id: 'q10_1', text: '常に成長し続けること', value: 1 },
      { id: 'q10_2', text: '現在の安定を維持すること', value: 2 }
    ],
    category: '将来観',
    weight: 3
  },
  
  // 質問11: 社交性 - 広い vs 深い
  {
    id: 'q11',
    mode: 'romance',
    text: 'どちらを好みますか？',
    options: [
      { id: 'q11_1', text: '多くの人との浅い関係', value: 1 },
      { id: 'q11_2', text: '少数の人との深い関係', value: 2 }
    ],
    category: '社交性',
    weight: 3
  },
  
  // 質問12: 決断力 - 迅速 vs 慎重
  {
    id: 'q12',
    mode: 'romance',
    text: 'どちらの決断スタイルですか？',
    options: [
      { id: 'q12_1', text: '素早く決断して行動する', value: 1 },
      { id: 'q12_2', text: 'じっくり考えてから決断する', value: 2 }
    ],
    category: '決断力',
    weight: 3
  },
  
  // 質問13: リーダーシップ - 主導 vs 協調
  {
    id: 'q13',
    mode: 'romance',
    text: 'どちらが自然ですか？',
    options: [
      { id: 'q13_1', text: 'グループを引っ張って主導する', value: 1 },
      { id: 'q13_2', text: 'グループの調和を保つ', value: 2 }
    ],
    category: 'リーダーシップ',
    weight: 3
  },
  
  // 質問14: 創造性 - 独創 vs 実用
  {
    id: 'q14',
    mode: 'romance',
    text: 'どちらを重視しますか？',
    options: [
      { id: 'q14_1', text: '独創的で新しいアイデア', value: 1 },
      { id: 'q14_2', text: '実用的で確実な方法', value: 2 }
    ],
    category: '創造性',
    weight: 3
  },
  
  // 質問15: 完璧主義 - 完璧 vs 効率
  {
    id: 'q15',
    mode: 'romance',
    text: 'どちらを選びますか？',
    options: [
      { id: 'q15_1', text: '完璧を目指して時間をかける', value: 1 },
      { id: 'q15_2', text: '効率を重視して早く終わらせる', value: 2 }
    ],
    category: '完璧主義',
    weight: 3
  }
]

// 固定15問を取得
export function getFixed15Questions(): Question[] {
  return fixed15Questions
}

// 友達モード用の質問（一部変更）
export function getFixed15QuestionsForFriendship(): Question[] {
  return fixed15Questions.map(q => {
    if (q.id === 'q6') {
      return {
        ...q,
        text: 'どちらを優先しますか？',
        options: [
          { id: 'q6_1', text: '勉強や活動での成果と達成感', value: 1 },
          { id: 'q6_2', text: '友達との時間での充実と楽しみ', value: 2 }
        ]
      }
    }
    if (q.id === 'q9') {
      return {
        ...q,
        text: 'どちらを重視しますか？',
        options: [
          { id: 'q9_1', text: '刺激的で楽しい友達関係', value: 1 },
          { id: 'q9_2', text: '安定した信頼できる友達関係', value: 2 }
        ]
      }
    }
    return q
  })
}







