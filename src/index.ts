import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { generateConfig } from './configuration'
import { schema } from './schema'

const app = new OpenAPIHono()

const route = createRoute({
  method: 'get',
  path: '/',
  request: {
    query: schema
  },
  responses: {
    200: {
      description: 'OK'
    },
    400: {
      description: 'Bad Request'
    }
  }
})

app.openapi(route, (c) => {
  return c.text(generateConfig({ configuration: c.req.valid('query') }))
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'PGTune API'
  },
  servers: [
    {
      url: 'https://pgtune-api.kobanyan-dev.workers.dev'
    }
  ]
})

export default app
