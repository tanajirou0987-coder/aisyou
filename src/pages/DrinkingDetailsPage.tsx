import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getDrinkingAnalysis, getRandomDrinkingAnalysis } from '../data/drinkingAnalysisData'
import { getParticipantDrinkingType } from '../utils/drinkingCalculator'
import { Wine, Users, Lightbulb, Calendar, MessageCircle, TrendingUp, AlertTriangle, Target } from 'lucide-react'

export function DrinkingDetailsPage() {
  const navigate = useNavigate()
  const { state } = useApp()

  const handleBack = () => {
    navigate('/drinking-results')
  }

  const handleStartOver = () => {
    navigate('/drinking')
  }

  // 選択されたペアの情報を取得
  const participant1 = state.participants[0] || { id: '1', name: '参加者A' }
  const participant2 = state.participants[1] || { id: '2', name: '参加者B' }

  // 酒癖タイプを取得
  const participant1Type = getParticipantDrinkingType(participant1)
  const participant2Type = getParticipantDrinkingType(participant2)

  // 相性スコアの基準を定義
  const getCompatibilityLevel = (score: number) => {
    if (score >= 80) return { level: 'とても良い', color: 'text-green-500', bgColor: 'bg-green-50' }
    if (score >= 70) return { level: '良い', color: 'text-blue-500', bgColor: 'bg-blue-50' }
    if (score >= 60) return { level: '普通', color: 'text-gray-500', bgColor: 'bg-gray-50' }
    if (score >= 50) return { level: 'やや悪い', color: 'text-orange-500', bgColor: 'bg-orange-50' }
    return { level: '悪い', color: 'text-red-500', bgColor: 'bg-red-50' }
  }

  // 酒癖分析結果を取得
  const analysis = getDrinkingAnalysis(participant1Type, participant2Type, 'drinking') || getRandomDrinkingAnalysis('drinking')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
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
          <h1 className="text-3xl font-extrabold text-gray-800">酒癖相性詳細分析</h1>
          <button
            onClick={handleStartOver}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            最初から
          </button>
        </div>

        {/* ペア情報 */}
        <div className="card mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-2xl font-bold">
                  {participant1.name?.charAt(0) || 'A'}
                </span>
              </div>
              <Wine className="w-8 h-8 text-purple-500" />
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-600 text-2xl font-bold">
                  {participant2.name?.charAt(0) || 'B'}
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {participant1.name} × {participant2.name}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {participant1Type}
              </span>
              <span>×</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                {participant2Type}
              </span>
            </div>
            <p className="text-lg text-gray-600 mb-4">{analysis.relationshipType}</p>
            <div className="text-4xl font-extrabold text-green-500 mb-2">
              {analysis.compatibilityScore}%
            </div>
            <div className="text-sm text-gray-500">
              {getCompatibilityLevel(analysis.compatibilityScore).level}
            </div>
          </div>
        </div>

        {/* 酒癖相性の基準 */}
        <div className="card mb-8">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">酒癖相性スコアの基準</h3>
            <p className="text-gray-600">あなたの酒癖相性スコアはどのレベル？</p>
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

        {/* 酒癖相性紹介文 */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">あなたたちの酒癖相性は？</h3>
            <p className="text-gray-600">二人で一緒に読んでみてください！</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-400">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {analysis.coupleDescription}
            </p>
          </div>
        </div>

        {/* 飲み会での体験 */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">飲み会でこんなことが起きる！</h3>
            <p className="text-gray-600">お互いの酒癖の良い部分が引き出される関係です</p>
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
            <h3 className="text-xl font-semibold">この酒癖の相性の強み</h3>
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
            <h3 className="text-xl font-semibold">注意すべき酒癖の違い</h3>
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

        {/* おすすめ活動アイデア */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-semibold">おすすめ活動アイデア</h3>
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

