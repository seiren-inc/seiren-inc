import Link from 'next/link';

type Path = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  paths: Path[];
};

export default function Breadcrumbs({ paths }: BreadcrumbsProps) {
  // ホーム画面のパスは常に先頭に追加する
  const allPaths = [{ label: 'ホーム', href: '/' }, ...paths];
  const baseUrl = 'https://seiren-inc.co.jp';

  // 構造化データ（JSON-LD）の生成
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}${allPaths[allPaths.length - 1]?.href ?? '/' }#breadcrumb`,
    "itemListElement": allPaths.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: path.label,
      item: `${baseUrl}${path.href}`,
    })),
  };

  return (
    <>
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* UIの表示 */}
      <nav aria-label="Breadcrumb" className="w-full bg-gray-50 border-b border-gray-100 py-3">
        <div className="container mx-auto px-6 lg:px-12">
          <ol className="flex flex-wrap items-center space-x-2 text-xs text-gray-500">
            {allPaths.map((path, index) => {
              const isLast = index === allPaths.length - 1;
              
              return (
                <li key={path.href} className="flex items-center">
                  {isLast ? (
                    <span className="font-bold text-gray-900" aria-current="page">
                      {path.label}
                    </span>
                  ) : (
                    <>
                      <Link 
                        href={path.href} 
                        className="hover:text-brand-primary transition-colors hover:underline"
                      >
                        {path.label}
                      </Link>
                      <svg 
                        className="w-3 h-3 mx-2 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
