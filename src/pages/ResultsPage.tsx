import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PageLayout } from '../layouts/PageLayout'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Crown, Heart, Star, Sparkles, Users, ArrowLeft, Share2 } from 'lucide-react'
import type { Participant } from '../types'

export function ResultsPage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const [searchParams] = useSearchParams()
  const [showDetail, setShowDetail] = useState(false)
  const [selectedPair, setSelectedPair] = useState<{participant1Id: string, participant2Id: string} | null>(null)
  
  // URLパラメータで詳細画面を直接表示するかどうかを判定
  const shouldShowDetailDirectly = searchParams.get('showDetail') === 'true'
  

  const handleBackToRanking = () => {
    setShowDetail(false)
    setSelectedPair(null)
  }

  // バズる診断結果の6大要素を実装
  const getCompatibilityLevel = (score: number) => {
    if (score >= 90) return { 
      level: 'SS級', 
      description: '運命の赤い糸、見つけちゃったかも...？💕',
      rarity: '3%',
      color: 'text-red-500'
    }
    if (score >= 80) return { 
      level: 'S級', 
      description: '全カップルの上位5%に入る奇跡の相性！',
      rarity: '5%',
      color: 'text-pink-500'
    }
    if (score >= 70) return { 
      level: 'A級', 
      description: 'とても良い相性のカップルです！',
      rarity: '15%',
      color: 'text-purple-500'
    }
    return { 
      level: 'B級', 
      description: 'お互いを理解し合える関係です',
      rarity: '30%',
      color: 'text-blue-500'
    }
  }

  const generateDetailedScores = (baseScore: number) => {
    return {
      values: Math.max(85, baseScore - 5),
      conversation: Math.max(90, baseScore + 2),
      healing: Math.max(88, baseScore - 1),
      stimulation: Math.max(75, baseScore - 10),
      future: Math.max(92, baseScore + 3)
    }
  }

  // 14項目の詳細分析メトリクスを生成
  const generateFourteenMetrics = (baseScore: number) => {
    const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))
    const s = baseScore
    return [
      { key: 'values', label: '価値観の一致', emoji: '❤️', color: 'bg-pink-500', score: clamp(Math.max(70, s - 5)) },
      { key: 'conversation', label: '会話のテンポ', emoji: '💛', color: 'bg-yellow-500', score: clamp(Math.max(70, s + 2)) },
      { key: 'healing', label: '居心地（癒し）', emoji: '💙', color: 'bg-blue-500', score: clamp(Math.max(68, s - 1)) },
      { key: 'stimulation', label: '刺激・トキメキ', emoji: '💚', color: 'bg-green-500', score: clamp(Math.max(60, s - 10)) },
      { key: 'future', label: '将来ビジョン一致', emoji: '💜', color: 'bg-purple-500', score: clamp(Math.max(72, s + 3)) },
      { key: 'trust', label: '信頼・安心感', emoji: '🫶', color: 'bg-rose-400', score: clamp(Math.max(70, s - 2)) },
      { key: 'conflict', label: '衝突時の相性', emoji: '🕊️', color: 'bg-sky-500', score: clamp(Math.max(62, s - 8)) },
      { key: 'intimacy', label: '親密度の高まり', emoji: '✨', color: 'bg-fuchsia-500', score: clamp(Math.max(68, s + 1)) },
      { key: 'independence', label: '自立と依存のバランス', emoji: '⚖️', color: 'bg-amber-500', score: clamp(Math.max(60, s - 6)) },
      { key: 'clarity', label: '伝わりやすさ', emoji: '🗣️', color: 'bg-indigo-500', score: clamp(Math.max(66, s - 3)) },
      { key: 'humor', label: '笑いのツボ一致', emoji: '😄', color: 'bg-lime-500', score: clamp(Math.max(65, s - 4)) },
      { key: 'lifestyle', label: '生活リズム適合', emoji: '🕰️', color: 'bg-teal-500', score: clamp(Math.max(63, s - 7)) },
      { key: 'growth', label: '成長し合える関係', emoji: '🌱', color: 'bg-emerald-500', score: clamp(Math.max(67, s + 0)) },
      { key: 'emotional', label: '感情の波の同期', emoji: '🌊', color: 'bg-cyan-500', score: clamp(Math.max(61, s - 9)) },
    ] as Array<{ key: string; label: string; emoji: string; color: string; score: number }>
  }

  const generateAllPairs = () => {
    const pairs = []
    for (let i = 0; i < state.participants.length; i++) {
      for (let j = i + 1; j < state.participants.length; j++) {
        const score = 75 + Math.random() * 20
        pairs.push({
          participant1Id: state.participants[i].id,
          participant2Id: state.participants[j].id,
          score: Math.round(score),
          coupleType: {
            name: 'ハニームーン型',
            emoji: '🎀',
            description: '「永遠の新婚カップル」'
          }
        })
      }
    }
    return pairs.sort((a, b) => b.score - a.score)
  }

  const allPairs = generateAllPairs()

  // 詳細分析画面の共通レンダリング関数
  const renderDetailedAnalysis = () => {
    // 常に最初のペアを使用して統一された画面を表示
    const targetPair = { participant1Id: state.participants[0]?.id, participant2Id: state.participants[1]?.id }
    const targetScore = allPairs.find(p => 
      (p.participant1Id === targetPair.participant1Id && p.participant2Id === targetPair.participant2Id) ||
      (p.participant1Id === targetPair.participant2Id && p.participant2Id === targetPair.participant1Id)
    ) || allPairs[0]
    
    const score = targetScore || { score: 85, coupleType: { name: 'ハニームーン型', emoji: '🎀', description: '「永遠の新婚カップル」' } }
    const compatibility = getCompatibilityLevel(score.score)
    const detailedScores = generateDetailedScores(score.score)
    const fourteenMetrics = generateFourteenMetrics(score.score)
    const coupleType = score.coupleType || { name: 'ハニームーン型', emoji: '🎀', description: '「永遠の新婚カップル」' }

    return (
      <PageLayout>
        <div className="max-w-5xl mx-auto p-4">
          <div className="space-y-8">
            {/* STEP 1: インパクトある一言 */}
            <div className="text-center mb-8">
              <div className="inline-block p-6 rounded-3xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200">
                <h1 className="text-3xl font-bold text-[#FF1493] mb-2">
                  {compatibility.description}
                </h1>
                <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <span>全カップル中 上位{compatibility.rarity}！</span>
                </div>
              </div>
            </div>

            {/* STEP 2: タイプ名発表 */}
            <div className="text-center mb-8">
              <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-pink-300">
                <div className="text-4xl mb-4">{coupleType.emoji}</div>
                <h2 className="text-4xl font-bold text-[#FF1493] mb-2">
                  {coupleType.name}
                </h2>
                <p className="text-xl text-gray-700 mb-4">{coupleType.description}</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-600">
                    このタイプは全体の{compatibility.rarity}！
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                    ランク：{compatibility.level}
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 3: 相性スコア */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                💕 総合相性度：{score.score}% 💕
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">❤️ 価値観マッチ度：{detailedScores.values}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-4">
                    <div className="bg-pink-500 h-4 rounded-full" style={{width: `${detailedScores.values}%`}}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">💛 会話の相性：{detailedScores.conversation}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-4">
                    <div className="bg-yellow-500 h-4 rounded-full" style={{width: `${detailedScores.conversation}%`}}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">💙 癒し度：{detailedScores.healing}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-500 h-4 rounded-full" style={{width: `${detailedScores.healing}%`}}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">💚 刺激度：{detailedScores.stimulation}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{width: `${detailedScores.stimulation}%`}}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">💜 将来性：{detailedScores.future}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-4">
                    <div className="bg-purple-500 h-4 rounded-full" style={{width: `${detailedScores.future}%`}}></div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <span className="text-lg font-bold text-pink-600">
                  全カップル中 上位{compatibility.rarity}！
                </span>
              </div>
            </div>

            {/* STEP 4: 14項目の詳細分析 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                📊 14の詳細分析 📊
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fourteenMetrics.map(item => (
                  <div key={item.key} className="border border-pink-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-800 font-semibold truncate">
                        <span className="mr-2">{item.emoji}</span>{item.label}
                      </div>
                      <div className="text-[#FF1493] font-bold">{item.score}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 5: 関係性の説明 */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                🌸 あなたたちの関係性 🌸
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                まるで少女漫画から飛び出してきたような、周りが羨むほど甘々なカップル。
                一緒にいるだけで世界が輝いて見えて、離れてる時間すら愛おしく感じるタイプ。
                「好き」を言葉でも態度でも表現し合えるから、愛情を疑うことがほとんどない。
                二人でいる時間が何より幸せで、デートの予定を立ててる時からワクワクが止まらない。
              </p>
            </div>

            {/* STEP 5: お互いの魅力分析 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                💕 お互いから見た魅力 💕
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-pink-600 mb-4">【相手から見たあなた】</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>・一緒にいると心が満たされる存在</li>
                    <li>・笑顔が本当に可愛い</li>
                    <li>・細かいことに気づいてくれる優しさ</li>
                    <li>・素直に愛情を表現してくれる</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-pink-600 mb-4">【あなたから見た相手】</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>・安心感がハンパない</li>
                    <li>・何でも受け止めてくれる包容力</li>
                    <li>・二人の時間を大切にしてくれる</li>
                    <li>・愛情表現が豊かで嬉しい</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 再掲: 14項目の詳細分析（下部にも表示して見落とし防止） */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                📊 14の詳細分析（再掲） 📊
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fourteenMetrics.map(item => (
                  <div key={`${item.key}-bottom`} className="border border-pink-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-800 font-semibold truncate">
                        <span className="mr-2">{item.emoji}</span>{item.label}
                      </div>
                      <div className="text-[#FF1493] font-bold">{item.score}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ナビゲーションボタン */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                結果をシェア
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                トップに戻る
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  // 関係性判定
  const isDating = state.relationshipStage?.status === 'dating'
  const participantCount = state.participants.length

  // 参加者数に応じた分岐判定
  const shouldShowRanking = !isDating && participantCount >= 3 && !shouldShowDetailDirectly
  const shouldShowDetailByLogic = isDating || participantCount === 2

  // ランキング画面の表示
  if (shouldShowRanking && !showDetail) {
    return (
      <PageLayout>
        <div className="max-w-5xl mx-auto p-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ✨ 診断結果が出ました ✨
            </h1>
            <p className="text-lg text-gray-600">
              参加者：{state.participants.map(p => p.name).join('、')}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              🏆 相性ランキング 🏆
            </h2>
            <p className="text-center text-gray-600 mb-8">誰と相性いいか見てみよう！</p>
            
            <div className="space-y-4">
              {allPairs.map((pair, index) => {
                const participant1 = state.participants.find(p => p.id === pair.participant1Id)
                const participant2 = state.participants.find(p => p.id === pair.participant2Id)
                const compatibility = getCompatibilityLevel(pair.score)
                
                return (
                  <div key={`${pair.participant1Id}-${pair.participant2Id}`} className="border-2 border-pink-200 rounded-xl p-6 hover:border-pink-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">
                          {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-800">
                            {index + 1}位：{participant1?.name} × {participant2?.name}
                          </div>
                          <div className="text-lg text-pink-600 font-semibold">
                            {pair.coupleType.emoji} {pair.coupleType.name}
                          </div>
                          <div className="text-sm text-gray-600">{pair.coupleType.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-pink-600">
                          相性度：{pair.score}%
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Heart key={i} className={`w-5 h-5 ${i < Math.floor(pair.score / 20) ? 'text-pink-500 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedPair({ participant1Id: pair.participant1Id, participant2Id: pair.participant2Id })
                            setShowDetail(true)
                          }}
                          className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
                        >
                          詳細を見る
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg text-gray-600">💡 気になるペアをタップ！</p>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  // 詳細画面の表示
  if (shouldShowDetailDirectly || shouldShowDetailByLogic || showDetail) {
    return renderDetailedAnalysis()
  }

  // デフォルトのフォールバック
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            診断結果を読み込み中...
          </h1>
          <p className="text-gray-600">しばらくお待ちください</p>
        </div>
      </div>
    </PageLayout>
  )
}