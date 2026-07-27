import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "PHP", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "SQL", category: "languages" },

  // Frameworks
  { name: "Laravel", category: "frameworks" },
  { name: "Vue.js", category: "frameworks" },
  { name: "React", category: "frameworks" },
  { name: "Next.js", category: "frameworks" },
  { name: "Tailwind CSS", category: "frameworks" },

  // Databases
  { name: "PostgreSQL", category: "databases" },
  { name: "MySQL", category: "databases" },
  { name: "Redis", category: "databases" },
  { name: "Elasticsearch", category: "databases" },

  // Cloud & DevOps
  { name: "AWS", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "CI/CD", category: "cloud" },
  { name: "Nginx", category: "cloud" },
  { name: "Linux", category: "cloud" },

  // Tools
  { name: "Git", category: "tools" },
  { name: "REST API", category: "tools" },
  { name: "GraphQL", category: "tools" },
  { name: "AI Integration", category: "tools" },
  { name: "Software Architecture", category: "tools" },
];

export const skillCategories: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  databases: "Databases",
  cloud: "Cloud & DevOps",
  tools: "Tools & Practices",
};
