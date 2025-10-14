import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, Heart, Wine, Users, Sparkles, Tag } from 'lucide-react'
import { 
  calculateCategoryScores, 
  calculatePersonalityProfile, 
  determineDrinkingType 
} from '../utils/scientificDrinkingAnalysis'
import { getTypeKeywords } from '../data/drinkingTypeKeywords'

export function DrinkingDetailsPage() {
  const navigate = useNavigate()
  const { state } = useApp()

  const participant = state.groupParticipants[0] // 個人診断の場合

  if (!participant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">参加者情報が見つかりません</p>
          <button
            onClick={() => navigate('/group-session-start')}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            酒癖診断を始める
          </button>
        </div>
      </div>
    )
  }

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

  // キーワードを取得
  const typeKeywords = getTypeKeywords(drinkingType)

  // 詳細な分析データ
  const getDetailedAnalysis = (type: string) => {
    const analyses: { [key: string]: any } = {
      'ソーシャルエンハンサー': {
        title: 'ソーシャルエンハンサー',
        description: 'お酒を飲むと社交性がアップし、場を盛り上げるのが得意なタイプ。恋愛でも積極的にアプローチし、相手を楽しませることができます。',
        strengths: [
          '場を盛り上げるのが得意',
          '人との距離を縮めるのが上手',
          '明るく楽しい雰囲気を作れる',
          'コミュニケーション能力が高い'
        ],
        challenges: [
          '飲みすぎてしまうことがある',
          '相手のペースを考えずに進めがち',
          '深い話をするのが苦手'
        ],
        advice: [
          '相手の反応を見ながら話を進める',
          '時には聞き役に回ることも大切',
          '飲みすぎないよう注意する'
        ],
        dateIdeas: [
          'カラオケデート',
          '居酒屋での飲み会',
          'パーティーやイベント参加',
          'バーでのカジュアルな飲み会'
        ],
        communicationTips: [
          '相手の話をよく聞く',
          '適度な距離感を保つ',
          '相手のペースに合わせる',
          '深い話もできるように心がける'
        ]
      },
      'ロマンティックエンハンサー': {
        title: 'ロマンティックエンハンサー',
        description: '酔うと恋愛に対して積極的になり、ロマンチックな雰囲気を作るのが上手なタイプ。気になる人との距離を縮めるのが得意です。',
        strengths: [
          'ロマンチックな雰囲気を作れる',
          '相手を特別扱いできる',
          '恋愛に対して積極的',
          '甘い言葉をかけるのが上手'
        ],
        challenges: [
          '相手が重く感じることもある',
          '現実的でない期待をしてしまう',
          '相手の気持ちを確認せずに進める'
        ],
        advice: [
          '相手の気持ちを確認しながら進める',
          '現実的な関係を築くことを心がける',
          '相手のペースを尊重する'
        ],
        dateIdeas: [
          '夜景の見えるレストラン',
          'ワインバーでのデート',
          'ドライブデート',
          'ホテルのラウンジでのお茶'
        ],
        communicationTips: [
          '相手の反応を見ながら話す',
          '適度な距離感を保つ',
          '相手の気持ちを確認する',
          '現実的な関係を築く'
        ]
      },
      'コンフィデンスブースター': {
        title: 'コンフィデンスブースター',
        description: 'お酒を飲むと自信がつき、普段は言えないことも言えるようになるタイプ。恋愛でも大胆なアプローチができるようになります。',
        strengths: [
          '自信を持ってアプローチできる',
          '普段言えないことを言える',
          '積極的に行動できる',
          'リーダーシップを発揮できる'
        ],
        challenges: [
          '相手が圧倒されることがある',
          '飲みすぎて失敗することがある',
          '相手の気持ちを考えずに進める'
        ],
        advice: [
          '相手の反応を見ながら進める',
          '飲みすぎないよう注意する',
          '相手の気持ちを尊重する'
        ],
        dateIdeas: [
          'アクティブなデート',
          '新しい場所への挑戦',
          'スポーツ観戦',
          'アウトドアでのデート'
        ],
        communicationTips: [
          '相手のペースに合わせる',
          '相手の意見を聞く',
          '適度な距離感を保つ',
          '相手を尊重する'
        ]
      },
      'エモーショナルエクスプレス': {
        title: 'エモーショナルエクスプレス',
        description: '酔うと感情表現が豊かになり、本音で話せるようになるタイプ。恋愛でも素直な気持ちを伝えるのが上手です。',
        strengths: [
          '素直な気持ちを伝えられる',
          '感情表現が豊か',
          '本音で話せる',
          '相手との距離を縮められる'
        ],
        challenges: [
          '感情が高ぶりすぎることがある',
          '相手が重く感じることもある',
          '冷静さを失うことがある'
        ],
        advice: [
          '感情をコントロールする',
          '相手の反応を見ながら話す',
          '適度な距離感を保つ'
        ],
        dateIdeas: [
          '静かなカフェでのデート',
          '映画鑑賞',
          '美術館巡り',
          '公園での散歩'
        ],
        communicationTips: [
          '相手の気持ちを確認する',
          '感情をコントロールする',
          '相手のペースに合わせる',
          '適度な距離感を保つ'
        ]
      },
      'ストレスリリーバー': {
        title: 'ストレスリリーバー',
        description: 'お酒を飲むことでストレスを解消し、リラックスできるタイプ。恋愛でも自然体でいられる魅力があります。',
        strengths: [
          '自然体でいられる',
          'リラックスした雰囲気を作れる',
          '相手もリラックスできる',
          'ストレス解消が得意'
        ],
        challenges: [
          '積極性に欠けることがある',
          '相手が物足りなく感じることもある',
          '深い話をするのが苦手'
        ],
        advice: [
          '時には積極的にアプローチする',
          '深い話もできるように心がける',
          '相手の気持ちを確認する'
        ],
        dateIdeas: [
          '居酒屋でのカジュアルな飲み会',
          '家でのんびり過ごす',
          '温泉旅行',
          '自然の中でのデート'
        ],
        communicationTips: [
          '時には積極的に話しかける',
          '深い話もできるように心がける',
          '相手の気持ちを確認する',
          '適度な距離感を保つ'
        ]
      },
      'ミステリアスドリンカー': {
        title: 'ミステリアスドリンカー',
        description: 'お酒を飲んでもあまり変化が見られない、クールでミステリアスなタイプ。恋愛でも落ち着いた魅力を放ちます。',
        strengths: [
          'クールで落ち着いている',
          'ミステリアスな魅力がある',
          '冷静に判断できる',
          '相手を惹きつける魅力がある'
        ],
        challenges: [
          '感情表現が少ない',
          '相手が距離を感じることがある',
          '積極性に欠けることがある'
        ],
        advice: [
          '時には感情を表現する',
          '積極的にアプローチする',
          '相手との距離を縮める'
        ],
        dateIdeas: [
          '落ち着いたバーでのデート',
          '美術館や博物館',
          '静かなレストラン',
          '夜景の見える場所'
        ],
        communicationTips: [
          '時には感情を表現する',
          '積極的に話しかける',
          '相手との距離を縮める',
          '相手の気持ちを確認する'
        ]
      }
    }
    return analyses[type] || analyses['ミステリアスドリンカー']
  }

  const analysis = getDetailedAnalysis(drinkingType)

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー - ポップアート風 */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/group-results')}
            className="btn-secondary text-xs sm:text-sm flex items-center gap-2 mx-auto mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            結果に戻る
          </button>
          <div className="card" style={{background: '#FF69B4', transform: 'rotate(-1deg)'}}>
            <h1 className="heading-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4">
              酒癖診断詳細分析
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-black px-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              ★ {participant.userName}さんの酒癖タイプを詳しく分析しました ★
            </p>
          </div>
        </div>

        {/* 基本情報 - ポップアート風 */}
        <div className="card mb-4 sm:mb-6" style={{background: '#FFFFFF'}}>
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="relative p-3 sm:p-4 bg-yellow-400 rounded-full border-4 sm:border-5 border-black" style={{boxShadow: '4px 4px 0 #000000'}}>
                <Wine className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-600" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-pink-500 absolute -top-1 -right-1 animate-pulse" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              </div>
            </div>
            <h2 className="heading-secondary mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl">
              💥 あなたの酒癖タイプ 💥
            </h2>
            <div className="text-base sm:text-lg mb-3 sm:mb-4">
              <span className={`inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-xl font-black text-white border-3 sm:border-4 border-black ${participant.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`} style={{boxShadow: '3px 3px 0 #000000', fontFamily: 'M PLUS Rounded 1c, sans-serif', fontSize: 'clamp(1rem, 4vw, 1.5rem)'}}>
                {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 md:p-6 rounded-xl border-4 sm:border-5 border-black" style={{background: '#FFD700', boxShadow: '4px 4px 0 #000000'}}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-red-600 mb-2 sm:mb-3 text-center" style={{fontFamily: 'Bangers, sans-serif', WebkitTextStroke: '1px #000000'}}>
              {analysis.title}
            </h3>
            <p className="text-black leading-relaxed text-center font-bold text-sm sm:text-base md:text-lg px-2" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
              {analysis.description}
            </p>
          </div>
        </div>

        {/* 詳細分析 - ポップアート風 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* 長所 */}
          <div className="card" style={{background: '#00CC44', transform: 'rotate(1deg)'}}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 sm:mb-4 flex items-center gap-2" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif', WebkitTextStroke: '1px #000000'}}>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} />
              ★ あなたの長所 ★
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {analysis.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-xl sm:text-2xl text-yellow-300 flex-shrink-0">★</span>
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg">{strength}</span>
                </li>
              ))}
            </ul>
        </div>

          {/* 注意点 */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-orange-700 mb-3 sm:mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              注意点
            </h3>
            <ul className="space-y-2">
              {analysis.challenges.map((challenge: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1 flex-shrink-0">⚠</span>
                  <span className="text-gray-700 text-sm sm:text-base">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* アドバイス */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-700 mb-3 sm:mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            恋愛でのアドバイス
          </h3>
          <ul className="space-y-2">
            {analysis.advice.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 flex-shrink-0">💡</span>
                <span className="text-gray-700 text-sm sm:text-base">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* デートアイデア */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-pink-700 mb-3 sm:mb-4 flex items-center gap-2">
            <Wine className="w-4 h-4 sm:w-5 sm:h-5" />
            おすすめデートアイデア
            </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {analysis.dateIdeas.map((idea: string, index: number) => (
              <div key={index} className="bg-pink-50 p-2.5 sm:p-3 rounded-lg">
                <span className="text-pink-600 font-semibold">💕</span>
                <span className="text-gray-700 ml-2 text-sm sm:text-base">{idea}</span>
              </div>
            ))}
          </div>
        </div>

        {/* コミュニケーションのコツ */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-purple-700 mb-3 sm:mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            コミュニケーションのコツ
          </h3>
          <ul className="space-y-2">
            {analysis.communicationTips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-500 mt-1 flex-shrink-0">🗣</span>
                <span className="text-gray-700 text-sm sm:text-base">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* あなたを表す30のキーワード */}
        <div className="card mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-700 mb-3 sm:mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            🏷️ あなたを表す30のキーワード
          </h3>
          <p className="text-sm sm:text-base text-amber-900 font-semibold mb-3 sm:mb-4">
            科学的根拠に基づいた、あなたの酒癖タイプの特徴的なキーワードです 🍺
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {typeKeywords.map((keyword: string, index: number) => (
              <span
                key={index}
                className="keyword-tag text-xs sm:text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="text-center space-y-3 sm:space-y-4">
          <button
            onClick={() => navigate('/group-session-start')}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            新しい酒癖診断を始める
          </button>
          
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm"
            >
              ミチノワトップに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

