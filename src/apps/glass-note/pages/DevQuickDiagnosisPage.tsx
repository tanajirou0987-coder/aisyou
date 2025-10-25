import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Users, Settings } from 'lucide-react'

export function DevQuickDiagnosisPage() {
  const navigate = useNavigate()
  const [sessionId, setSessionId] = useState('')
  const [userId, setUserId] = useState('')
  const [participantCount, setParticipantCount] = useState(2)

  // テスト用の参加者データを生成
  const generateTestParticipants = () => {
    const males = ['田中太郎', '佐藤次郎', '鈴木三郎']
    const females = ['山田花子', '高橋美咲', '伊藤さくら']
    
    const participants = {
      males: males.slice(0, Math.ceil(participantCount / 2)),
      females: females.slice(0, Math.floor(participantCount / 2))
    }
    
    return participants
  }

  const handleQuickStart = () => {
    const testSessionId = sessionId || 'TEST' + Math.random().toString(36).substr(2, 5).toUpperCase()
    const testUserId = userId || 'USER' + Math.random().toString(36).substr(2, 5).toUpperCase()
    
    // テスト用セッションデータを生成
    const testParticipants = generateTestParticipants()
    const allPersons = [...testParticipants.males, ...testParticipants.females]
    const combinations = []
    
    testParticipants.males.forEach(male => {
      testParticipants.females.forEach(female => {
        combinations.push({ male, female })
      })
    })

    const sessionData = {
      participants: testParticipants,
      allPersons,
      combinations,
      mode: 'multi-device',
      loggedInPersons: [testUserId],
      answers: {},
      currentQuestion: 0
    }

    // ローカルストレージに保存
    localStorage.setItem('glassSessionData', JSON.stringify(sessionData))
    
    // 診断画面へ直接遷移
    navigate(`/glass-quick-diagnosis/${testSessionId}/${testUserId}`)
  }

  const handleSingleDeviceTest = () => {
    const testParticipants = generateTestParticipants()
    const allPersons = [...testParticipants.males, ...testParticipants.females]
    const combinations = []
    
    testParticipants.males.forEach(male => {
      testParticipants.females.forEach(female => {
        combinations.push({ male, female })
      })
    })

    const sessionData = {
      participants: testParticipants,
      allPersons,
      combinations,
      mode: 'single-device',
      currentPersonIndex: 0,
      answers: {}
    }

    localStorage.setItem('glassSessionData', JSON.stringify(sessionData))
    navigate('/glass-all-questions-diagnosis')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary text-sm flex items-center gap-2 mx-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              戻る
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-200">
            <h1 className="text-3xl font-bold text-gray-600 mb-2">🔧 開発者ショートカット</h1>
            <p className="text-lg text-gray-600 mb-4">グラスノオト診断画面への直接アクセス</p>
            <div className="bg-yellow-50 rounded-2xl p-4">
              <p className="text-sm text-yellow-800 font-semibold">
                ⚠️ 開発・テスト用の画面です
              </p>
            </div>
          </div>
        </div>

        {/* 設定パネル */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            テスト設定
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                参加者数
              </label>
              <select
                value={participantCount}
                onChange={(e) => setParticipantCount(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value={2}>2人（1男1女）</option>
                <option value={4}>4人（2男2女）</option>
                <option value={6}>6人（3男3女）</option>
                <option value={8}>8人（4男4女）</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                セッションID（任意）
              </label>
              <input
                type="text"
                placeholder="例: TEST123"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                ユーザーID（任意）
              </label>
              <input
                type="text"
                placeholder="例: USER123"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* プレビュー */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            テスト参加者
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">男性</h4>
              <div className="space-y-1">
                {generateTestParticipants().males.map((name, index) => (
                  <div key={index} className="text-sm bg-white rounded-lg p-2 border border-blue-200">
                    {name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-pink-600 mb-2">女性</h4>
              <div className="space-y-1">
                {generateTestParticipants().females.map((name, index) => (
                  <div key={index} className="text-sm bg-white rounded-lg p-2 border border-pink-200">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              診断組み合わせ: <span className="font-bold text-blue-600">
                {generateTestParticipants().males.length * generateTestParticipants().females.length}通り
              </span>
            </p>
          </div>
        </div>

        {/* ショートカットボタン */}
        <div className="space-y-4">
          <button
            onClick={handleQuickStart}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            複数端末診断を開始（QRモード）
          </button>

          <button
            onClick={handleSingleDeviceTest}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            単一端末診断を開始
          </button>
        </div>

        {/* 注意事項 */}
        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <div className="text-red-600 mt-0.5">⚠️</div>
            <div className="text-sm text-red-800">
              <p className="font-semibold mb-1">開発者向け機能</p>
              <ul className="space-y-1 text-xs">
                <li>• 本番環境では使用しないでください</li>
                <li>• テスト用のダミーデータが生成されます</li>
                <li>• 実際のFirebaseセッションは作成されません</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

