import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'

export function PairDetailsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { state } = useApp()

  // パラメータから参加者情報を取得
  const maleName = searchParams.get('maleName') || '太郎'
  const femaleName = searchParams.get('femaleName') || '花子'

  // サンプルデータ（実際の診断結果に置き換え）
  const diagnosticData = {
    type: "ハニームーン型",
    names: {
      personA: maleName,
      personB: femaleName
    },
    relationship: "付き合ってる",
    period: "3ヶ月〜1年未満",
    scores: {
      total: 94,
      values: 89,
      conversation: 97,
      healing: 92,
      excitement: 78,
      future: 91
    }
  }

    return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
          {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
            <button
            onClick={() => navigate('/kokoro-results')}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
            >
            ← 戻る
            </button>
          <h1 className="text-2xl font-bold text-pink-600">💕 ココロノオト</h1>
          <div className="w-20"></div>
          </div>

        {/* メインコンテンツ - 全18画面を1ページに統合 */}
        <div className="space-y-8">
          {/* 画面1: イントロ演出 */}
          <div className="text-center py-8">
            <div className="text-6xl mb-6 animate-bounce">✨</div>
            <h1 className="text-4xl font-bold text-pink-600 mb-4">診断結果が出ました</h1>
            <div className="text-6xl mb-6 animate-bounce">✨</div>
            <p className="text-xl text-gray-700">あなたたちは...</p>
          </div>

          {/* 画面2: タイプ名発表＋レア度 */}
          <div className="text-center py-8">
            <div className="text-6xl mb-6">🎀</div>
            <h1 className="text-5xl font-bold text-pink-600 mb-4">ハニームーン型</h1>
            <p className="text-2xl text-gray-700 mb-6">「永遠の新婚カップル」</p>
            
            <div className="bg-pink-50 rounded-2xl p-6 mb-8">
              <p className="text-lg font-semibold text-gray-600 mb-2">このタイプは全体の6%！</p>
              <div className="inline-block px-6 py-3 bg-yellow-100 text-yellow-800 rounded-full font-bold text-lg">
                ランク：SS級
              </div>
            </div>
          </div>

          {/* 画面3: 相性スコア表示 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💕 総合相性度 💕</h2>
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-pink-600 mb-4">{diagnosticData.scores.total}%</div>
              <p className="text-lg text-gray-600">全カップル中 上位5%！</p>
              </div>
              
            <div className="space-y-4">
              <ScoreBar label="❤️ 価値観マッチ度" score={diagnosticData.scores.values} color="bg-pink-500" />
              <ScoreBar label="💛 会話の相性" score={diagnosticData.scores.conversation} color="bg-yellow-500" />
              <ScoreBar label="💙 癒し度" score={diagnosticData.scores.healing} color="bg-blue-500" />
              <ScoreBar label="💚 刺激度" score={diagnosticData.scores.excitement} color="bg-green-500" />
              <ScoreBar label="💜 将来性" score={diagnosticData.scores.future} color="bg-purple-500" />
              </div>
          </div>

          {/* 画面4: 関係性の説明 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🌸 あなたたちの関係性 🌸</h2>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                まるで少女漫画から飛び出してきたような、周りが羨むほど甘々なカップル。一緒にいるだけで世界が輝いて見えて、離れてる時間すら愛おしく感じるタイプ。
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                「好き」を言葉でも態度でも表現し合えるから、愛情を疑うことがほとんどない。二人でいる時間が何より幸せで、デートの予定を立ててる時からワクワクが止まらない。些細なことでも「可愛い」「好き」って素直に伝え合える関係。
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                お互いの存在が心の支えになっていて、一緒にいるだけで自然と笑顔になれる。この愛情を大切にすれば、10年後も20年後も、ずっと笑い合ってる未来が見える。
              </p>
            </div>
          </div>

          {/* 画面5: お互いが惹かれ合う理由 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💕 お互いが惹かれ合う理由 💕</h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-pink-600 mb-4">【{diagnosticData.names.personB}が{diagnosticData.names.personA}に惹かれる理由】</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">🌟 外見・雰囲気</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・笑顔が素敵で、見てるだけで癒される</li>
                      <li>・雰囲気が柔らかくて、話しかけやすい</li>
                      <li>・ファッションセンスが好み</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">💬 性格・内面</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・優しくて思いやりがある</li>
                      <li>・話してると楽しくて時間を忘れる</li>
                      <li>・自分のことを理解しようとしてくれる</li>
                      <li>・一緒にいると居心地がいい</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">🎯 行動・態度</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・細かいことに気づいてくれる</li>
                      <li>・困った時に助けてくれる</li>
                      <li>・自分の話を真剣に聞いてくれる</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">💕 特別な魅力</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・他の人とは違う特別さを感じる</li>
                      <li>・一緒にいると自分らしくいられる</li>
                      <li>・この人となら未来を考えられる</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-pink-600 mb-4">【{diagnosticData.names.personA}が{diagnosticData.names.personB}に惹かれる理由】</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">🌟 外見・雰囲気</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・可愛らしい笑顔に心を奪われる</li>
                      <li>・上品で落ち着いた雰囲気</li>
                      <li>・自然体でいる姿が魅力的</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">💬 性格・内面</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・純粋で素直な性格</li>
                      <li>・一緒にいると心が安らぐ</li>
                      <li>・優しさと思いやりが溢れている</li>
                      <li>・話を聞いてくれる安心感</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">🎯 行動・態度</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・細やかな気配りが嬉しい</li>
                      <li>・困った時に支えてくれる</li>
                      <li>・素直に愛情を表現してくれる</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">💕 特別な魅力</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>・この人といると自然体でいられる</li>
                      <li>・一緒にいると毎日が特別に感じる</li>
                      <li>・この人となら幸せな未来が見える</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 画面6: きゅんポイントTOP10 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">✨ 相手をきゅんとさせる方法TOP10 ✨</h2>
            
            <div className="space-y-4">
              {[
                { rank: 1, action: "何気ない瞬間に「好き」って言う 💕", detail: "デート中じゃなくて、普通に過ごしてる時に言われるとドキッとする。サラッと言うのがコツ。" },
                { rank: 2, action: "急に手を繋いだり抱きしめたり", detail: "予告なしのスキンシップが一番ドキドキする。タイミングが重要。" },
                { rank: 3, action: "相手の好きなものを覚えてる", detail: "小さな好みまで覚えてると「見ててくれてる」って感じて嬉しい。" },
                { rank: 4, action: "デートのサプライズを用意する", detail: "予想外のサプライズは記憶に残る。小さなことでも十分。" },
                { rank: 5, action: "LINEの返信が早くて既読スルーしない", detail: "返信の速さで愛情の深さを感じる。忙しくても一言は返す。" },
                { rank: 6, action: "困った時に助けてくれる", detail: "頼れる存在だと感じる瞬間。普段の優しさが一番。" },
                { rank: 7, action: "一緒にいても一人の時間を尊重する", detail: "束縛しない距離感が心地いい。信頼関係の証拠。" },
                { rank: 8, action: "相手の話を真剣に聞く", detail: "話を聞いてくれる安心感。相槌や反応が大切。" },
                { rank: 9, action: "記念日を覚えてお祝いしてくれる", detail: "特別な日を大切にしてくれると嬉しい。小さなことでも。" },
                { rank: 10, action: "一緒にいても自然体でいられる", detail: "無理をしなくていい関係性。これが一番の魅力。" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-pink-600">{item.rank}位</span>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800 mb-2">{item.action}</p>
                      <p className="text-gray-600">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">💡 ワンポイントアドバイス</h3>
              <p className="text-yellow-700">このタイプは愛情確認が大事！ こまめに「好き」を伝えるとGOOD💕</p>
            </div>
          </div>

          {/* 画面7: 相性が良い理由 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🔍 なんで相性いいの？ 🔍</h2>
            
            <div className="space-y-4">
              {[
                { reason: "価値観が驚くほど一致", detail: "二人が大切にしてることや、人生で優先したいことが似てる。だから将来の話をしても「わかる！」って共感できる。方向性が同じだから、一緒に歩んでいきやすい関係。" },
                { reason: "愛情表現の仕方が似てる", detail: "お互いが「好き」を伝える方法が似てるから、愛情を疑うことがない。言葉でも行動でも、お互いの愛情表現を理解し合える。" },
                { reason: "一緒の時間を大切にしたい気持ちが一致", detail: "二人でいる時間を何より大切に思ってるから、自然と距離が縮まる。お互いの存在を心から愛おしく感じられる。" },
                { reason: "スキンシップの距離感がぴったり", detail: "手を繋ぐ、抱きしめる、キスする...お互いのスキンシップの好みが似てるから、心地いい関係を築ける。" },
                { reason: "将来のビジョンが同じ方向を向いてる", detail: "結婚観、家族観、人生観が似てるから、一緒に未来を描きやすい。お互いの夢を応援し合える関係。" },
                { reason: "喧嘩してもすぐ仲直りできる性格", detail: "お互いが素直で、謝ることを恥ずかしがらない。だから小さな喧嘩も関係を深めるきっかけになる。" },
                { reason: "お互いのペースを尊重し合える", detail: "急がせたり、束縛したりしない。お互いのペースを理解して、自然体でいられる関係を築けている。" },
                { reason: "共通の趣味や話題が多い", detail: "話が合うし、一緒にいて楽しい。共通点が多いから、デートの選択肢も豊富で飽きない。" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✅</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{item.reason}</h3>
                      <p className="text-gray-700">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 画面8: 隠れた共通点 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🎁 隠れた共通点発見！ 🎁</h2>
            
            <p className="text-center text-lg text-gray-700 mb-6">実は二人とも...</p>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>恋愛体質で愛情深い</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>寂しがり屋な一面がある</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>記念日やイベントを大切にしたい</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>スキンシップで愛を確認したいタイプ</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>ロマンチックなことが好き</span>
                  </li>
              </ul>
            </div>
          </div>

          {/* 画面9: 相性が良いシチュエーション */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💫 特に相性バツグンな時 💫</h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">✨</span>
                  <span>二人きりでまったりしてる時間</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">✨</span>
                  <span>デートで手を繋いで歩いてる時</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">✨</span>
                  <span>お互いの好きなものをシェアしてる時</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">✨</span>
                  <span>夜遅くまで電話やLINEしてる時</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">✨</span>
                  <span>記念日を一緒に祝ってる時</span>
                  </li>
              </ul>
            </div>
          </div>

          {/* 画面10-A: {名前A}の性格分析 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">📝 {diagnosticData.names.personA}の性格を深掘り分析 📝</h2>
            <p className="text-center text-lg text-gray-600 mb-8">{diagnosticData.names.personB}から見た{diagnosticData.names.personA}はこんな人💕</p>
            
            <div className="space-y-6">
              <AnalysisSection 
                title="🌟 基本性格" 
                items={[
                  "第一印象：明るくて話しやすい雰囲気",
                  "本質：実は繊細で思慮深い",
                  "エネルギー源：人と話すことで元気になる",
                  "ストレス反応：一人になりたがる",
                  "モチベーション：認められることがやる気になる"
                ]} 
              />
              
              <AnalysisSection 
                title="💬 コミュニケーションスタイル" 
                items={[
                  "話し方の特徴：はっきり意見を言うタイプ",
                  "聞き方の特徴：相槌打ちながらしっかり聞く",
                  "感情表現：顔に出やすい素直な性格",
                  "本音の伝え方：遠回しにせず直接伝える",
                  "LINEの傾向：既読即レス、スタンプ多め"
                ]} 
              />
              
              <AnalysisSection 
                title="❤️ 恋愛スタイル" 
                items={[
                  "好きな人への態度：積極的にアプローチする",
                  "愛情表現の仕方：言葉でストレートに伝える",
                  "スキンシップ：スキンシップ大好き",
                  "記念日への考え方：記念日を大切にするタイプ",
                  "束縛度：適度に繋がりたい程度",
                  "喧嘩の時：すぐ謝って仲直りしたい"
                ]} 
              />
              
              <AnalysisSection 
                title="🎯 価値観・優先順位" 
                items={[
                  "大切にしてること：人との繋がりを何より大切に",
                  "将来のビジョン：楽しく笑い合える日々を",
                  "お金の使い方：経験や思い出にお金をかける",
                  "時間の使い方：大切な人との時間を優先"
                ]} 
              />
              
              <AnalysisSection 
                title="🌈 隠れた一面" 
                items={[
                  "意外な趣味：実は読書が好き",
                  "隠れた才能：料理が意外と上手",
                  "コンプレックス：人見知りな一面を気にしてる",
                  "理想の自分：もっと自信を持ちたい"
                ]} 
              />
              
              <div className="bg-pink-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-pink-600 mb-4">💕 {diagnosticData.names.personB}への気持ち</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>・一緒にいると安心できる存在</li>
                  <li>・素の自分でいられる</li>
                  <li>・たくさん話を聞いてほしい</li>
                  <li>・褒めてくれると嬉しい</li>
                  <li>・無視されるのは辛い</li>
                </ul>
              </div>
            </div>
              </div>
              
          {/* 画面10-B: {名前B}の性格分析 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">📝 {diagnosticData.names.personB}の性格を深掘り分析 📝</h2>
            <p className="text-center text-lg text-gray-600 mb-8">{diagnosticData.names.personA}から見た{diagnosticData.names.personB}はこんな人💕</p>
            
            <div className="space-y-6">
              <AnalysisSection 
                title="🌟 基本性格" 
                items={[
                  "第一印象：可愛らしくて親しみやすい",
                  "本質：実は芯が強くて意思がはっきりしてる",
                  "エネルギー源：大切な人との時間で元気になる",
                  "ストレス反応：一人の時間を求める",
                  "モチベーション：愛されることがやる気になる"
                ]} 
              />
              
              <AnalysisSection 
                title="💬 コミュニケーションスタイル" 
                items={[
                  "話し方の特徴：優しくて聞き取りやすい声",
                  "聞き方の特徴：相手の目を見て真剣に聞く",
                  "感情表現：表情豊かで素直",
                  "本音の伝え方：時々遠回しに伝えることも",
                  "LINEの傾向：絵文字多め、返信は丁寧"
                ]} 
              />
              
              <AnalysisSection 
                title="❤️ 恋愛スタイル" 
                items={[
                  "好きな人への態度：控えめだけど愛情深い",
                  "愛情表現の仕方：行動で示すことが多い",
                  "スキンシップ：適度なスキンシップが好き",
                  "記念日への考え方：特別な日を大切にする",
                  "束縛度：お互いの自由を尊重したい",
                  "喧嘩の時：冷静になってから話し合いたい"
                ]} 
              />
              
              <AnalysisSection 
                title="🎯 価値観・優先順位" 
                items={[
                  "大切にしてること：平和で穏やかな関係",
                  "将来のビジョン：お互いを支え合える関係",
                  "お金の使い方：質より量、長く使えるものを",
                  "時間の使い方：ゆっくり過ごす時間を大切に"
                ]} 
              />
              
              <AnalysisSection 
                title="🌈 隠れた一面" 
                items={[
                  "意外な趣味：実は映画鑑賞が好き",
                  "隠れた才能：手芸や工作が得意",
                  "コンプレックス：完璧主義な一面を気にしてる",
                  "理想の自分：もっと積極的になりたい"
                ]} 
              />
              
              <div className="bg-pink-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-pink-600 mb-4">💕 {diagnosticData.names.personA}への気持ち</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>・一緒にいると心が満たされる</li>
                  <li>・自然体でいられる</li>
                  <li>・守ってくれる安心感</li>
                  <li>・褒められると嬉しい</li>
                  <li>・寂しがり屋な一面がある</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 画面11: 二人の相性エピソード */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">📖 二人の相性エピソード 📖</h2>
            <p className="text-center text-lg text-gray-600 mb-8">こんな瞬間、相性の良さを実感する💕</p>
            
            <div className="space-y-6">
              <EpisodeCard 
                title="エピソード1：会話編" 
                content="初めて会った時から話が止まらなくて、気づいたら3時間も経ってた。お互いの話を真剣に聞いてくれて、共感ポイントが多すぎて「わかる！」って連発。会話のテンポもぴったり合って、自然と笑い合える関係。" 
              />
              
              <EpisodeCard 
                title="エピソード2：デート編" 
                content="デートの計画を立てる時も、お互いの好みが似てて「そこ行きたい！」「それ食べたい！」って同じことを言う。予定を立ててる時からワクワクが止まらない。実際のデートでも、二人とも同じタイミングで「楽しい」って言う。" 
              />
              
              <EpisodeCard 
                title="エピソード3：日常編" 
                content="LINEの返信も、お互いが同じようなテンションで返してて、絵文字の使い方も似てる。何気ない日常の会話でも、お互いの話を覚えてて「あの時言ってたやつ」って言い合える。小さなことでも共感し合える。" 
              />
              
              <EpisodeCard 
                title="エピソード4：喧嘩編" 
                content="たまに意見が合わなくて喧嘩することもあるけど、お互いが素直で謝ることを恥ずかしがらない。喧嘩の後は、かえって関係が深まって「もっと理解し合おう」って思える。喧嘩も関係を深めるきっかけになってる。" 
              />
            </div>
          </div>

          {/* 画面12: 二人だけの共通言語 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🗣️ 二人だけの共通言語 🗣️</h2>
            <p className="text-center text-lg text-gray-600 mb-8">こんな「二人だけのあるある」ない？</p>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>同じタイミングで同じこと言う</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>「あれ」だけで通じる</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>目を見ただけで考えてることわかる</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>二人だけの合言葉がある</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>特定の絵文字に特別な意味がある</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>「いつものやつ」で通じる</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>LINEのテンションが似てる</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>笑いのツボが一緒</span>
                  </li>
              </ul>
            </div>
            
            <p className="text-center text-lg text-gray-700 mt-6">
                こういう「二人だけ」が増えるほど、絆が深まる証拠💕
              </p>
          </div>

          {/* 画面13: 周りから見た二人 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">👥 周りから見た二人 👥</h2>
            <p className="text-center text-lg text-gray-600 mb-8">友達から見たら、こんな風に見えてるかも</p>
            
            <div className="space-y-6">
              <PerspectiveCard 
                title="「見てて幸せになる」" 
                content="二人が一緒にいると、周りも自然と笑顔になる。お互いを大切にしてる様子が伝わってきて、見てるだけで幸せな気持ちになる。こんな関係性に憧れる。" 
              />
              
              <PerspectiveCard 
                title="「お似合いすぎ」" 
                content="雰囲気も話し方も、どこか似てる感じがする。一緒にいても違和感がなくて、自然体でいられる関係。きっと運命の出会いだったんだろうなって思う。" 
              />
              
              <PerspectiveCard 
                title="「羨ましい」" 
                content="こんなに仲良くて、お互いを大切にしてる関係が羨ましい。自分もこんな関係を築きたいって思う。理想のカップル像そのもの。" 
              />
            </div>
          </div>

          {/* 画面14: おすすめデート */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🗓️ このタイプにおすすめデート 🗓️</h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>夜景の綺麗なレストランでディナー</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>お揃いのアイテムを買いに行く</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>水族館や動物園でまったりデート</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>おうちで映画鑑賞＆まったり</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">💕</span>
                  <span>記念日にサプライズプレゼント交換</span>
                  </li>
              </ul>
            </div>
            
            <p className="text-center text-lg text-gray-700 mt-6">試してみて💕</p>
          </div>

          {/* 画面15: 注意点＋アドバイス */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">⚠️ ちょっとだけ注意 ⚠️</h2>
            
            <div className="bg-yellow-50 rounded-2xl p-6">
              <p className="text-lg text-gray-700 mb-6">
                二人の世界が完璧すぎて、たまにマンネリ化しちゃうかも。甘々な関係は最高だけど、刺激や新鮮さも時々必要。
              </p>
              
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">🌟 おすすめアクション</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>・たまには新しい場所にデートしてみる</li>
                  <li>・友達とも適度に遊ぶ時間を作る</li>
                  <li>・サプライズで予想外の刺激をプラス</li>
                </ul>
              </div>
            </div>
            
            <p className="text-center text-lg font-bold text-pink-600 mt-6">でも基本的には最高の相性！💯</p>
          </div>

          {/* 画面16: 未来予測 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🔮 1年後の二人 🔮</h2>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                今よりもっと絆が深まって、結婚を意識し始めるかも。周りからも「理想のカップルだね」って言われてそう。
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                お互いの家族とも仲良くなって、自然と将来の話が出てくる関係。この愛情を大切にすれば、10年後も20年後も、ずっと笑い合ってる未来が見える。
              </p>
              
              <p className="text-center text-lg font-bold text-pink-600">この調子で大切にしてね💕</p>
            </div>
          </div>

          {/* 画面17: 称号 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">👑 二人の称号 👑</h2>
            
            <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-8 text-center">
              <div className="text-4xl font-bold text-pink-600 mb-4">「永遠のハニームーンカップル」</div>
              <p className="text-2xl text-gray-800">おめでとう！🎉</p>
            </div>
          </div>

          {/* 画面18: シェア画面 */}
          <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">✨ 診断結果をシェアしよう ✨</h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="text-6xl mb-4">🎀</div>
              <h3 className="text-2xl font-bold text-pink-600 mb-2">ハニームーン型</h3>
              <p className="text-xl text-gray-700 mb-4">相性{diagnosticData.scores.total}%</p>
              
              <div className="bg-pink-50 rounded-lg p-4 mb-6">
                <p className="text-lg text-gray-700 mb-2">私たち【ハニームーン型】で相性{diagnosticData.scores.total}%だった💕</p>
                <p className="text-sm text-gray-500">#すきのおと #ココロノオト診断 #相性診断</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button className="bg-blue-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                  🐦 Xでシェア
                </button>
                <button className="bg-pink-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-pink-600 transition-colors">
                  📸 Instagramでシェア
                </button>
                <button className="bg-green-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-green-600 transition-colors">
                  📱 LINEで送る
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/kokoro-results')}
                className="w-full py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// コンポーネント
function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold">{label}：{score}%</span>
      <div className="w-40 flex items-center gap-2">
        <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-4 ${color} transition-all duration-1000`} style={{ width: `${score}%` }} />
        </div>
        <span className="text-sm text-gray-500">{'▰'.repeat(Math.floor(score/20))}{'▱'.repeat(5-Math.floor(score/20))}</span>
      </div>
    </div>
  )
}

function AnalysisSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-700">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-pink-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function EpisodeCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-pink-600 mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  )
}

function PerspectiveCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-pink-600 mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  )
}