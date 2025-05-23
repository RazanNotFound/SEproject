import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // If you have heroicons installed

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // On mount, check localStorage for theme preference
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setIsDark(true);
    if (theme === "light") setIsDark(false);
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className=" z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-gray-800/90 text-white dark:bg-gray-200/90 dark:text-gray-900 transition-all duration-200 border border-gray-300 dark:border-gray-700 hover:scale-105"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <SunIcon className="w-5 h-5 text-yellow-400" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="w-5 h-5 text-blue-400" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
}

export default DarkModeToggle;