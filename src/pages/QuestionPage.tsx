import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getTwentyTypeQuestions } from '../data/twentyTypeQuestions'

export function QuestionPage() {
  const navigate = useNavigate()
  const { state, setQuestions, submitAnswer } = useApp()
  const [questions] = useState(() => getTwentyTypeQuestions(state.mode))
  const [answers, setAnswers] = useState<{[key: string]: {[key: string]: string}}>({})

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
    // 回答を送信
    Object.entries(answers).forEach(([questionId, participantAnswers]) => {
      Object.entries(participantAnswers).forEach(([participantId, optionId]) => {
        const question = questions.find(q => q.id === questionId)
        const option = question?.options.find(o => o.id === optionId)
        if (question && option) {
          submitAnswer(participantId, questionId, optionId, option.value)
        }
      })
    })
    navigate('/results')
  }

  const isAllAnswered = () => {
    return questions.every(question => 
      state.participants.every(participant => 
        answers[question.id]?.[participant.id]
      )
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          相性診断質問（全40問）
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {questions.map((question, index) => (
            <div key={question.id} className="card">
              <h2 className="text-lg font-semibold mb-4">
                質問 {index + 1}: {question.text}
              </h2>
              
              <div className="space-y-4">
                {state.participants.map(participant => (
                  <div key={participant.id} className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-medium mb-2 text-gray-600">
                      {participant.name}さんの回答
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option: any) => (
                        <label
                          key={option.id}
                          className="flex items-center p-2 rounded cursor-pointer bg-white border border-gray-200 hover:bg-gray-50 text-sm"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}-${participant.id}`}
                            value={option.id}
                            checked={answers[question.id]?.[participant.id] === option.id}
                            onChange={() => handleAnswerChange(question.id, participant.id, option.id)}
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">{option.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered()}
            className={`px-8 py-3 rounded-lg font-semibold ${
              isAllAnswered() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAllAnswered() ? '診断完了' : '全ての質問に回答してください'}
          </button>
        </div>
      </div>
    </div>
  )
}