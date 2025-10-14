// 動的に相性解説文を生成するユーティリティ関数
// 科学的根拠に基づき、カジュアルでフレンドリーな口調で400-500文字程度の解説を生成

/**
 * 二人の酒癖タイプと相性スコアから、相性解説文を動的に生成
 * @param type1 - 一人目の酒癖タイプ
 * @param type2 - 二人目の酒癖タイプ
 * @param score - 相性スコア（0-100）
 * @param name1 - 一人目の名前
 * @param name2 - 二人目の名前
 * @returns 相性解説文（400-500文字程度）
 */
export function generateCompatibilityText(
  type1: string,
  type2: string,
  score: number,
  name1: string,
  name2: string
): string {
  // 相性度のランキング計算（1000組中の順位）
  const rankPosition = Math.max(1, Math.min(1000, Math.floor((100 - score) * 10)))
  
  // スコアレベルの判定
  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: 'exceptional', phrase: '奇跡的な' }
    if (score >= 80) return { level: 'excellent', phrase: '素晴らしい' }
    if (score >= 70) return { level: 'good', phrase: '良好な' }
    if (score >= 60) return { level: 'moderate', phrase: 'まずまずの' }
    if (score >= 50) return { level: 'fair', phrase: 'そこそこの' }
    if (score >= 40) return { level: 'poor', phrase: '微妙な' }
    return { level: 'bad', phrase: '厳しい' }
  }
  
  const scoreInfo = getScoreLevel(score)
  
  // タイプの組み合わせごとの科学的解説を生成
  const typeAnalysis = getTypeAnalysis(type1, type2)
  
  // 文章の構成要素
  const opening = generateOpening(score, rankPosition, name1, name2)
  const compatibility = generateCompatibilityReason(type1, type2, typeAnalysis, scoreInfo.level)
  const relationship = generateRelationshipFeature(type1, type2, typeAnalysis, scoreInfo.level)
  const growth = generateGrowthEffect(type1, type2, scoreInfo.level)
  const caution = generateCaution(type1, type2, scoreInfo.level)
  const closing = generateClosing(score, scoreInfo.level)
  
  // フラットな文章として結合
  return `${opening}${compatibility}${relationship}${growth}${caution}${closing}`
}

// 冒頭：相性度の発表（1-2文）
function generateOpening(score: number, rankPosition: number, name1: string, name2: string): string {
  if (score >= 70) {
    const goodOpenings = [
      `おめでとう！${name1}と${name2}の二人の相性は${score}点だよ。1000組中、上位${rankPosition}組に入る相性の良さなんだ。`,
      `すごいね！二人の相性は${score}点だよ。これは1000組のカップルの中でも上位${rankPosition}位に入る、かなり良い組み合わせなんだ。`,
      `いいじゃん！${name1}と${name2}の相性スコアは${score}点だ。1000組中、上位${rankPosition}組に入る、なかなかの相性だよ。`,
      `これはいい感じだね！二人の相性は${score}点。1000組中${rankPosition}位以内に入る、科学的にも実証された相性の良さなんだ。`
    ]
    return goodOpenings[Math.floor(Math.random() * goodOpenings.length)]
  } else if (score >= 50) {
    const moderateOpenings = [
      `${name1}と${name2}の相性スコアは${score}点だね。1000組中、${rankPosition}組目くらいの位置で、まあまあってとこかな。`,
      `二人の相性は${score}点だよ。1000組中${rankPosition}位くらいで、悪くはないけど特別良いわけでもない、そんな感じだね。`,
      `${name1}と${name2}の相性は${score}点か。1000組中${rankPosition}組目で、普通くらいの相性だね。`
    ]
    return moderateOpenings[Math.floor(Math.random() * moderateOpenings.length)]
  } else if (score >= 30) {
    const poorOpenings = [
      `正直に言うね。${name1}と${name2}の相性は${score}点だ。1000組中${rankPosition}組目で、あんまり良い組み合わせとは言えないかも。`,
      `うーん、二人の相性スコアは${score}点だね。1000組中${rankPosition}位で、相性は微妙なラインだよ。`,
      `${name1}と${name2}の相性は${score}点か。1000組中${rankPosition}組目で、正直言って相性はあまり良くないね。`
    ]
    return poorOpenings[Math.floor(Math.random() * poorOpenings.length)]
  } else {
    const badOpenings = [
      `これは...ちょっと厳しいな。${name1}と${name2}の相性は${score}点だよ。1000組中${rankPosition}組目で、かなり相性が悪い組み合わせなんだ。`,
      `正直に言わせてもらうと、二人の相性は${score}点。1000組中${rankPosition}位で、一緒に飲むのは避けた方がいいかもしれない相性だね。`,
      `${name1}と${name2}の相性スコアは${score}点...。1000組中${rankPosition}組目で、残念ながらかなり相性が悪いんだ。`
    ]
    return badOpenings[Math.floor(Math.random() * badOpenings.length)]
  }
}

// 相性の理由の説明（3-4文）
function generateCompatibilityReason(type1: string, type2: string, analysis: TypeAnalysis, scoreLevel: string): string {
  if (scoreLevel === 'poor' || scoreLevel === 'bad') {
    const badReasons: { [key: string]: string } = {
      'dopamine_sync': '二人の酒癖タイプが合わなくて、ドーパミン分泌のタイミングがズレちゃうんだ。片方がハイテンションな時に、もう片方が冷めてる、そんなすれ違いが起きやすいんだよね。',
      'gaba_balance': 'GABA受容体の活性化パターンが噛み合わなくて、リラックスしたい時に相手が盛り上がってたり、逆も然りで、お互いのペースが合わないんだ。',
      'inhibition_release': '前頭前野の抑制解除効果の度合いが全然違って、片方が理性的に話してる時に、もう片方が感情的になったりして、会話がかみ合わないことが多いんだ。',
      'serotonin_harmony': 'セロトニン系の活性化パターンが不調和で、一緒にいても落ち着かない、どこか居心地の悪さを感じる関係性になりやすいんだよね。',
      'dynamic_balance': '酒癖のタイプが真逆すぎて、お互いのテンションの波が全く合わないんだ。片方が楽しんでる時に、もう片方がしらけちゃう、そんな悪循環に陥りやすいんだよ。'
    }
    return badReasons[analysis.reasonType] || badReasons['dynamic_balance']
  } else {
    const goodReasons: { [key: string]: string } = {
      'dopamine_sync': 'お酒を飲んだ時のドーパミン分泌のタイミングがピッタリ合うんだ。二人とも同じくらいのテンションで盛り上がれるから、一緒にいて楽しいよね。',
      'gaba_balance': 'GABA受容体の活性化バランスが理想的で、一人がリラックスしてる時にもう一人が盛り上げる、ちょうどいい関係性が築けるんだ。',
      'inhibition_release': '前頭前野の抑制解除効果が補完的に働いて、お互いの本音を引き出し合える関係になれるんだよ。',
      'serotonin_harmony': 'セロトニン系の活性化パターンが調和的で、一緒にいると自然と心が落ち着く、安心感のある関係性が作れるんだ。',
      'dynamic_balance': 'お酒によるテンションの上下が絶妙に補い合って、一人が暴走しそうな時にもう一人がブレーキになる、理想的なバランス型だよ。'
    }
    return goodReasons[analysis.reasonType] || goodReasons['dynamic_balance']
  }
}

// 二人の関係性の特徴（3-4文）
function generateRelationshipFeature(type1: string, type2: string, analysis: TypeAnalysis, scoreLevel: string): string {
  if (scoreLevel === 'poor' || scoreLevel === 'bad') {
    const badFeatures: { [key: string]: string } = {
      'mutual_enhancement': '二人で飲むと、お互いのマイナス面が目立っちゃうんだよね。片方が話してる時に、もう片方が興味なさげにしてたり、どこか噛み合わない空気が流れるんだ。飲み会でも周りから「あの二人大丈夫？」って心配されるかも。',
      'complementary': 'タイプが違いすぎて、補い合うどころか衝突しやすいんだ。お互いの価値観が合わなくて、一緒にいるとストレスが溜まる、そんな関係性になりがちだよ。',
      'synchronized': '二人のリズムが全く合わないんだよね。片方が盛り上がってる時に、もう片方はもう帰りたいとか、タイミングが全部ズレるんだ。一緒にいても無理してる感じが出ちゃって、長時間は正直キツイよ。',
      'growth_oriented': '一緒に飲んでも、お互いに良い影響を与え合えない関係性なんだ。相手の話が全然響かなかったり、価値観の違いでイライラしたり、成長どころか疲れちゃうんだよね。',
      'stable_fun': '安定感もなければ楽しさもない、残念な組み合わせなんだ。いつ飲んでも気まずい空気が流れて、「次は二人きりじゃない方がいいな」って思っちゃうかも。'
    }
    return badFeatures[analysis.featureType] || badFeatures['stable_fun']
  } else {
    const goodFeatures: { [key: string]: string } = {
      'mutual_enhancement': '二人で飲むと、お互いの魅力が倍増するんだよね。片方が話してる時、もう片方が自然とサポートに回る、そんな阿吽の呼吸が生まれるんだ。飲み会でも周りから「あの二人いい感じだね」って言われること間違いなしだよ。',
      'complementary': '真逆のタイプだけど、それがいいんだ。お互いに持ってない部分を補い合えるから、一緒にいると新しい発見があるんだよ。飲めば飲むほど、相手の魅力に気づいていく、そんな関係性だね。',
      'synchronized': '二人のリズムがピッタリ合うんだよね。乾杯のタイミング、次の店に行きたくなる時間、帰りたくなるタイミング、全部シンクロするんだ。だから無理なく長時間一緒にいられる、理想的な飲み友だよ。',
      'growth_oriented': '一緒に飲むたびに、お互いが成長していける関係性なんだ。相手の話を聞いて新しい価値観に触れたり、自分の考えを整理できたり、人間的に深みが増すんだよ。',
      'stable_fun': '安定感と楽しさが両立してる、レアな組み合わせだね。いつ飲んでも一定のクオリティで楽しめる、そんな信頼関係が築けるんだ。'
    }
    return goodFeatures[analysis.featureType] || goodFeatures['stable_fun']
  }
}

// お互いの成長効果（2-3文）
function generateGrowthEffect(type1: string, type2: string, level: string): string {
  if (level === 'exceptional' || level === 'excellent') {
    return 'こういう相性の良さは、お互いの人間的成長にもつながるんだよ。酔った時の本音トークで相手の価値観を知り、それが自分の視野を広げてくれる。長く付き合えば付き合うほど、二人とも魅力的な人間になっていくはずだ。'
  } else if (level === 'good' || level === 'moderate') {
    return 'この組み合わせなら、お互いに良い影響を与え合えるね。酔った勢いで語る夢や目標が、相手のモチベーションになったりするんだ。一緒にいることで、少しずつ成長していける関係性だよ。'
  } else if (level === 'fair') {
    return '違いがあるからこそ、お互いから学べることは多いんだ。最初はぶつかることもあるかもしれないけど、それが二人を成長させる糧になるんだよ。'
  } else {
    return 'この組み合わせで成長を期待するのは難しいかもね。お互いの価値観が合わなすぎて、一緒にいても学びより疲れが勝っちゃうんだ。無理に合わせようとせず、別々の相手を探した方がいいかもしれないよ。'
  }
}

// 注意点（2-3文）
function generateCaution(type1: string, type2: string, level: string): string {
  if (level === 'poor' || level === 'bad') {
    const badCautions = [
      'この組み合わせで飲むなら、他の人も一緒にいた方がいいよ。二人きりだと気まずい空気になったり、トラブルに発展したりする可能性が高いからね。',
      '正直、無理して一緒に飲む必要はないと思うよ。お互いにとってストレスになるだけだから、別々の相手と楽しんだ方が賢明だね。',
      'もし飲むことになったら、短時間で切り上げるのが吉だよ。長くいればいるほど、お互いのマイナス面が目立って、嫌な思いをする可能性が高いからね。',
      'お酒が入ると、お互いの合わない部分がさらに強調されちゃうんだ。トラブルを避けたいなら、できるだけ二人きりの飲み会は避けた方が無難だよ。'
    ]
    return badCautions[Math.floor(Math.random() * badCautions.length)]
  } else {
    const cautions: { [key: string]: string } = {
      'pace_control': 'ただし、盛り上がりすぎて飲みすぎには注意だよ。二人とも楽しくなると歯止めが効かなくなりがちだから、お互いにブレーキ役を意識するのが大事だね。',
      'communication': 'ただね、たまにはシラフでもちゃんと話し合う時間を作るのも大事だよ。酔った時の勢いだけじゃなく、冷静な時のコミュニケーションも忘れないようにね。',
      'respect': 'ただし、お互いのペースを尊重することは忘れないでね。片方だけが楽しんで、もう片方が無理してる状態は避けないとね。',
      'balance': 'ただ、時々はテンションの違いが出ることもあるかもしれない。そんな時は無理に合わせず、お互いの状態を理解し合うことが大切だよ。',
      'moderation': 'ただね、良い相性だからこそ、つい飲みすぎちゃうこともあるんだ。適度な距離感を保ちつつ、健康的に楽しむのがポイントだよ。'
    }
    
    const cautionKeys = Object.keys(cautions)
    const randomKey = cautionKeys[Math.floor(Math.random() * cautionKeys.length)]
    return cautions[randomKey]
  }
}

// 締めのメッセージ（1-2文）
function generateClosing(score: number, level: string): string {
  if (level === 'exceptional' || level === 'excellent') {
    return '二人の相性は科学的に見ても抜群だから、これからも一緒に楽しい時間を過ごしてね！この出会いを大切にしよう！'
  } else if (level === 'good' || level === 'moderate') {
    return '十分いい相性だから、これからも一緒に飲む機会を作っていけば、もっと仲良くなれるはずだよ。楽しんでいってね！'
  } else if (level === 'fair') {
    return '個性的な組み合わせだけど、それが面白さにもつながるんだ。お互いの違いを楽しみながら、新しい発見をしていってね！'
  } else {
    return '相性が悪いからって、全部ダメってわけじゃないけど、期待しすぎない方がいいよ。他にもっと合う相手がきっといるはずだからね！'
  }
}

// タイプの組み合わせ分析
interface TypeAnalysis {
  reasonType: 'dopamine_sync' | 'gaba_balance' | 'inhibition_release' | 'serotonin_harmony' | 'dynamic_balance'
  featureType: 'mutual_enhancement' | 'complementary' | 'synchronized' | 'growth_oriented' | 'stable_fun'
  scientificBasis: string
}

function getTypeAnalysis(type1: string, type2: string): TypeAnalysis {
  // タイプの組み合わせごとの科学的分析
  const analysisMap: { [key: string]: TypeAnalysis } = {
    'ソーシャルエンハンサー_ロマンティックエンハンサー': {
      reasonType: 'dopamine_sync',
      featureType: 'mutual_enhancement',
      scientificBasis: 'ドーパミン系の相乗的活性化'
    },
    'ソーシャルエンハンサー_エモーショナルエクスプレス': {
      reasonType: 'inhibition_release',
      featureType: 'mutual_enhancement',
      scientificBasis: '前頭前野の抑制解除による本音表現'
    },
    'ソーシャルエンハンサー_コンフィデンスブースター': {
      reasonType: 'dopamine_sync',
      featureType: 'synchronized',
      scientificBasis: '自信向上効果の相乗作用'
    },
    'ソーシャルエンハンサー_ストレスリリーバー': {
      reasonType: 'dynamic_balance',
      featureType: 'complementary',
      scientificBasis: '交感神経と副交感神経のバランス'
    },
    'ソーシャルエンハンサー_ミステリアスドリンカー': {
      reasonType: 'dynamic_balance',
      featureType: 'complementary',
      scientificBasis: '活性化と抑制のバランス'
    },
    'ロマンティックエンハンサー_エモーショナルエクスプレス': {
      reasonType: 'dopamine_sync',
      featureType: 'mutual_enhancement',
      scientificBasis: 'ドーパミンとオキシトシンの相乗効果'
    },
    'ロマンティックエンハンサー_コンフィデンスブースター': {
      reasonType: 'dopamine_sync',
      featureType: 'synchronized',
      scientificBasis: '恋愛感情と自信の相互作用'
    },
    'ロマンティックエンハンサー_ストレスリリーバー': {
      reasonType: 'serotonin_harmony',
      featureType: 'stable_fun',
      scientificBasis: 'セロトニンによる安定効果'
    },
    'ロマンティックエンハンサー_ミステリアスドリンカー': {
      reasonType: 'dynamic_balance',
      featureType: 'complementary',
      scientificBasis: '感情表現と抑制のバランス'
    },
    'エモーショナルエクスプレス_コンフィデンスブースター': {
      reasonType: 'inhibition_release',
      featureType: 'growth_oriented',
      scientificBasis: '前頭前野の機能変化による成長'
    },
    'エモーショナルエクスプレス_ストレスリリーバー': {
      reasonType: 'gaba_balance',
      featureType: 'stable_fun',
      scientificBasis: 'GABA受容体による癒し効果'
    },
    'エモーショナルエクスプレス_ミステリアスドリンカー': {
      reasonType: 'dynamic_balance',
      featureType: 'complementary',
      scientificBasis: '感情表現と理性のバランス'
    },
    'コンフィデンスブースター_ストレスリリーバー': {
      reasonType: 'dynamic_balance',
      featureType: 'complementary',
      scientificBasis: '活性化とリラックスのバランス'
    },
    'コンフィデンスブースター_ミステリアスドリンカー': {
      reasonType: 'dynamic_balance',
      featureType: 'complementary',
      scientificBasis: '自信と冷静さのバランス'
    },
    'ストレスリリーバー_ミステリアスドリンカー': {
      reasonType: 'serotonin_harmony',
      featureType: 'stable_fun',
      scientificBasis: '副交感神経優位の調和'
    }
  }
  
  // タイプの組み合わせキーを作成（順序を正規化）
  const sortedTypes = [type1, type2].sort()
  const key1 = `${sortedTypes[0]}_${sortedTypes[1]}`
  const key2 = `${type1}_${type2}`
  const key3 = `${type2}_${type1}`
  
  return analysisMap[key1] || analysisMap[key2] || analysisMap[key3] || {
    reasonType: 'dynamic_balance',
    featureType: 'stable_fun',
    scientificBasis: 'バランスの取れた相互作用'
  }
}

// 同じタイプの組み合わせの場合の特別な解説
export function generateSameTypeCompatibilityText(
  type: string,
  score: number,
  name1: string,
  name2: string
): string {
  const rankPosition = Math.max(1, Math.min(1000, Math.floor((100 - score) * 10)))
  
  const sameTypeTexts: { [key: string]: string } = {
    'ソーシャルエンハンサー': `おめでとう！${name1}と${name2}の二人の相性は${score}点だよ。1000組中、上位${rankPosition}組に入る相性だね。二人とも「ソーシャルエンハンサー」だから、一緒に飲んだら盛り上がりが止まらないこと間違いなしだ。ドーパミン系の活性化タイミングが完全にシンクロしてるから、テンションの波長がピッタリ合うんだよ。一杯目のビールで目がキラキラし始めて、二杯目で完全にエンジン全開。カラオケ行ったら朝まで帰れない、二軒目三軒目とハシゴが止まらない、そんな最高の飲み会になるはずだ。ただし注意点がひとつあって、二人ともブレーキ役がいないから、盛り上がりすぎて飲みすぎたり、翌日「昨日何したっけ？」ってなる可能性大だよ。まあでも、そんなハチャメチャな夜も含めて楽しめるのが、この組み合わせの魅力だね。科学的に見ても抜群の相性だから、これからも一緒に最高の時間を過ごしてね！`,
    
    'ロマンティックエンハンサー': `いいね！${name1}と${name2}の相性は${score}点だよ。1000組中、上位${rankPosition}組に入る、なかなかの相性だね。二人とも「ロマンティックエンハンサー」タイプだから、一緒に飲んだら甘い雰囲気がMAXになること間違いなしだ。ドーパミンとオキシトシンの分泌が同時に高まるから、お互いの恋愛感情が増幅されていくんだよ。夜景の見えるバーで乾杯した瞬間から、もう世界が二人だけのものになる感覚だ。目が合うたびにドキドキして、会話の距離も自然と近くなって、気づいたら手を繋ぎたくなってる、そんなロマンチックな展開が期待できるよ。ただね、二人とも甘い雰囲気に酔いしれすぎて、現実を見失わないように気をつけてね。酔った勢いで「好き」って言うのはいいけど、翌日シラフに戻った時にどう思うか、それも大事だよ。とはいえ、こんなに相性いいんだから、本気で恋に落ちる可能性も十分あるよ。この出会いを大切にしてね！`,
    
    'コンフィデンスブースター': `おめでとう！二人の相性は${score}点だよ。1000組中${rankPosition}位以内に入る、科学的にも実証された相性の良さだ。二人とも「コンフィデンスブースター」タイプだから、一緒に飲んだら自信と勢いが爆発するよ。前頭前野の抑制解除効果が相乗的に働いて、お互いの自己効力感が最大限に高まるんだ。「俺たちなら何でもできる！」みたいな無敵感が生まれて、新しいことに挑戦したくなったり、大胆な決断をしたくなったりするよ。二人で話してると自然と熱いトークになって、人生論や夢を語り合う、そんな刺激的な時間が過ごせるはずだ。ただし、二人とも自信満々になりすぎて、周りが見えなくなったり、現実的じゃない計画を立てたりしないように注意だよ。翌日冷静になって「あれは何だったんだ...」ってならないように、ほどほどに抑えとくのも大事だね。でも、お互いを高め合える関係性は最高だから、これからも刺激的な時間を楽しんでね！`,
    
    'エモーショナルエクスプレス': `すごいね！${name1}と${name2}の相性スコアは${score}点だよ。1000組中、上位${rankPosition}組に入る、なかなかの相性なんだ。二人とも「エモーショナルエクスプレス」タイプだから、一緒に飲んだら感情が溢れ出すこと間違いなしだ。前頭前野の抑制が解除されて、普段は言えない本音がポロポロ出てくるんだよ。昔の思い出話で泣いたり、友情を確かめ合って感動したり、笑い上戸と泣き上戸がコロコロ入れ替わる、そんなジェットコースターみたいな飲み会になるはずだ。お互いの感情に共感し合えるから、心の距離が一気に縮まって、「こんなに分かり合える人がいたんだ」って感じるよ。ただね、二人とも感情的になりすぎて、冷静さを失わないように気をつけてね。感情の波に飲まれすぎて、翌日「あんなこと言わなきゃよかった」って後悔しないように、ほどほどにしとくのも大事だよ。でも、こんなに深い絆が築ける相性は貴重だから、この関係を大切にしてね！`,
    
    'ストレスリリーバー': `いいね！二人の相性は${score}点だよ。これは1000組のカップルの中でも上位${rankPosition}位に入る、かなりいい感じの組み合わせだね。二人とも「ストレスリリーバー」タイプだから、一緒に飲んだらとにかく癒されるよ。GABA受容体が活性化して、副交感神経が優位になるから、お互いの存在が心地いいリラックス効果を生み出すんだ。静かなバーでまったり飲みながら、ゆったりした会話を楽しむ、そんな穏やかな時間が過ごせるはずだ。無理に盛り上がらなくても、一緒にいるだけで安心できる、そんな関係性だね。沈黙が苦にならない、心地いい空間が自然と生まれるよ。ただ、二人とも積極性に欠けることもあるから、たまには新しいことにも挑戦してみるのもいいかもね。ずっと同じパターンだと、ちょっとマンネリ化することもあるかもしれないから。とはいえ、この安定感と居心地の良さは何物にも代えがたい価値があるよ。長く付き合える、理想的な飲み友だね！`,
    
    'ミステリアスドリンカー': `これはいい感じだ！二人の相性は${score}点。1000組中${rankPosition}位以内に入る、科学的にも実証された相性の良さなんだ。二人とも「ミステリアスドリンカー」タイプだから、一緒に飲んでもクールで落ち着いた雰囲気が漂うよ。前頭前野の機能が安定してて、理性的な判断を保ったまま飲めるから、深い話もできるし、お互いの知的な部分を楽しめるんだ。表情や感情表現は控えめだけど、その分言葉の一つ一つに重みがあって、お互いの本質的な部分で繋がれる感じだね。静かなバーで哲学的な話をしたり、人生観を語り合ったり、大人の余裕を感じさせる時間が過ごせるはずだ。ただね、二人とも感情表現が少ないから、時には素直に気持ちを伝え合うことも大事だよ。「言わなくてもわかるでしょ」じゃなくて、たまには「ありがとう」とか「楽しい」とか、言葉にするのもいいもんだよ。お互いミステリアスな魅力を持ってるからこそ、一緒にいて飽きない関係が築けるはずだ。この出会いを大切にしてね！`
  }
  
  return sameTypeTexts[type] || generateCompatibilityText(type, type, score, name1, name2)
}

