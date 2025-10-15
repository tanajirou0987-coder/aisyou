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

// 2人の相性スコアを計算（高速化版）
function calculateRomanticScore(participantA: GroupParticipant, participantB: GroupParticipant): number {
  const answersA = participantA.diagnosisData || []
  const answersB = participantB.diagnosisData || []
  
  if (answersA.length === 0 || answersB.length === 0) {
    return 50 // デフォルトスコア（ランダム要素を削除）
  }
  
  let totalScore = 0
  let questionCount = 0
  
  // 同じ質問に対する回答を比較（最適化）
  const answerMap = new Map(answersB.map(b => [b.questionId, b.value]))
  
  for (const answerA of answersA) {
    const answerBValue = answerMap.get(answerA.questionId)
    if (answerBValue !== undefined) {
      // 回答の一致度を計算
      const similarity = calculateAnswerSimilarity(answerA.value, answerBValue)
      totalScore += similarity
      questionCount++
    }
  }
  
  if (questionCount === 0) {
    return 50
  }
  
  const baseScore = (totalScore / questionCount) * 100
  
  // ランダム要素を削除して高速化
  const finalScore = Math.max(0, Math.min(100, baseScore))
  
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

// 簡易コメントを生成（高速化版）
function generateBriefComment(score: number, nameA: string, nameB: string): string {
  // ランダム要素を削除して固定コメントに
  if (score >= 80) {
    return '今夜くっつく可能性大！'
  } else if (score >= 70) {
    return '危険なほど相性抜群！'
  } else if (score >= 60) {
    return 'お互い意識してそう。'
  } else if (score >= 50) {
    return '良い雰囲気になりそう。'
  } else if (score >= 40) {
    return '友達以上恋人未満のライン。'
  } else {
    return '友達止まりかも。'
  }
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

// グループ全体のコメントを生成（高速化版）
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

  // ランダム要素を削除して固定コメントに
  if (averageScore >= 70) {
    return `このグループは恋愛が生まれやすい相性！特に${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀は今夜くっつく可能性大。全体的にバランスが良く、誰かしらがカップルになりそうな予感。今夜はみんなでキューピッド役になって盛り上げよう！`
  } else if (averageScore >= 50) {
    return `バランスの取れたグループ！${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀が特に相性が良く、恋愛の可能性も十分。全体的には友達関係も恋愛関係も楽しめる、理想的なメンバー構成。今夜は自然体で楽しもう！`
  } else {
    return `友情重視のグループ！恋愛よりも深い友情を築けそうなメンバー構成。${maxScore.maleName}さん♂と${maxScore.femaleName}さん♀も友達として最高の相性。今夜は恋愛よりも、みんなで楽しく飲んで盛り上がろう！`
  }
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

// 詳細コメントを生成（高速化版）
function generateDetailedComment(score: number, maleName: string, femaleName: string, rank: number): string {
  // ランダム要素を削除して固定コメントに
  if (score >= 80) {
    return `危険なほど相性抜群！今夜この二人を二人きりにしたら、告白やキスまで行く可能性大。みんなで二人の距離を縮めるお手伝いをしよう（笑）`
  } else if (score >= 60) {
    return `いい感じの相性！恋愛の可能性も十分ある。今夜は自然体で接して、お互いの魅力を引き出し合える関係になりそう。`
  } else {
    return `友達として最高の相性。恋愛は期待せず、純粋に楽しい関係を築けそう。今夜は気の置けない飲み友達として楽しもう！`
  }
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

// ユーモアたっぷりのコメントを生成（高速化版）
function generateHumorousComment(score: number, maleName: string, femaleName: string): string {
  // ランダム要素を削除して固定コメントに
  return `どれだけ酔っても恋愛対象として見れない最強の友達ゾーン（笑）。でも気の置けない飲み友達としては最高の関係。恋愛を期待せず、純粋に楽しもう！`
}
