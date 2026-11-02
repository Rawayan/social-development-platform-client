import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Clock3 } from "lucide-react";
import type { JoinedCommunityEvent } from "@/lib/events";

type JoinedEventCardProps = {
  event: JoinedCommunityEvent;
};

export default function JoinedEventCard({
  event,
}: JoinedEventCardProps) {
  const eventDate = new Date(event.eventDate);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedJoinedDate = event.joinedAt
    ? new Date(event.joinedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date unavailable";

  return (
    <article className="surface-card group overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden bg-muted">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No event image
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {event.eventType}
          </span>

          <span className="text-xs text-muted-foreground">
            Joined {formattedJoinedDate}
          </span>
        </div>

        <h2 className="line-clamp-2 text-xl font-bold text-foreground">
          {event.title}
        </h2>

        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-primary" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} className="shrink-0 text-primary" />
            <span>
              {eventDate.getTime() < Date.now() ? "Event ended" : "Upcoming event"}
            </span>
          </div>
        </div>

        <Link
          href={`/events/${event._id}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Event Details
        </Link>
      </div>
    </article>
  );
}