import {
  EventGridSkeleton,
} from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpcomingEventsLoading() {
  return (
    <section className="section-padding">
      <div className="site-container">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
          <Skeleton className="mx-auto h-4 w-36" />
          <Skeleton className="mx-auto h-9 w-64 max-w-full" />
          <Skeleton className="mx-auto h-4 w-full max-w-xl" />
        </div>

        <EventGridSkeleton count={6} />
      </div>
    </section>
  );
}