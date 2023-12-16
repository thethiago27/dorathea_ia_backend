import axios, { AxiosResponse } from 'axios'

interface SpotifyImage {
  url: string
  height: number
  width: number
}

interface SpotifyTrackDetailsResponse {
  album: {
    name: string
    images: SpotifyImage[]
  }
  name: string
}

interface SpotifyTrackDetails {
  album: string
  albumImage: string
  name: string
}

const SPOTIFY_API_TRACK_ENDPOINT = 'https://api.spotify.com/v1/tracks/'
const BEARER = 'Bearer '

export async function getAxiosResponse(
  trackId: string,
  spotifyAuthToken: string,
): Promise<AxiosResponse<SpotifyTrackDetailsResponse>> {
  return await axios.get(`${SPOTIFY_API_TRACK_ENDPOINT}${trackId}`, {
    headers: {
      Authorization: `${BEARER}${spotifyAuthToken}`,
    },
  })
}

export const getSpotifyTrackDetails = async (
  trackId: string,
  spotifyAuthToken: string,
): Promise<SpotifyTrackDetails> => {
  try {
    const response = await getAxiosResponse(trackId, spotifyAuthToken)
    const spotifyTrackDetails = response.data
    const { album, name } = spotifyTrackDetails
    const albumImage: string = album.images[1]?.url || ''

    return {
      album: album.name,
      albumImage,
      name,
    }
  } catch (error) {
    console.error('Error fetching Spotify track details:', error)
    throw new Error('Failed to fetch Spotify track details')
  }
}
