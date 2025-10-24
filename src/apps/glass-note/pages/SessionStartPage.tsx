import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Users, ArrowRight, CheckCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react'

interface Participant {
  id: number
  name: string
  gender: 'male' | 'female'
}

export function SessionStartPage() {
  const navigate = useNavigate()
  const [maleParticipants, setMaleParticipants] = useState<Participant[]>([
    { id: 1, name: '', gender: 'male' }
  ])
  const [femaleParticipants, setFemaleParticipants] = useState<Participant[]>([
    { id: 1, name: '', gender: 'female' }
  ])
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const addParticipant = (gender: 'male' | 'female') => {
    const participants = gender === 'male' ? maleParticipants : femaleParticipants
    const newParticipant: Participant = {
      id: Math.max(...participants.map(p => p.id), 0) + 1,
      name: '',
      gender
    }
    
    if (gender === 'male') {
      setMaleParticipants([...maleParticipants, newParticipant])
    } else {
      setFemaleParticipants([...femaleParticipants, newParticipant])
    }
  }

  const removeParticipant = (gender: 'male' | 'female', participantId: number) => {
    const participants = gender === 'male' ? maleParticipants : femaleParticipants
    if (participants.length > 1) {
      if (gender === 'male') {
        setMaleParticipants(maleParticipants.filter(p => p.id !== participantId))
      } else {
        setFemaleParticipants(femaleParticipants.filter(p => p.id !== participantId))
      }
    }
  }

  const updateParticipant = (gender: 'male' | 'female', participantId: number, name: string) => {
    if (gender === 'male') {
      setMaleParticipants(maleParticipants.map(p => 
        p.id === participantId ? { ...p, name } : p
      ))
    } else {
      setFemaleParticipants(femaleParticipants.map(p => 
        p.id === participantId ? { ...p, name } : p
      ))
    }
  }

  const getValidParticipants = (participants: Participant[]) => {
    return participants.filter(p => p.name.trim())
  }

  const getCombinationCount = () => {
    const validMales = getValidParticipants(maleParticipants)
    const validFemales = getValidParticipants(femaleParticipants)
    return validMales.length * validFemales.length
  }

  const getAllCombinations = () => {
    const validMales = getValidParticipants(maleParticipants)
    const validFemales = getValidParticipants(femaleParticipants)
    const combinations = []
    
    validMales.forEach(male => {
      validFemales.forEach(female => {
        combinations.push({ male: male.name, female: female.name })
      })
    })
    
    return combinations
  }

  const validateParticipants = (): boolean => {
    const validMales = getValidParticipants(maleParticipants)
    const validFemales = getValidParticipants(femaleParticipants)
    
    if (validMales.length === 0) {
      setErrorMessage('男性参加者を最低1人入力してください')
      return false
    }
    
    if (validFemales.length === 0) {
      setErrorMessage('女性参加者を最低1人入力してください')
      return false
    }
    
    return true
  }

  const handleNext = () => {
    setShowError(false)
    setErrorMessage('')

    if (!validateParticipants()) {
      setShowError(true)
      return
    }

    // セッションデータを保存
    const validMales = getValidParticipants(maleParticipants)
    const validFemales = getValidParticipants(femaleParticipants)
    const allPersons = [...validMales.map(p => p.name), ...validFemales.map(p => p.name)]
    const combinations = getAllCombinations()
    
    const sessionData = {
      participants: {
        males: validMales.map(p => p.name),
        females: validFemales.map(p => p.name)
      },
      allPersons,
      combinations,
      mode: 'registration-complete'
    }
    localStorage.setItem('glassSessionData', JSON.stringify(sessionData))
    
    // 診断モード選択画面へ遷移
    navigate('/glass-mode-selection')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
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
            <h1 className="app-title text-3xl font-bold text-purple-600 mb-2">🍻 グラスノオト</h1>
            <p className="subtitle text-lg text-gray-600 mb-4">お酒の場で楽しむ相性診断</p>
            <div className="bg-purple-50 rounded-2xl p-4">
              <p className="text-sm text-gray-700 mb-2">参加する人の名前と性別を入力してください</p>
              <p className="text-xs text-purple-600 font-semibold">※男女の全組み合わせを診断します</p>
          </div>
          </div>
        </div>

        {/* 参加者入力フォーム */}
        <div className="space-y-6 mb-8">
          {/* 男性参加者 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            <h3 className="section-title text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              👨 男性参加者
            </h3>
            <div className="space-y-3">
              {maleParticipants.map((participant) => (
                <div key={participant.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="名前（例：田中太郎）"
                    value={participant.name}
                    onChange={(e) => updateParticipant('male', participant.id, e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  {maleParticipants.length > 1 && (
                    <button
                      onClick={() => removeParticipant('male', participant.id)}
                      className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
              </div>
              ))}
            </div>
            <button
              onClick={() => addParticipant('male')}
              className="w-full mt-3 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              男性を追加
            </button>
          </div>

          {/* 女性参加者 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200">
            <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
              👩 女性参加者
            </h3>
            <div className="space-y-3">
              {femaleParticipants.map((participant) => (
                <div key={participant.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="名前（例：佐藤花子）"
                    value={participant.name}
                    onChange={(e) => updateParticipant('female', participant.id, e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                  />
                  {femaleParticipants.length > 1 && (
            <button 
                      onClick={() => removeParticipant('female', participant.id)}
                      className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              </div>
            <button 
              onClick={() => addParticipant('female')}
              className="w-full mt-3 py-3 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              女性を追加
            </button>
          </div>
          </div>

        {/* 組み合わせプレビュー */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-yellow-200">
          <div className="text-center">
            <h3 className="text-lg font-bold text-orange-600 mb-2">診断する組み合わせ</h3>
            <p className="text-2xl font-bold text-orange-700 mb-4">
              {getCombinationCount()} 通り
            </p>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? '詳細を隠す' : '詳細を見る'}
            </button>
          </div>

          {showPreview && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {getAllCombinations().map((combo, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-sm font-medium text-gray-700 border border-orange-200">
                    {combo.male} & {combo.female}
                </div>
                ))}
              </div>
            </div>
          )}
                </div>

        {/* エラーメッセージ */}
        {showError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
            <div className="flex items-center gap-2 text-red-600 font-bold">
              <AlertTriangle className="w-5 h-5" />
              {errorMessage}
              </div>
            </div>
          )}

        {/* アクションボタン */}
            <div className="text-center">
              <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
              >
            次へ（診断モード選択）
            <ArrowRight className="w-5 h-5" />
              </button>
        </div>

        {/* 注意事項 */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">注意事項</p>
              <ul className="space-y-1 text-xs">
                <li>• 男性・女性それぞれ最低1人以上必要です</li>
                <li>• 登録した男女の全組み合わせを診断します</li>
                <li>• 例：男性3人・女性3人 → 9通りの組み合わせ全て診断</li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>

  )
}
