"use client";

import { Reveal, RevealGroup } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Zap, Shield, MousePointer2, Palette, Database, Command } from "lucide-react";

interface FeaturesProps {
  dict: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
}

const icons = [Zap, Shield, MousePointer2, Palette, Database, Command];

export function Features({ dict }: FeaturesProps) {
  return (
    <section id="features" className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            {dict.title}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {dict.subtitle}
          </p>
        </Reveal>
      </div>

      <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.05}>
        {dict.items.map((feature, i) => {
          const Icon = icons[i] || icons[0];
          return (
            <Card key={feature.title} className="p-8 group hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </Card>
          );
        })}
      </RevealGroup>
    </section>
  );
}
