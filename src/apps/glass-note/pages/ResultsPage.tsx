import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { calculateLoveStyleType, LoveStyleResult } from '../../../utils/loveStyleCalculator'
import { calculateCompatibilityScore } from '../../../utils/loveCompatibilityMatrix'
import { calculateScientificCompatibility, ScientificCompatibilityResult } from '../../../utils/scientificCompatibilitySystem'
import { ImageShareButton } from '../../../components/ImageShareButton'

export function ResultsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useApp()
  const [showMatrix, setShowMatrix] = useState(false)
  const [sessionData, setSessionData] = useState<any>(null)
  const [diagnosisResults, setDiagnosisResults] = useState<any[]>([])

  // セッションデータを読み込み
  useEffect(() => {
    const savedSessionData = localStorage.getItem('glassSessionData')
    if (savedSessionData) {
      const data = JSON.parse(savedSessionData)
      console.log('ResultsPage - Session data:', data) // デバッグ用
      setSessionData(data)
      
      // 実際の診断結果を生成
      generateDiagnosisResults(data)
    } else {
      console.error('No session data found')
      // セッションデータがない場合はホームに戻る
      navigate('/')
    }
  }, [navigate])

  // 実際の回答データを使用した相性計算関数
  const calculateRealCompatibilityScore = (maleName: string, femaleName: string, sessionData: any): number => {
    console.log('ResultsPage - Calculating compatibility for:', maleName, femaleName) // デバッグ用
    console.log('ResultsPage - Session data answers:', sessionData.answers) // デバッグ用
    
    const answers = sessionData.answers || {}
    console.log('ResultsPage - Answers object:', answers) // デバッグ用
    
    // 回答データの構造を確認
    const answerKeys = Object.keys(answers)
    console.log('ResultsPage - Answer keys:', answerKeys) // デバッグ用
    
    // 回答データの構造を詳細に確認
    const answerValues = Object.values(answers)
    console.log('ResultsPage - Answer values:', answerValues) // デバッグ用
    console.log('ResultsPage - Answer values length:', answerValues.length) // デバッグ用
    
    // 回答データが存在するかチェック
    if (answerValues.length === 0) {
      console.log('ResultsPage - No answer values found, using fallback calculation')
      return calculateFallbackScore(maleName, femaleName)
    }
    
    // 参加者データの構造を確認
    console.log('ResultsPage - Participants structure:', {
      participants: sessionData.participants,
      males: sessionData.participants?.males,
      females: sessionData.participants?.females
    })
    
    // シンプルに最初の2つの回答を使用（参加者順序に基づく）
    if (answerValues.length < 2) {
      console.log('ResultsPage - Not enough answers, using fallback calculation')
      return calculateFallbackScore(maleName, femaleName)
    }
    
    const maleAnswers = answerValues[0] as any
    const femaleAnswers = answerValues[1] as any
    
    console.log('ResultsPage - Using first two answers:', { maleAnswers, femaleAnswers })
    
    console.log('ResultsPage - Male answers (index 0):', maleAnswers) // デバッグ用
    console.log('ResultsPage - Female answers (index 1):', femaleAnswers) // デバッグ用
    
    // 回答データの内容をチェック
    if (!maleAnswers || !femaleAnswers || 
        typeof maleAnswers !== 'object' || typeof femaleAnswers !== 'object' ||
        Object.keys(maleAnswers).length === 0 || Object.keys(femaleAnswers).length === 0) {
      console.log('ResultsPage - Invalid answer data structure, using fallback calculation')
      console.log('ResultsPage - Male answers valid:', maleAnswers && typeof maleAnswers === 'object' && Object.keys(maleAnswers).length > 0)
      console.log('ResultsPage - Female answers valid:', femaleAnswers && typeof femaleAnswers === 'object' && Object.keys(femaleAnswers).length > 0)
      return calculateFallbackScore(maleName, femaleName)
    }
    
    try {
      // 回答データをAnswer形式に変換
      const maleAnswerArray = Object.entries(maleAnswers).map(([questionId, value]) => ({
        questionId: `opt_love_${questionId}`,
        optionId: `opt_love_${questionId}_${value}`,
        value: value as number,
        timestamp: Date.now()
      }))
      
      const femaleAnswerArray = Object.entries(femaleAnswers).map(([questionId, value]) => ({
        questionId: `opt_love_${questionId}`,
        optionId: `opt_love_${questionId}_${value}`,
        value: value as number,
        timestamp: Date.now()
      }))
      
      console.log('ResultsPage - Male answer array length:', maleAnswerArray.length) // デバッグ用
      console.log('ResultsPage - Female answer array length:', femaleAnswerArray.length) // デバッグ用
      console.log('ResultsPage - Male answer array:', maleAnswerArray) // デバッグ用
      console.log('ResultsPage - Female answer array:', femaleAnswerArray) // デバッグ用
      
      // 恋愛スタイルタイプを計算
      console.log('ResultsPage - Attempting to calculate love style types...')
      const maleType = calculateLoveStyleType(maleAnswerArray, 'male')
      const femaleType = calculateLoveStyleType(femaleAnswerArray, 'female')
      
      console.log('ResultsPage - Calculated types:', { maleType, femaleType })
      
      // 新しい科学的相性計算システムを使用
      const scientificResult = calculateScientificCompatibility(maleAnswers, femaleAnswers)
      
      console.log('ResultsPage - Scientific compatibility result:', scientificResult)
      console.log('ResultsPage - Final score:', scientificResult.totalScore)
      
      return scientificResult.totalScore
    } catch (error) {
      console.error('ResultsPage - Error calculating compatibility:', error)
      const fallbackScore = calculateFallbackScore(maleName, femaleName)
      console.log('ResultsPage - Error fallback score:', fallbackScore) // デバッグ用
      return fallbackScore
    }
  }
  
  // フォールバック計算（回答データがない場合）
  const calculateFallbackScore = (maleName: string, femaleName: string): number => {
    console.log('=== ResultsPage FALLBACK CALCULATION START ===')
    console.log('Male:', maleName, 'Female:', femaleName)
    console.log('WARNING: Using fallback calculation - no answer data available')
    
    // 回答データがない場合の固定スコア（科学的根拠なし）
    // 実際の診断では使用されるべきではない
    const fallbackScore = 70 // 中程度の相性として固定
    
    console.log('Fallback score (fixed):', fallbackScore)
    console.log('=== ResultsPage FALLBACK CALCULATION END ===')
    
    return fallbackScore
  }

  // 診断結果を生成
  const generateDiagnosisResults = (data: any) => {
    console.log('Generating diagnosis results for:', data) // デバッグ用
    
    // 既に計算済みの結果があるかチェック（一貫性を保つため）
    if (data.diagnosisResults && data.diagnosisResults.length > 0) {
      console.log('Using cached diagnosis results for consistency')
      setDiagnosisResults(data.diagnosisResults)
      return
    }
    
    // セッションデータに診断結果が保存されているかチェック
    const savedResults = localStorage.getItem('glassDiagnosisResults')
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults)
        console.log('Using saved diagnosis results from localStorage')
        setDiagnosisResults(parsedResults)
        
        // セッションデータにも保存
        const updatedSessionData = {
          ...data,
          diagnosisResults: parsedResults
        }
        localStorage.setItem('glassSessionData', JSON.stringify(updatedSessionData))
        return
      } catch (error) {
        console.error('Error parsing saved results:', error)
      }
    }
    
    let combinations = []
    
    // データ構造に応じて組み合わせを取得
    if (data.combinations && data.combinations.length > 0) {
      // SessionStartPageからのデータ
      combinations = data.combinations
    } else if (data.couples && data.couples.length > 0) {
      // ModeSelectionPageからのデータ
      combinations = data.couples.map((couple: any) => ({
        male: couple.person1.name,
        female: couple.person2.name
      }))
    } else {
      console.error('No valid combinations found')
      return
    }

    console.log('Combinations to analyze:', combinations) // デバッグ用

    // 各組み合わせの診断結果を生成
    const results = combinations.map((combo: any, index: number) => {
      // 実際の相性計算を使用（セッションデータを渡す）
      const score = calculateRealCompatibilityScore(combo.male, combo.female, data)
      console.log('Calculated score for', combo.male, '&', combo.female, ':', score)
      const types = ['CAPO', 'BEST', 'COOL', 'HOT', 'SWEET']
      const characters = [
        'ほろ酔いロマンチスト',
        '今夜の主役カップル',
        'クールな大人カップル',
        '情熱的なカップル',
        '甘い雰囲気のカップル'
      ]
      
      return {
        id: index + 1,
        couple: { male: combo.male, female: combo.female },
        score: score,
        type: types[index % types.length],
        character: characters[index % characters.length],
        points: [
          'お互いの魅力を引き出す',
          '今夜は特別な時間を',
          '自然な距離感で楽しめる'
        ],
        detailedAnalysis: {
          personalityType: `${combo.male}さんと${combo.female}さんの相性は${score}%！今夜の雰囲気では特に良い相性を見せています。`,
          compatibilityReasons: [
            'お互いの魅力を引き出す',
            '今夜は特別な時間を',
            '自然な距離感で楽しめる',
            'お酒の場での相性が良い',
            'リラックスした雰囲気で楽しめる'
          ],
          datePlans: [
            { emoji: '🌃', title: '夜景の見えるバーで語り合う', description: '静かな雰囲気で深い話ができる' },
            { emoji: '☕', title: '静かなカフェでまったりデート', description: '落ち着いた空間でリラックス' },
            { emoji: '🌅', title: '夕暮れの公園で散歩', description: '自然の中で二人の時間を楽しむ' }
          ],
          warnings: [
            '酔いすぎると甘えすぎ注意',
            '静かな場所で二人の時間を',
            '次の約束は今夜のうちに'
          ]
        }
      }
    })

    // スコア順にソート
    results.sort((a, b) => b.score - a.score)
    
    // 計算結果をセッションデータに保存（一貫性を保つため）
    const updatedSessionData = {
      ...data,
      diagnosisResults: results
    }
    localStorage.setItem('glassSessionData', JSON.stringify(updatedSessionData))
    localStorage.setItem('glassDiagnosisResults', JSON.stringify(results))
    
    setDiagnosisResults(results)
    
    console.log('Generated diagnosis results:', results) // デバッグ用
  }

  // モックデータ（フォールバック用）
  const mockResults = [
    {
      id: 1,
      couple: { male: '田中', female: '佐藤' },
      score: 92,
      type: 'CAPO',
      character: 'ほろ酔いロマンチスト',
      points: [
        '甘えん坊同士で距離縮まる✨',
        '盛り上がったら二人時間つくろ',
        '雰囲気重視でお店選びが鍵🗝️'
      ],
      // 詳細分析データ
      detailedAnalysis: {
        personalityType: 'お酒が進むと甘えん坊モードになる二人。普段はしっかりしているけど、リラックスすると素直な気持ちを表現できるタイプです。今夜のような雰囲気なら、自然と距離が縮まります。',
        compatibilityReasons: [
          '酔い方のペースが似てる',
          '甘えたい・甘えられたいのバランス◎',
          '雰囲気重視で話が合う',
          'お互いの距離感が心地いい',
          'ロマンチックな雰囲気を楽しめる'
        ],
        datePlans: [
          { emoji: '🌃', title: '夜景の見えるバーで語り合う', description: '静かな雰囲気で深い話ができる' },
          { emoji: '☕', title: '静かなカフェでまったりデート', description: '落ち着いた空間でリラックス' },
          { emoji: '🌅', title: '夕暮れの公園で散歩', description: '自然の中で二人の時間を楽しむ' }
        ],
        warnings: [
          '酔いすぎると甘えすぎ注意',
          '静かな場所で二人の時間を',
          '次の約束は今夜のうちに'
        ]
      }
    },
    {
      id: 2,
      couple: { male: '山田', female: '鈴木' },
      score: 88,
      type: 'BEST',
      character: '今夜の主役カップル',
      points: [
        'お互いを高め合う関係',
        'グループのムードメーカー',
        'みんなから注目される存在'
      ],
      // 詳細分析データ
      detailedAnalysis: {
        personalityType: 'グループの中心で輝く二人。お互いを高め合いながら、周りの人たちも楽しませるムードメーカーです。今夜は特に注目の的になるでしょう。',
        compatibilityReasons: [
          'お互いを高め合う関係',
          'グループのムードメーカー',
          'みんなから注目される存在',
          'エネルギッシュな相性',
          '一緒にいると楽しい雰囲気'
        ],
        datePlans: [
          { emoji: '🎉', title: 'カラオケで盛り上がる', description: '二人で歌って楽しむ' },
          { emoji: '🍻', title: '居酒屋で大騒ぎ', description: 'みんなでワイワイ楽しむ' },
          { emoji: '🎪', title: 'イベント会場でデート', description: '賑やかな場所で楽しむ' }
        ],
        warnings: [
          '騒ぎすぎに注意',
          '周りの迷惑にならないよう',
          '適度な距離感を保つ'
        ]
      }
    },
    {
      id: 3,
      couple: { male: '高橋', female: '伊藤' },
      score: 85,
      type: 'COOL',
      character: 'クールな大人カップル',
      points: [
        '落ち着いた雰囲気で楽しむ',
        '上品な会話を楽しむ',
        '静かな時間を大切にする'
      ],
      // 詳細分析データ
      detailedAnalysis: {
        personalityType: '上品で落ち着いた雰囲気の二人。静かな時間を大切にし、深い会話を楽しむ大人のカップルです。今夜は特別な時間を過ごせるでしょう。',
        compatibilityReasons: [
          '落ち着いた雰囲気で楽しむ',
          '上品な会話を楽しむ',
          '静かな時間を大切にする',
          'お互いのペースを尊重',
          '大人の恋愛を楽しむ'
        ],
        datePlans: [
          { emoji: '🍷', title: '高級バーでワイン', description: '上品な雰囲気で楽しむ' },
          { emoji: '🍽️', title: 'フレンチレストラン', description: '特別な夜を演出' },
          { emoji: '🌙', title: '夜景スポットでデート', description: '静かな時間を楽しむ' }
        ],
        warnings: [
          '静かすぎて盛り上がり不足',
          'お互いの気持ちを伝える',
          '時には積極的にアプローチ'
        ]
      }
    }
  ]

  // 表示する結果を決定（実際の診断結果があればそれを使用、なければモックデータ）
  const displayResults = diagnosisResults.length > 0 ? diagnosisResults : mockResults

  // 最高相性ペアを取得
  const highestScore = Math.max(...displayResults.map(r => r.score))
  const highestPair = displayResults.find(r => r.score === highestScore)
  
  // 今夜の注目ポイントを動的に生成
  const generateTonightHighlights = () => {
    const highlights = []
    
    // 現在の時刻を取得
    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.getDay() // 0=日曜日, 1=月曜日...
    
    // 時間帯に応じた注目ポイント
    if (hour >= 18 && hour <= 23) {
      highlights.push('🌅 夕暮れ時間帯の特別な相性診断')
    } else if (hour >= 0 && hour <= 5) {
      highlights.push('🌙 深夜の神秘的な相性診断')
    } else if (hour >= 6 && hour <= 11) {
      highlights.push('🌅 朝の清々しい相性診断')
    } else {
      highlights.push('☀️ 昼間の明るい相性診断')
    }
    
    // 曜日に応じた注目ポイント
    const dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
    const dayName = dayNames[dayOfWeek]
    
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      highlights.push(`🎉 ${dayName}の週末特別診断`)
    } else if (dayOfWeek === 0) {
      highlights.push(`🌅 ${dayName}のリラックス診断`)
    } else {
      highlights.push(`💼 ${dayName}の平日診断`)
    }
    
    // 相性スコアに応じた注目ポイント
    const avgScore = displayResults.reduce((sum, r) => sum + r.score, 0) / displayResults.length
    const maxScore = Math.max(...displayResults.map(r => r.score))
    const minScore = Math.min(...displayResults.map(r => r.score))
    
    if (avgScore >= 85) {
      highlights.push('🌟 全体的に非常に高い相性！')
    } else if (avgScore >= 75) {
      highlights.push('✨ 全体的に良い相性が見られます')
    } else if (avgScore >= 65) {
      highlights.push('💫 バランスの取れた相性分布')
    } else {
      highlights.push('🎯 個性的な相性パターン')
    }
    
    if (maxScore >= 95) {
      highlights.push('👑 最高相性カップルが誕生！')
    } else if (maxScore >= 90) {
      highlights.push('⭐ 高相性カップルが複数組！')
    }
    
    if (maxScore - minScore <= 10) {
      highlights.push('⚖️ 全員の相性が均等で公平！')
    } else if (maxScore - minScore >= 30) {
      highlights.push('🎭 多様な相性パターンが楽しめる！')
    }
    
    // 参加者数に応じた注目ポイント
    if (displayResults.length >= 6) {
      highlights.push('🎪 大勢での盛り上がり診断！')
    } else if (displayResults.length >= 4) {
      highlights.push('👥 グループでの楽しい診断！')
    } else {
      highlights.push('💕 カップルでの親密な診断！')
    }
    
    return highlights
  }
  
  const tonightHighlights = generateTonightHighlights()

  // 相性度に応じた色を取得
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#ffc0cb' // ピンク系
    if (score >= 50) return '#ffd700' // オレンジ系
    return '#87ceeb' // ブルー系
  }

  // マトリックスセルをタップ
  const handleCellTap = (result: any) => {
    navigate('/glass-pair-details', { state: { coupleId: result.id } })
  }

  // ランキングのカップルをタップ
  const handleRankingTap = (result: any) => {
    navigate('/glass-pair-details', { state: { coupleId: result.id } })
  }

  // ロングタップ（投票画面）
  const handleLongTap = (result: any) => {
    // 投票画面への遷移（実装は後で）
    console.log('投票画面:', result)
  }

  // 診断結果が読み込まれていない場合
  if (diagnosisResults.length === 0 && !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">
            🍻 グラスノオト
          </h1>
          <div className="text-lg text-gray-600 mb-6">
            診断結果を読み込み中...
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-600 transition-colors"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div id="diagnosis-results" className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-600 mb-2">
            🍻 グラスノオト
          </h1>
          <div className="text-sm text-gray-500 mb-6">
            今夜の診断結果
          </div>
          
          {/* 画像シェアボタン */}
          <div className="mb-4">
            <ImageShareButton 
              targetElementId="diagnosis-results"
              fileName="glass-note-results"
            />
          </div>
          
          {/* デバッグ情報（開発時のみ表示） */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-400 mb-2">
              診断結果数: {displayResults.length} | セッションデータ: {sessionData ? 'あり' : 'なし'}
            </div>
          )}

          {/* 今夜のランキング */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              🏆 今夜のランキング
            </h2>
            <div className="space-y-3">
              {displayResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleRankingTap(result)}
                  className="w-full bg-gradient-to-r from-orange-200 to-pink-300 rounded-xl p-4 hover:transform hover:-translate-y-1 transition-all duration-200 text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl">
                        {index === 0 ? '👑' : index === 1 ? '⭐' : '💪'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {result.couple.male} & {result.couple.female}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-pink-600">
                      {result.score}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {result.character}
                  </div>
                  <div className="text-xs text-purple-600 tracking-widest">
                    {result.type}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    💌 タップで詳細分析を見る
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 全員の相性マトリックス */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                📊 全員の相性マトリックス
              </h2>
              <button className="text-sm text-purple-600 font-medium">
                タップで見る
              </button>
            </div>
            <div className="bg-gradient-to-r from-cyan-200 to-pink-300 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center font-bold text-gray-800">カップル</div>
                <div className="text-center font-bold text-gray-800">相性度</div>
                <div className="text-center font-bold text-gray-800">タイプ</div>
                
                {displayResults.map((result, index) => (
                  <React.Fragment key={result.id}>
                    <button
                      onClick={() => handleCellTap(result)}
                      className="text-center py-2 hover:bg-white/50 rounded-lg transition-all duration-200"
                    >
                      <div className="font-bold text-gray-800">
                        {result.couple.male}
                      </div>
                      <div className="text-gray-600">&</div>
                      <div className="font-bold text-gray-800">
                        {result.couple.female}
                      </div>
                    </button>
                    <button
                      onClick={() => handleCellTap(result)}
                      className="text-center py-2 hover:bg-white/50 rounded-lg transition-all duration-200"
                    >
                      <div className="text-lg font-bold text-pink-600">
                        {result.score}%
                      </div>
                    </button>
                    <button
                      onClick={() => handleCellTap(result)}
                      className="text-center py-2 hover:bg-white/50 rounded-lg transition-all duration-200"
                    >
                      <div className="font-bold text-purple-600 tracking-widest">
                        {result.type}
                      </div>
                    </button>
                  </React.Fragment>
                ))}
              </div>
              <div className="text-xs text-gray-600 text-center mt-3">
                💌 各セルをタップで詳細分析を見る
              </div>
            </div>
          </div>

          {/* 今夜のハイライト */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              ✨ 今夜のハイライト
            </h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-xl p-4">
                <div className="text-sm font-bold text-gray-800 mb-1">
                  🥇 最強カップル
                </div>
                <div className="text-xs text-gray-600">
                  {displayResults[0]?.couple.male} & {displayResults[0]?.couple.female}
                </div>
                <div className="text-xs text-gray-600">
                  {displayResults[0]?.character}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-200 to-teal-300 rounded-xl p-4">
                <div className="text-sm font-bold text-gray-800 mb-2">
                  💫 今夜の注目ポイント
                </div>
                <div className="space-y-1">
                  {tonightHighlights.slice(0, 3).map((highlight, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      {highlight}
                    </div>
                  ))}
                </div>
                {tonightHighlights.length > 3 && (
                  <div className="text-xs text-gray-500 mt-2">
                    +{tonightHighlights.length - 3}個の注目ポイント
                </div>
                )}
              </div>
            </div>
          </div>

          {/* ボタンエリア */}
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/glass-pair-details')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
            >
              💌 詳細分析を見る
            </button>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate('/glass-punishment-game', { state: { score: highestScore } })}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
              >
                🎲 罰ゲームを見る
              </button>
              <button 
                onClick={() => navigate('/glass-voting', { state: { result: displayResults[0] } })}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
              >
                👥 みんなに投票してもらう
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200">
                📸 ストーリー
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200">
                🐦 ポスト
              </button>
            </div>
          </div>

          {/* フッター */}
          <div className="mt-8 space-y-4">
            <button 
              onClick={() => navigate('/glass-gender-selection')}
              className="w-full bg-white border-2 border-purple-300 text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-purple-50 transition-all duration-200"
            >
              次の診断をする
            </button>
            <div className="text-xs text-gray-500 text-center">
              酔い度で毎回変わる診断結果 | 科学的根拠あり
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}