import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { ServerInterface } from './interface'
import {
  mixpanelPlugin,
  prismaPlugin,
  schemaValidation,
  spotifyTokenPlugin,
} from '../plugins'
import { routes } from '../routes'

export class App implements ServerInterface {
  server: FastifyInstance

  constructor() {
    const loggerConfig =
      process.env.ENABLE_FASTIFY_DEBUG === 'true' ? { level: 'debug' } : false

    this.server = fastify({ logger: loggerConfig })

    this.registerPlugins()
    this.registerRoutes()
  }

  registerPlugins(): void {
    this.server.register(prismaPlugin)
    this.server.register(spotifyTokenPlugin)
    this.server.register(mixpanelPlugin)
    this.server.register(schemaValidation)

    this.server.register(cors, {
      origin: [
        'https://whatsmytaylorswiftsong.vercel.app',
        'http://localhost:3000',
      ],
      credentials: true,
    })
  }

  registerRoutes(): void {
    this.server.register(routes, { prefix: '/v1/api' })
  }

  async start(): Promise<void> {
    const PORT = Number(process.env.PORT || 3001)
    const HOST: string = process.env.HOST || '0.0.0.0'

    try {
      await this.server.listen({ port: PORT, host: HOST }, (err, address) => {
        if (err) process.exit(1)
        console.log(`Server listening at ${address}`)
      })
    } catch (err) {
      process.exit(1)
    }
  }

  async close(): Promise<void> {
    await this.server.close()
  }
}
