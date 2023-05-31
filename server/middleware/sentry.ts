import { Toucan } from 'toucan-js'

export default defineEventHandler((event) => {
  if (event.context.cloudflare) {
    const sentry = new Toucan({
      dsn: 'https://339aed1201cb4ad6b3348e31006603a9@o930441.ingest.sentry.io/4505279822888960',
      request: event.context.cloudflare.request,
      context: event.context.cloudflare.context,
    })
    event.context.sentry = sentry
  }
})
