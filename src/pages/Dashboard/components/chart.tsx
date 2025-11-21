import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardCharts() {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [30, 50, 40, 60, 75],
        backgroundColor: "rgba(79, 70, 229, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  const pieData = {
    labels: ["Mobile", "Web", "Desktop"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: [
          "rgba(79,70,229,0.8)",
          "rgba(16,185,129,0.8)",
          "rgba(239,68,68,0.8)",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      {/* BAR CHART */}
      <div className="bg-white p-5 rounded-lg shadow border h-[260px] ">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <div className="w-full h-[180px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* PIE CHART */}
      <div className="bg-white p-5 rounded-lg shadow border h-[260px]">
        <h2 className="text-lg font-semibold mb-4">Platform Users</h2>
        <div className="w-full h-[180px]">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}
