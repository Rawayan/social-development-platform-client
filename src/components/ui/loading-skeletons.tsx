import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <div className="surface-card overflow-hidden rounded-2xl">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />

      <div className="space-y-4 p-5">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function EventDetailsSkeleton() {
  return (
    <div className="space-y-7">
      <Skeleton className="h-72 w-full rounded-2xl md:h-96" />

      <div className="space-y-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-9 w-3/4 max-w-xl" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <Skeleton className="h-12 w-44 rounded-lg" />
    </div>
  );
}

export function FormPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 space-y-4 text-center">
        <Skeleton className="mx-auto h-4 w-36" />
        <Skeleton className="mx-auto h-9 w-2/3 max-w-md" />
        <Skeleton className="mx-auto h-4 w-full max-w-lg" />
      </div>

      <div className="surface-card space-y-6 rounded-2xl p-5 sm:p-8">
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function ManageEventsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>

      <div className="surface-card overflow-hidden rounded-2xl">
        <div className="hidden grid-cols-4 gap-4 border-b border-border p-5 md:grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-24" />
          ))}
        </div>

        <div className="divide-y divide-border">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="grid gap-4 p-5 md:grid-cols-4 md:items-center"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-14 shrink-0 rounded-lg" />
                <Skeleton className="h-4 w-32" />
              </div>

              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-16 rounded-lg" />
                <Skeleton className="h-9 w-16 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}