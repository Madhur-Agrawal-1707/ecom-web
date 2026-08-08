/**
 * The access token lives in memory only. It is deliberately never written
 * to localStorage/sessionStorage, since either is readable by any script
 * on the page and would turn an XSS bug into full account takeover. The
 * refresh token (HttpOnly cookie, set by the backend) is what survives a
 * page reload; on reload this module starts empty and `useCurrentUser`
 * silently re-derives a fresh access token via the response interceptor's
 * refresh flow.
 */
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}