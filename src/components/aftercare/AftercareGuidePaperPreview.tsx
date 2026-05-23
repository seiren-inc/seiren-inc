import Image from "next/image";
import { AFTERCARE_TEMPLATE_CONTACT } from "@/lib/aftercare/case-template";
import type { AftercareGuideTemplateData } from "@/types/aftercare";

type AftercareGuidePaperPreviewProps = {
  data: AftercareGuideTemplateData;
};

function PreviewQr({
  label,
  qrImageUrl,
}: {
  label: string;
  qrImageUrl: string;
}) {
  if (!qrImageUrl) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
        {label} QR未登録
      </div>
    );
  }

  return (
    <Image
      src={qrImageUrl}
      alt={`${label} QRコード`}
      width={256}
      height={256}
      unoptimized
      className="aspect-square w-full rounded-2xl border border-gray-200 bg-white object-contain p-2"
    />
  );
}

export default function AftercareGuidePaperPreview({
  data,
}: AftercareGuidePaperPreviewProps) {
  return (
    <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div className="border-b border-gray-200 pb-6">
        <p className="text-xs font-bold tracking-[0.24em] text-brand-primary">
          GUIDE PREVIEW
        </p>
        <h2 className="mt-3 font-serif text-2xl font-bold text-gray-900">
          散骨写真・ご案内紙プレビュー
        </h2>
        <p className="mt-3 text-sm leading-7 text-gray-600">
          {data.customerName}へご案内する想定の紙面です。印刷前に URL、合い言葉、QR、
          状態管理を確認してください。
        </p>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-3xl bg-brand-secondary px-5 py-5">
          <p className="text-sm font-bold text-gray-900">
            {data.customerName}
          </p>
          <p className="mt-2 text-sm leading-7 text-gray-700">
            {data.serviceDateLabel} の散骨記録をご案内します。ご希望の方は Google
            口コミにもご協力いただけます。口コミ投稿は任意です。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-bold text-gray-900">
              {data.albumSection.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              {data.albumSection.description}
            </p>
            <div className="mt-4">
              <PreviewQr
                label="アルバム"
                qrImageUrl={data.albumSection.qrImageUrl}
              />
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-bold text-gray-900">URL</dt>
                <dd className="mt-1 break-all text-gray-600">
                  {data.albumSection.url}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-gray-900">合い言葉</dt>
                <dd className="mt-1 text-gray-600">
                  {data.albumSection.password}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-bold text-gray-900">
              {data.reviewSection.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              {data.reviewSection.description}
            </p>
            <div className="mt-4">
              <PreviewQr
                label="口コミ"
                qrImageUrl={data.reviewSection.qrImageUrl}
              />
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-bold text-gray-900">URL</dt>
                <dd className="mt-1 break-all text-gray-600">
                  {data.reviewSection.url}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <section className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm font-bold text-gray-900">お問い合わせ先</p>
          <p className="mt-2 text-sm text-gray-600">
            電話: {AFTERCARE_TEMPLATE_CONTACT.phone}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            受付時間: {AFTERCARE_TEMPLATE_CONTACT.hours}
          </p>
        </section>
      </div>
    </div>
  );
}
