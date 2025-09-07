import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import useDashboardStore from "../store/dashboardStore";

export default function AddWidgetModal({ categoryId, onClose }) {
  // Zustand store action
  const addWidget = useDashboardStore((state) => state.addWidget);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError("⚠️ Both fields are required.");
      return;
    }
    addWidget(categoryId, { id: Date.now().toString(), name, text });
    setError("");
    onClose();
  };

  // close modal on Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50"
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white/30 dark:bg-gray-800/40 
            backdrop-blur-xl rounded-2xl w-96 p-6 shadow-2xl 
            border border-white/20 dark:border-gray-600/30 
            space-y-4"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 transition transform hover:text-red-500 hover:rotate-180 cursor-pointer"
          >
            <X size={20} />
          </button>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Widget
          </h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Widget name"
            className="w-full border rounded-lg p-2 
              bg-white/70 dark:bg-gray-700/70 
              text-gray-900 dark:text-white 
              focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Widget text"
            className="w-full border rounded-lg p-2 
              bg-white/70 dark:bg-gray-700/70 
              text-gray-900 dark:text-white 
              focus:ring-2 focus:ring-blue-400"
          />

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded-lg 
                hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 
                text-white rounded-lg shadow-md cursor-pointer"
            >
              Add
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}
