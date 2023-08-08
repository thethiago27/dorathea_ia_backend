import { FastifyInstance } from 'fastify'

export interface ServerInterface {
  start(): Promise<void>
  registerPlugins(): void
  registerRoutes(): void
  server: FastifyInstance
  close(): Promise<void>
}
