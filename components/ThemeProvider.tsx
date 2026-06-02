"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
});

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
}

function setThemeCookie(theme: Theme) {
  try {
    document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch {}
}

function getThemeCookie(): Theme | null {
  try {
    const m = document.cookie.match(/(?:^|;\s*)theme=(dark|light)(?:;|$)/);
    return (m?.[1] as Theme | undefined) ?? null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  // useLayoutEffect runs synchronously before paint — eliminates flash
  useLayoutEffect(() => {
    let stored: Theme = "dark";
    try {
      const val = localStorage.getItem("theme");
      if (val === "light" || val === "dark") stored = val;
      else {
        const cookieTheme = getThemeCookie();
        if (cookieTheme) stored = cookieTheme;
      }
    } catch {}
    setThemeState(stored);
    applyTheme(stored);
    setThemeCookie(stored);
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    applyTheme(t);
    setThemeCookie(t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
