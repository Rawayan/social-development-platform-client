"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, RefreshCw } from "lucide-react";
import { getMyJoinedEvents } from "@/lib/events";
import type { JoinedCommunityEvent } from "@/lib/events";
import JoinedEventCard from "./joined-event-card";

function JoinedEventSkeleton() {
  return (
    <div className="surface-card animate-pulse overflow-hidden rounded-2xl border border-border">
      <div className="h-52 bg-muted" />
      <div className="space-y-4 p-5">
        <div className="h-5 w-24 rounded bg-muted" />
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="h-10 w-full rounded bg-muted" />
      </div>
    </div>
  );
}

export default function JoinedEventsContent() {
  const [events, setEvents] = useState<JoinedCommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyJoinedEvents();
      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your joined events."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadEvents();
  }, []);

  return (
    <section className="section-padding">
      <div className="site-container">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <CalendarCheck size={24} />
            </div>

            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Your Participation
            </span>
          </div>

          <h1 className="section-heading">Joined Events</h1>

          <p className="section-description">
            Keep track of the community events you have joined and get ready
            to make a difference.
          </p>
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <JoinedEventSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="surface-card rounded-2xl border border-destructive/30 p-8 text-center">
            <p className="mb-4 text-destructive">{error}</p>

            <button
              type="button"
              onClick={() => void loadEvents()}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="surface-card rounded-2xl border border-border px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarCheck size={30} />
            </div>

            <h2 className="mb-2 text-xl font-bold text-foreground">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-muted-foreground">
              You have not joined any community events yet. Explore upcoming
              events and find a cause you would like to support.
            </p>

            <a
              href="/upcoming-events"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Explore Events
            </a>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                You have joined{" "}
                <span className="font-bold text-foreground">
                  {events.length}
                </span>{" "}
                {events.length === 1 ? "event" : "events"}.
              </p>

              <a
                href="/upcoming-events"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Explore more events
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <JoinedEventCard
                  key={event._id}
                  event={event}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}