import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getRandomDrinkingQuestions } from '../data/drinkingQuestions'

export function DrinkingQuestionPage() {
  const navigate = useNavigate()
  const { state, setQuestions, submitAnswer } = useApp()
  const [questions] = useState(() => getRandomDrinkingQuestions('drinking'))
  const [answers, setAnswers] = useState<{[key: string]: {[key: string]: string}}>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0)

  const handleAnswerChange = (questionId: string, participantId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [participantId]: optionId
      }
    }))
  }

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex]
    const currentParticipant = state.participants[currentParticipantIndex]
    
    if (!currentQuestion || !currentParticipant) return

    // 現在の回答を送信
    const participantAnswers = answers[currentQuestion.id] || {}
    const optionId = participantAnswers[currentParticipant.id]
    
    if (optionId) {
      const option = currentQuestion.options.find(o => o.id === optionId)
      if (option) {
        submitAnswer(currentParticipant.id, currentQuestion.id, optionId, option.value)
      }
    }

    // 次の参加者または次の質問に進む
    if (currentParticipantIndex < state.participants.length - 1) {
      // 次の参加者
      setCurrentParticipantIndex(prev => prev + 1)
    } else if (currentQuestionIndex < questions.length - 1) {
      // 次の質問、最初の参加者に戻る
      setCurrentQuestionIndex(prev => prev + 1)
      setCurrentParticipantIndex(0)
    } else {
      // 全て完了、結果ページに遷移
      setQuestions(questions)
      navigate('/drinking-results')
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentParticipant = state.participants[currentParticipantIndex]

  if (!currentQuestion || !currentParticipant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">エラー</h1>
          <p className="text-gray-600">質問または参加者の情報が見つかりません。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-3">
          <h1 className="text-base sm:text-lg font-bold text-gray-800 mb-1">酒癖診断</h1>
          <p className="text-sm text-gray-600">
            {currentParticipant.name}さん
          </p>
          <p className="text-xs text-gray-500">
            {currentQuestionIndex + 1}/{questions.length} 
            ({currentParticipantIndex + 1}/{state.participants.length}人目)
          </p>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-lg shadow p-2 sm:p-3 mb-3">
          <div className="text-center mb-3">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-1">
              {currentQuestion.text}
            </h2>
            <p className="text-xs text-gray-500">
              最も近い選択肢を選んでください
            </p>
          </div>

          {/* 回答選択肢 */}
          <div className="space-y-1.5 sm:space-y-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerChange(currentQuestion.id, currentParticipant.id, option.id)}
                className={`w-full p-2 text-left rounded border-2 transition-all ${
                  answers[currentQuestion.id]?.[currentParticipant.id] === option.id
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    answers[currentQuestion.id]?.[currentParticipant.id] === option.id
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion.id]?.[currentParticipant.id] === option.id && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 参加者リスト */}
        <div className="bg-white rounded-lg shadow p-2 mb-3">
          <h3 className="text-xs font-semibold text-gray-800 mb-1">参加者</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1">
            {state.participants.map((participant, index) => {
              const isCurrentParticipant = index === currentParticipantIndex
              const hasAnswered = answers[currentQuestion.id]?.[participant.id]
              
              return (
                <div
                  key={participant.id}
                  className={`p-1 rounded text-center text-xs ${
                    isCurrentParticipant
                      ? 'bg-purple-100 text-purple-800 border border-purple-500'
                      : hasAnswered
                      ? 'bg-green-50 text-green-800'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="font-medium truncate text-xs">{participant.name}</div>
                  <div className="text-xs">
                    {isCurrentParticipant ? '●' : hasAnswered ? '✓' : '○'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!answers[currentQuestion.id]?.[currentParticipant.id]}
            className={`w-full px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              answers[currentQuestion.id]?.[currentParticipant.id]
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentParticipantIndex < state.participants.length - 1
              ? '次へ'
              : currentQuestionIndex < questions.length - 1
              ? '次の質問へ'
              : '完了'}
          </button>
        </div>
      </div>
    </div>
  )
}
