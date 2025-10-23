/**
 * ジョン・リーのラブスタイル類型論に基づく20タイプ分類
 * 
 * 基本6タイプ：
 * - Eros（エロス）: 情熱的・ロマンティック
 * - Ludus（ルダス）: 遊び心・自由
 * - Storge（ストルゲ）: 友情ベース・安定
 * - Pragma（プラグマ）: 現実的・計画的
 * - Mania（マニア）: 依存的・情熱的
 * - Agape（アガペ）: 献身的・無償の愛
 * 
 * 20タイプ構成：
 * - 純粋型：6タイプ（各基本タイプの純粋型）
 * - 複合型：13タイプ（主要×副次の組み合わせ）
 * - バランス型：1タイプ（全タイプが均等）
 */

export interface LoveStyleType {
  id: string
  name: string
  mainStyle: string
  subStyle: string | null
  description: string
  characteristics: string[]
  strengths: string[]
  challenges: string[]
}

// 男性用20タイプ定義
export const maleTypes: LoveStyleType[] = [
  // 純粋型（6タイプ）
  {
    id: 'M-01',
    name: '情熱的ロマンティスト',
    mainStyle: 'eros',
    subStyle: null,
    description: '一目惚れタイプ。外見や雰囲気に強く惹かれ、ロマンティックな関係を求める。理想の恋愛像を追求する。',
    characteristics: ['一目惚れしやすい', 'ロマンティック', '外見重視', '理想追求型'],
    strengths: ['情熱的なアプローチ', '特別な体験を提供', 'ロマンスを大切にする'],
    challenges: ['理想と現実のギャップ', '熱が冷めやすい', '外見にこだわりすぎる']
  },
  {
    id: 'M-02',
    name: '自由奔放プレイヤー',
    mainStyle: 'ludus',
    subStyle: null,
    description: '恋愛を楽しむタイプ。束縛を嫌い、自由な関係を好む。ゲーム感覚で恋愛を楽しむ。',
    characteristics: ['束縛を嫌う', '遊び心がある', '自由志向', '刺激を求める'],
    strengths: ['楽しい時間を提供', 'プレッシャーをかけない', '新鮮な関係を保つ'],
    challenges: ['コミットメントの欠如', '浮気の可能性', '真剣さに欠ける']
  },
  {
    id: 'M-03',
    name: '友情発展型パートナー',
    mainStyle: 'storge',
    subStyle: null,
    description: '友達から恋人へ発展するタイプ。時間をかけてゆっくり関係を築く。穏やかで安定した愛を求める。',
    characteristics: ['友情ベース', 'ゆっくり発展', '安定志向', '穏やか'],
    strengths: ['深い信頼関係', '安定した関係', '居心地の良さ'],
    challenges: ['発展が遅い', 'ドキドキ感の不足', '刺激に欠ける']
  },
  {
    id: 'M-04',
    name: '現実的プランナー',
    mainStyle: 'pragma',
    subStyle: null,
    description: '条件を重視するタイプ。将来を見据えて計画的に関係を進める。現実的な視点で相手を選ぶ。',
    characteristics: ['条件重視', '計画的', '現実的', '長期視点'],
    strengths: ['安定した将来設計', '現実的なサポート', '計画的な関係構築'],
    challenges: ['感情の欠如', '打算的に見える', 'ロマンスの不足']
  },
  {
    id: 'M-05',
    name: '情熱的依存型',
    mainStyle: 'mania',
    subStyle: null,
    description: '夢中になるタイプ。相手に依存しやすく、嫉妬深い。感情の起伏が激しい情熱的な愛。',
    characteristics: ['依存的', '嫉妬深い', '感情起伏が激しい', '夢中になる'],
    strengths: ['強い愛情表現', '一途', '相手を大切にする'],
    challenges: ['束縛が強い', '感情の不安定さ', '依存による負担']
  },
  {
    id: 'M-06',
    name: '献身的サポーター',
    mainStyle: 'agape',
    subStyle: null,
    description: '無償の愛を捧げるタイプ。相手の幸せを最優先し、自己犠牲も厭わない。見返りを求めない献身的な愛。',
    characteristics: ['献身的', '自己犠牲的', '相手優先', '無償の愛'],
    strengths: ['深い愛情', '相手を支える', '見返りを求めない'],
    challenges: ['自分を犠牲にしすぎる', '相手に依存させる', 'バランスの欠如']
  },

  // 複合型（13タイプ）
  {
    id: 'M-07',
    name: '情熱的冒険家',
    mainStyle: 'eros',
    subStyle: 'ludus',
    description: 'ロマンティックで遊び心もあるタイプ。情熱的でありながら、自由も大切にする。刺激的な恋愛を楽しむ。',
    characteristics: ['情熱的', '遊び心', '刺激的', 'ロマンティック'],
    strengths: ['ドキドキする関係', '楽しい時間', '自由な雰囲気'],
    challenges: ['コミットメントの難しさ', '一貫性の欠如', '長期的視点の不足']
  },
  {
    id: 'M-08',
    name: '理想追求型依存',
    mainStyle: 'eros',
    subStyle: 'mania',
    description: '理想の愛を強く追求し、夢中になるタイプ。情熱的で一途だが、依存的になりやすい。',
    characteristics: ['理想追求', '一途', '夢中', '依存的'],
    strengths: ['強い愛情', 'ロマンティック', '一生懸命'],
    challenges: ['理想と現実のギャップ', '依存的', '嫉妬深い']
  },
  {
    id: 'M-09',
    name: '情熱的献身家',
    mainStyle: 'eros',
    subStyle: 'agape',
    description: 'ロマンティックで献身的なタイプ。情熱的に相手を愛し、尽くす。理想の愛を体現しようとする。',
    characteristics: ['ロマンティック', '献身的', '情熱的', '尽くす'],
    strengths: ['深い愛情', 'ロマンス', '相手を大切にする'],
    challenges: ['期待が高すぎる', '自己犠牲的', 'バランスの欠如']
  },
  {
    id: 'M-10',
    name: '自由な友人型',
    mainStyle: 'ludus',
    subStyle: 'storge',
    description: '友達のような関係を楽しむタイプ。束縛せず、自由で居心地の良い関係を築く。',
    characteristics: ['自由', '友達感覚', '気楽', '居心地良い'],
    strengths: ['プレッシャーなし', '楽しい関係', '自然体'],
    challenges: ['真剣さの欠如', '発展性の不足', 'コミットメント不足']
  },
  {
    id: 'M-11',
    name: '計算する遊び人',
    mainStyle: 'ludus',
    subStyle: 'pragma',
    description: '現実的でありながら自由も楽しむタイプ。条件は考えつつ、束縛はしない。戦略的な恋愛。',
    characteristics: ['戦略的', '自由', '現実的', '束縛しない'],
    strengths: ['バランス感覚', '現実的判断', 'プレッシャーなし'],
    challenges: ['打算的', '感情の欠如', '真剣さに欠ける']
  },
  {
    id: 'M-12',
    name: '安定志向の友人型',
    mainStyle: 'storge',
    subStyle: 'pragma',
    description: '友情ベースで現実的なタイプ。時間をかけて関係を築き、将来を見据える。安定した関係を重視。',
    characteristics: ['安定志向', '現実的', '友情ベース', '計画的'],
    strengths: ['安定した関係', '現実的サポート', '深い信頼'],
    challenges: ['ドキドキ感不足', '発展が遅い', 'ロマンス不足']
  },
  {
    id: 'M-13',
    name: '穏やかな献身家',
    mainStyle: 'storge',
    subStyle: 'agape',
    description: '友情から始まり献身的に尽くすタイプ。穏やかで安定した愛情を注ぐ。長期的な関係を大切にする。',
    characteristics: ['穏やか', '献身的', '安定', '尽くす'],
    strengths: ['深い愛情', '安定した関係', '支え合い'],
    challenges: ['刺激不足', '自己犠牲的', 'ドキドキ感不足']
  },
  {
    id: 'M-14',
    name: '計画的献身型',
    mainStyle: 'pragma',
    subStyle: 'agape',
    description: '現実的でありながら献身的なタイプ。将来を見据えつつ、相手に尽くす。バランスの取れた愛。',
    characteristics: ['現実的', '献身的', '計画的', 'バランス型'],
    strengths: ['安定と愛情の両立', '現実的サポート', '長期的視点'],
    challenges: ['感情表現の不足', '計算的に見える', 'ロマンス不足']
  },
  {
    id: 'M-15',
    name: '情熱的計画家',
    mainStyle: 'pragma',
    subStyle: 'eros',
    description: '現実的でありながらロマンティックなタイプ。条件を考えつつも、理想の愛を求める。',
    characteristics: ['現実的', 'ロマンティック', '計画的', '理想追求'],
    strengths: ['バランス感覚', '現実的ロマンス', '計画性'],
    challenges: ['矛盾する価値観', '優先順位の混乱', '中途半端']
  },
  {
    id: 'M-16',
    name: '依存的献身型',
    mainStyle: 'mania',
    subStyle: 'agape',
    description: '夢中になり献身的に尽くすタイプ。相手に依存しながらも、無償の愛を捧げる。情熱的な献身。',
    characteristics: ['夢中', '献身的', '依存的', '一途'],
    strengths: ['強い愛情', '一生懸命尽くす', '一途'],
    challenges: ['依存的', '自己犠牲的', 'バランス欠如']
  },
  {
    id: 'M-17',
    name: '不安定な情熱家',
    mainStyle: 'mania',
    subStyle: 'eros',
    description: '情熱的で依存的なタイプ。理想の愛を追求し、夢中になる。感情の起伏が激しい恋愛。',
    characteristics: ['情熱的', '依存的', '理想追求', '感情起伏激しい'],
    strengths: ['強い愛情', 'ロマンティック', '一途'],
    challenges: ['感情不安定', '依存的', '嫉妬深い']
  },
  {
    id: 'M-18',
    name: '献身的理想家',
    mainStyle: 'agape',
    subStyle: 'eros',
    description: '献身的でロマンティックなタイプ。理想の愛を体現し、無償の愛を捧げる。相手を大切にする。',
    characteristics: ['献身的', 'ロマンティック', '理想追求', '無償の愛'],
    strengths: ['深い愛情', 'ロマンス', '相手を大切にする'],
    challenges: ['自己犠牲的', '期待が高い', 'バランス欠如']
  },
  {
    id: 'M-19',
    name: '支える友人型',
    mainStyle: 'agape',
    subStyle: 'storge',
    description: '友情ベースで献身的なタイプ。時間をかけて信頼を築き、相手を支える。穏やかで深い愛情。',
    characteristics: ['献身的', '友情ベース', '穏やか', '支える'],
    strengths: ['深い信頼', '安定した愛情', '支え合い'],
    challenges: ['ドキドキ感不足', '自己犠牲的', '刺激不足']
  },

  // バランス型（1タイプ）
  {
    id: 'M-20',
    name: '調和型オールラウンダー',
    mainStyle: 'balanced',
    subStyle: null,
    description: '全てのタイプがバランスよく混在するタイプ。状況に応じて柔軟に対応できる。偏りのない恋愛観。',
    characteristics: ['バランス型', '柔軟', '適応力', '偏りなし'],
    strengths: ['柔軟な対応', 'バランス感覚', '適応力'],
    challenges: ['特徴の不明確さ', '一貫性の欠如', '中途半端']
  }
]

// 女性用20タイプ定義
export const femaleTypes: LoveStyleType[] = [
  // 純粋型（6タイプ）
  {
    id: 'F-01',
    name: 'ロマンティックプリンセス',
    mainStyle: 'eros',
    subStyle: null,
    description: '理想のロマンスを追求するタイプ。一目惚れしやすく、外見や雰囲気に惹かれる。ドラマティックな恋愛を好む。',
    characteristics: ['ロマンティック', '一目惚れ', '理想追求', '外見重視'],
    strengths: ['情熱的', 'ロマンスを大切にする', '特別な体験を求める'],
    challenges: ['理想が高すぎる', '現実とのギャップ', '熱が冷めやすい']
  },
  {
    id: 'F-02',
    name: '自由奔放な女性',
    mainStyle: 'ludus',
    subStyle: null,
    description: '恋愛を楽しむタイプ。束縛を嫌い、自由な関係を好む。軽やかに恋愛を楽しむ。',
    characteristics: ['自由志向', '束縛を嫌う', '楽しむ', '刺激的'],
    strengths: ['楽しい雰囲気', 'プレッシャーなし', '自由'],
    challenges: ['コミットメント不足', '真剣さに欠ける', '浮気の可能性']
  },
  {
    id: 'F-03',
    name: '友達から恋人タイプ',
    mainStyle: 'storge',
    subStyle: null,
    description: '友達から恋愛に発展するタイプ。時間をかけてゆっくり関係を築く。穏やかで安定した愛。',
    characteristics: ['友情ベース', 'ゆっくり発展', '安定志向', '穏やか'],
    strengths: ['深い信頼', '安定した関係', '居心地の良さ'],
    challenges: ['発展が遅い', 'ドキドキ感不足', '刺激に欠ける']
  },
  {
    id: 'F-04',
    name: '現実的プランナー',
    mainStyle: 'pragma',
    subStyle: null,
    description: '条件を重視し、計画的に関係を進めるタイプ。将来を見据えて相手を選ぶ。現実的な視点。',
    characteristics: ['条件重視', '計画的', '現実的', '長期視点'],
    strengths: ['安定した将来', '現実的判断', '計画性'],
    challenges: ['打算的に見える', '感情の欠如', 'ロマンス不足']
  },
  {
    id: 'F-05',
    name: '情熱的依存型',
    mainStyle: 'mania',
    subStyle: null,
    description: '夢中になり依存するタイプ。嫉妬深く、感情の起伏が激しい。一途で情熱的な愛。',
    characteristics: ['依存的', '嫉妬深い', '感情起伏激しい', '夢中'],
    strengths: ['一途', '強い愛情', '相手を大切にする'],
    challenges: ['束縛が強い', '感情不安定', '依存的']
  },
  {
    id: 'F-06',
    name: '献身的サポーター',
    mainStyle: 'agape',
    subStyle: null,
    description: '無償の愛を捧げるタイプ。相手の幸せを最優先し、自己犠牲も厭わない。見返りを求めない。',
    characteristics: ['献身的', '自己犠牲的', '相手優先', '無償の愛'],
    strengths: ['深い愛情', '支える', '見返りを求めない'],
    challenges: ['自己犠牲的', '相手に依存させる', 'バランス欠如']
  },

  // 複合型（13タイプ）
  {
    id: 'F-07',
    name: 'ロマンティック冒険家',
    mainStyle: 'eros',
    subStyle: 'ludus',
    description: 'ロマンティックで自由も大切にするタイプ。情熱的でありながら、束縛を嫌う。刺激的な恋愛。',
    characteristics: ['ロマンティック', '自由', '刺激的', '遊び心'],
    strengths: ['ドキドキする関係', '楽しい', '自由な雰囲気'],
    challenges: ['コミットメント難', '一貫性欠如', '長期視点不足']
  },
  {
    id: 'F-08',
    name: '理想追求型依存',
    mainStyle: 'eros',
    subStyle: 'mania',
    description: '理想の愛を追求し夢中になるタイプ。情熱的で一途だが、依存的になりやすい。',
    characteristics: ['理想追求', '一途', '夢中', '依存的'],
    strengths: ['強い愛情', 'ロマンティック', '一生懸命'],
    challenges: ['理想とのギャップ', '依存的', '嫉妬深い']
  },
  {
    id: 'F-09',
    name: 'ロマンティック献身家',
    mainStyle: 'eros',
    subStyle: 'agape',
    description: 'ロマンティックで献身的なタイプ。情熱的に愛し、尽くす。理想の愛を体現しようとする。',
    characteristics: ['ロマンティック', '献身的', '情熱的', '尽くす'],
    strengths: ['深い愛情', 'ロマンス', '相手を大切にする'],
    challenges: ['期待が高い', '自己犠牲的', 'バランス欠如']
  },
  {
    id: 'F-10',
    name: '自由な友達型',
    mainStyle: 'ludus',
    subStyle: 'storge',
    description: '友達感覚で自由に楽しむタイプ。束縛せず、居心地の良い関係を築く。',
    characteristics: ['自由', '友達感覚', '気楽', '居心地良い'],
    strengths: ['プレッシャーなし', '楽しい', '自然体'],
    challenges: ['真剣さ欠如', '発展性不足', 'コミットメント不足']
  },
  {
    id: 'F-11',
    name: '戦略的な自由人',
    mainStyle: 'ludus',
    subStyle: 'pragma',
    description: '現実的でありながら自由も楽しむタイプ。条件は考えつつ、束縛はしない。',
    characteristics: ['戦略的', '自由', '現実的', '束縛しない'],
    strengths: ['バランス感覚', '現実的判断', 'プレッシャーなし'],
    challenges: ['打算的', '感情欠如', '真剣さ欠如']
  },
  {
    id: 'F-12',
    name: '堅実な友達型',
    mainStyle: 'storge',
    subStyle: 'pragma',
    description: '友情ベースで現実的なタイプ。時間をかけて関係を築き、将来を見据える。',
    characteristics: ['安定志向', '現実的', '友情ベース', '計画的'],
    strengths: ['安定した関係', '現実的サポート', '深い信頼'],
    challenges: ['ドキドキ感不足', '発展が遅い', 'ロマンス不足']
  },
  {
    id: 'F-13',
    name: '穏やかな献身家',
    mainStyle: 'storge',
    subStyle: 'agape',
    description: '友情から始まり献身的に尽くすタイプ。穏やかで安定した愛情を注ぐ。',
    characteristics: ['穏やか', '献身的', '安定', '尽くす'],
    strengths: ['深い愛情', '安定した関係', '支え合い'],
    challenges: ['刺激不足', '自己犠牲的', 'ドキドキ感不足']
  },
  {
    id: 'F-14',
    name: '現実的献身型',
    mainStyle: 'pragma',
    subStyle: 'agape',
    description: '現実的でありながら献身的なタイプ。将来を見据えつつ、相手に尽くす。',
    characteristics: ['現実的', '献身的', '計画的', 'バランス型'],
    strengths: ['安定と愛情の両立', '現実的サポート', '長期視点'],
    challenges: ['感情表現不足', '計算的に見える', 'ロマンス不足']
  },
  {
    id: 'F-15',
    name: 'ロマンティック現実家',
    mainStyle: 'pragma',
    subStyle: 'eros',
    description: '現実的でありながらロマンティックなタイプ。条件を考えつつも、理想の愛を求める。',
    characteristics: ['現実的', 'ロマンティック', '計画的', '理想追求'],
    strengths: ['バランス感覚', '現実的ロマンス', '計画性'],
    challenges: ['矛盾する価値観', '優先順位混乱', '中途半端']
  },
  {
    id: 'F-16',
    name: '依存的献身型',
    mainStyle: 'mania',
    subStyle: 'agape',
    description: '夢中になり献身的に尽くすタイプ。依存しながらも、無償の愛を捧げる。',
    characteristics: ['夢中', '献身的', '依存的', '一途'],
    strengths: ['強い愛情', '尽くす', '一途'],
    challenges: ['依存的', '自己犠牲的', 'バランス欠如']
  },
  {
    id: 'F-17',
    name: '情熱的依存家',
    mainStyle: 'mania',
    subStyle: 'eros',
    description: '情熱的で依存的なタイプ。理想の愛を追求し、夢中になる。感情起伏が激しい。',
    characteristics: ['情熱的', '依存的', '理想追求', '感情起伏激しい'],
    strengths: ['強い愛情', 'ロマンティック', '一途'],
    challenges: ['感情不安定', '依存的', '嫉妬深い']
  },
  {
    id: 'F-18',
    name: '献身的ロマンティスト',
    mainStyle: 'agape',
    subStyle: 'eros',
    description: '献身的でロマンティックなタイプ。理想の愛を体現し、無償の愛を捧げる。',
    characteristics: ['献身的', 'ロマンティック', '理想追求', '無償の愛'],
    strengths: ['深い愛情', 'ロマンス', '相手を大切にする'],
    challenges: ['自己犠牲的', '期待が高い', 'バランス欠如']
  },
  {
    id: 'F-19',
    name: '支える友達型',
    mainStyle: 'agape',
    subStyle: 'storge',
    description: '友情ベースで献身的なタイプ。時間をかけて信頼を築き、相手を支える。',
    characteristics: ['献身的', '友情ベース', '穏やか', '支える'],
    strengths: ['深い信頼', '安定した愛情', '支え合い'],
    challenges: ['ドキドキ感不足', '自己犠牲的', '刺激不足']
  },

  // バランス型（1タイプ）
  {
    id: 'F-20',
    name: '調和型オールラウンダー',
    mainStyle: 'balanced',
    subStyle: null,
    description: '全てのタイプがバランスよく混在するタイプ。状況に応じて柔軟に対応できる。',
    characteristics: ['バランス型', '柔軟', '適応力', '偏りなし'],
    strengths: ['柔軟な対応', 'バランス感覚', '適応力'],
    challenges: ['特徴不明確', '一貫性欠如', '中途半端']
  }
]

/**
 * タイプIDから詳細情報を取得
 */
export function getTypeById(typeId: string): LoveStyleType | undefined {
  if (typeId.startsWith('M-')) {
    return maleTypes.find(t => t.id === typeId)
  } else if (typeId.startsWith('F-')) {
    return femaleTypes.find(t => t.id === typeId)
  }
  return undefined
}



















