"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Download } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";

interface HeroProps {
  lang: "en" | "zh";
  dict: {
    badge: string;
    headlineMain: string;
    headlineAccent: string;
    subheadline: string;
    ctaDownload: string;
    ctaGithub: string;
    footer: string;
  };
}

export function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl mx-auto text-center z-10"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {dict.badge}
            <ArrowRight size={11} className="opacity-60" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-6 text-balance"
        >
          {dict.headlineMain}
          <br />
          <span className="bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-transparent">
            {dict.headlineAccent}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 text-balance"
        >
          {dict.subheadline}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href={`/${lang}/download`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 shadow-md shadow-accent/25 w-full sm:w-auto justify-center"
          >
            <Download size={15} />
            {dict.ctaDownload}
          </Link>
          <a
            href="https://github.com/aimy1/Marka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <Github size={15} />
            {dict.ctaGithub}
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-xs text-zinc-400 dark:text-zinc-500"
        >
          {dict.footer}
        </motion.p>
      </motion.div>

      {/* Product Image Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-5xl mx-auto mt-20 px-4 z-10"
      >
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl shadow-zinc-200/60 dark:shadow-zinc-950/80 overflow-hidden group">
          {/* Light Mode Image */}
          <div className="block dark:hidden">
            <Image
              src="/images/marka.white.png"
              alt="Marka Interface Light Mode"
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          
          {/* Dark Mode Image */}
          <div className="hidden dark:block">
            <Image
              src="/images/marka.black.png"
              alt="Marka Interface Dark Mode"
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Subtle overlay border for depth */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-2xl" />
        </div>

        {/* Bottom decorative gradient */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
