import LayoutsDashboard from "../layouts/layouts";
import { useState } from "react";

// Import fungsi uji hipotesis
import { zTest } from "../../../utils/hipotesis/zTest";
import { tTest } from "../../../utils/hipotesis/tTest";
import {  proportionTest } from "../../../utils/hipotesis/proportion";
import { interpret } from "../../../utils/hipotesis/interpret";

export default function UjiHipotesis() {
  const [method, setMethod] = useState("z");
  const [alpha, setAlpha] = useState(0.05);

  // Input form
  const [sampleStat, setSampleStat] = useState<number | null>(null);
  const [populationValue, setPopulationValue] = useState<number | null>(null);
  const [stdDev, setStdDev] = useState<number | null>(null);
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  type Result = { stat: number; interpretation: ReturnType<typeof interpret> } | null;
  const [result, setResult] = useState<Result>(null);

  const hitungHipotesis = () => {
    if (!sampleStat || !populationValue || !sampleSize) {
      alert("Lengkapi semua input!");
      return;
    }

    let stat: number = 0;

    if (method === "z") {
      if (!stdDev) return alert("Masukkan standar deviasi!");
      stat = zTest(sampleStat, populationValue, stdDev, sampleSize);
    }

    if (method === "t") {
      if (!stdDev) return alert("Masukkan standar deviasi sampel!");
      stat = tTest(sampleStat, populationValue, stdDev, sampleSize);
    }

    if (method === "proporsi") {
      stat = proportionTest(sampleStat, populationValue, sampleSize);
    }

    // critical value normal approx
    const critical = 1.96; // default α = 0.05

    setResult({
      stat,
      interpretation: interpret(stat, critical),
    });
  };

  return (
    <LayoutsDashboard>
      <h1 className="text-2xl font-semibold">Uji Hipotesis</h1>
      <p className="mt-3 text-gray-600">
        Lakukan uji hipotesis berdasarkan data kemiskinan.
      </p>

      <div className="mt-8 space-y-6">

        {/* Input Hipotesis */}
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
          <h2 className="text-lg font-semibold">Input Hipotesis</h2>
          <input className="border p-2 rounded w-full" placeholder="H0" />
          <input className="border p-2 rounded w-full" placeholder="H1" />
        </div>

        {/* Parameter */}
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
            </select>

            <input
              type="number"
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="border p-2 rounded"
              placeholder="α"
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Nilai Sampel"
              onChange={(e) => setSampleStat(Number(e.target.value))}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Nilai Populasi (H0)"
              onChange={(e) => setPopulationValue(Number(e.target.value))}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Standar Deviasi / SE"
              onChange={(e) => setStdDev(Number(e.target.value))}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Ukuran Sampel (n)"
              onChange={(e) => setSampleSize(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={hitungHipotesis}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Hitung Uji Hipotesis
        </button>

        {/* Result */}
        {result && (
          <div className="bg-white p-5 rounded-xl shadow-sm border mt-4">
            <h2 className="text-lg font-semibold mb-3">Hasil Perhitungan</h2>

            <p><b>Statistik Uji:</b> {result.stat.toFixed(4)}</p>
            <p className="mt-2 text-blue-600 font-semibold">
              {typeof result.interpretation === "string"
                ? result.interpretation
                : JSON.stringify(result.interpretation)}
            </p>
          </div>
        )}
      </div>
    </LayoutsDashboard>
  );
}
