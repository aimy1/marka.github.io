import { notFound, redirect } from "next/navigation";
import { getDocBySlug, getFirstDoc, getDocsData } from "@/lib/docs";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";

interface Props {
  params: Promise<{ lang: "en" | "zh"; slug?: string[] }>;
}

export async function generateStaticParams() {
  const { getAllDocItems } = await import("@/lib/docs");
  const enDocs = getAllDocItems("en").map((item) => ({
    lang: "en",
    slug: [item.slug],
  }));
  const zhDocs = getAllDocItems("zh").map((item) => ({
    lang: "zh",
    slug: [item.slug],
  }));
  
  // Also include the root /docs paths for each language
  return [...enDocs, ...zhDocs, { lang: "en", slug: [] }, { lang: "zh", slug: [] }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const slugStr = slug?.[0] ?? "";
  const doc = slugStr ? getDocBySlug(slugStr, lang) : getFirstDoc(lang);
  if (!doc) return { title: "Not Found" };
  return {
    title: doc.title,
    description: doc.content.slice(0, 150).replace(/[#*`]/g, ""),
  };
}

function renderMarkdownToHtml(content: string): string {
  let html = content;

  // headings
  html = html.replace(/^#### (.+)$/gm, '<h4 id="$1" class="text-base font-semibold text-zinc-800 dark:text-zinc-200 mt-5 mb-1.5 scroll-mt-20">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 id="$1" class="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-7 mb-2 scroll-mt-20">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 id="$1" class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-10 mb-3 pb-2 border-b border-zinc-200 dark:border-zinc-800 scroll-mt-20">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">$1</h1>');

  // code blocks
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="bg-zinc-950 border border-zinc-800 rounded-xl p-5 overflow-x-auto my-5"><code class="text-sm font-mono text-zinc-100 leading-relaxed">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
  );

  // inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-zinc-100 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded text-[0.85em] font-mono">$1</code>'
  );

  // bold / italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">$1</a>'
  );

  // blockquote
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-accent/40 pl-4 italic text-zinc-500 dark:text-zinc-400 my-4">$1</blockquote>'
  );

  // tables
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split("|").filter((c) => c.trim());
    return `<tr>${cells.map((c) => `<td class="px-4 py-2.5 text-sm border-b border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">${c.trim()}</td>`).join("")}</tr>`;
  });
  html = html.replace(/^(\|[-:]+[-| :]*\|)$/gm, "");
  html = html.replace(
    /(<tr>[\s\S]*?<\/tr>\n?)+/g,
    (match) => {
      const rows = match.match(/<tr>[\s\S]*?<\/tr>/g) || [];
      const firstRow = rows[0];
      if (!firstRow) return match;
      const header = firstRow.replace(/<td/g, '<th class="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-left"').replace(/<\/td>/g, "</th>");
      const body = rows.slice(1).join("\n");
      return `<div class="overflow-x-auto my-6 rounded-xl border border-zinc-200 dark:border-zinc-800"><table class="w-full border-collapse"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
    }
  );

  // horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-zinc-200 dark:border-zinc-800 my-8">');

  // paragraphs
  html = html.replace(
    /^(?!<[a-z])(.+)$/gm,
    '<p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">$1</p>'
  );

  return html;
}

export default async function DocsPage({ params }: Props) {
  const { lang, slug } = await params;
  const slugStr = slug?.[0];

  // Redirect /docs → /docs/introduction
  if (!slugStr) {
    redirect(`/${lang}/docs/introduction`);
  }

  const doc = getDocBySlug(slugStr, lang);
  if (!doc) notFound();

  const dict = await getDictionary(lang);
  const docsData = getDocsData(lang);

  // Find prev/next
  const allItems = docsData.flatMap((s) => s.items);
  const currentIdx = allItems.findIndex((i) => i.slug === slugStr);
  const prev = currentIdx > 0 ? allItems[currentIdx - 1] : null;
  const next = currentIdx < allItems.length - 1 ? allItems[currentIdx + 1] : null;

  return (
    <article className="max-w-none">
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(doc.content) }}
      />

      {/* Prev / Next */}
      <div className="mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-3 justify-between">
        {prev ? (
          <Link
            href={`/${lang}/docs/${prev.slug}`}
            className="group flex flex-col gap-1 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all flex-1"
          >
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{dict.docs.previous}</span>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center gap-1.5">
              <ArrowRight size={13} className="rotate-180" />
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next && (
          <Link
            href={`/${lang}/docs/${next.slug}`}
            className="group flex flex-col gap-1 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all flex-1 text-right items-end"
          >
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{dict.docs.next}</span>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center gap-1.5">
              {next.title}
              <ArrowRight size={13} />
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
