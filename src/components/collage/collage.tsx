import type { CollageData, CollagePalette } from "@/lib/types";

function singular(type: "artists" | "tracks") {
  return type === "artists" ? "artist" : "track";
}

/**
 * The 750x750 capture target for the PNG export. Pure presentational —
 * palette colors are runtime values, so they're applied via inline styles.
 *
 * Plain <img> (not next/image) is intentional: html-to-image captures the
 * exact DOM, and srcset/lazy-loading get in the way of a pixel-perfect
 * canvas snapshot. crossOrigin="anonymous" keeps the canvas untainted
 * (Spotify's CDN sends Access-Control-Allow-Origin: *).
 */
export function Collage({
  data,
  palette,
}: {
  data: CollageData;
  palette: CollagePalette;
}) {
  const { header, body, footer } = data;
  const isArtists = header.type === "artists";

  return (
    <div className="h-[750px] w-[750px] text-left">
      {/* Header — hero item */}
      <div
        className="relative h-[325px]"
        style={{ backgroundColor: palette.header.bg, color: palette.header.fg }}
      >
        {header.image && (
          // biome-ignore lint/performance/noImgElement: canvas capture needs a plain same-DOM <img>
          <img
            src={header.image}
            alt={header.title}
            crossOrigin="anonymous"
            className="absolute top-0 right-0 h-full w-[325px] object-cover object-[50%_25%]"
          />
        )}
        <div
          className="absolute top-0 h-full w-[330px]"
          style={{
            left: 425,
            background: `linear-gradient(90deg, ${palette.header.bg} 5%, transparent 100%)`,
          }}
        />
        <div className="relative flex h-full flex-col justify-center gap-1 pr-[340px] pl-[30px]">
          <span className="font-light text-xl">
            Most listened {singular(header.type)}
          </span>
          <span className="truncate font-bold text-4xl">{header.title}</span>
          {header.description && (
            <span className="truncate font-light text-2xl">
              {header.description}
            </span>
          )}
        </div>
      </div>

      {/* Body — items 2-5 */}
      <div
        className="flex h-[275px] items-center"
        style={{ backgroundColor: palette.body.bg, color: palette.body.fg }}
      >
        <div className="grid w-full grid-cols-4 gap-6 px-6">
          {body.map((item) => (
            <div
              key={`${item.title}-${item.description}`}
              className="flex min-w-0 flex-col items-center gap-1 text-center"
            >
              {item.image && (
                // biome-ignore lint/performance/noImgElement: canvas capture needs a plain same-DOM <img>
                <img
                  src={item.image}
                  alt={item.title}
                  crossOrigin="anonymous"
                  className={`aspect-square w-[130px] object-cover ${
                    isArtists ? "rounded-full" : ""
                  }`}
                />
              )}
              <span className="w-full truncate font-semibold text-lg">
                {item.title}
              </span>
              {item.description && (
                <span className="w-full truncate text-base">
                  {item.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer — #1 of the opposite type + credits */}
      <div
        className="flex h-[150px]"
        style={{ backgroundColor: palette.footer.bg, color: palette.footer.fg }}
      >
        <div className="flex w-[500px] items-center gap-5 p-6">
          {footer && (
            <>
              {footer.image && (
                // biome-ignore lint/performance/noImgElement: canvas capture needs a plain same-DOM <img>
                <img
                  src={footer.image}
                  alt={footer.title}
                  crossOrigin="anonymous"
                  className={`aspect-square h-full object-cover ${
                    footer.type === "artists" ? "rounded-full" : ""
                  }`}
                />
              )}
              <div className="flex min-w-0 flex-col">
                <span className="font-light text-sm">
                  Most listened {singular(footer.type)}
                </span>
                <span className="truncate font-bold text-2xl">
                  {footer.title}
                </span>
                {footer.description && (
                  <span className="truncate font-light text-base">
                    {footer.description}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex w-[250px] flex-col-reverse items-end p-6">
          <span
            className="rounded px-3 py-1 font-semibold text-sm uppercase tracking-wider"
            style={{
              backgroundColor: palette.credits.bg,
              color: palette.credits.fg,
            }}
          >
            spotify.toplast.app
          </span>
        </div>
      </div>
    </div>
  );
}
