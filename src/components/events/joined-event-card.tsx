
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";
import type { JoinedCommunityEvent } from "@/lib/events";

type JoinedEventCardProps = {
  event: JoinedCommunityEvent;
};

export default function JoinedEventCard({
  event,
}: JoinedEventCardProps) {
  const eventDate = new Date(event.eventDate);

  const isValidEventDate = !Number.isNaN(eventDate.getTime());

  const formattedDate = isValidEventDate
    ? eventDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date unavailable";

  const joinedDate = event.joinedAt
    ? new Date(event.joinedAt)
    : null;

  const formattedJoinedDate =
    joinedDate && !Number.isNaN(joinedDate.getTime())
      ? joinedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Date unavailable";

  const isEventEnded =
    isValidEventDate && eventDate.getTime() < Date.now();

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Event Image */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No event image available
          </div>
        )}

        {/* Event Type Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm">
          {event.eventType}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col space-y-4 p-5">
        {/* Joined Date */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            You joined
          </span>

          <span className="text-xs font-semibold text-primary">
            {formattedJoinedDate}
          </span>
        </div>

        {/* Event Title */}
        <h2 className="line-clamp-2 text-xl font-bold leading-snug text-foreground">
          {event.title}
        </h2>

        {/* Event Description */}
        <p className="line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
          {event.description}
        </p>

        {/* Event Information */}
        <div className="space-y-3 border-t border-border pt-4 text-sm text-muted-foreground">
          {/* Event Date */}
          <div className="flex items-center gap-2">
            <CalendarDays
              size={17}
              className="shrink-0 text-primary"
              aria-hidden="true"
            />

            <span>{formattedDate}</span>
          </div>

          {/* Event Location */}
          <div className="flex items-center gap-2">
            <MapPin
              size={17}
              className="shrink-0 text-primary"
              aria-hidden="true"
            />

            <span className="line-clamp-1">
              {event.location}
            </span>
          </div>

          {/* Event Status */}
          <div className="flex items-center gap-2">
            <Clock3
              size={17}
              className="shrink-0 text-primary"
              aria-hidden="true"
            />

            <span>
              {isEventEnded ? "Event ended" : "Upcoming event"}
            </span>
          </div>
        </div>

        {/* View Event Button */}
        <Link
          href={`/events/${event._id}`}
          className="mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View Event Details

          <ArrowRight
            size={17}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
