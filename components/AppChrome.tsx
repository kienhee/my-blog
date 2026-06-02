"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundGrid } from "@/components/BackgroundGrid";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCmsRoute = pathname.startsWith("/dashboard");

  if (isCmsRoute) {
    return <main className="min-h-screen cursor-auto">{children}</main>;
  }

  return (
    <>
      <CustomCursor />
      <BackgroundGrid />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
