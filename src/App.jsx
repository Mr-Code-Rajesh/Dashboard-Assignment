import Dashboard from "./components/Dashboard";
import { Navbar } from "./components/Navbar";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <Dashboard />
    </div>
  );
}



