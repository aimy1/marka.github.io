import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { getDictionary } from "@/lib/get-dictionary";
import { PlatformGrid } from "@/components/PlatformGrid";

export async function generateMetadata({ params: { lang } }: { params: { lang: "en" | "zh" } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: dict.download.title,
    description: dict.download.subtitle,
  };
}

const getPlatforms = (lang: string, dict: any) => [
  {
    iconName: "apple" as const,
    name: "macOS",
    subtitle: dict.download.os.macOS,
    filename: "Marka-Installer-macOS.dmg",
    size: "19.9 MB",
    href: "https://github.com/aimy1/Marka/releases/download/v3.3.7/Marka-Installer-macOS.dmg",
  },
  {
    iconName: "monitor" as const,
    name: "Windows",
    subtitle: dict.download.os.Windows,
    filename: "Marka-Installer-Windows-x64.exe",
    size: "11.4 MB",
    href: "https://github.com/aimy1/Marka/releases/download/v3.3.7/Marka-Installer-Windows-x64.exe",
  },
  {
    iconName: "terminal" as const,
    name: "Linux (Ubuntu/Debian)",
    subtitle: dict.download.os.Linux,
    filename: "Marka-Installer-Ubuntu.deb",
    size: "15.6 MB",
    href: "https://github.com/aimy1/Marka/releases/download/v3.3.7/Marka-Installer-Ubuntu.deb",
  },
];

const getChangelog = (lang: string) => {
  if (lang === "zh") {
    return [
      {
        version: "v3.3.7",
        date: "2026年4月",
        changes: ["优化全站 LOGO 使用", "统一所有引导区域的品牌视觉", "提升大型文件树渲染性能", "修复初始加载时的黑夜模式闪烁"],
        current: true,
      },
      {
        version: "v3.3.5",
        date: "2026年4月",
        changes: ["移除了行号栏，界面更清爽", "侧边栏增加“打开文件位置”功能", "改进“关于”对话框信息", "完善 Windows 安装脚本路径兼容性"],
        current: false,
      },
    ];
  }
  return [
    {
      version: "v3.3.7",
      date: "April 2026",
      changes: ["Optimized logo usage across the portal", "Unified branding in all call-to-action sections", "Performance improvements for large file tree rendering", "Fixed dark mode flickering on initial load"],
      current: true,
    },
    {
      version: "v3.3.5",
      date: "April 2026",
      changes: ["Removed line number gutter for a cleaner look", 'Added "Open File Location" in sidebar context menu', "Improved About dialog with project metadata", "Fixed Windows installer script path resolution"],
      current: false,
    },
  ];
};

export default async function DownloadPage({ params: { lang } }: { params: { lang: "en" | "zh" } }) {
  const dict = await getDictionary(lang);
  const platforms = getPlatforms(lang, dict);
  const changelog = getChangelog(lang);

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <Badge variant="accent" className="mb-4">{dict.download.badge}</Badge>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            {dict.download.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
            {dict.download.subtitle}
          </p>
        </Reveal>

        {/* Platform selection section */}
        <PlatformGrid platforms={platforms} lang={lang} />

        {/* Changelog */}
        <Reveal>
          <div id="changelog">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8">
              {dict.download.changelogTitle}
            </h2>
            <div className="space-y-6">
              {changelog.map((release) => (
                <div
                  key={release.version}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-50">
                      {release.version}
                    </span>
                    {release.current && <Badge variant="success">{lang === 'zh' ? '当前版本' : 'Current'}</Badge>}
                    <span className="ml-auto text-sm text-zinc-400 dark:text-zinc-500">
                      {release.date}
                    </span>
                  </div>
                  <ul className="p-6 space-y-2">
                    {release.changes.map((change) => (
                      <li key={change} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="mt-2 w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 flex-shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
