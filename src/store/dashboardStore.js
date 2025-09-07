import { create } from "zustand";
import { persist } from "zustand/middleware";
import dashboardData from "../data/dashboard.json";

const useDashboardStore = create(
  persist(
    (set) => ({
      categories: dashboardData.categories,
      searchTerm: "",

      setSearchTerm: (term) => set({ searchTerm: term }),

      addWidget: (categoryId, widget) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, widgets: [...cat.widgets, widget] }
              : cat
          ),
        })),

      removeWidget: (categoryId, widgetId) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  widgets: cat.widgets.filter((w) => w.id !== widgetId),
                }
              : cat
          ),
        })),

      updateWidget: (categoryId, widgetId, updatedData) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  widgets: cat.widgets.map((w) =>
                    w.id === widgetId ? { ...w, ...updatedData } : w
                  ),
                }
              : cat
          ),
        })),
    }),
    { name: "dashboard-storage" }
  )
);

export default useDashboardStore;
