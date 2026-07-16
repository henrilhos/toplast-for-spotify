"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { TimeRange, TopType } from "@/lib/types";

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "short_term", label: "1 month" },
  { value: "medium_term", label: "6 months" },
  { value: "long_term", label: "Overall" },
];

export function TopForm() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [pendingType, setPendingType] = useState<TopType | null>(null);
  const [isPending, startTransition] = useTransition();

  const submit = (type: TopType) => {
    setPendingType(type);
    startTransition(() => {
      router.push(`/collage?time_range=${timeRange}&type=${type}`);
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <fieldset
        aria-label="Time range"
        className="flex overflow-hidden rounded-md border border-foreground/20"
      >
        {TIME_RANGES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={timeRange === value}
            onClick={() => setTimeRange(value)}
            className={`cursor-pointer not-last:border-foreground/20 not-last:border-r px-4 py-2 font-medium text-sm transition-colors ${
              timeRange === value
                ? "bg-accent text-white"
                : "hover:bg-foreground/5"
            }`}
          >
            {label}
          </button>
        ))}
      </fieldset>

      <div className="flex gap-4">
        {(["tracks", "artists"] as const).map((type) => (
          <button
            key={type}
            type="button"
            disabled={isPending}
            onClick={() => submit(type)}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {isPending && pendingType === type && (
              <span
                aria-hidden
                className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            )}
            {type === "tracks" ? "Top tracks" : "Top artists"}
          </button>
        ))}
      </div>
    </div>
  );
}
