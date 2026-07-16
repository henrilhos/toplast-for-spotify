export type TimeRange = "short_term" | "medium_term" | "long_term";

export type TopType = "artists" | "tracks";

export interface CollageItem {
  title: string;
  description: string;
  image: string;
  type: TopType;
}

export interface CollageData {
  header: CollageItem;
  body: CollageItem[];
  footer: CollageItem | null;
}

export interface Swatch {
  bg: string;
  fg: string;
}

export interface CollagePalette {
  header: Swatch;
  body: Swatch;
  footer: Swatch;
  credits: Swatch;
}

export function parseTimeRange(value: unknown): TimeRange {
  return value === "medium_term" || value === "long_term"
    ? value
    : "short_term";
}

export function parseTopType(value: unknown): TopType {
  return value === "artists" ? "artists" : "tracks";
}
