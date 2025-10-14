import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Wine, Plus, Trash2 } from 'lucide-react'

export function DrinkingHomePage() {
  const navigate = useNavigate()
  const { state, addParticipant, removeParticipant, resetApp } = useApp()
  const [participantName, setParticipantName] = useState('')

  const handleAddParticipant = () => {
    if (participantName.trim() && state.participants.length < 10) {
      addParticipant(participantName.trim())
      setParticipantName('')
    }
  }

  const handleStartQuestions = () => {
    if (state.participants.length >= 2) {
      navigate('/drinking-questions')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddParticipant()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="mb-2 sm:mb-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm flex items-center gap-1 mx-auto"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ミチノワトップに戻る
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            酒癖マッチング
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">
            科学的根拠に基づいた酒癖タイプ診断で、飲み会での相性を分析します
          </p>
        </div>

        {/* 酒癖診断の説明 */}
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-5 md:p-6 mb-4 sm:mb-6">
          <div className="text-center mb-3 sm:mb-4">
            <Wine className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-purple-500 mx-auto mb-2 sm:mb-3" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              酒癖相性診断とは？
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug px-2">
              アルコール摂取時の性格変化に関する心理学・神経科学の知見に基づいて、
              参加者の酒癖タイプを6つの科学的カテゴリに分類し、
              その組み合わせでの相性を分析します。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-1 text-xs sm:text-sm">科学的根拠</h3>
              <p className="text-xs text-purple-700 leading-snug">
                アルコールの抑制解除効果、前頭前野機能の変化、
                GABA受容体の活性化など、神経科学的メカニズムに基づく分類
              </p>
            </div>
            <div className="bg-pink-50 p-2 sm:p-3 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-1 text-xs sm:text-sm">診断内容</h3>
              <p className="text-xs text-pink-700 leading-snug">
                飲み会での相性、恋愛の可能性、おすすめの活動、
                コミュニケーションのコツなどを分析
              </p>
            </div>
          </div>
        </div>

        {/* 参加者追加 */}
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-5 md:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 text-center">
            参加者を追加してください
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="参加者の名前を入力"
              className="flex-1 input-field text-sm sm:text-base"
              maxLength={20}
            />
            <button
              onClick={handleAddParticipant}
              disabled={!participantName.trim() || state.participants.length >= 10}
              className="btn-primary px-4 sm:px-5 py-2 text-sm sm:text-base disabled:opacity-50 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              追加
            </button>
          </div>

          {/* 参加者リスト */}
          {state.participants.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                参加者一覧 ({state.participants.length}/10)
              </h3>
              <div className="grid gap-1.5 sm:gap-2">
                {state.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg"
                  >
                    <span className="text-sm sm:text-base font-medium text-gray-800">
                      {participant.name}
                    </span>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="text-red-500 hover:text-red-700 p-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 開始ボタン */}
        <div className="text-center mb-4 sm:mb-6">
          <button
            onClick={handleStartQuestions}
            disabled={state.participants.length < 2}
            className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold rounded-xl transition-all ${
              state.participants.length >= 2
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {state.participants.length < 2
              ? '参加者を2人以上追加してください'
              : '酒癖診断を開始する'}
          </button>
        </div>

        {/* 相性診断へのリンク */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">他の診断も試してみませんか？</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 px-2">
              一般的な恋愛・友達関係の相性を知りたい方は、相性診断もお試しください
            </p>
            <button
              onClick={() => navigate('/compatibility')}
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-blue-500 text-white px-5 sm:px-6 py-2 text-xs sm:text-sm rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              相性診断を試す
            </button>
          </div>
        </div>

        {/* リセットボタン */}
        {state.participants.length > 0 && (
          <div className="text-center mt-3 sm:mt-4">
            <button
              onClick={resetApp}
              className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm"
            >
              最初からやり直す
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
