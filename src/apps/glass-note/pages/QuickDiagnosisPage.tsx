import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Clock, Users, CheckCircle, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { watchSession, submitAnswer, checkAllAnswered, moveToNextQuestion, updateSessionStatus, SessionData } from '../../../utils/sessionManager'
import { optimizedLoveStyleQuestions as questions } from '../../../data/optimizedLoveStyleQuestions'

export function QuickDiagnosisPage() {
  const navigate = useNavigate()
  const { sessionId, userId } = useParams<{ sessionId: string; userId: string }>()
  const location = useLocation()
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [waitingForOthers, setWaitingForOthers] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [totalParticipants, setTotalParticipants] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showPrivacyWarning, setShowPrivacyWarning] = useState(true)
  const [isDevMode, setIsDevMode] = useState(false)

  // 開発者モードかどうかを判定
  useEffect(() => {
    const localSessionData = localStorage.getItem('glassSessionData')
    if (localSessionData) {
      const data = JSON.parse(localSessionData)
      setIsDevMode(true)
      setSessionData(data)
      setCurrentQuestion(data.currentQuestion || 0)
      setTotalParticipants(data.allPersons?.length || 0)
      setAnsweredCount(1) // 開発者モードでは1人として表示
    }
  }, [])

  // セッションをリアルタイムで監視（本番モードのみ）
  useEffect(() => {
    if (isDevMode || !sessionId || !userId) return

    const unsubscribe = watchSession(sessionId, (data) => {
      setSessionData(data)
      
      if (data) {
        setCurrentQuestion(data.currentQuestion || 0)
        setTotalParticipants(data.allPersons?.length || 0)
        
        // このユーザーの回答状況をチェック
        const userAnswers = data.answers?.[userId] || {}
        setHasAnswered(!!userAnswers[currentQuestion])
        
        // 全員の回答状況をチェック
        checkAllAnswered(sessionId, currentQuestion).then((allAnswered) => {
          setWaitingForOthers(hasAnswered && !allAnswered)
          
          // 回答済み人数をカウント
          const answered = data.answers || {}
          const currentAnswers = Object.values(answered).filter((userAnswers: any) => 
            userAnswers && userAnswers[currentQuestion]
          ).length
          setAnsweredCount(currentAnswers)
        })
      }
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [sessionId, userId, currentQuestion, hasAnswered, isDevMode])

  // 回答送信
  const handleAnswerSubmit = async (answer: string) => {
    if (hasAnswered) return

    setSelectedAnswer(answer)
    setHasAnswered(true)

    if (isDevMode) {
      // 開発者モード：ローカルストレージに保存して即座に次の質問へ
      const localData = JSON.parse(localStorage.getItem('glassSessionData') || '{}')
      if (!localData.answers) localData.answers = {}
      if (!localData.answers[userId || 'dev-user']) localData.answers[userId || 'dev-user'] = {}
      localData.answers[userId || 'dev-user'][currentQuestion] = answer
      localData.currentQuestion = currentQuestion + 1
      localStorage.setItem('glassSessionData', JSON.stringify(localData))

      // 次の質問へ移動
      const isLastQuestion = currentQuestion >= questions.length - 1
      if (isLastQuestion) {
        // 診断完了
        navigate('/glass-results', { 
          state: { 
            sessionId: 'dev-session', 
            fromMultiDevice: true,
            participants: sessionData?.allPersons || []
          } 
        })
      } else {
        // 次の質問へ
        setCurrentQuestion(prev => prev + 1)
        setHasAnswered(false)
        setSelectedAnswer(null)
        setWaitingForOthers(false)
      }
    } else {
      // 本番モード：Firebaseを使用
      if (!sessionId || !userId) return

      setWaitingForOthers(true)

      try {
        await submitAnswer(sessionId, userId, currentQuestion, answer)
        
        // 全員が回答したかチェック
        const allAnswered = await checkAllAnswered(sessionId, currentQuestion)
        if (allAnswered) {
          // 次の質問へ移動
          const isLastQuestion = currentQuestion >= questions.length - 1
          if (isLastQuestion) {
            // 診断完了
            await updateSessionStatus(sessionId, 'completed')
            navigate('/glass-results', { 
              state: { 
                sessionId, 
                fromMultiDevice: true,
                participants: sessionData?.allPersons || []
              } 
            })
          } else {
            // 次の質問へ
            await moveToNextQuestion(sessionId)
            setCurrentQuestion(prev => prev + 1)
            setHasAnswered(false)
            setSelectedAnswer(null)
            setWaitingForOthers(false)
          }
        }
      } catch (error) {
        console.error('回答送信エラー:', error)
        setHasAnswered(false)
        setSelectedAnswer(null)
        setWaitingForOthers(false)
      }
    }
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">セッションを読み込み中...</p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion >= questions.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-600 mb-2">🍻 グラスノオト</h1>
          <p className="text-sm text-gray-600">
            {isDevMode ? '開発者モード - 診断中...' : '診断中...'}
          </p>
          {isDevMode && (
            <div className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold inline-block">
              🔧 開発者モード
            </div>
          )}
        </div>

        {/* 進捗表示 */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg border-2 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">
                質問 {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">
                {answeredCount} / {totalParticipants}人
              </span>
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* プライバシー注意喚起 */}
        {showPrivacyWarning && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-800">
                  プライバシーにご注意ください
                </span>
              </div>
              <button
                onClick={() => setShowPrivacyWarning(false)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              診断中は他の人に回答が見えないよう、画面を隠して回答してください
            </p>
          </div>
        )}

        {/* 質問カード */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border-2 border-purple-200">
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 bg-purple-500 text-white font-bold rounded-lg mb-4">
              Q{currentQuestion + 1}
            </div>
            <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
              {question.text}
            </h2>
          </div>

          {/* 回答済みメッセージ */}
          {hasAnswered && waitingForOthers && (
            <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-2xl animate-pulse">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-lg font-bold text-green-700 mb-2">
                回答完了！✅
              </p>
              <p className="text-sm text-gray-600 mb-2">
                他の参加者を待っています...
              </p>
              <p className="text-green-600 font-bold">
                {answeredCount} / {totalParticipants}人
              </p>
            </div>
          )}

          {/* 選択肢 */}
          {!hasAnswered && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSubmit(option.text)}
                  className="w-full p-4 text-left bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 rounded-xl transition-all duration-200 font-medium"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 最後の質問の場合の完了メッセージ */}
        {isLastQuestion && hasAnswered && !waitingForOthers && (
          <div className="text-center p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-lg font-bold text-blue-700 mb-2">
              診断完了！
            </p>
            <p className="text-sm text-gray-600">
              結果を計算中です...
            </p>
          </div>
        )}

        {/* 戻るボタン */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  )
}
