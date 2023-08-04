import { getPrediction as getModelPrediction } from '../models/song-predict'
import { PrismaClient } from '@prisma/client'
import { getSpotifyTrackDetails } from './spotify-track-details'

export const createPrediction = async (
  data: number[],
  spotifyAccessCode: string,
  prisma: PrismaClient,
): Promise<string> => {
  const model = await getModelPrediction(data)

  const savePrediction = await prisma.predictionValues.create({
    data: {
      mood: data[0] as number,
      vibe: data[1] as number,
      dance_type: data[2] as number,
      acoustic_type: data[3] as number,
    },
  })

  const song = await prisma.tracks.findUnique({
    where: {
      id_mapping: Number(model),
    },
  })

  if (!song) {
    throw new Error('Song not found')
  }

  const trackId = song.track_uri_id

  const songDetails = await getSpotifyTrackDetails(trackId, spotifyAccessCode)

  const prediction = await prisma.predictions.create({
    data: {
      name: songDetails.name,
      album: songDetails.album,
      image: songDetails.albumImage,
      predictionValuesId: savePrediction.id,
    },
  })

  return prediction.id
}

interface Prediction {
  id: string
  name: string
  image: string
  album: string
}

export const getPrediction = async (
  id: string,
  prisma: PrismaClient,
): Promise<Prediction> => {
  const prediction = await prisma.predictions.findUnique({
    where: {
      id,
    },
  })

  if (!prediction) {
    throw new Error('Prediction not found')
  }

  return prediction
}
