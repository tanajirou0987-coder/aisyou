import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { optimizedLoveStyleQuestions } from '../../../data/optimizedLoveStyleQuestions'
import { ArrowRight, Eye, EyeOff, Users, CheckCircle, Clock } from 'lucide-react'

export function DiagnosisPage() {
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
          console.error('Invalid session data structure:', data)
          console.error('Available keys:', Object.keys(data))
          // フォールバック: 空の参加者リスト
          setParticipants([])
        }
      } catch (error) {
        console.error('Error parsing session data:', error)
        setParticipants([])
      }
    } else {
      console.error('No session data found in localStorage')
      setParticipants([])
    }
  }, [])

  // 18問の最適化された質問データを使用
  const questionsForRender = optimizedLoveStyleQuestions
  const currentUser = participants[currentUserIndex]
  const currentQuestion = questionsForRender[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questionsForRender.length - 1
  const isLastUser = currentUserIndex === participants.length - 1

  // デバッグ用ログ
  console.log('Current state:', {
    participants,
    currentUserIndex,
    currentUser,
    participantsLength: participants.length
  })

  // 参加者が未用意 or 質問候補が空の場合のみローディング
  if (!currentUser || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">診断を準備中...</p>
          {participants.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                参加者データが見つかりません。参加者登録画面から開始してください。
              </p>
              <button
                onClick={() => navigate('/glass-session-start')}
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
              >
                参加者登録に戻る
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 既存の遅延読み込みは上の同期候補設定に置き換え済み

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId)
    // 回答選択後も選択肢を変更可能にするため、isAnswerVisibleは設定しない
  }

  const handleNextQuestion = () => {
    if (selectedAnswer && currentQuestion) {
      const option = currentQuestion.options.find(opt => opt.id === selectedAnswer)
      if (option) {
        // 回答をローカルストレージに保存
        const sessionData = JSON.parse(localStorage.getItem('glassSessionData') || '{}')
        if (!sessionData.answers) sessionData.answers = {}
        if (!sessionData.answers[currentUser.userId]) sessionData.answers[currentUser.userId] = {}
        
        sessionData.answers[currentUser.userId][currentQuestion.id] = option.value
        localStorage.setItem('glassSessionData', JSON.stringify(sessionData))
      }
    }

    if (isLastQuestion) {
      // この人の診断が完了
      if (isLastUser) {
        // 全員の診断が完了 - 結果画面へ
        navigate('/glass-results')
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <div className="mb-4">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary text-sm flex items-center gap-2 mx-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              戻る
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-200">
            <h1 className="text-3xl font-bold text-purple-600 mb-2">🍻 グラスノオト</h1>
            <p className="text-lg text-gray-600 mb-4">診断中...</p>
            <div className="bg-purple-50 rounded-2xl p-4">
              <p className="text-sm text-gray-700 font-semibold">
                回答中: <span className="text-purple-600">{currentUser.name}</span>さん
              </p>
            </div>
          </div>
        </div>

        {/* 進捗表示 */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg border-2 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">
                {currentUserIndex + 1}人中{participants.length}人目
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">
                {currentQuestionIndex + 1}/{questionsForRender.length}問目
              </span>
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentUserIndex * questionsForRender.length + currentQuestionIndex + 1) / (participants.length * questionsForRender.length)) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* プライバシー注意喚起 */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">
              プライバシーにご注意ください
            </span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            診断中は他の人に回答が見えないよう、画面を隠して回答してください
          </p>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border-2 border-purple-200">
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 bg-purple-500 text-white font-bold rounded-lg mb-4">
              Q{currentQuestionIndex + 1}
            </div>
            <h2 className="question-text text-xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.text}
            </h2>
          </div>

          {/* 回答選択肢 */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full p-4 text-left rounded-xl transition-all duration-200 font-medium ${
                  selectedAnswer === option.id
                    ? 'bg-purple-500 text-white border-2 border-purple-500'
                    : 'bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedAnswer === option.id && (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="answer-text flex-1">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* 回答選択状態の表示 */}
          {selectedAnswer && (
            <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">回答を選択しました</span>
              </div>
              <p className="text-green-700 text-sm">
                選択した回答: <strong>{currentQuestion.options.find(opt => opt.id === selectedAnswer)?.text}</strong>
              </p>
              <p className="text-green-600 text-xs mt-1">
                他の選択肢をクリックして変更できます
              </p>
            </div>
          )}
        </div>

        {/* 操作ボタン */}
        <div className="text-center">
          {selectedAnswer ? (
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
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
            <div className="text-gray-500 text-[12px] md:text-base">
              回答を選択してください
            </div>
          )}
        </div>

        {/* 画面を暗くするボタン - PC版のみ */}
        <div className="text-center mt-3 md:mt-6 hidden lg:block">
          <button
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mx-auto"
          >
            {isAnswerVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isAnswerVisible ? '回答を表示' : '回答を隠す'}
          </button>
        </div>

        {/* 参加者リスト（カード化・ステータス色） */}
        <div className="rounded-lg md:rounded-xl p-3 md:p-6 mt-3 md:mt-8 border-2 md:border-4 border-black" style={{background: '#FFFFFF', boxShadow: '4px 4px 0 #000000'}}>
          <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2 md:mb-4 text-center">
            参加者進捗
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2 md:gap-3">
            {state.groupParticipants.map((participant, index) => (
              <div
                key={participant.userId}
                className={`p-2 md:p-3 rounded-lg text-center border-2 border-black ${
                  index === currentUserIndex
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : participant.diagnosisCompleted
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-50 text-yellow-800'
                }`}
                style={{ boxShadow: '2px 2px 0 #000000' }}
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
                    : '待機'
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
