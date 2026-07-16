"use client";

import { toPng } from "html-to-image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Collage } from "@/components/collage/collage";
import type { CollageData, CollagePalette } from "@/lib/types";

export function CollageView({
  data,
  palette,
}: {
  data: CollageData;
  palette: CollagePalette;
}) {
  const collageRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = collageRef.current;
    if (!node) return;

    let cancelled = false;

    (async () => {
      await Promise.all(
        Array.from(node.querySelectorAll("img")).map((img) =>
          img.decode().catch(() => {}),
        ),
      );
      await document.fonts.ready;

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
      <div aria-hidden className="fixed top-[-9999px] left-[-9999px]">
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
          className="cursor-pointer rounded-md bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          Download image
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
