import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    spotifyAccessCode: string
  }
  interface FastifyRequest {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = fp(
  async (fastify: FastifyInstance, _) => {
    const prisma = new PrismaClient()

    fastify.decorate('prisma', prisma)

    fastify.addHook('onRequest', async (request: FastifyRequest, _) => {
      request.prisma = prisma
    })

    fastify.addHook('onClose', async (instance) => {
      instance.prisma.$disconnect()
    })
  },
)

export default prismaPlugin
