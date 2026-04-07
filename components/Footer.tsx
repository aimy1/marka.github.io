import Link from "next/link";

import Image from "next/image";

interface FooterProps {
  lang: "en" | "zh";
  dict: {
    home: string;
    docs: string;
    download: string;
    about: string;
  };
}

export function Footer({ lang, dict }: FooterProps) {
  // We'll keep labels simple for now or you can expand dictionaries later
  const prefix = `/${lang}`;
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 w-fit group">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden shadow-sm shadow-accent/10 group-hover:shadow-accent/30 transition-shadow duration-200">
                <Image
                  src="/images/markd.logo.jpg"
                  alt="Marka Logo"
                  width={28}
                  height={28}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-[15px]">
                Marka
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
              A Markdown editor that respects your focus.
            </p>
          </div>

          <div>
             <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Product
              </h4>
              <ul className="space-y-2">
                <li><Link href={`${prefix}`} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{dict.home}</Link></li>
                <li><Link href={`${prefix}/download`} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{dict.download}</Link></li>
              </ul>
          </div>
          <div>
             <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Resources
              </h4>
              <ul className="space-y-2">
                <li><Link href={`${prefix}/docs`} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{dict.docs}</Link></li>
              </ul>
          </div>
          <div>
             <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Company
              </h4>
              <ul className="space-y-2">
                <li><Link href={`${prefix}/about`} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{dict.about}</Link></li>
                <li><a href="https://github.com/aimy1/Marka" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">GitHub</a></li>
              </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} Marka. MIT License.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Built with Next.js · Designed with care
          </p>
        </div>
      </div>
    </footer>
  );
}
