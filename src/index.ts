import { App } from './server/app'
import 'dotenv/config'
import { modelInit } from './models/song-predict'

const app = new App()
app.registerRoutes()

modelInit()

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
