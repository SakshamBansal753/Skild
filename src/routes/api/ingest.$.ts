import { createAPIFileRoute } from '@tanstack/react-start'
export const APIRoute = createAPIFileRoute('/ingest/$')({
  GET: ({ request }) => proxyToPostHog(request),
  POST: ({ request }) => proxyToPostHog(request),
})

async function proxyToPostHog(request: Request) {
  const url = new URL(request.url)

  const isStatic =
    url.pathname.includes('/ingest/static') ||
    url.pathname.includes('/ingest/array')

  const target = isStatic
    ? 'https://us-assets.i.posthog.com'
    : 'https://us.i.posthog.com'

  const newPath = url.pathname.replace(/^\/ingest/, '') + url.search
  const proxiedUrl = `${target}${newPath}`

  // Build headers without 'host' before constructing Request
  const headers = new Headers(request.headers)
  headers.delete('host')

  const proxiedRequest = new Request(proxiedUrl, {
    method: request.method,
    headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.arrayBuffer()
        : undefined,
  })

  return fetch(proxiedRequest)
}