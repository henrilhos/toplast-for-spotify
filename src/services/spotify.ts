import axios from 'axios'

const API = 'https://api.spotify.com/v1'

type ResponseMe = { display_name?: string; images?: Array<{ url?: string }> }
type ResponseMeTop = {
  items: Array<{
    name?: string
    artists?: Array<{ name?: string }>
    images?: Array<{ url?: string }>
    album?: { images?: Array<{ url?: string }> }
  }>
}

type GetUserInformation = { name: string; image: string }
type GetUserTopData = {
  chosenType: GetUserTopArtistsOrTracks[]
  otherType: GetUserTopArtistsOrTracks
}
type GetUserTopArtistsOrTracks = {
  title: string
  description: string
  image: string
  type: 'artists' | 'tracks'
}

type GetUserTopArtistsOrTracksParams = {
  limit: number
  timeRange: 'long_term' | 'medium_term' | 'short_term'
  type: 'artists' | 'tracks'
  token: string
}
type GetUserTopDataParams = {
  timeRange?: 'long_term' | 'medium_term' | 'short_term'
  type?: 'artists' | 'tracks'
  token: string
}

async function getUserInformation(token: string): Promise<GetUserInformation> {
  const { data } = await axios.get<ResponseMe>(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    name: data?.display_name ?? 'User',
    image: data?.images?.[0].url ?? '',
  }
}

async function getUserTopArtistsOrTracks({
  limit,
  timeRange,
  type,
  token,
}: GetUserTopArtistsOrTracksParams): Promise<GetUserTopArtistsOrTracks[]> {
  const { data } = await axios.get<ResponseMeTop>(`${API}/me/top/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { time_range: timeRange, limit },
  })

  return data.items.map((item) => ({
    title: item?.name ?? '',
    description: item?.artists?.[0].name ?? '',
    image: item?.images?.[0].url ?? item?.album?.images?.[0].url ?? '',
    type,
  }))
}

function getOppositeType(type: 'artists' | 'tracks') {
  if (type === 'artists') return 'tracks'
  return 'artists'
}

async function getUserTopData({
  type = 'artists',
  timeRange = 'short_term',
  token,
}: GetUserTopDataParams): Promise<GetUserTopData> {
  const chosenType = await getUserTopArtistsOrTracks({
    limit: 5,
    timeRange,
    type,
    token,
  })
  const [otherType] = await getUserTopArtistsOrTracks({
    limit: 1,
    timeRange,
    type: getOppositeType(type),
    token,
  })

  return { chosenType, otherType }
}

export { getUserInformation, getUserTopData }
export type { GetUserInformation, GetUserTopData, GetUserTopArtistsOrTracks }
