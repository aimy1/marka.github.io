import { DocsSidebar } from "@/components/DocsSidebar";
import { getDictionary } from "@/lib/get-dictionary";
import { getDocsData } from "@/lib/docs";
import type { Metadata } from "next";

export async function generateMetadata({ params: { lang } }: { params: { lang: "en" | "zh" } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: dict.navigation.docs,
    description: "Learn how to use Marka — installation, editor features, and more.",
  };
}

export default async function DocsLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: "en" | "zh" };
}) {
  const dict = await getDictionary(lang);
  const docsData = getDocsData(lang);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex gap-12">
        {/* Sidebar — hidden on mobile */}
        <div className="hidden lg:block">
          <DocsSidebar lang={lang} docsData={docsData} dict={dict.docs} />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
