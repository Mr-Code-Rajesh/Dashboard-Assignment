import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header
      className="sticky top-0 z-20 
        bg-white/70 dark:bg-gray-900/70 
        backdrop-blur-md shadow-sm h-16 
        border-b border-gray-200 dark:border-gray-700"
    >
      <nav className="flex items-center justify-between px-4 sm:px-6 h-full">
        {/* Left: Logo / Title */}
        <div className="flex-shrink-0">
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-wide 
            text-gray-900 dark:text-white">
            CNAPP Dashboard
          </h2>
        </div>

        {/* Center: SearchBar */}
        <div className="flex-grow flex justify-center">
          <div className="w-40 sm:w-64 md:w-80">
            <SearchBar />
          </div>
        </div>

        {/* Right: Theme Toggle */}
        <div className="flex-shrink-0">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 12px rgba(255, 223, 70, 0.6)",
            }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full 
              bg-gray-200 hover:bg-gray-300 
              dark:bg-gray-700 dark:hover:bg-gray-600 
              transition focus:outline-none"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.div
                  key="light"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdDarkMode className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="dark"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <CiLight className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>
    </header>
  );
};
