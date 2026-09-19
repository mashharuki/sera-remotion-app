# Sera — Bringing FX on-chain

Token2049のブース・立食イベントで見せる30秒の英語Remotion動画と、スマホ対応のGitHub Pages。無音でも内容が伝わる構成。ダークグリーン、公式ロゴ、IBM Plex Sansを使用。

公開先: https://mashharuki.github.io/sera-remotion-app/

## ローカル

Node.js 24を使用。

```sh
npm ci
npm run dev           # 紹介ページ
npm run studio        # Remotion Studio
npm run check         # ESLint / TypeScript / 静的ビルド
npx playwright install chromium
npm test              # モバイル、再生、QR、CTA
npm run render        # public/sera-overview.mp4 (30秒 / 1080p)
npm run render:still  # out/sera-poster.png
```

MP4はビルド前にrenderする。GitHub Pagesワークフローは毎回MP4を生成してから公開する。動画ダウンロードはローカルでrenderするまでは利用不可。大きな生成動画はGitに保存しない。

## 公開

Repository Settings → Pages → Source を **GitHub Actions** に設定。`main`へのpushで `.github/workflows/pages.yml` がlint、動画生成、サイトビルド、公開を行う。QRは`src/content.ts`のcanonical URLから生成される。公開URLを変更する場合は`site.url`と`vite.config.ts`のbaseを両方変更する。

## Claude CodeにIssueから修正してもらう

1. Claude Codeで `/install-github-app` を実行するか、[Claude GitHub App](https://github.com/apps/claude) をこのリポジトリにインストール。
2. Settings → Secrets and variables → Actions に `ANTHROPIC_API_KEY` を登録。サブスクリプション認証を使う場合は `claude setup-token` で取得し、workflowを`claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}`へ変更する。
3. `Improve the Sera introduction` テンプレートでIssue作成。例:

   `@claude 00:17の説明をもっと平易な英語にしてください。公式仕様を守り、テストしてPRを作成してください。`

4. PRの文言・動画プレビュー・チェックをレビューしてマージ。Pagesが自動更新。

正しいメンションは **@claude**。`@ClaudeCode`ではない。費用・権限の管理のためOWNER/MEMBER/COLLABORATORのみ起動可能。Appインストール・APIキー設定はコードだけでは完了しない。初回はテストIssueで動作確認する。[公式設定ガイド](https://code.claude.com/docs/en/github-actions)

## 編集場所

- `src/content.ts`: 5シーンの英語原稿、時間、公開URL、Telegram。現在は公式コミュニティへの暫定リンク。
- `src/Composition.tsx`, `src/video.css`: 動画。PlayerとMP4で同じReactコンポーネントを共有。
- `src/main.tsx`, `src/index.css`: 公開ページ。
- `scripts/generate-assets.mjs`: QR / WebVTT生成。
- `docs/research.md`: 出典、採用した主張、除外した主張、ストーリーボード。
- `docs/event-playbook.md`: 英語会話例、グループ作成、10件/日の集計条件。

Telegramグループ作成は手動。公開ページに個人情報を保存しない。公式コミュニティを開いただけではQualified Contactとしてカウントしない。

Remotionの利用条件は https://www.remotion.dev/license を参照。Remotionプラグイン自体は必要なく、npmパッケージで動作する。

Serena memoryの参照チェックはプロジェクトルートから `serena memories check`。
