import { useEffect, useRef, useState } from "react";

const AnimatedCursor = () => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const trailRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	const [isHovering, setIsHovering] = useState(false);
	const [isClicking, setIsClicking] = useState(false);
	const pos = useRef({ x: 0, y: 0 });
	const trail = useRef({ x: 0, y: 0 });
	const raf = useRef<number>(0);

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			pos.current = { x: e.clientX, y: e.clientY };
		};

		const onDown = () => setIsClicking(true);
		const onUp = () => setIsClicking(false);

		const updateHover = () => {
			const els = document.querySelectorAll(
				"a, button, [role='button'], input, textarea, select, label"
			);
			const checkHover = (e: MouseEvent) => {
				let hovering = false;
				for (const el of els) {
					const rect = el.getBoundingClientRect();
					if (
						e.clientX >= rect.left &&
						e.clientX <= rect.right &&
						e.clientY >= rect.top &&
						e.clientY <= rect.bottom
					) {
						hovering = true;
						break;
					}
				}
				setIsHovering(hovering);
			};
			document.addEventListener("mousemove", checkHover);
			return () => document.removeEventListener("mousemove", checkHover);
		};

		const cleanup = updateHover();

		const animate = () => {
			// Smooth trail interpolation
			trail.current.x += (pos.current.x - trail.current.x) * 0.12;
			trail.current.y += (pos.current.y - trail.current.y) * 0.12;

			if (cursorRef.current) {
				cursorRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
			}
			if (trailRef.current) {
				trailRef.current.style.transform = `translate(${trail.current.x - 20}px, ${trail.current.y - 20}px)`;
			}
			if (glowRef.current) {
				glowRef.current.style.transform = `translate(${trail.current.x - 80}px, ${trail.current.y - 80}px)`;
			}
			raf.current = requestAnimationFrame(animate);
		};

		document.addEventListener("mousemove", onMove);
		document.addEventListener("mousedown", onDown);
		document.addEventListener("mouseup", onUp);
		raf.current = requestAnimationFrame(animate);

		return () => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mousedown", onDown);
			document.removeEventListener("mouseup", onUp);
			cancelAnimationFrame(raf.current);
			cleanup();
		};
	}, []);

	return (
		<>
			{/* Outer glow */}
			<div
				ref={glowRef}
				className="pointer-events-none fixed left-0 top-0 z-[9999] h-40 w-40 rounded-full"
				style={{
					background:
						"radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
					willChange: "transform",
				}}
			/>
			{/* Trail ring */}
			<div
				ref={trailRef}
				className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border"
				style={{
					borderColor: isHovering
						? "rgba(167,139,250,0.8)"
						: "rgba(139,92,246,0.4)",
					background: isHovering ? "rgba(139,92,246,0.08)" : "transparent",
					transform: `scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
					transition: "border-color 0.3s, background 0.3s",
					willChange: "transform",
				}}
			/>
			{/* Dot */}
			<div
				ref={cursorRef}
				className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full"
				style={{
					background: isHovering
						? "rgba(167,139,250,1)"
						: "rgba(139,92,246,1)",
					transform: `scale(${isClicking ? 0.5 : 1})`,
					transition: "background 0.2s, transform 0.15s",
					boxShadow: "0 0 10px rgba(139,92,246,0.8), 0 0 20px rgba(139,92,246,0.4)",
					willChange: "transform",
				}}
			/>
		</>
	);
};

export default AnimatedCursor;