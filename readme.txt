🔑 Mapping UI to Components

Header.jsx
→ Contains search bar, add widget button, date filter dropdown.

Sidebar.jsx
→ Left sticky section listing categories (CSPM, CWPP, Registry Scan, etc.).

Dashboard.jsx
→ Main container that loops through categories from initialData.json.

Category.jsx
→ Renders a category title + its widgets + "Add Widget" placeholder card.

WidgetCard.jsx
→ Displays widget title + content + ❌ remove button.

AddWidgetModal.jsx
→ Popup form to choose category + widget name + widget text → confirm → update store.

WidgetGrid.jsx
→ Layout wrapper for multiple widgets inside a category (responsive grid).

⚡ Step-by-step explanation to recruiter

JSON-driven architecture → All categories and widgets are stored in initialData.json. This makes the dashboard extendable without hardcoding.

State management → Used Zustand store (useDashboardStore.js) for clean and simple add/remove/search logic.

Category rendering → Dashboard.jsx maps over JSON categories, passes data to Category.jsx, which then maps widgets into WidgetCard.jsx.

Widget operations → Each card has remove button; modal form adds new widgets dynamically into the selected category.

Search feature → Implemented at store level so it filters across all categories.

Reusable UI → SearchBar and Button components show modular design, easy to extend.

UI/UX → Tailwind used for responsiveness + Framer Motion animations for widget add/remove.