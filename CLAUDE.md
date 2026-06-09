# CLAUDE.md — seiren-corporate（技術エージェント向け憲法）

> 最終更新: 2026-06-09 | Package Manager: npm | Node: >=18.0.0

---

## コマンド一覧

```bash
npm run dev          # 開発サーバー起動
npm run build        # next build
npm run start        # 本番サーバー起動
npm run lint         # ESLint
npm test             # lint + build
```

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| Framework | Next.js 15.x (App Router) |
| React | 19.x |
| Styling | Tailwind CSS v3（最小構成。デザインシステムは未実装） |
| Data (Aftercare) | ローカル JSON（`data/aftercare/`） |

---

## 現状

コーポレートページと aftercare UI は**再構築準備のためプレースホルダー状態**です。ルーティング・SEO メタ・aftercare API/ロジックは維持しています。新規デザインはこの状態から実装してください。

---

## TypeScript 規約

- `any` 禁止
- 既存の `src/lib/aftercare/*` の型・バリデーションに合わせる

---

## エラー解決

```bash
# Tailwind v3 の purge → tailwind.config.ts の content パスを確認
# Aftercare トークン画面 → data/aftercare/cases.json のシードが必要
```
