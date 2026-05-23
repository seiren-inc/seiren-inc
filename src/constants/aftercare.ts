import type { AftercarePageDefinition, AftercarePageKey } from "@/types/aftercare";

export const AFTERCARE_BASE_PATH = "/aftercare";
export const AFTERCARE_DEFAULT_SOURCE = "qr";
export const AFTERCARE_COMMENT_MAX_LENGTH = 1000;

export const AFTERCARE_CONTACT = {
  phone: "045-881-9952",
  hours: "月曜〜日曜 9:00〜17:00",
  email: process.env.NEXT_PUBLIC_AFTERCARE_CONTACT_EMAIL ?? "",
};

export const AFTERCARE_PREVIEW_BASE_PATH = "/aftercare/admin";
export const AFTERCARE_TOKEN_BASE_PATH = "/aftercare";
export const AFTERCARE_DEFAULT_LINKS = {
  reviewUrl: process.env.NEXT_PUBLIC_AFTERCARE_GOOGLE_REVIEW_URL ?? "",
  reviewQrImageUrl: "",
  albumUrl: "https://suzuri.jp/",
  albumPassword: "設定待ち",
  albumQrImageUrl: "",
};

export const AFTERCARE_TEXT = {
  introTitle: "ご利用後のご案内",
  introDescription:
    "このページは、散骨後のお客様向けのご案内ページです。アンケートのご協力と、必要に応じた口コミ投稿、アルバムの閲覧案内をご確認いただけます。",
  introLead:
    "この度は散骨に際し、ご家族皆様の大切なお時間をお預けいただき、誠にありがとうございました。散骨の記録写真をお届けするにあたり、簡単なアンケートへのご協力をお願いしております。",
  introLeadWithName:
    "のご案内ページです。散骨の記録写真をお届けするにあたり、簡単なアンケートへのご協力をお願いしております。",
  introStatsDuration: "所要時間：約1分",
  introStatsQuestions: "設問数：3問",
  introCta: "アンケートに進む",
  surveyLead:
    "率直なご感想をお聞かせください。所要時間は1分ほどです。",
  surveyDescription:
    "それぞれのお気持ちに近いものをお選びください。ご意見欄は任意ですので、未入力のままでも送信いただけます。",
  surveyCommentLabel: "ご意見・ご感想",
  surveyCommentPlaceholder:
    "ご意見やご感想がございましたら、お聞かせください。",
  surveySubmit: "回答を送信する",
  surveySubmitting: "送信中...",
  surveySubmitError:
    "送信に失敗しました。通信状況をご確認のうえ、もう一度お試しください。",
  reviewLead:
    "高い評価をいただけた場合のみ口コミのご案内を表示しています。口コミ投稿は任意であり、投稿しなくてもそのまま写真案内へ進めます。",
  reviewThanks:
    "温かいお声をお寄せいただき、スタッフ一同、大変励みになっております。",
  reviewRequest:
    "もしよろしければ、Google への口コミでご感想をお聞かせいただけますと幸いです。",
  reviewOptional:
    "口コミの投稿は任意です。投稿いただかなくても、そのまま写真案内へ進めます。",
  reviewCta: "Google口コミを書く",
  reviewSkipCta: "写真案内へ進む",
  albumLead:
    "お写真の閲覧に必要なURLとパスワードをご案内します。コピーしてそのままご利用いただけます。",
  albumDescription:
    "以下の URL と合い言葉をご利用のうえ、オンラインアルバムへアクセスしてください。スマートフォンからそのままコピーできます。",
  albumStepsTitle: "ご覧いただく流れ",
  albumStepItems: [
    "下の「Suzuri Albumへ進む」ボタンをタップします",
    "アルバムページが開いたら合い言葉を入力します",
    "写真アルバムが表示されます",
  ],
  albumCta: "Suzuri Albumへ進む",
  previewTitle: "案内紙プレビュー",
  previewDescription:
    "案件ごとの URL、合い言葉、QR、確認状態をブラウザ上で確認できる社内向けプレビューです。",
};

export const AFTERCARE_PAGES: Record<AftercarePageKey, AftercarePageDefinition> = {
  index: {
    key: "index",
    title: "アフターケアのご案内",
    heading: "アフターケアのご案内",
    description: "散骨後のお客様向けのご案内ページです。",
    href: AFTERCARE_BASE_PATH,
    eyebrow: "AFTERCARE",
  },
  survey: {
    key: "survey",
    title: "アンケートのご案内",
    heading: "アンケートのご案内",
    description: "アンケートにご協力ください。",
    href: `${AFTERCARE_BASE_PATH}/survey`,
    eyebrow: "SURVEY",
  },
  review: {
    key: "review",
    title: "口コミ案内",
    heading: "口コミのご案内",
    description: "ご協力いただける場合のみ口コミ投稿をお願いします。",
    href: `${AFTERCARE_BASE_PATH}/review`,
    eyebrow: "REVIEW",
  },
  album: {
    key: "album",
    title: "アルバム案内",
    heading: "お写真アルバムのご案内",
    description: "アルバム閲覧に必要な情報をご案内します。",
    href: `${AFTERCARE_BASE_PATH}/album`,
    eyebrow: "ALBUM",
  },
};

export const AFTERCARE_STEPS: { key: AftercarePageKey; label: string }[] = [
  { key: "index", label: "ご案内" },
  { key: "survey", label: "アンケート" },
  { key: "review", label: "口コミ" },
  { key: "album", label: "アルバム" },
];
