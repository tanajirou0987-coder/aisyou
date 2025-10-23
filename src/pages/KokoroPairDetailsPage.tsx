import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, Heart, Sparkles } from 'lucide-react'
import { PageLayout } from '../layouts/PageLayout'

// 20タイプのデータ定義
const typeContents = {
  "ハニームーン型": {
    icon: "🎀",
    catchphrase: "永遠の新婚カップル",
    rarity: 6,
    rank: "SS級",
    description: {
      notDating: "二人はまるで新婚カップルのような甘々な関係を築ける相性です。お互いを見つめ合うだけでドキドキし、いつまでも新鮮な気持ちでいられる特別な絆があります。",
      under3months: "まだ付き合い始めたばかりなのに、もう何年も一緒にいるような安心感があります。お互いのことを深く理解し合い、これからもっと素敵な関係になっていくでしょう。",
      threeToTwelve: "付き合い始めて数ヶ月が経ち、お互いのことがもっと分かってきました。でも相変わらず甘々で、周りから見ても幸せそうなカップルです。",
      oneToThree: "1年以上の付き合いでも、まだまだ新婚気分を保てています。お互いを大切に思い合い、これからも素敵な関係を続けていけるでしょう。",
      overThree: "長い付き合いでも、お互いへの愛情は深まるばかりです。パートナーとして信頼し合い、これからも一緒に歩んでいける特別な関係です。"
    },
    attraction: {
      personA: {
        appearance: [
          "笑顔が素敵で、見てるだけで癒される",
          "雰囲気が柔らかくて、話しかけやすい",
          "ファッションセンスが好み"
        ],
        personality: [
          "優しくて思いやりがある",
          "話してると楽しくて時間を忘れる",
          "自分のことを理解しようとしてくれる",
          "一緒にいると居心地がいい"
        ],
        actions: [
          "細かいことに気づいてくれる",
          "困った時に助けてくれる",
          "自分の話を真剣に聞いてくれる"
        ],
        special: [
          "他の人とは違う特別さを感じる",
          "一緒にいると自分らしくいられる",
          "この人となら未来を考えられる"
        ]
      },
      personB: {
        appearance: [
          "明るい笑顔が印象的で、見てるだけで元気になる",
          "優しい雰囲気で、話しかけやすい",
          "清潔感があって好印象"
        ],
        personality: [
          "真面目で誠実な性格",
          "話を聞くのが上手で、共感してくれる",
          "自分のことを大切に思ってくれる",
          "一緒にいると安心できる"
        ],
        actions: [
          "困った時に手を差し伸べてくれる",
          "小さなことでも気にかけてくれる",
          "自分のことを尊重してくれる"
        ],
        special: [
          "この人となら何でも話せる",
          "一緒にいると自然体でいられる",
          "長い時間一緒にいても飽きない"
        ]
      }
    },
    kyunPoints: [
      {
        rank: 1,
        action: "何気ない瞬間に「好き」って言う 💕",
        detail: "デート中じゃなくて、普通に過ごしてる時に言われるとドキッとする。サラッと言うのがコツ。"
      },
      {
        rank: 2,
        action: "手を繋いで歩く 🚶‍♀️💕",
        detail: "特に理由もなく手を繋いで歩いてると、自然に愛を感じられる。"
      },
      {
        rank: 3,
        action: "LINEで「おはよう」を送る ☀️",
        detail: "毎朝の挨拶が習慣になると、その人を思い出す時間が増える。"
      },
      {
        rank: 4,
        action: "一緒に写真を撮る 📸",
        detail: "二人の思い出を形に残すことで、特別感がアップする。"
      },
      {
        rank: 5,
        action: "相手の好きなものを覚えておく 🎁",
        detail: "小さなことでも覚えていてくれると、大切にされてる気持ちになる。"
      },
      {
        rank: 6,
        action: "「ありがとう」をたくさん言う 🙏",
        detail: "感謝の気持ちを言葉で伝えることで、お互いの絆が深まる。"
      },
      {
        rank: 7,
        action: "一緒に料理をする 👨‍🍳",
        detail: "共同作業で協力し合うことで、パートナー感がアップする。"
      },
      {
        rank: 8,
        action: "相手の話を最後まで聞く 👂",
        detail: "真剣に聞いてくれると、大切にされてる気持ちになる。"
      },
      {
        rank: 9,
        action: "「一緒にいてくれてありがとう」と言う 💝",
        detail: "存在そのものに感謝することで、特別な関係性を感じられる。"
      },
      {
        rank: 10,
        action: "相手の好きな場所に連れて行く 🗺️",
        detail: "相手の世界を知ることで、より深く理解し合える。"
      }
    ],
    compatibilityReasons: [
      {
        title: "価値観が驚くほど一致",
        description: "二人が大切にしてることや、人生で優先したいことが似てる。だから将来の話をしても「わかる！」って共感できる。方向性が同じだから、一緒に歩んでいきやすい関係。"
      },
      {
        title: "会話が止まらない",
        description: "何を話しても楽しくて、時間を忘れてしまう。お互いの話を聞くのが好きで、新しい発見がたくさんある。会話を通じてどんどん親しくなれる。"
      },
      {
        title: "お互いを癒し合える",
        description: "疲れた時に会うと、自然と元気になる。お互いの存在が心の支えになっていて、一緒にいると安心できる。癒し合える関係は長続きしやすい。"
      },
      {
        title: "将来のビジョンが似ている",
        description: "どんな生活をしたいか、どんな未来を描いているかが似てる。だから一緒に計画を立てても、お互いが納得できる。同じ方向を向いているから迷わない。"
      },
      {
        title: "お互いのペースを尊重できる",
        description: "急がずに、お互いのペースで関係を築いていける。プレッシャーを感じることなく、自然体でいられる。この安心感が特別な関係を作る。"
      },
      {
        title: "小さなことでも喜び合える",
        description: "些細なことでも一緒に喜んでくれる。お互いの幸せを心から願っていて、一緒にいると毎日が楽しくなる。この積み重ねが深い絆を作る。"
      },
      {
        title: "お互いの成長を応援し合える",
        description: "相手の頑張りを素直に褒めて、一緒に成長していける。競争ではなく、協力し合える関係。お互いを高め合えるパートナーになれる。"
      }
    ],
    hiddenCommonalities: [
      "恋愛体質で愛情深い",
      "寂しがり屋な一面がある",
      "記念日やイベントを大切にしたい",
      "スキンシップで愛を確認したいタイプ",
      "ロマンチックなことが好き"
    ],
    goodSituations: [
      "二人きりでまったりしてる時間",
      "デートで手を繋いで歩いてる時",
      "お互いの好きなものをシェアしてる時",
      "夜遅くまで電話やLINEしてる時",
      "記念日を一緒に祝ってる時"
    ],
    personalityAnalysis: {
      personA: {
        basic: [
          "第一印象：明るくて話しやすい雰囲気",
          "本質：実は繊細で思慮深い",
          "エネルギー源：人と話すことで元気になる",
          "ストレス反応：一人になりたがる",
          "モチベーション：認められることがやる気になる"
        ],
        communication: [
          "話し方の特徴：はっきり意見を言うタイプ",
          "聞き方の特徴：相槌打ちながらしっかり聞く",
          "感情表現：顔に出やすい素直な性格",
          "本音の伝え方：遠回しにせず直接伝える",
          "LINEの傾向：既読即レス、スタンプ多め"
        ],
        love: [
          "好きな人への態度：積極的にアプローチする",
          "愛情表現の仕方：言葉でストレートに伝える",
          "スキンシップ：スキンシップ大好き",
          "記念日への考え方：記念日を大切にするタイプ",
          "束縛度：適度に繋がりたい程度",
          "喧嘩の時：すぐ謝って仲直りしたい"
        ],
        values: [
          "大切にしてること：人との繋がりを何より大切に",
          "将来のビジョン：楽しく笑い合える日々を",
          "お金の使い方：経験や思い出にお金をかける",
          "時間の使い方：大切な人との時間を優先"
        ],
        hidden: [
          "意外な趣味：実は読書が好き",
          "隠れた才能：料理が意外と上手",
          "コンプレックス：人見知りな一面を気にしてる",
          "理想の自分：もっと自信を持ちたい"
        ],
        feelings: [
          "一緒にいると安心できる存在",
          "素の自分でいられる",
          "たくさん話を聞いてほしい",
          "褒めてくれると嬉しい",
          "無視されるのは辛い"
        ]
      },
      personB: {
        basic: [
          "第一印象：優しくて親しみやすい雰囲気",
          "本質：実は芯が強くて責任感がある",
          "エネルギー源：人を喜ばせることで元気になる",
          "ストレス反応：一人の時間を求める",
          "モチベーション：人の役に立つことがやる気になる"
        ],
        communication: [
          "話し方の特徴：相手のペースに合わせて話す",
          "聞き方の特徴：共感しながらじっくり聞く",
          "感情表現：表情豊かで分かりやすい",
          "本音の伝え方：相手の反応を見ながら伝える",
          "LINEの傾向：丁寧な文章、絵文字多め"
        ],
        love: [
          "好きな人への態度：自然体で接する",
          "愛情表現の仕方：行動で示すことが多い",
          "スキンシップ：適度なスキンシップが好き",
          "記念日への考え方：特別な日を大切にする",
          "束縛度：お互いの自由を尊重したい",
          "喧嘩の時：冷静に話し合いたい"
        ],
        values: [
          "大切にしてること：家族や大切な人との時間",
          "将来のビジョン：穏やかで幸せな日々を",
          "お金の使い方：将来のためにも貯金する",
          "時間の使い方：バランスの取れた生活を"
        ],
        hidden: [
          "意外な趣味：実はスポーツが好き",
          "隠れた才能：手先が器用で工作が得意",
          "コンプレックス：完璧主義な一面を気にしてる",
          "理想の自分：もっと自由に生きたい"
        ],
        feelings: [
          "一緒にいると自然体でいられる",
          "自分のことを理解してくれる",
          "一緒にいて楽しい",
          "大切にされてる気持ちになる",
          "一人の時間も尊重してくれる"
        ]
      }
    },
    episodes: [
      {
        title: "会話編",
        content: "カフェで2時間話し続けて、気づいたら閉店時間。お互いの話を聞くのが楽しくて、時間を忘れてしまう。こんなに話が合う人と出会えて幸せ。"
      },
      {
        title: "デート編",
        content: "初デートで手を繋いで歩いてたら、自然と笑顔になってしまった。お互いの手の温もりを感じながら歩く時間が、何より幸せな時間。"
      },
      {
        title: "日常編",
        content: "一緒に料理をしてたら、自然と役割分担ができてた。お互いの得意なことを活かし合って、最高のチームワーク。毎日が楽しくなる。"
      },
      {
        title: "喧嘩編",
        content: "小さなことで喧嘩したけど、お互いが謝り合ってすぐ仲直り。喧嘩しても、お互いのことを大切に思ってる気持ちは変わらない。"
      }
    ],
    commonLanguage: [
      "同じタイミングで同じこと言う",
      "「あれ」だけで通じる",
      "目を見ただけで考えてることわかる",
      "二人だけの合言葉がある",
      "特定の絵文字に特別な意味がある",
      "「いつものやつ」で通じる",
      "LINEのテンションが似てる",
      "笑いのツボが一緒"
    ],
    othersPerspective: [
      {
        title: "「見てて幸せになる」",
        content: "二人が一緒にいると、周りも自然と笑顔になる。お互いを大切に思ってる気持ちが伝わってきて、見てるだけで幸せな気持ちになる。"
      },
      {
        title: "「お似合いすぎ」",
        content: "雰囲気も性格も、本当にお似合いのカップル。一緒にいると自然体で、お互いを高め合ってる感じがする。理想のカップル像そのもの。"
      },
      {
        title: "「羨ましい」",
        content: "こんなに仲良くて、お互いを大切に思ってる関係が羨ましい。いつも笑顔でいて、本当に幸せそう。こんな関係を築けたらいいなと思う。"
      }
    ],
    recommendedDates: [
      "カフェでのんびりおしゃべり",
      "手を繋いで街を散歩",
      "一緒に料理を作る",
      "映画館でロマンチックな映画",
      "夜景のきれいな場所でデート"
    ],
    caution: {
      text: "お互いを大切に思う気持ちが強すぎて、時々束縛になってしまうことも。適度な距離感を保つことも大切です。",
      actions: [
        "お互いの時間も尊重する",
        "相手の気持ちを聞く時間を作る",
        "時々一人の時間も大切にする"
      ]
    },
    futurePrediction: {
      notDating: "このまま自然に付き合うことになりそう。お互いのことを深く理解し合い、素敵な関係を築いていけるでしょう。",
      under3months: "まだまだ新鮮な気持ちでいられる関係。これからもっとお互いのことを知り合って、深い絆を築いていけるでしょう。",
      threeToTwelve: "お互いのことが分かってきて、より深い関係になっていく時期。これからもお互いを大切に思い合い、素敵な関係を続けていけるでしょう。",
      oneToThree: "安定した関係を築けている証拠。これからもお互いを支え合い、長く続く素敵な関係を築いていけるでしょう。",
      overThree: "長い付き合いでも、お互いへの愛情は深まるばかり。これからもパートナーとして信頼し合い、素敵な関係を続けていけるでしょう。"
    },
    title: {
      notDating: "永遠のハニームーンタイプ",
      dating: "永遠のハニームーンカップル"
    }
  }
  // 残り19タイプも同様に定義...
}

export function KokoroPairDetailsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { state } = useApp()

  const maleId = searchParams.get('maleId')
  const femaleId = searchParams.get('femaleId')
  const maleNameParam = searchParams.get('maleName')
  const femaleNameParam = searchParams.get('femaleName')

  if ((!maleId || !femaleId) && (!maleNameParam || !femaleNameParam)) {
    return (
      <PageLayout>
        <div className="min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center">
          <div className="text-center">
            <div className="card mb-6">
              <p className="text-[#D63384] text-xl font-bold">⚠️ ペア情報が見つかりません ⚠️</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              トップページに戻る
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  let maleParticipant = state.groupParticipants.find(p => p.userId === maleId)
  let femaleParticipant = state.groupParticipants.find(p => p.userId === femaleId)
  if ((!maleParticipant || !femaleParticipant) && (maleNameParam || femaleNameParam)) {
    maleParticipant = maleParticipant || state.groupParticipants.find(p => p.userName === maleNameParam && p.gender === 'male')
    femaleParticipant = femaleParticipant || state.groupParticipants.find(p => p.userName === femaleNameParam && p.gender === 'female')
  }

  // 参加者情報がない場合はモックデータで動作させる
  if (!maleParticipant || !femaleParticipant) {
    console.log('参加者情報が見つからないため、モックデータで動作します')
  }

  // モックデータ（実際の実装では、診断結果から取得）
  const diagnosticData = {
    type: "ハニームーン型",
    names: {
      personA: maleParticipant?.userName || "太郎",
      personB: femaleParticipant?.userName || "花子"
    },
    relationship: "付き合ってる", // 実際のデータから取得
    period: "3ヶ月〜1年未満", // 実際のデータから取得
    scores: {
      total: 94,
      values: 89,
      conversation: 97,
      healing: 92,
      excitement: 78,
      future: 91
    }
  }

  const typeData = typeContents[diagnosticData.type as keyof typeof typeContents]

  // デバッグ用ログ
  console.log('diagnosticData.type:', diagnosticData.type)
  console.log('typeData:', typeData)

  if (!typeData) {
    return (
      <PageLayout>
        <div className="min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-600 mb-4">エラー: タイプデータが見つかりません</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              トップに戻る
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const descriptionKey = diagnosticData.relationship === "付き合ってる" ? diagnosticData.period : "notDating"
  const description = typeData.description[descriptionKey as keyof typeof typeData.description] || typeData.description.notDating
  const predictionKey = diagnosticData.relationship === "付き合ってる" ? diagnosticData.period : "notDating"
  const prediction = typeData.futurePrediction[predictionKey as keyof typeof typeData.futurePrediction] || typeData.futurePrediction.notDating
  const titleKey = diagnosticData.relationship === "付き合ってる" ? "dating" : "notDating"
  const title = typeData.title[titleKey as keyof typeof typeData.title] || typeData.title.notDating

  // デバッグ用ログ
  console.log('descriptionKey:', descriptionKey)
  console.log('description:', description)
  console.log('predictionKey:', predictionKey)
  console.log('prediction:', prediction)
  console.log('titleKey:', titleKey)
  console.log('title:', title)

  return (
    <PageLayout>
      <div className="min-h-[calc(var(--vh,1vh)*100)] bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="max-w-6xl mx-auto p-4">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary text-sm flex items-center gap-2 mx-auto mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              トップページに戻る
            </button>
            <h1 className="text-4xl font-bold text-pink-600 mb-4">💕 ココロノオト詳細分析 💕</h1>
            <p className="text-xl text-gray-700">{diagnosticData.names.personA}さんと{diagnosticData.names.personB}さんの相性を詳しく分析しました</p>
          </div>

          {/* 画面1: イントロ演出 */}
          <div className="text-center mb-12 py-8">
            <div className="sparkles text-4xl mb-4">✨</div>
            <h2 className="text-3xl font-bold text-pink-600 mb-4">診断結果が出ました</h2>
            <div className="sparkles text-4xl mb-6">✨</div>
            <p className="text-xl text-gray-700">あなたたちは...</p>
          </div>

          {/* 画面2: タイプ名発表＋レア度 */}
          <div className="text-center mb-12 py-8">
            <div className="text-6xl mb-4">{typeData.icon}</div>
            <h2 className="text-4xl font-bold text-pink-600 mb-2">{typeData.catchphrase}</h2>
            <p className="text-2xl text-gray-700 mb-6">「{diagnosticData.type}」</p>
            
            <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
              <p className="text-lg text-pink-600 mb-2">このタイプは全体の{typeData.rarity}%！</p>
              <p className="text-xl font-bold">ランク：<span className="text-yellow-500">{typeData.rank}</span></p>
            </div>
          </div>

          {/* 画面3: 相性スコア表示 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💕 総合相性度 💕</h2>
            <div className="text-6xl font-bold text-center text-pink-500 mb-8">{diagnosticData.scores.total}%</div>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">❤️ 価値観マッチ度</span>
                  <span className="text-lg font-bold">{diagnosticData.scores.values}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full" style={{width: `${diagnosticData.scores.values}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">💛 会話の相性</span>
                  <span className="text-lg font-bold">{diagnosticData.scores.conversation}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full" style={{width: `${diagnosticData.scores.conversation}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">💙 癒し度</span>
                  <span className="text-lg font-bold">{diagnosticData.scores.healing}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full" style={{width: `${diagnosticData.scores.healing}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">💚 刺激度</span>
                  <span className="text-lg font-bold">{diagnosticData.scores.excitement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full" style={{width: `${diagnosticData.scores.excitement}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">💜 将来性</span>
                  <span className="text-lg font-bold">{diagnosticData.scores.future}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full" style={{width: `${diagnosticData.scores.future}%`}}></div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-lg text-pink-600">全カップル中 上位5%！</p>
          </div>

          {/* 画面4: 関係性の説明 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🌸 あなたたちの関係性 🌸</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">{description || "あなたたちは素敵な関係を築いていける相性です。"}</p>
            </div>
          </div>

          {/* 画面5: お互いが惹かれ合う理由 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💕 お互いが惹かれ合う理由 💕</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-4">【{diagnosticData.names.personB}が{diagnosticData.names.personA}に惹かれる理由】</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">🌟 外見・雰囲気</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personA.appearance.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">💬 性格・内面</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personA.personality.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">🎯 行動・態度</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personA.actions.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">💕 特別な魅力</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personA.special.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-4">【{diagnosticData.names.personA}が{diagnosticData.names.personB}に惹かれる理由】</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">🌟 外見・雰囲気</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personB.appearance.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">💬 性格・内面</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personB.personality.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">🎯 行動・態度</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personB.actions.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-pink-500 mb-2">💕 特別な魅力</h4>
                    <ul className="space-y-1">
                      {typeData.attraction.personB.special.map((item, index) => (
                        <li key={index} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 画面6: きゅんポイントTOP10 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">✨ 相手をきゅんとさせる方法TOP10 ✨</h2>
            
            <div className="space-y-4 mb-8">
              {typeData.kyunPoints.map((point, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {point.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 mb-2">{point.action}</p>
                      <p className="text-gray-600 text-sm">{point.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-bold text-yellow-700 mb-2">💡 ワンポイントアドバイス</h3>
              <p className="text-gray-700">自然体でいることが一番の魅力です。無理をせず、お互いのペースを大切にしましょう。</p>
            </div>
          </div>

          {/* 画面7: 相性が良い理由 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🔍 なんで相性いいの？ 🔍</h2>
            
            <div className="space-y-4">
              {typeData.compatibilityReasons.map((reason, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-green-500 text-2xl">✅</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
                      <p className="text-gray-700">{reason.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 画面8: 隠れた共通点 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🎁 隠れた共通点発見！ 🎁</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-lg text-gray-700 mb-6 text-center">実は二人とも...</p>
              
              <ul className="space-y-3">
                {typeData.hiddenCommonalities.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-pink-500 text-xl">💕</span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 画面9: 相性が良いシチュエーション */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💫 特に相性バツグンな時 💫</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <ul className="space-y-4">
                {typeData.goodSituations.map((situation, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-pink-500 text-xl">✨</span>
                    <span className="text-gray-700 text-lg">{situation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 画面10: {名前A}の性格分析 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">📝 {diagnosticData.names.personA}の性格を深掘り分析 📝</h2>
            <p className="text-center text-gray-600 mb-8">{diagnosticData.names.personB}から見た{diagnosticData.names.personA}はこんな人💕</p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-4">🌟 基本性格</h3>
                <ul className="space-y-2">
                  {typeData.personalityAnalysis.personA.basic.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <strong>{item.split('：')[0]}：</strong>{item.split('：')[1]}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">💬 コミュニケーションスタイル</h3>
                <ul className="space-y-2">
                  {typeData.personalityAnalysis.personA.communication.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <strong>{item.split('：')[0]}：</strong>{item.split('：')[1]}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-4">❤️ 恋愛スタイル</h3>
                <ul className="space-y-2">
                  {typeData.personalityAnalysis.personA.love.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <strong>{item.split('：')[0]}：</strong>{item.split('：')[1]}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-green-600 mb-4">🎯 価値観・優先順位</h3>
                <ul className="space-y-2">
                  {typeData.personalityAnalysis.personA.values.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <strong>{item.split('：')[0]}：</strong>{item.split('：')[1]}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-4">🌈 隠れた一面</h3>
                <ul className="space-y-2">
                  {typeData.personalityAnalysis.personA.hidden.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <strong>{item.split('：')[0]}：</strong>{item.split('：')[1]}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-pink-50 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-4">💕 {diagnosticData.names.personB}への気持ち</h3>
                <ul className="space-y-2">
                  {typeData.personalityAnalysis.personA.feelings.map((item, index) => (
                    <li key={index} className="text-gray-700">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 画面11: 二人の相性エピソード */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">📖 二人の相性エピソード 📖</h2>
            <p className="text-center text-gray-600 mb-8">こんな瞬間、相性の良さを実感する💕</p>
            
            <div className="space-y-6">
              {typeData.episodes.map((episode, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-pink-600 mb-4">エピソード{index + 1}：{episode.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{episode.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 画面12: 二人だけの共通言語 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🗣️ 二人だけの共通言語 🗣️</h2>
            <p className="text-center text-gray-600 mb-8">こんな「二人だけのあるある」ない？</p>
            
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <ul className="space-y-3">
                {typeData.commonLanguage.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-pink-500 text-xl">💕</span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <p className="text-gray-700 text-lg">
                こういう「二人だけ」が増えるほど、絆が深まる証拠💕
              </p>
            </div>
          </div>

          {/* 画面13: 周りから見た二人 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">👥 周りから見た二人 👥</h2>
            <p className="text-center text-gray-600 mb-8">友達から見たら、こんな風に見えてるかも</p>
            
            <div className="space-y-6">
              {typeData.othersPerspective.map((perspective, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-pink-600 mb-4">「{perspective.title}」</h3>
                  <p className="text-gray-700 leading-relaxed">{perspective.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 画面14: おすすめデート */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🗓️ このタイプにおすすめデート 🗓️</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <ul className="space-y-4">
                {typeData.recommendedDates.map((date, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-pink-500 text-xl">💕</span>
                    <span className="text-gray-700 text-lg">{date}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <p className="text-gray-700 text-lg">試してみて💕</p>
            </div>
          </div>

          {/* 画面15: 注意点＋アドバイス */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">⚠️ ちょっとだけ注意 ⚠️</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <p className="text-lg text-gray-700 mb-6">{typeData.caution.text}</p>
              
              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-4">🌟 おすすめアクション</h3>
                <ul className="space-y-2">
                  {typeData.caution.actions.map((action, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-pink-500">✨</span>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-lg text-green-700 font-bold">でも基本的には最高の相性！💯</p>
            </div>
          </div>

          {/* 画面16: 未来予測 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🔮 未来予測 🔮</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">{prediction || "あなたたちはこれからも素敵な関係を続けていけるでしょう。"}</p>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <p className="text-lg text-gray-700">この調子で大切にしてね💕</p>
            </div>
          </div>

          {/* 画面17: 称号 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">👑 二人の称号 👑</h2>
            
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-pink-600 mb-4">「{title || "素敵なカップル"}」</div>
              <p className="text-2xl text-gray-700">おめでとう！🎉</p>
            </div>
          </div>

          {/* 画面18: シェア画面 */}
          <div className="mb-12 py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">✨ 診断結果をシェアしよう ✨</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{typeData.icon}</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-2">{diagnosticData.type}</h3>
                <p className="text-xl text-gray-700">相性{diagnosticData.scores.total}%</p>
              </div>
              
              <div className="bg-pink-50 rounded-lg p-4 mb-6">
                <p className="text-lg text-gray-700 mb-2">私たち【{diagnosticData.type}】で相性{diagnosticData.scores.total}%だった💕</p>
                <p className="text-sm text-gray-500">#すきのおと #ココロノオト診断 #相性診断</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                  Xでシェア
                </button>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-colors">
                  Instagramでシェア
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors">
                  LINEで送る
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}