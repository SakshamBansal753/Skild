// src/integrations/posthog/provider.tsx
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      capture_pageview: false, // TanStack Router handles this manually
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}