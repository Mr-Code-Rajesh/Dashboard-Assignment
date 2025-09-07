import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import useDashboardStore from "../store/dashboardStore";

export default function UpdateWidgetModal({ categoryId, widget, onClose }) {
  const updateWidget = useDashboardStore((state) => state.updateWidget);

  const [name, setName] = useState(widget.name);
  const [text, setText] = useState(widget.text);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError("⚠️ Both fields are required.");
      return;
    }
    updateWidget(categoryId, widget.id, { name, text });
    setError("");
    onClose();
  };

  // Close modal on Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Render into body with portal
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex justify-center items-center"
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white dark:bg-gray-900
            rounded-2xl w-96 p-6 shadow-2xl 
            border border-gray-300 dark:border-gray-600 
            space-y-4"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 
              dark:text-gray-300 hover:text-red-500 transition hover:rotate-180 duration-300 transform cursor-pointer"
          >
            <X size={20} />
          </button>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Update Widget
          </h3>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Widget name"
            className="w-full border border-gray-400 outline-none rounded-lg p-2 
              bg-gray-50 dark:bg-gray-700 
              text-gray-900 dark:text-white 
              focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Widget description"
            className="w-full border-gray-400 border rounded-lg p-2 
              bg-gray-50 dark:bg-gray-700 
              text-gray-900 dark:text-white 
              focus:ring-2 focus:ring-blue-400 outline-none"
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
              className="px-3 py-1 border border-gray-400 rounded-lg 
                hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-blue-400 dark:text-white/80 cursor-pointer hover:ring-2 hover:ring-blue-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 
                text-white rounded-lg shadow-md cursor-pointer"
            >
              Save
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
