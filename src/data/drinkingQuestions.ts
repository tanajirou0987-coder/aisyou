import { Question, AppMode } from '../types'

// グラスノオト用の質問データ
export const drinkingQuestions: Question[] = [
  {
    id: 'drinking_1',
    text: '今、気になる異性と飲みに行きたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_2',
    text: '今、場を盛り上げていますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_3',
    text: '今、いつもよりお酒の量が増えていますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '飲酒量',
    weight: 1
  },
  {
    id: 'drinking_4',
    text: '今、普段言えないことを口にしていますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '本音度',
    weight: 1
  },
  {
    id: 'drinking_5',
    text: '今、異性の隣に座りたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_6',
    text: '今、歌いたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_7',
    text: '今、異性の話をよく聞けていますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_8',
    text: '今、人懐っこくなっていますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '社交性',
    weight: 1
  },
  {
    id: 'drinking_9',
    text: '今、異性に話しかけたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_10',
    text: '今、踊りたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_11',
    text: '今、異性の好みを聞きたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_12',
    text: '今、冗談が増えていますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_13',
    text: '今、異性と二人きりになりたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_14',
    text: '今、人に頼りたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '社交性',
    weight: 1
  },
  {
    id: 'drinking_15',
    text: '今、異性の連絡先を聞きたい気分ですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  }
]

// グラスノオト用の質問を取得する関数
export function getDrinkingQuestions(mode: AppMode): Question[] {
  if (mode !== 'drinking') return []
  return drinkingQuestions
}

// ランダムに15問を取得する関数（重複を防ぐ）
export function getRandomDrinkingQuestions(mode: AppMode): Question[] {
  if (mode !== 'drinking') return []
  
  // シンプルなFisher-Yatesシャッフルアルゴリズムを使用
  const questions = [...drinkingQuestions]
  
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }
  
  // 重複を防ぐためにユニークな質問のみを取得
  const uniqueQuestions = questions.filter((question, index, self) => 
    index === self.findIndex(q => q.id === question.id)
  )
  
  return uniqueQuestions.slice(0, 15)
}

