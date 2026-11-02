import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
} from "lucide-react";

import { getEventById } from "@/lib/events";
import JoinEventButton from "@/components/events/join-event-button";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  const { event, error } = await getEventById(id);

  if (!event && error === "Event not found") {
    notFound();
  }

  if (!event) {
    return (
      <section className="section-padding">
        <div className="site-container">
          <div className="surface-card rounded-2xl p-10 text-center">
            <h1 className="mb-3 text-2xl font-bold">
              Unable to Load Event
            </h1>

            <p className="mb-6 text-muted-foreground">
              Something went wrong while loading this event.
            </p>

            <Link
              href="/upcoming-events"
              className="inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground"
            >
              Back to Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const date = new Date(event.eventDate);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  return (
    <section className="section-padding">
      <div className="site-container max-w-5xl">
        <Link
          href="/upcoming-events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Upcoming Events
        </Link>

        <article className="surface-card overflow-hidden rounded-3xl border border-border">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
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
          </div>

          <div className="p-6 sm:p-10">
            <span className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {event.eventType}
            </span>

            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              {event.title}
            </h1>

            <div className="mb-8 grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-1 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Event Date
                  </p>
                  <p className="font-medium">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Location
                  </p>
                  <p className="font-medium">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-3 text-xl font-bold">
                About This Event
              </h2>

              <p className="whitespace-pre-line leading-8 text-muted-foreground">
                {event.description}
              </p>
            </div>

            <div className="mb-8 rounded-xl bg-muted/50 p-5">
              <p className="mb-1 text-sm text-muted-foreground">
                Organized by
              </p>

              <p className="font-semibold">
                {event.creatorName || event.creatorEmail}
              </p>
            </div>

            <JoinEventButton eventId={event._id} />
          </div>
        </article>
      </div>
    </section>
  );
}