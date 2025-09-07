import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function ConfirmRemoveModal({ onConfirm, onCancel }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-80 shadow-xl border border-gray-300 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Confirm Removal
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to remove this widget? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow cursor-pointer"
            >
              Remove
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
