import { PrismaClient } from '@prisma/client'
import axios, { AxiosRequestConfig } from 'axios'

interface SpotifyAuthenticationTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export const getSpotifyAuthenticationToken = async (
  prisma: PrismaClient,
): Promise<string> => {
  const auth: string = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64')

  const headers = {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const authOptions: AxiosRequestConfig = {
    headers,
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: {
      grant_type: 'client_credentials',
    },
    responseType: 'json',
  }

  const response = await axios.request<SpotifyAuthenticationTokenResponse>(
    authOptions,
  )

  const token: string = response.data.access_token

  const expiresTime = new Date().getTime() + response.data.expires_in * 1000
  const expires_in = new Date(expiresTime)

  await prisma.spotifyToken.create({
    data: {
      token,
      expires_in,
    },
  })

  return token
}
