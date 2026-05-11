import type { SkillREcord } from "../../type";

export const dummySkills: SkillREcord[] = [
	{
		id: "1",
		title: "React Basics",
		slug: "react-basics",
		description:
			"Learn the fundamentals of React including components, hooks, and state management.",
		category: "Frontend",
		tags: ["react", "javascript", "frontend"],
		installCommand: "npm install react",
		createdAt: "2026-01-15",
		authorClerkId: "clerk_001",
		authorEmail: "john@example.com",
	},
	{
		id: "2",
		title: "TypeScript Advanced",
		slug: "typescript-advanced",
		description:
			"Master advanced TypeScript concepts like generics, decorators, and utility types.",
		category: "Backend",
		tags: ["typescript", "programming", "backend"],
		installCommand: "npm install typescript",
		createdAt: "2026-02-20",
		authorClerkId: "clerk_002",
		authorEmail: "jane@example.com",
	},
	{
		id: "3",
		title: "Tailwind CSS Mastery",
		slug: "tailwind-css-mastery",
		description: "Create stunning UIs with Tailwind CSS utility-first approach.",
		category: "Frontend",
		tags: ["tailwind", "css", "styling"],
		installCommand: "npm install -D tailwindcss",
		createdAt: "2026-03-10",
		authorClerkId: "clerk_003",
		authorEmail: "mike@example.com",
	},
	{
		id: "4",
		title: "Node.js REST APIs",
		slug: "nodejs-rest-apis",
		description:
			"Build scalable and secure REST APIs using Node.js and Express.js.",
		category: "Backend",
		tags: ["nodejs", "api", "express", "backend"],
		installCommand: "npm install express",
		createdAt: "2026-04-05",
		authorClerkId: null,
		authorEmail: null,
	},
	{
		id: "5",
		title: "React Router Deep Dive",
		slug: "react-router-deep-dive",
		description:
			"Explore advanced routing patterns and navigation in React applications.",
		category: "Frontend",
		tags: ["react", "routing", "navigation"],
		installCommand: "npm install react-router-dom",
		createdAt: "2026-05-01",
		authorClerkId: "clerk_005",
		authorEmail: "sarah@example.com",
	},
];
