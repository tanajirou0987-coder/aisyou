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
    <div className="min-h-screen p-2 sm:p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー（診断結果画面と同テイスト） */}
        <div className="text-center mb-2 md:mb-12">
          <div className="mb-1.5 md:mb-6">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary text-xs md:text-base flex items-center gap-1 md:gap-2 mx-auto"
            >
              <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden md:inline">ミチノワトップに戻る</span>
              <span className="md:hidden">戻る</span>
            </button>
          </div>
          {/* スマホ版ヘッダー（結果画面風） */}
          <div className="card p-2 md:hidden relative" style={{background: '#FFD700'}}>
            <div className="absolute top-1 left-2 text-xs" style={{transform: 'rotate(-15deg)'}}>POW!</div>
            <div className="absolute top-1 right-2 text-xs" style={{transform: 'rotate(15deg)'}}>BANG!</div>
            <h1 className="text-lg font-black text-black mb-0.5" style={{fontFamily: 'Bangers, sans-serif'}}>
              酒癖診断スタート
            </h1>
            <p className="text-[11px] font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ 診断方法を選んで始めよう！ ★
            </p>
          </div>
          {/* PC版ヘッダー（結果画面風） */}
          <div className="hidden md:block card relative" style={{background: '#FFD700', transform: 'rotate(-2deg)'}}>
            <span className="sound-effect pop-yellow absolute top-2 left-4" style={{transform: 'rotate(-20deg)', fontSize: '2rem'}}>POW!</span>
            <span className="sound-effect pop-blue absolute top-2 right-4" style={{transform: 'rotate(20deg)', fontSize: '2rem'}}>BANG!</span>
            <h1 className="heading-primary text-7xl mb-4 mt-6" style={{color: '#FF0000', WebkitTextStroke: '3px #000000', textShadow: '5px 5px 0 #FFFFFF'}}>
              酒癖診断スタート
            </h1>
            <p className="text-2xl font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ みんなで診断して結果で盛り上がろう！ ★
            </p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="card mb-2 md:mb-8 p-2 md:p-6" style={{background: '#FFFFFF'}}>
          {/* スマホ版アイコン（結果画面の質感に寄せる） */}
          <div className="text-center mb-1.5 md:mb-8 md:hidden">
            <div className="flex justify-center mb-2">
              <div className="relative p-1.5 bg-purple-500 rounded-full border-2 border-black" style={{boxShadow: '2px 2px 0 #000000'}}>
                <Wine className="w-5 h-5 text-white" />
                <Sparkles className="w-2.5 h-2.5 text-yellow-300 absolute -top-1 -right-1" />
              </div>
            </div>
            <h2 className="text-[13px] font-bold">診断方法を選択</h2>
          </div>

          {/* PC版アイコン */}
          <div className="hidden md:block text-center mb-8">
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
          <div className="grid grid-cols-2 md:grid-cols-2 gap-1.5 md:gap-6 mb-2 md:mb-8">
            {/* 1台で回す */}
            <button 
              onClick={() => setSessionMode('single')}
              className={`p-1.5 md:p-6 rounded md:rounded-xl border-2 md:border-4 border-black transition-all ${
                sessionMode === 'single' 
                  ? 'bg-blue-500 md:transform md:scale-105' 
                  : 'bg-white hover:bg-blue-100'
              }`}
              style={{boxShadow: sessionMode === 'single' ? '3px 3px 0 #000000' : '2px 2px 0 #000000'}}
            >
              <div className="text-center">
                <div className="flex justify-center mb-1 md:mb-4">
                  <Smartphone className={`w-5 h-5 md:w-16 md:h-16 ${sessionMode === 'single' ? 'text-white' : 'text-blue-500'}`} style={{filter: window.innerWidth >= 768 ? 'drop-shadow(2px 2px 0 #000000)' : 'none'}} />
                </div>
                <h3 className={`text-[12px] md:text-2xl font-bold md:font-black mb-0.5 md:mb-3 ${sessionMode === 'single' ? 'text-white' : 'text-black'}`} style={{fontFamily: window.innerWidth >= 768 ? 'M PLUS Rounded 1c, sans-serif' : 'inherit'}}>
                  📱 1台で回す
                </h3>
                <p className={`text-[11px] md:text-base md:font-bold ${sessionMode === 'single' ? 'text-white' : 'text-gray-700'}`}>
                  <span className="md:hidden">順番に診断</span>
                  <span className="hidden md:inline">1台の端末をみんなで回しながら順番に診断</span>
                </p>
                <p className={`text-xs md:text-sm mt-0 md:mt-2 hidden md:block ${sessionMode === 'single' ? 'text-yellow-300' : 'text-gray-500'}`}>
                  ✅ シンプル・簡単<br />
                  ✅ その場で盛り上がる
                </p>
              </div>
            </button>

            {/* 複数端末でやる */}
            <button 
              onClick={() => setSessionMode('multi')}
              className={`p-1.5 md:p-6 rounded md:rounded-xl border-2 md:border-4 border-black transition-all ${
                sessionMode === 'multi' 
                  ? 'bg-green-500 md:transform md:scale-105' 
                  : 'bg-white hover:bg-green-100'
              }`}
              style={{boxShadow: sessionMode === 'multi' ? '3px 3px 0 #000000' : '2px 2px 0 #000000'}}
            >
              <div className="text-center">
                <div className="flex justify-center mb-1 md:mb-4">
                  <QrCode className={`w-5 h-5 md:w-16 md:h-16 ${sessionMode === 'multi' ? 'text-white' : 'text-green-600'}`} style={{filter: window.innerWidth >= 768 ? 'drop-shadow(2px 2px 0 #000000)' : 'none'}} />
                </div>
                <h3 className={`text-[12px] md:text-2xl font-bold md:font-black mb-0.5 md:mb-3 ${sessionMode === 'multi' ? 'text-white' : 'text-black'}`} style={{fontFamily: window.innerWidth >= 768 ? 'M PLUS Rounded 1c, sans-serif' : 'inherit'}}>
                  📲 複数端末
                </h3>
                <p className={`text-[11px] md:text-base md:font-bold ${sessionMode === 'multi' ? 'text-white' : 'text-gray-700'}`}>
                  <span className="md:hidden">同時に診断</span>
                  <span className="hidden md:inline">QRコードで各自のスマホから参加</span>
                </p>
                <p className={`text-xs md:text-sm mt-0 md:mt-2 hidden md:block ${sessionMode === 'multi' ? 'text-yellow-300' : 'text-gray-500'}`}>
                  ✅ 同時に診断できる<br />
                  ✅ 待ち時間なし
                </p>
              </div>
            </button>
          </div>

          {/* 飲み会名入力 */}
          <div className="mb-2 md:mb-8">
            <label htmlFor="groupName" className="block text-xs md:text-lg font-semibold text-gray-700 mb-1 md:mb-3">
              飲み会の名前（オプション）
            </label>
            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="例：10/10金曜"
              className="w-full input-field text-[13px] md:text-lg"
              maxLength={30}
            />
            <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 hidden md:block">
              飲み会の名前を入力すると、後で結果を見返すときに便利です
            </p>
          </div>

          {/* 利用シーン説明 - PC版のみ表示 */}
          {sessionMode === 'single' && (
            <div className="hidden md:block p-6 rounded-xl border-4 border-black mb-8" style={{background: '#FFE4B5', boxShadow: '4px 4px 0 #000000'}}>
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
            <div className="hidden md:block p-6 rounded-xl border-4 border-black mb-8" style={{background: '#D4EDDA', boxShadow: '4px 4px 0 #000000'}}>
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

          {/* 開始ボタン */}
          {sessionMode && (
            <div className="text-center">
              <button
                onClick={sessionMode === 'single' ? handleStartSingleDevice : handleStartMultiDevice}
                className="btn-primary w-full md:w-auto px-3 md:px-16 py-2 md:py-5 text-sm md:text-2xl"
              >
                <span className="md:hidden">{sessionMode === 'single' ? '診断を始める' : 'QRコード作成'}</span>
                <span className="hidden md:inline">{sessionMode === 'single' ? '🍺 1台で診断を始める 🍺' : '📲 QRコードを作成 📲'}</span>
              </button>
            </div>
          )}
        </div>

        {/* 注意事項 - PC版のみ表示 */}
        {sessionMode === 'single' && (
          <div className="hidden md:block card" style={{background: '#FFD700', transform: 'rotate(1deg)'}}>
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
          <div className="hidden md:block card" style={{background: '#D4EDDA', transform: 'rotate(-1deg)'}}>
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
