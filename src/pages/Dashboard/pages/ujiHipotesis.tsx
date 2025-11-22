import LayoutsDashboard from "../layouts/layouts";
import { useState } from "react";

export default function UjiHipotesis() {
  const [method, setMethod] = useState("z");
  const [alpha, setAlpha] = useState(0.05);

  return (
    <LayoutsDashboard>
      <h1 className="text-2xl font-semibold">Uji Hipotesis</h1>
      <p className="mt-3 text-gray-600">
        Lakukan uji hipotesis berdasarkan data kemiskinan.
      </p>

      {/* FORM */}
      <div className="mt-8 space-y-6">

        {/* Input Hipotesis */}
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
          <h2 className="text-lg font-semibold">Input Hipotesis</h2>

          <input
            className="border p-2 rounded w-full"
            placeholder="Hipotesis Nol (H0)"
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Hipotesis Alternatif (H1)"
          />
        </div>

        {/* Parameter Uji */}
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
          <h2 className="text-lg font-semibold">Parameter Uji</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="border p-2 rounded"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="z">Uji Z</option>
              <option value="t">Uji t</option>
              <option value="proporsi">Uji Proporsi</option>
              <option value="dua-mean">Uji Dua Mean</option>
            </select>

            <input
              type="number"
              step="0.01"
              className="border p-2 rounded"
              value={alpha}
              onChange={(e) => setAlpha(e.target.value)}
              placeholder="Tingkat Signifikansi (α)"
            />

            <input
              className="border p-2 rounded"
              placeholder="Nilai Statistik Sampel"
            />

            <input
              className="border p-2 rounded"
              placeholder="Standar Deviasi / Standard Error"
            />
          </div>
        </div>

        {/* Upload Data */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-3">Upload Dataset (Opsional)</h2>

          <input type="file" className="border p-2 rounded w-full" />
        </div>

        {/* Button */}
        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          Hitung Uji Hipotesis
        </button>

      </div>
    </LayoutsDashboard>
  );
}
