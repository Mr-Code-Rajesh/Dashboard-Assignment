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

  // Calculate menu position
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl p-4 shadow-lg 
        bg-white/30 dark:bg-gray-800/40 
        backdrop-blur-xl border border-white/20 
        dark:border-gray-600/30 transition-all 
        duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            <HighlightText text={widget.name} searchTerm={searchTerm} />
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            <HighlightText text={widget.text} searchTerm={searchTerm} />
          </p>
        </div>

        {/* 3-dot button */}
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white cursor-pointer"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Dropdown menu in Portal */}
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
                className="bg-white/80 dark:bg-gray-700/90 
                  backdrop-blur-md shadow-xl rounded-lg 
                  border border-gray-200 dark:border-gray-600 
                  w-36 z-[9999]"
              >
                <button
                  onClick={() => {
                    setConfirmRemove(true); // ✅ open confirm modal
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <X size={16} className="mr-2" /> Remove
                </button>

                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600"
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
