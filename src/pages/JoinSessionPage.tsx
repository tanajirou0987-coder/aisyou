import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Users, ArrowRight } from 'lucide-react'
import { joinSession, watchSession, SessionData } from '../utils/sessionManager'

export function JoinSessionPage() {
  const navigate = useNavigate()
  const { sessionId } = useParams<{ sessionId: string }>()
  const [userName, setUserName] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [error, setError] = useState('')

  // セッションの存在を確認
  useEffect(() => {
    if (!sessionId) return
    
    const unsubscribe = watchSession(sessionId, (data) => {
      if (!data) {
        setError('セッションが見つかりません')
      } else if (data.status === 'completed') {
        setError('このセッションは既に終了しています')
      } else {
        setSessionData(data)
      }
    })
    
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [sessionId])

  const handleJoin = async () => {
    if (!userName.trim()) {
      setError('名前を入力してください')
      return
    }
    if (!gender) {
      setError('性別を選択してください')
      return
    }
    if (!sessionId) {
      setError('セッションIDが無効です')
      return
    }

    try {
      // ユーザーIDを生成
      const userId = Math.random().toString(36).substr(2, 9)
      
      // セッションに参加
      await joinSession(sessionId, userId, userName.trim(), gender)
      
      // 診断画面へ
      navigate(`/multi-device-diagnosis/${sessionId}/${userId}`)
    } catch (err) {
      console.error(err)
      setError('参加に失敗しました')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userName && gender) {
      handleJoin()
    }
  }

  if (error && !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card" style={{background: '#FF0000', maxWidth: '500px'}}>
          <h2 className="text-3xl font-black text-white mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
            ⚠️ エラー ⚠️
          </h2>
          <p className="text-white font-bold text-lg mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            トップに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="card relative" style={{background: '#00CC44', transform: 'rotate(-2deg)'}}>
            <h1 className="heading-primary text-5xl mb-3" style={{color: '#FFFFFF', WebkitTextStroke: '3px #000000', textShadow: '5px 5px 0 #FF0000'}}>
              セッションに参加
            </h1>
            <p className="text-xl font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ {sessionData?.groupName || '飲み会'} ★
            </p>
          </div>
        </div>

        {/* 参加フォーム */}
        <div className="card mb-6" style={{background: '#FFFFFF'}}>
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-500 rounded-full border-5 border-black" style={{boxShadow: '6px 6px 0 #000000'}}>
                <Users className="w-16 h-16 text-white" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-black mb-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              あなたの情報を入力
            </h2>
            <p className="text-black font-bold">
              セッションID: <span className="text-green-600 text-xl" style={{fontFamily: 'Bangers, sans-serif'}}>{sessionId}</span>
            </p>
          </div>

          {/* 名前入力 */}
          <div className="mb-6">
            <label htmlFor="userName" className="block text-xl font-black text-black mb-3" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              👤 あなたの名前
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="例：田中太郎"
              className="w-full input-field text-xl"
              maxLength={20}
            />
          </div>

          {/* 性別選択 */}
          <div className="mb-6">
            <label className="block text-xl font-black text-black mb-3" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ⚧ 性別
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setGender('male')}
                className={`p-6 rounded-xl border-4 border-black transition-all ${
                  gender === 'male' ? 'bg-blue-500 transform scale-105' : 'bg-white hover:bg-blue-100'
                }`}
                style={{boxShadow: gender === 'male' ? '6px 6px 0 #000000' : '3px 3px 0 #000000'}}
              >
                <div className="text-5xl mb-2">♂</div>
                <div className={`text-xl font-black ${gender === 'male' ? 'text-white' : 'text-black'}`} style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  男性
                </div>
              </button>
              
              <button
                onClick={() => setGender('female')}
                className={`p-6 rounded-xl border-4 border-black transition-all ${
                  gender === 'female' ? 'bg-pink-500 transform scale-105' : 'bg-white hover:bg-pink-100'
                }`}
                style={{boxShadow: gender === 'female' ? '6px 6px 0 #000000' : '3px 3px 0 #000000'}}
              >
                <div className="text-5xl mb-2">♀</div>
                <div className={`text-xl font-black ${gender === 'female' ? 'text-white' : 'text-black'}`} style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  女性
                </div>
              </button>
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mb-4 p-4 rounded-lg border-3 border-red-600" style={{background: '#FFE4E4'}}>
              <p className="text-red-600 font-bold text-center">⚠️ {error}</p>
            </div>
          )}

          {/* 参加ボタン */}
          <div className="text-center">
            <button
              onClick={handleJoin}
              className={`btn-primary px-12 py-4 text-2xl flex items-center gap-3 mx-auto ${
                !userName || !gender ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!userName || !gender}
            >
              🍺 参加する 🍺
              <ArrowRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* 説明 */}
        <div className="card" style={{background: '#FFE4B5'}}>
          <h3 className="text-xl font-black text-black mb-3" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
            📝 参加後の流れ
          </h3>
          <div className="space-y-2 text-black font-bold">
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <p>診断画面に移動します</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <p>主催者が「診断開始」を押すまで待機</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <p>全員で同時に質問に答えます</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <p>全員が回答したら自動的に次の質問へ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}









