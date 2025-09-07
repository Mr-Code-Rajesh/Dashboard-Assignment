import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDashboardStore from "../store/dashboardStore";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  // Zustand store state and actions
  const categories = useDashboardStore((state) => state.categories);
  const setSearchTerm = useDashboardStore((state) => state.setSearchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

  // Flatten all widgets across categories
  const allWidgets = categories.flatMap((cat) =>
    cat.widgets.map((w) => ({ ...w, category: cat.name }))
  );

  // Filter suggestions
  const suggestions =
    query.trim().length > 0
      ? allWidgets.filter(
          (w) =>
            w.name.toLowerCase().includes(query.toLowerCase()) ||
            w.text.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleSelect = (widgetName) => {
    setQuery(widgetName);
    setSearchTerm(widgetName);
  };

  return (
    <motion.div
      animate={{ width: isFocused ? 320 : 260 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative flex items-center"
    >
      {/* Input */}
      <label
        htmlFor="search"
        className="flex items-center justify-between w-full
          bg-white/40 dark:bg-gray-800/40 
          backdrop-blur-md border border-white/30 dark:border-gray-600/30
          rounded-xl px-3 py-2 shadow-sm
          focus-within:ring-2 focus-within:ring-blue-400
          transition-all duration-300"
      >
        <input
          id="search"
          type="text"
          value={query}
          placeholder="Search widgets..."
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchTerm(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay so click works
          className="flex-1 bg-transparent outline-none
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400
            text-sm"
        />
        <span>
          <CiSearch className="text-lg ml-2 text-gray-600 dark:text-gray-300" />
        </span>
      </label>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 w-full 
              bg-white/80 dark:bg-gray-800/90 
              backdrop-blur-md rounded-xl shadow-xl 
              border border-gray-200 dark:border-gray-700 
              max-h-48 overflow-y-auto z-50"
          >
            {suggestions.map((s) => (
              <li
                key={s.id}
                onMouseDown={() => handleSelect(s.name)}
                className="px-3 py-2 cursor-pointer 
                  hover:bg-blue-100 dark:hover:bg-gray-700 
                  text-gray-800 dark:text-white text-sm"
              >
                <span className="font-medium">{s.name}</span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  ({s.category})
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
