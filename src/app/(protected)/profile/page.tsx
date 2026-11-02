
import type { Metadata } from "next";
import ProfileContent from "@/components/profile/profile-content";

export const metadata: Metadata = {
  title: "My Profile | Together",
  description: "View and update your Together profile.",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
