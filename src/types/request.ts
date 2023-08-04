import { FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'

export interface RequestWithParamsQueryBody<TParams, TQuery, TBody>
  extends FastifyRequest {
  params: TParams
  query: TQuery
  body: TBody
  spotifyAccessCode: string
}

export interface RequestWithPrisma<TParams, TQuery, TBody>
  extends RequestWithParamsQueryBody<TParams, TQuery, TBody> {
  prisma: PrismaClient
}
