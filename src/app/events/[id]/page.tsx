import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Tag,
  User,
} from "lucide-react";

import { getEventById } from "@/lib/events";
import JoinEventButton from "@/components/events/join-event-button";

type EventDetailsPageProps = {
  params: Promise<{ id: string }>;
};

function formatEventDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

async function EventDetailsContent({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  const { event, error } = await getEventById(id);

  if (error || !event) {
    notFound();
  }

  return (
    <main className="site-container section-padding">
      <Link
        href="/upcoming-events"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Events
      </Link>

      <article className="glass overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted md:aspect-[21/9]">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              🌱
            </div>
          )}

          <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
            {event.eventType}
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
              <CalendarDays
                size={20}
                className="mt-0.5 shrink-0 text-primary"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Date & Time
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {formatEventDate(event.eventDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
              <MapPin
                size={20}
                className="mt-0.5 shrink-0 text-primary"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Location
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
              <Tag
                size={20}
                className="mt-0.5 shrink-0 text-primary"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Event Type
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {event.eventType}
                </p>
              </div>
            </div>

            {event.creatorName && (
              <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
                <User
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Hosted By
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {event.creatorName}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-foreground">
              About This Event
            </h2>
            <p className="mt-3 whitespace-pre-line text-base leading-7 text-muted-foreground">
              {event.description}
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <JoinEventButton eventId={event._id} />
          </div>
        </div>
      </article>
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