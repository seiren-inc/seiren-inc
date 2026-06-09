# CODEX.md — seiren-corporate（事業エージェント向け文脈）

> 最終更新: 2026-06-09 | グループ: A（清蓮 / Seiren）

---

## Project Goal（事業の目的）

清蓮株式会社のコーポレートサイト。サービス群のハブとして、事業・会社情報・問い合わせ導線を提供する。

**現状:** 旧デザイン・旧設計書は撤去済み。ルーティングと aftercare ロジックのみ維持し、UI は再構築待ちのプレースホルダーです。

---

## AEO（JSON-LD）ルール

ルート `layout.tsx` に Organization の JSON-LD を配置。ページ単位の構造化データは新規実装時に `schema-markup` スキルに従って追加する。

---

## 参照ドキュメント

- SEO/GEO/MEO: `docs/seo-geo-meo/`
- エージェント運用: `docs/agent-system/`, `docs/ai/`
