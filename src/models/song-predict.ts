import * as tf from '@tensorflow/tfjs-node'

const modelPath = 'file://./tfjs-model/model.json'
let cachedModel: tf.LayersModel | null = null

const loadModel = async (): Promise<tf.LayersModel> => {
  if (!cachedModel) {
    cachedModel = await tf.loadLayersModel(modelPath)
  }
  return cachedModel
}

export const modelInit = async (): Promise<void> => {
  try {
    await loadModel()
  } catch (error: any) {
    throw new Error(`Error initializing model: ${error.message}`)
  }
}

export const getPrediction = async (data: number[]): Promise<number> => {
  try {
    const model: tf.LayersModel = await loadModel()
    const tensor: tf.Tensor2D = tf.tensor2d([data])
    const prediction: tf.Tensor = model.predict(tensor) as tf.Tensor

    const predictionData = await prediction.data()

    return Math.floor(Number(predictionData))
  } catch (error: any) {
    throw new Error(`Error getting prediction: ${error.message}`)
  }
}
