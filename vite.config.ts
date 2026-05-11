import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},

	server: {
		proxy: {
			"/ingest/static": {
				target: "https://us-assets.i.posthog.com",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/ingest/, ""),
			},
			"/ingest/array": {
				target: "https://us-assets.i.posthog.com",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/ingest/, ""),
			},
			"/ingest": {
				target: "https://us.i.posthog.com",
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/ingest/, ""),
			},
		},
	},

	plugins: [
		devtools(),

		nitro({
			scanDirs: ["server"],
			rollupConfig: {
				external: [/^@sentry\//],
			},
		}),

		tailwindcss(),

		tanstackStart(),

		viteReact(),

		babel({
			presets: [reactCompilerPreset()],
		}),
	],
});