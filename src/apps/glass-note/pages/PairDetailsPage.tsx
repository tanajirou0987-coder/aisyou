import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { calculateLoveStyleType, LoveStyleResult } from '../../../utils/loveStyleCalculator'
import { calculateCompatibilityScore } from '../../../utils/loveCompatibilityMatrix'
import { calculateComprehensiveCompatibility, ComprehensiveCompatibilityResult } from '../../../utils/scientificCompatibilityCalculator'

export function PairDetailsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useApp()
  const [showScientificBasis, setShowScientificBasis] = useState(false)
  const [selectedCoupleId, setSelectedCoupleId] = useState<number>(1)
  const [sessionData, setSessionData] = useState<any>(null)
  const [allCouplesData, setAllCouplesData] = useState<any[]>([])

  // セッションデータを読み込み
  useEffect(() => {
    const savedSessionData = localStorage.getItem('glassSessionData')
    if (savedSessionData) {
      const data = JSON.parse(savedSessionData)
      console.log('PairDetailsPage - Session data:', data) // デバッグ用
      setSessionData(data)
      
      // 実際の診断結果を生成
      generateDiagnosisResults(data)
    } else {
      console.error('No session data found')
      // セッションデータがない場合はホームに戻る
      navigate('/')
    }
  }, [navigate])

  // 診断結果を生成
  const generateDiagnosisResults = (data: any) => {
    console.log('PairDetailsPage - Generating diagnosis results for:', data) // デバッグ用
    
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

    console.log('PairDetailsPage - Combinations to analyze:', combinations) // デバッグ用

    // 実際の回答データを使用した相性計算関数
    const calculateRealCompatibilityScore = (maleName: string, femaleName: string, sessionData: any): number => {
      // セッションデータから回答データを取得
      const answers = sessionData.answers || {}
      
      // 男性と女性の回答データを取得
      const maleAnswers = Object.values(answers).find((userAnswers: any) => {
        // 参加者名から回答者を特定（簡易的な方法）
        return userAnswers && Object.keys(userAnswers).length > 0
      }) as any
      
      const femaleAnswers = Object.values(answers).find((userAnswers: any, index: number) => {
        // 2番目の回答者を女性として扱う（簡易的な方法）
        return userAnswers && Object.keys(userAnswers).length > 0 && index === 1
      }) as any
      
      if (!maleAnswers || !femaleAnswers) {
        console.log('No answer data found, using fallback calculation')
        // 回答データがない場合はフォールバック計算
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
        
        // 恋愛スタイルタイプを計算
        const maleType = calculateLoveStyleType(maleAnswerArray, 'male')
        const femaleType = calculateLoveStyleType(femaleAnswerArray, 'female')
        
        console.log('PairDetailsPage - Calculated types:', { maleType, femaleType })
        
        // 包括的科学的相性計算
        const comprehensiveResult = calculateComprehensiveCompatibility(maleType, femaleType)
        
        console.log('PairDetailsPage - Comprehensive compatibility result:', comprehensiveResult)
        
        return comprehensiveResult.totalScore
      } catch (error) {
        console.error('Error calculating compatibility:', error)
        return calculateFallbackScore(maleName, femaleName)
      }
    }
    
    // フォールバック計算（回答データがない場合）
    const calculateFallbackScore = (maleName: string, femaleName: string): number => {
      // 名前の文字数と文字の種類に基づく基本的な相性計算
      const maleLength = maleName.length
      const femaleLength = femaleName.length
      const maleVowels = (maleName.match(/[あいうえおアイウエオ]/g) || []).length
      const femaleVowels = (femaleName.match(/[あいうえおアイウエオ]/g) || []).length
      
      // 基本的な相性スコア（45-95の範囲でより分散）
      let baseScore = 45
      
      // 名前の長さの差が小さいほど相性が良い（最大+20点）
      const lengthDiff = Math.abs(maleLength - femaleLength)
      baseScore += Math.max(0, 20 - lengthDiff * 3)
      
      // 母音の数の差が小さいほど相性が良い（最大+15点）
      const vowelDiff = Math.abs(maleVowels - femaleVowels)
      baseScore += Math.max(0, 15 - vowelDiff * 3)
      
      // 名前の文字の種類の多様性（最大+12点）
      const maleUniqueChars = new Set(maleName).size
      const femaleUniqueChars = new Set(femaleName).size
      const charDiversity = Math.abs(maleUniqueChars - femaleUniqueChars)
      baseScore += Math.max(0, 12 - charDiversity * 2)
      
      // 個別性を高めるための名前ベースの計算（最大+15点）
      const maleHash = maleName.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0)
      const femaleHash = femaleName.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0)
      const hashDiff = Math.abs(maleHash - femaleHash) % 25
      baseScore += Math.max(0, 15 - hashDiff)
      
      // 文字の音韻的相性（最大+10点）
      const maleConsonants = maleName.replace(/[あいうえおアイウエオ]/g, '').length
      const femaleConsonants = femaleName.replace(/[あいうえおアイウエオ]/g, '').length
      const consonantDiff = Math.abs(maleConsonants - femaleConsonants)
      baseScore += Math.max(0, 10 - consonantDiff * 2)
      
      // ランダム要素（お酒の場での相性の不確実性を表現）
      const randomFactor = (Math.random() - 0.5) * 12 // -6 から +6
      baseScore += randomFactor
      
      // スコアを45-95の範囲に収める（より広い分散）
      return Math.max(45, Math.min(95, Math.round(baseScore)))
    }

    // 各組み合わせの診断結果を生成
    const results = combinations.map((combo: any, index: number) => {
      // 実際の相性計算を使用（セッションデータを渡す）
      const score = calculateRealCompatibilityScore(combo.male, combo.female, data)
      const types = ['CAPO', 'BEST', 'COOL', 'HOT', 'SWEET']
      const characters = [
        'ほろ酔いロマンチスト',
        '今夜の主役カップル',
        'クールな大人カップル',
        '情熱的なカップル',
        '甘い雰囲気のカップル'
      ]
      const catchphrases = [
        '🔥 今夜が勝負！',
        '✨ 特別な夜に',
        '💕 運命の出会い',
        '🌟 最高の相性',
        '🎉 盛り上がろう！'
      ]
      
      return {
        id: index + 1,
        couple: { male: combo.male, female: combo.female },
        score: score,
        type: types[Math.floor(Math.random() * types.length)],
        character: characters[Math.floor(Math.random() * characters.length)],
        catchphrase: catchphrases[Math.floor(Math.random() * catchphrases.length)],
        points: [
          'お互いの魅力を引き出す',
          '今夜は特別な時間を',
          '自然な距離感で楽しめる'
        ],
        detailedAnalysis: {
          personalityType: `${combo.male}さんと${combo.female}さんの相性は${score}%！今夜の雰囲気では特に良い相性を見せています。お酒が進むと甘えん坊モードになる二人。普段はしっかりしているけど、リラックスすると素直な気持ちを表現できるタイプです。今夜のような雰囲気なら、自然と距離が縮まります。`,
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
      }
    })

    // スコア順にソート
    results.sort((a, b) => b.score - a.score)
    setAllCouplesData(results)
    
    console.log('PairDetailsPage - Generated diagnosis results:', results) // デバッグ用
  }

  // モックデータ（フォールバック用）
  const mockCouplesData = [
    {
      id: 1,
      couple: { male: '田中', female: '佐藤' },
      score: 92,
      type: 'CAPO',
      character: 'ほろ酔いロマンチスト',
      catchphrase: '🔥 今夜が勝負！',
      points: [
        '甘えん坊同士で距離縮まる✨',
        '盛り上がったら二人時間つくろ',
        '雰囲気重視でお店選びが鍵🗝️'
      ],
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
      catchphrase: '🌟 みんなの注目の的！',
      points: [
        'お互いを高め合う関係',
        'グループのムードメーカー',
        'みんなから注目される存在'
      ],
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
      catchphrase: '💎 上品な大人の恋愛',
      points: [
        '落ち着いた雰囲気で楽しむ',
        '上品な会話を楽しむ',
        '静かな時間を大切にする'
      ],
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

  // 表示するデータを決定（実際の診断結果があればそれを使用、なければモックデータ）
  const displayData = allCouplesData.length > 0 ? allCouplesData : mockCouplesData

  // 現在選択されているカップルのデータを取得
  const currentCouple = displayData.find(couple => couple.id === selectedCoupleId) || displayData[0]

  // 初期化時にURLパラメータからカップルIDを取得
  useEffect(() => {
    const coupleId = location.state?.coupleId || 1
    setSelectedCoupleId(coupleId)
  }, [location.state])

  // ドロップダウンでカップルを変更
  const handleCoupleChange = (coupleId: number) => {
    setSelectedCoupleId(coupleId)
    // スクロールを一番上に戻す
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 診断結果が読み込まれていない場合
  if (allCouplesData.length === 0 && !sessionData) {
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
    <div className="min-h-screen bg-white">
      {/* ヘッダー（固定） */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between p-4 gap-4">
          <button 
            onClick={() => navigate('/glass-results')}
            className="px-4 py-2 text-sm font-semibold bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-200 whitespace-nowrap"
          >
            ← ランキングに戻る
          </button>
          
          <div className="flex-1 flex items-center gap-3">
            <label htmlFor="couple-dropdown" className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              カップルを選択：
            </label>
            <select
              id="couple-dropdown"
              value={selectedCoupleId}
              onChange={(e) => handleCoupleChange(Number(e.target.value))}
              className="flex-1 px-4 py-3 text-sm font-semibold bg-gray-50 border-2 border-purple-500 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              {displayData.map((couple) => (
                <option key={couple.id} value={couple.id}>
                  {couple.couple.male}さん & {couple.couple.female}さん ({couple.score}%)
                </option>
              ))}
            </select>
          </div>
          
          <button className="px-4 py-2 text-sm font-semibold bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-200 whitespace-nowrap">
            📤 シェア
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="px-4 pb-8">
        {/* ペア情報 */}
        <div className="text-center mb-8 pt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentCouple.couple.male}さん & {currentCouple.couple.female}さん
          </h2>
          <div className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-1">
            {currentCouple.character}
          </div>
          <div className="text-lg text-purple-600 tracking-widest">
            {currentCouple.type}
          </div>
        </div>

        {/* 相性スコアサマリー */}
        <div className="bg-gradient-to-r from-orange-200 to-pink-300 rounded-2xl p-6 mb-6 text-center">
          <div className="text-4xl font-bold text-pink-600 mb-2">
            {currentCouple.score}%
          </div>
          <div className="text-lg font-bold text-gray-800">
            {currentCouple.catchphrase}
          </div>
        </div>

        {/* 性格タイプ説明 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            🍷 あなたたちのタイプ
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {currentCouple.detailedAnalysis.personalityType}
          </p>
        </div>

        {/* 相性が良い理由 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            💕 相性が良い理由
          </h3>
          <div className="space-y-3">
            {currentCouple.detailedAnalysis.compatibilityReasons.map((reason, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-pink-500 font-bold">{index + 1}.</div>
                <div className="text-sm text-gray-700">{reason}</div>
              </div>
            ))}
          </div>
        </div>

        {/* おすすめデートプラン */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📍 二人にぴったりのデート
          </h3>
          <div className="space-y-4">
            {currentCouple.detailedAnalysis.datePlans.map((plan, index) => (
              <div key={index} className={`bg-gradient-to-r ${
                index === 0 ? 'from-purple-100 to-pink-100' :
                index === 1 ? 'from-orange-100 to-yellow-100' :
                'from-green-100 to-teal-100'
              } rounded-xl p-4`}>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">{plan.emoji}</div>
                  <div className="font-bold text-gray-800">{plan.title}</div>
                </div>
                <div className="text-sm text-gray-600">{plan.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 注意ポイント */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            ⚠️ 気をつけるポイント
          </h3>
          <div className="space-y-3">
            {currentCouple.detailedAnalysis.warnings.map((warning, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-yellow-500">⚠️</div>
                <div className="text-sm text-gray-700">{warning}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 科学的根拠セクション */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <button 
            onClick={() => setShowScientificBasis(!showScientificBasis)}
            className="w-full flex items-center justify-between"
          >
            <h3 className="text-lg font-bold text-gray-800">
              🔬 診断の根拠
            </h3>
            <div className="text-gray-500">
              {showScientificBasis ? '▼' : '▶'}
            </div>
          </button>
          {showScientificBasis && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-700 leading-relaxed">
                この診断は、恋愛心理学の「愛の言語」理論と「アタッチメント理論」を基にしています。お酒の場での行動パターンから、二人の相性を科学的に分析。酔い方のペースや甘え方の傾向から、深層心理の相性を判定しています。
              </p>
            </div>
          )}
        </div>

        {/* 次のアクション */}
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/glass-results')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200"
          >
            ← ランキングに戻る
          </button>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => navigate('/glass-gender-selection')}
              className="flex-1 bg-white border-2 border-purple-300 text-purple-600 font-bold py-3 px-4 rounded-xl hover:bg-purple-50 transition-all duration-200"
            >
              次の診断をする
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-200">
              この結果をシェア
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}