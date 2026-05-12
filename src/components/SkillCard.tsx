import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import {
	ArrowBigUp,
	ArrowUpRight,
	Bookmark,
	Check,
	Copy,
	MessageSquare,
} from "lucide-react";
import { useState } from "react";

const SkillCard = ({
	authorEmail,
	category,
	createdAt,
	description,
	installCommand,
	tags,
	title,
}: SkillRecord) => {
	const [isCopied, setIsCopied] = useState(false);
	const posthog = usePostHog();

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommand);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);

		posthog.capture("skill_install_command_copied", {
			skill_title: title,
			category,
			install_command: installCommand,
		});
	};

	return (
		<article
			className="
				group relative overflow-hidden rounded-xl border border-border-subtle
				bg-gradient-to-b from-white/5 to-transparent
				transition-all duration-300
				hover:-translate-y-1 hover:border-violet-400/40
				hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)]
			"
		>
			{/* clickable overlay */}
			<Link
				to="/skills"
				tabIndex={-1}
				aria-label={`Open ${title}`}
				className="absolute inset-0 z-10"
			/>

			{/* glow */}
			<div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
				<div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
			</div>

			{/* HEADER (chrome) */}
			<div className="relative z-20 border-b border-border-subtle bg-black/30 backdrop-blur-md px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex gap-1.5">
						<div className="h-2.5 w-2.5 rounded-full bg-red-400" />
						<div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
						<div className="h-2.5 w-2.5 rounded-full bg-green-400" />
					</div>

					<span className="text-[10px] uppercase tracking-widest text-muted-foreground">
						registry.sh
					</span>
				</div>
			</div>

			{/* BODY */}
			<div className="relative z-20 flex flex-col gap-4 p-5">
				{/* meta */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300">
							S
						</div>

						<div className="flex flex-col leading-tight">
							<p className="text-sm font-medium text-foreground">
								Saksham
							</p>
							<p className="text-xs text-muted-foreground">
								{createdAt
									? new Date(createdAt).toLocaleDateString()
									: "-"}
							</p>
						</div>
					</div>

					<span className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
						{category}
					</span>
				</div>

				{/* title */}
				<div className="space-y-1">
					<h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-violet-300 transition-colors">
						{title}
					</h3>

					<p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
						{description}
					</p>
				</div>

				{/* command (terminal feel) */}
				<div
					className="
						mt-2 flex items-center justify-between
						rounded-lg border border-white/10
						bg-black/40 px-3 py-2 font-mono text-xs
						text-muted-foreground
					"
				>
					<div className="flex items-center gap-2 overflow-hidden">
						<span className="text-violet-400">$_</span>
						<p className="truncate">{installCommand}</p>
					</div>

					<button
						type="button"
						onClick={handleCopy}
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						{isCopied ? <Check size={15} /> : <Copy size={15} />}
					</button>
				</div>

				{/* footer */}
				<div className="flex items-center justify-between pt-2 border-t border-white/5">
					<div className="flex items-center gap-4 text-muted-foreground">
						<button className="flex items-center gap-1 text-xs">
							<ArrowBigUp size={15} className="text-violet-400" />
							<span>{tags.length}</span>
						</button>

						<div className="flex items-center gap-1 text-xs">
							<MessageSquare size={14} />
							<span>{authorEmail ? 1 : 0}</span>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<button
							className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
							disabled
						>
							<Bookmark size={16} />
						</button>

						<Link
							to="/skills"
							className="flex items-center gap-1 text-xs font-medium text-violet-300 hover:text-violet-200 transition"
							onClick={() =>
								posthog.capture("installation_completed", {
									skill_title: title,
									category,
								})
							}
						>
							Open
							<ArrowUpRight size={14} />
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
