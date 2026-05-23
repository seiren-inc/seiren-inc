"use client";

import { usePathname } from "next/navigation";

type LayoutWrapperProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  extras: React.ReactNode;
  children: React.ReactNode;
};

/**
 * LayoutWrapper — パスに基づいて Header/Footer の表示を制御する
 * /aftercare 配下では Header / Footer / BackToTop 等を非表示にし、
 * 専用レイアウトに委ねる。
 */
export default function LayoutWrapper({
  header,
  footer,
  extras,
  children,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAftercare = pathname.startsWith("/aftercare");

  if (isAftercare) {
    return (
      <main>
        {children}
      </main>
    );
  }

  return (
    <>
      {header}
      {extras}
      <main className="pt-[104px] lg:pt-[108px] pb-[max(1rem,env(safe-area-inset-bottom))] md:pb-6">
        {children}
      </main>
      {footer}
    </>
  );
}
