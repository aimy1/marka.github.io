"use client";

import { Check, X, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type CellValue = "yes" | "no" | "partial";

interface RowData {
  feature: string;
  marka: CellValue;
  typora: CellValue;
  vscode: CellValue;
  notion: CellValue;
}

const rows: RowData[] = [
  { feature: "Real-time split preview", marka: "yes", typora: "partial", vscode: "partial", notion: "no" },
  { feature: "Synchronized scrolling", marka: "yes", typora: "no", vscode: "no", notion: "no" },
  { feature: "Zero-config, just works", marka: "yes", typora: "yes", vscode: "no", notion: "yes" },
  { feature: "Offline-first", marka: "yes", typora: "yes", vscode: "yes", notion: "no" },
  { feature: "Open source & free", marka: "yes", typora: "no", vscode: "yes", notion: "no" },
  { feature: "Multi-file workspace", marka: "yes", typora: "no", vscode: "yes", notion: "yes" },
  { feature: "Keyboard shortcut-first", marka: "yes", typora: "partial", vscode: "yes", notion: "no" },
  { feature: "Native app (not Electron*)", marka: "yes", typora: "no", vscode: "no", notion: "no" },
  { feature: "Custom themes", marka: "yes", typora: "partial", vscode: "yes", notion: "no" },
];

function Cell({ value, isHighlight }: { value: CellValue; isHighlight?: boolean }) {
  if (value === "yes")
    return (
      <span className={cn(
        "inline-flex items-center justify-center w-7 h-7 rounded-full",
        isHighlight ? "bg-accent text-white" : "text-emerald-600 dark:text-emerald-400"
      )}>
        <Check size={13} strokeWidth={2.5} />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 text-zinc-300 dark:text-zinc-700">
        <X size={13} strokeWidth={2} />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 text-zinc-400 dark:text-zinc-500">
      <Minus size={13} strokeWidth={2} />
    </span>
  );
}

const cols = [
  { key: "marka", label: "Marka", isHighlight: true },
  { key: "typora", label: "Typora", isHighlight: false },
  { key: "vscode", label: "VS Code", isHighlight: false },
  { key: "notion", label: "Notion", isHighlight: false },
];

export function Comparison() {
  return (
    <section className="py-28 px-4 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Comparison
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            How Marka compares
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-lg leading-relaxed">
            We&apos;re not for everyone — and that&apos;s fine.
            We&apos;re for people who care about the writing experience.
          </p>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400 dark:text-zinc-500 w-1/2">
                    Feature
                  </th>
                  {cols.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-4 text-sm font-semibold text-center",
                        col.isHighlight
                          ? "text-accent"
                          : "text-zinc-500 dark:text-zinc-400"
                      )}
                    >
                      {col.isHighlight && (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center mb-0.5">
                            <span className="text-white font-bold text-xs font-mono">M</span>
                          </div>
                          {col.label}
                        </div>
                      )}
                      {!col.isHighlight && col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-zinc-100 dark:border-zinc-800/50 last:border-0",
                      i % 2 === 0 ? "" : "bg-zinc-50/50 dark:bg-zinc-800/10"
                    )}
                  >
                    <td className="px-6 py-3.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {row.feature}
                    </td>
                    {cols.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-3.5 text-center",
                          col.isHighlight && "bg-accent/[0.03]"
                        )}
                      >
                        <div className="flex items-center justify-center">
                          <Cell
                            value={row[col.key as keyof RowData] as CellValue}
                            isHighlight={col.isHighlight}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600 mt-3 px-1">
            * Marka is built with Flutter, giving it a native feel. VS Code and Notion use Electron.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
