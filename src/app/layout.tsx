import type { Metadata, Viewport } from "next";
import { SEO_BASE_URL, SEO_SITE_NAME, isProductionEnvironment } from "@/lib/seo";
import "./globals.css";

const IS_PRODUCTION = isProductionEnvironment();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO_BASE_URL),
  title: {
    default: SEO_SITE_NAME,
    template: `%s | ${SEO_SITE_NAME}`,
  },
  description: "株式会社清蓮のコーポレートサイト（再構築準備中）",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SEO_BASE_URL,
    siteName: SEO_SITE_NAME,
    title: SEO_SITE_NAME,
    description: "株式会社清蓮のコーポレートサイト（再構築準備中）",
    images: [
      {
        url: `${SEO_BASE_URL}/ogp.png`,
        width: 1200,
        height: 630,
        alt: SEO_SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_SITE_NAME,
    description: "株式会社清蓮のコーポレートサイト（再構築準備中）",
    images: [`${SEO_BASE_URL}/ogp.png`],
  },
  robots: {
    index: IS_PRODUCTION,
    follow: IS_PRODUCTION,
    googleBot: { index: IS_PRODUCTION, follow: IS_PRODUCTION },
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SEO_BASE_URL}/#organization`,
  name: SEO_SITE_NAME,
  url: SEO_BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SEO_BASE_URL}/ogp.png`,
    width: "1200",
    height: "630",
  },
  image: `${SEO_BASE_URL}/ogp.png`,
  inLanguage: "ja-JP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <a href="#main-content">本文へスキップ</a>
        {children}
      </body>
    </html>
  );
}
