// layouts/layouts.tsx
import NavbarDashboard from "../components/navbar";
import Sidebar from "../components/sidebar";

interface LayoutsDashboardProps {
  children: React.ReactNode;
}

export default function LayoutsDashboard({ children }: LayoutsDashboardProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 min-h-screen sm:ml-64 transition-all duration-300">
        <NavbarDashboard />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
