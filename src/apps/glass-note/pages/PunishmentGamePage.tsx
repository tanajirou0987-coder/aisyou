import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function PunishmentGamePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedGame, setSelectedGame] = useState<string>('')
  const [showResult, setShowResult] = useState(false)

  // 相性度を取得（stateから、またはデフォルト値）
  const compatibilityScore = location.state?.score || 92

  // 相性度に応じた罰ゲームリスト
  const getPunishmentGames = (score: number) => {
    if (score >= 80) {
      return [
        '2人で写真撮って待ち受けにする📸',
        '次のデート予定を今決める📅',
        'お互いの好きなところを言い合う💕',
        '2人だけの合言葉を決める🤫',
        '連絡先交換してすぐLINEする📱'
      ]
    } else if (score >= 50) {
      return [
        '2人で乾杯して一気飲み🍻',
        '10秒見つめ合う👀',
        'お互いの第一印象を言う💭',
        '2人で次の注文を決める🍽️',
        '相手の良いところを3つ褒める✨'
      ]
    } else {
      return [
        '2人でモノマネ対決🎭',
        'じゃんけんして負けた方がおごる💰',
        'お互いの面白エピソード披露😂',
        '2人で一発芸🎪',
        '腕相撲対決💪'
      ]
    }
  }

  const punishmentGames = getPunishmentGames(compatibilityScore)

  // ルーレットを回す
  const spinRoulette = () => {
    setIsSpinning(true)
    setShowResult(false)
    
    // 2秒後にランダムな罰ゲームを選択
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * punishmentGames.length)
      setSelectedGame(punishmentGames[randomIndex])
      setIsSpinning(false)
      setShowResult(true)
    }, 2000)
  }

  // 別の罰ゲームを選択
  const changeGame = () => {
    const currentIndex = punishmentGames.indexOf(selectedGame)
    let nextIndex = (currentIndex + 1) % punishmentGames.length
    setSelectedGame(punishmentGames[nextIndex])
  }

  // 罰ゲームをスキップ
  const skipGame = () => {
    navigate('/glass-results')
  }

  // 罰ゲームを実行
  const executeGame = () => {
    // 実行完了のアニメーション
    alert('罰ゲーム実行完了！🎉')
    navigate('/glass-results')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-600 mb-2">
            🍻 グラスノオト
          </h1>
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            🎲 罰ゲームタイム！
          </h2>

          {/* 相性度表示 */}
          <div className="bg-gradient-to-r from-orange-200 to-pink-300 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">あなたたちの相性度</div>
            <div className="text-3xl font-bold text-pink-600">
              {compatibilityScore}%
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {compatibilityScore >= 80 ? '高相性' : compatibilityScore >= 50 ? '中相性' : '低相性'}
            </div>
          </div>

          {/* ルーレット表示エリア */}
          <div className="mb-8">
            {!showResult ? (
              <div className="bg-gradient-to-r from-cyan-200 to-pink-300 rounded-2xl p-8 h-48 flex items-center justify-center">
                {isSpinning ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2 animate-spin">🎲</div>
                    <div className="text-lg font-bold text-gray-800">
                      ルーレット回転中...
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      罰ゲームを選んでいます
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎲</div>
                    <div className="text-lg font-bold text-gray-800 mb-2">
                      ルーレットを回そう！
                    </div>
                    <div className="text-sm text-gray-600">
                      相性度に応じた罰ゲームが選ばれます
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-2xl p-6">
                <div className="text-4xl mb-4">🎯</div>
                <div className="text-lg font-bold text-gray-800 mb-2">
                  選ばれた罰ゲーム
                </div>
                <div className="text-base font-bold text-gray-800 bg-white rounded-xl p-4 mb-4">
                  {selectedGame}
                </div>
                <div className="text-sm text-gray-600">
                  この罰ゲームを実行しますか？
                </div>
              </div>
            )}
          </div>

          {/* ボタンエリア */}
          <div className="space-y-4">
            {!showResult ? (
              <button
                onClick={spinRoulette}
                disabled={isSpinning}
                className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-200 ${
                  isSpinning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:transform hover:-translate-y-1'
                }`}
              >
                {isSpinning ? '回転中...' : '🎲 ルーレットを回す'}
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={executeGame}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 px-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
                >
                  ✅ 実行する
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={changeGame}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
                  >
                    🔄 別のに変える
                  </button>
                  <button
                    onClick={skipGame}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200"
                  >
                    ⏭️ スキップ
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* フッター */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/glass-results')}
              className="w-full bg-white border-2 border-purple-300 text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-purple-50 transition-all duration-200"
            >
              結果に戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


