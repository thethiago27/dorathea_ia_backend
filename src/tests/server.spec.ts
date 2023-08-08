import { App } from '../server/app'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('App', () => {
  let app: App

  beforeAll(() => {
    app = new App()
    app.start()
  })

  afterAll(async () => {
    await app.server.close()
  })

  it('should is called App', () => {
    expect(app.constructor.name).toBe('App')
  })

  it('should have a server property', () => {
    expect(app.server).toBeDefined()
  })

  it('should have a start method', () => {
    expect(app.start).toBeDefined()
  })

  it('should have a registerPlugins method', () => {
    expect(app.registerPlugins).toBeDefined()
  })

  it('should have a registerRoutes method', () => {
    expect(app.registerRoutes).toBeDefined()
  })

  it('should have a close method', () => {
    expect(app.close).toBeDefined()
  })
})
