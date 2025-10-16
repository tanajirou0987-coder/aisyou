# 🔥 Firebase設定手順書

## 📋 概要
複数端末同時診断機能を動かすために、Firebase Realtime Databaseを設定します。

---

## 🚀 Step 1: Firebaseプロジェクトの作成

### 1-1. Firebaseコンソールにアクセス
```
https://console.firebase.google.com/
```

### 1-2. 新しいプロジェクトを作成
1. 「プロジェクトを追加」をクリック
2. プロジェクト名を入力（例：`sake-matching-app`）
3. Google Analyticsは**不要**（オフにしてOK）
4. 「プロジェクトを作成」をクリック

---

## 🗄️ Step 2: Realtime Databaseを有効化

### 2-1. Realtime Databaseを作成
1. 左メニューから「構築」→「Realtime Database」をクリック
2. 「データベースを作成」をクリック
3. ロケーションを選択: **asia-southeast1（シンガポール）** ← 日本に近い
4. セキュリティルール: **テストモードで開始** を選択
5. 「有効にする」をクリック

### 2-2. セキュリティルールの設定（重要！）
テストモードは30日間のみ有効なので、以下のルールに変更：

```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt", "status"]
      }
    }
  }
}
```

**説明**:
- セッションIDごとに読み書き可能
- 古いデータの検索を高速化（indexOn）
- 24時間後に自動削除（後述）

---

## 🔐 Step 3: Webアプリの追加

### 3-1. Webアプリを追加
1. プロジェクトのトップページに戻る
2. 「</>」（Webアイコン）をクリック
3. アプリのニックネーム: `sake-matching-web`
4. 「Firebase Hostingも設定する」は**チェックしない**
5. 「アプリを登録」をクリック

### 3-2. 設定情報をコピー
以下のような設定情報が表示されます：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "sake-matching-app.firebaseapp.com",
  databaseURL: "https://sake-matching-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sake-matching-app",
  storageBucket: "sake-matching-app.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789abcdef"
};
```

**⚠️ この情報は後で使うのでメモ帳にコピーしておいてください！**

---

## 📝 Step 4: プロジェクトに設定を反映

### 4-1. firebase.tsファイルを編集
`src/config/firebase.ts`を開いて、Step 3-2でコピーした情報を貼り付け：

```typescript
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// ここに先ほどコピーした設定を貼り付け
const firebaseConfig = {
  apiKey: "あなたのAPIキー",
  authDomain: "あなたのプロジェクト.firebaseapp.com",
  databaseURL: "https://あなたのプロジェクト.firebaseio.com",
  projectId: "あなたのプロジェクトID",
  storageBucket: "あなたのプロジェクト.appspot.com",
  messagingSenderId: "あなたのメッセージングID",
  appId: "あなたのアプリID"
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
```

### 4-2. ファイルを保存
Ctrl + S（Windows）または Cmd + S（Mac）で保存

---

## ✅ Step 5: 動作確認

### 5-1. アプリを起動
```bash
npm run dev
```

### 5-2. QRコード画面を開く
```
http://localhost:3000/group-session-start
```

1. 「複数端末でやる」を選択
2. 主催者の名前・性別を入力
3. QRコードが表示されればOK！

### 5-3. 別のスマホで参加してみる
1. スマホでQRコードをスキャン
2. 名前・性別を入力して参加
3. 主催者の画面に参加者が表示されればOK！

---

## 🔄 Step 6: 自動削除の設定（オプション）

古いセッションを自動削除してコストを抑えます。

### 6-1. Firebase CLIのインストール
```bash
npm install -g firebase-tools
```

### 6-2. ログイン
```bash
firebase login
```

### 6-3. Cloud Functionsを有効化
1. Firebaseコンソール → 「構築」→「Functions」
2. 「使ってみる」をクリック
3. プランを「Blaze（従量課金）」にアップグレード
   - **⚠️ 注意**: 無料枠内なら課金されません

### 6-4. 自動削除関数を作成（後日実装予定）
```javascript
// 24時間経過したセッションを自動削除
// （実装は後で追加）
```

---

## 🎉 完了！

これでFirebaseの設定は完了です！

複数端末モードを試してみましょう：
1. 主催者がQRコードを表示
2. 参加者がスキャンして参加
3. 全員揃ったら「診断開始」
4. みんなで同時に質問に答える
5. 全員回答したら自動で次の質問へ

---

## 📊 使用量の確認方法

### Firebaseコンソールで確認
1. Firebaseコンソール → プロジェクト設定
2. 左メニュー「使用状況」をクリック
3. Realtime Databaseの使用量を確認

### アラート設定（推奨）
1. プロジェクト設定 → 「予算と通知」
2. 「予算アラートを作成」
3. 無料枠の80%（8GB転送）で通知設定

---

## 🆘 トラブルシューティング

### エラー: "Permission denied"
→ セキュリティルール（Step 2-2）を確認

### エラー: "Network request failed"
→ `databaseURL`が正しいか確認

### 参加者一覧が更新されない
→ ブラウザをリロード

### QRコードが表示されない
→ `firebase.ts`の設定を再確認

---

## 📞 サポート

問題が解決しない場合：
1. Firebaseコンソールのログを確認
2. ブラウザのコンソール（F12）でエラー確認
3. `PROJECT_MEMO.md`を確認

---

**最終更新**: 2025年10月14日









