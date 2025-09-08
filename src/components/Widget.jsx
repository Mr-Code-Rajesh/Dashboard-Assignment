import { useState, useRef } from "react";
import { MoreHorizontal, X, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import useDashboardStore from "../store/dashboardStore";
import HighlightText from "./HighlightText";
import UpdateWidgetModal from "./UpdateWidgetModal";
import ConfirmRemoveModal from "./ConfirmRemoveModal";
import useClickOutside from "../hooks/useClickOutside";

export default function Widget({ categoryId, widget }) {
  // Store actions
  const removeWidget = useDashboardStore((state) => state.removeWidget);
  const searchTerm = useDashboardStore((state) => state.searchTerm);

  // Local state
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  // Refs
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setMenuOpen(false));

  // Dropdown positioning
  const getMenuPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 8,
      left: rect.right + window.scrollX - 150,
    };
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl p-4 sm:p-5 shadow-lg 
        bg-white/40 dark:bg-gray-800/40 
        backdrop-blur-xl border border-white/20 dark:border-gray-600/30
        transition-all duration-300 
        hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]
        flex flex-col gap-2"
    >
      {/* Widget Header */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg truncate">
            <HighlightText text={widget.name} searchTerm={searchTerm} />
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-3">
            <HighlightText text={widget.text} searchTerm={searchTerm} />
          </p>
        </div>

        {/* 3-dot button */}
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 sm:p-2 rounded-full 
            text-gray-500 dark:text-gray-300 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            active:scale-95 transition cursor-pointer"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Dropdown menu via Portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                style={{ position: "absolute", ...getMenuPosition() }}
                className="bg-white dark:bg-gray-800 
                  shadow-xl rounded-lg 
                  border border-gray-200 dark:border-gray-600 
                  w-40 z-[9999] overflow-hidden"
              >
                <button
                  onClick={() => {
                    setConfirmRemove(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 
                    text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700
                    text-sm sm:text-base transition"
                >
                  <X size={16} className="mr-2" /> Remove
                </button>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 
                    text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700
                    text-sm sm:text-base transition"
                >
                  <Edit size={16} className="mr-2" /> Update
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Update Modal */}
      {isEditing && (
        <UpdateWidgetModal
          categoryId={categoryId}
          widget={widget}
          onClose={() => setIsEditing(false)}
        />
      )}

      {/* Confirm Remove Modal */}
      {confirmRemove && (
        <ConfirmRemoveModal
          onConfirm={() => {
            removeWidget(categoryId, widget.id);
            setConfirmRemove(false);
          }}
          onCancel={() => setConfirmRemove(false)}
        />
      )}
    </motion.div>
  );
}
