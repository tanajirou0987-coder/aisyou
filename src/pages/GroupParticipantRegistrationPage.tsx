import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Plus, Trash2, Users, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'

export function GroupParticipantRegistrationPage() {
  const navigate = useNavigate()
  const { 
    state, 
    addGroupParticipant, 
    removeGroupParticipant, 
    startGroupDiagnosis,
    checkGenderBalance
  } = useApp()
  const [participantName, setParticipantName] = useState('')
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null)

  const handleAddParticipant = () => {
    if (participantName.trim() && selectedGender && state.groupParticipants.length < 10) {
      addGroupParticipant(participantName.trim(), selectedGender)
      setParticipantName('')
      setSelectedGender(null)
    }
  }

  const handleStartDiagnosis = () => {
    if (state.groupParticipants.length >= 2) {
      startGroupDiagnosis()
      navigate('/group-diagnosis')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddParticipant()
    }
  }

  const genderBalance = checkGenderBalance()
  const canStartDiagnosis = state.groupParticipants.length >= 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー（診断結果画面テイスト） */}
        <div className="text-center mb-2 md:mb-8">
          <div className="card p-2 md:hidden relative" style={{background: '#FFD700'}}>
            <div className="absolute top-1 left-2 text-xs" style={{transform: 'rotate(-15deg)'}}>POW!</div>
            <div className="absolute top-1 right-2 text-xs" style={{transform: 'rotate(15deg)'}}>BANG!</div>
            <h1 className="text-lg font-black text-black" style={{fontFamily: 'Bangers, sans-serif'}}>参加者登録</h1>
            <p className="text-[12px] font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>名前と性別を入力して追加！</p>
          </div>
          <div className="hidden md:flex justify-center items-center gap-6 mb-2">
            <span className="text-5xl" style={{transform: 'rotate(-10deg)'}}>🍺</span>
            <h1 className="heading-secondary text-5xl" style={{color: '#FF0000', WebkitTextStroke: '2px #000000', textShadow: '3px 3px 0 #FFFFFF'}}>
              参加者登録
            </h1>
            <span className="text-5xl" style={{transform: 'rotate(10deg)'}}>🍶</span>
          </div>
        </div>

        {/* 現在の参加者数表示（カード化） */}
        <div className="rounded-lg md:rounded-xl p-3 md:p-6 mb-3 md:mb-6 border-2 md:border-4 border-black" style={{background: '#FFFFFF', boxShadow: '4px 4px 0 #000000'}}>
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
            <Users className="w-5 h-5 md:w-8 md:h-8 text-purple-500" />
            <span className="text-base md:text-2xl font-bold text-gray-800">
              {state.groupParticipants.length}人登録済み
            </span>
          </div>
          <div className="text-center text-gray-600 text-xs md:text-base mb-2 md:mb-4">
            {state.groupParticipants.length < 1 
              ? '最低1人以上登録してください' 
              : state.groupParticipants.length === 1
              ? '個人診断を開始できます！'
              : genderBalance.isBalanced
              ? 'グループ診断を開始できます！'
              : '異性の参加者も登録してください'
            }
          </div>
          
          {/* 性別バランス表示 */}
          {state.groupParticipants.length > 0 && (
            <div className="text-center">
              <div className="text-xs md:text-sm text-gray-500">
                男性{genderBalance.maleCount}名、女性{genderBalance.femaleCount}名
              </div>
              {state.groupParticipants.length === 1 ? (
                <div className="text-xs md:text-sm text-blue-600 font-semibold">
                  ✓ 個人診断モード
                </div>
              ) : genderBalance.isBalanced ? (
                <div className="text-xs md:text-sm text-green-600 font-semibold">
                  ✓ 性別バランス良好
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* 参加者追加フォーム（カード化） */}
        <div className="rounded-lg md:rounded-xl p-3 md:p-8 mb-3 md:mb-6 border-2 md:border-4 border-black" style={{background: '#FFFFFF', boxShadow: '5px 5px 0 #000000'}}>
          <h2 className="text-base md:text-2xl font-black text-black mb-3 md:mb-6 text-center" style={{fontFamily: 'Bangers, sans-serif'}}>
            新しい参加者を追加
          </h2>
          
          <div className="space-y-2 md:space-y-4 mb-3 md:mb-6">
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="参加者の名前を入力"
              className="w-full text-sm md:text-lg rounded-lg border-2 md:border-3 border-black px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-0"
              maxLength={20}
            />
            
            {/* 性別選択 */}
            <div className="space-y-1 md:space-y-3">
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                性別を選択してください
              </label>
              <div className="flex gap-3 md:gap-4">
                <label className="flex items-center gap-1 md:gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={selectedGender === 'male'}
                    onChange={(e) => setSelectedGender(e.target.value as 'male')}
                    className="w-4 h-4 md:w-5 md:h-5 text-blue-600 accent-blue-600 border-2 border-black"
                  />
                  <span className="text-sm md:text-lg">♂ 男性</span>
                </label>
                <label className="flex items-center gap-1 md:gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={selectedGender === 'female'}
                    onChange={(e) => setSelectedGender(e.target.value as 'female')}
                    className="w-4 h-4 md:w-5 md:h-5 text-pink-600 accent-pink-600 border-2 border-black"
                  />
                  <span className="text-sm md:text-lg">♀ 女性</span>
                </label>
              </div>
            </div>
            
            <button
              onClick={handleAddParticipant}
              disabled={!participantName.trim() || !selectedGender || state.groupParticipants.length >= 10}
              className="w-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-extrabold disabled:opacity-50 flex items-center justify-center border-2 md:border-3 border-black text-black bg-white hover:bg-yellow-100"
              style={{ boxShadow: '3px 3px 0 #000000' }}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              追加
            </button>
          </div>

          <div className="text-center text-xs md:text-sm text-gray-500">
            最大10人まで登録できます
          </div>
        </div>

        {/* 参加者リスト（カード化） */}
        {state.groupParticipants.length > 0 && (
          <div className="rounded-lg md:rounded-xl p-3 md:p-8 mb-3 md:mb-6 border-2 md:border-4 border-black" style={{background: '#FFFFFF', boxShadow: '5px 5px 0 #000000'}}>
            <h3 className="text-sm md:text-xl font-black text-black mb-3 md:mb-6 text-center" style={{fontFamily: 'Bangers, sans-serif'}}>
              登録済み参加者一覧
            </h3>
            <div className="space-y-2 md:space-y-3">
              {state.groupParticipants.map((participant, index) => (
                <div
                  key={participant.userId}
                  className="flex items-center justify-between bg-gray-50 p-2 md:p-4 rounded-lg border-2 border-black"
                  style={{ boxShadow: '3px 3px 0 #000000' }}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>
                      {participant.registrationOrder}
                    </span>
                    <span className={`text-sm md:text-lg font-bold ${participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                      {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
                    </span>
                  </div>
                  <button
                    onClick={() => removeGroupParticipant(participant.userId)}
                    className="text-red-600 hover:text-red-700 p-1 md:p-2 border-2 border-black rounded-md bg-white"
                    style={{ boxShadow: '2px 2px 0 #000000' }}
                    title="削除"
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 診断開始ボタン（ボタン強調） */}
        <div className="text-center">
          <button
            onClick={handleStartDiagnosis}
            disabled={!canStartDiagnosis}
            className={`px-6 md:px-12 py-3 md:py-4 text-sm md:text-xl font-extrabold rounded-xl transition-all flex items-center gap-2 md:gap-3 mx-auto border-2 md:border-3 border-black ${
              canStartDiagnosis
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ boxShadow: '4px 4px 0 #000000' }}
          >
            {canStartDiagnosis ? (
              <>
                <CheckCircle className="w-4 h-4 md:w-6 md:h-6" />
                診断を開始する
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
              </>
            ) : state.groupParticipants.length < 2 ? (
              '参加者を2人以上追加してください'
            ) : (
              '異性の参加者も登録してください'
            )}
          </button>
        </div>

        {/* 性別バランス警告（カード化） */}
        {state.groupParticipants.length > 0 && !genderBalance.isBalanced && (
          <div className="rounded-lg p-3 md:p-6 mt-3 md:mt-8 border-2 md:border-4 border-black" style={{background: '#FFF3BF', boxShadow: '4px 4px 0 #000000'}}>
            <div className="flex items-center gap-2 text-yellow-900 mb-2 md:mb-3">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
              <h3 className="text-sm md:text-lg font-extrabold">
                性別バランスの注意
              </h3>
            </div>
            <p className="text-xs md:text-base text-yellow-900 font-bold">
              {genderBalance.warningMessage}
            </p>
          </div>
        )}

        {/* 使い方説明（カード化） */}
        <div className="rounded-lg p-3 md:p-6 mt-3 md:mt-8 border-2 md:border-4 border-black" style={{background: '#DBEAFE', boxShadow: '4px 4px 0 #000000'}}>
          <h3 className="text-sm md:text-lg font-extrabold text-blue-900 mb-2 md:mb-3">
            📱 使い方
          </h3>
          <div className="text-blue-900 font-bold space-y-1 md:space-y-2 text-xs md:text-base">
            <p>1. 最初の人が自分の名前と性別を入力して「追加」ボタンを押す</p>
            <p>2. 「次の人へ」と言いながら端末を次の人に渡す</p>
            <p>3. 全員の名前と性別を登録したら「診断を開始する」ボタンを押す</p>
            <p className="hidden md:block">4. 恋愛相性診断には男性と女性の両方が必要です</p>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="text-center mt-3 md:mt-6">
          <button
            onClick={() => navigate('/group-session-start')}
            className="text-gray-500 hover:text-gray-700 text-xs md:text-sm"
          >
            酒癖診断開始に戻る
          </button>
        </div>
      </div>
    </div>
  )
}
