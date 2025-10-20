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
  const isDating = state.relationshipStage?.status === 'dating'
  const period = state.relationshipStage?.duration // 'less_than_3m' | '3m_to_1y' | '1y_to_3y' | 'over_3y'

  // 関係性説明（簡易テンプレ）
  const relationText = isDating ? (
    period === 'less_than_3m' ? [
      'まるで少女漫画から飛び出してきたような、',
      'ドキドキが止まらない新鮮なカップル。',
      '付き合い始めたばかりで、',
      '毎日が発見と感動の連続。',
      '',
      '一緒にいる時間すべてが特別で、',
      '次のデートが待ち遠しくて仕方ない。',
      '「好き」って気持ちが溢れて、',
      '自然と笑顔になっちゃうタイプ。',
      'これからもっと深い関係になっていける予感💕'
    ].join('\n')
    : period === '3m_to_1y' ? [
      'まるで少女漫画の主人公カップルのような、',
      '甘々でラブラブな二人。',
      '少しずつ素の自分を出せるようになって、',
      '居心地の良さが増してきた頃。',
      '',
      '「好き」を言葉でも態度でも表現し合えるから、',
      '愛情を疑うことがほとんどない。',
      '一緒にいる時間が何より幸せで、',
      'お互いのことをもっと知りたいって思える関係。',
      '記念日も大切にしながら、',
      '絆を深めていけるタイプ💕'
    ].join('\n')
    : period === '1y_to_3y' ? [
      '周りが羨むほど安定した、',
      '理想的なカップル。',
      'お互いの性格や癖も分かり合って、',
      '深い信頼関係が築けてる。',
      '',
      '喧嘩してもすぐ仲直りできるし、',
      '一緒にいる時間も一人の時間も',
      'バランスよく楽しめる成熟した関係。',
      '「この人で良かった」って',
      '改めて実感できる瞬間が多いはず。',
      '将来のことも自然と考えられる',
      '素敵な関係性💕'
    ].join('\n')
    : period === 'over_3y' ? [
      'もはや空気のような存在、',
      'でも何より大切なパートナー。',
      '長い時間を一緒に過ごして、',
      'お互いを深く理解し合ってる。',
      '',
      '言葉にしなくても分かり合える瞬間が増えて、',
      '安心感と居心地の良さが最高レベル。',
      'これまで乗り越えてきたことが、',
      '二人の絆をより強くしてる。',
      '人生を共に歩むパートナーとして、',
      'これからもずっと支え合っていける関係💕'
    ].join('\n')
    : [
      'まるで少女漫画から飛び出してきたような、',
      '周りが羨むほど甘々なカップル。',
      '一緒にいるだけで世界が輝いて見えて、',
      '離れてる時間すら愛おしく感じるタイプ。',
      '',
      '「好き」を言葉でも態度でも表現し合えるから、',
      '愛情を疑うことがほとんどない。',
      '二人でいる時間が何より幸せで、',
      'デートの予定を立ててる時からワクワクが止まらない。'
    ].join('\n')
  ) : [
        'もし付き合ったら、まるで少女漫画のような',
        '甘々カップルになれる相性。',
        '一緒にいるだけで自然と笑顔になって、',
        'もっと一緒にいたいって思えるタイプ。',
        '',
        'お互いに「好き」を素直に伝え合える関係になれそう。',
        '付き合ったら、二人でいる時間が',
        '何より幸せに感じるはず。',
        'この相性なら、理想的な恋愛ができるかも💕'
      ].join('\n')

  // お互いの魅力（簡易テンプレ。将来は回答データで強化）
  const charmsTitle = isDating ? '💕 お互いから見た魅力 💕' : '💕 お互いが惹かれるポイント 💕'
  const charmsA = isDating
    ? ['一緒にいると心が満たされる存在', '笑顔が本当に可愛い', '細かいことに気づいてくれる優しさ', '素直に愛情を表現してくれる', '話を聞いてくれる安心感']
    : ['一緒にいると居心地がいい', '笑顔が素敵で癒される', 'さりげない気遣いが嬉しい', '話をじっくり聞いてくれる', '自然体でいられる']
  const charmsB = isDating
    ? ['安心感がハンパない', '何でも受け止めてくれる包容力', '二人の時間を大切にしてくれる', '愛情表現が豊かで嬉しい', '自分のことを一番に考えてくれる']
    : ['安心感がある', '優しくて話しやすい', '一緒にいると楽しい', '価値観が近いと感じる', '素直なところが魅力的']

  // きゅんポイント（簡易テンプレ）
  const kyunTitle = isDating ? '✨ 相手をきゅんとさせる方法TOP5 ✨' : '✨ 相手をドキッとさせる方法TOP5 ✨'
  const kyun = isDating
    ? period === 'less_than_3m' ? [
        'デート後に「今日も楽しかった」って伝える 💕',
        '初めて手を繋ぐ・ハグする',
        '「好き」って恥ずかしがらずに言う',
        '相手の小さな変化に気づく',
        '次のデートの予定を立てる'
      ] : period === '3m_to_1y' ? [
        '何気ない瞬間に「好き」って言う 💕',
        '急に手を繋いだり抱きしめたり',
        '相手の好きなものを覚えてる',
        'デートのサプライズを用意する',
        '「ありがとう」を忘れない'
      ] : period === '1y_to_3y' ? [
        '記念日を覚えてサプライズ 💕',
        '疲れてる時にそっと支える',
        '「一緒にいて幸せ」って伝える',
        '新しいデートプランを提案',
        '相手の夢を応援する'
      ] : period === 'over_3y' ? [
        '「これからもずっと一緒にいたい」って伝える 💕',
        '何でもない日に感謝を伝える',
        '二人の思い出の場所に行く',
        '将来の夢を一緒に語る',
        '変わらず大切にしてることを見せる'
      ] : ['何気ない瞬間に「好き」って言う 💕', '急に手を繋いだり抱きしめたり', '相手の好きなものを覚えてる', 'デートのサプライズを用意する', 'LINEの返信が早くて既読スルーしない']
    : ['さりげなく褒める 💕', '二人きりの時間を作る', '相手の話をしっかり聞く', '共通の趣味の話で盛り上がる', 'LINEで楽しい会話を続ける']

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
  const situationsTitle = isDating ? '💫 特に相性バツグンな時 💫' : '💫 もし付き合ったら相性良さそうな場面 💫'
  const situations = isDating
    ? period === 'less_than_3m' ? [
        '初めてのデートで緊張しながら話してる時',
        '手を繋いだ瞬間',
        'LINEで「おやすみ」って送り合う時',
        '次のデートの予定を立ててる時',
        '二人きりになれた時'
      ] : period === '3m_to_1y' ? [
        '二人きりでまったりしてる時間',
        'デートで手を繋いで歩いてる時',
        'お互いの好きなものをシェアしてる時',
        '夜遅くまで電話やLINEしてる時',
        '記念日を一緒に祝ってる時'
      ] : period === '1y_to_3y' ? [
        '何気ない日常を一緒に過ごしてる時',
        '一緒に料理したり家事してる時',
        'お互いの家族と会ってる時',
        '将来の話を自然にできる時',
        '困った時に支え合える時'
      ] : period === 'over_3y' ? [
        '何も話さなくても落ち着く時間',
        '一緒に過ごす日常のすべて',
        'お互いの夢を応援し合ってる時',
        '辛い時に寄り添える時',
        '笑い合える瞬間すべて'
      ] : ['二人きりでまったりしてる時間', 'デートで手を繋いで歩いてる時', 'お互いの好きなものをシェアしてる時', '夜遅くまで電話やLINEしてる時', '記念日を一緒に祝ってる時']
    : ['二人きりで話してる時間', '一緒に出かけた時', '共通の話題で盛り上がってる時', 'LINEで楽しくやり取りしてる時', '偶然会えた時']

  // 相手の性格分析
  const partnerName = isDating ? nameB : '気になるあの人'
  const partnerTraits = isDating
    ? ['基本的に愛情深くて優しい性格', '感情表現がストレートで素直', '記念日を大事にするロマンチスト', '二人の時間を最優先してくれる', 'ちょっと独占欲が強めかも？', 'でもそれも愛情の裏返し💕']
    : ['基本的に優しくて思いやりがある', '感情表現は素直で分かりやすい', '大切な日を覚えているタイプ', '一緒にいる時間を大事にする', '少し独占欲が見える時も', 'でもそれも好意の裏返し💕']

  // おすすめデート（スコアで軽く並べ替え可だが今は固定）
  const datesTitle = isDating ? '🗓️ このタイプにおすすめデート 🗓️' : '🗓️ もし付き合ったらおすすめデート 🗓️'
  const dates = isDating
    ? period === 'less_than_3m' ? [
        'カフェでゆっくりお話デート',
        '水族館や動物園で初々しくデート',
        '映画館で二人の時間',
        '夜景が綺麗な場所で散歩',
        'お互いの好きな場所を紹介し合う'
      ] : period === '3m_to_1y' ? [
        '夜景の綺麗なレストランでディナー',
        '遊園地やテーマパークで一日中遊ぶ',
        'お揃いのアイテムを買いに行く',
        'おうちで映画鑑賞＆まったり',
        '記念日にサプライズプレゼント交換'
      ] : period === '1y_to_3y' ? [
        '二人で料理を作っておうちディナー',
        '温泉旅行でのんびり過ごす',
        'お互いの地元を案内し合う',
        '新しい趣味に一緒にチャレンジ',
        '将来の話をしながらお散歩'
      ] : period === 'over_3y' ? [
        '思い出の場所を巡る記念デート',
        '二人で将来の家を見に行く',
        '何でもない日におうちでまったり',
        'お互いの両親と食事',
        '新しい場所に旅行して刺激をプラス'
      ] : ['夜景の綺麗なレストランでディナー', 'お揃いのアイテムを買いに行く', '水族館や動物園でまったりデート', 'おうちで映画鑑賞＆まったり', '記念日にサプライズプレゼント交換']
    : ['カフェでゆっくりお茶', '水族館や動物園で二人で楽しむ', '映画を一緒に見に行く', '共通の趣味のイベントに参加', '夜景の綺麗な場所に散歩']

  // 注意点＋アドバイス（低め項目を参照）
  const lowestKey = Object.entries({ 刺激度: scores.stimulation, 癒し度: scores.healing, 会話: scores.conversation, 価値観: scores.values, 将来性: scores.future }).sort((a, b) => a[1] - b[1])[0][0]
  const caution = isDating
    ? period === 'less_than_3m' ? '付き合いたてで舞い上がりすぎて、相手のペースを考えずに進みすぎちゃうかも。'
      : period === '3m_to_1y' ? '二人の世界が完璧すぎて、たまにマンネリ化しちゃうかも。'
      : period === '1y_to_3y' ? '安定しすぎて、たまにドキドキを忘れちゃうかも。'
      : period === 'over_3y' ? '空気のような存在になりすぎて、感謝の気持ちを忘れがち。'
      : '二人の世界が完璧すぎて、たまにマンネリ化しちゃうかも。'
    : '相性は抜群だけど、付き合うまでのアプローチが大事。'
  const actions = isDating
    ? period === 'less_than_3m' ? ['相手の気持ちを確認しながら進む', '焦らずゆっくり関係を深める', '素の自分を少しずつ見せていく']
      : period === '3m_to_1y' ? ['たまには新しい場所にデートしてみる', '友達とも適度に遊ぶ時間を作る', 'サプライズで予想外の刺激をプラス']
      : period === '1y_to_3y' ? ['記念日やイベントを大切にする', 'たまにはおしゃれしてデート', '「好き」「ありがとう」を忘れない']
      : period === 'over_3y' ? ['改めて「ありがとう」を伝える', '初心を思い出す時間を作る', 'これからの未来を一緒に描く']
      : ['たまには新しい場所にデートしてみる', '友達とも適度に遊ぶ時間を作る', 'サプライズで予想外の刺激をプラス']
    : ['自分から積極的に話しかける', '二人きりの時間を作る機会を増やす', '素直に気持ちを伝える勇気を持つ']

  // 未来予測（交際期間と関係性で固定文面）
  function futureByStage(stage?: RelationshipStage): { title: string; text: string } {
    if (!stage || stage.status === 'before_dating') {
      return {
        title: '🔮 もし付き合ったら...？ 🔮',
        text: [
          'この相性なら、付き合ったら',
          'すぐに居心地のいい関係になれそう。',
          '',
          'お互いに素直に愛情を伝え合えて、',
          '周りから羨ましがられるような',
          'カップルになれるはず。',
          '',
          '勇気を出して一歩踏み出してみて💕'
        ].join('\n')
      }
    }
    switch (stage.duration) {
      case 'less_than_3m':
        return {
          title: '🔮 半年後の二人 🔮',
          text: [
            '今よりもっとお互いのことを',
            '知って理解が深まってるはず。',
            '',
            '「この人で良かった」って',
            '実感する瞬間が増えてそう。',
            '',
            '初々しさを大切にしながら、',
            '二人の絆を深めていってね💕'
          ].join('\n')
        }
      case '3m_to_1y':
        return {
          title: '🔮 1年後の二人 🔮',
          text: [
            'もっと絆が深まって、',
            'お互いにとって欠かせない存在に。',
            '',
            '周りからも',
            '「理想のカップルだね」',
            'って言われてそう。',
            '',
            'この調子で大切にしてね💕'
          ].join('\n')
        }
      case '1y_to_3y':
        return {
          title: '🔮 数年後の二人 🔮',
          text: [
            '結婚を意識し始めるかも。',
            'お互いの家族とも仲良くなって、',
            '自然と将来の話が出てくる関係。',
            '',
            'この愛情を大切にすれば、',
            '10年後も20年後も、',
            'ずっと笑い合ってる未来が見える💕'
          ].join('\n')
        }
      case 'over_3y':
        return {
          title: '🔮 この先の二人 🔮',
          text: [
            'もはや人生のパートナー。',
            '結婚してもしなくても、',
            'お互いにとって最高の相棒。',
            '',
            'これからもずっと、',
            '支え合いながら一緒に歩んでいける。',
            '',
            '素敵な関係を築いてきたね💕'
          ].join('\n')
        }
      default:
        return { title: '🔮 1年後の二人 🔮', text: 'この調子で大切にしてね💕' }
    }
  }

  // 称号（スコアで修飾）
  function titleByScore(base: string, total: number): string {
    if (total >= 95) return `究極の${base}`
    if (total >= 90) return `最強の${base}`
    if (total >= 80) return `理想の${base}`
    return base
  }

  const baseTitle = isDating ? 'ハニームーンカップル' : 'ハニームーンタイプ'
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
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{charmsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-pink-600 mb-4">{isDating ? `【${nameB}から見た${nameA}】` : '【相手があなたに惹かれる理由】'}</h4>
              <ul className="space-y-2 text-gray-700">{charmsA.map((c, i) => <li key={i}>・{c}</li>)}</ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-pink-600 mb-4">{isDating ? `【${nameA}から見た${nameB}】` : '【あなたが相手に惹かれる理由】'}</h4>
              <ul className="space-y-2 text-gray-700">{charmsB.map((c, i) => <li key={i}>・{c}</li>)}</ul>
            </div>
          </div>
        </div>

        {/* 6. きゅんポイントTOP5 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{kyunTitle}</h3>
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
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{situationsTitle}</h3>
          <ul className="space-y-2 text-gray-700">{situations.map((s, i) => <li key={i}>・{s}</li>)}</ul>
        </div>

        {/* 10. 相手の性格分析 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 相手の性格プチ分析 📝</h3>
          <div className="text-gray-700 whitespace-pre-line">{`${isDating ? `【${partnerName}はこんな人】` : '【気になるあの人はこんな人】'}\n` + partnerTraits.join('\n') + `\n\n${isDating ? '当たってる？😊' : '当たってるかも？😊'}`}</div>
        </div>

        {/* 11. おすすめデート */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{datesTitle}</h3>
          <ul className="space-y-2 text-gray-700">{dates.map((d, i) => <li key={i}>・{d}</li>)}</ul>
          <div className="text-center text-gray-700 mt-3">{isDating ? '試してみて💕' : '付き合えたら試してみて💕'}</div>
        </div>

        {/* 12. 注意点＋アドバイス */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">⚠️ ちょっとだけ注意 ⚠️</h3>
          <p className="text-gray-700 mb-3">{caution}</p>
          <div className="text-gray-800 font-semibold mb-1">🌟 おすすめアクション</div>
          <ul className="space-y-1 text-gray-700">{actions.map((a, i) => <li key={i}>・{a}</li>)}</ul>
          <div className="text-gray-700 mt-3">{isDating ? 'でも基本的には最高の相性！💯' : 'この相性なら、きっと上手くいく！💯'}</div>
        </div>

        {/* 13. 未来予測 */}
        <div className="bg-white rounded-2xl shadow p-8">
          {(() => { const f = futureByStage(state.relationshipStage); return (<>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{f.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{f.text}</p>
          </>)})()}
        </div>

        {/* 14. 二人の称号 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{isDating ? '👑 二人の称号 👑' : '👑 二人の相性称号 👑'}</h3>
          <div className="text-center text-xl font-bold text-pink-600">「{pairTitle}」</div>
          <div className="text-center text-gray-800 mt-2">{isDating ? 'おめでとう！🎉' : '付き合えたら最高だね！🎉'}</div>
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


