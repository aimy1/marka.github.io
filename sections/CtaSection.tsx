"use client";

import { Download, Github } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

interface CtaSectionProps {
  lang: "en" | "zh";
  dict: {
    title: string;
    subtitle: string;
    download: string;
    github: string;
    footer: string;
  };
}

export function CtaSection({ lang, dict }: CtaSectionProps) {
  return (
    <section className="py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 sm:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-indigo-500/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            <div className="relative">
              {/* Icon */}
              <div className="relative mx-auto w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-accent/20 mb-6 group-hover:shadow-accent/40 transition-shadow duration-500">
                <img
                  src="/images/markd.logo.jpg"
                  alt="Marka Logo"
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 text-balance">
                {dict.title}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                {dict.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/${lang}/download`}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 shadow-md shadow-accent/25 text-sm w-full sm:w-auto justify-center"
                >
                  <Download size={15} />
                  {dict.download}
                </Link>
                <a
                  href="https://github.com/markaeditor/marka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 text-sm w-full sm:w-auto justify-center"
                >
                  <Github size={15} />
                  {dict.github}
                </a>
              </div>

              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-8">
                {dict.footer}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
