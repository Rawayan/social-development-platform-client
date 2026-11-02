import Link from "next/link";
import { getUpcomingEvents } from "@/lib/events";
import UpcomingEventCard from "./upcoming-event-card";

export async function UpcomingEventsContent() {
  const { events, error } = await getUpcomingEvents();

  if (error) {
    return (
      <div className="surface-card rounded-2xl p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Unable to load events
        </h2>

        <p className="text-muted-foreground">
          Something went wrong while loading upcoming events.
          Please try again.
        </p>

        <Link
          href="/upcoming-events"
          className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Try Again
        </Link>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="surface-card rounded-2xl px-6 py-16 text-center">
        <div className="mb-4 text-5xl">🌱</div>

        <h2 className="mb-2 text-2xl font-semibold">
          No Upcoming Events
        </h2>

        <p className="mx-auto max-w-md text-muted-foreground">
          There are no upcoming community events right now.
          Check back later for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {events.length}
          </span>{" "}
          upcoming events
        </p>

        <p className="text-sm text-muted-foreground">
          Sorted by nearest date
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <UpcomingEventCard
            key={event._id}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}