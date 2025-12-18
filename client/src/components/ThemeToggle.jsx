
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
    //   className="p-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
    className="p-2 rounded-full transition-colors duration-300 focus:outline-none"

    //   className="fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300 focus:outline-none"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-800" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900 dark:text-blue-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
