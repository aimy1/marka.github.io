"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NotFound() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "zh">("en");

  useEffect(() => {
    if (pathname.startsWith("/zh")) {
      setLang("zh");
    } else {
      setLang("en");
    }
  }, [pathname]);

  const dict = ({
    en: {
      title: "Page not found",
      description: "We can't find what you're looking for. It might have moved or never existed.",
      goHome: "Go home",
      readDocs: "Read the docs"
    },
    zh: {
      title: "页面未找到",
      description: "找不到您要查看的内容。它可能已移动或从未存在过。",
      goHome: "回首页",
      readDocs: "查看文档"
    }
  } as const)[lang];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-accent/20 mx-auto mb-6">
          <Image
            src="/images/markd.logo.jpg"
            alt="Marka Logo"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 tracking-widest uppercase mb-3">
          Error 404
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          {dict.title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-lg leading-relaxed">
          {dict.description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all duration-200"
        >
          {dict.goHome}
        </Link>
        <Link
          href={`/${lang}/docs`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200"
        >
          {dict.readDocs}
        </Link>
      </div>
    </div>
  );
}
