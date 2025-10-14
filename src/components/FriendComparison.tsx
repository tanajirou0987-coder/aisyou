import React, { useState, useEffect } from 'react'
import { Users, Plus, X, QrCode, Share2, Copy, Star, AlertTriangle, Trophy, Heart } from 'lucide-react'
import { drinkingTypes } from '../data/drinkingAnalysisData'
import { 
  generateCompatibilityMatrix, 
  extractBestPairs, 
  extractCautionPairs, 
  generateUniqueUrl,
  generateQRCode,
  type FriendData,
  type CompatibilityMatrix,
  type BestPair,
  type CautionPair
} from '../utils/compatibilityMatrixCalculator'

interface FriendComparisonProps {
  currentUserType: string
  onClose: () => void
}

export const FriendComparison: React.FC<FriendComparisonProps> = ({
  currentUserType,
  onClose
}) => {
  const [friends, setFriends] = useState<FriendData[]>([])
  const [newFriendNickname, setNewFriendNickname] = useState('')
  const [newFriendType, setNewFriendType] = useState(drinkingTypes[0].id)
  const [showAddForm, setShowAddForm] = useState(false)
  const [uniqueUrl, setUniqueUrl] = useState('')
  const [compatibilityMatrix, setCompatibilityMatrix] = useState<CompatibilityMatrix[]>([])
  const [bestPairs, setBestPairs] = useState<BestPair[]>([])
  const [cautionPairs, setCautionPairs] = useState<CautionPair[]>([])
  const [activeTab, setActiveTab] = useState<'friends' | 'matrix' | 'pairs'>('friends')

  // ユニークURL生成
  useEffect(() => {
    setUniqueUrl(generateUniqueUrl())
  }, [])

  // 相性マトリクス更新
  useEffect(() => {
    if (friends.length >= 2) {
      const matrix = generateCompatibilityMatrix(friends)
      setCompatibilityMatrix(matrix)
      setBestPairs(extractBestPairs(matrix))
      setCautionPairs(extractCautionPairs(matrix))
    } else {
      setCompatibilityMatrix([])
      setBestPairs([])
      setCautionPairs([])
    }
  }, [friends])

  // 友達を追加
  const addFriend = () => {
    if (newFriendNickname && newFriendType) {
      const selectedType = drinkingTypes.find(type => type.id === newFriendType)
      const newFriend: FriendData = {
        userId: `friend_${Date.now()}`,
        nickname: newFriendNickname,
        typeId: newFriendType,
        typeName: selectedType?.name || newFriendType
      }
      setFriends([...friends, newFriend])
      setNewFriendNickname('')
      setNewFriendType(drinkingTypes[0].id)
      setShowAddForm(false)
    }
  }

  // 友達を削除
  const removeFriend = (userId: string) => {
    setFriends(friends.filter(friend => friend.userId !== userId))
  }

  // URLをコピー
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(uniqueUrl)
      alert('URLをコピーしました！')
    } catch (err) {
      console.error('コピーに失敗しました:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-full md:h-auto overflow-y-auto p-6 relative">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">友達と相性比較</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* タブナビゲーション */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'friends'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👥 友達管理
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'matrix'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📊 相性マトリクス
          </button>
          <button
            onClick={() => setActiveTab('pairs')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'pairs'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🏆 ベストペア
          </button>
        </div>

        {/* 友達管理タブ */}
        {activeTab === 'friends' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">友達リスト</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                友達を追加
              </button>
            </div>

            {/* 友達追加フォーム */}
            {showAddForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ニックネーム
                    </label>
                    <input
                      type="text"
                      value={newFriendNickname}
                      onChange={(e) => setNewFriendNickname(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="友達のニックネーム"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      酒癖タイプ
                    </label>
                    <select
                      value={newFriendType}
                      onChange={(e) => setNewFriendType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {drinkingTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={addFriend}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      追加
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 友達一覧 */}
            <div className="space-y-3">
              {friends.map((friend) => (
                <div key={friend.userId} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {friend.nickname.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{friend.nickname}</h4>
                      <p className="text-sm text-gray-600">{friend.typeName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFriend(friend.userId)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* シェア機能 */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">友達にシェア</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 break-all">{uniqueUrl}</p>
                </div>
                <button
                  onClick={copyUrl}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  コピー
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <QrCode className="w-4 h-4" />
                  QRコード
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 相性マトリクスタブ */}
        {activeTab === 'matrix' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">相性マトリクス</h3>
            {compatibilityMatrix.length > 0 ? (
              <div className="space-y-4">
                {compatibilityMatrix.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">
                        {item.userAName} × {item.userBName}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        item.compatibilityScore >= 80 
                          ? 'bg-green-100 text-green-800' 
                          : item.compatibilityScore >= 60 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.compatibilityScore}%
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.compatibilityText}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                友達を2人以上追加すると相性マトリクスが表示されます
              </div>
            )}
          </div>
        )}

        {/* ベストペアタブ */}
        {activeTab === 'pairs' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">相性分析結果</h3>
            
            {/* ベストペア */}
            {bestPairs.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h4 className="text-lg font-semibold text-gray-800">🏆 最高の組み合わせ</h4>
                </div>
                <div className="space-y-3">
                  {bestPairs.map((pair, index) => (
                    <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-red-500" />
                          <span className="font-semibold text-gray-800">
                            {pair.userAName} × {pair.userBName}
                          </span>
                        </div>
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {pair.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 要注意ペア */}
            {cautionPairs.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <h4 className="text-lg font-semibold text-gray-800">⚠️ 要注意ペア</h4>
                </div>
                <div className="space-y-3">
                  {cautionPairs.map((pair, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-400">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <span className="font-semibold text-gray-800">
                            {pair.userAName} × {pair.userBName}
                          </span>
                        </div>
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {pair.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bestPairs.length === 0 && cautionPairs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                友達を2人以上追加すると相性分析結果が表示されます
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}