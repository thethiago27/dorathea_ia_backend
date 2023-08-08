import { FastifyInstance } from 'fastify'
import songPredict from '../controllers/create-prediction'
import { predictRequestSchema } from '../models/predict-request'
import findPrediction from '../controllers/find-prediction'

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post(
    '/prediction',
    {
      schema: {
        body: predictRequestSchema,
      },
    },
    songPredict as never,
  )
  fastify.get('/prediction/:id', findPrediction as never)
}
