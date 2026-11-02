
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  HandHeart,
  HeartHandshake,
  Leaf,
  Mail,
  MapPin,
  Sprout,
  Users,
} from "lucide-react";

import EventCard from "@/components/home/event-card";
import { getRecentEvents } from "@/lib/events";

const features = [
  {
    icon: Users,
    title: "Connect with People",
    description:
      "Meet passionate people who believe in creating positive change in their communities.",
  },
  {
    icon: Sprout,
    title: "Grow Together",
    description:
      "Take part in environmental, educational, and social development initiatives.",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Turn your time, skills, and kindness into meaningful community action.",
  },
];

const gallery = [
  {
    title: "Community Cleanup",
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=85",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Planting for Tomorrow",
    category: "Green Community",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85",
    className: "",
  },
  {
    title: "Helping Hands",
    category: "Social Support",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=85",
    className: "",
  },
];

export default async function Home() {
  const { events, error } = await getRecentEvents();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=2000&q=90')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102e24]/95 via-[#123d32]/85 to-[#123d32]/40" />

        <div className="site-container flex min-h-[590px] items-center py-24 md:min-h-[660px]">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <Leaf size={16} />
              Together, We Create Change
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Small Actions.
              <br />
              <span className="text-[#f3ad70]">
                Big Community
              </span>
              <br />
              Impact.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              Bring people together, support meaningful
              initiatives, and make your community a better
              place. Every action matters when we work
              together.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/upcoming-events"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#e58a45] px-7 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d87932]"
              >
                Explore Events
                <ArrowUpRight size={19} />
              </Link>

              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Join Our Community
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-white/80">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#f3ad70]" />
                Community First
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#f3ad70]" />
                Positive Change
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#f3ad70]" />
                Open to Everyone
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION / FEATURES */}
      <section className="section-padding">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Why Together?
            </span>

            <h2 className="section-heading mt-4">
              Change Starts When
              <span className="text-primary">
                {" "}We Come Together
              </span>
            </h2>

            <p className="section-description mx-auto mt-5">
              A better community does not happen overnight.
              It grows when individuals connect, share ideas,
              and take action for a common purpose.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="surface-card group p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={27} />
                  </div>

                  <span className="mt-7 block text-sm font-bold text-accent">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECENT UPCOMING EVENTS */}
      <section className="section-padding bg-secondary/40">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Get Involved
              </span>

              <h2 className="section-heading mt-3">
                Upcoming Community Events
              </h2>

              <p className="section-description mt-4">
                Discover opportunities to connect, volunteer,
                and make a difference in your community.
              </p>
            </div>

            <Link
              href="/upcoming-events"
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
            >
              View All Events
              <ArrowRight size={18} />
            </Link>
          </div>

          {error ? (
            <div className="surface-card mt-10 p-8 text-center">
              <CalendarDays
                size={36}
                className="mx-auto text-muted-foreground"
              />

              <h3 className="mt-4 text-xl font-bold">
                Events are temporarily unavailable
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Please make sure the Together API server is
                running and try again later.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-primary"
              >
                Explore Events
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : events.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                />
              ))}
            </div>
          ) : (
            <div className="surface-card mt-10 px-6 py-16 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
                <CalendarDays size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No Upcoming Events Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                New community events will appear here.
                Check back soon and be ready to make a difference!
              </p>

              <Link
                href="/register"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Join Our Community
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* COMMUNITY IMPACT STRIP */}
      <section className="brand-gradient py-16">
        <div className="site-container grid gap-10 text-center text-white sm:grid-cols-3">
          <div>
            <Users size={30} className="mx-auto text-[#f3ad70]" />
            <h3 className="mt-4 text-2xl font-bold">
              One Community
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Connected by a common purpose
            </p>
          </div>

          <div>
            <HeartHandshake
              size={30}
              className="mx-auto text-[#f3ad70]"
            />
            <h3 className="mt-4 text-2xl font-bold">
              Shared Purpose
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Supporting each other through action
            </p>
          </div>

          <div>
            <Globe2 size={30} className="mx-auto text-[#f3ad70]" />
            <h3 className="mt-4 text-2xl font-bold">
              Lasting Impact
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Building a better tomorrow together
            </p>
          </div>
        </div>
      </section>

      {/* STATIC GALLERY */}
      <section className="section-padding">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Our Community
            </span>

            <h2 className="section-heading mt-3">
              Moments That Matter
            </h2>

            <p className="section-description mx-auto mt-4">
              Every small effort creates a story worth sharing.
              Here is a glimpse of the spirit of community action.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-[220px] gap-5 md:grid-cols-3 md:auto-rows-[250px]">
            {gallery.map((item) => (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl bg-secondary bg-cover bg-center ${item.className}`}
                style={{
                  backgroundImage: `url("${item.image}")`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-colors group-hover:from-black/85" />

                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#f3ad70]">
                    {item.category}
                  </span>

                  <h3 className="mt-2 text-xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER UI - DESIGN ONLY */}
      <section className="section-padding bg-secondary/40">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-3xl bg-[#123d32] px-6 py-14 text-center text-white sm:px-12 md:py-20">
            <div className="absolute -right-20 -top-20 size-64 rounded-full border-[35px] border-white/5" />
            <div className="absolute -bottom-28 -left-16 size-64 rounded-full border-[35px] border-white/5" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#f3ad70]">
                <Mail size={27} />
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                Stay Connected.
                <br />
                Be Part of the Change.
              </h2>

              <p className="mt-5 leading-7 text-white/70">
                Discover upcoming community activities and
                stay inspired by the power of collective action.
              </p>

              <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  disabled
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="min-h-12 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  disabled
                  className="min-h-12 rounded-lg bg-[#e58a45] px-6 font-semibold text-white opacity-80 disabled:cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>

              <p className="mt-4 text-xs text-white/50">
                Newsletter subscription is coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
