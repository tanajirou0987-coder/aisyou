import { Question, AppMode } from '../types'

// 酒癖診断用の質問データ
export const drinkingQuestions: Question[] = [
  {
    id: 'drinking_1',
    text: 'アルコールは前頭前野の抑制を弱めます。今は、気になる異性がいると積極的に飲みに行きたいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_2',
    text: 'アルコールは理性のブレーキを弱めます。今は、酔うと場の盛り上げ役になりやすいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_3',
    text: '感情の抑制が下がると行動も大胆になります。今は、仲の良い友人と飲むと飲酒量が増えやすいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '飲酒量',
    weight: 1
  },
  {
    id: 'drinking_4',
    text: '前頭前野の働きが弱まると本音が出やすくなります。今は、酔うと普段言えない本音を言いやすいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '本音度',
    weight: 1
  },
  {
    id: 'drinking_5',
    text: '抑制が弱まると対人行動が積極的になります。今は、飲み会で異性の隣に座りたいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_6',
    text: '情動の高まりで多弁・行動化が起きやすくなります。今は、酔うとテンションが上がって歌い出しやすいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_7',
    text: '社会的動機づけが高まることがあります。今は、飲み会で異性の話を積極的に聞きたいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_8',
    text: '大脳辺縁系の活性化で親和性が高まることがあります。今は、酔うと人懐っこくなりやすいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '社交性',
    weight: 1
  },
  {
    id: 'drinking_9',
    text: '抑制低下でアプローチ行動が増えることがあります。今は、飲み会で異性に積極的に話しかけたいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_10',
    text: '運動抑制の低下で身体表現が活発になります。今は、酔うとダンスを踊りたくなりますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_11',
    text: '対人好奇心が高まりやすくなります。今は、飲み会で異性の好みを聞きたいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_12',
    text: '情動表現が豊かになりやすくなります。今は、酔うと冗談を言って場を盛り上げたいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '盛り上げ力',
    weight: 1
  },
  {
    id: 'drinking_13',
    text: '抑制の低下で親密行動が増えることがあります。今は、飲み会で異性と二人きりになりたいですか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '恋愛積極性',
    weight: 1
  },
  {
    id: 'drinking_14',
    text: '依存傾向の表出が起こりやすくなります。今は、酔うと人に甘えたくなりますか？',
    options: [
      { id: 'yes', text: 'YES', value: 1 },
      { id: 'no', text: 'NO', value: 0 }
    ],
    category: '社交性',
    weight: 1
  },
  {
    id: 'drinking_15',
    text: '意思決定の抑制が弱まり積極性が増します。今は、飲み会で異性の連絡先を聞きたいですか？',
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

