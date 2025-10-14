import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { 
  Users, 
  Heart, 
  Star, 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Sparkles,
  Crown,
  Target,
  AlertTriangle
} from 'lucide-react'
import { 
  calculateCategoryScores, 
  calculatePersonalityProfile, 
  determineDrinkingType 
} from '../utils/scientificDrinkingAnalysis'
import { generateOverallSummary } from '../utils/overallSummaryGenerator'

export function GroupResultsPage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const [selectedCouple, setSelectedCouple] = useState<{userA: string, userB: string} | null>(null)

  const summary = state.groupRomanticSummary
  const bestCouples = state.bestCouples
  const allCombinations = state.allCombinationsList
  const worstCouple = state.worstCouple

  if (!summary || !allCombinations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">結果を計算中...</p>
        </div>
      </div>
    )
  }

  // 1人の場合の個人診断結果表示
  if (summary.maleCount + summary.femaleCount === 1) {
    const participant = state.groupParticipants[0]
    
    // 科学的根拠に基づいた酒癖タイプの判定
    const getDrinkingType = (participant: any) => {
      if (!participant.diagnosisData || participant.diagnosisData.length === 0) {
        return 'ミステリアスドリンカー'
      }
      
      // カテゴリー別スコアを計算
      const categoryScores = calculateCategoryScores(participant.diagnosisData)
      
      // 性格プロファイルを計算
      const profile = calculatePersonalityProfile(categoryScores)
      
      // 酒癖タイプを判定
      return determineDrinkingType(profile)
    }
    
    const drinkingType = getDrinkingType(participant)
    
    // 酒癖タイプの説明
    const getTypeDescription = (type: string) => {
      const descriptions: { [key: string]: { title: string; description: string } } = {
        'ソーシャルエンハンサー': {
          title: 'ソーシャルエンハンサー',
          description: 'お酒を飲むと社交性がアップし、場を盛り上げるのが得意なタイプ。恋愛でも積極的にアプローチし、相手を楽しませることができます。'
        },
        'ロマンティックエンハンサー': {
          title: 'ロマンティックエンハンサー',
          description: '酔うと恋愛に対して積極的になり、ロマンチックな雰囲気を作るのが上手なタイプ。気になる人との距離を縮めるのが得意です。'
        },
        'コンフィデンスブースター': {
          title: 'コンフィデンスブースター',
          description: 'お酒を飲むと自信がつき、普段は言えないことも言えるようになるタイプ。恋愛でも大胆なアプローチができるようになります。'
        },
        'エモーショナルエクスプレス': {
          title: 'エモーショナルエクスプレス',
          description: '酔うと感情表現が豊かになり、本音で話せるようになるタイプ。恋愛でも素直な気持ちを伝えるのが上手です。'
        },
        'ストレスリリーバー': {
          title: 'ストレスリリーバー',
          description: 'お酒を飲むことでストレスを解消し、リラックスできるタイプ。恋愛でも自然体でいられる魅力があります。'
        },
        'ミステリアスドリンカー': {
          title: 'ミステリアスドリンカー',
          description: 'お酒を飲んでもあまり変化が見られない、クールでミステリアスなタイプ。恋愛でも落ち着いた魅力を放ちます。'
        }
      }
      return descriptions[type] || descriptions['ミステリアスドリンカー']
    }
    
    const typeInfo = getTypeDescription(drinkingType)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              個人酒癖診断結果
            </h1>
            <p className="text-lg text-gray-600">
              あなたの酒癖タイプと恋愛傾向を分析しました
            </p>
          </div>

          {/* 個人結果 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Users className="w-12 h-12 text-purple-500" />
                  <Heart className="w-6 h-6 text-red-400 absolute -top-1 -right-1" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                あなたの酒癖タイプ
              </h2>
              <div className="text-lg text-gray-600 mb-4">
                <span className={`font-bold text-lg ${participant.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                  {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                あなたの酒癖分析
              </h3>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-700 mb-2">
                  あなたは「{typeInfo.title}」の酒癖タイプです！
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {typeInfo.description}
                </p>
                <button
                  onClick={() => {
                    const participant = state.groupParticipants[0]
                    if (participant) {
                      navigate(`/pair-details?maleId=${participant.userId}&femaleId=${participant.userId}`)
                    } else {
                      navigate('/group-results')
                    }
                  }}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  詳細分析を見る
                </button>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="text-center space-y-4">
            <button
              onClick={() => navigate('/group-session-start')}
              className="px-8 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              新しい酒癖診断を始める
            </button>
            
            <div>
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ミチノワトップに戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 全員が同性の場合の特別表示
  if (summary.totalCombinations === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              診断結果
            </h1>
            <p className="text-lg text-gray-600">
              残念！今回は全員が同じ性別でした
            </p>
          </div>

          {/* エラーメッセージ */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Users className="w-16 h-16 text-gray-400" />
                  <AlertTriangle className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                恋愛相性診断ができませんでした
              </h2>
              
              <div className="text-lg text-gray-600 mb-6">
                <div className="mb-2">
                  男性: {summary.maleNames.map((name, index) => (
                    <span key={name}>
                      <span className="text-blue-600 font-bold text-lg">♂ {name}</span>
                      {index < summary.maleNames.length - 1 && '、'}
                    </span>
                  ))}（{summary.maleCount}名）
                </div>
                <div>
                  女性: {summary.femaleNames.map((name, index) => (
                    <span key={name}>
                      <span className="text-pink-600 font-bold text-lg">♀ {name}</span>
                      {index < summary.femaleNames.length - 1 && '、'}
                    </span>
                  ))}（{summary.femaleCount}名）
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <p className="text-yellow-800 leading-relaxed">
                  恋愛相性診断をするには、異性の参加者が必要です。<br />
                  次回は男女混合で、ぜひリベンジしてください！
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  💡 今夜の過ごし方
                </h3>
                <p className="text-blue-700">
                  恋愛よりも、友情を深める夜として楽しみましょう🍻<br />
                  みんなで楽しく飲んで、いい思い出を作ってください！
                </p>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="text-center space-y-4">
            <button
              onClick={() => navigate('/group-session-start')}
              className="px-8 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              新しい酒癖診断を始める
            </button>
            
            <div>
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ミチノワトップに戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleCoupleClick = (maleName: string, femaleName: string) => {
    // 参加者IDを取得
    const maleParticipant = state.groupParticipants.find(p => p.userName === maleName && p.gender === 'male')
    const femaleParticipant = state.groupParticipants.find(p => p.userName === femaleName && p.gender === 'female')
    
    if (maleParticipant && femaleParticipant) {
      navigate(`/pair-details?maleId=${maleParticipant.userId}&femaleId=${femaleParticipant.userId}`)
    }
  }

  const getStarRating = (score: number) => {
    const stars = Math.ceil(score / 20)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  const getCompatibilityLevel = (score: number) => {
    if (score >= 80) return '相性抜群！'
    if (score >= 60) return 'いい感じ'
    if (score >= 40) return '微妙'
    return '友達止まり'
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー - スマホ版はコンパクト、PC版はポップアート風 */}
        <div className="text-center mb-3 md:mb-8 card p-2 md:p-6" style={{background: '#FFD700', transform: 'rotate(0deg) md:rotate(-2deg)'}}>
          <div className="mb-2 md:mb-4 hidden lg:block">
            <span className="sound-effect pop-red absolute top-4 left-4" style={{transform: 'rotate(-15deg)'}}>POW!</span>
            <span className="sound-effect pop-blue absolute top-4 right-4" style={{transform: 'rotate(15deg)'}}>BANG!</span>
          </div>
          {/* スマホ版タイトル */}
          <div className="lg:hidden">
            <h1 className="text-xl font-bold mb-1">
              酒癖診断結果
            </h1>
            <p className="text-xs font-bold">
              🍺 結果を楽しもう！ 🍶
            </p>
          </div>
          {/* PC版タイトル */}
          <div className="hidden md:flex justify-center items-center gap-6 mb-4 mt-8">
            <span className="text-7xl" style={{transform: 'rotate(-10deg)'}}>🍺</span>
            <h1 className="heading-primary text-7xl md:text-8xl">
              酒癖診断結果
            </h1>
            <span className="text-7xl" style={{transform: 'rotate(10deg)'}}>🍶</span>
          </div>
          <p className="text-xl font-black text-black hidden lg:block" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
            ★ みんなで端末を囲んで結果を楽しみましょう！ ★
          </p>
        </div>

        {/* グループ全体の恋愛傾向サマリー */}
        <div className="card mb-3 md:mb-6 p-3 md:p-6" style={{background: '#FFFFFF'}}>
          <div className="text-center mb-3 md:mb-6">
            <div className="flex justify-center mb-2 md:mb-4">
              <div className="relative p-2 md:p-4 bg-blue-500 rounded-full border-2 md:border-4 border-black" style={{boxShadow: '2px 2px 0 #000000, 5px 5px 0 #000000'}}>
                <Users className="w-6 h-6 md:w-12 md:h-12 text-white" />
                <Heart className="w-3 h-3 md:w-6 md:h-6 text-red-500 absolute -top-1 -right-1 animate-pulse" style={{filter: 'drop-shadow(1px 1px 0 #000000)'}} />
              </div>
            </div>
            {/* スマホ版タイトル */}
            <h2 className="text-base font-bold mb-2 lg:hidden">
              🍻 今夜のメンバー 🍻
            </h2>
            {/* PC版タイトル */}
            <h2 className="heading-secondary hidden lg:block">
              <span style={{fontSize: '2rem'}}>🍻</span> 今夜の診断メンバー <span style={{fontSize: '2rem'}}>🍻</span>
            </h2>
            <div className="text-xs md:text-lg font-bold text-black mb-2 md:mb-4" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
              <div className="mb-1 md:mb-2">
                男性: {summary.maleNames.map((name, index) => (
                  <span key={name}>
                    <span className="inline-block px-1 md:px-3 py-0.5 md:py-1 bg-blue-500 text-white rounded md:rounded-lg border md:border-3 border-black text-xs md:text-base" style={{boxShadow: '1px 1px 0 #000000, 2px 2px 0 #000000', fontWeight: '900'}}>♂ {name}</span>
                    {index < summary.maleNames.length - 1 && ' '}
                  </span>
                ))}（{summary.maleCount}名）
              </div>
              <div>
                女性: {summary.femaleNames.map((name, index) => (
                  <span key={name}>
                    <span className="inline-block px-1 md:px-3 py-0.5 md:py-1 bg-pink-500 text-white rounded md:rounded-lg border md:border-3 border-black text-xs md:text-base" style={{boxShadow: '1px 1px 0 #000000, 2px 2px 0 #000000', fontWeight: '900'}}>♀ {name}</span>
                    {index < summary.femaleNames.length - 1 && ' '}
                  </span>
                ))}（{summary.femaleCount}名）
              </div>
            </div>
            <div className="text-xs md:text-base font-black text-black mb-2 md:mb-4" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              異性間の組み合わせ: 全<span className="text-lg md:text-3xl pop-yellow">{summary.totalCombinations}</span>通り
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 mb-3 md:mb-6">
            <div className="p-3 md:p-6 rounded-lg md:rounded-xl text-center transition-all duration-200 hover:transform hover:scale-105 hover:rotate-2" style={{
              background: '#0066FF',
              border: '2px md:border-5 solid #000000',
              boxShadow: '2px 2px 0 #000000, 6px 6px 0 #000000'
            }}>
              <TrendingUp className="w-6 h-6 md:w-10 md:h-10 text-white mx-auto mb-1 md:mb-2" />
              <div className="text-2xl md:text-5xl font-black text-white" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '1px md:2px #000000'}}>
                {summary.averageScore}点
              </div>
              <div className="text-xs md:text-sm text-white font-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>平均相性スコア</div>
            </div>
            
            <div className="p-3 md:p-6 rounded-lg md:rounded-xl text-center transition-all duration-200 hover:transform hover:scale-105 hover:rotate-2" style={{
              background: '#FFD700',
              border: '2px md:border-5 solid #000000',
              boxShadow: '2px 2px 0 #000000, 6px 6px 0 #000000'
            }}>
              <Trophy className="w-6 h-6 md:w-10 md:h-10 text-red-600 mx-auto mb-1 md:mb-2 animate-bounce" style={{filter: 'drop-shadow(1px 1px 0 #000000)'}} />
              <div className="text-xs md:text-base font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                <span className="px-1 md:px-2 py-0.5 md:py-1 bg-blue-500 text-white rounded text-xs md:text-base">♂ {summary.maxScore.maleName}</span> × <span className="px-1 md:px-2 py-0.5 md:py-1 bg-pink-500 text-white rounded text-xs md:text-base">♀ {summary.maxScore.femaleName}</span>
              </div>
              <div className="text-xl md:text-3xl font-black text-red-600 mt-1 md:mt-2" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '0.5px md:1px #000000'}}>{summary.maxScore.score}点 🏆</div>
            </div>
            
            <div className="p-3 md:p-6 rounded-lg md:rounded-xl text-center transition-all duration-200 hover:transform hover:scale-105 hover:rotate-2" style={{
              background: '#FF6600',
              border: '2px md:border-5 solid #000000',
              boxShadow: '2px 2px 0 #000000, 6px 6px 0 #000000'
            }}>
              <TrendingDown className="w-6 h-6 md:w-10 md:h-10 text-white mx-auto mb-1 md:mb-2" />
              <div className="text-xs md:text-base font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                <span className="px-1 md:px-2 py-0.5 md:py-1 bg-blue-900 text-white rounded text-xs md:text-base">♂ {summary.minScore.maleName}</span> × <span className="px-1 md:px-2 py-0.5 md:py-1 bg-pink-900 text-white rounded text-xs md:text-base">♀ {summary.minScore.femaleName}</span>
              </div>
              <div className="text-xl md:text-3xl font-black text-white mt-1 md:mt-2" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '0.5px md:1px #000000'}}>{summary.minScore.score}点</div>
            </div>
          </div>

          {/* イキリスの総評コメント - 吹き出し風 */}
          <div className="relative mt-3 md:mt-8">
            <div className="flex items-start gap-2 md:gap-4">
              {/* イキリスのキャラクター */}
              <div className="flex-shrink-0">
                <div className="relative w-12 h-12 md:w-24 md:h-24 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform" style={{
                  background: '#00CC44',
                  border: '2px md:border-4 solid #000000',
                  boxShadow: '2px 2px 0 #000000, 5px 5px 0 #000000'
                }}>
                  <span className="text-xl md:text-4xl">🐿️</span>
                  <span className="absolute -right-0.5 md:-right-1 bottom-1 md:bottom-2 text-sm md:text-2xl transform rotate-12">🍺</span>
                </div>
                <div className="text-center mt-1 md:mt-2 px-1 md:px-2 py-0.5 md:py-1 bg-black rounded md:rounded-lg border border-black md:border-2" style={{boxShadow: '1px 1px 0 #FF0000, 2px 2px 0 #FF0000'}}>
                  <p className="text-xs font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>イキリス</p>
                </div>
              </div>
              
              {/* 吹き出し */}
              <div className="flex-1 relative">
                <div className="rounded-lg md:rounded-2xl p-3 md:p-6 relative" style={{
                  background: '#FFFFFF',
                  border: '2px md:border-5 solid #000000',
                  boxShadow: '3px 3px 0 #000000, 6px 6px 0 #000000'
                }}>
                  {/* 吹き出しの三角形 - PC版のみ表示 */}
                  <div className="hidden lg:block absolute left-0 top-8 transform -translate-x-4">
                    <div className="w-0 h-0" style={{
                      borderTop: '15px solid transparent',
                      borderRight: '15px solid #FFFFFF',
                      borderBottom: '15px solid transparent'
                    }}></div>
                    <div className="w-0 h-0 absolute top-0 left-0 transform -translate-x-1" style={{
                      borderTop: '16px solid transparent',
                      borderRight: '16px solid #000000',
                      borderBottom: '16px solid transparent'
                    }}></div>
                  </div>
                  
                  <div className="flex items-start gap-1 md:gap-2 mb-2 md:mb-3">
                    <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-500 flex-shrink-0 mt-0.5 md:mt-1" style={{filter: 'drop-shadow(1px 1px 0 #000000)'}} />
                    <h3 className="text-xs md:text-xl font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                      <span className="lg:hidden">💥 今夜の分析 💥</span>
                      <span className="hidden md:inline">💥 今夜の飲み会、俺が分析したるわ！ 💥</span>
                    </h3>
                  </div>
                  
                  <p className="text-black leading-relaxed text-xs md:text-base font-bold pl-0 md:pl-7" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
                    {(() => {
                      // 全カップルの相性度データを抽出
                      const couplesData = allCombinations.combinations
                        .filter(c => c.maleId && c.femaleId)
                        .map(c => ({ compatibility: c.romanticScore }))
                      
                      // 総評を生成
                      return generateOverallSummary(couplesData)
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ベストカップルTop3 - ポップアート風 */}
        {bestCouples.filter(couple => couple.maleId && couple.femaleId).length > 0 && (
          <div className="card mb-6" style={{background: '#FFD700', transform: 'rotate(-1deg)'}}>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-yellow-400 rounded-full border-5 border-black animate-pulse" style={{boxShadow: '6px 6px 0 #000000'}}>
                  <Crown className="w-14 h-14 text-white" style={{filter: 'drop-shadow(3px 3px 0 #000000)'}} />
                </div>
              </div>
              <h2 className="heading-secondary" style={{color: '#FF0000', WebkitTextStroke: '2px #000000', textShadow: '4px 4px 0 #FFD700'}}>
                🏆 今夜くっつけるべきカップルTop3 🏆
              </h2>
              <p className="text-lg font-black text-black mt-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                ★ この3組は今夜が勝負！ ★
              </p>
            </div>

            <div className="space-y-4">
              {bestCouples
                .filter(couple => couple.maleId && couple.femaleId)
                .map((couple) => {
                  // 順位ごとの配色を定義（ポップアート風のビビッドカラー）
                  const rankColors = {
                    1: { bg: '#FF0000', text: '#FFFFFF', scoreColor: '#FFFF00' }, // 1位: 赤背景、白文字、黄色スコア
                    2: { bg: '#0066FF', text: '#FFFFFF', scoreColor: '#FFD700' }, // 2位: 青背景、白文字、金色スコア
                    3: { bg: '#FF6600', text: '#FFFFFF', scoreColor: '#FFFFFF' }  // 3位: オレンジ背景、白文字、白スコア
                  }
                  const colors = rankColors[couple.rank as keyof typeof rankColors]
                  
                  return (
                    <div
                      key={`${couple.maleId}-${couple.femaleId}`}
                      className="p-3 md:p-6 rounded-lg md:rounded-xl border-2 md:border-5 border-black cursor-pointer transform transition-all duration-200 hover:scale-105 hover:-rotate-1"
                      style={{
                        background: colors.bg,
                        boxShadow: '8px 8px 0 #000000'
                      }}
                      onClick={() => handleCoupleClick(couple.maleName, couple.femaleName)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="text-2xl md:text-5xl">
                            {couple.rank === 1 ? '🥇' : couple.rank === 2 ? '🥈' : '🥉'}
                          </div>
                          <div>
                            <div className="text-base md:text-2xl font-black mb-1 md:mb-2" style={{fontFamily: 'Bangers, sans-serif', color: colors.text, textShadow: '3px 3px 0 #000000'}}>
                              {couple.rank}位
                            </div>
                            <div className="text-sm md:text-xl font-black mb-1" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                              <span className="inline-block px-1.5 md:px-2 py-0.5 md:py-1 bg-white text-black rounded border-2 md:border-3 border-black mr-1" style={{boxShadow: '2px 2px 0 #000000, 3px 3px 0 #000000', fontWeight: 900}}>♂ {couple.maleName}</span>
                              <span className="mx-1 md:mx-2" style={{color: colors.text, fontWeight: 900}}>×</span>
                              <span className="inline-block px-1.5 md:px-2 py-0.5 md:py-1 bg-white text-black rounded border-2 md:border-3 border-black" style={{boxShadow: '2px 2px 0 #000000, 3px 3px 0 #000000', fontWeight: 900}}>♀ {couple.femaleName}</span>
                            </div>
                            <div className="text-xl md:text-3xl font-black" style={{fontFamily: 'Bangers, sans-serif', color: colors.scoreColor, textShadow: '3px 3px 0 #000000', WebkitTextStroke: couple.rank === 1 ? '1px #000000' : '0'}}>
                              {couple.romanticScore}点 🍻
                            </div>
                          </div>
                        </div>
                        <div className="p-1.5 md:p-3 bg-white rounded-full border-2 md:border-3 border-black" style={{boxShadow: '2px 2px 0 #000000, 3px 3px 0 #000000'}}>
                          <ArrowRight className="w-4 h-4 md:w-8 md:h-8 text-black" />
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* 全組み合わせリスト - ポップアート風 */}
        <div className="card mb-6" style={{background: '#FFFFFF', transform: 'rotate(1deg)'}}>
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-orange-500 rounded-full border-5 border-black" style={{boxShadow: '6px 6px 0 #000000'}}>
                <Target className="w-12 h-12 text-white" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              </div>
            </div>
            <h2 className="heading-secondary" style={{color: '#FF6600', WebkitTextStroke: '2px #000000', textShadow: '4px 4px 0 #0066FF'}}>
              📋 全組み合わせ一覧（異性間のみ）
            </h2>
            <p className="text-lg font-black text-black mt-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ スコア順に表示されています 🍶 ★
            </p>
          </div>

          <div className="space-y-3">
            {allCombinations.combinations
              .filter(combination => {
                const hasMaleId = combination.maleId && combination.maleName
                const hasFemaleId = combination.femaleId && combination.femaleName
                return hasMaleId && hasFemaleId
              })
              .map((combination) => (
              <div
                key={`${combination.maleId}-${combination.femaleId}`}
                className="p-2.5 md:p-4 rounded-lg md:rounded-xl border-2 md:border-4 border-black cursor-pointer transform transition-all duration-200 hover:scale-105 hover:rotate-1"
                style={{
                  background: '#FFE4B5',
                  boxShadow: '5px 5px 0 #000000'
                }}
                onClick={() => handleCoupleClick(combination.maleName, combination.femaleName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-7 h-7 md:w-12 md:h-12 rounded-full bg-orange-500 border-2 md:border-3 border-black flex items-center justify-center" style={{boxShadow: '2px 2px 0 #000000, 3px 3px 0 #000000'}}>
                      <span className="text-sm md:text-xl font-black text-white" style={{fontFamily: 'Bangers, sans-serif'}}>
                        {combination.rank}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm md:text-lg font-black text-black mb-0.5 md:mb-1" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                        <span className="inline-block px-1.5 md:px-2 py-0.5 md:py-1 bg-blue-500 text-white rounded border border-black md:border-2 mr-1">♂ {combination.maleName}</span>
                        <span className="mx-1 md:mx-2">×</span>
                        <span className="inline-block px-1.5 md:px-2 py-0.5 md:py-1 bg-pink-500 text-white rounded border border-black md:border-2">♀ {combination.femaleName}</span>
                      </div>
                      <div className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-yellow-300 rounded md:rounded-lg border border-black md:border-2" style={{boxShadow: '1px 1px 0 #000000, 2px 2px 0 #000000'}}>
                        <span className="text-xs md:text-sm font-black text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                          {combination.compatibilityLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-3xl font-black text-red-600 mb-0.5 md:mb-1" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '1px #000000'}}>
                      {combination.romanticScore}点
                    </div>
                    <div className="text-sm md:text-lg font-bold text-yellow-600">
                      {getStarRating(combination.romanticScore)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ワーストカップル（5組以上の時のみ表示） - ポップアート風 */}
        {worstCouple && worstCouple.maleId && worstCouple.femaleId && summary.totalCombinations >= 5 && (
          <div className="card mb-4 md:mb-6 p-3 md:p-6" style={{background: '#FF0000', transform: 'rotate(-1deg)'}}>
            <div className="text-center mb-3 md:mb-6">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="p-2 md:p-4 bg-red-600 rounded-full border-2 md:border-5 border-black animate-pulse" style={{boxShadow: '2px 2px 0 #000000, 6px 6px 0 #000000'}}>
                  <AlertTriangle className="w-6 h-6 md:w-12 md:h-12 text-white" />
                </div>
              </div>
              <h2 className="text-base font-extrabold text-white md:heading-secondary" style={{WebkitTextStroke: '0 md:2px #000000', textShadow: '0 0 0 #FF6600, 4px 4px 0 #FF6600'}}>
                <span className="lg:hidden">⚠️ ワーストカップル ⚠️</span>
                <span className="hidden md:inline">⚠️ 絶対くっつかないカップル ⚠️</span>
              </h2>
              <p className="hidden md:block text-lg font-black text-white mt-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                ★ この組み合わせは要注意！ ★
              </p>
            </div>

            <div className="p-3 md:p-6 rounded-lg md:rounded-xl border-2 md:border-5 border-black" style={{background: '#FFE4E4', boxShadow: '3px 3px 0 #000000, 8px 8px 0 #000000'}}>
              <div className="text-center">
                <div className="text-sm md:text-2xl font-black text-black mb-2 md:mb-3" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
                  <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-blue-500 text-white rounded border border-black md:border-2 mr-1">♂ {worstCouple.maleName}</span>
                  <span className="mx-1 md:mx-2">×</span>
                  <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-pink-500 text-white rounded border border-black md:border-2">♀ {worstCouple.femaleName}</span>
                </div>
                <div className="text-2xl md:text-5xl font-black text-red-700 mb-2 md:mb-4" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '1px md:2px #000000'}}>
                  {worstCouple.romanticScore}点 💔
                </div>
                <div className="p-2 md:p-4 bg-white rounded border-2 md:rounded-lg md:border-3 border-black" style={{boxShadow: '2px 2px 0 #000000, 3px 3px 0 #000000'}}>
                  <p className="text-xs md:text-base text-black font-bold leading-snug md:leading-relaxed" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
                    {worstCouple.humorousComment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/group-session-start')}
            className="btn-primary px-10 py-4 text-xl font-extrabold"
          >
            🍻 新しい飲み会を始める 🍻
          </button>
          
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-amber-700 hover:text-orange-800 text-base font-semibold underline"
            >
              ミチノワトップに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
