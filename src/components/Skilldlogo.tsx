import { useEffect, useRef } from "react";

const SkildLogo = ({
	size = 40,
	animated = true,
}: { size?: number; animated?: boolean }) => {
	const ref = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!animated || !ref.current) return;
		const svg = ref.current;

		let t = 0;
		let raf: number;

		const tick = () => {
			t += 0.018;
			const diamond = svg.querySelector<SVGElement>(".logo-diamond");
			const inner = svg.querySelector<SVGElement>(".logo-inner");
			const ring = svg.querySelector<SVGElement>(".logo-ring");
			const glow = svg.querySelector<SVGElement>(".logo-glow");

			if (diamond) {
				const scale = 1 + Math.sin(t) * 0.035;
				diamond.style.transform = `scale(${scale})`;
				diamond.style.transformOrigin = "50% 50%";
			}
			if (inner) {
				inner.style.transform = `rotate(${t * 30}deg)`;
				inner.style.transformOrigin = "50% 50%";
			}
			if (ring) {
				const opacity = 0.4 + Math.sin(t * 1.5) * 0.3;
				ring.style.opacity = String(opacity);
			}
			if (glow) {
				const r = 4 + Math.sin(t * 2) * 2;
				(glow as SVGCircleElement).setAttribute?.("r", String(r));
			}
			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [animated]);

	const s = size;

	return (
		<svg
			ref={ref}
			width={s}
			height={s}
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ display: "block" }}
		>
			<defs>
				<linearGradient id="logo-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#a78bfa" />
					<stop offset="50%" stopColor="#8b5cf6" />
					<stop offset="100%" stopColor="#6d28d9" />
				</linearGradient>
				<linearGradient id="logo-grad-face" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
					<stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
				</linearGradient>
				<linearGradient id="logo-grad-side" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
					<stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
				</linearGradient>
				<filter id="logo-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="2" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				<filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
					<feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6d28d9" floodOpacity="0.5" />
				</filter>
			</defs>

			{/* BG Glow */}
			<circle cx="20" cy="20" r="18" fill="rgba(139,92,246,0.12)" />

			{/* Outer ring */}
			<circle
				className="logo-ring"
				cx="20"
				cy="20"
				r="17"
				stroke="url(#logo-grad-main)"
				strokeWidth="0.5"
				strokeDasharray="4 3"
				fill="none"
				opacity="0.5"
			/>

			{/* 3D Cube/Diamond base */}
			<g className="logo-diamond" filter="url(#logo-shadow)">
				{/* Top face */}
				<polygon
					points="20,6 31,13 20,20 9,13"
					fill="url(#logo-grad-face)"
					stroke="rgba(167,139,250,0.6)"
					strokeWidth="0.4"
				/>
				{/* Right face */}
				<polygon
					points="31,13 31,27 20,34 20,20"
					fill="url(#logo-grad-main)"
					stroke="rgba(109,40,217,0.8)"
					strokeWidth="0.4"
				/>
				{/* Left face */}
				<polygon
					points="9,13 20,20 20,34 9,27"
					fill="url(#logo-grad-side)"
					stroke="rgba(109,40,217,0.6)"
					strokeWidth="0.4"
				/>
			</g>

			{/* Spinning inner element */}
			<g className="logo-inner" style={{ transformOrigin: "20px 20px" }}>
				<polygon
					points="20,14 23,20 20,26 17,20"
					fill="rgba(255,255,255,0.9)"
					opacity="0.85"
				/>
			</g>

			{/* Glow dot */}
			<circle
				className="logo-glow"
				cx="20"
				cy="6"
				r="4"
				fill="rgba(167,139,250,0.7)"
				filter="url(#logo-glow-filter)"
			/>

			{/* Corner accents */}
			<circle cx="9" cy="13" r="1.2" fill="#a78bfa" opacity="0.6" />
			<circle cx="31" cy="13" r="1.2" fill="#a78bfa" opacity="0.6" />
			<circle cx="20" cy="34" r="1.2" fill="#6d28d9" opacity="0.6" />
		</svg>
	);
};

export default SkildLogo;