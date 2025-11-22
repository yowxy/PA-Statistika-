// layouts/layouts.tsx
import NavbarDashboard from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function LayoutsDashboard({ children }) {
  return (
    <div className="flex">
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 flex-1 min-h-screen">
        <NavbarDashboard />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
