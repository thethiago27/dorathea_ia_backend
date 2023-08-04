import { RequestWithPrisma } from '../types/request'
import { FastifyReply } from 'fastify'
import { getPrediction } from '../services/prediction'

interface FindPredictionParams {
  id: string
}
export default async (
  req: RequestWithPrisma<FindPredictionParams, unknown, unknown>,
  res: FastifyReply,
): Promise<void> => {
  const { id } = req.params

  const prediction = await getPrediction(id, req.prisma)

  res.header('Cache-Control', 'public, max-age=86400')

  res.status(200).send({
    album: prediction.album,
    image: prediction.image,
    song: prediction.name,
  })
}
