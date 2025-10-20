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
import { PageLayout } from '../layouts/PageLayout'
import { generateOverallSummary } from '../utils/overallSummaryGenerator'

export function GroupResultsPage() {
  const navigate = useNavigate()
  const { state } = useApp()
  // 選択状態は未使用のため削除

  const summary = state.groupRomanticSummary
  const bestCouples = state.bestCouples
  const allCombinations = state.allCombinationsList
  const worstCouple = state.worstCouple

  if (!summary || !allCombinations) {
    return (
      <PageLayout>
        <div className="min-h-[calc(var(--vh,1vh)*100)] bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">結果を計算中...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  // 個人診断画面への分岐は廃止し、常にグループ結果UIを表示

  // 全員が同性の場合の特別表示
  if (summary.totalCombinations === 0) {
    return (
      <PageLayout>
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="max-w-2xl mx-auto text-center card">
            <h1 className="heading-secondary mb-4">診断結果</h1>
            <p className="kawaii-light-pink mb-6">今回は全員が同じ性別でした</p>
            <button onClick={() => navigate('/group-session-start')} className="btn-primary px-6 py-3">新しいグラスノオトを始める</button>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700 text-sm">すきのおとトップに戻る</button>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  const handleCoupleClick = (maleName: string, femaleName: string) => {
    console.log('handleCoupleClick called with:', { maleName, femaleName })
    console.log('Available participants:', state.groupParticipants)
    
    // 参加者IDを取得（userNameとgenderで検索）
    const maleParticipant = state.groupParticipants.find(p => p.userName === maleName && p.gender === 'male')
    const femaleParticipant = state.groupParticipants.find(p => p.userName === femaleName && p.gender === 'female')
    
    console.log('Found participants:', { maleParticipant, femaleParticipant })
    
    if (maleParticipant && femaleParticipant) {
      console.log('Navigating to pair-details with:', { 
        maleId: maleParticipant.userId, 
        femaleId: femaleParticipant.userId 
      })
      navigate(`/pair-details?maleId=${maleParticipant.userId}&femaleId=${femaleParticipant.userId}`)
    } else {
      // フォールバック: 名前で検索
      const maleByName = state.groupParticipants.find(p => p.userName === maleName)
      const femaleByName = state.groupParticipants.find(p => p.userName === femaleName)
      
      if (maleByName && femaleByName) {
        console.log('Fallback navigation with:', { 
          maleId: maleByName.userId, 
          femaleId: femaleByName.userId 
        })
        navigate(`/pair-details?maleId=${maleByName.userId}&femaleId=${femaleByName.userId}`)
      } else {
        console.error('Could not find participants for:', { maleName, femaleName })
        alert('参加者情報が見つかりません')
      }
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

  // 文字列から安定したインデックスを作る簡易ハッシュ
  const stableIndex = (seed: string, modulo: number) => {
    let h = 0
    for (let i = 0; i < seed.length; i++) {
      h = (h * 31 + seed.charCodeAt(i)) >>> 0
    }
    return h % Math.max(1, modulo)
  }

  // 面白ネーミングのプール（細分化スコア帯）
  const funnyPools = {
    s97: [
      '世界記録級ハモり乾杯',
      '伝説確定：年表に載る夜',
      '乾杯で宇宙がざわつく会',
      '神話生成プロトコル起動',
      '拍手喝采スタンディング乾杯'
    ],
    s93: [
      '相性メーター振り切れ祭',
      '運命共同乾杯条約',
      '無音で通じるアイコンタクト会',
      '笑いの呼吸・壱ノ型：乾杯',
      '最高潮シナジーブレンド'
    ],
    s90: [
      '神泡認定：最強シナジー宴',
      '乾杯無限ループ祭',
      '伝説生成機ナイト',
      'ツーコン乾杯トロフィー杯',
      'ゴールイン前夜祭'
    ],
    s85: [
      '拍が合うリズム飲み',
      '高気圧ユーフォリア会',
      'ハモリ笑い研究部',
      'テンポ神：拍手割り込み乾杯',
      '会話が勝手に面白くなる夜'
    ],
    s80: [
      '優勝候補の前夜祭',
      'ハイテンション合奏会',
      '気まずさゼロ飲み',
      '乾杯テンポ120bpm',
      'ご機嫌ダブル推進会'
    ],
    s75: [
      'ナイス相槌スムージー',
      'ツマミ相性チート会',
      'リアクション芸が噛み合う夜',
      '笑い皿が減らない会',
      'いい波来てる飲み'
    ],
    s70: [
      'いい感じスローモーション会',
      '映える泡と程よい距離感',
      'ツマミが進む距離',
      'ほど酔いシンクロ会',
      '間合いバッチリ晩酌'
    ],
    s65: [
      '肩慣らしハイボール',
      '徐行運転スパークリング',
      '様子見モード微笑み会',
      '一旦この量でいこう会',
      'ピッチ控えめ作戦'
    ],
    s60: [
      '様子見カクテルミーティング',
      'ちびちび和解サミット',
      '話せばわかるハイボール',
      '微炭酸コミュニケーション',
      'のんびり調整飲み'
    ],
    s55: [
      '氷ブレイク準備委員会',
      '間合い測量ハイボール',
      '沈黙を愛でる会',
      '一旦その話やめとこ会',
      '共通点捜索隊'
    ],
    s50: [
      '試運転ほろ酔い検証会',
      '沈黙クラッシャー探索隊',
      '氷が解けるまで作戦会議',
      '乾杯からの様子見',
      '控えめに攻める会'
    ],
    s40: [
      '平和条約締結前懇談会',
      '安全運転ノンプレッシャー飲み',
      'お冷やリカバリーナイト',
      '今日は近況共有で手打ち',
      'そっとしておく優しさ会'
    ],
    s00: [
      '無事故完走のんびり会',
      '安全第一ノンストレス飲み',
      'お冷や多めチル会',
      '今日は胃に優しくいこう',
      '空気読みつつ乾杯'
    ]
  }

  // グループ平均スコアに基づく「今日の飲み会名」を1つ生成
  const getGroupPartyName = (avgScore: number) => {
    const namesSeed = `${summary.maleNames.join(',')}|${summary.femaleNames.join(',')}`
    const pool = avgScore >= 97 ? funnyPools.s97
      : avgScore >= 93 ? funnyPools.s93
      : avgScore >= 90 ? funnyPools.s90
      : avgScore >= 85 ? funnyPools.s85
      : avgScore >= 80 ? funnyPools.s80
      : avgScore >= 75 ? funnyPools.s75
      : avgScore >= 70 ? funnyPools.s70
      : avgScore >= 65 ? funnyPools.s65
      : avgScore >= 60 ? funnyPools.s60
      : avgScore >= 55 ? funnyPools.s55
      : avgScore >= 50 ? funnyPools.s50
      : avgScore >= 40 ? funnyPools.s40
      : funnyPools.s00
    const idx = stableIndex(namesSeed, pool.length)
    return pool[idx]
  }

  return (
    <PageLayout>
      <div className="kawaii-reset max-w-6xl mx-auto p-3 sm:p-4 md:p-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FF1493] mb-4">
            🍻 グラスノオト結果 🍻
          </h1>
          <p className="text-lg text-gray-600">
            みんなで端末を囲んで結果を楽しみましょう！
          </p>
        </div>

        {/* グループ全体の恋愛傾向サマリー */}
        <div className="card-kawaii mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#FF1493] mb-4">
              🍻 今夜のメンバー 🍻
            </h2>
            <div className="text-lg text-gray-800 mb-4">
              <div className="mb-2">
                男性: {summary.maleNames.map((name, index) => (
                  <span key={name}>
                    <span className="tag-kawaii mr-1">♂ {name}</span>
                    {index < summary.maleNames.length - 1 && ' '}
                  </span>
                ))}（{summary.maleCount}名）
              </div>
              <div>
                女性: {summary.femaleNames.map((name, index) => (
                  <span key={name}>
                    <span className="tag-kawaii mr-1">♀ {name}</span>
                    {index < summary.femaleNames.length - 1 && ' '}
                  </span>
                ))}（{summary.femaleCount}名）
              </div>
            </div>
            <div className="text-lg font-bold text-gray-800 mb-4">
              異性間の組み合わせ: 全{summary.totalCombinations}通り
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="card-kawaii text-center">
              <TrendingUp className="w-8 h-8 text-[#D63384] mx-auto mb-2" />
              <div className="text-3xl font-bold text-[#D63384]">
                {summary.averageScore}点
              </div>
              <div className="text-sm text-gray-600 font-semibold">平均相性スコア</div>
            </div>
            
            <div className="card-kawaii text-center">
              <Trophy className="w-8 h-8 text-[#D63384] mx-auto mb-2 animate-bounce" />
              <div className="text-sm font-semibold text-gray-800 mb-2">
                <span className="tag-kawaii mr-1">♂ {summary.maxScore.maleName}</span>
                ×
                <span className="tag-kawaii ml-1">♀ {summary.maxScore.femaleName}</span>
              </div>
              <div className="text-2xl font-bold text-[#D63384]">{summary.maxScore.score}点 🏆</div>
            </div>
            
            <div className="card-kawaii text-center">
              <TrendingDown className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-800 mb-2">
                <span className="tag-kawaii mr-1">♂ {summary.minScore.maleName}</span>
                ×
                <span className="tag-kawaii ml-1">♀ {summary.minScore.femaleName}</span>
              </div>
              <div className="text-2xl font-bold text-gray-700">{summary.minScore.score}点</div>
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
          <div className="card mb-6">
            <div className="text-center mb-6">
              <h2 className="heading-secondary text-[#D63384]">
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
                  const colors = { bg: '#FDF2F8', text: '#D63384', scoreColor: '#D63384' }
                  
                  return (
                    <div
                      key={`${couple.maleId}-${couple.femaleId}`}
                      className="card p-3 md:p-6 cursor-pointer transform transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: colors.bg,
                        boxShadow: 'none'
                      }}
                      onClick={() => handleCoupleClick(couple.maleName, couple.femaleName)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="text-2xl md:text-5xl">
                            <span className="emoji-kawaii emoji-xl emoji-bounce emoji-pastel">{couple.rank === 1 ? '🥇' : couple.rank === 2 ? '🥈' : '🥉'}</span>
                          </div>
                          <div>
                            <div className="text-base md:text-2xl font-bold mb-1 md:mb-2" style={{ color: colors.text }}>
                              {couple.rank}位
                            </div>
                            <div className="text-sm md:text-xl font-bold mb-1">
                              <span className="tag-kawaii mr-1">♂ {couple.maleName}</span>
                              <span className="mx-1 md:mx-2" style={{color: colors.text, fontWeight: 900}}>×</span>
                              <span className="tag-kawaii">♀ {couple.femaleName}</span>
                            </div>
                            {/* ペア別の飲み会名表示は削除 */}
                            <div className="text-xl md:text-3xl font-bold" style={{ color: colors.scoreColor }}>
                              {couple.romanticScore}点 🍻
                            </div>
                          </div>
                        </div>
                        <div className="p-1.5 md:p-3 bg-white rounded-full border border-pink-200">
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
        <div className="card mb-6">
          <div className="text-center mb-6">
            <h2 className="heading-secondary text-[#D63384]">
              📋 全組み合わせ一覧（異性間のみ）
            </h2>
            <p className="text-lg font-semibold text-gray-700 mt-2">
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
                className="card p-2.5 md:p-4 cursor-pointer transform transition-all duration-200 hover:scale-[1.02]"
                onClick={() => handleCoupleClick(combination.maleName, combination.femaleName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-7 h-7 md:w-12 md:h-12 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center">
                      <span className="text-sm md:text-xl font-bold text-[#D63384]">
                        {combination.rank}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm md:text-lg font-bold text-gray-800 mb-0.5 md:mb-1">
                        <span className="tag-kawaii mr-1">♂ {combination.maleName}</span>
                        <span className="mx-1 md:mx-2">×</span>
                        <span className="tag-kawaii">♀ {combination.femaleName}</span>
                      </div>
                      {/* ペア別の飲み会名表示は削除 */}
                      <div className="inline-block px-2 md:px-3 py-0.5 md:py-1 tag-kawaii">
                        <span className="text-xs md:text-sm font-semibold">
                          {combination.compatibilityLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-3xl font-bold text-[#D63384] mb-0.5 md:mb-1">
                      {combination.romanticScore}点
                    </div>
                    <div className="text-sm md:text-lg font-bold text-pink-400">
                      <span className="emoji-kawaii emoji-md emoji-bounce">{getStarRating(combination.romanticScore)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ワーストカップル（5組以上の時のみ表示） - ポップアート風 */}
        {worstCouple && worstCouple.maleId && worstCouple.femaleId && summary.totalCombinations >= 5 && (
          <div className="card mb-4 md:mb-6 p-3 md:p-6">
            <div className="text-center mb-3 md:mb-6">
              <h2 className="text-base md:heading-secondary text-[#D63384] font-bold">
                <span className="lg:hidden">⚠️ ワーストカップル ⚠️</span>
                <span className="hidden md:inline">⚠️ 絶対くっつかないカップル ⚠️</span>
              </h2>
              <p className="hidden md:block text-lg font-semibold text-gray-700 mt-2">
                ★ この組み合わせは要注意！ ★
              </p>
            </div>

            <div className="card p-3 md:p-6">
              <div className="text-center">
                <div className="text-sm md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                  <span className="tag-kawaii mr-1">♂ {worstCouple.maleName}</span>
                  <span className="mx-1 md:mx-2">×</span>
                  <span className="tag-kawaii">♀ {worstCouple.femaleName}</span>
                </div>
                <div className="text-2xl md:text-5xl font-bold text-[#D63384] mb-2 md:mb-4">
                  {worstCouple.romanticScore}点 💔
                </div>
                <div className="p-2 md:p-4 bg-white rounded border border-pink-200">
                  <p className="text-xs md:text-base text-gray-700 font-bold leading-snug md:leading-relaxed">
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
              className="text-gray-600 hover:text-gray-800 text-base font-semibold underline"
            >
              すきのおとトップに戻る
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
