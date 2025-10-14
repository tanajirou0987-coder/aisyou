/**
 * 関係ステージの定義
 * 診断結果のコンテンツは、関係ステージに応じて変化します
 */

export type RelationshipStatus = 'before_dating' | 'dating'

export type DatingDuration = 'less_than_3m' | '3m_to_1y' | '1y_to_3y' | 'over_3y'

export interface RelationshipStage {
  status: RelationshipStatus
  duration?: DatingDuration
}

/**
 * 関係ステージの表示名を取得
 */
export function getRelationshipStageLabel(stage: RelationshipStage): string {
  if (stage.status === 'before_dating') {
    return '付き合う前'
  }
  
  switch (stage.duration) {
    case 'less_than_3m':
      return '付き合っている（3ヶ月未満）'
    case '3m_to_1y':
      return '付き合っている（3ヶ月〜1年未満）'
    case '1y_to_3y':
      return '付き合っている（1年〜3年未満）'
    case 'over_3y':
      return '付き合っている（3年以上）'
    default:
      return '付き合っている'
  }
}

/**
 * 関係ステージに応じたフォーカス内容
 */
export function getRelationshipStageFocus(stage: RelationshipStage): {
  title: string
  focuses: string[]
} {
  if (stage.status === 'before_dating') {
    return {
      title: '付き合う前の関係',
      focuses: ['距離の縮め方', '初デートの提案', '告白のタイミング']
    }
  }
  
  switch (stage.duration) {
    case 'less_than_3m':
      return {
        title: '交際初期（3ヶ月未満）',
        focuses: ['連絡頻度', 'デート頻度', 'この時期の注意点']
      }
    case '3m_to_1y':
      return {
        title: '安定期（3ヶ月〜1年未満）',
        focuses: ['安定期の過ごし方', '関係深化', 'お互いの理解を深める']
      }
    case '1y_to_3y':
      return {
        title: '発展期（1年〜3年未満）',
        focuses: ['マンネリ対策', '将来設計', '関係の次のステップ']
      }
    case 'over_3y':
      return {
        title: '長期的な関係（3年以上）',
        focuses: ['長期的な関係維持', '結婚や家族計画', '深い絆の構築']
      }
    default:
      return {
        title: '交際中',
        focuses: ['関係の深化', 'お互いの理解', '将来への展望']
      }
  }
}


