import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "aftercare_admin_access";

function getConfiguredAdminKey() {
  return process.env.AFTERCARE_ADMIN_ACCESS_KEY?.trim() || "";
}

export async function hasAftercareAdminAccess() {
  const adminKey = getConfiguredAdminKey();

  if (!adminKey) {
    return true;
  }

  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieKey = cookieStore.get(ADMIN_COOKIE_NAME)?.value || "";
  const headerKey = headerStore.get("x-aftercare-admin-key") || "";

  return cookieKey === adminKey || headerKey === adminKey;
}

export async function requireAftercareAdminAccess() {
  const hasAccess = await hasAftercareAdminAccess();

  if (!hasAccess) {
    redirect("/aftercare/admin/login");
  }
}

export function getAftercareAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}
