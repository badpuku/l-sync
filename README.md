# L-Sync LINE Bot

Hono を使用した LINE Bot API サーバーです。

## 機能

- LINE Webhook からのメッセージに返答する機能
- 特定の LINE グループにプッシュメッセージを送信する機能
- スケジュールに合わせてプッシュメッセージを送信する機能

## ディレクトリ構成

```
src/
├── index.ts (メインエントリーポイント)
├── config/
│   └── line.ts (LINE API設定)
├── routes/
│   ├── webhook.ts (LINEウェブフック処理)
│   └── api/
│       ├── push.ts (手動プッシュメッセージ)
│       └── test.ts (テストエンドポイント)
├── services/
│   ├── lineClient.ts (LINE APIクライアント)
│   └── messageService.ts (メッセージ処理ロジック)
├── handlers/
│   ├── messageHandler.ts (受信メッセージ処理)
│   └── scheduledHandler.ts (スケジュールタスク)
├── types/
│   └── index.ts (型定義)
└── utils/
    ├── logger.ts (ログユーティリティ)
    └── helpers.ts (汎用ヘルパー関数)
```

## 設計思想

このプロジェクトの設計は以下の原則に基づいています：

### 1. 関心の分離

ルート処理、ビジネスロジック、設定、ヘルパー関数などを明確に分離することで、コードの理解と保守が容易になります。

### 2. 単一責任の原則

各ファイルとモジュールが一つの責任のみを持つようにすることで、変更の影響範囲を限定し、テストを容易にします。

### 3. モジュラー設計

機能ごとに独立したモジュールにすることで、コードの再利用性が高まり、拡張性も向上します。

### 4. スケーラビリティ

新機能追加時に既存コードを変更せず、新しいモジュールを追加するだけで対応できる構造です。

### 5. 明確な依存関係

サービス層をルートハンドラーから分離することで、依存関係が明確になり、テストやモック化が容易になります。

## 環境変数

- `LINE_CHANNEL_ACCESS_TOKEN`: LINE Messaging API のアクセストークン
- `LINE_CHANNEL_SECRET`: LINE Messaging API のチャネルシークレット
- `LINE_GROUP_ID`: メッセージ送信先の LINE グループ ID

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
