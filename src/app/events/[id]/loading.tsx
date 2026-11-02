import {
  EventDetailsSkeleton,
} from "@/components/ui/loading-skeletons";

export default function EventDetailsLoading() {
  return (
    <section className="section-padding">
      <div className="site-container">
        <EventDetailsSkeleton />
      </div>
    </section>
  );
}