import { Hono } from 'hono'
import { compress, logger, secureHeaders } from 'hono/middlewares'
import api from './api/index.ts'
import { customLogger } from './logger.ts'
import middlewares from './middlewares.ts'

const app = new Hono().basePath('/v1')

app.use('*', compress())
if (Deno.env.get('ENV') !== 'test') {
  app.use('*', logger(customLogger))
}
app.use('*', secureHeaders())

app.get('/', (c) =>
  c.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  }))

app.route('/api', api)

app.notFound(middlewares.notFound)

export default app
