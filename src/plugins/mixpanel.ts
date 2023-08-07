import mixpanel from 'mixpanel'
import fp from 'fastify-plugin'
import {
  FastifyError,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
} from 'fastify'

const mixpanelPlugin: FastifyPluginAsync = fp(
  async (fastify: FastifyInstance, _) => {
    const MIXPANEL_TOKEN: string = process.env.MIXPANEL_TOKEN || ''

    const mixpanelClient = mixpanel.init(MIXPANEL_TOKEN)

    fastify.addHook(
      'onError',
      async (request: FastifyRequest, _, error: FastifyError) => {
        mixpanelClient.track('Error', {
          error: error.message,
          stack: error.stack,
          url: request.url,
        })
      },
    )

    fastify.addHook('onRequest', async (request: FastifyRequest, _) => {
      const eventData = {
        url: request.url,
        params: request.params,
        query: request.query,
        body: request.body,
      }

      mixpanelClient.track(`Request URL ${request.url}`, eventData)
    })
  },
)

export default mixpanelPlugin
