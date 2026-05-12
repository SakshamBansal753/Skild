import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layers, Terminal, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import SkillCard from "#/components/SkillCard";
import { dummySkills } from "#/lib/dummy-skills";

export const Route = createFileRoute("/")({ component: Home });

/* ── Floating particles canvas ── */
function ParticleCanvas() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let W = (canvas.width = window.innerWidth);
		let H = (canvas.height = 600);

		const onResize = () => {
			W = canvas.width = window.innerWidth;
			H = canvas.height = 600;
		};
		window.addEventListener("resize", onResize);

		type P = { x: number; y: number; r: number; vx: number; vy: number; o: number; pulse: number };
		const particles: P[] = Array.from({ length: 60 }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			r: Math.random() * 1.5 + 0.4,
			vx: (Math.random() - 0.5) * 0.3,
			vy: (Math.random() - 0.5) * 0.3,
			o: Math.random() * 0.5 + 0.1,
			pulse: Math.random() * Math.PI * 2,
		}));

		let t = 0;
		let raf: number;
		const animate = () => {
			ctx.clearRect(0, 0, W, H);
			t += 0.01;
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				p.pulse += 0.02;
				if (p.x < 0) p.x = W;
				if (p.x > W) p.x = 0;
				if (p.y < 0) p.y = H;
				if (p.y > H) p.y = 0;
				const alpha = p.o * (0.7 + Math.sin(p.pulse) * 0.3);
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(139,92,246,${alpha})`;
				ctx.fill();
			}
			// Draw subtle connecting lines
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 100) {
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist / 100)})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}
			}
			raf = requestAnimationFrame(animate);
		};
		raf = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("resize", onResize);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<canvas
			ref={ref}
			className="pointer-events-none absolute inset-0 w-full"
			style={{ height: 600, opacity: 0.6 }}
		/>
	);
}

/* ── Rotating 3D cube for hero ── */
function HeroCube() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let t = 0;
		let raf: number;
		const tick = () => {
			t += 0.004;
			el.style.transform = `rotateX(${20 + Math.sin(t) * 5}deg) rotateY(${t * 50}deg)`;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	const faceStyle = (bg: string, transform: string): React.CSSProperties => ({
		position: "absolute",
		width: 80,
		height: 80,
		background: bg,
		border: "1px solid rgba(167,139,250,0.3)",
		transform,
		backfaceVisibility: "hidden",
	});

	return (
		<div
			className="absolute right-[8%] top-1/4 hidden lg:block"
			style={{ perspective: 600, zIndex: 2 }}
		>
			<div
				ref={ref}
				style={{
					width: 80,
					height: 80,
					position: "relative",
					transformStyle: "preserve-3d",
					transformOrigin: "40px 40px 40px",
				}}
			>
				<div style={faceStyle("rgba(139,92,246,0.15)", "rotateY(0deg) translateZ(40px)")} />
				<div style={faceStyle("rgba(109,40,217,0.2)", "rotateY(90deg) translateZ(40px)")} />
				<div style={faceStyle("rgba(139,92,246,0.1)", "rotateY(180deg) translateZ(40px)")} />
				<div style={faceStyle("rgba(109,40,217,0.15)", "rotateY(-90deg) translateZ(40px)")} />
				<div style={faceStyle("rgba(167,139,250,0.2)", "rotateX(90deg) translateZ(40px)")} />
				<div style={faceStyle("rgba(88,28,220,0.25)", "rotateX(-90deg) translateZ(40px)")} />
			</div>
		</div>
	);
}

/* ── Stat pill ── */
function StatPill({ value, label }: { value: string; label: string }) {
	return (
		<div
			className="flex flex-col items-center gap-0.5 rounded-xl px-5 py-3"
			style={{
				background: "rgba(139,92,246,0.06)",
				border: "1px solid rgba(139,92,246,0.15)",
			}}
		>
			<span className="text-lg font-black text-white">{value}</span>
			<span className="text-[11px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
				{label}
			</span>
		</div>
	);
}

export function Home() {
	const posthog = usePostHog();

	return (
		<div id="home" className="relative">
			{/* Hero section */}
			<section className="hero relative flex flex-col items-center overflow-hidden px-4 pb-20 pt-24 text-center md:pt-36">
				{/* Particle canvas */}
				<ParticleCanvas />

				{/* 3D Cube decoration */}
				<HeroCube />

				{/* Deep radial glow */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.2) 0%, transparent 70%)",
					}}
				/>

				{/* Badge */}
				<div
					className="relative z-10 mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
					style={{
						background: "rgba(139,92,246,0.1)",
						border: "1px solid rgba(139,92,246,0.25)",
						color: "#c4b5fd",
						backdropFilter: "blur(8px)",
					}}
				>
					<span
						className="h-1.5 w-1.5 rounded-full"
						style={{
							background: "#a78bfa",
							boxShadow: "0 0 6px rgba(167,139,250,0.8)",
							animation: "pulse 2s ease-in-out infinite",
						}}
					/>
					Agentic Skill Registry v1.0 — Now live
				</div>

				{/* Headline */}
				<div className="relative z-10 max-w-4xl">
					<h1
						className="text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl"
					>
						The registry for{" "}
						<span
							className="relative inline-block"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #a78bfa 0%, #8b5cf6 35%, #6d28d9 70%, #c4b5fd 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							Agentic Intelligence
							{/* Underline shimmer */}
							<span
								className="absolute inset-x-0 -bottom-2 h-px"
								style={{
									background:
										"linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)",
								}}
							/>
						</span>
					</h1>

					<p
						className="mx-auto mt-7 max-w-2xl text-base leading-relaxed md:text-lg"
						style={{ color: "rgba(255,255,255,0.5)" }}
					>
						A high-performance registry for procedural agent skill development,
						publishing, and execution of reusable intelligence modules in a
						workspace-centric system.
					</p>
				</div>

				{/* CTAs */}
				<div className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:flex-row">
					<Link
						to="/skills"
						className="group/cta relative overflow-hidden rounded-xl px-7 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(109,40,217,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(109,40,217,0.6)]"
						style={{
							background:
								"linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
							border: "1px solid rgba(167,139,250,0.3)",
						}}
						onClick={() => posthog.capture("browse_registry_clicked")}
					>
						<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
						<div className="relative z-10 flex items-center gap-2">
							<Terminal size={16} className="transition-transform group-hover/cta:rotate-12" />
							Browse Registry
							<ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-1" />
						</div>
					</Link>

					<Link
						to="/skills/new"
						className="rounded-xl px-7 py-3 text-sm font-bold transition-all duration-200 hover:bg-white/8"
						style={{
							color: "rgba(255,255,255,0.7)",
							border: "1px solid rgba(255,255,255,0.1)",
							background: "rgba(255,255,255,0.03)",
						}}
						onClick={() => posthog.capture("publish_skill_clicked")}
					>
						Publish a Skill
					</Link>
				</div>

				{/* Stats row */}
				<div className="relative z-10 mt-12 flex flex-wrap justify-center gap-3">
					<StatPill value="2.4k+" label="Skills" />
					<StatPill value="98%" label="Uptime" />
					<StatPill value="<50ms" label="Latency" />
					<StatPill value="v1.0" label="Stable" />
				</div>
			</section>

			{/* Feature strip */}
			<div
				className="relative z-10 mx-auto mb-20 max-w-6xl px-4"
			>
				<div
					className="grid grid-cols-1 gap-4 rounded-2xl p-1 sm:grid-cols-3"
					style={{
						background: "rgba(255,255,255,0.02)",
						border: "1px solid rgba(255,255,255,0.05)",
					}}
				>
					{[
						{ icon: <Zap size={18} />, title: "Instant Install", desc: "One-command skill deployment into any agent runtime." },
						{ icon: <Layers size={18} />, title: "Composable", desc: "Stack, chain, and orchestrate skills across workspaces." },
						{ icon: <Terminal size={18} />, title: "Registry CLI", desc: "Publish, version and yank skills from your terminal." },
					].map(({ icon, title, desc }) => (
						<div
							key={title}
							className="group flex flex-col gap-3 rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.04]"
						>
							<div
								className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
								style={{
									background: "rgba(139,92,246,0.15)",
									border: "1px solid rgba(139,92,246,0.2)",
									color: "#a78bfa",
								}}
							>
								{icon}
							</div>
							<p className="text-sm font-bold text-white/90">{title}</p>
							<p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
								{desc}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Recent skills */}
			<section className="latest relative z-10 mx-auto mt-4 max-w-6xl px-4 pb-28">
				{/* Section header */}
				<div className="mb-10 flex items-end justify-between">
					<div className="flex flex-col gap-3">
						<div
							className="w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
							style={{
								background: "rgba(139,92,246,0.1)",
								border: "1px solid rgba(139,92,246,0.2)",
								color: "#a78bfa",
							}}
						>
							Latest
						</div>
						<h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
							Recently Created{" "}
							<span
								style={{
									backgroundImage: "linear-gradient(135deg, #a78bfa, #6d28d9)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundClip: "text",
								}}
							>
								Skills
							</span>
						</h2>
						<p className="max-w-xl text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
							Explore the latest capabilities added to the registry — modular,
							composable, and production-ready agent skills.
						</p>
					</div>

					<Link
						to="/skills"
						className="hidden items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-white/8 sm:flex"
						style={{
							color: "#a78bfa",
							border: "1px solid rgba(139,92,246,0.2)",
							background: "rgba(139,92,246,0.05)",
						}}
					>
						View all
						<ArrowRight size={14} />
					</Link>
				</div>

				{dummySkills.length > 0 ? (
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
						{dummySkills.map((skill) => (
							<SkillCard key={skill.id} {...skill} />
						))}
					</div>
				) : (
					<div
						className="rounded-2xl p-12 text-center text-sm"
						style={{
							background: "rgba(255,255,255,0.02)",
							border: "1px solid rgba(255,255,255,0.06)",
							color: "rgba(255,255,255,0.3)",
						}}
					>
						No skills available yet.
					</div>
				)}
			</section>

			{/* Footer */}
			<footer
				className="relative overflow-hidden"
				style={{
					borderTop: "1px solid rgba(255,255,255,0.06)",
					background: "rgba(0,0,0,0.4)",
				}}
			>
				{/* Glow */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse 60% 50% at 50% -10%, rgba(109,40,217,0.12) 0%, transparent 70%)",
					}}
				/>

				<div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12">
					{/* Brand */}
					<div className="space-y-5 md:col-span-5">
						<div className="flex items-center gap-3">
							<div
								className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
								style={{
									background:
										"linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
									boxShadow: "0 4px 20px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
								}}
							>
								<div
									className="h-3 w-3 rotate-45 rounded-sm"
									style={{ background: "rgba(255,255,255,0.9)" }}
								/>
							</div>
							<div className="leading-tight">
								<p className="text-base font-black text-white">Skild</p>
								<p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
									Agentic Intelligence Registry
								</p>
							</div>
						</div>

						<p className="max-w-md text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
							A high-performance registry for designing, publishing, and executing
							reusable agent skills. Built for composable AI systems and modern
							developer workflows.
						</p>

						<div
							className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
							style={{
								background: "rgba(34,197,94,0.08)",
								border: "1px solid rgba(34,197,94,0.2)",
								color: "rgba(134,239,172,0.8)",
							}}
						>
							<span
								className="h-1.5 w-1.5 rounded-full bg-green-400"
								style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
							/>
							All systems operational
						</div>
					</div>

					{/* Links */}
					<div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 md:col-span-7">
						{[
							{
								heading: "Product",
								links: [
									{ label: "Explore", to: "/" },
									{ label: "Registry", to: "/skills" },
									{ label: "Submit", to: "/skills/new" },
								],
							},
							{
								heading: "Developer",
								links: [
									{ label: "Docs", href: "/docs" },
									{ label: "API", href: "#" },
									{ label: "CLI", href: "#" },
								],
							},
							{
								heading: "Company",
								links: [
									{ label: "About", href: "#" },
									{ label: "Careers", href: "#" },
									{ label: "Contact", href: "#" },
								],
							},
						].map(({ heading, links }) => (
							<div key={heading} className="space-y-4">
								<h4
									className="text-[10px] font-bold uppercase tracking-[0.2em]"
									style={{ color: "rgba(255,255,255,0.3)" }}
								>
									{heading}
								</h4>
								<div className="flex flex-col gap-2.5">
									{links.map(({ label, to, href }: any) =>
										to ? (
											<Link
												key={label}
												to={to}
												className="text-sm transition-colors duration-200 hover:text-white"
												style={{ color: "rgba(255,255,255,0.45)" }}
											>
												{label}
											</Link>
										) : (
											<a
												key={label}
												href={href}
												className="text-sm transition-colors duration-200 hover:text-white"
												style={{ color: "rgba(255,255,255,0.45)" }}
											>
												{label}
											</a>
										)
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Bottom bar */}
				<div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
					<div
						className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs md:flex-row md:items-center md:justify-between"
						style={{ color: "rgba(255,255,255,0.25)" }}
					>
						<p>© {new Date().getFullYear()} Skild. All rights reserved.</p>
						<p>Built for agentic systems • v1.0.0 • latency optimized</p>
					</div>
				</div>
			</footer>
		</div>
	);
}