import type { Metadata } from "next";
import { Github, Heart, Feather } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export async function generateMetadata({ params: { lang } }: { params: { lang: "en" | "zh" } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: dict.about.title,
    description: dict.about.subheadline,
  };
}

const getValues = (lang: string) => {
  if (lang === "zh") {
    return [
      { title: "写作即思考", description: "写作能让思绪变得清晰。优秀的编辑器应该让这个过程变得更简单。Marka 的每一个设计决定都源于此。" },
      { title: "工具应当“消失”", description: "最好的相机是让你忘记手中持握感的那一台。最好的编辑器则是让你忘记它存在的这一个。我们注重工具的透明感。" },
      { title: "极简，而非简陋", description: "极简与简陋有着本质区别。Marka 是简约的——建立在审慎的选择和有目的的克制之上，绝非功能的削减。" },
      { title: "默认开放", description: "你的文件是纯 Markdown 格式。它们可以在任何编辑器中打开，不会被锁定。我们认为这就是软件该有的样子。" },
    ];
  }
  return [
    { title: "Writing is thinking", description: "When you write, you clarify your thoughts. A good editor makes that process easier, not harder. Every design decision in Marka starts here." },
    { title: "Tools should disappear", description: "The best camera is the one you forget you're holding. The best editor is the one you forget you're using. We design for transparency." },
    { title: "Simple, not simplistic", description: "There's a difference between simple and simplistic. Marka is simple — built on careful choices and deliberate constraints. Not cut-down." },
    { title: "Open by default", description: "Your files are plain Markdown. They open in any editor. You're not locked in. We think that's how software should work." },
  ];
};

const getTimeline = (lang: string) => {
  if (lang === "zh") {
    return [
      { date: "2026年4月", label: "v3.3.7", desc: "LOGO 优化，全站品牌形象统一，稳定性提升" },
      { date: "2026年4月", label: "v3.3.5", desc: "UI 细节润色，安装程序优化，新增打开文件位置功能" },
      { date: "2026年3月", label: "v3.3.0", desc: "工作区引导，全文本搜索，标签页动画更新" },
      { date: "2026年2月", label: "v3.0.0", desc: "多标签页编辑，侧栏文件树，分类组功能发布" },
      { date: "2026年1月", label: "v2.0.0", desc: "夜间模式，Catppuccin 主题支持，自定义快捷键" },
    ];
  }
  return [
    { date: "Apr 2026", label: "v3.3.7", desc: "Logo optimization, unified branding, stability improvements" },
    { date: "Apr 2026", label: "v3.3.5", desc: "UI polish, installer fixes, open file location" },
    { date: "Mar 2026", label: "v3.3.0", desc: "Workspace onboarding, full-text search, tab animations" },
    { date: "Feb 2026", label: "v3.0.0", desc: "Multi-tab editor, sidebar file tree, category groups" },
    { date: "Jan 2026", label: "v2.0.0", desc: "Dark mode, Catppuccin theme, keyboard shortcuts" },
  ];
};

export default async function AboutPage({ params: { lang } }: { params: { lang: "en" | "zh" } }) {
  const dict = await getDictionary(lang);
  const values = getValues(lang);
  const timeline = getTimeline(lang);

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <Reveal className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-md shadow-accent/25">
              <span className="text-white font-bold text-lg font-mono">M</span>
            </div>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">{dict.about.title}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
            {dict.about.headline.split('.')[0]}
            <br />
            <span className="bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-transparent">
              {lang === 'zh' ? '重归本质。' : 'craft of writing.'}
            </span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {dict.about.subheadline}
          </p>
        </Reveal>

        {/* Philosophy */}
        <section className="mb-20">
          <Reveal>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8">
              {dict.about.valuesTitle}
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.08}>
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </RevealGroup>
        </section>

        {/* Quote */}
        <Reveal className="mb-20 text-center sm:text-left">
          <div className="border-l-4 border-accent/50 pl-8 py-2">
            <Feather className="text-accent/60 mb-4" size={28} strokeWidth={1.5} />
            <blockquote className="text-2xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
              &ldquo;{dict.about.quote}&rdquo;
            </blockquote>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-4">— {dict.about.manifesto}</p>
          </div>
        </Reveal>

        {/* Timeline */}
        <section className="mb-20">
          <Reveal>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8">
              {dict.about.timelineTitle}
            </h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-6">
              {timeline.map((event, i) => (
                <Reveal key={event.label} delay={i * 0.06}>
                  <div className="flex items-start gap-6">
                    <div className="text-right w-20 flex-shrink-0">
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">{event.date}</span>
                    </div>
                    <div className="relative flex-shrink-0 mt-0.5">
                      <div className="w-3 h-3 rounded-full border-2 border-accent bg-white dark:bg-zinc-950 relative z-10" />
                    </div>
                    <div className="flex-1 pb-2">
                      <span className="font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">{event.label}</span>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{event.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Open source */}
        <Reveal>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <Github size={22} className="text-zinc-700 dark:text-zinc-300" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">{dict.about.openSourceTitle}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{dict.about.openSourceDesc}</p>
              <a href="https://github.com/markaeditor/marka" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                <Github size={14} /> github.com/markaeditor/marka
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <p className="text-sm text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            {dict.about.footer} <Heart size={13} className="text-red-400 ml-1" strokeWidth={2} /> 
          </p>
        </Reveal>
      </div>
    </div>
  );
}
