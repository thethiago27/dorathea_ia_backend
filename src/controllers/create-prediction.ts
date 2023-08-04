import { FastifyReply } from 'fastify'
import { createPrediction } from '../services/prediction'
import { RequestWithPrisma } from '../types/request'

interface SongPredictBody {
  data: number[]
}
export default async (
  req: RequestWithPrisma<unknown, unknown, SongPredictBody>,
  res: FastifyReply,
): Promise<void> => {
  const { body, prisma, spotifyAccessCode } = req

  const { data } = body

  const predict = await createPrediction(data, spotifyAccessCode, prisma)

  res.status(200).send({ prediction_id: predict })
}
