import { Question } from '../types'

// ビッグファイブ性格理論に基づいたオリジナル質問セット
// ネットの文章を参考にせず、独自に作成した質問項目

export const bigFiveQuestions: Question[] = [
  // 開放性 (Openness) - 新しい経験への開放性
  {
    id: 'openness_1',
    text: '新しいレストランに行く時、どんな気持ちですか？',
    category: 'openness',
    weight: 3,
    options: [
      { id: 'openness_1_a', text: 'ワクワクする', value: 4, description: '新しい体験を楽しむ' },
      { id: 'openness_1_b', text: '少し不安だが行ってみる', value: 3, description: '慎重だが挑戦的' },
      { id: 'openness_1_c', text: '知っている店の方が安心', value: 2, description: '安定を好む' },
      { id: 'openness_1_d', text: '行きたくない', value: 1, description: '変化を避ける' }
    ]
  },
  {
    id: 'openness_2',
    text: '友達が「面白い映画があるよ」と誘ってきた時、どうしますか？',
    category: 'openness',
    weight: 2,
    options: [
      { id: 'openness_2_a', text: 'どんな映画か詳しく聞く', value: 4, description: '好奇心旺盛' },
      { id: 'openness_2_b', text: 'ジャンルを確認してから決める', value: 3, description: '条件付きで興味' },
      { id: 'openness_2_c', text: '好きなジャンルなら行く', value: 2, description: '限定的な興味' },
      { id: 'openness_2_d', text: '断る', value: 1, description: '新しい体験に消極的' }
    ]
  },

  // 誠実性 (Conscientiousness) - 責任感と自己規律
  {
    id: 'conscientiousness_1',
    text: '旅行の準備はいつ頃から始めますか？',
    category: 'conscientiousness',
    weight: 3,
    options: [
      { id: 'conscientiousness_1_a', text: '1ヶ月前から計画する', value: 4, description: '計画的で準備万端' },
      { id: 'conscientiousness_1_b', text: '2週間前から準備する', value: 3, description: '適度に計画的' },
      { id: 'conscientiousness_1_c', text: '1週間前から準備する', value: 2, description: 'ギリギリでも準備' },
      { id: 'conscientiousness_1_d', text: '前日や当日に準備する', value: 1, description: '行き当たりばったり' }
    ]
  },
  {
    id: 'conscientiousness_2',
    text: '約束の時間に遅れそうになった時、どうしますか？',
    category: 'conscientiousness',
    weight: 4,
    options: [
      { id: 'conscientiousness_2_a', text: '必ず連絡して謝る', value: 4, description: '責任感が強い' },
      { id: 'conscientiousness_2_b', text: '連絡して到着時間を伝える', value: 3, description: '配慮がある' },
      { id: 'conscientiousness_2_c', text: '急いで間に合わせる', value: 2, description: '努力はする' },
      { id: 'conscientiousness_2_d', text: 'そのまま行く', value: 1, description: '連絡しない' }
    ]
  },

  // 外向性 (Extraversion) - 社交性とエネルギーの方向
  {
    id: 'extraversion_1',
    text: 'パーティーで知らない人と話すことについてどう思いますか？',
    category: 'extraversion',
    weight: 3,
    options: [
      { id: 'extraversion_1_a', text: '積極的に話しかける', value: 4, description: '社交的で積極的' },
      { id: 'extraversion_1_b', text: '話しかけられたら話す', value: 3, description: '適度に社交的' },
      { id: 'extraversion_1_c', text: '知っている人とだけ話す', value: 2, description: '限定的に社交的' },
      { id: 'extraversion_1_d', text: '一人でいる方が楽', value: 1, description: '内向的' }
    ]
  },
  {
    id: 'extraversion_2',
    text: '休日の過ごし方で理想的なのは？',
    category: 'extraversion',
    weight: 2,
    options: [
      { id: 'extraversion_2_a', text: '友達とワイワイ過ごす', value: 4, description: '人との時間を重視' },
      { id: 'extraversion_2_b', text: '家族や恋人と過ごす', value: 3, description: '身近な人との時間' },
      { id: 'extraversion_2_c', text: '一人で趣味を楽しむ', value: 2, description: '個人の時間を重視' },
      { id: 'extraversion_2_d', text: '家でゆっくり過ごす', value: 1, description: '静かな時間を好む' }
    ]
  },

  // 協調性 (Agreeableness) - 他者への配慮と協力
  {
    id: 'agreeableness_1',
    text: '友達が困っている時、どうしますか？',
    category: 'agreeableness',
    weight: 4,
    options: [
      { id: 'agreeableness_1_a', text: 'すぐに手伝いに行く', value: 4, description: '思いやりが深い' },
      { id: 'agreeableness_1_b', text: '何ができるか聞いてみる', value: 3, description: '協力的' },
      { id: 'agreeableness_1_c', text: '時間がある時は手伝う', value: 2, description: '条件付きで協力' },
      { id: 'agreeableness_1_d', text: '自分で解決してほしい', value: 1, description: '独立志向' }
    ]
  },
  {
    id: 'agreeableness_2',
    text: '意見が対立した時、どうしますか？',
    category: 'agreeableness',
    weight: 3,
    options: [
      { id: 'agreeableness_2_a', text: '相手の意見を尊重する', value: 4, description: '協調性が高い' },
      { id: 'agreeableness_2_b', text: '話し合って解決する', value: 3, description: '対話を重視' },
      { id: 'agreeableness_2_c', text: '自分の意見を通す', value: 2, description: '自己主張が強い' },
      { id: 'agreeableness_2_d', text: '相手を説得しようとする', value: 1, description: '競争的' }
    ]
  },

  // 神経症傾向 (Neuroticism) - 感情の安定性
  {
    id: 'neuroticism_1',
    text: '重要な会議や試験の前日はどう過ごしますか？',
    category: 'neuroticism',
    weight: 3,
    options: [
      { id: 'neuroticism_1_a', text: '普段通り過ごす', value: 1, description: '感情が安定している' },
      { id: 'neuroticism_1_b', text: '少し緊張するが普通に過ごす', value: 2, description: '適度な緊張感' },
      { id: 'neuroticism_1_c', text: '緊張して落ち着かない', value: 3, description: '不安になりやすい' },
      { id: 'neuroticism_1_d', text: '眠れないほど心配になる', value: 4, description: '非常に不安になりやすい' }
    ]
  },
  {
    id: 'neuroticism_2',
    text: '失敗した時の気持ちは？',
    category: 'neuroticism',
    weight: 2,
    options: [
      { id: 'neuroticism_2_a', text: '次に活かそうと思う', value: 1, description: '前向きで安定' },
      { id: 'neuroticism_2_b', text: '少し落ち込むが立ち直る', value: 2, description: '適度な感情の起伏' },
      { id: 'neuroticism_2_c', text: 'しばらく落ち込む', value: 3, description: '感情の起伏が大きい' },
      { id: 'neuroticism_2_d', text: '長期間引きずる', value: 4, description: '感情が不安定' }
    ]
  },

  // 価値観の一致 (Values) - 最も重要な相性要因
  {
    id: 'values_1',
    text: '人生で最も大切にしたいことは？',
    category: 'values',
    weight: 4,
    options: [
      { id: 'values_1_a', text: '家族との時間', value: 1, description: '家族重視' },
      { id: 'values_1_b', text: '仕事での成功', value: 2, description: 'キャリア重視' },
      { id: 'values_1_c', text: '個人の成長', value: 3, description: '自己実現重視' },
      { id: 'values_1_d', text: '自由な生き方', value: 4, description: '自由重視' }
    ]
  },
  {
    id: 'values_2',
    text: 'お金の使い方で重視することは？',
    category: 'values',
    weight: 3,
    options: [
      { id: 'values_2_a', text: '将来のために貯金する', value: 1, description: '将来志向' },
      { id: 'values_2_b', text: '必要なものには使う', value: 2, description: 'バランス型' },
      { id: 'values_2_c', text: '好きなものに使う', value: 3, description: '現在志向' },
      { id: 'values_2_d', text: '思い切って使う', value: 4, description: '消費志向' }
    ]
  },

  // コミュニケーション (Communication) - 関係維持の鍵
  {
    id: 'communication_1',
    text: '気持ちを伝える時、どの方法が好きですか？',
    category: 'communication',
    weight: 4,
    options: [
      { id: 'communication_1_a', text: '直接話して伝える', value: 4, description: '直接的なコミュニケーション' },
      { id: 'communication_1_b', text: 'メールやLINEで伝える', value: 3, description: '文字でのコミュニケーション' },
      { id: 'communication_1_c', text: '行動で示す', value: 2, description: '非言語的コミュニケーション' },
      { id: 'communication_1_d', text: '伝えるのが苦手', value: 1, description: 'コミュニケーションが苦手' }
    ]
  },
  {
    id: 'communication_2',
    text: '喧嘩をした時、どう解決しますか？',
    category: 'communication',
    weight: 3,
    options: [
      { id: 'communication_2_a', text: 'すぐに話し合う', value: 4, description: '積極的な解決' },
      { id: 'communication_2_b', text: '時間を置いてから話す', value: 3, description: '冷静な解決' },
      { id: 'communication_2_c', text: '自然に解決するのを待つ', value: 2, description: '受動的な解決' },
      { id: 'communication_2_d', text: '避けて通る', value: 1, description: '問題回避' }
    ]
  }
]

export function getRandomPsychologyQuestions(count: number = 15): Question[] {
  const shuffled = [...bigFiveQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}