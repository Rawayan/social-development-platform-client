
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const loginUrl = new URL("/login", request.url);

  const callbackURL =
    request.nextUrl.pathname + request.nextUrl.search;

  loginUrl.searchParams.set("callbackURL", callbackURL);

  // Optimistic check only.
  // Actual session verification happens on the server.
  if (!sessionCookie) {
    return NextResponse.redirect(loginUrl);
  }

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    "x-pathname",
    request.nextUrl.pathname + request.nextUrl.search
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
  ],
};
