"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocSection } from "@/lib/docs";

interface DocsSidebarProps {
  lang: "en" | "zh";
  docsData: DocSection[];
  dict: {
    search: string;
    noResults: string;
  };
}

export function DocsSidebar({ lang, docsData, dict }: DocsSidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const allItems = useMemo(() => docsData.flatMap(s => s.items), [docsData]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  // Extract slug from pathname, correctly handling the lang prefix
  const currentSlug = pathname.split(`/docs/`)[1]?.split('/')[0] || "introduction";

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-20">
        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder={dict.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Search results */}
        {query && (
          <div className="mb-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden shadow-md group">
            {searchResults.length === 0 ? (
              <p className="px-4 py-3 text-xs text-zinc-400">{dict.noResults} "{query}"</p>
            ) : (
              <ul>
                {searchResults.slice(0, 6).map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${lang}/docs/${item.slug}`}
                      onClick={() => setQuery("")}
                      className="block px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Nav */}
        {!query &&
          docsData.map((section) => (
            <div key={section.id} className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 px-1">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentSlug === item.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/${lang}/docs/${item.slug}`}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-lg transition-all duration-150",
                          isActive
                            ? "text-accent bg-accent/8 font-medium"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>
    </aside>
  );
}
