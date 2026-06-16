# anti-image-spam

最近流行ってる(?)画像を使ったスパムを対策するBOTです。画像内の文字をOCRして怪しい単語を検出してます。

- 一定スコアを超えたメッセージは削除されます
- 3回以上送信するとtimeoutします

## run
- PM: pnpm
- Runtime: Bun
- pm2.config.cjsを同梱済み

## discord botの設定
- `Message Content Intent`が必要です
- 必要な権限
  - メッセージを送る
  - メッセージを管理
  - リンクを埋め込み
  - ファイルを添付
  - (低速モードを回避)
  - メンバーをタイムアウト (ロール設定から変更?)
