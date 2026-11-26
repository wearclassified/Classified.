"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const key = "classified.theme";
      const storedTheme = localStorage.getItem(key);
      const root = document.documentElement;

      if (storedTheme === "dark") {
        root.classList.add("dark");
      } else if (storedTheme === "light") {
        root.classList.remove("dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } catch (error) {
      // ignore if localStorage is not available
    }
  }, []);

  return null;
}
