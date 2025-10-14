import { useState, useEffect, useMemo } from 'react'
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

  const participants = state.groupParticipants
  const cacheKey = useMemo(() => {
    const ids = (participants || []).map(p => p.userId).join(',')
    return `drinking:questions:v1:${ids}`
  }, [participants])

  // 同期的にキャッシュ→生成の順に候補を用意
  const derivedQuestions = useMemo(() => {
    try {
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) return JSON.parse(cached)
    } catch {}
    return getRandomDrinkingQuestions('drinking')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey])

  // グローバル未設定なら即座に設定（非破壊）＋キャッシュ保存
  useEffect(() => {
    if (state.questions.length === 0 && derivedQuestions.length > 0) {
      setQuestions(derivedQuestions)
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(derivedQuestions))
      } catch {}
    }
  }, [cacheKey, derivedQuestions, setQuestions, state.questions.length])

  const questionsForRender = state.questions.length > 0 ? state.questions : derivedQuestions
  const currentUser = participants[currentUserIndex]
  const currentQuestion = questionsForRender[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === state.questions.length - 1
  const isLastUser = currentUserIndex === state.groupParticipants.length - 1

  // 参加者が未用意 or 質問候補が空の場合のみローディング
  if (!currentUser || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">質問を読み込み中...</p>
        </div>
      </div>
    )
  }

  // 既存の遅延読み込みは上の同期候補設定に置き換え済み

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-2 sm:p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー（診断結果画面と同テイスト） */}
        <div className="text-center mb-2 md:mb-8">
          <div className="card p-2 md:hidden relative" style={{background: '#FFD700'}}>
            <div className="absolute top-1 left-2 text-xs" style={{transform: 'rotate(-15deg)'}}>POW!</div>
            <div className="absolute top-1 right-2 text-xs" style={{transform: 'rotate(15deg)'}}>BANG!</div>
            <h1 className="text-lg font-black text-black" style={{fontFamily: 'Bangers, sans-serif'}}>酒癖診断</h1>
            <p className="text-[12px] font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              今は <span className={`${currentUser.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>{currentUser.gender === 'male' ? '♂' : '♀'} {currentUser.userName}</span> さんの番！
            </p>
          </div>
          <div className="hidden md:flex justify-center items-center gap-6 mb-2">
            <span className="text-5xl" style={{transform: 'rotate(-10deg)'}}>🍺</span>
            <h1 className="heading-secondary text-5xl" style={{color: '#FF0000', WebkitTextStroke: '2px #000000', textShadow: '3px 3px 0 #FFFFFF'}}>酒癖診断</h1>
            <span className="text-5xl" style={{transform: 'rotate(10deg)'}}>🍶</span>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-2.5 md:p-6 mb-2.5 md:mb-6">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <Users className="w-4 h-4 md:w-6 md:h-6 text-purple-500" />
              <span className="text-sm md:text-lg font-semibold text-gray-700">
                {currentUserIndex + 1}人中{state.groupParticipants.length}人目
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-500">
              {currentQuestionIndex + 1}/{state.questions.length}問目
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 md:h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentUserIndex * state.questions.length + currentQuestionIndex + 1) / (state.groupParticipants.length * state.questions.length)) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* プライバシー注意喚起 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 md:p-4 mb-3 md:mb-6">
          <div className="flex items-center gap-1 md:gap-2 text-yellow-800">
            <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold text-xs md:text-base">プライバシーにご注意ください</span>
          </div>
          <p className="text-yellow-700 text-xs md:text-sm mt-1 hidden md:block">
            診断中は他の人に回答が見えないよう、画面を隠して回答してください
          </p>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 md:p-8 mb-2.5 md:mb-6">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-sm md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">
              {currentQuestion.text}
            </h2>
          </div>

          {/* 回答選択肢 */}
          <div className="space-y-1.5 md:space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={isAnswerVisible}
                className={`w-full p-2 md:p-4 rounded-lg text-[13px] md:text-lg font-semibold transition-all ${
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
            <div className="mt-2.5 md:mt-6 p-2 md:p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-1 md:gap-2 text-green-800 mb-1 md:mb-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-[13px] md:text-base">回答完了！</span>
              </div>
              <p className="text-green-700 text-[12px] md:text-sm hidden md:block">
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
              className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              {isLastQuestion ? (
                isLastUser ? (
                  <>
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="md:hidden">完了</span>
                    <span className="hidden md:inline">診断完了</span>
                  </>
                ) : (
                  <>
                    <span className="md:hidden">次へ</span>
                    <span className="hidden md:inline">次の人へ</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </>
                )
              ) : (
                <>
                  <span className="md:hidden">次へ</span>
                  <span className="hidden md:inline">次の質問へ</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </>
              )}
            </button>
          ) : (
            <div className="text-gray-500 text-[12px] md:text-base">
              回答を選択してください
            </div>
          )}
        </div>

        {/* 画面を暗くするボタン - PC版のみ */}
        <div className="text-center mt-3 md:mt-6 hidden md:block">
          <button
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mx-auto"
          >
            {isAnswerVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isAnswerVisible ? '回答を表示' : '回答を隠す'}
          </button>
        </div>

        {/* 参加者リスト */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 md:p-6 mt-3 md:mt-8">
          <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2 md:mb-4 text-center">
            参加者進捗
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2 md:gap-3">
            {state.groupParticipants.map((participant, index) => (
              <div
                key={participant.userId}
                className={`p-2 md:p-3 rounded-lg text-center ${
                  index === currentUserIndex
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : participant.diagnosisCompleted
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`font-bold text-xs md:text-base ${
                  index === currentUserIndex 
                    ? 'text-white' 
                    : participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'
                }`}>
                  {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
                </div>
                <div className="text-xs md:text-sm">
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
