import { PrismaClient } from '@prisma/client'
import { getSpotifyTrackDetails } from './spotify-track-details'
import { getPrediction as getModelPrediction } from '../models/song-predict'

interface PredictionValues {
  mood: number
  vibe: number
  dance_type: number
  acoustic_type: number
}

interface Song {
  track_uri_id: string
}

interface SongDetails {
  name: string
  album: string
  albumImage: string
}

interface Prediction {
  id: string
  name: string
  image: string
  album: string
}

export const createPrediction = async (
  data: number[],
  spotifyAccessCode: string,
  prisma: PrismaClient,
): Promise<string> => {
  const model = await getModelPrediction(data)

  const predictionValues: PredictionValues = {
    mood: data[0] as number,
    vibe: data[1] as number,
    dance_type: data[2] as number,
    acoustic_type: data[3] as number,
  }

  const savePrediction = await prisma.predictionValues.create({
    data: predictionValues,
  })

  const song: Song | null = await prisma.tracks.findUnique({
    where: {
      id_mapping: Number(model),
    },
  })

  if (!song) {
    throw new Error('Song not found')
  }

  const songDetails: SongDetails = await getSpotifyTrackDetails(
    song.track_uri_id,
    spotifyAccessCode,
  )

  const prediction: Prediction = await prisma.predictions.create({
    data: {
      name: songDetails.name,
      album: songDetails.album,
      image: songDetails.albumImage,
      predictionValuesId: savePrediction.id,
    },
  })

  return prediction.id
}

export const getPrediction = async (
  id: string,
  prisma: PrismaClient,
): Promise<Prediction> => {
  const prediction: Prediction | null = await prisma.predictions.findUnique({
    where: {
      id,
    },
  })

  if (!prediction) {
    throw new Error('Prediction not found')
  }

  return prediction
}
