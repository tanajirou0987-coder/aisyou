import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, Heart, Wine, Users, Sparkles, TrendingUp, MessageCircle, Clock, Star, Lightbulb, AlertTriangle, Smile, Tag } from 'lucide-react'
import { 
  calculateCategoryScores, 
  calculatePersonalityProfile, 
  determineDrinkingType,
  calculateCompatibilityScore,
  calculateLeadershipScore,
  calculateActivityScore
} from '../utils/scientificDrinkingAnalysis'
import { getCombinationKeywords } from '../data/drinkingTypeKeywords'
import { generateCompatibilityText, generateSameTypeCompatibilityText } from '../utils/compatibilityTextGenerator'

export function PairDetailsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { state } = useApp()

  const maleId = searchParams.get('maleId')
  const femaleId = searchParams.get('femaleId')

  if (!maleId || !femaleId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="card mb-6" style={{background: '#FF0000'}}>
            <p className="text-white text-xl font-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>⚠️ ペア情報が見つかりません ⚠️</p>
          </div>
          <button
            onClick={() => navigate('/group-results')}
            className="btn-primary"
          >
            結果に戻る
          </button>
        </div>
      </div>
    )
  }

  const maleParticipant = state.groupParticipants.find(p => p.userId === maleId)
  const femaleParticipant = state.groupParticipants.find(p => p.userId === femaleId)

  if (!maleParticipant || !femaleParticipant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="card mb-6" style={{background: '#FF0000'}}>
            <p className="text-white text-xl font-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>⚠️ 参加者情報が見つかりません ⚠️</p>
          </div>
          <button
            onClick={() => navigate('/group-results')}
            className="btn-primary"
          >
            結果に戻る
          </button>
        </div>
      </div>
    )
  }

  // ペアの相性スコアを取得
  const pairScore = state.allCombinationsList?.combinations.find(
    combo => combo.maleId === maleId && combo.femaleId === femaleId
  )

  // 科学的根拠に基づいた酒癖タイプの判定
  const getDrinkingType = (participant: any) => {
    if (!participant.diagnosisData || participant.diagnosisData.length === 0) {
      return 'ミステリアスドリンカー'
    }
    
    // カテゴリー別スコアを計算
    const categoryScores = calculateCategoryScores(participant.diagnosisData)
    
    // 性格プロファイルを計算
    const profile = calculatePersonalityProfile(categoryScores)
    
    // 酒癖タイプを判定
    return determineDrinkingType(profile)
  }

  const maleType = getDrinkingType(maleParticipant)
  const femaleType = getDrinkingType(femaleParticipant)

  // 二人の組み合わせキーワードを取得
  const combinationKeywords = getCombinationKeywords(maleType, femaleType)

  // 科学的な相性スコアを計算
  const calculateScientificCompatibility = () => {
    if (!maleParticipant.diagnosisData || !femaleParticipant.diagnosisData) {
      return pairScore?.romanticScore || 50
    }
    
    const maleCategoryScores = calculateCategoryScores(maleParticipant.diagnosisData)
    const femaleCategoryScores = calculateCategoryScores(femaleParticipant.diagnosisData)
    
    const maleProfile = calculatePersonalityProfile(maleCategoryScores)
    const femaleProfile = calculatePersonalityProfile(femaleCategoryScores)
    
    return calculateCompatibilityScore(maleProfile, femaleProfile)
  }

  const scientificScore = calculateScientificCompatibility()

  // ペア相性の詳細分析を生成（個人診断の詳細データをベースに）
  const getPairAnalysis = (maleType: string, femaleType: string, score: number, maleName: string, femaleName: string) => {
    const analyses: { [key: string]: any } = {
      'ソーシャルエンハンサー-ロマンティックエンハンサー': {
        compatibilityScore: Math.round(score),
        relationshipType: '最強の飲み友カップル',
        coupleDescription: 'あなたたちは「最強の飲み友カップル」です！ソーシャルエンハンサーの社交性向上効果とロマンティックエンハンサーの恋愛感情高揚効果が相乗的に作用し、飲み会が最高に盛り上がります。科学的根拠に基づいた相性の良さで、お互いの魅力を引き出し合える理想的な組み合わせです！',
        detailedScores: {
          '盛り上がり度': Math.round(Math.min(95, score + 10)),
          '会話の相性': Math.round(Math.min(90, score + 5)),
          '飲むペース': Math.round(Math.min(85, score)),
          '雰囲気': Math.round(Math.min(95, score + 15)),
          '親密度': Math.round(Math.min(90, score + 8))
        },
        specificExperiences: [
          '「男性が場を盛り上げている時、女性は『素敵だね』って優しく見守る」',
          '「女性が甘い雰囲気を作ると、男性は『もっと盛り上げよう！』ってテンションアップ」',
          '「二人で飲むと、男性のノリと女性のロマンスが合わさって最高の雰囲気に」',
          '「男性が踊りだすと、女性は『一緒に踊ろう』って誘ってくれる」',
          '「飲み会では二人の相性が光り、周りも『いいカップルだね』ってうらやましがる」'
        ],
        strengths: [
          '場を盛り上げる力が抜群',
          'お互いの魅力を引き出し合える',
          '飲み会での相性が最高',
          'ロマンチックな雰囲気も作れる',
          '周りからも注目されるカップル'
        ],
        challenges: [
          'テンションの差で疲れることがある',
          '飲み方の違いでペースが合わない',
          '帰り時間のズレが生じやすい',
          '男性が飲みすぎる傾向がある'
        ],
        advice: [
          'お互いのペースを尊重する',
          '一緒に踊る時間を作る',
          '帰りは一緒に帰る',
          '女性のロマンチックな気持ちを大切にする',
          '男性は適度な量を心がける'
        ],
        dateIdeas: [
          'カラオケデート',
          'ダンスパーティー',
          '屋台巡り',
          '夜景スポット',
          'ワインバーでのデート',
          'ライブハウス'
        ],
        communicationTips: [
          'お互いの良いところを褒め合う',
          '男性は女性の話をよく聞く',
          '女性は男性の盛り上げを楽しむ',
          '二人だけの時間も大切にする',
          '周りの人とも楽しく過ごす'
        ],
        recommendedSeating: 'カウンター席や個室で、二人だけの時間も作れる場所がおすすめ。周りと交流しつつ、二人の時間も楽しめます。',
        drinkRecommendations: '【男性】ビールで乾杯→ハイボールで盛り上げ→最後はウイスキーでクールダウン。【女性】スパークリングワインでスタート→フルーティーなカクテル→ロゼワインで締め。二人でシェアしながら飲むと距離が縮まります！',
        conversationTopics: '旅行の話、趣味の話、将来の夢など、ロマンチックで前向きな話題が盛り上がります。',
        warningPoints: '男性が飲みすぎて女性が引いてしまう可能性があるので、適度な量を心がけましょう。',
        longTermOutlook: '長期的には、お互いの個性を活かしながら、楽しい関係を築いていける相性です。',
        improvementTips: [
          '定期的に二人だけの時間を作る',
          'お互いのペースを理解し合う',
          '新しいことに一緒に挑戦する',
          'コミュニケーションを大切にする'
        ],
        // 今夜の恋愛可能性詳細分析
        romanticDetailAnalysis: {
          excitementLevel: { score: Math.round(Math.min(95, score + 15)), text: '今夜の盛り上がり度は最高レベル！二人の相性が最高潮に達します。' },
          closenessSpeed: { score: Math.round(Math.min(90, score + 10)), text: '距離を縮めるスピードが早く、自然に親密になれます。' },
          confessionChance: { score: Math.round(Math.min(85, score + 5)), text: '告白のチャンスが高く、お互いの気持ちを伝えやすい雰囲気です。' },
          physicalContact: { score: Math.round(Math.min(80, score)), text: '自然なスキンシップができ、お互いを意識し合えます。' },
          nextDayContinuity: { score: Math.round(Math.min(90, score + 8)), text: '翌日も続く関係性を築きやすく、長期的な関係に発展する可能性が高いです。' }
        },
        // 今夜のおすすめアクション提案
        romanticActionRecommendations: {
          whatToDoTonight: '男性は場を盛り上げつつ、女性のロマンチックな気持ちを大切にしましょう。一緒に踊ったり、二人だけの時間を作ることがおすすめです。',
          whatNotToDo: '男性が飲みすぎて女性を置いてけぼりにしないよう注意。女性も男性の盛り上げを否定せず、一緒に楽しむことが大切です。',
          recommendedMove: '男性は女性をリードしつつ、女性の意見を尊重する。女性は男性の盛り上げに合わせつつ、自分の気持ちも伝える。',
          nextDayFollow: '今夜の楽しい時間を翌日も続けるため、一緒に朝食を取ったり、次のデートの約束をすることをおすすめします。'
        },
        // 今夜起こりそうな恋愛シーン予測
        romanticScenePredictions: [
          '男性が女性をリードしてダンスフロアへ',
          '女性が男性の手を取って二人だけの時間を作る',
          '周りの人たちが「いいカップルだね」と注目する',
          '男性が女性の好みの飲み物を覚えて注文する',
          '女性が男性の盛り上げる姿を見て「素敵」と微笑む'
        ]
      },
      'コンフィデンスブースター-エモーショナルエクスプレス': {
        compatibilityScore: Math.round(score),
        relationshipType: '深い絆のカップル',
        coupleDescription: 'あなたたちは「深い絆のカップル」です！コンフィデンスブースターの自信向上効果とエモーショナルエクスプレスの感情表現豊かさが組み合わさり、お互いの本音を引き出し合える深い関係を築けます。',
        detailedScores: {
          '盛り上がり度': Math.round(Math.min(90, score + 5)),
          '会話の相性': Math.round(Math.min(95, score + 15)),
          '飲むペース': Math.round(Math.min(80, score - 5)),
          '雰囲気': Math.round(Math.min(90, score + 10)),
          '親密度': Math.round(Math.min(95, score + 20))
        },
        specificExperiences: [
          '「男性の自信に満ちた話し方に、女性は『頼もしい』って感じる」',
          '「女性の素直な感情表現に、男性は『心を開いてくれる』って嬉しくなる」',
          '「お酒を飲むと、普段言えない本音を話し合えるようになる」',
          '「男性がリーダーシップを発揮すると、女性は『一緒にいて安心』って思う」',
          '「二人で過ごす時間では、深い会話ができ、お互いをより深く理解できる」'
        ],
        strengths: [
          '深い会話ができる',
          'お互いの本音を引き出し合える',
          '信頼関係が築きやすい',
          '感情的な支え合いができる',
          '長期的な関係を築ける'
        ],
        challenges: [
          '感情の起伏が激しいことがある',
          '男性の自信過剰に女性が引くことがある',
          '飲みすぎると冷静さを失いやすい',
          '価値観の違いで対立することがある'
        ],
        advice: [
          'お互いの感情を尊重する',
          '本音で話し合う時間を作る',
          '男性は女性の感情に寄り添う',
          '女性は男性の自信を支える',
          '適度な量を心がける'
        ],
        dateIdeas: [
          '落ち着いたレストランでのディナー',
          '静かなバーでの会話',
          '美術館や博物館巡り',
          '温泉旅行',
          '映画鑑賞デート'
        ],
        communicationTips: [
          '相手の話を最後まで聞く',
          '感情を素直に表現する',
          'お互いの価値観を尊重する',
          '定期的に深い話をする',
          '感謝の気持ちを伝える'
        ],
        recommendedSeating: '落ち着いた雰囲気の個室や、静かなバーのカウンター席がおすすめ。深い会話に集中できます。',
        drinkRecommendations: '【男性】シングルモルトウイスキー（ロック）→バーボン（ストレート）→ブランデーで余韻。【女性】赤ワイン（フルボディ）→白ワイン（辛口）→デザートワインで甘く。お酒の話題で盛り上がり、深い会話に発展しやすい！',
        conversationTopics: '人生観、価値観、過去の経験など、深い話ができる話題がおすすめ。',
        warningPoints: '感情が高ぶりすぎて冷静さを失わないよう、適度な量を心がけましょう。',
        longTermOutlook: '長期的には、お互いの本音を理解し合える深い関係を築いていける相性です。',
        improvementTips: [
          '定期的に深い会話をする',
          'お互いの感情を大切にする',
          '新しい経験を一緒にする',
          '信頼関係を築く努力をする'
        ],
        // 今夜の恋愛可能性詳細分析
        romanticDetailAnalysis: {
          excitementLevel: { score: Math.round(Math.min(85, score + 5)), text: '落ち着いた雰囲気で、深い会話を楽しめます。' },
          closenessSpeed: { score: Math.round(Math.min(95, score + 20)), text: '本音で話し合えるため、親密度が急速に上がります。' },
          confessionChance: { score: Math.round(Math.min(90, score + 15)), text: '深い会話の中で自然に気持ちを伝えやすい雰囲気です。' },
          physicalContact: { score: Math.round(Math.min(85, score + 10)), text: '信頼関係が築けるため、自然なスキンシップができます。' },
          nextDayContinuity: { score: Math.round(Math.min(95, score + 20)), text: '深い関係を築きやすく、長期的な関係に発展する可能性が非常に高いです。' }
        },
        // 今夜のおすすめアクション提案
        romanticActionRecommendations: {
          whatToDoTonight: '深い会話を楽しみ、お互いの本音を聞き合いましょう。男性は女性の感情に寄り添い、女性は男性の自信を支えることが大切です。',
          whatNotToDo: '感情的になりすぎて冷静さを失わないよう注意。男性の自信過剰や女性の感情の起伏に注意しましょう。',
          recommendedMove: '男性は女性の話を最後まで聞き、女性は男性の自信を尊重する。お互いの価値観を理解し合うことが重要です。',
          nextDayFollow: '今夜の深い会話を翌日も続けるため、一緒に朝食を取ったり、次のデートの約束をすることをおすすめします。'
        },
        // 今夜起こりそうな恋愛シーン予測
        romanticScenePredictions: [
          '男性が女性の話をじっくり聞いて共感する',
          '女性が男性の自信に満ちた話し方に「頼もしい」と感じる',
          'お互いの本音を話し合って深い理解を深める',
          '男性が女性の感情に寄り添って優しく接する',
          '女性が男性の自信を支えて「一緒にいて安心」と感じる'
        ]
      },
      'ストレスリリーバー-ミステリアスドリンカー': {
        compatibilityScore: Math.round(score),
        relationshipType: '落ち着いた癒しカップル',
        coupleDescription: 'あなたたちは「落ち着いた癒しカップル」です！ストレスリリーバーのリラックス効果とミステリアスドリンカーのクールさが組み合わさり、お互いのペースを尊重し合える落ち着いた関係を築けます。',
        detailedScores: {
          '盛り上がり度': Math.round(Math.min(70, score - 10)),
          '会話の相性': Math.round(Math.min(85, score + 5)),
          '飲むペース': Math.round(Math.min(90, score + 10)),
          '雰囲気': Math.round(Math.min(80, score)),
          '親密度': Math.round(Math.min(75, score - 5))
        },
        specificExperiences: [
          '「男性のリラックスした雰囲気に、女性は『一緒にいて落ち着く』って感じる」',
          '「女性のクールな話し方に、男性は『安心できる』って思う」',
          '「お酒を飲むと、お互いのペースでゆっくりと会話を楽しめる」',
          '「男性がストレスを解消している時、女性は『自然体でいて』って見守る」',
          '「二人で過ごす時間では、無理をせず自然体でいられる」'
        ],
        strengths: [
          'お互いのペースを尊重し合える',
          '落ち着いた雰囲気で過ごせる',
          '自然体でいられる',
          'ストレス解消効果がある',
          '長期的な関係を築きやすい'
        ],
        challenges: [
          '盛り上がりに欠けることがある',
          '積極性が不足することがある',
          '感情表現が少ないことがある',
          '新しいことに挑戦するのが苦手'
        ],
        advice: [
          'お互いのペースを尊重する',
          '無理に盛り上げようとしない',
          '自然体でいることを大切にする',
          '時には積極的に話しかける',
          '新しいことに一緒に挑戦する'
        ],
        dateIdeas: [
          '静かなカフェでのんびり',
          '温泉でのリラックス',
          '自然の中でピクニック',
          '映画館での映画鑑賞',
          '家でのまったり時間'
        ],
        communicationTips: [
          '相手のペースに合わせる',
          '無理をしない',
          '自然な会話を心がける',
          '時には積極的に話しかける',
          'お互いの時間を尊重する'
        ],
        recommendedSeating: '静かな雰囲気の個室や、落ち着いたバーの席がおすすめ。リラックスして過ごせます。',
        drinkRecommendations: '【男性】クラフトビール（IPA）→ピルスナー→黒ビールでゆっくり。【女性】ジントニック→ウイスキーハイボール→モスコミュールで大人の雰囲気。お互いのペースを尊重しながら、ゆったり飲むのがポイント！',
        conversationTopics: '趣味、仕事、日常の出来事など、落ち着いた話題がおすすめ。',
        warningPoints: '盛り上がりに欠ける可能性があるので、時には積極的に話しかけることも大切です。',
        longTermOutlook: '長期的には、お互いのペースを尊重し合える安定した関係を築いていける相性です。',
        improvementTips: [
          '定期的に新しいことに挑戦する',
          'お互いの時間を大切にする',
          '時には積極的に行動する',
          'コミュニケーションを増やす'
        ],
        // 今夜の恋愛可能性詳細分析
        romanticDetailAnalysis: {
          excitementLevel: { score: Math.round(Math.min(70, score - 10)), text: '落ち着いた雰囲気で、ゆっくりと時間を過ごせます。' },
          closenessSpeed: { score: Math.round(Math.min(75, score - 5)), text: 'ゆっくりとしたペースで、自然に親密になれます。' },
          confessionChance: { score: Math.round(Math.min(70, score - 10)), text: '落ち着いた雰囲気で、自然に気持ちを伝えやすい環境です。' },
          physicalContact: { score: Math.round(Math.min(80, score)), text: 'リラックスした雰囲気で、自然なスキンシップができます。' },
          nextDayContinuity: { score: Math.round(Math.min(85, score + 5)), text: '安定した関係を築きやすく、長期的な関係に発展する可能性があります。' }
        },
        // 今夜のおすすめアクション提案
        romanticActionRecommendations: {
          whatToDoTonight: 'リラックスした雰囲気で、ゆっくりと会話を楽しみましょう。お互いのペースを尊重し、自然体でいることが大切です。',
          whatNotToDo: '無理に盛り上げようとしないこと。お互いのペースを乱さないよう注意しましょう。',
          recommendedMove: '男性は女性のペースに合わせ、女性は男性のリラックスした雰囲気を楽しむ。お互いの時間を尊重することが重要です。',
          nextDayFollow: '今夜のリラックスした時間を翌日も続けるため、一緒に朝食を取ったり、次のデートの約束をすることをおすすめします。'
        },
        // 今夜起こりそうな恋愛シーン予測
        romanticScenePredictions: [
          '男性が女性のペースに合わせてゆっくりと会話する',
          '女性が男性のリラックスした雰囲気に「一緒にいて落ち着く」と感じる',
          'お互いのペースを尊重しながら自然体で過ごす',
          '男性が女性のクールな話し方に「安心できる」と感じる',
          '女性が男性のストレス解消を「自然体でいて」と見守る'
        ]
      }
    }

    // デフォルトの分析（組み合わせが見つからない場合）
    // 動的に相性解説文を生成
    const dynamicCoupleDescription = maleType === femaleType 
      ? generateSameTypeCompatibilityText(maleType, Math.round(score), maleName, femaleName)
      : generateCompatibilityText(maleType, femaleType, Math.round(score), maleName, femaleName)
    
    const defaultAnalysis = {
      compatibilityScore: Math.round(score),
      relationshipType: 'バランス型飲み友カップル',
      coupleDescription: dynamicCoupleDescription,
      detailedScores: {
        '盛り上がり度': Math.round(Math.min(85, score + 5)),
        '会話の相性': Math.round(Math.min(90, score + 10)),
        '飲むペース': Math.round(Math.min(80, score)),
        '雰囲気': Math.round(Math.min(85, score + 5)),
        '親密度': Math.round(Math.min(90, score + 10))
      },
      specificExperiences: [
        `「男性は女性の${femaleType}な魅力に興味を持ち、『面白い人だね』って言うようになる」`,
        `「女性は男性の${maleType}な特徴に安心し、『一緒にいると楽しい』って感じる」`,
        '「飲み会では、二人で新しい発見を共有し、『この人といると毎回が新鮮』って思うようになる」',
        '「男性が新しいことに挑戦する時、女性は『私も一緒にやってみたい』って言ってくれる」',
        '「二人で過ごす時間では、お互いの違いを楽しみ、『この人だからこそ見える世界がある』って感じる」'
      ],
      strengths: [
        'お互いの違いを尊重し合える',
        '一緒に楽しめる関係',
        '深い理解ができる',
        'バランスの取れた関係',
        '長期的な関係を築ける'
      ],
      challenges: [
        '価値観の違いで対立することがある',
        '飲み方の違いでペースが合わない',
        '時には理解し合うのに時間がかかる',
        'お互いの特徴を理解する必要がある'
      ],
      advice: [
        'お互いのペースを尊重する',
        '自然体でいることを大切にする',
        '新しいことに一緒に挑戦する',
        'コミュニケーションを大切にする',
        'お互いの違いを楽しむ'
      ],
      dateIdeas: [
        'カフェでのんびりおしゃべり',
        '映画館での映画鑑賞',
        '公園での散歩',
        'レストランでのディナー',
        'ショッピングモール巡り'
      ],
      communicationTips: [
        '相手の話をよく聞く',
        'お互いの意見を尊重する',
        '自然な会話を心がける',
        '時には積極的に話しかける',
        '感謝の気持ちを伝える'
      ],
      recommendedSeating: '落ち着いた雰囲気の個室がおすすめです。お互いのペースで過ごせます。',
      drinkRecommendations: '【男性】生ビール→ハイボール→日本酒でバラエティ豊かに。【女性】カクテル（モヒート）→白ワイン→梅酒ソーダで爽やかに。お互いの飲み物を一口ずつ交換すると、会話のきっかけになります！',
      conversationTopics: '趣味や日常の話など、気軽に話せる話題がおすすめです。',
      warningPoints: '適度な量を心がけ、楽しい時間を過ごしましょう。',
      longTermOutlook: '長期的には、お互いの個性を活かしながら、楽しい関係を築いていける相性です。',
      improvementTips: [
        '定期的に新しいことに挑戦する',
        'お互いの時間を大切にする',
        'コミュニケーションを増やす',
        'お互いの違いを理解する'
      ],
      // 今夜の恋愛可能性詳細分析
      romanticDetailAnalysis: {
        excitementLevel: { score: Math.round(Math.min(85, score + 5)), text: 'バランスの取れた雰囲気で、楽しい時間を過ごせます。' },
        closenessSpeed: { score: Math.round(Math.min(90, score + 10)), text: 'お互いの個性を理解し合えるため、自然に親密になれます。' },
        confessionChance: { score: Math.round(Math.min(80, score)), text: 'お互いのペースを尊重しながら、自然に気持ちを伝えやすい雰囲気です。' },
        physicalContact: { score: Math.round(Math.min(85, score + 5)), text: 'お互いの個性を活かしながら、自然なスキンシップができます。' },
        nextDayContinuity: { score: Math.round(Math.min(90, score + 10)), text: 'バランスの取れた関係を築きやすく、長期的な関係に発展する可能性が高いです。' }
      },
      // 今夜のおすすめアクション提案
      romanticActionRecommendations: {
        whatToDoTonight: 'お互いの個性を活かしながら、楽しい時間を過ごしましょう。新しいことに一緒に挑戦したり、お互いの違いを楽しむことが大切です。',
        whatNotToDo: 'お互いのペースを乱さないよう注意。無理に合わせようとせず、自然体でいることが大切です。',
        recommendedMove: 'お互いの個性を尊重し、新しいことに一緒に挑戦する。お互いの違いを楽しみながら、自然な関係を築くことが重要です。',
        nextDayFollow: '今夜の楽しい時間を翌日も続けるため、一緒に朝食を取ったり、次のデートの約束をすることをおすすめします。'
      },
      // 今夜起こりそうな恋愛シーン予測
      romanticScenePredictions: [
        'お互いの個性を活かしながら楽しい会話を楽しむ',
        '新しいことに一緒に挑戦して新鮮な発見を共有する',
        'お互いの違いを楽しみながら自然体で過ごす',
        '男性が女性の個性に興味を持ち「面白い人だね」と感じる',
        '女性が男性の特徴に安心し「一緒にいると楽しい」と感じる'
      ]
    }

    const key = `${maleType}-${femaleType}`
    return analyses[key] || defaultAnalysis
  }

  const analysis = getPairAnalysis(maleType, femaleType, scientificScore, maleParticipant.userName, femaleParticipant.userName)

  // 科学的根拠に基づいた性格傾向を計算する関数
  const getPersonalityTendency = (participant: any, category: 'leadership' | 'activity') => {
    if (!participant.diagnosisData || participant.diagnosisData.length === 0) {
      return { stars: '★★★☆☆', type: 'バランス' }
    }
    
    const categoryScores = calculateCategoryScores(participant.diagnosisData)
    const profile = calculatePersonalityProfile(categoryScores)
    
    if (category === 'leadership') {
      const leadershipScore = calculateLeadershipScore(profile)
      const stars = '★'.repeat(Math.ceil(leadershipScore / 20)) + '☆'.repeat(5 - Math.ceil(leadershipScore / 20))
      const type = leadershipScore >= 70 ? 'S寄り' : leadershipScore >= 40 ? 'バランス' : 'M寄り'
      return { stars, type }
    } else {
      const activityScore = calculateActivityScore(profile)
      const stars = '★'.repeat(Math.ceil(activityScore / 20)) + '☆'.repeat(5 - Math.ceil(activityScore / 20))
      const type = activityScore >= 70 ? '積極的' : activityScore >= 40 ? '普通' : '控えめ'
      return { stars, type }
    }
  }

  // 性格相性を計算する関数
  const getPersonalityCompatibility = (maleParticipant: any, femaleParticipant: any) => {
    const maleLeadership = getPersonalityTendency(maleParticipant, 'leadership')
    const femaleLeadership = getPersonalityTendency(femaleParticipant, 'leadership')
    
    const maleS = maleLeadership.type.includes('S')
    const femaleS = femaleLeadership.type.includes('S')
    const maleM = maleLeadership.type.includes('M')
    const femaleM = femaleLeadership.type.includes('M')
    
    if (maleS && femaleM) {
      return '「完璧なS×Mバランス。主導権の駆け引きが楽しそう」'
    } else if (maleM && femaleS) {
      return '「女性がリードして、男性が受け入れるバランスの良い関係性。お互いの性格が補完し合えるカップルです」'
    } else if (maleS && femaleS) {
      return '「S×Sで激しくぶつかり合う情熱的なふたり」'
    } else if (maleM && femaleM) {
      return '「どちらもM気質で、優しく包み合う関係」'
    } else {
      return '「Sっ気もMっ気もある器用なふたり」'
    }
  }

  // スキンシップ傾向を計算する関数
  const getSkinShipTendency = (maleType: string, femaleType: string, category: 'kiss' | 'sweetness' | 'love') => {
    const tendencies: { [key: string]: { kiss: string, sweetness: string, love: string } } = {
      'ソーシャルエンハンサー': {
        kiss: '高め',
        sweetness: '誘惑系',
        love: 'スキンシップ重視'
      },
      'ロマンティックエンハンサー': {
        kiss: '高め',
        sweetness: 'おねだり系',
        love: '雰囲気作り'
      },
      'コンフィデンスブースター': {
        kiss: '高め',
        sweetness: '押し倒し系',
        love: '言葉責め'
      },
      'エモーショナルエクスプレス': {
        kiss: '普通',
        sweetness: 'おねだり系',
        love: '言葉責め'
      },
      'ストレスリリーバー': {
        kiss: 'じっくり派',
        sweetness: 'おねだり系',
        love: '雰囲気作り'
      },
      'ミステリアスドリンカー': {
        kiss: 'じっくり派',
        sweetness: '誘惑系',
        love: '雰囲気作り'
      }
    }
    
    // ペアの組み合わせに基づいて調整
    const maleTendency = tendencies[maleType] || tendencies['ミステリアスドリンカー']
    const femaleTendency = tendencies[femaleType] || tendencies['ミステリアスドリンカー']
    
    if (category === 'kiss') {
      // キス頻度は高い方に合わせる
      if (maleTendency.kiss === '高め' || femaleTendency.kiss === '高め') {
        return '高め'
      } else if (maleTendency.kiss === '普通' || femaleTendency.kiss === '普通') {
        return '普通'
      } else {
        return 'じっくり派'
      }
    } else if (category === 'sweetness') {
      // 甘え方は男性の傾向を優先
      return maleTendency.sweetness
    } else {
      // 愛情表現は女性の傾向を優先
      return femaleTendency.love
    }
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー - モバイルはコンパクト、PCは従来の演出 */}
        <div className="text-center mb-3 md:mb-8">
          <button
            onClick={() => navigate('/group-results')}
            className="btn-secondary text-xs md:text-sm flex items-center gap-1 md:gap-2 mx-auto mb-2 md:mb-6"
          >
            <ArrowLeft className="w-3 h-3 md:w-5 md:h-5" />
            <span className="md:hidden">戻る</span>
            <span className="hidden md:inline">結果に戻る</span>
          </button>
          {/* モバイルタイトル */}
          <div className="card p-2 md:hidden" style={{background: '#0066FF'}}>
            <h1 className="text-lg font-bold text-white mb-1">ペア相性詳細分析</h1>
            <p className="text-xs font-bold text-white">二人の相性をコンパクト表示</p>
          </div>
          {/* PCタイトル */}
          <div className="hidden md:block card relative" style={{background: '#0066FF', transform: 'rotate(-2deg)'}}>
            <span className="sound-effect pop-yellow absolute top-2 left-4" style={{transform: 'rotate(-15deg)', fontSize: '1.5rem'}}>💘</span>
            <span className="sound-effect pop-pink absolute top-2 right-4" style={{transform: 'rotate(15deg)', fontSize: '1.5rem'}}>LOVE!</span>
            <h1 className="heading-primary text-6xl mb-3" style={{color: '#FF69B4', WebkitTextStroke: '3px #000000', textShadow: '5px 5px 0 #FFD700'}}>
              ペア相性詳細分析
            </h1>
            <p className="text-xl font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ この二人の相性を詳しく分析しました ★
            </p>
          </div>
        </div>

        {/* ペア情報 - モバイルは簡潔表示 */}
        <div className="card mb-3 md:mb-6 p-3 md:p-6" style={{background: '#FFFFFF'}}>
          <div className="text-center mb-3 md:mb-6">
            <div className="flex justify-center mb-2 md:mb-4">
              <div className="relative p-2 md:p-4 bg-pink-500 rounded-full border-2 md:border-5 border-black" style={{boxShadow: '2px 2px 0 #000000, 6px 6px 0 #000000'}}>
                <Users className="w-6 h-6 md:w-12 md:h-12 text-white" />
                <Heart className="w-3 h-3 md:w-7 md:h-7 text-red-600 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h2 className="text-sm font-bold md:heading-secondary mb-2 md:mb-6">
              <span className="md:hidden">このペアの相性</span>
              <span className="hidden md:inline">💥 このペアの酒癖相性分析 💥</span>
            </h2>
            <div className="flex justify-center items-center gap-2 md:gap-6 mb-3 md:mb-6">
              <div className="text-center">
                <div className={`inline-block px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl font-black text-white border-2 md:border-4 border-black text-sm md:text-xl ${maleParticipant.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`} style={{boxShadow: '2px 2px 0 #000000, 4px 4px 0 #000000', fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  {maleParticipant.gender === 'male' ? '♂' : '♀'} {maleParticipant.userName}
                </div>
                <div className="text-xs md:text-sm text-black font-bold mt-1 md:mt-2">{maleType}</div>
              </div>
              <div className="text-2xl md:text-5xl font-black" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '0 md:2px #000000', color: '#FF0000'}}>×</div>
              <div className="text-center">
                <div className={`inline-block px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl font-black text-white border-2 md:border-4 border-black text-sm md:text-xl ${femaleParticipant.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`} style={{boxShadow: '2px 2px 0 #000000, 4px 4px 0 #000000', fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  {femaleParticipant.gender === 'male' ? '♂' : '♀'} {femaleParticipant.userName}
                </div>
                <div className="text-xs md:text-sm text-black font-bold mt-1 md:mt-2">{femaleType}</div>
              </div>
            </div>
            <div className="compatibility-score mb-3 md:mb-8">
              {analysis.compatibilityScore}点
            </div>
            
            {/* イキリスの相性診断コメント - 吹き出し風 */}
            <div className="relative mt-3 md:mt-8">
              <div className="flex items-start gap-2 md:gap-4">
                {/* イキリスのキャラクター */}
                <div className="flex-shrink-0">
                  <div className="relative w-12 h-12 md:w-24 md:h-24 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform" style={{
                    background: '#00CC44',
                    border: '2px md:border-4 solid #000000',
                    boxShadow: '2px 2px 0 #000000, 5px 5px 0 #000000'
                  }}>
                    <span className="text-xl md:text-4xl">🐿️</span>
                    <span className="absolute -right-0.5 md:-right-1 bottom-1 md:bottom-2 text-sm md:text-2xl transform rotate-12">🍺</span>
                  </div>
                  <div className="text-center mt-1 md:mt-2 px-1 md:px-2 py-0.5 md:py-1 bg-black rounded md:rounded-lg border border-black md:border-2" style={{boxShadow: '1px 1px 0 #FF0000, 2px 2px 0 #FF0000'}}>
                    <p className="text-xs font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>イキリス</p>
                  </div>
                </div>
                
                {/* 吹き出し */}
                <div className="flex-1 relative">
                  <div className="rounded-lg md:rounded-2xl p-3 md:p-6 relative" style={{
                    background: '#FFFFFF',
                    border: '2px md:border-5 solid #000000',
                    boxShadow: '3px 3px 0 #000000, 6px 6px 0 #000000'
                  }}>
                    {/* 吹き出しの三角形（PCのみ） */}
                    <div className="hidden md:block absolute left-0 top-8 transform -translate-x-4">
                      <div className="w-0 h-0" style={{
                        borderTop: '15px solid transparent',
                        borderRight: '15px solid #FFFFFF',
                        borderBottom: '15px solid transparent'
                      }}></div>
                      <div className="w-0 h-0 absolute top-0 left-0 transform -translate-x-1" style={{
                        borderTop: '16px solid transparent',
                        borderRight: '16px solid #000000',
                        borderBottom: '16px solid transparent'
                      }}></div>
                    </div>
                    
                    <div className="flex items-start gap-1 md:gap-2 mb-2 md:mb-3">
                      <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-500 flex-shrink-0 mt-0.5 md:mt-1" style={{filter: 'drop-shadow(1px 1px 0 #000000)'}} />
                      <h3 className="text-sm md:text-2xl font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                        💥 {analysis.relationshipType} 💥
                      </h3>
                    </div>
                    
                    <p className="text-black leading-relaxed text-xs md:text-base font-bold pl-0 md:pl-7" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
                      {analysis.coupleDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相性スコア詳細 - ポップアート風 */}
        <div className="card mb-6" style={{background: '#FFFFFF', transform: 'rotate(1deg)'}}>
          <h3 className="text-3xl font-black mb-6 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000', color: '#00CC44', textShadow: '3px 3px 0 #FFD700'}}>
            <TrendingUp className="w-7 h-7 text-green-600" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
            ★ 相性スコア詳細 ★
          </h3>
          
          {/* レーダーチャート風の表示 */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-xl border-4 border-black" style={{background: '#FFFFFF', boxShadow: '4px 4px 0 #000000'}}>
                {/* 背景の円 */}
                <div className="absolute inset-0 border-2 border-gray-300 rounded-full"></div>
                <div className="absolute inset-4 border-2 border-gray-400 rounded-full"></div>
                <div className="absolute inset-8 border-2 border-gray-500 rounded-full"></div>
                <div className="absolute inset-12 border-2 border-gray-600 rounded-full"></div>
                
                {/* 中心点 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-red-600 rounded-full border-2 border-black"></div>
                
                {/* 各軸のラベルとスコア */}
                {Object.entries(analysis.detailedScores).map(([category, score], index) => {
                  const angle = (index * 360) / Object.keys(analysis.detailedScores).length
                  const radians = (angle * Math.PI) / 180
                  const radius = 120
                  const x = 160 + radius * Math.cos(radians - Math.PI / 2)
                  const y = 160 + radius * Math.sin(radians - Math.PI / 2)
                  
                  // スコアに基づく位置
                  const scoreRadius = (score / 100) * radius
                  const scoreX = 160 + scoreRadius * Math.cos(radians - Math.PI / 2)
                  const scoreY = 160 + scoreRadius * Math.sin(radians - Math.PI / 2)
                  
                  return (
                    <div key={category}>
                      {/* 軸線 */}
                      <div 
                        className="absolute w-1 bg-gray-600"
                        style={{
                          left: '160px',
                          top: '160px',
                          height: `${radius}px`,
                          transformOrigin: '0 0',
                          transform: `rotate(${angle}deg)`
                        }}
                      ></div>
                      
                      {/* スコアポイント */}
                      <div 
                        className="absolute w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-black"
                        style={{ left: `${scoreX}px`, top: `${scoreY}px` }}
                      ></div>
                      
                      {/* ラベル */}
                      <div 
                        className="absolute text-sm font-black transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}px`, top: `${y}px` }}
                      >
                        <div className="text-center">
                          <div className="text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>{category}</div>
                          <div className="text-red-600 font-black text-lg" style={{fontFamily: 'Bangers, sans-serif'}}>{score}点</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {/* スコアエリアの塗りつぶし */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <polygon
                    points={Object.entries(analysis.detailedScores).map(([category, score], index) => {
                      const angle = (index * 360) / Object.keys(analysis.detailedScores).length
                      const radians = (angle * Math.PI) / 180
                      const radius = (score / 100) * 120
                      const x = 160 + radius * Math.cos(radians - Math.PI / 2)
                      const y = 160 + radius * Math.sin(radians - Math.PI / 2)
                      return `${x},${y}`
                    }).join(' ')}
                    fill="rgba(255, 0, 0, 0.3)"
                    stroke="rgb(255, 0, 0)"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* 詳細スコア - ポップアート風 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(analysis.detailedScores).map(([category, score]) => (
              <div key={category} className="p-5 rounded-xl border-4 border-black" style={{background: '#FFD700', boxShadow: '4px 4px 0 #000000'}}>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-black text-black text-lg">{category}</span>
                  <span className="text-2xl font-black text-red-600" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '1px #000000'}}>{score}点</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 border-2 border-black">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${score}%`, background: '#FF0000', boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.3)' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 今夜の恋愛可能性詳細分析 - ポップアート風 */}
        {analysis.romanticDetailAnalysis && (
          <div className="card mb-6" style={{background: '#FF69B4', transform: 'rotate(-1deg)'}}>
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
              <Heart className="w-7 h-7 text-red-600 animate-pulse" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              💘 今夜の恋愛可能性詳細分析 💘
          </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(analysis.romanticDetailAnalysis).map(([key, value]: [string, any]) => (
                <div key={key} className="p-5 rounded-xl border-4 border-black" style={{background: '#FFFFFF', boxShadow: '4px 4px 0 #000000'}}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-black text-black">
                      {key === 'excitementLevel' ? '盛り上がり度' :
                       key === 'closenessSpeed' ? '親密度上昇' :
                       key === 'confessionChance' ? '告白チャンス' :
                       key === 'physicalContact' ? 'スキンシップ' :
                       '翌日継続性'}
                    </span>
                    <span className="text-2xl font-black text-red-600" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '1px #000000'}}>{value.score}点</span>
            </div>
                  <div className="w-full bg-gray-300 rounded-full h-3 border-2 border-black">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ width: `${value.score}%`, background: '#FF0000', boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.3)' }}
                    ></div>
                  </div>
                  <p className="text-sm text-black mt-2 font-bold">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 二人を表す30のキーワード - ポップアート風 */}
        <div className="card mb-6" style={{background: '#FFFFFF'}}>
          <h3 className="heading-secondary mb-4 flex items-center gap-2">
            <Tag className="w-7 h-7 text-yellow-500" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
            🏷️ 二人の組み合わせを表す30のキーワード 🏷️
          </h3>
          <p className="text-lg text-black font-black mb-6" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
            科学的根拠に基づいた、{maleParticipant.userName}さん×{femaleParticipant.userName}さんの組み合わせの特徴的なキーワードです 💥
          </p>
          <div className="flex flex-wrap gap-3">
            {combinationKeywords.map((keyword: string, index: number) => (
              <span
                key={index}
                className="keyword-tag"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 今夜のおすすめアクション提案 - ポップアート風 */}
        {analysis.romanticActionRecommendations && (
          <div className="card mb-6" style={{background: '#FFFFFF', transform: 'rotate(-1deg)'}}>
            <h3 className="heading-secondary mb-6 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              💡 今夜のおすすめアクション提案 💡
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border-4 border-black" style={{background: '#00CC44', boxShadow: '4px 4px 0 #000000'}}>
                <h4 className="font-black text-white mb-3 text-xl" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>✅ 今夜やるべきこと</h4>
                <p className="text-white font-bold">{analysis.romanticActionRecommendations.whatToDoTonight}</p>
              </div>
              <div className="p-5 rounded-xl border-4 border-black" style={{background: '#FF0000', boxShadow: '4px 4px 0 #000000'}}>
                <h4 className="font-black text-white mb-3 text-xl" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>❌ 今夜避けるべきこと</h4>
                <p className="text-white font-bold">{analysis.romanticActionRecommendations.whatNotToDo}</p>
              </div>
              <div className="p-5 rounded-xl border-4 border-black" style={{background: '#0066FF', boxShadow: '4px 4px 0 #000000'}}>
                <h4 className="font-black text-white mb-3 text-xl" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>💡 おすすめの動き</h4>
                <p className="text-white font-bold">{analysis.romanticActionRecommendations.recommendedMove}</p>
              </div>
              <div className="p-5 rounded-xl border-4 border-black" style={{background: '#FF69B4', boxShadow: '4px 4px 0 #000000'}}>
                <h4 className="font-black text-white mb-3 text-xl" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>📅 翌日のフォロー</h4>
                <p className="text-white font-bold">{analysis.romanticActionRecommendations.nextDayFollow}</p>
              </div>
            </div>
          </div>
        )}

        {/* おすすめの席の配置と飲み物 - ポップアート風 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card" style={{background: '#FFD700', transform: 'rotate(1deg)'}}>
            <h3 className="text-2xl font-black text-black mb-4 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
              <Star className="w-6 h-6 text-red-600" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              ★ おすすめの席の配置 ★
            </h3>
            <p className="text-black leading-relaxed font-bold">
              {analysis.recommendedSeating}
            </p>
          </div>

          <div className="card" style={{background: '#FF69B4', transform: 'rotate(-1deg)'}}>
            <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
              <Wine className="w-6 h-6 text-purple-900" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              🍷 おすすめの飲み物 🍷
            </h3>
            <p className="text-white leading-relaxed font-bold">
              {analysis.drinkRecommendations}
            </p>
          </div>
        </div>

        {/* 会話のトピック - ポップアート風 */}
        <div className="card mb-6" style={{background: '#0066FF', transform: 'rotate(-1deg)'}}>
          <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
            <MessageCircle className="w-6 h-6 text-yellow-300" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
            💬 おすすめの会話トピック 💬
          </h3>
          <p className="text-white leading-relaxed font-bold">
            {analysis.conversationTopics}
          </p>
        </div>

        {/* 性格傾向 - ポップアート風 */}
        <div className="card mb-6" style={{background: '#FFFFFF'}}>
          <h3 className="heading-secondary mb-6 flex items-center gap-2">
            🔥 ふたりの性格傾向 🔥
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* 男性の性格傾向 */}
            <div className="p-5 rounded-xl border-4 border-black" style={{background: '#0066FF', boxShadow: '4px 4px 0 #000000'}}>
              <h4 className="font-black text-white mb-4 text-center text-xl" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
                {maleParticipant.userName}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-white">リード度：</span>
                  <div className="flex">
                    {getPersonalityTendency(maleParticipant, 'leadership').stars}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-white">積極度：</span>
                  <div className="flex">
                    {getPersonalityTendency(maleParticipant, 'activity').stars}
                  </div>
                </div>
                <div className="text-sm text-yellow-300 text-center mt-2 font-black">
                  {getPersonalityTendency(maleParticipant, 'leadership').type}
                </div>
              </div>
            </div>

            {/* 女性の性格傾向 */}
            <div className="p-5 rounded-xl border-4 border-black" style={{background: '#FF69B4', boxShadow: '4px 4px 0 #000000'}}>
              <h4 className="font-black text-white mb-4 text-center text-xl" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
                {femaleParticipant.userName}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-white">リード度：</span>
                  <div className="flex">
                    {getPersonalityTendency(femaleParticipant, 'leadership').stars}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-white">積極度：</span>
                  <div className="flex">
                    {getPersonalityTendency(femaleParticipant, 'activity').stars}
                  </div>
                </div>
                <div className="text-sm text-yellow-300 text-center mt-2 font-black">
                  {getPersonalityTendency(femaleParticipant, 'leadership').type}
                </div>
              </div>
            </div>
          </div>

          {/* 相性診断結果 */}
          <div className="p-5 rounded-xl border-4 border-black mt-6" style={{background: '#FFD700', boxShadow: '4px 4px 0 #000000'}}>
            <h4 className="font-black text-red-600 mb-3 flex items-center gap-2 text-xl" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
              💡 相性診断結果 💡
            </h4>
            <p className="text-black leading-relaxed font-bold">
              {getPersonalityCompatibility(maleParticipant, femaleParticipant)}
            </p>
          </div>
        </div>

        {/* スキンシップ傾向 - ポップアート風 */}
        <div className="card mb-6" style={{background: '#FFFFFF', transform: 'rotate(1deg)'}}>
          <h3 className="heading-secondary mb-6 flex items-center gap-2">
            💕 スキンシップ傾向 💕
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border-4 border-black" style={{background: '#FF0000', boxShadow: '4px 4px 0 #000000'}}>
              <h4 className="font-black text-white mb-3 text-lg" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>💋 キス頻度</h4>
              <p className="text-white font-bold">{getSkinShipTendency(maleType, femaleType, 'kiss')}</p>
            </div>
            
            <div className="p-5 rounded-xl border-4 border-black" style={{background: '#FF69B4', boxShadow: '4px 4px 0 #000000'}}>
              <h4 className="font-black text-white mb-3 text-lg" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>🥰 甘え方</h4>
              <p className="text-white font-bold">{getSkinShipTendency(maleType, femaleType, 'sweetness')}</p>
            </div>
            
            <div className="p-5 rounded-xl border-4 border-black" style={{background: '#FF6600', boxShadow: '4px 4px 0 #000000'}}>
              <h4 className="font-black text-white mb-3 text-lg" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>❤️ 愛情表現</h4>
              <p className="text-white font-bold">{getSkinShipTendency(maleType, femaleType, 'love')}</p>
            </div>
          </div>
        </div>

        {/* アクションボタン - ポップアート風 */}
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/group-results')}
            className="btn-primary px-12 py-4 text-xl"
          >
            👥 他のペアも見る 👥
          </button>
          
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-black hover:text-blue-700 text-base font-semibold underline"
              style={{fontFamily: 'Noto Sans JP, sans-serif'}}
            >
              ミチノワトップに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
