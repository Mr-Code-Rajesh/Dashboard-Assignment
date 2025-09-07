import { useState } from "react";
import { motion } from "framer-motion";
import useDashboardStore from "../store/dashboardStore";
import Category from "./Category";
import AddWidgetModal from "./AddWidgetModal";

export default function Dashboard() {
  // Zustand store selectors
  const categories = useDashboardStore((state) => state.categories);
  const searchTerm = useDashboardStore((state) => state.searchTerm);
  const [modalCat, setModalCat] = useState(null);

  // filter logic here
  const filteredCategories = categories.map((cat) => ({
    ...cat,
    widgets: cat.widgets.filter(
      (w) =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.text.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div
      className="min-h-screen relative overflow-hidden 
      bg-gradient-to-br from-gray-100 via-white to-gray-200 
      dark:from-gray-900 dark:via-gray-950 dark:to-black"
    >
      {/* Animated background gradient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-8 space-y-8 relative z-5"
      >
        {filteredCategories.map((cat) => (
          <Category
            key={cat.id}
            category={cat}
            onAddClick={(id) => setModalCat(id)}
          />
        ))}
      </motion.div>

      {/* Modal */}
      {modalCat && (
        <AddWidgetModal categoryId={modalCat} onClose={() => setModalCat(null)} />
      )}
    </div>
  );
}
