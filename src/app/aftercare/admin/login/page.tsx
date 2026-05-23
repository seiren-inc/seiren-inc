import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAftercareAdminCookieName } from "@/lib/aftercare/admin-auth";

export const metadata: Metadata = {
  title: "社内確認ログイン｜株式会社清蓮",
  robots: {
    index: false,
    follow: false,
  },
};

type AftercareAdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AftercareAdminLoginPage({
  searchParams,
}: AftercareAdminLoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const hasError = params?.error === "1";
  const isProtectionEnabled = Boolean(
    process.env.AFTERCARE_ADMIN_ACCESS_KEY?.trim()
  );

  async function loginAction(formData: FormData) {
    "use server";

    const configuredKey = process.env.AFTERCARE_ADMIN_ACCESS_KEY?.trim() || "";
    const submittedKey = String(formData.get("accessKey") || "").trim();

    if (!configuredKey) {
      redirect("/aftercare/admin");
    }

    if (submittedKey !== configuredKey) {
      redirect("/aftercare/admin/login?error=1");
    }

    const cookieStore = await cookies();
    cookieStore.set(getAftercareAdminCookieName(), configuredKey, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/aftercare/admin",
      maxAge: 60 * 60 * 12,
    });

    redirect("/aftercare/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-md rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold tracking-[0.2em] text-brand-primary">
            INTERNAL ACCESS
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold text-gray-900">
            社内確認ページ
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-600">
            `/aftercare/admin` は社内確認用途です。公開リスクを避けるため、
            簡易アクセスキーで保護しています。
          </p>

          {hasError ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
              アクセスキーが正しくありません。
            </div>
          ) : null}

          {!isProtectionEnabled ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-700">
              `AFTERCARE_ADMIN_ACCESS_KEY` が未設定のため、現在は保護が無効です。
            </div>
          ) : null}

          <form action={loginAction} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="accessKey"
                className="text-sm font-bold text-gray-900"
              >
                アクセスキー
              </label>
              <input
                id="accessKey"
                name="accessKey"
                type="password"
                required
                className="block w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-900 outline-none transition-colors focus:border-brand-primary"
                placeholder="社内共有キーを入力"
              />
            </div>

            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-brand-primary px-6 py-4 text-base font-bold text-white transition-colors hover:bg-brand-hover"
            >
              社内確認ページへ進む
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
