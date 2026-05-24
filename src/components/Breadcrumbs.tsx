import Link from 'next/link';

type Path = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  paths: Path[];
};

/**
 * Breadcrumbs — editorial pan-크rust mark.
 *
 * 灰塗りバーをやめ、透明＋下ヘアラインのみ。区切りは細スラッシュ。
 * BreadcrumbList JSON-LD は従来通り出力する（SEO 不変）。
 */
export default function Breadcrumbs({ paths }: BreadcrumbsProps) {
  const allPaths = [{ label: 'ホーム', href: '/' }, ...paths];
  const baseUrl = 'https://seiren-inc.co.jp';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${baseUrl}${allPaths[allPaths.length - 1]?.href ?? '/'}#breadcrumb`,
    itemListElement: allPaths.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: path.label,
      item: `${baseUrl}${path.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="w-full border-b border-gray-100 bg-white"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <ol className="flex flex-wrap items-center py-3 text-[11px] tracking-[0.18em] text-muted">
            {allPaths.map((path, index) => {
              const isLast = index === allPaths.length - 1;
              return (
                <li key={path.href} className="flex items-center">
                  {isLast ? (
                    <span
                      className="text-gray-900"
                      aria-current="page"
                    >
                      {path.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={path.href}
                        className="hover:text-brand-primary transition-colors"
                      >
                        {path.label}
                      </Link>
                      <span
                        aria-hidden="true"
                        className="mx-3 text-gray-300 select-none"
                      >
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
