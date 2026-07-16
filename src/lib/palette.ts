import "server-only";

import { Vibrant } from "node-vibrant/node";
import type { CollagePalette, Swatch } from "@/lib/types";

const FALLBACK_SWATCH: Swatch = { bg: "#000", fg: "#fff" };

const FALLBACK_PALETTE: CollagePalette = {
  header: FALLBACK_SWATCH,
  body: FALLBACK_SWATCH,
  footer: FALLBACK_SWATCH,
  credits: FALLBACK_SWATCH,
};

export async function extractPalette(
  imageUrl: string,
): Promise<CollagePalette> {
  if (!imageUrl) return FALLBACK_PALETTE;

  try {
    const palette = await Vibrant.from(imageUrl).maxColorCount(32).getPalette();

    const toSwatch = (swatch: { hex: string; titleTextColor: string } | null) =>
      ({
        bg: swatch?.hex ?? FALLBACK_SWATCH.bg,
        fg: swatch?.titleTextColor ?? FALLBACK_SWATCH.fg,
      }) satisfies Swatch;

    return {
      header: toSwatch(palette.DarkVibrant),
      body: toSwatch(palette.DarkMuted),
      footer: toSwatch(palette.LightMuted),
      credits: toSwatch(palette.DarkVibrant),
    };
  } catch {
    // A CDN hiccup should never break the collage — fall back to black/white.
    return FALLBACK_PALETTE;
  }
}
