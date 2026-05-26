"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Flame,
  Trophy,
  CalendarDays,
  Activity,
  Code2,
} from "lucide-react";
import { supabase } from '@/lib/supabase'
const cards = [
  {
    title: "React Patterns",
    value: "75%",
    icon: Code2,
    desc: "Advanced components",
  },
  {
    title: "Daily Streak",
    value: "12 days",
    icon: Flame,
    desc: "Keep learning daily",
  },
  {
    title: "Activity",
    value: "84%",
    icon: Activity,
    desc: "Weekly completion",
  },
  {
    title: "Achievement",
    value: "Gold",
    icon: Trophy,
    desc: "Top 12% learner",
  },
  {
    title: "Next Lesson",
    value: "Today",
    icon: CalendarDays,
    desc: "System Design Basics",
  },
  {
    title: "Courses",
    value: "4 Active",
    icon: BookOpen,
    desc: "Continue learning",
  },
];

export default function DashboardPreview() {
  return (
    <section className="relative mx-auto mt-28 max-w-7xl px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-100 md:text-5xl">
          Your Command Center Awaits
        </h2>
        <p className="mt-4 text-sm text-slate-400 md:text-base">
          Beautiful bento grid dashboard with real-time progress tracking
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid gap-5 rounded-3xl border border-cyan-500/10 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-500/10 md:grid-cols-3 lg:grid-cols-6"
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.02,
                y: -4,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/70 p-5"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.18),transparent_35%)]" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-300">
                    <Icon size={20} />
                  </span>
                  <span className="text-xs text-slate-500">LIVE</span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-200">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-cyan-300">
                    {card.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{card.desc}</p>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                  />
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}