import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Users, Wine, Sparkles, Smartphone, QrCode } from 'lucide-react'

export function GroupSessionStartPage() {
  const navigate = useNavigate()
  const { startGroupSession } = useApp()
  const [groupName, setGroupName] = useState('')
  const [sessionMode, setSessionMode] = useState<'single' | 'multi' | null>(null)

  const handleStartSingleDevice = () => {
    startGroupSession(groupName.trim() || undefined)
    navigate('/group-participant-registration')
  }

  const handleStartMultiDevice = () => {
    // 複数端末用のセッション開始
    navigate('/multi-device-session-start', { state: { groupName: groupName.trim() || undefined } })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && sessionMode === 'single') {
      handleStartSingleDevice()
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー - ポップアート風 */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ミチノワトップに戻る
            </button>
          </div>
          <div className="card relative" style={{background: '#FF0000', transform: 'rotate(-2deg)'}}>
            <span className="sound-effect pop-yellow absolute top-2 left-4" style={{transform: 'rotate(-20deg)', fontSize: '2rem'}}>BANG!</span>
            <span className="sound-effect pop-green absolute top-2 right-4" style={{transform: 'rotate(20deg)', fontSize: '2rem'}}>POW!</span>
            <h1 className="heading-primary text-7xl mb-4 mt-6" style={{color: '#FFFFFF', WebkitTextStroke: '3px #000000', textShadow: '5px 5px 0 #FFD700'}}>
              酒癖診断
            </h1>
            <p className="text-2xl font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ 1台の端末を回しながら、みんなで酒癖相性を診断しよう！ ★
            </p>
          </div>
        </div>

        {/* メインコンテンツ - ポップアート風 */}
        <div className="card mb-8" style={{background: '#FFFFFF'}}>
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative p-5 bg-purple-500 rounded-full border-5 border-black" style={{boxShadow: '7px 7px 0 #000000'}}>
                <Wine className="w-20 h-20 text-white" style={{filter: 'drop-shadow(3px 3px 0 #000000)'}} />
                <Sparkles className="w-10 h-10 text-yellow-300 absolute -top-2 -right-2 animate-pulse" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '2px #000000', color: '#0066FF', textShadow: '3px 3px 0 #FFFFFF'}}>
              新しい酒癖診断を始める
            </h2>
            <p className="text-black leading-relaxed mb-8 font-bold text-lg" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
              診断方法を選んでください！💥
            </p>
          </div>

          {/* 診断方法の選択 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 1台で回す */}
            <div 
              onClick={() => setSessionMode('single')}
              className={`p-6 rounded-xl border-4 border-black cursor-pointer transition-all duration-200 ${
                sessionMode === 'single' 
                  ? 'bg-blue-500 transform scale-105' 
                  : 'bg-white hover:bg-blue-100'
              }`}
              style={{boxShadow: sessionMode === 'single' ? '8px 8px 0 #000000' : '4px 4px 0 #000000'}}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Smartphone className={`w-16 h-16 ${sessionMode === 'single' ? 'text-white' : 'text-blue-500'}`} style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
                </div>
                <h3 className={`text-2xl font-black mb-3 ${sessionMode === 'single' ? 'text-white' : 'text-black'}`} style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  📱 1台で回す
                </h3>
                <p className={`font-bold ${sessionMode === 'single' ? 'text-white' : 'text-gray-700'}`}>
                  1台の端末をみんなで回しながら順番に診断
                </p>
                <p className={`text-sm mt-2 ${sessionMode === 'single' ? 'text-yellow-300' : 'text-gray-500'}`}>
                  ✅ シンプル・簡単<br />
                  ✅ その場で盛り上がる
                </p>
              </div>
            </div>

            {/* 複数端末でやる */}
            <div 
              onClick={() => setSessionMode('multi')}
              className={`p-6 rounded-xl border-4 border-black cursor-pointer transition-all duration-200 ${
                sessionMode === 'multi' 
                  ? 'bg-green-500 transform scale-105' 
                  : 'bg-white hover:bg-green-100'
              }`}
              style={{boxShadow: sessionMode === 'multi' ? '8px 8px 0 #000000' : '4px 4px 0 #000000'}}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <QrCode className={`w-16 h-16 ${sessionMode === 'multi' ? 'text-white' : 'text-green-600'}`} style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
                </div>
                <h3 className={`text-2xl font-black mb-3 ${sessionMode === 'multi' ? 'text-white' : 'text-black'}`} style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  📲 複数端末でやる
                </h3>
                <p className={`font-bold ${sessionMode === 'multi' ? 'text-white' : 'text-gray-700'}`}>
                  QRコードで各自のスマホから参加
                </p>
                <p className={`text-sm mt-2 ${sessionMode === 'multi' ? 'text-yellow-300' : 'text-gray-500'}`}>
                  ✅ 同時に診断できる<br />
                  ✅ 待ち時間なし
                </p>
              </div>
            </div>
          </div>

          {/* 飲み会名入力 */}
          <div className="mb-8">
            <label htmlFor="groupName" className="block text-lg font-semibold text-gray-700 mb-3">
              飲み会の名前（オプション）
            </label>
            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="例：10/10 金曜夜の飲み会"
              className="w-full input-field text-lg"
              maxLength={30}
            />
            <p className="text-sm text-gray-500 mt-2">
              飲み会の名前を入力すると、後で結果を見返すときに便利です
            </p>
          </div>

          {/* 利用シーン説明 - 条件付き表示 */}
          {sessionMode === 'single' && (
            <div className="p-6 rounded-xl border-4 border-black mb-8" style={{background: '#FFE4B5', boxShadow: '4px 4px 0 #000000'}}>
              <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                <Users className="w-6 h-6 text-blue-600" />
                📱 1台で回す場合の流れ
              </h3>
              <div className="space-y-3 text-black font-bold">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>1</span>
                  <p>飲み会の席で、1台のスマホを順番に回していく</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>2</span>
                  <p>「次、○○さんの番ね！」と言いながら端末を渡す</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>3</span>
                  <p>全員の診断が終わったら、その場でみんなで結果を見て盛り上がる</p>
                </div>
              </div>
            </div>
          )}

          {sessionMode === 'multi' && (
            <div className="p-6 rounded-xl border-4 border-black mb-8" style={{background: '#D4EDDA', boxShadow: '4px 4px 0 #000000'}}>
              <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                <QrCode className="w-6 h-6 text-green-600" />
                📲 複数端末でやる場合の流れ
              </h3>
              <div className="space-y-3 text-black font-bold">
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>1</span>
                  <p>主催者がQRコードを表示</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>2</span>
                  <p>参加者が各自のスマホでQRコードをスキャン</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>3</span>
                  <p>各自のスマホで診断を実施（同時進行OK！）</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black flex-shrink-0 border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>4</span>
                  <p>全員完了後、主催者の画面で結果を一括表示</p>
                </div>
              </div>
            </div>
          )}

          {/* 開始ボタン - ポップアート風 */}
          {sessionMode && (
            <div className="text-center">
              <button
                onClick={sessionMode === 'single' ? handleStartSingleDevice : handleStartMultiDevice}
                className="btn-primary px-16 py-5 text-2xl"
              >
                {sessionMode === 'single' ? '🍺 1台で診断を始める 🍺' : '📲 QRコードを作成 📲'}
              </button>
            </div>
          )}
        </div>

        {/* 注意事項 - ポップアート風 - 条件付き表示 */}
        {sessionMode === 'single' && (
          <div className="card" style={{background: '#FFD700', transform: 'rotate(1deg)'}}>
            <h3 className="text-2xl font-black text-black mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
              ⚠️ 注意事項 ⚠️
            </h3>
            <ul className="text-black space-y-3 font-bold text-lg">
              <li className="flex items-start gap-2">
                <span className="text-red-600 text-2xl">•</span>
                <span>1台の端末を複数人で共有して使用します</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 text-2xl">•</span>
                <span>参加者は最低2人以上必要です</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 text-2xl">•</span>
                <span>診断中は他の人に回答が見えないよう注意してください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 text-2xl">•</span>
                <span>結果はその場で楽しむことをお勧めします</span>
              </li>
            </ul>
          </div>
        )}

        {sessionMode === 'multi' && (
          <div className="card" style={{background: '#D4EDDA', transform: 'rotate(-1deg)'}}>
            <h3 className="text-2xl font-black text-black mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
              ⚠️ 注意事項 ⚠️
            </h3>
            <ul className="text-black space-y-3 font-bold text-lg">
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-2xl">•</span>
                <span>各自のスマホでQRコードを読み込んでください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-2xl">•</span>
                <span>参加者は最低2人以上必要です</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-2xl">•</span>
                <span>全員の診断が完了するまでお待ちください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-2xl">•</span>
                <span>インターネット接続が必要です</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
