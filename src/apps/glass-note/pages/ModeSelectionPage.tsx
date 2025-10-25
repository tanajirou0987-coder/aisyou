import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone, QrCode, ArrowLeft, CheckCircle, Users, Clock } from 'lucide-react'

interface Couple {
  id: number
  person1: {
    name: string
    gender: 'male' | 'female' | ''
  }
  person2: {
    name: string
    gender: 'male' | 'female' | ''
  }
}

export function ModeSelectionPage() {
  const navigate = useNavigate()
  const [couples, setCouples] = useState<Couple[]>([])
  const [selectedMode, setSelectedMode] = useState<'single' | 'multi' | null>(null)

  useEffect(() => {
    // セッションデータを取得
    const sessionData = localStorage.getItem('glassSessionData')
    if (sessionData) {
      const data = JSON.parse(sessionData)
      console.log('ModeSelectionPage - Session data:', data) // デバッグ用
      
      // SessionStartPageからのデータ構造に対応
      if (data.participants && data.participants.males && data.participants.females) {
        // 個人登録データをカップル形式に変換
        const allPersons = [...data.participants.males, ...data.participants.females]
        const convertedCouples = []
        
        // 男性と女性を組み合わせてカップルを作成
        data.participants.males.forEach((male: string, maleIndex: number) => {
          data.participants.females.forEach((female: string, femaleIndex: number) => {
            convertedCouples.push({
              id: maleIndex * data.participants.females.length + femaleIndex + 1,
              person1: { name: male, gender: 'male' },
              person2: { name: female, gender: 'female' }
            })
          })
        })
        
        console.log('Converted couples:', convertedCouples) // デバッグ用
        setCouples(convertedCouples)
      } else if (data.couples) {
        // 既存のカップルデータ
        setCouples(data.couples)
      } else {
        console.error('No valid data structure found:', data)
        navigate('/glass-session-start')
      }
    } else {
      // データがない場合は参加者登録画面に戻る
      navigate('/glass-session-start')
    }
  }, [navigate])

  const handleModeSelection = (mode: 'single' | 'multi') => {
    setSelectedMode(mode)
  }

  const handleStartDiagnosis = () => {
    if (!selectedMode) return

    if (selectedMode === 'single') {
      // 1つの端末で回答モード
      // 既存のセッションデータを取得
      const existingSession = localStorage.getItem('glassSessionData')
      let sessionData = {}
      
      if (existingSession) {
        sessionData = JSON.parse(existingSession)
      }
      
      // 単一端末モード用のデータを追加
      const updatedSessionData = {
        ...sessionData,
        couples: couples,
        mode: 'single-device',
        currentPersonIndex: 0,
        answers: {}
      }
      
      console.log('Saving session data for single device:', updatedSessionData) // デバッグ用
      localStorage.setItem('glassSessionData', JSON.stringify(updatedSessionData))
      navigate('/glass-all-questions-diagnosis')
    } else {
      // QRコードで各自回答モード
      navigate('/glass-multi-device-session-start', { 
        state: { couples: couples } 
      })
    }
  }

  const handleBack = () => {
    navigate('/glass-couple-registration')
  }

  const getAllPersons = () => {
    const persons: Array<{name: string, gender: string, coupleId: number}> = []
    couples.forEach(couple => {
      persons.push(
        { name: couple.person1.name, gender: couple.person1.gender, coupleId: couple.id },
        { name: couple.person2.name, gender: couple.person2.gender, coupleId: couple.id }
      )
    })
    return persons
  }

  const totalPersons = getAllPersons().length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="btn-secondary text-sm flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              参加者登録に戻る
            </button>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">診断方法を選んでください</h2>
            <p className="text-gray-600">参加者: {totalPersons}名</p>
          </div>
        </div>

        {/* モード選択 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 1つの端末で回答 */}
          <div 
            className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all cursor-pointer ${
              selectedMode === 'single' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handleModeSelection('single')}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${
                  selectedMode === 'single' ? 'bg-blue-500' : 'bg-gray-100'
                }`}>
                  <Smartphone className={`w-8 h-8 ${
                    selectedMode === 'single' ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">1つの端末で回答</h3>
              <p className="text-gray-600 mb-4">みんなで1つのスマホを回しながら順番に回答</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>端末1つでOK</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>操作がシンプル</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>その場で盛り上がる</span>
                </div>
              </div>
            </div>
          </div>

          {/* QRコードで各自回答 */}
          <div 
            className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all cursor-pointer ${
              selectedMode === 'multi' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => handleModeSelection('multi')}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${
                  selectedMode === 'multi' ? 'bg-green-500' : 'bg-gray-100'
                }`}>
                  <QrCode className={`w-8 h-8 ${
                    selectedMode === 'multi' ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">QRコードで各自回答</h3>
              <p className="text-gray-600 mb-4">QRコードを読み込んで、各自のスマホから回答</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>同時に回答できる</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>プライバシー◎</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>全員が回答したら結果表示</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 選択されたモードの詳細説明 */}
        {selectedMode === 'single' && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              1つの端末で回答する場合の流れ
            </h3>
            <div className="space-y-3 text-sm text-blue-700">
              <div className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <p>1台のスマホを順番に回していく</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <p>「次の人へ」ボタンで回答者を切り替え</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <p>全員の診断が終わったら、その場でみんなで結果を見て盛り上がる</p>
              </div>
            </div>
          </div>
        )}

        {selectedMode === 'multi' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QRコードで各自回答する場合の流れ
            </h3>
            <div className="space-y-3 text-sm text-green-700">
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <p>主催者がQRコードを表示</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <p>参加者が各自のスマホでQRコードをスキャン</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <p>各自のスマホで診断を実施（同時進行OK！）</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <p>全員完了後、主催者の画面で結果を一括表示</p>
              </div>
            </div>
          </div>
        )}

        {/* 開始ボタン */}
        {selectedMode && (
          <div className="text-center">
            <button
              onClick={handleStartDiagnosis}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {selectedMode === 'single' ? '1つの端末で診断を始める' : 'QRコードを作成'}
            </button>
          </div>
        )}

        {/* 注意事項 */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">診断時間の目安</p>
              <ul className="space-y-1 text-xs">
                <li>• 1つの端末で回答: 約{totalPersons * 3}分（1人3分×{totalPersons}人）</li>
                <li>• QRコードで各自回答: 約5-10分（同時進行）</li>
                <li>• 結果表示: 約2-3分</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
