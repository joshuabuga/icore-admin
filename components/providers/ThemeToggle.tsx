"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — theme is unknown on the server
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="m-1 p-2 size-10" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="m-1 p-2"
    >
      {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}

export default ThemeToggle;
