import { App } from './server/app'
import 'dotenv/config'
import awsLambdaFastify from '@fastify/aws-lambda'
import { modelInit } from './models/song-predict'

const app = new App()
app.registerRoutes()

modelInit()

const proxy = awsLambdaFastify(app.server, {
  callbackWaitsForEmptyEventLoop: false,
})

export const lambdaHandler = async (event: any, context: any): Promise<any> => {
  await app.server.ready()
  return proxy(event, context)
}

if (require.main === module) {
  try {
    const serverPort = 5013
    app.server.listen({ port: serverPort }, () => {
      console.log(`Server is running on port ${serverPort}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
