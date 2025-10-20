# システムアーキテクチャ

## 1. 全体アーキテクチャ

### 1.1 アーキテクチャ概要
ミチノワ相性診断アプリは、フロントエンドのみで構成されるSPA（Single Page Application）として設計されています。

```
┌─────────────────────────────────────────┐
│                ユーザー                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Webブラウザ                  │
│  ┌─────────────────────────────────────┐ │
│  │         React SPA                   │ │
│  │  ┌─────────────┐ ┌─────────────────┐ │ │
│  │  │   Pages     │ │   Components    │ │ │
│  │  │             │ │                 │ │ │
│  │  └─────────────┘ └─────────────────┘ │ │
│  │  ┌─────────────┐ ┌─────────────────┐ │ │
│  │  │   Context   │ │     Utils       │ │ │
│  │  │             │ │                 │ │ │
│  │  └─────────────┘ └─────────────────┘ │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 1.2 技術スタック
- **フロントエンド**: React 18.2.0 + TypeScript
- **ルーティング**: React Router DOM
- **状態管理**: Zustand
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **ビルドツール**: Vite

## 2. コンポーネント構成

### 2.1 ページコンポーネント
```
src/pages/
├── TopPage.tsx                    # トップページ
├── HomePage.tsx                   # 相性診断ホーム
├── QuestionPage.tsx               # 質問ページ
├── ResultsPage.tsx                 # 結果ページ
├── CoupleDetailsPage.tsx          # カップル詳細
├── GroupSessionStartPage.tsx      # グループセッション開始
├── GroupParticipantRegistrationPage.tsx # 参加者登録
├── GroupDiagnosisPage.tsx         # グループ診断
├── GroupCompletionWaitingPage.tsx  # 完了待機
├── GroupResultsPage.tsx           # グループ結果
├── DrinkingDetailsPage.tsx        # 酒癖詳細
└── PairDetailsPage.tsx            # ペア詳細
```

### 2.2 共通コンポーネント
```
src/components/
├── DetailedAnalysis.tsx           # 詳細分析コンポーネント
└── FriendComparison.tsx           # 友達比較コンポーネント
```

### 2.3 コンテキスト
```
src/context/
└── AppContext.tsx                 # アプリケーション状態管理
```

## 3. データフロー

### 3.1 状態管理
```typescript
// AppContext.tsx
interface AppState {
  // 相性診断データ
  compatibilityData: CompatibilityData | null
  // グループ診断データ
  groupData: GroupData | null
  // 現在の診断タイプ
  currentDiagnosisType: 'compatibility' | 'drinking'
  // 診断結果
  results: Results | null
}
```

### 3.2 データの流れ
1. **診断開始**: ユーザーが診断を開始
2. **データ入力**: 参加者情報の入力
3. **質問回答**: 質問への回答
4. **結果計算**: 回答に基づく分析
5. **結果表示**: 分析結果の表示

## 4. ルーティング構成

### 4.1 ルート定義
```typescript
// App.tsx
<Routes>
  {/* トップページ */}
  <Route path="/" element={<TopPage />} />
  
  {/* 相性診断のルート */}
  <Route path="/compatibility" element={<HomePage />} />
  <Route path="/questions" element={<QuestionPage />} />
  <Route path="/results" element={<ResultsPage />} />
  <Route path="/couple-details" element={<CoupleDetailsPage />} />
  
  {/* 酒の場診断のルート */}
  <Route path="/group-session-start" element={<GroupSessionStartPage />} />
  <Route path="/group-participant-registration" element={<GroupParticipantRegistrationPage />} />
  <Route path="/group-diagnosis" element={<GroupDiagnosisPage />} />
  <Route path="/group-completion-waiting" element={<GroupCompletionWaitingPage />} />
  <Route path="/group-results" element={<GroupResultsPage />} />
  <Route path="/drinking-details" element={<DrinkingDetailsPage />} />
  <Route path="/pair-details" element={<PairDetailsPage />} />
</Routes>
```

### 4.2 ナビゲーションフロー
```
トップページ
├── 相性診断
│   ├── 診断開始
│   ├── 質問回答
│   ├── 結果表示
│   └── 詳細分析
└── 酒癖マッチング
    ├── グループセッション開始
    ├── 参加者登録
    ├── グループ診断
    ├── 完了待機
    ├── グループ結果
    └── 詳細分析
```

## 5. データ管理

### 5.1 データ構造
```typescript
// 相性診断データ
interface CompatibilityData {
  participants: Participant[]
  questions: Question[]
  answers: Answer[]
  results: CompatibilityResults
}

// グループ診断データ
interface GroupData {
  sessionId: string
  participants: Participant[]
  questions: Question[]
  answers: Answer[]
  results: GroupResults
}
```

### 5.2 データ永続化
- **ローカルストレージ**: ブラウザのローカルストレージを使用
- **セッション管理**: 一時的なセッションデータの管理
- **データ同期**: リアルタイムでのデータ同期

## 6. 計算ロジック

### 6.1 相性計算
```typescript
// 相性計算の種類
- combination16TypeSystem.ts      # 16タイプ組み合わせシステム
- compatibilityCalculator.ts     # 基本相性計算
- compatibilityMatrixCalculator.ts # 相性マトリックス計算
- groupCompatibilityCalculator.ts # グループ相性計算
- psychologyCompatibilityCalculator.ts # 心理学相性計算
- simpleCompatibilityCalculator.ts # 簡易相性計算
```

### 6.2 酒癖分析
```typescript
// 酒癖分析の種類
- drinkingCalculator.ts          # 酒癖計算
- twentyTypeCalculator.ts        # 20タイプ計算
- dynamicTypeSystem.ts           # 動的タイプシステム
- forcedChoiceTypeSystem.ts      # 強制選択タイプシステム
- precalculatedTypeSystem.ts     # 事前計算タイプシステム
- ultraFastTypeSystem.ts         # 超高速タイプシステム
```

## 7. パフォーマンス最適化

### 7.1 コード分割
- **ページ単位**: 各ページを独立したコンポーネントとして実装
- **遅延読み込み**: 必要時のみコンポーネントを読み込み
- **バンドル最適化**: Viteによる最適化されたバンドル

### 7.2 メモリ管理
- **状態のクリーンアップ**: 不要な状態の削除
- **イベントリスナーの削除**: メモリリークの防止
- **ガベージコレクション**: 効率的なメモリ使用

## 8. セキュリティ考慮事項

### 8.1 クライアントサイドセキュリティ
- **入力検証**: クライアントサイドでの入力検証
- **XSS対策**: 適切なエスケープ処理
- **CSRF対策**: トークンベースの保護

### 8.2 データ保護
- **個人情報**: 最小限の個人情報収集
- **データ暗号化**: 機密データの暗号化
- **セキュア通信**: HTTPS通信の強制

## 9. 将来の拡張性

### 9.1 バックエンド統合
- **API設計**: RESTful APIの設計
- **認証システム**: ユーザー認証の実装
- **データベース**: 永続化データの管理

### 9.2 機能拡張
- **リアルタイム通信**: WebSocketによるリアルタイム通信
- **プッシュ通知**: ブラウザ通知の実装
- **オフライン機能**: PWA対応

---

**作成日**: 2024年12月19日  
**バージョン**: 1.0  
**関連ドキュメント**: [requirements.md](./requirements.md), [functional-requirements.md](./functional-requirements.md)
