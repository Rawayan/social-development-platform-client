
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Pencil,
  RefreshCw,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { apiFetch } from "@/lib/api-client";
import {
  getMyCreatedEvents,
  type CommunityEvent,
} from "@/lib/events";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Community Support",
  "Other",
] as const;

type EventFormData = {
  title: string;
  description: string;
  eventType: (typeof eventTypes)[number];
  imageUrl: string;
  location: string;
  eventDate: string;
};

type ManageEventsResponse = {
  success: boolean;
  message: string;
  data: CommunityEvent;
};

function toLocalDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

function getMinimumDateTime() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;

  return new Date(now.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

function createFormData(event: CommunityEvent): EventFormData {
  return {
    title: event.title,
    description: event.description,
    eventType: event.eventType as EventFormData["eventType"],
    imageUrl: event.imageUrl,
    location: event.location,
    eventDate: toLocalDateTime(event.eventDate),
  };
}

function EventSkeleton() {
  return (
    <div className="surface-card animate-pulse overflow-hidden rounded-2xl">
      <div className="h-48 bg-muted" />
      <div className="space-y-4 p-5">
        <div className="h-5 w-1/3 rounded bg-muted" />
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function ManageEventsContent() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventFormData | null>(null);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyCreatedEvents();

      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your events."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const handleEdit = (event: CommunityEvent) => {
    setEditingId(event._id);
    setFormData(createFormData(event));
    setConfirmDeleteId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(null);
  };

  const handleChange = (
    field: keyof EventFormData,
    value: string
  ) => {
    setFormData((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous
    );
  };

  const validateForm = (data: EventFormData) => {
    if (data.title.trim().length < 3) {
      toast.error("Title must contain at least 3 characters.");
      return false;
    }

    if (data.description.trim().length < 10) {
      toast.error("Description must contain at least 10 characters.");
      return false;
    }

    if (data.location.trim().length < 2) {
      toast.error("Please enter a valid location.");
      return false;
    }

    try {
      const imageURL = new URL(data.imageUrl);

      if (
        imageURL.protocol !== "https:" &&
        imageURL.protocol !== "http:"
      ) {
        toast.error("Image URL must use HTTP or HTTPS.");
        return false;
      }
    } catch {
      toast.error("Please enter a valid image URL.");
      return false;
    }

    const selectedDate = new Date(data.eventDate);

    if (
      !data.eventDate ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.getTime() <= Date.now()
    ) {
      toast.error("Event date must be in the future.");
      return false;
    }

    return true;
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingId || !formData || saving) return;
    if (!validateForm(formData)) return;

    try {
      setSaving(true);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        eventType: formData.eventType,
        imageUrl: formData.imageUrl.trim(),
        location: formData.location.trim(),
        eventDate: new Date(formData.eventDate).toISOString(),
      };

      const response = await apiFetch<ManageEventsResponse>(
        `/api/events/${encodeURIComponent(editingId)}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );

      if (!response.success) {
        throw new Error(response.message || "Event update failed.");
      }

      toast.success(response.message || "Event updated successfully.");

      setEvents((previous) =>
        previous.map((event) =>
          event._id === editingId ? response.data : event
        )
      );

      setEditingId(null);
      setFormData(null);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to update event."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (deletingId) return;

    try {
      setDeletingId(eventId);

      const response = await apiFetch<{
        success: boolean;
        message: string;
      }>(
        `/api/events/${encodeURIComponent(eventId)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.success) {
        throw new Error(response.message || "Event deletion failed.");
      }

      setEvents((previous) =>
        previous.filter((event) => event._id !== eventId)
      );

      if (editingId === eventId) {
        setEditingId(null);
        setFormData(null);
      }

      setConfirmDeleteId(null);

      toast.success(response.message || "Event deleted successfully.");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to delete event."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="section-padding">
      <div className="site-container">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Event Dashboard
          </p>

          <h1 className="section-heading">Manage Your Events</h1>

          <p className="section-description mt-4">
            Update event information, manage your activities,
            and keep your community events organized.
          </p>
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="surface-card rounded-2xl p-8 text-center">
            <p className="mb-4 text-destructive">{error}</p>

            <button
              type="button"
              onClick={() => void loadEvents()}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="surface-card rounded-2xl px-6 py-16 text-center">
            <CalendarDays
              size={42}
              className="mx-auto mb-5 text-primary"
            />

            <h2 className="mb-3 text-xl font-bold">
              No Events Created Yet
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
              You have not created any community events yet.
              Start organizing something meaningful.
            </p>

            <Link
              href="/create-event"
              className="inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              Create Your First Event
            </Link>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                You have created{" "}
                <strong className="text-foreground">
                  {events.length}
                </strong>{" "}
                {events.length === 1 ? "event" : "events"}.
              </p>

              <Link
                href="/create-event"
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Create New Event
              </Link>
            </div>

            <div className="space-y-6">
              {events.map((event) => {
                const isEditing = editingId === event._id;
                const isConfirming = confirmDeleteId === event._id;

                return (
                  <article
                    key={event._id}
                    className="surface-card overflow-hidden rounded-2xl"
                  >
                    <div className="grid md:grid-cols-[260px_1fr]">
                      <div className="min-h-52 bg-muted">
                        {event.imageUrl ? (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-full min-h-52 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full min-h-52 items-center justify-center text-muted-foreground">
                            No event image
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between gap-5 p-5 sm:p-7">
                        <div>
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                              {event.eventType}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {new Date(event.eventDate).toLocaleString()}
                            </span>
                          </div>

                          <h2 className="mb-3 text-xl font-bold">
                            {event.title}
                          </h2>

                          <p className="mb-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                            {event.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin size={16} className="text-primary" />
                            {event.location}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Link
                            href={`/events/${event._id}`}
                            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
                          >
                            View
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleEdit(event)}
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setConfirmDeleteId(event._id);
                              setEditingId(null);
                              setFormData(null);
                            }}
                            className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>

                        {isConfirming && (
                          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                            <p className="mb-3 text-sm font-semibold">
                              Are you sure you want to delete this event?
                            </p>

                            <p className="mb-4 text-xs text-muted-foreground">
                              This action cannot be undone. Associated join records will also be removed.
                            </p>

                            <div className="flex flex-wrap gap-3">
                              <button
                                type="button"
                                disabled={deletingId === event._id}
                                onClick={() => void handleDelete(event._id)}
                                className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                              >
                                {deletingId === event._id
                                  ? "Deleting..."
                                  : "Yes, Delete"}
                              </button>

                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {isEditing && formData && (
                      <div className="border-t border-border bg-muted/20 p-5 sm:p-7">
                        <div className="mb-6 flex items-center justify-between gap-3">
                          <h3 className="text-lg font-bold">
                            Update Event
                          </h3>

                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="rounded-lg p-2 hover:bg-muted"
                            aria-label="Close edit form"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <form
                          onSubmit={handleUpdate}
                          className="grid gap-5 md:grid-cols-2"
                        >
                          <div>
                            <label
                              htmlFor={`title-${event._id}`}
                              className="mb-2 block text-sm font-semibold"
                            >
                              Event Title
                            </label>

                            <input
                              id={`title-${event._id}`}
                              value={formData.title}
                              onChange={(e) =>
                                handleChange("title", e.target.value)
                              }
                              minLength={3}
                              maxLength={100}
                              required
                              className="w-full rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`type-${event._id}`}
                              className="mb-2 block text-sm font-semibold"
                            >
                              Event Type
                            </label>

                            <select
                              id={`type-${event._id}`}
                              value={formData.eventType}
                              onChange={(e) =>
                                handleChange("eventType", e.target.value)
                              }
                              className="w-full rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                            >
                              {eventTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label
                              htmlFor={`description-${event._id}`}
                              className="mb-2 block text-sm font-semibold"
                            >
                              Description
                            </label>

                            <textarea
                              id={`description-${event._id}`}
                              value={formData.description}
                              onChange={(e) =>
                                handleChange("description", e.target.value)
                              }
                              minLength={10}
                              maxLength={2000}
                              rows={4}
                              required
                              className="w-full resize-y rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`image-${event._id}`}
                              className="mb-2 block text-sm font-semibold"
                            >
                              Image URL
                            </label>

                            <input
                              id={`image-${event._id}`}
                              type="url"
                              value={formData.imageUrl}
                              onChange={(e) =>
                                handleChange("imageUrl", e.target.value)
                              }
                              required
                              className="w-full rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`location-${event._id}`}
                              className="mb-2 block text-sm font-semibold"
                            >
                              Location
                            </label>

                            <input
                              id={`location-${event._id}`}
                              value={formData.location}
                              onChange={(e) =>
                                handleChange("location", e.target.value)
                              }
                              minLength={2}
                              maxLength={150}
                              required
                              className="w-full rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label
                              htmlFor={`date-${event._id}`}
                              className="mb-2 block text-sm font-semibold"
                            >
                              Event Date
                            </label>

                            <input
                              id={`date-${event._id}`}
                              type="datetime-local"
                              min={getMinimumDateTime()}
                              value={formData.eventDate}
                              onChange={(e) =>
                                handleChange("eventDate", e.target.value)
                              }
                              required
                              className="w-full rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                            />
                          </div>

                          <div className="flex flex-wrap gap-3 md:col-span-2">
                            <button
                              type="submit"
                              disabled={saving}
                              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                            >
                              <Save size={16} />
                              {saving ? "Saving..." : "Save Changes"}
                            </button>

                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              disabled={saving}
                              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
