
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ImagePlus,
  MapPin,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { apiFetch } from "@/lib/api-client";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Community Support",
  "Other",
] as const;

type EventType = (typeof eventTypes)[number];

type EventFormData = {
  title: string;
  description: string;
  eventType: EventType;
  imageUrl: string;
  location: string;
  eventDate: string;
};

type CreateEventResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
  };
};

const initialFormData: EventFormData = {
  title: "",
  description: "",
  eventType: "Cleanup",
  imageUrl: "",
  location: "",
  eventDate: "",
};

function getLocalDateTimeMin() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;

  return new Date(now.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

export default function CreateEventPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<EventFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (
    field: keyof EventFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (formData.title.trim().length < 3) {
      toast.error("Event title must contain at least 3 characters.");
      return false;
    }

    if (formData.description.trim().length < 10) {
      toast.error("Description must contain at least 10 characters.");
      return false;
    }

    if (!formData.imageUrl.trim()) {
      toast.error("Please provide an event image URL.");
      return false;
    }

    try {
      const imageURL = new URL(formData.imageUrl);

      if (
        imageURL.protocol !== "https:" &&
        imageURL.protocol !== "http:"
      ) {
        toast.error("Please provide a valid HTTP or HTTPS image URL.");
        return false;
      }
    } catch {
      toast.error("Please enter a valid image URL.");
      return false;
    }

    if (formData.location.trim().length < 2) {
      toast.error("Please enter a valid event location.");
      return false;
    }

    if (!formData.eventDate) {
      toast.error("Please select an event date and time.");
      return false;
    }

    const selectedDate = new Date(formData.eventDate);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.getTime() <= Date.now()
    ) {
      toast.error("Event date must be in the future.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        eventType: formData.eventType,
        imageUrl: formData.imageUrl.trim(),
        location: formData.location.trim(),
        eventDate: new Date(
          formData.eventDate
        ).toISOString(),
      };

      const response =
        await apiFetch<CreateEventResponse>(
          "/api/events",
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );

      toast.success(
        response.message || "Event created successfully!"
      );

      setFormData(initialFormData);

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create event. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          {/* PAGE HEADER */}
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Make a Difference
            </span>

            <h1 className="section-heading mt-3">
              Create a Community Event
            </h1>

            <p className="section-description mx-auto mt-4">
              Bring people together and organize something
              meaningful for your community.
            </p>
          </div>

          {/* FORM */}
          <div className="surface-card p-5 sm:p-8 md:p-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* TITLE */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Event Title *
                </label>

                <input
                  id="title"
                  type="text"
                  required
                  minLength={3}
                  maxLength={100}
                  value={formData.title}
                  onChange={(event) =>
                    handleChange("title", event.target.value)
                  }
                  placeholder="Example: Community Cleanup Day"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Event Description *
                </label>

                <textarea
                  id="description"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  value={formData.description}
                  onChange={(event) =>
                    handleChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe the event, its purpose, and how people can participate..."
                  className="w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />

                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {formData.description.length}/2000
                </p>
              </div>

              {/* EVENT TYPE */}
              <div>
                <label
                  htmlFor="eventType"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Event Type *
                </label>

                <select
                  id="eventType"
                  required
                  value={formData.eventType}
                  onChange={(event) =>
                    handleChange(
                      "eventType",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* IMAGE URL */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  <ImagePlus size={17} className="text-primary" />
                  Event Thumbnail Image URL *
                </label>

                <input
                  id="imageUrl"
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(event) =>
                    handleChange(
                      "imageUrl",
                      event.target.value
                    )
                  }
                  placeholder="https://example.com/event-image.jpg"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />

                {formData.imageUrl && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-border">
                    <img
                      src={formData.imageUrl}
                      alt="Event image preview"
                      className="h-48 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* LOCATION */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  <MapPin size={17} className="text-primary" />
                  Event Location *
                </label>

                <input
                  id="location"
                  type="text"
                  required
                  minLength={2}
                  maxLength={150}
                  value={formData.location}
                  onChange={(event) =>
                    handleChange(
                      "location",
                      event.target.value
                    )
                  }
                  placeholder="Example: Dhanmondi, Dhaka"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              {/* DATE */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  <CalendarDays
                    size={17}
                    className="text-primary"
                  />
                  Event Date & Time *
                </label>

                <input
                  id="eventDate"
                  type="datetime-local"
                  required
                  min={getLocalDateTimeMin()}
                  value={formData.eventDate}
                  onChange={(event) =>
                    handleChange(
                      "eventDate",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Past dates and times are not allowed.
                </p>
              </div>

              {/* SUBMIT */}
              <button
  type="submit"
  disabled={isSubmitting}
  aria-busy={isSubmitting}
  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSubmitting ? (
    <>
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
      Creating Event...
    </>
  ) : (
    <>
      <Send size={18} />
      Create Event
    </>
  )}
</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
