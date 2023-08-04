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
    const mixpanelClient = mixpanel.init(String(process.env.MIXPANEL_TOKEN))

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
      mixpanelClient.track('Request URL', {
        url: request.url,
        params: request.params,
        query: request.query,
        body: request.body,
      })
    })
  },
)

export default mixpanelPlugin
