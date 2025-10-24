import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function GenderSelectionPage() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [showError, setShowError] = useState(false)

  const handleSelection = (option: string) => {
    setSelectedOption(option)
    setShowError(false)
  }

  const handleContinue = () => {
    if (!selectedOption) {
      setShowError(true)
      return
    }

    // 同性同士の選択をチェック
    if (selectedOption === 'male-male' || selectedOption === 'female-female') {
      setShowError(true)
      return
    }

    // ココロノオト診断開始画面に遷移
    navigate('/kokoro-session-start')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-[30px] p-8 max-w-[400px] w-full text-center shadow-2xl">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-pink-600 mb-2">💕 ココロノオト</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-4">二人の性別を選んでね</h2>
          <p className="text-sm text-gray-500 mb-6">恋愛相性診断</p>
        </div>

        {/* 選択肢 */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => handleSelection('male-female')}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
              selectedOption === 'male-female'
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <div className="text-2xl mb-2">👨 男性 & 👩 女性</div>
            <div className="text-sm text-gray-600">男性が主催者</div>
          </button>

          <button
            onClick={() => handleSelection('female-male')}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
              selectedOption === 'female-male'
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <div className="text-2xl mb-2">👩 女性 & 👨 男性</div>
            <div className="text-sm text-gray-600">女性が主催者</div>
          </button>

          <button
            onClick={() => handleSelection('male-male')}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
              selectedOption === 'male-male'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="text-2xl mb-2">👨 男性 & 👨 男性</div>
            <div className="text-sm text-gray-600">同性同士</div>
          </button>

          <button
            onClick={() => handleSelection('female-female')}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
              selectedOption === 'female-female'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="text-2xl mb-2">👩 女性 & 👩 女性</div>
            <div className="text-sm text-gray-600">同性同士</div>
          </button>
        </div>

        {/* エラーメッセージ */}
        {showError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="text-red-600 font-bold">
              {selectedOption === 'male-male' || selectedOption === 'female-female'
                ? 'この診断は男女ペア専用です💕'
                : '性別を選択してください'
              }
            </div>
          </div>
        )}

        {/* 注意書き */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">※男女ペア専用の診断です</p>
          <p className="text-xs text-gray-400">
            恋愛相性診断アプリです
          </p>
        </div>

        {/* 続行ボタン */}
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:transform hover:-translate-y-1 transition-all duration-200"
        >
          診断を開始する
        </button>

        {/* 戻るボタン */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  )
}

