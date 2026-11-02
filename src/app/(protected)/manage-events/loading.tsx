import {
  ManageEventsSkeleton,
} from "@/components/ui/loading-skeletons";

export default function ManageEventsLoading() {
  return (
    <section className="section-padding">
      <div className="site-container">
        <ManageEventsSkeleton />
      </div>
    </section>
  );
}