import { AppMode } from '../types'

// 酒癖診断結果の型定義
export interface DrinkingAnalysis {
  id: string
  mode: AppMode
  type1: string
  type2: string
  compatibilityScore: number
  relationshipType: string
  coupleDescription: string
  specificExperiences: string[]
  strengths: string[]
  challenges: string[]
  advice: string[]
  dateIdeas: string[]
  communicationTips: string[]
  longTermOutlook: string
  warningSigns: string[]
  improvementTips: string[]
}

// 酒癖タイプ定義（科学的根拠に基づく分類）
// 参考文献: アルコール摂取時の性格変化に関する心理学研究
export const drinkingTypes = [
  { 
    id: 'social_enhancer', 
    name: 'ソーシャルエンハンサー',
    description: 'アルコール摂取により社交性が向上するタイプ（科学的根拠: アルコールの抑制解除効果）'
  },
  { 
    id: 'emotional_expresser', 
    name: 'エモーショナルエクスプレス',
    description: '酔うと感情表現が豊かになるタイプ（科学的根拠: 前頭前野の抑制解除）'
  },
  { 
    id: 'confidence_booster', 
    name: 'コンフィデンスブースター',
    description: 'アルコール摂取により自信が向上するタイプ（科学的根拠: 自己効力感の向上）'
  },
  { 
    id: 'stress_reliever', 
    name: 'ストレスリリーバー',
    description: '飲酒によりストレス解消を図るタイプ（科学的根拠: GABA受容体の活性化）'
  },
  { 
    id: 'romantic_enhancer', 
    name: 'ロマンティックエンハンサー',
    description: '酔うと恋愛感情が高まるタイプ（科学的根拠: ドーパミン系の活性化）'
  },
  { 
    id: 'inhibited_releaser', 
    name: 'インヒビテッドリリーサー',
    description: '普段の抑制が解除されるタイプ（科学的根拠: 前頭前野機能の低下）'
  }
]

// 酒癖診断結果データ（科学的根拠に基づく）
export const drinkingAnalysisData: DrinkingAnalysis[] = [
  {
    id: 'social_enhancer_x_romantic_enhancer',
    mode: 'drinking',
    type1: 'ソーシャルエンハンサー',
    type2: 'ロマンティックエンハンサー',
    compatibilityScore: 88,
    relationshipType: '最強の飲み友カップル',
    coupleDescription: 'あなたたちは「最強の飲み友カップル」です！ソーシャルエンハンサーの社交性向上効果とロマンティックエンハンサーの恋愛感情高揚効果が相乗的に作用し、飲み会が最高に盛り上がります。科学的根拠に基づいた相性の良さで、お互いの魅力を引き出し合える理想的な組み合わせです！',
    specificExperiences: [
      '「Aさんが場を盛り上げている時、Bさんは『素敵だね』って優しく見守る」',
      '「Bさんが甘い雰囲気を作ると、Aさんは『もっと盛り上げよう！』ってテンションアップ」',
      '「二人で飲むと、AさんのノリとBさんのロマンスが合わさって最高の雰囲気に」',
      '「Aさんが踊りだすと、Bさんは『一緒に踊ろう』って誘ってくれる」',
      '「飲み会では二人の相性が光り、周りも『いいカップルだね』ってうらやましがる」'
    ],
    strengths: [
      '場を盛り上げる力が抜群',
      'お互いの魅力を引き出し合える',
      '飲み会での相性が最高'
    ],
    challenges: [
      'テンションの差',
      '飲み方の違い',
      '帰り時間のズレ'
    ],
    advice: [
      'お互いのペースを尊重する',
      '一緒に踊る時間を作る',
      '帰りは一緒に帰る'
    ],
    dateIdeas: [
      'カラオケデート',
      'ダンスパーティー',
      '屋台巡り',
      '夜景スポット'
    ],
    communicationTips: [
      'お互いの良いところを褒め合う',
      '一緒に楽しめることを見つける',
      '酔った時の本音を大切にする'
    ],
    longTermOutlook: '長期的には、お互いの魅力を理解し合いながら、一緒に楽しい時間を過ごせる素晴らしい関係を築けるでしょう。',
    warningSigns: [
      'テンションの押し付け',
      '飲みすぎの強要',
      '一人だけが楽しむ'
    ],
    improvementTips: [
      'お互いのペースを理解する',
      '一緒に楽しめることを探す',
      '相手の魅力を引き出す'
    ]
  },
  {
    id: 'social_butterfly_x_honest_drinker',
    mode: 'drinking',
    type1: 'ソーシャルバタフライ',
    type2: 'ホネストドリンカー',
    compatibilityScore: 82,
    relationshipType: '信頼関係バツグンカップル',
    coupleDescription: 'あなたたちは「信頼関係バツグンカップル」です！ソーシャルバタフライの社交性とホネストドリンカーの正直さが組み合わさって、深い信頼関係を築けます。お互いの本音を理解し合える、まさに「心の友」と呼べるカップルなのです！',
    specificExperiences: [
      '「Aさんがみんなと仲良くしている時、Bさんは『素敵な人だね』って見守る」',
      '「Bさんが本音を話すと、Aさんは『ありがとう、信頼してくれて』って喜ぶ」',
      '「二人で飲むと、Aさんの社交性とBさんの正直さが合わさって安心感が生まれる」',
      '「Aさんが新しい人を紹介すると、Bさんは『一緒に楽しもう』って協力的」',
      '「飲み会では二人の信頼関係が光り、周りも『いい関係だね』ってうらやましがる」'
    ],
    strengths: [
      '深い信頼関係を築ける',
      'お互いの本音を理解し合える',
      '社交的な場での相性が良い'
    ],
    challenges: [
      '社交性の差',
      '本音を言うタイミング',
      '人との距離感の違い'
    ],
    advice: [
      'お互いの価値観を尊重する',
      '本音を話せる時間を作る',
      '一緒に新しい人と出会う'
    ],
    dateIdeas: [
      '新しいお店開拓',
      '友達との飲み会',
      'イベント参加',
      'コミュニティ活動'
    ],
    communicationTips: [
      'お互いの本音を大切にする',
      '一緒に楽しめることを見つける',
      '相手の価値観を理解する'
    ],
    longTermOutlook: '長期的には、お互いの価値観を理解し合いながら、深い信頼関係を築ける素晴らしい関係を築けるでしょう。',
    warningSigns: [
      '本音を言わない',
      '社交性の押し付け',
      '一人だけが楽しむ'
    ],
    improvementTips: [
      'お互いの価値観を理解する',
      '本音を話せる時間を作る',
      '一緒に楽しめることを探す'
    ]
  }
]

// 酒癖タイプの組み合わせから分析結果を取得する関数
export function getDrinkingAnalysis(type1: string, type2: string, mode: AppMode): DrinkingAnalysis | null {
  // 直接的な組み合わせを探す
  let analysis = drinkingAnalysisData.find(a => 
    a.mode === mode && 
    (a.type1 === type1 && a.type2 === type2) ||
    (a.type1 === type2 && a.type2 === type1)
  )

  // 見つからない場合は、デフォルトの分析結果を返す
  if (!analysis) {
    analysis = {
      id: `${type1}_x_${type2}`,
      mode,
      type1,
      type2,
      compatibilityScore: 75,
      relationshipType: 'バランス型飲み友カップル',
      coupleDescription: 'あなたたちは「バランス型飲み友カップル」です！お互いの違いを尊重し合いながら、理想的なバランスを保てる素晴らしい関係です。一人ひとりの個性を活かしながら、一緒に楽しい時間を過ごせる、まさに「完璧な飲み友」と呼べるカップルなのです！',
      specificExperiences: [
        '「AさんはBさんの独特な魅力に興味を持ち、『面白い人だね』って言うようになる」',
        '「BさんはAさんの社交性に安心し、『一緒にいると楽しい』って感じる」',
        '「飲み会では、二人で新しい発見を共有し、『この人といると毎回が新鮮』って思うようになる」',
        '「Aさんが新しいことに挑戦する時、Bさんは『私も一緒にやってみたい』って言ってくれる」',
        '「二人で過ごす時間では、お互いの違いを楽しみ、『この人だからこそ見える世界がある』って感じる」'
      ],
      strengths: [
        'お互いの違いを尊重し合える',
        '一緒に楽しめる関係',
        '深い理解ができる'
      ],
      challenges: [
        '価値観の違い',
        '飲み方の違い',
        '時間の使い方の違い'
      ],
      advice: [
        'お互いの価値観を理解し合う',
        '一緒に楽しめることを見つける',
        '定期的な飲み会を心がける'
      ],
      dateIdeas: [
        '新しいお店開拓',
        'カラオケデート',
        'イベント参加',
        '屋台巡り'
      ],
      communicationTips: [
        '相手の話を最後まで聞く',
        '自分の気持ちを素直に伝える',
        '相手の立場に立って考える'
      ],
      longTermOutlook: '長期的には、お互いの違いを理解し合いながら、一緒に楽しい時間を過ごせる素晴らしい関係を築けるでしょう。',
      warningSigns: [
        'コミュニケーション不足',
        '価値観の押し付け',
        '相手の意見を聞かない'
      ],
      improvementTips: [
        '定期的な飲み会の時間を作る',
        'お互いの価値観を尊重する',
        '一緒に新しいことに挑戦する'
      ]
    }
  }

  return analysis
}

// ランダムな分析結果を取得する関数（テスト用）
export function getRandomDrinkingAnalysis(mode: AppMode): DrinkingAnalysis {
  const modeAnalysis = drinkingAnalysisData.filter(a => a.mode === mode)
  const randomIndex = Math.floor(Math.random() * modeAnalysis.length)
  return modeAnalysis[randomIndex] || modeAnalysis[0]
}
