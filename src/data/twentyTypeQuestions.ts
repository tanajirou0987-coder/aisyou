import { Question, AppMode } from '../types'

// 20タイプシステム用の40問
const twentyTypeQuestions: Question[] = [
  // 開放性軸（10問）
  {
    id: 'open_1',
    mode: 'romance',
    text: '新しいレストランに行く時、どんな気持ちですか？',
    options: [
      { id: 'open_1_1', text: 'いつも同じお気に入りの場所を選びたい', value: 1 },
      { id: 'open_1_2', text: 'メニューを見てから決める', value: 2 },
      { id: 'open_1_3', text: '新しい味や雰囲気を試すのが好き', value: 3 },
      { id: 'open_1_4', text: '未知の体験にワクワクする', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_2',
    mode: 'romance',
    text: '旅行の計画を立てる時、どちらを重視しますか？',
    options: [
      { id: 'open_2_1', text: '安全で確実なルートを選ぶ', value: 1 },
      { id: 'open_2_2', text: 'バランスの取れた計画を立てる', value: 2 },
      { id: 'open_2_3', text: '新しい場所を積極的に探す', value: 3 },
      { id: 'open_2_4', text: '冒険的で予測不可能な旅を楽しむ', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_3',
    mode: 'romance',
    text: '新しい趣味を始めることについてどう思いますか？',
    options: [
      { id: 'open_3_1', text: '今の趣味を深める方が良い', value: 1 },
      { id: 'open_3_2', text: '興味があれば試してみる', value: 2 },
      { id: 'open_3_3', text: '定期的に新しいことに挑戦したい', value: 3 },
      { id: 'open_3_4', text: '常に新しい刺激を求めている', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_4',
    mode: 'romance',
    text: '芸術作品（絵画、音楽、映画など）を鑑賞する時、どちらを重視しますか？',
    options: [
      { id: 'open_4_1', text: '分かりやすく親しみやすい作品', value: 1 },
      { id: 'open_4_2', text: 'バランスの取れた作品', value: 2 },
      { id: 'open_4_3', text: '独創的で個性的な作品', value: 3 },
      { id: 'open_4_4', text: '前衛的で挑戦的な作品', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_5',
    mode: 'romance',
    text: '新しいアイデアや提案についてどう反応しますか？',
    options: [
      { id: 'open_5_1', text: 'まず慎重に検討する', value: 1 },
      { id: 'open_5_2', text: 'メリット・デメリットを考える', value: 2 },
      { id: 'open_5_3', text: '興味深いと思ったら積極的に取り入れる', value: 3 },
      { id: 'open_5_4', text: '新しいアイデアに常にワクワクする', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_6',
    mode: 'romance',
    text: 'パートナーとの会話で、どちらを好みますか？',
    options: [
      { id: 'open_6_1', text: '日常的な話題や実用的な話', value: 1 },
      { id: 'open_6_2', text: 'バランスの取れた会話', value: 2 },
      { id: 'open_6_3', text: '深い哲学的な話や抽象的な概念', value: 3 },
      { id: 'open_6_4', text: '革新的で未来的なアイデアの話', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_7',
    mode: 'romance',
    text: '変化に対する反応はどれですか？',
    options: [
      { id: 'open_7_1', text: '変化は最小限に抑えたい', value: 1 },
      { id: 'open_7_2', text: '必要な変化は受け入れる', value: 2 },
      { id: 'open_7_3', text: '変化を成長の機会として捉える', value: 3 },
      { id: 'open_7_4', text: '変化を積極的に求める', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_8',
    mode: 'romance',
    text: '創造的な活動についてどう思いますか？',
    options: [
      { id: 'open_8_1', text: '実用的なものを作る方が好き', value: 1 },
      { id: 'open_8_2', text: '時々創造的なことを楽しむ', value: 2 },
      { id: 'open_8_3', text: '創造的な活動を定期的に行う', value: 3 },
      { id: 'open_8_4', text: '創造性は生活の中心にある', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_9',
    mode: 'romance',
    text: '新しい人との出会いについてどう感じますか？',
    options: [
      { id: 'open_9_1', text: '知っている人と過ごす方が安心', value: 1 },
      { id: 'open_9_2', text: '自然な出会いを楽しむ', value: 2 },
      { id: 'open_9_3', text: '新しい人との出会いを積極的に求める', value: 3 },
      { id: 'open_9_4', text: '新しい人との出会いに常にワクワクする', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },
  {
    id: 'open_10',
    mode: 'romance',
    text: '将来の計画についてどう考えますか？',
    options: [
      { id: 'open_10_1', text: '確実で安全な計画を立てる', value: 1 },
      { id: 'open_10_2', text: '現実的で実現可能な計画を立てる', value: 2 },
      { id: 'open_10_3', text: '夢や理想も含めた計画を立てる', value: 3 },
      { id: 'open_10_4', text: '大胆で革新的な計画を立てる', value: 4 },
    ],
    category: '開放性',
    weight: 3,
  },

  // 外向性軸（10問）
  {
    id: 'extra_1',
    mode: 'romance',
    text: 'パーティーや集まりでの過ごし方は？',
    options: [
      { id: 'extra_1_1', text: '一人で静かに過ごす', value: 1 },
      { id: 'extra_1_2', text: '少人数で深く話す', value: 2 },
      { id: 'extra_1_3', text: '多くの人と交流する', value: 3 },
      { id: 'extra_1_4', text: '会場の中心で盛り上げる', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_2',
    mode: 'romance',
    text: 'エネルギーを回復する方法は？',
    options: [
      { id: 'extra_2_1', text: '一人の時間を過ごす', value: 1 },
      { id: 'extra_2_2', text: '静かな環境で過ごす', value: 2 },
      { id: 'extra_2_3', text: '友人と過ごす', value: 3 },
      { id: 'extra_2_4', text: '大勢の人と過ごす', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_3',
    mode: 'romance',
    text: '初対面の人との会話についてどう感じますか？',
    options: [
      { id: 'extra_3_1', text: '緊張して話しにくい', value: 1 },
      { id: 'extra_3_2', text: '相手次第で話す', value: 2 },
      { id: 'extra_3_3', text: '積極的に話しかける', value: 3 },
      { id: 'extra_3_4', text: 'すぐに打ち解けて話せる', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_4',
    mode: 'romance',
    text: 'グループでの活動についてどう感じますか？',
    options: [
      { id: 'extra_4_1', text: '一人で作業する方が好き', value: 1 },
      { id: 'extra_4_2', text: '少人数のグループが良い', value: 2 },
      { id: 'extra_4_3', text: '大きなグループも楽しめる', value: 3 },
      { id: 'extra_4_4', text: '大勢のグループが大好き', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_5',
    mode: 'romance',
    text: '意見を述べる時、どちらを好みますか？',
    options: [
      { id: 'extra_5_1', text: '聞き役に回ることが多い', value: 1 },
      { id: 'extra_5_2', text: '必要に応じて意見を述べる', value: 2 },
      { id: 'extra_5_3', text: '積極的に意見を述べる', value: 3 },
      { id: 'extra_5_4', text: '常に意見を述べたがる', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_6',
    mode: 'romance',
    text: '休日の過ごし方で好むのは？',
    options: [
      { id: 'extra_6_1', text: '家で一人で過ごす', value: 1 },
      { id: 'extra_6_2', text: '静かな場所で過ごす', value: 2 },
      { id: 'extra_6_3', text: '友人と過ごす', value: 3 },
      { id: 'extra_6_4', text: '大勢で賑やかに過ごす', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_7',
    mode: 'romance',
    text: '新しい環境での適応についてどう感じますか？',
    options: [
      { id: 'extra_7_1', text: '時間をかけてゆっくり適応する', value: 1 },
      { id: 'extra_7_2', text: '段階的に適応していく', value: 2 },
      { id: 'extra_7_3', text: '積極的に適応しようとする', value: 3 },
      { id: 'extra_7_4', text: 'すぐに新しい環境を楽しむ', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_8',
    mode: 'romance',
    text: '会話の主導権についてどう感じますか？',
    options: [
      { id: 'extra_8_1', text: '相手に任せることが多い', value: 1 },
      { id: 'extra_8_2', text: 'バランスを取って会話する', value: 2 },
      { id: 'extra_8_3', text: '積極的に会話をリードする', value: 3 },
      { id: 'extra_8_4', text: '常に会話の中心にいたい', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_9',
    mode: 'romance',
    text: '注目を浴びることについてどう感じますか？',
    options: [
      { id: 'extra_9_1', text: '注目を浴びるのは苦手', value: 1 },
      { id: 'extra_9_2', text: '時々注目を浴びるのは良い', value: 2 },
      { id: 'extra_9_3', text: '注目を浴びるのは悪くない', value: 3 },
      { id: 'extra_9_4', text: '注目を浴びるのが大好き', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },
  {
    id: 'extra_10',
    mode: 'romance',
    text: '社交的な活動についてどう感じますか？',
    options: [
      { id: 'extra_10_1', text: '最小限の社交活動で十分', value: 1 },
      { id: 'extra_10_2', text: '適度な社交活動を楽しむ', value: 2 },
      { id: 'extra_10_3', text: '積極的に社交活動に参加する', value: 3 },
      { id: 'extra_10_4', text: '社交活動が生活の中心', value: 4 },
    ],
    category: '外向性',
    weight: 3,
  },

  // 誠実性軸（10問）
  {
    id: 'cons_1',
    mode: 'romance',
    text: '旅行の準備はいつ頃から始めますか？',
    options: [
      { id: 'cons_1_1', text: '直前まで何も決めない', value: 1 },
      { id: 'cons_1_2', text: '大まかな計画だけ立てる', value: 2 },
      { id: 'cons_1_3', text: '数週間前から詳細に計画する', value: 3 },
      { id: 'cons_1_4', text: '数ヶ月前から完璧な計画を立てる', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_2',
    mode: 'romance',
    text: '約束や締切についてどう対応しますか？',
    options: [
      { id: 'cons_2_1', text: 'ギリギリになってから取り組む', value: 1 },
      { id: 'cons_2_2', text: '余裕を持って取り組む', value: 2 },
      { id: 'cons_2_3', text: '早めに完了させる', value: 3 },
      { id: 'cons_2_4', text: '常に余裕を持って完了させる', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_3',
    mode: 'romance',
    text: '目標を達成するための方法は？',
    options: [
      { id: 'cons_3_1', text: 'その場その場で対応する', value: 1 },
      { id: 'cons_3_2', text: '大まかな計画を立てる', value: 2 },
      { id: 'cons_3_3', text: '詳細な計画を立てて実行する', value: 3 },
      { id: 'cons_3_4', text: '完璧な計画を立てて確実に実行する', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_4',
    mode: 'romance',
    text: '部屋の整理整頓についてどう感じますか？',
    options: [
      { id: 'cons_4_1', text: '散らかっていても気にならない', value: 1 },
      { id: 'cons_4_2', text: '時々整理整頓する', value: 2 },
      { id: 'cons_4_3', text: '定期的に整理整頓する', value: 3 },
      { id: 'cons_4_4', text: '常に整理整頓を心がけている', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_5',
    mode: 'romance',
    text: '新しい習慣を身につけることについてどう感じますか？',
    options: [
      { id: 'cons_5_1', text: '習慣化するのは苦手', value: 1 },
      { id: 'cons_5_2', text: '簡単な習慣なら続けられる', value: 2 },
      { id: 'cons_5_3', text: '努力すれば習慣化できる', value: 3 },
      { id: 'cons_5_4', text: '習慣化するのが得意', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_6',
    mode: 'romance',
    text: '責任感についてどう感じますか？',
    options: [
      { id: 'cons_6_1', text: '責任を負うのは苦手', value: 1 },
      { id: 'cons_6_2', text: '必要な責任は果たす', value: 2 },
      { id: 'cons_6_3', text: '責任感を持って取り組む', value: 3 },
      { id: 'cons_6_4', text: '強い責任感を持っている', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_7',
    mode: 'romance',
    text: '時間管理についてどう感じますか？',
    options: [
      { id: 'cons_7_1', text: '時間管理は苦手', value: 1 },
      { id: 'cons_7_2', text: '基本的な時間管理はできる', value: 2 },
      { id: 'cons_7_3', text: '時間管理を意識している', value: 3 },
      { id: 'cons_7_4', text: '時間管理が得意', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_8',
    mode: 'romance',
    text: '完璧主義についてどう感じますか？',
    options: [
      { id: 'cons_8_1', text: '完璧を求めすぎない', value: 1 },
      { id: 'cons_8_2', text: '重要なことだけ完璧を求める', value: 2 },
      { id: 'cons_8_3', text: '多くのことに完璧を求める', value: 3 },
      { id: 'cons_8_4', text: '常に完璧を求める', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_9',
    mode: 'romance',
    text: '自己規律についてどう感じますか？',
    options: [
      { id: 'cons_9_1', text: '自己規律を保つのは苦手', value: 1 },
      { id: 'cons_9_2', text: '基本的な自己規律は保てる', value: 2 },
      { id: 'cons_9_3', text: '自己規律を意識している', value: 3 },
      { id: 'cons_9_4', text: '強い自己規律を持っている', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },
  {
    id: 'cons_10',
    mode: 'romance',
    text: '長期的な目標についてどう感じますか？',
    options: [
      { id: 'cons_10_1', text: '短期的な目標の方が好き', value: 1 },
      { id: 'cons_10_2', text: '中期的な目標を立てる', value: 2 },
      { id: 'cons_10_3', text: '長期的な目標を意識している', value: 3 },
      { id: 'cons_10_4', text: '長期的な目標を重視している', value: 4 },
    ],
    category: '誠実性',
    weight: 3,
  },

  // 協調性軸（8問）
  {
    id: 'agree_1',
    mode: 'romance',
    text: '友達が困っている時、どうしますか？',
    options: [
      { id: 'agree_1_1', text: '自分には関係ないと思う', value: 1 },
      { id: 'agree_1_2', text: '話を聞くくらいならできる', value: 2 },
      { id: 'agree_1_3', text: 'できる範囲で手助けする', value: 3 },
      { id: 'agree_1_4', text: '全力でサポートしたい', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },
  {
    id: 'agree_2',
    mode: 'romance',
    text: '意見の対立があった時、どう対応しますか？',
    options: [
      { id: 'agree_2_1', text: '自分の意見を押し通す', value: 1 },
      { id: 'agree_2_2', text: '相手の意見も聞く', value: 2 },
      { id: 'agree_2_3', text: '話し合って解決策を探す', value: 3 },
      { id: 'agree_2_4', text: '相手の意見を尊重する', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },
  {
    id: 'agree_3',
    mode: 'romance',
    text: '他人の感情を理解することについてどう感じますか？',
    options: [
      { id: 'agree_3_1', text: '他人の感情は分からない', value: 1 },
      { id: 'agree_3_2', text: '時々他人の感情が分かる', value: 2 },
      { id: 'agree_3_3', text: '他人の感情を理解しようとする', value: 3 },
      { id: 'agree_3_4', text: '他人の感情を敏感に感じ取る', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },
  {
    id: 'agree_4',
    mode: 'romance',
    text: '協力することについてどう感じますか？',
    options: [
      { id: 'agree_4_1', text: '一人で作業する方が好き', value: 1 },
      { id: 'agree_4_2', text: '必要に応じて協力する', value: 2 },
      { id: 'agree_4_3', text: '積極的に協力する', value: 3 },
      { id: 'agree_4_4', text: '協力を重視している', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },
  {
    id: 'agree_5',
    mode: 'romance',
    text: '他人を信頼することについてどう感じますか？',
    options: [
      { id: 'agree_5_1', text: '他人を信頼するのは難しい', value: 1 },
      { id: 'agree_5_2', text: '信頼できる人だけを信頼する', value: 2 },
      { id: 'agree_5_3', text: '基本的に他人を信頼する', value: 3 },
      { id: 'agree_5_4', text: '他人を信頼するのが自然', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },
  {
    id: 'agree_6',
    mode: 'romance',
    text: '他人を助けることについてどう感じますか？',
    options: [
      { id: 'agree_6_1', text: '他人を助けるのは面倒', value: 1 },
      { id: 'agree_6_2', text: '必要な時だけ助ける', value: 2 },
      { id: 'agree_6_3', text: '積極的に他人を助ける', value: 3 },
      { id: 'agree_6_4', text: '他人を助けるのが好き', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },
  {
    id: 'agree_7',
    mode: 'romance',
    text: '謙虚さについてどう感じますか？',
    options: [
      { id: 'agree_7_1', text: '自分の能力をアピールしたい', value: 1 },
      { id: 'agree_7_2', text: '適度に謙虚でいる', value: 2 },
      { id: 'agree_7_3', text: '謙虚さを重視している', value: 3 },
      { id: 'agree_7_4', text: '常に謙虚でいたい', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },
  {
    id: 'agree_8',
    mode: 'romance',
    text: '他人の成功についてどう感じますか？',
    options: [
      { id: 'agree_8_1', text: '他人の成功は気にならない', value: 1 },
      { id: 'agree_8_2', text: '他人の成功を客観視する', value: 2 },
      { id: 'agree_8_3', text: '他人の成功を素直に喜ぶ', value: 3 },
      { id: 'agree_8_4', text: '他人の成功を心から祝福する', value: 4 },
    ],
    category: '協調性',
    weight: 3,
  },

  // 神経症傾向軸（2問）
  {
    id: 'neuro_1',
    mode: 'romance',
    text: '重要な会議や試験の前日はどう過ごしますか？',
    options: [
      { id: 'neuro_1_1', text: '特に何も気にせず過ごす', value: 1 },
      { id: 'neuro_1_2', text: '少し緊張するが、普段通り', value: 2 },
      { id: 'neuro_1_3', text: '不安でなかなか眠れない', value: 3 },
      { id: 'neuro_1_4', text: 'ストレスで体調を崩しやすい', value: 4 },
    ],
    category: '神経症傾向',
    weight: 3,
  },
  {
    id: 'neuro_2',
    mode: 'romance',
    text: 'ストレスを感じた時の対処法は？',
    options: [
      { id: 'neuro_2_1', text: '冷静に対処できる', value: 1 },
      { id: 'neuro_2_2', text: '時間をかけて対処する', value: 2 },
      { id: 'neuro_2_3', text: 'ストレスを感じやすい', value: 3 },
      { id: 'neuro_2_4', text: 'ストレスでパニックになりやすい', value: 4 },
    ],
    category: '神経症傾向',
    weight: 3,
  },
]

// 友達モード用の質問（一部変更）
const friendshipQuestions = twentyTypeQuestions.map(q => ({
  ...q,
  mode: 'friendship' as AppMode,
  text: q.text.replace('パートナー', '友達').replace('恋愛', '友情')
}))

// 全質問を結合
export const allTwentyTypeQuestions: Question[] = [
  ...twentyTypeQuestions,
  ...friendshipQuestions
]

// 40問を取得する関数
export function getTwentyTypeQuestions(mode: AppMode): Question[] {
  return allTwentyTypeQuestions.filter(q => q.mode === mode).slice(0, 40)
}

// ランダムに40問を取得する関数
export function getRandomTwentyTypeQuestions(mode: AppMode): Question[] {
  const modeQuestions = allTwentyTypeQuestions.filter(q => q.mode === mode)
  const shuffled = [...modeQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 40)
}







