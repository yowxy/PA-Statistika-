import { useEffect, useState } from "react";
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
import { getDataKemiskinan } from "../../../service/API";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

interface DataAPI {
  id: number;
  id_kategori: number;
  kabupaten_kota_se_jawa_timur: string;
  nama_variabel: string;
  tahun: number;
  jumlah: number;
}

export default function DashboardCharts() {
  const [dataApi, setDataApi] = useState<DataAPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataKemiskinan();
        setDataApi(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Group data by year for bar chart
  const groupByYear = () => {
    const yearMap: Record<number, number> = {};
    dataApi.forEach((item) => {
      if (!yearMap[item.tahun]) yearMap[item.tahun] = 0;
      yearMap[item.tahun] += item.jumlah;
    });
    return {
      labels: Object.keys(yearMap).sort(),
      values: Object.keys(yearMap).sort().map((key) => yearMap[Number(key)]),
    };
  };

  // Group data by region for pie chart (top 5 regions)
  const groupByTopRegions = () => {
    const regionMap: Record<string, number> = {};
    dataApi.forEach((item) => {
      if (!regionMap[item.kabupaten_kota_se_jawa_timur])
        regionMap[item.kabupaten_kota_se_jawa_timur] = 0;
      regionMap[item.kabupaten_kota_se_jawa_timur] += item.jumlah;
    });

    // Sort and get top 5
    const sorted = Object.entries(regionMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      labels: sorted.map(([name]) => name),
      values: sorted.map(([, value]) => value),
    };
  };

  const tahunData = groupByYear();
  const regionData = groupByTopRegions();

  const barData = {
    labels: tahunData.labels,
    datasets: [
      {
        label: "Jumlah (orang)",
        data: tahunData.values,
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
        padding: 10,
        titleFont: { size: 12, weight: "bold" },
        bodyFont: { size: 11 },
        cornerRadius: 8,
        displayColors: false,
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
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const pieData = {
    labels: regionData.labels,
    datasets: [
      {
        label: "Jumlah (orang)",
        data: regionData.values,
        backgroundColor: [
          "#D1F447",
          "rgba(209, 244, 71, 0.8)",
          "rgba(209, 244, 71, 0.6)",
          "rgba(209, 244, 71, 0.4)",
          "rgba(209, 244, 71, 0.3)",
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
          padding: 10,
          font: {
            size: 10,
          },
          color: "#374151",
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 10,
        titleFont: { size: 12, weight: "bold" },
        bodyFont: { size: 11 },
        cornerRadius: 8,
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-5">
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 h-[280px] sm:h-[300px] md:h-[320px] lg:h-[350px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#D1F447] border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600">Memuat data...</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 h-[280px] sm:h-[300px] md:h-[320px] lg:h-[350px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#D1F447] border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-5">
      {/* BAR CHART - Trend per Tahun */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 h-[280px] sm:h-[300px] md:h-[320px] lg:h-[350px]">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 text-gray-900">Tren Kemiskinan per Tahun</h2>
        <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* PIE CHART - Top 5 Kabupaten/Kota */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 h-[280px] sm:h-[300px] md:h-[320px] lg:h-[350px]">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 text-gray-900">Top 5 Kabupaten/Kota</h2>
        <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px]">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}
