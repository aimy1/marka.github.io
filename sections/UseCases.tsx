"use client";

import { Reveal, RevealGroup } from "@/components/Reveal";

interface UseCasesProps {
  dict: {
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
}

export function UseCases({ dict }: UseCasesProps) {
  return (
    <section className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-12 text-center">
            {dict.title}
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.08}>
          {dict.items.map((item) => (
            <div
              key={item.title}
              className="group relative p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-accent/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
