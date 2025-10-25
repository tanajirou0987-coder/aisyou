/**
 * 恋愛スタイル組み合わせテンプレート（6×6=36パターン）
 * 
 * ジョン・リーの恋愛スタイル類型論に基づく相性マトリックス
 * 事前計算により高速な相性判定を実現
 */

export interface LoveStyleCompatibility {
  score: number
  analysis: string
  strengths: string[]
  challenges: string[]
  advice: string[]
}

export const LOVE_STYLE_MATRIX: Record<string, LoveStyleCompatibility> = {
  // エロス（情熱的）の組み合わせ
  'Eros-Eros': {
    score: 90,
    analysis: '情熱的な関係',
    strengths: ['強い愛情表現', 'ロマンチックな関係', '情熱的な絆'],
    challenges: ['感情の起伏が激しい', '嫉妬心が強い'],
    advice: ['お互いの情熱を尊重し合う', '冷静な判断も大切にする']
  },
  'Eros-Ludus': {
    score: 65,
    analysis: '情熱と遊び心の対比',
    strengths: ['刺激的な関係', '多様な楽しみ'],
    challenges: ['真剣さの違い', 'コミットメントの違い'],
    advice: ['お互いの価値観を理解する', 'バランスを取る努力をする']
  },
  'Eros-Storge': {
    score: 75,
    analysis: '情熱と友情のバランス',
    strengths: ['深い絆', '安定した関係'],
    challenges: ['情熱の表現方法の違い', '愛情表現の違い'],
    advice: ['お互いの愛情表現を理解する', '長期的な視点を持つ']
  },
  'Eros-Pragma': {
    score: 60,
    analysis: '情熱と実用性の対比',
    strengths: ['バランスの取れた関係', '現実的な視点'],
    challenges: ['感情と論理の違い', '価値観の違い'],
    advice: ['お互いの価値観を尊重する', 'コミュニケーションを大切にする']
  },
  'Eros-Mania': {
    score: 85,
    analysis: '情熱的な関係',
    strengths: ['強い愛情表現', '情熱的な絆'],
    challenges: ['感情の起伏が激しい', '依存関係のリスク'],
    advice: ['お互いの感情を理解する', '健全な関係を築く']
  },
  'Eros-Agape': {
    score: 95,
    analysis: '理想的な関係',
    strengths: ['無条件の愛', '深い理解', '完璧な相性'],
    challenges: ['現実的な問題への対処'],
    advice: ['理想を現実に落とし込む', '継続的な努力をする']
  },

  // ルドゥス（遊び心）の組み合わせ
  'Ludus-Eros': {
    score: 65,
    analysis: '遊び心と情熱の対比',
    strengths: ['刺激的な関係', '多様な楽しみ'],
    challenges: ['真剣さの違い', 'コミットメントの違い'],
    advice: ['お互いの価値観を理解する', 'バランスを取る努力をする']
  },
  'Ludus-Ludus': {
    score: 80,
    analysis: '遊び心の関係',
    strengths: ['楽しい関係', '自由な関係', '多様な楽しみ'],
    challenges: ['真剣な関係の構築', '長期的なコミットメント'],
    advice: ['時には真剣になる', '長期的な視点を持つ']
  },
  'Ludus-Storge': {
    score: 70,
    analysis: '遊び心と友情のバランス',
    strengths: ['楽しい関係', '安定した関係'],
    challenges: ['真剣さの違い', '価値観の違い'],
    advice: ['お互いの価値観を理解する', 'バランスを取る努力をする']
  },
  'Ludus-Pragma': {
    score: 55,
    analysis: '遊び心と実用性の対比',
    strengths: ['バランスの取れた関係', '現実的な視点'],
    challenges: ['真剣さの違い', '価値観の違い'],
    advice: ['お互いの価値観を尊重する', 'コミュニケーションを大切にする']
  },
  'Ludus-Mania': {
    score: 60,
    analysis: '遊び心と執着の対比',
    strengths: ['刺激的な関係', '情熱的な絆'],
    challenges: ['真剣さの違い', '依存関係のリスク'],
    advice: ['お互いの感情を理解する', '健全な関係を築く']
  },
  'Ludus-Agape': {
    score: 70,
    analysis: '遊び心と無条件の愛の対比',
    strengths: ['楽しい関係', '深い理解'],
    challenges: ['真剣さの違い', '価値観の違い'],
    advice: ['お互いの価値観を理解する', 'バランスを取る努力をする']
  },

  // ストルゲ（友情）の組み合わせ
  'Storge-Eros': {
    score: 75,
    analysis: '友情と情熱のバランス',
    strengths: ['深い絆', '安定した関係'],
    challenges: ['情熱の表現方法の違い', '愛情表現の違い'],
    advice: ['お互いの愛情表現を理解する', '長期的な視点を持つ']
  },
  'Storge-Ludus': {
    score: 70,
    analysis: '友情と遊び心のバランス',
    strengths: ['楽しい関係', '安定した関係'],
    challenges: ['真剣さの違い', '価値観の違い'],
    advice: ['お互いの価値観を理解する', 'バランスを取る努力をする']
  },
  'Storge-Storge': {
    score: 85,
    analysis: '友情の関係',
    strengths: ['深い絆', '安定した関係', '長期的な関係'],
    challenges: ['情熱の表現', 'ロマンチックな要素'],
    advice: ['情熱的な要素も大切にする', 'ロマンチックな関係を築く']
  },
  'Storge-Pragma': {
    score: 90,
    analysis: '友情と実用性の理想的な関係',
    strengths: ['深い絆', '現実的な関係', '長期的な関係'],
    challenges: ['情熱の表現', 'ロマンチックな要素'],
    advice: ['情熱的な要素も大切にする', 'ロマンチックな関係を築く']
  },
  'Storge-Mania': {
    score: 75,
    analysis: '友情と執着のバランス',
    strengths: ['深い絆', '情熱的な関係'],
    challenges: ['依存関係のリスク', '感情の起伏'],
    advice: ['健全な関係を築く', 'お互いの感情を理解する']
  },
  'Storge-Agape': {
    score: 95,
    analysis: '友情と無条件の愛の理想的な関係',
    strengths: ['深い絆', '無条件の愛', '完璧な相性'],
    challenges: ['現実的な問題への対処'],
    advice: ['理想を現実に落とし込む', '継続的な努力をする']
  },

  // プラグマ（実用的）の組み合わせ
  'Pragma-Eros': {
    score: 60,
    analysis: '実用性と情熱の対比',
    strengths: ['バランスの取れた関係', '現実的な視点'],
    challenges: ['感情と論理の違い', '価値観の違い'],
    advice: ['お互いの価値観を尊重する', 'コミュニケーションを大切にする']
  },
  'Pragma-Ludus': {
    score: 55,
    analysis: '実用性と遊び心の対比',
    strengths: ['バランスの取れた関係', '現実的な視点'],
    challenges: ['真剣さの違い', '価値観の違い'],
    advice: ['お互いの価値観を尊重する', 'コミュニケーションを大切にする']
  },
  'Pragma-Storge': {
    score: 90,
    analysis: '実用性と友情の理想的な関係',
    strengths: ['深い絆', '現実的な関係', '長期的な関係'],
    challenges: ['情熱の表現', 'ロマンチックな要素'],
    advice: ['情熱的な要素も大切にする', 'ロマンチックな関係を築く']
  },
  'Pragma-Pragma': {
    score: 85,
    analysis: '実用性の関係',
    strengths: ['現実的な関係', '長期的な関係', '安定した関係'],
    challenges: ['情熱の表現', 'ロマンチックな要素'],
    advice: ['情熱的な要素も大切にする', 'ロマンチックな関係を築く']
  },
  'Pragma-Mania': {
    score: 70,
    analysis: '実用性と執着のバランス',
    strengths: ['現実的な関係', '情熱的な関係'],
    challenges: ['依存関係のリスク', '感情の起伏'],
    advice: ['健全な関係を築く', 'お互いの感情を理解する']
  },
  'Pragma-Agape': {
    score: 80,
    analysis: '実用性と無条件の愛の関係',
    strengths: ['現実的な関係', '深い理解'],
    challenges: ['情熱の表現', 'ロマンチックな要素'],
    advice: ['情熱的な要素も大切にする', 'ロマンチックな関係を築く']
  },

  // マニア（執着）の組み合わせ
  'Mania-Eros': {
    score: 85,
    analysis: '執着と情熱の関係',
    strengths: ['強い愛情表現', '情熱的な絆'],
    challenges: ['感情の起伏が激しい', '依存関係のリスク'],
    advice: ['お互いの感情を理解する', '健全な関係を築く']
  },
  'Mania-Ludus': {
    score: 60,
    analysis: '執着と遊び心の対比',
    strengths: ['刺激的な関係', '情熱的な絆'],
    challenges: ['真剣さの違い', '依存関係のリスク'],
    advice: ['お互いの感情を理解する', '健全な関係を築く']
  },
  'Mania-Storge': {
    score: 75,
    analysis: '執着と友情のバランス',
    strengths: ['深い絆', '情熱的な関係'],
    challenges: ['依存関係のリスク', '感情の起伏'],
    advice: ['健全な関係を築く', 'お互いの感情を理解する']
  },
  'Mania-Pragma': {
    score: 70,
    analysis: '執着と実用性のバランス',
    strengths: ['現実的な関係', '情熱的な関係'],
    challenges: ['依存関係のリスク', '感情の起伏'],
    advice: ['健全な関係を築く', 'お互いの感情を理解する']
  },
  'Mania-Mania': {
    score: 80,
    analysis: '執着の関係',
    strengths: ['強い愛情表現', '情熱的な絆'],
    challenges: ['感情の起伏が激しい', '依存関係のリスク'],
    advice: ['健全な関係を築く', 'お互いの感情を理解する']
  },
  'Mania-Agape': {
    score: 85,
    analysis: '執着と無条件の愛の関係',
    strengths: ['強い愛情表現', '深い理解'],
    challenges: ['依存関係のリスク', '感情の起伏'],
    advice: ['健全な関係を築く', 'お互いの感情を理解する']
  },

  // アガペ（無条件の愛）の組み合わせ
  'Agape-Eros': {
    score: 95,
    analysis: '無条件の愛と情熱の理想的な関係',
    strengths: ['無条件の愛', '深い理解', '完璧な相性'],
    challenges: ['現実的な問題への対処'],
    advice: ['理想を現実に落とし込む', '継続的な努力をする']
  },
  'Agape-Ludus': {
    score: 70,
    analysis: '無条件の愛と遊び心の対比',
    strengths: ['楽しい関係', '深い理解'],
    challenges: ['真剣さの違い', '価値観の違い'],
    advice: ['お互いの価値観を理解する', 'バランスを取る努力をする']
  },
  'Agape-Storge': {
    score: 95,
    analysis: '無条件の愛と友情の理想的な関係',
    strengths: ['深い絆', '無条件の愛', '完璧な相性'],
    challenges: ['現実的な問題への対処'],
    advice: ['理想を現実に落とし込む', '継続的な努力をする']
  },
  'Agape-Pragma': {
    score: 80,
    analysis: '無条件の愛と実用性の関係',
    strengths: ['現実的な関係', '深い理解'],
    challenges: ['情熱の表現', 'ロマンチックな要素'],
    advice: ['情熱的な要素も大切にする', 'ロマンチックな関係を築く']
  },
  'Agape-Mania': {
    score: 85,
    analysis: '無条件の愛と執着の関係',
    strengths: ['強い愛情表現', '深い理解'],
    challenges: ['依存関係のリスク', '感情の起伏'],
    advice: ['健全な関係を築く', 'お互いの感情を理解する']
  },
  'Agape-Agape': {
    score: 100,
    analysis: '無条件の愛の完璧な関係',
    strengths: ['無条件の愛', '深い理解', '完璧な相性'],
    challenges: ['現実的な問題への対処'],
    advice: ['理想を現実に落とし込む', '継続的な努力をする']
  }
}

/**
 * 恋愛スタイルの組み合わせから相性を取得
 */
export function getLoveStyleCompatibility(
  maleStyle: string,
  femaleStyle: string
): LoveStyleCompatibility {
  const key = `${maleStyle}-${femaleStyle}`
  return LOVE_STYLE_MATRIX[key] || {
    score: 70,
    analysis: '一般的な関係',
    strengths: ['基本的な相性'],
    challenges: ['相互理解の深化'],
    advice: ['コミュニケーションを大切にする']
  }
}

/**
 * 恋愛スタイルの相性スコアのみを取得（高速化）
 */
export function getLoveStyleScore(maleStyle: string, femaleStyle: string): number {
  const key = `${maleStyle}-${femaleStyle}`
  return LOVE_STYLE_MATRIX[key]?.score || 70
}
