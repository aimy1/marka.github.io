"use client";

import { useState, useRef } from "react";
import { Reveal } from "@/components/Reveal";

interface EditorShowcaseProps {
  dict: {
    title: string;
    subtitle: string;
    markdown: string;
    preview: string;
    placeholder: string;
  };
}

export function EditorShowcase({ dict }: EditorShowcaseProps) {
  const [content, setContent] = useState(dict.placeholder);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simple Markdown-like renderer for the demo
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3 mt-4">$1</h2>')
      .replace(/^\> (.*$)/gm, '<blockquote class="border-l-4 border-accent/30 pl-4 italic my-4 text-zinc-500">$1</blockquote>')
      .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n\n/g, "<br/>");
  };

  return (
    <section className="py-24 px-4 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 text-balance">
              {dict.title}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {dict.subtitle}
            </p>
          </Reveal>
        </div>

        <Reveal className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
            {/* Header / Tabs */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  {dict.markdown}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  {dict.preview}
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
                Marka v3.3.7
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 h-[400px]">
              {/* Editor Pane */}
              <div className="relative h-full bg-white dark:bg-[#0D0D0D]">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full p-6 bg-transparent text-zinc-800 dark:text-zinc-200 font-mono text-sm resize-none focus:outline-none scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800"
                  spellCheck={false}
                />
              </div>

              {/* Preview Pane */}
              <div className="relative h-full bg-[#FAFAFA] dark:bg-[#11111B] overflow-auto p-8 prose prose-zinc dark:prose-invert prose-sm max-w-none">
                <div
                  className="preview-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
