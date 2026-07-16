"use client";

import { toPng } from "html-to-image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Collage } from "@/components/collage/collage";
import type { CollageData, CollagePalette, TimeRange } from "@/lib/types";

export function CollageView({
  data,
  palette,
  timeRange,
}: {
  data: CollageData;
  palette: CollagePalette;
  timeRange: TimeRange;
}) {
  const collageRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = collageRef.current;
    if (!node) return;

    let cancelled = false;

    (async () => {
      // Wait for every image and the fonts to be fully ready — this replaces
      // the old app's arbitrary 1.5s setTimeout before capture.
      await Promise.all(
        Array.from(node.querySelectorAll("img")).map((img) =>
          img.decode().catch(() => {}),
        ),
      );
      await document.fonts.ready;

      // pixelRatio 2 → crisp 1500x1500 output.
      // If the capture ever comes out blank (CORS-tainted canvas), swap the
      // collage <img> srcs to the same-origin optimizer:
      //   /_next/image?url=<encoded>&w=750&q=75
      // (next.config images.remotePatterns already allows Spotify's CDNs.)
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        width: 750,
        height: 750,
      });
      if (!cancelled) setImage(dataUrl);
    })().catch(() => {
      if (!cancelled) setFailed(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const download = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `toplast_${Date.now()}.png`;
    link.click();
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-12">
      {/* Offscreen capture target */}
      <div aria-hidden className="left-[-9999px] top-[-9999px] fixed">
        <div ref={collageRef}>
          <Collage data={data} palette={palette} />
        </div>
      </div>

      {failed ? (
        <p className="max-w-md text-center opacity-70">
          We couldn't generate your collage image. Please try again.
        </p>
      ) : image ? (
        // biome-ignore lint/performance/noImgElement: data URL preview of the generated collage
        <img
          src={image}
          alt="Your TopLast collage"
          className="w-full max-w-175 rounded-lg shadow-lg"
        />
      ) : (
        <div className="aspect-square w-full max-w-175 animate-pulse rounded-lg bg-foreground/10" />
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={download}
          disabled={!image}
          className="rounded-md cursor-pointer bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          Download image
        </button>
        <Link
          href={`/?time_range=${timeRange}`}
          className="rounded-md border border-foreground/20 px-6 py-3 font-semibold transition-colors hover:bg-foreground/5"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
