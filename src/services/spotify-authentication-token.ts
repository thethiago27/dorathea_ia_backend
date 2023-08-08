import { PrismaClient } from '@prisma/client'
import axios from 'axios'

interface SpotifyAuthenticationTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export const getSpotifyAuthenticationToken = async (
  prisma: PrismaClient,
): Promise<string> => {
  const authCredentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  const authEncoded = Buffer.from(authCredentials).toString('base64')

  const headers = {
    Authorization: `Basic ${authEncoded}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const authOptions = {
    headers,
    method: 'POST' as const,
    url: 'https://accounts.spotify.com/api/token',
    data: new URLSearchParams({
      grant_type: 'client_credentials',
    }).toString(),
  }

  try {
    const response = await axios.request<SpotifyAuthenticationTokenResponse>(
      authOptions,
    )

    const { access_token, expires_in } = response.data

    const expiresTime = new Date().getTime() + expires_in * 1000
    const expires_in_date = new Date(expiresTime)

    await prisma.spotifyToken.create({
      data: {
        token: access_token,
        expires_in: expires_in_date,
      },
    })

    return access_token
  } catch (error) {
    console.error('Error getting Spotify authentication token:', error)
    throw new Error('Unable to get Spotify authentication token')
  }
}
