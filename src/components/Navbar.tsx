import { Show, UserButton } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, LogIn } from "lucide-react";

const Navbar = () => {
	const posthog = usePostHog();

	return (
		<nav className="navbar group relative overflow-hidden border-b border-white/10 bg-black/70 backdrop-blur-xl">
			{/* Glow Effects */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
				<div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-2xl" />
				<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
			</div>

			{/* Animated Border */}
			<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

			<div className="relative z-10 mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
				{/* Brand */}
				<Link
					to="/"
					className="group/brand flex items-center gap-3 transition-all duration-300"
				>
					<div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-transform duration-300 group-hover/brand:scale-105">
						<div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover/brand:opacity-100" />
						<Cpu className="relative z-10 h-5 w-5 text-white" />
					</div>

					<div className="flex flex-col leading-none">
						<span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-lg font-extrabold tracking-tight text-transparent md:text-xl">
							Skild
						</span>
						<span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500 sm:block">
							Developer Skills Hub
						</span>
					</div>
				</Link>

				{/* Center Navigation */}
				<div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md md:flex">
					<Link
						to="/"
						className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
					>
						Explore
					</Link>

					<Link
						to="/skills"
						className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
					>
						Skills
					</Link>

					<Link
						to="/new"
						className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
					>
						Create
					</Link>
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
							className="group/signin relative overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)]"
						>
							<div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover/signin:opacity-100" />

							<div className="relative z-10 flex items-center gap-2">
								<LogIn size={16} />
								<span>Sign In</span>

								<ArrowUpRight
									size={15}
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