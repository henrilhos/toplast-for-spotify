import { ImageResponse } from "next/og";

export const alt = "TopLast for Spotify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: "#e53e3e",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700 }}>TopLast</div>
      <div style={{ fontSize: 36, opacity: 0.9 }}>
        Your most listened artists and tracks, as a collage
      </div>
      <div style={{ fontSize: 28, opacity: 0.7 }}>spotify.toplast.app</div>
    </div>,
    size,
  );
}
