import axios from "axios";

import { getSession } from "next-auth/client";
import { FormSubmitProps } from "../components";

const API = "https://api.spotify.com/v1";

interface ResponseMeTop {
  items: {
    name?: string;
    artists?: { name?: string }[];
    images?: { url?: string }[];
    album?: { images?: { url?: string }[] };
  }[];
}

interface GetMeTopParams {
  limit: number;
  timeRange: "long_term" | "medium_term" | "short_term";
  type: "artists" | "tracks";
  accessToken: string | null | undefined;
}

const getMeTop = async ({
  accessToken,
  limit,
  timeRange,
  type,
}: GetMeTopParams) => {
  const { data } = await axios.get<ResponseMeTop>(`${API}/me/top/${type}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { time_range: timeRange, limit },
  });

  return data.items.map((item) => ({
    title: item?.name ?? "",
    description: item?.artists?.[0].name ?? "",
    image: item?.images?.[0].url ?? item?.album?.images?.[0].url ?? "",
  }));
};

const getOppositeType = (type: "artists" | "tracks") =>
  type === "artists" ? "tracks" : "artists";

export const getData = async ({ timeRange, type }: FormSubmitProps) => {
  const session = await getSession();
  const accessToken = session?.user.accessToken;

  return getMeTop({
    accessToken,
    limit: 25,
    timeRange,
    type,
  });
};
