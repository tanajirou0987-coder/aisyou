import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { PageLayout } from '../../../layouts/PageLayout'

export function ResultsPage() {
  const navigate = useNavigate()
  const { state } = useApp()

  // モックデータ（実際の診断結果に置き換え）
  const mockResults = {
    couples: [
      { maleName: '太郎', femaleName: '花子', score: 94, type: 'ハニームーン型' },
      { maleName: '次郎', femaleName: '美咲', score: 87, type: 'ベストフレンド型' },
      { maleName: '三郎', femaleName: 'さくら', score: 82, type: 'パワーカップル型' }
    ],
    totalParticipants: 6
  }

  const handleCoupleClick = (maleName: string, femaleName: string) => {
    navigate(`/kokoro-pair-details?maleName=${maleName}&femaleName=${femaleName}`)
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-600 mb-4">💕 ココロノオト診断結果</h1>
            <p className="text-lg text-gray-600">恋愛相性診断の結果です</p>
          </div>

          {/* 結果一覧 */}
          <div className="space-y-6">
            {mockResults.couples.map((couple, index) => (
              <div 
                key={index}
                onClick={() => handleCoupleClick(couple.maleName, couple.femaleName)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">💕</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {couple.maleName} × {couple.femaleName}
                      </h3>
                      <p className="text-pink-600 font-semibold">{couple.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-pink-600">{couple.score}%</div>
                    <div className="text-sm text-gray-500">相性度</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${couple.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* アクションボタン */}
          <div className="text-center mt-8 space-y-4">
            <button
              onClick={() => navigate('/kokoro-gender-selection')}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:transform hover:-translate-y-1 transition-all duration-200"
            >
              💕 新しいココロノオトを始める
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

