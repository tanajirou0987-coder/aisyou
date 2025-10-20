import { AppMode } from '../types'

// 恋愛相性分析結果の型定義
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
  // 恋愛相性メイン分析
  romanticCompatibilityAnalysis?: {
    userAId: string
    userAName: string
    userAType: string
    userAIntoxicationLevel: string
    userBId: string
    userBName: string
    userBType: string
    userBIntoxicationLevel: string
    romanticScore: number
    diagnosisTimestamp: string
    overallEvaluation: string
    tonightMood: string
    romanticReason: string
    confessionPossibility: string
    nextDayOutlook: string
    fullText: string
  }
  // 今夜の恋愛可能性詳細分析
  romanticDetailAnalysis?: {
    excitementLevel: { score: number; text: string }
    closenessSpeed: { score: number; text: string }
    confessionChance: { score: number; text: string }
    physicalContact: { score: number; text: string }
    nextDayContinuity: { score: number; text: string }
  }
  // 今夜のおすすめアクション提案
  romanticActionRecommendations?: {
    whatToDoTonight: string
    whatNotToDo: string
    recommendedMove: string
    nextDayFollow: string
  }
  // 今夜起こりそうな恋愛シーン予測
  romanticScenePredictions?: string[]
  // 過去診断との相性変化比較
  pastComparison?: {
    pastDiagnoses: {
      diagnosisDate: string
      romanticScore: number
      userAIntoxication: string
      userBIntoxication: string
    }[]
    scoreChange: number
    changeReason: string
  }
  // 今誰と相性が良いかランキング
  currentCompatibilityRanking?: {
    userId: string
    currentIntoxication: string
    diagnosisTimestamp: string
    rankings: {
      rank: number
      partnerId: string
      partnerName: string
      romanticScore: number
      briefComment: string
    }[]
    topPicks: {
      partnerName: string
      romanticScore: number
      reason: string
    }[]
    avoidList: {
      partnerName: string
      romanticScore: number
      reason: string
    }[]
  }
  // 既存のフィールド（後方互換性のため保持）
  romanticCompatibility: {
    title: string
    description: string
    tips: string[]
    activities: string[]
    nightCompatibility: {
      dominantStyle: string
      submissiveStyle: string
      playPreferences: string[]
      bedroomChemistry: string
    }
  }
  personalityAnalysis: {
    catchphrase: string
    strengths: string
    weaknesses: string
    advice: string
  }
  compatibility: {
    compatibleTypes: {
      typeId: string
      typeName: string
      compatibilityScore: number
      reason: string
    }[]
    incompatibleTypes: {
      typeId: string
      typeName: string
      compatibilityScore: number
      reason: string
    }[]
  }
  additionalInfo: {
    drinkingStyle: string
    recommendedDrinks: string[]
    seatingSuggestion: string
  }
  // Phase 1: メイン分析テキスト機能
  mainAnalysis?: {
    typeId: string
    typeName: string
    intro: string
    behaviorPattern: string
    psychology: string
    groupRole: string
    conclusion: string
    fullText: string
  }
  // Phase 1: 相性詳細分析テキスト機能
  compatibilityDetail?: {
    typeId: string
    typeName: string
    compatibilityScore: number
    patternType: string
    summary: string
    scenario: string
    reason: string
    advice: string
    fullText: string
  }[]
  // Phase 2: TikTok風箇条書きセクション機能
  tiktokSections?: {
    characteristics: string[]
    typicalPhrases: string[]
    compatibleWith: string[]
    incompatibleSituations: string[]
  }
  // Phase 2: 追加情報セクション機能（拡張版）
  enhancedAdditionalInfo?: {
    drinkingStyle: string
    recommendedDrinks: string
    seatingSuggestion: string
    celebrityExamples: string
  }
  // Phase 3: 他の人との比較機能
  comparison?: {
    friendList: {
      userId: string
      nickname: string
      typeId: string
      typeName: string
    }[]
    compatibilityMatrix: {
      userAId: string
      userAName: string
      userBId: string
      userBName: string
      compatibilityScore: number
      compatibilityText: string
    }[]
    bestPairs: {
      userAName: string
      userBName: string
      score: number
    }[]
    cautionPairs: {
      userAName: string
      userBName: string
      score: number
    }[]
    uniqueUrl: string
    qrCode: string
  }
  // Pair-focused: 二人の相性メイン分析（新要件）
  pairMainAnalysis?: {
    userAId: string
    userAName: string
    userAType: string
    userBId: string
    userBName: string
    userBType: string
    compatibilityScore: number
    overallEvaluation: string
    sceneDescription: string
    relationshipAnalysis: string
    externalView: string
    futureOutlook: string
    fullText: string
  }
  // 二人の詳細相性要素分析（5観点）
  detailedCompatibilityAnalysis?: {
    conversation: { score: number; text: string }
    tension: { score: number; text: string }
    drinkingStyle: { score: number; text: string }
    roleBalance: { score: number; text: string }
    longTerm: { score: number; text: string }
  }
  // 二人におすすめの飲み方提案
  drinkingRecommendations?: {
    idealSetting: string
    recommendedDrinks: string
    seatingArrangement: string
    tipsAndCautions: string
  }
  // 二人のエピソード予測（TikTok風）
  episodePredictions?: string[]
  // 三人目を加えた場合の相性変化
  thirdPersonCompatibility?: {
    recommendedTypes: { typeName: string; reason: string }[]
    notRecommendedTypes: { typeName: string; reason: string }[]
  }
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

// グラスノオト結果データ（科学的根拠に基づく）
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
    ],
    romanticCompatibility: {
      title: '夜の相性診断',
      description: 'お互いの魅力を引き出し合える理想的な組み合わせです。飲み会での相性の良さが、より深い関係性にもつながる可能性があります。',
      tips: [
        '酔った時の自然なスキンシップを大切にする',
        '二人だけの秘密の時間を作る',
        '相手の反応を見ながら距離感を調整する',
        '夜の散歩でロマンティックな雰囲気を演出する'
      ],
      activities: [
        'カラオケの個室で二人きりの時間を楽しむ',
        '人気の少ない夜景スポットでロマンティックな時間を過ごす',
        'お酒を飲んだ後は十分休んでからお風呂タイムを楽しむ',
        '夜の公園で手を繋いで散歩する'
      ],
      nightCompatibility: {
        dominantStyle: 'ソーシャルエンハンサー（参加者A）: 社交的抑制解除により積極性が向上',
        submissiveStyle: 'ロマンティックエンハンサー（参加者B）: ドーパミン系活性化により受容性が高まる',
        playPreferences: [
          'アルコールによる抑制解除効果で自然なスキンシップを好む',
          'ドーパミン系の活性化によりロマンティックな雰囲気を重視',
          '前頭前野の抑制解除により感情表現が豊かになる',
          '社会的認知機能の変化により相手の反応に敏感'
        ],
        bedroomChemistry: '科学的根拠: アルコールの抑制解除効果とドーパミン系の活性化により、Aさんの社交性向上とBさんの恋愛感情高揚が相乗的に作用し、自然な関係性の発展が期待できます。'
      },
      personalityAnalysis: {
        catchphrase: '場を盛り上げる天才！みんなを笑顔にする魔法使い',
        strengths: 'あなたは飲み会の中心人物として、周りの人たちを自然と笑顔にする素晴らしい才能をお持ちです。アルコールの抑制解除効果により、普段以上に社交的で魅力的な一面を発揮でき、多くの人があなたと一緒にいると自然と楽しくなってしまう特別な魅力があります。',
        weaknesses: 'あなたのような魅力的な人は、時々場を盛り上げようとするあまり、相手のペースを考えずに行動してしまう傾向があるかもしれません。また、みんなを楽しませることが得意な分、自分自身の疲れに気づきにくい面もあるようです。',
        advice: 'あなたの明るさは多くの人を幸せにしています。時には相手の気持ちを聞く時間も大切にすることで、より深い関係を築けるでしょう。また、自分自身の体調管理も忘れずに、無理をしすぎないよう心がけることで、より長くみんなを楽しませることができるかもしれません。'
      },
      compatibility: {
        compatibleTypes: [
          {
            typeId: 'romantic_enhancer',
            typeName: 'ロマンティックエンハンサー',
            compatibilityScore: 88,
            reason: 'お互いの魅力を引き出し合える理想的な組み合わせです。'
          },
          {
            typeId: 'emotional_expresser',
            typeName: 'エモーショナルエクスプレス',
            compatibilityScore: 82,
            reason: '感情表現豊かな相手と自然な関係を築けます。'
          },
          {
            typeId: 'confidence_booster',
            typeName: 'コンフィデンスブースター',
            compatibilityScore: 78,
            reason: 'お互いの自信を高め合える相性の良い組み合わせです。'
          }
        ],
        incompatibleTypes: [
          {
            typeId: 'stress_reliever',
            typeName: 'ストレスリリーバー',
            compatibilityScore: 45,
            reason: 'エネルギーレベルの違いにより、お互いのペースが合わないことがあります。'
          }
        ]
      },
      additionalInfo: {
        drinkingStyle: '場を盛り上げるリーダー型。みんなを楽しませることに集中し、飲み会の中心人物として活躍します。',
        recommendedDrinks: ['ハイボール', 'ビール', 'サワー', 'カクテル'],
        seatingSuggestion: 'テーブルの中央や目立つ位置に座ることで、あなたの魅力がより発揮されます。',
      },
      // Phase 1: メイン分析テキスト機能
      mainAnalysis: {
        typeId: 'social_enhancer',
        typeName: 'ソーシャルエンハンサー',
        intro: 'あなたは「陽気な盛り上げ隊長」タイプ。飲み会では自然とムードメーカーとして場を盛り上げる存在です。',
        behaviorPattern: '普段は控えめでも、お酒が入ると別人のようにテンションが上がり、周りを笑わせたり、話題を提供したりすることに喜びを感じます。一杯目のビールを飲んだ瞬間から目がキラキラし始め、二杯目でエンジン全開。カラオケでは率先してマイクを握り、知らない人とも気軽に話せるようになるのがあなたの特徴です。',
        psychology: '内面では、実は「みんなに楽しんでほしい」という思いやりの心が強く働いています。沈黙が続くとソワソワしてしまい、つい自分が動いてしまう優しさの持ち主。ただし、盛り上げすぎて翌日「ちょっと調子乗りすぎたかも…」と反省することも。',
        groupRole: '少人数より大人数の飲み会が得意で、初対面の人ともすぐに打ち解けられるのが強み。グループの中心にいることが多く、場の空気を読んで盛り上げるタイミングを本能的に理解しています。',
        conclusion: 'あなたがいるだけで、飲み会の成功率は格段に上がるでしょう。',
        fullText: 'あなたは「陽気な盛り上げ隊長」タイプ。飲み会では自然とムードメーカーとして場を盛り上げる存在です。\n\n普段は控えめでも、お酒が入ると別人のようにテンションが上がり、周りを笑わせたり、話題を提供したりすることに喜びを感じます。一杯目のビールを飲んだ瞬間から目がキラキラし始め、二杯目でエンジン全開。カラオケでは率先してマイクを握り、知らない人とも気軽に話せるようになるのがあなたの特徴です。\n\n内面では、実は「みんなに楽しんでほしい」という思いやりの心が強く働いています。沈黙が続くとソワソワしてしまい、つい自分が動いてしまう優しさの持ち主。ただし、盛り上げすぎて翌日「ちょっと調子乗りすぎたかも…」と反省することも。それでも周りからは「あの人がいると飲み会が楽しい」と頼りにされる存在です。\n\n少人数より大人数の飲み会が得意で、初対面の人ともすぐに打ち解けられるのが強み。グループの中心にいることが多く、場の空気を読んで盛り上げるタイミングを本能的に理解しています。あなたがいるだけで、飲み会の成功率は格段に上がるでしょう。'
      },
      // Phase 1: 相性詳細分析テキスト機能
      compatibilityDetail: [
        {
          typeId: 'romantic_enhancer',
          typeName: 'ロマンティックエンハンサー',
          compatibilityScore: 88,
          patternType: 'バランス型',
          summary: '真逆のタイプだけど、だからこそ最高のバランスを生む組み合わせです。',
          scenario: 'あなたが盛り上げ役として場を温めている間、相手は落ち着いた雰囲気でそれを見守り、適度なタイミングでツッコミを入れてくれます。あなたが調子に乗りすぎた時には、クールな相手がさりげなくブレーキをかけてくれるので、翌日の後悔が減るかも（笑）。',
          reason: 'お互いに持っていないものを補い合える関係で、一緒にいると自然とバランスが取れる不思議な相性です。',
          advice: '長く付き合うほど、お互いの良さを引き出せる最高の飲み仲間になれるでしょう。',
          fullText: '【相性抜群！「陽気な盛り上げ隊長」×「静かに飲むクール系」】\n\n真逆のタイプだけど、だからこそ最高のバランスを生む組み合わせです。あなたが盛り上げ役として場を温めている間、相手は落ち着いた雰囲気でそれを見守り、適度なタイミングでツッコミを入れてくれます。あなたが調子に乗りすぎた時には、クールな相手がさりげなくブレーキをかけてくれるので、翌日の後悔が減るかも（笑）。\n\n逆に、相手が普段あまり話さないタイプでも、あなたの明るさに引っ張られて徐々に心を開いていく様子が見られるはず。お互いに持っていないものを補い合える関係で、一緒にいると自然とバランスが取れる不思議な相性です。長く付き合うほど、お互いの良さを引き出せる最高の飲み仲間になれるでしょう。'
        },
        {
          typeId: 'social_enhancer',
          typeName: 'ソーシャルエンハンサー',
          compatibilityScore: 75,
          patternType: '要注意型',
          summary: '最強の盛り上げコンビであると同時に、最も危険な組み合わせでもあります。',
          scenario: '二人とも酔うとテンションが爆上がりするタイプなので、会話は途切れることなく、笑いが絶えない最高に楽しい飲み会になるでしょう。カラオケに行ったら朝まで帰れない、二軒目三軒目と際限なくハシゴする、周りの人まで巻き込んで大騒ぎ…なんてことは日常茶飯事。',
          reason: '問題は、二人ともブレーキ役がいないこと。お互いに「まだ行ける！」と煽り合って、気づいたら記憶がない、なんてことも。',
          advice: 'それでも「また飲もう！」となる、中毒性の高い相性と言えるでしょう。',
          fullText: '【要注意ペア！「陽気な盛り上げ隊長」×「陽気な盛り上げ隊長」】\n\n最強の盛り上げコンビであると同時に、最も危険な組み合わせでもあります。二人とも酔うとテンションが爆上がりするタイプなので、会話は途切れることなく、笑いが絶えない最高に楽しい飲み会になるでしょう。カラオケに行ったら朝まで帰れない、二軒目三軒目と際限なくハシゴする、周りの人まで巻き込んで大騒ぎ…なんてことは日常茶飯事。\n\nただし問題は、二人ともブレーキ役がいないこと。お互いに「まだ行ける！」と煽り合って、気づいたら記憶がない、なんてことも。翌日のLINEで「昨日何話したっけ？」「覚えてない（笑）」という会話が交わされるのは、このペアの宿命です。それでも「また飲もう！」となる、中毒性の高い相性と言えるでしょう。'
        }
      ],
      // Phase 2: TikTok風箇条書きセクション機能
      tiktokSections: {
        characteristics: [
          '✓ 一杯目で別人になる',
          '✓ 沈黙が苦手で常に喋ってる',
          '✓ カラオケでマイク離さない',
          '✓ 翌日「調子乗りすぎた」と反省',
          '✓ でもまた同じことを繰り返す',
          '✓ 初対面の人ともすぐ仲良くなれる',
          '✓ 飲み会の幹事を任されがち'
        ],
        typicalPhrases: [
          '「もう一軒行こうよ！」',
          '「まだ23時だよ？早くない？」',
          '「この曲歌わせて！」',
          '「昨日のこと覚えてる？」',
          '「みんな楽しんでる？」'
        ],
        compatibleWith: [
          '・落ち着いたブレーキ役タイプ',
          '・一緒に盛り上がれる同志',
          '・聞き上手で優しい人',
          '・ツッコミ上手なクール系'
        ],
        incompatibleSituations: [
          '・少人数で静かに飲む系',
          '・お酒が進まない堅い雰囲気',
          '・早めに解散する飲み会',
          '・会話が弾まない沈黙が多い場'
        ]
      },
      // Phase 2: 追加情報セクション機能（拡張版）
      enhancedAdditionalInfo: {
        drinkingStyle: '大人数でワイワイ盛り上がる飲み会が最適。5人以上の賑やかな場で本領を発揮します。二次会・三次会とハシゴするスタイルも得意で、初対面の人が混ざっていても全く問題なし。',
        recommendedDrinks: 'ビールやハイボールなど、テンポよく飲める軽めのお酒がおすすめ。次々と乾杯できるので、場を盛り上げるペースに合います。カクテルを頼むときも、見た目が華やかなものを選びがち。',
        seatingSuggestion: 'あなたの隣には落ち着いたクール系タイプを配置すると、ちょうどいいバランスに。向かいには一緒に盛り上がれる同志タイプがいると、会話が弾んで最高の飲み会になるでしょう。',
        celebrityExamples: '明石家さんま、バラエティ番組の司会者タイプ、ムードメーカーキャラ。常に周りを笑わせて、場の中心にいることが多い人たちです。'
      }
    }
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
    ],
    romanticCompatibility: {
      title: '本音の相性診断',
      description: '深い信頼関係を築ける組み合わせです。お互いの本音を理解し合える関係性は、より親密な関係へと発展する可能性があります。',
      tips: [
        '酔った時の本音を大切に聞き合う',
        '二人だけの秘密を共有する',
        '相手の身体的な反応を観察する',
        '夜の時間を活用して関係を深める'
      ],
      activities: [
        'お酒を飲みながら本音で語り合う',
        '夜の街を二人で探索する',
        'ホテルのバーで上品に過ごす',
        '深夜のカフェで二人きりの時間を楽しむ'
      ],
      nightCompatibility: {
        dominantStyle: 'ソーシャルバタフライ（参加者A）: 社交的抑制解除により外向性が増強',
        submissiveStyle: 'ホネストドリンカー（参加者B）: 前頭前野機能低下により本音表現が促進',
        playPreferences: [
          'アルコールによる社会的抑制解除で自然なコミュニケーションを好む',
          '前頭前野の機能低下により本音での交流を重視',
          'GABA受容体の活性化によりリラックスした関係性を求める',
          '社会的認知機能の変化により信頼関係の構築を重視'
        ],
        bedroomChemistry: '科学的根拠: アルコールの社会的抑制解除効果と前頭前野機能の低下により、Aさんの外向性増強とBさんの本音表現促進が組み合わさり、深い信頼関係に基づく自然な関係性の発展が期待できます。'
      },
      personalityAnalysis: {
        catchphrase: '本音で繋がる信頼の架け橋！心の友達製造機',
        strengths: 'あなたは深い信頼関係を築くのが得意で、相手の本音を引き出す素晴らしい才能をお持ちです。アルコールの抑制解除効果により、普段は言えないような心の奥の気持ちを自然に表現でき、多くの人があなたと話すと自然と心を開いてしまう特別な魅力があります。',
        weaknesses: 'あなたのような誠実な人は、時々相手の本音を聞こうとするあまり、プライベートな領域に踏み込みすぎてしまう傾向があるかもしれません。また、表面的な付き合いよりも深い関係を求めるため、多くの人との浅い関係を築くのが少し苦手な面もあるようです。',
        advice: 'あなたの誠実さは多くの人に信頼されています。相手のペースを尊重し、無理に本音を引き出そうとしないよう心がけることで、より自然な関係を築けるでしょう。また、時には軽い話題で盛り上がることも大切にすることで、より多くの人との関係を築けるかもしれません。'
      },
      compatibility: {
        compatibleTypes: [
          {
            typeId: 'social_enhancer',
            typeName: 'ソーシャルエンハンサー',
            compatibilityScore: 85,
            reason: '社交性と本音のバランスが取れた理想的な組み合わせです。'
          },
          {
            typeId: 'emotional_expresser',
            typeName: 'エモーショナルエクスプレス',
            compatibilityScore: 80,
            reason: '感情表現豊かな相手と深い理解を築けます。'
          },
          {
            typeId: 'romantic_enhancer',
            typeName: 'ロマンティックエンハンサー',
            compatibilityScore: 75,
            reason: 'ロマンティックな雰囲気と本音の交流が合わさります。'
          }
        ],
        incompatibleTypes: [
          {
            typeId: 'inhibited_releaser',
            typeName: 'インヒビテッドリリーサー',
            compatibilityScore: 40,
            reason: '抑制解除のタイミングの違いにより、コミュニケーションが難しいことがあります。'
          }
        ]
      },
      additionalInfo: {
        drinkingStyle: '本音で語り合う深い交流型。信頼関係を築くことに重点を置き、心の通った会話を楽しみます。',
        recommendedDrinks: ['ワイン', '日本酒', 'ウイスキー', '梅酒'],
        seatingSuggestion: '静かな場所や角の席に座ることで、落ち着いた雰囲気で深い話ができます。',
      }
    }
  },
  {
    id: 'emotional_expresser_x_stress_reliever',
    mode: 'drinking',
    type1: 'エモーショナルエクスプレス',
    type2: 'ストレスリリーバー',
    compatibilityScore: 78,
    relationshipType: '癒し合いカップル',
    coupleDescription: 'あなたたちは「癒し合いカップル」です！エモーショナルエクスプレスの感情表現豊かさとストレスリリーバーの癒し効果が組み合わさって、お互いを深く理解し合える関係です。',
    specificExperiences: [
      '「Aさんが感情を表現すると、Bさんは『ありがとう、話してくれて』って優しく受け止める」',
      '「Bさんがストレスを解消している時、Aさんは『一緒にリラックスしよう』って寄り添う」',
      '「二人で飲むと、Aさんの感情表現とBさんの癒し効果が合わさって安心感が生まれる」',
      '「Aさんが泣いた時、Bさんは『大丈夫だよ』って抱きしめてくれる」',
      '「飲み会では二人の癒し合いが光り、周りも『いい関係だね』ってうらやましがる」'
    ],
    strengths: [
      'お互いを深く理解し合える',
      '感情表現が豊か',
      '癒し合える関係'
    ],
    challenges: [
      '感情の波',
      'ストレス解消の方法の違い',
      '距離感の調整'
    ],
    advice: [
      'お互いの感情を大切にする',
      '一緒にリラックスする時間を作る',
      '相手のペースを尊重する'
    ],
    dateIdeas: [
      '温泉デート',
      'マッサージデート',
      '自然の中でのんびり過ごす',
      'お酒を飲みながら語り合う'
    ],
    communicationTips: [
      'お互いの感情を素直に表現する',
      '相手の気持ちを理解しようとする',
      '一緒にリラックスできる時間を作る'
    ],
    longTermOutlook: '長期的には、お互いの感情を理解し合いながら、深い癒しの関係を築ける素晴らしい関係を築けるでしょう。',
    warningSigns: [
      '感情の押し付け',
      'ストレス解消の強要',
      '一人だけが癒される'
    ],
    improvementTips: [
      'お互いの感情を尊重する',
      '一緒にリラックスする時間を作る',
      '相手の気持ちを理解する'
    ],
    romanticCompatibility: {
      title: '癒し合いの相性診断',
      description: 'お互いを深く理解し合える組み合わせです。感情表現豊かな関係性で、より深い癒しの関係へと発展する可能性があります。',
      tips: [
        'お互いの感情を大切にする',
        '一緒にリラックスする時間を作る',
        '相手の気持ちを理解しようとする',
        '夜の時間を活用して癒し合う'
      ],
      activities: [
        'お酒を飲みながら感情を語り合う',
        '温泉で一緒にリラックスする（お酒を飲んだ後は十分休んでから）',
        'マッサージでお互いを癒し合う',
        '自然の中でゆっくり過ごす'
      ],
      nightCompatibility: {
        dominantStyle: 'エモーショナルエクスプレス（参加者A）: 前頭前野抑制解除により感情表現が促進',
        submissiveStyle: 'ストレスリリーバー（参加者B）: GABA受容体活性化により癒し効果が増強',
        playPreferences: [
          '前頭前野の抑制解除により自然な感情表現を好む',
          'GABA受容体の活性化によりリラックスしたスキンシップを重視',
          'アルコールによる抑制解除効果で感情的な交流を求める',
          'ストレス解消効果により癒し合いの関係性を好む'
        ],
        bedroomChemistry: '科学的根拠: 前頭前野の抑制解除とGABA受容体の活性化により、Aさんの感情表現促進とBさんの癒し効果増強が組み合わさり、深い相互理解に基づく特別な関係性の発展が期待できます。'
      },
      personalityAnalysis: {
        catchphrase: '感情の魔法使い！心の奥まで見抜く共感の達人',
        strengths: 'あなたは感情表現が豊かで、相手の気持ちを深く理解する素晴らしい才能をお持ちです。アルコールの抑制解除効果により、普段は隠している感情を自然に表現でき、多くの人があなたと一緒にいると自然と心が温かくなってしまう特別な魅力があります。',
        weaknesses: 'あなたのような感情豊かな人は、時々感情に流されやすく、冷静な判断ができなくなる傾向があるかもしれません。また、相手の感情に共感しすぎて、自分自身の感情が揺れ動いてしまうこともあるようです。',
        advice: 'あなたの感情豊かさは多くの人を魅了しています。時には感情をコントロールし、冷静な判断も大切にすることで、より安定した関係を築けるでしょう。また、相手の感情に共感するだけでなく、自分の感情も大切にすることで、より充実した関係を築けるかもしれません。'
      },
      compatibility: {
        compatibleTypes: [
          {
            typeId: 'stress_reliever',
            typeName: 'ストレスリリーバー',
            compatibilityScore: 90,
            reason: '感情表現と癒し効果が組み合わさる理想的な組み合わせです。'
          },
          {
            typeId: 'social_enhancer',
            typeName: 'ソーシャルエンハンサー',
            compatibilityScore: 82,
            reason: '社交性と感情表現のバランスが取れた相性の良い組み合わせです。'
          },
          {
            typeId: 'romantic_enhancer',
            typeName: 'ロマンティックエンハンサー',
            compatibilityScore: 78,
            reason: '感情表現豊かな関係性を築けます。'
          }
        ],
        incompatibleTypes: [
          {
            typeId: 'confidence_booster',
            typeName: 'コンフィデンスブースター',
            compatibilityScore: 35,
            reason: '感情の波と自信の安定性の違いにより、お互いのペースが合わないことがあります。'
          }
        ]
      },
      additionalInfo: {
        drinkingStyle: '感情表現豊かな癒し合い型。お互いの気持ちを理解し合い、心の交流を大切にします。',
        recommendedDrinks: ['カクテル', 'ワイン', '日本酒', 'リキュール'],
        seatingSuggestion: '落ち着いた雰囲気の席に座ることで、感情的な交流がより深まります。',
      }
    }
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
      ],
      romanticCompatibility: {
        title: 'バランスの取れた夜の関係性',
        description: 'お互いの違いを尊重し合える組み合わせです。理想的なバランスを保ちながら、より深い関係性へと発展する可能性があります。',
        tips: [
          '酔った時の自然な反応を楽しむ',
          '夜の時間を活用して新しい発見を共有する',
          '相手の身体的な個性を理解する',
          '定期的な夜の時間を大切にする'
        ],
        activities: [
          '夜のお店を一緒に開拓する',
          'カラオケの個室で二人きりの時間を楽しむ',
          '夜のイベントや屋台巡りに参加する',
          '深夜のカフェで特別な時間を作る'
        ],
        nightCompatibility: {
          dominantStyle: '参加者A: アルコールによる抑制解除で適度なリード役を発揮',
          submissiveStyle: '参加者B: GABA受容体活性化により柔軟な適応性を示す',
          playPreferences: [
            'アルコールによる抑制解除効果で自然なスキンシップを好む',
            'GABA受容体の活性化によりリラックスした関係性を重視',
            '前頭前野機能の変化によりお互いのペースを尊重する',
            '社会的認知機能の変化により新しい発見を共有する'
          ],
          bedroomChemistry: '科学的根拠: アルコールの抑制解除効果とGABA受容体の活性化により、適度なリード役と柔軟な適応性のバランスが取れ、理想的な関係性の発展が期待できます。'
        }
      }
    }
  }

  return analysis
}

// ランダムな分析結果を取得する関数（テスト用）
export function getRandomDrinkingAnalysis(mode: AppMode): DrinkingAnalysis {
  const modeAnalysis = drinkingAnalysisData.filter(a => a.mode === mode)
  const randomIndex = Math.floor(Math.random() * modeAnalysis.length)
  const selectedAnalysis = modeAnalysis[randomIndex] || modeAnalysis[0]
  
  // 新しいデータ構造が存在しない場合はデフォルト値を設定
  if (!selectedAnalysis.romanticCompatibility) {
    selectedAnalysis.romanticCompatibility = {
      title: '夜の相性診断',
      description: 'お互いの魅力を引き出し合える理想的な組み合わせです。飲み会での相性の良さが、より深い関係性にもつながる可能性があります。',
      tips: [
        '酔った時の自然なスキンシップを大切にする',
        '二人だけの秘密の時間を作る',
        '相手の反応を見ながら距離感を調整する',
        '夜の散歩でロマンティックな雰囲気を演出する'
      ],
      activities: [
        'カラオケの個室で二人きりの時間を楽しむ',
        '人気の少ない夜景スポットでロマンティックな時間を過ごす',
        'お酒を飲んだ後は十分休んでからお風呂タイムを楽しむ',
        '夜の公園で手を繋いで散歩する'
      ],
      nightCompatibility: {
        dominantStyle: '参加者A: アルコールによる抑制解除でリード役を発揮',
        submissiveStyle: '参加者B: GABA受容体活性化により受容性が高まる',
        playPreferences: [
          'アルコールによる抑制解除効果で自然なスキンシップを好む',
          'ドーパミン系の活性化によりロマンティックな雰囲気を重視',
          '前頭前野の抑制解除により感情表現が豊かになる',
          '社会的認知機能の変化により相手の反応に敏感'
        ],
        bedroomChemistry: '科学的根拠: アルコールの抑制解除効果とGABA受容体の活性化により、適度なリード役と受容性のバランスが取れ、自然な関係性の発展が期待できます。'
      }
    }
  }
  
  if (!selectedAnalysis.personalityAnalysis) {
    selectedAnalysis.personalityAnalysis = {
      catchphrase: 'バランスの取れた魅力！みんなに愛される完璧な相性',
      strengths: 'あなたはバランス感覚に優れ、どんな相手とも自然な関係を築く素晴らしい才能をお持ちです。アルコールの抑制解除効果により、相手のペースに合わせながらも自分らしさを表現でき、多くの人があなたと一緒にいると自然と安心してしまう特別な魅力があります。',
      weaknesses: 'あなたのようなバランス感覚の良い人は、時々バランスを取ろうとするあまり、自分の意見をはっきり伝えるのが少し苦手な傾向があるかもしれません。また、みんなに好かれようとするあまり、自分自身の本当の気持ちを見失ってしまうこともあるようです。',
      advice: 'あなたのバランス感覚は多くの人を助けています。時には自分の意見も大切にし、相手に伝える勇気を持つことで、より深い関係を築けるでしょう。また、完璧を求めすぎず、時には失敗も受け入れることで、より自然で充実した関係を築けるかもしれません。'
    }
  }
  
  if (!selectedAnalysis.compatibility) {
    selectedAnalysis.compatibility = {
      compatibleTypes: [
        {
          typeId: 'social_enhancer',
          typeName: 'ソーシャルエンハンサー',
          compatibilityScore: 85,
          reason: '社交性とバランス感覚が組み合わさる理想的な組み合わせです。'
        },
        {
          typeId: 'emotional_expresser',
          typeName: 'エモーショナルエクスプレス',
          compatibilityScore: 80,
          reason: '感情表現とバランス感覚の相性が良い組み合わせです。'
        },
        {
          typeId: 'romantic_enhancer',
          typeName: 'ロマンティックエンハンサー',
          compatibilityScore: 75,
          reason: 'ロマンティックな雰囲気とバランス感覚が合わさります。'
        }
      ],
      incompatibleTypes: [
        {
          typeId: 'inhibited_releaser',
          typeName: 'インヒビテッドリリーサー',
          compatibilityScore: 50,
          reason: 'バランス感覚と抑制解除のタイミングの違いにより、お互いのペースが合わないことがあります。'
        }
      ]
    }
  }
  
  if (!selectedAnalysis.additionalInfo) {
    selectedAnalysis.additionalInfo = {
      drinkingStyle: 'バランスの取れた万能型。どんな相手とも自然な関係を築き、場の雰囲気に合わせて適応します。',
      recommendedDrinks: ['ビール', 'ハイボール', 'ワイン', '日本酒'],
      seatingSuggestion: 'テーブルの中央付近に座ることで、周りの人とのバランスの取れた関係を築けます。'
    }
  }
  
  // Pair-focused デフォルト値
  if (!selectedAnalysis.pairMainAnalysis) {
    selectedAnalysis.pairMainAnalysis = {
      userAId: 'A',
      userAName: 'Aさん',
      userAType: selectedAnalysis.type1,
      userBId: 'B',
      userBName: 'Bさん',
      userBType: selectedAnalysis.type2,
      compatibilityScore: selectedAnalysis.compatibilityScore ?? 72,
      overallEvaluation: '二人は互いの良さを引き出し合う、心地よいバランスの良い組み合わせです。',
      sceneDescription: '二人で飲み始めると、最初は穏やかな会話から始まり、一杯目が終わる頃には自然と笑いが増えていきます。Aさんが話題を広げると、Bさんが的確なリアクションで返し、場が暖かくまとまっていきます。',
      relationshipAnalysis: 'Aさんの社交性とBさんの安定感が噛み合い、無理のない役割分担が自然に成立。片方が走りすぎると、もう片方がさりげなく調整する心地よい相互作用が生まれます。',
      externalView: '周りからは「安心して任せられる二人」「一緒にいると空気が良くなる」と見られ、グループの雰囲気を柔らかく整える存在として頼られます。',
      futureOutlook: '重ねるほどに呼吸が合い、長く付き合える飲み仲間として関係が育つでしょう。',
      fullText: '二人は互いの良さを引き出し合う、心地よいバランスの良い組み合わせです。\n\n二人で飲み始めると、最初は穏やかな会話から始まり、一杯目が終わる頃には自然と笑いが増えていきます。Aさんが話題を広げると、Bさんが的確なリアクションで返し、場が暖かくまとまっていきます。\n\nAさんの社交性とBさんの安定感が噛み合い、無理のない役割分担が自然に成立。片方が走りすぎると、もう片方がさりげなく調整する心地よい相互作用が生まれます。\n\n周りからは「安心して任せられる二人」「一緒にいると空気が良くなる」と見られ、グループの雰囲気を柔らかく整える存在として頼られます。\n\n重ねるほどに呼吸が合い、長く付き合える飲み仲間として関係が育つでしょう。'
    }
  }

  // 恋愛相性メイン分析のデフォルト値
  if (!selectedAnalysis.romanticCompatibilityAnalysis) {
    selectedAnalysis.romanticCompatibilityAnalysis = {
      userAId: 'user_a',
      userAName: 'Aさん',
      userAType: 'ソーシャルエンハンサー',
      userAIntoxicationLevel: '程よい酔い',
      userBId: 'user_b',
      userBName: 'Bさん',
      userBType: 'バランス型',
      userBIntoxicationLevel: '程よい酔い',
      romanticScore: 85,
      diagnosisTimestamp: new Date().toISOString(),
      overallEvaluation: '今夜、この二人は危険なほど相性抜群！お酒の力も手伝って、普段は言えない本音がポロポロ出てきて、お互いの距離が急速に縮まっていくでしょう。',
      tonightMood: '飲み始めた頃は普通の会話をしていたはずなのに、気づけば目が合う回数が増え、会話の内容もどんどん深く、パーソナルな話題へ。「実は…」で始まる告白めいた話が自然と出てきて、二人だけの秘密を共有するような特別な空気が生まれます。お酒が進むにつれて、会話の距離が物理的にも近くなり、肩が触れ合っても離れない、そんな甘い瞬間が何度も訪れるはず。',
      romanticReason: '今の酔った状態だからこそ、お互いの素直な感情が表に出て、恋愛感情が一気に加速します。普段は友達として見ていたかもしれないけど、今夜のこの雰囲気で「あれ、もしかして好きかも」と気づいてしまう可能性が非常に高い組み合わせです。',
      confessionPossibility: 'このまま二人きりで終電を逃したら、告白やキスなど、決定的な展開が待っているかもしれません。今夜は人生が変わる夜になる予感がします。',
      nextDayOutlook: '翌日シラフに戻っても、この気持ちは消えないタイプの恋。むしろ「昨日のあれ、本気だったんだ」と確信して、真剣な恋愛関係に発展していく可能性が高いでしょう。',
      fullText: '【Aさん×Bさんの恋愛相性分析（今の酔った状態）】\n\n今夜、この二人は危険なほど相性抜群！お酒の力も手伝って、普段は言えない本音がポロポロ出てきて、お互いの距離が急速に縮まっていくでしょう。\n\n飲み始めた頃は普通の会話をしていたはずなのに、気づけば目が合う回数が増え、会話の内容もどんどん深く、パーソナルな話題へ。「実は…」で始まる告白めいた話が自然と出てきて、二人だけの秘密を共有するような特別な空気が生まれます。お酒が進むにつれて、会話の距離が物理的にも近くなり、肩が触れ合っても離れない、そんな甘い瞬間が何度も訪れるはず。Aさんが酔った勢いで「ずっと気になってた」とつぶやいたり、Bさんが「今日は帰りたくないな」と本音を漏らしたり、普段なら絶対に言えないセリフが自然と口から出てくる、そんな魔法のような時間です。\n\n今の酔った状態だからこそ、お互いの素直な感情が表に出て、恋愛感情が一気に加速します。普段は友達として見ていたかもしれないけど、今夜のこの雰囲気で「あれ、もしかして好きかも」と気づいてしまう可能性が非常に高い組み合わせです。\n\nこのまま二人きりで終電を逃したら、告白やキスなど、決定的な展開が待っているかもしれません。今夜は人生が変わる夜になる予感がします。\n\n翌日シラフに戻っても、この気持ちは消えないタイプの恋。むしろ「昨日のあれ、本気だったんだ」と確信して、真剣な恋愛関係に発展していく可能性が高いでしょう。今夜を逃したら後悔するかもしれません。'
    }
  }

  // 今夜の恋愛可能性詳細分析のデフォルト値
  if (!selectedAnalysis.romanticDetailAnalysis) {
    selectedAnalysis.romanticDetailAnalysis = {
      excitementLevel: { 
        score: 5, 
        text: 'お互いの何気ない仕草にドキドキする瞬間が連続します。Aさんの笑顔を見て「かわいいな」と思ったり、Bさんの優しい言葉に胸がキュンとしたり、普段は気づかなかった魅力が今夜は何倍にも輝いて見えるはず。' 
      },
      closenessSpeed: { 
        score: 5, 
        text: '会話が進むにつれて、自然と身を乗り出して話すようになり、気づけば顔の距離が20cmくらいに。お互いに意識しながらも、この距離感が心地よくて離れられない、そんな甘い時間が流れます。' 
      },
      confessionChance: { 
        score: 4, 
        text: '酔った勢いで「好きかも」とつぶやいてしまう可能性が高いです。本格的な告白まではいかなくても、「気になってた」「特別だと思ってる」みたいな本音が出てきて、明らかに友達以上の空気になるでしょう。' 
      },
      physicalContact: { 
        score: 4, 
        text: '「酔ってるから」を言い訳に、肩に寄りかかったり、手を繋いで帰りたくなったり、身体的な距離が急接近する可能性大。キスまでいくかは二人次第ですが、その一歩手前まではほぼ確実に進みそうです。' 
      },
      nextDayContinuity: { 
        score: 5, 
        text: '今夜の気持ちは一時的なものではありません。翌日シラフになっても「やっぱり好きだ」と確信するタイプの恋。むしろ「昨日のあれ、どうしよう」とソワソワしながら、真剣に相手のことを考え始めるでしょう。' 
      }
    }
  }

  // 今夜のおすすめアクション提案のデフォルト値
  if (!selectedAnalysis.romanticActionRecommendations) {
    selectedAnalysis.romanticActionRecommendations = {
      whatToDoTonight: 'このタイミングを逃さないで！「今日楽しいね」と素直に伝えたり、「もう少し一緒にいたいな」と本音を口にしてみて。相手も同じ気持ちの可能性が高いので、勇気を出して一歩踏み込むのが今夜のカギです。',
      whatNotToDo: '他の異性の話題を出すのは絶対NG。せっかくの良い雰囲気が一気に冷めます。また、酔いすぎて記憶を飛ばすのも避けて。この特別な夜を、ちゃんと覚えていられる程度にセーブしましょう。',
      recommendedMove: '二軒目は静かなバーかカフェへ。人が少なくて、二人でゆっくり話せる場所を選ぶと、自然と距離が縮まります。帰り道は遠回りして、少しでも長く一緒にいる時間を作るのがおすすめ。',
      nextDayFollow: '朝起きたら「昨日楽しかったね」とすぐLINEを。相手も昨日のことを考えているはずなので、タイミングを逃さずに次につなげましょう。「また二人で飲みたい」と誘うのもGood。'
    }
  }

  // 今夜起こりそうな恋愛シーン予測のデフォルト値
  if (!selectedAnalysis.romanticScenePredictions) {
    selectedAnalysis.romanticScenePredictions = [
      '目が合って思わず照れる瞬間がある',
      '「好きなタイプは？」と探り合いが始まる',
      '帰り道で手を繋ぎたくなる衝動',
      '「今日は帰りたくないな」と本音がポロリ',
      '終電逃してもいいかもと思ってしまう',
      '「実はずっと気になってた」の告白フラグ',
      'キスしそうな雰囲気が何度も訪れる',
      '翌日「昨日のあれ、夢じゃないよね？」とLINE'
    ]
  }

  // 過去診断との相性変化比較のデフォルト値
  if (!selectedAnalysis.pastComparison) {
    selectedAnalysis.pastComparison = {
      pastDiagnoses: [
        {
          diagnosisDate: '2024-01-05 23:00',
          romanticScore: 65,
          userAIntoxication: '酔いすぎ',
          userBIntoxication: '酔いすぎ'
        }
      ],
      scoreChange: 20,
      changeReason: '前回はお互い酔いすぎて冷静さを失っていましたが、今回は程よい酔い加減で、本音を言えるけど理性も残っている絶妙なバランス。だからこそ、今夜は恋愛が進展しやすい最高のタイミングです！'
    }
  }

  if (!selectedAnalysis.detailedCompatibilityAnalysis) {
    selectedAnalysis.detailedCompatibilityAnalysis = {
      conversation: { score: 5, text: 'お互いの話を真剣に聞き合える関係性。片方が悩みを打ち明ければ、もう片方が的確なアドバイスを返し、深い信頼関係が築けます。' },
      tension: { score: 4, text: 'お酒の量に応じてテンションが上がるタイミングが絶妙に合い、一緒にいるだけで自然と盛り上がれる相性です。' },
      drinkingStyle: { score: 4, text: '静かなバーでの落ち着いた飲み会から、カラオケでの盛り上がりまで、どんなシーンでも互いのペースを尊重し合えます。' },
      roleBalance: { score: 5, text: '一人がリードすればもう一人がサポートし、逆の場面でも自然に役割が入れ替わる理想的なバランス感覚を持っています。' },
      longTerm: { score: 5, text: '時間が経つほどに互いの価値観や好みを理解し合い、長期的な友情や恋愛関係として発展していく可能性が高い組み合わせです。' }
    }
  }

  if (!selectedAnalysis.drinkingRecommendations) {
    selectedAnalysis.drinkingRecommendations = {
      idealSetting: '二人でじっくり話せる個室居酒屋や落ち着いたバーが最適。ゆっくりと時間を使うと相性が際立ちます。',
      recommendedDrinks: 'ビールで乾杯後、ハイボールや軽いカクテルでペースを整えると会話が続きやすいです。',
      seatingArrangement: '向かい合わせか隣同士。グループなら同じサイドに座ると連携しやすいです。',
      tipsAndCautions: '盛り上がりすぎには一言合図を。終電や時間配分を先に決めておくと安心です。'
    }
  }

  if (!selectedAnalysis.episodePredictions) {
    selectedAnalysis.episodePredictions = [
      '気づいたら閉店時間まで話し込む',
      '「あと一杯だけ」が数回続く',
      '二軒目のカラオケで意外な選曲が刺さる',
      '昔話で予想外に盛り上がる',
      '解散後すぐ「次いつ行く？」の連絡'
    ]
  }

  if (!selectedAnalysis.thirdPersonCompatibility) {
    selectedAnalysis.thirdPersonCompatibility = {
      recommendedTypes: [
        { typeName: '静かに飲むクール系', reason: '盛り上がりすぎた時のブレーキ役として機能し、場が安定します。' }
      ],
      notRecommendedTypes: [
        { typeName: '真面目な早帰り派', reason: '二人のペースと解散時刻が合わず、流れが途切れやすくなります。' }
      ]
    }
  }

  // Phase 1: メイン分析テキスト機能のデフォルト値
  if (!selectedAnalysis.mainAnalysis) {
    selectedAnalysis.mainAnalysis = {
      typeId: 'balanced_type',
      typeName: 'バランス型',
      intro: 'あなたは「バランス感覚抜群」タイプ。どんな場面でも自然体でいられる魅力があります。',
      behaviorPattern: 'お酒が入ると、普段の控えめな一面が少しずつ開放的になり、相手のペースに合わせながらも自分らしさを表現できるようになります。一杯目は様子見、二杯目から徐々にエンジンがかかり、三杯目で自然体の魅力が発揮されるのが特徴です。',
      psychology: '内面では「みんなと仲良くしたい」という思いが強く、相手の気持ちを理解しようとする優しさがあります。自分を押し通すよりも、場の雰囲気を大切にする協調性の高い人です。',
      groupRole: 'グループの潤滑油的存在で、誰とでも自然に話せるのが強み。場が静まり返った時には、さりげなく話題を振ってくれる頼れる存在です。',
      conclusion: 'あなたがいると、みんなが自然体でいられる居心地の良い空間が生まれます。',
      fullText: 'あなたは「バランス感覚抜群」タイプ。どんな場面でも自然体でいられる魅力があります。\n\nお酒が入ると、普段の控えめな一面が少しずつ開放的になり、相手のペースに合わせながらも自分らしさを表現できるようになります。一杯目は様子見、二杯目から徐々にエンジンがかかり、三杯目で自然体の魅力が発揮されるのが特徴です。\n\n内面では「みんなと仲良くしたい」という思いが強く、相手の気持ちを理解しようとする優しさがあります。自分を押し通すよりも、場の雰囲気を大切にする協調性の高い人です。\n\nグループの潤滑油的存在で、誰とでも自然に話せるのが強み。場が静まり返った時には、さりげなく話題を振ってくれる頼れる存在です。あなたがいると、みんなが自然体でいられる居心地の良い空間が生まれます。'
    }
  }
  
  // Phase 1: 相性詳細分析テキスト機能のデフォルト値
  if (!selectedAnalysis.compatibilityDetail) {
    selectedAnalysis.compatibilityDetail = [
      {
        typeId: 'social_enhancer',
        typeName: 'ソーシャルエンハンサー',
        compatibilityScore: 85,
        patternType: 'バランス型',
        summary: 'お互いの良さを引き出し合える理想的な組み合わせです。',
        scenario: 'あなたの落ち着いた雰囲気が相手のテンションを適度にコントロールし、相手の明るさがあなたの内に秘めた魅力を引き出してくれます。一緒にいると自然とバランスが取れ、周りからも「いいコンビだね」と評されるでしょう。',
        reason: '真逆のタイプだからこそ、お互いの足りない部分を補い合える関係性です。',
        advice: '長く付き合うほど、お互いの良さを理解し合える最高のパートナーになれるでしょう。',
        fullText: '【相性抜群！「バランス型」×「ソーシャルエンハンサー」】\n\nお互いの良さを引き出し合える理想的な組み合わせです。あなたの落ち着いた雰囲気が相手のテンションを適度にコントロールし、相手の明るさがあなたの内に秘めた魅力を引き出してくれます。一緒にいると自然とバランスが取れ、周りからも「いいコンビだね」と評されるでしょう。\n\n真逆のタイプだからこそ、お互いの足りない部分を補い合える関係性です。長く付き合うほど、お互いの良さを理解し合える最高のパートナーになれるでしょう。'
      }
    ]
  }
  
  // Phase 2: TikTok風箇条書きセクション機能のデフォルト値
  if (!selectedAnalysis.tiktokSections) {
    selectedAnalysis.tiktokSections = {
      characteristics: [
        '✓ 一杯目は様子見タイプ',
        '✓ 相手のペースに合わせるのが得意',
        '✓ 場の空気を読むのが上手',
        '✓ 誰とでも自然に話せる',
        '✓ 潤滑油的存在',
        '✓ 控えめだけど存在感がある',
        '✓ みんなに好かれる'
      ],
      typicalPhrases: [
        '「みんなで楽しもう」',
        '「どう思う？」',
        '「大丈夫？」',
        '「一緒にいると楽しいね」',
        '「また飲もうね」'
      ],
      compatibleWith: [
        '・明るくて元気なタイプ',
        '・落ち着いたクール系',
        '・話しやすい優しい人',
        '・一緒にいて安心できる人'
      ],
      incompatibleSituations: [
        '・一人で飲む飲み会',
        '・派手すぎる騒がしい場',
        '・競争的な雰囲気の場',
        '・早く帰りたい飲み会'
      ]
    }
  }
  
  // Phase 2: 追加情報セクション機能（拡張版）のデフォルト値
  if (!selectedAnalysis.enhancedAdditionalInfo) {
    selectedAnalysis.enhancedAdditionalInfo = {
      drinkingStyle: '少人数から大人数まで、どんな飲み会でも自然体で楽しめる万能型。場の雰囲気に合わせて適応し、みんなが居心地良く過ごせる空間を作るのが得意です。',
      recommendedDrinks: 'ワインや日本酒など、ゆっくりと味わえるお酒がおすすめ。相手と一緒に楽しめるものを選びがちで、お酒の種類よりも一緒に飲む人を大切にします。',
      seatingSuggestion: 'テーブルの中央付近に座ることで、周りの人との自然な交流を促進できます。隣には初対面の人を配置すると、場が和やかになるでしょう。',
      celebrityExamples: '優しい先輩タイプ、みんなに好かれるアイドル、落ち着いた俳優・女優。誰とでも自然に接することができ、周りを和ませる魅力があります。'
    }
  }
  
  return selectedAnalysis
}
