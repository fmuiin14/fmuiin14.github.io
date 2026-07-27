import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    company: "W.Media",
    role: "Senior Full Stack Engineer",
    duration: "2022 - Present",
    startDate: "2022-01",
    endDate: "Present",
    achievements: [
      "Led development of enterprise ticketing system handling 10,000+ concurrent users",
      "Architected microservices migration reducing deployment time by 60%",
      "Mentored team of 4 junior developers on best practices and code quality",
      "Implemented CI/CD pipeline reducing production incidents by 40%",
    ],
    technologies: ["Laravel", "Vue.js", "PostgreSQL", "Redis", "AWS", "Docker"],
  },
  {
    id: "2",
    company: "TechCorp Solutions",
    role: "Full Stack Developer",
    duration: "2020 - 2022",
    startDate: "2020-03",
    endDate: "2022-01",
    achievements: [
      "Built AI-powered analytics dashboard serving 500+ enterprise clients",
      "Optimized database queries reducing API response time by 70%",
      "Developed RESTful APIs consumed by mobile and web applications",
      "Introduced automated testing increasing code coverage from 20% to 85%",
    ],
    technologies: ["Laravel", "React", "MySQL", "Redis", "Docker", "AWS"],
  },
  {
    id: "3",
    company: "StartupHub",
    role: "Backend Developer",
    duration: "2018 - 2020",
    startDate: "2018-06",
    endDate: "2020-02",
    achievements: [
      "Developed core payment processing module handling $2M+ monthly transactions",
      "Built real-time notification system using WebSockets",
      "Implemented caching strategies reducing server load by 50%",
      "Contributed to open-source libraries used by 1000+ developers",
    ],
    technologies: ["PHP", "Laravel", "MySQL", "Redis", "Vue.js"],
  },
  {
    id: "4",
    company: "Digital Agency Co",
    role: "Junior Developer",
    duration: "2016 - 2018",
    startDate: "2016-09",
    endDate: "2018-05",
    achievements: [
      "Delivered 15+ client projects on time and within budget",
      "Built responsive web applications for various industries",
      "Learned and applied agile development methodologies",
      "Maintained and upgraded legacy PHP applications",
    ],
    technologies: ["PHP", "JavaScript", "MySQL", "HTML/CSS", "jQuery"],
  },
];
