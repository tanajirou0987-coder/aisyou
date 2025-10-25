import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function VotingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentVoter, setCurrentVoter] = useState(0)
  const [votes, setVotes] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isVotingComplete, setIsVotingComplete] = useState(false)

  // 診断結果を取得（stateから、またはモックデータ）
  const diagnosisResult = location.state?.result || {
    couple: { male: '田中', female: '佐藤' },
    score: 92,
    type: 'CAPO',
    character: 'ほろ酔いロマンチスト'
  }

  // 参加者リスト（モックデータ）
  const participants = [
    '田中', '佐藤', '山田', '鈴木', '高橋', '伊藤'
  ]

  // 投票オプション
  const voteOptions = [
    { id: 0, label: '👍 めっちゃお似合い！', score: 90, color: 'from-green-500 to-emerald-500' },
    { id: 1, label: '👌 まあまあアリ', score: 65, color: 'from-yellow-500 to-orange-500' },
    { id: 2, label: '🤔 微妙かも…', score: 30, color: 'from-red-500 to-pink-500' }
  ]

  // 投票処理
  const handleVote = (voteId: number) => {
    const newVotes = [...votes, voteId]
    setVotes(newVotes)
    
    // 次の投票者に移る
    if (currentVoter < participants.length - 1) {
      setCurrentVoter(currentVoter + 1)
    } else {
      // 全員の投票が完了
      setIsVotingComplete(true)
      setTimeout(() => {
        setShowResults(true)
      }, 1000)
    }
  }

  // 結果計算
  const calculateResults = () => {
    if (votes.length === 0) return null

    const averageVote = votes.reduce((sum, vote) => sum + voteOptions[vote].score, 0) / votes.length
    const aiScore = diagnosisResult.score
    const difference = Math.abs(aiScore - averageVote)

    let comment = ''
    let specialCase = ''

    // 特殊パターンチェック
    const allHigh = votes.every(vote => vote === 0)
    const allLow = votes.every(vote => vote === 2)
    const allSame = votes.every(vote => vote === votes[0])

    if (allHigh) {
      specialCase = '満場一致！公認カップル認定🎉'
    } else if (allLow) {
      specialCase = 'みんな厳しい…でも可能性はゼロじゃない💪'
    } else if (votes.length > 2 && new Set(votes).size > 1) {
      specialCase = '賛否両論！謎の組み合わせ🤷'
    }

    // 差分に応じたコメント
    if (specialCase) {
      comment = specialCase
    } else if (aiScore > averageVote + 10) {
      comment = 'AIの方が高い！意外な相性カップル✨'
    } else if (Math.abs(aiScore - averageVote) < 10) {
      comment = 'みんなもわかってた！お似合いコンビ💕'
    } else if (aiScore < averageVote - 10) {
      comment = 'AIは低いけどみんなは応援！がんばれ📣'
    }

    return {
      aiScore,
      humanScore: Math.round(averageVote),
      difference,
      comment,
      voteDistribution: votes.reduce((acc, vote) => {
        acc[vote] = (acc[vote] || 0) + 1
        return acc
      }, {} as Record<number, number>)
    }
  }

  const results = calculateResults()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-600 mb-2">
            🍻 グラスノオト
          </h1>
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            👥 みんなに投票してもらう
          </h2>

          {!showResults ? (
            <>
              {/* 投票対象表示 */}
              <div className="bg-gradient-to-r from-orange-200 to-pink-300 rounded-xl p-6 mb-6">
                <div className="text-lg font-bold text-gray-800 mb-2">
                  この2人、お似合いだと思う？
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {diagnosisResult.couple.male} & {diagnosisResult.couple.female}
                </div>
                <div className="text-sm text-gray-600">
                  AI診断 {diagnosisResult.score}%
                </div>
              </div>

              {!isVotingComplete ? (
                <>
                  {/* 現在の投票者 */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">
                      {currentVoter + 1}人目 / {participants.length}人
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {participants[currentVoter]}さんの投票
                    </div>
                  </div>

                  {/* 投票ボタン */}
                  <div className="space-y-3">
                    {voteOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        className={`w-full bg-gradient-to-r ${option.color} text-white font-bold py-4 px-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-4">⏳</div>
                  <div className="text-lg font-bold text-gray-800">
                    投票を集計中...
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* 結果表示 */}
              <div className="bg-gradient-to-r from-cyan-200 to-pink-300 rounded-xl p-6 mb-6">
                <div className="text-lg font-bold text-gray-800 mb-4">
                  🎯 投票結果
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  AI診断：{results?.aiScore}% VS みんなの予想：{results?.humanScore}%
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  差：{results?.difference}%
                </div>
                <div className="text-base font-bold text-gray-800 bg-white rounded-xl p-4">
                  {results?.comment}
                </div>
              </div>

              {/* 投票分布 */}
              <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
                <div className="text-lg font-bold text-gray-800 mb-4">
                  📊 投票分布
                </div>
                <div className="space-y-3">
                  {voteOptions.map((option, index) => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        {option.label}
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {results?.voteDistribution[index] || 0}票
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* アクションボタン */}
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/glass-results')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
                >
                  結果に戻る
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate('/glass-punishment-game', { state: { score: diagnosisResult.score } })}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
                  >
                    🎲 罰ゲーム
                  </button>
                  <button
                    onClick={() => navigate('/glass-pair-details', { state: { couple: diagnosisResult } })}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
                  >
                    💌 詳細分析
                  </button>
                </div>
              </div>
            </>
          )}

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



