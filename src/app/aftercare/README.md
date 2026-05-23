# Aftercare

散骨後のお客様向けの専用導線です。

## 現在の構成

- `/aftercare`
- `/aftercare/[token]`
- `/aftercare/survey`
- `/aftercare/review`
- `/aftercare/album`
- `/aftercare/admin`
- `/aftercare/admin/[caseId]`
- `src/app/api/aftercare/submissions/route.ts`
- `src/app/api/aftercare/events/route.ts`
- `src/app/api/aftercare/cases/[caseId]/template/route.ts`
- `src/lib/aftercare/repository.ts`

## 保存方式

- MVP では `data/aftercare/submissions.json` に保存します。
- 案件マスタは `data/aftercare/cases.json` で管理します。
- 将来は DB や Google Sheets に置き換えやすいように `repository.ts` に集約しています。

## 将来拡張

- 案件ごとのアルバム URL / パスワード出し分け
- 管理画面
- CSV 出力
- GA4 など外部計測基盤との接続
- PDF 生成フローへの接続
