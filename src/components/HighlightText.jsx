import { motion } from "framer-motion";

function HighlightText({ text, searchTerm }) {
  if (!searchTerm) return <>{text}</>;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <motion.mark
        key={i}
        initial={{ backgroundSize: "200% 200%", opacity: 0 }}
        animate={{ backgroundSize: "100% 100%", opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded px-1 text-black dark:text-white 
          bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 
          dark:from-yellow-400 dark:via-orange-500 dark:to-pink-500 
          shadow-sm"
      >
        {part}
      </motion.mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default HighlightText;
