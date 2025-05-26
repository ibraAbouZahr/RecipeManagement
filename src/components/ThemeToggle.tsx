import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") == "dark"
  );
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }, []);
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", theme);
  }, [darkMode]);
  return (
    <button onClick={() => setDarkMode(!darkMode)} className="cursor-pointer ">
      {darkMode ? (
        <MdLightMode className="text-[24px] text-nav hover:text-bg" />
      ) : (
        <MdDarkMode className="text-[24px] text-nav  hover:text-bg" />
      )}
    </button>
  );
};
export default ThemeToggle;
