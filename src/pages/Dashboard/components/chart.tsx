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
        backgroundColor: "#D1F447",
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6B7280",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
    },
  };

  const pieData = {
    labels: ["Mobile", "Web", "Desktop"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: [
          "#D1F447",
          "rgba(209, 244, 71, 0.7)",
          "rgba(209, 244, 71, 0.5)",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "bottom",
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
          color: "#374151",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-[300px] sm:h-[320px]">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Sales Overview</h2>
        <div className="w-full h-[220px] sm:h-[240px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* PIE CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-[300px] sm:h-[320px]">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Platform Users</h2>
        <div className="w-full h-[220px] sm:h-[240px]">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}
