import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Clock, Users, CheckCircle } from 'lucide-react'
import { watchSession, submitAnswer, checkAllAnswered, moveToNextQuestion, updateSessionStatus, SessionData } from '../utils/sessionManager'
import { romanceQuestions as questions } from '../data/questions'

export function MultiDeviceDiagnosisPage() {
  const navigate = useNavigate()
  const { sessionId, userId } = useParams<{ sessionId: string; userId: string }>()
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [waitingForOthers, setWaitingForOthers] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [totalParticipants, setTotalParticipants] = useState(0)

  // セッションをリアルタイムで監視
  useEffect(() => {
    if (!sessionId) return

    const unsubscribe = watchSession(sessionId, (data) => {
      if (!data) {
        alert('セッションが見つかりません')
        navigate('/')
        return
      }

      setSessionData(data)
      setCurrentQuestion(data.currentQuestionIndex)
      
      // 参加者数を取得
      const participants = Object.values(data.participants || {})
      setTotalParticipants(participants.length)
      
      // 現在の質問に何人が回答済みかカウント
      const answered = participants.filter((p: any) => 
        p.answers.length > data.currentQuestionIndex
      ).length
      setAnsweredCount(answered)
      
      // 自分が回答済みかチェック
      if (userId && data.participants[userId]) {
        const myAnswers = data.participants[userId].answers
        setHasAnswered(myAnswers.length > data.currentQuestionIndex)
      }
      
      // 診断完了チェック
      if (data.currentQuestionIndex >= questions.length) {
        // 全質問完了
        navigate(`/multi-device-results/${sessionId}`)
      }
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [sessionId, userId, navigate])

  // 全員回答済みかチェックして次に進む
  useEffect(() => {
    if (!sessionId || !sessionData || currentQuestion >= questions.length) return
    
    // 全員が回答したかチェック
    const checkAndProceed = async () => {
      const allAnswered = await checkAllAnswered(sessionId, currentQuestion)
      if (allAnswered) {
        // 少し待ってから次の質問へ
        setTimeout(async () => {
          await moveToNextQuestion(sessionId, currentQuestion)
          setHasAnswered(false)
          setWaitingForOthers(false)
        }, 1000)
      }
    }

    if (hasAnswered) {
      setWaitingForOthers(true)
      checkAndProceed()
    }
  }, [hasAnswered, currentQuestion, sessionId, sessionData])

  const handleAnswer = async (answerValue: number) => {
    if (!sessionId || !userId || hasAnswered) return

    try {
      await submitAnswer(sessionId, userId, currentQuestion, answerValue)
      setHasAnswered(true)
    } catch (err) {
      console.error('回答の送信に失敗しました:', err)
      alert('回答の送信に失敗しました')
    }
  }

  if (!sessionData || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card" style={{background: '#FFFFFF'}}>
          <p className="text-xl font-black text-black">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (sessionData.status === 'waiting') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card text-center" style={{background: '#FFE4B5', maxWidth: '600px'}}>
          <div className="mb-6">
            <Clock className="w-20 h-20 mx-auto text-yellow-600 mb-4 animate-pulse" style={{filter: 'drop-shadow(3px 3px 0 #000000)'}} />
          </div>
          <h2 className="text-4xl font-black text-black mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
            主催者が開始するまで待機中...
          </h2>
          <p className="text-black font-bold text-lg mb-6">
            もうすぐ診断が始まります！<br />
            このまましばらくお待ちください
          </p>
          <div className="p-4 rounded-lg border-3 border-black" style={{background: '#D4EDDA'}}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="w-6 h-6 text-green-600" />
              <p className="text-xl font-black text-black">参加者: {totalParticipants}人</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="text-lg font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              質問 {currentQuestion + 1} / {questions.length}
            </p>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <p className="text-sm font-bold text-gray-700">
                {answeredCount} / {totalParticipants}人回答済み
              </p>
            </div>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full border-3 border-black overflow-hidden" style={{boxShadow: '3px 3px 0 #000000'}}>
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
            ></div>
          </div>
        </div>

        {/* 質問カード */}
        <div className="card mb-6" style={{background: hasAnswered ? '#D4EDDA' : '#FFFFFF'}}>
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-blue-500 text-white font-black rounded-lg border-3 border-black mb-4" style={{boxShadow: '3px 3px 0 #000000'}}>
              Q{currentQuestion + 1}
            </div>
            <h2 className="text-3xl font-black text-black mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              {question.text}
            </h2>
          </div>

          {/* 回答済みメッセージ */}
          {hasAnswered && waitingForOthers && (
            <div className="mb-6 p-6 rounded-xl border-4 border-green-600 text-center animate-pulse" style={{background: '#D4EDDA', boxShadow: '4px 4px 0 #00CC44'}}>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              <p className="text-2xl font-black text-green-700 mb-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                回答完了！✅
              </p>
              <p className="text-black font-bold text-lg">
                他の参加者を待っています...
              </p>
              <p className="text-green-600 font-black text-xl mt-3">
                {answeredCount} / {totalParticipants}人
              </p>
            </div>
          )}

          {/* 選択肢 */}
          {!hasAnswered && (
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-6 rounded-xl border-4 border-black text-left transition-all hover:transform hover:scale-105"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '5px 5px 0 #000000'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-3 border-black flex items-center justify-center bg-blue-500 text-white font-black text-xl flex-shrink-0" style={{boxShadow: '3px 3px 0 #000000'}}>
                      {index + 1}
                    </div>
                    <p className="text-lg font-bold text-black flex-1">
                      {option.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 参加者の回答状況 */}
        <div className="card" style={{background: '#FFE4B5'}}>
          <h3 className="text-xl font-black text-black mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
            👥 みんなの回答状況
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.values(sessionData.participants || {}).map((participant: any) => {
              const hasAnsweredThisQ = participant.answers.length > currentQuestion
              return (
                <div 
                  key={participant.userId}
                  className={`p-3 rounded-lg border-2 border-black text-center ${hasAnsweredThisQ ? 'bg-green-100' : 'bg-white'}`}
                  style={{boxShadow: '2px 2px 0 #000000'}}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className={`text-lg ${participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                      {participant.gender === 'male' ? '♂' : '♀'}
                    </span>
                    <span className="font-black text-black text-sm">{participant.userName}</span>
                  </div>
                  {hasAnsweredThisQ ? (
                    <span className="text-green-600 font-black text-xs">✓ 回答済み</span>
                  ) : (
                    <span className="text-gray-500 font-bold text-xs">⏳ 入力中...</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}


