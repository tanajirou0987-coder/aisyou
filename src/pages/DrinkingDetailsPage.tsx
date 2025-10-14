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
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー - コンパクト版 */}
        <div className="mb-3">
          <button
            onClick={() => navigate('/group-results')}
            className="btn-secondary text-xs flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3 h-3" />
            戻る
          </button>
          <div className="card p-2" style={{background: '#FF69B4'}}>
            <h1 className="text-base sm:text-lg font-bold mb-1">
              酒癖診断詳細
            </h1>
            <p className="text-xs font-bold text-black" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              {participant.userName}さん
            </p>
          </div>
        </div>

        {/* 基本情報 - コンパクト版 */}
        <div className="card mb-2 p-2" style={{background: '#FFFFFF'}}>
          <div className="flex items-center gap-2 mb-2">
            <div className="relative p-1.5 bg-yellow-400 rounded-full border-2 border-black flex-shrink-0">
              <Wine className="w-5 h-5 text-red-600" />
              <Heart className="w-3 h-3 text-pink-500 absolute -top-0.5 -right-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xs font-bold">あなたの酒癖タイプ</h2>
              <span className={`inline-block px-2 py-0.5 rounded text-white border border-black text-xs font-bold ${participant.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                {participant.gender === 'male' ? '♂' : '♀'} {participant.userName}
              </span>
            </div>
          </div>

          <div className="p-2 rounded border-2 border-black" style={{background: '#FFD700'}}>
            <h3 className="text-sm font-black text-red-600 text-center mb-1">
              {analysis.title}
            </h3>
            <p className="text-black text-xs text-center leading-tight">
              {analysis.description}
            </p>
          </div>
        </div>

        {/* 詳細分析 - グリッド表示 */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* 長所 */}
          <div className="card p-2" style={{background: '#00CC44'}}>
            <h3 className="text-xs font-black text-white mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              長所
            </h3>
            <ul className="space-y-0.5">
              {analysis.strengths.slice(0, 3).map((strength: string, index: number) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-xs text-yellow-300 flex-shrink-0">★</span>
                  <span className="text-white font-bold text-xs leading-tight">{strength}</span>
                </li>
              ))}
            </ul>
        </div>

          {/* 注意点 */}
          <div className="bg-white rounded-lg shadow p-2">
            <h3 className="text-xs font-bold text-orange-700 mb-1 flex items-center gap-1">
              <Users className="w-3 h-3" />
              注意点
            </h3>
            <ul className="space-y-0.5">
              {analysis.challenges.slice(0, 3).map((challenge: string, index: number) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-orange-500 flex-shrink-0 text-xs">⚠</span>
                  <span className="text-gray-700 text-xs leading-tight">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* アドバイス・アイデア・コツ - 3カラムグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
          {/* アドバイス */}
          <div className="bg-white rounded-lg shadow p-2">
            <h3 className="text-xs font-bold text-blue-700 mb-1 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              アドバイス
            </h3>
            <ul className="space-y-0.5">
              {analysis.advice.slice(0, 3).map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-blue-500 flex-shrink-0 text-xs">💡</span>
                  <span className="text-gray-700 text-xs leading-tight">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* デートアイデア */}
          <div className="bg-white rounded-lg shadow p-2">
            <h3 className="text-xs font-bold text-pink-700 mb-1 flex items-center gap-1">
              <Wine className="w-3 h-3" />
              デート
            </h3>
            <ul className="space-y-0.5">
              {analysis.dateIdeas.slice(0, 3).map((idea: string, index: number) => (
                <li key={index} className="text-xs text-gray-700 leading-tight">
                  💕 {idea}
                </li>
              ))}
            </ul>
          </div>

          {/* コミュニケーション */}
          <div className="bg-white rounded-lg shadow p-2">
            <h3 className="text-xs font-bold text-purple-700 mb-1 flex items-center gap-1">
              <Users className="w-3 h-3" />
              コツ
            </h3>
            <ul className="space-y-0.5">
              {analysis.communicationTips.slice(0, 3).map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-purple-500 flex-shrink-0 text-xs">🗣</span>
                  <span className="text-gray-700 text-xs leading-tight">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* キーワード - コンパクト版 */}
        <div className="card mb-2 p-2">
          <h3 className="text-xs font-bold text-orange-600 mb-1 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            30のキーワード
          </h3>
          <div className="flex flex-wrap gap-1">
            {typeKeywords.map((keyword: string, index: number) => (
              <span
                key={index}
                className="keyword-tag text-xs px-1.5 py-0.5"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="text-center space-y-2">
          <button
            onClick={() => navigate('/group-session-start')}
            className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:shadow-lg transition-all"
          >
            新しい診断
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 text-xs"
          >
            トップに戻る
          </button>
        </div>
      </div>
    </div>
  )
}

