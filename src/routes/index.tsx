import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { dummySkills } from "#/lib/dummy-skills";

export const Route = createFileRoute("/")({ component: Home });

export function Home() {
	const posthog = usePostHog();

	return (
		<div id="home" className="relative">
			{/* subtle ambient background */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.06),transparent_35%)]" />

			{/* HERO */}
			<section className="hero relative z-10 flex flex-col items-center px-4 pt-20 text-center md:pt-28">
				{/* badge */}
				<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
					<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
					Agentic Skill Registry v1.0
				</div>

				<div className="copy max-w-3xl">
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
						The registry for{" "}
						<span className="text-gradient">Agentic Intelligence</span>
					</h1>

					<p className="mt-5 text-base md:text-lg text-text-muted leading-relaxed">
						A high-performance registry for procedural agent skill development,
						publishing, and execution of reusable intelligence modules in a
						workspace-centric system.
					</p>
				</div>

				{/* CTA */}
				<div className="actions mt-10 flex flex-col sm:flex-row items-center gap-3">
					<Link
						to="/skills"
						className="btn-primary group"
						onClick={() => posthog.capture("browse_registry_clicked")}
					>
						<Terminal size={18} className="transition-transform group-hover:rotate-12" />
						<span>Browse Registry</span>
					</Link>

					<Link
						to="/skills/new"
						className="btn-secondary"
						onClick={() => posthog.capture("publish_skill_clicked")}
					>
						Publish Skill
					</Link>
				</div>
			</section>

			{/* LATEST SECTION */}
			<section className="latest relative z-10 mx-auto mt-24 max-w-6xl px-4 md:mt-32">
				<div className="mb-10 flex flex-col gap-3">
					<h2 className="text-2xl md:text-3xl font-bold tracking-tight">
						Recently Created{" "}
						<span className="text-gradient">Skills</span>
					</h2>

					<p className="text-text-muted max-w-2xl">
						Explore the latest capabilities added to the registry — modular,
						composable, and production-ready agent skills.
					</p>
				</div>

				{/* GRID */}
				{dummySkills.length > 0 ? (
					<div className="skills-grid">
						{dummySkills.map((skill) => (
							<div
								key={skill.id}
								className="transition-transform duration-300 hover:-translate-y-1"
							>
								<SkillCard {...skill} />
							</div>
						))}
					</div>
				) : (
					<div className="rounded-xl border border-border-subtle bg-surface/40 p-8 text-center text-text-muted backdrop-blur">
						No skills available yet.
					</div>
				)}
			</section>
			<footer className="relative mt-28 overflow-hidden border-t border-border-subtle bg-background">

	{/* Ambient glow */}
	<div className="pointer-events-none absolute inset-0">
		<div className="absolute -top-40 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
		<div className="absolute bottom-0 right-0 h-[200px] w-[400px] bg-indigo-500/10 blur-3xl" />
	</div>

	<div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12">

		{/* BRAND / SUMMARY */}
		<div className="md:col-span-5 space-y-5">
			<div className="flex items-center gap-3">
				<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 flex items-center justify-center shadow-lg">
					<div className="h-3 w-3 rotate-45 bg-white/90 rounded-sm" />
				</div>

				<div className="leading-tight">
					<p className="text-base font-semibold text-foreground">
						Skild
					</p>
					<p className="text-xs text-muted-foreground">
						Agentic Intelligence Registry
					</p>
				</div>
			</div>

			<p className="text-sm text-muted-foreground leading-relaxed max-w-md">
				A high-performance registry for designing, publishing, and executing
				reusable agent skills. Built for composable AI systems and modern developer workflows.
			</p>

			{/* status pill */}
			<div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
				<span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
				System operational
			</div>
		</div>

		{/* LINKS GRID */}
		<div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">

			<div className="space-y-3">
				<h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Product
				</h4>
				<div className="flex flex-col gap-2">
					<Link className="footer-link" to="/">Explore</Link>
					<Link className="footer-link" to="/skills">Registry</Link>
					<Link className="footer-link" to="/skills/new">Submit</Link>
				</div>
			</div>

			<div className="space-y-3">
				<h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Developer
				</h4>
				<div className="flex flex-col gap-2">
					<a className="footer-link" href="/docs">Docs</a>
					<a className="footer-link" href="#">API</a>
					<a className="footer-link" href="#">CLI</a>
				</div>
			</div>

			<div className="space-y-3">
				<h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Company
				</h4>
				<div className="flex flex-col gap-2">
					<a className="footer-link" href="#">About</a>
					<a className="footer-link" href="#">Careers</a>
					<a className="footer-link" href="#">Contact</a>
				</div>
			</div>
		</div>
	</div>

	{/* bottom bar */}
	<div className="border-t border-border-subtle">
		<div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
			<p>© {new Date().getFullYear()} Skild. All rights reserved.</p>

			<p className="text-muted-foreground">
				Built for agentic systems • v1.0.0 • latency optimized
			</p>
		</div>
	</div>
</footer>
		</div>
	);
}