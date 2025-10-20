import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Heart, Users, Plus, Trash2 } from 'lucide-react'
import { RelationshipStatus, DatingDuration } from '../types/relationshipStage'
import { PageLayout } from '../layouts/PageLayout'

export function HomePage() {
  const navigate = useNavigate()
  const { state, setMode, addParticipant, removeParticipant, resetApp, setRelationshipStage } = useApp()
  const [participantName, setParticipantName] = useState('')
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus>('before_dating')
  const [datingDuration, setDatingDuration] = useState<DatingDuration>('less_than_3m')

  const handleAddParticipant = () => {
    if (participantName.trim() && state.participants.length < 10) {
      addParticipant(participantName.trim())
      setParticipantName('')
    }
  }

  const handleStartQuestions = () => {
    if (state.participants.length >= 2) {
      // 関係ステージをコンテキストに保存
      setRelationshipStage(
        relationshipStatus,
        relationshipStatus === 'dating' ? datingDuration : undefined
      )
      navigate('/questions')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddParticipant()
    }
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="kawaii-light-pink hover:kawaii-pink text-sm flex items-center gap-2 mx-auto transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              すきのおとトップに戻る
            </button>
          </div>
          <div className="relative">
            <h1 className="heading-kawaii-primary">
              💕 ココロノオト 💕
            </h1>
            <div className="absolute -top-2 -right-2 text-2xl animate-kawaii-heart">✨</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-kawaii-heart">💖</div>
          </div>
          <p className="text-lg kawaii-light-pink font-medium">
            心理学理論に基づいたココロノオトで、あなたの関係性を分析します
          </p>
        </div>

        {/* モード選択 */}
        <div className="card-kawaii mb-8">
          <h2 className="heading-kawaii-secondary text-center mb-6">
            🎯 診断モードを選択してください
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setMode('romance')}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                state.mode === 'romance'
                  ? 'btn-kawaii-primary'
                  : 'bg-white/50 text-kawaii-pink hover:bg-white/80 border-2 border-kawaii-light-pink'
              }`}
            >
              <Heart className="w-6 h-6" />
              💕 恋愛相性
            </button>
            <button
              onClick={() => setMode('friendship')}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                state.mode === 'friendship'
                  ? 'btn-kawaii-secondary'
                  : 'bg-white/50 text-kawaii-purple hover:bg-white/80 border-2 border-kawaii-light-pink'
              }`}
            >
              <Users className="w-6 h-6" />
              👥 友達相性
            </button>
          </div>
        </div>

        {/* 参加者追加 */}
        <div className="card-kawaii mb-8">
          <h2 className="heading-kawaii-secondary text-center mb-6">
            👥 参加者を追加してください
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="参加者の名前を入力"
              className="flex-1 input-kawaii text-lg"
              maxLength={20}
            />
            <button
              onClick={handleAddParticipant}
              disabled={!participantName.trim() || state.participants.length >= 10}
              className="btn-kawaii-primary px-6 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5 mr-2" />
              ✨ 追加
            </button>
          </div>

          {/* 参加者リスト */}
          {state.participants.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold kawaii-pink text-center">
                👥 参加者一覧 ({state.participants.length}/10)
              </h3>
              <div className="grid gap-3">
                {state.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between bg-white/60 backdrop-blur-sm p-4 rounded-2xl border-2 border-kawaii-light-pink/30 hover:border-kawaii-pink/50 transition-all duration-300"
                  >
                    <span className="text-lg font-medium kawaii-pink">
                      ✨ {participant.name}
                    </span>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="text-kawaii-pink hover:text-red-500 p-2 transition-colors duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 関係ステージ選択 */}
        <div className="card-kawaii mb-8">
          <h2 className="heading-kawaii-secondary text-center mb-6">
            💕 あなたたちの関係性を教えてください
          </h2>
          
          {/* 関係性選択 */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setRelationshipStatus('before_dating')}
                className={`flex-1 max-w-xs px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                  relationshipStatus === 'before_dating'
                    ? 'btn-kawaii-primary'
                    : 'bg-white/50 text-kawaii-pink hover:bg-white/80 border-2 border-kawaii-light-pink'
                }`}
              >
                💖 付き合う前
              </button>
              <button
                onClick={() => setRelationshipStatus('dating')}
                className={`flex-1 max-w-xs px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                  relationshipStatus === 'dating'
                    ? 'btn-kawaii-primary'
                    : 'bg-white/50 text-kawaii-pink hover:bg-white/80 border-2 border-kawaii-light-pink'
                }`}
              >
                💕 付き合っている
              </button>
            </div>
          </div>

          {/* 交際期間選択（付き合っている場合のみ表示） */}
          {relationshipStatus === 'dating' && (
            <div className="animate-fadeIn">
              <h3 className="text-lg font-semibold kawaii-pink mb-4 text-center">
                ⏰ 交際期間を選択してください
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDatingDuration('less_than_3m')}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    datingDuration === 'less_than_3m'
                      ? 'btn-kawaii-secondary'
                      : 'bg-white/50 text-kawaii-purple hover:bg-white/80 border-2 border-kawaii-light-pink'
                  }`}
                >
                  💕 3ヶ月未満
                </button>
                <button
                  onClick={() => setDatingDuration('3m_to_1y')}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    datingDuration === '3m_to_1y'
                      ? 'btn-kawaii-secondary'
                      : 'bg-white/50 text-kawaii-purple hover:bg-white/80 border-2 border-kawaii-light-pink'
                  }`}
                >
                  💖 3ヶ月〜1年未満
                </button>
                <button
                  onClick={() => setDatingDuration('1y_to_3y')}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    datingDuration === '1y_to_3y'
                      ? 'btn-kawaii-secondary'
                      : 'bg-white/50 text-kawaii-purple hover:bg-white/80 border-2 border-kawaii-light-pink'
                  }`}
                >
                  💝 1年〜3年未満
                </button>
                <button
                  onClick={() => setDatingDuration('over_3y')}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    datingDuration === 'over_3y'
                      ? 'btn-kawaii-secondary'
                      : 'bg-white/50 text-kawaii-purple hover:bg-white/80 border-2 border-kawaii-light-pink'
                  }`}
                >
                  💗 3年以上
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 開始ボタン */}
        <div className="text-center">
          <button
            onClick={handleStartQuestions}
            disabled={state.participants.length < 2}
            className={`px-12 py-4 text-xl font-bold rounded-2xl transition-all duration-300 ${
              state.participants.length >= 2
                ? 'btn-kawaii-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {state.participants.length < 2
              ? '👥 参加者を2人以上追加してください'
              : '✨ 診断を開始する ✨'}
          </button>
        </div>

        {/* グラスノオトへのリンク */}
        <div className="text-center mt-8">
          <div className="card-kawaii">
            <h3 className="heading-kawaii-secondary mb-4">🍷 他の診断も試してみませんか？</h3>
            <p className="kawaii-light-pink mb-6 font-medium">
              飲み会での相性や酒癖タイプを知りたい方は、グラスノオトもお試しください
            </p>
            <button
              onClick={() => navigate('/drinking')}
              className="btn-kawaii-secondary px-8 py-3 text-lg font-semibold"
            >
              🍻 グラスノオトを試す
            </button>
          </div>
        </div>

        {/* リセットボタン */}
        {state.participants.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={resetApp}
              className="kawaii-light-pink hover:kawaii-pink text-sm transition-colors duration-300"
            >
              🔄 最初からやり直す
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  )
}







