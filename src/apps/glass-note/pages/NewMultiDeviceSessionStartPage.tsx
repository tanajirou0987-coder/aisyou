import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, Users, Copy, Check, PlayCircle, Eye, EyeOff } from 'lucide-react'

export function NewMultiDeviceSessionStartPage() {
  const navigate = useNavigate()
  
  // セッションIDを生成（ランダムな6桁の英数字）
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 6).toUpperCase())
  const [copied, setCopied] = useState(false)
  const [loggedInPersons, setLoggedInPersons] = useState<string[]>([])
  const [showHostModal, setShowHostModal] = useState(false)
  const [isHostJoined, setIsHostJoined] = useState(false)
  
  // 参加者データを取得
  const [participants, setParticipants] = useState(() => {
    const sessionData = localStorage.getItem('glassSessionData')
    if (sessionData) {
      const data = JSON.parse(sessionData)
      return data.participants || { males: [], females: [] }
    }
    return { males: [], females: [] }
  })
  
  // 全組み合わせを計算
  const [allCombinations] = useState(() => {
    const combinations = []
    participants.males.forEach((male: string) => {
      participants.females.forEach((female: string) => {
        combinations.push({ male, female })
      })
    })
    return combinations
  })
  
  // 全参加者リスト
  const allPersons = [...participants.males, ...participants.females]
  
  // セッションURLを生成
  const sessionUrl = `${window.location.origin}/join-session/${sessionId}`
  
  // ホスト自身の名前選択
  const handleHostJoin = () => {
    setShowHostModal(true)
  }
  
  const handleHostNameSelect = (personName: string) => {
    setLoggedInPersons(prev => [...prev, personName])
    setIsHostJoined(true)
    setShowHostModal(false)
  }
  
  // 診断開始
  const handleStartDiagnosis = () => {
    if (loggedInPersons.length === allPersons.length) {
      navigate('/glass-multi-device-diagnosis', { 
        state: { 
          sessionId, 
          participants, 
          allCombinations,
          allPersons 
        } 
      })
    }
  }
  
  // 全員ログイン完了チェック
  const isAllLoggedIn = loggedInPersons.length === allPersons.length
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(sessionUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <button
              onClick={() => navigate('/glass-mode-selection')}
              className="btn-secondary text-sm flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              戻る
            </button>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-200">
            <h1 className="text-3xl font-bold text-purple-600 mb-2">🍻 グラスノオト</h1>
            <p className="text-lg text-gray-600">参加者がQRコードをスキャンするまで待機中...</p>
          </div>
        </div>

        {/* QRコード表示エリア */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-8 border-2 border-gray-200">
          <div className="text-center">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
              <QRCodeSVG 
                value={sessionUrl} 
                size={300}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              📱 このQRコードをスキャンして診断に参加してください
            </p>
            <p className="text-sm text-gray-500">
              セッションID: <code className="bg-gray-100 px-2 py-1 rounded font-mono text-purple-600">{sessionId}</code>
            </p>
          </div>
        </div>

        {/* 参加人数表示 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
            <div className="text-center">
              <div className="text-sm font-semibold text-orange-600 mb-2">参加人数</div>
              <div className="text-3xl font-bold text-orange-700">{allPersons.length} 人</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="text-center">
              <div className="text-sm font-semibold text-green-600 mb-2">ログイン済み</div>
              <div className="text-3xl font-bold text-green-700">
                {loggedInPersons.length} / {allPersons.length}
              </div>
            </div>
          </div>
        </div>

        {/* ホスト自身の名前選択 */}
        {!isHostJoined && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-2 border-gray-200">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-4">あなたも診断に参加しますか？</p>
              <button
                onClick={handleHostJoin}
                className="px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl font-semibold transition-colors"
              >
                自分の名前を選択
              </button>
            </div>
          </div>
        )}

        {/* 参加者ログイン状況一覧 */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            ログイン状況
          </h3>
          <div className="space-y-3">
            {allPersons.map((person) => {
              const isLoggedIn = loggedInPersons.includes(person)
              return (
                <div key={person} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  isLoggedIn 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      isLoggedIn ? 'bg-green-500' : 'bg-gray-400'
                    }`}>
                      {isLoggedIn ? '✓' : '○'}
                    </div>
                    <span className="font-semibold text-gray-800">{person}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isLoggedIn 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isLoggedIn ? '✓ ログイン済み' : '待機中...'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 診断開始ボタン */}
        <div className="text-center mb-8">
          <button
            onClick={handleStartDiagnosis}
            disabled={!isAllLoggedIn}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              isAllLoggedIn
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:transform hover:-translate-y-1 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAllLoggedIn ? '診断を開始する' : '全員がログインしたら開始できます'}
          </button>
          <p className={`text-sm mt-2 ${
            isAllLoggedIn ? 'text-green-600 font-semibold' : 'text-gray-500'
          }`}>
            {isAllLoggedIn ? '✅ 全員ログイン完了！診断を開始できます' : '全員がログインしたら開始できます'}
          </p>
        </div>

        {/* URL表示とコピー */}
        <div className="bg-yellow-50 rounded-2xl p-4 mb-8 border-2 border-yellow-200">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
            📎 URLで共有する場合
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={sessionUrl}
              readOnly
              className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={handleCopyUrl}
              className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
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

        {/* ホスト名前選択モーダル */}
        {showHostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">あなたの名前を選んでください</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {allPersons.filter(person => !loggedInPersons.includes(person)).map((person) => (
                  <button
                    key={person}
                    onClick={() => handleHostNameSelect(person)}
                    className="p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl font-semibold text-purple-700 transition-colors"
                  >
                    {person}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowHostModal(false)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

