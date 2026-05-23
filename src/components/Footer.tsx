import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-gray-300 border-t border-gray-800">
      {/* メインフッターエリア */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-white text-2xl font-serif font-bold tracking-widest drop-shadow-sm">株式会社清蓮</h3>
              <p className="leading-relaxed text-gray-400">
                〒244-0003<br />
                神奈川県横浜市戸塚区戸塚町4170<br />
                高橋ビル1F
              </p>
              <div className="pt-2">
                <a 
                  href="tel:045-881-9952" 
                  className="inline-flex items-center gap-2 text-xl font-medium text-white hover:text-white/70 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  045-881-9952
                </a>
                <p className="text-sm text-gray-500 mt-2">受付時間：月曜〜日曜 9:00〜17:00</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-serif font-bold tracking-widest text-sm uppercase opacity-90">事業領域</h3>
              <nav className="flex flex-col space-y-4">
                <Link href="/business" className="hover:text-white transition-colors duration-200">事業紹介</Link>
                <Link href="/strength" className="hover:text-white transition-colors duration-200">清蓮の強み</Link>
                <Link href="/partner" className="hover:text-white transition-colors duration-200">提携・取引先</Link>
              </nav>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-serif font-bold tracking-widest text-sm uppercase opacity-90">企業情報</h3>
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="hover:text-white transition-colors duration-200">TOP</Link>
                <Link href="/company" className="hover:text-white transition-colors duration-200">会社情報</Link>
              </nav>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-serif font-bold tracking-widest text-sm uppercase opacity-90">サポート</h3>
              <nav className="flex flex-col space-y-4">
                <Link href="/contact" className="hover:text-white transition-colors duration-200">お問い合わせ</Link>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">プライバシーポリシー</Link>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">利用規約</Link>
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-serif tracking-widest">
              &copy; 2026 株式会社清蓮 All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ===== リーガルバー（住友不動産スタイル：黒ベタ帯） ===== */}
      <div className="bg-gray-950 py-3 border-t border-gray-900">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-2">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">利用規約</Link>
            <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">お問い合わせ</Link>
            <Link href="/sitemap.xml" className="text-xs text-gray-500 hover:text-gray-300 transition-colors" target="_blank">サイトマップ</Link>
          </nav>
          <p className="text-xs text-gray-600">© 2026 株式会社清蓮</p>
        </div>
      </div>
    </footer>
  );
}
