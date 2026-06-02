import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppChrome } from "@/components/AppChrome";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kienhee.com"),
  title: {
    default: "Kienhee — Tech Blogger",
    template: "%s — Kienhee",
  },
  description:
    "Writing about software engineering, developer tools, and building things on the web. By Kienhee.",
  keywords: ["tech blog", "software engineering", "web development", "Next.js", "TypeScript"],
  authors: [{ name: "Kienhee", url: "https://kienhee.com" }],
  creator: "Kienhee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kienhee.com",
    siteName: "Kienhee",
    title: "Kienhee — Tech Blogger",
    description:
      "Writing about software engineering, developer tools, and building things on the web.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kienhee",
    title: "Kienhee — Tech Blogger",
    description:
      "Writing about software engineering, developer tools, and building things on the web.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const initialTheme = cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : "dark";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${inter.variable} ${initialTheme}`}
    >
      <head />
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}