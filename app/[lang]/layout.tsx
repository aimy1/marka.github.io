import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";
import { getDictionary } from "@/lib/get-dictionary";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: { lang: "en" | "zh" } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  
  return {
    title: {
      default: "Marka — Markdown Editor",
      template: "%s | Marka",
    },
    description: dict.hero.subheadline,
    keywords: ["markdown editor", "writing app", "markdown", "notes", "documentation"],
    authors: [{ name: "Marka" }],
    openGraph: {
      type: "website",
      locale: params.lang === "en" ? "en_US" : "zh_CN",
      url: "https://marka.app",
      siteName: "Marka",
      title: "Marka — Markdown Editor",
      description: dict.hero.subheadline,
    },
    icons: {
      icon: "/images/markd.logo.jpg",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "zh" };
}) {
  const lang = params.lang || "en";
  const dict = await getDictionary(lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Nav lang={lang} dict={dict.navigation} />
          <main className="flex-1 pt-14">{children}</main>
          <Footer lang={lang} dict={dict.navigation} />
        </ThemeProvider>
      </body>
    </html>
  );
}
