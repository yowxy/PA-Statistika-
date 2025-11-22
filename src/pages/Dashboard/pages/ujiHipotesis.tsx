import LayoutsDashboard from "../layouts/layouts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Fungsi uji hipotesis
import { zTest } from "../../../utils/hipotesis/zTest";
import { tTest } from "../../../utils/hipotesis/tTest";
import { proportionTest } from "../../../utils/hipotesis/proportion";
import { interpret } from "../../../utils/hipotesis/interpret";

type ResultPayload = {
  stat: number;
  pValue: number;
  critical: number;
  decision: string;
};

export default function UjiHipotesis() {
  const [method, setMethod] = useState("z");
  const [alpha, setAlpha] = useState(0.05);

  const [sampleStat, setSampleStat] = useState<number | null>(null);
  const [populationValue, setPopulationValue] = useState<number | null>(null);
  const [stdDev, setStdDev] = useState<number | null>(null);
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  const navigate = useNavigate();

  const hitungHipotesis = () => {
    if (!sampleStat || !populationValue || !sampleSize) {
      alert("Lengkapi semua input!");
      return;
    }

    let stat = 0;

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

    const critical = 1.96;
    const interpretation = interpret(stat, critical);

    const payload: ResultPayload = {
      stat,
      pValue: 0.034, // contoh, nanti bisa diganti fungsi real
      critical,
      decision:
        typeof interpretation === "string"
          ? interpretation
          : interpretation.message,
    };

    navigate("/dashboard/hasil-uji", { state: payload });
  };

  return (
    <LayoutsDashboard>
      <h1 className="text-2xl font-semibold">Uji Hipotesis</h1>

      <div className="mt-6 space-y-6">

        {/* Input Hipotesis */}
        <div className="bg-white p-5 rounded-xl border space-y-3">
          <h2 className="text-lg font-semibold">Input Hipotesis</h2>
          <input className="border p-2 rounded w-full" placeholder="H0" />
          <input className="border p-2 rounded w-full" placeholder="H1" />
        </div>

        {/* Parameter Uji */}
        <div className="bg-white p-5 rounded-xl border space-y-4">
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

        <button
          onClick={hitungHipotesis}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Hitung Uji Hipotesis
        </button>

      </div>
    </LayoutsDashboard>
  );
}
