import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState } from 'react'
import { getTwentyTypeAnalysis } from '../data/twentyTypeAnalysisData'

export function ResultsPage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const [selectedPair, setSelectedPair] = useState<{participant1Id: string, participant2Id: string} | null>(null)

  const handleStartOver = () => {
    navigate('/')
  }

  const handlePairSelect = (participant1Id: string, participant2Id: string) => {
    setSelectedPair({ participant1Id, participant2Id })
    navigate('/couple-details')
  }

  // 固定の結果を表示
  const compatibilityScores = [{
    participant1Id: '1',
    participant2Id: '2',
    score: 85,
    factors: [{
      category: '16タイプ相性',
      score: 85,
      weight: 1,
      description: '瞬時計算による相性スコア'
    }]
  }]

  // 相性スコアの基準を定義
  const getCompatibilityLevel = (score: number) => {
    if (score >= 80) return { level: 'とても良い', color: 'text-green-700', bgColor: 'bg-yellow-50' }
    if (score >= 70) return { level: '良い', color: 'text-blue-700', bgColor: 'bg-blue-50' }
    if (score >= 60) return { level: '普通', color: 'text-gray-500', bgColor: 'bg-gray-50' }
    if (score >= 50) return { level: 'やや悪い', color: 'text-orange-500', bgColor: 'bg-orange-50' }
    return { level: '悪い', color: 'text-red-500', bgColor: 'bg-red-50' }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">診断結果</h1>

        {/* 統計情報 */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6">統計情報</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">参加者数</p>
              <p className="text-3xl font-bold text-gray-800">{state.participants.length}人</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">ペア数</p>
              <p className="text-3xl font-bold text-gray-800">{compatibilityScores.length}組</p>
            </div>
          </div>
          
          {/* 相性スコアの基準 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-center mb-4">相性スコアの基準</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-green-600 font-bold">80%以上</div>
                <div className="text-sm text-green-700">とても良い</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-600 font-bold">70-79%</div>
                <div className="text-sm text-blue-700">良い</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600 font-bold">60-69%</div>
                <div className="text-sm text-gray-700">普通</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-orange-600 font-bold">50-59%</div>
                <div className="text-sm text-orange-700">やや悪い</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-red-600 font-bold">50%未満</div>
                <div className="text-sm text-red-700">悪い</div>
              </div>
            </div>
          </div>
        </div>

        {/* 相性ランキング */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">相性ランキング</h2>
            <p className="text-gray-600">各ペアの相性スコアと詳細な分析結果</p>
          </div>

          <div className="space-y-6">
            {compatibilityScores.map((score, index) => {
              const participant1 = state.participants.find(p => p.id === score.participant1Id)
              const participant2 = state.participants.find(p => p.id === score.participant2Id)
              
              // 分析結果を取得
              let analysis = getTwentyTypeAnalysis('冒険的社交家-成長志向', '論理的思考家-安定志向', state.mode)

              // 分析結果が取得できない場合のフォールバック
              if (!analysis) {
                analysis = {
                  id: 'default',
                  mode: state.mode,
                  type1: '参加者1',
                  type2: '参加者2',
                  compatibilityScore: score.score,
                  relationshipType: 'バランス型カップル',
                  coupleDescription: 'あなたたちは「バランス型カップル」です！お互いの違いを尊重し合いながら、理想的なバランスを保てる素晴らしい関係です。',
                  specificExperiences: [
                    '「AさんはBさんの独特な魅力に興味を持ち、『面白い人だね』って言うようになる」',
                    '「BさんはAさんの社交性に安心し、『一緒にいると楽しい』って感じる」',
                    '「二人で過ごす時間では、お互いの違いを楽しみ、『この人だからこそ見える世界がある』って感じる」'
                  ],
                  strengths: [
                    'お互いの違いを尊重し合える',
                    '一緒に楽しめる関係',
                    '深い理解ができる'
                  ],
                  challenges: [
                    '価値観の違い',
                    'コミュニケーションの取り方',
                    '時間の使い方の違い'
                  ],
                  advice: [
                    'お互いの価値観を理解し合う',
                    '一緒に楽しめることを見つける',
                    '定期的なコミュニケーションを心がける'
                  ],
                  dateIdeas: [
                    '新しいお店開拓',
                    'カラオケデート',
                    '映画鑑賞',
                    '散歩'
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
                    '定期的な話し合いの時間を作る',
                    'お互いの価値観を尊重する',
                    '一緒に新しいことに挑戦する'
                  ]
                }
              }
              
              return (
                <div key={`${score.participant1Id}-${score.participant2Id}`} className="bg-white rounded-xl shadow-lg p-6">
                  {/* ペア情報 */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-semibold">
                            {participant1?.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <span className="text-lg font-medium">×</span>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {participant2?.name?.charAt(0) || 'B'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-lg">
                          {participant1?.name || '参加者A'} × {participant2?.name || '参加者B'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {analysis?.relationshipType || 'バランス型カップル'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-500">
                        {score.score}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {getCompatibilityLevel(score.score).level}
                      </div>
                    </div>
                  </div>

                  {/* 詳細結果の内容 */}
                  {analysis && (
                    <div className="space-y-4">
                      {/* デバッグ情報 */}
                      <div className="text-xs text-gray-500 mb-2">
                        デバッグ: 分析データ存在={!!analysis}, モード={state.mode}
                      </div>
                      
                      {/* カップル紹介文 */}
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border-l-4 border-pink-400">
                        <h4 className="font-semibold text-gray-800 mb-2">あなたたちはどんなカップル？</h4>
                        <p className="text-gray-700 leading-relaxed">{analysis.coupleDescription}</p>
                      </div>

                      {/* 具体的な体験 */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-400">
                        <h4 className="font-semibold text-gray-800 mb-3">一緒にいるとこんなことが起きる！</h4>
                        <div className="space-y-2">
                          {analysis.specificExperiences.slice(0, 3).map((experience, expIndex) => (
                            <div key={expIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-700">{experience}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 強みと課題 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">このカップルの強み</h4>
                          <div className="space-y-1">
                            {analysis.strengths.slice(0, 2).map((strength, strIndex) => (
                              <div key={strIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-green-700">{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">注意すべき課題</h4>
                          <div className="space-y-1">
                            {analysis.challenges.slice(0, 2).map((challenge, chalIndex) => (
                              <div key={chalIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-orange-700">{challenge}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 詳細を見るボタン */}
                      <div className="text-center pt-4">
                        <button
                          onClick={() => handlePairSelect(score.participant1Id, score.participant2Id)}
                          className="btn-primary px-6 py-2 text-sm"
                        >
                          詳細結果を見る
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-center">
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