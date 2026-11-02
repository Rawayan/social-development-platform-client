import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
} from "lucide-react";

import type { CommunityEvent } from "@/lib/events";

interface UpcomingEventCardProps {
  event: CommunityEvent;
}

export default function UpcomingEventCard({
  event,
}: UpcomingEventCardProps) {
  const eventDate = new Date(event.eventDate);

  const formattedDate = Number.isNaN(eventDate.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(eventDate);

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Event Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            🌱
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
          {event.eventType}
        </span>
      </div>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays size={16} className="text-primary" />
          <span>{formattedDate}</span>
        </div>

        <h2 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
          {event.title}
        </h2>

        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
          {event.description}
        </p>

        <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} className="shrink-0 text-primary" />
          <span className="line-clamp-1">
            {event.location}
          </span>
        </div>

        {/* View Event */}
        <Link
          href={`/events/${event._id}`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Event
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}