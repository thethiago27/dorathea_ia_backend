import { createServer } from './server/server'
import 'dotenv/config'
import { modelInit } from './models/song-predict'
;(async () => {
  try {
    await modelInit()

    await createServer()
  } catch (e) {
    console.error(e)
  }
})()
