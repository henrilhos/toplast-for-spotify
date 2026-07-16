import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CollageView } from "@/components/collage/collage-view";
import { extractPalette } from "@/lib/palette";
import { getCollageData, SpotifyApiError } from "@/lib/spotify";
import { parseTimeRange, parseTopType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Collage",
};

export default async function CollagePage(props: PageProps<"/collage">) {
  const searchParams = await props.searchParams;
  const type = parseTopType(searchParams.type);
  const timeRange = parseTimeRange(searchParams.time_range);

  const session = await auth();
  if (!session?.accessToken || session.error) {
    redirect("/");
  }

  let data: Awaited<ReturnType<typeof getCollageData>>;
  try {
    data = await getCollageData({
      accessToken: session.accessToken,
      type,
      timeRange,
    });
  } catch (error) {
    if (error instanceof SpotifyApiError && error.status === 401) {
      redirect("/");
    }
    throw error;
  }

  const palette = await extractPalette(data.header.image);

  return <CollageView data={data} palette={palette} />;
}
