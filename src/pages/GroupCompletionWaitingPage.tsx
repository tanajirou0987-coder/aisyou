import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CheckCircle, Users, Clock, Sparkles } from 'lucide-react'

export function GroupCompletionWaitingPage() {
  const navigate = useNavigate()
  const { state, calculateGroupResults } = useApp()

  useEffect(() => {
    // 全員の診断が完了したら結果を計算
    const allCompleted = state.groupParticipants.every(p => p.diagnosisCompleted)
    if (allCompleted) {
      calculateGroupResults()
      // 少し待ってから結果画面に遷移
      setTimeout(() => {
        navigate('/group-results')
      }, 2000)
    }
  }, [state.groupParticipants, calculateGroupResults, navigate])

  const completedCount = state.groupParticipants.filter(p => p.diagnosisCompleted).length
  const totalCount = state.groupParticipants.length
  const allCompleted = completedCount === totalCount

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー（診断結果画面テイスト） */}
        <div className="text-center mb-3 md:mb-8">
          <div className="card p-2 md:hidden relative" style={{background: '#FFD700'}}>
            <div className="absolute top-1 left-2 text-xs" style={{transform: 'rotate(-15deg)'}}>POW!</div>
            <div className="absolute top-1 right-2 text-xs" style={{transform: 'rotate(15deg)'}}>BANG!</div>
            <h1 className="text-lg font-black text-black" style={{fontFamily: 'Bangers, sans-serif'}}>
              {allCompleted ? '全員完了！' : '診断待機中'}
            </h1>
            <p className="text-[12px] font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              {allCompleted ? '結果計算中…' : '全員の診断完了を待っています'}
            </p>
          </div>
          <div className="hidden md:flex justify-center items-center gap-6 mb-2">
            <span className="text-5xl" style={{transform: 'rotate(-10deg)'}}>🍺</span>
            <h1 className="heading-secondary text-5xl" style={{color: '#FF0000', WebkitTextStroke: '2px #000000', textShadow: '3px 3px 0 #FFFFFF'}}>
              {allCompleted ? '全員の診断が完了しました！' : '診断完了待機中'}
            </h1>
            <span className="text-5xl" style={{transform: 'rotate(10deg)'}}>🍶</span>
          </div>
        </div>

        {/* 完了状況表示 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              {allCompleted ? (
                <div className="relative">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
              ) : (
                <div className="relative">
                  <Users className="w-16 h-16 text-purple-500" />
                  <Clock className="w-8 h-8 text-orange-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {completedCount}/{totalCount}人完了
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* 完了メッセージ */}
          {allCompleted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  🎉 お疲れ様でした！
                </h3>
                <p className="text-green-700">
                  全員の診断が完了しました。結果を計算中です...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 参加者状況一覧 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
            参加者状況
          </h3>
          
          {/* 完了した人 */}
          {completedCount > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                診断完了済み ({completedCount}人)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {state.groupParticipants
                  .filter(p => p.diagnosisCompleted)
                  .map((participant) => (
                    <div
                      key={participant.userId}
                      className="bg-green-100 text-green-800 p-3 rounded-lg text-center"
                    >
                      <div className={`font-bold ${participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                        {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
                      </div>
                      <div className="text-sm">完了 ✓</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* まだ診断していない人 */}
          {completedCount < totalCount && (
            <div>
              <h4 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                まだ診断していない人 ({totalCount - completedCount}人)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {state.groupParticipants
                  .filter(p => !p.diagnosisCompleted)
                  .map((participant) => (
                    <div
                      key={participant.userId}
                      className="bg-orange-100 text-orange-800 p-3 rounded-lg text-center"
                    >
                      <div className={`font-bold ${participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                        {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
                      </div>
                      <div className="text-sm">待機中...</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* 結果表示ボタン（全員完了時のみ） */}
        {allCompleted && (
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                結果を見る準備ができました！
              </h3>
              <p className="text-gray-600 mb-4">
                みんなで端末を囲んで、相性結果を楽しみましょう
              </p>
              <div className="animate-pulse">
                <div className="text-purple-500 text-lg font-semibold">
                  結果画面に移動中...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 待機中のメッセージ */}
        {!allCompleted && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              💡 待機中の過ごし方
            </h3>
            <ul className="text-blue-700 space-y-2">
              <li>• まだ診断していない人に端末を渡してください</li>
              <li>• 診断中の人は周りに見られないよう注意してください</li>
              <li>• 全員が完了したら自動的に結果画面に移動します</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
