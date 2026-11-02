import {
  EventGridSkeleton,
} from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <main>
      {/* Hero Skeleton */}
      <section className="site-container py-16 md:py-24">
        <div className="min-h-[420px] space-y-7 rounded-3xl bg-muted p-8 md:p-14">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-12 w-full max-w-2xl" />
          <Skeleton className="h-12 w-3/4 max-w-xl" />
          <Skeleton className="h-5 w-full max-w-lg" />

          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-12 w-40 rounded-lg" />
            <Skeleton className="h-12 w-44 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Features Skeleton */}
      <section className="site-container py-12">
        <div className="mx-auto mb-10 max-w-xl space-y-4">
          <Skeleton className="mx-auto h-4 w-32" />
          <Skeleton className="mx-auto h-9 w-3/4" />
          <Skeleton className="mx-auto h-4 w-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="surface-card space-y-5 p-7">
              <Skeleton className="size-14 rounded-2xl" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </section>

      {/* Recent Events Skeleton */}
      <section className="bg-secondary/40 py-16">
        <div className="site-container">
          <div className="mb-10 space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-80 max-w-full" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>

          <EventGridSkeleton count={6} />
        </div>
      </section>
    </main>
  );
}