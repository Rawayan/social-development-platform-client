
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  LoaderCircle,
  Save,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function ProfileContent() {
  const router = useRouter();

  const {
    data: session,
    isPending,
    refetch,
  } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // Load current user information.
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImageUrl(user.image || "");
    }
  }, [user]);

  const validateProfile = () => {
    if (name.trim().length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return false;
    }

    if (name.trim().length > 80) {
      toast.error("Name cannot exceed 80 characters.");
      return false;
    }

    if (imageUrl.trim()) {
      try {
        const image = new URL(imageUrl.trim());

        if (
          image.protocol !== "https:" &&
          image.protocol !== "http:"
        ) {
          toast.error("Profile image must use HTTP or HTTPS.");
          return false;
        }
      } catch {
        toast.error("Please enter a valid profile image URL.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || saving) return;
    if (!validateProfile()) return;

    const updatedName = name.trim();
    const updatedImage = imageUrl.trim();

    try {
      setSaving(true);

      // BetterAuth handles the authenticated profile update.
      const { error } = await authClient.updateUser({
        name: updatedName,
        image: updatedImage || null,
      });

      if (error) {
        throw new Error(error.message || "Profile update failed.");
      }

      // Refresh the authentication session.
      await refetch();

      toast.success("Your profile has been updated successfully.");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="site-container section-padding">
        <div className="surface-card mx-auto max-w-3xl animate-pulse rounded-2xl p-8">
          <div className="mx-auto mb-6 size-28 rounded-full bg-muted" />
          <div className="mx-auto mb-4 h-7 w-48 rounded bg-muted" />
          <div className="h-12 rounded-xl bg-muted" />
          <div className="mt-4 h-12 rounded-xl bg-muted" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="site-container section-padding">
        <div className="surface-card mx-auto max-w-3xl rounded-2xl p-8 text-center">
          <h1 className="text-xl font-bold">
            Unable to load your profile
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please sign in again to view your profile.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="section-padding">
      <div className="site-container">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Account Settings
          </p>

          <h1 className="section-heading">My Profile</h1>

          <p className="section-description mt-4">
            Manage your personal information and profile photo.
          </p>
        </div>

        <div className="surface-card mx-auto max-w-3xl overflow-hidden rounded-2xl">
          {/* Profile Header */}
          <div className="brand-gradient px-6 py-10 text-center sm:px-10">
            <div className="mx-auto mb-4 flex size-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/80 bg-white/20">
              {imageUrl.trim() ? (
                <img
                  src={imageUrl}
                  alt="Profile preview"
                  className="size-full object-cover"
                />
              ) : (
                <UserRound size={46} className="text-white" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-white">
              {name || user.name}
            </h2>

            <p className="mt-1 text-sm text-white/80">
              {user.email}
            </p>
          </div>

          {/* Profile Form */}
          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  minLength={2}
                  maxLength={80}
                  required
                  className="w-full rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-input bg-muted px-4 py-3 text-muted-foreground outline-none"
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Your registered email address cannot be changed here.
                </p>
              </div>

              <div>
                <label
                  htmlFor="profile-image"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                >
                  <Camera size={16} />
                  Profile Photo URL
                </label>

                <input
                  id="profile-image"
                  type="url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full rounded-xl border border-input bg-white/50 backdrop-blur-sm dark:bg-white/5 px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring"
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Provide a public HTTP or HTTPS image URL. Leave empty
                  to remove your profile photo.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}

                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setName(user.name || "");
                    setImageUrl(user.image || "");
                  }}
                  className="rounded-xl border border-border px-7 py-3 font-semibold transition hover:bg-muted disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
