import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { optimizedLoveStyleQuestions } from '../../../data/optimizedLoveStyleQuestions'
import { ArrowRight, Users, CheckCircle, Clock, RotateCcw } from 'lucide-react'

export function AllQuestionsDiagnosisPage() {
  const navigate = useNavigate()
  const { 
    state, 
    setQuestions, 
    submitGroupAnswer, 
    completeUserDiagnosis,
    calculateGroupResults 
  } = useApp()
  
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPersonChangeScreen, setShowPersonChangeScreen] = useState(false)

  // セッションデータから参加者情報を取得
  const [sessionData, setSessionData] = useState<any>(null)
  const [participants, setParticipants] = useState<any[]>([])
  
  useEffect(() => {
    const storedSession = localStorage.getItem('glassSessionData')
    console.log('Raw localStorage data:', storedSession) // デバッグ用
    
    if (storedSession) {
      try {
        const data = JSON.parse(storedSession)
        setSessionData(data)
        
        console.log('Parsed session data:', data) // デバッグ用
        console.log('Data structure check:', {
          hasParticipants: !!data.participants,
          hasMales: !!(data.participants && data.participants.males),
          hasFemales: !!(data.participants && data.participants.females),
          hasCouples: !!data.couples,
          hasAllPersons: !!data.allPersons,
          participants: data.participants,
          couples: data.couples,
          allPersons: data.allPersons
        })
        
        // 参加者リストを生成
        if (data.participants && data.participants.males && data.participants.females) {
          // SessionStartPageからのデータ構造
          console.log('Using participants structure')
          const allPersons = [...data.participants.males, ...data.participants.females]
          const participantList = allPersons.map((name: string, index: number) => ({
            userId: `user_${index}`,
            name: name,
            gender: data.participants.males.includes(name) ? 'male' : 'female'
          }))
          console.log('Generated participants:', participantList) // デバッグ用
          setParticipants(participantList)
        } else if (data.couples && Array.isArray(data.couples)) {
          // ModeSelectionPageからのデータ構造（couples）
          console.log('Using couples structure')
          const allPersons: string[] = []
          data.couples.forEach((couple: any) => {
            if (couple.person1 && couple.person1.name) {
              allPersons.push(couple.person1.name)
            }
            if (couple.person2 && couple.person2.name) {
              allPersons.push(couple.person2.name)
            }
          })
          const participantList = allPersons.map((name: string, index: number) => ({
            userId: `user_${index}`,
            name: name,
            gender: 'unknown' // couplesからは性別を判定できない
          }))
          console.log('Generated participants from couples:', participantList) // デバッグ用
          setParticipants(participantList)
        } else if (data.allPersons && Array.isArray(data.allPersons)) {
          // その他のデータ構造
          console.log('Using allPersons structure')
          const participantList = data.allPersons.map((name: string, index: number) => ({
            userId: `user_${index}`,
            name: name,
            gender: 'unknown'
          }))
          console.log('Generated participants from allPersons:', participantList) // デバッグ用
          setParticipants(participantList)
        } else {
          console.error('No valid participant data structure found')
          console.log('Available data keys:', Object.keys(data))
        }
      } catch (error) {
        console.error('Error parsing session data:', error)
      }
    } else {
      console.error('No session data found in localStorage')
    }
  }, [])

  // 現在の参加者
  const currentParticipant = participants[currentUserIndex]
  
  // 質問データを設定
  useEffect(() => {
    setQuestions(optimizedLoveStyleQuestions)
  }, [setQuestions])

  // 回答選択
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))
  }

  // 診断完了
  const handleCompleteDiagnosis = async () => {
    if (isSubmitting) return
    
    // 全問回答済みかチェック
    const unansweredQuestions = optimizedLoveStyleQuestions.filter(q => !answers[q.id])
    if (unansweredQuestions.length > 0) {
      alert(`${unansweredQuestions.length}問が未回答です。すべての質問に回答してください。`)
      return
    }

    setIsSubmitting(true)
    
    try {
      // 回答データを整理
      const answerData = Object.entries(answers).map(([questionId, answerId]) => ({
        questionId,
        optionId: answerId,
        value: optimizedLoveStyleQuestions
          .find(q => q.id === questionId)
          ?.options.find(o => o.id === answerId)?.value || 0,
        timestamp: Date.now()
      }))

      console.log('Submitting answers for user:', currentParticipant?.name)
      console.log('Answer data:', answerData)

      // 回答を送信
      await submitGroupAnswer(currentUserIndex, answerData)
      
      // ユーザーの診断を完了としてマーク
      await completeUserDiagnosis(currentUserIndex)
      
      // 次の参加者へ
      if (currentUserIndex < participants.length - 1) {
        // 回答者切り替え画面を表示
        setShowPersonChangeScreen(true)
        setIsSubmitting(false)
      } else {
        // 全員の診断完了
        console.log('All participants completed diagnosis')
        
        // 結果計算（高速化）
        try {
          const results = await calculateGroupResults()
          console.log('Group results calculated:', results)
          
          // 結果画面へ遷移
          navigate('/glass-results')
        } catch (error) {
          console.error('Error calculating results:', error)
          // エラーが発生しても結果画面に遷移（フォールバック処理）
          navigate('/glass-results')
        }
      }
    } catch (error) {
      console.error('Error completing diagnosis:', error)
      setIsSubmitting(false)
    }
  }

  // 前の参加者へ戻る
  const handlePreviousUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1)
      setAnswers({})
      setShowPersonChangeScreen(false)
    }
  }

  // 次の参加者へ進む（回答者切り替え画面から）
  const handleNextPerson = () => {
    setCurrentUserIndex(prev => prev + 1)
    setAnswers({})
    setShowPersonChangeScreen(false)
  }

  // 進捗計算
  const progress = ((currentUserIndex + 1) / participants.length) * 100
  const answeredCount = Object.keys(answers).length
  const totalQuestions = optimizedLoveStyleQuestions.length

  if (!currentParticipant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">参加者情報を読み込み中...</p>
        </div>
      </div>
    )
  }

  // 回答者切り替え画面
  if (showPersonChangeScreen) {
    const nextParticipant = participants[currentUserIndex + 1]
    const nextUserIndex = currentUserIndex + 1

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        {/* 背景のキラキラ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] text-4xl opacity-30 animate-bounce" style={{ animationDelay: '0s' }}>
            ✨
          </div>
          <div className="absolute top-[20%] right-[15%] text-4xl opacity-30 animate-bounce" style={{ animationDelay: '1s' }}>
            💫
          </div>
          <div className="absolute bottom-[15%] left-[20%] text-4xl opacity-30 animate-bounce" style={{ animationDelay: '2s' }}>
            ⭐
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl animate-slide-up">
          {/* 切り替えアイコン */}
          <div className="text-8xl mb-6 animate-spin-slow">
            🔄
          </div>
          
          {/* タイトル */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            回答者交代！
          </h2>
          
          {/* 次の回答者カード */}
          <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-8 mb-8 shadow-lg">
            <p className="text-sm font-medium text-orange-700 mb-3">
              次の回答者
            </p>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-pulse">
              {nextParticipant?.name}
            </h1>
            <p className="text-lg font-bold text-gray-800">
              さんの番です
            </p>
          </div>
          
          {/* 案内テキスト */}
          <div className="mb-6">
            <p className="text-base font-medium text-gray-600">
              📱 端末を次の人に渡してください
            </p>
          </div>
          
          {/* 進捗情報 */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-500">
              <span className="text-indigo-600 font-bold">{nextUserIndex + 1}</span>人目 / 全<span className="text-indigo-600 font-bold">{participants.length}</span>人
            </p>
          </div>
          
          {/* 準備OKボタン */}
          <button
            onClick={handleNextPerson}
            className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            準備OK！質問を開始する
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-purple-600">
                🍻 グラスノオト診断
              </h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">進捗</div>
              <div className="text-lg font-bold text-purple-600">
                {currentUserIndex + 1} / {participants.length}人
              </div>
            </div>
          </div>
          
          {/* 進捗バー */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* 現在の参加者情報 */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  currentParticipant.gender === 'male' ? 'bg-blue-500' : 
                  currentParticipant.gender === 'female' ? 'bg-pink-500' : 'bg-gray-500'
                }`}>
                  {currentParticipant.gender === 'male' ? '♂' : 
                   currentParticipant.gender === 'female' ? '♀' : '?'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {currentParticipant.name}さんの診断
                  </h2>
                  <p className="text-sm text-gray-600">
                    18問すべてに回答してください
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">回答済み</div>
                <div className="text-lg font-bold text-green-600">
                  {answeredCount} / {totalQuestions}問
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 質問一覧 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            恋愛相性診断（18問）
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {optimizedLoveStyleQuestions.map((question, index) => (
              <div key={question.id} className="border-2 border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-500 text-white font-bold rounded-full flex items-center justify-center text-sm">
                    Q{index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {question.category}
                  </span>
                </div>
                
                <h4 className="text-sm font-bold text-gray-800 mb-3 leading-relaxed">
                  {question.text}
                </h4>
                
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(question.id, option.id)}
                      className={`w-full p-2 text-left rounded-lg transition-all duration-200 text-xs ${
                        answers[question.id] === option.id
                          ? 'bg-purple-500 text-white border-2 border-purple-500'
                          : 'bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {answers[question.id] === option.id && (
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousUser}
            disabled={currentUserIndex === 0}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
              currentUserIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            ← 前の参加者
          </button>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">
              {answeredCount === totalQuestions ? '✅ 全問回答済み' : `${totalQuestions - answeredCount}問未回答`}
            </div>
            <button
              onClick={handleCompleteDiagnosis}
              disabled={answeredCount !== totalQuestions || isSubmitting}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-200 ${
                answeredCount === totalQuestions && !isSubmitting
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  処理中...
                </div>
              ) : currentUserIndex < participants.length - 1 ? (
                '次の参加者へ →'
              ) : (
                '診断完了 →'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
