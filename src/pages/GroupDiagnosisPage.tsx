import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getRandomDrinkingQuestions } from '../data/drinkingQuestions'
import { ArrowRight, Eye, EyeOff, Users, CheckCircle } from 'lucide-react'

export function GroupDiagnosisPage() {
  const navigate = useNavigate()
  const { 
    state, 
    setQuestions, 
    submitGroupAnswer, 
    completeUserDiagnosis,
    calculateGroupResults 
  } = useApp()
  
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const currentUser = state.groupParticipants[currentUserIndex]
  const currentQuestion = state.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === state.questions.length - 1
  const isLastUser = currentUserIndex === state.groupParticipants.length - 1

  // 質問が読み込まれていない場合はローディング表示
  if (!currentQuestion || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">質問を読み込み中...</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    // 酒癖診断の質問を設定（一度だけ実行）
    if (state.questions.length === 0) {
      const questions = getRandomDrinkingQuestions('drinking')
      setQuestions(questions)
    }
  }, [setQuestions, state.questions.length])

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId)
    setIsAnswerVisible(true)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer && currentQuestion) {
      const option = currentQuestion.options.find(opt => opt.id === selectedAnswer)
      if (option) {
        submitGroupAnswer(currentUser.userId, currentQuestion.id, selectedAnswer, option.value)
      }
    }

    if (isLastQuestion) {
      // この人の診断が完了
      completeUserDiagnosis(currentUser.userId)
      
      if (isLastUser) {
        // 全員の診断が完了
        calculateGroupResults()
        navigate('/group-completion-waiting')
      } else {
        // 次の人に移る
        setCurrentUserIndex(prev => prev + 1)
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
        setIsAnswerVisible(false)
      }
    } else {
      // 次の質問に移る
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerVisible(false)
    }
  }

  const handleNextUser = () => {
    setCurrentUserIndex(prev => prev + 1)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerVisible(false)
  }

  if (!currentUser || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">診断を準備中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            酒癖診断
          </h1>
          <p className="text-lg text-gray-600">
            <span className={`font-bold text-xl ${currentUser.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
              {currentUser.gender === 'male' ? '♂' : '♀'} {currentUser.userName}
            </span>さんの番です
          </p>
        </div>

        {/* プログレスバー */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-500" />
              <span className="text-lg font-semibold text-gray-700">
                {currentUserIndex + 1}人中{state.groupParticipants.length}人目
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {currentQuestionIndex + 1}/{state.questions.length}問目
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentUserIndex * state.questions.length + currentQuestionIndex + 1) / (state.groupParticipants.length * state.questions.length)) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* プライバシー注意喚起 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-yellow-800">
            <EyeOff className="w-5 h-5" />
            <span className="font-semibold">プライバシーにご注意ください</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            診断中は他の人に回答が見えないよう、画面を隠して回答してください
          </p>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentQuestion.text}
            </h2>
          </div>

          {/* 回答選択肢 */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={isAnswerVisible}
                className={`w-full p-4 rounded-lg text-lg font-semibold transition-all ${
                  selectedAnswer === option.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : isAnswerVisible
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-purple-200'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {/* 回答後の表示 */}
          {isAnswerVisible && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">回答完了！</span>
              </div>
              <p className="text-green-700 text-sm">
                選択した回答: <strong>{currentQuestion.options.find(opt => opt.id === selectedAnswer)?.text}</strong>
              </p>
            </div>
          )}
        </div>

        {/* 操作ボタン */}
        <div className="text-center">
          {isAnswerVisible ? (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              {isLastQuestion ? (
                isLastUser ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    診断完了
                  </>
                ) : (
                  <>
                    次の人へ
                    <ArrowRight className="w-5 h-5" />
                  </>
                )
              ) : (
                <>
                  次の質問へ
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          ) : (
            <div className="text-gray-500">
              回答を選択してください
            </div>
          )}
        </div>

        {/* 画面を暗くするボタン */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mx-auto"
          >
            {isAnswerVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isAnswerVisible ? '回答を表示' : '回答を隠す'}
          </button>
        </div>

        {/* 参加者リスト */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            参加者進捗
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {state.groupParticipants.map((participant, index) => (
              <div
                key={participant.userId}
                className={`p-3 rounded-lg text-center ${
                  index === currentUserIndex
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : participant.diagnosisCompleted
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`font-bold ${participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                  {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
                </div>
                <div className="text-sm">
                  {index === currentUserIndex
                    ? '診断中'
                    : participant.diagnosisCompleted
                    ? '完了'
                    : '待機中'
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
