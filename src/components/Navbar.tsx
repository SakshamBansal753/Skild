import { Show, UserButton } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LogIn } from "lucide-react";
import SkildLogo from "./Skilldlogo";

const Navbar = () => {
	const posthog = usePostHog();

	return (
		<nav className="navbar group relative overflow-hidden border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl">
			{/* Top specular highlight */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

			{/* Noise texture overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
				}}
			/>

			{/* Ambient glow blobs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -top-16 left-[20%] h-32 w-56 rounded-full bg-violet-600/15 blur-3xl" />
				<div className="absolute -top-8 right-[15%] h-24 w-40 rounded-full bg-fuchsia-500/10 blur-2xl" />
			</div>

			{/* Grid pattern */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
					backgroundSize: "32px 32px",
				}}
			/>

			{/* Bottom border glow */}
			<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

			<div className="relative z-10 mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
				{/* Brand */}
				<Link
					to="/"
					className="group/brand flex items-center gap-3 transition-all duration-300"
				>
					{/* 3D Logo container */}
					<div className="relative flex items-center justify-center">
						{/* Outer halo */}
						<div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-md transition-all duration-500 group-hover/brand:bg-violet-500/35 group-hover/brand:blur-lg" />
						{/* Shell */}
						<div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-br from-[#1a0f2e] to-[#0d0618] shadow-[0_0_0_1px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 group-hover/brand:scale-105 group-hover/brand:border-violet-400/40 group-hover/brand:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
							<SkildLogo size={32} animated />
						</div>
					</div>

					<div className="flex flex-col leading-none">
						<span
							className="text-lg font-black tracking-[-0.03em] text-white md:text-xl"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #8b5cf6 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							Skild
						</span>
						<span className="hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-violet-400/60 sm:block">
							Intelligence Registry
						</span>
					</div>
				</Link>

				{/* Center Navigation */}
				<div className="hidden items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md md:flex">
					{(
						[
							{ to: "/", label: "Explore" },
							{ to: "/skills", label: "Skills" },
							{ to: "/new", label: "Create" },
						] as const
					).map(({ to, label }) => (
						<Link
							key={to}
							to={to}
							className="group/nav relative rounded-full px-5 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:text-white"
						>
							<span className="relative z-10">{label}</span>
							{/* Active/hover pill */}
							<span className="absolute inset-0 rounded-full bg-white/0 transition-all duration-200 group-hover/nav:bg-white/[0.07]" />
						</Link>
					))}
				</div>

				{/* Actions */}
				<div className="flex items-center gap-3">
					<Show when="signed-in">
						<div className="rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
							<UserButton />
						</div>
					</Show>

					<Show when="signed-out">
						<Link
							to="/sign-in/$"
							onClick={() => posthog.capture("sign_in_clicked")}
							className="group/signin relative overflow-hidden rounded-xl border border-violet-400/25 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
							style={{
								background:
									"linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(109,40,217,0.95) 100%)",
							}}
						>
							{/* Specular */}
							<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
							<div className="absolute inset-0 bg-white/0 transition-all duration-300 group-hover/signin:bg-white/10" />

							<div className="relative z-10 flex items-center gap-2">
								<LogIn size={15} />
								<span>Sign In</span>
								<ArrowUpRight
									size={14}
									className="transition-transform duration-300 group-hover/signin:-translate-y-0.5 group-hover/signin:translate-x-0.5"
								/>
							</div>
						</Link>
					</Show>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;