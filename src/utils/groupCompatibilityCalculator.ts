import { 
  GroupParticipant, 
  GroupRomanticSummary, 
  BestCouple, 
  AllCombinationsList, 
  WorstCouple,
  CombinationItem,
  CompletionStatus
} from '../types'

// 酒癖診断の相性計算ロジック（異性間のみ）
export function calculateGroupCompatibility(
  participants: GroupParticipant[]
): {
  summary: GroupRomanticSummary
  bestCouples: BestCouple[]
  allCombinations: AllCombinationsList
  worstCouple: WorstCouple
  completionStatus: CompletionStatus
} {
  const groupId = 'group_' + Date.now() // 実際のgroupIdを使用
  
  // 男性と女性を分離
  const maleParticipants = participants.filter(p => p.gender === 'male')
  const femaleParticipants = participants.filter(p => p.gender === 'female')
  
  console.log('参加者データ:', participants)
  console.log('男性参加者:', maleParticipants)
  console.log('女性参加者:', femaleParticipants)
  
  // 異性間の組み合わせのみ相性スコアを計算
  const combinations: CombinationItem[] = []
  
  // 確実に異性間のみの組み合わせを計算
  if (maleParticipants.length > 0 && femaleParticipants.length > 0) {
    for (const male of maleParticipants) {
      for (const female of femaleParticipants) {
        // 性別が異なることを再確認
        if (male.gender !== female.gender) {
          console.log(`異性間の組み合わせを計算: ${male.userName}♂ × ${female.userName}♀`)
          const romanticScore = calculateRomanticScore(male, female)
          const compatibilityLevel = getCompatibilityLevel(romanticScore)
          const starRating = getStarRating(romanticScore)
          const briefComment = generateBriefComment(romanticScore, male.userName, female.userName)
          
          combinations.push({
            rank: 0, // 後でソート後に設定
            maleId: male.userId,
            maleName: male.userName,
            femaleId: female.userId,
            femaleName: female.userName,
            romanticScore,
            compatibilityLevel,
            starRating,
            briefComment
          })
        } else {
          console.log(`同性間の組み合わせをスキップ: ${male.userName} × ${female.userName}`)
        }
      }
    }
  } else {
    console.log('異性間の組み合わせがありません（男性または女性がいません）')
  }
  
  console.log('計算された組み合わせ数:', combinations.length)
  console.log('組み合わせ詳細:', combinations)
  
  // スコア順にソート
  combinations.sort((a, b) => b.romanticScore - a.romanticScore)
  
  // ランクを設定
  combinations.forEach((combo, index) => {
    combo.rank = index + 1
  })
  
  // グループ全体のサマリーを生成
  const summary = generateGroupSummary(maleParticipants, femaleParticipants, combinations, groupId)
  
  // ベストカップルTop3を生成
  const bestCouples = generateBestCouples(combinations.slice(0, 3))
  
  // 全組み合わせリスト
  const allCombinations: AllCombinationsList = {
    groupId,
    totalCombinations: combinations.length,
    combinations
  }
  
  // ワーストカップル
  const worstCouple = generateWorstCouple(combinations[combinations.length - 1])
  
  // 完了状況
  const completionStatus: CompletionStatus = {
    groupId,
    completedUsers: participants.filter(p => p.diagnosisCompleted).map(p => p.userId),
    pendingUsers: participants.filter(p => !p.diagnosisCompleted).map(p => p.userId),
    allCompleted: participants.every(p => p.diagnosisCompleted)
  }
  
  return {
    summary,
    bestCouples,
    allCombinations,
    worstCouple,
    completionStatus
  }
}

// 2人の相性スコアを計算
function calculateRomanticScore(participantA: GroupParticipant, participantB: GroupParticipant): number {
  const answersA = participantA.diagnosisData || []
  const answersB = participantB.diagnosisData || []
  
  if (answersA.length === 0 || answersB.length === 0) {
    return Math.floor(Math.random() * 40) + 30 // 30-70のランダムスコア
  }
  
  let totalScore = 0
  let questionCount = 0
  
  // 同じ質問に対する回答を比較
  for (const answerA of answersA) {
    const answerB = answersB.find(b => b.questionId === answerA.questionId)
    if (answerB) {
      // 回答の一致度を計算
      const similarity = calculateAnswerSimilarity(answerA.value, answerB.value)
      totalScore += similarity
      questionCount++
    }
  }
  
  if (questionCount === 0) {
    return Math.floor(Math.random() * 40) + 30
  }
  
  const baseScore = (totalScore / questionCount) * 100
  
  // ランダム要素を追加してより自然な結果に
  const randomFactor = (Math.random() - 0.5) * 20
  const finalScore = Math.max(0, Math.min(100, baseScore + randomFactor))
  
  return Math.round(finalScore)
}

// 回答の類似度を計算
function calculateAnswerSimilarity(valueA: number, valueB: number): number {
  const diff = Math.abs(valueA - valueB)
  return Math.max(0, 1 - diff)
}

// 相性レベルを取得
function getCompatibilityLevel(score: number): '相性抜群！' | 'いい感じ' | '微妙' | '友達止まり' {
  if (score >= 80) return '相性抜群！'
  if (score >= 60) return 'いい感じ'
  if (score >= 40) return '微妙'
  return '友達止まり'
}

// 星評価を取得
function getStarRating(score: number): number {
  if (score >= 80) return 5
  if (score >= 60) return 4
  if (score >= 40) return 3
  if (score >= 20) return 2
  return 1
}

// 簡易コメントを生成
function generateBriefComment(score: number, nameA: string, nameB: string): string {
  const comments = {
    high: [
      '今夜くっつく可能性大！',
      '危険なほど相性抜群！',
      'お互い意識してそう。',
      'バランス抜群の組み合わせ。',
      '恋愛が生まれやすい相性！'
    ],
    medium: [
      '良い雰囲気になりそう。',
      '友達以上恋人未満のライン。',
      '時と場合によって変わる。',
      '今夜だけの相性。',
      '話すきっかけを作ってみては？'
    ],
    low: [
      '友達止まりかも。',
      '真逆すぎて噛み合わない。',
      '完全に友達ゾーン（笑）',
      '恋愛は期待しない方がいいかも。',
      '飲み友達としては最高！'
    ]
  }
  
  let commentList: string[]
  if (score >= 70) {
    commentList = comments.high
  } else if (score >= 40) {
    commentList = comments.medium
  } else {
    commentList = comments.low
  }
  
  return commentList[Math.floor(Math.random() * commentList.length)]
}

// グループ全体のサマリーを生成
function generateGroupSummary(
  maleParticipants: GroupParticipant[], 
  femaleParticipants: GroupParticipant[],
  combinations: CombinationItem[], 
  groupId: string
): GroupRomanticSummary {
  const maleNames = maleParticipants.map(p => p.userName)
  const femaleNames = femaleParticipants.map(p => p.userName)
  const maleCount = maleParticipants.length
  const femaleCount = femaleParticipants.length
  const totalCombinations = combinations.length
  
  const scores = combinations.map(c => c.romanticScore)
  const averageScore = scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0
  
  const maxScore = combinations[0] // 最高スコア
  const minScore = combinations[combinations.length - 1] // 最低スコア
  
  const balanceComment = generateBalanceComment(maleCount, femaleCount)
  const overallComment = generateOverallComment(averageScore, maxScore, minScore, maleNames, femaleNames)
  
  return {
    groupId,
    maleCount,
    femaleCount,
    maleNames,
    femaleNames,
    totalCombinations,
    averageScore,
    maxScore: {
      maleName: maxScore?.maleName || '',
      femaleName: maxScore?.femaleName || '',
      score: maxScore?.romanticScore || 0
    },
    minScore: {
      maleName: minScore?.maleName || '',
      femaleName: minScore?.femaleName || '',
      score: minScore?.romanticScore || 0
    },
    balanceComment,
    overallComment
  }
}

// 男女バランスに応じたコメントを生成
function generateBalanceComment(maleCount: number, femaleCount: number): string {
  if (maleCount === 0 || femaleCount === 0) {
    return '残念ながら異性がいないため、恋愛相性診断ができませんでした。次回は男女混合で挑戦してみてください！'
  }
  
  if (maleCount === femaleCount) {
    return '完璧なバランス！全員にチャンスがある理想的な構成です。'
  }
  
  if (maleCount > femaleCount) {
    return '男性陣が多めですが、女性陣はモテ期到来の予感。積極的にアプローチを！'
  }
  
  return '女性陣が多めですが、男性陣は選び放題。今夜は特別な出会いがありそう。'
}

// グループ全体のコメントを生成
function generateOverallComment(
  averageScore: number, 
  maxScore: CombinationItem | undefined, 
  minScore: CombinationItem | undefined, 
  maleNames: string[],
  femaleNames: string[]
): string {
  if (!maxScore || !minScore) {
    return '異性間の組み合わせがないため、恋愛相性診断ができませんでした。'
  }

  const comments = {
    high: [
      `このグループは恋愛が生まれやすい相性！特に${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀は今夜くっつく可能性大。全体的にバランスが良く、誰かしらがカップルになりそうな予感。今夜はみんなでキューピッド役になって盛り上げよう！`,
      `今夜の飲み会は恋愛の香りがプンプン！${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀の相性が特に抜群で、周りも応援したくなる組み合わせ。全体的に恋愛モード全開のグループなので、今夜は恋愛トークで盛り上がろう！`,
      `このメンバーなら恋愛が生まれる確率が高い！${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀は危険なほど相性が良く、今夜告白やキスまで行く可能性も。みんなで二人の距離を縮めるお手伝いをしよう！`
    ],
    medium: [
      `バランスの取れたグループ！${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀が特に相性が良く、恋愛の可能性も十分。全体的には友達関係も恋愛関係も楽しめる、理想的なメンバー構成。今夜は自然体で楽しもう！`,
      `恋愛も友情も楽しめるグループ！${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀の相性が良く、恋愛のきっかけもありそう。全体的に程よい距離感で、無理せず自然に盛り上がれるメンバー。今夜はリラックスして楽しもう！`
    ],
    low: [
      `友情重視のグループ！恋愛よりも深い友情を築けそうなメンバー構成。${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀も友達として最高の相性。今夜は恋愛よりも、みんなで楽しく飲んで盛り上がろう！`,
      `友達として最高のグループ！恋愛は期待せず、純粋に飲み友達として楽しめるメンバー。${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀も友達ゾーンだが、気の置けない関係で最高。今夜は友情を深めよう！`
    ]
  }
  
  let commentList: string[]
  if (averageScore >= 70) {
    commentList = comments.high
  } else if (averageScore >= 50) {
    commentList = comments.medium
  } else {
    commentList = comments.low
  }
  
  return commentList[Math.floor(Math.random() * commentList.length)]
}

// ベストカップルTop3を生成
function generateBestCouples(combinations: CombinationItem[]): BestCouple[] {
  return combinations.map((combo, index) => ({
    rank: index + 1,
    maleId: combo.maleId,
    maleName: combo.maleName,
    femaleId: combo.femaleId,
    femaleName: combo.femaleName,
    romanticScore: combo.romanticScore,
    detailedComment: generateDetailedComment(combo.romanticScore, combo.maleName, combo.femaleName, index + 1)
  }))
}

// 詳細コメントを生成
function generateDetailedComment(score: number, maleName: string, femaleName: string, rank: number): string {
  const comments = {
    high: [
      `危険なほど相性抜群！今夜この二人を二人きりにしたら、告白やキスまで行く可能性大。みんなで二人の距離を縮めるお手伝いをしよう（笑）`,
      `お互い意識してそうな雰囲気。今夜のうちにチャンスを作ってあげると、いい関係に発展しそう。隣同士に座らせてみては？`,
      `真逆のタイプだけど、だからこそバランス抜群。今夜話すきっかけを作ってあげたら、自然と惹かれ合うはず。`
    ],
    medium: [
      `いい感じの相性！恋愛の可能性も十分ある。今夜は自然体で接して、お互いの魅力を引き出し合える関係になりそう。`,
      `バランスの良い組み合わせ。恋愛も友情も楽しめる関係性。今夜は無理せず、自然な流れで盛り上がろう。`
    ],
    low: [
      `友達として最高の相性。恋愛は期待せず、純粋に楽しい関係を築けそう。今夜は気の置けない飲み友達として楽しもう！`
    ]
  }
  
  let commentList: string[]
  if (score >= 80) {
    commentList = comments.high
  } else if (score >= 60) {
    commentList = comments.medium
  } else {
    commentList = comments.low
  }
  
  return commentList[Math.floor(Math.random() * commentList.length)]
}

// ワーストカップルを生成
function generateWorstCouple(combination: CombinationItem): WorstCouple {
  return {
    maleId: combination.maleId,
    maleName: combination.maleName,
    femaleId: combination.femaleId,
    femaleName: combination.femaleName,
    romanticScore: combination.romanticScore,
    humorousComment: generateHumorousComment(combination.romanticScore, combination.maleName, combination.femaleName)
  }
}

// ユーモアたっぷりのコメントを生成
function generateHumorousComment(score: number, maleName: string, femaleName: string): string {
  const comments = [
    `どれだけ酔っても恋愛対象として見れない最強の友達ゾーン（笑）。でも気の置けない飲み友達としては最高の関係。恋愛を期待せず、純粋に楽しもう！`,
    `完全に友達ゾーン！恋愛は諦めて、今夜は飲み友達として最高の時間を過ごそう。この関係性も悪くないよ（笑）`,
    `恋愛は期待しない方がいいかも（笑）。でも友達としては最高の相性なので、今夜は気の置けない関係で楽しく飲もう！`,
    `友達止まり確定の組み合わせ（笑）。でもこの関係性も悪くない。今夜は恋愛を忘れて、純粋に友情を深めよう！`
  ]
  
  return comments[Math.floor(Math.random() * comments.length)]
}
