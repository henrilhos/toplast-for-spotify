import axios from 'axios'

const API = 'https://api.spotify.com/v1'

type ResponseMe = { display_name?: string; images?: Array<{ url?: string }> }
export type UserInformation = { userName: string; userImage: string }

const getUserInformation = async (token: string): Promise<UserInformation> => {
  const dataFromApi = await axios.get<ResponseMe>(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    userName: dataFromApi?.data?.display_name ?? 'Who are you?',
    userImage: dataFromApi?.data?.images?.[0].url ?? '',
  }
}

export { getUserInformation }
