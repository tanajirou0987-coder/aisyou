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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">酒癖診断</h1>
          <p className="text-lg text-gray-600 mb-2">
            {currentParticipant.name}さんの番です
          </p>
          <p className="text-sm text-gray-500">
            質問 {currentQuestionIndex + 1} / {questions.length} | 
            参加者 {currentParticipantIndex + 1} / {state.participants.length}
          </p>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentQuestion.text}
            </h2>
            <p className="text-gray-600">
              あなたの酒癖に最も近い選択肢を選んでください
            </p>
          </div>

          {/* 回答選択肢 */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerChange(currentQuestion.id, currentParticipant.id, option.id)}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all ${
                  answers[currentQuestion.id]?.[currentParticipant.id] === option.id
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion.id]?.[currentParticipant.id] === option.id
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion.id]?.[currentParticipant.id] === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-lg font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 参加者リスト */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">参加者一覧</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {state.participants.map((participant, index) => {
              const isCurrentParticipant = index === currentParticipantIndex
              const hasAnswered = answers[currentQuestion.id]?.[participant.id]
              
              return (
                <div
                  key={participant.id}
                  className={`p-3 rounded-lg text-center ${
                    isCurrentParticipant
                      ? 'bg-purple-100 text-purple-800 border-2 border-purple-500'
                      : hasAnswered
                      ? 'bg-green-50 text-green-800 border border-green-300'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="font-medium">{participant.name}</div>
                  <div className="text-sm">
                    {isCurrentParticipant ? '回答中' : hasAnswered ? '完了' : '待機中'}
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
            className={`px-12 py-4 text-xl font-bold rounded-xl transition-all ${
              answers[currentQuestion.id]?.[currentParticipant.id]
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentParticipantIndex < state.participants.length - 1
              ? '次の参加者へ'
              : currentQuestionIndex < questions.length - 1
              ? '次の質問へ'
              : '診断完了'}
          </button>
        </div>
      </div>
    </div>
  )
}
