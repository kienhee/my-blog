import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-14">
      <div className="min-h-[calc(100vh-3.5rem)] px-4 sm:px-6 md:px-10 lg:px-12 py-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
