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

        {/* 酒癖診断の説明 - コンパクト版 */}
        <div className="bg-white rounded-lg shadow p-2 sm:p-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Wine className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-gray-800">
                酒癖相性診断
              </h2>
              <p className="text-xs text-gray-600 leading-tight">
                心理学・神経科学に基づく6つの酒癖タイプで相性を分析
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="bg-purple-50 p-1.5 rounded">
              <h3 className="font-semibold text-purple-800 text-xs">科学的根拠</h3>
              <p className="text-xs text-purple-700 leading-tight">
                脳神経科学に基づく分類
              </p>
            </div>
            <div className="bg-pink-50 p-1.5 rounded">
              <h3 className="font-semibold text-pink-800 text-xs">診断内容</h3>
              <p className="text-xs text-pink-700 leading-tight">
                飲み会の相性を分析
              </p>
            </div>
          </div>
        </div>

        {/* 参加者追加 */}
        <div className="bg-white rounded-lg shadow p-2 sm:p-3 mb-3 sm:mb-4">
          <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-2 text-center">
            参加者を追加
          </h2>
          
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="名前"
              className="flex-1 input-field text-sm"
              maxLength={20}
            />
            <button
              onClick={handleAddParticipant}
              disabled={!participantName.trim() || state.participants.length >= 10}
              className="btn-primary px-3 py-1.5 text-xs disabled:opacity-50 flex items-center"
            >
              <Plus className="w-3 h-3 mr-1" />
              追加
            </button>
          </div>

          {/* 参加者リスト */}
          {state.participants.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-700 mb-1">
                参加者 ({state.participants.length}/10)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {state.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between bg-gray-50 p-1.5 rounded text-xs"
                  >
                    <span className="font-medium text-gray-800 truncate flex-1">
                      {participant.name}
                    </span>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="text-red-500 hover:text-red-700 p-0.5 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 開始ボタン */}
        <div className="text-center mb-3">
          <button
            onClick={handleStartQuestions}
            disabled={state.participants.length < 2}
            className={`w-full px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              state.participants.length >= 2
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {state.participants.length < 2
              ? '2人以上追加してください'
              : '診断開始'}
          </button>
        </div>

        {/* 相性診断へのリンク */}
        <div className="text-center">
          <button
            onClick={() => navigate('/compatibility')}
            className="text-xs text-blue-600 hover:underline"
          >
            他の診断も試す →
          </button>
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
