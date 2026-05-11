<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Skild TanStack Start application.

## Summary of changes

- **`vite.config.ts`** — Updated reverse proxy config to correctly route `/ingest/static` and `/ingest/array` to PostHog's US asset server (`us-assets.i.posthog.com`) and `/ingest` to the ingestion server (`us.i.posthog.com`), enabling session replay assets and other static resources to load correctly.
- **`src/routes/__root.tsx`** — Already had `PostHogProvider` wrapping the app and a `PostHogIdentify` component calling `posthog.identify()` via Clerk user data. No changes needed here — integration was already correct.
- **`src/routes/index.tsx`** — Already had `browse_registry_clicked` and `publish_skill_clicked` capture calls on the homepage CTA buttons. No changes needed.
- **`src/components/SkillCard.tsx`** — Already had `skill_install_command_copied` capture on the copy button. Fixed event name on the Open link: renamed `"installation completed"` (inconsistent, space-separated) to `"skill_opened"` (snake_case, consistent with project convention).
- **`src/components/Navbar.tsx`** — Already had `sign_in_clicked` capture on the sign-in button. No changes needed.
- **`src/utils/posthog-server.ts`** — Created a singleton server-side PostHog client using `posthog-node`, following the example project pattern. Ready for use in future API routes.
- **`.env`** — Confirmed and updated `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` environment variables with correct values.

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `browse_registry_clicked` | User clicks the "Browse Registry" CTA on the homepage hero | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks the "Publish Skill" CTA on the homepage hero | `src/routes/index.tsx` |
| `sign_in_clicked` | User clicks the "Sign in" button in the navbar (signed-out state) | `src/components/Navbar.tsx` |
| `skill_install_command_copied` | User copies a skill's install command from a skill card (properties: skill_title, category, install_command) | `src/components/SkillCard.tsx` |
| `skill_opened` | User clicks "Open" on a skill card (renamed from `"installation completed"`) | `src/components/SkillCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1570902)
- [Homepage CTA Engagement](/insights/wwK52K7c) — Daily trend of Browse Registry vs Publish Skill clicks
- [Skill Install Command Copies](/insights/3I58UnDz) — How often users copy install commands (key adoption signal)
- [Sign In Button Clicks](/insights/d9QcWAYf) — Total sign-in button clicks (acquisition signal)
- [Discovery to Install Funnel](/insights/jLjhRZXD) — Conversion funnel: Browse Registry → Copy Install Command
- [Skill Opens](/insights/daykTo66) — How often users click through to open a skill

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
