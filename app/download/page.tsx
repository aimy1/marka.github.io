import type { Metadata } from "next";
import { Download, Apple, Monitor, Terminal, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealGroup } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Marka for macOS, Windows, or Linux. Free and open source.",
};

const platforms = [
  {
    icon: Apple,
    name: "macOS",
    subtitle: "macOS 12 or later",
    filename: "Marka-3.3.7.dmg",
    size: "48 MB",
    href: "https://github.com/markaeditor/marka/releases/download/v3.3.7/Marka-3.3.7.dmg",
    primary: true,
  },
  {
    icon: Monitor,
    name: "Windows",
    subtitle: "Windows 10/11 (64-bit)",
    filename: "Marka-3.3.7-Setup.exe",
    size: "52 MB",
    href: "https://github.com/markaeditor/marka/releases/download/v3.3.7/Marka-3.3.7-Setup.exe",
    primary: false,
  },
  {
    icon: Terminal,
    name: "Linux",
    subtitle: "Ubuntu 20.04+ / Debian",
    filename: "Marka-3.3.7.AppImage",
    size: "61 MB",
    href: "https://github.com/markaeditor/marka/releases/download/v3.3.7/Marka-3.3.7.AppImage",
    primary: false,
  },
];

const changelog = [
  {
    version: "v3.3.7",
    date: "April 2026",
    changes: [
      "Optimized logo usage across the portal",
      "Unified branding in all call-to-action sections",
      "Performance improvements for large file tree rendering",
      "Fixed dark mode flickering on initial load",
    ],
    current: true,
  },
  {
    version: "v3.3.5",
    date: "April 2026",
    changes: [
      "Removed line number gutter for a cleaner look",
      'Added "Open File Location" in sidebar context menu',
      "Improved About dialog with project metadata",
      "Fixed Windows installer script path resolution",
      "Polished Catppuccin syntax highlight palette",
    ],
    current: false,
  },
  {
    version: "v3.3.4",
    date: "March 2026",
    changes: [
      "New workspace onboarding with auto-created welcome file",
      "Full-text workspace search",
      "Tab close animation",
      "Fixed scroll sync on large documents",
    ],
    current: false,
  },
  {
    version: "v3.3.3",
    date: "March 2026",
    changes: [
      "Logo hover animation",
      "Sliding tab transition",
      "Search overlay entrance animation",
      "General performance improvements",
    ],
    current: false,
  },
];

export default function DownloadPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <Badge variant="accent" className="mb-4">v3.3.7 — Latest Release</Badge>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Download Marka
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
            Free and open source. Available for all major operating systems.
            No account, no telemetry.
          </p>
        </Reveal>

        {/* Platform cards */}
        <RevealGroup
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20"
          stagger={0.08}
        >
          {platforms.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-7 flex flex-col gap-4 ${
                p.primary
                  ? "border-accent/30 bg-accent/[0.03] dark:bg-accent/[0.05]"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${p.primary ? "bg-accent/10 text-accent" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                  <p.icon size={20} strokeWidth={1.7} />
                </div>
                {p.primary && <Badge variant="accent">Recommended</Badge>}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{p.name}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{p.subtitle}</p>
              </div>
              <div className="mt-auto">
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono mb-3">
                  {p.filename} · {p.size}
                </p>
                <a
                  href={p.href}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    p.primary
                      ? "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20"
                      : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
            </div>
          ))}
        </RevealGroup>

        {/* Changelog */}
        <Reveal>
          <div id="changelog">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8">
              Changelog
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
                    {release.current && <Badge variant="success">Current</Badge>}
                    <span className="ml-auto text-sm text-zinc-400 dark:text-zinc-500">
                      {release.date}
                    </span>
                  </div>
                  <ul className="p-6 space-y-2">
                    {release.changes.map((change) => (
                      <li
                        key={change}
                        className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400"
                      >
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
