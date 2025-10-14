import { Answer } from '../types'
import { maleTypes, femaleTypes, LoveStyleType } from '../data/loveStyleTypes'

/**
 * 恋愛スタイルのスコア
 */
export interface LoveStyleScores {
  eros: number
  ludus: number
  storge: number
  pragma: number
  mania: number
  agape: number
}

/**
 * タイプ判定結果
 */
export interface LoveStyleResult {
  typeId: string
  typeName: string
  mainStyle: string
  subStyle: string | null
  scores: LoveStyleScores
  type: LoveStyleType
}

/**
 * 回答から各恋愛スタイルのスコアを算出
 */
export function calculateLoveStyleScores(answers: Answer[]): LoveStyleScores {
  const scores: LoveStyleScores = {
    eros: 0,
    ludus: 0,
    storge: 0,
    pragma: 0,
    mania: 0,
    agape: 0
  }

  // カテゴリごとの回答を集計
  const categoryMap: Record<string, number[]> = {
    eros: [],
    ludus: [],
    storge: [],
    pragma: [],
    mania: [],
    agape: []
  }

  answers.forEach(answer => {
    // questionIdからカテゴリを判定（love_1~8はeros、love_9~15はludus...）
    const questionNum = parseInt(answer.questionId.replace('love_', ''))
    
    if (questionNum >= 1 && questionNum <= 8) {
      categoryMap.eros.push(answer.value)
    } else if (questionNum >= 9 && questionNum <= 15) {
      categoryMap.ludus.push(answer.value)
    } else if (questionNum >= 16 && questionNum <= 23) {
      categoryMap.storge.push(answer.value)
    } else if (questionNum >= 24 && questionNum <= 30) {
      categoryMap.pragma.push(answer.value)
    } else if (questionNum >= 31 && questionNum <= 37) {
      categoryMap.mania.push(answer.value)
    } else if (questionNum >= 38 && questionNum <= 45) {
      categoryMap.agape.push(answer.value)
    }
  })

  // 各カテゴリの平均スコアを算出（1-5の範囲）
  Object.keys(categoryMap).forEach(category => {
    const values = categoryMap[category as keyof typeof categoryMap]
    if (values.length > 0) {
      const sum = values.reduce((a, b) => a + b, 0)
      scores[category as keyof LoveStyleScores] = sum / values.length
    }
  })

  return scores
}

/**
 * スコアから20タイプのいずれかを判定
 */
export function determineLoveStyleType(
  scores: LoveStyleScores,
  gender: 'male' | 'female'
): LoveStyleResult {
  // スコアを配列に変換してソート
  const scoreEntries = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])

  const [mainStyleName, mainScore] = scoreEntries[0]
  const [subStyleName, subScore] = scoreEntries[1]

  // 主要タイプと副次タイプを判定
  let mainStyle = mainStyleName
  let subStyle: string | null = null

  // 主要タイプが圧倒的に高い場合（差が1.0以上）→ 純粋型
  if (mainScore - subScore >= 1.0) {
    subStyle = null
  }
  // 全てのスコアが均等（最大と最小の差が0.5以下）→ バランス型
  else if (scoreEntries[0][1] - scoreEntries[5][1] <= 0.5) {
    mainStyle = 'balanced'
    subStyle = null
  }
  // それ以外 → 複合型
  else {
    subStyle = subStyleName
  }

  // 該当するタイプを検索
  const types = gender === 'male' ? maleTypes : femaleTypes
  const type = types.find(t => 
    t.mainStyle === mainStyle && 
    t.subStyle === subStyle
  )

  if (!type) {
    // マッチするタイプが見つからない場合、最も近いタイプを返す
    // 主要タイプのみでマッチング
    const fallbackType = types.find(t => t.mainStyle === mainStyle) || types[types.length - 1]
    
    return {
      typeId: fallbackType.id,
      typeName: fallbackType.name,
      mainStyle: fallbackType.mainStyle,
      subStyle: fallbackType.subStyle,
      scores,
      type: fallbackType
    }
  }

  return {
    typeId: type.id,
    typeName: type.name,
    mainStyle: type.mainStyle,
    subStyle: type.subStyle,
    scores,
    type
  }
}

/**
 * 回答から直接タイプを判定（統合関数）
 */
export function calculateLoveStyleType(
  answers: Answer[],
  gender: 'male' | 'female'
): LoveStyleResult {
  const scores = calculateLoveStyleScores(answers)
  return determineLoveStyleType(scores, gender)
}


