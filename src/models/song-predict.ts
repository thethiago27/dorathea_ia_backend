import * as tf from '@tensorflow/tfjs-node'

const modelPath = 'file://./tfjs-model/model.json'

export const modelInit = async () => {
  try {
    await tf.loadLayersModel(modelPath)
  } catch (e: any) {
    throw new Error(e)
  }
}

export const getPrediction = async (data: number[]): Promise<number> => {
  try {
    const model = await tf.loadLayersModel(modelPath)
    const tensor = tf.tensor2d([data])
    const prediction = model.predict(tensor) as tf.Tensor

    const predictionData = await prediction.data()

    return Math.floor(Number(predictionData))
  } catch (e: any) {
    throw new Error(e)
  }
}
