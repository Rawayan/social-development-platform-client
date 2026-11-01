
import { requireAuth } from "@/lib/require-auth";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  await requireAuth();

  return <>{children}</>;
}
