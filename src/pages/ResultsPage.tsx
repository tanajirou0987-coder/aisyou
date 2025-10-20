import React from 'react'
import { PageLayout } from '../layouts/PageLayout'

export function ResultsPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto p-4 space-y-8">
        {/* ヘッダー（タイプ名・説明・ランク） */}
        <div className="text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-pink-300">
            <div className="text-4xl mb-4">🎀</div>
            <h2 className="text-4xl font-bold text-[#FF1493] mb-2">ハニームーン型</h2>
            <p className="text-xl text-gray-700 mb-4">「永遠の新婚カップル」</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-semibold text-gray-600">このタイプは全体の8%！</span>
            </div>
            <div className="mt-2">
              <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                ランク：SS級
              </span>
            </div>
          </div>
        </div>

        {/* 【画面3】相性スコア */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面3】相性スコア</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">💕 総合相性度：94% 💕</h3>
          <div className="space-y-4">
            <Metric label="❤️ 価値観マッチ度" score={89} color="bg-pink-500" bar="▰▰▰▰▰▱" />
            <Metric label="💛 会話の相性" score={97} color="bg-yellow-500" bar="▰▰▰▰▰▰" />
            <Metric label="💙 癒し度" score={92} color="bg-blue-500" bar="▰▰▰▰▰▱" />
            <Metric label="💚 刺激度" score={78} color="bg-green-500" bar="▰▰▰▰▱▱" />
            <Metric label="💜 将来性" score={91} color="bg-purple-500" bar="▰▰▰▰▰▱" />
          </div>
          <div className="text-center mt-6">
            <span className="text-lg font-bold text-pink-600">全カップル中 上位5%！</span>
          </div>
        </div>

        {/* 【画面4】関係性の説明 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面4】関係性の説明</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🌸 あなたたちの関係性 🌸</h3>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
まるで少女漫画から飛び出してきたような、周りが羨むほど甘々なカップル。一緒にいるだけで世界が輝いて見えて、離れてる時間すら愛おしく感じるタイプ。

「好き」を言葉でも態度でも表現し合えるから、愛情を疑うことがほとんどない。二人でいる時間が何より幸せで、デートの予定を立ててる時からワクワクが止まらない。些細なことでも「可愛い」「好き」って素直に伝え合える関係。
          </p>
        </div>

        {/* 【画面5】お互いの魅力 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面5】お互いの魅力</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">💕 お互いから見た魅力 💕</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-pink-600 mb-4">【相手から見たあなた】</h4>
              <ul className="space-y-2 text-gray-700">
                <li>・一緒にいると心が満たされる存在</li>
                <li>・笑顔が本当に可愛い</li>
                <li>・細かいことに気づいてくれる優しさ</li>
                <li>・素直に愛情を表現してくれる</li>
                <li>・話を聞いてくれる安心感</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-pink-600 mb-4">【あなたから見た相手】</h4>
              <ul className="space-y-2 text-gray-700">
                <li>・安心感がハンパない</li>
                <li>・何でも受け止めてくれる包容力</li>
                <li>・二人の時間を大切にしてくれる</li>
                <li>・愛情表現が豊かで嬉しい</li>
                <li>・自分のことを一番に考えてくれる</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 【画面6】きゅんポイント */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面6】きゅんポイント</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">✨ 相手をきゅんとさせる方法TOP5 ✨</h3>
          <ol className="list-decimal ml-6 text-gray-700 space-y-1">
            <li>何気ない瞬間に「好き」って言う 💕</li>
            <li>急に手を繋いだり抱きしめたり</li>
            <li>相手の好きなものを覚えてる</li>
            <li>デートのサプライズを用意する</li>
            <li>LINEの返信が早くて既読スルーしない</li>
          </ol>
          <div className="mt-4 p-4 rounded-xl bg-yellow-50 text-yellow-800 font-semibold">
            💡 ワンポイントアドバイス<br />このタイプは愛情確認が大事！ こまめに「好き」を伝えるとGOOD💕
          </div>
        </div>

        {/* 【画面7】相性の理由 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面7】相性の理由</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🔍 なんで相性いいの？ 🔍</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ 愛情表現の仕方が似てる</li>
            <li>✅ 一緒の時間を大切にしたい気持ちが一致</li>
            <li>✅ スキンシップの距離感がぴったり</li>
            <li>✅ 将来のビジョンが同じ方向を向いてる</li>
            <li>✅ 喧嘩してもすぐ仲直りできる性格</li>
          </ul>
        </div>

        {/* 【画面8】隠れた共通点 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面8】隠れた共通点</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🎁 隠れた共通点発見！ 🎁</h3>
          <ul className="space-y-2 text-gray-700">
            <li>実は二人とも...</li>
            <li>・恋愛体質で愛情深い</li>
            <li>・寂しがり屋な一面がある</li>
            <li>・記念日やイベントを大切にしたい</li>
            <li>・スキンシップで愛を確認したいタイプ</li>
            <li>・ロマンチックなことが好き</li>
          </ul>
        </div>

        {/* 【画面9】相性が良いシチュエーション */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面9】相性が良いシチュエーション</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">💫 特に相性バツグンな時 💫</h3>
          <ul className="space-y-2 text-gray-700">
            <li>・二人きりでまったりしてる時間</li>
            <li>・デートで手を繋いで歩いてる時</li>
            <li>・お互いの好きなものをシェアしてる時</li>
            <li>・夜遅くまで電話やLINEしてる時</li>
            <li>・記念日を一緒に祝ってる時</li>
          </ul>
        </div>

        {/* 【画面10】相手の性格分析 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面10】相手の性格分析</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 相手の性格プチ分析 📝</h3>
          <div className="text-gray-700 whitespace-pre-line">
【あなたの相手はこんな人】
・基本的に愛情深くて優しい性格
・感情表現がストレートで素直
・記念日を大事にするロマンチスト
・二人の時間を最優先してくれる
・ちょっと独占欲が強めかも？
・でもそれも愛情の裏返し💕

当たってる？😊
          </div>
        </div>

        {/* 【画面11】おすすめデート */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面11】おすすめデート</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🗓️ このタイプにおすすめデート 🗓️</h3>
          <ul className="space-y-2 text-gray-700">
            <li>・夜景の綺麗なレストランでディナー</li>
            <li>・お揃いのアイテムを買いに行く</li>
            <li>・水族館や動物園でまったりデート</li>
            <li>・おうちで映画鑑賞＆まったり</li>
            <li>・記念日にサプライズプレゼント交換</li>
          </ul>
          <div className="text-center text-gray-700 mt-3">試してみて💕</div>
        </div>

        {/* 【画面12】注意点 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面12】注意点</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">⚠️ ちょっとだけ注意 ⚠️</h3>
          <p className="text-gray-700 whitespace-pre-line">
二人の世界が完璧すぎて、たまにマンネリ化しちゃうかも。甘々な関係は最高だけど、刺激や新鮮さも時々必要。

🌟 おすすめアクション
・たまには新しい場所にデートしてみる
・友達とも適度に遊ぶ時間を作る
・サプライズで予想外の刺激をプラス

でも基本的には最高の相性！💯
          </p>
        </div>

        {/* 【画面13】未来予測 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面13】未来予測</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🔮 1年後の二人 🔮</h3>
          <p className="text-gray-700 whitespace-pre-line">
今よりもっと絆が深まって、結婚を意識し始めるかも。周りからも「理想のカップルだね」って言われてそう。

お互いの家族とも仲良くなって、自然と将来の話が出てくる関係。この愛情を大切にすれば、10年後も20年後も、ずっと笑い合ってる未来が見える。

この調子で大切にしてね💕
          </p>
        </div>

        {/* 【画面14】称号 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="text-center text-sm text-gray-500 mb-2">【画面14】称号</div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">👑 二人の称号 👑</h3>
          <div className="text-center text-xl font-bold text-pink-600">「永遠のハニームーンカップル」</div>
          <div className="text-center text-gray-800 mt-2">おめでとう！🎉</div>
        </div>
      </div>
    </PageLayout>
  )
}

function Metric({ label, score, color, bar }: { label: string; score: number; color: string; bar: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold">{label}：{score}%</span>
      <div className="w-40 flex items-center gap-2">
        <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-4 ${color}`} style={{ width: `${score}%` }} />
        </div>
        <span className="text-sm text-gray-500">{bar}</span>
      </div>
    </div>
  )
}


