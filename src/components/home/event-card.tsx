
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import type { CommunityEvent } from "@/lib/events";

interface EventCardProps {
  event: CommunityEvent;
}

function formatEventDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function EventCard({
  event,
}: EventCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        role="img"
        aria-label={`Image for ${event.title}`}
        className="relative h-52 overflow-hidden bg-secondary bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
        style={
          event.imageUrl
            ? {
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.25), transparent), url("${event.imageUrl}")`,
              }
            : undefined
        }
      >
        {!event.imageUrl && (
          <div className="flex h-full items-center justify-center text-5xl text-primary">
            🌱
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          {event.eventType || "Community Event"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {event.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-5 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={17}
              className="shrink-0 text-primary"
            />
            <span>{formatEventDate(event.eventDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin
              size={17}
              className="shrink-0 text-primary"
            />
            <span className="line-clamp-1">
              {event.location}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
          >
            Explore Events
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
