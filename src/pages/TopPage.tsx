import { useNavigate } from 'react-router-dom'
import { Heart, Users, Wine, Sparkles } from 'lucide-react'

export function TopPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-pink-500" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ミチノワ
            </h1>
            <Sparkles className="w-12 h-12 text-blue-500" />
          </div>
          <p className="text-2xl text-gray-700 mb-4">
            あなたの「道」を見つける相性診断アプリ
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            恋愛・友達関係の相性診断と、飲み会での酒癖マッチング。
            科学的根拠に基づいた分析で、あなたにぴったりの関係性を見つけましょう。
          </p>
        </div>

        {/* サービス紹介 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 相性診断 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">相性診断</h2>
              <p className="text-gray-600 text-lg">
                恋愛・友達関係の相性を分析
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-700">心理学理論に基づいた20タイプ分析</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-700">恋愛・友達関係の相性スコア</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-700">具体的な関係性のアドバイス</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-700">デートアイデアやコミュニケーションのコツ</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              相性診断を始める
            </button>
          </div>

          {/* 酒癖マッチング */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">酒癖マッチング</h2>
              <p className="text-gray-600 text-lg">
                飲み会での相性と酒癖タイプを分析
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-700">科学的根拠に基づく6つの酒癖タイプ</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-700">飲み会での相性と恋愛の可能性</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-700">神経科学・心理学に基づく分析</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-700">おすすめ活動やコミュニケーションのコツ</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/drinking')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              酒癖マッチングを始める
            </button>
          </div>
        </div>

        {/* 特徴セクション */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            ミチノワの特徴
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
    </div>
  )
}

