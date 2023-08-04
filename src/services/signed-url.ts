import { generateRandomString } from './random-string'
import { stringify } from 'querystring'

export const getSignedUrl = async () => {
  const scope = 'user-read-private user-read-email playlist-modify-private'

  const url = {
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: `${process.env.BASE_URL}/callback`,
    state: generateRandomString(16),
  }

  return `https://accounts.spotify.com/authorize?${stringify(url)}`
}
