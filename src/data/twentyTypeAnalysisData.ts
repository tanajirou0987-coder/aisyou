import { AppMode } from '../types'

// 20タイプ分析結果の型定義
export interface TwentyTypeAnalysis {
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

// 20タイプ定義
export const twentyTypes = [
  { id: 'adventurous_social_growth', name: '冒険的社交家-成長志向' },
  { id: 'adventurous_social_free', name: '冒険的社交家-自由奔放' },
  { id: 'introspective_perfectionist', name: '内省的探求者-完璧主義' },
  { id: 'introspective_caring', name: '内省的探求者-思いやり深い' },
  { id: 'stable_social_responsible', name: '安定した社交家-責任感強い' },
  { id: 'stable_social_individual', name: '安定した社交家-個人主義' },
  { id: 'stable_introvert_cautious', name: '安定した内省家-慎重' },
  { id: 'stable_introvert_cooperative', name: '安定した内省家-協調的' },
  { id: 'passionate_leader', name: '情熱的リーダー' },
  { id: 'creative_cooperator', name: '創造的協調者' },
  { id: 'practical_social', name: '実務的社交家' },
  { id: 'gentle_introvert', name: '穏やかな内省家' },
  { id: 'adventurous_perfectionist', name: '冒険的完璧主義者' },
  { id: 'social_free_spirit', name: '社交的自由人' },
  { id: 'stable_practical', name: '安定した実務家' },
  { id: 'introspective_idealist', name: '内省的な理想主義者' },
  { id: 'passionate_adventurer', name: '情熱的な冒険家' },
  { id: 'stable_realist', name: '安定した現実主義者' },
  { id: 'sensitive_artist', name: '敏感な芸術家' },
  { id: 'cautious_stabilizer', name: '慎重な安定家' },
]

// 恋愛モード用の20タイプ分析データ
const romanceTwentyTypeAnalysis: TwentyTypeAnalysis[] = [
  {
    id: 'adventurous_social_growth_x_introspective_caring',
    mode: 'romance',
    type1: '冒険的社交家-成長志向',
    type2: '内省的探求者-思いやり深い',
    compatibilityScore: 88,
    relationshipType: '理想的な成長カップル',
    coupleDescription: 'あなたたちは「理想的な成長カップル」です！一人は新しい体験を求めて人との交流でエネルギーを得る成長志向の人、もう一人は深く考えて思いやり深い探求者。この組み合わせは、お互いの違いを尊重しながら、一緒に新しい世界を発見していく素晴らしい関係を築けます。社交的な刺激と内省的な深さ、成長への意欲と思いやり、両方の魅力を兼ね備えた、まさに「完璧なパートナーシップ」を築けるカップルなのです！',
    specificExperiences: [
      '「AさんはBさんの深い思いやりに感動し、『いつも優しくて心が温まる』って言うようになる」',
      '「BさんはAさんの成長への意欲に刺激され、『一緒にいると頑張ろうって思える』って感じる」',
      '「付き合うと、Aさんが新しい場所に連れて行って、Bさんがその場所の歴史や文化を詳しく教えてくれる関係になる」',
      '「Aさんが友達を紹介すると、Bさんは一人一人の性格をよく観察して、『あの人、実は優しい人だね』って言う」',
      '「二人で旅行すると、Aさんが計画を立てて、Bさんがその場所の隠れた名所を見つけてくれる」'
    ],
    strengths: [
      '新しい体験を共有できる',
      'お互いの違いを尊重し合える',
      '成長し合える関係',
      '深い会話ができる',
      '思いやり深い関係'
    ],
    challenges: [
      '社交性の違いによる疲労',
      '一人の時間の取り方の違い',
      '計画性の違い'
    ],
    advice: [
      'お互いのペースを尊重しましょう',
      '定期的にデートの計画を立てましょう',
      '一人の時間も大切にしましょう'
    ],
    dateIdeas: [
      '新しいレストランでのディナー',
      '美術館や博物館巡り',
      'ハイキングや自然散策',
      '読書カフェでの時間'
    ],
    communicationTips: [
      '相手の話を最後まで聞く',
      '感情を素直に伝える',
      '定期的な振り返りの時間を作る'
    ],
    longTermOutlook: 'お互いを高め合いながら、長期的に安定した関係を築ける可能性が高いカップルです。',
    warningSigns: [
      '一方的な会話が続く',
      '相手の価値観を否定する',
      '一人の時間を奪い合う'
    ],
    improvementTips: [
      '週に1回は深い話をする時間を作る',
      'お互いの趣味を理解し合う',
      '定期的に新しいことに挑戦する'
    ]
  },
  {
    id: 'stable_social_responsible_x_stable_introvert_cooperative',
    mode: 'romance',
    type1: '安定した社交家-責任感強い',
    type2: '安定した内省家-協調的',
    compatibilityScore: 92,
    relationshipType: '安定した信頼カップル',
    coupleDescription: 'あなたたちは「安定した信頼カップル」です！二人とも安定を大切にし、お互いを深く理解し合える素晴らしい関係です。一人は人とのつながりを大切にする責任感強い社交家、もう一人は一人の時間も大切にする協調的な内省家。この組み合わせは、安定感と信頼関係を基盤に、長期的で深い愛情を育んでいける理想的なカップルです。お互いのペースを尊重しながら、一緒に穏やかで幸せな時間を過ごしていける、まさに「永遠のパートナー」と呼べる関係なのです！',
    specificExperiences: [
      '「AさんはBさんの安定感に安心し、『一緒にいると心が落ち着く』って言うようになる」',
      '「BさんはAさんの責任感に感動し、『頼りになる人だな』って感じる」',
      '「付き合うと、二人で同じ映画を何度も見て、『このシーン、前回気づかなかった』って新たな発見をする」',
      '「Aさんが友達と会う時、Bさんは『楽しんできてね』って送り出し、帰ってきたら『どうだった？』って聞く」',
      '「二人で過ごす時間が増えると、『この人といると自然体でいられる』ってお互い感じるようになる」'
    ],
    strengths: [
      'お互いを深く理解している',
      '安定した関係性',
      '信頼関係が強い',
      '長期的な視点を持っている',
      '協調性が高い'
    ],
    challenges: [
      '変化への対応が苦手',
      '新しい刺激が少ない',
      'マンネリ化しやすい'
    ],
    advice: [
      '定期的に新しい体験を共有しましょう',
      'お互いの成長をサポートしましょう',
      '小さな変化も大切にしましょう'
    ],
    dateIdeas: [
      '定番レストランでのディナー',
      '映画鑑賞',
      '散歩やドライブ',
      '家でのんびり過ごす'
    ],
    communicationTips: [
      '日常の些細なことでも話し合う',
      '感謝の気持ちを伝える',
      '定期的に将来について話す'
    ],
    longTermOutlook: '非常に安定した関係を築けるカップルです。結婚や長期的なパートナーシップに適しています。',
    warningSigns: [
      'マンネリ化を放置する',
      '変化を恐れすぎる',
      'お互いの成長を阻害する'
    ],
    improvementTips: [
      '月に1回は新しい場所に行く',
      'お互いの目標を共有する',
      '定期的にデートの計画を立てる'
    ]
  },
  {
    id: 'passionate_leader_x_creative_cooperator',
    mode: 'romance',
    type1: '情熱的リーダー',
    type2: '創造的協調者',
    compatibilityScore: 85,
    relationshipType: 'リーダーシップ補完カップル',
    coupleDescription: 'あなたたちは「リーダーシップ補完カップル」です！一人は情熱的でグループを引っ張る力強いリーダー、もう一人は創造的で協調性の高い人。この組み合わせは、お互いの強みを活かし合いながら、完璧なチームワークを発揮できる素晴らしい関係です。力強さと創造性、リーダーシップと協調性、両方の魅力を兼ね備えた、まさに「理想的なパートナー」と呼べるカップルなのです！',
    specificExperiences: [
      '「AさんはBさんの創造性に感動し、『いつも新しいアイデアが面白い』って言うようになる」',
      '「BさんはAさんのリーダーシップに憧れ、『頼りになる人だな』って感じる」',
      '「付き合うと、Aさんが困ってる人を見つけると、Bさんが『一緒に手伝おう』って言ってくれる」',
      '「Aさんが決断に迷ってる時、Bさんは『あなたの判断を信じてる』って言って、背中を押してくれる」',
      '「二人で友達と会う時、Aさんが場を盛り上げて、Bさんが一人一人に気を配る、完璧なチームワークを発揮する」'
    ],
    strengths: [
      'お互いの強みを活かし合える',
      'バランスの取れた関係',
      'お互いを支え合える',
      '成長し合える',
      '創造性が高い'
    ],
    challenges: [
      'コミュニケーションスタイルの違い',
      '意思決定の方法の違い',
      'ストレス対処法の違い'
    ],
    advice: [
      'お互いのコミュニケーションスタイルを理解しましょう',
      '意思決定は一緒に行いましょう',
      'お互いの強みを活かしましょう'
    ],
    dateIdeas: [
      'リーダーシップを活かしたデート企画',
      '創造的なサプライズ',
      '一緒に新しいことに挑戦',
      'お互いの趣味を体験する'
    ],
    communicationTips: [
      '率直さと思いやりを両立する',
      'お互いの意見を尊重する',
      '定期的にフィードバックを交換する'
    ],
    longTermOutlook: 'お互いの強みを活かしながら、長期的に安定した関係を築けるカップルです。',
    warningSigns: [
      '一方的にリーダーシップを取る',
      '相手の意見を聞かない',
      '思いやりを欠く'
    ],
    improvementTips: [
      '月に1回は役割を交代する',
      'お互いの強みを理解し合う',
      '定期的に関係性を見直す'
    ]
  },
  {
    id: 'passionate_adventurer_x_stable_realist',
    mode: 'romance',
    type1: '情熱的な冒険家',
    type2: '安定した現実主義者',
    compatibilityScore: 78,
    relationshipType: '刺激と安定のバランスカップル',
    coupleDescription: 'あなたたちは「刺激と安定のバランスカップル」です！一人は情熱的で新しい冒険を求めるエネルギッシュな人、もう一人は安定した現実的な生活を大切にする人。この組み合わせは、お互いの価値観を尊重しながら、刺激と安定の絶妙なバランスを保てる素晴らしい関係です。情熱的な刺激と穏やかな安定、現実的な判断、両方の魅力を兼ね備えた、まさに「完璧なバランス」を追求できるカップルなのです！',
    specificExperiences: [
      '「AさんはBさんの安定感に安心し、『一緒にいると心が落ち着く』って言うようになる」',
      '「BさんはAさんの情熱的な性格に刺激され、『一緒にいるとワクワクする』って感じる」',
      '「付き合うと、Aさんが新しいことに挑戦する時、Bさんが『私も応援してる』って言ってくれる」',
      '「Aさんが冒険的な計画を立てる時、Bさんは『一緒に考えよう』って言って、現実的なアドバイスをしてくれる」',
      '「二人で過ごす時間では、Aさんが新しい発見をして、Bさんがそれを温かく受け入れてくれる関係になる」'
    ],
    strengths: [
      'お互いの価値観を補完し合える',
      'バランスの取れた関係',
      '長期的な視点を持っている',
      'お互いを支え合える',
      '現実的な判断力'
    ],
    challenges: [
      '価値観の違いが大きい',
      '生活スタイルの違い',
      'ストレス対処法の違い'
    ],
    advice: [
      'お互いの価値観を尊重しましょう',
      'バランスの取れた生活を心がけましょう',
      '定期的に話し合いの時間を作りましょう'
    ],
    dateIdeas: [
      '冒険的な体験と安定した時間の組み合わせ',
      '新しい場所でのリラックスタイム',
      '一緒に新しいことに挑戦',
      '定番の場所での特別な時間'
    ],
    communicationTips: [
      'お互いの価値観を理解する',
      '妥協点を見つける',
      '定期的に将来について話す'
    ],
    longTermOutlook: 'お互いの価値観を尊重しながら、安定した関係を築ける可能性があります。',
    warningSigns: [
      '一方的に自分の価値観を押し付ける',
      '相手の価値観を否定する',
      '妥協を拒否する'
    ],
    improvementTips: [
      '週に1回はお互いの価値観について話す',
      '小さな変化から始める',
      '定期的に新しい体験を共有する'
    ]
  },
  {
    id: 'sensitive_artist_x_cautious_stabilizer',
    mode: 'romance',
    type1: '敏感な芸術家',
    type2: '慎重な安定家',
    compatibilityScore: 82,
    relationshipType: '繊細な理解カップル',
    coupleDescription: 'あなたたちは「繊細な理解カップル」です！一人は敏感で芸術的な感性を持つ人、もう一人は慎重で安定を大切にする人。この組み合わせは、お互いの繊細さを理解し合いながら、深い共感と安定感を築ける素晴らしい関係です。芸術的な感性と現実的な安定感、敏感さと慎重さ、両方の魅力を兼ね備えた、まさに「心の通い合う」カップルなのです！',
    specificExperiences: [
      '「AさんはBさんの慎重さに安心し、『一緒にいると心が落ち着く』って言うようになる」',
      '「BさんはAさんの芸術的な感性に感動し、『美しいものを見る目があるね』って感じる」',
      '「付き合うと、Aさんが芸術作品について語る時、Bさんが『面白い視点だね』って真剣に聞いてくれる」',
      '「Aさんが不安になった時、Bさんは『大丈夫だよ』って優しく支えてくれる」',
      '「二人で過ごす時間では、Aさんが美しいものを発見して、Bさんがそれを一緒に楽しんでくれる関係になる」'
    ],
    strengths: [
      'お互いの繊細さを理解し合える',
      '深い共感ができる',
      '安定した関係性',
      '芸術的な感性を共有できる',
      '慎重な判断力'
    ],
    challenges: [
      '感情の起伏が大きい',
      '変化への対応が苦手',
      'ストレスに敏感'
    ],
    advice: [
      'お互いの感情を理解しましょう',
      '安定した環境を作りましょう',
      '定期的にリラックスの時間を作りましょう'
    ],
    dateIdeas: [
      '美術館や博物館巡り',
      '静かなカフェでの時間',
      '自然散策',
      '家でのんびり過ごす'
    ],
    communicationTips: [
      '相手の感情を理解する',
      '優しい言葉をかける',
      '定期的に気持ちを確認する'
    ],
    longTermOutlook: 'お互いの繊細さを理解し合いながら、深い愛情を育んでいけるカップルです。',
    warningSigns: [
      '感情の起伏を放置する',
      '変化を恐れすぎる',
      'ストレスを溜め込む'
    ],
    improvementTips: [
      '週に1回は感情について話し合う',
      'リラックス方法を共有する',
      '定期的に新しい体験を慎重に試す'
    ]
  }
]

// 友達モード用の分析データ
const friendshipTwentyTypeAnalysis: TwentyTypeAnalysis[] = [
  {
    id: 'adventurous_social_growth_x_introspective_caring_f',
    mode: 'friendship',
    type1: '冒険的社交家-成長志向',
    type2: '内省的探求者-思いやり深い',
    compatibilityScore: 90,
    relationshipType: '理想的な成長フレンド',
    coupleDescription: 'あなたたちは「理想的な成長フレンド」です！一人は新しい体験を求めて人との交流でエネルギーを得る成長志向の人、もう一人は深く考えて思いやり深い探求者。この組み合わせは、お互いの違いを尊重しながら、一緒に新しい世界を発見していく素晴らしい友情を築けます。社交的な刺激と内省的な深さ、成長への意欲と思いやり、両方の魅力を兼ね備えた、まさに「最高の友達」と呼べる関係なのです！',
    specificExperiences: [
      '「AさんはBさんの深い思いやりに感動し、『いつも優しくて心が温まる』って言うようになる」',
      '「BさんはAさんの成長への意欲に刺激され、『一緒にいると頑張ろうって思える』って感じる」',
      '「付き合うと、Aさんが新しい場所に連れて行って、Bさんがその場所の歴史や文化を詳しく教えてくれる」',
      '「Aさんが友達を紹介すると、Bさんは一人一人の性格をよく観察して、『あの人、実は優しい人だね』って言う」',
      '「二人で旅行すると、Aさんが計画を立てて、Bさんがその場所の隠れた名所を見つけてくれる」'
    ],
    strengths: [
      '新しい体験を共有できる',
      'お互いの違いを尊重し合える',
      '成長し合える関係',
      '深い会話ができる',
      '思いやり深い関係'
    ],
    challenges: [
      '社交性の違いによる疲労',
      '一人の時間の取り方の違い',
      '計画性の違い'
    ],
    advice: [
      'お互いのペースを尊重しましょう',
      '定期的に一緒に過ごす時間を作りましょう',
      '一人の時間も大切にしましょう'
    ],
    dateIdeas: [
      '新しいレストランでのランチ',
      '美術館や博物館巡り',
      'ハイキングや自然散策',
      '読書カフェでの時間'
    ],
    communicationTips: [
      '相手の話を最後まで聞く',
      '感情を素直に伝える',
      '定期的な振り返りの時間を作る'
    ],
    longTermOutlook: 'お互いを高め合いながら、長期的に安定した友情を築ける可能性が高いフレンドです。',
    warningSigns: [
      '一方的な会話が続く',
      '相手の価値観を否定する',
      '一人の時間を奪い合う'
    ],
    improvementTips: [
      '週に1回は深い話をする時間を作る',
      'お互いの趣味を理解し合う',
      '定期的に新しいことに挑戦する'
    ]
  }
]

// 全分析データを結合
export const allTwentyTypeAnalysis: TwentyTypeAnalysis[] = [
  ...romanceTwentyTypeAnalysis,
  ...friendshipTwentyTypeAnalysis
]

// タイプの組み合わせから分析結果を取得する関数
export function getTwentyTypeAnalysis(type1: string, type2: string, mode: AppMode): TwentyTypeAnalysis | null {
  // 直接的な組み合わせを探す
  let analysis = allTwentyTypeAnalysis.find(a => 
    a.mode === mode && 
    (a.type1 === type1 && a.type2 === type2) ||
    (a.type1 === type2 && a.type2 === type1)
  )

  // 見つからない場合は、最も近い組み合わせを返す
  if (!analysis) {
    // デフォルトの分析結果を返す
    analysis = {
      id: `${type1}_x_${type2}`,
      mode,
      type1,
      type2,
      compatibilityScore: 75,
      relationshipType: 'バランス型カップル',
      coupleDescription: 'あなたたちは「バランス型カップル」です！お互いの違いを尊重し合いながら、理想的なバランスを保てる素晴らしい関係です。一人ひとりの個性を活かしながら、一緒に成長していける、まさに「完璧なパートナー」と呼べるカップルなのです！',
      specificExperiences: [
        '「AさんはBさんの独特な価値観に興味を持ち、『面白い考え方だね』って言うようになる」',
        '「BさんはAさんの柔軟性に安心し、『一緒にいると楽しい』って感じる」',
        '「付き合うと、二人で新しい発見を共有し、『この人といると毎日が新鮮』って思うようになる」',
        '「Aさんが新しいことに挑戦する時、Bさんは『私も一緒にやってみたい』って言ってくれる」',
        '「二人で過ごす時間では、お互いの違いを楽しみ、『この人だからこそ見える世界がある』って感じる」'
      ],
      strengths: [
        'お互いの違いを尊重し合える',
        '成長し合える関係',
        '深い理解ができる'
      ],
      challenges: [
        '価値観の違い',
        'コミュニケーションの違い',
        '生活スタイルの違い'
      ],
      advice: [
        'お互いの価値観を理解しましょう',
        '定期的に話し合いの時間を作りましょう',
        'お互いの強みを活かしましょう'
      ],
      dateIdeas: [
        '一緒に新しい体験をする',
        'お互いの趣味を体験する',
        '深い話をする時間を作る'
      ],
      communicationTips: [
        '相手の話を最後まで聞く',
        '感情を素直に伝える',
        '定期的に振り返りの時間を作る'
      ],
      longTermOutlook: 'お互いを尊重しながら、長期的に安定した関係を築ける可能性があります。',
      warningSigns: [
        '一方的な会話が続く',
        '相手の価値観を否定する',
        'コミュニケーションを避ける'
      ],
      improvementTips: [
        '週に1回は深い話をする時間を作る',
        'お互いの趣味を理解し合う',
        '定期的に新しいことに挑戦する'
      ]
    }
  }

  return analysis
}

// ランダムな分析結果を取得する関数（テスト用）
export function getRandomTwentyTypeAnalysis(mode: AppMode): TwentyTypeAnalysis {
  const modeAnalysis = allTwentyTypeAnalysis.filter(a => a.mode === mode)
  const randomIndex = Math.floor(Math.random() * modeAnalysis.length)
  return modeAnalysis[randomIndex] || modeAnalysis[0]
}







