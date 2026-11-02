import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/events";
import JoinEventButton from "@/components/events/join-event-button";

type EventDetailsPageProps = {
  params: Promise<{ id: string }>;
};

async function EventDetailsContent({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  const { event, error } = await getEventById(id);

  if (error || !event) {
    notFound();
  }

  // তোমার আগের Event Details Page-এর সম্পূর্ণ JSX এখানে রাখবে।
  // event-এর সব তথ্য আগের মতো ব্যবহার করবে।

  return (
    <main className="site-container section-padding">
      {/* তোমার existing event details UI এখানে বসাও */}

      <JoinEventButton eventId={event._id} />
    </main>
  );
}

function EventDetailsFallback() {
  return (
    <main className="site-container section-padding">
      <div className="animate-pulse space-y-6">
        <div className="h-72 rounded-2xl bg-muted" />
        <div className="h-8 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
      </div>
    </main>
  );
}

export default function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  return (
    <Suspense fallback={<EventDetailsFallback />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
}