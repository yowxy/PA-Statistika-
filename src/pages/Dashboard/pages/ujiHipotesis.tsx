import LayoutsDashboard from "../layouts/layouts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, BarChart3, Target, ArrowRight, Database, Power } from "lucide-react";

// Fungsi uji hipotesis
import { zTest } from "../../../utils/hipotesis/zTest";
import { tTest } from "../../../utils/hipotesis/tTest";
import { proportionTest } from "../../../utils/hipotesis/proportion";
import { interpret } from "../../../utils/hipotesis/interpret";
import { getDataKemiskinan } from "../../../service/API";

type ResultPayload = {
  stat: number;
  pValue: number;
  critical: number;
  decision: string;
};

interface DataAPI {
  id: number;
  id_kategori: number;
  kabupaten_kota_se_jawa_timur: string;
  nama_variabel: string;
  tahun: number;
  jumlah: number;
}

export default function UjiHipotesis() {
  const [useApiData, setUseApiData] = useState(false);
  const [method, setMethod] = useState("z");
  const [alpha, setAlpha] = useState(0.05);
  const [h0, setH0] = useState("");
  const [h1, setH1] = useState("");

  const [sampleStat, setSampleStat] = useState<number | null>(null);
  const [populationValue, setPopulationValue] = useState<number | null>(null);
  const [stdDev, setStdDev] = useState<number | null>(null);
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  // API Data states
  const [dataApi, setDataApi] = useState<DataAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const navigate = useNavigate();

  // Fetch API data
  useEffect(() => {
    if (useApiData) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await getDataKemiskinan();
          setDataApi(result);
        } catch (error) {
          console.error("Error fetching data:", error);
          alert("Gagal memuat data dari API");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [useApiData]);

  // Get unique regions and years
  const availableRegions = Array.from(new Set(dataApi.map((item) => item.kabupaten_kota_se_jawa_timur))).sort();
  const availableYears = Array.from(new Set(dataApi.map((item) => item.tahun)))
    .sort((a, b) => b - a);

  // Calculate statistics from selected data
  useEffect(() => {
    if (useApiData && dataApi.length > 0 && selectedRegion) {
      let filteredData = dataApi.filter((item) => item.kabupaten_kota_se_jawa_timur === selectedRegion);
      
      if (selectedYear !== "all") {
        filteredData = filteredData.filter((item) => item.tahun.toString() === selectedYear);
      }

      if (filteredData.length > 0) {
        const values = filteredData.map((item) => item.jumlah);
        const n = values.length;
        const mean = values.reduce((sum, val) => sum + val, 0) / n;
        
        // Calculate standard deviation only if we have at least 2 data points
        let stdDeviation: number | null = null;
        if (n >= 2) {
          const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
          stdDeviation = Math.sqrt(variance);
        }

        setSampleStat(mean);
        setSampleSize(n);
        setStdDev(stdDeviation);
      } else {
        // Reset if no data found
        setSampleStat(null);
        setSampleSize(null);
        setStdDev(null);
      }
    } else if (!useApiData) {
      // Reset when switching to manual input
      setSampleStat(null);
      setSampleSize(null);
      setStdDev(null);
    }
  }, [useApiData, dataApi, selectedRegion, selectedYear]);

  const hitungHipotesis = () => {
    if (useApiData && !selectedRegion) {
      alert("Pilih Kabupaten/Kota terlebih dahulu!");
      return;
    }

    if (!sampleStat || !populationValue || !sampleSize) {
      alert("Lengkapi semua input yang wajib diisi!");
      return;
    }

    // Validate standard deviation for methods that require it
    if (method !== "proporsi") {
      if (stdDev === null || isNaN(stdDev) || stdDev <= 0) {
        if (useApiData) {
          alert("Standar deviasi tidak dapat dihitung karena data yang dipilih kurang dari 2 sampel. Silakan pilih data dengan lebih banyak sampel atau gunakan input manual.");
        } else {
          alert("Masukkan standar deviasi yang valid! Standar deviasi harus berupa angka positif.");
        }
        return;
      }
    }

    // Validate sample size
    if (sampleSize < 1) {
      alert("Ukuran sampel harus minimal 1!");
      return;
    }

    let stat = 0;

    if (method === "z") {
      if (!stdDev || isNaN(stdDev)) {
        alert("Masukkan standar deviasi!");
        return;
      }
      stat = zTest(sampleStat, populationValue, stdDev, sampleSize);
    }

    if (method === "t") {
      if (!stdDev || isNaN(stdDev)) {
        alert("Masukkan standar deviasi sampel!");
        return;
      }
      stat = tTest(sampleStat, populationValue, stdDev, sampleSize);
    }

    if (method === "proporsi") {
      stat = proportionTest(sampleStat, populationValue, sampleSize);
    }

    // Calculate critical value based on alpha (two-tailed test)
    let critical = 1.96; // Default for alpha = 0.05
    if (alpha === 0.01) critical = 2.58;
    else if (alpha === 0.05) critical = 1.96;
    else if (alpha === 0.10) critical = 1.65;

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

        {/* Data Source Toggle */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#D1F447] rounded-xl flex items-center justify-center shadow-md">
                <Database className="w-7 h-7 sm:w-8 sm:h-8 text-gray-900" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sumber Data</h2>
                <p className="text-xs sm:text-sm text-gray-600">Pilih sumber data untuk uji hipotesis</p>
              </div>
            </div>
            <button
              onClick={() => {
                setUseApiData(!useApiData);
                if (!useApiData) {
                  setSampleStat(null);
                  setStdDev(null);
                  setSampleSize(null);
                  setSelectedRegion("");
                  setSelectedYear("all");
                }
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 transition-all ${
                useApiData
                  ? "border-[#D1F447] bg-[#D1F447]/10"
                  : "border-gray-300 hover:border-[#D1F447]"
              }`}
            >
              <Power className={`w-5 h-5 sm:w-6 sm:h-6 ${useApiData ? "text-[#D1F447]" : "text-gray-400"}`} />
              <span className={`text-sm sm:text-base font-medium ${useApiData ? "text-gray-900" : "text-gray-600"}`}>
                {useApiData ? "Data API" : "Input Manual"}
              </span>
            </button>
          </div>

          {useApiData && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#D1F447]/10 rounded-xl border border-[#D1F447]/20 space-y-3 sm:space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-8 h-8 border-4 border-[#D1F447] border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-sm sm:text-base text-gray-600">Memuat data...</span>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Pilih Kabupaten/Kota
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 text-sm sm:text-base cursor-pointer"
                    >
                      <option value="">-- Pilih Kabupaten/Kota --</option>
                      {availableRegions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Pilih Tahun (Opsional)
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 text-sm sm:text-base cursor-pointer"
                    >
                      <option value="all">Semua Tahun</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedRegion && (
                    <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Data yang dipilih:</p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                        {selectedRegion} {selectedYear !== "all" && `- Tahun ${selectedYear}`}
                      </p>
                      {sampleSize && (
                        <div className="mt-2 sm:mt-3 space-y-1">
                          <p className="text-xs sm:text-sm text-gray-700">
                            <span className="font-medium">Sampel:</span> {sampleSize} data
                          </p>
                          <p className="text-xs sm:text-sm text-gray-700">
                            <span className="font-medium">Rata-rata:</span> {sampleStat?.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} orang
                          </p>
                          {stdDev !== null && !isNaN(stdDev) ? (
                            <p className="text-xs sm:text-sm text-gray-700">
                              <span className="font-medium">Standar Deviasi:</span> {stdDev.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                          ) : (
                            <div className="p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-xs sm:text-sm text-yellow-800 font-medium mb-1">⚠️ Standar Deviasi tidak dapat dihitung</p>
                              <p className="text-xs sm:text-sm text-yellow-700">
                                Standar deviasi memerlukan minimal <strong>2 data</strong> untuk dihitung. 
                                Data yang dipilih hanya memiliki <strong>{sampleSize} data</strong>. 
                                Silakan pilih tahun "Semua Tahun" atau pilih wilayah lain yang memiliki lebih banyak data.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
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
                value={sampleStat ?? ""}
                disabled={useApiData}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 ${
                  useApiData ? "bg-gray-50 cursor-not-allowed" : ""
                }`}
                placeholder={useApiData ? "Diisi otomatis dari data API" : "Masukkan nilai sampel"}
                onChange={(e) => setSampleStat(Number(e.target.value))}
              />
              {useApiData && sampleStat && (
                <p className="text-xs text-[#D1F447] mt-1">✓ Diisi otomatis dari data yang dipilih</p>
              )}
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
                  value={stdDev !== null && !isNaN(stdDev) ? stdDev : ""}
                  disabled={useApiData}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 ${
                    useApiData ? "bg-gray-50 cursor-not-allowed border-gray-300" : 
                    (stdDev !== null && isNaN(stdDev)) ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder={useApiData ? "Diisi otomatis dari data API" : method === "t" ? "Standar deviasi sampel" : "Standar deviasi populasi"}
                  onChange={(e) => {
                    const value = e.target.value === "" ? null : Number(e.target.value);
                    setStdDev(value);
                  }}
                />
                {useApiData && stdDev !== null && !isNaN(stdDev) && (
                  <p className="text-xs text-[#D1F447] mt-1">✓ Diisi otomatis dari data yang dipilih</p>
                )}
                {useApiData && stdDev !== null && isNaN(stdDev) && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ Tidak dapat dihitung - pilih data dengan minimal 2 sampel
                  </p>
                )}
                {!useApiData && stdDev !== null && isNaN(stdDev) && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ Nilai tidak valid - masukkan angka yang valid
                  </p>
                )}
              </div>
            )}

            <div className={method === "proporsi" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ukuran Sampel (n)
              </label>
              <input
                type="number"
                value={sampleSize ?? ""}
                disabled={useApiData}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1F447] focus:border-transparent bg-white text-gray-900 ${
                  useApiData ? "bg-gray-50 cursor-not-allowed" : ""
                }`}
                placeholder={useApiData ? "Diisi otomatis dari data API" : "Jumlah sampel"}
                onChange={(e) => setSampleSize(Number(e.target.value))}
              />
              {useApiData && sampleSize && (
                <p className="text-xs text-[#D1F447] mt-1">✓ Diisi otomatis dari data yang dipilih</p>
              )}
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
