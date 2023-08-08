import { App } from './server/app'
import 'dotenv/config'
import { modelInit } from './models/song-predict'

const app = new App()

;(async () => {
  try {
    await modelInit()

    await app.start()
  } catch (e) {
    console.error(e)
  }
})()
