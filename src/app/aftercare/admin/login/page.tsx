import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAftercareAdminCookieName } from "@/lib/aftercare/admin-auth";

export const metadata: Metadata = {
  title: "社内確認ログイン",
  robots: { index: false, follow: false },
};

type AftercareAdminLoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
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
    <main id="main-content">
      <h1>社内確認ページ</h1>
      <p>アクセスキーを入力してください。</p>

      {hasError ? <p role="alert">アクセスキーが正しくありません。</p> : null}

      {!isProtectionEnabled ? (
        <p>AFTERCARE_ADMIN_ACCESS_KEY が未設定のため、保護は無効です。</p>
      ) : null}

      <form action={loginAction}>
        <label htmlFor="accessKey">アクセスキー</label>
        <input id="accessKey" name="accessKey" type="password" required />
        <button type="submit">ログイン</button>
      </form>
    </main>
  );
}
