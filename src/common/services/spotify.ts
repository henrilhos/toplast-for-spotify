import axios from 'axios'

const API = 'https://api.spotify.com/v1'

type ResponseMe = { display_name?: string; images?: Array<{ url?: string }> }
export type UserInformation = { userName: string; userImage: string }

type ResponseMeTop = {
  items: Array<{
    name?: string
    images?: Array<{ url?: string }>
    album?: { images?: Array<{ url?: string }> }
    artists?: Array<{ name?: string }>
  }>
}
export type TopArtistsAndTracks = Array<{
  image: string
  title: string
  description?: string
}>

const getUserInformation = async (token: string): Promise<UserInformation> => {
  const dataFromApi = await axios.get<ResponseMe>(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    userName: dataFromApi?.data?.display_name ?? 'Who are you?',
    userImage: dataFromApi?.data?.images?.[0].url ?? '',
  }
}

const getUserTopArtistsAndTracks = async (
  token: string,
  type: 'artists' | 'tracks',
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term'
): Promise<TopArtistsAndTracks> => {
  const dataFromApi = await axios.get<ResponseMeTop>(`${API}/me/top/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      time_range: timeRange,
      limit: 5,
    },
  })

  return dataFromApi.data.items.map((data) => ({
    image: data?.images?.[0].url ?? data?.album?.images?.[0].url ?? 'image',
    title: data?.name ?? 'Title',
    description: data?.artists?.[0].name ?? undefined,
  }))
}

export { getUserInformation, getUserTopArtistsAndTracks }
