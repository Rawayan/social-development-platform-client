
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/layout/navbar";

export default function AuthNavbar() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? undefined,
      }
    : null;

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed.");
        return;
      }

      toast.success("You have logged out successfully.");
      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Unable to logout. Please try again.");
    }
  };

  return <Navbar user={user} onLogout={handleLogout} />;
}
