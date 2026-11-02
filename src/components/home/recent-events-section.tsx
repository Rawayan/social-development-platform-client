import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { connection } from "next/server";

import EventCard from "@/components/home/event-card";
import { getRecentEvents } from "@/lib/events";

export default async function RecentEventsSection() {
  await connection();

  const { events, error } = await getRecentEvents();

  return (
    <section className="section-padding bg-secondary/40">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Get Involved
            </span>

            <h2 className="section-heading mt-3">
              Upcoming Community Events
            </h2>

            <p className="section-description mt-4">
              Discover opportunities to connect, volunteer,
              and make a difference in your community.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
          >
            View All Events
            <ArrowRight size={18} />
          </Link>
        </div>

        {error ? (
          <div className="surface-card mt-10 p-8 text-center">
            <CalendarDays
              size={36}
              className="mx-auto text-muted-foreground"
            />

            <h3 className="mt-4 text-xl font-bold">
              Events are temporarily unavailable
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please make sure the Together API server is
              running and try again later.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-primary"
            >
              Explore Events
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : events.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        ) : (
          <div className="surface-card mt-10 px-6 py-16 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
              <CalendarDays size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No Upcoming Events Yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
              New community events will appear here.
              Check back soon and be ready to make a difference!
            </p>

            <Link
              href="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Join Our Community
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}