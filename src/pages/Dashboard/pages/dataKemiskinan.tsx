"use client";

import { useState } from "react";
import NavbarDashboard from "../components/navbar";
import Sidebar from "../components/sidebar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DataKemiskinan() {
  const [jenisData, setJenisData] = useState("persentase");

  // Bar Chart – Tren Kemiskinan per Tahun
  const barTahun = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Persentase Kemiskinan (%)",
        data: [11.3, 12.1, 11.7, 10.9, 10.3],
        backgroundColor: [
          "rgba(59,130,246,0.8)", // blue
          "rgba(16,185,129,0.8)", // green
          "rgba(245,158,11,0.8)", // yellow
          "rgba(239,68,68,0.8)",  // red
          "rgba(139,92,246,0.8)", // purple
        ],
        borderRadius: 6,
      },
    ],
  };

  // Bar Chart – Perbandingan Kabupaten/Kota
  const barWilayah = {
    labels: ["Surabaya", "Sidoarjo", "Malang", "Jember", "Kediri"],
    datasets: [
      {
        label: "Persentase Kemiskinan (%)",
        data: [5.1, 4.2, 6.9, 8.1, 7.3],
        backgroundColor: [
          "rgba(59,130,246,0.8)",
          "rgba(16,185,129,0.8)",
          "rgba(245,158,11,0.8)",
          "rgba(239,68,68,0.8)",
          "rgba(139,92,246,0.8)",
        ],
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
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold">Data Kemiskinan</h1>
            <p className="mt-2 text-gray-600">
              Lihat data kemiskinan berdasarkan tahun dan wilayah.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select className="border rounded-lg p-2 w-48">
              <option selected>Pilih Tahun</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
            </select>

            <select className="border rounded-lg p-2 w-56">
              <option selected>Semua Kabupaten/Kota</option>
              <option>Surabaya</option>
              <option>Sidoarjo</option>
              <option>Malang</option>
            </select>

            <select
              className="border rounded-lg p-2 w-56"
              value={jenisData}
              onChange={(e) => setJenisData(e.target.value)}
            >
              <option value="persentase">Persentase Kemiskinan</option>
              <option value="garis">Garis Kemiskinan</option>
              <option value="kedalaman">Kedalaman Kemiskinan</option>
              <option value="keparahan">Keparahan Kemiskinan</option>
            </select>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-gray-500 text-sm">Persentase Kemiskinan</p>
              <h2 className="text-2xl font-bold mt-1">11.2%</h2>
            </div>

            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-gray-500 text-sm">Garis Kemiskinan</p>
              <h2 className="text-2xl font-bold mt-1">Rp 486.000</h2>
            </div>

            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-gray-500 text-sm">Kedalaman Kemiskinan</p>
              <h2 className="text-2xl font-bold mt-1">2.19</h2>
            </div>

            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-gray-500 text-sm">Keparahan Kemiskinan</p>
              <h2 className="text-2xl font-bold mt-1">0.89</h2>
            </div>
          </div>

      {/* Chart Section */}
          <div className="border rounded-xl p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">
              {jenisData === "persentase"
                ? "Tren Kemiskinan per Tahun"
                : "Perbandingan Kabupaten/Kota"}
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
            <h2 className="text-xl font-semibold mb-4">
              Tabel Data Kemiskinan
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Tahun</th>
                    <th className="border p-2">Wilayah</th>
                    <th className="border p-2">Persentase</th>
                    <th className="border p-2">Garis Kemiskinan</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border p-2">2023</td>
                    <td className="border p-2">Surabaya</td>
                    <td className="border p-2">5.1%</td>
                    <td className="border p-2">589.000</td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="border p-2">2023</td>
                    <td className="border p-2">Sidoarjo</td>
                    <td className="border p-2">4.2%</td>
                    <td className="border p-2">512.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Sumber: Badan Pusat Statistik (BPS)
          </p>
        </main>
      </div>
    </div>
  );
}
