import DashboardChart from "./components/chart";
import NavbarDashboard from "./components/navbar";
import Sidebar from "./components/sidebar";

export default function DashboardHome() {
  return (
    <div className="flex min-h-screen bg-(--color-body-bg) transition-colors duration-200">
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 min-h-screen sm:ml-56 md:ml-64 transition-all duration-300 text-(--color-text)">
        <NavbarDashboard/>

        <main className="p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-(--color-text)">Dashboard</h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">Selamat datang di dashboard!</p>
          </div>
          <DashboardChart />
        </main>
      </div>
    </div>
  );
}
