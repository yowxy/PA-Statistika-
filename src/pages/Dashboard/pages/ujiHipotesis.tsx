import LayoutsDashboard from "../layouts/layouts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, BarChart3, Target, ArrowRight } from "lucide-react";

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
  const [h0, setH0] = useState("");
  const [h1, setH1] = useState("");

  const [sampleStat, setSampleStat] = useState<number | null>(null);
  const [populationValue, setPopulationValue] = useState<number | null>(null);
  const [stdDev, setStdDev] = useState<number | null>(null);
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  const navigate = useNavigate();

  const hitungHipotesis = () => {
    if (!sampleStat || !populationValue || !sampleSize) {
      alert("Lengkapi semua input yang wajib diisi!");
      return;
    }

    let stat = 0;

    if (method === "z") {
      if (!stdDev) {
        alert("Masukkan standar deviasi!");
        return;
      }
      stat = zTest(sampleStat, populationValue, stdDev, sampleSize);
    }

    if (method === "t") {
      if (!stdDev) {
        alert("Masukkan standar deviasi sampel!");
        return;
      }
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

  const methodInfo = {
    z: {
      title: "Uji Z",
      description: "Digunakan ketika ukuran sampel besar (n ≥ 30) dan standar deviasi populasi diketahui",
      icon: BarChart3,
    },
    t: {
      title: "Uji t",
      description: "Digunakan ketika ukuran sampel kecil (n < 30) atau standar deviasi populasi tidak diketahui",
      icon: TrendingUp,
    },
    proporsi: {
      title: "Uji Proporsi",
      description: "Digunakan untuk menguji proporsi atau persentase dari suatu populasi",
      icon: Target,
    },
  };

  const currentMethod = methodInfo[method as keyof typeof methodInfo];

  return (
    <LayoutsDashboard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Uji Hipotesis</h1>
          <p className="mt-2 text-gray-600">
            Lakukan pengujian hipotesis statistik untuk analisis data kemiskinan
          </p>
        </div>

        {/* Method Selection Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#D1F447] rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-gray-900" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Metode Uji</h2>
          </div>

          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 font-medium cursor-pointer hover:border-[#D1F447] transition-colors"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="z">Uji Z</option>
            <option value="t">Uji t</option>
            <option value="proporsi">Uji Proporsi</option>
          </select>

          {currentMethod && (
            <div className="mt-4 p-4 bg-[#D1F447]/10 rounded-xl border border-[#D1F447]/20">
              <div className="flex items-start gap-3">
                <currentMethod.icon className="w-5 h-5 text-gray-900 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{currentMethod.title}</p>
                  <p className="text-sm text-gray-600">{currentMethod.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hypothesis Input */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hipotesis</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                H₀ (Hipotesis Nol)
              </label>
              <input
                type="text"
                value={h0}
                onChange={(e) => setH0(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
                placeholder="Contoh: μ = 50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                H₁ (Hipotesis Alternatif)
              </label>
              <input
                type="text"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
                placeholder="Contoh: μ ≠ 50"
              />
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Parameter Uji</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tingkat Signifikansi (α)
              </label>
              <input
                type="number"
                step="0.01"
                value={alpha}
                onChange={(e) => setAlpha(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900"
                placeholder="0.05"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nilai Sampel (x̄ atau p̂)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900"
                placeholder="Masukkan nilai sampel"
                onChange={(e) => setSampleStat(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nilai Populasi (μ₀ atau p₀)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900"
                placeholder="Nilai hipotesis nol"
                onChange={(e) => setPopulationValue(Number(e.target.value))}
              />
            </div>

            {method !== "proporsi" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standar Deviasi {method === "t" ? "Sampel (s)" : "Populasi (σ)"}
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900"
                  placeholder={method === "t" ? "Standar deviasi sampel" : "Standar deviasi populasi"}
                  onChange={(e) => setStdDev(Number(e.target.value))}
                />
              </div>
            )}

            <div className={method === "proporsi" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ukuran Sampel (n)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900"
                placeholder="Jumlah sampel"
                onChange={(e) => setSampleSize(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={hitungHipotesis}
          className="w-full bg-[#D1F447] text-gray-900 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#D1F447]/90 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Hitung Uji Hipotesis
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </LayoutsDashboard>
  );
}
