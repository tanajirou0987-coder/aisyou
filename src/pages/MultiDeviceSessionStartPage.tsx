import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, Users, Copy, Check, PlayCircle } from 'lucide-react'
import { createSession, watchSession, updateSessionStatus, joinSession, SessionData } from '../utils/sessionManager'

export function MultiDeviceSessionStartPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const groupName = location.state?.groupName || '今夜の飲み会'
  
  // セッションIDを生成（ランダムな6桁の英数字）
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 6).toUpperCase())
  const [hostUserId] = useState(() => Math.random().toString(36).substr(2, 9))
  const [copied, setCopied] = useState(false)
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [participantList, setParticipantList] = useState<any[]>([])
  
  // 主催者の情報
  const [hostName, setHostName] = useState('')
  const [hostGender, setHostGender] = useState<'male' | 'female' | ''>('')
  const [isHostRegistered, setIsHostRegistered] = useState(false)
  
  // セッションURLを生成
  const sessionUrl = `${window.location.origin}/join-session/${sessionId}`
  
  // セッションを作成
  useEffect(() => {
    createSession(sessionId, groupName).catch(console.error)
  }, [sessionId, groupName])
  
  // セッションをリアルタイムで監視
  useEffect(() => {
    const unsubscribe = watchSession(sessionId, (data) => {
      setSessionData(data)
      if (data && data.participants) {
        const participants = Object.values(data.participants)
        setParticipantList(participants)
      } else {
        setParticipantList([])
      }
    })
    
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [sessionId])
  
  // 主催者を参加者として登録
  const registerHost = async () => {
    if (!hostName.trim()) {
      alert('名前を入力してください')
      return
    }
    if (!hostGender) {
      alert('性別を選択してください')
      return
    }
    
    try {
      await joinSession(sessionId, hostUserId, hostName.trim(), hostGender)
      setIsHostRegistered(true)
    } catch (err) {
      console.error(err)
      alert('登録に失敗しました')
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(sessionUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartDiagnosis = async () => {
    if (!isHostRegistered) {
      alert('まずあなたの情報を登録してください')
      return
    }
    
    // 診断を開始
    await updateSessionStatus(sessionId, 'in_progress')
    // 主催者も診断画面へ遷移（参加者と同じ画面）
    navigate(`/multi-device-diagnosis/${sessionId}/${hostUserId}`)
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/group-session-start')}
            className="btn-secondary text-sm flex items-center gap-2 mx-auto mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            戻る
          </button>
          <div className="card relative" style={{background: '#00CC44', transform: 'rotate(-2deg)'}}>
            <span className="sound-effect pop-yellow absolute top-2 left-4" style={{transform: 'rotate(-15deg)', fontSize: '1.5rem'}}>📱</span>
            <span className="sound-effect pop-pink absolute top-2 right-4" style={{transform: 'rotate(15deg)', fontSize: '1.5rem'}}>QR!</span>
            <h1 className="heading-primary text-6xl mb-3" style={{color: '#FFFFFF', WebkitTextStroke: '3px #000000', textShadow: '5px 5px 0 #FF0000'}}>
              QRコードを表示中
            </h1>
            <p className="text-xl font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ 参加者はこのQRコードをスキャンしてね！ ★
            </p>
          </div>
        </div>

        {/* 主催者情報登録 */}
        {!isHostRegistered && (
          <div className="card mb-6" style={{background: '#FFE4B5', transform: 'rotate(1deg)'}}>
            <h2 className="text-3xl font-black text-black mb-4 text-center flex items-center justify-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              👑 まずはあなたの情報を登録！
            </h2>
            
            <p className="text-black font-bold mb-6 text-center text-lg">
              主催者のあなたも診断に参加します！💪<br />
              名前と性別を入力してください
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* 名前入力 */}
              <div>
                <label className="block text-xl font-black text-black mb-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  👤 あなたの名前
                </label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="例：田中太郎"
                  className="w-full input-field text-lg"
                  maxLength={20}
                />
              </div>
              
              {/* 性別選択 */}
              <div>
                <label className="block text-xl font-black text-black mb-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  ⚧ 性別
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setHostGender('male')}
                    className={`p-3 rounded-lg border-3 border-black transition-all ${
                      hostGender === 'male' ? 'bg-blue-500 text-white transform scale-105' : 'bg-white hover:bg-blue-100'
                    }`}
                    style={{boxShadow: hostGender === 'male' ? '4px 4px 0 #000000' : '2px 2px 0 #000000'}}
                  >
                    <div className="text-2xl mb-1">♂</div>
                    <div className="font-black text-sm">男性</div>
                  </button>
                  
                  <button
                    onClick={() => setHostGender('female')}
                    className={`p-3 rounded-lg border-3 border-black transition-all ${
                      hostGender === 'female' ? 'bg-pink-500 text-white transform scale-105' : 'bg-white hover:bg-pink-100'
                    }`}
                    style={{boxShadow: hostGender === 'female' ? '4px 4px 0 #000000' : '2px 2px 0 #000000'}}
                  >
                    <div className="text-2xl mb-1">♀</div>
                    <div className="font-black text-sm">女性</div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* 登録ボタン */}
            <div className="text-center">
              <button
                onClick={registerHost}
                className={`btn-primary px-12 py-4 text-xl ${!hostName || !hostGender ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!hostName || !hostGender}
              >
                ✅ 登録してQRコードを表示
              </button>
            </div>
          </div>
        )}

        {/* セッション情報 */}
        {isHostRegistered && (
          <div className="card mb-6" style={{background: '#FFFFFF'}}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-black mb-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                🍻 {groupName}
              </h2>
              <p className="text-lg font-bold text-gray-600">
                セッションID: <span className="text-green-600 font-black text-2xl" style={{fontFamily: 'Bangers, sans-serif'}}>{sessionId}</span>
              </p>
            </div>

          {/* QRコード表示 */}
          <div className="flex justify-center mb-6">
            <div className="p-8 rounded-xl border-5 border-black" style={{background: '#FFFFFF', boxShadow: '8px 8px 0 #000000'}}>
              <QRCodeSVG 
                value={sessionUrl} 
                size={300}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* URL表示とコピー */}
          <div className="p-5 rounded-xl border-4 border-black mb-6" style={{background: '#FFE4B5', boxShadow: '4px 4px 0 #000000'}}>
            <p className="text-sm font-black text-black mb-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              📎 URLで共有する場合
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={sessionUrl}
                readOnly
                className="flex-1 input-field text-sm"
              />
              <button
                onClick={handleCopyUrl}
                className="btn-secondary px-4 py-2 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    コピー済み
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    コピー
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 参加者カウントと一覧 */}
          <div className="p-6 rounded-xl border-4 border-black" style={{background: '#D4EDDA', boxShadow: '4px 4px 0 #000000'}}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-green-600" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              <h3 className="text-2xl font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                参加者
              </h3>
            </div>
            <p className="text-6xl font-black text-green-600 mb-4" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '2px #000000'}}>
              {participantList.length}人
            </p>
            
            {/* 参加者一覧 */}
            {participantList.length > 0 && (
              <div className="space-y-2 mt-4">
                {participantList.map((participant: any) => (
                  <div 
                    key={participant.userId}
                    className="flex items-center justify-between p-3 rounded-lg border-2 border-black"
                    style={{background: participant.userId === hostUserId ? '#FFE4B5' : '#FFFFFF', boxShadow: '2px 2px 0 #000000'}}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-lg ${participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                        {participant.gender === 'male' ? '♂' : '♀'}
                      </span>
                      <span className="font-black text-black">{participant.userName}</span>
                      {participant.userId === hostUserId && (
                        <span className="text-lg">👑</span>
                      )}
                    </div>
                    <span className={`text-xs font-bold ${participant.userId === hostUserId ? 'text-white bg-yellow-600 border-black' : 'text-white bg-green-600 border-green-800'} px-2 py-1 rounded border-2`} style={{boxShadow: '2px 2px 0 #000000'}}>
                      {participant.userId === hostUserId ? '主催者' : '参加中'}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {participantList.length === 0 && (
              <p className="text-sm font-bold text-gray-600 mt-2">
                参加者を待っています...
              </p>
            )}
          </div>
        </div>
        )}

        {/* 操作説明 */}
        {isHostRegistered && (
          <>
            <div className="card mb-6" style={{background: '#FFE4B5', transform: 'rotate(1deg)'}}>
              <h3 className="text-2xl font-black text-black mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
                📱 参加者への案内
              </h3>
              <div className="space-y-3 text-black font-bold text-lg">
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>1</span>
                  <p>各自のスマホのカメラでQRコードを読み取る</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>2</span>
                  <p>表示されたURLにアクセス</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>3</span>
                  <p>名前と性別を入力して診断開始！</p>
                </div>
              </div>
            </div>

            {/* 開始ボタン */}
            <div className="text-center space-y-4">
              <button
                onClick={handleStartDiagnosis}
                className={`btn-primary px-16 py-5 text-2xl flex items-center gap-3 mx-auto ${participantList.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={participantList.length < 2}
              >
                <PlayCircle className="w-8 h-8" />
                🍺 みんなで診断開始！ 🍺
              </button>
              <p className="text-sm text-gray-600 font-bold">
                {participantList.length < 2 
                  ? '※ 2人以上の参加者が必要です（あなた＋他の参加者）'
                  : `✅ 準備完了！${participantList.length}人全員で診断を開始します`
                }
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

