import { Question, AppMode } from '../types'

// 酒癖診断用の質問データ
export const drinkingQuestions: Question[] = [
  {
    id: 'drinking_1',
    text: '気になる異性がいると積極的に飲みにいく？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_2',
    text: '酔うと盛り上げ役になる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_3',
    text: '仲のいい友達と飲むとつい飲みすぎる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '飲酒量',
    weight: 1
  },
  {
    id: 'drinking_4',
    text: '酔うと普段言えない本音を言う？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '本音度',
    weight: 1
  },
  {
    id: 'drinking_5',
    text: '飲み会で異性の隣に座りたがる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_6',
    text: '酔うとテンションが上がって歌いだす？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_7',
    text: '飲み会で異性の話をよく聞く？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_8',
    text: '酔うと人懐っこくなる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '社交性',
    weight: 1
  },
  {
    id: 'drinking_9',
    text: '飲み会で異性に積極的に話しかける？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_10',
    text: '酔うとダンスを踊りたがる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_11',
    text: '飲み会で異性の好みを聞きたがる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_12',
    text: '酔うと冗談を言って場を盛り上げる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_13',
    text: '飲み会で異性と2人きりになりたがる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_14',
    text: '酔うと人に甘えたがる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '社交性',
    weight: 1
  },
  {
    id: 'drinking_15',
    text: '飲み会で異性の連絡先を聞きたがる？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  }
]

// 酒癖診断用の質問を取得する関数
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

