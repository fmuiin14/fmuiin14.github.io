import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "wmedia-ticketing-system",
    title: "W.Media Ticketing System",
    description:
      "Enterprise event ticketing platform handling thousands of concurrent users with real-time seat selection and payment processing.",
    coverImage: "/images/projects/wmedia.png",
    overview:
      "Built a comprehensive ticketing system for W.Media that manages event registration, seat allocation, payment processing, and attendee check-in for large-scale technology conferences across Asia Pacific.",
    problem:
      "W.Media needed a scalable solution to handle ticket sales for multiple simultaneous events, supporting thousands of concurrent users during peak registration periods.",
    solution:
      "Designed and implemented a microservices-based ticketing platform with real-time seat availability, queue management, and integrated payment gateways.",
    architecture:
      "Microservices architecture with Laravel backend, Vue.js frontend, Redis for caching and queue management, PostgreSQL for data persistence, and AWS infrastructure.",
    techStack: ["Laravel", "Vue.js", "PostgreSQL", "Redis", "AWS", "Docker"],
    challenges: [
      "Handling race conditions during concurrent seat selection",
      "Implementing real-time availability updates across multiple browser sessions",
      "Scaling the payment processing pipeline for peak loads",
    ],
    keyLearnings: [
      "Optimistic locking patterns for concurrent resource allocation",
      "Event-driven architecture for real-time updates",
      "Load testing and capacity planning strategies",
    ],
    screenshots: [],
    githubLink: undefined,
    demoLink: undefined,
    featured: true,
  },
  {
    slug: "trustevolve-ai",
    title: "TrustEvolveAI",
    description:
      "AI-powered trust scoring platform that analyzes business relationships and provides intelligent risk assessment recommendations.",
    coverImage: "/images/projects/trustevolve.png",
    overview:
      "Developed an AI-driven platform that evaluates trust metrics in business relationships using machine learning models and natural language processing.",
    problem:
      "Businesses needed an automated way to assess and monitor trustworthiness of their partners and vendors without manual due diligence for every transaction.",
    solution:
      "Built an AI pipeline that aggregates data from multiple sources, applies ML models for risk scoring, and provides actionable insights through an intuitive dashboard.",
    architecture:
      "Monolithic Laravel application with Python ML microservice, PostgreSQL database, Redis caching, and React dashboard.",
    techStack: [
      "Laravel",
      "React",
      "Python",
      "PostgreSQL",
      "Redis",
      "OpenAI API",
    ],
    challenges: [
      "Integrating multiple data sources with varying reliability",
      "Building explainable AI models for compliance requirements",
      "Optimizing ML inference for real-time scoring",
    ],
    keyLearnings: [
      "Prompt engineering for structured data extraction",
      "Building hybrid AI systems combining rules and ML",
      "Data pipeline architecture for ML applications",
    ],
    screenshots: [],
    githubLink: "https://github.com/fmuiin/trustevolve-ai",
    demoLink: undefined,
    featured: true,
  },
  {
    slug: "careerlift",
    title: "CareerLift",
    description:
      "Career development platform with AI-powered resume analysis, job matching, and personalized learning path recommendations.",
    coverImage: "/images/projects/careerlift.png",
    overview:
      "Created a comprehensive career development platform that helps professionals optimize their resumes, find matching opportunities, and build targeted skills.",
    problem:
      "Job seekers struggle to optimize their profiles for ATS systems and identify the right skill gaps to address for their target roles.",
    solution:
      "Developed an AI-powered platform that analyzes resumes against job descriptions, provides optimization suggestions, and recommends personalized learning paths.",
    architecture:
      "Next.js frontend with Laravel API backend, PostgreSQL database, Redis queues, and OpenAI integration for NLP processing.",
    techStack: ["Next.js", "Laravel", "PostgreSQL", "Redis", "OpenAI API", "AWS"],
    challenges: [
      "Parsing diverse resume formats accurately",
      "Building meaningful job-resume matching algorithms",
      "Creating personalized learning recommendations at scale",
    ],
    keyLearnings: [
      "NLP techniques for document analysis",
      "Recommendation system architecture",
      "Building user-centric AI features",
    ],
    screenshots: [],
    githubLink: "https://github.com/fmuiin/careerlift",
    demoLink: undefined,
    featured: true,
  },
  {
    slug: "growthpedia",
    title: "GrowthPedia",
    description:
      "Knowledge management platform for growth teams with collaborative documentation, experiment tracking, and analytics dashboards.",
    coverImage: "/images/projects/growthpedia.png",
    overview:
      "Built a knowledge management system that helps growth teams document experiments, track results, and share learnings across the organization.",
    problem:
      "Growth teams lose institutional knowledge when experiments aren't properly documented and results aren't shared across teams.",
    solution:
      "Created a collaborative platform with structured experiment templates, automated result tracking, and searchable knowledge base.",
    architecture:
      "Laravel monolith with Vue.js SPA, MySQL database, Elasticsearch for full-text search, and S3 for file storage.",
    techStack: ["Laravel", "Vue.js", "MySQL", "Elasticsearch", "AWS S3", "Docker"],
    challenges: [
      "Designing flexible experiment templates",
      "Implementing full-text search across diverse content types",
      "Building real-time collaboration features",
    ],
    keyLearnings: [
      "Search engine integration patterns",
      "Collaborative editing architecture",
      "Metrics-driven product development",
    ],
    screenshots: [],
    githubLink: undefined,
    demoLink: undefined,
    featured: true,
  },
  {
    slug: "blips-life",
    title: "Blips Life",
    description:
      "Social wellness platform that gamifies healthy habits and connects users with accountability partners for sustainable lifestyle changes.",
    coverImage: "/images/projects/blips.png",
    overview:
      "Developed a mobile-first wellness platform that combines habit tracking with social accountability features to help users build and maintain healthy routines.",
    problem:
      "Most habit-tracking apps fail because they lack social motivation and become tedious to use after the initial novelty wears off.",
    solution:
      "Built a gamified platform with social challenges, streak systems, and accountability partnerships that make habit building engaging and sustainable.",
    architecture:
      "React Native mobile app with Laravel API, MySQL database, Firebase for push notifications, and Redis for leaderboards.",
    techStack: ["React Native", "Laravel", "MySQL", "Firebase", "Redis"],
    challenges: [
      "Designing engaging gamification without being manipulative",
      "Building real-time social features at scale",
      "Optimizing mobile performance for daily interactions",
    ],
    keyLearnings: [
      "Gamification design principles",
      "Push notification strategies for engagement",
      "Mobile-first API design patterns",
    ],
    screenshots: [],
    githubLink: undefined,
    demoLink: undefined,
    featured: true,
  },
  {
    slug: "reinsurance-management-system",
    title: "Reinsurance Management System",
    description:
      "Enterprise reinsurance platform managing complex treaty structures, claims processing, and financial reporting for insurance companies.",
    coverImage: "/images/projects/reinsurance.png",
    overview:
      "Built an enterprise system for managing reinsurance operations including treaty management, premium calculations, claims processing, and regulatory reporting.",
    problem:
      "Insurance companies relied on spreadsheets and legacy systems for managing complex reinsurance treaties, leading to errors and compliance risks.",
    solution:
      "Developed a modern web-based platform with automated calculations, audit trails, and comprehensive reporting that integrates with existing insurance systems.",
    architecture:
      "Laravel enterprise application with PostgreSQL, complex business logic layer, PDF generation, and Excel import/export capabilities.",
    techStack: ["Laravel", "PostgreSQL", "Vue.js", "Redis", "Docker", "AWS"],
    challenges: [
      "Modeling complex reinsurance treaty structures in code",
      "Ensuring calculation accuracy for financial compliance",
      "Migrating data from legacy systems without downtime",
    ],
    keyLearnings: [
      "Domain-driven design for complex business logic",
      "Financial calculation precision in software",
      "Enterprise system migration strategies",
    ],
    screenshots: [],
    githubLink: undefined,
    demoLink: undefined,
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
