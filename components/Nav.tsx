"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface NavProps {
  lang: "en" | "zh";
  dict: {
    home: string;
    docs: string;
    download: string;
    about: string;
    getStarted: string;
  };
}

export function Nav({ lang, dict }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/docs`, label: dict.docs },
    { href: `/${lang}/download`, label: dict.download },
    { href: `/${lang}/about`, label: dict.about },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleLang = () => {
    const segments = pathname.split("/");
    segments[1] = lang === "en" ? "zh" : "en";
    return segments.join("/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm shadow-zinc-100/50 dark:shadow-none"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden shadow-sm shadow-accent/20 group-hover:shadow-accent/40 transition-shadow duration-200">
              <img
                src="/images/markd.logo.jpg"
                alt="Marka Logo"
                width={28}
                height={28}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-[15px] tracking-tight">
              Marka
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${lang}`
                  ? pathname === `/${lang}`
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-all duration-150",
                    isActive
                      ? "text-zinc-900 dark:text-zinc-50 font-medium bg-zinc-100 dark:bg-zinc-800"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Link
              href={toggleLang()}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
              aria-label="Toggle language"
              title={lang === "en" ? "切换到中文" : "Switch to English"}
            >
              <span className="text-[11px] font-bold tracking-tighter">
                {lang === "en" ? "ZH" : "EN"}
              </span>
            </Link>
            
            <a
              href="https://github.com/aimy1/Marka"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <ThemeToggle />
            <Link
              href={`/${lang}/download`}
              className="hidden md:inline-flex ml-1 items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-lg bg-accent text-white hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 shadow-sm shadow-accent/20"
            >
              {dict.download}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden ml-1 flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -15 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 15 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-lg md:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === `/${lang}/`
                    ? pathname === `/${lang}/`
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2.5 text-sm rounded-lg transition-colors",
                      isActive
                        ? "text-zinc-900 dark:text-zinc-50 font-medium bg-zinc-100 dark:bg-zinc-800"
                        : "text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 pb-1 border-t border-zinc-100 dark:border-zinc-800 mt-1 flex items-center gap-2">
                <a
                  href="https://github.com/markaeditor/marka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-zinc-600 dark:text-zinc-400"
                >
                  <Github size={15} />
                  GitHub
                </a>
                <Link
                  href={`/${lang}/download`}
                  className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover"
                >
                  {dict.download}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
