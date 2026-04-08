import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const { getAllDocItems } = await import("@/lib/docs");
  const enDocs = getAllDocItems("en").map((item) => ({ slug: [item.slug] }));
  // include the root /docs path
  return [...enDocs, { slug: [] }];
}

export default function LegacyDocsPage() {
  redirect("/en/docs/introduction");
}
