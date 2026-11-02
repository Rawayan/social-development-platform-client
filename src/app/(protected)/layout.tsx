import { Suspense, type ReactNode } from "react";
import { requireAuth } from "@/lib/require-auth";

type ProtectedLayoutProps = {
  children: ReactNode;
};

async function ProtectedContent({
  children,
}: ProtectedLayoutProps) {
  // Verify the user's session before rendering protected content.
  await requireAuth();

  return <>{children}</>;
}

function ProtectedFallback() {
  return (
    <main className="site-container flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

        <p className="text-sm font-medium text-muted-foreground">
          Verifying your session...
        </p>
      </div>
    </main>
  );
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <Suspense fallback={<ProtectedFallback />}>
      <ProtectedContent>
        {children}
      </ProtectedContent>
    </Suspense>
  );
}