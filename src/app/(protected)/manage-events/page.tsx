
import type { Metadata } from "next";
import ManageEventsContent from "@/components/events/manage-events-content";

export const metadata: Metadata = {
  title: "Manage Events | Together",
  description: "Manage the community events you created.",
};

export default function ManageEventsPage() {
  return <ManageEventsContent />;
}
