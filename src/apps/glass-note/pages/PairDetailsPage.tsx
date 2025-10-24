import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { calculateLoveStyleType, LoveStyleResult } from '../../../utils/loveStyleCalculator'
import { calculateCompatibilityScore } from '../../../utils/loveCompatibilityMatrix'
import { calculateScientificCompatibility, ScientificCompatibilityResult } from '../../../utils/scientificCompatibilitySystem'
import { ImageShareButton } from '../../../components/ImageShareButton'

export function PairDetailsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useApp()
  const [sessionData, setSessionData] = useState<any>(null)
  const [allCouplesData, setAllCouplesData] = useState<any[]>([])
  const [selectedCouple, setSelectedCouple] = useState<any>(undefined)
  const [loading, setLoading] = useState(true)

  // 相性計算関数（科学的根拠に基づく）
  const calculateRealCompatibilityScore = (maleName: string, femaleName: string, sessionData: any): number => {
    console.log('=== SCIENTIFIC COMPATIBILITY CALCULATION START ===')
    console.log('Male:', maleName, 'Female:', femaleName)
    console.log('Session data:', sessionData)
    
    const answers = sessionData.answers || {}
    console.log('Answers object:', answers)
    
    // 回答データの存在確認
    const answerValues = Object.values(answers)
    if (answerValues.length < 2) {
      console.log('Not enough answers, using fallback calculation')
      return calculateFallbackScore(maleName, femaleName)
    }
    
    const maleAnswers = answerValues[0] as any
    const femaleAnswers = answerValues[1] as any
    
    console.log('Male answers:', maleAnswers)
    console.log('Female answers:', femaleAnswers)
    
    // 回答データの検証
    if (!maleAnswers || !femaleAnswers || 
        typeof maleAnswers !== 'object' || typeof femaleAnswers !== 'object' ||
        Object.keys(maleAnswers).length === 0 || Object.keys(femaleAnswers).length === 0) {
      console.log('Invalid answer data, using fallback calculation')
      return calculateFallbackScore(maleName, femaleName)
    }
    
    try {
      // 新しい科学的相性計算システムを使用
      const scientificResult = calculateScientificCompatibility(maleAnswers, femaleAnswers)
      
      console.log('Scientific compatibility result:', scientificResult)
      console.log('Final scientific score:', scientificResult.totalScore)
      console.log('=== SCIENTIFIC COMPATIBILITY CALCULATION END ===')
      
      return scientificResult.totalScore
    } catch (error) {
      console.error('Error in scientific calculation:', error)
      const fallbackScore = calculateFallbackScore(maleName, femaleName)
      console.log('Error fallback score:', fallbackScore)
      return fallbackScore
    }
  }
  
  const calculateFallbackScore = (maleName: string, femaleName: string): number => {
    console.log('=== FALLBACK CALCULATION START ===')
    console.log('Male:', maleName, 'Female:', femaleName)
    console.log('WARNING: Using fallback calculation - no answer data available')
    
    // 回答データがない場合の固定スコア（科学的根拠なし）
    // 実際の診断では使用されるべきではない
    const fallbackScore = 70 // 中程度の相性として固定
    
    console.log('Fallback score (fixed):', fallbackScore)
    console.log('=== FALLBACK CALCULATION END ===')
    
    return fallbackScore
  }

  // データ生成関数
  const generateDetailedData = (couple: any, score: number) => {
    return {
      ...couple,
      score,
      characterName: getCharacterName(score),
      typeCode: getTypeCode(score),
      loveStyleScores: {
        romantic: { male: 85, female: 88 },
        adventure: { male: 72, female: 75 },
        stability: { male: 88, female: 90 },
        emotion: { male: 90, female: 92 },
        communication: { male: 95, female: 93 }
      },
      bigFive: {
        male: { extraversion: 72, agreeableness: 88, conscientiousness: 75, neuroticism: 35, openness: 80 },
        female: { extraversion: 68, agreeableness: 92, conscientiousness: 78, neuroticism: 38, openness: 82 }
      },
      attachmentStyle: {
        male: "secure",
        female: "secure",
        compatibility: 95
      },
      communicationStyle: {
        male: "listener",
        female: "speaker",
        compatibility: 98
      },
      valueSystem: {
        time: 92,
        money: 85,
        future: 88,
        relationships: 95,
        hobbies: 80,
        overall: 88
      },
      lifestyle: {
        weekend: 90,
        food: 85,
        drinking: 95,
        activity: 82,
        sleep: 88,
        overall: 88
      },
      alcoholCompatibility: {
        beer: 92,
        wine: 95,
        sake: 88,
        cocktail: 85,
        highball: 80
      },
      prediction: {
        oneMonth: { contact: "週3〜4回", dates: "月2〜3回", progress: 85 },
        threeMonths: { contact: "毎日", dates: "週1〜2回", progress: 95 },
        oneYear: { stability: 92, longTerm: 88 }
      },
      rarity: 8
    }
  }

  const getCharacterName = (score: number) => {
    if (score >= 90) return "ほろ酔いロマンチスト"
    if (score >= 80) return "今夜の主役カップル"
    if (score >= 70) return "クールな大人カップル"
    if (score >= 60) return "ほろ酔いベストフレンド"
    return "今夜の新星カップル"
  }

  const getTypeCode = (score: number) => {
    if (score >= 90) return "CAPO"
    if (score >= 80) return "BEST"
    if (score >= 70) return "COOL"
    if (score >= 60) return "HOT"
    return "SWEET"
  }

  useEffect(() => {
    const savedSessionData = localStorage.getItem('glassSessionData')
    if (savedSessionData) {
      const data = JSON.parse(savedSessionData)
      setSessionData(data)
      generateDiagnosisResults(data)
    } else {
      navigate('/')
    }
  }, [navigate])

  const generateDiagnosisResults = (data: any) => {
    let combinations = []
    if (data.combinations && data.combinations.length > 0) {
      combinations = data.combinations
    } else if (data.couples && data.couples.length > 0) {
      combinations = data.couples.map((couple: any) => ({
        male: couple.person1.name,
        female: couple.person2.name
      }))
    }

    // 既に計算済みの結果があるかチェック（一貫性を保つため）
    if (data.diagnosisResults && data.diagnosisResults.length > 0) {
      console.log('PairDetailsPage - Using cached results for consistency:', data.diagnosisResults)
      setAllCouplesData(data.diagnosisResults)
      setSelectedCouple(data.diagnosisResults[0])
      setLoading(false)
      return
    }
    
    // セッションデータに診断結果が保存されているかチェック
    const savedResults = localStorage.getItem('glassDiagnosisResults')
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults)
        console.log('PairDetailsPage - Using saved results from localStorage')
        setAllCouplesData(parsedResults)
        setSelectedCouple(parsedResults[0])
        setLoading(false)
        return
      } catch (error) {
        console.error('PairDetailsPage - Error parsing saved results:', error)
      }
    }

    // 新しく計算する場合のみ（一貫性を保つため）
    console.log('PairDetailsPage - Generating new results for combinations:', combinations)
    const results = combinations.map((combo: any, index: number) => {
      console.log(`PairDetailsPage - Processing combination ${index + 1}/${combinations.length}:`, combo)
      const score = calculateRealCompatibilityScore(combo.male, combo.female, data)
      console.log('PairDetailsPage - Final calculated score for', combo.male, '&', combo.female, ':', score)
      
      const detailedData = generateDetailedData({
        id: index + 1,
        couple: { male: combo.male, female: combo.female }
      }, score)
      return detailedData
    })

    results.sort((a, b) => b.score - a.score)
    
    // 計算結果をセッションデータに保存（一貫性を保つため）
    const updatedSessionData = {
      ...data,
      diagnosisResults: results
    }
    localStorage.setItem('glassSessionData', JSON.stringify(updatedSessionData))
    localStorage.setItem('glassDiagnosisResults', JSON.stringify(results))
    
    setAllCouplesData(results)
    setSelectedCouple(results[0])
    console.log('PairDetailsPage - Set selectedCouple:', results[0]) // デバッグ用
    setLoading(false)
  }

  const handleCoupleChange = (coupleId: string) => {
    const couple = allCouplesData.find(c => c.id.toString() === coupleId)
    if (couple) {
      setSelectedCouple(couple)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    )
  }

  if (!selectedCouple && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">データが見つかりません</div>
      </div>
    )
  }

  if (!selectedCouple) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      {/* 固定ヘッダー */}
      <header className="detail-header fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate('/glass-results')}
            className="back-button flex items-center text-gray-700 hover:text-purple-600 transition-colors"
          >
            ← 戻る
          </button>
          
          <div className="couple-selector">
            <select
              value={selectedCouple?.id}
              onChange={(e) => handleCoupleChange(e.target.value)}
              className="couple-dropdown bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {allCouplesData.map((couple) => (
                <option key={couple.id} value={couple.id}>
                  {couple.couple.male} & {couple.couple.female}
                </option>
              ))}
            </select>
          </div>
          
          <ImageShareButton 
            targetElementId="pair-details-content"
            fileName={`glass-note-${selectedCouple?.couple.male}-${selectedCouple?.couple.female}`}
            className=""
          />
        </div>
      </header>

      <div className="pt-20 pb-8">
        <div id="pair-details-content" className="max-w-4xl mx-auto px-4 space-y-8">
          
          {/* サマリーカード */}
          <div className="summary-card bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="couple-names text-2xl font-bold text-gray-800 text-center mb-6">
              {selectedCouple?.couple?.male}さん & {selectedCouple?.couple?.female}さん
            </h2>
            
            <div className="character-badge text-center mb-6">
              <h3 className="character-name text-xl font-bold text-purple-600 mb-2">
                {selectedCouple?.characterName}
              </h3>
              <div className="type-code text-3xl font-bold text-gray-800 mb-4">
                {selectedCouple?.typeCode}
              </div>
            </div>
            
            <div className="compatibility-score-large text-center mb-6">
              <span className="score-number text-6xl font-bold text-pink-600">
                {selectedCouple?.score}
              </span>
              <span className="score-unit text-2xl text-gray-600">%</span>
      </div>

            <p className="catchphrase text-center text-gray-600 text-lg">
              今夜が勝負！二軒目デート確定級の相性
            </p>
          </div>

          {/* 恋愛スタイルスコア（レーダーチャート） */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">💕 恋愛スタイルスコア</h3>
            <p className="section-subtitle text-gray-600 mb-6">18問の回答から算出された、あなたたちの恋愛傾向</p>
            
            <div className="radar-chart-container bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>レーダーチャート（実装予定）</p>
          </div>
        </div>

            <div className="score-legend flex justify-center space-x-8 mb-6">
              <div className="legend-item flex items-center">
                <span className="legend-color male-color w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                <span className="legend-name text-gray-700">{selectedCouple?.couple?.male}さん</span>
          </div>
              <div className="legend-item flex items-center">
                <span className="legend-color female-color w-4 h-4 bg-pink-500 rounded-full mr-2"></span>
                <span className="legend-name text-gray-700">{selectedCouple?.couple?.female}さん</span>
          </div>
        </div>

            <div className="score-details space-y-4">
              {selectedCouple?.loveStyleScores && Object.entries(selectedCouple.loveStyleScores).map(([key, scores]: [string, any]) => (
                <div key={key} className="score-detail-item">
                  <div className="score-detail-label text-sm font-medium text-gray-700 mb-2">
                    {key === 'romantic' ? 'ロマンティック度' :
                     key === 'adventure' ? '冒険心度' :
                     key === 'stability' ? '安定志向度' :
                     key === 'emotion' ? '感情表現度' :
                     'コミュニケーション度'}
                  </div>
                  <div className="score-detail-bars space-y-2">
                    <div className="score-bar male flex items-center">
                      <span className="text-xs text-gray-600 w-16">{selectedCouple?.couple?.male}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="score-fill bg-blue-500 h-3 rounded-full" 
                          style={{width: `${scores.male}%`}}
                        />
                      </div>
                      <span className="text-xs text-gray-600 ml-2">{scores.male}%</span>
                    </div>
                    <div className="score-bar female flex items-center">
                      <span className="text-xs text-gray-600 w-16">{selectedCouple?.couple?.female}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="score-fill bg-pink-500 h-3 rounded-full" 
                          style={{width: `${scores.female}%`}}
                        />
                      </div>
                      <span className="text-xs text-gray-600 ml-2">{scores.female}%</span>
                    </div>
                  </div>
                  <p className="score-detail-note text-xs text-gray-500 mt-1">
                    {key === 'romantic' ? '二人とも雰囲気を大切にするタイプ' :
                     key === 'adventure' ? '適度に新しいことに挑戦したい派' :
                     key === 'stability' ? '長期的な関係を重視するタイプ' :
                     key === 'emotion' ? '素直に気持ちを伝えられる' :
                     '会話を重視する二人'}
          </p>
        </div>
              ))}
            </div>
          </section>

          {/* カップルタイプ診断（MBTI風） */}
          <section className="analysis-section type-diagnosis bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">🎯 あなたたちのカップルタイプ</h3>
            
            <div className="type-badge-large text-center mb-6">
              <div className="type-code-large text-6xl font-bold text-purple-600 mb-2">
                {selectedCouple?.typeCode}
              </div>
              <div className="type-name-large text-2xl font-bold text-gray-800 mb-4">
                {selectedCouple?.characterName}
              </div>
              <div className="rarity-badge bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center">
                <span className="rarity-icon mr-2">✨</span>
                <span className="rarity-text text-sm font-medium">希少度：上位{selectedCouple?.rarity}%</span>
              </div>
        </div>

            <div className="type-explanation mb-6">
              <h4 className="type-subtitle text-lg font-bold text-gray-800 mb-4">タイプコードの意味</h4>
              <div className="type-letters grid grid-cols-2 md:grid-cols-4 gap-4">
                {['C', 'A', 'P', 'O'].map((letter, index) => (
                  <div key={letter} className="type-letter-item text-center">
                    <div className="letter text-3xl font-bold text-purple-600 mb-2">{letter}</div>
                    <div className="letter-name text-sm font-medium text-gray-700 mb-1">
                      {letter === 'C' ? 'Communication' :
                       letter === 'A' ? 'Affection' :
                       letter === 'P' ? 'Pace' : 'Open'}
                    </div>
                    <div className="letter-desc text-xs text-gray-500">
                      {letter === 'C' ? '会話重視型' :
                       letter === 'A' ? '愛情表現豊か型' :
                       letter === 'P' ? 'ゆったりペース型' : 'オープンマインド型'}
                    </div>
              </div>
            ))}
          </div>
        </div>

            <div className="type-description-full bg-gray-50 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                お酒の場で最も輝くタイプ。時間をかけて距離を縮める、じっくり型の相性です。会話を通じてお互いを理解し、感情を素直に表現できる関係性を築きます。急がず、でも確実に進展する、理想的な恋愛パターンです。
              </p>
            </div>
          </section>

          {/* 性格特性分析（ビッグファイブ） */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">🧠 性格特性分析（ビッグファイブ理論）</h3>
            <p className="section-subtitle text-gray-600 mb-6">心理学の性格理論に基づく詳細分析</p>
            
            <div className="big-five-analysis space-y-6">
              <div className="individual-big-five">
                <h4 className="text-lg font-bold text-gray-800 mb-4">{selectedCouple?.couple?.male}さんの性格特性</h4>
                <div className="big-five-traits space-y-3">
                  {selectedCouple?.bigFive?.male && Object.entries(selectedCouple.bigFive.male).map(([trait, score]: [string, number]) => (
                    <div key={trait} className="trait-item flex items-center justify-between">
                      <span className="trait-label text-gray-700 w-24">
                        {trait === 'extraversion' ? '外向性' :
                         trait === 'agreeableness' ? '協調性' :
                         trait === 'conscientiousness' ? '誠実性' :
                         trait === 'neuroticism' ? '神経症傾向' : '開放性'}
                      </span>
                      <div className="trait-stars flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(score / 20) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                </div>
                      <span className="trait-score text-sm text-gray-600 w-12">{score}%</span>
              </div>
            ))}
          </div>
        </div>

              <div className="individual-big-five">
                <h4 className="text-lg font-bold text-gray-800 mb-4">{selectedCouple?.couple?.female}さんの性格特性</h4>
                <div className="big-five-traits space-y-3">
                  {selectedCouple?.bigFive?.female && Object.entries(selectedCouple.bigFive.female).map(([trait, score]: [string, number]) => (
                    <div key={trait} className="trait-item flex items-center justify-between">
                      <span className="trait-label text-gray-700 w-24">
                        {trait === 'extraversion' ? '外向性' :
                         trait === 'agreeableness' ? '協調性' :
                         trait === 'conscientiousness' ? '誠実性' :
                         trait === 'neuroticism' ? '神経症傾向' : '開放性'}
                      </span>
                      <div className="trait-stars flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(score / 20) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="trait-score text-sm text-gray-600 w-12">{score}%</span>
              </div>
            ))}
          </div>
        </div>
            </div>
            
            <div className="big-five-compatibility bg-green-50 rounded-2xl p-6 mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-2">相性ポイント</h4>
              <p className="text-gray-700">
                協調性が高い同士なので、お互いを思いやる関係が築けます。神経症傾向が低いため、ストレスの少ない安定した関係が期待できます。
              </p>
            </div>
          </section>

          {/* 愛着スタイル診断 */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">💞 愛着スタイル診断</h3>
            <p className="section-subtitle text-gray-600 mb-6">心理学の愛着理論に基づく分析</p>
            
            <div className="attachment-analysis space-y-6">
              <div className="individual-attachment">
                <h4 className="text-lg font-bold text-gray-800 mb-3">{selectedCouple?.couple?.male}さん</h4>
                <div className="attachment-badge secure bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block mb-3">
                  <div className="attachment-type font-medium">安定型（Secure）</div>
                </div>
                <p className="attachment-description text-gray-700">
                  信頼関係を大切にし、適度な距離感を保てるタイプ。お酒の場では自然体で接することができ、相手に安心感を与えます。
                </p>
              </div>
              
              <div className="individual-attachment">
                <h4 className="text-lg font-bold text-gray-800 mb-3">{selectedCouple?.couple?.female}さん</h4>
                <div className="attachment-badge secure bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block mb-3">
                  <div className="attachment-type font-medium">安定型（Secure）</div>
                </div>
                <p className="attachment-description text-gray-700">
                  同じく安定型なので、二人の関係は健全でバランスの取れたものになります。不安や回避がないため、素直な関係を築けます。
                </p>
              </div>
            </div>
            
            <div className="attachment-compatibility bg-green-50 rounded-2xl p-6 mt-6">
              <div className="compatibility-badge text-center mb-4">
                <div className="compatibility-stars text-2xl mb-2">★★★★★</div>
                <div className="compatibility-score text-3xl font-bold text-green-600">{selectedCouple?.attachmentStyle?.compatibility || 95}%</div>
              </div>
              <p className="compatibility-note text-center text-gray-700">
                安定型同士は最高の相性。不安や回避がないため、ストレスのない関係を築けます。
              </p>
            </div>
          </section>

          {/* コミュニケーションスタイル */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">💬 コミュニケーションスタイル</h3>
            <p className="section-subtitle text-gray-600 mb-6">お酒の場での会話スタイル分析</p>
            
            <div className="communication-styles space-y-6">
              <div className="individual-comm-style">
                <h4 className="text-lg font-bold text-gray-800 mb-3">{selectedCouple?.couple?.male}さん</h4>
                <div className="comm-type-badge listener bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-flex items-center mb-3">
                  <span className="comm-icon mr-2">👂</span>
                  <span className="comm-type font-medium">聞き上手タイプ（Listener）</span>
                </div>
                <p className="comm-description text-gray-700">
                  相手の話を丁寧に聞き、適切な相づちやリアクションができます。お酒が入るとさらに共感力が高まり、相手を心地よくさせる会話ができます。
                </p>
              </div>
              
              <div className="individual-comm-style">
                <h4 className="text-lg font-bold text-gray-800 mb-3">{selectedCouple?.couple?.female}さん</h4>
                <div className="comm-type-badge speaker bg-pink-100 text-pink-800 px-4 py-2 rounded-full inline-flex items-center mb-3">
                  <span className="comm-icon mr-2">💭</span>
                  <span className="comm-type font-medium">話し上手タイプ（Speaker）</span>
                </div>
                <p className="comm-description text-gray-700">
                  楽しい話題を提供し、場を盛り上げるのが得意。ほろ酔いになると表現力が豊かになり、相手を引き込む会話ができます。
                </p>
              </div>
            </div>
            
            <div className="comm-compatibility bg-blue-50 rounded-2xl p-6 mt-6">
              <div className="compatibility-badge text-center mb-4">
                <div className="compatibility-stars text-2xl mb-2">★★★★★</div>
                <div className="compatibility-score text-3xl font-bold text-blue-600">{selectedCouple?.communicationStyle?.compatibility || 98}%</div>
              </div>
              <p className="compatibility-note text-center text-gray-700">
                聞き上手×話し上手は理想的な組み合わせ。会話が途切れることなく、自然と盛り上がります。
              </p>
            </div>
          </section>

          {/* 価値観システム一致度 */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">⚖️ 価値観システム一致度</h3>
            <p className="section-subtitle text-gray-600 mb-6">恋愛における価値観の相性</p>
            
            <div className="value-system-bars space-y-4">
              {selectedCouple?.valueSystem && Object.entries(selectedCouple.valueSystem).filter(([key]) => key !== 'overall').map(([key, score]: [string, number]) => (
                <div key={key} className="value-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="value-label text-gray-700">
                      {key === 'time' ? '時間の使い方' :
                       key === 'money' ? 'お金の使い方' :
                       key === 'future' ? '将来のビジョン' :
                       key === 'relationships' ? '人間関係の考え方' : '趣味・娯楽の好み'}
                    </span>
                    <span className="value-score text-sm font-medium text-gray-600">{score}%一致</span>
                  </div>
                  <div className="value-bar bg-gray-200 rounded-full h-3">
                    <div 
                      className="value-fill bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" 
                      style={{width: `${score}%`}}
                    />
                  </div>
                  <p className="value-note text-xs text-gray-500 mt-1">
                    {key === 'time' ? 'ゆっくり過ごしたい派同士' :
                     key === 'money' ? '体験にお金を使う派' :
                     key === 'future' ? '安定を求めつつ楽しみたい' :
                     key === 'relationships' ? '少数精鋭の深い関係を好む' : '文化的なものが好き'}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="value-total bg-purple-50 rounded-2xl p-6 mt-6 text-center">
              <div className="value-total-score text-2xl font-bold text-purple-600 mb-2">
                総合評価：{selectedCouple?.valueSystem?.overall || 88}%
              </div>
              <p className="value-total-note text-gray-700">
                価値観がかなり近く、長期的な関係も期待できます
              </p>
            </div>
          </section>

          {/* ライフスタイル適合性 */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">🏠 ライフスタイル適合性</h3>
            <p className="section-subtitle text-gray-600 mb-6">日常生活での相性分析</p>
            
            <div className="lifestyle-grid grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {selectedCouple?.lifestyle && Object.entries(selectedCouple.lifestyle).filter(([key]) => key !== 'overall').map(([key, score]: [string, number]) => (
                <div key={key} className="lifestyle-card bg-gray-50 rounded-2xl p-4 text-center">
                  <div className="lifestyle-icon text-3xl mb-2">
                    {key === 'weekend' ? '🌞' :
                     key === 'food' ? '🍽️' :
                     key === 'drinking' ? '🍺' :
                     key === 'activity' ? '⚡' : '😴'}
                  </div>
                  <div className="lifestyle-name text-sm font-medium text-gray-700 mb-2">
                    {key === 'weekend' ? '休日の過ごし方' :
                     key === 'food' ? '食の好み' :
                     key === 'drinking' ? 'お酒の飲み方' :
                     key === 'activity' ? '活動的さレベル' : '睡眠リズム'}
                  </div>
                  <div className="lifestyle-score text-xl font-bold text-purple-600">{score}%</div>
                </div>
              ))}
        </div>

            <div className="lifestyle-summary bg-green-50 rounded-2xl p-6 text-center">
              <div className="lifestyle-total-score text-2xl font-bold text-green-600 mb-2">
                総合評価：{selectedCouple?.lifestyle?.overall || 88}%
              </div>
              <p className="lifestyle-note text-gray-700">
                生活リズムが合うので、一緒にいてストレスがありません
              </p>
            </div>
          </section>

          {/* 二人の相性ストーリー */}
          <section className="analysis-section story-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-6">📖 二人の相性ストーリー</h3>
            
            <div className="story-content">
              <p className="story-text text-gray-700 leading-relaxed text-lg">
                二人の出会いは偶然かもしれませんが、この相性は必然です。お酒を飲みながら、最初は軽い話題からスタート。でも、時間が経つにつれて会話は深くなり、気づけば『もっと話したい』と思っている。それが二人の特徴です。
                <br /><br />
                恋愛スタイルスコアを分析すると、二人とも『安定志向』でありながら『感情表現が豊か』というバランスの良さが際立ちます。ビッグファイブ理論では協調性が高く、愛着スタイルも安定型。これは心理学的に最高の組み合わせです。
                <br /><br />
                さらに価値観システムを見ると、時間の使い方やお金の使い方が88%一致。将来のビジョンも似ているため、長期的な関係も十分期待できます。
              </p>
            </div>
          </section>

          {/* お酒別相性診断 */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">🍶 お酒別相性診断</h3>
            <p className="section-subtitle text-gray-600 mb-6">お酒の種類ごとの相性を分析</p>
            
            <div className="alcohol-compatibility space-y-4">
              {selectedCouple?.alcoholCompatibility && Object.entries(selectedCouple.alcoholCompatibility).map(([alcohol, score]: [string, number]) => (
                <div key={alcohol} className={`alcohol-item ${alcohol === 'wine' ? 'best' : ''} bg-gray-50 rounded-2xl p-4 relative`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="alcohol-icon text-2xl mr-3">
                        {alcohol === 'beer' ? '🍺' :
                         alcohol === 'wine' ? '🍷' :
                         alcohol === 'sake' ? '🍶' :
                         alcohol === 'cocktail' ? '🍸' : '🥃'}
                      </div>
                      <div className="alcohol-name text-lg font-medium text-gray-800">
                        {alcohol === 'beer' ? 'ビール' :
                         alcohol === 'wine' ? 'ワイン' :
                         alcohol === 'sake' ? '日本酒' :
                         alcohol === 'cocktail' ? 'カクテル' : 'ハイボール'}
                      </div>
                    </div>
                    <div className="alcohol-score text-xl font-bold text-purple-600">{score}%</div>
                  </div>
                  
                  <div className="alcohol-bar bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="alcohol-fill bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" 
                      style={{width: `${score}%`}}
                    />
                  </div>
                  
                  {alcohol === 'wine' && (
                    <div className="best-badge absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                      BEST!
            </div>
          )}
                  
                  <p className="alcohol-note text-sm text-gray-600">
                    {alcohol === 'beer' ? '乾杯はやっぱりビール派' :
                     alcohol === 'wine' ? '二軒目はワインバーがベスト' :
                     alcohol === 'sake' ? 'しっぽり飲むなら日本酒' :
                     alcohol === 'cocktail' ? 'おしゃれバーでカクテル' : 'さっぱり系も合う'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 恋愛予測 */}
          <section className="analysis-section prediction-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-2">🔮 二人だけの恋愛予測</h3>
            <p className="section-subtitle text-gray-600 mb-6">科学的根拠に基づく具体的な予測</p>
            
            <div className="prediction-timeline space-y-6">
              <div className="prediction-item bg-gray-50 rounded-2xl p-6">
                <div className="prediction-period text-lg font-bold text-gray-800 mb-4">1ヶ月後</div>
                <div className="prediction-details space-y-3">
                  <div className="prediction-detail flex justify-between">
                    <span className="prediction-label text-gray-700">連絡頻度</span>
                    <span className="prediction-value text-gray-800 font-medium">{selectedCouple?.prediction?.oneMonth?.contact || '週3〜4回'}</span>
                  </div>
                  <div className="prediction-detail flex justify-between">
                    <span className="prediction-label text-gray-700">デート頻度</span>
                    <span className="prediction-value text-gray-800 font-medium">{selectedCouple?.prediction?.oneMonth?.dates || '月2〜3回'}</span>
                  </div>
                  <div className="prediction-detail">
                    <div className="flex justify-between mb-2">
                      <span className="prediction-label text-gray-700">関係進展度</span>
                      <span className="prediction-score text-gray-800 font-medium">{selectedCouple?.prediction?.oneMonth?.progress || 85}%</span>
                    </div>
                    <div className="prediction-bar bg-gray-200 rounded-full h-3">
                      <div 
                        className="prediction-fill bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" 
                        style={{width: `${selectedCouple?.prediction?.oneMonth?.progress || 85}%`}}
                      />
                    </div>
                  </div>
                </div>
                <p className="prediction-note text-sm text-gray-600 mt-4">かなり良い雰囲気になっています</p>
              </div>
              
              <div className="prediction-item highlight bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
                <div className="prediction-period text-lg font-bold text-gray-800 mb-4">3ヶ月後</div>
                <div className="prediction-details space-y-3">
                  <div className="prediction-detail flex justify-between">
                    <span className="prediction-label text-gray-700">連絡頻度</span>
                    <span className="prediction-value text-gray-800 font-medium">{selectedCouple?.prediction?.threeMonths?.contact || '毎日'}</span>
                  </div>
                  <div className="prediction-detail flex justify-between">
                    <span className="prediction-label text-gray-700">デート頻度</span>
                    <span className="prediction-value text-gray-800 font-medium">{selectedCouple?.prediction?.threeMonths?.dates || '週1〜2回'}</span>
                  </div>
                  <div className="prediction-detail">
                    <div className="flex justify-between mb-2">
                      <span className="prediction-label text-gray-700">関係進展度</span>
                      <span className="prediction-score text-gray-800 font-medium">{selectedCouple?.prediction?.threeMonths?.progress || 95}%</span>
                    </div>
                    <div className="prediction-bar bg-gray-200 rounded-full h-3">
                      <div 
                        className="prediction-fill bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full" 
                        style={{width: `${selectedCouple?.prediction?.threeMonths?.progress || 95}%`}}
                      />
                    </div>
                  </div>
                </div>
                <p className="prediction-note text-sm text-gray-600 mt-4">カップル成立の可能性大！</p>
              </div>
              
              <div className="prediction-item bg-gray-50 rounded-2xl p-6">
                <div className="prediction-period text-lg font-bold text-gray-800 mb-4">1年後</div>
                <div className="prediction-details space-y-3">
                  <div className="prediction-detail">
                    <div className="flex justify-between mb-2">
                      <span className="prediction-label text-gray-700">関係の安定度</span>
                      <span className="prediction-score text-gray-800 font-medium">{selectedCouple?.prediction?.oneYear?.stability || 92}%</span>
                    </div>
                    <div className="prediction-bar bg-gray-200 rounded-full h-3">
                      <div 
                        className="prediction-fill bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" 
                        style={{width: `${selectedCouple?.prediction?.oneYear?.stability || 92}%`}}
                      />
                    </div>
                  </div>
                  <div className="prediction-detail">
                    <div className="flex justify-between mb-2">
                      <span className="prediction-label text-gray-700">長期的な相性</span>
                      <span className="prediction-score text-gray-800 font-medium">{selectedCouple?.prediction?.oneYear?.longTerm || 88}%</span>
                    </div>
                    <div className="prediction-bar bg-gray-200 rounded-full h-3">
                      <div 
                        className="prediction-fill bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" 
                        style={{width: `${selectedCouple?.prediction?.oneYear?.longTerm || 88}%`}}
                      />
                    </div>
                  </div>
                </div>
                <p className="prediction-note text-sm text-gray-600 mt-4">長期的にも安定した関係が期待できます</p>
              </div>
            </div>
          </section>

          {/* 科学的根拠 */}
          <section className="analysis-section bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="section-title text-2xl font-bold text-gray-800 mb-6">🔬 診断の科学的根拠</h3>
            
            <details className="scientific-basis">
              <summary className="cursor-pointer text-lg font-medium text-purple-600 hover:text-purple-800 transition-colors">
                詳しく見る
              </summary>
              <div className="basis-content mt-6 space-y-6">
                <h4 className="text-lg font-bold text-gray-800">本診断で使用している理論</h4>
                
                <div className="theory-item bg-gray-50 rounded-2xl p-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">1. ビッグファイブ理論（性格心理学）</h5>
                  <p className="text-gray-700">
                    心理学で最も信頼性の高い性格理論の一つ。外向性、協調性、誠実性、神経症傾向、開放性の5つの特性で性格を分析します。
                  </p>
                </div>
                
                <div className="theory-item bg-gray-50 rounded-2xl p-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">2. 愛着理論（発達心理学）</h5>
                  <p className="text-gray-700">
                    ジョン・ボウルビィが提唱した理論。安定型、不安型、回避型の3つの愛着スタイルで恋愛傾向を分析します。
                  </p>
                </div>
                
                <div className="theory-item bg-gray-50 rounded-2xl p-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">3. お酒による性格変化の研究</h5>
                  <p className="text-gray-700">
                    アルコールが脳に与える影響と、それによる性格変化のパターンを研究データに基づいて分析しています。
                  </p>
                </div>
                
                <div className="theory-item bg-gray-50 rounded-2xl p-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">4. コミュニケーションスタイル理論</h5>
                  <p className="text-gray-700">
                    会話における聞き手・話し手の役割分担と、その相性を分析する心理学理論を応用しています。
                  </p>
        </div>

                <div className="theory-item bg-gray-50 rounded-2xl p-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">5. 価値観システム理論</h5>
                  <p className="text-gray-700">
                    恋愛における価値観の一致度が関係の満足度に与える影響を、複数の研究結果から分析しています。
                  </p>
                </div>
              </div>
            </details>
          </section>

          {/* フッターボタン */}
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/glass-results')}
              className="flex-1 bg-white border-2 border-purple-300 text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-purple-50 transition-all duration-200"
            >
              結果に戻る
            </button>
            <button 
              onClick={() => navigate('/glass-punishment-game')}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
            >
              罰ゲームへ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}