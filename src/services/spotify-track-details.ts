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

export const getSpotifyTrackDetails = async (
  trackId: string,
  spotifyAccessCode: string,
): Promise<SpotifyTrackDetails> => {
  try {
    const response: AxiosResponse<SpotifyTrackDetailsResponse> =
      await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${spotifyAccessCode}`,
        },
      })

    const { album, name } = response.data

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
