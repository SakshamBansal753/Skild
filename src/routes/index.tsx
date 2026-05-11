import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { dummySkills } from "#/lib/dummy-skills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const posthog = usePostHog();

	return (
		<div id="home">
			<section className="hero">
				<div className="copy">
					<h1>
						The registry for <br />
						<span className="text-gradient">Agentic Intelligence</span>
					</h1>
					<p>
						A high-performance registry for procedural agent skill development,
						publishing, and operation of reusable agent capabilities from a
						route-driven and workspace-centric perspective.
					</p>
				</div>
				<div className="actions">
					<Link
						to="/skills"
						className="btn-primary"
						onClick={() => posthog.capture("browse_registry_clicked")}
					>
						<Terminal size={18} />
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
			<section className="latest">
				<div className="space-y-2">
					<h2>
						Recently Created <span className="text-gradient">Skills</span>
					</h2>
					<p>
						{" "}
						Explore the latest skills added to the skill registry, showcasing a
						diverse range.
					</p>
				</div>
				<div>
					{dummySkills.length > 0 ? (
						<div className="skills-grid">
							{dummySkills.map((skill) => (
								<SkillCard key={skill.id} {...skill} />
							))}
						</div>
					) : (
						<p>No skills available.</p>
					)}
				</div>
			</section>
		</div>
	);
}
