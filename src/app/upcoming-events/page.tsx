import { Suspense } from "react";
import { UpcomingEventsContent } from "@/components/events/upcoming-events-content";

function EventsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="surface-card animate-pulse overflow-hidden rounded-2xl"
        >
          <div className="aspect-[16/10] bg-muted" />

          <div className="space-y-4 p-5">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-6 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export const metadata = {
  title: "Upcoming Events | Together",
  description:
    "Explore upcoming community development events and make a difference together.",
};

export default function UpcomingEventsPage() {
  return (
    <section className="section-padding">
      <div className="site-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Community Calendar
          </p>

          <h1 className="section-heading">
            Upcoming Events
          </h1>

          <p className="section-description mx-auto">
            Discover upcoming community events, connect with
            people, and be part of meaningful change.
          </p>
        </div>

        <Suspense fallback={<EventsLoading />}>
          <UpcomingEventsContent />
        </Suspense>
      </div>
    </section>
  );
}