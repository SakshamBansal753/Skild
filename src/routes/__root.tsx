import { ClerkProvider, useUser } from "@clerk/tanstack-react-start";
import { PostHogProvider, usePostHog } from "@posthog/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import Navbar from "#/components/Navbar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

function PostHogIdentify() {
	const { user, isSignedIn } = useUser();
	const posthog = usePostHog();

	useEffect(() => {
		if (isSignedIn && user) {
			posthog.identify(user.id, {
				email: user.primaryEmailAddress?.emailAddress,
				name: user.fullName,
			});
		}
	}, [isSignedIn, user, posthog]);

	return null;
}

function PostHogPageView() {
	const posthog = usePostHog();
	const location = useRouterState({ select: (s) => s.location });

	useEffect(() => {
		posthog.capture("$pageview", {
			$current_url: window.location.href,
		});
	}, [location.pathname, posthog]);

	return null;
}

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Skild- The registry for intelligence",
			},
			{
				name: "description",
				content: "Discover, publish and operate reusable agent capabilities",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootDocument,
});

function RootDocument() {
	const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
	if (!posthogKey) {
		if (import.meta.env.DEV) {
			console.warn("VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is not set");
		} else {
			throw new Error("VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is required");
		}
	}
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="dark font-sans antialiased wrap-anywhere">
				<PostHogProvider
					apiKey={posthogKey}
					options={{
						api_host: "/ingest",
						ui_host:
							import.meta.env.VITE_PUBLIC_POSTHOG_HOST ||
							"https://us.posthog.com",
						defaults: "2025-05-24",
						capture_exceptions: true,
						debug: import.meta.env.DEV,
						capture_pageview: false,
					}}
				>
					<ClerkProvider>
						<PostHogIdentify />
						<PostHogPageView />
						<div id="root-layout">
							<header>
								<div className="frame">
									<Navbar />
								</div>
							</header>
							<main>
								<div className="frame">
									<Outlet />
								</div>
							</main>
						</div>

						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
					</ClerkProvider>
				</PostHogProvider>
				<Scripts />
			</body>
		</html>
	);
}