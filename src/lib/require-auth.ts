
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAuth() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    const requestedPath =
      requestHeaders.get("x-pathname") || "/";

    const loginUrl = new URL(
      "/login",
      process.env.BETTER_AUTH_URL || "http://localhost:3000"
    );

    loginUrl.searchParams.set("callbackURL", requestedPath);

    redirect(
      `${loginUrl.pathname}${loginUrl.search}`
    );
  }

  return session;
}
