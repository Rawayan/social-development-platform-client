import type { Metadata } from "next";
import JoinedEventsContent from "@/components/events/joined-events-content";

export const metadata: Metadata = {
  title: "Joined Events | Together",
  description: "View and manage the community events you have joined.",
};

export default function JoinedEventsPage() {
  return <JoinedEventsContent />;
}