import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // "dark" hardcoded = default. ThemeProvider sẽ apply class đúng sau hydration.
    // suppressHydrationWarning để React bỏ qua diff class dark/light giữa server/client.
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${spaceGrotesk.variable} dark`}
    >
      <head>
        {/* Blocking script: reads localStorage before first paint — eliminates FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
