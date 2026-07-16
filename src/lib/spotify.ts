import "server-only";

import type { CollageData, CollageItem, TimeRange, TopType } from "@/lib/types";

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

export class SpotifyApiError extends Error {
  constructor(public status: number) {
    super(`Spotify API request failed with status ${status}`);
    this.name = "SpotifyApiError";
  }
}

interface SpotifyImage {
  url: string;
}

interface SpotifyTopItem {
  name: string;
  artists?: { name: string }[];
  images?: SpotifyImage[];
  album?: { images: SpotifyImage[] };
}

function toCollageItem(item: SpotifyTopItem, type: TopType): CollageItem {
  return {
    title: item.name,
    description: item.artists?.[0]?.name ?? "",
    image: item.images?.[0]?.url ?? item.album?.images[0]?.url ?? "",
    type,
  };
}

async function getTopItems({
  accessToken,
  type,
  timeRange,
  limit,
}: {
  accessToken: string;
  type: TopType;
  timeRange: TimeRange;
  limit: number;
}): Promise<CollageItem[]> {
  const params = new URLSearchParams({
    time_range: timeRange,
    limit: String(limit),
  });
  const response = await fetch(`${SPOTIFY_API_URL}/me/top/${type}?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new SpotifyApiError(response.status);
  }

  const data: { items: SpotifyTopItem[] } = await response.json();
  return data.items.map((item) => toCollageItem(item, type));
}

export async function getCollageData({
  accessToken,
  type,
  timeRange,
}: {
  accessToken: string;
  type: TopType;
  timeRange: TimeRange;
}): Promise<CollageData> {
  const oppositeType: TopType = type === "artists" ? "tracks" : "artists";

  const [main, opposite] = await Promise.all([
    getTopItems({ accessToken, type, timeRange, limit: 5 }),
    getTopItems({ accessToken, type: oppositeType, timeRange, limit: 1 }),
  ]);

  const [header, ...body] = main;
  if (!header) {
    throw new Error(
      "Not enough listening history to build a collage. Listen to some music on Spotify and try again!",
    );
  }

  return { header, body, footer: opposite[0] ?? null };
}
