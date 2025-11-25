import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Database, Calendar, MapPin } from "lucide-react";
import LayoutsDashboard from "../layouts/layouts";
import { getDataKemiskinan } from "../../../service/API";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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

export default function DataKemiskinan() {
  const [jenisData, setJenisData] = useState("persentase");
  const [selectedYear, setSelectedYear] = useState<string>("all");
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

  // Filter data by selected year
  const filteredData = selectedYear === "all" 
    ? dataApi 
    : dataApi.filter((item) => item.tahun.toString() === selectedYear);

  // Get unique years for dropdown
  const availableYears = Array.from(new Set(dataApi.map((item) => item.tahun)))
    .sort((a, b) => b - a); // Sort descending (newest first)

  // Group data by year
  const groupByYear = () => {
    const yearMap: Record<number, number> = {};
    filteredData.forEach((item) => {
      if (!yearMap[item.tahun]) yearMap[item.tahun] = 0;
      yearMap[item.tahun] += item.jumlah;
    });
    return {
      labels: Object.keys(yearMap).sort(),
      values: Object.keys(yearMap).sort().map((key) => yearMap[Number(key)]),
    };
  };

  // Group data by region
  const groupByWilayah = () => {
    const map: Record<string, number> = {};
    filteredData.forEach((item) => {
      if (!map[item.kabupaten_kota_se_jawa_timur])
        map[item.kabupaten_kota_se_jawa_timur] = 0;
      map[item.kabupaten_kota_se_jawa_timur] += item.jumlah;
    });
    return {
      labels: Object.keys(map),
      values: Object.values(map),
    };
  };

  const tahunData = groupByYear();
  const wilayahData = groupByWilayah();

  // Chart data
  const chartData = jenisData === "persentase" 
    ? {
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
      }
    : {
        labels: wilayahData.labels,
        datasets: [
          {
            label: "Jumlah (orang)",
            data: wilayahData.values,
            backgroundColor: "#D1F447",
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14, weight: "bold" as const },
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
    animation: {
      duration: 1200,
      easing: "easeOutQuart" as const,
    },
  };

  if (loading) {
    return (
      <LayoutsDashboard>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#D1F447] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      </LayoutsDashboard>
    );
  }

  return (
    <LayoutsDashboard>
      <div className="space-y-4 sm:space-y-5 md:space-y-6 text-(--color-text) transition-colors duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-(--color-text)">Data Kemiskinan</h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Data kemiskinan dari API Pemerintah Provinsi Jawa Timur
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[200px]">
          <select
            className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 border border-(--color-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-(--color-card-bg) text-(--color-text) font-medium text-sm sm:text-base appearance-none cursor-pointer hover:border-[#D1F447] transition-colors"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="all">Semua Tahun</option>
            {availableYears.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute right-3 sm:right-10 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center ">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </div>
        </div>

        <select
          className="w-full sm:w-auto sm:min-w-[200px] px-3 sm:px-4 py-2 sm:py-2.5 border border-(--color-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-(--color-card-bg) text-(--color-text) font-medium text-sm sm:text-base cursor-pointer hover:border-[#D1F447] transition-colors"
          value={jenisData}
          onChange={(e) => setJenisData(e.target.value)}
        >
          <option value="persentase">Tren per Tahun</option>
          <option value="wilayah">Per Kabupaten/Kota</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="bg-(--color-card-bg) rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-(--color-border)">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Total Data</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text) truncate">{filteredData.length.toLocaleString()}</h2>
              {selectedYear !== "all" && (
                <p className="text-xs text-gray-500 mt-1">Tahun {selectedYear}</p>
              )}
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D1F447] rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ml-2">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
            </div>
          </div>
        </div>

        <div className="bg-(--color-card-bg) rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-(--color-border)">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Tahun Terdata</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text) truncate">{tahunData.labels.length}</h2>
              {selectedYear !== "all" && (
                <p className="text-xs text-gray-500 mt-1">Tahun {selectedYear}</p>
              )}
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D1F447] rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ml-2">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
            </div>
          </div>
        </div>

        <div className="bg-(--color-card-bg) rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-(--color-border) sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Total Wilayah</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text) truncate">{wilayahData.labels.length}</h2>
              {selectedYear !== "all" && (
                <p className="text-xs text-gray-500 mt-1">Tahun {selectedYear}</p>
              )}
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D1F447] rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ml-2">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-(--color-card-bg) rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg border border-(--color-border)">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-(--color-text)">
            {jenisData === "persentase"
              ? "Tren Kemiskinan per Tahun"
              : "Kemiskinan per Kabupaten/Kota"}
          </h2>
          {selectedYear !== "all" && (
            <span className="px-3 py-1 bg-[#D1F447] text-gray-900 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap self-start sm:self-auto">
              Tahun {selectedYear}
            </span>
          )}
        </div>
        <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-(--color-card-bg) rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg border border-(--color-border)">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-(--color-text) mb-4 sm:mb-6">Tabel Data</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#D1F447] text-gray-900">
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold rounded-tl-xl">Tahun</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Kabupaten/Kota</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold rounded-tr-xl">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 20).map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-[#D1F447]/10 transition-colors`}
                  >
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 font-medium">{item.tahun}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{item.kabupaten_kota_se_jawa_timur}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 font-semibold">
                      {item.jumlah.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs sm:text-sm text-gray-500 text-center">
        Sumber: Badan Pusat Statistik Jawa Timur (API Resmi)
      </p>
      </div>
    </LayoutsDashboard>
  );
}
