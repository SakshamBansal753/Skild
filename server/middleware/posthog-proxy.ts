// server/middleware/posthog-proxy.ts
import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith('/ingest')) return

  const isStatic =
    event.path.includes('/ingest/static') ||
    event.path.includes('/ingest/array')

  const target = isStatic
    ? 'https://us-assets.i.posthog.com'
    : 'https://us.i.posthog.com'

  const newPath = event.path.replace(/^\/ingest/, '') || '/'

  return proxyRequest(event, `${target}${newPath}`)
})