import joi, { ObjectSchema } from 'joi'

export const predictRequestSchema: ObjectSchema = joi.object({
  data: joi.array().items(joi.number()).required(),
})
