import DashboardChart from "./components/chart";
import NavbarDashboard from "./components/navbar";
import Sidebar from "./components/sidebar";

export default function DashboardHome() {
  return (
    <div className="flex">
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 flex-1">
        <NavbarDashboard/>

        <main className="p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-3 text-gray-600">Selamat datang di dashboard!</p>
          <DashboardChart />
        </main>
      </div>
    </div>
  );
}
