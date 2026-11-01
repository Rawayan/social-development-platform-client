
export function getSafeCallbackURL(): string {
  if (typeof window === "undefined") {
    return "/";
  }

  const params = new URLSearchParams(window.location.search);
  const callbackURL = params.get("callbackURL");

  if (
    !callbackURL ||
    !callbackURL.startsWith("/") ||
    callbackURL.startsWith("//") ||
    callbackURL.includes("\\")
  ) {
    return "/";
  }

  try {
    const target = new URL(callbackURL, window.location.origin);

    if (target.origin !== window.location.origin) {
      return "/";
    }

    return (
      target.pathname +
      target.search +
      target.hash
    );
  } catch {
    return "/";
  }
}
