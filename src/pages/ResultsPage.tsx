import React, { useMemo } from 'react'
import { PageLayout } from '../layouts/PageLayout'
import { useApp } from '../context/AppContext'
import type { Answer, Participant, RelationshipStage } from '../types'

// 16タイプの簡易定義（必要最小限。未定義はデフォルトへフォールバック）
const TYPE_DEFS: Record<string, { icon: string; tagline: string; rarity: number }> = {
  'ハニームーン型': { icon: '🎀', tagline: '永遠の新婚カップル', rarity: 8 },
  '太陽と月型': { icon: '☀️', tagline: '陰陽バランス最強', rarity: 9 },
  '相棒型': { icon: '🤝', tagline: '一生の相棒気質', rarity: 10 },
}

function getTypeMeta(typeName?: string) {
  const def = (typeName && TYPE_DEFS[typeName]) || TYPE_DEFS['ハニームーン型']
  return { typeName: typeName || 'ハニームーン型', icon: def.icon, tagline: def.tagline, rarity: def.rarity }
}

function toBlocks(score: number): string {
  // 10%刻みで6マス表示（▰=満, ▱=空）
  const filled = Math.round(score / 20 * 2) // 0-10を5段階→6マスに近似
  const total = 6
  return '▰'.repeat(Math.min(total, Math.max(0, Math.round(score / 100 * total)))) + '▱'.repeat(total - Math.min(total, Math.max(0, Math.round(score / 100 * total))))
}

function calcRangeScore(allAnswers: Answer[], startIndexInclusive: number, endIndexInclusive: number): number {
  const slice = allAnswers.slice(startIndexInclusive, endIndexInclusive + 1)
  if (slice.length === 0) return 0
  const avg = slice.reduce((s, a) => s + (a.value ?? 0), 0) / slice.length
  // 回答値は1-5前提。0-100へ線形変換
  return Math.max(0, Math.min(100, Math.round((avg - 1) / 4 * 100)))
}

function aggregateTwoParticipants(p1?: Participant, p2?: Participant) {
  const a1 = (p1?.answers || []).slice().sort((x, y) => x.questionId.localeCompare(y.questionId))
  const a2 = (p2?.answers || []).slice().sort((x, y) => x.questionId.localeCompare(y.questionId))
  const minLen = Math.min(a1.length, a2.length)
  const merged: Answer[] = []
  for (let i = 0; i < minLen; i++) {
    const v = Math.round(((a1[i].value ?? 0) + (a2[i].value ?? 0)) / 2)
    merged.push({ ...a1[i], value: v })
  }
  return merged
}

function computeFiveScores(answers: Answer[]) {
  if (answers.length >= 40) {
    const values = calcRangeScore(answers, 0, 7)
    const conversation = calcRangeScore(answers, 8, 15)
    const healing = calcRangeScore(answers, 16, 23)
    const stimulation = calcRangeScore(answers, 24, 31)
    const future = calcRangeScore(answers, 32, 39)
    const total = Math.round(values * 0.25 + conversation * 0.25 + healing * 0.2 + stimulation * 0.15 + future * 0.15)
    return { values, conversation, healing, stimulation, future, total }
  }
  // データ不足時のフォールバック（安定した見た目用）
  const values = 89, conversation = 97, healing = 92, stimulation = 78, future = 91
  const total = Math.round(values * 0.25 + conversation * 0.25 + healing * 0.2 + stimulation * 0.15 + future * 0.15)
  return { values, conversation, healing, stimulation, future, total }
}

function calcRank(total: number): 'SS級' | 'S級' | 'A級' | 'B級' {
  if (total >= 90) return 'SS級'
  if (total >= 80) return 'S級'
  if (total >= 70) return 'A級'
  return 'B級'
}

function percentileLabel(total: number): string {
  if (total >= 95) return '3%'
  if (total >= 90) return '5%'
  if (total >= 80) return '15%'
  return '30%'
}

function adjustByRelationship(text: string, stage?: RelationshipStage): string {
  if (!stage) return text
  if (stage.status === 'before_dating') {
    return text + '\n\nまだ付き合っていない今は、距離の縮め方を大切に。自然体で優しさを伝えると◎'
  }
  switch (stage.duration) {
    case 'less_than_3m':
      return text + '\n\n交際初期は連絡頻度や約束のリズムを合わせるとさらに良い関係に。'
    case '3m_to_1y':
      return text + '\n\n安定期は「当たり前」に感謝を足すだけで、もっと深まります。'
    case '1y_to_3y':
      return text + '\n\n発展期はマンネリ対策に新鮮な体験を一緒にどうぞ。'
    case 'over_3y':
      return text + '\n\n長期関係は将来設計を共有すると、安心感が更に高まります。'
    default:
      return text
  }
}

export function ResultsPage() {
  const { state } = useApp()
  const p1 = state.participants[0]
  const p2 = state.participants[1]

  // 診断タイプは未実装のため暫定（将来は判定ロジックで差し替え）
  const typeName = 'ハニームーン型'
  const typeMeta = getTypeMeta(typeName)

  const mergedAnswers = useMemo(() => aggregateTwoParticipants(p1, p2), [p1, p2])
  const scores = useMemo(() => computeFiveScores(mergedAnswers), [mergedAnswers])
  const rank = calcRank(scores.total)
  const rarity = typeMeta.rarity
  const topPercentile = percentileLabel(scores.total)

  const nameA = p1?.name || 'あなた'
  const nameB = p2?.name || '相手'

  // 関係性説明（簡易テンプレ）
  const relationText = adjustByRelationship(
    'まるで少女漫画から飛び出してきたような、周りが羨むほど甘々なカップル。' +
      '一緒にいるだけで世界が輝いて見えて、離れてる時間すら愛おしく感じるタイプ。' +
      '\n\n「好き」を言葉でも態度でも表現し合えるから、愛情を疑うことがほとんどない。' +
      '二人でいる時間が何より幸せで、デートの予定を立ててる時からワクワクが止まらない。',
    state.relationshipStage
  )

  // お互いの魅力（簡易テンプレ。将来は回答データで強化）
  const charmsA = ['一緒にいると心が満たされる存在', '笑顔が本当に可愛い', '細かいことに気づいてくれる優しさ', '素直に愛情を表現してくれる', '話を聞いてくれる安心感']
  const charmsB = ['安心感がハンパない', '何でも受け止めてくれる包容力', '二人の時間を大切にしてくれる', '愛情表現が豊かで嬉しい', '自分のことを一番に考えてくれる']

  // きゅんポイント（簡易テンプレ）
  const kyun = [
    '何気ない瞬間に「好き」って言う 💕',
    '急に手を繋いだり抱きしめたり',
    '相手の好きなものを覚えてる',
    'デートのサプライズを用意する',
    'LINEの返信が早くて既読スルーしない',
  ]

  // 相性の理由（スコア連動）
  const reasons: string[] = []
  if (scores.values >= 85) reasons.push('価値観が驚くほど一致')
  if (scores.conversation >= 90) reasons.push('話が尽きない相性')
  if (scores.healing >= 85) reasons.push('一緒にいると心が落ち着く')
  if (scores.stimulation >= 75) reasons.push('程よい刺激でマンネリしない')
  if (scores.future >= 85) reasons.push('将来のビジョンが同じ方向')
  while (reasons.length < 5) reasons.push('補完関係が働く場面が多い')

  // 隠れた共通点
  const commons = ['恋愛体質で愛情深い', '寂しがり屋な一面がある', '記念日やイベントを大切にしたい', 'スキンシップで愛を確認したい', 'ロマンチックなことが好き']

  // 相性が良いシチュ
  const situations = ['二人きりでまったりしてる時間', 'デートで手を繋いで歩いてる時', 'お互いの好きなものをシェアしてる時', '夜遅くまで電話やLINEしてる時', '記念日を一緒に祝ってる時']

  // 相手の性格分析
  const partnerName = nameB
  const partnerTraits = ['基本的に愛情深くて優しい性格', '感情表現がストレートで素直', '記念日を大事にするロマンチスト', '二人の時間を最優先してくれる', 'ちょっと独占欲が強めかも？', 'でもそれも愛情の裏返し💕']

  // おすすめデート（スコアで軽く並べ替え可だが今は固定）
  const dates = ['夜景の綺麗なレストランでディナー', 'お揃いのアイテムを買いに行く', '水族館や動物園でまったりデート', 'おうちで映画鑑賞＆まったり', '記念日にサプライズプレゼント交換']

  // 注意点＋アドバイス（低め項目を参照）
  const lowestKey = Object.entries({ 刺激度: scores.stimulation, 癒し度: scores.healing, 会話: scores.conversation, 価値観: scores.values, 将来性: scores.future }).sort((a, b) => a[1] - b[1])[0][0]
  const caution = `ときどき${lowestKey}が物足りなくなる瞬間があるかも。無理のない範囲で少し意識してみよう。`
  const actions = ['新しい場所や体験を一緒に試す', '感謝や好きの言葉を増やす', '次の予定を早めに決めてワクワクを共有']

  // 未来予測（交際期間と将来性で調整）
  function futureByStage(stage?: RelationshipStage): string {
    const s = scores.future
    const core = s >= 90 ? '結婚を意識するほど絆が深まる' : s >= 80 ? 'さらに理解が深まり関係が成長する' : s >= 70 ? '安定して心地よい関係を継続できる' : 'お互いの歩幅を合わせる工夫で安定する'
    if (!stage || stage.status === 'before_dating') {
      return `もし付き合ったら、${core}。この相性なら、素敵な未来が待ってるかも💕`
    }
    switch (stage.duration) {
      case 'less_than_3m':
        return `半年後には、${core}。これからもっと深い関係になっていきそう。`
      case '3m_to_1y':
        return `1年記念日には、${core}。お互いの理解がさらに深まってるはず。`
      case '1y_to_3y':
        return `この調子なら、${core}。結婚も視野に入ってくるかも。`
      case 'over_3y':
        return `${core}。人生のパートナーとして、ずっと支え合っていける関係。`
      default:
        return core
    }
  }

  // 称号（スコアで修飾）
  function titleByScore(base: string, total: number): string {
    if (total >= 95) return `究極の${base}`
    if (total >= 90) return `最強の${base}`
    if (total >= 80) return `理想の${base}`
    return base
  }

  const baseTitle = 'ハニームーンカップル'
  const pairTitle = titleByScore(baseTitle, scores.total)

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto p-4 space-y-8">
        {/* 1. タイプ名＋キャッチコピー */}
        <div className="text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-pink-300">
            <div className="text-4xl mb-4">{typeMeta.icon}</div>
            <h2 className="text-4xl font-bold text-[#FF1493] mb-2">{typeMeta.typeName}</h2>
            <p className="text-xl text-gray-700 mb-4">「{typeMeta.tagline}」</p>
            {/* 2. レア度＋ランク */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-semibold text-gray-600">このタイプは全体の{rarity}%！</span>
            </div>
            <div className="mt-2">
              <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                ランク：{rank}
              </span>
            </div>
          </div>
        </div>

        {/* 3. 相性スコア（5項目） */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">💕 総合相性度：{scores.total}% 💕</h3>
          <div className="space-y-4">
            <Metric label="❤️ 価値観マッチ度" score={scores.values} color="bg-pink-500" bar={toBlocks(scores.values)} />
            <Metric label="💛 会話の相性" score={scores.conversation} color="bg-yellow-500" bar={toBlocks(scores.conversation)} />
            <Metric label="💙 癒し度" score={scores.healing} color="bg-blue-500" bar={toBlocks(scores.healing)} />
            <Metric label="💚 刺激度" score={scores.stimulation} color="bg-green-500" bar={toBlocks(scores.stimulation)} />
            <Metric label="💜 将来性" score={scores.future} color="bg-purple-500" bar={toBlocks(scores.future)} />
          </div>
          <div className="text-center mt-6">
            <span className="text-lg font-bold text-pink-600">全カップル中 上位{topPercentile}！</span>
          </div>
        </div>

        {/* 4. 関係性の説明 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🌸 あなたたちの関係性 🌸</h3>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{relationText}</p>
        </div>

        {/* 5. お互いの魅力 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">💕 お互いから見た魅力 💕</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-pink-600 mb-4">【{nameB}から見た{nameA}】</h4>
              <ul className="space-y-2 text-gray-700">{charmsA.map((c, i) => <li key={i}>・{c}</li>)}</ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-pink-600 mb-4">【{nameA}から見た{nameB}】</h4>
              <ul className="space-y-2 text-gray-700">{charmsB.map((c, i) => <li key={i}>・{c}</li>)}</ul>
            </div>
          </div>
        </div>

        {/* 6. きゅんポイントTOP5 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">✨ 相手をきゅんとさせる方法TOP5 ✨</h3>
          <ol className="list-decimal ml-6 text-gray-700 space-y-1">{kyun.map((k, i) => <li key={i}>{k}</li>)}</ol>
          <div className="mt-4 p-4 rounded-xl bg-yellow-50 text-yellow-800 font-semibold">
            💡 ワンポイントアドバイス<br />このタイプは愛情確認が大事！ こまめに「好き」を伝えるとGOOD💕
          </div>
        </div>

        {/* 7. 相性の理由 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🔍 なんで相性いいの？ 🔍</h3>
          <ul className="space-y-2 text-gray-700">{reasons.slice(0, 5).map((r, i) => <li key={i}>✅ {r}</li>)}</ul>
        </div>

        {/* 8. 隠れた共通点 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🎁 隠れた共通点発見！ 🎁</h3>
          <div className="text-gray-700 mb-2">実は二人とも...</div>
          <ul className="space-y-2 text-gray-700">{commons.map((c, i) => <li key={i}>・{c}</li>)}</ul>
        </div>

        {/* 9. 相性が良いシチュエーション */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">💫 特に相性バツグンな時 💫</h3>
          <ul className="space-y-2 text-gray-700">{situations.map((s, i) => <li key={i}>・{s}</li>)}</ul>
        </div>

        {/* 10. 相手の性格分析 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 相手の性格プチ分析 📝</h3>
          <div className="text-gray-700 whitespace-pre-line">{`【${partnerName}はこんな人】\n` + partnerTraits.join('\n') + '\n\n当たってる？😊'}</div>
        </div>

        {/* 11. おすすめデート */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🗓️ このタイプにおすすめデート 🗓️</h3>
          <ul className="space-y-2 text-gray-700">{dates.map((d, i) => <li key={i}>・{d}</li>)}</ul>
          <div className="text-center text-gray-700 mt-3">試してみて💕</div>
        </div>

        {/* 12. 注意点＋アドバイス */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">⚠️ ちょっとだけ注意 ⚠️</h3>
          <p className="text-gray-700 mb-3">{caution}</p>
          <div className="text-gray-800 font-semibold mb-1">🌟 おすすめアクション</div>
          <ul className="space-y-1 text-gray-700">{actions.map((a, i) => <li key={i}>・{a}</li>)}</ul>
          <div className="text-gray-700 mt-3">でも基本的には最高の相性！💯</div>
        </div>

        {/* 13. 未来予測 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🔮 1年後の二人 🔮</h3>
          <p className="text-gray-700 whitespace-pre-line">{futureByStage(state.relationshipStage) + '\n\nこの調子で大切にしてね💕'}</p>
        </div>

        {/* 14. 二人の称号 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">👑 二人の称号 👑</h3>
          <div className="text-center text-xl font-bold text-pink-600">「{pairTitle}」</div>
          <div className="text-center text-gray-800 mt-2">おめでとう！🎉</div>
        </div>
      </div>
    </PageLayout>
  )
}

function Metric({ label, score, color, bar }: { label: string; score: number; color: string; bar: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold">{label}：{score}%</span>
      <div className="w-40 flex items-center gap-2">
        <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-4 ${color}`} style={{ width: `${score}%` }} />
        </div>
        <span className="text-sm text-gray-500">{bar}</span>
      </div>
    </div>
  )
}


