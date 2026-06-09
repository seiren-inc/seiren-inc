import type { Metadata } from "next";
import {
  AFTERCARE_CONTACT,
  AFTERCARE_DEFAULT_LINKS,
  AFTERCARE_PAGES,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import { getAftercareCaseByToken } from "@/lib/aftercare/repository";

export const metadata: Metadata = getAftercarePageMeta("album");

type AftercareAlbumPageProps = {
  searchParams?: Promise<{
    id?: string;
    token?: string;
  }>;
};

export default async function AftercareAlbumPage({
  searchParams,
}: AftercareAlbumPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const token = params?.token?.trim() || null;
  const caseRecord = token ? await getAftercareCaseByToken(token) : null;

  const isAlbumReady = !caseRecord || Boolean(caseRecord.albumUrl);
  const albumUrl = caseRecord?.albumUrl || AFTERCARE_DEFAULT_LINKS.albumUrl;
  const albumPassword =
    caseRecord?.albumPassword || AFTERCARE_DEFAULT_LINKS.albumPassword;
  const albumTitle = caseRecord?.albumTitle || "アルバム情報";

  return (
    <main id="main-content">
      <h1>{AFTERCARE_PAGES.album.heading}</h1>
      <p>{AFTERCARE_TEXT.albumLead}</p>
      <h2>{albumTitle}</h2>

      {isAlbumReady ? (
        <>
          <p>{AFTERCARE_TEXT.albumDescription}</p>
          <dl>
            <dt>アルバムURL</dt>
            <dd>
              <a href={albumUrl}>{albumUrl}</a>
            </dd>
            <dt>パスワード</dt>
            <dd>{albumPassword}</dd>
          </dl>
          <p>
            <a href={albumUrl} target="_blank" rel="noopener noreferrer">
              アルバムを開く
            </a>
          </p>
        </>
      ) : (
        <p>アルバムの準備中です。担当者よりご連絡いたします。</p>
      )}

      <p>
        お問い合わせ: <a href={`tel:${AFTERCARE_CONTACT.phone}`}>{AFTERCARE_CONTACT.phone}</a>（
        {AFTERCARE_CONTACT.hours}）
      </p>
    </main>
  );
}
