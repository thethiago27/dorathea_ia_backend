import { FastifyInstance } from 'fastify'
import prediction from './prediction'

export const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(prediction)
}
