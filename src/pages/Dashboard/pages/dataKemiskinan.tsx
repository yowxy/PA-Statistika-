"use client";

import { useEffect, useState } from "react";
import NavbarDashboard from "../components/navbar";
import Sidebar from "../components/sidebar";
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
  const [dataApi, setDataApi] = useState<DataAPI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataKemiskinan();
      setDataApi(result);
    };
    fetchData();
  }, []);

  // ======== Chart: Trend per Tahun ========

  const groupByYear = () => {
    const yearMap: Record<number, number> = {};

    dataApi.forEach((item) => {
      if (!yearMap[item.tahun]) yearMap[item.tahun] = 0;
      yearMap[item.tahun] += item.jumlah;
    });

    return {
      labels: Object.keys(yearMap),
      values: Object.values(yearMap),
    };
  };

  const tahunData = groupByYear();

  const barTahun = {
    labels: tahunData.labels,
    datasets: [
      {
        label: "Jumlah (orang)",
        data: tahunData.values,
        backgroundColor: "rgba(59,130,246,0.8)",
        borderRadius: 6,
      },
    ],
  };

  // ======== Chart: per Kabupaten/Kota ========

  const groupByWilayah = () => {
    const map: Record<string, number> = {};

    dataApi.forEach((item) => {
      if (!map[item.kabupaten_kota_se_jawa_timur])
        map[item.kabupaten_kota_se_jawa_timur] = 0;

      map[item.kabupaten_kota_se_jawa_timur] += item.jumlah;
    });

    return {
      labels: Object.keys(map),
      values: Object.values(map),
    };
  };

  const wilayahData = groupByWilayah();

  const barWilayah = {
    labels: wilayahData.labels,
    datasets: [
      {
        label: "Jumlah (orang)",
        data: wilayahData.values,
        backgroundColor: "rgba(16,185,129,0.8)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
        <NavbarDashboard />

        <main className="p-6 space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">Data Kemiskinan</h1>
            <p className="mt-2 text-gray-600">
              Data kemiskinan dari API Pemerintah Provinsi Jawa Timur.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <select className="border rounded-lg p-2 w-48">
              <option>Semua Tahun</option>
              {tahunData.labels.map((th) => (
                <option key={th}>{th}</option>
              ))}
            </select>

            <select
              className="border rounded-lg p-2 w-56"
              value={jenisData}
              onChange={(e) => setJenisData(e.target.value)}
            >
              <option value="persentase">Tren per Tahun</option>
              <option value="wilayah">Per Kabupaten/Kota</option>
            </select>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-gray-500 text-sm">Total Data</p>
              <h2 className="text-2xl font-bold mt-1">{dataApi.length}</h2>
            </div>

            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-gray-500 text-sm">Tahun Terdata</p>
              <h2 className="text-2xl font-bold mt-1">
                {tahunData.labels.length} Tahun
              </h2>
            </div>

            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-gray-500 text-sm">Total Wilayah</p>
              <h2 className="text-2xl font-bold mt-1">
                {wilayahData.labels.length} Daerah
              </h2>
            </div>
          </div>

          {/* Chart */}
          <div className="border rounded-xl p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">
              {jenisData === "persentase"
                ? "Tren Kemiskinan per Tahun"
                : "Kemiskinan per Kabupaten/Kota"}
            </h2>

            <div className="bg-white p-5">
              <Bar
                data={jenisData === "persentase" ? barTahun : barWilayah}
                options={{
                  animation: {
                    duration: 1200,
                    easing: "easeOutQuart",
                  },
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-xl p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Tabel Data</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Tahun</th>
                    <th className="border p-2">Kabupaten/Kota</th>
                    <th className="border p-2">Jumlah</th>
                  </tr>
                </thead>

                <tbody>
                  {dataApi.slice(0, 20).map((item) => (
                    <tr key={item.id}>
                      <td className="border p-2">{item.tahun}</td>
                      <td className="border p-2">
                        {item.kabupaten_kota_se_jawa_timur}
                      </td>
                      <td className="border p-2">{item.jumlah.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Sumber: Badan Pusat Statistik Jawa Timur (API Resmi)
          </p>
        </main>
      </div>
    </div>
  );
}
