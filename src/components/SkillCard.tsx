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
		<article className="skill-card">
			<Link
				to="/skills"
				tabIndex={-1}
				aria-label={`Open ${title}`}
				className="overlay"
			/>
			<div className="chrome">
				<div className="chrome-bar">
					<div className="lights">
						<div className="light red" />
						<div className="light amber" />
						<div className="light green" />
					</div>
					<div className="host">registry.sh</div>
				</div>
			</div>
			<div className="body">
				<div className="meta">
					<div className="author">
						<img src="/logo512.png" alt="author avatar" className="avatar" />
						<div className="author-copy">
							<p> Saksham</p>
							<p>
								{createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
							</p>
						</div>
					</div>
					<p className="category">{category}</p>
				</div>
				<div className="summary">
					<Link to="/skills" className="title-link">
						<h3>{title}</h3>
					</Link>
					<p>{description}</p>
				</div>
				<div className="command">
					<div className="command-copy">
						<span>{">_"}</span>
						<p>{installCommand}</p>
					</div>
					<button type="button" className="copy" onClick={handleCopy}>
						{isCopied ? <Check size={16} /> : <Copy size={16} />}
					</button>
				</div>
				<div className="footer">
					<div className="stats">
						<button type="button" className="upvote" disabled>
							<ArrowBigUp size={16} fill="currentColor" />
							<span>{tags.length}</span>
						</button>
						<div className="comments">
							<MessageSquare size={14} />
							<span>{authorEmail ? 1 : 0}</span>
						</div>
					</div>

					<div className="actions">
						<Link
							to="/skills"
							className="open"
							title={`Open ${title}`}
							onClick={() =>
								posthog.capture("installation completed", {
									skill_title: title,
									category,
								})
							}
						>
							<span>Open</span>
							<ArrowUpRight size={14} />
						</Link>
						<button
							type="button"
							className="save"
							aria-label="saved state"
							disabled
						>
							<Bookmark size={16} fill="currentColor" />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
