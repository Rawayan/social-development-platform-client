import {
  EventGridSkeleton,
} from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function JoinedEventsLoading() {
  return (
    <section className="section-padding">
      <div className="site-container">
        <div className="mb-10 space-y-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9 w-64 max-w-full" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>

        <EventGridSkeleton count={3} />
      </div>
    </section>
  );
}