import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from '../routes'
import prismaPlugin from '../plugins/prisma'
import mixpanelPlugin from '../plugins/mixpanel'
import schemaValidation from '../plugins/schema-validation'
import spotifyTokenPlugin from '../plugins/spotify-token'

const app = fastify()

app.register(prismaPlugin)
app.register(spotifyTokenPlugin)
app.register(mixpanelPlugin)
app.register(schemaValidation)
app.register(routes)

app.register(cors, {
  origin: [
    'https://whatsmytaylorswiftsong.vercel.app',
    'http://localhost:3000',
  ],
  credentials: true,
})

export const createServer = async () => {
  const PORT: number = Number(process.env.PORT) || 3001
  const HOST: string = process.env.HOST || '0.0.0.0'

  try {
    await app.listen({ port: PORT, host: HOST }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
