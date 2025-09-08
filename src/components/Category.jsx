import Widget from "./Widget";
import { motion } from "framer-motion";

export default function Category({ category, onAddClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 p-4 rounded-2xl 
        bg-white/30 dark:bg-gray-800/40 
        backdrop-blur-xl shadow-md
        border border-white/20 dark:border-gray-600/30"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {category.name}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59,130,246,0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddClick(category.id)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 
            text-white rounded-xl font-medium shadow-md
            transition-all"
        >
          + Add Widget
        </motion.button>
      </div>

      {/* Widgets */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {category.widgets.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Widget categoryId={category.id} widget={w} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
