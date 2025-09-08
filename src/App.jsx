import Dashboard from "./components/Dashboard";
import { Navbar } from "./components/Navbar";


export default function App() {
  return (
    <div className="min-h-screen bg-white/10 dark:bg-gray-900">
      <Navbar />
      <Dashboard />
    </div>
  );
}



