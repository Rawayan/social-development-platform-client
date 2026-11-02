
export interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  createdAt: string;
}

interface EventsApiResponse {
  success: boolean;
  message: string;
  count: number;
  data: CommunityEvent[];
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getRecentEvents(): Promise<{
  events: CommunityEvent[];
  error: string | null;
}> {
  try {
    const response = await fetch(
      `${API_URL}/api/events/recent`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load events. Server returned ${response.status}.`
      );
    }

    const result =
      (await response.json()) as EventsApiResponse;

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Invalid events response from server.");
    }

    return {
      events: result.data,
      error: null,
    };
  } catch (error) {
    console.error("Recent events error:", error);

    return {
      events: [],
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong while loading events.",
    };
  }
}


export async function getUpcomingEvents(): Promise<{
  events: CommunityEvent[];
  error: string | null;
}> {
  try {
    const response = await fetch(`${API_URL}/api/events`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming events");
    }

    const result: {
      success: boolean;
      message: string;
      count: number;
      data: CommunityEvent[];
    } = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Invalid events response");
    }

    return {
      events: result.data,
      error: null,
    };
  } catch (error) {
    console.error("Upcoming Events Error:", error);

    return {
      events: [],
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function getEventById(
  id: string
): Promise<{
  event: CommunityEvent | null;
  error: string | null;
}> {
  try {
    const response = await fetch(
      `${API_URL}/api/events/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return {
        event: null,
        error: "Event not found",
      };
    }

    if (!response.ok) {
      throw new Error("Failed to fetch event details");
    }

    const result: {
      success: boolean;
      message: string;
      data: CommunityEvent;
    } = await response.json();

    if (!result.success || !result.data) {
      throw new Error("Invalid event response");
    }

    return {
      event: result.data,
      error: null,
    };
  } catch (error) {
    console.error("Event Details Error:", error);

    return {
      event: null,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}

import { apiFetch } from "@/lib/api-client";

export type JoinedCommunityEvent = CommunityEvent & {
  joinedAt: string | null;
};

type JoinedEventsResponse = {
  success: boolean;
  count: number;
  data: JoinedCommunityEvent[];
};

export async function getMyJoinedEvents(): Promise<JoinedCommunityEvent[]> {
  const response = await apiFetch<JoinedEventsResponse>(
    "/api/joins/my-events"
  );

  if (!response.success) {
    throw new Error("Failed to load joined events.");
  }

  return response.data;
}