export type UserDrinkingProfile = {
  価値観?: string
  お金の使い方?: string
  会話スタイル?: string
  酔い方?: string
  役割?: string
  酔いのペース?: string
}

export type BuzzyElementResult = {
  タイトル: string
  解説: string
  相性スコア: number
}

export type BuzzyOverallResult = {
  タイトル: string
  スコア: number
}

export type BuzzyCompatibilityResult = {
  価値観の一致: BuzzyElementResult
  会話のテンポ: BuzzyElementResult
  居心地: BuzzyElementResult
  補完関係: BuzzyElementResult
  総合相性: BuzzyOverallResult
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(n)))

const pickEmoji = (score: number) => {
  if (score >= 85) return '🔥'
  if (score >= 70) return '✨'
  if (score >= 50) return '🍻'
  if (score >= 35) return '😌'
  return '🧊'
}

function similarity(a?: string, b?: string) {
  if (!a || !b) return 50
  return a === b ? 95 : 40
}

function roleSynergy(role1?: string, role2?: string) {
  const pairs = new Set([
    '盛り上げ役|聞き役',
    'ボケ|ツッコミ',
    'まとめ役|盛り上げ役',
    '介護役|盛り上げ役'
  ])
  if (!role1 || !role2) return 50
  const key = `${role1}|${role2}`
  const keyRev = `${role2}|${role1}`
  if (pairs.has(key) || pairs.has(keyRev)) return 85
  if (role1 === role2) return 60
  return 55
}

function paceSynergy(p1?: string, p2?: string) {
  if (!p1 || !p2) return 50
  return p1 === p2 ? 85 : 60
}

function bold(text: string) {
  return `**${text}**`
}

export function generateCompatibilityResult(user1: UserDrinkingProfile, user2: UserDrinkingProfile): BuzzyCompatibilityResult {
  // 価値観の一致
  const valueScoreBase = (similarity(user1.価値観, user2.価値観) + similarity(user1.お金の使い方, user2.お金の使い方)) / 2
  const valueScore = clamp(valueScoreBase)
  const valueTitle = `財布もスケジュールも噛み合う夜${pickEmoji(valueScore)}`
  const valueExpl = [
    `${bold('会計で揉めないの、正義。')} 終電の判断も同じで、タクシー代の空気まで共有できる。`,
    `「割り勘でサクッと1軒」派が一致。翌日も財布に優しく、${bold('後悔ゼロ')}で眠れるやつ。`,
    `会計の合図も終電の気配も同じタイミング。${bold('目が合うだけで「そろそろ」')}が伝わる。`
  ]
  const valueExplanation = valueExpl[(valueScore % valueExpl.length)]

  // 会話のテンポ
  const tempoScoreBase = (similarity(user1.会話スタイル, user2.会話スタイル) +  (user1.会話スタイル && user2.会話スタイル ? 10 : 0))
  const tempoScore = clamp(tempoScoreBase)
  const tempoTitle = `会話、トイレ行って戻ってきても続いてる${pickEmoji(tempoScore)}`
  const tempoExpl = [
    `${bold('同じ話3回でも笑えるテンポ。')} 温度差が出にくく、沈黙も「休憩」に化ける。`,
    `ツッコミと相槌のリズムが同じ。${bold('無限ループなのに飽きない')}、危険なゾーン。`,
    `哲学も爆笑エピソードも往復できる帯域。${bold('沈黙=心地よい')}に変換される相性。`
  ]
  const tempoExplanation = tempoExpl[(tempoScore + 1) % tempoExpl.length]

  // 居心地
  const easeScoreBase = (similarity(user1.酔い方, user2.酔い方) + similarity(user1.価値観, user2.価値観)) / 2
  const easeScore = clamp(easeScoreBase)
  const easeTitle = `終電逃しても気まずくならない関係${pickEmoji(easeScore)}`
  const easeExpl = [
    `${bold('既読スルーでも不安にならない距離感。')} 翌日の連絡が自然で、キャラ変にも優しい。`,
    `一緒にいると体感時間が速い。${bold('気まずさが「安心感」に変わる')}、稀少種。`,
    `帰りのタクシーで無言OK。${bold('沈黙に意味がある')}タイプ。`
  ]
  const easeExplanation = easeExpl[(easeScore + 2) % easeExpl.length]

  // 補完関係
  const compScoreBase = (roleSynergy(user1.役割, user2.役割) + paceSynergy(user1.酔いのペース, user2.酔いのペース)) / 2
  const compScore = clamp(compScoreBase)
  const compTitle = `盛り上げとケアが同時成立${pickEmoji(compScore)}`
  const compExpl = [
    `${bold('ピークの時間帯がシンクロ。')} 3杯目のテンションも終盤の介護も綺麗に分担。`,
    `ボケとツッコミが自動発生。${bold('笑いと安心感が両立')}する貴重な組み合わせ。`,
    `聞き役と盛り上げ役が交代可能。${bold('どの席でも戦える')}万能ペア。`
  ]
  const compExplanation = compExpl[(compScore + 3) % compExpl.length]

  // 総合
  const overallScore = clamp((valueScore + tempoScore + easeScore + compScore) / 4)
  const overallTitle = overallScore >= 80
    ? 'このまま2軒目、距離バグるやつ🔥'
    : overallScore >= 65
    ? '気づいたら「また会ってる」関係✨'
    : overallScore >= 50
    ? '安心して飲める、長続き系🍻'
    : overallScore >= 35
    ? '今日は深追いせず、ゆっくりいこう😌'
    : 'まずは様子見の低燃費デート🧊'

  return {
    価値観の一致: { タイトル: valueTitle, 解説: valueExplanation, 相性スコア: valueScore },
    会話のテンポ: { タイトル: tempoTitle, 解説: tempoExplanation, 相性スコア: tempoScore },
    居心地: { タイトル: easeTitle, 解説: easeExplanation, 相性スコア: easeScore },
    補完関係: { タイトル: compTitle, 解説: compExplanation, 相性スコア: compScore },
    総合相性: { タイトル: overallTitle, スコア: overallScore }
  }
}












