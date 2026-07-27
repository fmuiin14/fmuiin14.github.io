"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { TechBadge } from "@/components/shared/TechBadge";
import type { Experience } from "@/types";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute top-0 left-[11px] h-full w-px bg-border last:hidden" />

      {/* Timeline dot */}
      <div className="absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface">
        <Briefcase size={12} className="text-primary" />
      </div>

      {/* Content */}
      <div className="rounded-lg border border-border p-5 transition-colors hover:border-primary/30">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-text">
            {experience.role}
          </h3>
          <span className="text-sm text-text-muted">{experience.duration}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-primary">
          {experience.company}
        </p>

        {/* Achievements */}
        <ul className="mt-4 space-y-2">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-3 text-sm text-text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {achievement}
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
