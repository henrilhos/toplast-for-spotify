"use client";

import Link from "next/link";

export default function CollageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <h1 className="font-bold text-2xl">Something went wrong</h1>
      <p className="max-w-md opacity-70">
        {error.message || "We couldn't build your collage. Please try again."}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-foreground/20 px-6 py-3 font-semibold transition-colors hover:bg-foreground/5"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
