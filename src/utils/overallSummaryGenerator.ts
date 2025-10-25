// 複数カップルの診断結果を総合的に分析し、飲み会全体の総括コメントを生成

interface CoupleData {
  compatibility: number
}

/**
 * 複数カップルの相性度から飲み会全体の総括コメントを生成
 * @param couples - カップルの相性度データの配列
 * @returns 飲み会全体の総括コメント（150-200文字程度）
 */
export function generateOverallSummary(couples: CoupleData[]): string {
  if (couples.length === 0) {
    return 'カップルがいないみたいだね。まずは診断してみようぜ！'
  }

  // 平均相性度を計算
  const average = calculateAverage(couples)
  
  // 標準偏差を計算（バラつき）
  const stdDev = calculateStdDev(couples, average)
  
  // 最高・最低スコアをチェック
  const maxScore = Math.max(...couples.map(c => c.compatibility))
  const minScore = Math.min(...couples.map(c => c.compatibility))
  const hasHighPair = maxScore >= 90
  const hasLowPair = minScore <= 50
  
  // 相性度の分布を確認
  const highCount = couples.filter(c => c.compatibility >= 80).length
  const midCount = couples.filter(c => c.compatibility >= 60 && c.compatibility < 80).length
  const lowCount = couples.filter(c => c.compatibility < 60).length
  
  // 総括パターンの判定
  return generateSummaryText(average, stdDev, hasHighPair, hasLowPair, highCount, midCount, lowCount, couples.length)
}

// 平均値を計算
function calculateAverage(couples: CoupleData[]): number {
  const sum = couples.reduce((acc, c) => acc + c.compatibility, 0)
  return Math.round(sum / couples.length)
}

// 標準偏差を計算
function calculateStdDev(couples: CoupleData[], average: number): number {
  const squaredDiffs = couples.map(c => Math.pow(c.compatibility - average, 2))
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / couples.length
  return Math.round(Math.sqrt(variance))
}

// 総括テキストを生成
function generateSummaryText(
  average: number,
  stdDev: number,
  hasHighPair: boolean,
  hasLowPair: boolean,
  highCount: number,
  midCount: number,
  lowCount: number,
  totalCount: number
): string {
  // パターン1: 平均80点以上（最高の飲み会）
  if (average >= 80) {
    const variations = [
      `おおおお、これはヤバい飲み会になるぞ！平均相性${average}点で、全体的に相性良いカップルばっかりじゃねえか。こういう飲み会は間違いなく盛り上がる。今夜はマジで恋が生まれる予感がするな。お酒の力も借りて、みんな積極的にいこうぜ！`,
      `マジかよ、平均${average}点とか奇跡だろ！${totalCount}組中${highCount}組が高相性って、これはもう運命としか言いようがねえな。今夜は全員が主役になれる、最高の飲み会になること間違いなしだ。思い切ってアプローチしてみろよ！`,
      `うわ、平均相性${average}点って、これ完璧なメンバー構成じゃん！酒癖的に見ても相性バッチリな組み合わせが多いから、自然と良い雰囲気になるはずだ。今夜はガンガン飲んで、ガンガン盛り上がっていこうぜ！`
    ]
    return variations[Math.floor(Math.random() * variations.length)]
  }
  
  // パターン2: 平均70-79点（理想的な飲み会）
  if (average >= 70) {
    const variations = [
      `いいね！平均${average}点で、バランスが取れた飲み会だな。${highCount}組が高相性、${midCount}組がまあまあで、全体的にいい感じだ。こういう飲み会は安定して楽しめるから、リラックスして自然体でいこうぜ。恋のチャンスも十分あるぞ！`,
      `おお、平均相性${average}点か。悪くないじゃん！高相性カップルも${highCount}組いるし、盛り上がる要素は揃ってるな。ただ無理に合わせようとせず、自分のペースで楽しむのが一番だぞ。今夜は良い思い出になりそうだな！`,
      `平均${average}点って、これは理想的な飲み会だな。相性が良すぎても悪すぎてもバランス崩れるけど、このくらいがちょうどいいんだよ。${totalCount}組のカップル候補がいるから、いろんな展開が期待できるぞ！`
    ]
    return variations[Math.floor(Math.random() * variations.length)]
  }
  
  // パターン3: 標準偏差が大きい（バラつきがある）
  if (stdDev >= 15) {
    if (hasHighPair && hasLowPair) {
      return `うーん、この飲み会はちょっと難しいかもな。平均${average}点だけど、バラつきがデカい。最高の相性のカップルもいれば、全く合わないペアもいる。${highCount}組の高相性カップルは思い切っていけよ。逆に相性悪いペアは無理せず、グループで楽しむのが吉だな。`
    } else {
      return `平均相性は${average}点だけど、組み合わせによってかなり差があるな。相性いいペアは積極的に、微妙なペアは慎重に、ってメリハリつけて動くのがポイントだぞ。全体としてはそこそこ楽しめる飲み会になるはずだ。`
    }
  }
  
  // パターン4: 平均60-69点（普通の飲み会）
  if (average >= 60) {
    const variations = [
      `平均${average}点か。まあまあってとこだな。${totalCount}組中${highCount}組が高相性だから、そのペアは期待できるぞ。ただ${lowCount}組は相性イマイチだから、無理せずグループで楽しむのがいいかもな。飲み会としては普通に盛り上がるレベルだ。`,
      `平均相性${average}点で、可もなく不可もなくって感じだな。高相性カップルが${highCount}組いるのは救いだけど、全体的にはそこまで期待しすぎない方がいいかも。とはいえ、お酒の力でテンション上がれば何が起こるかわからないからな！`,
      `うーん、平均${average}点ってのは、ちょっと頑張らないとダメかもな。相性だけに頼らず、自分から積極的に話しかけたり、雰囲気作りを意識したりすることが大事だぞ。工夫次第で楽しい飲み会にできるはずだ！`
    ]
    return variations[Math.floor(Math.random() * variations.length)]
  }
  
  // パターン5: 平均60点以下（厳しい飲み会）
  if (average >= 50) {
    const variations = [
      `正直に言うわ。平均${average}点で、全体的に相性はそんなに良くないな。${lowCount}組が低相性で、厳しい組み合わせが多い。でもな、相性が全てじゃないぞ。お酒の力でテンション上げて、みんなで盛り上げる努力をすれば何とかなる。諦めるな！`,
      `これは...ちょっと厳しい飲み会だな。平均相性${average}点で、${totalCount}組中${lowCount}組が低相性って、なかなかハードモードだぞ。カップル狙いよりも、グループ全体で楽しむことを優先した方がいいかもな。無理は禁物だ。`,
      `うーん、平均${average}点か。相性的には難しい飲み会だけど、だからこそ工夫のしがいがあるってもんだ。高相性の${highCount}組は頑張れ！それ以外は、まずは友達として仲良くなることから始めようぜ。焦らずいこう。`
    ]
    return variations[Math.floor(Math.random() * variations.length)]
  }
  
  // パターン6: 平均50点以下（かなり厳しい）
  const variations = [
    `これはマジで厳しいぞ...。平均相性${average}点で、${totalCount}組中${lowCount}組が低相性って、相性的にはかなり厳しいメンバー構成だ。今夜は恋愛より、まずはみんなで楽しく飲むことを目標にしようぜ。無理にカップルを狙うと空回りするから注意しろよ。`,
    `正直言って、この飲み会は相性的には期待できねえな。平均${average}点で、ほとんどの組み合わせが微妙だ。でもな、たまにはこういう飲み会もいいじゃねえか。恋愛抜きで、純粋にお酒と会話を楽しもうぜ！`,
    `うわ、平均${average}点はキツイな...。${totalCount}組もあるのに、高相性カップルがほとんどいない。今夜は恋愛成就は難しいかもしれないけど、それはそれで気楽に飲めるってことだ。変に気を使わず、リラックスして楽しもうぜ！`
  ]
  return variations[Math.floor(Math.random() * variations.length)]
}
























