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
    <div className="w-full h-full overflow-y-auto scrollable-area" style={{height: 'calc(var(--vh, 1vh) * 100)'}}>
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="heading-kawaii-primary">
            💕 ココロノオト質問 💕
          </h1>
          <p className="text-lg kawaii-light-pink font-medium">
            全40問の質問に答えて、あなたのココロノオトを分析しましょう
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {questions.map((question, index) => (
            <div key={question.id} className="card-kawaii">
              <h2 className="heading-kawaii-secondary mb-4">
                💭 質問 {index + 1}: {question.text}
              </h2>
              
              <div className="space-y-4">
                {state.participants.map(participant => (
                  <div key={participant.id} className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border-2 border-kawaii-light-pink/30">
                    <h3 className="text-sm font-semibold mb-3 kawaii-pink">
                      ✨ {participant.name}さんの回答
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option: any) => (
                        <label
                          key={option.id}
                          className="flex items-center p-3 rounded-2xl cursor-pointer bg-white/80 border-2 border-kawaii-light-pink/30 hover:border-kawaii-pink/50 hover:bg-white/90 text-sm transition-all duration-300"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}-${participant.id}`}
                            value={option.id}
                            checked={answers[question.id]?.[participant.id] === option.id}
                            onChange={() => handleAnswerChange(question.id, participant.id, option.id)}
                            className="form-radio h-4 w-4 text-kawaii-pink"
                          />
                          <span className="ml-3 text-gray-700 font-medium">{option.text}</span>
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
            className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
              isAllAnswered() 
                ? 'btn-kawaii-primary' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAllAnswered() ? '✨ 診断完了 ✨' : '👥 全ての質問に回答してください'}
          </button>
        </div>
      </div>
    </div>
  )
}