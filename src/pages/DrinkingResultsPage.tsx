import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState } from 'react'
import { calculateDrinkingCompatibility, getParticipantDrinkingType } from '../utils/drinkingCalculator'
import { getDrinkingAnalysis } from '../data/drinkingAnalysisData'
import { 
  calculateCategoryScores, 
  calculatePersonalityProfile, 
  determineDrinkingType 
} from '../utils/scientificDrinkingAnalysis'
import { generateOverallSummary } from '../utils/overallSummaryGenerator'
import { 
  Users, 
  Heart, 
  Star, 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Sparkles,
  Crown,
  Target,
  AlertTriangle
} from 'lucide-react'

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

  // 個人診断専用画面は不要のため常に共通UIを表示

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー - モバイル */}
        <div className="card p-2 lg:hidden relative mb-4" style={{background: '#FFD700'}}>
          <div className="absolute top-1 left-2 text-xs" style={{transform: 'rotate(-15deg)'}}>POW!</div>
          <div className="absolute top-1 right-2 text-xs" style={{transform: 'rotate(15deg)'}}>BANG!</div>
          <h1 className="text-lg font-black text-black" style={{fontFamily: 'Bangers, sans-serif'}}>酒癖診断結果</h1>
          <p className="text-[12px] font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>飲み会での相性を科学的に分析</p>
        </div>

        {/* ヘッダー - PC */}
        <div className="hidden lg:block text-center mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2" style={{fontFamily: 'Bangers, sans-serif'}}>酒癖診断結果</h1>
          <p className="text-lg text-gray-600" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>飲み会での相性を科学的に分析</p>
        </div>

        {/* 統計情報 */}
        <div className="card mb-4 sm:mb-6">
          <h2 className="text-lg font-bold text-center mb-4" style={{fontFamily: 'Bangers, sans-serif'}}>診断結果サマリー</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white rounded-lg border-2 border-black p-3" style={{boxShadow: '2px 2px 0 #000000'}}>
              <p className="text-gray-500 text-sm mb-1">参加者数</p>
              <p className="text-2xl font-bold text-gray-800">{state.participants.length}人</p>
            </div>
            <div className="bg-white rounded-lg border-2 border-black p-3" style={{boxShadow: '2px 2px 0 #000000'}}>
              <p className="text-gray-500 text-sm mb-1">ペア数</p>
              <p className="text-2xl font-bold text-gray-800">{compatibilityScores.length}組</p>
            </div>
          </div>
          
          {/* 酒癖タイプの説明 */}
          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>
            <h3 className="text-lg font-bold text-center mb-3" style={{fontFamily: 'Bangers, sans-serif'}}>酒癖タイプの科学的根拠</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-purple-50 rounded-lg border border-black">
                <div className="font-bold text-purple-600 text-sm mb-1">ソーシャルエンハンサー</div>
                <div className="text-gray-600 text-xs">アルコールの抑制解除効果により社交性が向上</div>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg border border-black">
                <div className="font-bold text-pink-600 text-sm mb-1">エモーショナルエクスプレス</div>
                <div className="text-gray-600 text-xs">前頭前野の抑制解除により感情表現が豊か</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-black">
                <div className="font-bold text-blue-600 text-sm mb-1">コンフィデンスブースター</div>
                <div className="text-gray-600 text-xs">自己効力感の向上により自信が向上</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-black">
                <div className="font-bold text-green-600 text-sm mb-1">ストレスリリーバー</div>
                <div className="text-gray-600 text-xs">GABA受容体の活性化によりストレス解消</div>
              </div>
            </div>
          </div>
        </div>

        {/* 相性ランキング */}
        <div className="card mb-4 sm:mb-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mb-2" style={{fontFamily: 'Bangers, sans-serif'}}>酒癖相性ランキング</h2>
            <p className="text-sm text-gray-600">タップで詳細表示</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compatibilityScores.map((score, index) => {
              const participant1 = state.participants.find(p => p.id === score.participant1Id)
              const participant2 = state.participants.find(p => p.id === score.participant2Id)
              
              // 酒癖タイプを取得
              const participant1Type = getParticipantDrinkingType(participant1)
              const participant2Type = getParticipantDrinkingType(participant2)
              
              // 分析結果を取得
              const analysis = getDrinkingAnalysis(participant1Type, participant2Type, 'drinking')
              
              return (
                <button
                  key={`${score.participant1Id}-${score.participant2Id}`}
                  onClick={() => handlePairSelect(score.participant1Id, score.participant2Id)}
                  className="bg-white rounded-lg border-2 border-black p-3 hover:shadow-lg transition-all text-left w-full" style={{boxShadow: '2px 2px 0 #000000'}}
                >
                  {/* ペア情報 */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center border border-black">
                          <span className="text-purple-600 font-bold text-sm">
                            {participant1?.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <span className="text-sm font-bold">×</span>
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center border border-black">
                          <span className="text-pink-600 font-bold text-sm">
                            {participant2?.name?.charAt(0) || 'B'}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm truncate">
                          {participant1?.name || '参加者A'} × {participant2?.name || '参加者B'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="text-xl font-bold text-green-500">
                        {score.score}%
                      </div>
                    </div>
                  </div>

                  {/* タイプ表示 */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded border border-black text-xs font-bold truncate">
                      {participant1Type}
                    </span>
                    <span className="font-bold">×</span>
                    <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded border border-black text-xs font-bold truncate">
                      {participant2Type}
                    </span>
                  </div>
                </button>
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

