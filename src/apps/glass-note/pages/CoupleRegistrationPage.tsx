import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Users, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'

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

export function CoupleRegistrationPage() {
  const navigate = useNavigate()
  const [couples, setCouples] = useState<Couple[]>([
    {
      id: 1,
      person1: { name: '', gender: '' },
      person2: { name: '', gender: '' }
    }
  ])
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const addCouple = () => {
    const newCouple: Couple = {
      id: Math.max(...couples.map(c => c.id), 0) + 1,
      person1: { name: '', gender: '' },
      person2: { name: '', gender: '' }
    }
    setCouples([...couples, newCouple])
  }

  const removeCouple = (coupleId: number) => {
    if (couples.length > 1) {
      setCouples(couples.filter(c => c.id !== coupleId))
    }
  }

  const updateCouple = (coupleId: number, person: 'person1' | 'person2', field: 'name' | 'gender', value: string) => {
    setCouples(couples.map(couple =>
      couple.id === coupleId
        ? {
            ...couple,
            [person]: {
              ...couple[person],
              [field]: value
            }
          }
        : couple
    ))
  }

  const validateCouples = (): boolean => {
    for (const couple of couples) {
      if (!couple.person1.name.trim() || !couple.person2.name.trim()) {
        setErrorMessage('すべての参加者の名前を入力してください')
        return false
      }
      if (!couple.person1.gender || !couple.person2.gender) {
        setErrorMessage('すべての参加者の性別を選択してください')
        return false
      }
      if (couple.person1.gender === couple.person2.gender) {
        setErrorMessage('各カップルは異なる性別である必要があります')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    setShowError(false)
    setErrorMessage('')

    if (!validateCouples()) {
      setShowError(true)
      return
    }

    // セッションデータを保存
    const sessionData = {
      couples: couples,
      mode: 'couple-registration-complete'
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
              onClick={() => navigate('/glass-session-start')}
              className="btn-secondary text-sm flex items-center gap-2 mx-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              戻る
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-200">
            <h1 className="text-3xl font-bold text-purple-600 mb-2">🍻 グラスノオト</h1>
            <p className="text-lg text-gray-600 mb-4">カップル登録</p>
            <div className="bg-purple-50 rounded-2xl p-4">
              <p className="text-sm text-gray-700 mb-2">診断するカップルを登録してください</p>
              <p className="text-xs text-purple-600 font-semibold">※各カップルは異なる性別である必要があります</p>
            </div>
          </div>
        </div>

        {/* カップル登録フォーム */}
        <div className="space-y-6 mb-8">
          {couples.map((couple) => (
            <div key={couple.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  カップル {couple.id}
                </h3>
                {couples.length > 1 && (
                  <button
                    onClick={() => removeCouple(couple.id)}
                    className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1人目 */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-600">1人目</label>
                  <input
                    type="text"
                    placeholder="名前（例：田中太郎）"
                    value={couple.person1.name}
                    onChange={(e) => updateCouple(couple.id, 'person1', 'name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <select
                    value={couple.person1.gender}
                    onChange={(e) => updateCouple(couple.id, 'person1', 'gender', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">性別を選択</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                  </select>
                </div>

                {/* 2人目 */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-600">2人目</label>
                  <input
                    type="text"
                    placeholder="名前（例：佐藤花子）"
                    value={couple.person2.name}
                    onChange={(e) => updateCouple(couple.id, 'person2', 'name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <select
                    value={couple.person2.gender}
                    onChange={(e) => updateCouple(couple.id, 'person2', 'gender', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">性別を選択</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* カップル追加ボタン */}
        <div className="mb-8">
          <button
            onClick={addCouple}
            className="w-full py-3 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            カップルを追加
          </button>
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
                <li>• 各カップルは異なる性別である必要があります</li>
                <li>• すべての参加者の名前と性別を入力してください</li>
                <li>• 登録したカップル数分の診断が行われます</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

