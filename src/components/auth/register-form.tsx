
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { getSafeCallbackURL } from "@/lib/auth-redirect";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const validateForm = () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (photoUrl.trim()) {
      try {
        const url = new URL(photoUrl.trim());

        if (
          url.protocol !== "http:" &&
          url.protocol !== "https:"
        ) {
          toast.error("Photo URL must use HTTP or HTTPS.");
          return false;
        }
      } catch {
        toast.error("Please enter a valid photo URL.");
        return false;
      }
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter."
      );
      return false;
    }

    if (!/[a-z]/.test(password)) {
      toast.error(
        "Password must contain at least one lowercase letter."
      );
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const callbackURL = getSafeCallbackURL();

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: photoUrl.trim() || undefined,
        callbackURL,
      });

     if (error) {
  console.log("========== BETTER AUTH ERROR ==========");
  console.log("Error object:", error);
  console.log("Error message:", error.message);
  console.log("Error status:", error.status);
  console.log("Error statusText:", error.statusText);
  console.log("Error code:", error.code);
  console.log("Error details:", JSON.stringify(error, null, 2));
  console.log("=======================================");

  toast.error(
    error.message || "Registration failed. Please try again."
  );

  return;
}

      toast.success("Account created successfully!");

      router.replace(callbackURL);
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubRegister = async () => {
    setIsSocialLoading(true);

    try {
      const callbackURL = getSafeCallbackURL();

      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL,
      });

      if (error) {
        toast.error(
          error.message || "GitHub registration failed."
        );
        setIsSocialLoading(false);
      }
    } catch (error) {
      console.error("GitHub registration error:", error);

      toast.error("Unable to connect with GitHub.");
      setIsSocialLoading(false);
    }
  };

  const isSubmitting = isLoading || isSocialLoading;

  return (
    <section className="site-container section-padding flex min-h-[75vh] items-center justify-center">
      <div className="surface-card w-full max-w-lg rounded-2xl p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Leaf size={28} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Join Together
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create an account and start making a difference.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="register-name"
              className="mb-2 block text-sm font-medium"
            >
              Full Name
            </label>

            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-medium"
            >
              Email Address
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="register-photo"
              className="mb-2 block text-sm font-medium"
            >
              Profile Photo URL
              <span className="ml-1 text-muted-foreground">
                (Optional)
              </span>
            </label>

            <input
              id="register-photo"
              name="photoUrl"
              type="url"
              autoComplete="url"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="https://example.com/photo.jpg"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                disabled={isSubmitting}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Minimum 6 characters, including at least one uppercase
              and one lowercase letter.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Enter your password again"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                disabled={isSubmitting}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground disabled:opacity-50"
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* GitHub Registration */}
        <button
          type="button"
          onClick={handleGithubRegister}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-input px-4 py-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.04 3.5 1.55.1-.72.4-1.21.72-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>

          {isSocialLoading
            ? "Connecting to GitHub..."
            : "Continue with GitHub"}
        </button>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
