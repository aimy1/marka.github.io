"use client";

import { useState } from "react";
import { Download, Apple, Monitor, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealGroup } from "@/components/Reveal";

const iconMap = {
  apple: Apple,
  monitor: Monitor,
  terminal: Terminal,
};

interface Platform {
  iconName: "apple" | "monitor" | "terminal";
  name: string;
  subtitle: string;
  filename: string;
  size: string;
  href: string;
}

interface PlatformGridProps {
  platforms: Platform[];
  lang: string;
}

export function PlatformGrid({ platforms, lang }: PlatformGridProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20" stagger={0.08}>
      {platforms.map((p) => {
        const isSelected = selected === p.name;
        const Icon = iconMap[p.iconName];
        return (
          <motion.div
            key={p.name}
            onClick={() => setSelected(p.name)}
            whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-3xl border-2 p-8 flex flex-col gap-6 transition-all duration-300 ${
              isSelected
                ? "border-accent bg-accent/[0.02] dark:bg-accent/[0.04] shadow-xl shadow-accent/5"
                : "border-zinc-100 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
            }`}
          >
            {/* Selection Indicator */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-2.5 -right-2.5"
                >
                  <div className="bg-accent text-white rounded-full p-1.5 shadow-lg shadow-accent/30 z-20">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 6L4.5 8L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-start justify-between">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <Icon size={26} strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {p.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                {p.subtitle}
              </p>
            </div>

            <div className="mt-auto pt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono tracking-tight truncate max-w-[150px]">
                  {p.filename}
                </p>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {p.size}
                </span>
              </div>

              <a
                href={p.href}
                className={`flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 bg-accent text-white hover:bg-accent-hover shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98]`}
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={16} strokeWidth={2.5} />
                {lang === "zh" ? "立即下载" : "Download Now"}
              </a>
            </div>
          </motion.div>
        );
      })}
    </RevealGroup>
  );
}
