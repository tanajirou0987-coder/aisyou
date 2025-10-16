import { LoveStyleScores } from './loveStyleCalculator'

/**
 * 恋愛スタイル相性マトリックス
 * 
 * ジョン・リーのラブスタイル類型論に基づく相性理論：
 * - 補完関係：お互いの弱点を補い合う関係（高相性）
 * - 類似関係：価値観が似ている関係（中相性）
 * - 対立関係：価値観が衝突する関係（低相性）
 */

/**
 * 基本恋愛スタイル間の相性スコア（0-100）
 */
const baseCompatibilityMatrix: Record<string, Record<string, number>> = {
  // エロス（情熱的・ロマンティック）
  eros: {
    eros: 70,     // 同じ理想を追求するが、高すぎる期待で衝突も
    ludus: 45,    // エロスの真剣さとルダスの軽さが衝突
    storge: 75,   // ストルゲの安定感がエロスの情熱を支える（補完）
    pragma: 55,   // 理想と現実のバランスが難しい
    mania: 65,    // 情熱的な部分で共感するが、依存度が問題
    agape: 80     // エロスの情熱とアガペの献身が相性良い（補完）
  },
  // ルダス（遊び心・自由）
  ludus: {
    eros: 45,     // エロスの真剣さとルダスの軽さが衝突
    ludus: 75,    // 自由を尊重し合える良い相性
    storge: 60,   // ストルゲの安定がルダスに安心感を与える
    pragma: 50,   // プラグマの計画性とルダスの自由が対立
    mania: 35,    // マニアの依存とルダスの自由が激しく対立
    agape: 55     // アガペの献身がルダスに重い
  },
  // ストルゲ（友情ベース・安定）
  storge: {
    eros: 75,     // エロスの情熱をストルゲが安定させる（補完）
    ludus: 60,    // ルダスに安心感を提供
    storge: 85,   // 安定志向同士で最高の相性
    pragma: 90,   // 現実的で安定した関係（最高の補完関係）
    mania: 50,    // マニアの感情起伏にストルゲが疲れる
    agape: 85     // 深い信頼と献身で良好な関係
  },
  // プラグマ（現実的・計画的）
  pragma: {
    eros: 55,     // 理想と現実のバランスが難しい
    ludus: 50,    // 計画性と自由が対立
    storge: 90,   // 現実的で安定した関係（最高の補完関係）
    pragma: 80,   // 現実的な視点を共有、安定した関係
    mania: 40,    // マニアの感情的な部分とプラグマの理性が対立
    agape: 70     // アガペの献身とプラグマの計画性が良い
  },
  // マニア（依存的・情熱的）
  mania: {
    eros: 65,     // 情熱的な部分で共感するが、依存度が問題
    ludus: 35,    // マニアの依存とルダスの自由が激しく対立
    storge: 50,   // ストルゲがマニアの感情を受け止めきれない
    pragma: 40,   // マニアの感情とプラグマの理性が対立
    mania: 55,    // 依存し合うが、感情的な衝突が多い
    agape: 75     // アガペの献身がマニアの不安を和らげる（補完）
  },
  // アガペ（献身的・無償の愛）
  agape: {
    eros: 80,     // エロスの情熱とアガペの献身が相性良い（補完）
    ludus: 55,    // アガペの献身がルダスに重い
    storge: 85,   // 深い信頼と献身で良好な関係
    pragma: 70,   // 献身と計画性が良いバランス
    mania: 75,    // アガペの献身がマニアの不安を和らげる（補完）
    agape: 78     // 互いに尽くし合うが、自己犠牲が問題になることも
  }
}

/**
 * 男性タイプと女性タイプから相性スコアを算出
 */
export function calculateCompatibilityScore(
  maleMainStyle: string,
  maleSubStyle: string | null,
  femaleMainStyle: string,
  femaleSubStyle: string | null
): number {
  // バランス型の場合は平均的な相性
  if (maleMainStyle === 'balanced' || femaleMainStyle === 'balanced') {
    return 65
  }

  // 主要タイプ同士の相性を取得
  const mainCompatibility = baseCompatibilityMatrix[maleMainStyle]?.[femaleMainStyle] || 60

  // 副次タイプがある場合、その相性も考慮
  let finalScore = mainCompatibility

  if (maleSubStyle && femaleSubStyle) {
    // 両方に副次タイプがある場合
    const subCompatibility = baseCompatibilityMatrix[maleSubStyle]?.[femaleSubStyle] || 60
    const crossCompatibility1 = baseCompatibilityMatrix[maleMainStyle]?.[femaleSubStyle] || 60
    const crossCompatibility2 = baseCompatibilityMatrix[maleSubStyle]?.[femaleMainStyle] || 60
    
    // 加重平均（主要タイプ60%、副次タイプ20%、クロス20%）
    finalScore = Math.round(
      mainCompatibility * 0.6 +
      subCompatibility * 0.1 +
      crossCompatibility1 * 0.15 +
      crossCompatibility2 * 0.15
    )
  } else if (maleSubStyle) {
    // 男性のみ副次タイプがある場合
    const crossCompatibility = baseCompatibilityMatrix[maleSubStyle]?.[femaleMainStyle] || 60
    finalScore = Math.round(mainCompatibility * 0.75 + crossCompatibility * 0.25)
  } else if (femaleSubStyle) {
    // 女性のみ副次タイプがある場合
    const crossCompatibility = baseCompatibilityMatrix[maleMainStyle]?.[femaleSubStyle] || 60
    finalScore = Math.round(mainCompatibility * 0.75 + crossCompatibility * 0.25)
  }

  // スコアを0-100の範囲に収める
  return Math.max(0, Math.min(100, finalScore))
}

/**
 * タイプIDから相性スコアを算出
 */
export function getCompatibilityByTypeIds(maleTypeId: string, femaleTypeId: string): number {
  // タイプIDからスタイル情報を取得するヘルパー
  const getStylesFromTypeId = (typeId: string): { mainStyle: string, subStyle: string | null } => {
    // ここでは簡略化のため、タイプ定義から取得する必要があります
    // 実際の実装ではLoveStyleTypeのデータを参照
    return { mainStyle: 'eros', subStyle: null }
  }

  const maleStyles = getStylesFromTypeId(maleTypeId)
  const femaleStyles = getStylesFromTypeId(femaleTypeId)

  return calculateCompatibilityScore(
    maleStyles.mainStyle,
    maleStyles.subStyle,
    femaleStyles.mainStyle,
    femaleStyles.subStyle
  )
}

/**
 * 恋愛スタイルスコアから相性を算出（より詳細な分析）
 */
export function calculateDetailedCompatibility(
  maleScores: LoveStyleScores,
  femaleScores: LoveStyleScores
): {
  totalScore: number
  categoryScores: Record<string, number>
  strengths: string[]
  challenges: string[]
} {
  const categoryScores: Record<string, number> = {}
  const strengths: string[] = []
  const challenges: string[] = []

  // 各カテゴリのスコア差を計算
  const styles = ['eros', 'ludus', 'storge', 'pragma', 'mania', 'agape'] as const
  
  styles.forEach(style => {
    const maleScore = maleScores[style]
    const femaleScore = femaleScores[style]
    const difference = Math.abs(maleScore - femaleScore)
    
    // スコア差が小さいほど相性が良い（類似性）
    // ただし、補完関係も考慮
    const similarity = Math.max(0, 100 - difference * 20)
    categoryScores[style] = Math.round(similarity)
  })

  // 主要な恋愛スタイルを特定
  const maleMainStyle = (Object.entries(maleScores).sort((a, b) => b[1] - a[1])[0][0])
  const femaleMainStyle = (Object.entries(femaleScores).sort((a, b) => b[1] - a[1])[0][0])

  // 総合スコアを算出
  const baseScore = baseCompatibilityMatrix[maleMainStyle]?.[femaleMainStyle] || 60
  const avgCategoryScore = Object.values(categoryScores).reduce((a, b) => a + b, 0) / styles.length
  const totalScore = Math.round((baseScore * 0.6 + avgCategoryScore * 0.4))

  // 強みと課題を抽出
  if (totalScore >= 80) {
    strengths.push('お互いの価値観が良く調和している')
    strengths.push('長期的な関係を築きやすい')
  } else if (totalScore >= 60) {
    strengths.push('バランスの取れた関係を築ける')
  } else {
    challenges.push('価値観の違いを理解し合う努力が必要')
  }

  return {
    totalScore: Math.max(0, Math.min(100, totalScore)),
    categoryScores,
    strengths,
    challenges
  }
}








