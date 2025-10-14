import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState } from 'react'
import { calculateDrinkingCompatibility, getParticipantDrinkingType } from '../utils/drinkingCalculator'
import { getDrinkingAnalysis } from '../data/drinkingAnalysisData'

export function DrinkingResultsPage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const [selectedPair, setSelectedPair] = useState<{participant1Id: string, participant2Id: string} | null>(null)

  const handleStartOver = () => {
    navigate('/drinking')
  }

  const handlePairSelect = (participant1Id: string, participant2Id: string) => {
    setSelectedPair({ participant1Id, participant2Id })
    navigate('/drinking-details')
  }

  // 酒癖診断の相性スコアを計算
  const compatibilityScores = calculateDrinkingCompatibility(state.participants)

  // 相性スコアの基準を定義
  const getCompatibilityLevel = (score: number) => {
    if (score >= 80) return { level: 'とても良い', color: 'text-green-500', bgColor: 'bg-green-50' }
    if (score >= 70) return { level: '良い', color: 'text-blue-500', bgColor: 'bg-blue-50' }
    if (score >= 60) return { level: '普通', color: 'text-gray-500', bgColor: 'bg-gray-50' }
    if (score >= 50) return { level: 'やや悪い', color: 'text-orange-500', bgColor: 'bg-orange-50' }
    return { level: '悪い', color: 'text-red-500', bgColor: 'bg-red-50' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-4 sm:mb-6">酒癖診断結果</h1>

        {/* 統計情報 */}
        <div className="card mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-center mb-3 sm:mb-4">診断結果サマリー</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
            <div>
              <p className="text-gray-500 text-xs">参加者数</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{state.participants.length}人</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">ペア数</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{compatibilityScores.length}組</p>
            </div>
          </div>
          
          {/* 酒癖タイプの説明 */}
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-purple-50 rounded-lg">
            <h3 className="text-sm sm:text-base font-semibold text-center mb-2 sm:mb-3">酒癖タイプの科学的根拠</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-2 text-xs">
              <div className="p-2 bg-white rounded-lg">
                <div className="font-semibold text-purple-600 text-xs">ソーシャルエンハンサー</div>
                <div className="text-gray-600 text-xs">アルコールの抑制解除効果により社交性が向上</div>
              </div>
              <div className="p-2 bg-white rounded-lg">
                <div className="font-semibold text-purple-600 text-xs">エモーショナルエクスプレス</div>
                <div className="text-gray-600 text-xs">前頭前野の抑制解除により感情表現が豊か</div>
              </div>
              <div className="p-2 bg-white rounded-lg">
                <div className="font-semibold text-purple-600 text-xs">コンフィデンスブースター</div>
                <div className="text-gray-600 text-xs">自己効力感の向上により自信が向上</div>
              </div>
              <div className="p-2 bg-white rounded-lg">
                <div className="font-semibold text-purple-600 text-xs">ストレスリリーバー</div>
                <div className="text-gray-600 text-xs">GABA受容体の活性化によりストレス解消</div>
              </div>
            </div>
          </div>
        </div>

        {/* 相性ランキング */}
        <div className="card mb-4 sm:mb-6">
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold">酒癖相性ランキング</h2>
            <p className="text-xs sm:text-sm text-gray-600">各ペアの酒癖タイプと相性スコア</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {compatibilityScores.map((score, index) => {
              const participant1 = state.participants.find(p => p.id === score.participant1Id)
              const participant2 = state.participants.find(p => p.id === score.participant2Id)
              
              // 酒癖タイプを取得
              const participant1Type = getParticipantDrinkingType(participant1)
              const participant2Type = getParticipantDrinkingType(participant2)
              
              // 分析結果を取得
              const analysis = getDrinkingAnalysis(participant1Type, participant2Type, 'drinking')
              
              return (
                <div key={`${score.participant1Id}-${score.participant2Id}`} className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
                  {/* ペア情報 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-xs sm:text-sm">
                            {participant1?.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <span className="text-sm font-medium">×</span>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-600 font-semibold text-xs sm:text-sm">
                            {participant2?.name?.charAt(0) || 'B'}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-xs sm:text-sm truncate">
                          {participant1?.name || '参加者A'} × {participant2?.name || '参加者B'}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full text-xs">
                              {participant1Type}
                            </span>
                            <span className="text-xs">×</span>
                            <span className="bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-full text-xs">
                              {participant2Type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right self-start sm:self-auto flex-shrink-0">
                      <div className="text-xl sm:text-2xl font-bold text-green-500">
                        {score.score}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {getCompatibilityLevel(score.score).level}
                      </div>
                    </div>
                  </div>

                  {/* 詳細結果の内容 */}
                  {analysis && (
                    <div className="space-y-2 sm:space-y-3">
                      {/* 酒癖相性紹介文 */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-2 sm:p-3 rounded-lg border-l-4 border-purple-400">
                        <h4 className="font-semibold text-gray-800 mb-1 text-xs sm:text-sm">あなたたちの酒癖相性は？</h4>
                        <p className="text-gray-700 leading-snug text-xs sm:text-sm">{analysis.coupleDescription}</p>
                      </div>

                      {/* 飲み会での体験 */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-400">
                        <h4 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-xs sm:text-sm">飲み会でこんなことが起きる！</h4>
                        <div className="space-y-1">
                          {analysis.specificExperiences.slice(0, 3).map((experience, expIndex) => (
                            <div key={expIndex} className="flex items-start gap-1.5">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              <p className="text-xs text-gray-700 leading-snug">{experience}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 強みと課題 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="bg-green-50 p-2 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-1 text-xs">この酒癖の相性の強み</h4>
                          <div className="space-y-0.5">
                            {analysis.strengths.slice(0, 2).map((strength, strIndex) => (
                              <div key={strIndex} className="flex items-start gap-1">
                                <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                                <span className="text-xs text-green-700 leading-snug">{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-1 text-xs">注意すべき酒癖の違い</h4>
                          <div className="space-y-0.5">
                            {analysis.challenges.slice(0, 2).map((challenge, chalIndex) => (
                              <div key={chalIndex} className="flex items-start gap-1">
                                <div className="w-1 h-1 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>
                                <span className="text-xs text-orange-700 leading-snug">{challenge}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 詳細を見るボタン */}
                      <div className="text-center pt-2">
                        <button
                          onClick={() => handlePairSelect(score.participant1Id, score.participant2Id)}
                          className="btn-primary px-4 py-1.5 text-xs w-full sm:w-auto"
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
            className="btn-primary text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-2.5 w-full sm:w-auto"
          >
            最初からやり直す
          </button>
        </div>
      </div>
    </div>
  )
}

