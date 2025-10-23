import { useEffect, useRef, useState } from 'react'
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
import { generateCompatibilityResult, UserDrinkingProfile } from '../utils/buzzyCompatibilityGenerator'
import { PageLayout } from '../layouts/PageLayout'

export function PairDetailsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { state } = useApp()

  const maleId = searchParams.get('maleId')
  const femaleId = searchParams.get('femaleId')
  const maleNameParam = searchParams.get('maleName')
  const femaleNameParam = searchParams.get('femaleName')

  if ((!maleId || !femaleId) && (!maleNameParam || !femaleNameParam)) {
    return (
      <PageLayout>
        <div className="min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center">
        <div className="text-center">
          <div className="card mb-6">
            <p className="text-[#D63384] text-xl font-bold">⚠️ ペア情報が見つかりません ⚠️</p>
          </div>
          <button
            onClick={() => navigate('/group-results')}
            className="btn-primary"
          >
            結果に戻る
          </button>
        </div>
        </div>
      </PageLayout>
    )
  }

  let maleParticipant = state.groupParticipants.find(p => p.userId === maleId)
  let femaleParticipant = state.groupParticipants.find(p => p.userId === femaleId)
  if ((!maleParticipant || !femaleParticipant) && (maleNameParam || femaleNameParam)) {
    maleParticipant = maleParticipant || state.groupParticipants.find(p => p.userName === maleNameParam && p.gender === 'male')
    femaleParticipant = femaleParticipant || state.groupParticipants.find(p => p.userName === femaleNameParam && p.gender === 'female')
  }

  if (!maleParticipant || !femaleParticipant) {
    return (
      <PageLayout>
        <div className="min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center">
        <div className="text-center">
          <div className="card mb-6">
            <p className="text-[#D63384] text-xl font-bold">⚠️ 参加者情報が見つかりません ⚠️</p>
          </div>
          <button
            onClick={() => navigate('/group-results')}
            className="btn-primary"
          >
            結果に戻る
          </button>
        </div>
        </div>
      </PageLayout>
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

  // 先に科学的相性スコアを計算（後続で参照するため）
  const scientificScore = calculateScientificCompatibility()

  // スコアに連動したキーワードフィルタ（誇張表現を除外）
  const getFilteredKeywords = (keywords: string[], score: number) => {
    const strongPatterns = [
      '最高',
      '最強',
      '抜群',
      '伝説',
      '相性メーター振り切れ',
      '科学的にも最高',
      '中毒性MAX',
      '朝まで',
      '誰も止められない',
      '大騒ぎ確定'
    ]
    const mediumPatterns = [
      '良好',
      '理想的',
      '最高に楽しい',
      '告白の予感',
      'ゴールイン'
    ]

    // スコア帯ごとに除外強度を切替
    if (score < 40) {
      // 低スコア: 強い/中程度のポジ表現を幅広く除外
      return keywords.filter(k => ![...strongPatterns, ...mediumPatterns].some(p => k.includes(p)))
    }
    if (score < 60) {
      // 中低スコア: 強い誇張表現のみ除外
      return keywords.filter(k => !strongPatterns.some(p => k.includes(p)))
    }
    // 60点以上はそのまま
    return keywords
  }

  // スコアに応じたコメント調整関数
  const getScoreBasedComment = (baseComment: string, score: number) => {
    if (score >= 85) {
      return baseComment.replace(/楽しい/g, '最高に楽しい').replace(/良い/g, '抜群に良い')
    } else if (score >= 70) {
      return baseComment.replace(/最高/g, 'とても').replace(/抜群/g, '良好')
    } else if (score >= 55) {
      return baseComment.replace(/最高/g, '良い').replace(/抜群/g, 'まあまあ')
    } else if (score >= 40) {
      return baseComment.replace(/最高/g, '普通').replace(/抜群/g, 'そこそこ')
    } else {
      return baseComment.replace(/最高/g, '控えめ').replace(/抜群/g, '慎重')
    }
  }

  const filteredCombinationKeywords = getFilteredKeywords(
    combinationKeywords,
    pairScore?.romanticScore ?? scientificScore
  )

  // 科学用語を日常表現に置き換える
  const toEverydayPhrase = (text: string) => {
    return text
      .replace(/ドーパミンとオキシトシン全開/g, 'ときめきと優しさが高まる')
      .replace(/ドーパミンとセロトニン全開/g, '気持ちアガる×落ち着くミックス')
      .replace(/ドーパミンとセロトニンのバランス/g, 'ノリと落ち着きのバランス')
      .replace(/ドーパミンとセロトニン/g, 'ノリと落ち着き')
      .replace(/ドーパミン過剰/g, '勢いが出過ぎ')
      .replace(/ドーパミン系/g, 'テンション')
      .replace(/ドーパミン全開/g, '気分アガるモード')
      .replace(/オキシトシン分泌/g, 'やさしさ増し増し')
      .replace(/GABA効果全開/g, '心ほぐれるモード')
      .replace(/GABA効果とドーパミン活性化のバランス/g, '落ち着きと盛り上がりのバランス')
      .replace(/GABA効果とドーパミンのバランス/g, '落ち着きとノリのいい感じバランス')
      .replace(/GABA効果と感情表現/g, '落ち着きと素直さ')
      .replace(/副交感神経と交感神経の調和/g, 'オンとオフの切り替え上手')
      .replace(/副交感神経優位/g, 'リラックス全開')
      .replace(/前頭前野の抑制解除/g, 'ブレーキ外れて大胆に')
      .replace(/前頭前野の活性化と抑制/g, '冴えるときと緩むとき')
      .replace(/前頭前野の活動/g, '冷静モード')
      .replace(/前頭前野の機能維持/g, '冷静さキープ')
      .replace(/前頭前野とドーパミン系が活性化/g, 'テンションとノリがかみ合う')
      .replace(/恋愛ホルモン大放出/g, '恋のテンション高め')
  }

  const displayKeywords = filteredCombinationKeywords.map(k => toEverydayPhrase(k))

  // --- バズる文言生成（性格傾向/相性診断/スキンシップ） ---
  const countStars = (stars: string) => (stars.match(/★/g) || []).length

  const buzzForLead = (level: number) => {
    switch (true) {
      case level >= 5: return '主導権ガチ取り勢'
      case level === 4: return '先導したがりタイプ'
      case level === 3: return '場面で切り替え型'
      case level === 2: return '様子見で譲りがち'
      default: return '受け身寄りで平和主義'
    }
  }

  const buzzForActive = (level: number) => {
    switch (true) {
      case level >= 5: return '秒で行動'
      case level === 4: return '決断早い・即実行'
      case level === 3: return '考えてから動く'
      case level === 2: return '慎重派'
      default: return '石橋叩きがち'
    }
  }

  const buzzTypeLabel = (type: string) => {
    if (type.includes('S')) return 'ゴリゴリS系'
    if (type.includes('M')) return 'やわらかM系'
    return 'ハイブリッド型'
  }

  const maleLeadLevel = countStars(getPersonalityTendency(maleParticipant, 'leadership').stars)
  const femaleLeadLevel = countStars(getPersonalityTendency(femaleParticipant, 'leadership').stars)
  const maleActiveLevel = countStars(getPersonalityTendency(maleParticipant, 'activity').stars)
  const femaleActiveLevel = countStars(getPersonalityTendency(femaleParticipant, 'activity').stars)

  const maleTypeBuzz = buzzTypeLabel(getPersonalityTendency(maleParticipant, 'leadership').type)
  const femaleTypeBuzz = buzzTypeLabel(getPersonalityTendency(femaleParticipant, 'leadership').type)

  const pairSM = (t: string) => t.includes('S') ? 'S' : t.includes('M') ? 'M' : 'B'
  const pairType = `${pairSM(getPersonalityTendency(maleParticipant, 'leadership').type)}×${pairSM(getPersonalityTendency(femaleParticipant, 'leadership').type)}`

  const buildPairCatch = () => {
    if (pairType === 'S×S') return '主導権争奪戦勃発'
    if (pairType === 'S×M' || pairType === 'M×S') return '完璧すぎるバランスで成立'
    if (pairType === 'M×M') return '誰がリードするねん問題'
    return '役割入れ替え自由ペア'
  }

  const buildBoldPhrase = () => {
    if (pairType === 'S×S') return 'どっちがリードする問題、永遠に解決しない説'
    if (pairType === 'S×M' || pairType === 'M×S') return 'リードとフォロー、役割分担が神すぎる'
    if (pairType === 'M×M') return '「どうする？」「いや、そっちが決めて」の無限ループ'
    return 'その日のノリで役割がスイッチする自由形'
  }

  const buildExplanation = () => {
    const lines: string[] = []
    if (pairType === 'S×S') {
      lines.push('注文ひとつで火花。席替えの主導権も譲らない。刺激強めでマンネリ無縁。')
    } else if (pairType === 'S×M' || pairType === 'M×S') {
      lines.push('乾杯の合図も会計の合図も自然に分担。ストレスゼロで流れる夜。')
    } else if (pairType === 'M×M') {
      lines.push('店決めで10分議論→結局いつもの店。優しすぎて決まらない、でも平和。')
    } else {
      lines.push('リードもフォローもできる万能型。席次が変わっても成立する安心感。')
    }
    if (maleActiveLevel >= 4 && femaleActiveLevel >= 4) lines.push('思い立ったら即移動。待つという概念がない速攻コンビ。')
    else if (maleActiveLevel <= 2 && femaleActiveLevel <= 2) lines.push('慎重派同士。計画に計画を重ねる安全運転。')
    else lines.push('「もう行く？」「え、まだ早くない？」テンポのズレがたまにスパイス。')
    return lines.join('\n')
  }

  // スキンシップ傾向（タイトル+描写）
  const mapKiss = (level: string) => {
    if (level.includes('高')) return { t: '常時キス可能状態', d: '会うたびに秒でキス。周りから「またか」と言われるやつ。' }
    if (level.includes('じっくり') || level.includes('控')) return { t: 'レアキスだから価値がある派', d: '特別な時だけ。だからこそ一回の重みがすごい。' }
    return { t: 'ちょうどいいキス頻度', d: 'いいムードの時だけ。多すぎず少なすぎずの絶妙バランス。' }
  }
  const mapSweet = (style: string) => {
    if (style.includes('おねだり')) return { t: 'おねだり上手', d: '「ねぇ」の一言で主導権をさらっと取る。可愛い顔して戦術的。' }
    if (style.includes('素直')) return { t: 'ストレートに甘えるタイプ', d: '「甘えたい」をそのまま言える。駆け引きなしの正直者。' }
    if (style.includes('ツン') || style.includes('照')) return { t: '照れ隠し甘え', d: '本当は甘えたいのに「別に…」。でもバレバレで可愛い。' }
    return { t: '甘えるふりして攻めてくるタイプ', d: '可愛く見せつつ実は要求してくる上級テク。' }
  }
  const mapLove = (style: string) => {
    if (style.includes('雰囲気')) return { t: 'ムード作りプロ', d: 'キャンドルも音楽も照明も計算済み。雰囲気作って落とすタイプ。' }
    if (style.includes('言葉')) return { t: '言葉でガンガン伝えるタイプ', d: '「好き」「愛してる」を惜しまない。言葉でちゃんと届ける派。' }
    return { t: '口より行動派', d: '多く語らず行動で示す。黙って尽くして伝わるやつ。' }
  }

  // 科学的な相性スコアを計算
  function calculateScientificCompatibility() {
    if (!maleParticipant.diagnosisData || !femaleParticipant.diagnosisData) {
      return pairScore?.romanticScore || 50
    }
    
    const maleCategoryScores = calculateCategoryScores(maleParticipant.diagnosisData)
    const femaleCategoryScores = calculateCategoryScores(femaleParticipant.diagnosisData)
    
    const maleProfile = calculatePersonalityProfile(maleCategoryScores)
    const femaleProfile = calculatePersonalityProfile(femaleCategoryScores)
    
    return calculateCompatibilityScore(maleProfile, femaleProfile)
  }

  // レーダーチャート計測用（レスポンシブでぐちゃつかないように実寸から中心・半径を算出）
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [chartSize, setChartSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    const el = chartRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      setChartSize({ width: rect.width, height: rect.height })
    }

    update()

    let ro: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => update())
      ro.observe(el)
    } else {
      (window as Window).addEventListener('resize', update)
    }
    return () => {
      if (ro) ro.disconnect()
      else (window as Window).removeEventListener('resize', update)
    }
  }, [])

  // scientificScore は上部で定義済み

  // スコアに応じた関係性タイプと説明文を生成
  const getScoreBasedRelationship = (score: number) => {
    if (score >= 85) {
      return {
        type: '最強の飲み友カップル',
        description: 'あなたたちは「最強の飲み友カップル」です！科学的根拠に基づいた相性の良さで、お互いの魅力を引き出し合える理想的な組み合わせです！',
        excitementLevel: '今夜の盛り上がり度は最高レベル！二人の相性が最高潮に達します。',
        closenessSpeed: '距離を縮めるスピードが早く、自然に親密になれます。',
        confessionChance: '告白のチャンスが高く、お互いの気持ちを伝えやすい雰囲気です。'
      }
    } else if (score >= 70) {
      return {
        type: '深い絆のカップル',
        description: 'あなたたちは「深い絆のカップル」です！お互いの本音を引き出し合える深い関係を築けます。',
        excitementLevel: '落ち着いた雰囲気で、深い会話を楽しめます。',
        closenessSpeed: '本音で話し合えるため、親密度が急速に上がります。',
        confessionChance: '深い会話の中で自然に気持ちを伝えやすい雰囲気です。'
      }
    } else if (score >= 55) {
      return {
        type: '落ち着いた癒しカップル',
        description: 'あなたたちは「落ち着いた癒しカップル」です！お互いのペースを尊重し合える落ち着いた関係を築けます。',
        excitementLevel: '落ち着いた雰囲気で、ゆっくりと時間を過ごせます。',
        closenessSpeed: 'ゆっくりとしたペースで、自然に親密になれます。',
        confessionChance: '落ち着いた雰囲気で、自然に気持ちを伝えやすい環境です。'
      }
    } else if (score >= 40) {
      return {
        type: 'バランス型飲み友カップル',
        description: 'あなたたちは「バランス型飲み友カップル」です！お互いの個性を活かしながら、楽しい関係を築いていける相性です。',
        excitementLevel: 'バランスの取れた雰囲気で、楽しい時間を過ごせます。',
        closenessSpeed: 'お互いの個性を理解し合えるため、自然に親密になれます。',
        confessionChance: 'お互いのペースを尊重しながら、自然に気持ちを伝えやすい雰囲気です。'
      }
    } else {
      return {
        type: '慎重な関係構築カップル',
        description: 'あなたたちは「慎重な関係構築カップル」です！時間をかけてお互いを理解し合い、安定した関係を築いていける相性です。',
        excitementLevel: '控えめな雰囲気で、慎重に時間を過ごせます。',
        closenessSpeed: '時間をかけて、ゆっくりと親密になれます。',
        confessionChance: '慎重な雰囲気で、時間をかけて気持ちを伝えやすい環境です。'
      }
    }
  }

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
    // スコアに基づいた関係性を取得
    const scoreBasedRelationship = getScoreBasedRelationship(Math.round(score))
    
    const defaultAnalysis = {
      compatibilityScore: Math.round(score),
      relationshipType: scoreBasedRelationship.type,
      coupleDescription: getScoreBasedComment(scoreBasedRelationship.description, Math.round(score)),
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
        excitementLevel: { 
          score: Math.round(Math.min(85, score + 5)), 
          text: getScoreBasedComment(scoreBasedRelationship.excitementLevel, Math.round(score))
        },
        closenessSpeed: { 
          score: Math.round(Math.min(90, score + 10)), 
          text: getScoreBasedComment(scoreBasedRelationship.closenessSpeed, Math.round(score))
        },
        confessionChance: { 
          score: Math.round(Math.min(80, score)), 
          text: getScoreBasedComment(scoreBasedRelationship.confessionChance, Math.round(score))
        },
        physicalContact: { score: Math.round(Math.min(85, score + 5)), text: 'お互いの個性を活かしながら、自然なスキンシップができます。' },
        nextDayContinuity: { score: Math.round(Math.min(90, score + 10)), text: 'バランスの取れた関係を築きやすく、長期的な関係に発展する可能性が高いです。' }
      },
      // 今夜のおすすめアクション提案
      romanticActionRecommendations: {
        whatToDoTonight: getScoreBasedComment('お互いの個性を活かしながら、楽しい時間を過ごしましょう。新しいことに一緒に挑戦したり、お互いの違いを楽しむことが大切です。', Math.round(score)),
        whatNotToDo: getScoreBasedComment('お互いのペースを乱さないよう注意。無理に合わせようとせず、自然体でいることが大切です。', Math.round(score)),
        recommendedMove: getScoreBasedComment('お互いの個性を尊重し、新しいことに一緒に挑戦する。お互いの違いを楽しみながら、自然な関係を築くことが重要です。', Math.round(score)),
        nextDayFollow: getScoreBasedComment('今夜の楽しい時間を翌日も続けるため、一緒に朝食を取ったり、次のデートの約束をすることをおすすめします。', Math.round(score))
      },
      // 今夜起こりそうな恋愛シーン予測
      romanticScenePredictions: [
        getScoreBasedComment('お互いの個性を活かしながら楽しい会話を楽しむ', Math.round(score)),
        getScoreBasedComment('新しいことに一緒に挑戦して新鮮な発見を共有する', Math.round(score)),
        getScoreBasedComment('お互いの違いを楽しみながら自然体で過ごす', Math.round(score)),
        getScoreBasedComment('男性が女性の個性に興味を持ち「面白い人だね」と感じる', Math.round(score)),
        getScoreBasedComment('女性が男性の特徴に安心し「一緒にいると楽しい」と感じる', Math.round(score))
      ]
    }

    const key = `${maleType}-${femaleType}`
    return analyses[key] || defaultAnalysis
  }

  const analysis = getPairAnalysis(maleType, femaleType, scientificScore, maleParticipant.userName, femaleParticipant.userName)

  // バズる診断結果生成のための簡易プロフィール
  const toProfile = (p: any): UserDrinkingProfile => ({
    価値観: p?.valuesPreference || p?.valueStyle || p?.value || '終電まで1軒派',
    お金の使い方: p?.moneyStyle || '割り勘派',
    会話スタイル: p?.talkStyle || '哲学的',
    酔い方: p?.drinkingChange || '変わらない',
    役割: p?.partyRole || '聞き役',
    酔いのペース: p?.peakPace || '2時間後ピーク'
  })

  const buzzy = generateCompatibilityResult(toProfile(maleParticipant), toProfile(femaleParticipant))

  // 科学的根拠に基づいた性格傾向を計算する関数（関数宣言で先に参照可能に）
  function getPersonalityTendency(participant: any, category: 'leadership' | 'activity') {
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
    <PageLayout>
      <div className="kawaii-reset max-w-6xl mx-auto p-3 sm:p-4 md:p-8">
        {/* ヘッダー - モバイルはコンパクト、PCは従来の演出 */}
        <div className="text-center mb-3 md:mb-8">
          <button
            onClick={() => navigate('/group-results')}
            className="btn-secondary text-xs md:text-sm flex items-center gap-1 md:gap-2 mx-auto mb-2 md:mb-6"
          >
            <ArrowLeft className="w-3 h-3 md:w-5 md:h-5" />
            <span className="lg:hidden">戻る</span>
            <span className="hidden md:inline">結果に戻る</span>
          </button>
          {/* モバイルタイトル */}
          <div className="card p-2 lg:hidden">
            <h1 className="text-lg font-bold heading-secondary mb-1">ペア相性詳細分析</h1>
            <p className="text-xs text-gray-600">二人の相性をコンパクト表示</p>
          </div>
          {/* PCタイトル */}
          <div className="hidden lg:block card relative">
            <h1 className="heading-secondary text-4xl mb-1 text-[#D63384]"><span className="emoji-kawaii emoji-lg emoji-pastel">💞</span> ペア相性詳細分析</h1>
            <p className="text-xl font-semibold text-gray-700">この二人の相性を詳しく分析しました</p>
          </div>
        </div>

        {/* ペア情報 - モバイルは簡潔表示 */}
        <div className="card mb-3 md:mb-6 p-3 md:p-6">
          <div className="text-center mb-3 md:mb-6">
            <div className="flex justify-center mb-2 md:mb-4">
              <div className="relative p-2 md:p-4 bg-pink-100 rounded-full border border-pink-200">
                <Users className="w-6 h-6 md:w-12 md:h-12 text-[#D63384]" />
                <Heart className="w-3 h-3 md:w-7 md:h-7 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h2 className="text-sm font-bold md:heading-secondary mb-2 md:mb-6">
              <span className="lg:hidden">このペアの相性</span>
              <span className="hidden md:inline"><span className="emoji-kawaii emoji-md emoji-bounce">✨</span> このペアの酒癖相性分析 <span className="emoji-kawaii emoji-md emoji-bounce">✨</span></span>
            </h2>
            <div className="flex justify-center items-center gap-2 md:gap-6 mb-3 md:mb-6">
              <div className="text-center">
                <span className="tag-kawaii text-sm md:text-xl">{maleParticipant.gender === 'male' ? '♂' : '♀'} {maleParticipant.userName}</span>
                <div className="text-xs md:text-sm text-black font-bold mt-1 md:mt-2">{maleType}</div>
              </div>
              <div className="text-2xl md:text-5xl font-black text-gray-600">×</div>
              <div className="text-center">
                <span className="tag-kawaii text-sm md:text-xl">{femaleParticipant.gender === 'male' ? '♂' : '♀'} {femaleParticipant.userName}</span>
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
                  <div className="relative w-12 h-12 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-pink-100 border border-pink-200">
                    <span className="text-xl md:text-4xl">🐿️</span>
                    <span className="absolute -right-0.5 md:-right-1 bottom-1 md:bottom-2 text-sm md:text-2xl transform rotate-12">🍺</span>
                  </div>
                  <div className="text-center mt-1 md:mt-2">
                    <span className="tag-kawaii text-xs">イキリス</span>
                  </div>
                </div>
                
                {/* 吹き出し */}
                <div className="flex-1 relative">
                  <div className="card p-3 md:p-6">
                    {/* 吹き出しの三角形（PCのみ） */}
                    
                    <div className="flex items-start gap-1 md:gap-2 mb-2 md:mb-3">
                      <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-pink-400 flex-shrink-0 mt-0.5 md:mt-1" />
                      <h3 className="text-sm md:text-2xl font-bold text-gray-800">
                        <span className="emoji-kawaii emoji-md emoji-bounce">💥</span> {analysis.relationshipType} <span className="emoji-kawaii emoji-md emoji-bounce">💥</span>
                      </h3>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-xs md:text-base font-bold pl-0 md:pl-7">
                      {analysis.coupleDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相性スコア詳細 - ポップアート風 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-3 flex items-center gap-2 text-[#D63384]">
            <TrendingUp className="w-7 h-7 text-[#D63384]" />
            ★ 相性スコア詳細 ★
          </h3>
          
          {/* レーダーチャート表示はモバイル視認性のため撤廃 */}
          
          {/* 詳細スコア - 小型ドーナツ×グリッド（CSSのみ） */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Object.entries(analysis.detailedScores).map(([category, score]) => {
              const clampScore = Math.max(0, Math.min(100, Number(score)))
              const conic = `conic-gradient(#D63384 ${clampScore * 3.6}deg, #FCE7F3 0deg)`
              return (
                <div key={category} className="card p-2 md:p-3">
                  <div className="flex items-center gap-2">
                    <div className="relative shrink-0" style={{ width: '48px', height: '48px' }}>
                      <div className="w-full h-full rounded-full border border-pink-200" style={{ background: conic }}></div>
                      <div className="absolute inset-1.5 bg-white rounded-full border border-pink-200 flex items-center justify-center">
                        <span className="text-[10px] md:text-xs font-bold">{clampScore}</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] md:text-sm font-bold text-gray-800 leading-tight truncate">{category}</div>
                      <div className="text-[10px] md:text-xs text-gray-600">{clampScore}点</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 診断ハイライト - SNS向け要約 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-3">今夜の相性ハイライト</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(['価値観の一致','会話のテンポ','居心地','補完関係'] as const).map((key) => (
              <div key={key} className="card p-3">
                <div className="font-black mb-1">{(buzzy as any)[key].タイトル}</div>
                <div className="text-sm whitespace-pre-line">{(buzzy as any)[key].解説}</div>
                <div className="text-right text-xs mt-1">{(buzzy as any)[key].相性スコア}点</div>
              </div>
            ))}
          </div>
          <div className="mt-4 card p-3">
            <div className="font-black">総合：{buzzy.総合相性.タイトル}</div>
            <div className="text-right text-sm mt-1">{buzzy.総合相性.スコア}点</div>
          </div>
        </div>

        {/* 今夜の恋愛可能性詳細分析 - ポップアート風 */}
        {analysis.romanticDetailAnalysis && (
          <div className="card mb-6">
            <h3 className="heading-secondary mb-3 flex items-center gap-2">
              <Heart className="w-7 h-7 text-pink-400 animate-pulse" />
              <span className="emoji-kawaii emoji-md emoji-bounce">💘</span> 今夜の恋愛可能性詳細分析 <span className="emoji-kawaii emoji-md emoji-bounce">💘</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(analysis.romanticDetailAnalysis).map(([key, value]: [string, any]) => (
                <div key={key} className="card p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-800">
                      {key === 'excitementLevel' ? '盛り上がり度' :
                       key === 'closenessSpeed' ? '親密度上昇' :
                       key === 'confessionChance' ? '告白チャンス' :
                       key === 'physicalContact' ? 'スキンシップ' :
                       '翌日継続性'}
                    </span>
                    <span className="text-2xl font-bold text-[#D63384]">{value.score}点</span>
            </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500 bg-[#D63384]"
                      style={{ width: `${value.score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 font-bold">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 二人を表す30のキーワード - ポップアート風（モバイルは極小タグ） */}
        <div className="card mb-4 md:mb-6 p-3 md:p-6">
          <h3 className="text-sm md:heading-secondary font-extrabold mb-2 md:mb-4 flex items-center gap-1 md:gap-2">
            <Tag className="w-4 h-4 md:w-7 md:h-7 text-pink-400" />
            <span className="lg:hidden">🏷️ 30キーワード</span>
            <span className="hidden md:inline">🏷️ 二人の組み合わせを表す30のキーワード 🏷️</span>
          </h3>
          <p className="text-xs md:text-lg text-gray-700 font-bold mb-2 md:mb-6">
            科学的根拠に基づいた、{maleParticipant.userName}さん×{femaleParticipant.userName}さんの特徴的なキーワードです 💥
          </p>
          <div className="flex flex-wrap gap-1.5 md:gap-3">
            {displayKeywords.map((keyword: string, index: number) => (
              <span
                key={index}
                className="tag-kawaii text-[10px] md:text-sm px-1 py-0.5 md:px-2 md:py-1"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 今夜のおすすめアクション提案 - ポップアート風 */}
        {analysis.romanticActionRecommendations && (
          <div className="card mb-6">
            <h3 className="heading-secondary mb-6 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-pink-400 animate-pulse" />
              💡 今夜のおすすめアクション提案 💡
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-5">
                <h4 className="font-bold text-[#D63384] mb-3 text-xl">✅ 今夜やるべきこと</h4>
                <p className="text-gray-700 font-bold">{analysis.romanticActionRecommendations.whatToDoTonight}</p>
              </div>
              <div className="card p-5">
                <h4 className="font-bold text-[#D63384] mb-3 text-xl">❌ 今夜避けるべきこと</h4>
                <p className="text-gray-700 font-bold">{analysis.romanticActionRecommendations.whatNotToDo}</p>
              </div>
              <div className="card p-5">
                <h4 className="font-bold text-[#D63384] mb-3 text-xl">💡 おすすめの動き</h4>
                <p className="text-gray-700 font-bold">{analysis.romanticActionRecommendations.recommendedMove}</p>
              </div>
              <div className="card p-5">
                <h4 className="font-bold text-[#D63384] mb-3 text-xl">📅 翌日のフォロー</h4>
                <p className="text-gray-700 font-bold">{analysis.romanticActionRecommendations.nextDayFollow}</p>
              </div>
            </div>
          </div>
        )}

        {/* おすすめの席の配置と飲み物 - ポップアート風 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="heading-secondary mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-[#D63384]" />
              🔥 ふたりの性格傾向 🔥
            </h3>
            <div className="text-gray-700 leading-relaxed font-bold space-y-3">
              <div>
                <div>【{maleParticipant.userName}】</div>
                <div>- 主導権レベル：{'★'.repeat(maleLeadLevel)}{'☆'.repeat(5 - maleLeadLevel)}（{buzzForLead(maleLeadLevel)}）</div>
                <div>- 攻め度：{'★'.repeat(maleActiveLevel)}{'☆'.repeat(5 - maleActiveLevel)}（{buzzForActive(maleActiveLevel)}）</div>
                <div>- タイプ：{maleTypeBuzz}</div>
              </div>
              <div>
                <div>【{femaleParticipant.userName}】</div>
                <div>- 主導権レベル：{'★'.repeat(femaleLeadLevel)}{'☆'.repeat(5 - femaleLeadLevel)}（{buzzForLead(femaleLeadLevel)}）</div>
                <div>- 攻め度：{'★'.repeat(femaleActiveLevel)}{'☆'.repeat(5 - femaleActiveLevel)}（{buzzForActive(femaleActiveLevel)}）</div>
                <div>- タイプ：{femaleTypeBuzz}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="heading-secondary mb-4 flex items-center gap-2">
              <Wine className="w-6 h-6 text-pink-400" />
              <span className="emoji-kawaii emoji-md emoji-bounce">💡</span> 相性診断結果 <span className="emoji-kawaii emoji-md emoji-bounce">💡</span>
            </h3>
            <div className="text-gray-700 font-bold whitespace-pre-line">
              🔥「{buildPairCatch()}」

              **{buildBoldPhrase()}**

              {buildExplanation()}
            </div>
          </div>
        </div>

        {/* 2人の性格深掘り - Love Type 16風 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-6 text-center">
            <span className="emoji-kawaii emoji-lg emoji-bounce">💫</span> 2人の本当の姿を深掘り <span className="emoji-kawaii emoji-lg emoji-bounce">💫</span>
          </h3>
          
          {/* {男性名}の深掘り */}
          <div className="mb-8">
            <h4 className="font-bold text-pink-600 mb-4 flex items-center gap-2 text-xl">
              <span className="text-2xl">🌟</span> {maleParticipant.userName}の本当の姿
            </h4>
            <div className="bg-white rounded-lg p-6 space-y-4 text-gray-700 leading-relaxed">
              <p>お酒が入ると、普段は見せない素直な一面が顔を出します。みんなを笑わせるのが好きなのは、実は自分が一番笑顔でいたいから。誰かが楽しそうにしているのを見ると、心の奥で「よかった」って思ってるんです。</p>
              
              <p>家に帰った後、一人になると急に静かになります。今日の出来事を思い返しながら、「あの時、もっとこう言えたら良かったな」って考えてる。完璧主義なところがあって、みんなに喜んでもらいたい気持ちが強いんです。</p>
              
              <p>本当は認められたい気持ちが人一倍強くて、でもそれを素直に言えない。だからこそ、相手の反応をすごく気にしてる。褒められると照れちゃうけど、内心はすごく嬉しいタイプ。</p>
              
              <p>寂しがり屋な一面もあって、一人の時間が長いと「誰かと話したいな」って思う。でも、いざ誰かと一緒になると、今度は「邪魔しちゃったかな」って心配になる。そんな繊細なバランスを保ちながら生きてるんです。</p>
            </div>
          </div>

          {/* {女性名}の深掘り */}
          <div className="mb-8">
            <h4 className="font-bold text-blue-600 mb-4 flex items-center gap-2 text-xl">
              <span className="text-2xl">💎</span> {femaleParticipant.userName}の本当の姿
            </h4>
            <div className="bg-white rounded-lg p-6 space-y-4 text-gray-700 leading-relaxed">
              <p>お酒が入ると、普段は隠してる甘えん坊な部分が出てきます。でも、それを素直に表現するのがちょっと恥ずかしくて、つい「大丈夫、大丈夫」って言っちゃう。本当は甘えたい気持ちがいっぱいあるんです。</p>
              
              <p>家に帰った後、今日の出来事を一人で反芻してます。「あの時、もっと素直に甘えられたら良かったな」って。でも、相手に迷惑をかけたくない気持ちが強くて、つい我慢しちゃうんです。</p>
              
              <p>実はすごく愛情深くて、相手のことを思う気持ちが人一倍強い。でも、それを上手く伝えられなくて、時々「本当に私の気持ち、伝わってるかな？」って不安になる。そんな優しさが詰まった人なんです。</p>
              
              <p>本当は「私だけの特別な人」が欲しくて、でもそれを言うのが恥ずかしい。だから、さりげないスキンシップや、ちょっとした気遣いで愛情を表現してる。そんな奥ゆかしい魅力を持ってるんです。</p>
            </div>
          </div>

          <div className="text-center text-gray-600 font-semibold">
            お互いの本当の姿を知ることで、もっと深い関係になれるはず💕
          </div>
        </div>

        {/* 意外な共通点 - Love Type 16風 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-6 text-center">
            <span className="emoji-kawaii emoji-lg emoji-bounce">🎁</span> 意外な共通点を発見！ <span className="emoji-kawaii emoji-lg emoji-bounce">🎁</span>
          </h3>
          <div className="text-center text-gray-700 mb-6 font-bold">実は二人とも、こんな気持ちを抱えてるんです</div>
          
          <div className="space-y-6">
            <div className="bg-pink-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-pink-600 mb-3">💝 本当の自分を守ってる</h4>
              <p className="text-gray-700 mb-3">二人とも、本音を出すのがちょっと苦手。でも、お互いの前では自然体でいられる。</p>
              <div className="bg-pink-100 rounded p-3 text-sm text-gray-700">
                <strong>今夜、こんな会話が出たら：</strong><br />
                「実は私、本当はもっと素直になりたいんだ」「私も！一緒にいると自然になれる」
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-blue-600 mb-3">🌟 認められたい気持ちが強い</h4>
              <p className="text-gray-700 mb-3">褒められると照れちゃうけど、内心はすごく嬉しい。お互いを認め合える関係。</p>
              <div className="bg-blue-100 rounded p-3 text-sm text-gray-700">
                <strong>今夜、こんな会話が出たら：</strong><br />
                「あなたのそういうところ、すごく好き」「え、本当？嬉しい...」
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-green-600 mb-3">🏠 寂しがり屋な一面がある</h4>
              <p className="text-gray-700 mb-3">一人の時間も大切だけど、誰かと一緒にいる時間が何より幸せ。</p>
              <div className="bg-green-100 rounded p-3 text-sm text-gray-700">
                <strong>今夜、こんな会話が出たら：</strong><br />
                「たまには一人の時間も必要だけど、あなたといる時間が一番楽しい」
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-purple-600 mb-3">💕 愛情表現が上手じゃない</h4>
              <p className="text-gray-700 mb-3">「好き」って言うのは恥ずかしいけど、行動で愛情を表現してる。</p>
              <div className="bg-purple-100 rounded p-3 text-sm text-gray-700">
                <strong>今夜、こんな会話が出たら：</strong><br />
                「言葉じゃうまく言えないけど、あなたといると幸せ」「私も...」
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-yellow-600 mb-3">🎭 完璧主義なところがある</h4>
              <p className="text-gray-700 mb-3">相手に喜んでもらいたくて、つい頑張りすぎちゃう。でも、お互いの前ではリラックスできる。</p>
              <div className="bg-yellow-100 rounded p-3 text-sm text-gray-700">
                <strong>今夜、こんな会話が出たら：</strong><br />
                「無理しなくていいよ、ありのままで」「ありがとう、あなたといると自然になれる」
              </div>
            </div>
          </div>
        </div>

        {/* 今夜使える一言集 - Love Type 16風 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-6 text-center">
            <span className="emoji-kawaii emoji-lg emoji-bounce">💬</span> 今夜使える一言集 <span className="emoji-kawaii emoji-lg emoji-bounce">💬</span>
          </h3>
          <div className="text-center text-gray-700 mb-6 font-bold">自然な流れで使える、心に響くフレーズ</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* {男性名}→{女性名} */}
            <div>
              <h4 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌟</span> {maleParticipant.userName}から{femaleParticipant.userName}へ
              </h4>
              <div className="space-y-4">
                <div className="bg-pink-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「あなたといると、自然と笑顔になっちゃう」</p>
                  <p className="text-gray-600 text-sm">照れながら言うと、相手も照れちゃう。自然な流れで使える。</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「今日、すごく楽しかった」</p>
                  <p className="text-gray-600 text-sm">帰り際にサラッと言うと、相手も嬉しそうな顔をする。</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「また今度、一緒に飲まない？」</p>
                  <p className="text-gray-600 text-sm">次の約束を自然に提案。相手も「うん、いいね」って言ってくれる。</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「あなたのそういうところ、好きだな」</p>
                  <p className="text-gray-600 text-sm">相手の良いところを具体的に褒めると、すごく喜んでくれる。</p>
                </div>
              </div>
            </div>

            {/* {女性名}→{男性名} */}
            <div>
              <h4 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                <span className="text-2xl">💎</span> {femaleParticipant.userName}から{maleParticipant.userName}へ
              </h4>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「あなたといると、安心する」</p>
                  <p className="text-gray-600 text-sm">素直な気持ちを伝えると、相手も嬉しそうな表情になる。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「今日はありがとう」</p>
                  <p className="text-gray-600 text-sm">感謝の気持ちを伝えると、相手も温かい気持ちになる。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「また会いたいな」</p>
                  <p className="text-gray-600 text-sm">素直に気持ちを伝えると、相手も「私も」って言ってくれる。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-2">「あなたの笑顔、好き」</p>
                  <p className="text-gray-600 text-sm">相手の良いところを褒めると、照れながらも嬉しそう。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 今夜の展開予想 - Love Type 16風 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-6 text-center">
            <span className="emoji-kawaii emoji-lg emoji-bounce">🌙</span> 今夜の展開予想 <span className="emoji-kawaii emoji-lg emoji-bounce">🌙</span>
          </h3>
          <div className="text-center text-gray-700 mb-6 font-bold">1次会から帰り道まで、自然な流れでの距離の縮め方</div>
          
          <div className="space-y-6">
            {/* 1次会 */}
            <div className="bg-white rounded-lg p-6">
              <h4 className="text-lg font-bold text-pink-600 mb-3 flex items-center gap-2">
                <span className="text-xl">🍻</span> 1次会：お互いを探り合う時間
              </h4>
              <p className="text-gray-700 mb-3">最初は緊張してるけど、お酒が入ると自然に話せるように。お互いの趣味や仕事の話で盛り上がって、「この人、面白いな」って思う。</p>
              <div className="bg-pink-50 rounded p-3 text-sm text-gray-700">
                <strong>この段階での心境：</strong>「この人、もっと知りたいな」「また会いたいな」
              </div>
            </div>

            {/* 2次会 */}
            <div className="bg-white rounded-lg p-6">
              <h4 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                <span className="text-xl">🍸</span> 2次会：距離が縮まる時間
              </h4>
              <p className="text-gray-700 mb-3">少し酔いが回って、本音が出始める。「実は私、こういう人なんだ」って素の自分を見せ合う。お互いの意外な一面を発見して、もっと親近感を感じる。</p>
              <div className="bg-blue-50 rounded p-3 text-sm text-gray-700">
                <strong>この段階での心境：</strong>「この人、特別だな」「もっと一緒にいたい」
              </div>
            </div>

            {/* 3次会・帰り道 */}
            <div className="bg-white rounded-lg p-6">
              <h4 className="text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
                <span className="text-xl">🚶‍♀️</span> 3次会・帰り道：特別な関係への転換点
              </h4>
              <p className="text-gray-700 mb-3">時間を忘れて話し込んで、「もうこんな時間！？」って驚く。帰り道は自然と歩くペースが合って、時々肩が触れ合う。「今日、すごく楽しかった」って素直に伝え合える。</p>
              <div className="bg-green-50 rounded p-3 text-sm text-gray-700">
                <strong>この段階での心境：</strong>「この人と一緒にいると幸せ」「もっと深い関係になりたい」
              </div>
            </div>

            {/* 次の約束 */}
            <div className="bg-white rounded-lg p-6">
              <h4 className="text-lg font-bold text-purple-600 mb-3 flex items-center gap-2">
                <span className="text-xl">💕</span> 次の約束：特別な関係の始まり
              </h4>
              <p className="text-gray-700 mb-3">「また今度、一緒に飲まない？」って自然に提案して、「うん、いいね」って返事をもらう。LINEの交換も自然な流れで。「今度は〇〇に行こうか」って具体的な計画も立てる。</p>
              <div className="bg-purple-50 rounded p-3 text-sm text-gray-700">
                <strong>この段階での心境：</strong>「この人と一緒にいると幸せ」「もっと深い関係になりたい」
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600 font-semibold mt-6">
            自然な流れで、きっと素敵な関係になれるはず💕
          </div>
        </div>

        {/* 会話のトピック - ポップアート風 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-4 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-pink-400" />
            <span className="emoji-kawaii emoji-md emoji-bounce">💬</span> おすすめの会話トピック <span className="emoji-kawaii emoji-md emoji-bounce">💬</span>
          </h3>
          <p className="text-gray-700 leading-relaxed font-bold">
            {analysis.conversationTopics}
          </p>
        </div>


        

        {/* スキンシップ傾向 - バズる表現 */}
        <div className="card mb-6">
          <h3 className="heading-secondary mb-6 flex items-center gap-2"><span className="emoji-kawaii emoji-md emoji-bounce">💕</span> スキンシップ傾向 <span className="emoji-kawaii emoji-md emoji-bounce">💕</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              const kiss = mapKiss(getSkinShipTendency(maleType, femaleType, 'kiss'))
              const sweet = mapSweet(getSkinShipTendency(maleType, femaleType, 'sweetness'))
              const love = mapLove(getSkinShipTendency(maleType, femaleType, 'love'))
              return (
                <>
            <div className="card p-5">
                    <h4 className="font-bold text-[#D63384] mb-1 text-lg">💋 キス頻度</h4>
                    <div className="text-gray-700 font-bold">{kiss.t}</div>
                    <p className="text-gray-700 font-bold mt-1">{kiss.d}</p>
            </div>
            <div className="card p-5">
                    <h4 className="font-bold text-[#D63384] mb-1 text-lg">🥰 甘え方</h4>
                    <div className="text-gray-700 font-bold">{sweet.t}</div>
                    <p className="text-gray-700 font-bold mt-1">{sweet.d}</p>
            </div>
            <div className="card p-5">
                    <h4 className="font-bold text-[#D63384] mb-1 text-lg">❤️ 愛情表現</h4>
                    <div className="text-gray-700 font-bold">{love.t}</div>
                    <p className="text-gray-700 font-bold mt-1">{love.d}</p>
            </div>
                </>
              )
            })()}
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
              className="text-gray-600 hover:text-gray-800 text-base font-semibold underline"
             >
               すきのおとトップに戻る
             </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
