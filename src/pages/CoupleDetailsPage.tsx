import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getTwentyTypeAnalysis, getRandomTwentyTypeAnalysis } from '../data/twentyTypeAnalysisData'
import { Heart, Users, Lightbulb, Calendar, MessageCircle, TrendingUp, AlertTriangle, Target } from 'lucide-react'

export function CoupleDetailsPage() {
  const navigate = useNavigate()
  const { state } = useApp()

  const handleBack = () => {
    navigate('/results')
  }

  const handleStartOver = () => {
    navigate('/')
  }

  // 選択されたペアの情報を取得（実際の実装では、URLパラメータやstateから取得）
  const participant1 = state.participants[0] || { id: '1', name: '参加者A' }
  const participant2 = state.participants[1] || { id: '2', name: '参加者B' }

  // 相性スコアの基準を定義
  const getCompatibilityLevel = (score: number) => {
    if (score >= 80) return { level: 'とても良い', color: 'text-green-500', bgColor: 'bg-green-50' }
    if (score >= 70) return { level: '良い', color: 'text-blue-500', bgColor: 'bg-blue-50' }
    if (score >= 60) return { level: '普通', color: 'text-gray-500', bgColor: 'bg-gray-50' }
    if (score >= 50) return { level: 'やや悪い', color: 'text-orange-500', bgColor: 'bg-orange-50' }
    return { level: '悪い', color: 'text-red-500', bgColor: 'bg-red-50' }
  }

  // カップル分析結果を取得（固定データを使用して一貫性を保つ）
  const analysis = getTwentyTypeAnalysis('冒険的社交家-成長志向', '論理的思考家-安定志向', state.mode) || {
    id: 'default',
    mode: state.mode,
    type1: '冒険的社交家-成長志向',
    type2: '論理的思考家-安定志向',
    compatibilityScore: 85,
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
      'コミュニケーションの取り方',
      '時間の使い方の違い'
    ],
    advice: [
      'お互いの価値観を理解し合う',
      '定期的なコミュニケーションを心がける',
      '共通の趣味を見つける'
    ],
    dateIdeas: [
      '美術館巡り',
      'カフェ巡り',
      '映画鑑賞',
      '散歩'
    ],
    communicationTips: [
      '相手の話を最後まで聞く',
      '自分の気持ちを素直に伝える',
      '相手の立場に立って考える'
    ],
    longTermOutlook: '長期的には、お互いの違いを理解し合いながら、一緒に成長していける素晴らしい関係を築けるでしょう。',
    warningSigns: [
      'コミュニケーション不足',
      '価値観の押し付け',
      '相手の意見を聞かない'
    ],
    improvementTips: [
      '定期的な話し合いの時間を作る',
      'お互いの価値観を尊重する',
      '一緒に新しいことに挑戦する'
    ]
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            戻る
          </button>
          <h1 className="text-3xl font-extrabold text-gray-800">カップル詳細分析</h1>
          <button
            onClick={handleStartOver}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            最初から
          </button>
        </div>

        {/* カップル情報 */}
        <div className="card mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-2xl font-bold">
                  {participant1.name?.charAt(0) || 'A'}
                </span>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-2xl font-bold">
                  {participant2.name?.charAt(0) || 'B'}
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {participant1.name} × {participant2.name}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{analysis.relationshipType}</p>
            <div className="text-4xl font-extrabold text-green-500 mb-2">
              {analysis.compatibilityScore}%
            </div>
            <div className="text-sm text-gray-500">
              {getCompatibilityLevel(analysis.compatibilityScore).level}
            </div>
          </div>
        </div>

        {/* 相性スコアの基準 */}
        <div className="card mb-8">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">相性スコアの基準</h3>
            <p className="text-gray-600">あなたの相性スコアはどのレベル？</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-green-600 font-bold">80%以上</div>
              <div className="text-sm text-green-700">とても良い</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-blue-600 font-bold">70-79%</div>
              <div className="text-sm text-blue-700">良い</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-gray-600 font-bold">60-69%</div>
              <div className="text-sm text-gray-700">普通</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-center">
              <div className="text-orange-600 font-bold">50-59%</div>
              <div className="text-sm text-orange-700">やや悪い</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg text-center">
              <div className="text-red-600 font-bold">50%未満</div>
              <div className="text-sm text-red-700">悪い</div>
            </div>
          </div>
        </div>

        {/* カップル紹介文 */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">あなたたちはどんなカップル？</h3>
            <p className="text-gray-600">二人で一緒に読んでみてください！</p>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border-l-4 border-pink-400">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {analysis.coupleDescription}
            </p>
          </div>
        </div>

        {/* 付き合ったら起きること */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">付き合ったらこんなことが起きる！</h3>
            <p className="text-gray-600">お互いの性格の良い部分が引き出される関係です</p>
          </div>
          <div className="space-y-4">
            {analysis.specificExperiences.map((experience, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 強み */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold">このカップルの強み</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 課題 */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-semibold">注意すべき課題</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.challenges.map((challenge, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{challenge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* アドバイス */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-semibold">関係を良くするアドバイス</h3>
          </div>
          <div className="space-y-3">
            {analysis.advice.map((advice, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{advice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* デートアイデア */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-semibold">おすすめデートアイデア</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.dateIdeas.map((idea, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{idea}</span>
              </div>
            ))}
          </div>
        </div>

        {/* コミュニケーションのコツ */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold">コミュニケーションのコツ</h3>
          </div>
          <div className="space-y-3">
            {analysis.communicationTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 長期的な展望 */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-indigo-500" />
            <h3 className="text-xl font-semibold">長期的な展望</h3>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-gray-700 text-lg leading-relaxed">{analysis.longTermOutlook}</p>
          </div>
        </div>

        {/* 改善のヒント */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-semibold">さらなる改善のヒント</h3>
          </div>
          <div className="space-y-3">
            {analysis.improvementTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg">
                <div className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 警告サイン */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-semibold">注意すべき警告サイン</h3>
          </div>
          <div className="space-y-3">
            {analysis.warningSigns.map((sign, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  ⚠
                </div>
                <span className="text-gray-700">{sign}</span>
              </div>
            ))}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleBack}
            className="btn-secondary text-lg px-8 py-4"
          >
            結果一覧に戻る
          </button>
          <button
            onClick={handleStartOver}
            className="btn-primary text-lg px-8 py-4"
          >
            最初からやり直す
          </button>
        </div>
      </div>
    </div>
  )
}
