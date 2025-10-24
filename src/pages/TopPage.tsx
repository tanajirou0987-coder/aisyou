import { useNavigate } from 'react-router-dom'
import { Heart, Users, Wine, Sparkles, Settings, Zap } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { PageLayout } from '../layouts/PageLayout'

export function TopPage() {
  const navigate = useNavigate()
  const { setMockData, setGroupMockData } = useApp()
  const [showDebugPanel, setShowDebugPanel] = useState(false)

  // 管理者用のショートカット関数
  const goToGroupResults = () => {
    setGroupMockData()
    navigate('/glass-results')
  }

  const goToKokoroGroupResults = () => {
    navigate('/kokoro-results')
  }

  const goToKokoroPairDetails = () => {
    navigate('/kokoro-pair-details?maleName=太郎&femaleName=花子')
  }

  return (
    <PageLayout>
      {/* 管理者用デバッグパネル */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowDebugPanel(!showDebugPanel)}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="管理者用デバッグパネル"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        {showDebugPanel && (
          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border p-4 min-w-64">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              開発者ショートカット
            </h3>
            <div className="space-y-2">
              {/* グラスノオト */}
              <button
                onClick={() => navigate('/glass-session-start')}
                className="w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded text-sm text-purple-700 transition-colors"
              >
                🍻 グラスノオト開始
              </button>
              <button
                onClick={() => navigate('/glass-dev-quick-diagnosis')}
                className="w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded text-sm text-purple-700 transition-colors"
              >
                🔧 グラスノオト診断ショートカット
              </button>
              <button
                onClick={goToGroupResults}
                className="w-full text-left px-3 py-2 bg-indigo-50 hover:bg-indigo-100 rounded text-sm text-indigo-700 transition-colors"
              >
                🎭 グラスノオト結果デモ
              </button>
              
              {/* ココロノオト */}
              <button
                onClick={() => navigate('/kokoro-gender-selection')}
                className="w-full text-left px-3 py-2 bg-pink-50 hover:bg-pink-100 rounded text-sm text-pink-700 transition-colors"
              >
                💕 ココロノオト開始
              </button>
              <button
                onClick={goToKokoroGroupResults}
                className="w-full text-left px-3 py-2 bg-rose-50 hover:bg-rose-100 rounded text-sm text-rose-700 transition-colors"
              >
                💕 ココロノオト結果デモ
              </button>
              <button
                onClick={goToKokoroPairDetails}
                className="w-full text-left px-3 py-2 bg-pink-50 hover:bg-pink-100 rounded text-sm text-pink-700 transition-colors"
              >
                🎀 ココロノオト詳細分析
              </button>
            </div>
            <div className="mt-3 pt-3 border-t text-xs text-gray-500">
              開発・テスト用のショートカットです
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-full overflow-y-auto scrollable-area px-4 py-4">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8 relative">
            <div className="logo-sparkle"></div>
            <div className="logo-sparkle"></div>
            <div className="logo-sparkle"></div>
            <div className="logo-sparkle"></div>
            <div className="logo-sparkle"></div>
            <div className="logo-sparkle"></div>
            <Sparkles className="w-16 h-16 kawaii-pink animate-kawaii-heart" />
            <h1 className="logo-suki-no-oto text-7xl relative">
              💕 すきのおと 💕
            </h1>
            <Sparkles className="w-16 h-16 kawaii-pink animate-kawaii-heart" />
            <div className="sound-wave"></div>
            <div className="sound-wave"></div>
            <div className="sound-wave"></div>
          </div>
          <p className="text-2xl kawaii-light-pink font-medium mb-4">
            あなたの「道」を見つける相性診断アプリ
          </p>
          <p className="text-lg kawaii-light-pink max-w-3xl mx-auto">
            恋愛・友達関係の相性診断と、今の酔った状態での恋愛相性診断。
            科学的根拠に基づいた分析で、あなたにぴったりの関係性を見つけましょう。
          </p>
        </div>

        {/* サービス紹介 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 相性診断 */}
          <div className="card-kawaii hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-kawaii-bounce">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="heading-kawaii-primary mb-2">💕 ココロノオト 💕</h2>
              <p className="kawaii-light-pink text-lg font-medium">
                恋愛・友達関係の相性を分析
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">🧠 心理学理論に基づいた20タイプ分析</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">💕 恋愛・友達関係の相性スコア</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">💡 具体的な関係性のアドバイス</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">✨ デートアイデアやコミュニケーションのコツ</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/compatibility')}
              className="w-full btn-kawaii-primary py-4 px-6 text-lg font-bold"
            >
              💕 ココロノオトを始める
            </button>
          </div>

          {/* 酒癖マッチング */}
          <div className="card-kawaii hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-kawaii-bounce">
                <Wine className="w-10 h-10 text-white" />
              </div>
              <h2 className="heading-kawaii-primary mb-2">🍻 グラスノオト 🍻</h2>
              <p className="kawaii-light-pink text-lg font-medium">
                今の酔った状態での恋愛相性を診断
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">💕 今の酔った状態での恋愛相性分析</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">👥 グループ診断で全員の相性を一覧表示</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">🏆 ベストカップルTop3を自動抽出</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-kawaii-heart"></div>
                <span className="kawaii-light-pink font-medium">✨ 今夜の恋愛シーン予測とアクション提案</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/glass-session-start')}
              className="w-full btn-kawaii-primary py-4 px-6 text-lg font-bold"
            >
              🍻 グラスノオトを始める
            </button>
          </div>

        </div>

        {/* 特徴セクション */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            すきのおとの特徴
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">科学的根拠</h4>
              <p className="text-gray-600">
                心理学・神経科学の研究に基づいた分析で、信頼性の高い結果を提供します。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">複数人対応</h4>
              <p className="text-gray-600">
                最大10人まで参加可能。グループでの相性診断や飲み会でのマッチングに最適です。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">詳細な分析</h4>
              <p className="text-gray-600">
                相性スコアだけでなく、具体的なアドバイスや改善点まで詳しく分析します。
              </p>
            </div>
          </div>
        </div>

        {/* 使い方セクション */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            使い方
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">参加者を追加</h4>
              <p className="text-sm text-gray-600">診断したい人の名前を入力</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">質問に回答</h4>
              <p className="text-sm text-gray-600">YES/NO形式の簡単な質問</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">結果を確認</h4>
              <p className="text-sm text-gray-600">相性ランキングと詳細分析</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">アドバイス活用</h4>
              <p className="text-sm text-gray-600">具体的な改善点を実践</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}



