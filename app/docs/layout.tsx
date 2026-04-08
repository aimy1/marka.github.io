import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to use Marka — installation, editor features, workspace management, and more.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex gap-12">
        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
