# ミチノワ - 相性診断アプリ

あなたの「道」を見つける相性診断アプリです。恋愛・友達関係の相性診断と、飲み会での酒癖マッチングを提供します。

## 機能

### 相性診断
- 恋愛・友達関係の相性を分析
- 心理学理論に基づいた20タイプ分析
- 具体的な関係性のアドバイス
- デートアイデアやコミュニケーションのコツ

### 酒癖マッチング
- 科学的根拠に基づく6つの酒癖タイプ
- 飲み会での相性と恋愛の可能性
- 神経科学・心理学に基づく分析
- おすすめ活動やコミュニケーションのコツ

## 技術スタック

- **フロントエンド**: React + TypeScript
- **スタイリング**: Tailwind CSS
- **ルーティング**: React Router
- **アイコン**: Lucide React

## セットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/michinowa.git
cd michinowa
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm run dev
```

4. ブラウザで `http://localhost:3000` にアクセス

## プロジェクト構造

```
src/
├── components/          # 再利用可能なコンポーネント
├── pages/              # ページコンポーネント
│   ├── TopPage.tsx     # トップページ
│   ├── HomePage.tsx    # 相性診断ホーム
│   ├── DrinkingHomePage.tsx  # 酒癖マッチングホーム
│   └── ...
├── data/               # データファイル
│   ├── drinkingQuestions.ts
│   ├── drinkingAnalysisData.ts
│   └── ...
├── utils/              # ユーティリティ関数
├── context/            # React Context
└── types/              # TypeScript型定義
```

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 連絡先

プロジェクトに関する質問や提案があれば、お気軽にお声がけください。