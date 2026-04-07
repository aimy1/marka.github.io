import { Hero } from "@/sections/Hero";
import { Features } from "@/sections/Features";
import { EditorShowcase } from "@/sections/EditorShowcase";
import { UseCases } from "@/sections/UseCases";
import { CtaSection } from "@/sections/CtaSection";
import { getDictionary } from "@/lib/get-dictionary";

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict.hero} />
      <Features dict={dict.features} />
      <EditorShowcase dict={dict.editorShowcase} />
      <UseCases dict={dict.useCases} />
      <CtaSection lang={lang} dict={dict.ctaSection} />
    </>
  );
}
