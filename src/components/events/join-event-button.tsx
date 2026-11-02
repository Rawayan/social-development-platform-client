"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

interface JoinEventButtonProps {
  eventId: string;
}

interface JoinResponse {
  success: boolean;
  message: string;
  data?: {
    joinId: string;
    eventId: string;
    userId: string;
  };
}

export default function JoinEventButton({
  eventId,
}: JoinEventButtonProps) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!session?.user) {
      router.push(
        `/login?callbackURL=${encodeURIComponent(
          `/events/${eventId}`
        )}`
      );

      return;
    }

    try {
      setLoading(true);

      const result = await apiFetch<JoinResponse>(
        "/api/joins",
        {
          method: "POST",
          body: JSON.stringify({
            eventId,
          }),
        }
      );

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message || "Successfully joined!");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to join this event"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <button
        disabled
        className="w-full rounded-full bg-muted px-6 py-3 font-semibold text-muted-foreground sm:w-auto"
      >
        Checking Login...
      </button>
    );
  }

  if (!session?.user) {
    return (
      <Link
        href={`/login?callbackURL=${encodeURIComponent(
          `/events/${eventId}`
        )}`}
        className="inline-flex w-full justify-center rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
      >
        Login to Join
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={loading}
      className="inline-flex w-full justify-center rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {loading ? "Joining..." : "Join This Event"}
    </button>
  );
}