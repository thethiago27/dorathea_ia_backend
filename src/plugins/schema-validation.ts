import { FastifyInstance } from 'fastify'
import { ObjectSchema } from 'joi'
import fp from 'fastify-plugin'

const schemaValidationPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.setValidatorCompiler(
    ({ schema }: { schema: ObjectSchema }) =>
      async (data) => {
        const schemaIsOptional = schema?._flags?.presence === 'optional'

        if (schemaIsOptional && !data) return data

        const validation = await schema.validateAsync(data, {
          abortEarly: false,
        })
        if (
          validation.value === null ||
          (validation.value && !Object.keys(validation.value).length)
        ) {
          throw new Error('No data provided')
        }

        if (validation.error) {
          throw new Error(validation.error.message)
        }
        return data
      },
  )
})

export default schemaValidationPlugin
