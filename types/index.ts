export interface Project {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  challenges: string[];
  keyLearnings: string[];
  screenshots: string[];
  githubLink?: string;
  demoLink?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory =
  | "languages"
  | "frameworks"
  | "databases"
  | "cloud"
  | "tools"
  | "other";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface UsesItem {
  name: string;
  description: string;
  link?: string;
}

export interface UsesCategory {
  title: string;
  items: UsesItem[];
}

export interface NowItem {
  category: string;
  items: string[];
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
}

export type InvoiceLanguage = "id" | "en";

export type InvoiceStatus = "draft" | "unpaid" | "partial" | "paid";

export interface BankAccount {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface InvoiceSettings {
  businessName: string;
  businessTagline: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo: string;
  bankAccounts: BankAccount[];
  paymentInstructions: string;
  currency: string;
  language: InvoiceLanguage;
  numberPrefix: string;
  nextNumber: number;
  dueDays: number;
  taxLabel: string;
  taxRate: number;
  accentColor: string;
  defaultNotes: string;
  defaultTerms: string;
  showSignature: boolean;
}

export interface InvoiceItem {
  id: string;
  description: string;
  detail: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface InvoiceClient {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export interface Invoice {
  number: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  projectName: string;
  client: InvoiceClient;
  items: InvoiceItem[];
  discountType: "percent" | "fixed";
  discountValue: number;
  applyTax: boolean;
  amountPaid: number;
  notes: string;
  terms: string;
}
