import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginCallback, FastifyRequest } from 'fastify'
import { getSpotifyAuthenticationToken } from '../services/spotify-authentication-token'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyRequest {
    spotifyAccessCode: string
  }
}

const spotifyTokenPlugin: FastifyPluginCallback = fp(
  async (fastify: FastifyInstance) => {
    fastify.addHook('onRequest', async (request: FastifyRequest, _) => {
      const spotifyToken = await request.prisma.spotifyToken.findFirst({
        orderBy: {
          created_at: 'desc',
        },
      })

      let spotifyAccessCode = spotifyToken?.token || ''

      if (!spotifyToken || isTokenExpired(spotifyToken.expires_in)) {
        spotifyAccessCode = await getFreshSpotifyToken(request.prisma)
      }

      request.spotifyAccessCode = spotifyAccessCode
    })
  },
)

async function getFreshSpotifyToken(prisma: PrismaClient): Promise<string> {
  return await getSpotifyAuthenticationToken(prisma)
}

function isTokenExpired(expiresIn: Date): boolean {
  const tokenExpiresTime = new Date(expiresIn).getTime()
  const currentTime = new Date().getTime()
  return tokenExpiresTime < currentTime
}

export default spotifyTokenPlugin
