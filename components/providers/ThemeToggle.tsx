"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button onClick={() => toggleTheme()} className="m-1 p-2">
      {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}

export default ThemeToggle;
