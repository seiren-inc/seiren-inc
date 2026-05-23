import { AFTERCARE_BASE_PATH } from "@/constants/aftercare";

type AftercareHrefOptions = {
  id?: string | null;
  source?: string | null;
  token?: string | null;
};

export function buildAftercareHref(
  path: string = AFTERCARE_BASE_PATH,
  options: AftercareHrefOptions = {}
) {
  const params = new URLSearchParams();

  if (options.id) {
    params.set("id", options.id);
  }

  if (options.source) {
    params.set("source", options.source);
  }

  if (options.token) {
    params.set("token", options.token);
  }

  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function buildAftercareTokenPath(token: string) {
  return `${AFTERCARE_BASE_PATH}/${token}`;
}
